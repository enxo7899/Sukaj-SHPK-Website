"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  AlertCircle,
  Building2,
  Sprout,
  Factory,
  Layers,
  CheckCircle2,
  Clock,
  Package,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { productGroups, type ProductGroup } from "@/lib/products-data";
import { partners, categories } from "@/lib/data";
import { Slider } from "@/components/ui/slider";
import {
  materialFamilies,
  applicationFamilies,
  quickFilters,
  getMaterialFamily,
  getApplicationFamily,
  matchesMaterialFamily,
  matchesApplicationFamily,
} from "@/lib/catalog-filters";
import { useTranslation } from "@/lib/i18n/context";

// ─── Constants ────────────────────────────────────────────────────────────────

const categoryIcons: Record<string, React.FC<{ className?: string }>> = {
  civil: Building2,
  agri: Sprout,
  industrial: Factory,
};

const categoryColors: Record<string, string> = {
  civil: "#0891b2",
  agri: "#22c55e",
  industrial: "#22d3ee",
};

const categoryLabels: Record<string, string> = {
  civil: "Civil",
  agri: "Agriculture",
  industrial: "Industrial",
};

// Mapping of filter family IDs to translation keys (kept here to avoid
// re-exporting from the data-only catalog-filters lib).
const materialFamilyTranslationKeys: Record<string, string> = {
  "pe-hdpe": "catalog.matPeHdpe",
  pp: "catalog.matPp",
  pvc: "catalog.matPvc",
  rubber: "catalog.matRubber",
  other: "catalog.matOther",
};

const applicationFamilyTranslationKeys: Record<string, string> = {
  "water-pressure": "catalog.appWaterPressure",
  "sewage-drainage": "catalog.appSewageDrainage",
  irrigation: "catalog.appIrrigation",
  "cable-telecom": "catalog.appCableTelecom",
  "storage-tanks": "catalog.appStorageTanks",
  "industrial-transfer": "catalog.appIndustrialTransfer",
  "packaging-construction": "catalog.appPackagingConstruction",
  "outdoor-decor": "catalog.appOutdoorDecor",
  gas: "catalog.appGas",
  fittings: "catalog.appFittings",
  "other-app": "catalog.appOther",
};

const quickFilterTranslationKeys: Record<string, string> = {
  "in-stock": "catalog.qfInStock",
  civil: "catalog.qfCivil",
  agriculture: "catalog.qfAgriculture",
  industrial: "catalog.qfIndustrial",
  "large-diameter": "catalog.qfLargeDiameter",
  pressure: "catalog.qfPressureSystems",
};

const categoryTranslationKeys: Record<string, string> = {
  civil: "catalog.qfCivil",
  agri: "catalog.qfAgriculture",
  industrial: "catalog.qfIndustrial",
};

const availBadge = {
  "in-stock": {
    label: "In Stock",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.28)",
    Icon: CheckCircle2,
  },
  partial: {
    label: "Partial",
    color: "#facc15",
    bg: "rgba(250,204,21,0.12)",
    border: "rgba(250,204,21,0.28)",
    Icon: Clock,
  },
  "on-order": {
    label: "On Order",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.28)",
    Icon: Package,
  },
} as const;

type SortKey = "relevant" | "suppliers-desc" | "dia-asc" | "dia-desc";

interface FilterState {
  search: string;
  /** Material family IDs (e.g. "pe-hdpe") */
  materialFamilies: string[];
  /** Application family IDs */
  applicationFamilies: string[];
  /** Quick filter IDs */
  quick: string[];
  diameterRange: [number, number];
  category: string | null;
  partnerId: string | null;
}

const defaultFilters: FilterState = {
  search: "",
  materialFamilies: [],
  applicationFamilies: [],
  quick: [],
  diameterRange: [0, 2000],
  category: null,
  partnerId: null,
};

function hasActiveFilters(f: FilterState) {
  return (
    f.search !== "" ||
    f.materialFamilies.length > 0 ||
    f.applicationFamilies.length > 0 ||
    f.quick.length > 0 ||
    f.category !== null ||
    f.partnerId !== null ||
    f.diameterRange[0] !== 0 ||
    f.diameterRange[1] !== 2000
  );
}

// ─── Overall availability for a product group ─────────────────────────────────

