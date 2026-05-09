"use client";

import { useState } from "react";
import {
  ticketRepo,
  distribution,
  avgScore,
  type TicketStatus,
} from "@/features/tickets";
import { sprintRepo } from "@/features/sprints";
import { cn } from "@/lib/utils";
import { CalendarRangeIcon, FlagIcon } from "lucide-react";
import { BandStat } from "./_components/band-stat";
import { SwimCard } from "./_components/swim-card";

const SPRINTS = sprintRepo.list();

const LANES: { status: TicketStatus; label: string; tone: string }[] = [
  { status: "critical", label: "Bloquants", tone: "border-t-rust" },
  { status: "warn", label: "À clarifier", tone: "border-t-amber" },
  { status: "ready", label: "Prêts", tone: "border-t-leaf" },
];

const SprintsPage = () => {
  const [selectedId, setSelectedId] = useState(SPRINTS[SPRINTS.length - 1].id);
  const tickets = ticketRepo.bySprint(selectedId);
  const dist = distribution(tickets);
  const avg = avgScore(tickets);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2">
          › Sprints
        </div>
        <h1 className="font-serif text-[36px] tracking-[-0.02em]">
          Pilote tes sprints.{" "}
          <em className="italic font-light text-orange">
            Avant qu&apos;ils ne dérapent.
          </em>
        </h1>
      </div>

      {/* Sprint selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SPRINTS.map((s) => {
          const ts = ticketRepo.bySprint(s.id);
          const d = distribution(ts);
          const a = avgScore(ts);
          const active = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={cn(
                "text-left p-5 rounded-xl border transition-all",
                active
                  ? "bg-ink text-bg border-ink shadow-md"
                  : "bg-paper border-line hover:border-orange/40 hover:bg-bg-alt/40",
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.08em]",
                    active ? "text-orange" : "text-ink-faint",
                  )}
                >
                  <CalendarRangeIcon className="inline size-3 mr-1" />
                  {new Date(s.startsAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  →{" "}
                  {new Date(s.endsAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                {active && <FlagIcon className="size-3.5 text-orange" />}
              </div>
              <div className="font-serif text-[24px] mb-1">{s.name}</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className={cn(
                    "font-serif text-[36px] tracking-[-0.04em] leading-none",
                    active ? "text-bg" : "text-ink",
                  )}
                >
                  {a}
                </span>
                <span
                  className={cn(
                    "font-mono text-xs uppercase",
                    active ? "text-bg/50" : "text-ink-faint",
                  )}
                >
                  /100 · {ts.length} tickets
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden flex bg-black/10">
                <div className="bg-leaf" style={{ width: `${d.readyPct}%` }} />
                <div className="bg-amber" style={{ width: `${d.warnPct}%` }} />
                <div className="bg-rust" style={{ width: `${d.criticalPct}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Sprint summary band */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <BandStat label="Tickets" value={tickets.length} />
        <BandStat label="Score moyen" value={`${avg}/100`} accent="orange" />
        <BandStat
          label="Prêts"
          value={`${dist.ready} · ${dist.readyPct}%`}
          accent="leaf"
        />
        <BandStat
          label="Bloquants"
          value={`${dist.critical} · ${dist.criticalPct}%`}
          accent="rust"
        />
      </div>

      {/* Swimlanes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {LANES.map((lane) => {
          const laneTickets = tickets
            .filter((t) => t.status === lane.status)
            .sort((a, b) => a.score - b.score);
          return (
            <div
              key={lane.status}
              className={cn(
                "bg-bg-alt/40 border border-line rounded-xl flex flex-col min-h-[400px] border-t-[3px]",
                lane.tone,
              )}
            >
              <header className="p-4 flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
                  {lane.label}
                </div>
                <span className="font-mono text-[11px] text-ink-faint tabular-nums">
                  {laneTickets.length}
                </span>
              </header>
              <div className="px-3 pb-3 flex flex-col gap-2 overflow-y-auto">
                {laneTickets.length === 0 && (
                  <div className="text-xs text-ink-faint italic text-center py-12">
                    Aucun ticket dans cette colonne.
                  </div>
                )}
                {laneTickets.map((t) => (
                  <SwimCard key={t.id} ticket={t} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-ink-faint italic text-center">
        💡 Bientôt : drag-and-drop pour réorganiser, et workflow de validation
        par PO.
      </p>
    </div>
  );
};

export default SprintsPage;
