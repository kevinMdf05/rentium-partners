import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata = {
  title: "Tableau de bord",
};

export default async function TableauDeBordPage() {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const [subscription, properties, recentPayments, recentDocuments, notifications] =
    await Promise.all([
      db.subscription.findUnique({
        where: { userId: session.user.id },
      }),
      db.property.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
      }),
      db.payment.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      db.document.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      db.notification.findMany({
        where: { userId: session.user.id, lu: false },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <DashboardContent
      prenom={session.user.prenom}
      subscription={subscription ? {
        planName: subscription.planName,
        statut: subscription.statut,
        dateProchainPaiement: subscription.dateProchainPaiement?.toISOString() ?? null,
        prixMensuel: subscription.prixMensuel,
      } : null}
      propertiesCount={properties.length}
      recentPayments={recentPayments.map((p) => ({
        id: p.id,
        montant: p.montant,
        statut: p.statut,
        description: p.description,
        createdAt: p.createdAt.toISOString(),
      }))}
      recentDocuments={recentDocuments.map((d) => ({
        id: d.id,
        nomFichier: d.nomFichier,
        typeDocument: d.typeDocument,
        createdAt: d.createdAt.toISOString(),
      }))}
      notifications={notifications.map((n) => ({
        id: n.id,
        titre: n.titre,
        message: n.message,
        type: n.type,
        createdAt: n.createdAt.toISOString(),
      }))}
    />
  );
}
