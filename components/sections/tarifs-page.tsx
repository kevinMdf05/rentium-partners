"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "LMNP_1",
    nom: "LMNP Solo",
    description: "1 bien en location meublée non professionnelle",
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
    description: "2 biens en location meublée non professionnelle",
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
    description: "1 bien via SCI soumise à l'impôt sur le revenu",
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
    description: "2 biens via SCI soumise à l'impôt sur le revenu",
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

const COMPARISON = [
  { feature: "Biens gérés", lmnp1: "1", lmnp2: "2", sci1: "1", sci2: "2" },
  { feature: "Déclaration fiscale", lmnp1: "✓", lmnp2: "✓", sci1: "✓", sci2: "✓" },
  { feature: "Tableau de bord", lmnp1: "✓", lmnp2: "Multi-biens", sci1: "✓", sci2: "Consolidé" },
  { feature: "Documents illimités", lmnp1: "✓", lmnp2: "✓", sci1: "✓", sci2: "✓" },
  { feature: "Rapports comparatifs", lmnp1: "—", lmnp2: "✓", sci1: "—", sci2: "✓" },
  { feature: "Déclaration 2072", lmnp1: "—", lmnp2: "—", sci1: "✓", sci2: "✓" },
  { feature: "Gestion associés", lmnp1: "—", lmnp2: "—", sci1: "✓", sci2: "Multi" },
  { feature: "Optimisation fiscale", lmnp1: "—", lmnp2: "✓", sci1: "—", sci2: "✓" },
  { feature: "Reporting trimestriel", lmnp1: "—", lmnp2: "—", sci1: "—", sci2: "✓" },
  { feature: "Support", lmnp1: "Email", lmnp2: "24h", sci1: "Expert", sci2: "Dédié" },
];

const FAQ_TARIFS = [
  {
    q: "Puis-je changer de formule à tout moment ?",
    a: "Oui, vous pouvez passer d'une formule à une autre à tout moment. Le changement prend effet immédiatement et le prorata est calculé automatiquement.",
  },
  {
    q: "Y a-t-il des frais cachés ?",
    a: "Absolument aucun. Les prix affichés sont TTC et incluent l'ensemble des services listés. Pas de frais de mise en service, pas de frais de résiliation.",
  },
  {
    q: "Que se passe-t-il si j'ai plus de 2 biens ?",
    a: "Contactez-nous pour une formule personnalisée. Nous proposons des tarifs dégressifs pour les patrimoines plus importants.",
  },
  {
    q: "La facturation annuelle est-elle avantageuse ?",
    a: "Oui, en choisissant la facturation annuelle vous bénéficiez de 2 mois offerts, soit une économie de 16,7% sur l'année.",
  },
];

