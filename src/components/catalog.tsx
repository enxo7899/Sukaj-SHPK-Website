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
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { productGroups, type ProductGroup } from "@/lib/products-data";
import { partners, categories } from "@/lib/data";
import { Slider } from "@/components/ui/slider";

// ─── Derived data ─────────────────────────────────────────────────────────────

const MATERIALS    = Array.from(new Set(productGroups.map((p) => p.material))).sort();
const APPLICATIONS = Array.from(new Set(productGroups.map((p) => p.application))).sort();

// ─── Constants ────────────────────────────────────────────────────────────────

const CAT_ICON: Record<string, LucideIcon> = {
  civil:      Building2,
  agri:       Sprout,
  industrial: Factory,
};

const CAT_COLOR: Record<string, string> = {
  civil:      "#0ea5e9",
  agri:       "#22c55e",
  industrial: "#38bdf8",
};

const CAT_LABEL: Record<string, string> = {
  civil:      "Civil",
  agri:       "Agriculture",
  industrial: "Industrial",
};

const AVAIL = {
  "in-stock": { label: "In Stock",     dot: "bg-emerald-500", text: "text-emerald-400", Icon: CheckCircle2 },
  partial:    { label: "Partial Stock", dot: "bg-amber-400",   text: "text-amber-400",   Icon: Clock },
  "on-order": { label: "On Order",      dot: "bg-orange-500",  text: "text-orange-400",  Icon: Package },
} as const;

type SortKey = "relevant" | "suppliers-desc" | "dia-asc" | "dia-desc";

interface Filters {
  search:        string;
  materials:     string[];
  applications:  string[];
  diameterRange: [number, number];
  category:      string | null;
  partnerId:     string | null;
}

const DEFAULT: Filters = {
  search: "", materials: [], applications: [],
  diameterRange: [0, 2000], category: null, partnerId: null,
};

function isFiltered(f: Filters) {
  return (
    f.search !== "" || f.materials.length > 0 || f.applications.length > 0 ||
    f.category !== null || f.partnerId !== null ||
    f.diameterRange[0] !== 0 || f.diameterRange[1] !== 2000
  );
}

