import { ArrowUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
};

export const SortButton = ({ children, active, dir, onClick }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "inline-flex items-center gap-1 hover:text-ink transition-colors",
      active && "text-ink",
    )}
  >
    {children}
    <ArrowUpDownIcon
      className={cn(
        "size-3 transition-transform",
        active && dir === "desc" && "rotate-180",
      )}
    />
  </button>
);
