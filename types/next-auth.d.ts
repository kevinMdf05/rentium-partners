import { DefaultSession, DefaultUser } from "next-auth";

/**
 * Extension des types NextAuth pour inclure les champs Rentium Partners
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      prenom: string;
      nom: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    prenom: string;
    nom: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    prenom: string;
    nom: string;
  }
}