function groupAvailability(
  pg: ProductGroup
): "in-stock" | "partial" | "on-order" {
  if (pg.suppliers.every((s) => s.availability === "in-stock"))
    return "in-stock";
  if (
    pg.suppliers.some(
      (s) => s.availability === "in-stock" || s.availability === "partial"
    )
  )
    return "partial";
  return "on-order";
}

// ─── Counts per family (for sidebar badges) ─────────────────────────────────

function countByMaterialFamily() {
  const counts: Record<string, number> = {};
  for (const p of productGroups) {
    const id = getMaterialFamily(p.material).id;
    counts[id] = (counts[id] ?? 0) + 1;
  }
  return counts;
}

function countByApplicationFamily() {
  const counts: Record<string, number> = {};
  for (const p of productGroups) {
    const id = getApplicationFamily(p.application).id;
    counts[id] = (counts[id] ?? 0) + 1;
  }
  return counts;
}

// ─── Product Group Card ───────────────────────────────────────────────────────

function ProductGroupCard({ group }: { group: ProductGroup }) {
  const { t, tp } = useTranslation();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const catColor = categoryColors[group.category] ?? "#0891b2";
  const CatIcon = categoryIcons[group.category] ?? Layers;
  const avail = groupAvailability(group);
  const cfg = availBadge[avail];
  const { Icon: AvailIcon } = cfg;
  const availLabel = t(
    avail === "in-stock"
      ? "catalog.inStock"
      : avail === "partial"
        ? "catalog.partial"
        : "catalog.onOrder",
  );
  const categoryTransKey = categoryTranslationKeys[group.category];
  const categoryLabel = categoryTransKey
    ? t(categoryTransKey)
    : (categoryLabels[group.category] ?? group.category);

  // diameter range across all suppliers
  const supplierDiams = group.suppliers.filter((s) => s.diameterMax > 0);
  const dMin = supplierDiams.length
    ? Math.min(...supplierDiams.map((s) => s.diameterMin))
    : 0;
  const dMax = supplierDiams.length
    ? Math.max(...supplierDiams.map((s) => s.diameterMax))
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/catalog/${group.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-200 h-full"
        style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${catColor}60, transparent)`,
          }}
        />

        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden shrink-0" style={{ backgroundColor: "var(--site-surface)" }}>
          {!imgError && group.image ? (
            <>
              {!imgLoaded && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: `linear-gradient(135deg, ${catColor}10, ${catColor}05)`,
                  }}
                />
              )}
              <Image
                src={group.image}
                alt={group.name}
                fill
                loading="lazy"
                className={`${
                  group.suppliers.some((s) => s.partnerId === "roto" || s.partnerId === "polins" || s.partnerId === "plastika-nv" || s.partnerId === "viokon") ? "object-contain p-4" : "object-cover"
                } transition-opacity duration-300 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </>
          ) : (
            <FallbackArtwork
              category={group.category}
              label={categoryLabel}
              color={catColor}
              Icon={CatIcon}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Category badge */}
          <div
            className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-mono tracking-wider backdrop-blur-sm"
            style={{
              backgroundColor: `${catColor}20`,
              color: catColor,
              border: `1px solid ${catColor}30`,
            }}
          >
            <CatIcon className="h-3 w-3" />
            {categoryLabel}
          </div>

          {/* Material */}
          <div
            className="absolute right-3 top-3 rounded-md px-2 py-1 text-[10px] font-mono backdrop-blur-sm"
            style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)", color: "var(--site-text-muted)" }}
          >
            {group.material.split(" ")[0]}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Supplier dots */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-1">
              {group.suppliers.slice(0, 5).map((s) => (
                <div
                  key={s.partnerId}
                  className="h-4 w-4 rounded-full border-2 flex items-center justify-center text-[8px] font-black -ml-1 first:ml-0"
                  style={{ background: s.color, color: "#fff", borderColor: "var(--site-surface-strong)" }}
                  title={s.partnerName}
                >
                  {s.partnerName.charAt(0)}
                </div>
              ))}
            </div>
            <span className="text-[11px] font-mono" style={{ color: "var(--site-text-soft)" }}>
              {group.suppliers.length}{" "}
              {group.suppliers.length === 1
                ? t("catalog.supplierOne")
                : t("catalog.suppliers")}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-base font-bold leading-snug mb-1 group-hover:text-cyan-500 transition-colors" style={{ color: "var(--site-text)" }}>
            {tp(group.id, "name", group.name)}
          </h3>
          <p className="text-xs mb-4 line-clamp-2 leading-relaxed" style={{ color: "var(--site-text-soft)" }}>
            {tp(group.id, "shortName", group.shortName)}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-3 mt-auto">
            {dMax > 0 ? (
              <div className="rounded-lg p-2.5" style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}>
                <span className="text-[9px] font-mono block tracking-widest mb-0.5" style={{ color: "var(--site-text-soft)" }}>
                  {t("catalog.diameterLabel")}
                </span>
                <span className="text-xs font-bold leading-none font-mono" style={{ color: "var(--site-text)" }}>
                  Ø {dMin}–{dMax} mm
                </span>
              </div>
            ) : (
              <div className="rounded-lg p-2.5" style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}>
                <span className="text-[9px] font-mono block tracking-widest mb-0.5" style={{ color: "var(--site-text-soft)" }}>
                  {t("catalog.categoryLabel")}
                </span>
                <span className="text-xs font-bold leading-none capitalize" style={{ color: "var(--site-text)" }}>
                  {categoryLabel}
                </span>
              </div>
            )}
            <div className="rounded-lg p-2.5" style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}>
              <span className="text-[9px] font-mono block tracking-widest mb-0.5" style={{ color: "var(--site-text-soft)" }}>
                {t("catalog.standardsLabel")}
              </span>
              <span className="text-xs font-bold leading-none" style={{ color: "var(--site-text)" }}>
                {group.standards.length > 0
                  ? group.standards[0]
                  : t("catalog.proprietary")}
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between pt-3 mt-1" style={{ borderTop: "1px solid var(--site-border)" }}>
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
              style={{
                background: cfg.bg,
                color: cfg.color,
                border: `1px solid ${cfg.border}`,
              }}
            >
              <AvailIcon className="w-3 h-3" />
              {availLabel}
            </div>
            <span className="flex items-center gap-1 text-xs font-mono group-hover:text-cyan-500 transition-colors" style={{ color: "var(--site-text-soft)" }}>
              {t("catalog.viewDetails")}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Premium fallback artwork ─────────────────────────────────────────────────

