import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

/**
 * Layout Admin — Protégé par rôle ADMIN/SUPER_ADMIN
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/connexion");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    redirect("/tableau-de-bord");
  }

  return (
    <DashboardShell
      user={{
        prenom: session.user.prenom,
        nom: session.user.nom,
        email: session.user.email!,
        role: session.user.role,
      }}
    >
      {children}
    </DashboardShell>
  );
}
