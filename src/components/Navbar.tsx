"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Moon } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2328] bg-[#0d0d0d]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-xl font-bold text-white tracking-tight"
        >
          &lt;M/&gt;
        </Link>

        {/* Links + ações */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/articles"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Artigos
          </Link>

          <button className="text-white/60 hover:text-white transition-colors">
            <Moon size={16} />
          </button>

          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60">{session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Sair
              </button>
              <Link
                href="/articles/new"
                className="rounded bg-[#00d4d4] px-4 py-1.5 text-sm font-medium text-black hover:bg-[#00bfbf] transition-colors"
              >
                Escrever
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="rounded bg-[#00d4d4] px-4 py-1.5 text-sm font-medium text-black hover:bg-[#00bfbf] transition-colors"
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
