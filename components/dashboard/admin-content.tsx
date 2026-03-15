"use client";

import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  TrendingUp,
  Activity,
  DollarSign,
  AlertTriangle,
  Shield,
  Check,
  X,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatEuros, formatRelativeDate } from "@/lib/utils";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalRevenue: number;
  mrr: number;
  arr: number;
  churnRate: number;
}

interface RecentUser {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  role: string;
  statut: string;
  createdAt: string;
  planName: string | null;
  subStatut: string | null;
}

interface RecentPayment {
  id: string;
  montant: number;
  statut: string;
  description: string | null;
  createdAt: string;
  userName: string;
  userEmail: string;
}

interface LoginLogEntry {
  id: string;
  ipAddress: string;
  succes: boolean;
  createdAt: string;
  userName: string;
  userEmail: string;
}

interface AdminContentProps {
  stats: AdminStats;
  recentUsers: RecentUser[];
  recentPayments: RecentPayment[];
  loginLogs: LoginLogEntry[];
}

export function AdminContent({
  stats,
  recentUsers,
  recentPayments,
  loginLogs,
}: AdminContentProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-3xl text-[var(--blanc-absolu)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Administration
        </h1>
        <p className="text-[var(--gris-plume)] mt-1">
          Vue d&apos;ensemble de la plateforme Rentium Partners
        </p>
      </div>

      {/* KPIs — Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="MRR"
          value={formatEuros(stats.mrr)}
          icon={<DollarSign size={18} />}
          accent="var(--succes)"
        />
        <StatCard
          label="ARR"
          value={formatEuros(stats.arr)}
          icon={<TrendingUp size={18} />}
          accent="var(--or-pur)"
        />
        <StatCard
          label="Utilisateurs"
          value={`${stats.activeUsers} / ${stats.totalUsers}`}
          icon={<Users size={18} />}
          accent="var(--info)"
          sub="actifs"
        />
        <StatCard
          label="Churn Rate"
          value={`${stats.churnRate}%`}
          icon={<AlertTriangle size={18} />}
          accent={stats.churnRate > 5 ? "var(--erreur)" : "var(--succes)"}
        />
      </motion.div>

      {/* Revenus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <StatCard
          label="Revenu total"
          value={formatEuros(stats.totalRevenue)}
          icon={<CreditCard size={18} />}
          accent="var(--or-brillant)"
        />
        <StatCard
          label="Abonnements actifs"
          value={`${stats.activeSubscriptions}`}
          icon={<Activity size={18} />}
          accent="var(--succes)"
          sub={`sur ${stats.totalSubscriptions} total`}
        />
        <StatCard
          label="Revenu moyen / user"
          value={stats.activeUsers > 0 ? formatEuros(stats.mrr / stats.activeUsers) : "—"}
          icon={<DollarSign size={18} />}
          accent="var(--or-pur)"
          sub="/mois"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Derniers utilisateurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] overflow-hidden"
        >
          <div className="p-5 border-b border-white/[0.04]">
            <h2 className="text-lg font-medium text-[var(--blanc-absolu)] flex items-center gap-2">
              <Users size={18} className="text-[var(--or-pur)]" />
              Derniers inscrits
            </h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--or-pur)] to-[var(--or-brillant)] flex items-center justify-center text-[var(--noir-absolu)] text-xs font-bold shrink-0">
                    {user.prenom.charAt(0)}{user.nom.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--blanc-absolu)] truncate">
                      {user.prenom} {user.nom}
                    </p>
                    <p className="text-xs text-[var(--gris-acier)] truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {user.planName && (
                    <Badge variant="outline">{user.planName}</Badge>
                  )}
                  <span className="text-xs text-[var(--gris-acier)]">
                    {formatRelativeDate(user.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Derniers paiements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] overflow-hidden"
        >
          <div className="p-5 border-b border-white/[0.04]">
            <h2 className="text-lg font-medium text-[var(--blanc-absolu)] flex items-center gap-2">
              <CreditCard size={18} className="text-[var(--or-pur)]" />
              Derniers paiements
            </h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm text-[var(--blanc-absolu)] truncate">
                    {payment.userName}
                  </p>
                  <p className="text-xs text-[var(--gris-acier)] truncate">
                    {payment.description || "Paiement"} • {formatRelativeDate(payment.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: "var(--font-mono, monospace)", color: payment.statut === "SUCCEEDED" ? "var(--succes)" : "var(--erreur)" }}
                  >
                    {formatEuros(payment.montant)}
                  </span>
                  {payment.statut === "SUCCEEDED" ? (
                    <Check size={14} className="text-[var(--succes)]" />
                  ) : (
                    <X size={14} className="text-[var(--erreur)]" />
                  )}
                </div>
              </div>
            ))}
            {recentPayments.length === 0 && (
              <div className="py-8 text-center text-sm text-[var(--gris-acier)]">
                Aucun paiement enregistré
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Logs de connexion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] overflow-hidden"
      >
        <div className="p-5 border-b border-white/[0.04]">
          <h2 className="text-lg font-medium text-[var(--blanc-absolu)] flex items-center gap-2">
            <Shield size={18} className="text-[var(--or-pur)]" />
            Logs de connexion
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left text-xs text-[var(--gris-acier)] font-medium px-5 py-3">
                  Utilisateur
                </th>
                <th className="text-left text-xs text-[var(--gris-acier)] font-medium px-5 py-3">
                  Adresse IP
                </th>
                <th className="text-left text-xs text-[var(--gris-acier)] font-medium px-5 py-3">
                  Statut
                </th>
                <th className="text-left text-xs text-[var(--gris-acier)] font-medium px-5 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {loginLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <div>
                      <p className="text-sm text-[var(--blanc-absolu)]">{log.userName}</p>
                      <p className="text-xs text-[var(--gris-acier)]">{log.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm text-[var(--gris-plume)] font-mono">
                      {log.ipAddress}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {log.succes ? (
                      <Badge variant="success">Succès</Badge>
                    ) : (
                      <Badge variant="error">Échec</Badge>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-xs text-[var(--gris-acier)]">
                      <Clock size={12} />
                      {formatRelativeDate(log.createdAt)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
  sub,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
  sub?: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] hover:border-[var(--or-pur)]/20 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[var(--gris-plume)] uppercase tracking-wider">
          {label}
        </span>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <p
        className="text-2xl font-bold text-[var(--blanc-absolu)]"
        style={{ fontFamily: "var(--font-mono, monospace)" }}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-[var(--gris-acier)] mt-0.5">{sub}</p>}
    </div>
  );
}
