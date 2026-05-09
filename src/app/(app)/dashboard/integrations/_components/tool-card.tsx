"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "orange" | "amber";

const BADGE_CLS: Record<BadgeTone, string> = {
  orange: "bg-orange-soft text-orange",
  amber: "bg-amber-soft text-amber",
};

type Props = {
  name: string;
  desc: string;
  initials: string;
  /** Brand color for the logo tile (hex). */
  color: string;
  badge?: string;
  badgeTone?: BadgeTone;
};

/** Secondary integration card with a mock toggle-to-connect interaction. */
export const ToolCard = ({
  name,
  desc,
  initials,
  color,
  badge,
  badgeTone,
}: Props) => {
  const [connected, setConnected] = useState(false);
  return (
    <div className="bg-paper border border-line rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div
          className="size-10 rounded-lg text-white flex items-center justify-center font-mono text-xs font-semibold"
          style={{ background: color }}
        >
          {initials}
        </div>
        {badge && badgeTone && (
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.05em] px-2 py-0.5 rounded-full font-semibold",
              BADGE_CLS[badgeTone],
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <div>
        <h4 className="font-serif text-[18px] mb-1">{name}</h4>
        <p className="text-xs text-ink-soft leading-relaxed">{desc}</p>
      </div>
      <button
        onClick={() => setConnected(!connected)}
        className={cn(
          "mt-auto py-2 rounded-md text-xs font-medium transition-colors",
          connected
            ? "bg-leaf-soft text-leaf"
            : "bg-bg-alt hover:bg-ink hover:text-bg text-ink-soft",
        )}
      >
        {connected ? "✓ Connecté" : "Connecter"}
      </button>
    </div>
  );
};
