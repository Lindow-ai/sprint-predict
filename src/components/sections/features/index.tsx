import { FeatureCard } from "./feature-card";
import { ScorePillStack } from "./score-pill-stack";

const QUESTIONS = [
  "Que se passe-t-il si l'utilisateur n'a aucune transaction ?",
  "Limite max d'export — 1k, 10k, illimité ?",
  "L'export inclut-il les transactions annulées ?",
];

const CRITERIA: [string, string][] = [
  ["GIVEN", "un user authentifié..."],
  ["WHEN", "il clique sur « Exporter »..."],
  ["THEN", "un fichier CSV est généré..."],
];

export const Features = () => (
  <section
    className="relative z-[2] pt-[60px] pb-[100px] border-t border-line"
    id="features"
  >
    <div className="max-w-[1280px] mx-auto px-8">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint mb-6">
        <span className="w-8 h-px bg-orange" />
        Fonctionnalités
      </div>
      <h2 className="font-serif font-normal mb-6 leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,56px)] max-w-[800px]">
        Tout ce qu&apos;un dev{" "}
        <em className="italic font-light text-orange">aurait dû</em> demander
        avant de coder.
      </h2>
      <p className="text-lg text-ink-soft max-w-[640px] leading-[1.6]">
        Sprint Predict ne remplace pas votre Three Amigos — il s&apos;assure
        que rien ne lui échappe.
      </p>

      <div className="mt-[60px] grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Feature 1 — Readiness Score (dark accent) */}
        <FeatureCard
          className="lg:col-span-7 min-h-[360px] bg-ink text-bg relative overflow-hidden"
          eyebrowClassName="text-orange opacity-100"
          descClassName="opacity-[0.78]"
          eyebrow="01 — Readiness Score"
          title={
            <>
              Un score de 0 à 100,
              <br />
              basé sur des règles claires.
            </>
          }
          desc="Description, critères, dépendances, contexte. Pas de boîte noire — chaque point se justifie."
        >
          <ScorePillStack />
        </FeatureCard>

        {/* Feature 2 — Questions */}
        <FeatureCard
          className="lg:col-span-5"
          eyebrow="02 — Questions Amigos"
          title={
            <>
              Détecte ce qui n&apos;est{" "}
              <em className="italic font-light text-orange">pas</em> dit.
            </>
          }
          desc="Cas limites, hypothèses implicites, comportements non définis."
        >
          <div className="mt-6 flex flex-col gap-2.5">
            {QUESTIONS.map((q, i) => (
              <div
                key={i}
                className="bg-bg-alt border-l-[3px] border-orange py-3 px-4 rounded-r-md text-[13px] text-ink-soft italic font-serif"
              >
                <span className="font-semibold text-orange not-italic mr-1.5 font-mono">
                  Q.
                </span>
                {q}
              </div>
            ))}
          </div>
        </FeatureCard>

        {/* Feature 3 — Critères */}
        <FeatureCard
          className="lg:col-span-5"
          eyebrow="03 — Critères suggérés"
          title={
            <>
              5 à 6 critères{" "}
              <em className="italic font-light text-orange">actionnables.</em>
            </>
          }
          desc="Format Given / When / Then ou bullet points. Prêts à coller dans le ticket."
        >
          <div className="mt-5 flex flex-col gap-2">
            {CRITERIA.map(([k, v]) => (
              <div
                key={k}
                className="font-mono text-xs py-2 px-3 bg-bg-alt rounded-md text-ink-soft"
              >
                <span className="text-orange font-semibold">{k}</span> {v}
              </div>
            ))}
          </div>
        </FeatureCard>

        {/* Feature 4 — Auto comment */}
        <FeatureCard
          className="lg:col-span-7 relative overflow-hidden"
          eyebrow="04 — Auto-comment Jira"
          title={
            <>
              Le résumé se poste{" "}
              <em className="italic font-light text-orange">tout seul</em> dans
              le ticket.
            </>
          }
          desc="Score, questions, suggestions. Un commentaire bien formaté, visible par toute l'équipe — directement dans Jira."
        >
          <div className="mt-5 flex flex-col gap-2">
            <div className="font-mono text-xs py-2 px-3 rounded-md bg-jira-soft text-[#0747a6]">
              <span className="text-jira font-semibold">JIRA · BOT</span>{" "}
              Sprint Predict — Analyse #142 · Score 78/100
            </div>
            <div className="font-mono text-xs py-2 px-3 bg-bg-alt rounded-md text-ink-soft">
              📋 3 questions à clarifier en grooming
            </div>
            <div className="font-mono text-xs py-2 px-3 bg-bg-alt rounded-md text-ink-soft">
              ✓ 5 critères d&apos;acceptation suggérés
            </div>
          </div>
        </FeatureCard>
      </div>
    </div>
  </section>
);
