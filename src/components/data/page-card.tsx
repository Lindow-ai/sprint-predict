import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"section">;

/**
 * Standard "panel" surface used across dashboard pages — paper bg,
 * line border, generous padding. Distinct from shadcn's `Card` which
 * carries its own opinions (ring, padding scale).
 */
export const PageCard = ({ className, children, ...props }: Props) => (
  <section
    className={cn(
      "bg-paper border border-line rounded-xl p-5 lg:p-6",
      className,
    )}
    {...props}
  >
    {children}
  </section>
);

type HeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
};

export const PageCardHeader = ({
  title,
  subtitle,
  action,
  className,
}: HeaderProps) => (
  <div className={cn("flex items-start justify-between gap-3 mb-5", className)}>
    <div>
      <h2 className="font-serif text-[20px] leading-tight tracking-[-0.01em]">
        {title}
      </h2>
      {subtitle && <p className="text-xs text-ink-faint mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);
