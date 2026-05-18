"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Moon, Sun, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
  subsets: ["latin"],
  weight: "400",
});

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
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--cyan)",
          color: "var(--text-primary)",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </button>

      {open && (
        <div
          className="absolute right-0 top-10 w-56 rounded-lg overflow-hidden z-50 shadow-xl border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--cyan)",
          }}
        >
          {/* Perfil */}
          <div
            className="flex items-center gap-3 p-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                backgroundColor: "var(--surface-hover)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className="text-sm font-medium truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {name}
              </span>
              <span
                className="text-xs truncate"
                style={{ color: "var(--text-muted)" }}
              >
                {email}
              </span>
            </div>
          </div>

          {/* Links */}
          <div
            className="py-1 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              <Settings size={15} />
              Configurações
            </Link>
          </div>

          {/* Sair */}
          <div className="py-1">
            <button
              onClick={() => signOut({ callbackUrl: window.location.origin })}
              className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
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
  const { theme, toggle } = useTheme();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 90%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          <span className={`${irishGrover.className} text-4xl leading-none`}>
            {"<M/>"}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            Home
          </Link>
          <Link
            href="/articles"
            className="text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            Artigos
          </Link>

          <button
            onClick={toggle}
            className="transition-colors cursor-pointer"
            style={{ color: "var(--text-muted)" }}
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {session ? (
            <div className="flex items-center gap-4">
              <Link
                href="/articles/new"
                className="rounded px-4 py-1.5 text-sm font-medium transition-colors"
                style={{ backgroundColor: "var(--cyan)", color: "#000" }}
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
                className="text-sm transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="rounded px-4 py-1.5 text-sm font-medium transition-colors"
                style={{ backgroundColor: "var(--cyan)", color: "#000" }}
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
