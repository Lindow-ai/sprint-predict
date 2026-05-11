"use client";

import {
  ticketRepo,
  type TicketStatus,
} from "@/features/tickets";
import {
  DataTable,
  useDataTableUrlState,
  type FacetFilter,
  type SearchConfig,
} from "@/components/data/data-table";
import { Button } from "@/components/ui/button";
import { DownloadIcon, RefreshCwIcon } from "lucide-react";
import type { Ticket } from "@/features/tickets";
import { ticketColumns } from "./_components/columns";

const ALL_TICKETS = ticketRepo.list();

const STATUS_FACET: FacetFilter<Ticket> = {
  id: "status",
  label: "Statut",
  options: [
    { value: "ready" satisfies TicketStatus, label: "Prêts", tone: "leaf" },
    { value: "warn" satisfies TicketStatus, label: "À clarifier", tone: "amber" },
    { value: "critical" satisfies TicketStatus, label: "Bloquants", tone: "rust" },
  ],
};

const SEARCH: SearchConfig<Ticket> = {
  columns: ["title", "jiraKey", "assignee"],
  placeholder: "PROJ-1247, titre, assignée…",
};

const TicketsListPage = () => {
  const [state, setState] = useDataTableUrlState();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2">
            › Tickets analysés
          </div>
          <h1 className="font-serif text-[36px] leading-tight tracking-[-0.02em]">
            Tous les tickets
          </h1>
          <p className="text-ink-soft mt-1">
            {ALL_TICKETS.length} tickets dans le périmètre
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-line bg-paper h-9 text-xs">
            <RefreshCwIcon className="size-3.5" />
            Resynchroniser Jira
          </Button>
          <Button variant="outline" className="border-line bg-paper h-9 text-xs">
            <DownloadIcon className="size-3.5" />
            Exporter CSV
          </Button>
        </div>
      </div>

      <DataTable
        columns={ticketColumns}
        data={ALL_TICKETS}
        search={SEARCH}
        facet={STATUS_FACET}
        state={state}
        onStateChange={setState}
        emptyMessage="Aucun ticket ne correspond à ces filtres."
      />
    </div>
  );
};

export default TicketsListPage;
