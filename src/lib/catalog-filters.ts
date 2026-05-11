// Catalog filter taxonomy
// Groups raw `material` and `application` strings from `products-data.ts`
// into clean, customer-friendly families used by the catalog sidebar.
//
// Selecting a family filters every product whose raw material/application
// is mapped to that family.  Free-text search still hits the original
// raw values, so nothing is lost.

import type { ProductGroup } from "@/lib/products-data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterFamily {
  /** Stable id used in URLs / filter state */
  id: string;
  /** Customer-facing label (sidebar, chips) */
  label: string;
  /** Optional one-line description */
  description?: string;
  /** Exact raw values that belong to this family (case-insensitive match) */
  values?: string[];
  /** Lower-case substrings — if any matches the raw value, it joins this family */
  keywords?: string[];
}

// ─── Material families ────────────────────────────────────────────────────────

export const materialFamilies: FilterFamily[] = [
  {
    id: "pe-hdpe",
    label: "PE / HDPE",
    description: "All polyethylene grades incl. PE100, PE100-RC, LDPE",
    values: [
      "HDPE",
      "HDPE PE100",
      "HDPE / PE100",
      "HDPE PE-100",
      "HDPE / PE100-RC",
      "HDPE PE-100 RC",
      "HDPE / LDPE",
      "HDPE / LDPE (Recycled)",
      "HDPE PE-100 / PE-100 RC",
      "Injection-Moulded PE",
      "LDPE",
      "LDPE / LLDPE",
      "HDPE / PP",
    ],
    keywords: ["hdpe", "pe100", "pe-100", "ldpe", "lldpe", "polyethylene"],
  },
  {
    id: "pp",
    label: "PP / Polypropylene",
    description: "Polypropylene homopolymer and standard PP",
    values: [
      "PP",
      "PP (Polypropylene)",
      "PP-H (Polypropylene Homopolymer)",
      "Polypropylene",
    ],
    keywords: ["polypropylene", "pp-h", "pp "],
  },
  {
    id: "pvc",
    label: "PVC",
    description: "Plasticised and unplasticised PVC",
    values: ["PVC", "PVC-U"],
    keywords: ["pvc"],
  },
  {
    id: "rubber",
    label: "Rubber",
    description: "Reinforced rubber transfer hoses",
    values: ["Rubber"],
    keywords: ["rubber"],
  },
  {
    id: "other",
    label: "Other / Mixed",
    description: "Composite or unmapped materials",
    values: [],
    keywords: [],
  },
];

// ─── Application families ─────────────────────────────────────────────────────

export const applicationFamilies: FilterFamily[] = [
  {
    id: "water-pressure",
    label: "Water supply & pressure",
    description: "Drinking water, potable storage, pressure mains",
    keywords: [
      "water supply",
      "pressure",
      "potable",
      "drinking water",
      "trenchless",
      "hot & cold potable",
      "water · irrigation · pool",
    ],
  },
  {
    id: "sewage-drainage",
    label: "Sewage & drainage",
    description: "Gravity sewage, stormwater, soil stacks, manholes",
    keywords: [
      "sewage",
      "drainage",
      "stormwater",
      "rainwater",
      "soil stacks",
      "inspection",
      "manhole",
      "corrugated pipe jointing",
      "gravity drainage",
    ],
  },
  {
    id: "irrigation",
    label: "Irrigation & agriculture",
    description: "Drip, mainlines, hoses, filters, crop spraying, livestock",
    keywords: [
      "irrigation",
      "drip",
      "mulching",
      "greenhouse",
      "spraying",
      "plant treatment",
      "garden",
      "agricultural",
      "livestock",
      "poultry",
    ],
  },
  {
    id: "cable-telecom",
    label: "Cable & telecom protection",
    description: "Electrical and fibre-optic conduits",
    keywords: [
      "cable",
      "fibre optic",
      "telecom",
      "canalization",
      "electrical",
    ],
  },
  {
    id: "storage-tanks",
    label: "Storage & tanks",
    description: "Water cisterns, food-grade canisters, large reservoirs",
    keywords: [
      "storage",
      "cistern",
      "tank",
      "milk",
      "honey",
      "food",
    ],
  },
  {
    id: "industrial-transfer",
    label: "Industrial transfer",
    description: "Chemical, slurry, oil, suction & delivery transfer",
    keywords: [
      "fluid transfer",
      "chemical",
      "slurry",
      "oil",
      "suction",
      "delivery",
      "air ·",
      "industrial fluid",
    ],
  },
  {
    id: "packaging-construction",
    label: "Packaging & construction",
    description: "Pallet wrapping, waterproofing membranes, plastic processing",
    keywords: [
      "pallet",
      "waterproofing",
      "construction",
      "plastic processing",
      "re-manufacture",
    ],
  },
  {
    id: "outdoor-decor",
    label: "Outdoor & décor",
    description: "Landscaping, ornaments, planters",
    keywords: [
      "décor",
      "decor",
      "landscaping",
      "ornament",
      "planter",
      "indoor & outdoor",
    ],
  },
  {
    id: "gas",
    label: "Gas distribution",
    description: "Natural gas and LPG networks",
    keywords: ["gas distribution", "gas"],
  },
  {
    id: "fittings",
    label: "Fittings & accessories",
    description: "Compression fittings, valves, jointing, accessories",
    keywords: [
      "fittings",
      "jointing",
      "shut-off",
      "accessories",
      "tool-free",
    ],
  },
  {
    id: "other-app",
    label: "Other",
    description: "Unmapped applications",
    keywords: [],
  },
];

