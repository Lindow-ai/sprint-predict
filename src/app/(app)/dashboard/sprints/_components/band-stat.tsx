import { cn } from "@/lib/utils";

type Accent = "orange" | "leaf" | "rust";

const ACCENT: Record<Accent, string> = {
  orange: "text-orange",
  leaf: "text-leaf",
  rust: "text-rust",
};

type Props = {
  label: string;
  value: string | number;
  accent?: Accent;
};

/** Compact stat tile shown in the band above the swimlanes. */
export const BandStat = ({ label, value, accent }: Props) => (
  <div className="bg-paper border border-line rounded-lg p-4">
    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint mb-1">
      {label}
    </div>
    <div
      className={cn(
        "font-serif text-[24px] tracking-[-0.02em] leading-tight",
        accent && ACCENT[accent],
      )}
    >
      {value}
    </div>
  </div>
);
