"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  landingPresets as presets,
  type Preset,
  type PresetKey,
} from "@/features/analysis";
import { EmptyState } from "./empty-state";
import { ResultView } from "./result-view";

const PRESET_BUTTONS: { key: PresetKey; label: string }[] = [
  { key: "weak", label: "Ticket faible" },
  { key: "medium", label: "Ticket moyen" },
  { key: "strong", label: "Ticket bien rédigé" },
  { key: "empty", label: "Vider" },
];

type Result = Preset & { posted?: boolean };

export const DemoSection = () => {
  const [activePreset, setActivePreset] = useState<PresetKey>("weak");
  const [text, setText] = useState(presets.weak.input);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [posted, setPosted] = useState(false);

  const selectPreset = (key: PresetKey) => {
    setActivePreset(key);
    setText(presets[key].input);
    setResult(null);
    setPosted(false);
  };

  const analyze = () => {
    if (!text.trim()) {
      setResult({ input: "", empty: true });
      return;
    }
    setAnalyzing(true);
    setPosted(false);
    setTimeout(() => {
      setResult(presets[activePreset]);
      setAnalyzing(false);
    }, 1100);
  };

  return (
    <section
      className="relative overflow-hidden bg-ink text-bg py-[100px] border-t border-ink z-[2]"
      id="demo"
    >
      {/* Glow */}
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] pointer-events-none bg-[radial-gradient(circle,var(--color-orange)_0%,transparent_60%)] opacity-15" />

      <div className="max-w-[1280px] mx-auto px-8 relative">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-bg/50 mb-6">
          <span className="w-8 h-px bg-orange" />
          Démo interactive
        </div>
        <h2 className="font-serif font-normal mb-6 leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,56px)] max-w-[800px] text-bg">
          Colle un ticket.{" "}
          <em className="italic font-light text-orange">
            Vois ce qui manque.
          </em>
        </h2>
        <p className="text-lg text-bg/70 max-w-[640px] leading-[1.6]">
          La vraie analyse arrive bientôt — voici un aperçu du résultat sur un
          ticket réel.
        </p>

        {/* App window */}
        <div className="mt-[60px] bg-paper text-ink rounded-[14px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="bg-bg-alt py-3.5 px-5 flex items-center gap-3 border-b border-line">
            <div className="flex gap-[7px]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-paper py-1.5 px-3.5 rounded-md font-mono text-xs text-ink-faint text-center">
              <strong className="text-ink">sprint-predict.app</strong>/analyze
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
            {/* Input panel */}
            <div className="p-7 border-b md:border-b-0 md:border-r border-line bg-paper">
              <div className="font-mono text-[11px] uppercase text-ink-faint tracking-[0.05em] mb-3.5">
                › Contenu du ticket Jira
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Colle ici le titre, la description et les critères d'acceptation de ton ticket Jira..."
                className="w-full min-h-[320px] bg-bg border-line rounded-lg p-4 font-mono text-[13px] leading-[1.6] text-ink resize-y mb-4 focus-visible:border-orange focus-visible:ring-0"
              />

              <div className="flex gap-2 flex-wrap mb-3">
                {PRESET_BUTTONS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => selectPreset(p.key)}
                    className={`py-1.5 px-3 rounded-md font-mono text-[11px] cursor-pointer transition-all border ${
                      activePreset === p.key
                        ? "bg-ink text-bg border-ink"
                        : "bg-transparent border-line text-ink-soft hover:border-orange hover:text-orange"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <Button
                onClick={analyze}
                disabled={analyzing}
                className="mt-3 w-full h-auto py-3.5 bg-orange text-white text-sm font-semibold rounded-lg hover:bg-orange/90 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(255,91,31,0.3)] disabled:opacity-60 disabled:translate-y-0"
              >
                {analyzing ? (
                  <>
                    <span>Analyse en cours</span>
                    <span className="flex gap-1 ml-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce-dot" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce-dot [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce-dot [animation-delay:0.4s]" />
                    </span>
                  </>
                ) : (
                  <>
                    <span>{result ? "Réanalyser le ticket" : "Analyser le ticket"}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </Button>
            </div>

            {/* Output panel */}
            <div className="p-7 bg-bg overflow-y-auto">
              {!result || result.empty ? (
                <EmptyState
                  message={
                    result?.empty
                      ? "Colle d'abord un ticket pour lancer l'analyse."
                      : "L'analyse apparaîtra ici.\nChoisis un exemple ou colle ton ticket."
                  }
                />
              ) : (
                <ResultView
                  preset={result}
                  posted={posted}
                  onPost={() => setPosted(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
