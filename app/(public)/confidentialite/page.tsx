import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-24 pb-20">
        <div className="container-rentium max-w-3xl">
          <h1
            className="text-4xl mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Politique de confidentialité
          </h1>
          <p className="text-sm text-[var(--gris-acier)] mb-12">
            Dernière mise à jour : 1er mars 2026 — Conforme au RGPD (UE) 2016/679
          </p>

          <div className="space-y-8">
            <Section title="1. Responsable du traitement">
              Rentium Partners SAS est responsable du traitement de vos données personnelles.
              Délégué à la protection des données (DPO) : dpo@rentiumpartners.fr
            </Section>

            <Section title="2. Données collectées">
              Nous collectons les catégories de données suivantes :
              {"\n\n"}
              <strong>Données d&apos;identification :</strong> nom, prénom, adresse email,
              numéro de téléphone, date de naissance, adresse postale.
              {"\n\n"}
              <strong>Données financières :</strong> informations relatives à vos biens
              immobiliers, loyers, valeurs des biens. Les données de paiement (carte bancaire)
              sont traitées exclusivement par Stripe et ne sont jamais stockées par Rentium Partners.
              {"\n\n"}
              <strong>Données de connexion :</strong> adresse IP, agent utilisateur, date et heure
              de connexion, géolocalisation approximative.
              {"\n\n"}
              <strong>Documents :</strong> déclarations fiscales, bilans, contrats que vous
              déposez sur la plateforme.
            </Section>

            <Section title="3. Finalités du traitement">
              Vos données sont traitées pour les finalités suivantes :
              gestion de votre compte utilisateur, fourniture des services de gestion comptable
              et fiscale, traitement des paiements, communication relative à votre abonnement,
              amélioration de nos services, respect de nos obligations légales et fiscales,
              sécurité de la plateforme.
            </Section>

            <Section title="4. Base juridique">
              Le traitement de vos données repose sur : l&apos;exécution du contrat (fourniture des
              services), votre consentement (communications marketing), l&apos;intérêt légitime
              (sécurité, amélioration des services), et nos obligations légales (conservation
              des données comptables).
            </Section>

            <Section title="5. Destinataires des données">
              Vos données peuvent être transmises à : notre équipe interne (comptables, support),
              Stripe (traitement des paiements — certifié PCI DSS), Supabase (hébergement de base
              de données en Europe), Resend (envoi d&apos;emails transactionnels), Vercel (hébergement
              de l&apos;application). Aucune donnée n&apos;est vendue ou cédée à des tiers à des fins commerciales.
            </Section>

            <Section title="6. Durée de conservation">
              Données de compte : conservées pendant toute la durée de la relation contractuelle,
              puis 3 ans après la dernière activité. Données comptables : 10 ans (obligation légale).
              Logs de connexion : 90 jours, puis anonymisation. Documents déposés : conservés
              jusqu&apos;à suppression par l&apos;utilisateur ou 3 ans après la clôture du compte.
            </Section>

            <Section title="7. Vos droits">
              Conformément au RGPD, vous disposez des droits suivants :
              droit d&apos;accès à vos données, droit de rectification, droit à l&apos;effacement
              (« droit à l&apos;oubli »), droit à la portabilité (export JSON depuis vos paramètres),
              droit d&apos;opposition et de limitation du traitement, droit de retirer votre consentement.
              Pour exercer ces droits : dpo@rentiumpartners.fr.
              Vous pouvez également introduire une réclamation auprès de la CNIL.
            </Section>

            <Section title="8. Sécurité des données">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :
              chiffrement des données en transit (TLS 1.3) et au repos, hachage des mots de passe
              (bcrypt), authentification à deux facteurs disponible, hébergement en Europe
              (conformité RGPD), audits de sécurité réguliers, contrôle d&apos;accès basé sur les rôles.
            </Section>

            <Section title="9. Transferts internationaux">
              Vos données personnelles sont principalement hébergées au sein de l&apos;Union européenne.
              En cas de transfert vers un pays tiers (prestataires techniques), nous nous assurons
              que des garanties appropriées sont en place (clauses contractuelles types de la
              Commission européenne).
            </Section>

            <Section title="10. Modifications">
              Nous nous réservons le droit de modifier la présente politique à tout moment.
              En cas de modification substantielle, nous vous en informerons par email.
              La date de dernière mise à jour est indiquée en haut de cette page.
            </Section>

            <Section title="11. Contact">
              Pour toute question relative à cette politique de confidentialité :
              {"\n"}Email : dpo@rentiumpartners.fr
              {"\n"}Courrier : Rentium Partners — DPO, Paris, France
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
