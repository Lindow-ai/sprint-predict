import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how", label: "Comment ça marche" },
  { href: "#features", label: "Fonctionnalités" },
  { href: "#demo", label: "Démo" },
  { href: "#pricing", label: "Tarifs" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-bg/85 border-b border-line">
      <div className="max-w-[1280px] mx-auto px-8 py-[18px] flex items-center justify-between">
        <Logo />
        <ul className="hidden md:flex gap-9 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-ink-soft hover:text-ink text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 items-center">
          <Link
            href="#demo"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-auto px-4 py-2.5 text-sm",
            )}
          >
            Essayer
          </Link>
          <Link
            href="#pricing"
            className={cn(
              buttonVariants(),
              "h-auto px-4 py-2.5 text-sm hover:bg-orange",
            )}
          >
            Commencer <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
