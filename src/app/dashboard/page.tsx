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

  const totalWordCount = articles.reduce((acc, a) => {
    return acc + a.content.trim().split(/\s+/).length;
  }, 0);
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
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-white/40">
              Bem-vindo de volta, {session.user.name}!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 border border-[#1e2328] text-white/70 text-sm px-4 py-2.5 rounded hover:bg-[#131619] transition-colors"
            >
              <Settings size={14} />
              Configurações
            </Link>
            <Link
              href="/articles/new"
              className="inline-flex items-center gap-2 bg-[#00d4d4] text-black text-sm font-medium px-4 py-2.5 rounded hover:bg-[#00bfbf] transition-colors"
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
              className="bg-[#131619] border border-[#1e2328] rounded-lg p-5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">{stat.label}</span>
                <stat.icon size={16} className="text-white/20" />
              </div>
              <span className="text-3xl font-bold text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meus Artigos */}
          <div className="lg:col-span-2 bg-[#131619] border border-[#1e2328] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1e2328]">
              <h2 className="text-sm font-bold text-white">Meus Artigos</h2>
            </div>

            {articles.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-white/30">
                  Você ainda não publicou nenhum artigo.
                </p>
                <Link
                  href="/articles/new"
                  className="mt-3 inline-block text-sm text-[#00d4d4] hover:text-[#00bfbf] transition-colors"
                >
                  Publicar primeiro artigo →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#1e2328]">
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
                      className="flex items-center gap-4 px-5 py-4 hover:bg-[#1a1f24] transition-colors"
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
                          <h3 className="text-sm font-medium text-white truncate hover:text-[#00d4d4] transition-colors">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-white/50 truncate mt-0.5">
                          {article.content.slice(0, 80)}...
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-white/30">
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
                          className="inline-flex items-center gap-1.5 text-xs border border-[#1e2328] text-white/60 px-3 py-1.5 rounded hover:bg-[#1e2328] transition-colors"
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
          <div className="bg-[#131619] border border-[#1e2328] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1e2328]">
              <h2 className="text-sm font-bold text-white">
                Atividade Recente
              </h2>
            </div>

            <div className="divide-y divide-[#1e2328]">
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
                <div key={i} className="flex items-start gap-3 px-5 py-4">
                  <div className="w-8 h-8 rounded-full bg-[#1e2328] flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {activity.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70 leading-relaxed">
                      <span className="font-medium text-white">
                        {activity.name}
                      </span>{" "}
                      {activity.action}{" "}
                      <span className="text-[#00d4d4]">{activity.article}</span>
                    </p>
                    <p className="text-xs text-white/30 mt-1 flex items-center gap-1">
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
