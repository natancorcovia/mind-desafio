import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Eye, Heart, Share2, Bookmark } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";
import { getCategoryLabel } from "@/lib/categories";

async function getArticle(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [article, session] = await Promise.all([getArticle(id), auth()]);

  if (!article) notFound();

  const isAuthor = session?.user?.id === article.authorId;

  const date = new Date(article.publishedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const wordCount = article.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## "))
        return (
          <h2
            key={i}
            className="text-base font-bold mt-6 mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {line.replace("## ", "")}
          </h2>
        );
      if (line.startsWith("# "))
        return (
          <h1
            key={i}
            className="text-lg font-bold mt-6 mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {line.replace("# ", "")}
          </h1>
        );
      if (line.trim() === "") return <br key={i} />;
      return (
        <p
          key={i}
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Voltar */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm transition-colors mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={14} />
          Voltar aos Artigos
        </Link>

        {/* Categoria */}
        <div className="mb-4">
          <span
            className="text-xs border px-2 py-1 rounded"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--cyan) 10%, transparent)",
              color: "var(--cyan)",
              borderColor: "color-mix(in srgb, var(--cyan) 20%, transparent)",
            }}
          >
            {getCategoryLabel(article.category)}
          </span>
        </div>

        {/* Título */}
        <h1
          className="text-2xl font-bold leading-snug mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {article.title}
        </h1>

        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          Explorando as tendências e inovações que moldarão a tecnologia nos
          próximos anos.
        </p>

        {/* Autor + ações */}
        <div
          className="flex items-center justify-between py-4 border-y mb-6"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: "var(--surface-hover)",
                color: "var(--text-primary)",
              }}
            >
              {article.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {article.author.name}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {date}
              </p>
            </div>
            <span
              className="text-xs flex items-center gap-1 ml-2"
              style={{ color: "var(--text-muted)" }}
            >
              <Clock size={11} /> {readTime}min
            </span>
          </div>
          <div
            className="flex items-center gap-3"
            style={{ color: "var(--text-muted)" }}
          >
            <button className="hover:opacity-80 transition-opacity">
              <Heart size={16} />
            </button>
            <button className="hover:opacity-80 transition-opacity">
              <Bookmark size={16} />
            </button>
            <button className="hover:opacity-80 transition-opacity">
              <Share2 size={16} />
            </button>
            {isAuthor && (
              <Link
                href={`/articles/${article.id}/edit`}
                className="text-xs ml-2 transition-colors"
                style={{ color: "var(--cyan)" }}
              >
                Editar
              </Link>
            )}
            {isAuthor && <DeleteButton articleId={article.id} />}
          </div>
        </div>

        {/* Stats */}
        <div
          className="flex items-center gap-4 text-xs mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="flex items-center gap-1">
            <Clock size={11} /> {readTime} minuto{readTime > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={11} /> 122 visualizações
          </span>
          <span className="flex items-center gap-1">
            <Heart size={11} /> 1 comentário
          </span>
        </div>

        {/* Banner */}
        {article.bannerData ? (
          <div className="w-full rounded-lg overflow-hidden mb-8">
            <img
              src={`/api/articles/${article.id}/banner`}
              alt="Banner"
              className="w-full object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-video rounded-lg bg-[#f4a89a] flex items-end p-6 overflow-hidden mb-8">
            <span className="font-serif text-5xl font-black text-black leading-none z-10">
              Lorem
              <br />
              ipsum
            </span>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#c5d9f0] rounded-tl-full" />
          </div>
        )}

        {/* Conteúdo */}
        <article className="flex flex-col gap-1 mb-10">
          {renderContent(article.content)}
        </article>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-10">
          {[
            "Desenvolvimento web",
            "Inteligência Artificial",
            "Desenvolvimento backend",
          ].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Comentários */}
        <div className="border-t pt-8" style={{ borderColor: "var(--border)" }}>
          <h3
            className="text-sm font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Comentários
          </h3>

          <div className="flex flex-col gap-4 mb-6">
            {[
              {
                name: "John Doe",
                date: "20/01/2025",
                text: "Excelente artigo! Muito bem explicado sobre as tendências da IA.",
              },
              {
                name: "Maria Smith",
                date: "20/01/2025",
                text: "Artigo muito interessante, mostra claramente como a IA está deixando de ser tendência para se tornar essencial das soluções do dia a dia.",
              },
            ].map((comment, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: "var(--surface-hover)",
                    color: "var(--text-primary)",
                  }}
                >
                  {comment.name.charAt(0)}
                </div>
                <div
                  className="flex-1 rounded-lg p-3 border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {comment.name}
                    </span>
                    <div
                      className="flex items-center gap-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span className="text-xs">{comment.date}</span>
                      <Heart size={11} />
                      <span className="text-xs">0</span>
                    </div>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input comentário */}
          <div className="flex flex-col gap-2">
            <textarea
              rows={3}
              placeholder="Ótimo artigo. Esperando pelo próximo!"
              className="w-full text-sm rounded-lg px-4 py-3 outline-none transition-colors resize-none"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
            <button
              className="self-start text-xs font-medium px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: "var(--cyan)", color: "#000" }}
            >
              Publicar Comentário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
