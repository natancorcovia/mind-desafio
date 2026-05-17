import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Heart,
  TrendingUp,
  Settings,
  Plus,
  Pencil,
} from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

async function getDashboardData(userId: string) {
  const articles = await prisma.article.findMany({
    where: { authorId: userId },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { id: true, name: true } } },
  });
  return { articles };
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const { articles } = await getDashboardData(session.user.id);

  const totalWordCount = articles.reduce(
    (acc, a) => acc + a.content.trim().split(/\s+/).length,
    0,
  );
  const avgReadTime =
    articles.length > 0
      ? Math.max(1, Math.ceil(totalWordCount / articles.length / 200))
      : 0;

  const stats = [
    { label: "Total de Artigos", value: articles.length, icon: FileText },
    { label: "Engajamento", value: 4, icon: MessageSquare },
    { label: "Curtidas", value: 20, icon: Heart },
    {
      label: "Tempo médio de leitura",
      value: `${avgReadTime} min`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Dashboard
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              Bem-vindo de volta, {session.user.name}!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded transition-colors border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              <Settings size={14} />
              Configurações
            </Link>
            <Link
              href="/articles/new"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded transition-colors"
              style={{ backgroundColor: "var(--cyan)", color: "#000" }}
            >
              <Plus size={14} />
              Novo Artigo
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-5 flex flex-col gap-4 border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </span>
                <stat.icon size={16} style={{ color: "var(--text-muted)" }} />
              </div>
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meus Artigos */}
          <div
            className="lg:col-span-2 rounded-lg overflow-hidden border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <h2
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Meus Artigos
              </h2>
            </div>

            {articles.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Você ainda não publicou nenhum artigo.
                </p>
                <Link
                  href="/articles/new"
                  className="mt-3 inline-block text-sm transition-colors"
                  style={{ color: "var(--cyan)" }}
                >
                  Publicar primeiro artigo →
                </Link>
              </div>
            ) : (
              <div>
                {articles.map((article) => {
                  const date = new Date(article.publishedAt).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    },
                  );

                  return (
                    <div
                      key={article.id}
                      className="flex items-center gap-4 px-5 py-4 transition-colors border-t first:border-t-0"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {/* Thumb */}
                      <div className="w-16 h-12 shrink-0 rounded overflow-hidden">
                        {article.bannerData ? (
                          <img
                            src={`/api/articles/${article.id}/banner`}
                            alt="Banner"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="relative w-full h-full bg-[#f4a89a] flex items-end p-1 overflow-hidden">
                            <span className="font-serif text-xs font-black text-black leading-none z-10">
                              Lorem
                            </span>
                            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#c5d9f0] rounded-tl-full" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/articles/${article.id}`}>
                          <h3
                            className="text-sm font-medium truncate hover:opacity-70 transition-opacity"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {article.title}
                          </h3>
                        </Link>
                        <p
                          className="text-xs truncate mt-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {article.content.slice(0, 80)}...
                        </p>
                        <div
                          className="flex items-center gap-2 mt-1 text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <span>{date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare size={10} /> 2
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Heart size={10} /> 1
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1.5 shrink-0">
                        <Link
                          href={`/articles/${article.id}/edit`}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors border"
                          style={{
                            borderColor: "var(--border)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <Pencil size={11} />
                          Editar
                        </Link>
                        <DeleteButton articleId={article.id} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Atividade Recente */}
          <div
            className="rounded-lg overflow-hidden border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <h2
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Atividade Recente
              </h2>
            </div>

            <div>
              {[
                {
                  name: "Marie Smith",
                  action: "comentou em",
                  article: "O Futuro da Inteligência Artificial em 2025",
                  time: "5 min atrás",
                },
                {
                  name: "Marie Smith",
                  action: "comentou em",
                  article: "O Futuro da Inteligência Artificial em 2025",
                  time: "5 min atrás",
                },
                {
                  name: "Marie Smith",
                  action: "comentou em",
                  article: "O Futuro da Inteligência Artificial em 2025",
                  time: "5 min atrás",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-5 py-4 border-t first:border-t-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: "var(--surface-hover)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {activity.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {activity.name}
                      </span>{" "}
                      {activity.action}{" "}
                      <span style={{ color: "var(--cyan)" }}>
                        {activity.article}
                      </span>
                    </p>
                    <p
                      className="text-xs mt-1 flex items-center gap-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <MessageSquare size={10} />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
