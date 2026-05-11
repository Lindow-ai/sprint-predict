import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

type Props<TData> = {
  table: Table<TData>;
};

/**
 * Compact pagination control + row count summary, styled for the
 * warm-paper design.
 */
export const DataTablePagination = <TData,>({ table }: Props<TData>) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3">
      <span className="font-mono text-[11px] text-ink-faint tabular-nums">
        {start}–{end} / {totalRows}
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          className="size-8 p-0 hover:bg-bg-alt"
          aria-label="Première page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          <ChevronsLeftIcon className="size-4" />
        </Button>
        <Button
          variant="ghost"
          className="size-8 p-0 hover:bg-bg-alt"
          aria-label="Page précédente"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <span className="font-mono text-[11px] text-ink-soft px-2 tabular-nums">
          {pageIndex + 1} / {Math.max(1, totalPages)}
        </span>
        <Button
          variant="ghost"
          className="size-8 p-0 hover:bg-bg-alt"
          aria-label="Page suivante"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
        <Button
          variant="ghost"
          className="size-8 p-0 hover:bg-bg-alt"
          aria-label="Dernière page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(totalPages - 1)}
        >
          <ChevronsRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
