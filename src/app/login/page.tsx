"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon, MailIcon } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("amelie.dupont@acme.io");
  const [password, setPassword] = useState("••••••••");
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      login(email.trim(), password);
      router.push("/dashboard");
    }, 600);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] relative z-[2]">
      {/* Left — form */}
      <div className="flex flex-col p-8 lg:p-14">
        <Link href="/" className="inline-flex">
          <Logo />
        </Link>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[420px] mx-auto">
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-faint mb-3">
              › Connexion
            </div>
            <h1 className="font-serif text-[42px] leading-[1.05] tracking-[-0.02em] mb-3">
              Bon retour. <em className="italic font-light text-orange">Au boulot.</em>
            </h1>
            <p className="text-ink-soft text-[15px] mb-8">
              Mode démo : n&apos;importe quel email/mot de passe fonctionne.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-faint">
                  Email pro
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@equipe.com"
                  className="h-11 bg-paper border-line"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-faint">
                    Mot de passe
                  </Label>
                  <Link href="#" className="text-xs text-ink-faint hover:text-orange">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-paper border-line"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="mt-2 h-11 w-full bg-orange text-white hover:bg-orange/90 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(255,91,31,0.25)] disabled:translate-y-0 disabled:opacity-70"
              >
                {submitting ? "Connexion…" : "Se connecter"}
                <ArrowRightIcon className="size-4" />
              </Button>
            </form>

            <div className="my-7 flex items-center gap-3 text-ink-faint">
              <span className="h-px bg-line flex-1" />
              <span className="font-mono text-[10px] uppercase tracking-widest">ou</span>
              <span className="h-px bg-line flex-1" />
            </div>

            <div className="flex flex-col gap-2.5">
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-line bg-paper text-ink hover:bg-bg-alt"
                onClick={() => {
                  login("demo.user@acme.io", "demo");
                  router.push("/dashboard");
                }}
              >
                <GithubIcon className="size-4" />
                Continuer avec GitHub (démo)
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-line bg-paper text-ink hover:bg-bg-alt"
                onClick={() => {
                  login("demo.user@acme.io", "demo");
                  router.push("/dashboard");
                }}
              >
                <MailIcon className="size-4" />
                Recevoir un magic link (démo)
              </Button>
            </div>

            <p className="mt-8 text-sm text-ink-faint">
              Pas encore de compte ?{" "}
              <Link href="/#pricing" className="text-ink underline underline-offset-4 hover:text-orange">
                Voir les tarifs
              </Link>
            </p>
          </div>
        </div>

        <p className="font-mono text-[11px] text-ink-faint">
          © 2026 Sprint Predict · hébergement EU
        </p>
      </div>

      {/* Right — visual */}
      <div className="hidden lg:flex relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,91,31,0.25),transparent_55%)]" />
        <div className="relative flex flex-col justify-between p-14 text-bg w-full">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-orange">
            ● Live · 28 tickets analysés cette semaine
          </div>

          <div className="space-y-6 max-w-[440px]">
            <p className="font-serif text-[28px] leading-[1.25] italic text-bg/90">
              « Avant Sprint Predict, on découvrait les ambiguïtés en milieu de sprint. Maintenant, elles sortent au refinement. »
            </p>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-orange flex items-center justify-center font-serif font-medium text-white">
                M
              </div>
              <div>
                <div className="text-sm font-medium">Marie L.</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-bg/50">
                  Tech Lead — Fintech, 28 devs
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tickets shippés clean", val: "+62%" },
              { label: "Re-open rate", val: "−48%" },
              { label: "Temps grooming", val: "−25%" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-lg p-4"
              >
                <div className="font-serif text-[26px] leading-none text-orange">{s.val}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-bg/60 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
