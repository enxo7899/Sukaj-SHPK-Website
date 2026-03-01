"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/data";
import { BackgroundPaths } from "@/components/ui/background-paths";

export function HeroUltimate() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617]"
    >
      {/* ─── Background ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundPaths />
        {/* Aurora blob 1 — top-left, slow drift */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 800,
            height: 800,
            top: "-20%",
            left: "-10%",
            background:
              "radial-gradient(ellipse at center, rgba(8,145,178,0.11) 0%, rgba(6,182,212,0.05) 45%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={reduceMotion ? {} : {
            x: [0, 60, 20, -30, 0],
            y: [0, 40, -20, 30, 0],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Aurora blob 2 — center-right */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 600,
            top: "10%",
            right: "-15%",
            background:
              "radial-gradient(ellipse at center, rgba(14,165,233,0.08) 0%, rgba(8,145,178,0.04) 50%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={reduceMotion ? {} : {
            x: [0, -50, -20, 40, 0],
            y: [0, 60, 20, -40, 0],
          }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        {/* Aurora blob 3 — bottom-center */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 900,
            height: 500,
            bottom: "0%",
            left: "20%",
            background:
              "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, rgba(8,145,178,0.03) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={reduceMotion ? {} : {
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -10, 0],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        />
        {/* Fine dot grid — masked to center */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(148,163,184,0.09) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 75% at 50% 40%, black 20%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 75% 75% at 50% 40%, black 20%, transparent 100%)",
          }}
        />
        {/* Thin top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.4) 35%, rgba(8,145,178,0.6) 50%, rgba(34,211,238,0.4) 65%, transparent)",
          }}
        />
        {/* Subtle vignette to darken edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,6,23,0.7) 100%)",
          }}
        />
      </div>

      {/* ─── Content ─── */}
      <motion.div
        style={reduceMotion ? {} : { y, opacity }}
        className="relative z-10 site-shell flex flex-col items-center text-center py-28 sm:py-36 lg:py-40"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-10">
            <div className="h-px w-6 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              Shkodër, Albania — Est. {company.established}
            </span>
            <div className="h-px w-6 bg-cyan-500/60" />
          </motion.div>

          {/* Logo */}
          <motion.div variants={item} className="mb-8 sm:mb-10">
            <div className="relative h-16 w-56 sm:h-20 sm:w-72 lg:h-24 lg:w-96">
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
            className="font-black text-white leading-[1.05] tracking-tight mb-6 max-w-4xl"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
          >
            Industrial Pipe Systems
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
              for the Balkans.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mb-12"
          >
            We import and wholesale HDPE, PP and PVC pipe systems —
            sewage, drainage, irrigation and industrial — partnering
            with&nbsp;
            <span className="text-slate-200 font-medium">
              {company.stats.partnersCount} European manufacturers
            </span>{" "}
            to serve contractors and municipalities across&nbsp;
            <span className="text-slate-200 font-medium">
              {company.stats.countriesServed} countries
            </span>
            .
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-cyan-500 hover:-translate-y-px hover:shadow-xl hover:shadow-cyan-700/30"
            >
              Explore Catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-8 py-4 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/30 hover:text-white hover:-translate-y-px"
            >
              Request a Quote
              <ArrowUpRight className="h-4 w-4 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-px group-hover:-translate-y-px" />
            </Link>
          </motion.div>

          {/* Standards strip */}
          <motion.div variants={item} className="w-full max-w-2xl">
            <div
              className="h-px w-full mb-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
              }}
            />
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {["EN 13476","EN 12201","ISO 9001","PE100","HDPE","PP","PVC","SN4 / SN8"].map((s) => (
                <span key={s} className="font-mono text-[10px] tracking-[0.18em] text-slate-600 uppercase">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
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
          className="flex h-8 w-5 items-start justify-center rounded-full border border-white/15 pt-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-cyan-400/50" />
        </motion.div>
      </motion.div>

      {/* ─── Bottom fade ─── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}
