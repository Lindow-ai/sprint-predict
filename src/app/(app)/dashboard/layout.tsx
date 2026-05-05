"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, useRequireAuth } from "@/lib/auth";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  TicketIcon,
  CalendarRangeIcon,
  TrendingUpIcon,
  LayersIcon,
  PlugIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
  LogOutIcon,
  LifeBuoyIcon,
  ChevronDownIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  soon?: boolean;
};

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Pilotage",
    items: [
      { href: "/dashboard", label: "Vue d'ensemble", icon: HomeIcon },
      { href: "/dashboard/tickets", label: "Tickets", icon: TicketIcon },
      { href: "/dashboard/sprints", label: "Sprints", icon: CalendarRangeIcon, soon: true },
      { href: "/dashboard/trends", label: "Tendances", icon: TrendingUpIcon, soon: true },
    ],
  },
  {
    section: "Configuration",
    items: [
      { href: "/dashboard/templates", label: "Templates équipe", icon: LayersIcon, soon: true },
      { href: "/dashboard/integrations", label: "Intégrations", icon: PlugIcon, soon: true },
      { href: "/dashboard/settings", label: "Paramètres", icon: SettingsIcon, soon: true },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useRequireAuth();

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-faint">
        <span className="font-mono text-xs uppercase tracking-widest">
          Chargement…
        </span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="relative z-[2] min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="flex flex-col min-w-0">
          <Topbar />
          <main className="flex-1 p-6 lg:p-10 max-w-[1320px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

function Sidebar() {
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
              {group.items.map((item) => {
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
                  <li key={item.href}>
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
              })}
            </ul>
          </div>
        ))}
      </nav>

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
    </aside>
  );
}

function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-bg/85 border-b border-line">
      <div className="flex items-center gap-4 px-6 py-3">
        <div className="relative max-w-md w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-faint pointer-events-none" />
          <Input
            placeholder="Rechercher un ticket, un sprint…"
            className="pl-9 h-9 bg-paper border-line"
          />
          <kbd className="hidden md:inline absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase text-ink-faint border border-line rounded px-1.5 py-0.5 bg-bg-alt">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            className="size-9 p-0 rounded-md hover:bg-bg-alt"
            aria-label="Notifications"
          >
            <BellIcon className="size-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-bg-alt transition-colors outline-none"
              data-slot="user-menu"
            >
              <div className="size-8 rounded-full bg-orange text-white flex items-center justify-center font-serif font-medium text-sm">
                {user!.initials}
              </div>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-sm font-medium">{user!.name}</span>
                <span className="font-mono text-[10px] uppercase text-ink-faint tracking-wider">
                  {user!.team}
                </span>
              </div>
              <ChevronDownIcon className="size-3.5 text-ink-faint" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs">
                <div className="font-medium text-ink">{user!.name}</div>
                <div className="font-mono text-[10px] text-ink-faint mt-0.5 truncate">
                  {user!.email}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Profil</DropdownMenuItem>
              <DropdownMenuItem disabled>Préférences</DropdownMenuItem>
              <DropdownMenuItem disabled>Facturation</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="text-rust focus:text-rust"
              >
                <LogOutIcon className="size-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
