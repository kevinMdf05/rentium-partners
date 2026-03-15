import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const propertyId = searchParams.get("propertyId");
  const annee = searchParams.get("annee");

  const documents = await db.document.findMany({
    where: {
      userId: session.user.id,
      ...(type && type !== "all" ? { typeDocument: type as "DECLARATION" | "BILAN" | "FACTURE" | "CONTRAT" | "AUTRE" } : {}),
      ...(propertyId ? { propertyId } : {}),
      ...(annee ? { annee: parseInt(annee) } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      property: { select: { nom: true, adresse: true } },
    },
  });

  return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();

  const { nomFichier, typeDocument, urlFichier, propertyId, annee, description, tailleFichier } = body;

  if (!nomFichier || !typeDocument || !urlFichier) {
    return NextResponse.json(
      { error: "Nom du fichier, type et URL sont requis" },
      { status: 400 }
    );
  }

  const validTypes = ["DECLARATION", "BILAN", "FACTURE", "CONTRAT", "AUTRE"];
  if (!validTypes.includes(typeDocument)) {
    return NextResponse.json(
      { error: "Type de document invalide" },
      { status: 400 }
    );
  }

  // Vérifier que la propriété appartient bien à l'utilisateur
  if (propertyId) {
    const property = await db.property.findFirst({
      where: { id: propertyId, userId: session.user.id },
      select: { id: true },
    });
    if (!property) {
      return NextResponse.json(
        { error: "Bien non trouvé" },
        { status: 404 }
      );
    }
  }

  const document = await db.document.create({
    data: {
      userId: session.user.id,
      nomFichier,
      typeDocument,
      urlFichier,
      propertyId: propertyId || null,
      annee: annee ? parseInt(annee) : null,
      description: description || null,
      tailleFichier: tailleFichier || null,
    },
  });

  // Notification
  await db.notification.create({
    data: {
      userId: session.user.id,
      titre: "Document ajouté",
      message: `Le document "${nomFichier}" a été ajouté avec succès.`,
      type: "DOCUMENT",
      lien: "/documents",
    },
  });

  return NextResponse.json(document, { status: 201 });
}
