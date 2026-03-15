import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Chiffres } from "@/components/sections/chiffres";
import { Services } from "@/components/sections/services";
import { Fonctionnement } from "@/components/sections/fonctionnement";
import { Avantages } from "@/components/sections/avantages";
import { Tarifs } from "@/components/sections/tarifs";
import { Temoignages } from "@/components/sections/temoignages";
import { Faq } from "@/components/sections/faq";
import { CtaFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Chiffres />
        <Services />
        <Fonctionnement />
        <Avantages />
        <Tarifs />
        <Temoignages />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
