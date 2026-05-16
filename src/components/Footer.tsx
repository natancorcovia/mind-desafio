import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e2328] bg-[#0d0d0d] mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex justify-between items-start">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="font-mono text-xl font-bold text-white">
              &lt;M/&gt;
            </span>
            <p className="mt-3 text-sm text-white/40 leading-relaxed">
              Seu portal de tecnologia com artigos, tutoriais e novidades do
              mundo tech.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Navegação
              </h4>
              <ul className="space-y-2">
                {["Home", "Artigos", "Dashboard"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Redes Sociais
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1e2328] pt-6 text-center">
          <p className="text-xs text-white/30">
            © 2025 TechBlog. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
