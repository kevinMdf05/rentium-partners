import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-24 pb-20">
        <div className="container-rentium max-w-3xl">
          <h1
            className="text-4xl mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Mentions légales
          </h1>
          <p className="text-sm text-[var(--gris-acier)] mb-12">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance
            dans l&apos;économie numérique.
          </p>

          <div className="space-y-8">
            <Section title="Éditeur du site">
              <strong>Rentium Partners SAS</strong>
              <br />
              Capital social : 10 000€
              <br />
              Siège social : Paris, France
              <br />
              RCS Paris B XXX XXX XXX
              <br />
              SIRET : XXX XXX XXX XXXXX
              <br />
              N° TVA intracommunautaire : FR XX XXX XXX XXX
              <br />
              Email : contact@rentiumpartners.fr
              <br />
              Téléphone : 01 76 34 00 00
              <br />
              Directeur de la publication : [Nom du directeur]
            </Section>

            <Section title="Hébergeur">
              <strong>Vercel Inc.</strong>
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              <br />
              Infrastructure de données : Supabase (hébergement PostgreSQL en Europe)
              <br />
              Les données personnelles sont hébergées au sein de l&apos;Union européenne,
              conformément au RGPD.
            </Section>

            <Section title="Propriété intellectuelle">
              L&apos;ensemble du contenu du site rentiumpartners.fr (textes, images, graphismes,
              logos, icônes, logiciels) est la propriété exclusive de Rentium Partners SAS,
              sauf mention contraire. Toute reproduction, représentation, modification,
              publication ou adaptation, totale ou partielle, est interdite sans l&apos;autorisation
              préalable écrite de Rentium Partners SAS.
            </Section>

            <Section title="Données personnelles">
              Les informations recueillies font l&apos;objet d&apos;un traitement informatique destiné
              à la gestion des comptes clients et à la fourniture de nos services. Conformément au
              RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de
              portabilité de vos données. Pour exercer ces droits, contactez-nous à
              dpo@rentiumpartners.fr.
            </Section>

            <Section title="Cookies">
              Le site utilise des cookies techniques nécessaires à son fonctionnement.
              Pour plus d&apos;informations, consultez notre politique de cookies.
            </Section>

            <Section title="Limitation de responsabilité">
              Rentium Partners s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées
              sur le site, mais ne saurait garantir l&apos;exactitude, la complétude ou
              l&apos;actualité des informations diffusées. L&apos;utilisation de ces informations
              se fait sous la seule responsabilité de l&apos;utilisateur.
            </Section>

            <Section title="Droit applicable">
              Les présentes mentions légales sont soumises au droit français.
              En cas de litige, et après tentative de résolution amiable,
              compétence est attribuée aux tribunaux de Paris.
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
      <div className="text-[var(--gris-plume)] leading-relaxed text-sm">{children}</div>
    </div>
  );
}
