import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      avatarData: true,
      avatarMime: true,
      createdAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const formData = await req.formData();
  const name = formData.get("name") as string | null;
  const bio = formData.get("bio") as string | null;
  const avatar = formData.get("avatar") as File | null;

  let avatarData: Uint8Array<ArrayBuffer> | undefined;
  let avatarMime: string | undefined;

  if (avatar && avatar.size > 0) {
    const bytes = (await avatar.arrayBuffer()) as ArrayBuffer;
    avatarData = new Uint8Array(bytes);
    avatarMime = avatar.type;
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name && { name }),
      ...(bio !== null && { bio }),
      ...(avatarData && { avatarData, avatarMime }),
    },
  });

  return NextResponse.json({ id: user.id, name: user.name, email: user.email });
}
