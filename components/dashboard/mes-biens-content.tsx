"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Plus,
  MapPin,
  FileText,
  Euro,
  Home,
  Store,
  Car,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatEuros } from "@/lib/utils";
import { AjouterBienModal } from "@/components/dashboard/ajouter-bien-modal";

interface Property {
  id: string;
  typeBien: string;
  nom: string | null;
  adresse: string;
  ville: string;
  codePostal: string;
  regimeFiscal: string;
  valeurBien: number | null;
  loyerMensuel: number | null;
  dateAchat: string | null;
  documentsCount: number;
}

const TYPE_ICONS: Record<string, typeof Building2> = {
  APPARTEMENT: Building2,
  MAISON: Home,
  STUDIO: Building2,
  PARKING: Car,
  COMMERCE: Store,
};

const TYPE_LABELS: Record<string, string> = {
  APPARTEMENT: "Appartement",
  MAISON: "Maison",
  STUDIO: "Studio",
  PARKING: "Parking",
  COMMERCE: "Commerce",
};

export function MesBiensContent({ properties }: { properties: Property[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl text-[var(--blanc-absolu)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Mes biens
          </h1>
          <p className="text-[var(--gris-plume)] mt-1">
            {properties.length} bien{properties.length !== 1 ? "s" : ""} immobilier
            {properties.length !== 1 ? "s" : ""} en gestion
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Ajouter un bien
        </Button>
      </div>

      {/* Liste des biens */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 text-center rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]"
        >
          <Building2 size={48} className="text-[var(--gris-acier)] mx-auto mb-4" />
          <h2 className="text-xl text-[var(--blanc-absolu)] mb-2">
            Aucun bien enregistré
          </h2>
          <p className="text-sm text-[var(--gris-plume)] mb-6 max-w-md mx-auto">
            Commencez par ajouter votre premier bien immobilier pour bénéficier
            de notre gestion comptable et fiscale.
          </p>
          <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            Ajouter mon premier bien
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {properties.map((property, i) => {
            const Icon = TYPE_ICONS[property.typeBien] || Building2;

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] hover:border-[var(--or-pur)]/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--or-pur)]/10 flex items-center justify-center">
                      <Icon size={20} className="text-[var(--or-pur)]" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-[var(--blanc-absolu)]">
                        {property.nom || TYPE_LABELS[property.typeBien]}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[var(--gris-plume)]">
                        <MapPin size={12} />
                        {property.ville} ({property.codePostal})
                      </div>
                    </div>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--gris-acier)] hover:text-[var(--blanc-absolu)] hover:bg-white/[0.06] transition-all opacity-0 group-hover:opacity-100">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <p className="text-xs text-[var(--gris-plume)] mb-4 truncate">
                  {property.adresse}
                </p>

                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <Badge variant={property.regimeFiscal === "LMNP" ? "default" : "premium"}>
                    {property.regimeFiscal}
                  </Badge>
                  <Badge variant="outline">
                    {TYPE_LABELS[property.typeBien]}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.04]">
                  {property.valeurBien && (
                    <div>
                      <p className="text-xs text-[var(--gris-acier)]">Valeur</p>
                      <p className="text-sm font-medium text-[var(--blanc-absolu)]">
                        {formatEuros(property.valeurBien)}
                      </p>
                    </div>
                  )}
                  {property.loyerMensuel && (
                    <div>
                      <p className="text-xs text-[var(--gris-acier)]">Loyer</p>
                      <p className="text-sm font-medium text-[var(--blanc-absolu)] flex items-center gap-1">
                        <Euro size={12} />
                        {property.loyerMensuel}€/mois
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[var(--gris-acier)]">Documents</p>
                    <p className="text-sm font-medium text-[var(--blanc-absolu)] flex items-center gap-1">
                      <FileText size={12} />
                      {property.documentsCount}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal d'ajout */}
      <AjouterBienModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
