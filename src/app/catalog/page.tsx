import { Suspense } from "react";
import { CatalogShell } from "./catalog-shell";
import { productGroups, getAllSupplierCount } from "@/lib/products-data";

export const metadata = {
  title: "Product Catalog | Sukaj SHPK",
  description:
    "Explore our comprehensive catalog of industrial pipes, conduits, and infrastructure solutions from leading European manufacturers.",
};

function CatalogLoading() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="site-shell">
        <div className="animate-pulse">
          <div className="h-12 w-64 bg-white/5 rounded-lg mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; partner?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen pt-28 sm:pt-32">
      <div className="site-shell pb-8 sm:pb-12 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-cyan-500/60" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
            Product Catalog
          </span>
        </div>
        <h1
          className="font-black text-white leading-[1.05] tracking-tight mb-4"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Pipes, Hoses &amp;
          <br />
          <span
            style={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(90deg, #22d3ee 0%, #0891b2 60%)",
            }}
          >
            Infrastructure Systems.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
          {productGroups.length} product types across civil, agricultural and
          industrial applications — from {getAllSupplierCount()} European
          manufacturing partners.
        </p>
      </div>

      <Suspense fallback={<CatalogLoading />}>
        <CatalogShell
          initialCategory={params.category}
          initialPartner={params.partner}
        />
      </Suspense>
    </div>
  );
}
