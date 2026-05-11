import { ArrowUpDownIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import type { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

type Props<TData, TValue> = {
  column: Column<TData, TValue>;
  children: React.ReactNode;
  className?: string;
};

/**
 * Header cell for a sortable column. Click cycles asc → desc → none.
 * Non-sortable columns render their children as-is.
 */
export const DataTableColumnHeader = <TData, TValue>({
  column,
  children,
  className,
}: Props<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <span className={className}>{children}</span>;
  }

  const sort = column.getIsSorted();
  const Icon = sort === "asc" ? ArrowUpIcon : sort === "desc" ? ArrowDownIcon : ArrowUpDownIcon;

  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sort === "asc")}
      className={cn(
        "inline-flex items-center gap-1 transition-colors hover:text-ink",
        sort ? "text-ink" : "",
        className,
      )}
    >
      {children}
      <Icon
        className={cn(
          "size-3",
          sort ? "text-orange" : "opacity-60",
        )}
      />
    </button>
  );
};
