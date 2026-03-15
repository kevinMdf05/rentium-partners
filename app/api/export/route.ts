import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * GET — Export RGPD — Toutes les données personnelles de l'utilisateur
 * Retourne un JSON complet téléchargeable
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      prenom: true,
      nom: true,
      email: true,
      telephone: true,
      adresse: true,
      ville: true,
      codePostal: true,
      pays: true,
      dateNaissance: true,
      role: true,
      statut: true,
      twoFactorEnabled: true,
      codeParrainage: true,
      createdAt: true,
      updatedAt: true,
      subscription: true,
      properties: true,
      documents: {
        select: {
          id: true,
          nomFichier: true,
          typeDocument: true,
          annee: true,
          description: true,
          createdAt: true,
        },
      },
      payments: true,
      messages: true,
      notifications: true,
      loginLogs: {
        select: {
          id: true,
          ipAddress: true,
          localisation: true,
          succes: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  const exportData = {
    exportDate: new Date().toISOString(),
    platform: "Rentium Partners",
    userData: user,
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="rentium-export-${user.id}.json"`,
    },
  });
}
