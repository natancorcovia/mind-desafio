import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  });

  if (!article) {
    return NextResponse.json(
      { error: "Artigo não encontrado." },
      { status: 404 },
    );
  }

  return NextResponse.json(article);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) {
    return NextResponse.json(
      { error: "Artigo não encontrado." },
      { status: 404 },
    );
  }

  if (article.authorId !== session.user.id) {
    return NextResponse.json({ error: "Proibido." }, { status: 403 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string | null;
  const content = formData.get("content") as string | null;
  const banner = formData.get("banner") as File | null;

  let bannerData: Uint8Array<ArrayBuffer> | undefined;
  let bannerMimeType: string | undefined;

  if (banner && banner.size > 0) {
    const bytes = (await banner.arrayBuffer()) as ArrayBuffer;
    bannerData = new Uint8Array(bytes);
    bannerMimeType = banner.type;
  }

  const updated = await prisma.article.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(content && { content }),
      ...(bannerData && { bannerData, bannerMimeType }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) {
    return NextResponse.json(
      { error: "Artigo não encontrado." },
      { status: 404 },
    );
  }

  if (article.authorId !== session.user.id) {
    return NextResponse.json({ error: "Proibido." }, { status: 403 });
  }

  await prisma.article.delete({ where: { id } });

  return NextResponse.json({ message: "Artigo removido." });
}
