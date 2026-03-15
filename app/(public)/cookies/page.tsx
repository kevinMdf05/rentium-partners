import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Politique de cookies",
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-24 pb-20">
        <div className="container-rentium max-w-3xl">
          <h1
            className="text-4xl mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Politique de cookies
          </h1>
          <p className="text-sm text-[var(--gris-acier)] mb-12">
            Dernière mise à jour : 1er mars 2026
          </p>

          <div className="space-y-8">
            <Section title="1. Qu'est-ce qu'un cookie ?">
              Un cookie est un petit fichier texte déposé sur votre navigateur lors de votre
              visite sur un site web. Il permet au site de mémoriser des informations relatives
              à votre visite (préférences, session de connexion, etc.).
            </Section>

            <Section title="2. Cookies utilisés par Rentium Partners">
              <strong>Cookies strictement nécessaires :</strong>
              {"\n"}Ces cookies sont indispensables au fonctionnement de la plateforme et ne peuvent
              pas être désactivés. Ils incluent : le cookie de session (authentification), le cookie
              CSRF (sécurité des formulaires), et les préférences de consentement.
              {"\n\n"}
              <strong>Cookies de performance :</strong>
              {"\n"}Nous utilisons Sentry pour le suivi des erreurs techniques. Ces cookies nous
              permettent d&apos;identifier et corriger les bugs rapidement pour améliorer votre expérience.
              {"\n\n"}
              <strong>Cookies de paiement :</strong>
              {"\n"}Stripe dépose des cookies nécessaires à la sécurisation des transactions et à la
              prévention de la fraude. Ces cookies sont gérés par Stripe conformément à leur propre
              politique de confidentialité.
            </Section>

            <Section title="3. Cookies que nous n'utilisons PAS">
              Rentium Partners n&apos;utilise aucun cookie publicitaire, cookie de tracking tiers,
              ni cookie de profilage marketing. Nous ne vendons aucune donnée de navigation à
              des tiers.
            </Section>

            <Section title="4. Durée de conservation">
              Cookie de session : durée de la session (ou 30 jours maximum si « rester connecté »).
              Cookies Stripe : selon la politique de Stripe (généralement 2 ans).
              Cookies Sentry : 1 an maximum.
            </Section>

            <Section title="5. Gestion des cookies">
              Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de
              votre navigateur. Attention : la désactivation des cookies strictement nécessaires
              peut empêcher le bon fonctionnement de la plateforme.
              {"\n\n"}
              <strong>Instructions par navigateur :</strong>
              {"\n"}Chrome : Paramètres → Confidentialité et sécurité → Cookies
              {"\n"}Firefox : Paramètres → Vie privée et sécurité → Cookies
              {"\n"}Safari : Préférences → Confidentialité → Cookies
              {"\n"}Edge : Paramètres → Cookies et autorisations de site
            </Section>

            <Section title="6. Contact">
              Pour toute question relative à notre utilisation des cookies :
              contact@rentiumpartners.fr
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl text-[var(--blanc-absolu)] mb-3 font-medium">{title}</h2>
      <p className="text-[var(--gris-plume)] leading-relaxed text-sm whitespace-pre-line">
        {children}
      </p>
    </div>
  );
}
