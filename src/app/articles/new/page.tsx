"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/articles", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Erro ao publicar artigo.");
      return;
    }

    router.push(`/articles/${data.id}`);
    router.refresh();
  }

  const wordCount =
    content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
  const charCount = content.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const inputStyle = {
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm transition-colors mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={14} />
          Voltar ao Dashboard
        </Link>

        {/* Header */}
        <div
          className="mb-8 pb-8 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Criar Novo Artigo
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            Compartilhe seu conhecimento com a comunidade
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div
            className="rounded-lg p-6 flex flex-col gap-5 border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            {/* Título */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Título do Artigo <span style={{ color: "var(--cyan)" }}>*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                placeholder="O Futuro da Inteligência Artificial em 2026"
                className="text-sm rounded px-3 py-2.5 outline-none transition-colors"
                style={inputStyle}
              />
            </div>

            {/* Resumo */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Resumo <span style={{ color: "var(--cyan)" }}>*</span>
              </label>
              <textarea
                name="summary"
                rows={3}
                placeholder="Breve descrição do artigo..."
                className="text-sm rounded px-3 py-2.5 outline-none transition-colors resize-none"
                style={inputStyle}
              />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                62/120 caracteres
              </span>
            </div>

            {/* Categoria */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Categoria <span style={{ color: "var(--cyan)" }}>*</span>
              </label>
              <select
                name="category"
                className="text-sm rounded px-3 py-2.5 outline-none transition-colors appearance-none cursor-pointer"
                style={inputStyle}
              >
                <option value="desenvolvimento-web">Desenvolvimento web</option>
                <option value="ia">Inteligência Artificial</option>
                <option value="devops">DevOps</option>
                <option value="mobile">Mobile</option>
                <option value="seguranca">Segurança</option>
              </select>
            </div>

            {/* Imagem de Capa */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Imagem de Capa
              </label>
              <input
                name="banner"
                type="file"
                accept="image/*"
                className="text-sm rounded px-3 py-2.5 outline-none transition-colors cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs"
                style={{
                  ...inputStyle,
                  color: "var(--text-muted)",
                }}
              />
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Conteúdo do Artigo{" "}
                <span style={{ color: "var(--cyan)" }}>*</span>
              </label>
              <textarea
                name="content"
                rows={14}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`## Título da seção\n\nEscreva o conteúdo do seu artigo aqui...`}
                className="text-sm rounded px-3 py-2.5 outline-none transition-colors resize-none font-mono leading-relaxed"
                style={inputStyle}
              />
              <div
                className="flex items-center gap-4 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                <span>{charCount}/6500 caracteres</span>
                <span>• {wordCount} palavras</span>
                <span>
                  • {readTime} minuto{readTime > 1 ? "s" : ""} de leitura
                </span>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 text-sm font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--cyan)", color: "#000" }}
            >
              {loading ? "Publicando..." : "Publicar Artigo"}
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 text-sm font-medium rounded transition-colors border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
