export const Testimonial = () => (
    <section className="relative z-[2] pt-[60px] pb-[100px] border-t border-line">
      <div className="max-w-[1280px] mx-auto px-8">
        <p className="mt-[60px] font-serif italic font-normal text-ink leading-[1.25] tracking-[-0.02em] text-[clamp(28px,4vw,44px)] max-w-[900px] before:content-['“'] before:text-orange before:text-[1.5em] before:leading-none before:align-[-0.2em] before:mr-[0.05em]">
          Avant Sprint Predict, on découvrait les ambiguïtés en milieu de
          sprint. Maintenant, elles sortent au refinement. Le ratio de tickets
          re-ouverts a chuté de moitié.
        </p>
        <div className="mt-7 flex items-center gap-3.5">
          <div className="w-11 h-11 bg-orange rounded-full flex items-center justify-center text-white font-serif font-medium text-lg">
            M
          </div>
          <div>
            <div className="font-semibold text-[15px]">Marie L.</div>
            <div className="font-mono text-xs text-ink-faint uppercase tracking-[0.04em]">
              Tech Lead — Scale-up Fintech, 28 devs
            </div>
          </div>
        </div>
      </div>
    </section>
);
