import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sprint Predict — Évaluez la maturité de vos tickets Jira en 3 secondes",
  description:
    "Sprint Predict évalue la maturité de chaque ticket Jira en 3 secondes. Score de readiness, questions Amigos manquantes, critères d'acceptation suggérés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
