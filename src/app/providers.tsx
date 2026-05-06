"use client";

import { AuthProvider } from "@/features/auth";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Single entry point for all global client providers.
 * Add new ones here (toasts, theme, query client, etc.) — keep them
 * centralized so the root layout stays a server component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AuthProvider>
  );
}
