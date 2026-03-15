import Link from "next/link";

/**
 * Layout authentification — fond noir avec effet aurora subtil
 * Centré verticalement, logo en haut
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--noir-absolu)] flex flex-col relative overflow-hidden">
      {/* Aurora subtile en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-orb aurora-orb-1 opacity-30" />
        <div className="aurora-orb aurora-orb-2 opacity-20" />
      </div>

      {/* Header avec logo */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-10 py-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Rentium Partners — Accueil"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--or-pur)] to-[var(--or-brillant)] rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <span
              className="text-[var(--or-pur)] font-bold text-lg"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              R
            </span>
          </div>
          <span
            className="text-[var(--blanc-absolu)] text-lg tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Rentium
            <span className="text-[var(--or-pur)]"> Partners</span>
          </span>
        </Link>
      </header>

      {/* Contenu centré */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* Footer minimaliste */}
      <footer className="relative z-10 text-center py-6 text-xs text-[var(--gris-acier)]">
        © {new Date().getFullYear()} Rentium Partners — Tous droits réservés
      </footer>
    </div>
  );
}
