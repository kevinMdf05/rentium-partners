import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * GET — Détail d'un utilisateur (Admin uniquement)
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id } = await params;

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      prenom: true,
      nom: true,
      email: true,
      telephone: true,
      adresse: true,
      ville: true,
      codePostal: true,
      role: true,
      statut: true,
      twoFactorEnabled: true,
      codeParrainage: true,
      createdAt: true,
      updatedAt: true,
      subscription: true,
      properties: { orderBy: { createdAt: "desc" } },
      payments: { orderBy: { createdAt: "desc" }, take: 10 },
      loginLogs: { orderBy: { createdAt: "desc" }, take: 10 },
      _count: {
        select: { documents: true, messages: true, notifications: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  return NextResponse.json(user);
}

/**
 * PATCH — Modifier le statut ou le rôle d'un utilisateur (Admin uniquement)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};

  if (body.statut && ["ACTIF", "INACTIF", "SUSPENDU"].includes(body.statut)) {
    updateData.statut = body.statut;
  }

  if (body.role && ["CLIENT", "ADMIN"].includes(body.role)) {
    // Seul SUPER_ADMIN peut promouvoir en ADMIN
    if (body.role === "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Seul un super admin peut promouvoir un utilisateur" },
        { status: 403 }
      );
    }
    updateData.role = body.role;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "Aucune modification" }, { status: 400 });
  }

  const user = await db.user.update({
    where: { id },
    data: updateData,
    select: { id: true, statut: true, role: true },
  });

  return NextResponse.json(user);
}
