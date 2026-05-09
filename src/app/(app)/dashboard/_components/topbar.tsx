"use client";

import { useRouter } from "next/navigation";
import { InitialsAvatar } from "@/components/data/initials-avatar";
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
import { useAuth } from "@/features/auth";
import {
  BellIcon,
  ChevronDownIcon,
  LogOutIcon,
  SearchIcon,
} from "lucide-react";

export const Topbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-bg/85 border-b border-line">
      <div className="flex items-center gap-4 px-6 py-3">
        <SearchField />

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
              <InitialsAvatar
                initials={user!.initials}
                tone="accent"
                size="lg"
              />
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
};

const SearchField = () => (
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
);
