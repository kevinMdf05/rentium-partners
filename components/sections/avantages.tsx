"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Shield,
  Zap,
  Target,
  Server,
  Smartphone,
  MessageSquare,
} from "lucide-react";

const AVANTAGES = [
  {
    icon: Shield,
    titre: "Sécurité maximale",
    description: "Chiffrement de bout en bout, authentification 2FA, et conformité RGPD totale.",
    span: "col-span-1",
  },
  {
    icon: Zap,
    titre: "Temps réel",
    description: "Tableau de bord actualisé en permanence. Suivez votre patrimoine à la seconde.",
    span: "col-span-1",
  },
  {
    icon: Target,
    titre: "Expertise comptable",
    description: "Des experts-comptables certifiés spécialisés en immobilier locatif.",
    span: "col-span-1",
  },
  {
    icon: Server,
    titre: "Données hébergées en France",
    description:
      "Vos données sont hébergées sur des serveurs français conformes aux normes européennes les plus strictes.",
    span: "md:col-span-2",
  },
  {
    icon: Smartphone,
    titre: "Mobile first",
    description: "Application responsive optimisée pour tous vos appareils.",
    span: "col-span-1",
  },
  {
    icon: MessageSquare,
    titre: "Support humain",
    description: "Une équipe dédiée disponible pour répondre à toutes vos questions sous 24h.",
    span: "col-span-1",
  },
  {
    icon: Shield,
    titre: "Conforme au droit français",
    description:
      "Toutes nos procédures respectent scrupuleusement la législation fiscale française en vigueur.",
    span: "md:col-span-2",
  },
];

export function Avantages() {
  return (
    <section id="avantages" className="section-padding">
      <div className="container-rentium">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm text-[var(--or-pur)] uppercase tracking-widest mb-4">
            Nos engagements
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)" }}>
            Pourquoi choisir{" "}
            <span className="text-gradient-or">Rentium</span>
          </h2>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {AVANTAGES.map(({ icon: Icon, titre, description, span }, i) => (
            <ScrollReveal key={titre} delay={i * 0.08} className={span}>
              <div className="glass-card p-6 lg:p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-[var(--or-glow)] flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[var(--or-pur)]" />
                </div>
                <h3
                  className="text-lg text-[var(--blanc-absolu)] mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {titre}
                </h3>
                <p className="text-sm text-[var(--gris-plume)] leading-relaxed">
                  {description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
