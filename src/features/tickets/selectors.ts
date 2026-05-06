import type { Ticket } from "./types";

/** Status distribution for a list of tickets. */
export function distribution(tickets: Ticket[]) {
  const total = tickets.length || 1;
  const ready = tickets.filter((t) => t.status === "ready").length;
  const warn = tickets.filter((t) => t.status === "warn").length;
  const critical = tickets.filter((t) => t.status === "critical").length;
  return {
    total: tickets.length,
    ready,
    warn,
    critical,
    readyPct: Math.round((ready / total) * 100),
    warnPct: Math.round((warn / total) * 100),
    criticalPct: Math.round((critical / total) * 100),
  };
}

/** Average score for a list of tickets, rounded to int. */
export function avgScore(tickets: Ticket[]): number {
  if (!tickets.length) return 0;
  return Math.round(
    tickets.reduce((s, t) => s + t.score, 0) / tickets.length,
  );
}
