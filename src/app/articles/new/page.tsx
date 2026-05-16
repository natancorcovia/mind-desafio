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

  return (
    <div className="min-h-screen bg-[#0d0d0d] px-6 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Voltar ao Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8 pb-8 border-b border-[#1e2328]">
          <h1 className="text-2xl font-bold text-white">Criar Novo Artigo</h1>
          <p className="mt-1 text-sm text-white/40">
            Compartilhe seu conhecimento com a comunidade
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="bg-[#131619] border border-[#1e2328] rounded-lg p-6 flex flex-col gap-5">
            {/* Título */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">
                Título do Artigo <span className="text-[#00d4d4]">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                placeholder="O Futuro da Inteligência Artificial em 2025"
                className="bg-[#0d0d0d] border border-[#1e2328] text-white text-sm rounded px-3 py-2.5 outline-none focus:border-[#00d4d4] transition-colors placeholder:text-white/20"
              />
            </div>

            {/* Resumo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">
                Resumo <span className="text-[#00d4d4]">*</span>
              </label>
              <textarea
                name="summary"
                rows={3}
                placeholder="Desenvolvedor Full Stack apaixonado por tecnologia e inovação."
                className="bg-[#0d0d0d] border border-[#1e2328] text-white text-sm rounded px-3 py-2.5 outline-none focus:border-[#00d4d4] transition-colors placeholder:text-white/20 resize-none"
              />
              <span className="text-xs text-white/25">62/120 caracteres</span>
            </div>

            {/* Categoria */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">
                Categoria <span className="text-[#00d4d4]">*</span>
              </label>
              <select
                name="category"
                className="bg-[#0d0d0d] border border-[#1e2328] text-white text-sm rounded px-3 py-2.5 outline-none focus:border-[#00d4d4] transition-colors appearance-none cursor-pointer"
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
              <label className="text-xs font-medium text-white/60">
                Imagem de Capa
              </label>
              <input
                name="banner"
                type="file"
                accept="image/*"
                className="bg-[#0d0d0d] border border-[#1e2328] text-white/60 text-sm rounded px-3 py-2.5 outline-none focus:border-[#00d4d4] transition-colors file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#1e2328] file:text-white/60 file:text-xs cursor-pointer"
              />
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">
                Conteúdo do Artigo <span className="text-[#00d4d4]">*</span>
              </label>
              <textarea
                name="content"
                rows={14}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`## Título da seção\n\nEscreva o conteúdo do seu artigo aqui...`}
                className="bg-[#0d0d0d] border border-[#1e2328] text-white text-sm rounded px-3 py-2.5 outline-none focus:border-[#00d4d4] transition-colors placeholder:text-white/20 resize-none font-mono leading-relaxed"
              />
              <div className="flex items-center gap-4 text-xs text-white/25">
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
              className="flex-1 py-2.5 bg-[#00d4d4] text-black text-sm font-medium rounded hover:bg-[#00bfbf] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publicando..." : "Publicar Artigo"}
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 border border-[#1e2328] text-white text-sm font-medium rounded hover:bg-[#131619] transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