function FallbackArtwork({
  category,
  label,
  color,
  Icon,
}: {
  category: string;
  label: string;
  color: string;
  Icon: React.FC<{ className?: string }>;
}) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(120% 80% at 50% 20%, ${color}22 0%, ${color}08 50%, transparent 100%)`,
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--site-border) 1px, transparent 1px), linear-gradient(90deg, var(--site-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow blob */}
      <div
        className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl opacity-50"
        style={{ background: color }}
      />
      <div className="relative flex flex-col items-center gap-2.5 text-center px-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-md"
          style={{
            borderColor: `${color}55`,
            background: `${color}18`,
          }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.32em] uppercase"
          style={{ color }}
        >
          {label}
        </span>
        <span className="text-[10px] font-medium" style={{ color: "var(--site-text-soft)" }}>
          {category === "civil"
            ? "Pipe & Infrastructure"
            : category === "agri"
              ? "Agriculture System"
              : "Industrial Component"}
        </span>
      </div>
    </div>
  );
}

// ─── Category Tabs ────────────────────────────────────────────────────────────

function CategoryTabs({
  activeCategory,
  onSelect,
}: {
  activeCategory: string | null;
  onSelect: (cat: string | null) => void;
}) {
  const { t } = useTranslation();
  const allCategories = [
    { id: null, name: t("catalog.allProducts"), icon: Layers },
    ...categories.map((c) => ({
      id: c.id,
      name: categoryTranslationKeys[c.id]
        ? t(categoryTranslationKeys[c.id])
        : c.name,
      icon: categoryIcons[c.id] ?? Layers,
    })),
  ];

  return (
    <div className="mb-8 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max pb-2">
        {allCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const color = cat.id
            ? (categoryColors[cat.id] ?? "#94a3b8")
            : "#94a3b8";

          return (
            <motion.button
              key={cat.id ?? "all"}
              onClick={() => onSelect(cat.id)}
              className="relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-400"
              style={{
                color: isActive ? color : "var(--site-text-soft)",
                backgroundColor: isActive ? `${color}20` : undefined,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ color: isActive ? color : undefined }}>
                <Icon className="h-4 w-4" />
              </span>
              {cat.name}
              {isActive && (
                <motion.div
                  layoutId="categoryIndicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ backgroundColor: color }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Collapsible filter section ──────────────────────────────────────────────

function FilterSection({
  title,
  count,
  defaultOpen = true,
  onClear,
  clearLabel = "Clear",
  children,
}: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  onClear?: () => void;
  clearLabel?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl" style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--site-text-muted)" }}>
            {title}
          </span>
          {count && count > 0 ? (
            <span className="rounded-full bg-cyan-500/15 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">
              {count}
            </span>
          ) : null}
        </span>
        <span className="flex items-center gap-2">
          {count && count > 0 && onClear ? (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onClear();
                }
              }}
              className="text-[10px] uppercase tracking-wider hover:text-cyan-500 transition-colors" style={{ color: "var(--site-text-soft)" }}
            >
              {clearLabel}
            </span>
          ) : null}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`}
            style={{ color: "var(--site-text-soft)" }}
          />
        </span>
      </button>
      {open ? <div className="px-4 pb-4">{children}</div> : null}
    </div>
  );
}

