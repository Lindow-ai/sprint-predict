type Stat = {
  num: string;
  suffix: string;
  suffixClass: string;
  label: string;
};

const STATS: Stat[] = [
  {
    num: "3",
    suffix: "s",
    suffixClass: "text-ink-faint",
    label: "Analyse / ticket",
  },
  {
    num: "−40",
    suffix: "%",
    suffixClass: "text-orange",
    label: "Tickets bloqués",
  },
  {
    num: "5",
    suffix: "→6",
    suffixClass: "text-ink-faint",
    label: "Critères auto-générés",
  },
];

/** 3-stat row sitting under the hero CTAs. */
export const HeroStats = () => (
  <div className="flex gap-10 pt-8 border-t border-line flex-wrap">
    {STATS.map((s) => (
      <div key={s.label} className="flex flex-col gap-1">
        <div className="font-serif text-[36px] font-medium tracking-[-0.03em] leading-none">
          {s.num}
          <span className={`text-2xl ${s.suffixClass}`}>{s.suffix}</span>
        </div>
        <div className="font-mono text-[11px] uppercase text-ink-faint tracking-[0.05em]">
          {s.label}
        </div>
      </div>
    ))}
  </div>
);
