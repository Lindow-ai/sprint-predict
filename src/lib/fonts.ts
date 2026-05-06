/**
 * Centralized Google Fonts loaded via next/font.
 * Variables exposed to CSS via the `--font-*` custom properties.
 */
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Combined className for the <html> element. */
export const fontVariables = [
  inter.variable,
  fraunces.variable,
  jetbrainsMono.variable,
].join(" ");
