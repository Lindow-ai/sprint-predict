import { cn } from "@/lib/utils";

type Tone = "bad" | "warn" | "good";

const TONE_CLS: Record<Tone, string> = {
  bad: "text-[#ff8b73]",
  warn: "text-amber",
  good: "text-[#6dd285]",
};

type Pill = {
  label: string;
  num: string;
  tone: Tone;
};

const PILLS: Pill[] = [
  { label: "Critique", num: "32", tone: "bad" },
  { label: "Moyen", num: "64", tone: "warn" },
  { label: "Prêt", num: "87", tone: "good" },
];

/** 3-pill display under the dark "Readiness Score" feature card. */
export const ScorePillStack = () => (
  <div className="mt-8 flex items-end gap-3 h-[140px]">
    {PILLS.map((p) => (
      <div
        key={p.label}
        className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 flex-1 flex flex-col gap-2"
      >
        <span className="font-mono text-[10px] uppercase opacity-60">
          {p.label}
        </span>
        <span
          className={cn(
            "font-serif text-[32px] font-medium tracking-[-0.03em]",
            TONE_CLS[p.tone],
          )}
        >
          {p.num}
        </span>
      </div>
    ))}
  </div>
);
