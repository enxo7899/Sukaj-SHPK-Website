"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Package,
  ArrowRight,
  Send,
  Globe,
  Shield,
  Building2,
  Sprout,
  Factory,
  Layers,
  ChevronRight,
  MapPin,
  Ruler,
} from "lucide-react";
import type { ProductGroup, SupplierOffer, DimensionRow } from "@/lib/products-data";
import { productGroups } from "@/lib/products-data";
import { partners } from "@/lib/data";

// ─── Constants ────────────────────────────────────────────────────────────────

const availConfig = {
  "in-stock": {
    label: "In Stock",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.3)",
    Icon: CheckCircle2,
  },
  partial: {
    label: "Partial Stock",
    color: "#facc15",
    bg: "rgba(250,204,21,0.12)",
    border: "rgba(250,204,21,0.3)",
    Icon: Clock,
  },
  "on-order": {
    label: "On Order",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.3)",
    Icon: Package,
  },
} as const;

const rowAvailConfig = {
  stock: {
    row: "",
    text: "text-white",
    dot: "bg-green-500",
    label: "In Stock",
  },
  partial: {
    row: "bg-cyan-500/[0.02]",
    text: "text-cyan-200",
    dot: "bg-yellow-400",
    label: "Partial",
  },
  order: {
    row: "bg-orange-500/[0.015]",
    text: "text-slate-400",
    dot: "bg-orange-500",
    label: "On Order",
  },
} as const;

const categoryMeta = {
  civil: { Icon: Building2, color: "#0891b2", label: "Civil Infrastructure" },
  agri: { Icon: Sprout, color: "#22c55e", label: "Agriculture" },
  industrial: { Icon: Factory, color: "#22d3ee", label: "Industrial" },
} as const;

// ─── Supplier Card ─────────────────────────────────────────────────────────────

