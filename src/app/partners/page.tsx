"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  partners,
  type PartnerType,
} from "@/lib/data";
import {
  MapPin,
  ArrowUpRight,
  Package,
  ExternalLink,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";

const allTypes: (PartnerType | "all")[] = [
  "all",
  "manufacturer",
  "hoses",
  "recycler",
  "packaging",
  "local-albania",
];

export default function PartnersPage() {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState<PartnerType | "all">("all");
  const typeLabel: Record<PartnerType, string> = {
    manufacturer: t("partners.typeManufacturer"),
    recycler: t("partners.typeRecycler"),
    packaging: t("partners.typePackaging"),
    hoses: t("partners.typeHoses"),
    "local-albania": t("partners.typeLocalAlbania"),
  };

  const filtered =
    activeType === "all"
      ? partners
      : partners.filter((p) => p.partnerType === activeType);

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 bg-[var(--site-bg)]">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-xs font-mono tracking-wider mb-6"
            style={{ backgroundColor: "var(--site-surface-strong)", border: "1px solid var(--site-border)", color: "var(--site-text-soft)" }}
          >
            {t("partners.pageEyebrow")}
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
            style={{ color: "var(--site-text)" }}
          >
            {t("partners.pageTitle")}
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "var(--site-text-muted)" }}>
            {t("partners.pageSubtitle")}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {allTypes.map((type) => {
            const label = type === "all" ? t("partners.allPartners") : typeLabel[type];
            const isActive = activeType === type;
            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className="rounded-lg px-4 py-2 text-xs font-semibold tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={isActive
                  ? { backgroundColor: "#0891b2", color: "#fff", border: "1px solid transparent" }
                  : { backgroundColor: "var(--site-surface-strong)", color: "var(--site-text-soft)", border: "1px solid var(--site-border)" }
                }
              >
                {label.toUpperCase()}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <div className="space-y-5">
            {filtered.map((partner, index) => (
              <motion.div
                key={partner.id}
                id={partner.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative p-6 sm:p-8 rounded-2xl transition-all overflow-hidden"
                style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: partner.color }}
                />

                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Left: identity + description + products */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-xl font-black"
                        style={{ backgroundColor: partner.color, color: "#fff" }}
                      >
                        {partner.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "var(--site-text)" }}>
                          {partner.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: "var(--site-text-soft)" }}>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {partner.country}
                          </span>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-cyan-500 hover:text-cyan-400 transition-colors"
                            >
                              {t("partners.website")} <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-semibold mb-2" style={{ color: partner.color }}>
                      {partner.tagline}
                    </p>

                    <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
                      {partner.description}
                    </p>

                    {/* Hero metrics */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {partner.heroMetrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-md px-2.5 py-1 font-mono text-[10px] tracking-wider"
                          style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-muted)" }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Products */}
                    <div className="flex flex-wrap gap-3">
                      {partner.products.map((product) => (
                        <div
                          key={product.name}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}
                        >
                          <Package className="w-4 h-4 shrink-0 text-cyan-500" />
                          <div className="min-w-0">
                            <span className="text-sm font-medium block truncate" style={{ color: "var(--site-text)" }}>
                              {product.name}
                            </span>
                            <span className="text-xs" style={{ color: "var(--site-text-soft)" }}>
                              {product.type}
                              {product.diameters !== "N/A" && ` · ${product.diameters}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: specs + CTA */}
                  <div className="flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <div
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}
                      >
                        <span className="text-[10px] font-mono block mb-1 tracking-wider" style={{ color: "var(--site-text-soft)" }}>
                          {t("partners.specialty")}
                        </span>
                        <span className="text-sm" style={{ color: "var(--site-text)" }}>{partner.specialty}</span>
                      </div>

                      {partner.maxDiameter && (
                        <div
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}
                        >
                          <span className="text-[10px] font-mono block mb-1 tracking-wider" style={{ color: "var(--site-text-soft)" }}>
                            {t("partners.maxDiameter")}
                          </span>
                          <span className="text-xl font-bold" style={{ color: "var(--site-text)" }}>
                            {partner.maxDiameter}
                          </span>
                        </div>
                      )}

                      {partner.keyStandards.length > 0 && (
                        <div
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}
                        >
                          <span className="text-[10px] font-mono block mb-2 tracking-wider" style={{ color: "var(--site-text-soft)" }}>
                            {t("partners.keyStandards")}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {partner.keyStandards.map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] tracking-wider"
                                style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)", color: "var(--site-text-muted)" }}
                              >
                                <Shield className="w-2.5 h-2.5 text-cyan-500" />
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/catalog?partner=${partner.id}`}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all text-sm font-semibold text-cyan-500 hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
                      style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}
                    >
                      {t("partners.viewProducts")}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p style={{ color: "var(--site-text-muted)" }}>{t("partners.noPartners")}</p>
            <button
              onClick={() => setActiveType("all")}
              className="mt-3 text-sm text-cyan-500 hover:text-cyan-400 transition-colors font-semibold"
            >
              {t("partners.showAll")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
