"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Lock,
  Download,
  Trash2,
  Gift,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profileSchema, type ProfileInput } from "@/lib/validations";
import { formatDate } from "@/lib/utils";

interface UserData {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  twoFactorEnabled: boolean;
  codeParrainage: string;
  createdAt: string;
}

export function ParametresContent({ user }: { user: UserData }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      prenom: user.prenom,
      nom: user.nom,
      telephone: user.telephone,
      adresse: user.adresse,
      ville: user.ville,
      codePostal: user.codePostal,
    },
  });

  async function onSubmit(data: ProfileInput) {
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      }
    } finally {
      setIsSaving(false);
    }
  }

  function copyReferralCode() {
    navigator.clipboard.writeText(user.codeParrainage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1
          className="text-3xl text-[var(--blanc-absolu)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Paramètres
        </h1>
        <p className="text-[var(--gris-plume)] mt-1">
          Gérez votre profil et vos préférences
        </p>
      </div>

      {/* Informations personnelles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--or-pur)]/10 flex items-center justify-center">
            <User size={20} className="text-[var(--or-pur)]" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
              Informations personnelles
            </h2>
            <p className="text-xs text-[var(--gris-plume)]">
              Membre depuis le {formatDate(user.createdAt)}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              icon={<User size={18} />}
              error={errors.prenom?.message}
              {...register("prenom")}
            />
            <Input
              label="Nom"
              icon={<User size={18} />}
              error={errors.nom?.message}
              {...register("nom")}
            />
          </div>

          {/* Email non modifiable */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[var(--gris-plume)]">
              Email
            </label>
            <div className="flex h-11 w-full rounded-xl border border-[var(--bordure-subtile)] bg-[var(--noir-surface)] px-4 items-center text-sm text-[var(--gris-plume)]">
              <Mail size={18} className="text-[var(--gris-acier)] mr-2" />
              {user.email}
            </div>
            <p className="text-xs text-[var(--gris-acier)]">
              L&apos;email ne peut pas être modifié
            </p>
          </div>

          <Input
            label="Téléphone"
            icon={<Phone size={18} />}
            placeholder="06 12 34 56 78"
            error={errors.telephone?.message}
            {...register("telephone")}
          />

          <Input
            label="Adresse"
            icon={<MapPin size={18} />}
            error={errors.adresse?.message}
            {...register("adresse")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Ville"
              error={errors.ville?.message}
              {...register("ville")}
            />
            <Input
              label="Code postal"
              error={errors.codePostal?.message}
              {...register("codePostal")}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary" isLoading={isSaving}>
              {saved ? (
                <>
                  <Check size={16} />
                  Enregistré
                </>
              ) : (
                "Enregistrer les modifications"
              )}
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Sécurité */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--or-pur)]/10 flex items-center justify-center">
            <Shield size={20} className="text-[var(--or-pur)]" />
          </div>
          <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
            Sécurité
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)]">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-[var(--gris-plume)]" />
              <div>
                <p className="text-sm text-[var(--blanc-absolu)]">Mot de passe</p>
                <p className="text-xs text-[var(--gris-acier)]">
                  Changez votre mot de passe
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Modifier
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)]">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-[var(--gris-plume)]" />
              <div>
                <p className="text-sm text-[var(--blanc-absolu)]">
                  Double authentification (2FA)
                </p>
                <p className="text-xs text-[var(--gris-acier)]">
                  {user.twoFactorEnabled ? "Activée" : "Désactivée"} — Google
                  Authenticator
                </p>
              </div>
            </div>
            <Button
              variant={user.twoFactorEnabled ? "ghost" : "secondary"}
              size="sm"
            >
              {user.twoFactorEnabled ? "Désactiver" : "Activer"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Parrainage */}
      {user.codeParrainage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--or-pur)]/10 flex items-center justify-center">
              <Gift size={20} className="text-[var(--or-pur)]" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
                Parrainage
              </h2>
              <p className="text-xs text-[var(--gris-plume)]">
                Partagez votre code et obtenez 1 mois offert
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-11 px-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] flex items-center">
              <span
                className="text-sm font-medium text-[var(--or-pur)]"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {user.codeParrainage}
              </span>
            </div>
            <Button variant="secondary" size="sm" onClick={copyReferralCode}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copié" : "Copier"}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Zone dangereuse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-[var(--noir-card)] border border-[var(--erreur)]/20"
      >
        <h2 className="text-lg font-medium text-[var(--blanc-absolu)] mb-4">
          Zone dangereuse
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--blanc-absolu)]">
                Exporter mes données
              </p>
              <p className="text-xs text-[var(--gris-acier)]">
                Téléchargez toutes vos données au format JSON (RGPD)
              </p>
            </div>
            <Button variant="secondary" size="sm">
              <Download size={14} />
              Exporter
            </Button>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
            <div>
              <p className="text-sm text-[var(--erreur)]">
                Supprimer mon compte
              </p>
              <p className="text-xs text-[var(--gris-acier)]">
                Action irréversible — toutes vos données seront supprimées
              </p>
            </div>
            <Button variant="danger" size="sm">
              <Trash2 size={14} />
              Supprimer
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
