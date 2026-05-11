"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/data";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { FallingPipes } from "@/components/ui/falling-pipes";
import { useTranslation } from "@/lib/i18n/context";

export function HeroUltimate() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Desktop: parallax + fade for clean section separation
  // Mobile: no fade at all — the stacked layout means animation is below the fold
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, isMobile ? 1 : 0]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--site-bg)]"
    >
      {/* ─── Background ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundPaths />
        {/* Thin top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.4) 35%, rgba(8,145,178,0.6) 50%, rgba(34,211,238,0.4) 65%, transparent)",
          }}
        />
        {/* Vignette — dark only; hidden in light mode via opacity */}
        <div
          className="absolute inset-0 dark-only-vignette"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,6,23,0.7) 100%)",
          }}
        />
      </div>

      {/* ─── Content ─── */}
      <motion.div
        style={reduceMotion ? {} : { y, opacity }}
        className="relative z-10 site-shell py-28 sm:py-36 lg:py-40"
      >
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col order-1 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.div variants={item} className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-cyan-500/60" />
              <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                {t("hero.eyebrow")} {company.established}
              </span>
            </motion.div>

            {/* Logo */}
            <motion.div variants={item} className="mb-8">
              <div className="relative h-14 w-48 sm:h-16 sm:w-56 lg:h-20 lg:w-72">
                <Image
                  src="/media/hero/logo.png"
                  alt="Sukaj SH.P.K"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-black text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              {t("hero.headline1")}
              <br />
              <span
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundImage:
                    "linear-gradient(90deg, #22d3ee 0%, #0891b2 50%, #38bdf8 100%)",
                }}
              >
                {t("hero.headline2")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg leading-relaxed mb-12"
              style={{ color: "var(--site-text-muted)" }}
            >
              {t("hero.description")}&nbsp;
              <span className="font-medium" style={{ color: "var(--site-text)" }}>
                {company.stats.partnersCount} {t("hero.descriptionPartners")}
              </span>{" "}
              {t("hero.descriptionAcross")}&nbsp;
              <span className="font-medium" style={{ color: "var(--site-text)" }}>
                {company.stats.countriesServed} {t("hero.descriptionCountries")}
              </span>
              .
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12"
            >
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-cyan-500 hover:-translate-y-px hover:shadow-xl hover:shadow-cyan-700/30"
            >
              {t("hero.ctaCatalog")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-medium transition-all duration-200 hover:-translate-y-px"
              style={{ border: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}
            >
              {t("hero.ctaQuote")}
              <ArrowUpRight className="h-4 w-4 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-px group-hover:-translate-y-px" />
            </Link>
          </motion.div>

            {/* Standards strip */}
            <motion.div variants={item} className="w-full">
              <div
                className="h-px w-full mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                }}
              />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {["EN 13476","EN 12201","ISO 9001","PE100","HDPE","PP","PVC","SN4 / SN8"].map((s) => (
                  <span key={s} className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--site-text-soft)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Animated Pipes */}
          <div className="relative w-full order-2 lg:order-2">
            <FallingPipes />
          </div>
        </div>
      </motion.div>

      {/* ─── Scroll hint ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full pt-1.5"
          style={{ border: "1px solid var(--site-border)" }}
        >
          <div className="h-1.5 w-1 rounded-full bg-cyan-400/50" />
        </motion.div>
      </motion.div>

      {/* ─── Bottom fade ─── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 theme-hero-bottom-fade" />
    </section>
  );
}
