"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Sprout,
  Factory,
  CheckCircle2,
  Clock,
  Package,
} from "lucide-react";
import { productGroups } from "@/lib/products-data";
import { useTranslation } from "@/lib/i18n/context";

// ─── Config ────────────────────────────────────────────────────────────────

const categoryMeta = {
  civil: {
    Icon: Building2,
    color: "#0891b2",
    labelKey: "categories.civilName" as const,
  },
  agri: {
    Icon: Sprout,
    color: "#22c55e",
    labelKey: "categories.agriName" as const,
  },
  industrial: {
    Icon: Factory,
    color: "#22d3ee",
    labelKey: "categories.industrialName" as const,
  },
};

const availIcon = {
  "in-stock": CheckCircle2,
  partial: Clock,
  "on-order": Package,
} as const;

const availColor = {
  "in-stock": { text: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)" },
  partial: { text: "#eab308", bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.3)" },
  "on-order": { text: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)" },
} as const;

// Pick 4 featured products
const featuredProducts = productGroups.filter((p) => p.featured).slice(0, 4);

// ─── Product Card ──────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
}: {
  product: (typeof productGroups)[0];
  index: number;
}) {
  const { t, tp } = useTranslation();
  const [imgErr, setImgErr] = useState(false);
  const cat = categoryMeta[product.category];
  const CatIcon = cat.Icon;

  // Derive overall availability
  const overallAvail: keyof typeof availIcon = (() => {
    if (product.suppliers.every((s) => s.availability === "in-stock")) return "in-stock";
    if (product.suppliers.some((s) => s.availability === "in-stock" || s.availability === "partial"))
      return "partial";
    return "on-order";
  })();

  const avail = availColor[overallAvail];
  const AvailIcon = availIcon[overallAvail];

  const availLabel =
    overallAvail === "in-stock"
      ? t("catalog.inStock")
      : overallAvail === "partial"
      ? t("catalog.partial")
      : t("catalog.onOrder");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/catalog/${product.slug}`}
        className="group relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          border: "1px solid var(--site-border)",
          backgroundColor: "var(--site-surface-strong)",
          boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
        }}
      >
        {/* ── Image ── */}
        <div className="relative h-44 sm:h-52 overflow-hidden" style={{ backgroundColor: `${cat.color}10` }}>
          {!imgErr && product.image ? (
            <Image
              src={product.image}
              alt={tp(product.id, "name", product.name)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${cat.color}18, ${cat.color}06)`,
              }}
            >
              <CatIcon className="w-14 h-14 opacity-20" style={{ color: cat.color }} />
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${cat.color}30 0%, transparent 55%)`,
            }}
          />

          {/* Top accent line */}
          <div
            className="absolute top-0 inset-x-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}60)` }}
          />

          {/* Category badge — bottom-left of image */}
          <div className="absolute bottom-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold font-mono tracking-wide backdrop-blur-sm"
              style={{
                background: `${cat.color}25`,
                color: cat.color,
                border: `1px solid ${cat.color}40`,
              }}
            >
              <CatIcon className="w-3 h-3" />
              {t(cat.labelKey)}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Name */}
          <h3
            className="font-bold text-base leading-snug transition-colors duration-200 group-hover:text-cyan-500"
            style={{ color: "var(--site-text)" }}
          >
            {tp(product.id, "shortName", product.shortName)}
          </h3>

          {/* Application */}
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--site-text-muted)" }}>
            {product.application}
          </p>

          {/* Divider */}
          <div className="flex-1" />

          {/* Footer row */}
          <div className="flex items-center justify-between gap-2 pt-3" style={{ borderTop: "1px solid var(--site-border)" }}>
            {/* Availability badge */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
              style={{
                color: avail.text,
                backgroundColor: avail.bg,
                border: `1px solid ${avail.border}`,
              }}
            >
              <AvailIcon className="w-3 h-3" />
              {availLabel}
            </span>

            {/* Supplier count + arrow */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px]" style={{ color: "var(--site-text-soft)" }}>
                {product.suppliers.length}{" "}
                {product.suppliers.length === 1 ? t("catalog.supplierOne") : t("catalog.suppliers")}
              </span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ color: "var(--site-text-soft)" }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────

export function FeaturedProducts() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 sm:py-28 bg-[var(--site-bg)] overflow-hidden">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(8,145,178,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="site-shell relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-cyan-500/60" />
              <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                {t("featuredProducts.eyebrow")}
              </span>
            </div>
            <h2
              className="font-black leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--site-text)" }}
            >
              {t("featuredProducts.title")}
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
              {t("featuredProducts.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                border: "1px solid var(--site-border)",
                color: "var(--site-text-muted)",
                backgroundColor: "var(--site-surface)",
              }}
            >
              {t("featuredProducts.viewAll")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
