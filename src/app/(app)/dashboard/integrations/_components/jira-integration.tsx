"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon, PlugIcon, RefreshCwIcon, XIcon } from "lucide-react";
import { JiraLogo } from "./jira-logo";

type ConnectionState = "disconnected" | "connecting" | "connected";

const PROJECTS = [
  { key: "PROJ", name: "Acme Core", count: 142 },
  { key: "WEB", name: "Acme Web", count: 88 },
  { key: "API", name: "Acme API", count: 64 },
  { key: "MOB", name: "Acme Mobile", count: 31 },
];

/**
 * Primary integration card for Jira Cloud — drives a 3-state mock
 * connection flow and reveals a project picker once connected.
 */
export const JiraIntegration = () => {
  const [state, setState] = useState<ConnectionState>("disconnected");
  const [activeProjects, setActiveProjects] = useState<string[]>([]);

  const connect = () => {
    setState("connecting");
    setTimeout(() => {
      setState("connected");
      setActiveProjects(["PROJ", "WEB"]);
    }, 1200);
  };

  const disconnect = () => {
    setState("disconnected");
    setActiveProjects([]);
  };

  const toggleProject = (key: string) => {
    setActiveProjects((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

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
                Workspace :{" "}
                <strong className="text-ink">acme.atlassian.net</strong> ·
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
};
