import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { newPasswordSchema } from "@/lib/validations";

/**
 * POST — Définir un nouveau mot de passe après réinitialisation
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, email, password, confirmPassword } = body;

  if (!token || !email) {
    return NextResponse.json(
      { error: "Lien invalide ou expiré" },
      { status: 400 }
    );
  }

  // Valider le nouveau mot de passe
  const parsed = newPasswordSchema.safeParse({ password, confirmPassword });
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Mot de passe invalide" },
      { status: 400 }
    );
  }

  // Vérifier le token
  const verificationToken = await db.verificationToken.findFirst({
    where: {
      identifier: email.toLowerCase(),
      token,
      expires: { gt: new Date() },
    },
  });

  if (!verificationToken) {
    return NextResponse.json(
      { error: "Lien invalide ou expiré. Veuillez faire une nouvelle demande." },
      { status: 400 }
    );
  }

  // Hasher le nouveau mot de passe
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  // Mettre à jour le mot de passe
  await db.user.update({
    where: { email: email.toLowerCase() },
    data: { passwordHash },
  });

  // Supprimer le token utilisé
  await db.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: email.toLowerCase(),
        token,
      },
    },
  });

  return NextResponse.json({
    success: true,
    message: "Mot de passe modifié avec succès.",
  });
}
