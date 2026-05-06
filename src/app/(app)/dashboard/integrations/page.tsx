"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2Icon,
  PlugIcon,
  RefreshCwIcon,
  XIcon,
} from "lucide-react";

type ConnectionState = "disconnected" | "connecting" | "connected";

const PROJECTS = [
  { key: "PROJ", name: "Acme Core", count: 142 },
  { key: "WEB", name: "Acme Web", count: 88 },
  { key: "API", name: "Acme API", count: 64 },
  { key: "MOB", name: "Acme Mobile", count: 31 },
];

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2">
          › Intégrations
        </div>
        <h1 className="font-serif text-[36px] tracking-[-0.02em]">
          Branche tes outils.{" "}
          <em className="italic font-light text-orange">
            Sprint Predict s'occupe du reste.
          </em>
        </h1>
        <p className="text-ink-soft mt-2 max-w-2xl">
          Mode démo : la connexion est simulée. En prod, OAuth + webhooks pour
          que chaque ticket modifié soit ré-analysé automatiquement.
        </p>
      </div>

      {/* Primary integration */}
      <JiraIntegration />

      {/* Other integrations */}
      <div>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3">
          Autres outils
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolCard
            name="Slack"
            desc="Recevoir les digests de pré-grooming et les alertes de tickets bloquants dans un canal."
            badge="Recommandé"
            badgeTone="orange"
            color="#4A154B"
            initials="SL"
          />
          <ToolCard
            name="Linear"
            desc="Alternative à Jira — on score les issues Linear avec le même moteur."
            badge="Bêta"
            badgeTone="amber"
            color="#5E6AD2"
            initials="LN"
          />
          <ToolCard
            name="GitHub"
            desc="Scorer aussi les issues GitHub et les Discussions."
            color="#1a1814"
            initials="GH"
          />
          <ToolCard
            name="Confluence"
            desc="Aller chercher le contexte produit (specs, RFCs) lié à un ticket."
            color="#172B4D"
            initials="CF"
          />
          <ToolCard
            name="Notion"
            desc="Index des PRD/specs pour enrichir l'analyse contextuelle."
            color="#000000"
            initials="NT"
          />
          <ToolCard
            name="Microsoft Teams"
            desc="Comme Slack, pour les organisations Microsoft 365."
            color="#5059C9"
            initials="MT"
          />
        </div>
      </div>
    </div>
  );
}

function JiraIntegration() {
  const [state, setState] = useState<ConnectionState>("disconnected");
  const [activeProjects, setActiveProjects] = useState<string[]>([]);

  function connect() {
    setState("connecting");
    setTimeout(() => {
      setState("connected");
      setActiveProjects(["PROJ", "WEB"]);
    }, 1200);
  }

  function disconnect() {
    setState("disconnected");
    setActiveProjects([]);
  }

  function toggleProject(key: string) {
    setActiveProjects((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  return (
    <section className="bg-paper border border-line rounded-xl overflow-hidden">
      <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="flex items-start gap-4">
          <JiraLogo />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-serif text-[24px] tracking-[-0.01em]">
                Jira Cloud
              </h3>
              {state === "connected" && (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-leaf bg-leaf-soft px-2 py-0.5 rounded-full">
                  <CheckCircle2Icon className="size-3" /> Connecté
                </span>
              )}
            </div>
            <p className="text-ink-soft text-sm max-w-xl">
              Source principale des tickets. OAuth 2.0, webhooks pour la
              synchro continue, et auto-comment dans les tickets analysés.
            </p>
            {state === "connected" && (
              <p className="font-mono text-[11px] text-ink-faint mt-2">
                Workspace : <strong className="text-ink">acme.atlassian.net</strong> ·
                Connecté il y a 2 minutes
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {state === "disconnected" && (
            <Button
              onClick={connect}
              className="bg-jira text-white h-10 hover:opacity-90"
            >
              <PlugIcon className="size-4" />
              Connecter Jira
            </Button>
          )}
          {state === "connecting" && (
            <Button disabled className="bg-jira text-white h-10 opacity-70">
              <RefreshCwIcon className="size-4 animate-spin" />
              Connexion…
            </Button>
          )}
          {state === "connected" && (
            <>
              <Button variant="outline" className="border-line bg-paper h-10">
                <RefreshCwIcon className="size-3.5" />
                Resynchroniser
              </Button>
              <Button
                variant="outline"
                onClick={disconnect}
                className="border-line bg-paper h-10 text-rust hover:bg-rust-soft"
              >
                <XIcon className="size-3.5" />
                Déconnecter
              </Button>
            </>
          )}
        </div>
      </div>

      {state === "connected" && (
        <div className="border-t border-dashed border-line p-6 lg:p-8 bg-bg-alt/30">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-4">
            Projets à analyser ({activeProjects.length} actifs)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {PROJECTS.map((p) => {
              const active = activeProjects.includes(p.key);
              return (
                <button
                  key={p.key}
                  onClick={() => toggleProject(p.key)}
                  className={cn(
                    "text-left p-4 rounded-lg border transition-all",
                    active
                      ? "bg-paper border-orange shadow-sm ring-2 ring-orange/20"
                      : "bg-paper border-line hover:border-ink/40",
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
                      {p.key}
                    </span>
                    {active && (
                      <CheckCircle2Icon className="size-4 text-orange" />
                    )}
                  </div>
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="font-mono text-[11px] text-ink-faint mt-1">
                    {p.count} tickets ouverts
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function ToolCard({
  name,
  desc,
  initials,
  color,
  badge,
  badgeTone,
}: {
  name: string;
  desc: string;
  initials: string;
  color: string;
  badge?: string;
  badgeTone?: "orange" | "amber";
}) {
  const [connected, setConnected] = useState(false);
  const badgeCls =
    badgeTone === "orange"
      ? "bg-orange-soft text-orange"
      : "bg-amber-soft text-amber";
  return (
    <div className="bg-paper border border-line rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div
          className="size-10 rounded-lg text-white flex items-center justify-center font-mono text-xs font-semibold"
          style={{ background: color }}
        >
          {initials}
        </div>
        {badge && (
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.05em] px-2 py-0.5 rounded-full font-semibold",
              badgeCls,
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <div>
        <h4 className="font-serif text-[18px] mb-1">{name}</h4>
        <p className="text-xs text-ink-soft leading-relaxed">{desc}</p>
      </div>
      <button
        onClick={() => setConnected(!connected)}
        className={cn(
          "mt-auto py-2 rounded-md text-xs font-medium transition-colors",
          connected
            ? "bg-leaf-soft text-leaf"
            : "bg-bg-alt hover:bg-ink hover:text-bg text-ink-soft",
        )}
      >
        {connected ? "✓ Connecté" : "Connecter"}
      </button>
    </div>
  );
}

function JiraLogo() {
  return (
    <div className="size-12 rounded-xl bg-jira-soft flex items-center justify-center shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0052cc">
        <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.762a1.005 1.005 0 0 0-1.001-1.005zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.005 1.005 0 0 0 23.013 0z" />
      </svg>
    </div>
  );
}
