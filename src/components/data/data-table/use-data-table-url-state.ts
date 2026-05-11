"use client";

import { useMemo } from "react";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import type { DataTableState } from "./data-table";

type Options = {
  /** Override defaults — useful to start on a specific facet. */
  defaults?: Partial<Pick<DataTableState, "facet" | "search" | "page">>;
};

/**
 * Drop-in URL-state hook for the DataTable. Returns a `[state, setState]`
 * pair shaped exactly like the table's controlled API.
 *
 * State is serialized into the URL as `?search=…&status=…&sort=…&dir=…&page=…`
 * so filter combinations are shareable and bookmarkable.
 */
export const useDataTableUrlState = ({ defaults }: Options = {}) => {
  const [raw, setRaw] = useQueryStates(
    {
      search: parseAsString.withDefault(defaults?.search ?? ""),
      status: parseAsString.withDefault(defaults?.facet ?? "all"),
      sort: parseAsString,
      dir: parseAsStringEnum<"asc" | "desc">(["asc", "desc"]),
      page: parseAsInteger.withDefault(defaults?.page ?? 0),
    },
    {
      // Drop params from URL when they hit their default — keeps URLs clean.
      clearOnDefault: true,
      history: "replace",
    },
  );

  const state: DataTableState = useMemo(
    () => ({
      search: raw.search,
      facet: raw.status,
      sortId: raw.sort,
      sortDir: raw.dir,
      page: raw.page,
    }),
    [raw],
  );

  const setState = (next: DataTableState) => {
    void setRaw({
      search: next.search,
      status: next.facet,
      sort: next.sortId,
      dir: next.sortDir,
      page: next.page,
    });
  };

  return [state, setState] as const;
};
