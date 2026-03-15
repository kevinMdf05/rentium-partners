import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * GET — Liste des utilisateurs (Admin uniquement)
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Vérification rôle admin
  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";
  const statut = searchParams.get("statut");

  const where = {
    ...(search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" as const } },
            { nom: { contains: search, mode: "insensitive" as const } },
            { prenom: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(statut ? { statut: statut as "ACTIF" | "INACTIF" | "SUSPENDU" } : {}),
  };

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      select: {
        id: true,
        prenom: true,
        nom: true,
        email: true,
        role: true,
        statut: true,
        createdAt: true,
        subscription: {
          select: {
            planName: true,
            planType: true,
            statut: true,
            prixMensuel: true,
          },
        },
        _count: {
          select: { properties: true, documents: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.user.count({ where }),
  ]);

  return NextResponse.json({
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
