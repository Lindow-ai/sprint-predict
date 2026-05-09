import { cn } from "@/lib/utils";

type Tone = "neutral" | "leaf" | "amber" | "rust";

const TONES: Record<Tone, string> = {
  neutral: "bg-line/50 text-ink-soft",
  leaf: "bg-leaf-soft text-leaf",
  amber: "bg-amber-soft text-amber",
  rust: "bg-rust-soft text-rust",
};

type Props = { children: React.ReactNode; tone?: Tone };

/** Tiny count chip used inside tab triggers ("Tous 28", "Prêts 4"…). */
export const CountBadge = ({ children, tone = "neutral" }: Props) => (
  <span
    className={cn(
      "ml-1.5 font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded tabular-nums",
      TONES[tone],
    )}
  >
    {children}
  </span>
);
