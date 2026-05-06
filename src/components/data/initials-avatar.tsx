import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent";

const SIZES = {
  xs: "size-5 text-[9px]",
  sm: "size-6 text-[10px]",
  md: "size-7 text-[11px]",
  lg: "size-8 text-sm",
  xl: "size-9 text-base",
} as const;

type Size = keyof typeof SIZES;

type Props = {
  initials: string;
  tone?: Tone;
  size?: Size;
  className?: string;
};

/**
 * Round avatar showing letters — used for assignees in lists and the
 * authenticated user in the topbar. Two tones: neutral (warm-paper)
 * for assignees, accent (orange) for the current user.
 */
export function InitialsAvatar({
  initials,
  tone = "neutral",
  size = "md",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-full inline-flex items-center justify-center font-medium shrink-0",
        SIZES[size],
        tone === "accent"
          ? "bg-orange text-white font-serif"
          : "bg-bg-alt text-ink",
        className,
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
