"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TICKETS, type Ticket, type TicketStatus } from "@/lib/mock-data";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SearchIcon,
  ArrowUpDownIcon,
  RefreshCwIcon,
  DownloadIcon,
  AlertTriangleIcon,
} from "lucide-react";

type Filter = "all" | TicketStatus;
type SortKey = "score" | "analyzedAt" | "title";

export default function TicketsListPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const counts = useMemo(
    () => ({
      all: TICKETS.length,
      ready: TICKETS.filter((t) => t.status === "ready").length,
      warn: TICKETS.filter((t) => t.status === "warn").length,
      critical: TICKETS.filter((t) => t.status === "critical").length,
    }),
    [],
  );

  const rows = useMemo(() => {
    let r = [...TICKETS];
    if (filter !== "all") r = r.filter((t) => t.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.jiraKey.toLowerCase().includes(q) ||
          t.assignee.toLowerCase().includes(q),
      );
    }
    r.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "score") cmp = a.score - b.score;
      else if (sortKey === "title") cmp = a.title.localeCompare(b.title);
      else cmp = a.analyzedAt.localeCompare(b.analyzedAt);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return r;
  }, [filter, search, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2">
            › Tickets analysés
          </div>
          <h1 className="font-serif text-[36px] leading-tight tracking-[-0.02em]">
            Tous les tickets
          </h1>
          <p className="text-ink-soft mt-1">
            {rows.length} {rows.length === 1 ? "ticket" : "tickets"}
            {filter !== "all" && ` (${filter})`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-line bg-paper h-9 text-xs">
            <RefreshCwIcon className="size-3.5" />
            Resynchroniser Jira
          </Button>
          <Button variant="outline" className="border-line bg-paper h-9 text-xs">
            <DownloadIcon className="size-3.5" />
            Exporter CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as Filter)}
        >
          <TabsList className="bg-paper border border-line">
            <TabsTrigger value="all">
              Tous <Badge>{counts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="ready">
              Prêts <Badge tone="leaf">{counts.ready}</Badge>
            </TabsTrigger>
            <TabsTrigger value="warn">
              À clarifier <Badge tone="amber">{counts.warn}</Badge>
            </TabsTrigger>
            <TabsTrigger value="critical">
              Bloquants <Badge tone="rust">{counts.critical}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-faint pointer-events-none" />
          <Input
            placeholder="PROJ-1247, titre, assignée…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-paper border-line"
          />
        </div>
      </div>

      <div className="bg-paper border border-line rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-alt/40 text-left">
              <Th>
                <SortBtn active={sortKey === "title"} dir={sortDir} onClick={() => toggleSort("title")}>
                  Ticket
                </SortBtn>
              </Th>
              <Th>
                <SortBtn active={sortKey === "score"} dir={sortDir} onClick={() => toggleSort("score")}>
                  Score
                </SortBtn>
              </Th>
              <Th className="hidden lg:table-cell">Statut</Th>
              <Th className="hidden md:table-cell">Assignée</Th>
              <Th className="hidden lg:table-cell">Sprint</Th>
              <Th className="hidden lg:table-cell">Re-open risk</Th>
              <Th>
                <SortBtn active={sortKey === "analyzedAt"} dir={sortDir} onClick={() => toggleSort("analyzedAt")}>
                  Analysé
                </SortBtn>
              </Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr
                key={t.id}
                className="border-t border-line hover:bg-bg-alt/40 transition-colors"
              >
                <Td>
                  <div className="flex flex-col gap-0.5 min-w-0 max-w-[360px]">
                    <span className="font-medium truncate">{t.title}</span>
                    <span className="font-mono text-[11px] text-ink-faint">
                      {t.jiraKey} · {t.type}
                    </span>
                  </div>
                </Td>
                <Td>
                  <ScorePill score={t.score} status={t.status} />
                </Td>
                <Td className="hidden lg:table-cell">
                  <StatusLabel status={t.status} />
                </Td>
                <Td className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-bg-alt text-ink text-[10px] font-medium flex items-center justify-center">
                      {t.assigneeInitials}
                    </div>
                    <span className="text-ink-soft text-xs">{t.assignee}</span>
                  </div>
                </Td>
                <Td className="hidden lg:table-cell text-ink-soft text-xs">
                  {t.sprint}
                </Td>
                <Td className="hidden lg:table-cell">
                  <RiskBar value={t.reopenRisk} />
                </Td>
                <Td className="text-ink-faint text-xs">
                  {timeAgo(t.analyzedAt)}
                </Td>
                <Td className="text-right">
                  <Link
                    href={`/dashboard/tickets/${t.id}`}
                    className="font-medium text-orange text-xs hover:underline"
                  >
                    Ouvrir →
                  </Link>
                </Td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-ink-faint">
                  <AlertTriangleIcon className="size-5 mx-auto mb-2 opacity-50" />
                  Aucun ticket ne correspond à ces filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== bits ===== */

function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint font-medium px-3 py-3",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("px-3 py-3 align-middle", className)}>{children}</td>;
}

function SortBtn({
  children,
  active,
  dir,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 hover:text-ink transition-colors",
        active && "text-ink",
      )}
    >
      {children}
      <ArrowUpDownIcon
        className={cn(
          "size-3 transition-transform",
          active && dir === "desc" && "rotate-180",
        )}
      />
    </button>
  );
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "leaf" | "amber" | "rust";
}) {
  const cls = {
    neutral: "bg-line/50 text-ink-soft",
    leaf: "bg-leaf-soft text-leaf",
    amber: "bg-amber-soft text-amber",
    rust: "bg-rust-soft text-rust",
  }[tone];
  return (
    <span
      className={cn(
        "ml-1.5 font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded tabular-nums",
        cls,
      )}
    >
      {children}
    </span>
  );
}

function ScorePill({ score, status }: { score: number; status: TicketStatus }) {
  const cls = {
    ready: "bg-leaf-soft text-leaf",
    warn: "bg-amber-soft text-amber",
    critical: "bg-rust-soft text-rust",
  }[status];
  return (
    <span
      className={cn(
        "font-mono text-xs font-semibold py-1 px-2 rounded-md tabular-nums",
        cls,
      )}
    >
      {score}
    </span>
  );
}

function StatusLabel({ status }: { status: TicketStatus }) {
  const map = {
    ready: { label: "Prêt", cls: "text-leaf" },
    warn: { label: "À clarifier", cls: "text-amber" },
    critical: { label: "Bloquant", cls: "text-rust" },
  }[status];
  return (
    <span className={cn("font-mono text-[11px] uppercase tracking-[0.05em]", map.cls)}>
      ● {map.label}
    </span>
  );
}

function RiskBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const tone =
    pct >= 60 ? "bg-rust" : pct >= 35 ? "bg-amber" : "bg-leaf";
  return (
    <div className="flex items-center gap-2 w-28">
      <div className="flex-1 h-1.5 bg-bg-alt rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-[10px] tabular-nums text-ink-faint w-8 text-right">
        {pct}%
      </span>
    </div>
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Hier";
  if (days < 7) return `Il y a ${days} j`;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

// satisfy unused-import linter for Ticket type
export type _T = Ticket;
