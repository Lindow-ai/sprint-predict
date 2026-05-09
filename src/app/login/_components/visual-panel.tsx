const STATS = [
  { label: "Tickets shippés clean", val: "+62%" },
  { label: "Re-open rate", val: "−48%" },
  { label: "Temps grooming", val: "−25%" },
];

/** Right-side dark panel of the login screen — testimonial + KPIs. */
export const LoginVisualPanel = () => (
  <div className="hidden lg:flex relative bg-ink overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,91,31,0.25),transparent_55%)]" />
    <div className="relative flex flex-col justify-between p-14 text-bg w-full">
      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-orange">
        ● Live · 28 tickets analysés cette semaine
      </div>

      <div className="space-y-6 max-w-[440px]">
        <p className="font-serif text-[28px] leading-[1.25] italic text-bg/90">
          « Avant Sprint Predict, on découvrait les ambiguïtés en milieu de
          sprint. Maintenant, elles sortent au refinement. »
        </p>
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-orange flex items-center justify-center font-serif font-medium text-white">
            M
          </div>
          <div>
            <div className="text-sm font-medium">Marie L.</div>
            <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-bg/50">
              Tech Lead — Fintech, 28 devs
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white/5 border border-white/10 rounded-lg p-4"
          >
            <div className="font-serif text-[26px] leading-none text-orange">
              {s.val}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-bg/60 mt-2">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
