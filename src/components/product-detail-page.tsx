"use client";

import React, { useState } from "react";
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
import type { ProductGroup, SupplierOffer, DimensionRow, TechnicalTable, TechnicalTableRow, ProductFitting } from "@/lib/products-data";
import { productGroups } from "@/lib/products-data";
import { partners } from "@/lib/data";
import { getApplicationFamily, getMaterialFamily } from "@/lib/catalog-filters";
import { useTranslation } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n/translations";

// ─── Constants ────────────────────────────────────────────────────────────────

const availConfigBase = {
  "in-stock": {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.3)",
    Icon: CheckCircle2,
  },
  partial: {
    color: "#facc15",
    bg: "rgba(250,204,21,0.12)",
    border: "rgba(250,204,21,0.3)",
    Icon: Clock,
  },
  "on-order": {
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.3)",
    Icon: Package,
  },
} as const;

const rowAvailConfigBase = {
  stock: {
    rowStyle: {} as React.CSSProperties,
    textColor: "var(--site-text)",
    dot: "bg-green-500",
  },
  partial: {
    rowStyle: { backgroundColor: "var(--site-surface)" } as React.CSSProperties,
    textColor: "var(--site-text-muted)",
    dot: "bg-yellow-400",
  },
  order: {
    rowStyle: {} as React.CSSProperties,
    textColor: "var(--site-text-muted)",
    dot: "bg-orange-500",
  },
} as const;

const categoryMetaBase = {
  civil: { Icon: Building2, color: "#0891b2" },
  agri: { Icon: Sprout, color: "#22c55e" },
  industrial: { Icon: Factory, color: "#22d3ee" },
} as const;

const materialTranslationKeys: Record<string, string> = {
  "pe-hdpe": "catalog.matPeHdpe",
  pp: "catalog.matPp",
  pvc: "catalog.matPvc",
  rubber: "catalog.matRubber",
  other: "catalog.matOther",
};

