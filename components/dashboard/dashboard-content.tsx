"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CreditCard,
  FileText,
  Bell,
  ArrowRight,
  Download,
  Check,
  AlertCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatEuros, formatRelativeDate } from "@/lib/utils";

interface DashboardContentProps {
  prenom: string;
  subscription: {
    planName: string;
    statut: string;
    dateProchainPaiement: string | null;
    prixMensuel: number;
  } | null;
  propertiesCount: number;
  recentPayments: {
    id: string;
    montant: number;
    statut: string;
    description: string | null;
    createdAt: string;
  }[];
  recentDocuments: {
    id: string;
    nomFichier: string;
    typeDocument: string;
    createdAt: string;
  }[];
  notifications: {
    id: string;
    titre: string;
    message: string;
    type: string;
    createdAt: string;
  }[];
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function StatusBadge({ statut }: { statut: string }) {
  const config: Record<string, { color: string; label: string }> = {
    ACTIVE: { color: "var(--succes)", label: "Actif" },
    PAST_DUE: { color: "var(--warning)", label: "En retard" },
    CANCELLED: { color: "var(--erreur)", label: "Annulé" },
    PAUSED: { color: "var(--gris-plume)", label: "Suspendu" },
    SUCCEEDED: { color: "var(--succes)", label: "Réussi" },
    PENDING: { color: "var(--warning)", label: "En cours" },
    FAILED: { color: "var(--erreur)", label: "Échoué" },
  };

  const { color, label } = config[statut] || { color: "var(--gris-plume)", label: statut };

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export function DashboardContent({
  prenom,
  subscription,
  propertiesCount,
  recentPayments,
  recentDocuments,
  notifications,
}: DashboardContentProps) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      {/* Titre de bienvenue */}
      <motion.div variants={fadeUp}>
        <h1
          className="text-3xl lg:text-4xl text-[var(--blanc-absolu)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Bonjour, {prenom}
        </h1>
        <p className="text-[var(--gris-plume)] mt-1">
          Voici un aperçu de votre gestion patrimoniale.
        </p>
      </motion.div>

      {/* Bento Grid — Métriques */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Forfait actif */}
        <div className="p-5 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] hover:border-[var(--or-pur)]/20 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[var(--gris-plume)] uppercase tracking-wider">
              Forfait
            </span>
            <TrendingUp size={16} className="text-[var(--or-pur)]" />
          </div>
          <p className="text-lg font-medium text-[var(--blanc-absolu)]">
            {subscription?.planName || "Aucun"}
          </p>
          {subscription && <StatusBadge statut={subscription.statut} />}
        </div>

        {/* Biens gérés */}
        <div className="p-5 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] hover:border-[var(--or-pur)]/20 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[var(--gris-plume)] uppercase tracking-wider">
              Biens gérés
            </span>
            <Building2 size={16} className="text-[var(--or-pur)]" />
          </div>
          <p
            className="text-3xl font-bold text-[var(--blanc-absolu)]"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {propertiesCount}
          </p>
          <Link
            href="/mes-biens"
            className="text-xs text-[var(--or-pur)] hover:underline mt-1 inline-flex items-center gap-1"
          >
            Gérer <ArrowRight size={10} />
          </Link>
        </div>

        {/* Prochain paiement */}
        <div className="p-5 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] hover:border-[var(--or-pur)]/20 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[var(--gris-plume)] uppercase tracking-wider">
              Prochain paiement
            </span>
            <CreditCard size={16} className="text-[var(--or-pur)]" />
          </div>
          {subscription?.dateProchainPaiement ? (
            <>
              <p className="text-lg font-medium text-[var(--blanc-absolu)]">
                {formatEuros(subscription.prixMensuel)}
              </p>
              <p className="text-xs text-[var(--gris-plume)]">
                {new Date(subscription.dateProchainPaiement).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </>
          ) : (
            <p className="text-sm text-[var(--gris-acier)]">Aucun paiement prévu</p>
          )}
        </div>

        {/* Notifications */}
        <div className="p-5 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] hover:border-[var(--or-pur)]/20 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[var(--gris-plume)] uppercase tracking-wider">
              Notifications
            </span>
            <Bell size={16} className="text-[var(--or-pur)]" />
          </div>
          <p
            className="text-3xl font-bold text-[var(--blanc-absolu)]"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {notifications.length}
          </p>
          <p className="text-xs text-[var(--gris-plume)]">non lues</p>
        </div>
      </motion.div>

      {/* Bento Grid — Activité & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activité récente */}
        <motion.div
          variants={fadeUp}
          className="p-5 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
              Activité récente
            </h2>
            <Link href="/facturation">
              <Button variant="ghost" size="sm">
                Tout voir
              </Button>
            </Link>
          </div>

          {recentPayments.length === 0 && notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Clock size={32} className="text-[var(--gris-acier)] mx-auto mb-3" />
              <p className="text-sm text-[var(--gris-acier)]">Aucune activité récente</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 3).map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)]"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--or-pur)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell size={14} className="text-[var(--or-pur)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--blanc-absolu)] font-medium truncate">
                      {n.titre}
                    </p>
                    <p className="text-xs text-[var(--gris-plume)] truncate">{n.message}</p>
                    <p className="text-xs text-[var(--gris-acier)] mt-1">
                      {formatRelativeDate(n.createdAt)}
                    </p>
                  </div>
                </div>
              ))}

              {recentPayments.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--succes)]/10 flex items-center justify-center shrink-0">
                      {p.statut === "SUCCEEDED" ? (
                        <Check size={14} className="text-[var(--succes)]" />
                      ) : (
                        <AlertCircle size={14} className="text-[var(--erreur)]" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-[var(--blanc-absolu)]">
                        {p.description || "Paiement"}
                      </p>
                      <p className="text-xs text-[var(--gris-acier)]">
                        {formatRelativeDate(p.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--blanc-absolu)]">
                      {formatEuros(p.montant)}
                    </p>
                    <StatusBadge statut={p.statut} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Documents récents */}
        <motion.div
          variants={fadeUp}
          className="p-5 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
              Documents récents
            </h2>
            <Link href="/documents">
              <Button variant="ghost" size="sm">
                Tout voir
              </Button>
            </Link>
          </div>

          {recentDocuments.length === 0 ? (
            <div className="py-8 text-center">
              <FileText size={32} className="text-[var(--gris-acier)] mx-auto mb-3" />
              <p className="text-sm text-[var(--gris-acier)]">Aucun document</p>
              <Link href="/documents" className="mt-3 inline-block">
                <Button variant="secondary" size="sm">
                  Ajouter un document
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] hover:border-[var(--or-pur)]/20 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[var(--or-pur)]/10 flex items-center justify-center shrink-0">
                      <FileText size={14} className="text-[var(--or-pur)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-[var(--blanc-absolu)] truncate">
                        {doc.nomFichier}
                      </p>
                      <p className="text-xs text-[var(--gris-acier)]">
                        {doc.typeDocument} • {formatRelativeDate(doc.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--gris-plume)] hover:text-[var(--or-pur)] hover:bg-[var(--or-pur)]/10 transition-all shrink-0"
                    aria-label={`Télécharger ${doc.nomFichier}`}
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
