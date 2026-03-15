import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { DocumentsContent } from "@/components/dashboard/documents-content";

export const metadata = {
  title: "Documents",
};

export default async function DocumentsPage() {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const [documents, properties] = await Promise.all([
    db.document.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        property: { select: { nom: true, adresse: true } },
      },
    }),
    db.property.findMany({
      where: { userId: session.user.id },
      select: { id: true, nom: true, adresse: true },
    }),
  ]);

  return (
    <DocumentsContent
      documents={documents.map((d) => ({
        id: d.id,
        nomFichier: d.nomFichier,
        typeDocument: d.typeDocument,
        annee: d.annee,
        description: d.description,
        propertyName: d.property?.nom || d.property?.adresse || null,
        createdAt: d.createdAt.toISOString(),
      }))}
      properties={properties.map((p) => ({
        id: p.id,
        label: p.nom || p.adresse,
      }))}
    />
  );
}
