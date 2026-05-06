"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  PlusIcon,
  GripVerticalIcon,
  SparklesIcon,
  SaveIcon,
} from "lucide-react";

type Rule = {
  id: string;
  category: "Description" | "Critères" | "Contexte" | "Qualité";
  label: string;
  hint: string;
  weight: number; // 1..10
  enabled: boolean;
};

const DEFAULT_RULES: Rule[] = [
  // Description
  {
    id: "r1",
    category: "Description",
    label: "Description min 100 caractères",
    hint: "Pénalise les descriptions trop courtes (< 100 chars).",
    weight: 8,
    enabled: true,
  },
  {
    id: "r2",
    category: "Description",
    label: "Format user story (« en tant que… je veux… afin de… »)",
    hint: "Vérifie la présence d'une formulation user story.",
    weight: 6,
    enabled: true,
  },
  {
    id: "r3",
    category: "Description",
    label: "Mention du persona ciblé",
    hint: "Au moins un rôle/persona doit être nommé.",
    weight: 4,
    enabled: false,
  },
  // Criteria
  {
    id: "r4",
    category: "Critères",
    label: "Au moins 3 critères d'acceptation",
    hint: "Tickets sans critères = score plafonné à 40.",
    weight: 10,
    enabled: true,
  },
  {
    id: "r5",
    category: "Critères",
    label: "Format Given/When/Then",
    hint: "Bonus si les critères suivent BDD.",
    weight: 5,
    enabled: true,
  },
  {
    id: "r6",
    category: "Critères",
    label: "Couverture des cas limites",
    hint: "Au moins un critère doit traiter un cas d'erreur.",
    weight: 7,
    enabled: true,
  },
  // Context
  {
    id: "r7",
    category: "Contexte",
    label: "Dépendances explicitées",
    hint: "Si le ticket dépend d'autres tickets, ils doivent être linkés.",
    weight: 6,
    enabled: true,
  },
  {
    id: "r8",
    category: "Contexte",
    label: "Lien vers la spec / RFC",
    hint: "Pour les stories complexes, un lien Notion/Confluence.",
    weight: 4,
    enabled: false,
  },
  // Quality
  {
    id: "r9",
    category: "Qualité",
    label: "Estimé en story points",
    hint: "Tickets sans estimation rentrent rarement dans le sprint.",
    weight: 3,
    enabled: true,
  },
  {
    id: "r10",
    category: "Qualité",
    label: "Critères d'accessibilité (a11y)",
    hint: "Pour les tickets UI, mention ARIA / clavier obligatoire.",
    weight: 5,
    enabled: false,
  },
  {
    id: "r11",
    category: "Qualité",
    label: "Définition de « Done »",
    hint: "Critère explicite pour clore le ticket (tests verts, doc, etc.).",
    weight: 7,
    enabled: true,
  },
];

const CATEGORIES = ["Description", "Critères", "Contexte", "Qualité"] as const;

const PRESETS = [
  { id: "lean", name: "Lean Startup", desc: "5 règles, vélocité avant tout" },
  { id: "scaled", name: "Scaled Scrum", desc: "12 règles, qualité et accessibilité" },
  { id: "regulated", name: "Régulé (banque/santé)", desc: "Audit + RGPD + traçabilité" },
];

export default function TemplatesPage() {
  const [rules, setRules] = useState<Rule[]>(DEFAULT_RULES);
  const [activePreset, setActivePreset] = useState("scaled");

  const grouped = useMemo(() => {
    return CATEGORIES.map((c) => ({
      category: c,
      rules: rules.filter((r) => r.category === c),
    }));
  }, [rules]);

  const enabled = rules.filter((r) => r.enabled).length;
  const totalWeight = rules
    .filter((r) => r.enabled)
    .reduce((s, r) => s + r.weight, 0);

  function toggle(id: string) {
    setRules((rs) =>
      rs.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
  }
  function setWeight(id: string, w: number) {
    setRules((rs) =>
      rs.map((r) => (r.id === id ? { ...r, weight: w } : r)),
    );
  }

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
            Appliquer à l'équipe
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
          {PRESETS.map((p) => {
            const active = p.id === activePreset;
            return (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
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
                  {p.name}
                </div>
                <div
                  className={cn(
                    "text-xs",
                    active ? "text-bg/60" : "text-ink-soft",
                  )}
                >
                  {p.desc}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Rules grouped by category */}
      <div className="space-y-6">
        {grouped.map((g) => (
          <section
            key={g.category}
            className="bg-paper border border-line rounded-xl overflow-hidden"
          >
            <header className="px-5 py-3 border-b border-line bg-bg-alt/40 flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
                {g.category}
              </div>
              <span className="font-mono text-[10px] text-ink-faint">
                {g.rules.filter((r) => r.enabled).length} / {g.rules.length} actives
              </span>
            </header>
            <ul className="divide-y divide-line">
              {g.rules.map((r) => (
                <li
                  key={r.id}
                  className={cn(
                    "px-5 py-4 flex items-center gap-4 transition-colors",
                    !r.enabled && "opacity-55",
                  )}
                >
                  <GripVerticalIcon className="size-4 text-ink-faint cursor-grab shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[14px]">{r.label}</div>
                    <div className="text-xs text-ink-faint mt-0.5">
                      {r.hint}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <WeightControl
                      value={r.weight}
                      disabled={!r.enabled}
                      onChange={(w) => setWeight(r.id, w)}
                    />
                    <Switch
                      checked={r.enabled}
                      onCheckedChange={() => toggle(r.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Live test panel */}
      <section className="bg-ink text-bg border-ink rounded-xl p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 size-40 bg-orange/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-orange mb-2">
              › Mode test
            </div>
            <h2 className="font-serif text-[24px] mb-2">
              Tester les règles sur un ticket
            </h2>
            <p className="text-bg/70 text-sm">
              Colle un ticket Jira et vois en temps réel comment ton template
              le note. Permet d'ajuster les poids sans casser ta prod.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-80">
            <Input
              placeholder="PROJ-1247"
              className="h-10 bg-bg/10 border-bg/20 text-bg placeholder:text-bg/40"
            />
            <Button className="bg-orange text-white h-10 hover:bg-orange/90">
              Lancer un test à blanc
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function WeightControl({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1 bg-bg-alt rounded-md p-0.5">
      <button
        type="button"
        disabled={disabled || value <= 1}
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
        disabled={disabled || value >= 10}
        onClick={() => onChange(value + 1)}
        className="size-6 rounded text-xs hover:bg-paper disabled:opacity-30 disabled:hover:bg-transparent"
      >
        +
      </button>
    </div>
  );
}
