type Props = {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
};

/** Inline ± stepper used to tune a rule's weight (1..10 by default). */
export const WeightControl = ({
  value,
  onChange,
  disabled,
  min = 1,
  max = 10,
}: Props) => (
  <div className="flex items-center gap-1 bg-bg-alt rounded-md p-0.5">
    <button
      type="button"
      disabled={disabled || value <= min}
      onClick={() => onChange(value - 1)}
      className="size-6 rounded text-xs hover:bg-paper disabled:opacity-30 disabled:hover:bg-transparent"
    >
      −
    </button>
    <span className="font-mono text-xs tabular-nums w-6 text-center">
      {value}
    </span>
    <button
      type="button"
      disabled={disabled || value >= max}
      onClick={() => onChange(value + 1)}
      className="size-6 rounded text-xs hover:bg-paper disabled:opacity-30 disabled:hover:bg-transparent"
    >
      +
    </button>
  </div>
);
