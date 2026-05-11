"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe2, Truck, Handshake } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

const pillars = [
  {
    icon: ShieldCheck,
    titleKey: "whyUs.p2Title" as const,
    descKey: "whyUs.p2Desc" as const,
    accent: "#0891b2",
    num: "01",
  },
  {
    icon: Globe2,
    titleKey: "whyUs.p3Title" as const,
    descKey: "whyUs.p3Desc" as const,
    accent: "#0ea5e9",
    num: "02",
  },
  {
    icon: Handshake,
    titleKey: "whyUs.p1Title" as const,
    descKey: "whyUs.p1Desc" as const,
    accent: "#06b6d4",
    num: "03",
  },
  {
    icon: Truck,
    titleKey: "whyUs.p4Title" as const,
    descKey: "whyUs.p4Desc" as const,
    accent: "#22d3ee",
    num: "04",
  },
];

export function WhyUs() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 sm:py-32 bg-[var(--site-bg)] overflow-hidden">
      {/* Subtle ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 15% 50%, rgba(8,145,178,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="site-shell relative">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 xl:gap-24 items-start">

          {/* ── Left: text block ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-cyan-500/60" />
              <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                {t("whyUs.eyebrow")}
              </span>
            </div>

            <h2
              className="font-black leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--site-text)" }}
            >
              {t("whyUs.title")}
            </h2>

            <p
              className="text-base leading-relaxed mb-10 max-w-sm"
              style={{ color: "var(--site-text-muted)" }}
            >
              {t("hero.description")}
            </p>

            {/* Key metric strip */}
            <div
              className="flex items-center gap-6 pt-8"
              style={{ borderTop: "1px solid var(--site-border)" }}
            >
              {[
                { n: "30+", label: t("stats.yearsLabel") },
                { n: "17", label: t("stats.partnersLabel") },
                { n: "12", label: t("stats.countriesLabel") },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-2xl font-black tabular-nums" style={{ color: "var(--site-text)" }}>
                    {m.n}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase mt-0.5" style={{ color: "var(--site-text-soft)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: 2×2 card grid ── */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex flex-col gap-5 rounded-2xl p-7 overflow-hidden transition-all duration-300"
                  style={{
                    border: "1px solid var(--site-border)",
                    backgroundColor: "var(--site-surface-strong)",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                  }}
                >
                  {/* Large ghost number */}
                  <span
                    className="pointer-events-none absolute top-4 right-5 font-black leading-none select-none"
                    style={{
                      fontSize: "4.5rem",
                      color: `${p.accent}08`,
                      lineHeight: 1,
                    }}
                  >
                    {p.num}
                  </span>

                  {/* Hover top-line accent */}
                  <div
                    className="absolute top-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}40)` }}
                  />

                  {/* Icon */}
                  <div
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${p.accent}14`,
                      border: `1px solid ${p.accent}30`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: p.accent }} />
                  </div>

                  {/* Text */}
                  <div className="relative flex-1">
                    <h3
                      className="text-[15px] font-bold mb-2 leading-snug"
                      style={{ color: "var(--site-text)" }}
                    >
                      {t(p.titleKey)}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--site-text-muted)" }}
                    >
                      {t(p.descKey)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
