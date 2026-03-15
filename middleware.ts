import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Middleware de protection des routes
 * - Routes /tableau-de-bord, /mes-biens, etc. → redirige vers /connexion si non auth
 * - Routes /admin → redirige si non ADMIN/SUPER_ADMIN
 * - Routes /connexion, /inscription → redirige vers /tableau-de-bord si déjà auth
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Routes protégées (dashboard)
  const protectedPaths = [
    "/tableau-de-bord",
    "/mes-biens",
    "/documents",
    "/messagerie",
    "/facturation",
    "/parametres",
  ];

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAdmin = pathname.startsWith("/admin");
  const isAuthPage = pathname.startsWith("/connexion") || pathname.startsWith("/inscription");

  // Rediriger les utilisateurs non authentifiés vers /connexion
  if (isProtected && !isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = "/connexion";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Rediriger les non-admins essayant d'accéder à /admin
  if (isAdmin && (!isAuthenticated || (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN"))) {
    const url = req.nextUrl.clone();
    url.pathname = isAuthenticated ? "/tableau-de-bord" : "/connexion";
    return NextResponse.redirect(url);
  }

  // Rediriger les utilisateurs déjà connectés essayant d'accéder aux pages auth
  if (isAuthPage && isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = "/tableau-de-bord";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/tableau-de-bord/:path*",
    "/mes-biens/:path*",
    "/documents/:path*",
    "/messagerie/:path*",
    "/facturation/:path*",
    "/parametres/:path*",
    "/admin/:path*",
    "/connexion",
    "/inscription",
  ],
};
