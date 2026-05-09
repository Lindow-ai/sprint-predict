"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon, SaveIcon, SparklesIcon } from "lucide-react";
import { CATEGORIES, DEFAULT_RULES, PRESETS, type Rule } from "./_data";
import { PresetCard } from "./_components/preset-card";
import { RuleRow } from "./_components/rule-row";
import { TestPanel } from "./_components/test-panel";

const TemplatesPage = () => {
  const [rules, setRules] = useState<Rule[]>(DEFAULT_RULES);
  const [activePreset, setActivePreset] = useState("scaled");

  const grouped = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        category: c,
        rules: rules.filter((r) => r.category === c),
      })),
    [rules],
  );

  const enabled = rules.filter((r) => r.enabled).length;
  const totalWeight = rules
    .filter((r) => r.enabled)
    .reduce((s, r) => s + r.weight, 0);

  const toggle = (id: string) =>
    setRules((rs) =>
      rs.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );

  const setWeight = (id: string, w: number) =>
    setRules((rs) => rs.map((r) => (r.id === id ? { ...r, weight: w } : r)));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2">
            › Templates équipe
          </div>
          <h1 className="font-serif text-[36px] tracking-[-0.02em]">
            Définissez votre{" "}
            <em className="italic font-light text-orange">« ticket prêt ».</em>
          </h1>
          <p className="text-ink-soft mt-2 max-w-2xl">
            {enabled} règles actives · poids total {totalWeight} · ces règles
            alimentent le scoring de tous les tickets de ton équipe.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-line bg-paper h-10">
            <PlusIcon className="size-4" />
            Nouvelle règle
          </Button>
          <Button className="bg-orange text-white h-10 hover:bg-orange/90">
            <SaveIcon className="size-4" />
            Appliquer à l&apos;équipe
          </Button>
        </div>
      </div>

      {/* Presets */}
      <section className="bg-paper border border-line rounded-xl p-5">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3">
          <SparklesIcon className="size-3.5 text-orange" />
          Templates pré-configurés
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESETS.map((p) => (
            <PresetCard
              key={p.id}
              preset={p}
              active={p.id === activePreset}
              onSelect={() => setActivePreset(p.id)}
            />
          ))}
        </div>
      </section>

      {/* Rules grouped by category */}
      <div className="space-y-6">
        {grouped.map((g) => (
          <section
            key={g.category}
            className={cn(
              "bg-paper border border-line rounded-xl overflow-hidden",
            )}
          >
            <header className="px-5 py-3 border-b border-line bg-bg-alt/40 flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
                {g.category}
              </div>
              <span className="font-mono text-[10px] text-ink-faint">
                {g.rules.filter((r) => r.enabled).length} / {g.rules.length}{" "}
                actives
              </span>
            </header>
            <ul className="divide-y divide-line">
              {g.rules.map((r) => (
                <RuleRow
                  key={r.id}
                  rule={r}
                  onToggle={() => toggle(r.id)}
                  onWeightChange={(w) => setWeight(r.id, w)}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <TestPanel />
    </div>
  );
};

export default TemplatesPage;
