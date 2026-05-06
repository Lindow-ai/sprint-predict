export type TicketStatus = "ready" | "warn" | "critical";
export type TicketType = "Story" | "Task" | "Bug" | "Spike";

export type Ticket = {
  id: string;
  jiraKey: string;
  title: string;
  type: TicketType;
  score: number;
  status: TicketStatus;
  assignee: string;
  assigneeInitials: string;
  sprint: string;
  analyzedAt: string; // ISO
  questionsCount: number;
  criteriaCount: number;
  reopenRisk: number; // 0..1
};

export type Sprint = {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  ticketIds: string[];
};

export function statusFromScore(score: number): TicketStatus {
  if (score >= 75) return "ready";
  if (score >= 50) return "warn";
  return "critical";
}

const TITLES = [
  "Permettre l'export CSV des transactions",
  "Refonte page profil utilisateur",
  "Bug : crash sur upload >10 Mo",
  "Spike : faisabilité OAuth Apple Sign-In",
  "Ajouter un dark mode global",
  "Mettre en place l'audit log RGPD",
  "Optimiser le temps de chargement du dashboard",
  "Notifications push web",
  "Filtres avancés sur la liste des commandes",
  "Refactoring du module de paiement Stripe",
  "Page 404 personnalisée",
  "Ajouter le support multi-devise",
  "Bug : pagination cassée sur Safari",
  "Webhook Slack lors d'un paiement échoué",
  "Onboarding interactif premier login",
  "Intégration HubSpot CRM",
  "Refonte du flow de checkout",
  "Spike : Vector DB pour la recherche sémantique",
  "Bouton « Imprimer » sur la facture",
  "Gestion des rôles d'équipe (RBAC)",
  "API publique v2 — endpoints CRUD users",
  "Bug : timezone incorrecte côté admin",
  "Migration MongoDB → Postgres",
  "Page status publique (uptime)",
  "Email de relance abonnement expiré",
  "Spike : compatibilité IE11 (vraiment ?)",
  "Mode hors-ligne PWA",
  "Connexion magic-link par email",
];

const ASSIGNEES = [
  ["Amélie Dupont", "AD"],
  ["Karim Mehdi", "KM"],
  ["Sofia Rossi", "SR"],
  ["Thomas Lefebvre", "TL"],
  ["Émilie Garcia", "ÉG"],
  ["Yann Bréhier", "YB"],
  ["Léa Mercier", "LM"],
  ["Hugo Bernard", "HB"],
];

const TYPES: TicketType[] = ["Story", "Task", "Bug", "Spike"];

// Deterministic PRNG so the mock is stable between renders
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(): { tickets: Ticket[]; sprints: Sprint[] } {
  const rand = mulberry32(42);
  const sprints: Sprint[] = [
    { id: "S40", name: "Sprint 40", startsAt: "2026-04-07", endsAt: "2026-04-21", ticketIds: [] },
    { id: "S41", name: "Sprint 41", startsAt: "2026-04-21", endsAt: "2026-05-05", ticketIds: [] },
    { id: "S42", name: "Sprint 42", startsAt: "2026-05-05", endsAt: "2026-05-19", ticketIds: [] },
  ];

  const tickets: Ticket[] = TITLES.map((title, i) => {
    const score = Math.max(8, Math.min(98, Math.round(rand() * 90 + 10)));
    const status = statusFromScore(score);
    const [name, initials] = ASSIGNEES[Math.floor(rand() * ASSIGNEES.length)];
    const type = TYPES[Math.floor(rand() * TYPES.length)];
    const sprint = sprints[Math.floor(rand() * sprints.length)];
    const days = Math.floor(rand() * 14);
    const analyzedAt = new Date(Date.now() - days * 86_400_000).toISOString();
    const questionsCount =
      status === "critical"
        ? 4 + Math.floor(rand() * 4)
        : status === "warn"
        ? 2 + Math.floor(rand() * 3)
        : Math.floor(rand() * 3);
    const criteriaCount = 3 + Math.floor(rand() * 5);
    const reopenRisk = Math.max(0.02, Math.min(0.95, 1 - score / 110 + rand() * 0.1));

    const t: Ticket = {
      id: `t-${i + 1}`,
      jiraKey: `PROJ-${1200 + i}`,
      title,
      type,
      score,
      status,
      assignee: name,
      assigneeInitials: initials,
      sprint: sprint.id,
      analyzedAt,
      questionsCount,
      criteriaCount,
      reopenRisk,
    };
    sprint.ticketIds.push(t.id);
    return t;
  });

  return { tickets, sprints };
}

const _data = build();
export const TICKETS: Ticket[] = _data.tickets;
export const SPRINTS: Sprint[] = _data.sprints;

export const CURRENT_SPRINT = SPRINTS[SPRINTS.length - 1];

export function ticketsBySprint(sprintId: string): Ticket[] {
  return TICKETS.filter((t) => t.sprint === sprintId);
}

