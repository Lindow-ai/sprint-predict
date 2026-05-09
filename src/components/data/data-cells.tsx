import { cn } from "@/lib/utils";

type ThProps = React.ComponentProps<"th">;
type TdProps = React.ComponentProps<"td">;

/**
 * Lightweight table cell primitives styled to match the warm-paper
 * design — used by every dashboard table.
 */
export const Th = ({ className, children, ...props }: ThProps) => (
  <th
    className={cn(
      "font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint font-medium px-3 py-2",
      className,
    )}
    {...props}
  >
    {children}
  </th>
);

export const Td = ({ className, children, ...props }: TdProps) => (
  <td className={cn("px-3 py-3 align-middle", className)} {...props}>
    {children}
  </td>
);
