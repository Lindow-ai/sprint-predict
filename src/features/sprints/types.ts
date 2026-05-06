export type Sprint = {
  id: string;
  name: string;
  startsAt: string; // ISO date
  endsAt: string; // ISO date
  ticketIds: string[];
};
