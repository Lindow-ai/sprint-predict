import { GripVerticalIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { Rule } from "../_data";
import { WeightControl } from "./weight-control";

type Props = {
  rule: Rule;
  onToggle: () => void;
  onWeightChange: (w: number) => void;
};

export const RuleRow = ({ rule, onToggle, onWeightChange }: Props) => (
  <li
    className={cn(
      "px-5 py-4 flex items-center gap-4 transition-colors",
      !rule.enabled && "opacity-55",
    )}
  >
    <GripVerticalIcon className="size-4 text-ink-faint cursor-grab shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="font-medium text-[14px]">{rule.label}</div>
      <div className="text-xs text-ink-faint mt-0.5">{rule.hint}</div>
    </div>
    <div className="flex items-center gap-3 shrink-0">
      <WeightControl
        value={rule.weight}
        disabled={!rule.enabled}
        onChange={onWeightChange}
      />
      <Switch checked={rule.enabled} onCheckedChange={onToggle} />
    </div>
  </li>
);
