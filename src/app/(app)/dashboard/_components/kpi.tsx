import { cn } from "@/lib/utils";

type Tone = "good" | "warn" | "bad" | "neutral";

const TONE_CLASS: Record<Tone, string> = {
  good: "text-leaf",
  warn: "text-amber",
  bad: "text-rust",
  neutral: "text-ink-faint",
};

type Props = {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaTone?: Tone;
  icon?: React.ReactNode;
  /** Renders the card with the dark accent treatment + orange halo. */
  accent?: boolean;
};

export const Kpi = ({
  label,
  value,
  unit,
  delta,
  deltaTone = "neutral",
  icon,
  accent = false,
}: Props) => {
  return (
    <div
      className={cn(
        "rounded-xl p-5 border relative overflow-hidden",
        accent ? "bg-ink text-bg border-ink" : "bg-paper border-line",
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.08em]",
            accent ? "text-orange" : "text-ink-faint",
          )}
        >
          {label}
        </span>
        {icon && (
          <span className={accent ? "text-orange" : "text-ink-faint"}>
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="font-serif text-[44px] leading-none tracking-[-0.04em]">
          {value}
        </span>
        {unit && (
          <span
            className={cn(
              "font-serif text-base",
              accent ? "text-bg/50" : "text-ink-faint",
            )}
          >
            {unit}
          </span>
        )}
      </div>
      {delta && (
        <div
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.04em]",
            accent ? "text-bg/60" : TONE_CLASS[deltaTone],
          )}
        >
          {delta}
        </div>
      )}
      {accent && (
        <div className="absolute -bottom-8 -right-8 size-32 bg-orange/30 rounded-full blur-3xl pointer-events-none" />
      )}
    </div>
  );
};
