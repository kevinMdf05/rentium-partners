"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import type { InscriptionData } from "@/app/(auth)/inscription/page";

interface StepFormuleProps {
  data: InscriptionData;
  updateData: (partial: Partial<InscriptionData>) => void;
  onNext: () => void;
}

export function StepFormule({ data, updateData, onNext }: StepFormuleProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>(data.planType);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    data.billingPeriod
  );

  function handleSubmit() {
    updateData({
      planType: selectedPlan as InscriptionData["planType"],
      billingPeriod,
    });
    onNext();
  }

  const planEntries = Object.entries(PLANS) as [string, (typeof PLANS)[keyof typeof PLANS]][];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2
          className="text-2xl text-[var(--blanc-absolu)] mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Votre formule
        </h2>
        <p className="text-sm text-[var(--gris-plume)]">
          Choisissez la formule adaptée à votre patrimoine
        </p>
      </div>

      {/* Toggle mensuel/annuel */}
      <div className="flex items-center justify-center gap-3 p-1 bg-[var(--noir-surface)] rounded-xl w-fit mx-auto">
        <button
          type="button"
          onClick={() => setBillingPeriod("monthly")}
          className={cn(
            "px-5 py-2 rounded-lg text-sm font-medium transition-all",
            billingPeriod === "monthly"
              ? "bg-[var(--or-pur)] text-[var(--noir-absolu)]"
              : "text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)]"
          )}
        >
          Mensuel
        </button>
        <button
          type="button"
          onClick={() => setBillingPeriod("yearly")}
          className={cn(
            "px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
            billingPeriod === "yearly"
              ? "bg-[var(--or-pur)] text-[var(--noir-absolu)]"
              : "text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)]"
          )}
        >
          Annuel
          <span className="text-xs bg-[var(--succes)] text-white px-2 py-0.5 rounded-full">
            -2 mois
          </span>
        </button>
      </div>

      {/* Grille des plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {planEntries.map(([key, plan]) => {
          const isSelected = selectedPlan === key;
          const price =
            billingPeriod === "monthly"
              ? plan.prix
              : Math.round(plan.prixAnnuel / 12);

          return (
            <motion.button
              key={key}
              type="button"
              onClick={() => setSelectedPlan(key)}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative text-left p-5 rounded-2xl border transition-all duration-300",
                isSelected
                  ? "border-[var(--or-pur)] bg-[var(--or-pur)]/5 shadow-[0_0_30px_rgba(200,169,110,0.15)]"
                  : "border-white/[0.06] bg-[var(--noir-card)] hover:border-white/[0.12]"
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-4 px-3 py-1 bg-[var(--or-pur)] text-[var(--noir-absolu)] text-xs font-semibold rounded-full flex items-center gap-1">
                  {plan.badge === "Populaire" ? <Star size={12} /> : <Gem size={12} />}
                  {plan.badge}
                </span>
              )}

              {/* Check sélection */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[var(--or-pur)] flex items-center justify-center">
                  <Check size={14} className="text-[var(--noir-absolu)]" />
                </div>
              )}

              <h3 className="text-lg font-medium text-[var(--blanc-absolu)] mb-1">
                {plan.nom}
              </h3>
              <p className="text-xs text-[var(--gris-plume)] mb-4">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className="text-3xl font-bold text-[var(--blanc-absolu)]"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  {price}€
                </span>
                <span className="text-sm text-[var(--gris-plume)]">/mois</span>
              </div>

              <ul className="space-y-2">
                {plan.features.slice(0, 4).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-[var(--gris-plume)]"
                  >
                    <Check size={12} className="text-[var(--or-pur)] shrink-0" />
                    {feature}
                  </li>
                ))}
                {plan.features.length > 4 && (
                  <li className="text-xs text-[var(--or-pur)]">
                    +{plan.features.length - 4} avantages
                  </li>
                )}
              </ul>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="group"
          onClick={handleSubmit}
        >
          Continuer
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </div>
    </div>
  );
}
