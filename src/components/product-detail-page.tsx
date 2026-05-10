"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Package,
  Send,
  ChevronRight,
  MapPin,
  ArrowRight,
  Layers,
} from "lucide-react";
import type { ProductGroup, SupplierOffer, DimensionRow } from "@/lib/products-data";
import { productGroups } from "@/lib/products-data";

// ─── Availability config ──────────────────────────────────────────────────────

const AVAIL = {
  "in-stock": {
    label: "In Stock",
    dot: "bg-emerald-500",
    text: "text-emerald-400",
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    Icon: CheckCircle2,
  },
  partial: {
    label: "Partial Stock",
    dot: "bg-amber-400",
    text: "text-amber-400",
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Icon: Clock,
  },
  "on-order": {
    label: "On Order",
    dot: "bg-orange-500",
    text: "text-orange-400",
    badge: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    Icon: Package,
  },
} as const;

const ROW_AVAIL = {
  stock:   { text: "text-slate-200", dot: "bg-emerald-500", label: "In Stock" },
  partial: { text: "text-slate-300", dot: "bg-amber-400",   label: "Partial" },
  order:   { text: "text-slate-500", dot: "bg-orange-500",  label: "On Order" },
} as const;

const CAT_LABEL: Record<string, string> = {
  civil:      "Civil Infrastructure",
  agri:       "Agriculture",
  industrial: "Industrial",
};

// ─── helpers ─────────────────────────────────────────────────────────────────

function overallAvail(pg: ProductGroup): keyof typeof AVAIL {
  if (pg.suppliers.every((s) => s.availability === "in-stock")) return "in-stock";
  if (pg.suppliers.some((s) => s.availability !== "on-order")) return "partial";
  return "on-order";
}

// ─── Dimension Table ──────────────────────────────────────────────────────────

