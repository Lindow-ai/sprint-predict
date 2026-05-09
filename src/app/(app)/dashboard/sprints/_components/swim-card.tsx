import Link from "next/link";
import { GripVerticalIcon } from "lucide-react";
import { ScorePill, type Ticket } from "@/features/tickets";
import { InitialsAvatar } from "@/components/data/initials-avatar";

/** Compact ticket card displayed inside a sprint swimlane column. */
export const SwimCard = ({ ticket }: { ticket: Ticket }) => (
  <Link
    href={`/dashboard/tickets/${ticket.id}`}
    className="group block bg-paper border border-line rounded-md p-3 hover:border-orange/40 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
  >
    <div className="flex items-start gap-2">
      <GripVerticalIcon className="size-3.5 text-ink-faint shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium leading-snug line-clamp-2">
          {ticket.title}
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] text-ink-faint">
            {ticket.jiraKey}
          </span>
          <div className="flex items-center gap-2">
            <ScorePill
              score={ticket.score}
              status={ticket.status}
              size="sm"
            />
            <InitialsAvatar initials={ticket.assigneeInitials} size="xs" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);
