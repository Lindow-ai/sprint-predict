"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRightIcon, MailIcon } from "lucide-react";
import { useAuth } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Form, TextField, PasswordField, SubmitButton } from "@/components/forms";
import { GithubIcon } from "@/components/icons/github";

const LoginSchema = z.object({
  email: z.string().min(1, "Email requis").email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

type LoginValues = z.infer<typeof LoginSchema>;

const DEFAULTS: LoginValues = {
  email: "amelie.dupont@acme.io",
  password: "••••••••",
};

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async ({ email, password }: LoginValues) => {
    // Mock async — simulates a network call so SubmitButton shows the spinner.
    await new Promise((r) => setTimeout(r, 600));
    const user = login(email.trim(), password);
    toast.success(`Bienvenue ${user.name.split(" ")[0]} ✨`);
    router.push("/dashboard");
  };

  const onSso = () => {
    const user = login("demo.user@acme.io", "demo");
    toast.success(`Bienvenue ${user.name.split(" ")[0]} ✨`);
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

      <Form
        schema={LoginSchema}
        defaultValues={DEFAULTS}
        onSubmit={onSubmit}
      >
        <TextField
          name="email"
          type="email"
          label="Email pro"
          placeholder="vous@equipe.com"
          autoComplete="email"
        />
        <PasswordField
          name="password"
          label="Mot de passe"
          labelAction={
            <Link
              href="#"
              className="text-xs text-ink-faint hover:text-orange"
            >
              Mot de passe oublié ?
            </Link>
          }
        />

        <SubmitButton
          loadingLabel="Connexion…"
          className="mt-2 h-11 w-full bg-orange text-white hover:bg-orange/90 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(255,91,31,0.25)] disabled:translate-y-0 disabled:opacity-70"
        >
          Se connecter
          <ArrowRightIcon className="size-4" />
        </SubmitButton>
      </Form>

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
