"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
  subsets: ["latin"],
  weight: "400",
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email ou senha inválidos.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  const inputStyle = {
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-mono text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            <span className={`${irishGrover.className} text-4xl leading-none`}>
              {"<M/>"}
            </span>
          </Link>
          <h1
            className="mt-4 text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Entrar na conta
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            Bem-vindo de volta
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-lg p-6 border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="text-sm rounded px-3 py-2.5 outline-none transition-colors placeholder:opacity-30"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Senha
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="text-sm rounded px-3 py-2.5 outline-none transition-colors placeholder:opacity-30"
                style={inputStyle}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-2.5 text-sm font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--cyan)", color: "#000" }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p
          className="mt-4 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Não tem conta?{" "}
          <Link
            href="/register"
            className="transition-colors"
            style={{ color: "var(--cyan)" }}
          >
            Cadastrar
          </Link>
        </p>
      </div>
    </div>
  );
}
