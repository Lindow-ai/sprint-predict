import { cn } from "@/lib/utils";
import type { ScoreDimension } from "@/features/analysis";

/** One row of the readiness score breakdown (label + weighted bar). */
export const DimensionRow = ({ d }: { d: ScoreDimension }) => {
  const tone =
    d.score >= 75 ? "bg-leaf" : d.score >= 50 ? "bg-amber" : "bg-rust";
  return (
    <div>
      <div className="flex items-center justify-between text-[13px] mb-1.5">
        <span className="text-bg/90 flex items-center gap-2">
          {d.label}
          <span className="font-mono text-[10px] uppercase text-bg/40">
            poids {d.weight}%
          </span>
        </span>
        <span className="font-mono text-bg tabular-nums">
          {d.score}
          <span className="text-bg/40">/100</span>
        </span>
      </div>
      <div className="h-1.5 bg-bg/10 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", tone)}
          style={{ width: `${d.score}%` }}
        />
      </div>
    </div>
  );
};
