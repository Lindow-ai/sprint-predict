import { PriceCard } from "./price-card";
import { PLANS } from "./plans";

export const Pricing = () => (
  <section
    className="relative z-[2] pt-[100px] pb-[100px] border-t border-line"
    id="pricing"
  >
    <div className="max-w-[1280px] mx-auto px-8">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint mb-6">
        <span className="w-8 h-px bg-orange" />
        Tarification
      </div>
      <h2 className="font-serif font-normal mb-6 leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,56px)] max-w-[800px]">
        Simple.{" "}
        <em className="italic font-light text-orange">Comme le produit.</em>
      </h2>
      <p className="text-lg text-ink-soft max-w-[640px] leading-[1.6]">
        Aucun engagement. Annulable à tout moment. Premier ticket gratuit,
        toujours.
      </p>

      <div className="mt-[60px] grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map((p) => (
          <PriceCard key={p.name} plan={p} />
        ))}
      </div>

      <p className="mt-[60px] text-center text-ink-faint font-mono text-[13px]">
        Tous les plans incluent : hébergement EU · chiffrement TLS · zéro
        retention des tickets
      </p>
    </div>
  </section>
);
