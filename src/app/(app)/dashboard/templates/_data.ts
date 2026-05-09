export type Rule = {
  id: string;
  category: "Description" | "Critères" | "Contexte" | "Qualité";
  label: string;
  hint: string;
  weight: number; // 1..10
  enabled: boolean;
};

export const CATEGORIES = [
  "Description",
  "Critères",
  "Contexte",
  "Qualité",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_RULES: Rule[] = [
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

export type Preset = {
  id: string;
  name: string;
  desc: string;
};

export const PRESETS: Preset[] = [
  { id: "lean", name: "Lean Startup", desc: "5 règles, vélocité avant tout" },
  {
    id: "scaled",
    name: "Scaled Scrum",
    desc: "12 règles, qualité et accessibilité",
  },
  {
    id: "regulated",
    name: "Régulé (banque/santé)",
    desc: "Audit + RGPD + traçabilité",
  },
];
