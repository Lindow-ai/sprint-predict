import type { Preset } from "@/features/analysis";

type ColorTone = {
  bg: string;
  fg: string;
  grad: string;
};

const COLOR_MAP: Record<NonNullable<Preset["labelColor"]>, ColorTone> = {
  red: {
    bg: "var(--color-rust-soft)",
    fg: "var(--color-rust)",
    grad: "linear-gradient(90deg, var(--color-rust), var(--color-orange))",
  },
  amber: {
    bg: "var(--color-amber-soft)",
    fg: "var(--color-amber)",
    grad: "linear-gradient(90deg, var(--color-amber), var(--color-orange))",
  },
  green: {
    bg: "var(--color-leaf-soft)",
    fg: "var(--color-leaf)",
    grad: "linear-gradient(90deg, var(--color-amber), var(--color-leaf))",
  },
};

type Props = {
  preset: Preset;
  posted: boolean;
  onPost: () => void;
};

export const ResultView = ({ preset, posted, onPost }: Props) => {
  const c = COLOR_MAP[preset.labelColor!];
  const score = preset.score ?? 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Score */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[11px] uppercase text-ink-faint tracking-[0.05em]">
            › Readiness Score
          </span>
        </div>
        <div className="bg-paper border border-line rounded-[10px] p-4.5">
          <div className="flex items-baseline gap-3.5 mb-2.5">
            <div className="font-serif text-[56px] font-medium tracking-[-0.04em] leading-none">
              {score}
              <span className="text-[22px] text-ink-faint font-normal">
                /100
              </span>
            </div>
            <span
              className="font-mono text-[11px] uppercase py-1 px-2.5 rounded-full font-semibold"
              style={{ background: c.bg, color: c.fg }}
            >
              {preset.label}
            </span>
          </div>
          <div className="h-1.5 bg-bg rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${score}%`, background: c.grad }}
            />
          </div>
        </div>
      </div>

      {/* Questions */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[11px] uppercase text-ink-faint tracking-[0.05em]">
            › Questions à clarifier ({preset.questions?.length})
          </span>
        </div>
        <div className="bg-paper border border-line rounded-[10px] p-4">
          <ul className="list-none flex flex-col gap-2.5">
            {preset.questions?.map((q, i) => (
              <li key={i} className="text-[13px] leading-[1.5] pl-[22px] relative">
                <span className="absolute left-0 top-0 w-4 h-4 bg-orange text-white rounded-full font-mono text-[10px] font-bold flex items-center justify-center">
                  ?
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Criteria */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[11px] uppercase text-ink-faint tracking-[0.05em]">
            › Critères d&apos;acceptation suggérés
          </span>
        </div>
        <div className="bg-paper border border-line rounded-[10px] p-4">
          <ul className="list-none flex flex-col gap-2.5">
            {preset.criteria?.map(([k, v], i) => (
              <li key={i} className="text-[13px] leading-[1.5] pl-[22px] relative">
                <span className="absolute left-0 top-px w-4 h-4 bg-leaf text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  ✓
                </span>
                <strong className="font-mono text-[11px] text-orange uppercase">
                  {k}
                </strong>{" "}
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Post to Jira */}
      <button
        onClick={onPost}
        disabled={posted}
        className={`w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-opacity ${
          posted ? "bg-leaf text-white" : "bg-jira text-white hover:opacity-90"
        }`}
      >
        {posted ? (
          "✓ Posté dans Jira"
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.762a1.005 1.005 0 0 0-1.001-1.005zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.005 1.005 0 0 0 23.013 0z" />
            </svg>
            Poster le résumé dans Jira
          </>
        )}
      </button>
    </div>
  );
};
