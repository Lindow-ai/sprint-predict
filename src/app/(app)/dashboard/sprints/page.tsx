"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SPRINTS,
  ticketsBySprint,
  distribution,
  avgScore,
  type TicketStatus,
  type Ticket,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CalendarRangeIcon, FlagIcon, GripVerticalIcon } from "lucide-react";

export default function SprintsPage() {
  const [selectedId, setSelectedId] = useState(SPRINTS[SPRINTS.length - 1].id);
  const selected = SPRINTS.find((s) => s.id === selectedId)!;
  const tickets = ticketsBySprint(selected.id);
  const dist = distribution(tickets);
  const avg = avgScore(tickets);

  const lanes: { status: TicketStatus; label: string; tone: string }[] = [
    { status: "critical", label: "Bloquants", tone: "border-t-rust" },
    { status: "warn", label: "À clarifier", tone: "border-t-amber" },
    { status: "ready", label: "Prêts", tone: "border-t-leaf" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2">
          › Sprints
        </div>
        <h1 className="font-serif text-[36px] tracking-[-0.02em]">
          Pilote tes sprints. <em className="italic font-light text-orange">Avant qu'ils ne dérapent.</em>
        </h1>
      </div>

      {/* Sprint selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SPRINTS.map((s) => {
          const ts = ticketsBySprint(s.id);
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
                {active && (
                  <FlagIcon className="size-3.5 text-orange" />
                )}
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
        <BandStat label="Prêts" value={`${dist.ready} · ${dist.readyPct}%`} accent="leaf" />
        <BandStat label="Bloquants" value={`${dist.critical} · ${dist.criticalPct}%`} accent="rust" />
      </div>

      {/* Swimlanes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {lanes.map((lane) => {
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
        💡 Bientôt : drag-and-drop pour réorganiser, et workflow de validation par PO.
      </p>
    </div>
  );
}

function BandStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: "orange" | "leaf" | "rust";
}) {
  const cls = {
    orange: "text-orange",
    leaf: "text-leaf",
    rust: "text-rust",
  } as const;
  return (
    <div className="bg-paper border border-line rounded-lg p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint mb-1">
        {label}
      </div>
      <div
        className={cn(
          "font-serif text-[24px] tracking-[-0.02em] leading-tight",
          accent && cls[accent],
        )}
      >
        {value}
      </div>
    </div>
  );
}

function SwimCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link
      href={`/dashboard/tickets/${ticket.id}`}
      className="group block bg-paper border border-line rounded-md p-3 hover:border-orange/40 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start gap-2">
        <GripVerticalIcon className="size-3.5 text-ink-faint shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium leading-snug line-clamp-2">
            {ticket.title}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] text-ink-faint">
              {ticket.jiraKey}
            </span>
            <div className="flex items-center gap-2">
              <ScorePill score={ticket.score} status={ticket.status} />
              <div className="size-5 rounded-full bg-bg-alt text-ink text-[9px] font-medium flex items-center justify-center">
                {ticket.assigneeInitials}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
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
        "font-mono text-[10px] font-semibold py-0.5 px-1.5 rounded tabular-nums",
        cls,
      )}
    >
      {score}
    </span>
  );
}
