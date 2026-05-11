"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { partners, type PartnerType } from "@/lib/data";
import { Marquee } from "@/components/ui/marquee";
import { useTranslation } from "@/lib/i18n/context";

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
  return (
    <div
      className="logo-card group flex h-[68px] w-52 shrink-0 items-center justify-center rounded-2xl px-5 mx-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
      style={{
        border: "1px solid var(--site-border)",
        backgroundColor: "var(--site-surface-strong)",
      }}
      title={partner.name}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      {/* Dark-mode variant (white text logos) */}
      <Image
        src={partner.logo.dark!}
        alt={partner.name}
        width={120}
        height={36}
        className="logo-dark-variant h-8 w-auto max-w-[120px] object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-90"
      />
      {/* Light-mode variant (dark text logos) */}
      {partner.logo.light && (
        <Image
          src={partner.logo.light}
          alt={partner.name}
          width={120}
          height={36}
          className="logo-light-variant h-8 w-auto max-w-[120px] object-contain opacity-65 transition-opacity duration-300 group-hover:opacity-100"
        />
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
  const { t } = useTranslation();
  const typeLabel: Record<PartnerType, string> = {
    manufacturer: t("partners.typeManufacturer"),
    recycler: t("partners.typeRecycler"),
    packaging: t("partners.typePackaging"),
    hoses: t("partners.typeHoses"),
    "local-albania": t("partners.typeLocalAlbania"),
  };
  const accent = typeAccent[partner.partnerType];
  const isExternal = partner.website.startsWith("http");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl transition-all duration-300"
      style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}
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
              backgroundColor: `${accent}12`,
              border: `1px solid ${accent}25`,
            }}
          >
            {partner.logo.dark ? (
              <>
                <Image
                  src={partner.logo.dark}
                  alt={partner.name}
                  width={32}
                  height={32}
                  className="logo-dark-variant h-6 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100"
                />
                {partner.logo.light && (
                  <Image
                    src={partner.logo.light}
                    alt={partner.name}
                    width={32}
                    height={32}
                    className="logo-light-variant h-6 w-auto object-contain opacity-75 transition-opacity group-hover:opacity-100"
                  />
                )}
              </>
            ) : (
              <span className="text-base font-black" style={{ color: accent }}>
                {partner.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[13px] leading-snug" style={{ color: "var(--site-text)" }}>{partner.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="h-3 w-3 shrink-0" style={{ color: "var(--site-text-soft)" }} />
              <span className="text-[11px]" style={{ color: "var(--site-text-soft)" }}>{partner.country}</span>
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
            {typeLabel[partner.partnerType]}
          </span>
        </div>

        {/* Specialty */}
        <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--site-text-muted)" }}>{partner.specialty}</p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-1.5">
          {partner.heroMetrics.slice(0, 3).map((m) => (
            <span
              key={m}
              className="rounded-md px-2 py-[3px] font-mono text-[9px] tracking-wide"
              style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-soft)" }}
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
      <div className="mt-auto flex items-center justify-between px-5 py-3" style={{ borderTop: "1px solid var(--site-border)" }}>
        <Link
          href={`/catalog?partner=${partner.id}`}
          className="group/link inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors hover:text-cyan-400"
          style={{ color: "var(--site-text-soft)" }}
        >
          {t("catalog.viewDetails")}
          <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
        </Link>
        {isExternal && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 transition-colors hover:text-cyan-400"
            style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-soft)" }}
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
  const { t } = useTranslation();
  const typeLabel: Record<PartnerType, string> = {
    manufacturer: t("partners.typeManufacturer"),
    recycler: t("partners.typeRecycler"),
    packaging: t("partners.typePackaging"),
    hoses: t("partners.typeHoses"),
    "local-albania": t("partners.typeLocalAlbania"),
  };
  const [active, setActive] = useState<Filter>(ALL);
  const [isPaused, setIsPaused] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  const tabs: { id: Filter; label: string }[] = [
    { id: ALL, label: t("partners.allPartners") },
    ...typeOrder.map((pt) => ({ id: pt, label: typeLabel[pt] })),
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
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32 bg-[var(--site-bg)]">
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
              {t("partners.eyebrow")}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                className="font-black leading-[1.05] tracking-tight mb-4 max-w-2xl"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "var(--site-text)" }}
              >
                {t("partners.title")}
              </h2>
              <p className="max-w-lg text-base leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
                {t("partners.subtitle")}
              </p>
            </div>
            {/* Summary stats for desktop */}
            <div className="hidden lg:flex items-center gap-8 pb-1">
              {[
                { value: "12", label: t("partners.statsPartners") },
                { value: "7", label: t("partners.statsCountries") },
                { value: "5", label: t("partners.statsSectors") },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black" style={{ color: "var(--site-text)" }}>{stat.value}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--site-text-soft)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Marquee logo strip ─── */}
        <div className="relative mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 theme-marquee-fade-left" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 theme-marquee-fade-right" />
          <Marquee duration={55} isPaused={isPaused} className="py-3">
            {logoPartners.map((p) => (
              <LogoCard key={p.id} partner={p} onHoverChange={setIsPaused} />
            ))}
          </Marquee>
          <Marquee duration={65} reverse isPaused={isPaused} className="py-3">
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
                  color: isActive ? tabAccent : "var(--site-text-soft)",
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
                      <span className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--site-text-soft)" }}>
                        {typeLabel[type]}
                      </span>
                      <div className="flex-1 h-px" style={{ backgroundColor: "var(--site-border)" }} />
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
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10" style={{ borderTop: "1px solid var(--site-border)" }}>
          <div>
            <p className="text-sm mb-1" style={{ color: "var(--site-text-muted)" }}>
              {t("catalog.pageSubtitle")}
            </p>
          </div>
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-cyan-500 hover:-translate-y-px hover:shadow-lg hover:shadow-cyan-600/20"
          >
            {t("hero.ctaCatalog")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
