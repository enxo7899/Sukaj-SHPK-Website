"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Building2, Sprout, Factory, ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import { productGroups } from "@/lib/products-data";
import { useTranslation } from "@/lib/i18n/context";

const iconMap: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  Building2,
  Sprout,
  Factory,
};

const categoryTranslationKeys = {
  civil:      { name: "categories.civilName",      desc: "categories.civilDescription" },
  agri:       { name: "categories.agriName",       desc: "categories.agriDescription" },
  industrial: { name: "categories.industrialName", desc: "categories.industrialDescription" },
} as const;

const categoryConfig = {
  civil:      { color: "#0891b2", num: "01", tag: "Infrastructure" },
  agri:       { color: "#16a34a", num: "02", tag: "Agriculture" },
  industrial: { color: "#0ea5e9", num: "03", tag: "Industry" },
} as const;

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export function CategoriesPremium() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-[var(--site-bg)]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(8,145,178,0.05) 0%, transparent 65%)" }}
      />

      <div className="site-shell relative">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              {t("categories.eyebrow")}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-black leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "var(--site-text)" }}
            >
              {t("categories.title1")}
              <br />
              <span
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(90deg, #22d3ee 0%, #0891b2 60%)",
                }}
              >
                {t("categories.title2")}
              </span>
            </h2>
            <p className="text-sm sm:text-base max-w-sm leading-relaxed" style={{ color: "var(--site-text-soft)" }}>
              {t("categories.subtitle")}
            </p>
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Building2;
            const tk = categoryTranslationKeys[category.id as keyof typeof categoryTranslationKeys];
            const cfg = categoryConfig[category.id as keyof typeof categoryConfig];
            const productCount = productGroups.filter((p) => p.category === category.id).length;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_EXPO }}
              >
                <Link href={`/catalog?category=${category.id}`} className="block h-full group">
                  <motion.div
                    whileHover={reduceMotion ? {} : { y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative h-full overflow-hidden rounded-2xl transition-shadow duration-300 group-hover:shadow-xl"
                    style={{
                      backgroundColor: "var(--site-surface-strong)",
                      border: "1px solid var(--site-border)",
                    }}
                  >
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(180deg, ${cfg.color}, ${cfg.color}55)` }}
                    />

                    {/* Hover top glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse 80% 35% at 50% 0%, ${cfg.color}10, transparent)` }}
                    />

                    {/* Ghost number — decorative */}
                    <div
                      className="pointer-events-none absolute -right-2 -bottom-3 font-black select-none leading-none"
                      style={{ fontSize: "clamp(6rem, 10vw, 8rem)", color: `${cfg.color}08`, lineHeight: 1 }}
                    >
                      {cfg.num}
                    </div>

                    {/* Card body */}
                    <div className="relative pl-7 pr-6 pt-8 pb-8 flex flex-col h-full">
                      {/* Top row: icon + meta */}
                      <div className="flex items-start justify-between mb-7">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${cfg.color}12`, border: `1px solid ${cfg.color}25` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span
                            className="font-mono text-[9px] tracking-[0.22em] uppercase font-bold"
                            style={{ color: cfg.color }}
                          >
                            {cfg.tag}
                          </span>
                          <span className="font-mono text-[9px] tracking-wider" style={{ color: "var(--site-text-soft)" }}>
                            {productCount} products
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-xl sm:text-2xl font-black mb-3 leading-snug tracking-tight"
                        style={{ color: "var(--site-text)" }}
                      >
                        {tk ? t(tk.name) : category.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed mb-7 flex-1" style={{ color: "var(--site-text-muted)" }}>
                        {tk ? t(tk.desc) : category.description}
                      </p>

                      {/* Product tags */}
                      <div className="flex flex-wrap gap-1.5 mb-7">
                        {category.products.slice(0, 3).map((product) => (
                          <span
                            key={product}
                            className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium"
                            style={{
                              backgroundColor: "var(--site-surface)",
                              border: "1px solid var(--site-border)",
                              color: "var(--site-text-soft)",
                            }}
                          >
                            {product}
                          </span>
                        ))}
                      </div>

                      {/* CTA row */}
                      <div
                        className="flex items-center justify-between pt-5"
                        style={{ borderTop: "1px solid var(--site-border)" }}
                      >
                        <span className="text-sm font-semibold" style={{ color: cfg.color }}>
                          {t("categories.learnMore")}
                        </span>
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${cfg.color}12`, border: `1px solid ${cfg.color}25` }}
                        >
                          <ArrowUpRight
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            style={{ color: cfg.color }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