export function distribution(tickets: Ticket[]) {
  const total = tickets.length || 1;
  const ready = tickets.filter((t) => t.status === "ready").length;
  const warn = tickets.filter((t) => t.status === "warn").length;
  const critical = tickets.filter((t) => t.status === "critical").length;
  return {
    total,
    ready,
    warn,
    critical,
    readyPct: Math.round((ready / total) * 100),
    warnPct: Math.round((warn / total) * 100),
    criticalPct: Math.round((critical / total) * 100),
  };
}

export function avgScore(tickets: Ticket[]): number {
  if (!tickets.length) return 0;
  return Math.round(tickets.reduce((s, t) => s + t.score, 0) / tickets.length);
}

/* ===== Per-ticket analysis details (deterministic, derived from ticket) ===== */

export type ScoreDimension = {
  key: string;
  label: string;
  score: number; // 0..100
  weight: number; // contribution
};

export type TicketAnalysis = {
  ticket: Ticket;
  questions: string[];
  criteria: [string, string][]; // [keyword, text]
  dimensions: ScoreDimension[];
  summary: string;
};

const QUESTIONS_BANK = [
  "Le format d'export n'est pas précisé (CSV ? JSON ? PDF ?).",
  "Aucune limite de volume définie : que se passe-t-il sur 50 000 lignes ?",
  "Comportement attendu si l'utilisateur n'a aucune donnée à exporter ?",
  "Quel rôle peut déclencher cette action (admin ? user standard ?) ?",
  "Le téléchargement doit-il être bloquant ou en background job ?",
  "Y a-t-il un événement analytics à tracker ?",
  "Faut-il un audit log RGPD pour cette opération ?",
  "L'accessibilité (ARIA, lecteur d'écran) est-elle requise ?",
  "Comportement attendu en cas d'erreur réseau ?",
  "Cette feature est-elle gated derrière un flag ?",
  "Un message de confirmation visuel doit-il s'afficher ?",
  "Les transactions annulées sont-elles incluses ?",
  "La fonctionnalité doit-elle être responsive mobile ?",
];

const CRITERIA_BANK: [string, string][] = [
  ["GIVEN", "un utilisateur authentifié sur la page concernée"],
  ["WHEN", "il déclenche l'action depuis l'UI"],
  ["THEN", "le résultat est généré au format spécifié"],
  ["AND", "une notification confirme la réussite ou affiche l'erreur"],
  ["AND", "l'événement est tracé dans les logs d'audit"],
  ["AND", "la modale est accessible au clavier (focus trap, Esc)"],
];

export function getTicketAnalysis(ticket: Ticket): TicketAnalysis {
  const seed = ticket.id
    .split("")
    .reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = mulberry32(seed * 7);

  // Pick N questions from bank deterministically
  const pool = [...QUESTIONS_BANK];
  const questions: string[] = [];
  for (let i = 0; i < ticket.questionsCount && pool.length; i++) {
    const idx = Math.floor(rand() * pool.length);
    questions.push(pool.splice(idx, 1)[0]);
  }

  const criteria = CRITERIA_BANK.slice(0, ticket.criteriaCount);

  // Score breakdown: 4 dimensions with weights summing to 100
  // Adjust each based on ticket score (with some noise)
  const target = ticket.score;
  const dimensions: ScoreDimension[] = [
    {
      key: "description",
      label: "Description",
      weight: 30,
      score: Math.max(10, Math.min(100, target + Math.round((rand() - 0.5) * 30))),
    },
    {
      key: "criteria",
      label: "Critères d'acceptation",
      weight: 35,
      score: Math.max(10, Math.min(100, target + Math.round((rand() - 0.5) * 25))),
    },
    {
      key: "context",
      label: "Contexte & dépendances",
      weight: 20,
      score: Math.max(10, Math.min(100, target + Math.round((rand() - 0.5) * 35))),
    },
    {
      key: "edge",
      label: "Cas limites",
      weight: 15,
      score: Math.max(10, Math.min(100, target + Math.round((rand() - 0.5) * 40))),
    },
  ];

  const summary =
    ticket.status === "ready"
      ? "Ticket bien rédigé. Quelques précisions mineures pourraient le rendre encore plus actionnable, mais il est prêt pour le sprint."
      : ticket.status === "warn"
      ? "Ticket exploitable mais plusieurs ambiguïtés méritent d'être levées en grooming pour éviter du re-work en milieu de sprint."
      : "Ticket trop flou pour être pris en charge. Plusieurs informations critiques manquent — à retravailler avec le PO avant le refinement.";

  return { ticket, questions, criteria, dimensions, summary };
}

export function findTicket(idOrKey: string): Ticket | undefined {
  return TICKETS.find(
    (t) => t.id === idOrKey || t.jiraKey.toLowerCase() === idOrKey.toLowerCase(),
  );
}

// Last 6 sprints score trend (synthetic, anchored on current data)
export function scoreTrend(): { sprint: string; score: number }[] {
  const cur = avgScore(ticketsBySprint(CURRENT_SPRINT.id));
  const trend = [-12, -7, -3, +2, +5, 0];
  return trend.map((delta, i) => ({
    sprint: `S${37 + i}`,
    score: Math.max(20, Math.min(95, cur + delta)),
  }));
}
