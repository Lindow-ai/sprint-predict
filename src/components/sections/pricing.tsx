import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const checkIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

type Plan = {
  name: string;
  tag: string;
  price: { num: string; currency?: string; period: string; mode?: "currency" | "custom" };
  desc: string;
  features: string[];
  cta: { label: string; variant: "outline" | "accent" };
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Solo",
    tag: "— Pour découvrir",
    price: { num: "0", currency: "€", period: "/ pour toujours" },
    desc: "Idéal si tu veux tester sur tes propres tickets, sans engagement.",
    features: [
      "50 analyses / mois",
      "Score & questions générés",
      "1 utilisateur",
      "Copier/coller manuel dans Jira",
    ],
    cta: { label: "Commencer gratuitement", variant: "outline" },
  },
  {
    name: "Team",
    tag: "— Pour les équipes Scrum",
    price: { num: "19", currency: "€", period: "/ utilisateur / mois" },
    desc: "Tout ce qu'il faut pour sortir des sprints sans tickets bloqués.",
    features: [
      "Analyses illimitées",
      "Auto-commentaire Jira",
      "Critères d'acceptation suggérés",
      "Templates par équipe",
      "Support email prioritaire",
    ],
    cta: { label: "Démarrer l'essai 14 jours", variant: "accent" },
    featured: true,
  },
  {
    name: "Scale",
    tag: "— Pour les organisations",
    price: { num: "Sur", period: "devis", mode: "custom" },
    desc: "Pour les équipes 50+ qui veulent un déploiement sur-mesure.",
    features: [
      "Tout du plan Team",
      "SSO / SAML",
      "Plugin Jira officiel",
      "SLA 99,9 % + audit logs",
      "Customer Success dédié",
    ],
    cta: { label: "Contacter l'équipe", variant: "outline" },
  },
];

export function Pricing() {
  return (
    <section className="relative z-[2] pt-[100px] pb-[100px] border-t border-line" id="pricing">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint mb-6">
          <span className="w-8 h-px bg-orange" />
          Tarification
        </div>
        <h2 className="font-serif font-normal mb-6 leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,56px)] max-w-[800px]">
          Simple. <em className="italic font-light text-orange">Comme le produit.</em>
        </h2>
        <p className="text-lg text-ink-soft max-w-[640px] leading-[1.6]">
          Aucun engagement. Annulable à tout moment. Premier ticket gratuit, toujours.
        </p>

        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <PriceCard key={p.name} plan={p} />
          ))}
        </div>

        <p className="mt-[60px] text-center text-ink-faint font-mono text-[13px]">
          Tous les plans incluent : hébergement EU · chiffrement TLS · zéro retention des
          tickets
        </p>
      </div>
    </section>
  );
}

function PriceCard({ plan }: { plan: Plan }) {
  const featured = plan.featured;
  return (
    <div
      className={`relative rounded-[14px] p-9 px-8 flex flex-col border ${
        featured
          ? "bg-ink text-bg border-ink md:-translate-y-3 shadow-[0_30px_60px_-20px_rgba(26,24,20,0.4)]"
          : "bg-paper border-line"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white py-1 px-3.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-[0.05em]">
          Le plus populaire
        </span>
      )}
      <h3 className="font-serif text-[26px] font-medium mb-1.5 tracking-[-0.02em]">
        {plan.name}
      </h3>
      <div
        className={`font-mono text-[11px] uppercase tracking-[0.05em] mb-7 ${
          featured ? "text-bg/50" : "text-ink-faint"
        }`}
      >
        {plan.tag}
      </div>

      <div className="flex items-baseline gap-1.5 mb-2">
        {plan.price.currency && (
          <span className="font-serif text-[28px] font-normal">{plan.price.currency}</span>
        )}
        <span className="font-serif text-[64px] font-medium tracking-[-0.04em] leading-none">
          {plan.price.num}
        </span>
        <span
          className={`text-sm ${featured ? "text-bg/60" : "text-ink-faint"} ${
            plan.price.mode === "custom" ? "ml-2" : ""
          }`}
        >
          {plan.price.period}
        </span>
      </div>

      <p
        className={`text-sm leading-[1.55] mb-7 pb-7 border-b border-dashed ${
          featured ? "text-bg/70 border-bg/15" : "text-ink-soft border-line"
        }`}
      >
        {plan.desc}
      </p>

      <ul className="list-none flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm leading-[1.5]">
            <span
              className={`shrink-0 mt-0.5 ${
                featured ? "text-[#ffb89e]" : "text-orange"
              }`}
            >
              {checkIcon}
            </span>
            {f}
          </li>
        ))}
      </ul>

      {plan.cta.variant === "accent" ? (
        <Link
          href="#"
          className={cn(
            buttonVariants(),
            "w-full h-auto justify-center py-3.5 bg-orange text-white hover:bg-orange/90 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(255,91,31,0.25)]",
          )}
        >
          {plan.cta.label}
        </Link>
      ) : (
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full h-auto justify-center py-3.5",
            featured
              ? "border-bg text-bg hover:bg-bg hover:text-ink"
              : "border-ink text-ink hover:bg-ink hover:text-bg",
          )}
        >
          {plan.cta.label}
        </Link>
      )}
    </div>
  );
}
