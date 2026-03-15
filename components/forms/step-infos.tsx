"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerStep1Schema, type RegisterStep1Input } from "@/lib/validations";
import type { InscriptionData } from "@/app/(auth)/inscription/page";

interface StepInfosProps {
  data: InscriptionData;
  updateData: (partial: Partial<InscriptionData>) => void;
  onNext: () => void;
}

export function StepInfos({ data, updateData, onNext }: StepInfosProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterStep1Input>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
      dateNaissance: data.dateNaissance,
      adresse: data.adresse,
      ville: data.ville,
      codePostal: data.codePostal,
    },
  });

  function onSubmit(values: RegisterStep1Input) {
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
          Vos informations
        </h2>
        <p className="text-sm text-[var(--gris-plume)]">
          Commencez par renseigner vos coordonnées
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Prénom"
          placeholder="Jean"
          icon={<User size={18} />}
          error={errors.prenom?.message}
          {...register("prenom")}
        />
        <Input
          label="Nom"
          placeholder="Dupont"
          icon={<User size={18} />}
          error={errors.nom?.message}
          {...register("nom")}
        />
      </div>

      <Input
        label="Adresse email"
        type="email"
        placeholder="vous@exemple.com"
        icon={<Mail size={18} />}
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Téléphone"
          placeholder="06 12 34 56 78"
          icon={<Phone size={18} />}
          error={errors.telephone?.message}
          {...register("telephone")}
        />
        <Input
          label="Date de naissance"
          type="date"
          icon={<Calendar size={18} />}
          error={errors.dateNaissance?.message}
          {...register("dateNaissance")}
        />
      </div>

      <Input
        label="Adresse"
        placeholder="12 rue de la Paix"
        icon={<MapPin size={18} />}
        error={errors.adresse?.message}
        {...register("adresse")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
