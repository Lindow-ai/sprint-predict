import { ticketRepo } from "@/features/tickets";
import { getTicketAnalysisMock } from "./mock";
import type { TicketAnalysis } from "./types";

/**
 * Analysis repository — façade over the analysis backend.
 *
 * Today: deterministic mock derived from a ticket id.
 * Tomorrow: cached lookup of stored analyses + on-demand generation
 * via Claude (see future `actions.ts`).
 */
export const analysisRepo = {
  /** Resolve the latest analysis for a ticket id (or jira key). */
  forTicket(idOrKey: string): TicketAnalysis | undefined {
    const ticket = ticketRepo.find(idOrKey);
    if (!ticket) return undefined;
    return getTicketAnalysisMock(ticket);
  },
};
