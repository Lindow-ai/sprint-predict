import { Logo } from "@/components/logo";
import Link from "next/link";

const cols = [
  {
    title: "Produit",
    links: [
      { label: "Comment ça marche", href: "#how" },
      { label: "Fonctionnalités", href: "#features" },
      { label: "Démo", href: "#demo" },
      { label: "Tarifs", href: "#pricing" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Société",
    links: [
      { label: "À propos", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Mentions légales", href: "#" },
      { label: "RGPD", href: "#" },
    ],
  },
];

export const Footer = () => (
    <footer className="relative z-[2] bg-bg-alt border-t border-line pt-[50px] pb-[30px]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          <div>
            <Logo />
            <p className="mt-4 text-ink-soft text-sm leading-[1.5] max-w-[280px]">
              Évalue la maturité de tes tickets Jira en 3 secondes. Pour les
              équipes qui veulent sortir des sprints propres.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-4 font-medium">
                {col.title}
              </h4>
              <ul className="list-none flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-ink no-underline text-sm transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-line pt-6 flex justify-between items-center font-mono text-xs text-ink-faint flex-wrap gap-4">
          <span>© 2026 Sprint Predict. Tous droits réservés.</span>
          <span>Made with ☕ in Paris</span>
        </div>
      </div>
    </footer>
);
