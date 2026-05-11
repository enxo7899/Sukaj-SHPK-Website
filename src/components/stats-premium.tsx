"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { company } from "@/lib/data";
import { useTranslation } from "@/lib/i18n/context";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 80 });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current)
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsPremium() {
  const { t } = useTranslation();
  const stats = [
    {
      value: company.stats.yearsExperience,
      suffix: "+",
      label: t("stats.yearsLabel"),
      detail: `Est. ${company.established}`,
    },
    {
      value: company.stats.countriesServed,
      suffix: "",
      label: t("stats.countriesLabel"),
      detail: t("stats.eyebrow"),
    },
    {
      value: company.stats.partnersCount,
      suffix: "",
      label: t("stats.partnersLabel"),
      detail: "EU + Balkan",
    },
    {
      value: company.stats.projectsCompleted,
      suffix: "+",
      label: t("stats.projectsLabel"),
      detail: "Infrastructure",
    },
  ];
  return (
    <section className="relative bg-[var(--site-bg)]" style={{ borderTop: "1px solid var(--site-border)", borderBottom: "1px solid var(--site-border)" }}>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(8,145,178,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="site-shell relative">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-12 px-6 text-center"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid var(--site-border)" : undefined,
                borderBottom: i < 2 ? "1px solid var(--site-border)" : undefined,
              }}
            >
              <span className="text-4xl sm:text-5xl font-black mb-2 tabular-nums" style={{ color: "var(--site-text)" }}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm font-semibold mb-1" style={{ color: "var(--site-text-muted)" }}>{stat.label}</span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "var(--site-text-soft)" }}>{stat.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
