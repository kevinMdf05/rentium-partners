"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginInput } from "@/lib/validations";

export default function ConnexionPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
      setIsLoading(false);
      return;
    }

    router.push("/tableau-de-bord");
    router.refresh();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="glass-card p-8 lg:p-10">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl text-[var(--blanc-absolu)] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Bon retour
          </h1>
          <p className="text-[var(--gris-plume)] text-sm">
            Connectez-vous à votre espace Rentium Partners
          </p>
        </div>

        {/* Message d'erreur */}
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

        {/* Formulaire */}
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

          <div>
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              error={errors.password?.message}
              autoComplete="current-password"
              {...register("password")}
            />
            <div className="mt-2 text-right">
              <Link
                href="/reset-password"
                className="text-xs text-[var(--gris-plume)] hover:text-[var(--or-pur)] transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full group"
            isLoading={isLoading}
          >
            Se connecter
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </form>

        {/* Lien vers l'inscription */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-sm text-[var(--gris-plume)]">
            Pas encore de compte ?{" "}
            <Link
              href="/inscription"
              className="text-[var(--or-pur)] hover:text-[var(--or-brillant)] transition-colors font-medium"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>

      {/* Badge sécurité */}
      <div className="mt-6 text-center">
        <p className="text-xs text-[var(--gris-acier)] flex items-center justify-center gap-2">
          <Lock size={12} />
          Connexion sécurisée — Données chiffrées
        </p>
      </div>
    </motion.div>
  );
}
