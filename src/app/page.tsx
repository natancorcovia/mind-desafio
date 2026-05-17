import Link from "next/link";
import { Clock, Eye, Heart, ArrowRight, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCategoryLabel } from "@/lib/categories";

async function getArticles() {
  return prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { id: true, name: true } } },
  });
}

type Article = Awaited<ReturnType<typeof getArticles>>[0];

function ArticleBanner({
  articleId,
  hasBanner,
}: {
  articleId: string;
  hasBanner: boolean;
}) {
  if (hasBanner) {
    return (
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={`/api/articles/${articleId}/banner`}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-video bg-[#f4a89a] flex items-end p-4 overflow-hidden">
      <span className="font-serif text-4xl font-black text-black leading-none z-10">
        Lorem
        <br />
        ipsum
      </span>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#c5d9f0] rounded-tl-full" />
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const wordCount = article.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Link href={`/articles/${article.id}`} className="h-full">
      <div
        className="article-card rounded-lg overflow-hidden cursor-pointer transition-all duration-200 h-full flex flex-col border"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <ArticleBanner
          articleId={article.id}
          hasBanner={!!article.bannerData}
        />
        <div className="p-4 flex flex-col flex-1 gap-3">
          <div className="flex items-center justify-between">
            <span
              className="text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: "var(--surface-hover)",
                color: "var(--text-secondary)",
              }}
            >
              {getCategoryLabel(article.category)}
            </span>
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: "var(--text-muted)" }}
            >
              <Clock size={12} />
              {date}
            </span>
          </div>
          <h3
            className="font-bold text-sm leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {article.title}
          </h3>
          <p
            className="text-xs leading-relaxed line-clamp-3 flex-1"
            style={{ color: "var(--text-muted)" }}
          >
            {article.content}
          </p>
          <div
            className="flex items-center justify-between pt-1 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {article.author.name}
            </span>
            <div
              className="flex items-center gap-3"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="flex items-center gap-1 text-xs">
                <Clock size={11} /> {readTime}min
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Eye size={11} /> 122
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Heart size={11} /> 1
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div
      className="col-span-3 py-16 text-center text-sm"
      style={{ color: "var(--text-muted)" }}
    >
      {message}
    </div>
  );
}

export default async function Home() {
  const articles = await getArticles();
  const featured = articles.slice(0, 3);
  const recent = articles.slice(3, 9);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 min-h-[80vh]">
        <h1
          className="text-5xl font-bold leading-tight max-w-xl"
          style={{ color: "var(--text-primary)" }}
        >
          Explore o Futuro da{" "}
          <span style={{ color: "var(--cyan)" }}>Tecnologia</span>
        </h1>
        <p
          className="mt-6 text-lg max-w-md leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Artigos sobre IA, desenvolvimento, DevOps e as últimas tendências
          tecnológicas
        </p>
        <div className="mt-10 flex flex-col gap-3 w-full max-w-sm">
          <Link
            href="/articles"
            className="w-full py-3 font-medium rounded text-sm transition-colors"
            style={{ backgroundColor: "var(--cyan)", color: "#000" }}
          >
            Explorar Artigos
          </Link>
          <Link
            href="/register"
            className="w-full py-3 font-medium rounded text-sm transition-colors border"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-primary)",
              backgroundColor: "transparent",
            }}
          >
            Começar a Escrever
          </Link>
        </div>
      </section>

      {/* Artigos em Destaque */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Artigos em Destaque
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Os melhores conteúdos selecionados para você
            </p>
          </div>
          <Link
            href="/articles"
            className="flex items-center gap-1 text-sm transition-colors"
            style={{ color: "var(--cyan)" }}
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.length === 0 ? (
            <EmptyState message="Nenhum artigo publicado ainda." />
          ) : (
            featured.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
      </section>

      {/* Artigos Recentes */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Artigos Recentes
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Conteúdo recente da comunidade
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recent.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section
        className="border-y py-16 px-6"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto max-w-xl text-center">
          <div
            className="w-12 h-12 border rounded flex items-center justify-center mx-auto mb-5"
            style={{ borderColor: "var(--border)" }}
          >
            <Mail size={20} style={{ color: "var(--text-primary)" }} />
          </div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Newsletter Semanal
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Receba os melhores artigos de tecnologia diretamente no seu email.
            <br />
            Sem spam, apenas conteúdo de qualidade.
          </p>
          <div className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="exemplo@email.com"
              className="flex-1 text-sm rounded px-4 py-2.5 outline-none transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
            <button
              className="text-sm font-medium px-5 py-2.5 rounded transition-colors"
              style={{ backgroundColor: "var(--cyan)", color: "#000" }}
            >
              Inscrever
            </button>
          </div>
          <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
            Mais de 10.000 desenvolvedores já recebem nossa newsletter
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Compartilhe Seu Conhecimento
        </h2>
        <p
          className="mt-4 text-sm max-w-md mx-auto leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Junte-se à nossa comunidade de escritores e compartilhe suas
          experiências e conhecimentos em tecnologia
        </p>
        <Link
          href="/register"
          className="mt-8 inline-block text-sm font-medium px-8 py-3 rounded transition-colors"
          style={{ backgroundColor: "var(--cyan)", color: "#000" }}
        >
          Criar Conta Gratuita
        </Link>
      </section>
    </div>
  );
}
