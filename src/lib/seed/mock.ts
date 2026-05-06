/**
 * Deterministic mock seed for tickets and sprints.
 * Used by features/tickets and features/sprints repositories
 * while the app runs without a real backend.
 */

import {
  type Ticket,
  type TicketType,
  statusFromScore,
} from "@/features/tickets/types";
import { type Sprint } from "@/features/sprints/types";

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

const ASSIGNEES: [string, string][] = [
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

/** Mulberry32 PRNG — keeps mock data stable between renders. */
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

/** Re-exported so features/analysis/mock can derive seeds from a ticket id. */
export { mulberry32 };

function build(): { tickets: Ticket[]; sprints: Sprint[] } {
  const rand = mulberry32(42);
  const sprints: Sprint[] = [
    {
      id: "S40",
      name: "Sprint 40",
      startsAt: "2026-04-07",
      endsAt: "2026-04-21",
      ticketIds: [],
    },
    {
      id: "S41",
      name: "Sprint 41",
      startsAt: "2026-04-21",
      endsAt: "2026-05-05",
      ticketIds: [],
    },
    {
      id: "S42",
      name: "Sprint 42",
      startsAt: "2026-05-05",
      endsAt: "2026-05-19",
      ticketIds: [],
    },
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
    const reopenRisk = Math.max(
      0.02,
      Math.min(0.95, 1 - score / 110 + rand() * 0.1),
    );

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

const _seed = build();

export const TICKETS_SEED: Ticket[] = _seed.tickets;
export const SPRINTS_SEED: Sprint[] = _seed.sprints;