export function TarifsPageContent() {
  const [isAnnuel, setIsAnnuel] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--or-glow)_0%,transparent_50%)]" />
        <div className="container-rentium relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-[var(--or-pur)] uppercase tracking-widest mb-4">
              Tarifs transparents
            </p>
            <h1 style={{ fontFamily: "var(--font-serif)" }}>
              Des formules{" "}
              <span className="text-gradient-or italic">sans surprise</span>
            </h1>
            <p className="mt-4 text-[var(--gris-plume)] max-w-lg mx-auto text-lg">
              Choisissez la formule adaptée à votre patrimoine.
              Tous nos prix sont TTC, sans frais cachés.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            <span className={cn("text-sm", !isAnnuel ? "text-[var(--blanc-absolu)]" : "text-[var(--gris-acier)]")}>
              Mensuel
            </span>
            <button
              onClick={() => setIsAnnuel(!isAnnuel)}
              className={cn(
                "relative w-14 h-7 rounded-full transition-colors duration-300",
                isAnnuel ? "bg-[var(--or-pur)]" : "bg-[var(--bordure-subtile)]"
              )}
              role="switch"
              aria-checked={isAnnuel}
            >
              <span className={cn(
                "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300",
                isAnnuel ? "translate-x-8" : "translate-x-1"
              )} />
            </button>
            <span className={cn("text-sm", isAnnuel ? "text-[var(--blanc-absolu)]" : "text-[var(--gris-acier)]")}>
              Annuel
            </span>
            {isAnnuel && <Badge variant="success">2 mois offerts</Badge>}
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.08}>
              <div className={cn(
                "relative rounded-2xl border p-6 lg:p-8 h-full flex flex-col transition-all duration-400",
                plan.popular
                  ? "border-[var(--or-pur)]/50 bg-[var(--noir-card)] shadow-xl shadow-[var(--or-glow)]"
                  : "border-white/[0.06] bg-[var(--noir-card)] hover:border-[var(--or-pur)]/30"
              )}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant={plan.popular ? "default" : "premium"}>{plan.badge}</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl text-[var(--blanc-absolu)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                    {plan.nom}
                  </h3>
                  <p className="text-xs text-[var(--gris-acier)]">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[var(--blanc-absolu)]" style={{ fontFamily: "var(--font-mono)" }}>
                      {isAnnuel ? Math.round(plan.prixAnnuel / 12) : plan.prix}€
                    </span>
                    <span className="text-sm text-[var(--gris-acier)]">/mois</span>
                  </div>
                  {isAnnuel && (
                    <p className="text-xs text-[var(--or-pur)] mt-1">
                      {plan.prixAnnuel}€ facturé annuellement
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--gris-plume)]">
                      <Check size={16} className="text-[var(--or-pur)] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/inscription?plan=${plan.id}`} className="mt-auto">
                  <Button variant={plan.popular ? "primary" : "secondary"} size="lg" className="w-full group">
                    Choisir cette formule
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="section-padding bg-[var(--noir-profond)]">
        <div className="container-rentium container-wide">
          <ScrollReveal className="text-center mb-12">
            <h2 style={{ fontFamily: "var(--font-serif)" }}>
              Comparatif <span className="text-gradient-or">détaillé</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-[var(--noir-card)]">
                    <th className="text-left text-sm font-medium text-[var(--gris-plume)] px-6 py-4 w-1/5">
                      Fonctionnalité
                    </th>
                    {PLANS.map((p) => (
                      <th key={p.id} className="text-center text-sm font-medium text-[var(--blanc-absolu)] px-4 py-4">
                        {p.nom}
                        <div className="text-xs text-[var(--or-pur)] font-normal mt-0.5">
                          {isAnnuel ? Math.round(p.prixAnnuel / 12) : p.prix}€/mois
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {COMPARISON.map((row) => (
                    <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                      <td className="text-sm text-[var(--gris-plume)] px-6 py-3">{row.feature}</td>
                      <td className="text-center text-sm text-[var(--blanc-casse)] px-4 py-3">{row.lmnp1}</td>
                      <td className="text-center text-sm text-[var(--blanc-casse)] px-4 py-3">{row.lmnp2}</td>
                      <td className="text-center text-sm text-[var(--blanc-casse)] px-4 py-3">{row.sci1}</td>
                      <td className="text-center text-sm text-[var(--blanc-casse)] px-4 py-3">{row.sci2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Tarifs */}
      <section className="section-padding">
        <div className="container-rentium max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <h2 style={{ fontFamily: "var(--font-serif)" }}>
              Questions sur les <span className="text-gradient-or">tarifs</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {FAQ_TARIFS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="rounded-xl border border-white/[0.06] bg-[var(--noir-card)] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-medium text-[var(--blanc-absolu)] flex items-center gap-2">
                      <HelpCircle size={16} className="text-[var(--or-pur)] shrink-0" />
                      {item.q}
                    </span>
                    <span className={cn(
                      "text-[var(--gris-acier)] transition-transform duration-300",
                      openFaq === i && "rotate-180"
                    )}>
                      ▾
                    </span>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-sm text-[var(--gris-plume)] leading-relaxed pl-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-[var(--noir-absolu)] to-[var(--noir-profond)]">
        <div className="container-rentium text-center">
          <ScrollReveal>
            <h2 className="mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              Prêt à <span className="text-gradient-or italic">commencer</span> ?
            </h2>
            <p className="text-[var(--gris-plume)] mb-8 max-w-md mx-auto">
              Créez votre compte en 3 minutes et commencez à optimiser
              la gestion de votre patrimoine immobilier.
            </p>
            <Link href="/inscription">
              <Button variant="primary" size="xl" className="group">
                Créer mon compte gratuitement
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-xs text-[var(--gris-acier)] mt-4">
              Sans engagement — Résiliable à tout moment
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
