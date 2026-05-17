"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
  subsets: ["latin"],
  weight: "400",
});

const authRoutes = ["/login", "/register"];

function AuthNavbar() {
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
            className="transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = authRoutes.includes(pathname);

  return (
    <>
      {isAuthPage ? <AuthNavbar /> : <Navbar />}
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
