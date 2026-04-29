import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-orange text-white py-[100px] text-center z-[2]">
      {/* Big decorative wordmark */}
      <span
        aria-hidden
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 font-serif italic font-light text-white/[0.08] whitespace-nowrap pointer-events-none tracking-[-0.04em]"
        style={{ fontSize: "280px" }}
      >
        Sprint Predict
      </span>

      <div className="max-w-[1280px] mx-auto px-8 relative z-[2]">
        <h2 className="font-serif font-normal mb-6 leading-none tracking-[-0.03em] text-[clamp(40px,6vw,68px)]">
          Si un dev comprend le ticket
          <br />
          sans poser <em className="italic">une seule</em> question…
        </h2>
        <p className="text-lg max-w-[540px] mx-auto mb-10 opacity-90">
          …Sprint Predict a fait son travail. Essaye-le sur ton prochain ticket.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Link
            href="#demo"
            className={cn(
              buttonVariants(),
              "h-auto px-[26px] py-[15px] text-[15px] font-semibold bg-white text-orange hover:bg-ink hover:text-white",
            )}
          >
            Essayer la démo
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
          </Link>
          <Link
            href="#pricing"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-auto px-[26px] py-[15px] text-[15px] border-white text-white bg-transparent hover:bg-white hover:text-orange",
            )}
          >
            Voir les tarifs
          </Link>
        </div>
      </div>
    </section>
  );
}
