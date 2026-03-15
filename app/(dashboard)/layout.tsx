import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

/**
 * Layout protégé — Dashboard
 * Redirige vers /connexion si non authentifié
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/connexion");
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
