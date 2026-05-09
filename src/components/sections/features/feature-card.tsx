import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  eyebrowClassName?: string;
  descClassName?: string;
  eyebrow: string;
  title: React.ReactNode;
  desc: string;
  children?: React.ReactNode;
};

/**
 * Generic feature highlight card used 4× on the landing.
 * Defaults to the warm-paper look; pass `bg-ink text-bg` via className
 * for the dark accent treatment.
 */
export const FeatureCard = ({
  className = "",
  eyebrowClassName = "opacity-70",
  descClassName = "opacity-[0.78]",
  eyebrow,
  title,
  desc,
  children,
}: Props) => (
  <div
    className={cn(
      "bg-paper border border-line rounded-[10px] p-8 transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_40px_-10px_rgba(26,24,20,0.12)]",
      className,
    )}
  >
    <div
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.08em] mb-4",
        eyebrowClassName,
      )}
    >
      {eyebrow}
    </div>
    <h3 className="font-serif text-[26px] font-medium tracking-[-0.02em] leading-[1.15] mb-3">
      {title}
    </h3>
    <p className={cn("text-[15px] leading-[1.55]", descClassName)}>{desc}</p>
    {children}
  </div>
);
