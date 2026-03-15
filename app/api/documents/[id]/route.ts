import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const document = await db.document.findFirst({
    where: { id, userId: session.user.id },
    include: { property: { select: { nom: true, adresse: true } } },
  });

  if (!document) {
    return NextResponse.json({ error: "Document non trouvé" }, { status: 404 });
  }

  return NextResponse.json(document);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const document = await db.document.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  });

  if (!document) {
    return NextResponse.json({ error: "Document non trouvé" }, { status: 404 });
  }

  await db.document.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
