"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon } from "@/components/icons/github";
import { ArrowRightIcon, MailIcon } from "lucide-react";

/**
 * Self-contained login form — handles both the email/password flow
 * and the SSO buttons (mocked).
 */
export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("amelie.dupont@acme.io");
  const [password, setPassword] = useState("••••••••");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      login(email.trim(), password);
      router.push("/dashboard");
    }, 600);
  };

  const onSso = () => {
    login("demo.user@acme.io", "demo");
    router.push("/dashboard");
  };

  return (
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
          <Label
            htmlFor="email"
            className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-faint"
          >
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
            <Label
              htmlFor="password"
              className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-faint"
            >
              Mot de passe
            </Label>
            <Link
              href="#"
              className="text-xs text-ink-faint hover:text-orange"
            >
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
        <span className="font-mono text-[10px] uppercase tracking-widest">
          ou
        </span>
        <span className="h-px bg-line flex-1" />
      </div>

      <div className="flex flex-col gap-2.5">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full border-line bg-paper text-ink hover:bg-bg-alt"
          onClick={onSso}
        >
          <GithubIcon className="size-4" />
          Continuer avec GitHub (démo)
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full border-line bg-paper text-ink hover:bg-bg-alt"
          onClick={onSso}
        >
          <MailIcon className="size-4" />
          Recevoir un magic link (démo)
        </Button>
      </div>

      <p className="mt-8 text-sm text-ink-faint">
        Pas encore de compte ?{" "}
        <Link
          href="/#pricing"
          className="text-ink underline underline-offset-4 hover:text-orange"
        >
          Voir les tarifs
        </Link>
      </p>
    </div>
  );
};
