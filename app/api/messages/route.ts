import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { messageSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const messages = await db.message.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = messageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Données invalides" },
      { status: 400 }
    );
  }

  const message = await db.message.create({
    data: {
      userId: session.user.id,
      expediteur: "CLIENT",
      sujet: parsed.data.sujet,
      contenu: parsed.data.contenu,
    },
  });

  return NextResponse.json(message, { status: 201 });
}
