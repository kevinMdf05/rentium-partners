import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MesBiensContent } from "@/components/dashboard/mes-biens-content";

export const metadata = {
  title: "Mes biens",
};

export default async function MesBiensPage() {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const properties = await db.property.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { documents: true } },
    },
  });

  return (
    <MesBiensContent
      properties={properties.map((p) => ({
        id: p.id,
        typeBien: p.typeBien,
        nom: p.nom,
        adresse: p.adresse,
        ville: p.ville,
        codePostal: p.codePostal,
        regimeFiscal: p.regimeFiscal,
        valeurBien: p.valeurBien,
        loyerMensuel: p.loyerMensuel,
        dateAchat: p.dateAchat?.toISOString() ?? null,
        documentsCount: p._count.documents,
      }))}
    />
  );
}
