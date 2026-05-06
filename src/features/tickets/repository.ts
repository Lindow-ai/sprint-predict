/**
 * Ticket repository — single source of truth for reading tickets.
 *
 * Today: backed by the deterministic mock seed.
 * Tomorrow: swap the implementation for a real DB / API call without
 * touching the call sites.
 *
 * Keep this module **server-safe** — no React, no client hooks.
 */

import { TICKETS_SEED } from "@/lib/seed/mock";
import type { Ticket, TicketFilter } from "./types";

export const ticketRepo = {
  /** Return all tickets, optionally filtered. */
  list(filter?: TicketFilter): Ticket[] {
    let rows: Ticket[] = TICKETS_SEED;
    if (filter?.status)
      rows = rows.filter((t) => t.status === filter.status);
    if (filter?.sprintId)
      rows = rows.filter((t) => t.sprint === filter.sprintId);
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      rows = rows.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.jiraKey.toLowerCase().includes(q) ||
          t.assignee.toLowerCase().includes(q),
      );
    }
    return rows;
  },

  /** Resolve a ticket by internal id or Jira key. */
  find(idOrKey: string): Ticket | undefined {
    return TICKETS_SEED.find(
      (t) =>
        t.id === idOrKey || t.jiraKey.toLowerCase() === idOrKey.toLowerCase(),
    );
  },

  /** Tickets attached to a given sprint. */
  bySprint(sprintId: string): Ticket[] {
    return TICKETS_SEED.filter((t) => t.sprint === sprintId);
  },

  /** Most recently analyzed tickets, newest first. */
  recent(limit = 10): Ticket[] {
    return [...TICKETS_SEED]
      .sort((a, b) => b.analyzedAt.localeCompare(a.analyzedAt))
      .slice(0, limit);
  },
};
