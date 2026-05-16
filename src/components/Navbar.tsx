"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Moon, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function ProfileMenu({ name, email }: { name: string; email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-[#1e2328] border border-[#00d4d4] flex items-center justify-center text-xs font-bold text-white hover:border-[#00bfbf] transition-colors"
      >
        {name.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 w-56 bg-[#131619] border border-[#00d4d4]/40 rounded-lg overflow-hidden z-50 shadow-xl">
          {/* Perfil */}
          <div className="flex items-center gap-3 p-4 border-b border-[#1e2328]">
            <div className="w-10 h-10 rounded-full bg-[#1e2328] border border-[#00d4d4]/30 flex items-center justify-center text-sm font-bold text-white shrink-0">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">
                {name}
              </span>
              <span className="text-xs text-white/40 truncate">{email}</span>
            </div>
          </div>

          {/* Links */}
          <div className="py-1 border-b border-[#1e2328]">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#1a1f24] transition-colors"
            >
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#1a1f24] transition-colors"
            >
              <Settings size={15} />
              Configurações
            </Link>
          </div>

          {/* Sair */}
          <div className="py-1">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#1a1f24] transition-colors"
            >
              <LogOut size={15} />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
              <Link
                href="/articles/new"
                className="rounded bg-[#00d4d4] px-4 py-1.5 text-sm font-medium text-black hover:bg-[#00bfbf] transition-colors"
              >
                Escrever
              </Link>
              <ProfileMenu
                name={session.user.name ?? "Usuário"}
                email={session.user.email ?? ""}
              />
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
