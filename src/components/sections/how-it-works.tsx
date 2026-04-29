const steps = [
  {
    num: "01 / Connect",
    title: "Plug Jira",
    desc: "Token API ou OAuth. Configuration en moins de 2 minutes. Pas de migration, pas de friction.",
  },
  {
    num: "02 / Analyze",
    title: "Lance l'analyse",
    desc: "Un bouton sur le ticket. Sprint Predict lit la description, les critères, les commentaires.",
  },
  {
    num: "03 / Surface",
    title: "Voit ce qui manque",
    desc: "Score, ambiguïtés, cas limites, critères suggérés. Tout ce que ton PO aurait dû préciser.",
  },
  {
    num: "04 / Post",
    title: "Poste dans le ticket",
    desc: "Commentaire structuré directement dans Jira. Visible par toute l'équipe, prêt pour le grooming.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative z-[2] py-[100px] border-t border-line" id="how">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint mb-6">
          <span className="w-8 h-px bg-orange" />
          Comment ça marche
        </div>
        <h2 className="font-serif font-normal mb-6 leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,56px)] max-w-[800px]">
          Quatre étapes. <em className="italic font-light text-orange">Zéro friction.</em>
        </h2>
        <p className="text-lg text-ink-soft max-w-[640px] leading-[1.6]">
          Connectez votre instance Jira, ouvrez un ticket, lancez l&apos;analyse. Le
          commentaire se poste tout seul. C&apos;est tout.
        </p>

        <div className="mt-[70px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`p-8 pl-0 ${
                i < steps.length - 1 ? "lg:border-r lg:border-dashed lg:border-line" : ""
              }`}
            >
              <div className="font-mono text-xs text-orange font-semibold mb-4 tracking-[0.05em]">
                {step.num}
              </div>
              <h3 className="font-serif text-[22px] font-medium leading-[1.2] mb-2.5 tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-ink-soft text-sm leading-[1.55]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
