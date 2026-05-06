export type TicketStatus = "ready" | "warn" | "critical";
export type TicketType = "Story" | "Task" | "Bug" | "Spike";

export type Ticket = {
  id: string;
  jiraKey: string;
  title: string;
  type: TicketType;
  score: number;
  status: TicketStatus;
  assignee: string;
  assigneeInitials: string;
  sprint: string;
  analyzedAt: string; // ISO date
  questionsCount: number;
  criteriaCount: number;
  reopenRisk: number; // 0..1
};

export type TicketFilter = {
  status?: TicketStatus;
  sprintId?: string;
  search?: string;
};

export function statusFromScore(score: number): TicketStatus {
  if (score >= 75) return "ready";
  if (score >= 50) return "warn";
  return "critical";
}
