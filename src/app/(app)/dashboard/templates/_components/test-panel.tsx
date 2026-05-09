import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Dark accent panel offering a dry-run of the current template on a ticket. */
export const TestPanel = () => (
  <section className="bg-ink text-bg border-ink rounded-xl p-6 relative overflow-hidden">
    <div className="absolute -top-12 -right-12 size-40 bg-orange/30 rounded-full blur-3xl pointer-events-none" />
    <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-orange mb-2">
          › Mode test
        </div>
        <h2 className="font-serif text-[24px] mb-2">
          Tester les règles sur un ticket
        </h2>
        <p className="text-bg/70 text-sm">
          Colle un ticket Jira et vois en temps réel comment ton template le
          note. Permet d&apos;ajuster les poids sans casser ta prod.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full lg:w-80">
        <Input
          placeholder="PROJ-1247"
          className="h-10 bg-bg/10 border-bg/20 text-bg placeholder:text-bg/40"
        />
        <Button className="bg-orange text-white h-10 hover:bg-orange/90">
          Lancer un test à blanc
        </Button>
      </div>
    </div>
  </section>
);
