import { Suspense } from "react";
import { CatalogShell } from "./catalog-shell";
import { productGroups, getAllSupplierCount } from "@/lib/products-data";
import { CatalogPageHeader } from "@/components/catalog-page-header";

export const metadata = {
  title: "Katalogu i Produkteve | Sukaj SHPK",
  description:
    "Eksploroni katalogun tonë të plotë të tubave industrialë, kanaleve dhe zgjidhjeve infrastrukturore nga prodhues kryesorë europianë.",
};

function CatalogLoading() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="site-shell">
        <div className="animate-pulse">
          <div className="h-12 w-64 rounded-lg mb-8 bg-[var(--site-surface-strong)]" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-[var(--site-surface-strong)]" />
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
      <CatalogPageHeader
        productCount={productGroups.length}
        supplierCount={getAllSupplierCount()}
      />

      <Suspense fallback={<CatalogLoading />}>
        <CatalogShell
          initialCategory={params.category}
          initialPartner={params.partner}
        />
      </Suspense>
    </div>
  );
}
