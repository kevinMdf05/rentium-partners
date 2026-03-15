import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendPaymentConfirmationEmail, sendPaymentFailedEmail } from "@/lib/mail";
import Stripe from "stripe";

/**
 * Webhook Stripe — Gestion des événements de paiement
 * Vérifie la signature pour garantir l'authenticité
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[STRIPE_WEBHOOK] Signature invalide:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancelled(subscription);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur de traitement" },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (!session.customer || !session.subscription) return;

  const userId = session.metadata?.userId;
  if (!userId) return;

  await db.subscription.update({
    where: { userId },
    data: {
      stripeSubId: session.subscription as string,
      stripeCustomerId: session.customer as string,
      statut: "ACTIVE",
    },
  });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inv = invoice as any;
  const subId = (typeof inv.subscription === "string" ? inv.subscription : inv.subscription?.id) as string | undefined;
  if (!subId) return;

  const subscription = await db.subscription.findUnique({
    where: { stripeSubId: subId },
    include: { user: { select: { id: true, email: true, prenom: true } } },
  });

  if (!subscription) return;

  const amountPaid = inv.amount_paid ?? 0;
  const paymentIntent = typeof inv.payment_intent === "string" ? inv.payment_intent : inv.payment_intent?.id;

  // Enregistrer le paiement
  await db.payment.create({
    data: {
      userId: subscription.userId,
      montant: amountPaid / 100,
      statut: "SUCCEEDED",
      stripePaymentId: paymentIntent || null,
      stripeInvoiceId: invoice.id,
      description: `Abonnement ${subscription.planName}`,
    },
  });

  // Mettre à jour la date du prochain paiement
  await db.subscription.update({
    where: { stripeSubId: subId },
    data: {
      statut: "ACTIVE",
      dateProchainPaiement: inv.next_payment_attempt
        ? new Date(inv.next_payment_attempt * 1000)
        : null,
    },
  });

  // Email de confirmation
  const montant = `${(amountPaid / 100).toFixed(2)}€`;
  sendPaymentConfirmationEmail(
    subscription.user.email,
    subscription.user.prenom,
    subscription.planName,
    montant
  ).catch(console.error);

  // Notification
  await db.notification.create({
    data: {
      userId: subscription.userId,
      titre: "Paiement confirmé",
      message: `Votre paiement de ${montant} a été traité avec succès.`,
      type: "PAIEMENT",
      lien: "/facturation",
    },
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inv = invoice as any;
  const subId = (typeof inv.subscription === "string" ? inv.subscription : inv.subscription?.id) as string | undefined;
  if (!subId) return;

  const subscription = await db.subscription.findUnique({
    where: { stripeSubId: subId },
    include: { user: { select: { id: true, email: true, prenom: true } } },
  });

  if (!subscription) return;

  // Enregistrer le paiement échoué
  await db.payment.create({
    data: {
      userId: subscription.userId,
      montant: (inv.amount_due ?? 0) / 100,
      statut: "FAILED",
      stripeInvoiceId: invoice.id,
      description: `Échec — Abonnement ${subscription.planName}`,
    },
  });

  // Mettre à jour le statut
  await db.subscription.update({
    where: { stripeSubId: subId },
    data: { statut: "PAST_DUE" },
  });

  // Email d'alerte
  sendPaymentFailedEmail(subscription.user.email, subscription.user.prenom).catch(
    console.error
  );

  // Notification
  await db.notification.create({
    data: {
      userId: subscription.userId,
      titre: "Échec de paiement",
      message: "Votre dernier paiement a échoué. Veuillez mettre à jour votre moyen de paiement.",
      type: "ERREUR",
      lien: "/facturation",
    },
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const sub = await db.subscription.findUnique({
    where: { stripeSubId: subscription.id },
  });

  if (!sub) return;

  const statusMap: Record<string, "ACTIVE" | "PAST_DUE" | "CANCELLED" | "PAUSED"> = {
    active: "ACTIVE",
    past_due: "PAST_DUE",
    canceled: "CANCELLED",
    paused: "PAUSED",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodEnd = (subscription as any).current_period_end as number | undefined;

  await db.subscription.update({
    where: { stripeSubId: subscription.id },
    data: {
      statut: statusMap[subscription.status] || "ACTIVE",
      dateProchainPaiement: periodEnd
        ? new Date(periodEnd * 1000)
        : null,
    },
  });
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  await db.subscription.updateMany({
    where: { stripeSubId: subscription.id },
    data: {
      statut: "CANCELLED",
      dateFin: new Date(),
    },
  });
}
