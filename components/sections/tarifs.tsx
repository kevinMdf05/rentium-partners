"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "LMNP_1",
    nom: "LMNP Solo",
    description: "1 bien en location meublée",
    prix: 20,
    prixAnnuel: 192,
    features: [
      "Suivi comptable 1 bien LMNP",
      "Déclaration fiscale annuelle",
      "Tableau de bord en temps réel",
      "Stockage documents illimité",
      "Support email prioritaire",
      "Calendrier fiscal personnalisé",
    ],
    badge: null,
    popular: false,
  },
  {
    id: "LMNP_2",
    nom: "LMNP Duo",
    description: "2 biens en location meublée",
    prix: 35,
    prixAnnuel: 336,
    features: [
      "Suivi comptable 2 biens LMNP",
      "Déclarations fiscales annuelles",
      "Tableau de bord multi-biens",
      "Stockage documents illimité",
      "Support prioritaire 24h",
      "Rapports comparatifs",
      "Conseils optimisation fiscale",
    ],
    badge: "Populaire",
    popular: true,
  },
  {
    id: "SCI_IR_1",
    nom: "SCI IR Solo",
    description: "1 bien via SCI à l'IR",
    prix: 30,
    prixAnnuel: 288,
    features: [
      "Comptabilité SCI complète",
      "Déclaration 2072 incluse",
      "Suivi associés et parts",
      "Tableau de bord SCI",
      "Stockage documents illimité",
      "Support expert SCI",
    ],
    badge: null,
    popular: false,
  },
  {
    id: "SCI_IR_2",
    nom: "SCI IR Duo",
    description: "2 biens via SCI à l'IR",
    prix: 45,
    prixAnnuel: 432,
    features: [
      "Comptabilité 2 SCI ou 2 biens",
      "Déclarations 2072 multiples",
      "Gestion multi-associés",
      "Tableau de bord consolidé",
      "Stockage illimité",
      "Support dédié senior",
      "Reporting trimestriel",
    ],
    badge: "Premium",
    popular: false,
  },
];

export function Tarifs() {
  const [isAnnuel, setIsAnnuel] = useState(false);

  return (
    <section id="tarifs" className="section-padding relative">
      {/* Background subtil */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--or-glow)_0%,transparent_50%)]"
        aria-hidden="true"
      />

      <div className="container-rentium container-wide relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm text-[var(--or-pur)] uppercase tracking-widest mb-4">
            Tarifs transparents
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)" }}>
            Des formules{" "}
            <span className="text-gradient-or">sans surprise</span>
          </h2>
          <p className="mt-4 text-[var(--gris-plume)] max-w-lg mx-auto">
            Choisissez la formule adaptée à votre patrimoine. Tous nos prix sont
            TTC, sans frais cachés.
          </p>
        </ScrollReveal>

        {/* Toggle mensuel / annuel */}
        <ScrollReveal className="flex items-center justify-center gap-4 mb-12">
          <span
            className={cn(
              "text-sm transition-colors",
              !isAnnuel ? "text-[var(--blanc-absolu)]" : "text-[var(--gris-acier)]"
            )}
          >
            Mensuel
          </span>
          <button
            onClick={() => setIsAnnuel(!isAnnuel)}
            className={cn(
              "relative w-14 h-7 rounded-full transition-colors duration-300",
              isAnnuel
                ? "bg-[var(--or-pur)]"
                : "bg-[var(--bordure-subtile)]"
            )}
            role="switch"
            aria-checked={isAnnuel}
            aria-label="Basculer entre facturation mensuelle et annuelle"
          >
            <span
              className={cn(
                "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300",
                isAnnuel ? "translate-x-8" : "translate-x-1"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm transition-colors",
              isAnnuel ? "text-[var(--blanc-absolu)]" : "text-[var(--gris-acier)]"
            )}
          >
            Annuel
          </span>
          {isAnnuel && (
            <Badge variant="success" className="text-xs">
              2 mois offerts
            </Badge>
          )}
        </ScrollReveal>

        {/* Grille des plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.1}>
              <div
                className={cn(
                  "relative rounded-2xl border p-6 lg:p-8 h-full flex flex-col transition-all duration-400",
                  plan.popular
                    ? "border-[var(--or-pur)]/50 bg-[var(--noir-card)] shadow-xl shadow-[var(--or-glow)]"
                    : "border-white/[0.06] bg-[var(--noir-card)] hover:border-[var(--or-pur)]/30"
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant={plan.popular ? "default" : "premium"}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3
                    className="text-xl text-[var(--blanc-absolu)] mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {plan.nom}
                  </h3>
                  <p className="text-xs text-[var(--gris-acier)]">
                    {plan.description}
                  </p>
                </div>

                {/* Prix */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl font-bold text-[var(--blanc-absolu)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {isAnnuel
                        ? Math.round(plan.prixAnnuel / 12)
                        : plan.prix}€
                    </span>
                    <span className="text-sm text-[var(--gris-acier)]">/mois</span>
                  </div>
                  {isAnnuel && (
                    <p className="text-xs text-[var(--or-pur)] mt-1">
                      {plan.prixAnnuel}€ facturé annuellement
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--gris-plume)]">
                      <Check size={16} className="text-[var(--or-pur)] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={`/inscription?plan=${plan.id}`} className="mt-auto">
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    size="lg"
                    className="w-full group"
                  >
                    Choisir cette formule
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Note */}
        <ScrollReveal className="text-center mt-8">
          <p className="text-sm text-[var(--gris-acier)]">
            Sans engagement — Résiliable à tout moment — Paiement sécurisé via Stripe
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
