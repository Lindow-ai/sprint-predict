import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { ScorePill, type Ticket } from "@/features/tickets";
import { InitialsAvatar } from "@/components/data/initials-avatar";
import { DataTableColumnHeader } from "@/components/data/data-table";
import { timeAgo } from "@/lib/utils/time";
import { StatusLabel } from "./status-label";
import { RiskBar } from "./risk-bar";

/**
 * Column definitions for the tickets table. Centralized here so a future
 * "saved view" / "column visibility" feature only needs to read this list.
 */
export const ticketColumns: ColumnDef<Ticket>[] = [
  {
    id: "title",
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>Ticket</DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const t = row.original;
      return (
        <div className="flex flex-col gap-0.5 min-w-0 max-w-[360px]">
          <span className="font-medium truncate">{t.title}</span>
          <span className="font-mono text-[11px] text-ink-faint">
            {t.jiraKey} · {t.type}
          </span>
        </div>
      );
    },
  },
  {
    id: "score",
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>Score</DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <ScorePill score={row.original.score} status={row.original.status} />
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Statut",
    enableSorting: false,
    cell: ({ row }) => <StatusLabel status={row.original.status} />,
    meta: {
      headerClassName: "hidden lg:table-cell",
      cellClassName: "hidden lg:table-cell",
    },
  },
  {
    id: "assignee",
    accessorKey: "assignee",
    header: "Assignée",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <InitialsAvatar initials={row.original.assigneeInitials} size="sm" />
        <span className="text-ink-soft text-xs">{row.original.assignee}</span>
      </div>
    ),
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "hidden md:table-cell",
    },
  },
  {
    id: "sprint",
    accessorKey: "sprint",
    header: "Sprint",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-ink-soft text-xs">{row.original.sprint}</span>
    ),
    meta: {
      headerClassName: "hidden lg:table-cell",
      cellClassName: "hidden lg:table-cell",
    },
  },
  {
    id: "reopenRisk",
    accessorKey: "reopenRisk",
    header: "Re-open risk",
    enableSorting: false,
    cell: ({ row }) => <RiskBar value={row.original.reopenRisk} />,
    meta: {
      headerClassName: "hidden lg:table-cell",
      cellClassName: "hidden lg:table-cell",
    },
  },
  {
    id: "analyzedAt",
    accessorKey: "analyzedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>Analysé</DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <span className="text-ink-faint text-xs">
        {timeAgo(row.original.analyzedAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: ({ row }) => (
      <Link
        href={`/dashboard/tickets/${row.original.id}`}
        className="font-medium text-orange text-xs hover:underline"
      >
        Ouvrir →
      </Link>
    ),
    meta: { cellClassName: "text-right" },
  },
];
