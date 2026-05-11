import { SearchIcon, XIcon } from "lucide-react";
import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FacetFilter, SearchConfig } from "./types";

type Props<TData> = {
  table: Table<TData>;
  search?: SearchConfig<TData>;
  searchValue: string;
  onSearchChange: (v: string) => void;
  facet?: FacetFilter<TData>;
  facetValue: string;
  onFacetChange: (v: string) => void;
  /** Single-shot reset — clears search + facet in one update. */
  onReset: () => void;
  facetCounts?: Record<string, number>;
};

/**
 * Toolbar above a DataTable: free-text search + optional single-facet
 * tab filter. Multi-facet support can be layered on later if needed.
 */
export const DataTableToolbar = <TData,>({
  search,
  searchValue,
  onSearchChange,
  facet,
  facetValue,
  onFacetChange,
  onReset,
  facetCounts,
}: Props<TData>) => {
  const hasFilter =
    Boolean(searchValue) || (facet && facetValue !== "all");

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      {facet && (
        <Tabs value={facetValue} onValueChange={onFacetChange}>
          <TabsList className="bg-paper border border-line">
            <TabsTrigger value="all">
              Tous {facetCounts && <Count value={facetCounts.all} />}
            </TabsTrigger>
            {facet.options.map((opt) => (
              <TabsTrigger key={opt.value} value={opt.value}>
                {opt.label}
                {facetCounts && (
                  <Count value={facetCounts[opt.value]} tone={opt.tone} />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="flex items-center gap-2 w-full md:w-auto">
        {search && (
          <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-faint pointer-events-none" />
            <Input
              placeholder={search.placeholder ?? "Rechercher…"}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9 bg-paper border-line"
            />
          </div>
        )}
        {hasFilter && (
          <Button
            variant="ghost"
            className="h-9 text-xs text-ink-soft hover:text-ink"
            onClick={onReset}
          >
            <XIcon className="size-3.5" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

const TONES = {
  neutral: "bg-line/50 text-ink-soft",
  leaf: "bg-leaf-soft text-leaf",
  amber: "bg-amber-soft text-amber",
  rust: "bg-rust-soft text-rust",
} as const;

type CountProps = {
  value?: number;
  tone?: keyof typeof TONES;
};

const Count = ({ value, tone = "neutral" }: CountProps) =>
  value === undefined ? null : (
    <span
      className={cn(
        "ml-1.5 font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded tabular-nums",
        TONES[tone],
      )}
    >
      {value}
    </span>
  );
