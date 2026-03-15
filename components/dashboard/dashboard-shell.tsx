"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

interface DashboardShellProps {
  user: {
    prenom: string;
    nom: string;
    email: string;
    role: string;
  };
  children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[var(--noir-absolu)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Zone principale (décalée par la sidebar) */}
      <div className="lg:pl-[240px] transition-all duration-300">
        <DashboardHeader user={user} />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
