"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  partners,
  partnerTypeLabels,
  type PartnerType,
} from "@/lib/data";
import {
  MapPin,
  ArrowUpRight,
  Package,
  ExternalLink,
  Shield,
} from "lucide-react";
import Link from "next/link";

const allTypes: (PartnerType | "all")[] = [
  "all",
  "manufacturer",
  "hoses",
  "recycler",
  "packaging",
  "local-albania",
];

export default function PartnersPage() {
  const [activeType, setActiveType] = useState<PartnerType | "all">("all");

  const filtered =
    activeType === "all"
      ? partners
      : partners.filter((p) => p.partnerType === activeType);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider mb-6">
            PARTNER DIRECTORY
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            REGIONAL EXCELLENCE.
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            12 manufacturing and supply partners across Albania, Kosovo, North Macedonia, Serbia, Greece, Italy, and Turkey.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {allTypes.map((type) => {
            const label = type === "all" ? "All Partners" : partnerTypeLabels[type];
            const isActive = activeType === type;
            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-orange-400 ${
                  isActive
                    ? "bg-orange-500 text-slate-950"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {label.toUpperCase()}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <div className="space-y-6">
            {filtered.map((partner, index) => (
              <motion.div
                key={partner.id}
                id={partner.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: partner.color }}
                />

                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Left: identity + description + products */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-xl font-black text-slate-950"
                        style={{ backgroundColor: partner.color }}
                      >
                        {partner.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          {partner.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {partner.country}
                          </span>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                            >
                              Website <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-sm font-semibold mb-2"
                      style={{ color: partner.color }}
                    >
                      {partner.tagline}
                    </p>

                    <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Hero metrics */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {partner.heroMetrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] tracking-wider text-slate-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Products */}
                    <div className="flex flex-wrap gap-3">
                      {partner.products.map((product) => (
                        <div
                          key={product.name}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                        >
                          <Package className="w-4 h-4 text-slate-500 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-sm font-medium text-white block truncate">
                              {product.name}
                            </span>
                            <span className="text-xs text-slate-500">
                              {product.type}
                              {product.diameters !== "N/A" && ` · ${product.diameters}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: specs + CTA */}
                  <div className="flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-white/5">
                        <span className="text-[10px] font-mono text-slate-500 block mb-1 tracking-wider">
                          SPECIALTY
                        </span>
                        <span className="text-sm text-white">{partner.specialty}</span>
                      </div>

                      {partner.maxDiameter && (
                        <div className="p-4 rounded-xl bg-white/5">
                          <span className="text-[10px] font-mono text-slate-500 block mb-1 tracking-wider">
                            MAX DIAMETER
                          </span>
                          <span className="text-xl font-bold text-white">
                            {partner.maxDiameter}
                          </span>
                        </div>
                      )}

                      {partner.keyStandards.length > 0 && (
                        <div className="p-4 rounded-xl bg-white/5">
                          <span className="text-[10px] font-mono text-slate-500 block mb-2 tracking-wider">
                            KEY STANDARDS
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {partner.keyStandards.map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-1 rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-cyan-300"
                              >
                                <Shield className="w-2.5 h-2.5" />
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/catalog?partner=${partner.id}`}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all text-sm font-semibold text-orange-400 focus-visible:ring-2 focus-visible:ring-orange-400"
                    >
                      View Products
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-slate-400">No partners in this category.</p>
            <button
              onClick={() => setActiveType("all")}
              className="mt-3 text-sm text-orange-400 hover:text-orange-300"
            >
              Show all partners
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
