import { cn } from "@/lib/utils";
import type { TicketStatus } from "../types";

type Tone = {
  label: string;
  bg: string;
  fg: string;
};

const TONES: Record<TicketStatus, Tone> = {
  ready: {
    label: "Prêt",
    bg: "bg-leaf-soft",
    fg: "text-leaf",
  },
  warn: {
    label: "À clarifier",
    bg: "bg-amber-soft",
    fg: "text-amber",
  },
  critical: {
    label: "Bloquant",
    bg: "bg-rust-soft",
    fg: "text-rust",
  },
};

type Props = {
  status: TicketStatus;
  withDot?: boolean;
  className?: string;
};

/** Pill badge with status label, used in headers and rows. */
export function StatusBadge({ status, withDot = true, className }: Props) {
  const t = TONES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.05em] py-1 px-2.5 rounded-full font-semibold",
        t.bg,
        t.fg,
        className,
      )}
    >
      {withDot && <span aria-hidden>●</span>} {t.label}
    </span>
  );
}

/** CSS variable strings for inline-style usage (e.g. on a dark bg). */
export function statusVars(status: TicketStatus) {
  const map = {
    ready: {
      bg: "var(--color-leaf-soft)",
      fg: "var(--color-leaf)",
      grad: "linear-gradient(90deg, var(--color-amber), var(--color-leaf))",
    },
    warn: {
      bg: "var(--color-amber-soft)",
      fg: "var(--color-amber)",
      grad: "linear-gradient(90deg, var(--color-amber), var(--color-orange))",
    },
    critical: {
      bg: "var(--color-rust-soft)",
      fg: "var(--color-rust)",
      grad: "linear-gradient(90deg, var(--color-rust), var(--color-orange))",
    },
  } as const;
  return { ...map[status], label: TONES[status].label };
}
