"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth";
import {
  ticketRepo,
  distribution,
  avgScore,
  ScorePill,
} from "@/features/tickets";
import { sprintRepo, scoreTrend } from "@/features/sprints";
import { InitialsAvatar } from "@/components/data/initials-avatar";
import { PageCard, PageCardHeader } from "@/components/data/page-card";
import { Th, Td } from "@/components/data/data-cells";
import { timeAgo } from "@/lib/utils/time";
import { Kpi } from "./_components/kpi";
import { Distribution } from "./_components/distribution";
import { ScoreSparkline } from "./_components/score-sparkline";
import { Insight } from "./_components/insight";
import {
  AlertTriangleIcon,
  ArrowUpRightIcon,
  CheckCircle2Icon,
  ClockIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react";

const DashboardHome = () => {
  const { user } = useAuth();
  const currentSprint = sprintRepo.current();
  const sprintTickets = ticketRepo.bySprint(currentSprint.id);
  const dist = distribution(sprintTickets);
  const avg = avgScore(sprintTickets);
  const trend = scoreTrend();
  const trendDelta = trend[trend.length - 1].score - trend[0].score;
  const recent = ticketRepo.recent(6);
  const blockers = sprintTickets
    .filter((t) => t.status === "critical")
    .sort((a, b) => a.score - b.score)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2">
            › Vue d&apos;ensemble
          </div>
          <h1 className="font-serif text-[42px] leading-[1.05] tracking-[-0.02em]">
            Salut {user?.name.split(" ")[0]}.{" "}
            <em className="italic font-light text-orange">
              Voici ton sprint.
            </em>
          </h1>
          <p className="text-ink-soft mt-2">
            {currentSprint.name} · {sprintTickets.length} tickets · démarre le{" "}
            {new Date(currentSprint.startsAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft border border-line bg-paper rounded-md px-3 py-2 hover:border-orange hover:text-orange transition-colors">
            Sprint en cours ▾
          </button>
          <Link
            href="/dashboard/tickets"
            className="font-mono text-[11px] uppercase tracking-[0.05em] text-bg bg-ink rounded-md px-3 py-2 hover:bg-orange transition-colors flex items-center gap-1.5"
          >
            Tous les tickets <ArrowUpRightIcon className="size-3" />
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi
          label="Sprint Readiness"
          value={`${avg}`}
          unit="/100"
          delta={`+${Math.max(0, trendDelta)} vs S-5`}
          deltaTone="good"
          accent
        />
        <Kpi
          label="Tickets prêts"
          value={`${dist.ready}`}
          unit={`/ ${dist.total}`}
          delta={`${dist.readyPct}% du sprint`}
          icon={<CheckCircle2Icon className="size-4" />}
          deltaTone="good"
        />
        <Kpi
          label="À clarifier"
          value={`${dist.warn}`}
          unit={`/ ${dist.total}`}
          delta="Ambiguïtés mineures"
          icon={<ClockIcon className="size-4" />}
          deltaTone="warn"
        />
        <Kpi
          label="Bloquants"
          value={`${dist.critical}`}
          unit={`/ ${dist.total}`}
          delta="À retravailler"
          icon={<AlertTriangleIcon className="size-4" />}
          deltaTone="bad"
        />
      </div>

      {/* Main row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Sprint readiness gauge */}
        <PageCard className="lg:col-span-7">
          <PageCardHeader
            title="Sprint Readiness"
            subtitle="Distribution des tickets du sprint en cours"
          />
          <Distribution dist={dist} />
          <ScoreSparkline trend={trend} />
        </PageCard>

        {/* Blockers */}
        <PageCard className="lg:col-span-5">
          <PageCardHeader
            title="Tickets bloquants"
            subtitle={`${blockers.length} tickets sous le seuil critique`}
            action={
              <Link
                href="/dashboard/tickets?status=critical"
                className="font-mono text-[11px] uppercase tracking-[0.05em] text-orange hover:underline"
              >
                Voir tout
              </Link>
            }
          />
          <ul className="flex flex-col divide-y divide-line">
            {blockers.length === 0 && (
              <li className="text-sm text-ink-faint py-6 text-center">
                Aucun ticket bloquant. 🎉
              </li>
            )}
            {blockers.map((t) => (
              <li key={t.id} className="py-3 flex items-center gap-3">
                <ScorePill score={t.score} status={t.status} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{t.title}</div>
                  <div className="font-mono text-[11px] text-ink-faint mt-0.5">
                    {t.jiraKey} · {t.questionsCount} questions à clarifier
                  </div>
                </div>
                <Link
                  href={`/dashboard/tickets/${t.id}`}
                  className="text-xs font-medium text-orange hover:underline shrink-0"
                >
                  Analyser →
                </Link>
              </li>
            ))}
          </ul>
        </PageCard>
      </div>

      {/* Recent + insight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recent activity */}
        <PageCard className="lg:col-span-8">
          <PageCardHeader
            title="Dernières analyses"
            subtitle="Tickets analysés récemment par toi ou ton équipe"
          />
          <div className="-mx-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <Th>Ticket</Th>
                  <Th>Score</Th>
                  <Th className="hidden md:table-cell">Assignée</Th>
                  <Th className="hidden md:table-cell">Sprint</Th>
                  <Th className="text-right">Analysé</Th>
                </tr>
              </thead>
              <tbody>
                {recent.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t border-line hover:bg-bg-alt/40 transition-colors"
                  >
                    <Td>
                      <Link
                        href={`/dashboard/tickets/${t.id}`}
                        className="flex flex-col gap-0.5 group"
                      >
                        <span className="font-medium truncate max-w-[280px] group-hover:text-orange transition-colors">
                          {t.title}
                        </span>
                        <span className="font-mono text-[11px] text-ink-faint">
                          {t.jiraKey} · {t.type}
                        </span>
                      </Link>
                    </Td>
                    <Td>
                      <ScorePill score={t.score} status={t.status} />
                    </Td>
                    <Td className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <InitialsAvatar
                          initials={t.assigneeInitials}
                          size="sm"
                        />
                        <span className="text-ink-soft text-xs">
                          {t.assignee}
                        </span>
                      </div>
                    </Td>
                    <Td className="hidden md:table-cell text-ink-soft text-xs">
                      {t.sprint}
                    </Td>
                    <Td className="text-right text-ink-faint text-xs">
                      {timeAgo(t.analyzedAt)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageCard>

        {/* AI insight (mock) */}
        <PageCard className="lg:col-span-4 bg-ink text-bg border-ink relative overflow-hidden">
          <div className="absolute -top-12 -right-12 size-40 bg-orange/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-orange mb-3">
              <SparklesIcon className="size-3.5" /> Insight IA
            </div>
            <h3 className="font-serif text-[22px] leading-[1.2] mb-3">
              3 patterns récurrents sur ce sprint.
            </h3>
            <ul className="space-y-3 text-sm text-bg/80">
              <Insight>
                Les tickets <em>bug</em> manquent souvent de{" "}
                <strong>steps to reproduce</strong>.
              </Insight>
              <Insight>
                Aucun critère d&apos;<strong>accessibilité</strong> sur les 6
                dernières stories UI.
              </Insight>
              <Insight>
                Le <strong>format d&apos;export</strong> n&apos;est jamais
                explicite — ajoute-le au template.
              </Insight>
            </ul>
            <button className="mt-5 w-full text-xs font-medium bg-bg/10 hover:bg-bg/20 text-bg rounded-md py-2 flex items-center justify-center gap-1.5">
              <TrendingUpIcon className="size-3.5" />
              Mettre à jour les templates équipe
            </button>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default DashboardHome;
