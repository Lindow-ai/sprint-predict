import { cn } from "@/lib/utils";
import type { TicketStatus } from "@/features/tickets";

type Tone = { label: string; cls: string };

const TONES: Record<TicketStatus, Tone> = {
  ready: { label: "Prêt", cls: "text-leaf" },
  warn: { label: "À clarifier", cls: "text-amber" },
  critical: { label: "Bloquant", cls: "text-rust" },
};

/** Inline status text with colored dot — used inside table rows. */
export const StatusLabel = ({ status }: { status: TicketStatus }) => {
  const t = TONES[status];
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.05em]",
        t.cls,
      )}
    >
      ● {t.label}
    </span>
  );
};
