import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { propertySchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const properties = await db.property.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { documents: true } } },
  });

  return NextResponse.json(properties);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = propertySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Données invalides" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const property = await db.property.create({
    data: {
      userId: session.user.id,
      typeBien: data.typeBien,
      nom: data.nom || null,
      adresse: data.adresse,
      ville: data.ville,
      codePostal: data.codePostal,
      regimeFiscal: data.regimeFiscal,
      valeurBien: data.valeurBien || null,
      dateAchat: data.dateAchat ? new Date(data.dateAchat) : null,
      loyerMensuel: data.loyerMensuel || null,
      superficie: data.superficie || null,
      nbPieces: data.nbPieces || null,
      meuble: data.meuble,
    },
  });

  // Notification
  await db.notification.create({
    data: {
      userId: session.user.id,
      titre: "Bien ajouté",
      message: `Votre bien "${data.nom || data.adresse}" a été ajouté avec succès.`,
      type: "SUCCES",
      lien: "/mes-biens",
    },
  });

  return NextResponse.json(property, { status: 201 });
}
