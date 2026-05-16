import Link from "next/link";
import { Clock, Eye, Heart, ArrowRight, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getArticles() {
  return prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    include: {
      author: {
        select: { id: true, name: true },
      },
    },
  });
}

type Article = Awaited<ReturnType<typeof getArticles>>[0];

function ArticleBanner() {
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

function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const date = new Date(article.publishedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/articles/${article.id}`} className="h-full">
      <div
        className={`rounded-lg bg-[#131619] border overflow-hidden cursor-pointer transition-all duration-200 hover:border-[#00d4d4]/60 h-full flex flex-col ${
          featured ? "border-[#00d4d4]" : "border-[#1e2328]"
        }`}
      >
        <ArticleBanner />

        <div className="p-4 flex flex-col flex-1 gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs bg-[#1e2328] text-white/70 px-2 py-1 rounded">
              Desenvolvimento web
            </span>
            <span className="text-xs text-white/40 flex items-center gap-1">
              <Clock size={12} />
              {date}
            </span>
          </div>

          <h3
            className={`font-bold text-sm leading-snug ${
              featured ? "text-[#00d4d4]" : "text-white"
            }`}
          >
            {article.title}
          </h3>

          <p className="text-xs text-white/50 leading-relaxed line-clamp-3 flex-1">
            {article.content}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-[#1e2328]">
            <span className="text-xs text-white/40">{article.author.name}</span>
            <div className="flex items-center gap-3 text-white/30">
              <span className="flex items-center gap-1 text-xs">
                <Clock size={11} /> 6min
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
    <div className="col-span-3 py-16 text-center text-white/30 text-sm">
      {message}
    </div>
  );
}

export default async function Home() {
  const articles = await getArticles();
  const featured = articles.slice(0, 3);
  const recent = articles.slice(3, 7);

  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 min-h-[80vh]">
        <h1 className="text-5xl font-bold text-white leading-tight max-w-xl">
          Explore o Futuro da <span className="text-[#00d4d4]">Tecnologia</span>
        </h1>
        <p className="mt-6 text-lg text-white/50 max-w-md leading-relaxed">
          Artigos sobre IA, desenvolvimento, DevOps e as últimas tendências
          tecnológicas
        </p>
        <div className="mt-10 flex flex-col gap-3 w-full max-w-sm">
          <Link
            href="/articles"
            className="w-full py-3 bg-[#00d4d4] text-black font-medium rounded text-sm hover:bg-[#00bfbf] transition-colors"
          >
            Explorar Artigos
          </Link>
          <Link
            href="/register"
            className="w-full py-3 border border-[#1e2328] text-white font-medium rounded text-sm hover:bg-[#131619] transition-colors"
          >
            Começar a Escrever
          </Link>
        </div>
      </section>

      {/* Artigos em Destaque */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Artigos em Destaque
            </h2>
            <p className="text-sm text-white/40 mt-1">
              Os melhores conteúdos selecionados para você
            </p>
          </div>
          <Link
            href="/articles"
            className="flex items-center gap-1 text-sm text-[#00d4d4] hover:text-[#00bfbf] transition-colors"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.length === 0 ? (
            <EmptyState message="Nenhum artigo publicado ainda." />
          ) : (
            featured.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                featured={i === 1}
              />
            ))
          )}
        </div>
      </section>

      {/* Artigos Recentes */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Artigos Recentes</h2>
            <p className="text-sm text-white/40 mt-1">
              Conteúdo recente da comunidade
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recent.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                featured={i === 1}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-[#0d1117] border-y border-[#1e2328] py-16 px-6">
        <div className="mx-auto max-w-xl text-center">
          <div className="w-12 h-12 border border-[#1e2328] rounded flex items-center justify-center mx-auto mb-5">
            <Mail size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Newsletter Semanal</h2>
          <p className="mt-3 text-sm text-white/40 leading-relaxed">
            Receba os melhores artigos de tecnologia diretamente no seu email.
            <br />
            Sem spam, apenas conteúdo de qualidade.
          </p>
          <div className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="exemplo@email.com"
              className="flex-1 bg-[#131619] border border-[#1e2328] text-white text-sm rounded px-4 py-2.5 outline-none focus:border-[#00d4d4] transition-colors placeholder:text-white/20"
            />
            <button className="bg-[#00d4d4] text-black text-sm font-medium px-5 py-2.5 rounded hover:bg-[#00bfbf] transition-colors">
              Inscrever
            </button>
          </div>
          <p className="mt-3 text-xs text-white/25">
            Mais de 10.000 desenvolvedores já recebem nossa newsletter
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white">
          Compartilhe Seu Conhecimento
        </h2>
        <p className="mt-4 text-sm text-white/40 max-w-md mx-auto leading-relaxed">
          Junte-se à nossa comunidade de escritores e compartilhe suas
          experiências e conhecimentos em tecnologia
        </p>
        <Link
          href="/register"
          className="mt-8 inline-block bg-[#00d4d4] text-black text-sm font-medium px-8 py-3 rounded hover:bg-[#00bfbf] transition-colors"
        >
          Criar Conta Gratuita
        </Link>
      </section>
    </div>
  );
}
