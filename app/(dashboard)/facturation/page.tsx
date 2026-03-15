import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FacturationContent } from "@/components/dashboard/facturation-content";

export const metadata = {
  title: "Facturation",
};

export default async function FacturationPage() {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const [subscription, payments] = await Promise.all([
    db.subscription.findUnique({
      where: { userId: session.user.id },
    }),
    db.payment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <FacturationContent
      subscription={
        subscription
          ? {
              planName: subscription.planName,
              planType: subscription.planType,
              prixMensuel: subscription.prixMensuel,
              statut: subscription.statut,
              dateDebut: subscription.dateDebut.toISOString(),
              dateProchainPaiement:
                subscription.dateProchainPaiement?.toISOString() ?? null,
            }
          : null
      }
      payments={payments.map((p) => ({
        id: p.id,
        montant: p.montant,
        devise: p.devise,
        statut: p.statut,
        description: p.description,
        createdAt: p.createdAt.toISOString(),
      }))}
    />
  );
}
