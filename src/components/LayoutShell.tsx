"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "next/link";
import { Moon } from "lucide-react";

const authRoutes = ["/login", "/register"];

function AuthNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2328] bg-[#0d0d0d]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-xl font-bold text-white tracking-tight"
        >
          &lt;M/&gt;
        </Link>
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
