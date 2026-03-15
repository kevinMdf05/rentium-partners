import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * GET — Récupérer les notifications de l'utilisateur
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const unreadOnly = searchParams.get("unread") === "true";

  const notifications = await db.notification.findMany({
    where: {
      userId: session.user.id,
      ...(unreadOnly ? { lu: false } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(notifications);
}

/**
 * PATCH — Marquer les notifications comme lues
 */
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { ids, markAll } = body;

  if (markAll) {
    await db.notification.updateMany({
      where: { userId: session.user.id, lu: false },
      data: { lu: true },
    });
  } else if (ids && Array.isArray(ids)) {
    await db.notification.updateMany({
      where: {
        id: { in: ids },
        userId: session.user.id,
      },
      data: { lu: true },
    });
  }

  return NextResponse.json({ success: true });
}
