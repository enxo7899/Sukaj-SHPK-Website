"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, ChevronDown, Factory, Sprout, Users } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { company } from "@/lib/data";
import { PipeViewerSprite } from "@/components/hero/pipe-viewer-sprite";
import { resolvePreviewMode, type PreviewMode } from "@/lib/preview-capability";
import { useMediaQuery } from "@/lib/use-media-query";

const PipeViewer3D = dynamic(
  () => import("@/components/hero/pipe-viewer-3d").then((module) => module.PipeViewer3D),
  { ssr: false, loading: () => <PipeViewerSprite /> }
);

const dockItems = [
  { name: "CIVIL", href: "/catalog?category=civil", icon: Building2 },
  { name: "AGRI", href: "/catalog?category=agri", icon: Sprout },
  { name: "INDUSTRIAL", href: "/catalog?category=industrial", icon: Factory },
  { name: "ABOUT", href: "/about", icon: Users },
];

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [isReady, setIsReady] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("fallback-preview");
  const [runtimeState, setRuntimeState] = useState<"loading" | "3d" | "fallback">("fallback");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };

    const connection = nav.connection;
    const canvas = document.createElement("canvas");
    const hasWebGL = Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));

    const mode = resolvePreviewMode({
      isMobile,
      reduceMotion: Boolean(reduceMotion),
      hasWebGL,
      saveData: connection?.saveData,
      effectiveType: connection?.effectiveType,
      deviceMemory: nav.deviceMemory,
      hardwareConcurrency: nav.hardwareConcurrency,
    });

    setPreviewMode(mode);
  }, [isMobile, reduceMotion, isReady]);

  useEffect(() => {
    setRuntimeState(previewMode === "fallback-preview" ? "fallback" : "loading");
  }, [previewMode]);

  const stats = useMemo(
    () => [
      { value: `${company.stats.yearsExperience}+`, label: "YEARS" },
      { value: `${company.stats.countriesServed}`, label: "COUNTRIES" },
      { value: `${company.stats.projectsCompleted}+`, label: "PROJECTS" },
    ],
    []
  );

  const reveal = (delay: number) =>
    reduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: "easeOut" as const };

  const effectivePreviewPresentation =
    runtimeState === "fallback"
      ? { badge: "PREVIEW", hint: "Preview Mode", status: "RUNTIME: FALLBACK" }
      : runtimeState === "loading"
        ? { badge: "LOADING PREVIEW", hint: "Preparing 3D", status: "RUNTIME: LOADING" }
        : previewMode === "desktop-premium-3d"
          ? { badge: "3D PREVIEW", hint: "Drag to Inspect", status: "AUTO: PREMIUM" }
          : { badge: "LITE 3D PREVIEW", hint: isMobile ? "Tap to Inspect" : "Drag to Inspect", status: "AUTO: LITE" };

  return (
    <section className="relative h-[100svh] overflow-hidden">
      <div className="industrial-hero-bg absolute inset-0" />
      <motion.div
        className="absolute inset-0 grid-lines opacity-15"
        animate={reduceMotion ? undefined : { backgroundPositionX: [0, 72, 0], backgroundPositionY: [0, 48, 0] }}
        transition={reduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 dot-matrix opacity-15"
        animate={reduceMotion ? undefined : { opacity: [0.08, 0.2, 0.08] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-950 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-950/70 to-transparent" />

      <div className="relative z-10 site-shell flex h-full flex-col justify-between pb-8 pt-24 sm:pb-10 sm:pt-28 lg:pb-10 lg:pt-32">
        <div className="grid items-center gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
          <div className="space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reveal(0.02)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
              <span className="font-mono text-xs tracking-[0.2em] text-slate-300">SUKAJ SHPK • EST. {company.established}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reveal(0.08)}
              className="space-y-3"
            >
              <motion.h1
                className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[0.05em] text-white sm:text-6xl xl:text-7xl 2xl:text-[5.3rem]"
              >
                SUKAJ SHPK
              </motion.h1>
              <motion.h2
                className="max-w-4xl text-2xl font-semibold uppercase tracking-[0.16em] text-orange-400 sm:text-3xl xl:text-[2.2rem]"
              >
                Industrial Plastic Pipe Systems
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reveal(0.16)}
              className="space-y-3"
            >
              <p className="max-w-2xl font-mono text-xs uppercase tracking-[0.16em] text-slate-300 sm:text-sm">{company.tagline}</p>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                Sukaj SHPK delivers complete pipe-system supply for municipal drainage, agricultural irrigation, and industrial routing projects.
                We combine European manufacturing partnerships with local execution to shorten lead times and keep technical quality consistent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reveal(0.2)}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/catalog"
                className="inline-flex items-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold tracking-wide text-slate-950 transition-colors hover:bg-orange-400"
              >
                Explore Catalog
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/10"
              >
                Contact Sales
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reveal(0.24)}
              className="grid max-w-2xl gap-2 text-sm text-slate-300 sm:grid-cols-2"
            >
              <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Diameter Coverage: DN 20-2000</p>
              <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Execution Model: Import + Local Production Support</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reveal(0.28)}
              className="flex flex-wrap gap-2"
            >
              {[
                "Civil Infrastructure",
                "Agricultural Irrigation",
                "Industrial Conduits",
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-slate-200"
                >
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reveal(0.32)}
              className="grid max-w-xl grid-cols-3 gap-4 sm:gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-white sm:text-3xl">{stat.value}</div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-slate-400 sm:text-[11px]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal(0.36)}
            className="relative"
          >
            <div className="relative">
              <div className="pointer-events-none absolute -inset-x-14 -top-18 h-72 bg-[radial-gradient(circle_at_50%_48%,rgba(249,115,22,0.34),transparent_62%)]" />
              <div className="pointer-events-none absolute -bottom-14 left-2 right-2 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.24),transparent_70%)]" />
              <div className="pointer-events-none absolute inset-x-8 bottom-5 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-slate-400">PRODUCT VISUALIZER</p>
                  <p className="text-sm font-semibold text-white">HDPE/PVC Pipe Range</p>
                </div>
                <div className="text-right">
                <p className="font-mono text-xs tracking-[0.18em] text-cyan-300">{effectivePreviewPresentation.badge}</p>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-slate-400">{effectivePreviewPresentation.status}</p>
                </div>
              </div>
              <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-slate-900/40 to-slate-950/10 sm:h-[380px] lg:h-[430px]">
                {previewMode === "fallback-preview" ? (
                  <PipeViewerSprite />
                ) : (
                  <PipeViewer3D
                    key={previewMode}
                    previewMode={previewMode}
                    onRuntimeStateChange={setRuntimeState}
                  />
                )}
                <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-slate-200">
                  DN 20-2000
                </div>
                <div className="pointer-events-none absolute right-3 top-3 rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-slate-200">
                  HDPE / PVC
                </div>
                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-slate-200">
                  {effectivePreviewPresentation.hint}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reveal(0.46)}
          className="mt-6 flex flex-col items-center gap-4 lg:mt-7"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/15 bg-slate-900/65 p-3 backdrop-blur-xl">
            {dockItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.name} whileHover={{ y: -6, scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Link href={item.href} className="group flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg transition-colors group-hover:from-orange-500 group-hover:to-orange-600 sm:h-16 sm:w-16">
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <span className="mt-2 font-mono text-xs tracking-[0.22em] text-slate-300 sm:text-sm">{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <ChevronDown className="h-6 w-6 text-slate-400" />
        </motion.div>
      </div>
    </section>
  );
}