function groupAvail(pg: ProductGroup): keyof typeof AVAIL {
  if (pg.suppliers.every((s) => s.availability === "in-stock")) return "in-stock";
  if (pg.suppliers.some((s) => s.availability !== "on-order")) return "partial";
  return "on-order";
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ group }: { group: ProductGroup }) {
  const [imgErr, setImgErr] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const catColor = CAT_COLOR[group.category] ?? "#0ea5e9";
  const CatIcon  = CAT_ICON[group.category]  ?? Layers;
  const avail    = groupAvail(group);
  const { Icon: AvailIcon, label: availLabel, dot: availDot, text: availText } = AVAIL[avail];

  const supplierDiams = group.suppliers.filter((s) => s.diameterMax > 0);
  const dMin = supplierDiams.length ? Math.min(...supplierDiams.map((s) => s.diameterMin)) : 0;
  const dMax = supplierDiams.length ? Math.max(...supplierDiams.map((s) => s.diameterMax)) : 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
    >
      <Link
        href={`/catalog/${group.slug}`}
        className="group flex flex-col h-full border border-white/[0.08] rounded-xl overflow-hidden bg-slate-900/40 hover:border-white/[0.16] hover:bg-slate-900/70 transition-all duration-200"
      >
        {/* Image */}
        <div className="relative h-40 shrink-0 bg-slate-900 overflow-hidden">
          {!imgErr && group.image ? (
            <>
              {!imgLoaded && (
                <div className="absolute inset-0 animate-pulse bg-slate-800" />
              )}
              <Image
                src={group.image}
                alt={group.name}
                fill
                loading="lazy"
                className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${imgLoaded ? "opacity-60" : "opacity-0"}`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgErr(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${catColor}0a, transparent)` }}
            >
              <CatIcon className="h-10 w-10 opacity-20" style={{ color: catColor }} />
            </div>
          )}
          {/* bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

          {/* Category pill */}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-mono font-semibold backdrop-blur-sm"
              style={{ color: catColor, background: `${catColor}18`, border: `1px solid ${catColor}28` }}
            >
              <CatIcon className="h-2.5 w-2.5" />
              {CAT_LABEL[group.category] ?? group.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Name + material */}
          <h3 className="font-bold text-[15px] text-white leading-snug mb-0.5 group-hover:text-sky-200 transition-colors">
            {group.name}
          </h3>
          <p className="text-[11px] font-mono text-slate-500 mb-4">{group.material}</p>

          {/* Specs row */}
          <div className="flex gap-3 mb-5 mt-auto">
            {dMax > 0 ? (
              <div className="flex-1 border border-white/[0.06] rounded bg-white/[0.03] px-3 py-2">
                <p className="text-[9px] font-mono tracking-[0.15em] text-slate-600 uppercase mb-0.5">Diameter</p>
                <p className="font-mono font-semibold text-xs text-slate-200">Ø {dMin}–{dMax} mm</p>
              </div>
            ) : (
              <div className="flex-1 border border-white/[0.06] rounded bg-white/[0.03] px-3 py-2">
                <p className="text-[9px] font-mono tracking-[0.15em] text-slate-600 uppercase mb-0.5">Type</p>
                <p className="font-mono font-semibold text-xs text-slate-200 capitalize">{group.category}</p>
              </div>
            )}
            {group.standards.length > 0 && (
              <div className="flex-1 border border-white/[0.06] rounded bg-white/[0.03] px-3 py-2">
                <p className="text-[9px] font-mono tracking-[0.15em] text-slate-600 uppercase mb-0.5">Standard</p>
                <p className="font-mono font-semibold text-xs text-slate-200">{group.standards[0]}</p>
              </div>
            )}
          </div>

          {/* Footer: suppliers + availability */}
          <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06]">
            {/* Supplier dots */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                {group.suppliers.slice(0, 4).map((s, i) => (
                  <div
                    key={s.partnerId}
                    title={s.partnerName}
                    className="h-5 w-5 rounded-full border-2 border-slate-900 flex items-center justify-center text-[8px] font-black text-white"
                    style={{ background: s.color, marginLeft: i > 0 ? "-6px" : "0" }}
                  >
                    {s.partnerName.charAt(0)}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-mono ml-1">
                {group.suppliers.length}
              </span>
            </div>

            {/* Availability */}
            <span className={`flex items-center gap-1 text-[11px] font-mono font-semibold ${availText}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${availDot}`} />
              {availLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Category Tabs ────────────────────────────────────────────────────────────

function CategoryTabs({ active, onSelect }: { active: string | null; onSelect: (c: string | null) => void }) {
  const tabs = [
    { id: null,           name: "All",          Icon: Layers },
    ...categories.map((c) => ({ id: c.id, name: c.name, Icon: CAT_ICON[c.id] ?? Layers })),
  ];

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const color    = tab.id ? (CAT_COLOR[tab.id] ?? "#94a3b8") : "#94a3b8";
        const { Icon } = tab;
        return (
          <button
            key={tab.id ?? "all"}
            onClick={() => onSelect(tab.id)}
            className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
              isActive ? "text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
            }`}
            style={isActive ? { background: `${color}14`, color } : undefined}
          >
            <Icon className="h-3.5 w-3.5" />
            {tab.name}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                style={{ background: color }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Sidebar filter group ─────────────────────────────────────────────────────

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase mb-3">{title}</p>
      {children}
    </div>
  );
}

// ─── Main Catalog ─────────────────────────────────────────────────────────────

export function Catalog({ initialCategory, initialPartner }: { initialCategory?: string; initialPartner?: string }) {
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT, category: initialCategory ?? null, partnerId: initialPartner ?? null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevant");

  const filtered = useMemo(() => {
    let result = productGroups.filter((pg) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const hit = [pg.name, pg.shortName, pg.application, pg.material]
          .some((s) => s.toLowerCase().includes(q))
          || pg.suppliers.some((s) => s.partnerName.toLowerCase().includes(q));
        if (!hit) return false;
      }
      if (filters.materials.length    && !filters.materials.includes(pg.material))    return false;
      if (filters.applications.length && !filters.applications.includes(pg.application)) return false;
      if (filters.category            && pg.category !== filters.category)             return false;
      if (filters.partnerId && !pg.suppliers.some((s) => s.partnerId === filters.partnerId)) return false;

      const [lo, hi] = filters.diameterRange;
      if (lo !== 0 || hi !== 2000) {
        const rel = pg.suppliers.filter((s) => s.diameterMax > 0);
        if (rel.length && !rel.some((s) => s.diameterMax >= lo && s.diameterMin <= hi)) return false;
      }
      return true;
    });

    if (sort === "suppliers-desc") result = [...result].sort((a, b) => b.suppliers.length - a.suppliers.length);
    if (sort === "dia-asc") result = [...result].sort((a, b) => {
      const am = Math.min(...a.suppliers.filter((s) => s.diameterMin > 0).map((s) => s.diameterMin), 9999);
      const bm = Math.min(...b.suppliers.filter((s) => s.diameterMin > 0).map((s) => s.diameterMin), 9999);
      return am - bm;
    });
    if (sort === "dia-desc") result = [...result].sort((a, b) => {
      const am = Math.max(...a.suppliers.filter((s) => s.diameterMax > 0).map((s) => s.diameterMax), 0);
      const bm = Math.max(...b.suppliers.filter((s) => s.diameterMax > 0).map((s) => s.diameterMax), 0);
      return bm - am;
    });

    return result;
  }, [filters, sort]);

  const toggle = (type: "materials" | "applications", val: string) =>
    setFilters((p) => ({
      ...p,
      [type]: p[type].includes(val) ? p[type].filter((v) => v !== val) : [...p[type], val],
    }));

  const clearAll = () => setFilters({ ...DEFAULT });

  // Active chips
  const chips: { label: string; clear: () => void }[] = [];
  if (filters.search)    chips.push({ label: `"${filters.search}"`, clear: () => setFilters((p) => ({ ...p, search: "" })) });
  if (filters.category)  chips.push({ label: CAT_LABEL[filters.category] ?? filters.category, clear: () => setFilters((p) => ({ ...p, category: null })) });
  if (filters.partnerId) {
    const name = partners.find((p) => p.id === filters.partnerId)?.name ?? filters.partnerId;
    chips.push({ label: name, clear: () => setFilters((p) => ({ ...p, partnerId: null })) });
  }
  filters.materials.forEach((m) => chips.push({ label: m, clear: () => toggle("materials", m) }));
  filters.applications.forEach((a) => chips.push({ label: a, clear: () => toggle("applications", a) }));
  if (filters.diameterRange[0] !== 0 || filters.diameterRange[1] !== 2000)
    chips.push({ label: `Ø ${filters.diameterRange[0]}–${filters.diameterRange[1]} mm`, clear: () => setFilters((p) => ({ ...p, diameterRange: [0, 2000] })) });

  return (
    <section className="py-8 sm:py-12">
      <div className="site-shell">

        {/* Category tabs */}
        <div className="mb-8 border-b border-white/[0.06] pb-1">
          <LayoutGroup>
            <CategoryTabs active={filters.category} onSelect={(c) => setFilters((p) => ({ ...p, category: c }))} />
          </LayoutGroup>
        </div>

        {/* Filter chips */}
        {chips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip.label}
                onClick={chip.clear}
                className="inline-flex items-center gap-1.5 border border-white/[0.08] rounded px-2.5 py-1 text-xs text-slate-400 hover:text-white hover:border-white/[0.15] transition-colors font-mono"
              >
                {chip.label}<X className="h-3 w-3 text-slate-600" />
              </button>
            ))}
            <button onClick={clearAll} className="text-xs text-slate-500 hover:text-white transition-colors font-mono ml-1 underline underline-offset-2">
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Sidebar ── */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-7">

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  placeholder="Search products…"
                  value={filters.search}
                  onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-white/[0.08] bg-white/[0.04] text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/40 transition-colors"
                />
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-slate-300"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />Filters
                  {isFiltered(filters) && <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>

              <div className={`space-y-7 ${showFilters ? "block" : "hidden lg:block"}`}>

                <FilterGroup title="Material">
                  <div className="flex flex-wrap gap-1.5">
                    {MATERIALS.map((m) => (
                      <button
                        key={m}
                        onClick={() => toggle("materials", m)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                          filters.materials.includes(m)
                            ? "bg-sky-600 text-white"
                            : "border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.15]"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title="Application">
                  <div className="flex flex-wrap gap-1.5">
                    {APPLICATIONS.map((a) => (
                      <button
                        key={a}
                        onClick={() => toggle("applications", a)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                          filters.applications.includes(a)
                            ? "bg-sky-500 text-white"
                            : "border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.15]"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title="Diameter (mm)">
                  <div className="px-1">
                    <Slider
                      defaultValue={[0, 2000]} max={2000} step={50}
                      value={filters.diameterRange}
                      onValueChange={(v) => setFilters((p) => ({ ...p, diameterRange: v as [number, number] }))}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-[11px] font-mono text-slate-600">{filters.diameterRange[0]} mm</span>
                      <span className="text-[11px] font-mono text-slate-600">{filters.diameterRange[1]} mm</span>
                    </div>
                  </div>
                </FilterGroup>

                <FilterGroup title="Supplier">
                  <div className="space-y-1">
                    {partners.slice(0, 9).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setFilters((prev) => ({ ...prev, partnerId: prev.partnerId === p.id ? null : p.id }))}
                        className={`w-full flex items-center gap-2.5 rounded px-2.5 py-1.5 text-xs text-left transition-colors ${
                          filters.partnerId === p.id
                            ? "bg-white/[0.08] text-white"
                            : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="h-3.5 w-3.5 rounded-sm shrink-0" style={{ background: p.color }} />
                        {p.name}
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                {isFiltered(filters) && (
                  <button onClick={clearAll} className="w-full text-xs text-slate-500 hover:text-white font-mono transition-colors flex items-center justify-center gap-1.5">
                    <X className="w-3 h-3" />Clear all filters
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ── Grid ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-4">
              <p className="text-sm text-slate-500 font-mono">
                <span className="text-white font-bold">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
                {filtered.length > 0 && (
                  <span className="text-slate-700"> · {filtered.reduce((a, g) => a + g.suppliers.length, 0)} supply offers</span>
                )}
              </p>
              <div className="relative">
                <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-600 pointer-events-none" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none border border-white/[0.08] rounded-lg bg-white/[0.04] py-2 pl-7 pr-4 text-xs text-slate-300 focus:outline-none focus:border-sky-500/40 font-mono"
                >
                  <option value="relevant"       className="bg-slate-900">Most relevant</option>
                  <option value="suppliers-desc" className="bg-slate-900">Most suppliers</option>
                  <option value="dia-asc"        className="bg-slate-900">Diameter ↑</option>
                  <option value="dia-desc"       className="bg-slate-900">Diameter ↓</option>
                </select>
              </div>
            </div>

            <LayoutGroup>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map((g) => <ProductCard key={g.id} group={g} />)}
                </AnimatePresence>
              </div>
            </LayoutGroup>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-24 text-center">
                <div className="h-14 w-14 flex items-center justify-center rounded-xl border border-white/[0.08] mb-4">
                  <AlertCircle className="h-7 w-7 text-slate-600" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">No products match</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-xs">
                  Try broadening your search or removing some filters.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={clearAll}
                    className="rounded-lg bg-sky-600 hover:bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                  >
                    Clear Filters
                  </button>
                  <Link
                    href="/contact"
                    className="rounded-lg border border-white/[0.1] px-5 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
