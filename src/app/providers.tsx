"use client";

import { NuqsAdapter } from "nuqs/adapters/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/features/auth";

/**
 * Single entry point for all global client providers.
 * Add new ones here (toasts, theme, query client, etc.) — keep them
 * centralized so the root layout stays a server component.
 */
export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NuqsAdapter>
    <AuthProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AuthProvider>
  </NuqsAdapter>
);
