"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  PenSquare,
  ArrowLeft,
  User,
  Shield,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { messageSchema, type MessageInput } from "@/lib/validations";
import { formatRelativeDate } from "@/lib/utils";

interface Message {
  id: string;
  expediteur: string;
  sujet: string;
  contenu: string;
  lu: boolean;
  createdAt: string;
}

export function MessagerieContent({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageInput>({
    resolver: zodResolver(messageSchema),
  });

  async function onSend(data: MessageInput) {
    setIsSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        reset();
        setIsComposing(false);
        router.refresh();
      }
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl text-[var(--blanc-absolu)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Messagerie
          </h1>
          <p className="text-[var(--gris-plume)] mt-1">
            Échangez avec notre équipe d&apos;experts
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsComposing(true)}>
          <PenSquare size={18} />
          Nouveau message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[60vh]">
        {/* Liste des messages */}
        <div className="lg:col-span-1 space-y-2 overflow-y-auto max-h-[70vh]">
          {messages.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]">
              <MessageSquare size={48} className="text-[var(--gris-acier)] mx-auto mb-4" />
              <p className="text-sm text-[var(--gris-acier)]">Aucun message</p>
            </div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  setIsComposing(false);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedMessage?.id === msg.id
                    ? "bg-[var(--or-pur)]/5 border-[var(--or-pur)]/30"
                    : "bg-[var(--noir-card)] border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {msg.expediteur === "ADMIN" ? (
                      <Shield size={14} className="text-[var(--or-pur)]" />
                    ) : (
                      <User size={14} className="text-[var(--gris-plume)]" />
                    )}
                    <span className="text-xs text-[var(--gris-acier)]">
                      {msg.expediteur === "ADMIN" ? "Rentium Partners" : "Vous"}
                    </span>
                  </div>
                  {!msg.lu && msg.expediteur === "ADMIN" && (
                    <Badge variant="default">Nouveau</Badge>
                  )}
                </div>
                <p className="text-sm font-medium text-[var(--blanc-absolu)] truncate">
                  {msg.sujet}
                </p>
                <p className="text-xs text-[var(--gris-plume)] truncate mt-0.5">
                  {msg.contenu}
                </p>
                <p className="text-xs text-[var(--gris-acier)] mt-1">
                  {formatRelativeDate(msg.createdAt)}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Détail du message / Nouveau message */}
        <div className="lg:col-span-2 rounded-2xl bg-[var(--noir-card)] border border-white/[0.06] overflow-hidden">
          <AnimatePresence mode="wait">
            {isComposing ? (
              <motion.div
                key="compose"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-[var(--blanc-absolu)]">
                    Nouveau message
                  </h2>
                  <button
                    onClick={() => setIsComposing(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--gris-plume)] hover:text-[var(--blanc-absolu)] hover:bg-white/[0.06] transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit(onSend)}
                  className="flex-1 flex flex-col gap-4"
                >
                  <Input
                    label="Sujet"
                    placeholder="Objet de votre demande"
                    error={errors.sujet?.message}
                    {...register("sujet")}
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[var(--gris-plume)] mb-1.5">
                      Message
                    </label>
                    <textarea
                      placeholder="Décrivez votre demande en détail..."
                      className="w-full h-40 p-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] text-sm text-[var(--blanc-absolu)] placeholder:text-[var(--gris-acier)] resize-none focus:outline-none focus:border-[var(--or-pur)] focus:shadow-[0_0_0_3px_var(--or-glow)] transition-all"
                      {...register("contenu")}
                    />
                    {errors.contenu && (
                      <p className="text-xs text-[var(--erreur)] mt-1">
                        {errors.contenu.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" isLoading={isSending}>
                      <Send size={16} />
                      Envoyer
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="flex items-center gap-1 text-sm text-[var(--gris-plume)] hover:text-[var(--or-pur)] transition-colors mb-4 lg:hidden"
                >
                  <ArrowLeft size={14} />
                  Retour
                </button>
                <div className="flex items-center gap-2 mb-2">
                  {selectedMessage.expediteur === "ADMIN" ? (
                    <Shield size={16} className="text-[var(--or-pur)]" />
                  ) : (
                    <User size={16} className="text-[var(--gris-plume)]" />
                  )}
                  <span className="text-sm text-[var(--gris-plume)]">
                    {selectedMessage.expediteur === "ADMIN"
                      ? "Rentium Partners"
                      : "Vous"}
                  </span>
                  <span className="text-xs text-[var(--gris-acier)]">
                    • {formatRelativeDate(selectedMessage.createdAt)}
                  </span>
                </div>
                <h2 className="text-xl font-medium text-[var(--blanc-absolu)] mb-4">
                  {selectedMessage.sujet}
                </h2>
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-[var(--blanc-casse)] whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.contenu}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center p-6"
              >
                <div className="text-center">
                  <MessageSquare
                    size={48}
                    className="text-[var(--gris-acier)] mx-auto mb-4"
                  />
                  <p className="text-sm text-[var(--gris-acier)]">
                    Sélectionnez un message ou rédigez-en un nouveau
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
