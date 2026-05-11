"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Th, Td } from "../data-cells";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import type { FacetFilter, SearchConfig } from "./types";

type DataTableState = {
  search: string;
  facet: string;
  sortId: string | null;
  sortDir: "asc" | "desc" | null;
  page: number;
};

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];

  /** Optional freeform search bar config. */
  search?: SearchConfig<TData>;

  /** Optional single-facet filter (tabs above the table). */
  facet?: FacetFilter<TData>;

  /**
   * Controlled state — when provided, the parent owns the state
   * (typically backed by URL query via nuqs). If omitted, the table
   * keeps its own internal state.
   */
  state?: DataTableState;
  onStateChange?: (next: DataTableState) => void;

  /** Page size — defaults to 15. */
  pageSize?: number;

  /** Empty-state message. */
  emptyMessage?: string;

  /** Optional extra content rendered between the toolbar and the table. */
  toolbarExtra?: React.ReactNode;
};

const DEFAULT_STATE: DataTableState = {
  search: "",
  facet: "all",
  sortId: null,
  sortDir: null,
  page: 0,
};

export const DataTable = <TData,>({
  columns,
  data,
  search,
  facet,
  state,
  onStateChange,
  pageSize = 15,
  emptyMessage = "Aucune ligne ne correspond à ces filtres.",
  toolbarExtra,
}: Props<TData>) => {
  const [internalState, setInternalState] = useState<DataTableState>(DEFAULT_STATE);
  const current = state ?? internalState;

  const update = (patch: Partial<DataTableState>) => {
    const next = { ...current, ...patch };
    if (onStateChange) onStateChange(next);
    else setInternalState(next);
  };

  // Adapt our flat state to TanStack's shapes.
  const sorting: SortingState = current.sortId
    ? [{ id: current.sortId, desc: current.sortDir === "desc" }]
    : [];

  const pagination: PaginationState = {
    pageIndex: current.page,
    pageSize,
  };

  // Build a single "global" filter that the table runs on the search columns.
  const globalFilter = useMemo(() => current.search.trim().toLowerCase(), [current.search]);

  const facetValue = current.facet;
  const facetId = facet?.id;

  const filteredData = useMemo(() => {
    let rows = data;
    if (facetId && facetValue !== "all") {
      rows = rows.filter(
        (r) => String((r as Record<string, unknown>)[facetId]) === facetValue,
      );
    }
    if (search && globalFilter) {
      rows = rows.filter((r) => {
        const row = r as Record<string, unknown>;
        return search.columns.some((col) =>
          String(row[col] ?? "")
            .toLowerCase()
            .includes(globalFilter),
        );
      });
    }
    return rows;
  }, [data, facetId, facetValue, search, globalFilter]);

  // Pre-compute facet counts on the un-facet-filtered set (so counts don't shrink as you toggle).
  const facetCounts = useMemo(() => {
    if (!facet) return undefined;
    const base = search && globalFilter
      ? data.filter((r) => {
          const row = r as Record<string, unknown>;
          return search.columns.some((col) =>
            String(row[col] ?? "")
              .toLowerCase()
              .includes(globalFilter),
          );
        })
      : data;
    const counts: Record<string, number> = { all: base.length };
    for (const opt of facet.options) counts[opt.value] = 0;
    for (const r of base) {
      const v = String((r as Record<string, unknown>)[facet.id]);
      if (counts[v] !== undefined) counts[v] += 1;
    }
    return counts;
  }, [data, facet, search, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, pagination },
    onSortingChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(sorting) : updater;
      if (next.length === 0) {
        update({ sortId: null, sortDir: null, page: 0 });
      } else {
        update({
          sortId: next[0].id,
          sortDir: next[0].desc ? "desc" : "asc",
          page: 0,
        });
      }
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;
      update({ page: next.pageIndex });
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar
        table={table}
        search={search}
        searchValue={current.search}
        onSearchChange={(v) => update({ search: v, page: 0 })}
        facet={facet}
        facetValue={facetValue}
        onFacetChange={(v) => update({ facet: v, page: 0 })}
        onReset={() =>
          update({ search: "", facet: "all", page: 0, sortId: null, sortDir: null })
        }
        facetCounts={facetCounts}
      />

      {toolbarExtra}

      <div className="bg-paper border border-line rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-bg-alt/40 text-left">
                {hg.headers.map((header) => (
                  <Th
                    key={header.id}
                    className={cn(
                      header.column.columnDef.meta &&
                        (header.column.columnDef.meta as { headerClassName?: string })
                          .headerClassName,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-ink-faint"
                >
                  <AlertTriangleIcon className="size-5 mx-auto mb-2 opacity-50" />
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-line hover:bg-bg-alt/40 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      className={cn(
                        cell.column.columnDef.meta &&
                          (cell.column.columnDef.meta as { cellClassName?: string })
                            .cellClassName,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="border-t border-line">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
};

export type { DataTableState };
