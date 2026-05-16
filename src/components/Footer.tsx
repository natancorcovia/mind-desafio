import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex justify-between items-start">
          {/* Brand */}
          <div className="max-w-xs">
            <span
              className="font-mono text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              &lt;M/&gt;
            </span>
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
            <div>
              <h4
                className="text-sm font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Navegação
              </h4>
              <ul className="space-y-2">
                {["Home", "Artigos", "Dashboard"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-sm font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Redes Sociais
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

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
