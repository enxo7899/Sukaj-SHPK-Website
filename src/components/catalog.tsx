"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Eye,
  FileText,
  Send,
  ArrowUpDown,
  AlertCircle,
  Building2,
  Sprout,
  Factory,
  Layers,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products, partners, categories, type Product } from "@/lib/data";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const materials = Array.from(new Set(products.map((p) => p.material))).sort();
const applications = Array.from(
  new Set(products.map((p) => p.application))
).sort();

const categoryIcons: Record<string, React.FC<{ className?: string }>> = {
  civil: Building2,
  agri: Sprout,
  industrial: Factory,
};

const categoryColors: Record<string, string> = {
  civil: "#f97316",
  agri: "#22c55e",
  industrial: "#22d3ee",
};

type SortKey = "relevant" | "dia-asc" | "dia-desc" | "partner";

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

function formatDiameter(min: number, max: number) {
  if (min === 0 && max === 0) return "N/A";
  if (min === max) return `Ø ${min} mm`;
  return `Ø ${min}–${max} mm`;
}

/* ─────────── Quick View Dialog ─────────── */
function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!product) return null;
  const partner = partners.find((p) => p.id === product.partnerId);
  const specEntries = Object.entries(product.specs);
  const showScale = product.diameterMax >= 1000;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-slate-950 border-white/15 text-white max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {product.partner} · {product.material} · {product.application}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-slate-300 leading-relaxed">
          {product.description}
        </p>

        {/* Spec table — blueprint style */}
        <div className="rounded-xl border border-cyan-500/20 bg-slate-900/50 overflow-hidden">
          <div className="grid-lines absolute inset-0 opacity-10 pointer-events-none" />
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-white/5">
                <td className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-slate-500 uppercase w-1/3">
                  Diameter Range
                </td>
                <td className="px-4 py-2.5 font-semibold text-white">
                  {formatDiameter(product.diameterMin, product.diameterMax)}
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                  Material
                </td>
                <td className="px-4 py-2.5 text-white">{product.material}</td>
              </tr>
              {product.pressureClass && (
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                    Pressure / Stiffness
                  </td>
                  <td className="px-4 py-2.5 text-white">
                    {product.pressureClass}
                  </td>
                </tr>
              )}
              {product.standard && product.standard.length > 0 && (
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                    Standard(s)
                  </td>
                  <td className="px-4 py-2.5 text-white">
                    {product.standard.join(", ")}
                  </td>
                </tr>
              )}
              {specEntries.map(([key, value]) => (
                <tr key={key} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className="px-4 py-2.5 text-white">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Scale reference inline for large pipes */}
        {showScale && (
          <div className="flex items-end justify-center gap-8 rounded-xl border border-white/10 bg-slate-900/30 p-4">
            <div className="flex flex-col items-center">
              <div
                className="rounded-full border-4 border-orange-500 bg-orange-500/20"
                style={{
                  width: `${Math.min(product.diameterMax / 20, 100)}px`,
                  height: `${Math.min(product.diameterMax / 20, 100)}px`,
                }}
              />
              <span className="text-xs font-mono text-slate-400 mt-2">
                Ø {product.diameterMax} mm
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-16 rounded-t-full bg-slate-600" />
              <div className="w-12 h-20 bg-slate-600 rounded-b" />
              <span className="text-xs font-mono text-slate-400 mt-2">
                ~1.7 m Human
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          {product.datasheetUrl && (
            <a
              href={product.datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5"
            >
              <FileText className="w-4 h-4" /> Download PDF
            </a>
          )}
          <Link
            href={`/contact?product=${product.slug}&partner=${product.partnerId}`}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400"
          >
            <Send className="w-4 h-4" /> Request Quote
          </Link>
        </div>

        {partner && (
          <div className="flex items-center gap-2 pt-1 border-t border-white/10">
            <div
              className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-black text-slate-950"
              style={{ backgroundColor: partner.color }}
            >
              {partner.name.charAt(0)}
            </div>
            <span className="text-xs text-slate-400">
              Supplied by{" "}
              <Link
                href={`/partners#${partner.id}`}
                className="text-white hover:text-orange-400"
              >
                {partner.name}
              </Link>
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProductImage({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = product.image || `/media/products/${product.slug}.webp`;
  const categoryColor = categoryColors[product.category] || "#f97316";

  if (imageError || !product.image) {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${categoryColor}15, ${categoryColor}05)`,
        }}
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border-2"
          style={{ borderColor: `${categoryColor}40` }}
        >
          <Layers className="h-8 w-8" style={{ color: categoryColor }} />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={product.name}
      fill
      className="object-cover"
      onError={() => setImageError(true)}
    />
  );
}

function ScaleIndicator({ diameterMax }: { diameterMax: number }) {
  if (diameterMax < 500) return null;

  const pipeSize = Math.min(diameterMax / 25, 60);
  const humanHeight = 40;

  return (
    <div className="flex items-end justify-center gap-4 rounded-lg border border-white/10 bg-slate-900/50 p-3">
      <div className="flex flex-col items-center">
        <div
          className="rounded-full border-2 border-orange-500 bg-orange-500/20"
          style={{ width: pipeSize, height: pipeSize }}
        />
        <span className="mt-1 text-[9px] font-mono text-slate-500">Ø {diameterMax}mm</span>
      </div>
      <div className="flex flex-col items-center">
        <User className="text-slate-500" style={{ height: humanHeight, width: humanHeight * 0.4 }} />
        <span className="mt-1 text-[9px] font-mono text-slate-500">~1.7m</span>
      </div>
    </div>
  );
}

/* ─────────── Product Card ─────────── */
function SpecCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: (p: Product) => void;
}) {
  const partner = partners.find((p) => p.id === product.partnerId);
  const CategoryIcon = categoryIcons[product.category] || Layers;
  const catColor = categoryColors[product.category] || "#f97316";
  const showScale = product.diameterMax >= 800;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950 hover:border-cyan-400/40 transition-all"
    >
      <div className="absolute inset-0 grid-lines opacity-10" />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${catColor}80, transparent)`,
        }}
      />

      {/* Product Image */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-900">
        <ProductImage product={product} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        
        {/* Category badge */}
        <div
          className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-mono tracking-wider"
          style={{ backgroundColor: `${catColor}20`, color: catColor }}
        >
          <span style={{ color: catColor }}>
            <CategoryIcon className="h-3 w-3" />
          </span>
          {product.category.toUpperCase()}
        </div>

        {/* Material badge */}
        <div className="absolute right-3 top-3 rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1 text-[10px] font-mono text-slate-300">
          {product.material}
        </div>
      </div>

      <div className="p-5">
        {/* Partner + Name */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            {partner && (
              <div
                className="h-5 w-5 shrink-0 rounded flex items-center justify-center text-[9px] font-black text-slate-950"
                style={{ backgroundColor: partner.color }}
              >
                {partner.name.charAt(0)}
              </div>
            )}
            <span
              className="text-[10px] font-mono tracking-wider truncate"
              style={{ color: partner?.color || "#f97316" }}
            >
              {product.partner.toUpperCase()}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight">
            {product.name}
          </h3>
        </div>

        {/* Key specs grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg bg-slate-900/80 border border-white/5 p-2">
            <span className="text-[9px] font-mono text-slate-500 block tracking-wider">
              DIAMETER
            </span>
            <span className="text-sm font-bold text-white">
              {formatDiameter(product.diameterMin, product.diameterMax)}
            </span>
          </div>
          <div className="rounded-lg bg-slate-900/80 border border-white/5 p-2">
            <span className="text-[9px] font-mono text-slate-500 block tracking-wider">
              APPLICATION
            </span>
            <span className="text-sm font-bold text-white">
              {product.application}
            </span>
          </div>
        </div>

        {/* Pressure class */}
        {product.pressureClass && (
          <div className="mb-3 inline-block rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 font-mono text-[10px] tracking-wider text-cyan-300">
            {product.pressureClass}
          </div>
        )}

        {/* Standards */}
        {product.standard && product.standard.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.standard.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-slate-400"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Scale indicator for large pipes */}
        {showScale && (
          <div className="mb-3">
            <ScaleIndicator diameterMax={product.diameterMax} />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 border-t border-white/10 pt-3">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <Eye className="w-3.5 h-3.5" /> View Specs
          </button>
          <Link
            href={`/contact?product=${product.slug}&partner=${product.partnerId}`}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-orange-500 py-2.5 text-xs font-semibold text-slate-950 hover:bg-orange-400 transition-colors focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <Send className="w-3.5 h-3.5" /> Quote
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: catColor }}
      />
    </motion.div>
  );
}

/* ─────────── Category Tabs ─────────── */
function CategoryTabs({
  activeCategory,
  onSelect,
}: {
  activeCategory: string | null;
  onSelect: (cat: string | null) => void;
}) {
  const allCategories = [{ id: null, name: "All Products", icon: Layers }, ...categories.map((c) => ({
    id: c.id,
    name: c.name,
    icon: categoryIcons[c.id] || Layers,
  }))];

  return (
    <div className="mb-8 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max pb-2">
        {allCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const color = cat.id ? categoryColors[cat.id] : "#94a3b8";

          return (
            <motion.button
              key={cat.id ?? "all"}
              onClick={() => onSelect(cat.id)}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-orange-400 ${
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              style={{
                backgroundColor: isActive ? `${color}20` : undefined,
                borderColor: isActive ? `${color}40` : undefined,
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

/* ─────────── Main Catalog ─────────── */
export function Catalog({
  initialCategory,
  initialPartner,
}: {
  initialCategory?: string;
  initialPartner?: string;
}) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    category: initialCategory || null,
    partnerId: initialPartner || null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevant");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.partner.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.application
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.materials.length > 0 &&
        !filters.materials.includes(product.material)
      ) {
        return false;
      }
      if (
        filters.applications.length > 0 &&
        !filters.applications.includes(product.application)
      ) {
        return false;
      }
      if (
        product.diameterMax !== 0 &&
        (product.diameterMax < filters.diameterRange[0] ||
          product.diameterMin > filters.diameterRange[1])
      ) {
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (filters.partnerId && product.partnerId !== filters.partnerId) {
        return false;
      }
      return true;
    });

    switch (sort) {
      case "dia-asc":
        result = [...result].sort((a, b) => a.diameterMin - b.diameterMin);
        break;
      case "dia-desc":
        result = [...result].sort((a, b) => b.diameterMax - a.diameterMax);
        break;
      case "partner":
        result = [...result].sort((a, b) =>
          a.partner.localeCompare(b.partner)
        );
        break;
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

  /* Chip helpers */
  const chips: { label: string; onRemove: () => void }[] = [];
  if (filters.search) {
    chips.push({
      label: `"${filters.search}"`,
      onRemove: () => setFilters((p) => ({ ...p, search: "" })),
    });
  }
  if (filters.category) {
    chips.push({
      label: `Category: ${filters.category}`,
      onRemove: () => setFilters((p) => ({ ...p, category: null })),
    });
  }
  if (filters.partnerId) {
    const pName =
      partners.find((p) => p.id === filters.partnerId)?.name ??
      filters.partnerId;
    chips.push({
      label: `Partner: ${pName}`,
      onRemove: () => setFilters((p) => ({ ...p, partnerId: null })),
    });
  }
  filters.materials.forEach((m) =>
    chips.push({
      label: m,
      onRemove: () => toggleFilter("materials", m),
    })
  );
  filters.applications.forEach((a) =>
    chips.push({
      label: a,
      onRemove: () => toggleFilter("applications", a),
    })
  );
  if (filters.diameterRange[0] !== 0 || filters.diameterRange[1] !== 2000) {
    chips.push({
      label: `Ø ${filters.diameterRange[0]}–${filters.diameterRange[1]} mm`,
      onRemove: () =>
        setFilters((p) => ({ ...p, diameterRange: [0, 2000] })),
    });
  }

  return (
    <section className="relative py-8 sm:py-16">
      <div className="absolute inset-0 noise opacity-50" />
      
      <div className="site-shell relative">
        {/* Category Tabs */}
        <LayoutGroup>
          <CategoryTabs
            activeCategory={filters.category}
            onSelect={(cat) => setFilters((p) => ({ ...p, category: cat }))}
          />
        </LayoutGroup>

        {/* Filter chips */}
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
              className="text-xs text-orange-400 hover:text-orange-300 ml-1"
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
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                  {hasActiveFilters(filters) && (
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                  )}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
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
                  <h4 className="text-sm font-bold tracking-wider text-white mb-4">
                    MATERIAL
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((material) => (
                      <button
                        key={material}
                        onClick={() => toggleFilter("materials", material)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-orange-400 ${
                          filters.materials.includes(material)
                            ? "bg-orange-500 text-slate-950"
                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-bold tracking-wider text-white mb-4">
                    APPLICATION
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((app) => (
                      <button
                        key={app}
                        onClick={() => toggleFilter("applications", app)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          filters.applications.includes(app)
                            ? "bg-cyan-500 text-slate-950"
                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-bold tracking-wider text-white mb-4">
                    DIAMETER (MM)
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
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-sm text-slate-400">
                <span className="font-bold text-white">
                  {filteredProducts.length}
                </span>{" "}
                product{filteredProducts.length !== 1 ? "s" : ""} found
              </p>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-4 text-xs text-slate-300 focus:outline-none focus:border-orange-500/50"
                >
                  <option value="relevant" className="bg-slate-900">
                    Most relevant
                  </option>
                  <option value="dia-asc" className="bg-slate-900">
                    Diameter ↑
                  </option>
                  <option value="dia-desc" className="bg-slate-900">
                    Diameter ↓
                  </option>
                  <option value="partner" className="bg-slate-900">
                    Partner
                  </option>
                </select>
                <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <LayoutGroup>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <SpecCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </LayoutGroup>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <AlertCircle className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  No products match your filters
                </h3>
                <p className="text-sm text-slate-400 mb-6 max-w-md">
                  Try broadening your search criteria, removing some filters, or
                  exploring a different product category.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={clearAll}
                    className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-orange-400 transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <Link
                    href="/contact"
                    className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Contact Us for Custom Needs
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickViewDialog
        product={quickViewProduct}
        open={quickViewProduct !== null}
        onOpenChange={(open) => {
          if (!open) setQuickViewProduct(null);
        }}
      />
    </section>
  );
}
