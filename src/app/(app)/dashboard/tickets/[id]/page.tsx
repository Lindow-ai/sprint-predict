"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ticketRepo, StatusBadge, statusVars } from "@/features/tickets";
import { analysisRepo } from "@/features/analysis";
import { InitialsAvatar } from "@/components/data/initials-avatar";
import { PageCard } from "@/components/data/page-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Meta } from "./_components/meta";
import { DimensionRow } from "./_components/dimension-row";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CheckCircle2Icon,
  CopyIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
  SendIcon,
} from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

const TicketDetailPage = ({ params }: Props) => {
  const { id } = use(params);
  const ticket = ticketRepo.find(id);
  if (!ticket) notFound();
  const analysis = analysisRepo.forTicket(ticket.id)!;
  const [posted, setPosted] = useState(false);

  const status = ticket.status;
  const tone = statusVars(status);

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs / actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          href="/dashboard/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.05em] text-ink-faint hover:text-ink"
        >
          <ArrowLeftIcon className="size-3.5" /> Retour aux tickets
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" className="border-line bg-paper h-9 text-xs">
            <ExternalLinkIcon className="size-3.5" />
            Ouvrir dans Jira
          </Button>
          <Button className="bg-ink text-bg hover:bg-orange h-9 text-xs">
            <RefreshCwIcon className="size-3.5" />
            Réanalyser
          </Button>
        </div>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[11px] text-ink-faint">
            {ticket.jiraKey} · {ticket.type}
          </span>
          <StatusBadge status={status} />
        </div>
        <h1 className="font-serif text-[32px] lg:text-[40px] leading-[1.1] tracking-[-0.02em]">
          {ticket.title}
        </h1>
        <p className="text-ink-soft text-[15px] max-w-3xl leading-relaxed">
          {analysis.summary}
        </p>
      </header>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Score + dimensions */}
        <PageCard className="lg:col-span-7 bg-ink text-bg border-ink relative overflow-hidden">
          <div className="absolute -top-16 -right-16 size-48 bg-orange/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-orange mb-3">
              › Readiness Score
            </div>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-serif text-[72px] leading-none tracking-[-0.04em]">
                {ticket.score}
                <span className="text-2xl text-bg/40 font-normal">/100</span>
              </span>
              <span
                className="font-mono text-[11px] uppercase py-1 px-2.5 rounded-full font-semibold"
                style={{ background: tone.bg, color: tone.fg }}
              >
                {tone.label}
              </span>
            </div>

            <div className="space-y-3">
              {analysis.dimensions.map((d) => (
                <DimensionRow key={d.key} d={d} />
              ))}
            </div>
          </div>
        </PageCard>

        {/* Meta + Post-to-Jira */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <PageCard>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint mb-3">
              Méta
            </div>
            <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <Meta label="Assignée">
                <div className="flex items-center gap-2">
                  <InitialsAvatar
                    initials={ticket.assigneeInitials}
                    size="sm"
                  />
                  <span>{ticket.assignee}</span>
                </div>
              </Meta>
              <Meta label="Sprint">{ticket.sprint}</Meta>
              <Meta label="Type">{ticket.type}</Meta>
              <Meta label="Re-open risk">
                <span
                  className={cn(
                    "font-mono",
                    ticket.reopenRisk >= 0.6
                      ? "text-rust"
                      : ticket.reopenRisk >= 0.35
                      ? "text-amber"
                      : "text-leaf",
                  )}
                >
                  {Math.round(ticket.reopenRisk * 100)}%
                </span>
              </Meta>
              <Meta label="Questions">{ticket.questionsCount}</Meta>
              <Meta label="Critères">{ticket.criteriaCount}</Meta>
            </dl>
          </PageCard>

          <PageCard>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint mb-2">
              Auto-comment Jira
            </div>
            <p className="text-sm text-ink-soft leading-relaxed mb-4">
              Poster ce résumé (score + questions + critères) directement dans
              le ticket Jira en tant que commentaire bot.
            </p>
            <button
              onClick={() => setPosted(true)}
              disabled={posted}
              className={cn(
                "w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-opacity",
                posted
                  ? "bg-leaf text-white"
                  : "bg-jira text-white hover:opacity-90",
              )}
            >
              {posted ? (
                <>
                  <CheckCircle2Icon className="size-4" /> Posté dans Jira
                </>
              ) : (
                <>
                  <SendIcon className="size-4" /> Poster dans Jira
                </>
              )}
            </button>
          </PageCard>
        </div>
      </div>

      {/* Questions + Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <PageCard className="lg:col-span-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-[20px] tracking-[-0.01em]">
                Questions à clarifier
              </h2>
              <p className="text-xs text-ink-faint mt-0.5">
                {analysis.questions.length} ambiguïtés à lever en grooming
              </p>
            </div>
            <button className="text-ink-faint hover:text-ink" title="Copier">
              <CopyIcon className="size-4" />
            </button>
          </div>
          {analysis.questions.length === 0 ? (
            <p className="text-sm text-ink-faint italic py-4">
              Aucune question détectée — ce ticket est exemplaire 🎉
            </p>
          ) : (
            <ul className="space-y-3">
              {analysis.questions.map((q, i) => (
                <li key={i} className="flex gap-3 text-[14px] leading-snug">
                  <span className="size-5 shrink-0 mt-0.5 rounded-full bg-orange text-white font-mono text-[10px] font-bold flex items-center justify-center">
                    ?
                  </span>
                  <span className="text-ink-soft">{q}</span>
                </li>
              ))}
            </ul>
          )}
        </PageCard>

        <PageCard className="lg:col-span-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-[20px] tracking-[-0.01em]">
                Critères suggérés
              </h2>
              <p className="text-xs text-ink-faint mt-0.5">
                Format Given/When/Then prêt à coller
              </p>
            </div>
            <button className="text-ink-faint hover:text-ink" title="Copier">
              <CopyIcon className="size-4" />
            </button>
          </div>
          <ul className="space-y-2.5">
            {analysis.criteria.map(([k, v], i) => (
              <li key={i} className="flex gap-3 text-[13px] leading-snug pl-0">
                <span className="size-5 shrink-0 mt-0.5 rounded-full bg-leaf text-white text-[10px] font-bold flex items-center justify-center">
                  ✓
                </span>
                <span>
                  <strong className="font-mono text-[11px] text-orange uppercase mr-1.5">
                    {k}
                  </strong>
                  <span className="text-ink-soft">{v}</span>
                </span>
              </li>
            ))}
          </ul>
        </PageCard>
      </div>

      {/* Risk callout */}
      {ticket.reopenRisk >= 0.5 && (
        <div className="bg-rust-soft border border-rust/20 rounded-xl p-5 flex gap-3 items-start">
          <AlertCircleIcon className="size-5 text-rust shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif text-[18px] text-rust mb-1">
              Risque de re-open élevé
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed">
              Notre modèle estime à{" "}
              <strong>{Math.round(ticket.reopenRisk * 100)}%</strong> la
              probabilité que ce ticket soit re-ouvert après livraison. Lever
              les ambiguïtés ci-dessus avant le sprint réduira ce risque de
              manière significative.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailPage;
