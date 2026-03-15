import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { TarifsPageContent } from "@/components/sections/tarifs-page";

export const metadata: Metadata = {
  title: "Tarifs — Formules transparentes",
  description:
    "Découvrez nos formules de gestion comptable et fiscale pour vos biens LMNP et SCI à l'IR. À partir de 20€/mois.",
};

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        <TarifsPageContent />
      </main>
      <Footer />
    </>
  );
}
