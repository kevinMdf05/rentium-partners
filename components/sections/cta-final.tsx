"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaFinal() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background dégradé sombre vers or subtil */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--noir-profond)] to-[var(--noir-absolu)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,var(--or-glow)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container-rentium relative z-10 text-center">
        <ScrollReveal className="max-w-2xl mx-auto">
          <h2
            className="mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Prêt à optimiser
            <br />
            <span className="text-gradient-or">votre patrimoine ?</span>
          </h2>
          <p className="text-lg text-[var(--gris-plume)] mb-10 leading-relaxed">
            Rejoignez plus de 2 400 investisseurs qui ont choisi l&apos;excellence
            pour la gestion de leur patrimoine immobilier.
          </p>
          <Link href="/inscription">
            <Button variant="primary" size="xl" className="group shimmer-hover">
              Créer mon compte gratuitement
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-[var(--gris-acier)]">
            Sans engagement — Résiliable à tout moment
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
