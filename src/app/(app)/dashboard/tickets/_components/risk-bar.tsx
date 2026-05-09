import { cn } from "@/lib/utils";

/** Tiny inline progress bar showing 0..1 risk with adaptive color. */
export const RiskBar = ({ value }: { value: number }) => {
  const pct = Math.round(value * 100);
  const tone = pct >= 60 ? "bg-rust" : pct >= 35 ? "bg-amber" : "bg-leaf";
  return (
    <div className="flex items-center gap-2 w-28">
      <div className="flex-1 h-1.5 bg-bg-alt rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", tone)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[10px] tabular-nums text-ink-faint w-8 text-right">
        {pct}%
      </span>
    </div>
  );
};
