"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { partners, partnerTypeLabels, type PartnerType } from "@/lib/data";
import { Marquee } from "@/components/ui/marquee";

const typeOrder: PartnerType[] = [
  "manufacturer",
  "local-albania",
  "hoses",
  "recycler",
  "packaging",
];

const typeAccent: Record<PartnerType, string> = {
  manufacturer: "#0891b2",
  "local-albania": "#22d3ee",
  hoses: "#f59e0b",
  recycler: "#22c55e",
  packaging: "#3b82f6",
};

const ALL = "all";

type Filter = PartnerType | typeof ALL;

const logoPartners = partners.filter((p) => p.logo.dark);

function LogoCard({ partner, onHoverChange }: { partner: (typeof partners)[0]; onHoverChange?: (isHovered: boolean) => void }) {
  const accent = typeAccent[partner.partnerType];
  return (
    <div
      className="group flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 mx-2 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
      title={partner.name}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      {partner.logo.dark ? (
        <Image
          src={partner.logo.dark}
          alt={partner.name}
          width={100}
          height={36}
          className="h-7 w-auto object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-90 group-hover:grayscale-0"
        />
      ) : (
        <span
          className="font-mono text-xs font-bold tracking-wider"
          style={{ color: `${accent}80` }}
        >
          {partner.name.slice(0, 8)}
        </span>
      )}
    </div>
  );
}

function PartnerCard({
  partner,
  index,
  inView,
}: {
  partner: (typeof partners)[0];
  index: number;
  inView: boolean;
}) {
  const accent = typeAccent[partner.partnerType];
  const isExternal = partner.website.startsWith("http");
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] hover:-translate-y-0.5 hover:shadow-xl"
      style={{
        boxShadow: "0 0 0 0 transparent",
      }}
      whileHover={{
        boxShadow: `0 8px 32px -8px ${accent}22, 0 0 0 1px ${accent}18`,
      }}
    >
      {/* Glow top accent */}
      <div
        className="absolute top-0 inset-x-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 10%, ${accent}80 50%, transparent 90%)`,
        }}
      />

      {/* Type badge top-right */}
      <div
        className="absolute top-4 right-4 rounded-full px-2 py-0.5 font-mono text-[9px] tracking-widest uppercase"
        style={{
          backgroundColor: `${accent}15`,
          color: `${accent}`,
          border: `1px solid ${accent}25`,
        }}
      >
        {partnerTypeLabels[partner.partnerType]}
      </div>

      {/* Logo / avatar */}
      <div className="flex items-start gap-3 pr-20">
        <div
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden"
          style={{
            backgroundColor: `${accent}12`,
            border: `1px solid ${accent}28`,
          }}
        >
          {partner.logo.dark ? (
            <Image
              src={partner.logo.dark}
              alt={partner.name}
              width={40}
              height={40}
              className="h-8 w-auto object-contain opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
            />
          ) : (
            <span className="text-lg font-black" style={{ color: accent }}>
              {partner.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-white text-sm leading-snug">{partner.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3 text-slate-500 shrink-0" />
            <span className="text-xs font-mono text-slate-500">{partner.country}</span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{partner.tagline}</p>

      {/* Metric chips */}
      <div className="flex flex-wrap gap-1.5">
        {partner.heroMetrics.slice(0, 3).map((m) => (
          <span
            key={m}
            className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] tracking-wider text-slate-400"
          >
            {m}
          </span>
        ))}
        {partner.keyStandards.slice(0, 2).map((s) => (
          <span
            key={s}
            className="rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-wider"
            style={{
              borderColor: `${accent}30`,
              backgroundColor: `${accent}10`,
              color: accent,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Footer row */}
      <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3">
        <Link
          href={`/catalog?partner=${partner.id}`}
          className="group/link inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-cyan-400"
        >
          View products
          <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
        </Link>
        {isExternal && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-500 transition-colors hover:border-white/25 hover:text-white"
            aria-label={`Visit ${partner.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function PartnersSection() {
  const [active, setActive] = useState<Filter>(ALL);
  const [isPaused, setIsPaused] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  const tabs: { id: Filter; label: string }[] = [
    { id: ALL, label: "All Partners" },
    ...typeOrder.map((t) => ({ id: t, label: partnerTypeLabels[t] })),
  ];

  const visible =
    active === ALL ? partners : partners.filter((p) => p.partnerType === active);

  const grouped = typeOrder.reduce<Record<string, typeof partners>>(
    (acc, type) => {
      const group =
        active === ALL
          ? partners.filter((p) => p.partnerType === type)
          : partners.filter((p) => p.partnerType === type && p.partnerType === active);
      if (group.length > 0) acc[type] = group;
      return acc;
    },
    {}
  );

  const displayGroups =
    active === ALL
      ? (Object.entries(grouped) as [PartnerType, typeof partners][])
      : ([[active, visible]] as [PartnerType, typeof partners][]);

  let cardIndex = 0;

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32 bg-[#020617]">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(8,145,178,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="site-shell relative">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              Partner Ecosystem
            </span>
          </div>
          <h2
            className="font-black text-white leading-[1.05] tracking-tight mb-4 max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Strategic Partners
            <br />
            <span
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(90deg, #22d3ee 0%, #0891b2 60%)",
              }}
            >
              across 7 countries.
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl text-base leading-relaxed">
            12 manufacturing and processing partners — from Italy to Turkey —
            covering every pipe, hose, film, and packaging need.
          </p>
        </div>

        {/* ─── Marquee logo strip ─── */}
        <div className="relative mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10" style={{ background: "linear-gradient(90deg, #020617, transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10" style={{ background: "linear-gradient(270deg, #020617, transparent)" }} />
          <Marquee duration={60} isPaused={isPaused} className="py-2.5">
            {logoPartners.map((p) => (
              <LogoCard key={p.id} partner={p} onHoverChange={setIsPaused} />
            ))}
          </Marquee>
          <Marquee duration={70} reverse isPaused={isPaused} className="py-2.5">
            {[...logoPartners].reverse().map((p) => (
              <LogoCard key={p.id} partner={p} onHoverChange={setIsPaused} />
            ))}
          </Marquee>
        </div>

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            const accent =
              tab.id === ALL ? "#0891b2" : typeAccent[tab.id as PartnerType];
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive ? "#fff" : "#64748b",
                  backgroundColor: isActive ? `${accent}18` : "transparent",
                  border: isActive
                    ? `1px solid ${accent}40`
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ border: `1px solid ${accent}40` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Partner cards */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {displayGroups.map(([type, group]) => (
                <div key={type}>
                  {active === ALL && (
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: typeAccent[type] }}
                      />
                      <span className="font-mono text-[11px] tracking-[0.22em] text-slate-500 uppercase">
                        {partnerTypeLabels[type]}
                      </span>
                      <div className="flex-1 h-px bg-white/[0.05]" />
                    </div>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {group.map((partner) => {
                      const ci = cardIndex++;
                      return (
                        <PartnerCard
                          key={partner.id}
                          partner={partner}
                          index={ci}
                          inView={inView}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex items-center gap-4 border-t border-white/[0.06] pt-10">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cyan-500"
          >
            Browse catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