// ─── Main Catalog ─────────────────────────────────────────────────────────────

export function Catalog({
  initialCategory,
  initialPartner,
}: {
  initialCategory?: string;
  initialPartner?: string;
}) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    category: initialCategory ?? null,
    partnerId: initialPartner ?? null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevant");

  const matCounts = useMemo(() => countByMaterialFamily(), []);
  const appCounts = useMemo(() => countByApplicationFamily(), []);

  const filteredGroups = useMemo(() => {
    let result = productGroups.filter((pg) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !pg.name.toLowerCase().includes(q) &&
          !pg.shortName.toLowerCase().includes(q) &&
          !pg.application.toLowerCase().includes(q) &&
          !pg.material.toLowerCase().includes(q) &&
          !pg.description.toLowerCase().includes(q) &&
          !pg.suppliers.some((s) => s.partnerName.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      if (!matchesMaterialFamily(pg, filters.materialFamilies)) return false;
      if (!matchesApplicationFamily(pg, filters.applicationFamilies))
        return false;
      if (filters.category && pg.category !== filters.category) return false;
      if (
        filters.partnerId &&
        !pg.suppliers.some((s) => s.partnerId === filters.partnerId)
      ) {
        return false;
      }
      // diameter filter: any supplier overlaps the range
      const [dMin, dMax] = filters.diameterRange;
      if (dMin !== 0 || dMax !== 2000) {
        const relevant = pg.suppliers.filter((s) => s.diameterMax > 0);
        if (
          relevant.length > 0 &&
          !relevant.some((s) => s.diameterMax >= dMin && s.diameterMin <= dMax)
        ) {
          return false;
        }
      }
      // quick filters (AND)
      for (const qid of filters.quick) {
        const qf = quickFilters.find((q) => q.id === qid);
        if (qf && !qf.match(pg)) return false;
      }
      return true;
    });

    switch (sort) {
      case "suppliers-desc":
        result = [...result].sort(
          (a, b) => b.suppliers.length - a.suppliers.length
        );
        break;
      case "dia-asc": {
        result = [...result].sort((a, b) => {
          const aMin = Math.min(
            ...a.suppliers
              .filter((s) => s.diameterMin > 0)
              .map((s) => s.diameterMin),
            9999
          );
          const bMin = Math.min(
            ...b.suppliers
              .filter((s) => s.diameterMin > 0)
              .map((s) => s.diameterMin),
            9999
          );
          return aMin - bMin;
        });
        break;
      }
      case "dia-desc": {
        result = [...result].sort((a, b) => {
          const aMax = Math.max(
            ...a.suppliers
              .filter((s) => s.diameterMax > 0)
              .map((s) => s.diameterMax),
            0
          );
          const bMax = Math.max(
            ...b.suppliers
              .filter((s) => s.diameterMax > 0)
              .map((s) => s.diameterMax),
            0
          );
          return bMax - aMax;
        });
        break;
      }
    }

    return result;
  }, [filters, sort]);

  const totalSupplierOffers = useMemo(
    () => filteredGroups.reduce((acc, g) => acc + g.suppliers.length, 0),
    [filteredGroups]
  );

  const toggleArrayFilter = <K extends "materialFamilies" | "applicationFamilies" | "quick">(
    key: K,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const clearAll = () => setFilters({ ...defaultFilters });

  // ─── Active chips (human-friendly) ─────────────────────────────────────────
  const chips: { label: string; onRemove: () => void }[] = [];
  if (filters.search)
    chips.push({
      label: `“${filters.search}”`,
      onRemove: () => setFilters((p) => ({ ...p, search: "" })),
    });
  if (filters.category) {
    const catKey = categoryTranslationKeys[filters.category];
    const catLabel = catKey
      ? t(catKey)
      : (categoryLabels[filters.category] ?? filters.category);
    chips.push({
      label: `${t("catalog.categoryLabel")}: ${catLabel}`,
      onRemove: () => setFilters((p) => ({ ...p, category: null })),
    });
  }
  if (filters.partnerId) {
    const pName =
      partners.find((p) => p.id === filters.partnerId)?.name ??
      filters.partnerId;
    chips.push({
      label: `${t("catalog.supplier")}: ${pName}`,
      onRemove: () => setFilters((p) => ({ ...p, partnerId: null })),
    });
  }
  filters.materialFamilies.forEach((id) => {
    const fam = materialFamilies.find((f) => f.id === id);
    const tk = materialFamilyTranslationKeys[id];
    chips.push({
      label: `${t("catalog.material")}: ${tk ? t(tk) : (fam?.label ?? id)}`,
      onRemove: () => toggleArrayFilter("materialFamilies", id),
    });
  });
  filters.applicationFamilies.forEach((id) => {
    const fam = applicationFamilies.find((f) => f.id === id);
    const tk = applicationFamilyTranslationKeys[id];
    chips.push({
      label: `${t("catalog.application")}: ${tk ? t(tk) : (fam?.label ?? id)}`,
      onRemove: () => toggleArrayFilter("applicationFamilies", id),
    });
  });
  filters.quick.forEach((id) => {
    const qf = quickFilters.find((q) => q.id === id);
    const tk = quickFilterTranslationKeys[id];
    chips.push({
      label: tk ? t(tk) : (qf?.label ?? id),
      onRemove: () => toggleArrayFilter("quick", id),
    });
  });
  if (filters.diameterRange[0] !== 0 || filters.diameterRange[1] !== 2000)
    chips.push({
      label: `Ø ${filters.diameterRange[0]}–${filters.diameterRange[1]} mm`,
      onRemove: () =>
        setFilters((p) => ({ ...p, diameterRange: [0, 2000] })),
    });

  return (
    <section className="relative py-8 sm:py-16">
      <div className="absolute inset-0 noise opacity-50" />

      <div className="site-shell relative">
        <LayoutGroup>
          <CategoryTabs
            activeCategory={filters.category}
            onSelect={(cat) => setFilters((p) => ({ ...p, category: cat }))}
          />
        </LayoutGroup>

        {/* Active filter chips */}
        {chips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip.label}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors"
                style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)", color: "var(--site-text-muted)" }}
              >
                {chip.label}
                <X className="h-3 w-3" style={{ color: "var(--site-text-soft)" }} />
              </button>
            ))}
            <button
              onClick={clearAll}
              className="text-xs text-cyan-400 hover:text-cyan-300 ml-1"
            >
              {t("catalog.clearAll")}
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--site-text-soft)" }} />
                <input
                  type="text"
                  placeholder={t("catalog.searchPlaceholder")}
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-colors"
                  style={{ backgroundColor: "var(--site-surface-strong)", border: "1px solid var(--site-border)", color: "var(--site-text)" }}
                />
              </div>

              {/* Mobile collapse toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ backgroundColor: "var(--site-surface-strong)", border: "1px solid var(--site-border)" }}
              >
                <span className="flex items-center gap-2" style={{ color: "var(--site-text)" }}>
                  <SlidersHorizontal className="w-5 h-5" />
                  {t("catalog.filters")}
                  {hasActiveFilters(filters) && (
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  )}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${showFilters ? "rotate-180" : ""}`}
                  style={{ color: "var(--site-text-soft)" }}
                />
              </button>

              <div
                className={`space-y-3 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                {/* Quick filters */}
                <FilterSection
                  title={t("catalog.quickFilters")}
                  count={filters.quick.length}
                  defaultOpen
                  onClear={() => setFilters((p) => ({ ...p, quick: [] }))}
                  clearLabel={t("catalog.clear")}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {quickFilters.map((qf) => {
                      const active = filters.quick.includes(qf.id);
                      const tk = quickFilterTranslationKeys[qf.id];
                      return (
                        <button
                          key={qf.id}
                          onClick={() => toggleArrayFilter("quick", qf.id)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors"
                          style={active
                            ? { backgroundColor: "rgba(6,182,212,0.12)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.35)" }
                            : { backgroundColor: "var(--site-surface)", color: "var(--site-text-soft)", border: "1px solid var(--site-border)" }
                          }
                        >
                          {tk ? t(tk) : qf.label}
                        </button>
                      );
                    })}
                  </div>
                </FilterSection>

                {/* Material family */}
                <FilterSection
                  title={t("catalog.material")}
                  count={filters.materialFamilies.length}
                  defaultOpen
                  onClear={() =>
                    setFilters((p) => ({ ...p, materialFamilies: [] }))
                  }
                  clearLabel={t("catalog.clear")}
                >
                  <div className="space-y-1">
                    {materialFamilies
                      .filter((f) => (matCounts[f.id] ?? 0) > 0)
                      .map((fam) => {
                        const active = filters.materialFamilies.includes(fam.id);
                        const count = matCounts[fam.id] ?? 0;
                        const tk = materialFamilyTranslationKeys[fam.id];
                        return (
                          <button
                            key={fam.id}
                            onClick={() =>
                              toggleArrayFilter("materialFamilies", fam.id)
                            }
                            className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left"
                            style={active
                              ? { backgroundColor: "rgba(6,182,212,0.1)", color: "#06b6d4" }
                              : { color: "var(--site-text-muted)" }
                            }
                          >
                            <span className="truncate font-medium">
                              {tk ? t(tk) : fam.label}
                            </span>
                            <span
                              className="text-[10px] font-mono"
                              style={{ color: active ? "#06b6d4" : "var(--site-text-soft)" }}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </FilterSection>

                {/* Application family */}
                <FilterSection
                  title={t("catalog.application")}
                  count={filters.applicationFamilies.length}
                  defaultOpen
                  onClear={() =>
                    setFilters((p) => ({ ...p, applicationFamilies: [] }))
                  }
                  clearLabel={t("catalog.clear")}
                >
                  <div className="space-y-1">
                    {applicationFamilies
                      .filter((f) => (appCounts[f.id] ?? 0) > 0)
                      .map((fam) => {
                        const active =
                          filters.applicationFamilies.includes(fam.id);
                        const count = appCounts[fam.id] ?? 0;
                        const tk = applicationFamilyTranslationKeys[fam.id];
                        return (
                          <button
                            key={fam.id}
                            onClick={() =>
                              toggleArrayFilter("applicationFamilies", fam.id)
                            }
                            className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left"
                            style={active
                              ? { backgroundColor: "rgba(6,182,212,0.1)", color: "#06b6d4" }
                              : { color: "var(--site-text-muted)" }
                            }
                          >
                            <span className="truncate font-medium">
                              {tk ? t(tk) : fam.label}
                            </span>
                            <span
                              className="text-[10px] font-mono"
                              style={{ color: active ? "#06b6d4" : "var(--site-text-soft)" }}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </FilterSection>

                {/* Diameter */}
                <FilterSection
                  title={t("catalog.diameter")}
                  count={
                    filters.diameterRange[0] !== 0 ||
                    filters.diameterRange[1] !== 2000
                      ? 1
                      : 0
                  }
                  defaultOpen={false}
                  onClear={() =>
                    setFilters((p) => ({ ...p, diameterRange: [0, 2000] }))
                  }
                  clearLabel={t("catalog.clear")}
                >
                  <div className="px-1 pt-1">
                    <Slider
                      defaultValue={[0, 2000]}
                      max={2000}
                      step={50}
                      value={filters.diameterRange}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          diameterRange: value as [number, number],
                        }))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs font-mono text-slate-400">
                        {filters.diameterRange[0]} mm
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {filters.diameterRange[1]} mm
                      </span>
                    </div>
                  </div>
                </FilterSection>

                {/* Supplier */}
                <FilterSection
                  title={t("catalog.supplier")}
                  count={filters.partnerId ? 1 : 0}
                  defaultOpen={false}
                  onClear={() =>
                    setFilters((p) => ({ ...p, partnerId: null }))
                  }
                  clearLabel={t("catalog.clear")}
                >
                  <div className="max-h-64 overflow-y-auto pr-1 space-y-1 scrollbar-thin">
                    {partners.map((p) => {
                      const active = filters.partnerId === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              partnerId: prev.partnerId === p.id ? null : p.id,
                            }))
                          }
                          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left"
                          style={active
                            ? { backgroundColor: "rgba(6,182,212,0.1)", color: "#06b6d4" }
                            : { color: "var(--site-text-muted)" }
                          }
                        >
                          <span
                            className="h-3 w-3 rounded-sm shrink-0"
                            style={{ background: p.color, boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
                          />
                          <span className="truncate">{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </FilterSection>

                {hasActiveFilters(filters) && (
                  <button
                    onClick={clearAll}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors hover:text-cyan-500"
                    style={{ color: "var(--site-text-soft)" }}
                  >
                    <X className="w-4 h-4" />
                    {t("catalog.clearAllFilters")}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-sm" style={{ color: "var(--site-text-muted)" }}>
                {t("catalog.showing")}{" "}
                <span className="font-bold" style={{ color: "var(--site-text)" }}>
                  {filteredGroups.length}
                </span>{" "}
                {filteredGroups.length === 1
                  ? t("catalog.productFamily")
                  : t("catalog.productFamilies")}
                {filteredGroups.length > 0 && (
                  <span style={{ color: "var(--site-text-soft)" }}>
                    {" "}
                    {t("catalog.across")}{" "}
                    <span style={{ color: "var(--site-text-muted)" }}>
                      {totalSupplierOffers}
                    </span>{" "}
                    {totalSupplierOffers === 1
                      ? t("catalog.supplierOffer")
                      : t("catalog.supplierOffers")}
                  </span>
                )}
              </p>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none rounded-lg py-2 pl-8 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
                  style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)", color: "var(--site-text-muted)" }}
                  aria-label={t("catalog.sortBy")}
                >
                  <option value="relevant">{t("catalog.sortRecommended")}</option>
                  <option value="suppliers-desc">{t("catalog.sortMostSuppliers")}</option>
                  <option value="dia-asc">{t("catalog.sortDiaAsc")}</option>
                  <option value="dia-desc">{t("catalog.sortDiaDesc")}</option>
                </select>
                <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" style={{ color: "var(--site-text-soft)" }} />
              </div>
            </div>

            <LayoutGroup>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredGroups.map((group) => (
                    <ProductGroupCard key={group.id} group={group} />
                  ))}
                </AnimatePresence>
              </div>
            </LayoutGroup>

            {filteredGroups.length === 0 && (
              <div className="flex flex-col items-center py-20 text-center">
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}
                >
                  <AlertCircle className="h-8 w-8" style={{ color: "var(--site-text-soft)" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--site-text)" }}>
                  {t("catalog.noResultsTitle")}
                </h3>
                <p className="text-sm mb-6 max-w-md" style={{ color: "var(--site-text-muted)" }}>
                  {t("catalog.noResultsSubtitle")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={clearAll}
                    className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
                  >
                    {t("catalog.clearAllFilters")}
                  </button>
                  <Link
                    href="/contact"
                    className="rounded-xl px-5 py-2.5 text-sm font-medium transition-colors"
                    style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)", color: "var(--site-text-muted)" }}
                  >
                    {t("catalog.contactUs")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom stat bar */}
        {filteredGroups.length > 0 && (
          <div className="mt-16 pt-10 flex flex-wrap items-center justify-center gap-8 text-center" style={{ borderTop: "1px solid var(--site-border)" }}>
            {[
              { value: productGroups.length, label: t("catalog.productTypesLabel"), color: "var(--site-text)" },
              { value: new Set(productGroups.flatMap((g) => g.suppliers.map((s) => s.partnerId))).size, label: t("catalog.supplierPartnersLabel"), color: "var(--site-text)" },
              { value: productGroups.reduce((a, g) => a + g.suppliers.length, 0), label: t("catalog.totalSupplyOffers"), color: "var(--site-text)" },
              { value: productGroups.filter((g) => groupAvailability(g) === "in-stock").length, label: t("catalog.fullyInStock"), color: "#22c55e" },
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div>
                  <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: "var(--site-text-soft)" }}>{stat.label}</p>
                </div>
                {i < arr.length - 1 && <div className="h-8 w-px" style={{ backgroundColor: "var(--site-border)" }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
