import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductGroup, productGroups } from "@/lib/products-data";
import { ProductDetailPage } from "@/components/product-detail-page";

export function generateStaticParams() {
  return productGroups.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductGroup(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Sukaj SHPK`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductGroup(slug);
  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
