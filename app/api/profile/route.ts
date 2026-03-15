import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { profileSchema } from "@/lib/validations";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = profileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Données invalides" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const user = await db.user.update({
    where: { id: session.user.id },
    data: {
      prenom: data.prenom,
      nom: data.nom,
      telephone: data.telephone || null,
      adresse: data.adresse || null,
      ville: data.ville || null,
      codePostal: data.codePostal || null,
    },
    select: {
      id: true,
      prenom: true,
      nom: true,
    },
  });

  return NextResponse.json(user);
}
