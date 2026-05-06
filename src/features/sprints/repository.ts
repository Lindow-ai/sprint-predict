import { SPRINTS_SEED } from "@/lib/seed/mock";
import type { Sprint } from "./types";

export const sprintRepo = {
  list(): Sprint[] {
    return SPRINTS_SEED;
  },

  find(id: string): Sprint | undefined {
    return SPRINTS_SEED.find((s) => s.id === id);
  },

  /** Most recently started sprint — useful as default selection. */
  current(): Sprint {
    return SPRINTS_SEED[SPRINTS_SEED.length - 1];
  },
};
