"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    question: "Quelle est la différence entre LMNP et SCI à l'IR ?",
    answer:
      "Le LMNP (Loueur Meublé Non Professionnel) est un statut fiscal pour les particuliers qui louent un bien meublé. La SCI à l'IR (Société Civile Immobilière à l'Impôt sur le Revenu) est une structure juridique permettant de détenir un patrimoine immobilier à plusieurs. Les deux offrent des avantages fiscaux distincts selon votre situation.",
  },
  {
    question: "Comment sont sécurisées mes données ?",
    answer:
      "Vos données sont hébergées en France sur des serveurs certifiés. Nous utilisons le chiffrement AES-256 pour le stockage, TLS 1.3 pour les communications, l'authentification à deux facteurs, et nous sommes entièrement conformes au RGPD. Aucune donnée n'est partagée avec des tiers.",
  },
  {
    question: "Puis-je changer de formule à tout moment ?",
    answer:
      "Oui, vous pouvez upgrader ou downgrader votre formule à tout moment depuis votre espace client. Le changement prend effet immédiatement et le prorata est calculé automatiquement.",
  },
  {
    question: "Que se passe-t-il si j'ai plus de 2 biens ?",
    answer:
      "Pour les patrimoines de plus de 2 biens, nous proposons des formules sur mesure adaptées à votre situation. Contactez-nous pour un devis personnalisé — notre équipe vous répondra sous 24h.",
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer:
      "Le paiement est géré de manière sécurisée via Stripe. Nous acceptons les cartes Visa, Mastercard et American Express. Vos informations bancaires ne transitent jamais par nos serveurs.",
  },
  {
    question: "Puis-je résilier à tout moment ?",
    answer:
      "Absolument. Aucun engagement minimum. Vous pouvez résilier votre abonnement en un clic depuis votre espace client. Votre accès reste actif jusqu'à la fin de la période payée.",
  },
  {
    question: "Mes documents sont-ils accessibles à vie ?",
    answer:
      "Tant que votre abonnement est actif, vous avez un accès illimité à tous vos documents. En cas de résiliation, vous disposez de 90 jours pour télécharger l'ensemble de vos données.",
  },
  {
    question: "Avez-vous un expert-comptable certifié ?",
    answer:
      "Oui, notre équipe est composée d'experts-comptables inscrits à l'Ordre des Experts-Comptables, spécialisés en fiscalité immobilière. Chaque dossier est supervisé par un professionnel qualifié.",
  },
  {
    question: "Quels documents dois-je fournir ?",
    answer:
      "Pour démarrer, nous avons besoin de vos actes d'achat, baux locatifs, et derniers avis d'imposition. Notre interface vous guide pas à pas pour un onboarding sans friction.",
  },
  {
    question: "Y a-t-il une période d'essai ?",
    answer:
      "Nous ne proposons pas d'essai gratuit, mais nous offrons une garantie satisfait ou remboursé de 30 jours. Si notre service ne vous convient pas, vous êtes intégralement remboursé, sans condition.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.04] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-base lg:text-lg transition-colors duration-300",
            isOpen ? "text-[var(--or-pur)]" : "text-[var(--blanc-casse)] group-hover:text-[var(--or-pur)]"
          )}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {question}
        </span>
        <ChevronDown
          size={20}
          className={cn(
            "shrink-0 text-[var(--gris-acier)] transition-transform duration-300",
            isOpen && "rotate-180 text-[var(--or-pur)]"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[var(--gris-plume)] leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding">
      <div className="container-rentium max-w-3xl">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm text-[var(--or-pur)] uppercase tracking-widest mb-4">
            Questions fréquentes
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)" }}>
            Tout ce que vous devez{" "}
            <span className="text-gradient-or">savoir</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card p-6 lg:p-8">
            {FAQ_ITEMS.map(({ question, answer }, i) => (
              <FaqItem
                key={i}
                question={question}
                answer={answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
