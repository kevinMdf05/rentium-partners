"use client";

import { Shield, CreditCard, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS, type PlanKey } from "@/lib/stripe";
import type { InscriptionData } from "@/app/(auth)/inscription/page";

interface StepPaiementProps {
  data: InscriptionData;
  isLoading: boolean;
  onSubmit: () => void;
}

export function StepPaiement({ data, isLoading, onSubmit }: StepPaiementProps) {
  const plan = PLANS[data.planType as PlanKey];
  const price =
    data.billingPeriod === "monthly"
      ? plan.prix
      : plan.prixAnnuel;
  const periodLabel =
    data.billingPeriod === "monthly" ? "/mois" : "/an";

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2
          className="text-2xl text-[var(--blanc-absolu)] mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Récapitulatif
        </h2>
        <p className="text-sm text-[var(--gris-plume)]">
          Vérifiez vos informations avant de finaliser votre inscription
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="space-y-4">
        {/* Infos personnelles */}
        <div className="p-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)]">
          <h3 className="text-sm font-medium text-[var(--blanc-absolu)] mb-3">
            Informations personnelles
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-[var(--gris-acier)]">Nom : </span>
              <span className="text-[var(--blanc-casse)]">
                {data.prenom} {data.nom}
              </span>
            </div>
            <div>
              <span className="text-[var(--gris-acier)]">Email : </span>
              <span className="text-[var(--blanc-casse)]">{data.email}</span>
            </div>
            {data.telephone && (
              <div>
                <span className="text-[var(--gris-acier)]">Tél : </span>
                <span className="text-[var(--blanc-casse)]">{data.telephone}</span>
              </div>
            )}
            {data.ville && (
              <div>
                <span className="text-[var(--gris-acier)]">Ville : </span>
                <span className="text-[var(--blanc-casse)]">
                  {data.codePostal} {data.ville}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Formule choisie */}
        <div className="p-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--or-pur)]/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[var(--blanc-absolu)]">
              Formule sélectionnée
            </h3>
            <div className="flex items-baseline gap-1">
              <span
                className="text-2xl font-bold text-[var(--or-pur)]"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {price}€
              </span>
              <span className="text-sm text-[var(--gris-plume)]">{periodLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[var(--blanc-casse)] font-medium">{plan.nom}</span>
            {plan.badge && (
              <span className="text-xs bg-[var(--or-pur)]/20 text-[var(--or-pur)] px-2 py-0.5 rounded-full">
                {plan.badge}
              </span>
            )}
          </div>
          <ul className="space-y-1.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[var(--gris-plume)]">
                <Check size={12} className="text-[var(--or-pur)] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Sécurité */}
        <div className="flex items-center gap-2 text-xs text-[var(--gris-plume)]">
          <Shield size={14} className="text-[var(--or-pur)]" />
          Double authentification : {data.twoFactorEnabled ? "Activée" : "Désactivée"}
        </div>
      </div>

      {/* Bouton de soumission */}
      <div className="space-y-4 pt-4">
        <Button
          type="button"
          variant="primary"
          size="xl"
          className="w-full group"
          isLoading={isLoading}
          onClick={onSubmit}
        >
          <CreditCard size={18} />
          Créer mon compte
        </Button>

        <p className="text-center text-xs text-[var(--gris-acier)]">
          Le paiement sera configuré après la création de votre compte.
          <br />
          Sans engagement — Résiliable à tout moment.
        </p>

        {/* Badges de confiance */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-1 text-xs text-[var(--gris-acier)]">
            <Lock size={12} />
            SSL/TLS
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--gris-acier)]">
            <Shield size={12} />
            RGPD
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--gris-acier)]">
            <CreditCard size={12} />
            Stripe
          </div>
        </div>
      </div>
    </div>
  );
}
