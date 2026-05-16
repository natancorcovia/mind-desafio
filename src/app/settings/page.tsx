"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Mail } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setName(data.name ?? "");
      setEmail(data.email ?? "");
      setBio(data.bio ?? "");
      setHasAvatar(!!data.avatarData);
      setCreatedAt(
        new Date(data.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      );
      setFetching(false);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Erro ao salvar alterações.");
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <p className="text-sm text-white/30">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] px-6 py-10">
      <div className="mx-auto max-w-lg">
        {/* Voltar */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Voltar ao Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            Configurações do Perfil
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Gerencie suas informações pessoais
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-[#131619] border border-[#1e2328] rounded-lg p-6 flex flex-col gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-[#1e2328] border border-[#1e2328] overflow-hidden flex items-center justify-center">
                {hasAvatar ? (
                  <img
                    src="/api/profile/avatar"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center gap-1.5 w-full">
                <label className="text-xs font-medium text-white/60">
                  Foto de Perfil
                </label>
                <input
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={() => setHasAvatar(false)}
                  className="w-full bg-[#0d0d0d] border border-[#1e2328] text-white/60 text-xs rounded px-3 py-2 outline-none focus:border-[#00d4d4] transition-colors file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#1e2328] file:text-white/60 file:text-xs cursor-pointer"
                />
                <span className="text-xs text-white/25">
                  Adicione uma imagem ou deixe em branco
                </span>
              </div>
            </div>

            <div className="border-t border-[#1e2328]" />

            {/* Nome */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">
                Nome Completo
              </label>
              <div className="relative">
                <User
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1e2328] text-white text-sm rounded px-3 py-2.5 pl-9 outline-none focus:border-[#00d4d4] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">Email</label>
              <div className="relative">
                <Mail
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  name="email"
                  type="email"
                  value={email}
                  disabled
                  className="w-full bg-[#0d0d0d] border border-[#1e2328] text-white/40 text-sm rounded px-3 py-2.5 pl-9 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">Bio</label>
              <textarea
                name="bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={500}
                placeholder="Desenvolvedor Full Stack apaixonado por tecnologia e inovação."
                className="w-full bg-[#0d0d0d] border border-[#1e2328] text-white text-sm rounded px-3 py-2.5 outline-none focus:border-[#00d4d4] transition-colors resize-none placeholder:text-white/20"
              />
              <span className="text-xs text-white/25">
                {bio.length}/500 caracteres
              </span>
            </div>

            <div className="border-t border-[#1e2328]" />

            {/* Info da conta */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-white">
                Informações da conta
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white/40 mb-1">Tipo de conta</p>
                  <p className="text-sm text-white">Admin</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Membro desde</p>
                  <p className="text-sm text-white">{createdAt}</p>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
                {error}
              </p>
            )}

            {success && (
              <p className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded px-3 py-2">
                Alterações salvas com sucesso!
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#00d4d4] text-black text-sm font-medium rounded hover:bg-[#00bfbf] transition-colors disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
