import { cn } from "@/lib/utils";

type Check = { variant: "ok" | "warn"; text: string };

const CHECKS: Check[] = [
  { variant: "ok", text: "Description claire" },
  { variant: "ok", text: "5 critères d'acceptation présents" },
  { variant: "warn", text: "Format d'export non précisé" },
  { variant: "warn", text: "Volume de données limite à définir" },
  { variant: "ok", text: "Dépendances identifiées" },
];

/** Tilted demo card shown in the hero — fakes a Sprint Predict result. */
export const HeroMock = () => (
  <div className="relative bg-paper border border-line rounded-xl p-6 rotate-[1.2deg] shadow-[0_24px_60px_-20px_rgba(26,24,20,0.18),0_4px_12px_-4px_rgba(26,24,20,0.08)] before:content-[''] before:absolute before:-inset-2 before:bg-ink before:-z-10 before:rounded-[14px] before:-rotate-2 before:opacity-[0.05]">
    <div className="flex items-center justify-between pb-4 border-b border-dashed border-line mb-[18px]">
      <span className="font-mono text-xs text-ink-faint font-medium">
        <strong className="text-ink font-semibold">PROJ-1247</strong> · Story
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-leaf-soft text-leaf rounded-full font-mono text-[11px] font-semibold">
        ● Prêt
      </span>
    </div>

    <div className="font-serif text-[17px] font-medium leading-[1.3] mb-[18px]">
      Permettre aux utilisateurs d&apos;exporter leur historique de transactions
    </div>

    <div className="flex items-baseline gap-3.5 mb-3.5">
      <div className="font-serif text-[64px] font-medium leading-none tracking-[-0.04em] text-ink">
        78<span className="text-2xl text-ink-faint font-normal">/100</span>
      </div>
      <div className="flex-1 h-2 bg-bg-alt rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-amber to-leaf rounded-full origin-left animate-fill-bar"
          style={{ "--target-width": "78%" } as React.CSSProperties}
        />
      </div>
    </div>
    <div className="font-mono text-[11px] text-ink-faint uppercase tracking-[0.05em] mb-[22px]">
      Readiness Score · Bon
    </div>

    <ul className="list-none flex flex-col gap-2.5 text-[13px]">
      {CHECKS.map((c) => (
        <li key={c.text} className="flex items-center gap-2.5">
          <span
            className={cn(
              "w-4 h-4 rounded flex items-center justify-center shrink-0 text-[11px] font-bold",
              c.variant === "ok"
                ? "bg-leaf-soft text-leaf"
                : "bg-amber-soft text-amber",
            )}
          >
            {c.variant === "ok" ? "✓" : "!"}
          </span>
          {c.text}
        </li>
      ))}
    </ul>
  </div>
);
