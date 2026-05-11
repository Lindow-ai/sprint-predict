import type { Column } from "@tanstack/react-table";

/** A column that exposes a finite set of values to filter on (facets). */
export type FacetFilter<TData> = {
  /** Id of the column to filter (must match `accessorKey` / `id` of a column). */
  id: keyof TData & string;
  /** Display label for the facet trigger. */
  label: string;
  /** Available values + their human labels. */
  options: Array<{
    value: string;
    label: string;
    /** Optional tone for the count badge next to the option. */
    tone?: "neutral" | "leaf" | "amber" | "rust";
  }>;
};

/** Configuration for the single freeform search input above the table. */
export type SearchConfig<TData> = {
  /** Columns whose values are concatenated for the search filter. */
  columns: Array<keyof TData & string>;
  placeholder?: string;
};

/** Re-exported for column meta typing. */
export type ColumnLike<TData> = Column<TData, unknown>;
