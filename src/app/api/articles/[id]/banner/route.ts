import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    select: { bannerData: true, bannerMimeType: true },
  });

  if (!article?.bannerData) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(article.bannerData, {
    headers: {
      "Content-Type": article.bannerMimeType ?? "image/jpeg",
      "Cache-Control": "public, max-age=31536000",
    },
  });
}
