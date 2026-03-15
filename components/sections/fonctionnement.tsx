"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { UserPlus, Home, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    numero: "01",
    titre: "Créez votre compte",
    description:
      "Inscription en 3 minutes. Renseignez vos informations et choisissez votre formule adaptée à votre patrimoine.",
  },
  {
    icon: Home,
    numero: "02",
    titre: "Ajoutez vos biens",
    description:
      "Saisissez les informations de vos biens immobiliers via notre interface intuitive. Importez vos documents en quelques clics.",
  },
  {
    icon: Sparkles,
    numero: "03",
    titre: "On gère, vous profitez",
    description:
      "Nos experts s'occupent de votre comptabilité et de vos déclarations. Vous suivez tout en temps réel depuis votre tableau de bord.",
  },
];

export function Fonctionnement() {
  return (
    <section id="fonctionnement" className="section-padding relative">
      <div className="container-rentium">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm text-[var(--or-pur)] uppercase tracking-widest mb-4">
            Simple comme 1, 2, 3
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)" }}>
            Comment{" "}
            <span className="text-gradient-or">ça marche</span>
          </h2>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Ligne verticale connectant les étapes */}
          <div
            className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--or-pur)]/20 to-transparent hidden sm:block"
            aria-hidden="true"
          />

          <div className="space-y-12 lg:space-y-16">
            {STEPS.map(({ icon: Icon, numero, titre, description }, i) => (
              <ScrollReveal key={numero} delay={i * 0.15}>
                <div
                  className={`flex flex-col sm:flex-row items-start gap-6 lg:gap-12 ${
                    i % 2 === 1 ? "lg:flex-row-reverse lg:text-right" : ""
                  }`}
                >
                  {/* Numéro et icône */}
                  <div className="flex sm:flex-col items-center gap-4 sm:gap-3 shrink-0 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--noir-card)] border border-[var(--or-pur)]/20 flex items-center justify-center shadow-lg shadow-black/20">
                      <Icon size={28} className="text-[var(--or-pur)]" />
                    </div>
                    <span
                      className="text-3xl font-bold text-[var(--or-pur)]/20"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {numero}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 pt-2">
                    <h3
                      className="text-xl lg:text-2xl text-[var(--blanc-absolu)] mb-3"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {titre}
                    </h3>
                    <p className="text-[var(--gris-plume)] leading-relaxed max-w-md">
                      {description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
