"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TEMOIGNAGES = [
  {
    nom: "Laurent Mercier",
    ville: "Paris",
    photo: "LM",
    note: 5,
    texte:
      "Rentium Partners a transformé la gestion de mes 2 appartements en LMNP. Je gagnais des heures chaque mois. Le tableau de bord est d'une clarté exceptionnelle.",
  },
  {
    nom: "Sophie Durand",
    ville: "Lyon",
    photo: "SD",
    note: 5,
    texte:
      "En tant que gérante d'une SCI familiale, j'avais besoin d'un service fiable et compétent. Rentium a dépassé mes attentes sur tous les plans.",
  },
  {
    nom: "Marc-Antoine Leroy",
    ville: "Bordeaux",
    photo: "ML",
    note: 5,
    texte:
      "L'optimisation fiscale proposée m'a permis d'économiser plus de 3 000€ sur ma dernière déclaration. Un investissement qui se rentabilise dès le premier mois.",
  },
  {
    nom: "Isabelle Chen",
    ville: "Toulouse",
    photo: "IC",
    note: 5,
    texte:
      "Le support est réactif, compétent et toujours bienveillant. Après 2 ans d'utilisation, je ne pourrais plus m'en passer. Service irréprochable.",
  },
];

export function Temoignages() {
  const [active, setActive] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % TEMOIGNAGES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + TEMOIGNAGES.length) % TEMOIGNAGES.length);
  }, []);

  /* Auto-scroll toutes les 5s */
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, next]);

  return (
    <section id="temoignages" className="section-padding">
      <div className="container-rentium">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm text-[var(--or-pur)] uppercase tracking-widest mb-4">
            Ils nous font confiance
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)" }}>
            La parole à nos{" "}
            <span className="text-gradient-or">clients</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          {/* Carousel */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-[var(--ease-out-expo)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {TEMOIGNAGES.map(({ nom, ville, photo, note, texte }) => (
                <div key={nom} className="w-full flex-shrink-0 px-4">
                  <div className="glass-card p-8 lg:p-12 text-center">
                    {/* Étoiles */}
                    <div className="flex items-center justify-center gap-1 mb-6">
                      {Array.from({ length: note }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-[var(--or-pur)] text-[var(--or-pur)]"
                        />
                      ))}
                    </div>

                    {/* Citation */}
                    <blockquote
                      className="text-lg lg:text-xl text-[var(--blanc-casse)] leading-relaxed mb-8"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      &laquo;&nbsp;{texte}&nbsp;&raquo;
                    </blockquote>

                    {/* Auteur */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--or-glow)] border border-[var(--or-pur)]/30 flex items-center justify-center">
                        <span className="text-sm font-semibold text-[var(--or-pur)]">
                          {photo}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-[var(--blanc-absolu)]">
                          {nom}
                        </p>
                        <p className="text-xs text-[var(--gris-acier)]">{ville}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Flèches navigation */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--noir-card)] border border-white/[0.06] flex items-center justify-center text-[var(--gris-plume)] hover:text-[var(--or-pur)] hover:border-[var(--or-pur)]/30 transition-all"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--noir-card)] border border-white/[0.06] flex items-center justify-center text-[var(--gris-plume)] hover:text-[var(--or-pur)] hover:border-[var(--or-pur)]/30 transition-all"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
            {TEMOIGNAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  i === active
                    ? "w-8 h-2 bg-[var(--or-pur)]"
                    : "w-2 h-2 bg-[var(--bordure-subtile)] hover:bg-[var(--gris-acier)]"
                )}
                role="tab"
                aria-selected={i === active}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
