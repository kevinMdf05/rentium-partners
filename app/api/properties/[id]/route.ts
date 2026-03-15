import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { propertySchema } from "@/lib/validations";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const property = await db.property.findFirst({
    where: { id, userId: session.user.id },
    include: {
      documents: { orderBy: { createdAt: "desc" } },
      _count: { select: { documents: true } },
    },
  });

  if (!property) {
    return NextResponse.json({ error: "Bien non trouvé" }, { status: 404 });
  }

  return NextResponse.json(property);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  // Vérifier que le bien appartient à l'utilisateur
  const existing = await db.property.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Bien non trouvé" }, { status: 404 });
  }

  const parsed = propertySchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Données invalides" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const property = await db.property.update({
    where: { id },
    data: {
      ...(data.typeBien !== undefined ? { typeBien: data.typeBien } : {}),
      ...(data.nom !== undefined ? { nom: data.nom || null } : {}),
      ...(data.adresse !== undefined ? { adresse: data.adresse } : {}),
      ...(data.ville !== undefined ? { ville: data.ville } : {}),
      ...(data.codePostal !== undefined ? { codePostal: data.codePostal } : {}),
      ...(data.regimeFiscal !== undefined ? { regimeFiscal: data.regimeFiscal } : {}),
      ...(data.valeurBien !== undefined ? { valeurBien: data.valeurBien || null } : {}),
      ...(data.loyerMensuel !== undefined ? { loyerMensuel: data.loyerMensuel || null } : {}),
      ...(data.dateAchat !== undefined ? { dateAchat: data.dateAchat ? new Date(data.dateAchat) : null } : {}),
    },
  });

  return NextResponse.json(property);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const property = await db.property.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true, nom: true, adresse: true },
  });

  if (!property) {
    return NextResponse.json({ error: "Bien non trouvé" }, { status: 404 });
  }

  // Supprimer le bien et ses documents associés
  await db.document.deleteMany({ where: { propertyId: id } });
  await db.property.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
