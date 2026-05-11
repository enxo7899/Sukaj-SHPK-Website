"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
} from "lucide-react";
import { productGroups } from "@/lib/products-data";
import { useTranslation } from "@/lib/i18n/context";

// ─── Config ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: "civil",      Icon: Building2, color: "#0891b2", labelKey: "categories.civilName" as const },
  { id: "agri",       Icon: Sprout,    color: "#22c55e", labelKey: "categories.agriName" as const },
  { id: "industrial", Icon: Factory,   color: "#22d3ee", labelKey: "categories.industrialName" as const },
] as const;

type TabId = typeof TABS[number]["id"];

const availConfig = {
  "in-stock": { Icon: CheckCircle2, color: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", labelKey: "catalog.inStock" as const },
  partial:    { Icon: Clock,        color: "#eab308", bg: "rgba(234,179,8,0.12)",  border: "rgba(234,179,8,0.3)",  labelKey: "catalog.partial" as const },
  "on-order": { Icon: Package,      color: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)", labelKey: "catalog.onOrder" as const },
} as const;

function getOverallAvail(product: (typeof productGroups)[0]): keyof typeof availConfig {
  if (product.suppliers.every((s) => s.availability === "in-stock")) return "in-stock";
  if (product.suppliers.some((s) => s.availability === "in-stock" || s.availability === "partial")) return "partial";
  return "on-order";
}

// ─── Hero Card (large, first product) ─────────────────────────────────────────

function HeroCard({ product, color }: { product: (typeof productGroups)[0]; color: string }) {
  const { t, tp } = useTranslation();
  const [imgErr, setImgErr] = useState(false);
  const avail = availConfig[getOverallAvail(product)];
  const AvailIcon = avail.Icon;

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}
    >
      {/* Image zone */}
      <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0" style={{ backgroundColor: `${color}10` }}>
        {!imgErr && product.image ? (
          <Image
            src={product.image}
            alt={tp(product.id, "name", product.name)}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}20, ${color}08)` }} />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${color}50 0%, transparent 50%)` }} />
        {/* Top accent */}
        <div className="absolute top-0 inset-x-0 h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
        {/* Availability badge */}
        <div className="absolute top-3 right-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm"
            style={{ color: avail.color, backgroundColor: avail.bg, border: `1px solid ${avail.border}` }}
          >
            <AvailIcon className="w-3 h-3" />
            {t(avail.labelKey)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3
          className="font-black text-xl leading-snug transition-colors duration-200 group-hover:text-cyan-500"
          style={{ color: "var(--site-text)" }}
        >
          {tp(product.id, "name", product.name)}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: "var(--site-text-muted)" }}>
          {product.description}
        </p>

        {/* Key specs strip */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {product.standards.slice(0, 3).map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] px-2 py-0.5 rounded"
              style={{ backgroundColor: `${color}12`, color, border: `1px solid ${color}30` }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4 mt-1"
          style={{ borderTop: "1px solid var(--site-border)" }}
        >
          <span className="font-mono text-[11px]" style={{ color: "var(--site-text-soft)" }}>
            {product.suppliers.length} {product.suppliers.length === 1 ? t("catalog.supplierOne") : t("catalog.suppliers")}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
            style={{ color }}
          >
            {t("featuredProducts.viewDetails")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Small Card ────────────────────────────────────────────────────────────────

function SmallCard({ product, color }: { product: (typeof productGroups)[0]; color: string }) {
  const { t, tp } = useTranslation();
  const [imgErr, setImgErr] = useState(false);
  const avail = availConfig[getOverallAvail(product)];
  const AvailIcon = avail.Icon;

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group relative flex items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:shadow-sm"
      style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}
    >
      {/* Mini image / color block */}
      <div
        className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
        style={{ backgroundColor: `${color}10` }}
      >
        {!imgErr && product.image ? (
          <Image
            src={product.image}
            alt={tp(product.id, "name", product.name)}
            fill
            className="object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}20, ${color}06)` }} />
        )}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom right, transparent 40%, ${color}30)` }} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-sm leading-snug mb-1 group-hover:text-cyan-500 transition-colors"
          style={{ color: "var(--site-text)" }}
        >
          {tp(product.id, "shortName", product.shortName)}
        </p>
        <p className="text-[11px] leading-snug line-clamp-1 mb-2" style={{ color: "var(--site-text-muted)" }}>
          {product.application}
        </p>
        <span
          className="inline-flex items-center gap-1 text-[10px] font-bold rounded-full px-2 py-0.5"
          style={{ color: avail.color, backgroundColor: avail.bg, border: `1px solid ${avail.border}` }}
        >
          <AvailIcon className="w-2.5 h-2.5" />
          {t(avail.labelKey)}
        </span>
      </div>

      <ChevronRight
        className="w-4 h-4 flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
        style={{ color: "var(--site-text-soft)" }}
      />
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeaturedProducts() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabId>("civil");

  const tab = TABS.find((t) => t.id === activeTab)!;
  const products = productGroups
    .filter((p) => p.category === activeTab)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 5);

  const hero = products[0];
  const rest = products.slice(1);

  return (
    <section className="relative py-20 sm:py-28 bg-[var(--site-bg)] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 65% 45% at 50% 100%, ${tab.color}07 0%, transparent 70%)`,
        }}
      />

      <div className="site-shell relative">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
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
          </motion.div>

          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 whitespace-nowrap self-start sm:self-auto"
            style={{ border: "1px solid var(--site-border)", color: "var(--site-text-muted)", backgroundColor: "var(--site-surface)" }}
          >
            {t("featuredProducts.viewAll")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map((tb) => {
            const isActive = activeTab === tb.id;
            const Icon = tb.Icon;
            return (
              <button
                key={tb.id}
                onClick={() => setActiveTab(tb.id)}
                className="relative flex-shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
                style={{
                  color: isActive ? tb.color : "var(--site-text-soft)",
                  backgroundColor: isActive ? `${tb.color}14` : "transparent",
                  border: isActive ? `1px solid ${tb.color}35` : "1px solid var(--site-border)",
                }}
              >
                <Icon className="w-4 h-4" />
                {t(tb.labelKey)}
                {isActive && (
                  <motion.span
                    layoutId="product-tab-dot"
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: tb.color }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Product grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid lg:grid-cols-[1fr_1.1fr] gap-5"
          >
            {/* Left: hero card */}
            {hero && (
              <div className="flex flex-col">
                <HeroCard product={hero} color={tab.color} />
              </div>
            )}

            {/* Right: stack of small cards */}
            {rest.length > 0 && (
              <div className="flex flex-col gap-3 justify-between">
                {rest.map((product) => (
                  <SmallCard key={product.id} product={product} color={tab.color} />
                ))}

                {/* "See all in category" link */}
                <Link
                  href={`/catalog?category=${activeTab}`}
                  className="group flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 mt-auto"
                  style={{
                    border: `1px solid ${tab.color}25`,
                    color: tab.color,
                    backgroundColor: `${tab.color}06`,
                  }}
                >
                  {t("categories.learnMore")} {t(`categories.${activeTab === "civil" ? "civilName" : activeTab === "agri" ? "agriName" : "industrialName"}`)}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
