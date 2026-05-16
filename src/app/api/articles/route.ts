import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

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

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const banner = formData.get("banner") as File | null;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Título e conteúdo são obrigatórios." },
      { status: 400 },
    );
  }

  let bannerData: Uint8Array<ArrayBuffer> | null = null;
  let bannerMimeType: string | null = null;

  if (banner && banner.size > 0) {
    const bytes = (await banner.arrayBuffer()) as ArrayBuffer;
    bannerData = new Uint8Array(bytes);
    bannerMimeType = banner.type;
  }

  const article = await prisma.article.create({
    data: {
      title,
      content,
      bannerData,
      bannerMimeType,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(article, { status: 201 });
}
