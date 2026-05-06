import { ticketRepo, avgScore } from "@/features/tickets";
import { sprintRepo } from "./repository";

/**
 * Synthetic 6-sprint score trend, anchored on the current sprint's avg.
 * Will be replaced by real historical data once we persist analyses.
 */
export function scoreTrend(): { sprint: string; score: number }[] {
  const cur = avgScore(ticketRepo.bySprint(sprintRepo.current().id));
  const trend = [-12, -7, -3, +2, +5, 0];
  return trend.map((delta, i) => ({
    sprint: `S${37 + i}`,
    score: Math.max(20, Math.min(95, cur + delta)),
  }));
}
