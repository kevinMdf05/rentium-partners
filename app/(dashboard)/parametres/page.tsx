import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ParametresContent } from "@/components/dashboard/parametres-content";

export const metadata = {
  title: "Paramètres",
};

export default async function ParametresPage() {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      prenom: true,
      nom: true,
      email: true,
      telephone: true,
      adresse: true,
      ville: true,
      codePostal: true,
      twoFactorEnabled: true,
      codeParrainage: true,
      createdAt: true,
    },
  });

  if (!user) redirect("/connexion");

  return (
    <ParametresContent
      user={{
        ...user,
        telephone: user.telephone ?? "",
        adresse: user.adresse ?? "",
        ville: user.ville ?? "",
        codePostal: user.codePostal ?? "",
        codeParrainage: user.codeParrainage ?? "",
        createdAt: user.createdAt.toISOString(),
      }}
    />
  );
}
