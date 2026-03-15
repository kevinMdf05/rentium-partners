import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validations";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { sendPasswordResetEmail } from "@/lib/mail";

/**
 * POST — Demande de réinitialisation de mot de passe
 * Envoie un lien sécurisé par email (expire dans 1 heure)
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  // Rate limiting
  const rateCheck = checkRateLimit(`reset:${ip}`, RATE_LIMITS.passwordReset);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const parsed = resetPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Email invalide" },
      { status: 400 }
    );
  }

  const email = parsed.data.email.toLowerCase();

  // Toujours retourner un succès pour ne pas révéler si l'email existe
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });

  if (user) {
    // Générer un token sécurisé
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

    // Sauvegarder le token
    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Envoyer l'email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/nouveau?token=${token}&email=${encodeURIComponent(email)}`;
    sendPasswordResetEmail(user.email, resetUrl).catch(console.error);
  }

  return NextResponse.json({
    success: true,
    message: "Si un compte est associé à cet email, un lien de réinitialisation a été envoyé.",
  });
}
