import { z } from "zod";

/**
 * Schémas de validation Zod — utilisés côté client ET serveur
 * Garantit l'intégrité des données à chaque point d'entrée
 */

// ──────────────────────────────────────────────
// AUTHENTIFICATION
// ──────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis"),
});

export const registerStep1Schema = z.object({
  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom contient des caractères invalides"),
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom contient des caractères invalides"),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  telephone: z
    .string()
    .regex(/^(?:\+33|0)[1-9](?:\d{8})$/, "Numéro de téléphone français invalide")
    .optional()
    .or(z.literal("")),
  dateNaissance: z
    .string()
    .optional()
    .or(z.literal("")),
  adresse: z
    .string()
    .max(200, "L'adresse ne peut pas dépasser 200 caractères")
    .optional()
    .or(z.literal("")),
  ville: z
    .string()
    .max(100, "La ville ne peut pas dépasser 100 caractères")
    .optional()
    .or(z.literal("")),
  codePostal: z
    .string()
    .regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres")
    .optional()
    .or(z.literal("")),
});

export const registerStep2Schema = z.object({
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmPassword: z
    .string()
    .min(1, "La confirmation est requise"),
  twoFactorEnabled: z.boolean().default(false),
  acceptCgu: z
    .boolean()
    .refine((val) => val === true, "Vous devez accepter les CGU"),
  acceptPrivacy: z
    .boolean()
    .refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export const registerStep3Schema = z.object({
  planType: z.enum(["LMNP_1", "LMNP_2", "SCI_IR_1", "SCI_IR_2"], {
    message: "Veuillez sélectionner une formule",
  }),
  billingPeriod: z.enum(["monthly", "yearly"]).default("monthly"),
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
});

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule requise")
    .regex(/[0-9]/, "Au moins un chiffre requis")
    .regex(/[^a-zA-Z0-9]/, "Au moins un caractère spécial requis"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// ──────────────────────────────────────────────
// BIENS IMMOBILIERS
// ──────────────────────────────────────────────

export const propertySchema = z.object({
  typeBien: z.enum(["APPARTEMENT", "MAISON", "STUDIO", "PARKING", "COMMERCE"], {
    message: "Le type de bien est requis",
  }),
  nom: z.string().max(100).optional().or(z.literal("")),
  adresse: z
    .string()
    .min(5, "L'adresse est requise")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères"),
  ville: z
    .string()
    .min(2, "La ville est requise")
    .max(100),
  codePostal: z
    .string()
    .regex(/^\d{5}$/, "Code postal invalide"),
  regimeFiscal: z.enum(["LMNP", "SCI_IR"], {
    message: "Le régime fiscal est requis",
  }),
  valeurBien: z.coerce.number().positive("La valeur doit être positive").optional(),
  dateAchat: z.string().optional().or(z.literal("")),
  loyerMensuel: z.coerce.number().positive("Le loyer doit être positif").optional(),
  superficie: z.coerce.number().positive("La superficie doit être positive").optional(),
  nbPieces: z.coerce.number().int().positive().optional(),
  meuble: z.boolean().default(true),
});

// ──────────────────────────────────────────────
// MESSAGERIE
// ──────────────────────────────────────────────

export const messageSchema = z.object({
  sujet: z
    .string()
    .min(3, "Le sujet doit contenir au moins 3 caractères")
    .max(200, "Le sujet ne peut pas dépasser 200 caractères"),
  contenu: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000, "Le message ne peut pas dépasser 5000 caractères"),
});

// ──────────────────────────────────────────────
// CONTACT
// ──────────────────────────────────────────────

export const contactSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional().or(z.literal("")),
  sujet: z.string().min(3, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

// ──────────────────────────────────────────────
// PROFIL UTILISATEUR
// ──────────────────────────────────────────────

export const profileSchema = z.object({
  prenom: z.string().min(2).max(50),
  nom: z.string().min(2).max(50),
  telephone: z
    .string()
    .regex(/^(?:\+33|0)[1-9](?:\d{8})$/, "Numéro invalide")
    .optional()
    .or(z.literal("")),
  adresse: z.string().max(200).optional().or(z.literal("")),
  ville: z.string().max(100).optional().or(z.literal("")),
  codePostal: z
    .string()
    .regex(/^\d{5}$/, "Code postal invalide")
    .optional()
    .or(z.literal("")),
});

// ──────────────────────────────────────────────
// TYPES INFÉRÉS
// ──────────────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterStep1Input = z.infer<typeof registerStep1Schema>;
export type RegisterStep2Input = z.infer<typeof registerStep2Schema>;
export type RegisterStep3Input = z.infer<typeof registerStep3Schema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
