import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Users, Award, MapPin, Scale, Lightbulb } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "À propos — Notre mission",
  description:
    "Rentium Partners accompagne les investisseurs immobiliers exigeants. Découvrez notre équipe, nos valeurs et notre mission.",
};

const VALEURS = [
  {
    icon: Shield,
    titre: "Sécurité absolue",
    description:
      "Vos données sont chiffrées, hébergées en France et protégées selon les standards bancaires les plus stricts.",
  },
  {
    icon: Award,
    titre: "Excellence comptable",
    description:
      "Notre équipe d'experts-comptables certifiés garantit une gestion fiscale irréprochable de votre patrimoine.",
  },
  {
    icon: Users,
    titre: "Proximité humaine",
    description:
      "Derrière chaque écran, une équipe dédiée qui vous connaît et comprend vos objectifs patrimoniaux.",
  },
  {
    icon: Scale,
    titre: "Conformité juridique",
    description:
      "Nous suivons l'évolution de la législation fiscale française pour garantir votre conformité à tout moment.",
  },
  {
    icon: Lightbulb,
    titre: "Innovation continue",
    description:
      "Notre plateforme évolue en permanence pour vous offrir les outils les plus performants du marché.",
  },
  {
    icon: MapPin,
    titre: "Souveraineté des données",
    description:
      "100% de nos infrastructures sont hébergées en France. Aucune donnée ne quitte le territoire européen.",
  },
];

const CHIFFRES = [
  { valeur: "2 400+", label: "Clients accompagnés" },
  { valeur: "98%", label: "Taux de satisfaction" },
  { valeur: "15 min", label: "Onboarding moyen" },
  { valeur: "0", label: "Redressement fiscal" },
];

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--or-glow)_0%,transparent_60%)]" />
          <div className="container-rentium relative z-10 text-center max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-sm text-[var(--or-pur)] uppercase tracking-widest mb-4">
                Notre mission
              </p>
              <h1 style={{ fontFamily: "var(--font-serif)" }}>
                Rendre la gestion immobilière{" "}
                <span className="text-gradient-or italic">accessible</span>{" "}
                à l&apos;excellence
              </h1>
              <p className="mt-6 text-[var(--gris-plume)] text-lg leading-relaxed">
                Fondée en 2020, Rentium Partners est née d&apos;un constat simple :
                la gestion comptable et fiscale immobilière ne devrait pas être
                un casse-tête. Nous avons créé une plateforme qui allie expertise
                humaine et technologie de pointe pour offrir à chaque investisseur
                un accompagnement digne des plus grands cabinets.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Chiffres */}
        <section className="py-16 border-y border-white/[0.04]">
          <div className="container-rentium">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {CHIFFRES.map((c, i) => (
                <ScrollReveal key={c.label} delay={i * 0.1} className="text-center">
                  <p
                    className="text-4xl lg:text-5xl font-bold text-[var(--or-pur)] mb-2"
                    style={{ fontFamily: "var(--font-mono, monospace)" }}
                  >
                    {c.valeur}
                  </p>
                  <p className="text-sm text-[var(--gris-plume)]">{c.label}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Notre histoire */}
        <section className="section-padding">
          <div className="container-rentium max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <h2 style={{ fontFamily: "var(--font-serif)" }}>
                Notre <span className="text-gradient-or">histoire</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-6 text-[var(--gris-plume)] leading-relaxed">
                <p>
                  Tout a commencé lorsque nos fondateurs, eux-mêmes investisseurs
                  immobiliers, se sont retrouvés face à la complexité de la gestion
                  fiscale de leurs biens en LMNP. Entre les déclarations fastidieuses,
                  les cabinets comptables impersonnels et les outils inadaptés, il manquait
                  une solution à la hauteur de leurs attentes.
                </p>
                <p>
                  Rentium Partners a été conçue pour combler ce vide : une plateforme
                  qui combine l&apos;expertise d&apos;un cabinet comptable spécialisé avec la
                  puissance d&apos;un outil digital moderne. Le tout, avec un niveau de
                  service et de sécurité digne de la clientèle la plus exigeante.
                </p>
                <p>
                  Aujourd&apos;hui, nous accompagnons plus de 2 400 investisseurs dans toute
                  la France, avec un taux de satisfaction de 98% et zéro redressement
                  fiscal sur l&apos;ensemble de nos clients.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="section-padding bg-[var(--noir-profond)]">
          <div className="container-rentium">
            <ScrollReveal className="text-center mb-12">
              <h2 style={{ fontFamily: "var(--font-serif)" }}>
                Nos <span className="text-gradient-or">valeurs</span>
              </h2>
              <p className="mt-4 text-[var(--gris-plume)] max-w-lg mx-auto">
                Six piliers fondamentaux qui guident chacune de nos décisions
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALEURS.map((valeur, i) => (
                <ScrollReveal key={valeur.titre} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] hover:border-[var(--or-pur)]/20 transition-all h-full">
                    <div className="w-10 h-10 rounded-xl bg-[var(--or-pur)]/10 flex items-center justify-center mb-4">
                      <valeur.icon size={20} className="text-[var(--or-pur)]" />
                    </div>
                    <h3 className="text-lg font-medium text-[var(--blanc-absolu)] mb-2">
                      {valeur.titre}
                    </h3>
                    <p className="text-sm text-[var(--gris-plume)] leading-relaxed">
                      {valeur.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-rentium text-center">
            <ScrollReveal>
              <h2 className="mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                Rejoignez-nous
              </h2>
              <p className="text-[var(--gris-plume)] mb-8 max-w-md mx-auto">
                Faites confiance à l&apos;expertise Rentium Partners pour une gestion
                patrimoniale sans compromis.
              </p>
              <Link href="/inscription">
                <Button variant="primary" size="xl" className="group">
                  Commencer maintenant
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
