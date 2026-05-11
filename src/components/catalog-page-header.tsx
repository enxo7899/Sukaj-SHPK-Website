"use client";

import { useTranslation } from "@/lib/i18n/context";

export function CatalogPageHeader({
  productCount,
  supplierCount,
}: {
  productCount: number;
  supplierCount: number;
}) {
  const { t } = useTranslation();

  return (
    <div className="site-shell pb-8 sm:pb-12 border-b border-white/[0.06]">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px w-8 bg-cyan-500/60" />
        <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
          {t("catalog.pageTitle")}
        </span>
      </div>
      <h1
        className="font-black text-white leading-[1.05] tracking-tight mb-4"
        style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
      >
        {t("catalog.pageTitle")}
      </h1>
      <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
        {productCount} {t("catalog.productTypesLabel").toLowerCase()} —{" "}
        {supplierCount} {t("catalog.supplierPartnersLabel").toLowerCase()}.
        <br />
        {t("catalog.pageSubtitle")}
      </p>
    </div>
  );
}
