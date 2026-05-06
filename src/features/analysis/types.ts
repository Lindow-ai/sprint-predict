import type { Ticket } from "@/features/tickets";

/**
 * One axis of a readiness score breakdown.
 * The 4 default dimensions sum to 100 in `weight`.
 */
export type ScoreDimension = {
  key: string;
  label: string;
  score: number; // 0..100
  weight: number; // contribution
};

export type TicketAnalysis = {
  ticket: Ticket;
  questions: string[];
  criteria: [string, string][]; // [keyword, text]
  dimensions: ScoreDimension[];
  summary: string;
};
