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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 inset-x-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}60, transparent)`,
        }}
      />

      <div className="flex flex-col gap-4 p-5">
        {/* Header: Logo + name + country */}
        <div className="flex items-start gap-3.5">
          <div
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: `${accent}08`,
              border: `1px solid ${accent}20`,
            }}
          >
            {partner.logo.dark ? (
              <Image
                src={partner.logo.dark}
                alt={partner.name}
                width={36}
                height={36}
                className="h-7 w-auto object-contain opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span className="text-base font-black" style={{ color: accent }}>
                {partner.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white text-[13px] leading-snug">{partner.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="h-3 w-3 text-slate-600 shrink-0" />
              <span className="text-[11px] text-slate-500">{partner.country}</span>
            </div>
          </div>
          {/* Type pill */}
          <span
            className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[8px] tracking-[0.08em] uppercase"
            style={{
              backgroundColor: `${accent}10`,
              color: accent,
              border: `1px solid ${accent}20`,
            }}
          >
            {partnerTypeLabels[partner.partnerType]}
          </span>
        </div>

        {/* Specialty */}
        <p className="text-[12px] text-slate-400 leading-relaxed line-clamp-2">{partner.specialty}</p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-1.5">
          {partner.heroMetrics.slice(0, 3).map((m) => (
            <span
              key={m}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-[3px] font-mono text-[9px] tracking-wide text-slate-500"
            >
              {m}
            </span>
          ))}
          {partner.keyStandards.slice(0, 2).map((s) => (
            <span
              key={s}
              className="rounded-md border px-2 py-[3px] font-mono text-[9px] tracking-wide"
              style={{
                borderColor: `${accent}25`,
                backgroundColor: `${accent}08`,
                color: accent,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] px-5 py-3">
        <Link
          href={`/catalog?partner=${partner.id}`}
          className="group/link inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 transition-colors hover:text-cyan-400"
        >
          View products
          <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
        </Link>
        {isExternal && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-1.5 text-slate-600 transition-colors hover:border-white/20 hover:text-slate-300"
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
        <div className="mb-12 sm:mb-14 lg:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              Partner Network
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                className="font-black text-white leading-[1.05] tracking-tight mb-4 max-w-2xl"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                Strategic Partners{" "}
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
              <p className="text-slate-400 max-w-lg text-base leading-relaxed">
                12 manufacturing and processing partners — from Italy to Turkey —
                covering every pipe, hose, film, and packaging need.
              </p>
            </div>
            {/* Summary stats for desktop */}
            <div className="hidden lg:flex items-center gap-8 pb-1">
              {[
                { value: "12", label: "Partners" },
                { value: "7", label: "Countries" },
                { value: "5", label: "Sectors" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
        <div className="mb-8 sm:mb-10 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            const tabAccent =
              tab.id === ALL ? "#0891b2" : typeAccent[tab.id as PartnerType];
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
                style={{
                  color: isActive ? "#fff" : "#64748b",
                  backgroundColor: isActive ? `${tabAccent}15` : "transparent",
                  border: isActive
                    ? `1px solid ${tabAccent}35`
                    : "1px solid transparent",
                }}
              >
                {isActive && (
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: tabAccent }}
                  />
                )}
                <span className={isActive ? "ml-3" : ""}>{tab.label}</span>
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
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/[0.06] pt-10">
          <div>
            <p className="text-sm text-slate-400 mb-1">
              Explore our complete product range from all partners.
            </p>
            <p className="text-xs text-slate-600">
              Filter by material, application, or partner.
            </p>
          </div>
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-cyan-500 hover:-translate-y-px hover:shadow-lg hover:shadow-cyan-600/20"
          >
            Browse Full Catalog
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
