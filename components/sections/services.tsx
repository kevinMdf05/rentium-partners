"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Building2, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Building2,
    titre: "LMNP",
    sousTitre: "Location Meublée Non Professionnelle",
    description:
      "Optimisez la fiscalité de vos biens meublés avec un suivi comptable rigoureux. Amortissements, charges déductibles, déclarations — nous gérons tout.",
    prix: "À partir de 20€/mois",
    features: [
      "Déclaration au régime réel simplifié",
      "Calcul automatique des amortissements",
      "Suivi des charges déductibles",
      "Liasse fiscale complète",
    ],
    href: "/inscription",
  },
  {
    icon: Landmark,
    titre: "SCI à l'IR",
    sousTitre: "Société Civile Immobilière à l'Impôt sur le Revenu",
    description:
      "Gérez votre patrimoine via SCI en toute sérénité. Comptabilité des associés, déclaration 2072, suivi des parts — une expertise dédiée.",
    prix: "À partir de 30€/mois",
    features: [
      "Déclaration 2072 incluse",
      "Gestion multi-associés",
      "Suivi des comptes courants",
      "Assemblées générales préparées",
    ],
    href: "/inscription",
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container-rentium">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm text-[var(--or-pur)] uppercase tracking-widest mb-4">
            Nos expertises
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)" }}>
            Deux régimes,
            <br />
            <span className="text-gradient-or">une seule exigence.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map(
            ({ icon: Icon, titre, sousTitre, description, prix, features, href }, i) => (
              <ScrollReveal key={titre} delay={i * 0.15}>
                <div className="glass-card p-8 lg:p-10 h-full flex flex-col group">
                  {/* Icône */}
                  <div className="w-14 h-14 rounded-2xl bg-[var(--or-glow)] flex items-center justify-center mb-6 group-hover:bg-[var(--or-pur)]/20 transition-colors">
                    <Icon size={28} className="text-[var(--or-pur)]" />
                  </div>

                  {/* Contenu */}
                  <h3
                    className="text-2xl lg:text-3xl text-[var(--blanc-absolu)] mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {titre}
                  </h3>
                  <p className="text-sm text-[var(--or-pur)] mb-4">{sousTitre}</p>
                  <p className="text-[var(--gris-plume)] leading-relaxed mb-6">
                    {description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--gris-plume)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--or-pur)] mt-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
                    <span
                      className="text-lg text-[var(--or-brillant)] font-medium"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {prix}
                    </span>
                    <Link href={href}>
                      <Button variant="secondary" size="sm" className="group/btn">
                        Découvrir
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover/btn:translate-x-0.5"
                        />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
