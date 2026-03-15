"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations";

export default function ResetPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordInput) {
    setIsLoading(true);
    try {
      await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email.toLowerCase() }),
      });
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 lg:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--succes)]/10 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-[var(--succes)]" />
          </div>
          <h1
            className="text-2xl text-[var(--blanc-absolu)] mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Email envoyé
          </h1>
          <p className="text-[var(--gris-plume)] text-sm mb-6">
            Si un compte est associé à cette adresse, vous recevrez
            un lien de réinitialisation dans quelques instants.
          </p>
          <Link href="/connexion">
            <Button variant="secondary" size="md">
              <ArrowLeft size={16} />
              Retour à la connexion
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="glass-card p-8 lg:p-10">
        <div className="text-center mb-8">
          <h1
            className="text-3xl text-[var(--blanc-absolu)] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Mot de passe oublié
          </h1>
          <p className="text-[var(--gris-plume)] text-sm">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Adresse email"
            type="email"
            placeholder="vous@exemple.com"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            autoComplete="email"
            {...register("email")}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            Envoyer le lien
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
    </motion.div>
  );
}
