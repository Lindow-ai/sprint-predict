import { cn } from "@/lib/utils";

type Point = { sprint: string; score: number };

type Props = { trend: Point[] };

export const ScoreSparkline = ({ trend }: Props) => {
  const max = Math.max(...trend.map((p) => p.score));
  const min = Math.min(...trend.map((p) => p.score));
  const range = Math.max(1, max - min);

  return (
    <div className="mt-6 pt-5 border-t border-dashed border-line">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Score moyen — 6 derniers sprints
        </span>
        <span className="font-mono text-[10px] uppercase text-leaf">
          + {trend[trend.length - 1].score - trend[0].score} pts
        </span>
      </div>
      <div className="flex items-end gap-2 h-20">
        {trend.map((p, i) => {
          const h = 30 + ((p.score - min) / range) * 70;
          const isLast = i === trend.length - 1;
          return (
            <div
              key={p.sprint}
              className="flex-1 flex flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  "w-full rounded-sm transition-all",
                  isLast ? "bg-orange" : "bg-ink/15",
                )}
                style={{ height: `${h}%` }}
                title={`${p.sprint} · ${p.score}/100`}
              />
              <span
                className={cn(
                  "font-mono text-[10px]",
                  isLast ? "text-orange font-semibold" : "text-ink-faint",
                )}
              >
                {p.sprint}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
