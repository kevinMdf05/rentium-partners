"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Trash2,
  File,
  FileSpreadsheet,
  FileImage,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils";

interface Document {
  id: string;
  nomFichier: string;
  typeDocument: string;
  annee: number | null;
  description: string | null;
  propertyName: string | null;
  createdAt: string;
}

const TYPE_DOC_LABELS: Record<string, string> = {
  DECLARATION: "Déclaration",
  BILAN: "Bilan",
  FACTURE: "Facture",
  CONTRAT: "Contrat",
  AUTRE: "Autre",
};

const TYPE_DOC_COLORS: Record<string, string> = {
  DECLARATION: "info",
  BILAN: "success",
  FACTURE: "warning",
  CONTRAT: "default",
  AUTRE: "outline",
};

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (["pdf"].includes(ext || "")) return FileText;
  if (["xlsx", "xls", "csv"].includes(ext || "")) return FileSpreadsheet;
  if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) return FileImage;
  return File;
}

export function DocumentsContent({
  documents,
}: {
  documents: Document[];
  properties: { id: string; label: string }[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.nomFichier
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || doc.typeDocument === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl text-[var(--blanc-absolu)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Documents
          </h1>
          <p className="text-[var(--gris-plume)] mt-1">
            {documents.length} document{documents.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="primary">
          <Upload size={18} />
          Ajouter un document
        </Button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gris-acier)]"
          />
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] text-sm text-[var(--blanc-absolu)] placeholder:text-[var(--gris-acier)] focus:outline-none focus:border-[var(--or-pur)] transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[var(--gris-acier)]" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-10 px-3 rounded-xl bg-[var(--noir-surface)] border border-[var(--bordure-subtile)] text-sm text-[var(--blanc-absolu)] focus:outline-none focus:border-[var(--or-pur)] transition-all"
          >
            <option value="all">Tous les types</option>
            {Object.entries(TYPE_DOC_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des documents */}
      {filteredDocs.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[var(--noir-card)] border border-white/[0.06]">
          <FileText size={48} className="text-[var(--gris-acier)] mx-auto mb-4" />
          <h2 className="text-xl text-[var(--blanc-absolu)] mb-2">
            {documents.length === 0 ? "Aucun document" : "Aucun résultat"}
          </h2>
          <p className="text-sm text-[var(--gris-plume)]">
            {documents.length === 0
              ? "Déposez vos premiers documents fiscaux et comptables."
              : "Modifiez vos critères de recherche."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredDocs.map((doc, i) => {
            const FileIcon = getFileIcon(doc.nomFichier);

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--noir-card)] border border-white/[0.06] hover:border-[var(--or-pur)]/20 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[var(--or-pur)]/10 flex items-center justify-center shrink-0">
                    <FileIcon size={18} className="text-[var(--or-pur)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--blanc-absolu)] truncate">
                      {doc.nomFichier}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <Badge
                        variant={
                          TYPE_DOC_COLORS[doc.typeDocument] as
                            | "info"
                            | "success"
                            | "warning"
                            | "default"
                            | "outline"
                        }
                      >
                        {TYPE_DOC_LABELS[doc.typeDocument]}
                      </Badge>
                      {doc.annee && (
                        <span className="text-xs text-[var(--gris-acier)]">
                          {doc.annee}
                        </span>
                      )}
                      {doc.propertyName && (
                        <span className="text-xs text-[var(--gris-acier)]">
                          • {doc.propertyName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gris-acier)] hidden sm:block">
                    {formatRelativeDate(doc.createdAt)}
                  </span>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--gris-plume)] hover:text-[var(--or-pur)] hover:bg-[var(--or-pur)]/10 transition-all"
                    aria-label="Télécharger"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--gris-plume)] hover:text-[var(--erreur)] hover:bg-[var(--erreur)]/10 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
