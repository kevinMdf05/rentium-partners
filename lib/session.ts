import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Récupère la session courante côté serveur
 * Redirige vers /connexion si non authentifié
 */
export async function getRequiredSession() {
  const session = await auth();
  if (!session?.user) {
    redirect("/connexion");
  }
  return session;
}

/**
 * Récupère la session sans redirection
 */
export async function getOptionalSession() {
  return await auth();
}

/**
 * Vérifie que l'utilisateur a le rôle ADMIN ou SUPER_ADMIN
 */
export async function requireAdmin() {
  const session = await getRequiredSession();
  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    redirect("/tableau-de-bord");
  }
  return session;
}
