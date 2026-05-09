import Link from "next/link";
import { Logo } from "@/components/logo";
import { LoginForm } from "./_components/login-form";
import { LoginVisualPanel } from "./_components/visual-panel";

const LoginPage = () => (
  <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] relative z-[2]">
    {/* Left — form */}
    <div className="flex flex-col p-8 lg:p-14">
      <Link href="/" className="inline-flex">
        <Logo />
      </Link>

      <div className="flex-1 flex items-center">
        <LoginForm />
      </div>

      <p className="font-mono text-[11px] text-ink-faint">
        © 2026 Sprint Predict · hébergement EU
      </p>
    </div>

    {/* Right — visual */}
    <LoginVisualPanel />
  </div>
);

export default LoginPage;
