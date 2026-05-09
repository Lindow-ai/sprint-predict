import { cn } from "@/lib/utils";
import type { Preset } from "../_data";

type Props = {
  preset: Preset;
  active: boolean;
  onSelect: () => void;
};

export const PresetCard = ({ preset, active, onSelect }: Props) => (
  <button
    onClick={onSelect}
    className={cn(
      "text-left p-4 rounded-lg border transition-all",
      active
        ? "bg-ink text-bg border-ink shadow-sm"
        : "bg-bg-alt/40 border-line hover:border-orange/40",
    )}
  >
    <div
      className={cn(
        "font-serif text-[18px] mb-1",
        active ? "text-bg" : "text-ink",
      )}
    >
      {preset.name}
    </div>
    <div className={cn("text-xs", active ? "text-bg/60" : "text-ink-soft")}>
      {preset.desc}
    </div>
  </button>
);
