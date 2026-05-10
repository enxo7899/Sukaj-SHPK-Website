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
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { productGroups, type ProductGroup } from "@/lib/products-data";
import { partners, categories } from "@/lib/data";
import { Slider } from "@/components/ui/slider";

// ─── Derived filter options ───────────────────────────────────────────────────

const materials = Array.from(
  new Set(productGroups.map((p) => p.material))
).sort();

const applications = Array.from(
  new Set(productGroups.map((p) => p.application))
).sort();

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
  materials: string[];
  applications: string[];
  diameterRange: [number, number];
  category: string | null;
  partnerId: string | null;
}

const defaultFilters: FilterState = {
  search: "",
  materials: [],
  applications: [],
  diameterRange: [0, 2000],
  category: null,
  partnerId: null,
};

function hasActiveFilters(f: FilterState) {
  return (
    f.search !== "" ||
    f.materials.length > 0 ||
    f.applications.length > 0 ||
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

// ─── Product Group Card ───────────────────────────────────────────────────────

function ProductGroupCard({ group }: { group: ProductGroup }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const catColor = categoryColors[group.category] ?? "#0891b2";
  const CatIcon = categoryIcons[group.category] ?? Layers;
  const avail = groupAvailability(group);
  const cfg = availBadge[avail];
  const { Icon: AvailIcon } = cfg;

  // diameter range across all suppliers
  const supplierDiams = group.suppliers.filter(
    (s) => s.diameterMax > 0
  );
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
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 hover:border-white/[0.18] hover:bg-slate-900/90 transition-all duration-200 h-full"
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${catColor}60, transparent)`,
          }}
        />

        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-950/60 shrink-0">
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
                className={`object-cover transition-opacity duration-300 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${catColor}12, ${catColor}04)`,
              }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                style={{ borderColor: `${catColor}35` }}
              >
                <Layers className="h-7 w-7" style={{ color: catColor }} />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/15 to-transparent" />

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
            {categoryLabels[group.category] ?? group.category}
          </div>

          {/* Material */}
          <div className="absolute right-3 top-3 rounded-md border border-white/10 bg-slate-950/70 px-2 py-1 text-[10px] font-mono text-slate-300 backdrop-blur-sm">
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
                  className="h-4 w-4 rounded-full border-2 border-slate-900 flex items-center justify-center text-[8px] font-black -ml-1 first:ml-0"
                  style={{ background: s.color, color: "#fff" }}
                  title={s.partnerName}
                >
                  {s.partnerName.charAt(0)}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {group.suppliers.length} supplier
              {group.suppliers.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-base font-bold text-white leading-snug mb-1 group-hover:text-cyan-200 transition-colors">
            {group.name}
          </h3>
          <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
            {group.application}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-3 mt-auto">
            {dMax > 0 ? (
              <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5">
                <span className="text-[9px] font-mono text-slate-500 block tracking-widest mb-0.5">
                  DIAMETER
                </span>
                <span className="text-xs font-bold text-white leading-none font-mono">
                  Ø {dMin}–{dMax} mm
                </span>
              </div>
            ) : (
              <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5">
                <span className="text-[9px] font-mono text-slate-500 block tracking-widest mb-0.5">
                  CATEGORY
                </span>
                <span className="text-xs font-bold text-white leading-none capitalize">
                  {group.category}
                </span>
              </div>
            )}
            <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5">
              <span className="text-[9px] font-mono text-slate-500 block tracking-widest mb-0.5">
                STANDARDS
              </span>
              <span className="text-xs font-bold text-white leading-none">
                {group.standards.length > 0
                  ? group.standards[0]
                  : "Proprietary"}
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between border-t border-white/[0.07] pt-3 mt-1">
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
              style={{
                background: cfg.bg,
                color: cfg.color,
                border: `1px solid ${cfg.border}`,
              }}
            >
              <AvailIcon className="w-3 h-3" />
              {cfg.label}
            </div>
            <span className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-cyan-400 transition-colors font-mono">
              View details
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
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
  const allCategories = [
    { id: null, name: "All Products", icon: Layers },
    ...categories.map((c) => ({
      id: c.id,
      name: c.name,
      icon: categoryIcons[c.id] ?? Layers,
    })),
  ];

  return (
    <div className="mb-8 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max pb-2">
        {allCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const color = cat.id ? (categoryColors[cat.id] ?? "#94a3b8") : "#94a3b8";

          return (
            <motion.button
              key={cat.id ?? "all"}
              onClick={() => onSelect(cat.id)}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              style={{
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

// ─── Main Catalog ─────────────────────────────────────────────────────────────

export function Catalog({
  initialCategory,
  initialPartner,
}: {
  initialCategory?: string;
  initialPartner?: string;
}) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    category: initialCategory ?? null,
    partnerId: initialPartner ?? null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevant");

  const filteredGroups = useMemo(() => {
    let result = productGroups.filter((pg) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !pg.name.toLowerCase().includes(q) &&
          !pg.shortName.toLowerCase().includes(q) &&
          !pg.application.toLowerCase().includes(q) &&
          !pg.material.toLowerCase().includes(q) &&
          !pg.suppliers.some((s) => s.partnerName.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      if (
        filters.materials.length > 0 &&
        !filters.materials.includes(pg.material)
      ) {
        return false;
      }
      if (
        filters.applications.length > 0 &&
        !filters.applications.includes(pg.application)
      ) {
        return false;
      }
      if (filters.category && pg.category !== filters.category) {
        return false;
      }
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
            ...a.suppliers.filter((s) => s.diameterMin > 0).map((s) => s.diameterMin),
            9999
          );
          const bMin = Math.min(
            ...b.suppliers.filter((s) => s.diameterMin > 0).map((s) => s.diameterMin),
            9999
          );
          return aMin - bMin;
        });
        break;
      }
      case "dia-desc": {
        result = [...result].sort((a, b) => {
          const aMax = Math.max(
            ...a.suppliers.filter((s) => s.diameterMax > 0).map((s) => s.diameterMax),
            0
          );
          const bMax = Math.max(
            ...b.suppliers.filter((s) => s.diameterMax > 0).map((s) => s.diameterMax),
            0
          );
          return bMax - aMax;
        });
        break;
      }
    }

    return result;
  }, [filters, sort]);

  const toggleFilter = (type: "materials" | "applications", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const clearAll = () => setFilters({ ...defaultFilters });

  const chips: { label: string; onRemove: () => void }[] = [];
  if (filters.search)
    chips.push({
      label: `"${filters.search}"`,
      onRemove: () => setFilters((p) => ({ ...p, search: "" })),
    });
  if (filters.category)
    chips.push({
      label: `Category: ${filters.category}`,
      onRemove: () => setFilters((p) => ({ ...p, category: null })),
    });
  if (filters.partnerId) {
    const pName =
      partners.find((p) => p.id === filters.partnerId)?.name ??
      filters.partnerId;
    chips.push({
      label: `Supplier: ${pName}`,
      onRemove: () => setFilters((p) => ({ ...p, partnerId: null })),
    });
  }
  filters.materials.forEach((m) =>
    chips.push({ label: m, onRemove: () => toggleFilter("materials", m) })
  );
  filters.applications.forEach((a) =>
    chips.push({
      label: a,
      onRemove: () => toggleFilter("applications", a),
    })
  );
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 transition-colors"
              >
                {chip.label}
                <X className="h-3 w-3 text-slate-500" />
              </button>
            ))}
            <button
              onClick={clearAll}
              className="text-xs text-cyan-400 hover:text-cyan-300 ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10"
              >
                <span className="flex items-center gap-2 text-white">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                  {hasActiveFilters(filters) && (
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  )}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform text-slate-400 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`space-y-6 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                    Material
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((material) => (
                      <button
                        key={material}
                        onClick={() => toggleFilter("materials", material)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          filters.materials.includes(material)
                            ? "bg-cyan-600 text-white"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                    Application
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((app) => (
                      <button
                        key={app}
                        onClick={() => toggleFilter("applications", app)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          filters.applications.includes(app)
                            ? "bg-cyan-500 text-slate-950"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                    Diameter (mm)
                  </h4>
                  <div className="px-2">
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
                      <span className="text-xs font-mono text-slate-500">
                        {filters.diameterRange[0]} mm
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {filters.diameterRange[1]} mm
                      </span>
                    </div>
                  </div>
                </div>

                {/* Supplier filter */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                    Supplier
                  </h4>
                  <div className="space-y-1.5">
                    {partners.slice(0, 8).map((p) => (
                      <button
                        key={p.id}
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            partnerId:
                              prev.partnerId === p.id ? null : p.id,
                          }))
                        }
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                          filters.partnerId === p.id
                            ? "bg-white/10 text-white"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div
                          className="h-4 w-4 rounded shrink-0"
                          style={{ background: p.color }}
                        />
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters(filters) && (
                  <button
                    onClick={clearAll}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-sm text-slate-400">
                <span className="font-bold text-white">
                  {filteredGroups.length}
                </span>{" "}
                product type{filteredGroups.length !== 1 ? "s" : ""} found
                {filteredGroups.length > 0 && (
                  <span className="text-slate-600">
                    {" "}·{" "}
                    {filteredGroups.reduce(
                      (acc, g) => acc + g.suppliers.length,
                      0
                    )}{" "}
                    supplier offers
                  </span>
                )}
              </p>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-4 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="relevant" className="bg-slate-900">
                    Most relevant
                  </option>
                  <option value="suppliers-desc" className="bg-slate-900">
                    Most suppliers
                  </option>
                  <option value="dia-asc" className="bg-slate-900">
                    Diameter ↑
                  </option>
                  <option value="dia-desc" className="bg-slate-900">
                    Diameter ↓
                  </option>
                </select>
                <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
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
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <AlertCircle className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  No products match your filters
                </h3>
                <p className="text-sm text-slate-400 mb-6 max-w-md">
                  Try broadening your search criteria or removing some filters.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={clearAll}
                    className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <Link
                    href="/contact"
                    className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom stat bar */}
        {filteredGroups.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-black text-white">
                {productGroups.length}
              </p>
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                Product Types
              </p>
            </div>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div>
              <p className="text-2xl font-black text-white">
                {new Set(
                  productGroups.flatMap((g) =>
                    g.suppliers.map((s) => s.partnerId)
                  )
                ).size}
              </p>
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                Supplier Partners
              </p>
            </div>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div>
              <p className="text-2xl font-black text-white">
                {productGroups.reduce((a, g) => a + g.suppliers.length, 0)}
              </p>
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                Total Supply Offers
              </p>
            </div>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div>
              <p className="text-2xl font-black" style={{ color: "#22c55e" }}>
                {
                  productGroups.filter(
                    (g) => groupAvailability(g) === "in-stock"
                  ).length
                }
              </p>
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                Fully In Stock
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
