import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return new NextResponse(null, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { avatarData: true, avatarMime: true },
  });

  if (!user?.avatarData) return new NextResponse(null, { status: 404 });

  return new NextResponse(user.avatarData, {
    headers: {
      "Content-Type": user.avatarMime ?? "image/jpeg",
      "Cache-Control": "no-cache",
    },
  });
}
