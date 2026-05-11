"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Building2, Sprout, Factory, ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import { useTranslation } from "@/lib/i18n/context";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Sprout,
  Factory,
};

const categoryTranslationKeys = {
  civil: { name: "categories.civilName", desc: "categories.civilDescription" },
  agri: { name: "categories.agriName", desc: "categories.agriDescription" },
  industrial: {
    name: "categories.industrialName",
    desc: "categories.industrialDescription",
  },
} as const;

export function CategoriesPremium() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  // Single restrained accent palette — differentiates by category, not by rainbow
  const categoryData = [
    {
      ...categories[0],
      gradient: "from-cyan-500 to-cyan-700",
      glowColor: "rgba(6,182,212,0.28)",
      iconBg: "from-cyan-500 to-cyan-700",
    },
    {
      ...categories[1],
      gradient: "from-emerald-500 to-emerald-700",
      glowColor: "rgba(16,185,129,0.24)",
      iconBg: "from-emerald-500 to-emerald-700",
    },
    {
      ...categories[2],
      gradient: "from-sky-500 to-sky-700",
      glowColor: "rgba(56,189,248,0.24)",
      iconBg: "from-sky-500 to-sky-700",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-[var(--site-bg)]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="site-shell relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              {t("categories.eyebrow")}
            </span>
            <div className="h-px w-8 bg-cyan-500/60" />
          </div>

          <h2
            className="font-black leading-[1.05] tracking-tight mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "var(--site-text)" }}
          >
            {t("categories.title1")}
            <br />
            <span
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(90deg, #22d3ee 0%, #0891b2 60%)",
              }}
            >
              {t("categories.title2")}
            </span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
            {t("categories.subtitle")}
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {categoryData.map((category, index) => {
            const Icon = iconMap[category.icon] || Building2;
            const tk =
              categoryTranslationKeys[
                category.id as keyof typeof categoryTranslationKeys
              ];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/catalog?category=${category.id}`}>
                  <motion.div
                    whileHover={reduceMotion ? {} : { y: -4 }}
                    className="group relative h-full"
                  >
                    {/* Card */}
                    <div
                      className="relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all overflow-hidden"
                      style={{
                        backgroundColor: "var(--site-surface)",
                        border: "1px solid var(--site-border)",
                      }}
                    >
                      {/* Top accent line */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${category.gradient} opacity-50 group-hover:opacity-100 transition-opacity`}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.iconBg} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-3 transition-colors" style={{ color: "var(--site-text)" }}>
                          {tk ? t(tk.name) : category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--site-text-muted)" }}>
                          {tk ? t(tk.desc) : category.description}
                        </p>

                        {/* Product badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {category.products.slice(0, 3).map((product) => (
                            <span
                              key={product}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}
                            >
                              {product}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all">
                          <span>{t("categories.learnMore")}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
