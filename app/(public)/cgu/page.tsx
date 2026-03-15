import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
};

export default function CguPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-24 pb-20">
        <div className="container-rentium max-w-3xl">
          <h1
            className="text-4xl mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="text-sm text-[var(--gris-acier)] mb-12">
            Dernière mise à jour : 1er mars 2026
          </p>

          <div className="prose-rentium space-y-8">
            <Section title="1. Objet">
              Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») ont pour objet
              de définir les conditions d&apos;accès et d&apos;utilisation de la plateforme Rentium Partners
              (ci-après « la Plateforme »), éditée par la société Rentium Partners SAS.
            </Section>

            <Section title="2. Acceptation des CGU">
              L&apos;utilisation de la Plateforme implique l&apos;acceptation pleine et entière des présentes CGU.
              En créant un compte, l&apos;Utilisateur reconnaît avoir pris connaissance des présentes CGU
              et les accepter sans réserve.
            </Section>

            <Section title="3. Description des services">
              Rentium Partners propose une plateforme de gestion comptable et fiscale immobilière
              destinée aux investisseurs en LMNP (Location Meublée Non Professionnelle) et SCI à l&apos;IR
              (Société Civile Immobilière à l&apos;Impôt sur le Revenu). Les services comprennent notamment :
              le suivi comptable, la préparation des déclarations fiscales, le stockage sécurisé de documents,
              et un tableau de bord de suivi en temps réel.
            </Section>

            <Section title="4. Inscription et compte utilisateur">
              Pour accéder aux services, l&apos;Utilisateur doit créer un compte en fournissant des informations
              exactes et à jour. L&apos;Utilisateur est responsable de la confidentialité de ses identifiants
              de connexion et de toute activité effectuée depuis son compte. Tout accès non autorisé doit
              être signalé immédiatement à Rentium Partners.
            </Section>

            <Section title="5. Abonnements et tarification">
              Les services sont proposés sous forme d&apos;abonnements mensuels ou annuels. Les tarifs en vigueur
              sont affichés sur la page Tarifs de la Plateforme. Rentium Partners se réserve le droit de
              modifier ses tarifs, avec un préavis de 30 jours. Les abonnements sont résiliables à tout moment,
              la résiliation prenant effet à la fin de la période en cours.
            </Section>

            <Section title="6. Paiements">
              Les paiements sont traités par Stripe, prestataire certifié PCI DSS. Aucune donnée bancaire
              n&apos;est stockée par Rentium Partners. En cas d&apos;échec de paiement, l&apos;accès aux services sera
              maintenu pendant 7 jours, après quoi le compte sera suspendu jusqu&apos;à régularisation.
            </Section>

            <Section title="7. Protection des données">
              Rentium Partners s&apos;engage à protéger les données personnelles de ses Utilisateurs
              conformément au Règlement Général sur la Protection des Données (RGPD). Pour plus de détails,
              consultez notre Politique de Confidentialité.
            </Section>

            <Section title="8. Responsabilité">
              Rentium Partners met tout en œuvre pour assurer la fiabilité de ses services, mais ne saurait
              être tenue responsable des erreurs résultant d&apos;informations inexactes fournies par l&apos;Utilisateur.
              Les conseils fiscaux fournis ne se substituent pas à l&apos;avis d&apos;un expert-comptable ou d&apos;un
              conseiller fiscal agréé.
            </Section>

            <Section title="9. Propriété intellectuelle">
              L&apos;ensemble des contenus de la Plateforme (textes, graphismes, logos, logiciels) sont la
              propriété exclusive de Rentium Partners et sont protégés par le droit de la propriété intellectuelle.
              Toute reproduction sans autorisation préalable est interdite.
            </Section>

            <Section title="10. Résiliation">
              L&apos;Utilisateur peut résilier son compte à tout moment depuis les paramètres de son espace client.
              Rentium Partners se réserve le droit de suspendre ou résilier un compte en cas de violation des
              présentes CGU, après notification par email.
            </Section>

            <Section title="11. Droit applicable">
              Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux tribunaux
              compétents de Paris, sauf disposition légale contraire.
            </Section>

            <Section title="12. Contact">
              Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l&apos;adresse :
              contact@rentiumpartners.fr ou par courrier à Rentium Partners, Paris, France.
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
      <p className="text-[var(--gris-plume)] leading-relaxed text-sm">{children}</p>
    </div>
  );
}
