"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, User, X, ChevronDown } from "lucide-react";
import { products, partners } from "@/lib/data";
import { Slider } from "@/components/ui/slider";

const materials = ["HDPE", "PVC", "PP"];
const applications = ["Sewage", "Water", "Drainage", "Electrical", "Cable"];

interface FilterState {
  search: string;
  materials: string[];
  applications: string[];
  diameterRange: [number, number];
  category: string | null;
}

function SpecCard({ product }: { product: typeof products[0] }) {
  const [showScale, setShowScale] = useState(false);
  const partner = partners.find((p) => p.name === product.partner);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-950/65 hover:border-cyan-400/50 transition-all"
    >
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span
              className="text-xs font-mono tracking-wider"
              style={{ color: partner?.color || "#f97316" }}
            >
              {product.partner.toUpperCase()}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{product.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-mono rounded bg-white/5 text-slate-400">
              {product.material}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-slate-900 border border-white/10">
            <span className="text-xs font-mono text-slate-500 block mb-1">
              DIAMETER RANGE
            </span>
            <span className="text-lg font-bold text-white">
              Ø{product.diameterMin}-{product.diameterMax}mm
            </span>
          </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-white/10">
            <span className="text-xs font-mono text-slate-500 block mb-1">
              APPLICATION
            </span>
            <span className="text-lg font-bold text-white">
              {product.application}
            </span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <div key={key} className="text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-xs font-medium text-slate-300">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {product.diameterMax >= 1000 && (
          <button
            onClick={() => setShowScale(!showScale)}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors"
          >
            <User className="w-4 h-4" />
            {showScale ? "Hide Scale Reference" : "Show Scale Reference"}
          </button>
        )}

        <AnimatePresence>
          {showScale && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-lg bg-slate-800/50 overflow-hidden"
            >
              <div className="flex items-end justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-full border-4 border-orange-500 bg-orange-500/20"
                    style={{
                      width: `${Math.min(product.diameterMax / 20, 100)}px`,
                      height: `${Math.min(product.diameterMax / 20, 100)}px`,
                    }}
                  />
                  <span className="text-xs font-mono text-slate-400 mt-2">
                    Ø{product.diameterMax}mm
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-16 rounded-t-full bg-slate-600" />
                  <div className="w-12 h-20 bg-slate-600 rounded-b" />
                  <span className="text-xs font-mono text-slate-400 mt-2">
                    ~1.7m Human
                  </span>
                </div>
              </div>
              <p className="text-xs text-center text-slate-400 mt-4 font-mono">
                Scale comparison: {product.diameterMax}mm pipe vs average human height
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: partner?.color || "#f97316" }}
      />
    </motion.div>
  );
}

export function Catalog({ initialCategory }: { initialCategory?: string }) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    materials: [],
    applications: [],
      diameterRange: [12, 2000],
    category: initialCategory || null,
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.partner.toLowerCase().includes(filters.search.toLowerCase())
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
        product.diameterMax < filters.diameterRange[0] ||
        product.diameterMin > filters.diameterRange[1]
      ) {
        return false;
      }

      if (filters.category && product.category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const toggleFilter = (type: "materials" | "applications", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <section className="relative py-16">
      <div className="site-shell">
        <div className="flex flex-col lg:flex-row gap-8">
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
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
                       defaultValue={[12, 2000]}
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
                        {filters.diameterRange[0]}mm
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {filters.diameterRange[1]}mm
                      </span>
                    </div>
                  </div>
                </div>

                {(filters.materials.length > 0 ||
                  filters.applications.length > 0 ||
                  filters.category) && (
                  <button
                    onClick={() =>
                      setFilters({
                        search: "",
                        materials: [],
                        applications: [],
                        diameterRange: [0, 2000],
                        category: null,
                      })
                    }
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-400">
                <span className="font-bold text-white">
                  {filteredProducts.length}
                </span>{" "}
                products found
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <SpecCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-400">
                  No products match your filters.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      search: "",
                      materials: [],
                      applications: [],
                      diameterRange: [0, 2000],
                      category: null,
                    })
                  }
                  className="mt-4 text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