function SupplierCard({ supplier }: { supplier: SupplierOffer }) {
  const cfg = availConfig[supplier.availability];
  const { Icon } = cfg;

  return (
    <div
      className="relative flex flex-col rounded-2xl border bg-slate-900/60 overflow-hidden"
      style={{ borderColor: `${supplier.color}25` }}
    >
      <div className="h-1 w-full" style={{ background: supplier.color }} />

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div
                className="h-6 w-6 rounded flex items-center justify-center text-[10px] font-black shrink-0"
                style={{ background: `${supplier.color}25`, color: supplier.color }}
              >
                {supplier.partnerName.charAt(0)}
              </div>
              <h3 className="font-bold text-white text-sm leading-tight">
                {supplier.partnerName}
              </h3>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono pl-8">
              <MapPin className="w-3 h-3" />
              {supplier.country}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold shrink-0"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            <Icon className="w-3 h-3" />
            {cfg.label}
          </div>
        </div>

        {/* Stock/order notes */}
        {supplier.stockNote && (
          <div className="flex gap-2 text-xs text-green-300/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
            <span>{supplier.stockNote}</span>
          </div>
        )}
        {supplier.orderNote && (
          <div className="flex gap-2 text-xs text-orange-300/70">
            <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
            <span>{supplier.orderNote}</span>
          </div>
        )}

        {/* Diameter range */}
        {(supplier.diameterMin > 0 || supplier.diameterMax > 0) && (
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3">
            <span className="block text-[9px] font-mono text-slate-500 tracking-widest mb-1">
              DIAMETER RANGE
            </span>
            <span className="text-sm font-bold font-mono" style={{ color: supplier.color }}>
              Ø {supplier.diameterMin}–{supplier.diameterMax} mm
            </span>
          </div>
        )}

        {/* Pressure classes */}
        {supplier.pressureClasses && supplier.pressureClasses.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {supplier.pressureClasses.map((pc) => (
              <span
                key={pc}
                className="rounded border px-2 py-0.5 font-mono text-[10px] tracking-wider"
                style={{
                  borderColor: `${supplier.color}30`,
                  color: supplier.color,
                  background: `${supplier.color}10`,
                }}
              >
                {pc}
              </span>
            ))}
          </div>
        )}

        {/* Specific specs */}
        {supplier.specificSpecs &&
          Object.keys(supplier.specificSpecs).length > 0 && (
            <div className="rounded-xl border border-white/[0.06] bg-slate-950/40 overflow-hidden">
              <table className="w-full text-xs">
                <tbody>
                  {Object.entries(supplier.specificSpecs).map(([k, v]) => (
                    <tr
                      key={k}
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <td className="px-3 py-2 font-mono text-[9px] text-slate-500 tracking-wider uppercase w-[45%]">
                        {k}
                      </td>
                      <td className="px-3 py-2 text-slate-300">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        {/* Standards */}
        {supplier.standards && supplier.standards.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {supplier.standards.map((s) => (
              <span
                key={s}
                className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-slate-500"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/contact?partner=${supplier.partnerId}&product=inquiry`}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white transition-all hover:brightness-110"
          style={{
            background: `${supplier.color}20`,
            border: `1px solid ${supplier.color}35`,
          }}
        >
          <Send className="w-3.5 h-3.5" />
          Request Quote
        </Link>
      </div>
    </div>
  );
}

// ─── Dimension Table ───────────────────────────────────────────────────────────

function DimensionTable({ rows }: { rows: DimensionRow[] }) {
  const wallClasses = Array.from(
    new Set(rows.flatMap((r) => Object.keys(r.wallByClass ?? {})))
  );
  const hasSN = rows.some((r) => r.sn);
  const hasOD = rows.some((r) => r.od !== undefined);
  const hasWall = wallClasses.length > 0;
  const hasWeight = rows.some((r) => r.weightPerMeter !== undefined);
  const hasLengths = rows.some((r) => r.lengths !== undefined);

  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-slate-900/50">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/[0.08] bg-slate-950/70">
            <th className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-slate-500 uppercase whitespace-nowrap">
              DN (mm)
            </th>
            {hasOD && (
              <th className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-slate-500 uppercase whitespace-nowrap">
                OD (mm)
              </th>
            )}
            {hasWall &&
              wallClasses.map((wc) => (
                <th
                  key={wc}
                  className="px-4 py-3 text-right font-mono text-[10px] tracking-widest text-slate-500 uppercase whitespace-nowrap"
                >
                  e {wc} (mm)
                </th>
              ))}
            {hasSN && (
              <>
                <th className="px-4 py-3 text-center font-mono text-[10px] tracking-widest text-slate-500 uppercase whitespace-nowrap">
                  SN4
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] tracking-widest text-slate-500 uppercase whitespace-nowrap">
                  SN8
                </th>
              </>
            )}
            {hasWeight && (
              <th className="px-4 py-3 text-right font-mono text-[10px] tracking-widest text-slate-500 uppercase whitespace-nowrap">
                kg/m
              </th>
            )}
            {hasLengths && (
              <th className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-slate-500 uppercase whitespace-nowrap">
                Lengths
              </th>
            )}
            <th className="px-4 py-3 text-center font-mono text-[10px] tracking-widest text-slate-500 uppercase whitespace-nowrap">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const cfg = rowAvailConfig[row.available];
            return (
              <tr
                key={row.dn}
                className={`border-b border-white/[0.05] last:border-0 transition-colors hover:bg-white/[0.02] ${cfg.row}`}
              >
                <td className={`px-4 py-2.5 font-mono font-bold ${cfg.text}`}>
                  {row.dn}
                </td>
                {hasOD && (
                  <td className={`px-4 py-2.5 font-mono ${cfg.text}`}>
                    {row.od ?? "—"}
                  </td>
                )}
                {hasWall &&
                  wallClasses.map((wc) => (
                    <td
                      key={wc}
                      className={`px-4 py-2.5 font-mono text-right ${cfg.text}`}
                    >
                      {row.wallByClass?.[wc] ?? "—"}
                    </td>
                  ))}
                {hasSN && (
                  <>
                    <td className="px-4 py-2.5 text-center">
                      {row.sn?.sn4 ? (
                        <span className="text-green-400 font-bold">✓</span>
                      ) : (
                        <span className="text-slate-700">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {row.sn?.sn8 ? (
                        <span className="text-green-400 font-bold">✓</span>
                      ) : (
                        <span className="text-slate-700">—</span>
                      )}
                    </td>
                  </>
                )}
                {hasWeight && (
                  <td className={`px-4 py-2.5 font-mono text-right ${cfg.text}`}>
                    {row.weightPerMeter ?? "—"}
                  </td>
                )}
                {hasLengths && (
                  <td className={`px-4 py-2.5 font-mono text-xs ${cfg.text}`}>
                    {row.lengths ?? "—"}
                  </td>
                )}
                <td className="px-4 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}
                    />
                    {cfg.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ProductDetailPage({ product }: { product: ProductGroup }) {
  const [imageError, setImageError] = useState(false);
  const catMeta = categoryMeta[product.category];
  const CatIcon = catMeta.Icon;

  const relatedProducts = productGroups
    .filter((g) => g.id !== product.id && g.category === product.category)
    .slice(0, 3);

  const overallAvailability: keyof typeof availConfig = (() => {
    if (product.suppliers.every((s) => s.availability === "in-stock"))
      return "in-stock";
    if (
      product.suppliers.some(
        (s) => s.availability === "in-stock" || s.availability === "partial"
      )
    )
      return "partial";
    return "on-order";
  })();

  const availCfg = availConfig[overallAvailability];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[52vh] min-h-[380px] overflow-hidden">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover opacity-35"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${catMeta.color}15, transparent)`,
            }}
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 80% 50%, ${catMeta.color}08, transparent 60%)`,
          }}
        />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 site-shell pb-10 pt-28">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-white text-xs font-mono mb-5 transition-colors group"
          >
            <ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Back to Catalog
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono font-bold"
              style={{
                background: `${catMeta.color}20`,
                color: catMeta.color,
                border: `1px solid ${catMeta.color}40`,
              }}
            >
              <CatIcon className="w-3 h-3" />
              {catMeta.label}
            </span>

            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold"
              style={{
                background: availCfg.bg,
                color: availCfg.color,
                border: `1px solid ${availCfg.border}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: availCfg.color }}
              />
              {product.suppliers.length} supplier
              {product.suppliers.length !== 1 ? "s" : ""}
            </span>
          </div>

          <h1
            className="font-black text-white leading-[1.05] tracking-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm text-slate-400 font-mono">
              {product.material}
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-sm text-slate-400 font-mono">
              {product.application}
            </span>
            {product.standards.map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="text-slate-700">·</span>
                <span className="text-sm text-slate-400 font-mono">{s}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="site-shell py-12 space-y-16">

        {/* Description + key specs */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-6 bg-cyan-500/50" />
              <span className="font-mono text-[10px] tracking-widest text-cyan-400/80 uppercase">
                Product Overview
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-slate-500 font-mono hover:text-slate-300 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900/60 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.08] bg-slate-950/40">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                  Technical Specifications
                </span>
              </div>
              <table className="w-full">
                <tbody>
                  {Object.entries(product.keyProperties).map(([k, v]) => (
                    <tr
                      key={k}
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <td className="px-5 py-3 font-mono text-[10px] text-slate-500 tracking-wider uppercase w-[42%] align-top">
                        {k}
                      </td>
                      <td className="px-5 py-3 text-slate-200 text-xs">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Suppliers ── */}
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <div className="flex items-center gap-2.5 shrink-0">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Available From</h2>
              <span className="rounded-full bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 text-xs font-bold text-cyan-400">
                {product.suppliers.length}{" "}
                {product.suppliers.length === 1 ? "supplier" : "suppliers"}
              </span>
            </div>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <p className="text-center text-xs text-slate-600 font-mono mb-8">
            All suppliers ship across Albania · Kosovo · North Macedonia · Balkans
          </p>

          <div
            className={`grid gap-5 ${
              product.suppliers.length === 1
                ? "max-w-sm"
                : product.suppliers.length === 2
                ? "sm:grid-cols-2 max-w-2xl"
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {product.suppliers.map((supplier) => (
              <SupplierCard key={supplier.partnerId} supplier={supplier} />
            ))}
          </div>

          {/* ── Also Available From — Cross-Provider Callout ── */}
          {product.alsoAvailableFrom && product.alsoAvailableFrom.length > 0 && (() => {
            const alsoPartners = product.alsoAvailableFrom!
              .map((id) => partners.find((p) => p.id === id))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            if (alsoPartners.length === 0) return null;
            return (
              <div className="mt-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.06] to-transparent p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-lg bg-cyan-500/15 p-2.5 border border-cyan-500/25">
                    <Layers className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-cyan-300/80 font-mono mb-1">
                      Cross-Supplier Equivalent
                    </p>
                    <p className="text-sm text-slate-200 mb-3">
                      An equivalent product is also available from{" "}
                      {alsoPartners.length > 1 ? "these partners" : "this partner"}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {alsoPartners.map((p) => (
                        <Link
                          key={p.id}
                          href={`/catalog?partner=${p.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-sm font-semibold text-cyan-200 hover:border-cyan-400/60 hover:bg-cyan-500/20 transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          {p.name}
                          <span className="text-xs text-cyan-300/60 font-mono">· {p.country}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── Dimension Table ── */}
        {product.dimensions && product.dimensions.length > 0 && (
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Ruler className="w-5 h-5 text-cyan-400 shrink-0" />
              <h2 className="text-lg font-bold text-white">Dimension Table</h2>
              <div className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  In Stock
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  Partial
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  On Order
                </span>
              </div>
            </div>
            <DimensionTable rows={product.dimensions} />
          </div>
        )}

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Related Products</h2>
              <Link
                href={`/catalog?category=${product.category}`}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 transition-colors"
              >
                View all {product.category}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProducts.map((related) => {
                const relCat = categoryMeta[related.category];
                const RelIcon = relCat.Icon;
                return (
                  <Link
                    key={related.id}
                    href={`/catalog/${related.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900/60 p-5 hover:border-white/[0.18] hover:bg-slate-900/90 transition-all"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${relCat.color}40, transparent)`,
                      }}
                    />
                    <div className="flex items-start gap-3 pr-6">
                      <div
                        className="rounded-lg p-2 shrink-0"
                        style={{ background: `${relCat.color}15` }}
                      >
                        <RelIcon
                          className="w-4 h-4"
                          style={{ color: relCat.color }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors leading-snug">
                          {related.shortName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {related.application}
                        </p>
                        <p className="text-[11px] text-slate-600 mt-1">
                          {related.suppliers.length} supplier
                          {related.suppliers.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-hover:text-cyan-400 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Quote CTA ── */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/15 bg-slate-900/60 p-8 sm:p-12 text-center">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, #22d3ee, transparent 65%)",
            }}
          />
          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.25em] text-cyan-400/70 uppercase mb-3">
              Ready to order?
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Get exact pricing &amp; lead times
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Tell us your dimensions and quantity — we&apos;ll come back with
              confirmed availability and pricing from all relevant suppliers,
              usually within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/contact?product=${product.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 transition-colors"
              >
                <Send className="w-4 h-4" />
                Request Quote
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm text-white hover:bg-white/[0.08] transition-colors"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
