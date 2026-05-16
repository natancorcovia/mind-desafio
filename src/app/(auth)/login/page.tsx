"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-mono text-2xl font-bold text-white">
            &lt;M/&gt;
          </Link>
          <h1 className="mt-4 text-xl font-bold text-white">Entrar na conta</h1>
          <p className="mt-1 text-sm text-white/40">Bem-vindo de volta</p>
        </div>

        {/* Form */}
        <div className="bg-[#131619] border border-[#1e2328] rounded-lg p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="bg-[#0d0d0d] border border-[#1e2328] text-white text-sm rounded px-3 py-2.5 outline-none focus:border-[#00d4d4] transition-colors placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">Senha</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="bg-[#0d0d0d] border border-[#1e2328] text-white text-sm rounded px-3 py-2.5 outline-none focus:border-[#00d4d4] transition-colors placeholder:text-white/20"
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
              className="mt-2 w-full py-2.5 bg-[#00d4d4] text-black text-sm font-medium rounded hover:bg-[#00bfbf] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-white/40">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="text-[#00d4d4] hover:text-[#00bfbf] transition-colors"
          >
            Cadastrar
          </Link>
        </p>
      </div>
    </div>
  );
}
