"use client";

import { Catalog } from "@/components/catalog";

export function CatalogShell({
  initialCategory,
  initialPartner,
}: {
  initialCategory?: string;
  initialPartner?: string;
}) {
  return (
    <Catalog
      initialCategory={initialCategory}
      initialPartner={initialPartner}
    />
  );
}
