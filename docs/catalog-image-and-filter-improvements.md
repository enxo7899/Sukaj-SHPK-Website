# Catalog · Image & Filter improvements

Implementation summary for the `/catalog` redesign.

## Files changed

| File | Purpose |
|---|---|
| `src/lib/products-data.ts` | Replaced 8 external image URLs with local paths under `public/products/` |
| `src/lib/catalog-filters.ts` | **NEW** — Material families, application families, quick filters, resolution helpers |
| `src/components/catalog.tsx` | Sidebar redesigned (collapsible accordions, grouped families, all suppliers, friendly chips, improved counts/sort labels) plus premium fallback artwork |
| `scripts/audit-product-images.mjs` | **NEW** — `npm run audit:images` |
| `scripts/download-product-images.mjs` | **NEW** — `npm run download:product-images` |
| `scripts/product-image-manifest.json` | **NEW** — URL→localPath manifest used by the downloader |
| `package.json` | Added `audit:images` and `download:product-images` scripts |
| `public/products/agri/*` | 3 new images (`fitt-mint-hose`, `fitt-mimosa-hose`, `food-grade-barrel`, `plastika-greenhouse-film`) |
| `public/products/civil/*` | 1 new image (`konti-pe-gas-pipe`) |
| `public/products/industrial/*` | 4 new images (`damp-proof-membrane`, `recycled-pe-granulates`, `spiral-transparent-hose`, `perplast-classic-pvc-hose`, `sel-troy-green-spiral-hose`) |
| `docs/product-image-audit.md` | **NEW** — Per-product audit table |

## How images were selected

1. **Manufacturer first.** For Konti Hidroplast, FITT, and Plastika KS,
   the original CDN URL was preserved in the manifest and the file
   downloaded into the local public folder.
2. **Distributor second.** For the SEL spiral hose, the existing
   Shopify CDN URL was used.
3. **Royalty-free fallback.** For three abstract product types where no
   manufacturer photo exists (damp-proof membrane, recycled PE
   granulate, food-grade barrel), Pexels CC0 photos were committed.
4. **Premium fallback rendering.** When an image still fails at runtime,
   `ProductGroupCard` renders a custom dark-glass card with the
   category icon, label, and a category-tinted radial gradient.

## Where images are stored

```
public/products/
├── civil/        (HDPE pressure pipes, sewage, drainage, fittings)
├── agri/         (irrigation, hoses, planters, food-grade)
└── industrial/   (cable conduits, films, granulates, hoses)
```

Filenames are slug-style: `<supplier>-<product>.{jpg,png}`.

## Filter grouping

Two new taxonomies in `src/lib/catalog-filters.ts`:

### Material families

| Family ID | Label | Maps from |
|---|---|---|
| `pe-hdpe` | PE / HDPE | HDPE, HDPE PE100, HDPE / PE100, HDPE PE-100 RC, HDPE / LDPE, LDPE, LDPE / LLDPE, Injection-Moulded PE |
| `pp` | PP / Polypropylene | PP, PP-H, Polypropylene |
| `pvc` | PVC | PVC, PVC-U |
| `rubber` | Rubber | Rubber |
| `other` | Other / Mixed | unmapped |

### Application families

| Family ID | Label |
|---|---|
| `water-pressure` | Water supply & pressure |
| `sewage-drainage` | Sewage & drainage |
| `irrigation` | Irrigation & agriculture |
| `cable-telecom` | Cable & telecom protection |
| `storage-tanks` | Storage & tanks |
| `industrial-transfer` | Industrial transfer |
| `packaging-construction` | Packaging & construction |
| `outdoor-decor` | Outdoor & décor |
| `gas` | Gas distribution |
| `fittings` | Fittings & accessories |
| `other-app` | Other |

Resolution is keyword-driven and case-insensitive. Free-text search
still hits the original raw `material` and `application` strings (and
also product `description` and supplier names), so customers can still
search for very specific phrases like _"trenchless"_ or _"polypropylene
homopolymer"_.

### Quick filters

`quickFilters` (sidebar): **In Stock · Civil · Agriculture · Industrial
· Large diameter · Pressure systems**.
All quick filters AND together with the rest of the filter state.

## Sidebar UX changes

- Compact search with new placeholder _"Search pipes, tanks, fittings…"_
- All filter sections are now `FilterSection` accordions with selected
  count badge and per-section "Clear" link.
- Material and Application sections only show **family rows**, each
  with a count badge — no more raw HDPE / PE100-RC / LDPE walls of
  buttons.
- Diameter slider moved into a collapsed accordion.
- Supplier section is scrollable and shows **all** partners (not just
  the first 8). Color dot retained.
- Active chips render human-friendly labels:
  `Material: PE / HDPE`, `Application: Sewage & drainage`,
  `Supplier: Konti Hidroplast`, `Ø 20–630 mm`.
- Result text reads _"Showing X product families across Y supplier
  offers"_ instead of _"X product types found"_.
- Sort labels: **Recommended · Most supplier options · Smallest diameter
  first · Largest diameter first**.

## Data-model rules respected

- No products were deleted, renamed, or had their slugs changed.
- All routes and supplier offers are intact.
- Existing `image:` fields kept for sharing across SKU variants where
  the variants are visually identical (e.g. four pressure classes of
  the same Palaplast HDPE pipe).

## Verification

```
npm run audit:images          → ok=77/77, external=0, missing=0
npx eslint src/lib/catalog-filters.ts src/components/catalog.tsx → clean
npm run build                 → success, 85 static pages generated
```

## Products that would benefit from client-supplied photos

See `docs/product-image-audit.md → "Items that would benefit from
client-supplied photos"`.
