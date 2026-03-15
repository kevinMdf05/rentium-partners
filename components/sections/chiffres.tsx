"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const METRICS = [
  {
    target: 2400,
    suffix: "+",
    label: "Clients accompagnés",
    description: "Investisseurs nous font confiance",
  },
  {
    target: 98,
    suffix: "%",
    label: "Satisfaction",
    description: "Taux de satisfaction client",
  },
  {
    target: 4,
    suffix: "",
    label: "Régimes fiscaux",
    description: "LMNP, SCI IR et plus",
  },
  {
    target: 15,
    suffix: "min",
    label: "Onboarding",
    description: "Pour créer votre espace",
  },
];

export function Chiffres() {
  return (
    <section id="chiffres" className="section-padding relative">
      {/* Ligne séparation dégradée */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--or-pur)]/20 to-transparent"
        aria-hidden="true"
      />

      <div className="container-rentium">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {METRICS.map(({ target, suffix, label, description }, i) => (
              <ScrollReveal key={label} delay={i * 0.1}>
                <div className="glass-card p-6 lg:p-8 text-center space-y-2">
                  <div className="text-3xl lg:text-5xl font-bold text-[var(--or-pur)]">
                    <AnimatedCounter
                      target={target}
                      suffix={suffix}
                      duration={2000 + i * 300}
                    />
                  </div>
                  <h3
                    className="text-base lg:text-lg text-[var(--blanc-absolu)]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {label}
                  </h3>
                  <p className="text-xs lg:text-sm text-[var(--gris-acier)]">
                    {description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