function DimensionTable({ rows }: { rows: DimensionRow[] }) {
  const wallClasses = Array.from(new Set(rows.flatMap((r) => Object.keys(r.wallByClass ?? {}))));
  const hasSN      = rows.some((r) => r.sn);
  const hasOD      = rows.some((r) => r.od !== undefined);
  const hasWall    = wallClasses.length > 0;
  const hasLengths = rows.some((r) => r.lengths);

  return (
    <div className="overflow-x-auto border border-white/[0.07] rounded-lg">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/[0.07] bg-white/[0.03]">
            <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.15em] text-slate-500 uppercase whitespace-nowrap">
              DN mm
            </th>
            {hasOD && (
              <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.15em] text-slate-500 uppercase whitespace-nowrap">
                OD mm
              </th>
            )}
            {hasWall && wallClasses.map((wc) => (
              <th key={wc} className="px-4 py-3 text-right font-mono text-[10px] tracking-[0.15em] text-slate-500 uppercase whitespace-nowrap">
                e {wc} mm
              </th>
            ))}
            {hasSN && (
              <>
                <th className="px-4 py-3 text-center font-mono text-[10px] tracking-[0.15em] text-slate-500 uppercase">SN4</th>
                <th className="px-4 py-3 text-center font-mono text-[10px] tracking-[0.15em] text-slate-500 uppercase">SN8</th>
              </>
            )}
            {hasLengths && (
              <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.15em] text-slate-500 uppercase whitespace-nowrap">
                Lengths
              </th>
            )}
            <th className="px-4 py-3 text-center font-mono text-[10px] tracking-[0.15em] text-slate-500 uppercase whitespace-nowrap">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const r = ROW_AVAIL[row.available];
            return (
              <tr
                key={row.dn}
                className={`border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors ${
                  row.available === "order" ? "opacity-60" : ""
                }`}
              >
                <td className={`px-4 py-2.5 font-mono font-semibold ${r.text}`}>{row.dn}</td>
                {hasOD && <td className={`px-4 py-2.5 font-mono ${r.text}`}>{row.od ?? "—"}</td>}
                {hasWall && wallClasses.map((wc) => (
                  <td key={wc} className={`px-4 py-2.5 font-mono text-right ${r.text}`}>
                    {row.wallByClass?.[wc] ?? "—"}
                  </td>
                ))}
                {hasSN && (
                  <>
                    <td className="px-4 py-2.5 text-center font-mono text-sm">
                      {row.sn?.sn4 ? <span className="text-emerald-400">✓</span> : <span className="text-slate-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-center font-mono text-sm">
                      {row.sn?.sn8 ? <span className="text-emerald-400">✓</span> : <span className="text-slate-700">—</span>}
                    </td>
                  </>
                )}
                {hasLengths && <td className={`px-4 py-2.5 font-mono text-xs ${r.text}`}>{row.lengths ?? "—"}</td>}
                <td className="px-4 py-2.5">
                  <span className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${r.dot}`} />
                    {r.label}
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

// ─── Single Supplier Row ──────────────────────────────────────────────────────

function SingleSupplier({ s }: { s: SupplierOffer }) {
  const a = AVAIL[s.availability];
  const { Icon } = a;
  return (
    <div className="border border-white/[0.07] rounded-lg overflow-hidden">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.07] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded flex items-center justify-center text-xs font-black text-white"
            style={{ background: s.color }}
          >
            {s.partnerName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{s.partnerName}</p>
            <p className="text-xs text-slate-500 font-mono flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />{s.country}
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-semibold ${a.badge}`}>
          <Icon className="w-3.5 h-3.5" />{a.label}
        </span>
      </div>

      {/* Details */}
      <div className="px-6 py-5 grid sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          {s.diameterMin > 0 || s.diameterMax > 0 ? (
            <div>
              <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-1">Diameter Range</p>
              <p className="font-mono font-bold text-white">Ø {s.diameterMin}–{s.diameterMax} mm</p>
            </div>
          ) : null}
          {s.pressureClasses && s.pressureClasses.length > 0 && (
            <div>
              <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-2">Pressure Classes</p>
              <div className="flex flex-wrap gap-1.5">
                {s.pressureClasses.map((pc) => (
                  <span key={pc} className="font-mono text-xs border border-white/10 bg-white/[0.04] text-slate-300 rounded px-2 py-0.5">{pc}</span>
                ))}
              </div>
            </div>
          )}
          {s.standards && s.standards.length > 0 && (
            <div>
              <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-2">Standards</p>
              <div className="flex flex-wrap gap-1.5">
                {s.standards.map((st) => (
                  <span key={st} className="font-mono text-xs border border-white/10 bg-white/[0.04] text-slate-400 rounded px-2 py-0.5">{st}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {s.stockNote && (
            <div className="flex gap-2.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono tracking-[0.12em] text-emerald-600 uppercase mb-0.5">In Stock</p>
                <p className="text-slate-300 text-xs leading-relaxed">{s.stockNote}</p>
              </div>
            </div>
          )}
          {s.orderNote && (
            <div className="flex gap-2.5 text-sm">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono tracking-[0.12em] text-amber-600 uppercase mb-0.5">On Order</p>
                <p className="text-slate-400 text-xs leading-relaxed">{s.orderNote}</p>
              </div>
            </div>
          )}
          {s.specificSpecs && Object.keys(s.specificSpecs).length > 0 && (
            <div className="pt-2">
              {Object.entries(s.specificSpecs).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-1 border-b border-white/[0.04] last:border-0">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{k}</span>
                  <span className="text-xs text-slate-300 text-right">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-5">
        <Link
          href={`/contact?partner=${s.partnerId}&product=inquiry`}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 transition-colors px-5 py-2.5 text-sm font-semibold text-white"
        >
          <Send className="w-4 h-4" />
          Request Quote from {s.partnerName}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

// ─── Multi-Supplier Card ──────────────────────────────────────────────────────

function SupplierCard({ s }: { s: SupplierOffer }) {
  const a = AVAIL[s.availability];
  const { Icon } = a;
  return (
    <div className="border border-white/[0.07] rounded-lg overflow-hidden flex flex-col">
      <div
        className="h-0.5 w-full"
        style={{ background: s.color }}
      />
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className="h-7 w-7 rounded flex items-center justify-center text-[11px] font-black text-white shrink-0"
              style={{ background: s.color }}
            >
              {s.partnerName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-white text-sm leading-tight">{s.partnerName}</p>
              <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5" />{s.country}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-[11px] font-semibold shrink-0 ${a.badge}`}>
            <Icon className="w-3 h-3" />{a.label}
          </span>
        </div>

        {/* Diameter */}
        {(s.diameterMin > 0 || s.diameterMax > 0) && (
          <div className="bg-white/[0.03] border border-white/[0.05] rounded px-3 py-2">
            <p className="text-[9px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-0.5">Diameter</p>
            <p className="font-mono font-bold text-sm text-white">Ø {s.diameterMin}–{s.diameterMax} mm</p>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-2 flex-1">
          {s.stockNote && (
            <div className="flex gap-2 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-400 leading-relaxed">{s.stockNote}</span>
            </div>
          )}
          {s.orderNote && (
            <div className="flex gap-2 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-slate-500 leading-relaxed">{s.orderNote}</span>
            </div>
          )}
        </div>

        {/* Pressure classes */}
        {s.pressureClasses && s.pressureClasses.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {s.pressureClasses.map((pc) => (
              <span key={pc} className="font-mono text-[10px] border border-white/[0.08] text-slate-400 rounded px-1.5 py-0.5">{pc}</span>
            ))}
          </div>
        )}

        {/* Specific specs mini-table */}
        {s.specificSpecs && Object.keys(s.specificSpecs).length > 0 && (
          <div className="border border-white/[0.05] rounded overflow-hidden">
            {Object.entries(s.specificSpecs).slice(0, 3).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2 px-3 py-1.5 border-b border-white/[0.04] last:border-0 bg-white/[0.02]">
                <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider">{k}</span>
                <span className="text-[11px] text-slate-400 text-right">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Quote CTA */}
        <Link
          href={`/contact?partner=${s.partnerId}&product=inquiry`}
          className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.15] transition-colors py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <Send className="w-3.5 h-3.5" />Request Quote
        </Link>
      </div>
    </div>
  );
}

// ─── Page section divider ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase whitespace-nowrap">
        {children}
      </p>
      <div className="flex-1 border-t border-white/[0.06]" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProductDetailPage({ product }: { product: ProductGroup }) {
  const [imgError, setImgError] = useState(false);
  const avail = overallAvail(product);
  const a = AVAIL[avail];
  const { Icon: AvailIcon } = a;
  const isSingle = product.suppliers.length === 1;

  const related = productGroups
    .filter((g) => g.id !== product.id && g.category === product.category)
    .slice(0, 4);

  // Diameter span across all suppliers
  const diamSuppliers = product.suppliers.filter((s) => s.diameterMax > 0);
  const dMin = diamSuppliers.length ? Math.min(...diamSuppliers.map((s) => s.diameterMin)) : 0;
  const dMax = diamSuppliers.length ? Math.max(...diamSuppliers.map((s) => s.diameterMax)) : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "clamp(340px, 45vh, 480px)" }}>
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            style={{ opacity: 0.2 }}
            onError={() => setImgError(true)}
          />
        ) : null}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end site-shell pb-10 pt-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-4">
            <Link href="/catalog" className="hover:text-slate-300 transition-colors">Catalog</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/catalog?category=${product.category}`} className="hover:text-slate-300 transition-colors capitalize">
              {CAT_LABEL[product.category] ?? product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-400">{product.shortName}</span>
          </nav>

          {/* Title */}
          <h1
            className="font-black text-white leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            {product.name}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 font-mono">
            <span>{product.material}</span>
            <span className="text-slate-700">·</span>
            <span>{product.application}</span>
            {product.standards.slice(0, 2).map((s) => (
              <span key={s} className="flex items-center gap-1">
                <span className="text-slate-700">·</span>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick stats bar ──────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="site-shell py-0">
          <div className="flex flex-wrap divide-x divide-white/[0.06]">
            {dMax > 0 && (
              <div className="px-6 py-4 first:pl-0">
                <p className="text-[9px] font-mono tracking-[0.18em] text-slate-500 uppercase mb-1">Diameter</p>
                <p className="font-mono font-bold text-white text-sm">Ø {dMin}–{dMax} mm</p>
              </div>
            )}
            <div className="px-6 py-4">
              <p className="text-[9px] font-mono tracking-[0.18em] text-slate-500 uppercase mb-1">Material</p>
              <p className="font-mono font-bold text-white text-sm">{product.material.split(" ")[0]}</p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[9px] font-mono tracking-[0.18em] text-slate-500 uppercase mb-1">Suppliers</p>
              <p className="font-mono font-bold text-white text-sm">{product.suppliers.length}</p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[9px] font-mono tracking-[0.18em] text-slate-500 uppercase mb-1">Status</p>
              <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${a.text}`}>
                <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                {a.label}
              </span>
            </div>
            {product.standards.length > 0 && (
              <div className="px-6 py-4">
                <p className="text-[9px] font-mono tracking-[0.18em] text-slate-500 uppercase mb-1">Standards</p>
                <p className="font-mono font-bold text-white text-sm">{product.standards.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="site-shell py-14 space-y-14">

        {/* Description + Specs */}
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-6">
            <SectionLabel>Overview</SectionLabel>
            <p className="text-slate-400 leading-relaxed text-[15px]">{product.description}</p>
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {product.tags.map((t) => (
                  <span key={t} className="border border-white/[0.08] text-slate-500 font-mono text-[11px] rounded px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <SectionLabel>Technical Specifications</SectionLabel>
            <div className="border border-white/[0.07] rounded-lg overflow-hidden">
              {Object.entries(product.keyProperties).map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-white/[0.05] last:border-0`}
                >
                  <dt className="font-mono text-[10px] tracking-[0.12em] text-slate-500 uppercase w-[45%] shrink-0 pt-0.5">{k}</dt>
                  <dd className="text-slate-200 text-sm">{v}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Suppliers ── */}
        <div>
          <SectionLabel>
            {isSingle ? "Supplied By" : `Available From ${product.suppliers.length} Suppliers`}
          </SectionLabel>

          {isSingle ? (
            <SingleSupplier s={product.suppliers[0]} />
          ) : (
            <div className={`grid gap-4 ${
              product.suppliers.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {product.suppliers.map((s) => (
                <SupplierCard key={s.partnerId} s={s} />
              ))}
            </div>
          )}
        </div>

        {/* ── Dimension Table ── */}
        {product.dimensions && product.dimensions.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase whitespace-nowrap">
                Dimension Table
              </p>
              <div className="flex-1 border-t border-white/[0.06]" />
              <div className="flex items-center gap-5 shrink-0">
                {[
                  { dot: "bg-emerald-500", label: "In Stock" },
                  { dot: "bg-amber-400",   label: "Partial" },
                  { dot: "bg-orange-500",  label: "On Order" },
                ].map(({ dot, label }) => (
                  <span key={label} className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                    <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <DimensionTable rows={product.dimensions} />
          </div>
        )}

        {/* ── Related ── */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 flex-1">
                <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase whitespace-nowrap">
                  Related Products
                </p>
                <div className="flex-1 border-t border-white/[0.06]" />
              </div>
              <Link
                href={`/catalog?category=${product.category}`}
                className="text-xs text-slate-400 hover:text-white font-mono flex items-center gap-1 ml-4 transition-colors"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/catalog/${r.slug}`}
                  className="group border border-white/[0.07] rounded-lg p-4 hover:border-white/[0.14] hover:bg-white/[0.03] transition-all"
                >
                  <p className="font-semibold text-sm text-white group-hover:text-sky-300 transition-colors leading-snug mb-1">
                    {r.shortName}
                  </p>
                  <p className="text-xs text-slate-500 font-mono mb-3">{r.material}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-600">{r.suppliers.length} supplier{r.suppliers.length !== 1 ? "s" : ""}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="border border-white/[0.08] rounded-lg p-8 sm:p-12 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase mb-3">
            Ready to Order?
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Get pricing &amp; lead times
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Send us your specifications and required quantity — we&apos;ll respond with confirmed
            stock and pricing within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/contact?product=${product.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 px-6 py-3 font-semibold text-sm text-white transition-colors"
            >
              <Send className="w-4 h-4" />Request Quote
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.04] px-6 py-3 text-sm text-slate-300 transition-all"
            >
              <Layers className="w-4 h-4" />Browse Catalog
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
