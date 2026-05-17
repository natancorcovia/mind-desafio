import Link from "next/link";
import Image from "next/image";
import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
  subsets: ["latin"],
  weight: "400",
});

export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex justify-between items-start">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/">
              <span
                className={`${irishGrover.className} text-3xl leading-none cursor-pointer`}
                style={{
                  color: "var(--text-primary)",
                }}
              >
                {"<M/>"}
              </span>
            </Link>

            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Seu portal de tecnologia com artigos, tutoriais e novidades do
              mundo tech.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            {/* Navegação */}
            <div>
              <h4
                className="text-sm font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Navegação
              </h4>

              <ul className="space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "Artigos", href: "/articles" },
                  { label: "Dashboard", href: "/dashboard" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Redes sociais */}
            <div>
              <h4
                className="text-sm font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Redes Sociais
              </h4>

              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/icons/linkedin.svg"
                    alt="Linkedin"
                    width={20}
                    height={20}
                  />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/icons/github.svg"
                    alt="Github"
                    width={20}
                    height={20}
                  />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/icons/twitter.svg"
                    alt="Twitter"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-10 border-t pt-6 text-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 TechBlog. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
