import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "./check-icon";
import type { Plan } from "./plans";

type Props = { plan: Plan };

export const PriceCard = ({ plan }: Props) => {
  const featured = plan.featured;
  return (
    <div
      className={cn(
        "relative rounded-[14px] p-9 px-8 flex flex-col border",
        featured
          ? "bg-ink text-bg border-ink md:-translate-y-3 shadow-[0_30px_60px_-20px_rgba(26,24,20,0.4)]"
          : "bg-paper border-line",
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white py-1 px-3.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-[0.05em]">
          Le plus populaire
        </span>
      )}
      <h3 className="font-serif text-[26px] font-medium mb-1.5 tracking-[-0.02em]">
        {plan.name}
      </h3>
      <div
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.05em] mb-7",
          featured ? "text-bg/50" : "text-ink-faint",
        )}
      >
        {plan.tag}
      </div>

      <div className="flex items-baseline gap-1.5 mb-2">
        {plan.price.currency && (
          <span className="font-serif text-[28px] font-normal">
            {plan.price.currency}
          </span>
        )}
        <span className="font-serif text-[64px] font-medium tracking-[-0.04em] leading-none">
          {plan.price.num}
        </span>
        <span
          className={cn(
            "text-sm",
            featured ? "text-bg/60" : "text-ink-faint",
            plan.price.mode === "custom" && "ml-2",
          )}
        >
          {plan.price.period}
        </span>
      </div>

      <p
        className={cn(
          "text-sm leading-[1.55] mb-7 pb-7 border-b border-dashed",
          featured ? "text-bg/70 border-bg/15" : "text-ink-soft border-line",
        )}
      >
        {plan.desc}
      </p>

      <ul className="list-none flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm leading-[1.5]"
          >
            <CheckIcon
              className={cn(
                "shrink-0 mt-0.5",
                featured ? "text-[#ffb89e]" : "text-orange",
              )}
            />
            {f}
          </li>
        ))}
      </ul>

      {plan.cta.variant === "accent" ? (
        <Link
          href="#"
          className={cn(
            buttonVariants(),
            "w-full h-auto justify-center py-3.5 bg-orange text-white hover:bg-orange/90 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(255,91,31,0.25)]",
          )}
        >
          {plan.cta.label}
        </Link>
      ) : (
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full h-auto justify-center py-3.5",
            featured
              ? "border-bg text-bg hover:bg-bg hover:text-ink"
              : "border-ink text-ink hover:bg-ink hover:text-bg",
          )}
        >
          {plan.cta.label}
        </Link>
      )}
    </div>
  );
};