const applicationTranslationKeys: Record<string, string> = {
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

// ─── Supplier Card ─────────────────────────────────────────────────────────────

function SupplierCard({ supplier }: { supplier: SupplierOffer }) {
  const { t } = useTranslation();
  const base = availConfigBase[supplier.availability];
  const { Icon } = base;
  const cfg = { ...base, label: supplier.availability === "in-stock" ? t("catalog.inStock") : supplier.availability === "partial" ? t("catalog.partial") : t("catalog.onOrder") };

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all hover:scale-[1.01]"
      style={{ border: `1px solid ${supplier.color}25`, backgroundColor: "var(--site-surface-strong)", boxShadow: "0 2px 8px rgba(15,23,42,0.08)" }}
    >
      <div className="h-1.5 w-full" style={{ background: supplier.color }} />
      {supplier.image && (
        <div className="relative h-48 w-full" style={{ borderBottom: "1px solid var(--site-border)" }}>
          <Image
            src={supplier.image}
            alt={supplier.partnerName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 gap-4">
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
              <h3 className="font-bold text-sm leading-tight" style={{ color: "var(--site-text)" }}>
                {supplier.partnerName}
              </h3>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono pl-8" style={{ color: "var(--site-text-soft)" }}>
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
          <div className="flex gap-2 text-xs" style={{ color: "var(--site-text-muted)" }}>
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
            <span>{supplier.stockNote}</span>
          </div>
        )}
        {supplier.orderNote && (
          <div className="flex gap-2 text-xs" style={{ color: "var(--site-text-muted)" }}>
            <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
            <span>{supplier.orderNote}</span>
          </div>
        )}

        {/* Diameter range */}
        {(supplier.diameterMin > 0 || supplier.diameterMax > 0) && (
          <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}>
            <span className="block text-[9px] font-mono tracking-widest mb-1" style={{ color: "var(--site-text-soft)" }}>
              {t("productDetail.diameterRange").toUpperCase()}
            </span>
            <span className="text-sm font-bold font-mono" style={{ color: "var(--site-text)" }}>
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
                  borderColor: `${supplier.color}35`,
                  color: "var(--site-text-muted)",
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
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--site-border)" }}>
              <table className="w-full text-xs">
                <tbody>
                  {Object.entries(supplier.specificSpecs).map(([k, v]) => (
                    <tr
                      key={k}
                      style={{ borderBottom: "1px solid var(--site-border)" }}
                      className="last:border-0"
                    >
                      <td className="px-3 py-2 font-mono text-[9px] tracking-wider uppercase w-[45%]" style={{ color: "var(--site-text-soft)" }}>
                        {k}
                      </td>
                      <td className="px-3 py-2" style={{ color: "var(--site-text-muted)" }}>{v}</td>
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
                className="rounded px-2 py-0.5 font-mono text-[10px]"
                style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-soft)" }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/contact?partner=${supplier.partnerId}&product=inquiry`}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all hover:brightness-110"
          style={{
            color: "var(--site-text)",
            background: `${supplier.color}20`,
            border: `1px solid ${supplier.color}35`,
          }}
        >
          <Send className="w-3.5 h-3.5" />
          {t("productDetail.requestQuote")}
        </Link>
      </div>
    </div>
  );
}

// ─── Dimension Table ───────────────────────────────────────────────────────────

function DimensionTable({ rows, labels }: { rows: DimensionRow[]; labels: { inStock: string; partial: string; onOrder: string; status: string } }) {
  const wallClasses = Array.from(new Set(rows.flatMap((r) => Object.keys(r.wallByClass ?? {})))).sort((a, b) => {
    const order = ["PN6", "PN10", "PN16"];
    const aPn = a.match(/PN\d+/)?.[0];
    const bPn = b.match(/PN\d+/)?.[0];
    const aIdx = aPn ? order.indexOf(aPn) : -1;
    const bIdx = bPn ? order.indexOf(bPn) : -1;

    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.localeCompare(b);
  });
  const hasSN = rows.some((r) => r.sn);
  const hasOD = rows.some((r) => r.od !== undefined);
  const hasWall = wallClasses.length > 0;
  const hasWeight = rows.some((r) => r.weightPerMeter !== undefined);
  const hasLengths = rows.some((r) => r.lengths !== undefined);
  const hasSize = rows.some((r) => r.size !== undefined);

  const thStyle: React.CSSProperties = { color: "var(--site-text-soft)" };
  const thClass = "px-4 py-3 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap";

  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}>
            <th className={`${thClass} text-left`} style={thStyle}>{hasSize ? "Size" : "DN (mm)"}</th>
            {hasOD && <th className={`${thClass} text-left`} style={thStyle}>OD (mm)</th>}
            {hasWall && wallClasses.map((wc) => (
              <th key={wc} className={`${thClass} text-right`} style={thStyle}>e {wc} (mm)</th>
            ))}
            {hasSN && (
              <>
                <th className={`${thClass} text-center`} style={thStyle}>SN4</th>
                <th className={`${thClass} text-center`} style={thStyle}>SN8</th>
              </>
            )}
            {hasWeight && <th className={`${thClass} text-right`} style={thStyle}>kg/m</th>}
            {hasLengths && <th className={`${thClass} text-left`} style={thStyle}>Lengths</th>}
            <th className={`${thClass} text-center`} style={thStyle}>{labels.status}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const base = rowAvailConfigBase[row.available];
            const label = row.available === "stock" ? labels.inStock : row.available === "partial" ? labels.partial : labels.onOrder;
            return (
              <tr
                key={row.dn}
                className="transition-colors last:border-0"
                style={{ borderBottom: "1px solid var(--site-border)", ...base.rowStyle }}
              >
                <td className="px-4 py-2.5 font-mono font-bold" style={{ color: base.textColor }}>
                  {row.size ?? row.dn}
                </td>
                {hasOD && (
                  <td className="px-4 py-2.5 font-mono" style={{ color: base.textColor }}>
                    {row.od ?? "—"}
                  </td>
                )}
                {hasWall && wallClasses.map((wc) => (
                  <td key={wc} className="px-4 py-2.5 font-mono text-right" style={{ color: base.textColor }}>
                    {row.wallByClass?.[wc] ?? "—"}
                  </td>
                ))}
                {hasSN && (
                  <>
                    <td className="px-4 py-2.5 text-center">
                      {row.sn?.sn4 ? (
                        <span className="text-green-500 font-bold">✓</span>
                      ) : (
                        <span style={{ color: "var(--site-text-soft)" }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {row.sn?.sn8 ? (
                        <span className="text-green-500 font-bold">✓</span>
                      ) : (
                        <span style={{ color: "var(--site-text-soft)" }}>—</span>
                      )}
                    </td>
                  </>
                )}
                {hasWeight && (
                  <td className="px-4 py-2.5 font-mono text-right" style={{ color: base.textColor }}>
                    {row.weightPerMeter ?? "—"}
                  </td>
                )}
                {hasLengths && (
                  <td className="px-4 py-2.5 font-mono text-xs" style={{ color: base.textColor }}>
                    {row.lengths ?? "—"}
                  </td>
                )}
                <td className="px-4 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold" style={{ color: "var(--site-text-muted)" }}>
                    <span className={`h-1.5 w-1.5 rounded-full ${base.dot}`} />
                    {label}
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

// ─── Technical Tables ──────────────────────────────────────────────────────────

function TechnicalTables({ tables, labels }: { tables: TechnicalTable[]; labels: { inStock: string; onOrder: string } }) {
  const rowAvailConfigBase = {
    stock: {
      dot: "bg-green-500",
      textColor: "var(--site-text)",
      rowStyle: {},
    },
    order: {
      dot: "bg-orange-500",
      textColor: "var(--site-text-muted)",
      rowStyle: { opacity: 0.85 },
    },
  };

  return (
    <div className="space-y-8">
      {tables.map((table, tableIndex) => (
        <div key={tableIndex}>
          <h3 className="text-base font-bold mb-4" style={{ color: "var(--site-text)" }}>
            {table.title}
          </h3>
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}>
                  {table.columns.map((col, colIndex) => (
                    <th
                      key={colIndex}
                      className="px-4 py-3 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap text-left"
                      style={{ color: "var(--site-text-soft)" }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => {
                  const base = rowAvailConfigBase[row.available];
                  const label = row.available === "stock" ? labels.inStock : labels.onOrder;
                  return (
                    <tr
                      key={rowIndex}
                      className="transition-colors last:border-0"
                      style={{ borderBottom: "1px solid var(--site-border)", ...base.rowStyle }}
                    >
                      {row.od !== undefined && (
                        <td className="px-4 py-2.5 font-mono font-bold" style={{ color: base.textColor }}>
                          {row.od}
                        </td>
                      )}
                      {row.id !== undefined && (
                        <td className="px-4 py-2.5 font-mono font-bold" style={{ color: base.textColor }}>
                          {row.id}
                        </td>
                      )}
                      {row.wallThickness !== undefined && (
                        <td className="px-4 py-2.5 font-mono" style={{ color: base.textColor }}>
                          {row.wallThickness}
                        </td>
                      )}
                      {row.weight !== undefined && (
                        <td className="px-4 py-2.5 font-mono" style={{ color: base.textColor }}>
                          {row.weight}
                        </td>
                      )}
                      {row.length !== undefined && (
                        <td className="px-4 py-2.5 font-mono text-xs" style={{ color: base.textColor }}>
                          {row.length}
                        </td>
                      )}
                      {row.force !== undefined && (
                        <td className="px-4 py-2.5 font-mono" style={{ color: base.textColor }}>
                          {row.force}
                        </td>
                      )}
                      {row.tolerance !== undefined && (
                        <td className="px-4 py-2.5 font-mono" style={{ color: base.textColor }}>
                          {row.tolerance}
                        </td>
                      )}
                      <td className="px-4 py-2.5 text-center">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold" style={{ color: "var(--site-text-muted)" }}>
                          <span className={`h-1.5 w-1.5 rounded-full ${base.dot}`} />
                          {label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      
      {/* Intermediate Image - shown after all tables if present in first table */}
      {tables[0]?.intermediateImage && (
        <div className="rounded-xl overflow-hidden max-h-64" style={{ border: "1px solid var(--site-border)" }}>
          <Image
            src={tables[0].intermediateImage}
            alt="Product Variants"
            width={1200}
            height={256}
            className="w-full h-full object-cover max-h-64"
            sizes="100vw"
          />
        </div>
      )}
    </div>
  );
}

// ─── Fittings Section ──────────────────────────────────────────────────────────

function FittingsSection({ fittings }: { fittings: ProductFitting[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {fittings.map((fitting) => (
        <div
          key={fitting.id}
          className="rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
          style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}
        >
          {/* Fitting Image */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Image
              src={fitting.image}
              alt={fitting.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          
          {/* Fitting Info */}
          <div className="p-4 space-y-2">
            <h3 className="font-bold text-base" style={{ color: "var(--site-text)" }}>
              {fitting.name}
            </h3>
            {fitting.description && (
              <p className="text-xs" style={{ color: "var(--site-text-muted)" }}>
                {fitting.description}
              </p>
            )}
            <div className="pt-2 border-t" style={{ borderColor: "var(--site-border)" }}>
              <div className="text-[10px] font-mono tracking-wider uppercase mb-1" style={{ color: "var(--site-text-soft)" }}>
                Diametrat
              </div>
              <div className="text-sm font-mono font-bold" style={{ color: "var(--site-text)" }}>
                {fitting.diameters}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ProductDetailPage({ product }: { product: ProductGroup }) {
  const [imageError, setImageError] = useState(false);
  const { t, tp, locale } = useTranslation();
  const materialFamily = getMaterialFamily(product.material);
  const materialKey = materialTranslationKeys[materialFamily.id];
  const materialLabel = materialKey ? t(materialKey as never) : materialFamily.label;
  const appFamily = getApplicationFamily(product.application);
  const appKey = applicationTranslationKeys[appFamily.id];
  const appLabel = appKey ? t(appKey as never) : appFamily.label;
  const catBase = categoryMetaBase[product.category];
  const CatIcon = catBase.Icon;
  const catMeta = { ...catBase, label: product.category === "civil" ? t("categories.civilName") : product.category === "agri" ? t("categories.agriName") : t("categories.industrialName") };

  const relatedProducts = productGroups
    .filter((g) => g.id !== product.id && g.category === product.category)
    .slice(0, 3);

  const overallAvailability: keyof typeof availConfigBase = (() => {
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

  const availCfg = availConfigBase[overallAvailability];

  return (
    <main className="min-h-screen bg-[var(--site-bg)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="theme-product-hero relative h-[45vh] min-h-[320px] sm:h-[52vh] sm:min-h-[380px] overflow-hidden">
        {!imageError && product.image ? (
          <Image
            src={product.image}
            alt={tp(product.id, "name", product.name)}
            fill
            priority
            className="theme-product-hero-image object-cover opacity-35"
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
        <div className="theme-product-hero-overlay absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 80% 50%, ${catMeta.color}08, transparent 60%)`,
          }}
        />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 site-shell pb-8 pt-20 sm:pt-28">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-mono mb-5 transition-colors group"
            style={{ color: "var(--site-text-soft)" }}
          >
            <ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            {t("productDetail.backToCatalog")}
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
              {product.suppliers.length} {product.suppliers.length === 1 ? t("catalog.supplierOne") : t("catalog.suppliers")}
            </span>
          </div>

          <h1
            className="font-black leading-[1.05] tracking-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--site-text)" }}
          >
            {tp(product.id, "name", product.name)}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm font-mono" style={{ color: "var(--site-text-muted)" }}>
              {materialLabel}
            </span>
            <span style={{ color: "var(--site-text-soft)" }}>·</span>
            <span className="text-sm font-mono" style={{ color: "var(--site-text-muted)" }}>
              {appLabel}
            </span>
            {product.standards.map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span style={{ color: "var(--site-text-soft)" }}>·</span>
                <span className="text-sm font-mono" style={{ color: "var(--site-text-muted)" }}>{s}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="site-shell py-10 sm:py-14 space-y-10 sm:space-y-16">

        {/* Description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-6 bg-cyan-500/50" />
            <span className="font-mono text-[10px] tracking-widest text-cyan-500/80 uppercase">
              {t("productDetail.overview")}
            </span>
          </div>
          <p className="leading-relaxed text-sm sm:text-base max-w-4xl" style={{ color: "var(--site-text-muted)" }}>
            {tp(product.id, "description", product.description)}
          </p>
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded px-2.5 py-1 text-xs font-mono transition-colors hover:text-cyan-500"
                  style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-soft)" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image + Key Properties - Symmetrical Layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Additional Image */}
          {product.additionalImage && (
            <div className="rounded-xl overflow-hidden relative min-h-[400px]" style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}>
              <Image
                src={product.additionalImage}
                alt={`${tp(product.id, "name", product.name)} - Installation`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Key Properties Table */}
          <div className="rounded-2xl overflow-hidden flex flex-col" style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}>
            <div className="flex items-center gap-2 px-5 py-3.5 shrink-0" style={{ borderBottom: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}>
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: "var(--site-text-soft)" }}>
                {t("productDetail.keyProperties")}
              </span>
            </div>
            <table className="w-full flex-1">
              <tbody>
                {Object.entries(product.keyProperties).map(([k, v]) => {
                  const translatedKey = (translations.productDetail.propertyLabels as Record<string, { sq: string; en: string }>)[k]?.[locale] || k;
                  const translatedValue = (translations.productDetail.propertyLabels as Record<string, { sq: string; en: string }>)[v]?.[locale] || v;
                  return (
                    <tr
                      key={k}
                      style={{ borderBottom: "1px solid var(--site-border)" }}
                      className="last:border-0"
                    >
                      <td className="px-5 py-3 font-mono text-[10px] tracking-wider uppercase w-[42%] align-top" style={{ color: "var(--site-text-soft)" }}>
                        {translatedKey}
                      </td>
                      <td className="px-5 py-3 text-xs" style={{ color: "var(--site-text-muted)" }}>
                        {translatedValue}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Suppliers ── */}
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px flex-1" style={{ backgroundColor: "var(--site-border)" }} />
            <div className="flex items-center gap-2.5 shrink-0">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h2 className="text-lg font-bold" style={{ color: "var(--site-text)" }}>{t("productDetail.suppliers")}</h2>
              <span className="rounded-full bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 text-xs font-bold text-cyan-400">
                {product.suppliers.length}{" "}
                {product.suppliers.length === 1 ? t("catalog.supplierOne") : t("catalog.suppliers")}
              </span>
            </div>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--site-border)" }} />
          </div>
          <p className="text-center text-xs font-mono mb-8" style={{ color: "var(--site-text-soft)" }}>
            {t("productDetail.suppliersAvailable")}
          </p>

          <div
            className={`grid gap-6 ${
              product.suppliers.length === 1
                ? "max-w-2xl mx-auto"
                : product.suppliers.length === 2
                ? "sm:grid-cols-2 max-w-5xl mx-auto"
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
              <div className="mt-6 rounded-xl p-5" style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-lg p-2.5" style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}>
                    <Layers className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider font-mono mb-3" style={{ color: "var(--site-text-soft)" }}>
                      {t("productDetail.alsoAvailableFrom")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {alsoPartners.map((p) => (
                        <Link
                          key={p.id}
                          href={`/catalog?partner=${p.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all hover:shadow-sm"
                          style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-muted)" }}
                        >
                          <Globe className="w-3.5 h-3.5 text-cyan-500" />
                          {p.name}
                          <span className="text-xs font-mono" style={{ color: "var(--site-text-soft)" }}>· {p.country}</span>
                          <ArrowRight className="w-3 h-3" style={{ color: "var(--site-text-soft)" }} />
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
              <h2 className="text-lg font-bold" style={{ color: "var(--site-text)" }}>{t("productDetail.dimensions")}</h2>
              <div className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--site-text-muted)" }}>
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {t("catalog.inStock")}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--site-text-muted)" }}>
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  {t("catalog.partial")}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--site-text-muted)" }}>
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  {t("catalog.onOrder")}
                </span>
              </div>
            </div>
            <DimensionTable rows={product.dimensions} labels={{ inStock: t("catalog.inStock"), partial: t("catalog.partial"), onOrder: t("catalog.onOrder"), status: "Status" }} />
          </div>
        )}

        {/* ── Fittings ── */}
        {product.fittings && product.fittings.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
              <h2 className="text-lg font-bold" style={{ color: "var(--site-text)" }}>{t("productDetail.fittings")}</h2>
            </div>
            <FittingsSection fittings={product.fittings} />
          </div>
        )}

        {/* ── Technical Tables ── */}
        {product.technicalTables && product.technicalTables.length > 0 && (
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
              <h2 className="text-lg font-bold" style={{ color: "var(--site-text)" }}>{t("productDetail.technicalSpecs")}</h2>
              <div className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--site-text-muted)" }}>
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {t("catalog.inStock")}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--site-text-muted)" }}>
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  {t("catalog.onOrder")}
                </span>
              </div>
            </div>
            <TechnicalTables tables={product.technicalTables} labels={{ inStock: t("catalog.inStock"), onOrder: t("catalog.onOrder") }} />
          </div>
        )}

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: "var(--site-text)" }}>{t("productDetail.relatedProducts")}</h2>
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
                const relCat = categoryMetaBase[related.category];
                const RelIcon = relCat.Icon;
                return (
                  <Link
                    key={related.id}
                    href={`/catalog/${related.slug}`}
                    className="group relative overflow-hidden rounded-xl p-5 transition-all"
                    style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface-strong)" }}
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
                        <p className="font-bold text-sm transition-colors leading-snug" style={{ color: "var(--site-text)" }}>
                          {tp(related.id, "shortName", related.shortName)}
                        </p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--site-text-soft)" }}>
                          {related.application}
                        </p>
                        <p className="text-[11px] mt-1" style={{ color: "var(--site-text-soft)" }}>
                          {related.suppliers.length} {related.suppliers.length === 1 ? t("catalog.supplierOne") : t("catalog.suppliers")}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors" style={{ color: "var(--site-text-soft)" }} />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Quote CTA ── */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center"
          style={{ border: "1px solid rgba(6,182,212,0.18)", backgroundColor: "var(--site-surface-strong)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, #22d3ee, transparent 65%)",
            }}
          />
          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.25em] text-cyan-400/70 uppercase mb-3">
              {t("cta.eyebrow")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "var(--site-text)" }}>
              {t("cta.title")}
            </h2>
            <p className="text-sm max-w-lg mx-auto mb-8 leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/contact?product=${product.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 transition-colors"
              >
                <Send className="w-4 h-4" />
                {t("productDetail.requestQuote")}
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm transition-colors"
                style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-muted)" }}
              >
                <Layers className="w-4 h-4" style={{ color: "var(--site-text-soft)" }} />
                {t("catalog.pageTitle")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
