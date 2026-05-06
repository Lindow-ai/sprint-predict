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
import {
  ArrowUpRightIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ClockIcon,
  SparklesIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardHome() {
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
        <Card className="lg:col-span-7">
          <CardHeader title="Sprint Readiness" subtitle="Distribution des tickets du sprint en cours" />
          <Distribution dist={dist} />
          <ScoreSparkline trend={trend} />
        </Card>

        {/* Blockers */}
        <Card className="lg:col-span-5">
          <CardHeader
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
        </Card>
      </div>

      {/* Recent + insight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recent activity */}
        <Card className="lg:col-span-8">
          <CardHeader
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
        </Card>

        {/* AI insight (mock) */}
        <Card className="lg:col-span-4 bg-ink text-bg border-ink relative overflow-hidden">
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
                Les tickets <em>bug</em> manquent souvent de <strong>steps to reproduce</strong>.
              </Insight>
              <Insight>
                Aucun critère d&apos;<strong>accessibilité</strong> sur les 6 dernières stories UI.
              </Insight>
              <Insight>
                Le <strong>format d&apos;export</strong> n&apos;est jamais explicite — ajoute-le au template.
              </Insight>
            </ul>
            <button className="mt-5 w-full text-xs font-medium bg-bg/10 hover:bg-bg/20 text-bg rounded-md py-2 flex items-center justify-center gap-1.5">
              <TrendingUpIcon className="size-3.5" />
              Mettre à jour les templates équipe
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ===== building blocks ===== */

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "bg-paper border border-line rounded-xl p-5 lg:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div>
        <h2 className="font-serif text-[20px] leading-tight tracking-[-0.01em]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-ink-faint mt-1">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function Kpi({
  label,
  value,
  unit,
  delta,
  deltaTone = "neutral",
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaTone?: "good" | "warn" | "bad" | "neutral";
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  const toneClass = {
    good: "text-leaf",
    warn: "text-amber",
    bad: "text-rust",
    neutral: "text-ink-faint",
  }[deltaTone];
  return (
    <div
      className={cn(
        "rounded-xl p-5 border relative overflow-hidden",
        accent
          ? "bg-ink text-bg border-ink"
          : "bg-paper border-line",
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.08em]",
            accent ? "text-orange" : "text-ink-faint",
          )}
        >
          {label}
        </span>
        {icon && (
          <span className={accent ? "text-orange" : "text-ink-faint"}>
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="font-serif text-[44px] leading-none tracking-[-0.04em]">
          {value}
        </span>
        {unit && (
          <span
            className={cn(
              "font-serif text-base",
              accent ? "text-bg/50" : "text-ink-faint",
            )}
          >
            {unit}
          </span>
        )}
      </div>
      {delta && (
        <div className={cn("font-mono text-[11px] uppercase tracking-[0.04em]", accent ? "text-bg/60" : toneClass)}>
          {delta}
        </div>
      )}
      {accent && (
        <div className="absolute -bottom-8 -right-8 size-32 bg-orange/30 rounded-full blur-3xl pointer-events-none" />
      )}
    </div>
  );
}

function Distribution({
  dist,
}: {
  dist: ReturnType<typeof distribution>;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-serif text-[56px] leading-none tracking-[-0.04em]">
          {dist.readyPct}
          <span className="text-2xl text-ink-faint">%</span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-faint">
          du sprint est <span className="text-leaf">prêt</span>
        </span>
      </div>
      <div className="h-3 w-full rounded-full overflow-hidden flex bg-bg-alt">
        <div
          className="h-full bg-leaf transition-all"
          style={{ width: `${dist.readyPct}%` }}
          title={`${dist.ready} prêts`}
        />
        <div
          className="h-full bg-amber transition-all"
          style={{ width: `${dist.warnPct}%` }}
          title={`${dist.warn} à clarifier`}
        />
        <div
          className="h-full bg-rust transition-all"
          style={{ width: `${dist.criticalPct}%` }}
          title={`${dist.critical} critiques`}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs">
        <Legend dot="leaf" label={`Prêts · ${dist.ready}`} />
        <Legend dot="amber" label={`À clarifier · ${dist.warn}`} />
        <Legend dot="rust" label={`Bloquants · ${dist.critical}`} />
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: "leaf" | "amber" | "rust"; label: string }) {
  const cls = { leaf: "bg-leaf", amber: "bg-amber", rust: "bg-rust" }[dot];
  return (
    <div className="flex items-center gap-1.5 text-ink-soft">
      <span className={cn("size-2 rounded-full", cls)} />
      {label}
    </div>
  );
}

function ScoreSparkline({ trend }: { trend: { sprint: string; score: number }[] }) {
  const max = Math.max(...trend.map((p) => p.score));
  const min = Math.min(...trend.map((p) => p.score));
  const range = Math.max(1, max - min);
  return (
    <div className="mt-6 pt-5 border-t border-dashed border-line">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Score moyen — 6 derniers sprints
        </span>
        <span className="font-mono text-[10px] uppercase text-leaf">
          + {trend[trend.length - 1].score - trend[0].score} pts
        </span>
      </div>
      <div className="flex items-end gap-2 h-20">
        {trend.map((p, i) => {
          const h = 30 + ((p.score - min) / range) * 70;
          const isLast = i === trend.length - 1;
          return (
            <div key={p.sprint} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-full rounded-sm transition-all",
                  isLast ? "bg-orange" : "bg-ink/15",
                )}
                style={{ height: `${h}%` }}
                title={`${p.sprint} · ${p.score}/100`}
              />
              <span
                className={cn(
                  "font-mono text-[10px]",
                  isLast ? "text-orange font-semibold" : "text-ink-faint",
                )}
              >
                {p.sprint}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-1.5 size-1.5 rounded-full bg-orange shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint font-medium px-3 py-2",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("px-3 py-3 align-middle", className)}>{children}</td>;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Hier";
  if (days < 7) return `Il y a ${days} j`;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
