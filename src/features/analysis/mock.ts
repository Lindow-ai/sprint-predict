/**
 * Deterministic mock analyzer — produces a believable per-ticket
 * analysis based on its id and score. Will be replaced by the real
 * Claude-backed analyzer in `actions.ts` (Étape 4).
 */

import type { Ticket } from "@/features/tickets";
import { mulberry32 } from "@/lib/seed/mock";
import type { ScoreDimension, TicketAnalysis } from "./types";

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

export function getTicketAnalysisMock(ticket: Ticket): TicketAnalysis {
  const seed = ticket.id
    .split("")
    .reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = mulberry32(seed * 7);

  const pool = [...QUESTIONS_BANK];
  const questions: string[] = [];
  for (let i = 0; i < ticket.questionsCount && pool.length; i++) {
    const idx = Math.floor(rand() * pool.length);
    questions.push(pool.splice(idx, 1)[0]);
  }

  const criteria = CRITERIA_BANK.slice(0, ticket.criteriaCount);

  const target = ticket.score;
  const dimensions: ScoreDimension[] = [
    {
      key: "description",
      label: "Description",
      weight: 30,
      score: clamp(target + Math.round((rand() - 0.5) * 30)),
    },
    {
      key: "criteria",
      label: "Critères d'acceptation",
      weight: 35,
      score: clamp(target + Math.round((rand() - 0.5) * 25)),
    },
    {
      key: "context",
      label: "Contexte & dépendances",
      weight: 20,
      score: clamp(target + Math.round((rand() - 0.5) * 35)),
    },
    {
      key: "edge",
      label: "Cas limites",
      weight: 15,
      score: clamp(target + Math.round((rand() - 0.5) * 40)),
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

function clamp(n: number) {
  return Math.max(10, Math.min(100, n));
}
