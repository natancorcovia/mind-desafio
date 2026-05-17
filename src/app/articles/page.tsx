"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Eye,
  Heart,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  LayoutList,
} from "lucide-react";

type Article = {
  id: string;
  title: string;
  content: string;
  bannerData: string | null;
  publishedAt: string;
  author: { id: string; name: string };
};

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
              Desenvolvimento web
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

function ArticleListItem({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const wordCount = article.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Link href={`/articles/${article.id}`}>
      <div
        className="article-card rounded-lg overflow-hidden cursor-pointer transition-all duration-200 flex gap-4 p-4 border"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="w-32 h-24 shrink-0 rounded overflow-hidden">
          {article.bannerData ? (
            <img
              src={`/api/articles/${article.id}/banner`}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full bg-[#f4a89a] flex items-end p-2 overflow-hidden">
              <span className="font-serif text-lg font-black text-black leading-none z-10">
                Lorem
              </span>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#c5d9f0] rounded-tl-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 gap-2 justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--surface-hover)",
                  color: "var(--text-secondary)",
                }}
              >
                Desenvolvimento web
              </span>
              <span
                className="text-xs flex items-center gap-1"
                style={{ color: "var(--text-muted)" }}
              >
                <Clock size={11} /> {date}
              </span>
            </div>
            <h3
              className="font-bold text-sm leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              {article.title}
            </h3>
            <p
              className="text-xs line-clamp-2 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {article.content}
            </p>
          </div>
          <div className="flex items-center justify-between">
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

const CATEGORIES = [
  "Todos",
  "Desenvolvimento web",
  "Inteligência Artificial",
  "DevOps",
  "Mobile",
  "Segurança",
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);

  useEffect(() => {
    async function load() {
      const [articlesRes, sessionRes] = await Promise.all([
        fetch("/api/articles"),
        fetch("/api/auth/session"),
      ]);
      const articlesData = await articlesRes.json();
      const sessionData = await sessionRes.json();
      setArticles(articlesData);
      setSession(!!sessionData?.user);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = articles.filter(
    (a) =>
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Todos os Artigos
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              Explore nossa coleção completa de artigos técnicos
            </p>
          </div>
          {session && (
            <Link
              href="/articles/new"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded transition-colors"
              style={{ backgroundColor: "var(--cyan)", color: "#000" }}
            >
              <Plus size={14} />
              Novo Artigo
            </Link>
          )}
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm rounded px-3 py-2.5 pl-9 outline-none transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div className="relative">
            <Filter
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm rounded px-3 py-2.5 pl-9 outline-none transition-colors appearance-none cursor-pointer pr-8"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div
            className="flex items-center rounded overflow-hidden border"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              onClick={() => setLayout("grid")}
              className="p-2.5 transition-colors"
              style={{
                backgroundColor:
                  layout === "grid" ? "var(--cyan)" : "var(--surface)",
                color: layout === "grid" ? "#000" : "var(--text-muted)",
              }}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setLayout("list")}
              className="p-2.5 transition-colors"
              style={{
                backgroundColor:
                  layout === "list" ? "var(--cyan)" : "var(--surface)",
                color: layout === "list" ? "#000" : "var(--text-muted)",
              }}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>

        {/* Grid / List */}
        {loading ? (
          <div
            className="py-32 text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Carregando artigos...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Nenhum artigo encontrado.
            </p>
            {session && (
              <Link
                href="/articles/new"
                className="mt-4 inline-block text-sm transition-colors"
                style={{ color: "var(--cyan)" }}
              >
                Seja o primeiro a publicar →
              </Link>
            )}
          </div>
        ) : (
          <div
            className={
              layout === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "flex flex-col gap-4"
            }
          >
            {filtered.map((article) =>
              layout === "grid" ? (
                <ArticleCard key={article.id} article={article} />
              ) : (
                <ArticleListItem key={article.id} article={article} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
