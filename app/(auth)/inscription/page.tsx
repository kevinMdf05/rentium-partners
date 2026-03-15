"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepInfos } from "@/components/forms/step-infos";
import { StepSecurite } from "@/components/forms/step-securite";
import { StepFormule } from "@/components/forms/step-formule";
import { StepPaiement } from "@/components/forms/step-paiement";

const STEPS = [
  { label: "Informations", icon: "1" },
  { label: "Sécurité", icon: "2" },
  { label: "Formule", icon: "3" },
  { label: "Paiement", icon: "4" },
];

export interface InscriptionData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  adresse: string;
  ville: string;
  codePostal: string;
  password: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  acceptCgu: boolean;
  acceptPrivacy: boolean;
  planType: "LMNP_1" | "LMNP_2" | "SCI_IR_1" | "SCI_IR_2";
  billingPeriod: "monthly" | "yearly";
}

export default function InscriptionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<InscriptionData>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    adresse: "",
    ville: "",
    codePostal: "",
    password: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    acceptCgu: false,
    acceptPrivacy: false,
    planType: "LMNP_1",
    billingPeriod: "monthly",
  });

  function updateData(partial: Partial<InscriptionData>) {
    setFormData((prev) => ({ ...prev, ...partial }));
  }

  function nextStep() {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      setError("");
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setError("");
    }
  }

  async function handleFinalSubmit() {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email.toLowerCase(),
          telephone: formData.telephone || undefined,
          dateNaissance: formData.dateNaissance || undefined,
          adresse: formData.adresse || undefined,
          ville: formData.ville || undefined,
          codePostal: formData.codePostal || undefined,
          password: formData.password,
          planType: formData.planType,
          billingPeriod: formData.billingPeriod,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Une erreur est survenue.");
        return;
      }

      router.push("/connexion?registered=true");
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl"
    >
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-400 ${
                    i < currentStep
                      ? "bg-[var(--or-pur)] text-[var(--noir-absolu)]"
                      : i === currentStep
                        ? "bg-[var(--or-pur)]/20 text-[var(--or-pur)] border-2 border-[var(--or-pur)]"
                        : "bg-[var(--noir-card)] text-[var(--gris-acier)] border border-[var(--bordure-subtile)]"
                  }`}
                >
                  {i < currentStep ? <Check size={18} /> : step.icon}
                </div>
                <span
                  className={`text-xs mt-2 hidden sm:block transition-colors ${
                    i <= currentStep
                      ? "text-[var(--or-pur)]"
                      : "text-[var(--gris-acier)]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-12 sm:w-20 lg:w-28 h-px mx-2 transition-colors duration-400 ${
                    i < currentStep
                      ? "bg-[var(--or-pur)]"
                      : "bg-[var(--bordure-subtile)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        {/* Barre de progression linéaire */}
        <div className="w-full h-1 bg-[var(--noir-card)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--or-pur)] to-[var(--or-brillant)] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Contenu des étapes */}
      <div className="glass-card p-6 lg:p-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-[var(--erreur)]/10 border border-[var(--erreur)]/20 text-[var(--erreur)] text-sm"
          >
            <Shield size={16} className="shrink-0" />
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <StepInfos data={formData} updateData={updateData} onNext={nextStep} />
            )}
            {currentStep === 1 && (
              <StepSecurite data={formData} updateData={updateData} onNext={nextStep} />
            )}
            {currentStep === 2 && (
              <StepFormule data={formData} updateData={updateData} onNext={nextStep} />
            )}
            {currentStep === 3 && (
              <StepPaiement
                data={formData}
                isLoading={isLoading}
                onSubmit={handleFinalSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={currentStep === 0 ? "invisible" : ""}
          >
            <ArrowLeft size={16} />
            Précédent
          </Button>
          <span className="text-xs text-[var(--gris-acier)]">
            Étape {currentStep + 1} sur {STEPS.length}
          </span>
          {currentStep < STEPS.length - 1 ? (
            <div />
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Badge sécurité */}
      <div className="mt-6 text-center">
        <p className="text-xs text-[var(--gris-acier)] flex items-center justify-center gap-2">
          <Lock size={12} />
          Inscription sécurisée — Données chiffrées SSL/TLS
        </p>
      </div>
    </motion.div>
  );
}
