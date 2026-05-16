import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import LayoutShell from "@/components/LayoutShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechBlog — Explore o Futuro da Tecnologia",
  description:
    "Artigos sobre IA, desenvolvimento, DevOps e as últimas tendências tecnológicas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#0d0d0d] text-white antialiased`}
      >
        <SessionProvider>
          <LayoutShell>{children}</LayoutShell>
        </SessionProvider>
      </body>
    </html>
  );
}
