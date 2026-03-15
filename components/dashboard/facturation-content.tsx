"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  AlertCircle,
  Clock,
  Receipt,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatEuros, formatDate } from "@/lib/utils";

interface FacturationContentProps {
  subscription: {
    planName: string;
    planType: string;
    prixMensuel: number;
    statut: string;
    dateDebut: string;
    dateProchainPaiement: string | null;
  } | null;
  payments: {
    id: string;
    montant: number;
    devise: string;
    statut: string;
    description: string | null;
    createdAt: string;
  }[];
}

const STATUS_CONFIG: Record<
  string,
  { icon: typeof Check; color: string; label: string }
> = {
  SUCCEEDED: { icon: Check, color: "var(--succes)", label: "Réussi" },
  PENDING: { icon: Clock, color: "var(--warning)", label: "En attente" },
  FAILED: { icon: AlertCircle, color: "var(--erreur)", label: "Échoué" },
  REFUNDED: { icon: Receipt, color: "var(--info)", label: "Remboursé" },
};

export function FacturationContent({
  subscription,
  payments,
}: FacturationContentProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-3xl text-[var(--blanc-absolu)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Facturation
        </h1>
        <p className="text-[var(--gris-plume)] mt-1">
          Gérez votre abonnement et consultez vos factures
        </p>
      </div>

      {/* Abonnement actuel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
            Abonnement actuel
          </h2>
          {subscription && (
            <Badge
              variant={
                subscription.statut === "ACTIVE"
                  ? "success"
                  : subscription.statut === "PAST_DUE"
                    ? "warning"
                    : "error"
              }
            >
              {subscription.statut === "ACTIVE"
                ? "Actif"
                : subscription.statut === "PAST_DUE"
                  ? "En retard"
                  : "Annulé"}
            </Badge>
          )}
        </div>

        {subscription ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-[var(--gris-acier)] mb-1">Formule</p>
              <p className="text-sm font-medium text-[var(--blanc-absolu)]">
                {subscription.planName}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--gris-acier)] mb-1">Montant</p>
              <p className="text-sm font-medium text-[var(--blanc-absolu)]">
                {formatEuros(subscription.prixMensuel)}/mois
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--gris-acier)] mb-1">Depuis le</p>
              <p className="text-sm font-medium text-[var(--blanc-absolu)]">
                {formatDate(subscription.dateDebut)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--gris-acier)] mb-1">
                Prochain paiement
              </p>
              <p className="text-sm font-medium text-[var(--blanc-absolu)]">
                {subscription.dateProchainPaiement
                  ? formatDate(subscription.dateProchainPaiement)
                  : "—"}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <CreditCard
              size={32}
              className="text-[var(--gris-acier)] mx-auto mb-3"
            />
            <p className="text-sm text-[var(--gris-acier)]">
              Aucun abonnement actif
            </p>
          </div>
        )}

        {subscription && (
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.04]">
            <Button variant="secondary" size="sm">
              <ArrowUpRight size={14} />
              Changer de formule
            </Button>
            <Button variant="ghost" size="sm">
              Mettre à jour le moyen de paiement
            </Button>
          </div>
        )}
      </motion.div>

      {/* Historique des paiements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] overflow-hidden"
      >
        <div className="p-5 border-b border-white/[0.04]">
          <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
            Historique des paiements
          </h2>
        </div>

        {payments.length === 0 ? (
          <div className="py-12 text-center">
            <Receipt size={32} className="text-[var(--gris-acier)] mx-auto mb-3" />
            <p className="text-sm text-[var(--gris-acier)]">
              Aucun paiement enregistré
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {payments.map((payment) => {
              const status =
                STATUS_CONFIG[payment.statut] || STATUS_CONFIG.PENDING;
              const StatusIcon = status.icon;

              return (
                <div
                  key={payment.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${status.color} 15%, transparent)`,
                      }}
                    >
                      <StatusIcon size={14} style={{ color: status.color }} />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--blanc-absolu)]">
                        {payment.description || "Paiement"}
                      </p>
                      <p className="text-xs text-[var(--gris-acier)]">
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p
                        className="text-sm font-medium text-[var(--blanc-absolu)]"
                        style={{ fontFamily: "var(--font-mono, monospace)" }}
                      >
                        {formatEuros(payment.montant)}
                      </p>
                      <p className="text-xs" style={{ color: status.color }}>
                        {status.label}
                      </p>
                    </div>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--gris-plume)] hover:text-[var(--or-pur)] hover:bg-[var(--or-pur)]/10 transition-all"
                      aria-label="Télécharger la facture"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
