"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#fonctionnement", label: "Comment ça marche" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Détection de la section active via Intersection Observer */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(href);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[var(--noir-absolu)]/80 backdrop-blur-2xl border-b border-white/[0.04] shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="container-rentium flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Rentium Partners — Accueil"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--or-pur)] to-[var(--or-brillant)] rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <span
                className="text-[var(--or-pur)] font-bold text-lg"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                R
              </span>
            </div>
            <span
              className="text-[var(--blanc-absolu)] text-lg tracking-tight hidden sm:block"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Rentium
              <span className="text-[var(--or-pur)]"> Partners</span>
            </span>
          </Link>

          {/* Liens navigation — desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={cn(
                  "relative px-4 py-2 text-sm transition-colors duration-300",
                  activeSection === href
                    ? "text-[var(--or-pur)]"
                    : "text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)]"
                )}
              >
                {label}
                {/* Indicateur de page active — ligne or animée */}
                {activeSection === href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-px bg-[var(--or-pur)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/connexion">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/inscription">
              <Button variant="primary" size="sm">
                Commencer
              </Button>
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] transition-colors"
            aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Menu mobile — drawer plein écran */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--noir-absolu)] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setIsMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="text-2xl text-[var(--blanc-casse)] hover:text-[var(--or-pur)] transition-colors"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 mt-4 w-64">
                <Link href="/connexion" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="secondary" size="lg" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link href="/inscription" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    Commencer
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
