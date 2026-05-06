import { cn } from "@/lib/utils";
import type { TicketStatus } from "../types";

const TONES: Record<TicketStatus, string> = {
  ready: "bg-leaf-soft text-leaf",
  warn: "bg-amber-soft text-amber",
  critical: "bg-rust-soft text-rust",
};

type Props = {
  score: number;
  status: TicketStatus;
  size?: "sm" | "md";
  className?: string;
};

/**
 * Compact, color-coded score chip used everywhere a ticket score appears
 * (lists, swimlanes, recent activity, detail header).
 */
export function ScorePill({ score, status, size = "md", className }: Props) {
  return (
    <span
      className={cn(
        "font-mono font-semibold rounded tabular-nums inline-flex items-center justify-center",
        TONES[status],
        size === "sm"
          ? "text-[10px] py-0.5 px-1.5"
          : "text-xs py-1 px-2",
        className,
      )}
    >
      {score}
    </span>
  );
}
