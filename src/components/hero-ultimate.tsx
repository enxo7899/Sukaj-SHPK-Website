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

// Easing that feels weighty and confident
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function HeroUltimate() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, isMobile ? 1 : 0]);

  // ── Stagger container
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };

  // ── Individual line/word reveal (clip from below)
  const lineReveal: Variants = {
    hidden: { y: "105%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.75, ease: EASE_OUT_EXPO },
    },
  };

  // ── Softer fade for body copy / CTAs
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
  };

  // ── Badge stagger for standards strip
  const badgeContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 0 } },
  };
  const badgeItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const standards = ["EN 13476","EN 12201","ISO 9001","PE100","HDPE","PP","PVC","SN4 / SN8"];

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--site-bg)]"
    >
      {/* ─── Animated background orbs ─── */}
      {mounted && !reduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute"
            style={{
              width: "70vw",
              height: "70vw",
              maxWidth: 900,
              maxHeight: 900,
              top: "-20%",
              left: "-15%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(8,145,178,0.09) 0%, transparent 65%)",
            }}
            animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.06, 0.97, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute"
            style={{
              width: "60vw",
              height: "60vw",
              maxWidth: 760,
              maxHeight: 760,
              bottom: "-10%",
              right: "-10%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)",
            }}
            animate={{ x: [0, -25, 12, 0], y: [0, 18, -8, 0], scale: [1, 0.94, 1.05, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
          {/* Centre spotlight */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(8,145,178,0.05) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* ─── Background paths (SVG) ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundPaths />
        {/* Top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.45) 35%, rgba(8,145,178,0.65) 50%, rgba(34,211,238,0.45) 65%, transparent)",
          }}
        />
        {/* Vignette – dark mode only */}
        <div
          className="absolute inset-0 dark-only-vignette"
          style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,6,23,0.7) 100%)" }}
        />
      </div>

      {/* ─── Content ─── */}
      <motion.div
        style={reduceMotion ? {} : { y, opacity }}
        className="relative z-10 site-shell py-28 sm:py-36 lg:py-40"
      >
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-12 xl:gap-16 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col order-1 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <motion.div
                className="h-px bg-cyan-500/60"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
              />
              <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                {t("hero.eyebrow")} {company.established}
              </span>
            </motion.div>

            {/* Logo */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="relative h-14 w-44 sm:h-16 sm:w-56 lg:h-20 lg:w-72">
                <Image
                  src="/media/hero/logo.png"
                  alt="Sukaj SH.P.K"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </motion.div>

            {/* Headline — each line clips up from below */}
            <div className="mb-6">
              <div className="overflow-hidden">
                <motion.h1
                  variants={lineReveal}
                  className="font-black leading-[1.05] tracking-tight"
                  style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", color: "var(--site-text)" }}
                >
                  {t("hero.headline1")}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  variants={lineReveal}
                  className="block font-black leading-[1.05] tracking-tight"
                  style={{
                    fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(90deg, #22d3ee 0%, #0891b2 50%, #38bdf8 100%)",
                  }}
                >
                  {t("hero.headline2")}
                </motion.span>
              </div>
            </div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: "var(--site-text-muted)" }}
            >
              {t("hero.description")}&nbsp;
              <span className="font-semibold" style={{ color: "var(--site-text)" }}>
                {company.stats.partnersCount} {t("hero.descriptionPartners")}
              </span>{" "}
              {t("hero.descriptionAcross")}&nbsp;
              <span className="font-semibold" style={{ color: "var(--site-text)" }}>
                {company.stats.countriesServed} {t("hero.descriptionCountries")}
              </span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12"
            >
              <Link
                href="/catalog"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-cyan-600 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-cyan-500 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-600/30"
              >
                {/* Shimmer sweep */}
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                />
                {t("hero.ctaCatalog")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}
              >
                {t("hero.ctaQuote")}
                <ArrowUpRight className="h-4 w-4 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>

            {/* Standards strip — staggered badges */}
            <motion.div variants={fadeUp} className="w-full">
              <div
                className="h-px w-full mb-5"
                style={{ background: "linear-gradient(90deg, var(--site-border) 0%, transparent 100%)" }}
              />
              <motion.div
                variants={badgeContainer}
                initial="hidden"
                animate="show"
                className="flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                {standards.map((s) => (
                  <motion.span
                    key={s}
                    variants={badgeItem}
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: "var(--site-text-soft)" }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right: Animated Pipes ── */}
          <div className="relative w-full order-2 lg:order-2">
            <FallingPipes />
          </div>
        </div>
      </motion.div>

      {/* ─── Scroll hint ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-5 items-start justify-center rounded-full pt-2"
            style={{ border: "1px solid var(--site-border)" }}
          >
            <motion.div
              animate={reduceMotion ? {} : { opacity: [1, 0, 1], y: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full"
              style={{ backgroundColor: "rgba(8,145,178,0.6)" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Bottom fade ─── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 theme-hero-bottom-fade" />
    </section>
  );
}
