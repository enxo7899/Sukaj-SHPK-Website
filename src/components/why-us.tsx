"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe2, Truck, Handshake } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function WhyUs() {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: ShieldCheck,
      title: t("whyUs.p2Title"),
      description: t("whyUs.p2Desc"),
      accent: "#0891b2",
    },
    {
      icon: Globe2,
      title: t("whyUs.p3Title"),
      description: t("whyUs.p3Desc"),
      accent: "#0ea5e9",
    },
    {
      icon: Handshake,
      title: t("whyUs.p1Title"),
      description: t("whyUs.p1Desc"),
      accent: "#06b6d4",
    },
    {
      icon: Truck,
      title: t("whyUs.p4Title"),
      description: t("whyUs.p4Desc"),
      accent: "#22d3ee",
    },
  ];
  return (
    <section className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden">
      {/* Subtle background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(8,145,178,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="site-shell relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              {t("whyUs.eyebrow")}
            </span>
          </div>
          <h2
            className="font-black text-white leading-[1.05] tracking-tight max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {t("whyUs.title")}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col gap-5 bg-[#020617] p-8 hover:bg-slate-900/60 transition-colors duration-300"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${p.accent}80, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `${p.accent}30`,
                    backgroundColor: `${p.accent}10`,
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: p.accent }} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Number label */}
                <span
                  className="mt-auto font-mono text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: `${p.accent}60` }}
                >
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
