import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations";

/**
 * Configuration NextAuth v5 — Authentification production-ready
 * - Provider Credentials (email + mot de passe)
 * - JWT pour les sessions (stateless, performant)
 * - Adapter Prisma pour la persistence
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as NextAuthConfig["adapter"],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  pages: {
    signIn: "/connexion",
    error: "/connexion",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        // Validation des entrées avec Zod
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Recherche de l'utilisateur
        const user = await db.user.findUnique({
          where: { email: email.toLowerCase() },
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            passwordHash: true,
            role: true,
            statut: true,
            emailVerified: true,
            image: true,
          },
        });

        if (!user || !user.passwordHash) return null;

        // Vérification du statut du compte
        if (user.statut !== "ACTIF") return null;

        // Vérification du mot de passe avec bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.prenom} ${user.nom}`,
          image: user.image,
          role: user.role,
          prenom: user.prenom,
          nom: user.nom,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
        token.prenom = (user as { prenom: string }).prenom;
        token.nom = (user as { nom: string }).nom;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.prenom = token.prenom as string;
        session.user.nom = token.nom as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // Log de connexion réussie (géolocalisation ajoutée côté API)
      if (user.id) {
        await db.loginLog.create({
          data: {
            userId: user.id,
            ipAddress: "server",
            succes: true,
          },
        }).catch(() => {
          // Ne pas bloquer la connexion si le log échoue
        });
      }
    },
  },
});
