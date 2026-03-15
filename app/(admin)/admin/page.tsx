import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminContent } from "@/components/dashboard/admin-content";

export const metadata = {
  title: "Administration",
};

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/tableau-de-bord");
  }

  const [
    totalUsers,
    activeUsers,
    totalSubscriptions,
    activeSubscriptions,
    totalRevenue,
    recentUsers,
    recentPayments,
    loginLogs,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { statut: "ACTIF" } }),
    db.subscription.count(),
    db.subscription.count({ where: { statut: "ACTIVE" } }),
    db.payment.aggregate({
      _sum: { montant: true },
      where: { statut: "SUCCEEDED" },
    }),
    db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        prenom: true,
        nom: true,
        email: true,
        role: true,
        statut: true,
        createdAt: true,
        subscription: {
          select: { planName: true, statut: true, prixMensuel: true },
        },
      },
    }),
    db.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        user: { select: { prenom: true, nom: true, email: true } },
      },
    }),
    db.loginLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
      include: {
        user: { select: { prenom: true, nom: true, email: true } },
      },
    }),
  ]);

  // Calcul MRR (Monthly Recurring Revenue)
  const mrr = await db.subscription.aggregate({
    _sum: { prixMensuel: true },
    where: { statut: "ACTIVE" },
  });

  // Churn rate (abonnements annulés / total)
  const cancelledSubs = await db.subscription.count({
    where: { statut: "CANCELLED" },
  });
  const churnRate = totalSubscriptions > 0
    ? ((cancelledSubs / totalSubscriptions) * 100).toFixed(1)
    : "0";

  return (
    <AdminContent
      stats={{
        totalUsers,
        activeUsers,
        totalSubscriptions,
        activeSubscriptions,
        totalRevenue: totalRevenue._sum.montant || 0,
        mrr: mrr._sum.prixMensuel || 0,
        arr: (mrr._sum.prixMensuel || 0) * 12,
        churnRate: parseFloat(churnRate),
      }}
      recentUsers={recentUsers.map((u) => ({
        id: u.id,
        prenom: u.prenom,
        nom: u.nom,
        email: u.email,
        role: u.role,
        statut: u.statut,
        createdAt: u.createdAt.toISOString(),
        planName: u.subscription?.planName ?? null,
        subStatut: u.subscription?.statut ?? null,
      }))}
      recentPayments={recentPayments.map((p) => ({
        id: p.id,
        montant: p.montant,
        statut: p.statut,
        description: p.description,
        createdAt: p.createdAt.toISOString(),
        userName: `${p.user.prenom} ${p.user.nom}`,
        userEmail: p.user.email,
      }))}
      loginLogs={loginLogs.map((l) => ({
        id: l.id,
        ipAddress: l.ipAddress,
        succes: l.succes,
        createdAt: l.createdAt.toISOString(),
        userName: `${l.user.prenom} ${l.user.nom}`,
        userEmail: l.user.email,
      }))}
    />
  );
}