// ─── Resolution helpers ──────────────────────────────────────────────────────

const norm = (s: string) => s.toLowerCase().trim();

export function getMaterialFamily(rawMaterial: string): FilterFamily {
  const v = norm(rawMaterial);
  // Exact value match first
  for (const f of materialFamilies) {
    if (f.values?.some((val) => norm(val) === v)) return f;
  }
  // Keyword match
  for (const f of materialFamilies) {
    if (f.keywords?.some((kw) => v.includes(kw))) return f;
  }
  return materialFamilies[materialFamilies.length - 1]; // "other"
}

export function getApplicationFamily(rawApplication: string): FilterFamily {
  const v = norm(rawApplication);
  // Exact value match first (rare for applications)
  for (const f of applicationFamilies) {
    if (f.values?.some((val) => norm(val) === v)) return f;
  }
  // Keyword match — first matching family wins; order matters, so put
  // more-specific families before generic ones.
  for (const f of applicationFamilies) {
    if (f.keywords?.some((kw) => v.includes(kw))) return f;
  }
  return applicationFamilies[applicationFamilies.length - 1]; // "other-app"
}

export function matchesMaterialFamily(
  product: ProductGroup,
  selectedFamilyIds: string[]
): boolean {
  if (selectedFamilyIds.length === 0) return true;
  const fam = getMaterialFamily(product.material);
  return selectedFamilyIds.includes(fam.id);
}

export function matchesApplicationFamily(
  product: ProductGroup,
  selectedFamilyIds: string[]
): boolean {
  if (selectedFamilyIds.length === 0) return true;
  const fam = getApplicationFamily(product.application);
  return selectedFamilyIds.includes(fam.id);
}

// ─── Quick filter presets ────────────────────────────────────────────────────

export interface QuickFilter {
  id: string;
  label: string;
  /** Returns true if the product satisfies this quick filter */
  match: (p: ProductGroup) => boolean;
}

export const quickFilters: QuickFilter[] = [
  {
    id: "in-stock",
    label: "In Stock",
    match: (p) => p.suppliers.some((s) => s.availability === "in-stock"),
  },
  {
    id: "civil",
    label: "Civil",
    match: (p) => p.category === "civil",
  },
  {
    id: "agriculture",
    label: "Agriculture",
    match: (p) => p.category === "agri",
  },
  {
    id: "industrial",
    label: "Industrial",
    match: (p) => p.category === "industrial",
  },
  {
    id: "large-diameter",
    label: "Large diameter",
    match: (p) =>
      p.suppliers.some((s) => s.diameterMax >= 400),
  },
  {
    id: "pressure",
    label: "Pressure systems",
    match: (p) => {
      const v = norm(p.application);
      return (
        v.includes("pressure") ||
        v.includes("pressurised") ||
        v.includes("water supply")
      );
    },
  },
];
