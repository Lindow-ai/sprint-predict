"use client";

import { useRequireAuth } from "@/features/auth";
import { Sidebar } from "./_components/sidebar";
import { Topbar } from "./_components/topbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useRequireAuth();

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-faint">
        <span className="font-mono text-xs uppercase tracking-widest">
          Chargement…
        </span>
      </div>
    );
  }

  return (
    <div className="relative z-[2] min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 lg:p-10 max-w-[1320px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
