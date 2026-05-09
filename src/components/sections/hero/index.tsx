import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroMock } from "./hero-mock";
import { HeroStats } from "./hero-stats";

export const Hero = () => (
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
            Sprint Predict évalue la maturité de chaque ticket Jira en 3
            secondes. Score de readiness, questions Amigos manquantes,
            critères d&apos;acceptation suggérés — directement posté dans le
            ticket.
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
              <ArrowRightIcon className="size-4" />
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

          <HeroStats />
        </div>

        <HeroMock />
      </div>
    </div>
  </section>
);
