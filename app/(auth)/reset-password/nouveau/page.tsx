"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newPasswordSchema, type NewPasswordInput } from "@/lib/validations";

function NouveauMotDePasseForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
  });

  async function onSubmit(data: NewPasswordInput) {
    if (!token || !email) {
      setError("Lien invalide. Veuillez faire une nouvelle demande.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/new-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Une erreur est survenue.");
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!token || !email) {
    return (
      <div className="w-full max-w-md">
        <div className="glass-card p-8 lg:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--erreur)]/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} className="text-[var(--erreur)]" />
          </div>
          <h1
            className="text-2xl text-[var(--blanc-absolu)] mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Lien invalide
          </h1>
          <p className="text-[var(--gris-plume)] text-sm mb-6">
            Ce lien de réinitialisation est invalide ou a expiré.
          </p>
          <Link href="/reset-password">
            <Button variant="secondary" size="md">
              Nouvelle demande
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md">
        <div className="glass-card p-8 lg:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--succes)]/10 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-[var(--succes)]" />
          </div>
          <h1
            className="text-2xl text-[var(--blanc-absolu)] mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Mot de passe modifié
          </h1>
          <p className="text-[var(--gris-plume)] text-sm mb-6">
            Votre mot de passe a été modifié avec succès.
            Vous pouvez maintenant vous connecter.
          </p>
          <Link href="/connexion">
            <Button variant="primary" size="lg">
              Se connecter
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="glass-card p-8 lg:p-10">
        <div className="text-center mb-8">
          <h1
            className="text-3xl text-[var(--blanc-absolu)] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Nouveau mot de passe
          </h1>
          <p className="text-[var(--gris-plume)] text-sm">
            Choisissez un mot de passe robuste pour sécuriser votre compte
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-[var(--erreur)]/10 border border-[var(--erreur)]/20 text-[var(--erreur)] text-sm"
          >
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Nouveau mot de passe"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            error={errors.password?.message}
            autoComplete="new-password"
            {...register("password")}
          />

          <Input
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            Réinitialiser mon mot de passe
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/connexion"
            className="text-sm text-[var(--gris-plume)] hover:text-[var(--or-pur)] transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NouveauMotDePassePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Suspense fallback={
        <div className="w-full max-w-md">
          <div className="glass-card p-8 lg:p-10 text-center">
            <p className="text-[var(--gris-plume)]">Chargement...</p>
          </div>
        </div>
      }>
        <NouveauMotDePasseForm />
      </Suspense>
    </motion.div>
  );
}
