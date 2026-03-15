"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/tableau-de-bord", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/mes-biens", label: "Mes biens", icon: Building2 },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/messagerie", label: "Messagerie", icon: MessageSquare, badge: 0 },
  { href: "/facturation", label: "Facturation", icon: CreditCard },
  { href: "/parametres", label: "Paramètres", icon: Settings },
];

const BOTTOM_ITEMS = [
  { href: "#", label: "Support", icon: HelpCircle },
];

interface SidebarProps {
  unreadMessages?: number;
  unreadNotifications?: number;
}

export function Sidebar({ unreadMessages = 0 }: SidebarProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN";
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 240 : 72 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-[var(--noir-profond)] border-r border-white/[0.04]"
    >
      {/* Logo */}
      <div className="h-16 lg:h-20 flex items-center px-4 border-b border-white/[0.04]">
        <Link href="/" className="flex items-center gap-2.5 group min-w-0">
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--or-pur)] to-[var(--or-brillant)] rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <span
              className="text-[var(--or-pur)] font-bold text-lg"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              R
            </span>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[var(--blanc-absolu)] text-lg tracking-tight whitespace-nowrap"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Rentium
                <span className="text-[var(--or-pur)]"> Partners</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {/* Lien Admin — visible uniquement pour ADMIN / SUPER_ADMIN */}
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mb-2",
              pathname === "/admin"
                ? "bg-[var(--or-pur)]/10 text-[var(--or-pur)]"
                : "text-[var(--or-brillant)] hover:text-[var(--or-pur)] hover:bg-[var(--or-pur)]/5 border border-[var(--or-pur)]/10"
            )}
            title={!isExpanded ? "Administration" : undefined}
          >
            {pathname === "/admin" && (
              <motion.div
                layoutId="sidebar-indicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--or-pur)] rounded-r-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <ShieldCheck size={20} className="shrink-0" />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  Administration
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        )}

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const badgeCount = item.href === "/messagerie" ? unreadMessages : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[var(--or-pur)]/10 text-[var(--or-pur)]"
                  : "text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] hover:bg-white/[0.04]"
              )}
              title={!isExpanded ? item.label : undefined}
            >
              {/* Indicateur actif */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--or-pur)] rounded-r-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              <item.icon size={20} className="shrink-0" />

              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Badge non-lu */}
              {badgeCount > 0 && (
                <span
                  className={cn(
                    "flex items-center justify-center min-w-[20px] h-5 text-xs font-semibold rounded-full bg-[var(--or-pur)] text-[var(--noir-absolu)]",
                    isExpanded ? "ml-auto" : "absolute -top-1 -right-1 min-w-[16px] h-4 text-[10px]"
                  )}
                >
                  {badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Navigation basse */}
      <div className="py-4 px-3 border-t border-white/[0.04] space-y-1">
        {BOTTOM_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] hover:bg-white/[0.04] transition-all"
            title={!isExpanded ? item.label : undefined}
          >
            <item.icon size={20} className="shrink-0" />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}

        <button
          onClick={() => {/* signOut handled by header */}}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--gris-plume)] hover:text-[var(--erreur)] hover:bg-[var(--erreur)]/5 transition-all"
          title={!isExpanded ? "Déconnexion" : undefined}
        >
          <LogOut size={20} className="shrink-0" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                Déconnexion
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Toggle expand/collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-[var(--noir-card)] border border-white/[0.08] flex items-center justify-center text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] hover:border-[var(--or-pur)]/30 transition-all shadow-lg"
        aria-label={isExpanded ? "Réduire le menu" : "Agrandir le menu"}
      >
        {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </motion.aside>
  );
}
