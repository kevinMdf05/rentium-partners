"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Lock, CheckCircle, Star, Shield } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Lock, label: "Données hébergées en France" },
  { icon: CheckCircle, label: "RGPD conforme" },
  { icon: Star, label: "4.9/5 satisfaction" },
  { icon: Shield, label: "Paiement 100% sécurisé" },
];

/* Animation stagger pour les titres */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Présentation Rentium Partners"
    >
      {/* Aurora gradient animé — orbes dorées sur fond noir */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        {/* Vignette pour profondeur */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--noir-absolu)_75%)]" />
      </div>

      <div className="container-rentium relative z-10 pt-24 pb-16 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
        >
          {/* Badge pill */}
          <motion.div variants={childVariants}>
            <Badge variant="premium" pulse className="text-sm px-5 py-2">
              Gestion immobilière d&apos;excellence
            </Badge>
          </motion.div>

          {/* Titre H1 héroïque */}
          <motion.h1
            variants={childVariants}
            className="leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Votre{" "}
            <em className="text-gradient-or not-italic">patrimoine</em>
            <br />
            mérite une gestion
            <br />
            <span className="text-[var(--gris-plume)]">sans compromis.</span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={childVariants}
            className="text-lg sm:text-xl text-[var(--gris-plume)] max-w-2xl leading-relaxed"
          >
            Rentium Partners accompagne les investisseurs immobiliers exigeants
            dans la gestion comptable et fiscale de leurs biens{" "}
            <span className="text-[var(--blanc-casse)] font-medium">LMNP</span>{" "}
            et{" "}
            <span className="text-[var(--blanc-casse)] font-medium">SCI</span>.
            Simple, sécurisé, souverain.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <Link href="/inscription">
              <Button variant="primary" size="xl" className="group shimmer-hover">
                Commencer maintenant
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Button>
            </Link>
            <a href="#tarifs">
              <Button variant="secondary" size="xl">
                Voir nos formules
              </Button>
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={childVariants}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 text-xs text-[var(--gris-acier)]"
          >
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon size={14} className="text-[var(--or-pur)]" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#chiffres"
            aria-label="Défiler vers le bas"
            className="flex flex-col items-center gap-2 text-[var(--gris-acier)] hover:text-[var(--or-pur)] transition-colors"
          >
            <span className="text-xs">Découvrir</span>
            <ChevronDown size={20} className="animate-scroll-indicator" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
