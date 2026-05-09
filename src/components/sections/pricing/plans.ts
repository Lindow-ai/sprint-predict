export type Plan = {
  name: string;
  tag: string;
  price: {
    num: string;
    currency?: string;
    period: string;
    mode?: "currency" | "custom";
  };
  desc: string;
  features: string[];
  cta: { label: string; variant: "outline" | "accent" };
  featured?: boolean;
};

export const PLANS: Plan[] = [
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
