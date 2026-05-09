"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ticketRepo,
  ScorePill,
  type TicketStatus,
} from "@/features/tickets";
import { InitialsAvatar } from "@/components/data/initials-avatar";
import { Th, Td } from "@/components/data/data-cells";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils/time";
import { SortButton } from "./_components/sort-button";
import { CountBadge } from "./_components/count-badge";
import { StatusLabel } from "./_components/status-label";
import { RiskBar } from "./_components/risk-bar";
import {
  AlertTriangleIcon,
  DownloadIcon,
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react";

type Filter = "all" | TicketStatus;
type SortKey = "score" | "analyzedAt" | "title";

const ALL_TICKETS = ticketRepo.list();

const TicketsListPage = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const counts = useMemo(
    () => ({
      all: ALL_TICKETS.length,
      ready: ALL_TICKETS.filter((t) => t.status === "ready").length,
      warn: ALL_TICKETS.filter((t) => t.status === "warn").length,
      critical: ALL_TICKETS.filter((t) => t.status === "critical").length,
    }),
    [],
  );

  const rows = useMemo(() => {
    let r = [...ALL_TICKETS];
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

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

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
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList className="bg-paper border border-line">
            <TabsTrigger value="all">
              Tous <CountBadge>{counts.all}</CountBadge>
            </TabsTrigger>
            <TabsTrigger value="ready">
              Prêts <CountBadge tone="leaf">{counts.ready}</CountBadge>
            </TabsTrigger>
            <TabsTrigger value="warn">
              À clarifier <CountBadge tone="amber">{counts.warn}</CountBadge>
            </TabsTrigger>
            <TabsTrigger value="critical">
              Bloquants <CountBadge tone="rust">{counts.critical}</CountBadge>
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
                <SortButton
                  active={sortKey === "title"}
                  dir={sortDir}
                  onClick={() => toggleSort("title")}
                >
                  Ticket
                </SortButton>
              </Th>
              <Th>
                <SortButton
                  active={sortKey === "score"}
                  dir={sortDir}
                  onClick={() => toggleSort("score")}
                >
                  Score
                </SortButton>
              </Th>
              <Th className="hidden lg:table-cell">Statut</Th>
              <Th className="hidden md:table-cell">Assignée</Th>
              <Th className="hidden lg:table-cell">Sprint</Th>
              <Th className="hidden lg:table-cell">Re-open risk</Th>
              <Th>
                <SortButton
                  active={sortKey === "analyzedAt"}
                  dir={sortDir}
                  onClick={() => toggleSort("analyzedAt")}
                >
                  Analysé
                </SortButton>
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
                    <InitialsAvatar initials={t.assigneeInitials} size="sm" />
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
};

export default TicketsListPage;
