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

  const inputStyle = {
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  if (fetching) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Carregando...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-lg">
        {/* Voltar */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm transition-colors mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={14} />
          Voltar ao Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Configurações do Perfil
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            Gerencie suas informações pessoais
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            className="rounded-lg p-6 flex flex-col gap-6 border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border"
                style={{
                  backgroundColor: "var(--surface-hover)",
                  borderColor: "var(--border)",
                }}
              >
                {hasAvatar ? (
                  <img
                    src="/api/profile/avatar"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center gap-1.5 w-full">
                <label
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Foto de Perfil
                </label>
                <input
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={() => setHasAvatar(false)}
                  className="w-full text-xs rounded px-3 py-2 outline-none transition-colors cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs"
                  style={{ ...inputStyle, color: "var(--text-muted)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Adicione uma imagem ou deixe em branco
                </span>
              </div>
            </div>

            <div
              className="border-t"
              style={{ borderColor: "var(--border)" }}
            />

            {/* Nome */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Nome Completo
              </label>
              <div className="relative">
                <User
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm rounded px-3 py-2.5 pl-9 outline-none transition-colors"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  name="email"
                  type="email"
                  value={email}
                  disabled
                  className="w-full text-sm rounded px-3 py-2.5 pl-9 outline-none cursor-not-allowed"
                  style={{ ...inputStyle, opacity: 0.5 }}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={500}
                placeholder="Desenvolvedor Full Stack apaixonado por tecnologia e inovação."
                className="w-full text-sm rounded px-3 py-2.5 outline-none transition-colors resize-none"
                style={inputStyle}
              />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {bio.length}/500 caracteres
              </span>
            </div>

            <div
              className="border-t"
              style={{ borderColor: "var(--border)" }}
            />

            {/* Info da conta */}
            <div className="flex flex-col gap-3">
              <h3
                className="text-xs font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Informações da conta
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Tipo de conta
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Admin
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Membro desde
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {createdAt}
                  </p>
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
              className="w-full py-2.5 text-sm font-medium rounded transition-colors disabled:opacity-50"
              style={{ backgroundColor: "var(--cyan)", color: "#000" }}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
