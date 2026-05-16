import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/articles — lista todos os artigos
export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    include: {
      author: {
        select: { id: true, name: true },
      },
    },
  });

  return NextResponse.json(articles);
}

// POST /api/articles — cria um artigo (autenticado)
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { title, content, bannerUrl } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "Título e conteúdo são obrigatórios." },
      { status: 400 },
    );
  }

  const article = await prisma.article.create({
    data: {
      title,
      content,
      bannerUrl: bannerUrl ?? null,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(article, { status: 201 });
}
