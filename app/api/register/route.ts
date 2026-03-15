import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerStep1Schema, registerStep2Schema, registerStep3Schema } from "@/lib/validations";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { sendWelcomeEmail } from "@/lib/mail";
import { generateReferralCode } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";

    // Rate limiting : 3 inscriptions par heure par IP
    const rateCheck = checkRateLimit(`register:${ip}`, RATE_LIMITS.register);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez plus tard." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validation des données personnelles (étape 1)
    const step1 = registerStep1Schema.safeParse(body);
    if (!step1.success) {
      return NextResponse.json(
        { error: step1.error.issues[0]?.message || "Données invalides" },
        { status: 400 }
      );
    }

    // Validation du mot de passe (étape 2 — partielle)
    const step2 = registerStep2Schema.safeParse({
      password: body.password,
      confirmPassword: body.password,
      acceptCgu: true,
      acceptPrivacy: true,
    });
    if (!step2.success) {
      return NextResponse.json(
        { error: step2.error.issues[0]?.message || "Mot de passe invalide" },
        { status: 400 }
      );
    }

    // Validation de la formule (étape 3)
    const step3 = registerStep3Schema.safeParse({
      planType: body.planType,
      billingPeriod: body.billingPeriod,
    });
    if (!step3.success) {
      return NextResponse.json(
        { error: "Formule invalide" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await db.user.findUnique({
      where: { email: step1.data.email.toLowerCase() },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà." },
        { status: 409 }
      );
    }

    // Hachage du mot de passe (bcrypt cost 12)
    const passwordHash = await bcrypt.hash(body.password, 12);

    // Générer un code de parrainage unique
    let codeParrainage = generateReferralCode();
    let codeExists = true;
    while (codeExists) {
      const found = await db.user.findUnique({
        where: { codeParrainage },
        select: { id: true },
      });
      if (!found) {
        codeExists = false;
      } else {
        codeParrainage = generateReferralCode();
      }
    }

    // Créer l'utilisateur avec son abonnement
    const user = await db.user.create({
      data: {
        prenom: step1.data.prenom,
        nom: step1.data.nom,
        email: step1.data.email.toLowerCase(),
        telephone: step1.data.telephone || null,
        dateNaissance: step1.data.dateNaissance
          ? new Date(step1.data.dateNaissance)
          : null,
        adresse: step1.data.adresse || null,
        ville: step1.data.ville || null,
        codePostal: step1.data.codePostal || null,
        passwordHash,
        codeParrainage,
        twoFactorEnabled: false,
        subscription: {
          create: {
            planType: step3.data.planType,
            planName: getPlanName(step3.data.planType),
            prixMensuel: getPlanPrice(step3.data.planType),
            statut: "ACTIVE",
            dateDebut: new Date(),
          },
        },
      },
      select: { id: true, prenom: true, email: true },
    });

    // Créer une notification de bienvenue
    await db.notification.create({
      data: {
        userId: user.id,
        titre: "Bienvenue chez Rentium Partners",
        message: `Bonjour ${user.prenom}, votre compte a été créé avec succès. Commencez par ajouter vos biens immobiliers.`,
        type: "INFO",
        lien: "/mes-biens",
      },
    });

    // Envoyer l'email de bienvenue (non bloquant)
    sendWelcomeEmail(user.email, user.prenom).catch(console.error);

    return NextResponse.json(
      { success: true, userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER]", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue." },
      { status: 500 }
    );
  }
}

function getPlanName(planType: string): string {
  const names: Record<string, string> = {
    LMNP_1: "LMNP Solo",
    LMNP_2: "LMNP Duo",
    SCI_IR_1: "SCI IR Solo",
    SCI_IR_2: "SCI IR Duo",
  };
  return names[planType] || planType;
}

function getPlanPrice(planType: string): number {
  const prices: Record<string, number> = {
    LMNP_1: 20,
    LMNP_2: 35,
    SCI_IR_1: 30,
    SCI_IR_2: 45,
  };
  return prices[planType] || 0;
}
