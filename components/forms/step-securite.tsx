"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Shield, ArrowRight, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerStep2Schema } from "@/lib/validations";
import type { z } from "zod";

type Step2FormInput = z.input<typeof registerStep2Schema>;
import type { InscriptionData } from "@/app/(auth)/inscription/page";

interface StepSecuriteProps {
  data: InscriptionData;
  updateData: (partial: Partial<InscriptionData>) => void;
  onNext: () => void;
}

function PasswordCriteria({ password }: { password: string }) {
  const criteria = [
    { label: "8 caractères minimum", met: password.length >= 8 },
    { label: "Une majuscule", met: /[A-Z]/.test(password) },
    { label: "Un chiffre", met: /[0-9]/.test(password) },
    { label: "Un caractère spécial", met: /[^a-zA-Z0-9]/.test(password) },
  ];

  const strength = criteria.filter((c) => c.met).length;
  const strengthLabel =
    strength === 0
      ? ""
      : strength <= 2
        ? "Faible"
        : strength === 3
          ? "Moyen"
          : "Fort";
  const strengthColor =
    strength <= 2
      ? "var(--erreur)"
      : strength === 3
        ? "var(--warning)"
        : "var(--succes)";

  return (
    <div className="space-y-3 mt-3">
      {/* Barre de robustesse */}
      {password.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--gris-plume)]">Robustesse</span>
            <span className="text-xs font-medium" style={{ color: strengthColor }}>
              {strengthLabel}
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor:
                    level <= strength ? strengthColor : "var(--bordure-subtile)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Liste des critères */}
      <div className="grid grid-cols-2 gap-1.5">
        {criteria.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            {c.met ? (
              <Check size={12} className="text-[var(--succes)]" />
            ) : (
              <X size={12} className="text-[var(--gris-acier)]" />
            )}
            <span
              className={`text-xs ${
                c.met ? "text-[var(--succes)]" : "text-[var(--gris-acier)]"
              }`}
            >
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StepSecurite({ data, updateData, onNext }: StepSecuriteProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step2FormInput>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      password: data.password,
      confirmPassword: data.confirmPassword,
      twoFactorEnabled: data.twoFactorEnabled,
      acceptCgu: data.acceptCgu,
      acceptPrivacy: data.acceptPrivacy,
    },
  });

  const password = watch("password", "");

  function onSubmit(values: Step2FormInput) {
    updateData(values);
    onNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-6">
        <h2
          className="text-2xl text-[var(--blanc-absolu)] mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Sécurité du compte
        </h2>
        <p className="text-sm text-[var(--gris-plume)]">
          Choisissez un mot de passe robuste pour protéger votre espace
        </p>
      </div>

      <div>
        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          autoComplete="new-password"
          {...register("password")}
        />
        <PasswordCriteria password={password} />
      </div>

      <Input
        label="Confirmer le mot de passe"
        type="password"
        placeholder="••••••••"
        icon={<Lock size={18} />}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        {...register("confirmPassword")}
      />

      {/* Option 2FA */}
      <label className="flex items-start gap-3 p-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] cursor-pointer hover:border-[var(--or-pur)]/30 transition-colors">
        <input
          type="checkbox"
          className="mt-0.5 w-4 h-4 rounded accent-[var(--or-pur)]"
          {...register("twoFactorEnabled")}
        />
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--blanc-absolu)] font-medium">
            <Shield size={16} className="text-[var(--or-pur)]" />
            Activer la double authentification
          </div>
          <p className="text-xs text-[var(--gris-plume)] mt-1">
            Recommandé pour renforcer la sécurité de votre compte
          </p>
        </div>
      </label>

      {/* CGU et Politique de confidentialité */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-[var(--or-pur)]"
            {...register("acceptCgu")}
          />
          <span className="text-sm text-[var(--gris-plume)]">
            J&apos;accepte les{" "}
            <a href="#" className="text-[var(--or-pur)] hover:underline">
              conditions générales d&apos;utilisation
            </a>
          </span>
        </label>
        {errors.acceptCgu && (
          <p className="text-xs text-[var(--erreur)] ml-7">
            {errors.acceptCgu.message}
          </p>
        )}

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-[var(--or-pur)]"
            {...register("acceptPrivacy")}
          />
          <span className="text-sm text-[var(--gris-plume)]">
            J&apos;ai lu et j&apos;accepte la{" "}
            <a href="#" className="text-[var(--or-pur)] hover:underline">
              politique de confidentialité
            </a>
          </span>
        </label>
        {errors.acceptPrivacy && (
          <p className="text-xs text-[var(--erreur)] ml-7">
            {errors.acceptPrivacy.message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" size="lg" className="group">
          Continuer
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </div>
    </form>
  );
}
