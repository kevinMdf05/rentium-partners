import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MessagerieContent } from "@/components/dashboard/messagerie-content";

export const metadata = {
  title: "Messagerie",
};

export default async function MessageriePage() {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const messages = await db.message.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <MessagerieContent
      messages={messages.map((m) => ({
        id: m.id,
        expediteur: m.expediteur,
        sujet: m.sujet,
        contenu: m.contenu,
        lu: m.lu,
        createdAt: m.createdAt.toISOString(),
      }))}
    />
  );
}
