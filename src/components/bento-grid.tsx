"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { partners, type Partner } from "@/lib/data";

const tileLayout: Record<number, string> = {
  1: "md:col-span-2 md:row-span-2",
  2: "md:col-span-2 md:row-span-1",
  3: "md:col-span-1 md:row-span-1",
  4: "md:col-span-1 md:row-span-2",
  5: "md:col-span-1 md:row-span-1",
  6: "md:col-span-1 md:row-span-1",
};

function PartnerLogo({
  partner,
  size = 48,
}: {
  partner: Partner;
  size?: number;
}) {
  const [imageError, setImageError] = useState(false);
  const logoSrc = partner.logo?.dark;

  if (!logoSrc || imageError) {
    return (
      <div
        className="flex items-center justify-center rounded-lg font-black text-white text-lg"
        style={{
          width: size,
          height: size,
          backgroundColor: partner.color,
          minWidth: size,
        }}
      >
        {partner.name.charAt(0)}
      </div>
    );
  }

  return (
    <Image
      src={logoSrc}
      alt={`${partner.name} logo`}
      width={size * 2}
      height={size}
      className="object-contain"
      style={{ maxWidth: size * 2, height: size }}
      onError={() => setImageError(true)}
      unoptimized
    />
  );
}

function PartnerCard({
  partner,
  layout,
  dimmed,
  onHover,
  onClick,
}: {
  partner: Partner;
  layout: string;
  dimmed: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  const isLarge = layout.includes("row-span-2") || layout.includes("col-span-2");

  return (
    <motion.button
      onMouseEnter={onHover}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/95 p-5 text-left transition-all focus-visible:ring-2 focus-visible:ring-orange-400 ${layout}`}
      style={{ opacity: dimmed ? 0.4 : 1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div
        className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${partner.color}40, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.08),transparent_50%)]" />
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: partner.color }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex items-start gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5"
              style={{ borderColor: `${partner.color}30` }}
            >
              <PartnerLogo partner={partner} size={32} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold leading-tight text-white">{partner.name}</h3>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <MapPin className="h-3 w-3 shrink-0" />
                <span>{partner.country}</span>
              </div>
            </div>
          </div>

          {isLarge && (
            <p className="mb-3 text-sm leading-relaxed text-slate-300 line-clamp-3">
              {partner.description}
            </p>
          )}

          <p className="text-xs leading-relaxed text-slate-400 line-clamp-2">
            {partner.tagline}
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {partner.heroMetrics.slice(0, isLarge ? 3 : 2).map((m) => (
              <span
                key={m}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] tracking-wider text-slate-200"
              >
                {m}
              </span>
            ))}
          </div>

          {partner.keyStandards.length > 0 && isLarge && (
            <div className="flex flex-wrap gap-1.5">
              {partner.keyStandards.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] tracking-wider text-cyan-300"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[10px] tracking-[0.12em]"
              style={{ color: partner.color }}
            >
              {partner.specialty.length > (isLarge ? 50 : 35)
                ? partner.specialty.slice(0, isLarge ? 47 : 32) + "…"
                : partner.specialty}
            </span>
            <ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-white" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function MobileCarousel({
  partners,
  onSelect,
}: {
  partners: Partner[];
  onSelect: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth * 0.85;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative md:hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1"
      >
        {partners.map((partner) => (
          <button
            key={`mobile-${partner.id}`}
            onClick={() => onSelect(partner.id)}
            className="min-w-[85%] snap-center rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950 p-5 text-left transition-all active:scale-[0.98]"
          >
            <div className="mb-4 flex items-start gap-3">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5"
                style={{ borderColor: `${partner.color}30` }}
              >
                <PartnerLogo partner={partner} size={40} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold text-white">{partner.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <MapPin className="h-3.5 w-3.5" />
                  {partner.country}
                </div>
              </div>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-slate-300 line-clamp-3">
              {partner.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {partner.heroMetrics.slice(0, 3).map((m) => (
                <span
                  key={m}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs tracking-wider text-slate-200"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span
                className="font-mono text-xs tracking-wide"
                style={{ color: partner.color }}
              >
                View Details
              </span>
              <ArrowUpRight className="h-5 w-5 text-slate-400" />
            </div>
          </button>
        ))}
      </div>

      {(canScrollLeft || canScrollRight) && (
        <div className="flex justify-center gap-3 mt-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="rounded-full border border-white/20 bg-slate-900/80 p-2 text-white transition-opacity disabled:opacity-30"
            aria-label="Previous partner"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="rounded-full border border-white/20 bg-slate-900/80 p-2 text-white transition-opacity disabled:opacity-30"
            aria-label="Next partner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function LogoMarquee({ partners }: { partners: Partner[] }) {
  const reduceMotion = useReducedMotion();
  const duplicated = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <motion.div
        className="flex gap-8"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 30,
                ease: "linear",
                repeat: Infinity,
              }
        }
      >
        {duplicated.map((partner, idx) => (
          <Link
            key={`marquee-${partner.id}-${idx}`}
            href={`/partners#${partner.id}`}
            className="group flex shrink-0 items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 transition-all hover:border-white/15 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5"
              style={{ borderColor: `${partner.color}20` }}
            >
              <PartnerLogo partner={partner} size={24} />
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-medium text-slate-300 group-hover:text-white whitespace-nowrap">
                {partner.name}
              </span>
              <span className="block text-[10px] text-slate-500 whitespace-nowrap">
                {partner.country}
              </span>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

function PartnerModal({
  partner,
  onClose,
}: {
  partner: Partner | null;
  onClose: () => void;
}) {
  if (!partner) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/5"
              style={{ borderColor: `${partner.color}30` }}
            >
              <PartnerLogo partner={partner} size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">{partner.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                {partner.country}
                {partner.website && (
                  <>
                    <span className="text-slate-600">·</span>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                    >
                      Website <ExternalLink className="h-3 w-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-slate-300">
          {partner.description}
        </p>

        {partner.keyStandards.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {partner.keyStandards.map((s) => (
              <span
                key={s}
                className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-cyan-300"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {partner.products.map((product) => (
            <div
              key={product.name}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/[0.08]"
            >
              <div className="font-bold text-white">{product.name}</div>
              <div className="text-sm text-slate-400">{product.type}</div>
              {product.diameters !== "N/A" && (
                <div className="mt-1 font-mono text-xs tracking-wider text-orange-300">
                  Ø {product.diameters}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/partners#${partner.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            Full Profile <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/catalog?partner=${partner.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-orange-400 focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            View Products
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BentoGrid() {
  const featured = partners
    .filter((p) => p.featured)
    .sort((a, b) => a.featuredPriority - b.featuredPriority)
    .slice(0, 6);
  const remaining = partners.filter((p) => !p.featured);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const selectedPartner = expandedId
    ? partners.find((p) => p.id === expandedId) ?? null
    : null;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950" />
      <div className="absolute inset-0 noise" />

      <div className="site-shell relative">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs tracking-[0.2em] text-slate-300">
            PARTNER ECOSYSTEM
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-[0.14em] text-white md:text-6xl">
            STRATEGIC PARTNERS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            12 manufacturing partners across 7 countries — producing pipes,
            hoses, films, and packaging for every infrastructure need.
          </p>
        </div>

        {/* Desktop Bento Grid */}
        <div
          className="hidden gap-4 md:grid md:auto-rows-[220px] md:grid-cols-4"
          onMouseLeave={() => setHoveredId(null)}
        >
          {featured.map((partner, idx) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              layout={tileLayout[idx + 1] ?? "md:col-span-1"}
              dimmed={Boolean(hoveredId && hoveredId !== partner.id)}
              onHover={() => setHoveredId(partner.id)}
              onClick={() => setExpandedId(partner.id)}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel
          partners={featured}
          onSelect={(id) => setExpandedId(id)}
        />

        {/* Extended Network - Logo Marquee */}
        {remaining.length > 0 && (
          <div className="mt-16">
            <p className="mb-6 text-center font-mono text-xs tracking-[0.2em] text-slate-500">
              EXTENDED NETWORK
            </p>
            <LogoMarquee partners={remaining} />
          </div>
        )}

        {/* Partner Detail Modal */}
        <AnimatePresence>
          {expandedId && (
            <PartnerModal
              partner={selectedPartner}
              onClose={() => setExpandedId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
