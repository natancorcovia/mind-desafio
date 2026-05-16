import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/articles/:id — busca um artigo
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true },
      },
    },
  });

  if (!article) {
    return NextResponse.json(
      { error: "Artigo não encontrado." },
      { status: 404 },
    );
  }

  return NextResponse.json(article);
}

// PATCH /api/articles/:id — edita (apenas o autor)
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

  const { title, content, bannerUrl } = await req.json();

  const updated = await prisma.article.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(content && { content }),
      ...(bannerUrl !== undefined && { bannerUrl }),
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/articles/:id — remove (apenas o autor)
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
