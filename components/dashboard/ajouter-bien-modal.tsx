"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { propertySchema } from "@/lib/validations";
import type { z } from "zod";

type PropertyFormInput = z.input<typeof propertySchema>;

interface AjouterBienModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TYPES_BIEN = [
  { value: "APPARTEMENT", label: "Appartement" },
  { value: "MAISON", label: "Maison" },
  { value: "STUDIO", label: "Studio" },
  { value: "PARKING", label: "Parking" },
  { value: "COMMERCE", label: "Commerce" },
];

const REGIMES = [
  { value: "LMNP", label: "LMNP — Location Meublée Non Professionnelle" },
  { value: "SCI_IR", label: "SCI à l'IR — Société Civile Immobilière" },
];

export function AjouterBienModal({ isOpen, onClose }: AjouterBienModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      typeBien: "APPARTEMENT",
      regimeFiscal: "LMNP",
      meuble: true,
    },
  });

  async function onSubmit(data: PropertyFormInput) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset();
        onClose();
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] shadow-2xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--or-pur)]/10 flex items-center justify-center">
                    <Building2 size={20} className="text-[var(--or-pur)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
                      Ajouter un bien
                    </h2>
                    <p className="text-xs text-[var(--gris-plume)]">
                      Renseignez les informations de votre bien immobilier
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] hover:bg-white/[0.06] transition-all"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                {/* Type de bien */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--gris-plume)]">
                    Type de bien
                  </label>
                  <select
                    className="w-full h-11 px-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] text-sm text-[var(--blanc-absolu)] focus:outline-none focus:border-[var(--or-pur)] transition-all"
                    {...register("typeBien")}
                  >
                    {TYPES_BIEN.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {errors.typeBien && (
                    <p className="text-xs text-[var(--erreur)]">{errors.typeBien.message}</p>
                  )}
                </div>

                {/* Régime fiscal */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--gris-plume)]">
                    Régime fiscal
                  </label>
                  <select
                    className="w-full h-11 px-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] text-sm text-[var(--blanc-absolu)] focus:outline-none focus:border-[var(--or-pur)] transition-all"
                    {...register("regimeFiscal")}
                  >
                    {REGIMES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Nom du bien (optionnel)"
                  placeholder="Mon appartement parisien"
                  icon={<Building2 size={18} />}
                  error={errors.nom?.message}
                  {...register("nom")}
                />

                <Input
                  label="Adresse"
                  placeholder="12 rue de la Paix"
                  icon={<MapPin size={18} />}
                  error={errors.adresse?.message}
                  {...register("adresse")}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ville"
                    placeholder="Paris"
                    error={errors.ville?.message}
                    {...register("ville")}
                  />
                  <Input
                    label="Code postal"
                    placeholder="75001"
                    error={errors.codePostal?.message}
                    {...register("codePostal")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Valeur du bien (€)"
                    type="number"
                    placeholder="250000"
                    error={errors.valeurBien?.message}
                    {...register("valeurBien")}
                  />
                  <Input
                    label="Loyer mensuel (€)"
                    type="number"
                    placeholder="1200"
                    error={errors.loyerMensuel?.message}
                    {...register("loyerMensuel")}
                  />
                </div>

                <Input
                  label="Date d'achat"
                  type="date"
                  error={errors.dateAchat?.message}
                  {...register("dateAchat")}
                />

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={onClose}>
                    Annuler
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isLoading}>
                    Ajouter le bien
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
