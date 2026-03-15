"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Bell, Search, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  user: {
    prenom: string;
    nom: string;
    email: string;
    role: string;
  };
  unreadNotifications?: number;
}

export function DashboardHeader({ user, unreadNotifications = 0 }: DashboardHeaderProps) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push("/connexion");
  }

  return (
    <header className="sticky top-0 z-30 h-16 lg:h-20 flex items-center justify-between px-6 lg:px-8 bg-[var(--noir-absolu)]/80 backdrop-blur-2xl border-b border-white/[0.04]">
      {/* Barre de recherche */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gris-acier)]"
          />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] text-sm text-[var(--blanc-absolu)] placeholder:text-[var(--gris-acier)] focus:outline-none focus:border-[var(--or-pur)] focus:shadow-[0_0_0_3px_var(--or-glow)] transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--gris-acier)] bg-[var(--noir-card)] px-1.5 py-0.5 rounded border border-white/[0.06]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link
          href="/parametres"
          className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] hover:bg-white/[0.04] transition-all"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center text-[10px] font-bold rounded-full bg-[var(--or-pur)] text-[var(--noir-absolu)]">
              {unreadNotifications > 9 ? "9+" : unreadNotifications}
            </span>
          )}
        </Link>

        {/* Menu profil */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--or-pur)] to-[var(--or-brillant)] flex items-center justify-center text-[var(--noir-absolu)] text-xs font-bold">
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-[var(--blanc-absolu)] leading-tight">
                {user.prenom} {user.nom}
              </p>
              <p className="text-xs text-[var(--gris-acier)] leading-tight">
                {user.role === "ADMIN" || user.role === "SUPER_ADMIN"
                  ? "Administrateur"
                  : "Client"}
              </p>
            </div>
            <ChevronDown
              size={14}
              className={cn(
                "text-[var(--gris-acier)] transition-transform hidden md:block",
                isProfileOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[var(--noir-card)] border border-white/[0.06] shadow-2xl shadow-black/40 overflow-hidden">
              <div className="p-3 border-b border-white/[0.04]">
                <p className="text-sm font-medium text-[var(--blanc-absolu)]">
                  {user.prenom} {user.nom}
                </p>
                <p className="text-xs text-[var(--gris-acier)] truncate">
                  {user.email}
                </p>
              </div>

              <div className="p-1.5">
                <Link
                  href="/parametres"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] hover:bg-white/[0.04] transition-all"
                >
                  <User size={16} />
                  Mon profil
                </Link>
                <Link
                  href="/parametres"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] hover:bg-white/[0.04] transition-all"
                >
                  <Settings size={16} />
                  Paramètres
                </Link>
              </div>

              <div className="p-1.5 border-t border-white/[0.04]">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--gris-plume)] hover:text-[var(--erreur)] hover:bg-[var(--erreur)]/5 transition-all"
                >
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
