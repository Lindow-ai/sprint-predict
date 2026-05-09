import { cn } from "@/lib/utils";
import { distribution } from "@/features/tickets";

type Dist = ReturnType<typeof distribution>;
type DotColor = "leaf" | "amber" | "rust";

const DOT_CLASS: Record<DotColor, string> = {
  leaf: "bg-leaf",
  amber: "bg-amber",
  rust: "bg-rust",
};

export const Distribution = ({ dist }: { dist: Dist }) => (
  <div>
    <div className="flex items-baseline gap-3 mb-4">
      <span className="font-serif text-[56px] leading-none tracking-[-0.04em]">
        {dist.readyPct}
        <span className="text-2xl text-ink-faint">%</span>
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-faint">
        du sprint est <span className="text-leaf">prêt</span>
      </span>
    </div>
    <div className="h-3 w-full rounded-full overflow-hidden flex bg-bg-alt">
      <div
        className="h-full bg-leaf transition-all"
        style={{ width: `${dist.readyPct}%` }}
        title={`${dist.ready} prêts`}
      />
      <div
        className="h-full bg-amber transition-all"
        style={{ width: `${dist.warnPct}%` }}
        title={`${dist.warn} à clarifier`}
      />
      <div
        className="h-full bg-rust transition-all"
        style={{ width: `${dist.criticalPct}%` }}
        title={`${dist.critical} critiques`}
      />
    </div>
    <div className="mt-3 flex flex-wrap gap-4 text-xs">
      <Legend dot="leaf" label={`Prêts · ${dist.ready}`} />
      <Legend dot="amber" label={`À clarifier · ${dist.warn}`} />
      <Legend dot="rust" label={`Bloquants · ${dist.critical}`} />
    </div>
  </div>
);

const Legend = ({ dot, label }: { dot: DotColor; label: string }) => (
  <div className="flex items-center gap-1.5 text-ink-soft">
    <span className={cn("size-2 rounded-full", DOT_CLASS[dot])} />
    {label}
  </div>
);
