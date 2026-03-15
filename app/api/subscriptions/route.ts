import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe, PLANS, type PlanKey } from "@/lib/stripe";

/**
 * GET — Récupérer l'abonnement de l'utilisateur connecté
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json(subscription);
}

/**
 * POST — Créer une session Stripe Checkout pour souscrire/changer de plan
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { planType, billingPeriod = "monthly" } = body;

  if (!planType || !(planType in PLANS)) {
    return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
  }

  const plan = PLANS[planType as PlanKey];
  const priceId =
    billingPeriod === "yearly" ? plan.stripeYearlyId : plan.stripeMonthlyId;

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { email: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  // Vérifier s'il y a déjà un customer Stripe
  const existingSub = await db.subscription.findUnique({
    where: { userId: session.user.id },
    select: { stripeCustomerId: true },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: existingSub?.stripeCustomerId ? undefined : user.email,
    customer: existingSub?.stripeCustomerId || undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tableau-de-bord?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/facturation?checkout=cancel`,
    metadata: {
      userId: session.user.id,
      planType,
      billingPeriod,
    },
    subscription_data: {
      metadata: {
        userId: session.user.id,
        planType,
      },
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}

/**
 * PATCH — Annuler l'abonnement (fin de période)
 */
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { action } = body;

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  if (!subscription || !subscription.stripeSubId) {
    return NextResponse.json({ error: "Aucun abonnement actif" }, { status: 404 });
  }

  if (action === "cancel") {
    // Annulation à la fin de la période
    await stripe.subscriptions.update(subscription.stripeSubId, {
      cancel_at_period_end: true,
    });

    await db.subscription.update({
      where: { userId: session.user.id },
      data: { statut: "CANCELLED" },
    });

    await db.notification.create({
      data: {
        userId: session.user.id,
        titre: "Abonnement annulé",
        message: "Votre abonnement sera actif jusqu'à la fin de la période en cours.",
        type: "INFO",
        lien: "/facturation",
      },
    });

    return NextResponse.json({ success: true, message: "Abonnement annulé" });
  }

  if (action === "resume") {
    // Réactiver un abonnement annulé
    await stripe.subscriptions.update(subscription.stripeSubId, {
      cancel_at_period_end: false,
    });

    await db.subscription.update({
      where: { userId: session.user.id },
      data: { statut: "ACTIVE" },
    });

    return NextResponse.json({ success: true, message: "Abonnement réactivé" });
  }

  return NextResponse.json({ error: "Action invalide" }, { status: 400 });
}
