"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LifeBuoyIcon } from "lucide-react";
import { NAV, type NavItem } from "./nav-config";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col border-r border-line bg-bg-alt/60 backdrop-blur-sm">
      <div className="p-6 border-b border-line">
        <Logo />
      </div>

      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {NAV.map((group) => (
          <div key={group.section}>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint px-2 mb-2">
              {group.section}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarItem key={item.href} item={item} pathname={pathname} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <TrialCard />
    </aside>
  );
};

type ItemProps = { item: NavItem; pathname: string | null };

const SidebarItem = ({ item, pathname }: ItemProps) => {
  const active =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname?.startsWith(item.href);
  const Icon = item.icon;
  const inner = (
    <>
      <Icon className="size-4 shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.soon && (
        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-line/50 text-ink-faint">
          soon
        </span>
      )}
    </>
  );
  return (
    <li>
      {item.soon ? (
        <span
          className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm",
            "text-ink-faint cursor-not-allowed",
          )}
        >
          {inner}
        </span>
      ) : (
        <Link
          href={item.href}
          className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors",
            active
              ? "bg-ink text-bg shadow-sm"
              : "text-ink-soft hover:bg-bg hover:text-ink",
          )}
        >
          {inner}
        </Link>
      )}
    </li>
  );
};

const TrialCard = () => (
  <div className="p-4 border-t border-line">
    <div className="bg-paper border border-line rounded-lg p-4">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-orange mb-1">
        <LifeBuoyIcon className="size-3" /> Plan Team · Essai
      </div>
      <p className="text-[12px] text-ink-soft mb-3 leading-snug">
        13 jours restants. Passe en plan payant pour ne rien perdre.
      </p>
      <Button className="w-full h-8 text-xs bg-ink text-bg hover:bg-ink/90">
        Mettre à niveau
      </Button>
    </div>
  </div>
);
