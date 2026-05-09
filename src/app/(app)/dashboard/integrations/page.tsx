"use client";

import { JiraIntegration } from "./_components/jira-integration";
import { ToolCard } from "./_components/tool-card";

const IntegrationsPage = () => (
  <div className="flex flex-col gap-8">
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2">
        › Intégrations
      </div>
      <h1 className="font-serif text-[36px] tracking-[-0.02em]">
        Branche tes outils.{" "}
        <em className="italic font-light text-orange">
          Sprint Predict s&apos;occupe du reste.
        </em>
      </h1>
      <p className="text-ink-soft mt-2 max-w-2xl">
        Mode démo : la connexion est simulée. En prod, OAuth + webhooks pour
        que chaque ticket modifié soit ré-analysé automatiquement.
      </p>
    </div>

    <JiraIntegration />

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

export default IntegrationsPage;
