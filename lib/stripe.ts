import Stripe from "stripe";

/**
 * Client Stripe côté serveur — singleton
 * Utilisé uniquement dans les API routes et Server Actions
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

/**
 * Forfaits Rentium Partners
 * Les IDs Stripe sont configurés via les variables d'environnement
 * ou créés manuellement dans le dashboard Stripe
 */
export const PLANS = {
  LMNP_1: {
    id: "lmnp_1_bien",
    nom: "LMNP Solo",
    description: "1 bien en location meublée non professionnelle",
    prix: 20,
    prixAnnuel: 192,
    stripeMonthlyId: "price_lmnp_1_monthly",
    stripeYearlyId: "price_lmnp_1_yearly",
    features: [
      "Suivi comptable 1 bien LMNP",
      "Déclaration fiscale annuelle",
      "Tableau de bord en temps réel",
      "Stockage documents illimité",
      "Support email prioritaire",
      "Calendrier fiscal personnalisé",
    ],
    badge: null,
    couleur: "#C8A96E",
  },
  LMNP_2: {
    id: "lmnp_2_biens",
    nom: "LMNP Duo",
    description: "2 biens en location meublée non professionnelle",
    prix: 35,
    prixAnnuel: 336,
    stripeMonthlyId: "price_lmnp_2_monthly",
    stripeYearlyId: "price_lmnp_2_yearly",
    features: [
      "Suivi comptable 2 biens LMNP",
      "Déclarations fiscales annuelles",
      "Tableau de bord multi-biens",
      "Stockage documents illimité",
      "Support prioritaire 24h",
      "Rapports comparatifs",
      "Conseils optimisation fiscale",
    ],
    badge: "Populaire",
    couleur: "#E2C080",
  },
  SCI_IR_1: {
    id: "sci_ir_1_bien",
    nom: "SCI IR Solo",
    description: "1 bien via SCI soumise à l'impôt sur le revenu",
    prix: 30,
    prixAnnuel: 288,
    stripeMonthlyId: "price_sci_1_monthly",
    stripeYearlyId: "price_sci_1_yearly",
    features: [
      "Comptabilité SCI complète",
      "Déclaration 2072 incluse",
      "Suivi associés et parts",
      "Tableau de bord SCI",
      "Stockage documents illimité",
      "Support expert SCI",
    ],
    badge: null,
    couleur: "#C8A96E",
  },
  SCI_IR_2: {
    id: "sci_ir_2_biens",
    nom: "SCI IR Duo",
    description: "2 biens via SCI soumise à l'impôt sur le revenu",
    prix: 45,
    prixAnnuel: 432,
    stripeMonthlyId: "price_sci_2_monthly",
    stripeYearlyId: "price_sci_2_yearly",
    features: [
      "Comptabilité 2 SCI ou 2 biens",
      "Déclarations 2072 multiples",
      "Gestion multi-associés",
      "Tableau de bord consolidé",
      "Stockage illimité",
      "Support dédié senior",
      "Reporting trimestriel",
    ],
    badge: "Premium",
    couleur: "#E2C080",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
