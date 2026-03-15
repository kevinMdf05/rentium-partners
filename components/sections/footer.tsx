import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  services: {
    title: "Services",
    links: [
      { label: "LMNP", href: "#services" },
      { label: "SCI à l'IR", href: "#services" },
      { label: "Déclarations fiscales", href: "#services" },
      { label: "Optimisation", href: "#services" },
    ],
  },
  entreprise: {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  legal: {
    title: "Légal",
    links: [
      { label: "CGU", href: "/cgu" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
};

export function Footer() {
  return (
    <footer
      className="border-t border-white/[0.04] bg-[var(--noir-profond)]"
      role="contentinfo"
    >
      <div className="container-rentium section-padding">
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Colonne marque */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span
                className="text-2xl text-[var(--blanc-absolu)] tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Rentium
                <span className="text-[var(--or-pur)]"> Partners</span>
              </span>
            </Link>
            <p className="text-[var(--gris-plume)] text-sm leading-relaxed max-w-sm">
              Gestion comptable et fiscale immobilière d&apos;excellence.
              Spécialistes LMNP et SCI à l&apos;IR depuis 2020.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contact@rentiumpartners.fr"
                className="flex items-center gap-3 text-sm text-[var(--gris-plume)] hover:text-[var(--or-pur)] transition-colors"
              >
                <Mail size={16} />
                contact@rentiumpartners.fr
              </a>
              <a
                href="tel:+33176340000"
                className="flex items-center gap-3 text-sm text-[var(--gris-plume)] hover:text-[var(--or-pur)] transition-colors"
              >
                <Phone size={16} />
                01 76 34 00 00
              </a>
              <span className="flex items-center gap-3 text-sm text-[var(--gris-plume)]">
                <MapPin size={16} />
                Paris, France
              </span>
            </div>
          </div>

          {/* Colonnes de liens */}
          {Object.values(FOOTER_LINKS).map(({ title, links }) => (
            <div key={title} className="space-y-4">
              <h4 className="text-sm font-semibold text-[var(--blanc-absolu)] uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--gris-plume)] hover:text-[var(--or-pur)] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Séparateur */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--bordure-subtile)] to-transparent mt-16 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--gris-acier)]">
          <p>
            © {new Date().getFullYear()} Rentium Partners. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--succes)]" />
              Données hébergées en France
            </span>
            <span>RGPD conforme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
