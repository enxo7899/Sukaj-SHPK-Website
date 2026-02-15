import { Suspense } from "react";
import { Catalog } from "@/components/catalog";

export const metadata = {
  title: "Product Catalog | Sukaj SHPK",
  description: "Explore our comprehensive catalog of industrial pipes, conduits, and infrastructure solutions from leading European manufacturers.",
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

export default function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <div className="min-h-screen pt-32">
      <div className="site-shell mb-8">
        <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider mb-6">
          PRODUCT CATALOG
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
          ENGINEERING SOLUTIONS.
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl">
          Browse our complete range of infrastructure products. Filter by material, application, or diameter.
        </p>
      </div>
      
      <Suspense fallback={<CatalogLoading />}>
        <Catalog />
      </Suspense>
    </div>
  );
}
