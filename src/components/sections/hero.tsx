import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stats = [
  { num: "3", suffix: "s", suffixClass: "text-ink-faint", label: "Analyse / ticket" },
  { num: "−40", suffix: "%", suffixClass: "text-orange", label: "Tickets bloqués" },
  { num: "5", suffix: "→6", suffixClass: "text-ink-faint", label: "Critères auto-générés" },
];

const checks: { variant: "ok" | "warn"; text: string }[] = [
  { variant: "ok", text: "Description claire" },
  { variant: "ok", text: "5 critères d'acceptation présents" },
  { variant: "warn", text: "Format d'export non précisé" },
  { variant: "warn", text: "Volume de données limite à définir" },
  { variant: "ok", text: "Dépendances identifiées" },
];

export function Hero() {
  return (
    <section className="relative pt-[90px] pb-[60px] z-[2]">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Hero meta line */}
        <div className="flex items-center gap-4 mb-8 font-mono text-xs text-ink-faint uppercase tracking-[0.08em]">
          <Badge
            variant="outline"
            className="bg-orange-soft text-orange border-transparent rounded-full normal-case font-medium tracking-normal text-xs px-3 py-1.5 gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" />
            v1.0 — Disponible en bêta
          </Badge>
          <span>Pour équipes Agile / Scrum</span>
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-20 lg:gap-20 items-start">
          <div>
            <h1 className="font-serif font-normal mb-7 leading-[0.95] tracking-[-0.035em] text-[clamp(48px,7vw,88px)]">
              Vos tickets sont{" "}
              <em className="italic font-light text-orange">flous</em>.
              <br />
              Votre sprint <span className="underline-deco">en pâtit</span>.
            </h1>
            <p className="text-[19px] leading-[1.55] text-ink-soft max-w-[560px] mb-9">
              Sprint Predict évalue la maturité de chaque ticket Jira en 3 secondes. Score
              de readiness, questions Amigos manquantes, critères d&apos;acceptation
              suggérés — directement posté dans le ticket.
            </p>

            <div className="flex gap-3.5 mb-12 flex-wrap">
              <Link
                href="#demo"
                className={cn(
                  buttonVariants(),
                  "h-auto px-[22px] py-[14px] text-[15px] bg-orange text-white hover:bg-orange/90 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(255,91,31,0.25)]",
                )}
              >
                Tester sur un ticket
                <ArrowRight />
              </Link>
              <Link
                href="#how"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-auto px-[22px] py-[14px] text-[15px] border-ink text-ink hover:bg-ink hover:text-bg",
                )}
              >
                Voir comment ça marche
              </Link>
            </div>

            <div className="flex gap-10 pt-8 border-t border-line flex-wrap">
              {stats.map((s) => (
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
          </div>

          {/* Hero mock card */}
          <HeroMock checks={checks} />
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function HeroMock({
  checks,
}: {
  checks: { variant: "ok" | "warn"; text: string }[];
}) {
  return (
    <div
      className="relative bg-paper border border-line rounded-xl p-6 rotate-[1.2deg] shadow-[0_24px_60px_-20px_rgba(26,24,20,0.18),0_4px_12px_-4px_rgba(26,24,20,0.08)] before:content-[''] before:absolute before:-inset-2 before:bg-ink before:-z-10 before:rounded-[14px] before:-rotate-2 before:opacity-[0.05]"
    >
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
        {checks.map((c) => (
          <li key={c.text} className="flex items-center gap-2.5">
            <span
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[11px] font-bold ${
                c.variant === "ok"
                  ? "bg-leaf-soft text-leaf"
                  : "bg-amber-soft text-amber"
              }`}
            >
              {c.variant === "ok" ? "✓" : "!"}
            </span>
            {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
