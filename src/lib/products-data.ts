// Product catalog — multi-supplier model
// Each ProductGroup represents a product TYPE; multiple partners can supply it.
// Availability data sourced from client meeting notes (May 2026).

export interface SupplierOffer {
  partnerId: string;
  partnerName: string;
  country: string;
  color: string;
  availability: "in-stock" | "partial" | "on-order";
  /** What is physically in the warehouse right now */
  stockNote?: string;
  /** What requires a purchase order */
  orderNote?: string;
  diameterMin: number;
  diameterMax: number;
  pressureClasses?: string[];
  standards?: string[];
  specificSpecs?: Record<string, string>;
}

export interface DimensionRow {
  /** Nominal diameter / inner diameter in mm */
  dn: number;
  /** Outer diameter in mm */
  od?: number;
  /** Wall thickness by SDR / PN class (key = "SDR17/PN10", value = mm) */
  wallByClass?: Record<string, number>;
  /** Stiffness class availability */
  sn?: { sn4?: boolean; sn8?: boolean };
  /** Approximate weight per metre (kg/m) */
  weightPerMeter?: number;
  /** Length options available */
  lengths?: string;
  available: "stock" | "partial" | "order";
}

export interface ProductGroup {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: "civil" | "agri" | "industrial";
  material: string;
  application: string;
  description: string;
  image: string;
  standards: string[];
  keyProperties: Record<string, string>;
  dimensions?: DimensionRow[];
  suppliers: SupplierOffer[];
  tags?: string[];
  featured?: boolean;
}

// ─── PE100 Pressure Pipe ────────────────────────────────────────────────────

const pe100Dimensions: DimensionRow[] = [
  { dn: 20,  od: 20,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
  { dn: 25,  od: 25,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
  { dn: 32,  od: 32,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 3.0 }, available: "stock" },
  { dn: 40,  od: 40,  wallByClass: { "SDR17/PN10": 2.4, "SDR11/PN16": 3.7 }, available: "stock" },
  { dn: 50,  od: 50,  wallByClass: { "SDR26/PN6": 2.0, "SDR17/PN10": 3.0, "SDR11/PN16": 4.6 }, available: "stock" },
  { dn: 63,  od: 63,  wallByClass: { "SDR26/PN6": 2.5, "SDR17/PN10": 3.8, "SDR11/PN16": 5.8 }, available: "stock" },
  { dn: 75,  od: 75,  wallByClass: { "SDR26/PN6": 2.9, "SDR17/PN10": 4.5, "SDR11/PN16": 6.8 }, available: "stock" },
  { dn: 90,  od: 90,  wallByClass: { "SDR26/PN6": 3.5, "SDR17/PN10": 5.4, "SDR11/PN16": 8.2 }, available: "stock" },
  { dn: 110, od: 110, wallByClass: { "SDR26/PN6": 4.3, "SDR17/PN10": 6.6, "SDR11/PN16": 10.0 }, available: "partial" },
  { dn: 125, od: 125, wallByClass: { "SDR26/PN6": 4.9, "SDR17/PN10": 7.4, "SDR11/PN16": 11.4 }, available: "partial" },
  { dn: 140, od: 140, wallByClass: { "SDR26/PN6": 5.5, "SDR17/PN10": 8.3, "SDR11/PN16": 12.7 }, available: "partial" },
  { dn: 160, od: 160, wallByClass: { "SDR26/PN6": 6.2, "SDR17/PN10": 9.5, "SDR11/PN16": 14.6 }, available: "partial" },
  { dn: 200, od: 200, wallByClass: { "SDR26/PN6": 7.7, "SDR17/PN10": 11.9, "SDR11/PN16": 18.2 }, available: "partial" },
  { dn: 250, od: 250, wallByClass: { "SDR26/PN6": 9.6, "SDR17/PN10": 14.8, "SDR11/PN16": 22.7 }, available: "order" },
  { dn: 315, od: 315, wallByClass: { "SDR26/PN6": 12.1, "SDR17/PN10": 18.7, "SDR11/PN16": 28.6 }, available: "order" },
  { dn: 355, od: 355, wallByClass: { "SDR26/PN6": 13.7, "SDR17/PN10": 20.9 }, available: "order" },
  { dn: 400, od: 400, wallByClass: { "SDR26/PN6": 15.4, "SDR17/PN10": 23.7 }, available: "order" },
  { dn: 450, od: 450, wallByClass: { "SDR26/PN6": 17.3, "SDR17/PN10": 26.7 }, available: "order" },
  { dn: 500, od: 500, wallByClass: { "SDR26/PN6": 19.1, "SDR17/PN10": 29.7 }, available: "order" },
  { dn: 630, od: 630, wallByClass: { "SDR26/PN6": 24.1, "SDR17/PN10": 37.4 }, available: "order" },
];

// ─── Corrugated HDPE Dimensions ─────────────────────────────────────────────

const corrugatedDimensions: DimensionRow[] = [
  { dn: 100,  od: 112,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 125,  od: 140,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 150,  od: 168,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 200,  od: 222,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 250,  od: 278,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 300,  od: 334,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 400,  od: 444,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 500,  od: 556,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 600,  od: 664,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 800,  od: 891,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 1000, od: 1115, sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
  { dn: 1200, sn: { sn4: true, sn8: true }, lengths: "6 m", available: "order" },
  { dn: 1500, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "order" },
  { dn: 2000, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "order" },
];

// ─── Product Groups ──────────────────────────────────────────────────────────

export const productGroups: ProductGroup[] = [

  // ── CIVIL ─────────────────────────────────────────────────────────────────

  {
    id: "pe100-pressure-pipe",
    slug: "pe100-pressure-pipe",
    name: "PE100 Pressure Pipe",
    shortName: "PE100",
    category: "civil",
    material: "HDPE / PE100",
    application: "Water Supply & Pressure Systems",
    description:
      "High-density polyethylene PE100 pressure pipe for potable water distribution, irrigation mains, and pressurised industrial networks. Engineered for 50+ year service life with full fusion-weld compatibility. Available in solid-wall SDR series from PN6 to PN32 across three Balkan-region suppliers.",
    image: "/products/civil/konti-pe100-water-pipe.jpg",
    standards: ["EN 12201", "ISO 4427", "ISO 9001"],
    keyProperties: {
      "Material": "PE100 (HDPE)",
      "Wall Type": "Solid wall",
      "Colour": "Black with blue stripe",
      "Standard Length": "6 m bars / coils ≤ 110 mm",
      "Jointing": "Butt fusion · Electrofusion · Mechanical fittings",
      "Temperature Range": "0 °C to +40 °C",
      "Pressure Classes": "PN6 · PN10 · PN16 · PN25 · PN32",
    },
    dimensions: pe100Dimensions,
    featured: true,
    tags: ["water", "pressure", "HDPE", "PE100"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø20–200 mm in stock (PN6, PN10, PN16)",
        orderNote: "Ø200+ and PN25 on order",
        diameterMin: 20,
        diameterMax: 630,
        pressureClasses: ["PN6", "PN10", "PN16", "PN25"],
        standards: ["EN 12201"],
        specificSpecs: { "Max Diameter": "Ø630 mm", "Coils": "≤110 mm", "Bars": "6–12 m" },
      },
      {
        partnerId: "teqja",
        partnerName: "Teqja International",
        country: "Albania",
        color: "#22d3ee",
        availability: "partial",
        stockNote: "Ø20–90 mm in stock (PN10, PN16)",
        orderNote: "Ø90+ and higher PN classes on order",
        diameterMin: 20,
        diameterMax: 630,
        pressureClasses: ["PN4", "PN6", "PN10", "PN16", "PN25", "PN32"],
        standards: ["EN 12201", "ISO 9001"],
        specificSpecs: { "Production": "Local Albanian", "Lengths": "6 m / 12 m bars" },
      },
      {
        partnerId: "poly-plast-system",
        partnerName: "Poly Plast System",
        country: "Albania",
        color: "#ef4444",
        availability: "in-stock",
        stockNote: "Ø20–400 mm in stock",
        diameterMin: 20,
        diameterMax: 400,
        pressureClasses: ["PN6", "PN10", "PN16"],
        standards: ["EN 12201", "ISO 4427"],
        specificSpecs: { "Material": "PE80 / PE100", "Colour": "Black or blue" },
      },
    ],
  },

  {
    id: "corrugated-hdpe-sewage",
    slug: "corrugated-hdpe-sewage",
    name: "Corrugated HDPE Sewage Pipe",
    shortName: "Corrugated HDPE",
    category: "civil",
    material: "HDPE",
    application: "Gravity Sewage & Stormwater",
    description:
      "Double-wall corrugated HDPE pipe with smooth inner bore and structured outer wall, designed for gravity sewage, stormwater drainage and subsurface cable protection. SN4 class features a distinctive blue interior lining; SN8 features yellow lining for easy site identification. Available in diameters up to Ø2000 mm.",
    image: "/products/civil/konti-kan-corrugated-sewage.jpg",
    standards: ["EN 13476", "EN 13476-1:2018"],
    keyProperties: {
      "Wall Type": "Double-wall corrugated (smooth inner)",
      "SN4 Lining": "Blue interior",
      "SN8 Lining": "Yellow interior",
      "Standard Length": "6 m with rubber-seal coupler",
      "Jointing": "Coupler with EPDM rubber gasket",
      "Burial Depth": "0.5–8 m (load dependent)",
    },
    dimensions: corrugatedDimensions,
    featured: true,
    tags: ["sewage", "drainage", "corrugated", "SN4", "SN8"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "SN4 & SN8 in stock Ø110–1000 mm",
        orderNote: "Ø1200–2000 mm on order",
        diameterMin: 110,
        diameterMax: 2000,
        standards: ["EN 13476", "SN4", "SN8"],
        specificSpecs: { "SN4 Lining": "Blue", "SN8 Lining": "Yellow", "Max Stock Diameter": "Ø1000 mm" },
      },
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "in-stock",
        stockNote: "SN4 full range in stock",
        orderNote: "SN8 on order",
        diameterMin: 100,
        diameterMax: 1000,
        standards: ["EN 13476"],
        specificSpecs: { "Primary Class": "SN4" },
      },
      {
        partnerId: "teqja",
        partnerName: "Teqja International",
        country: "Albania",
        color: "#22d3ee",
        availability: "in-stock",
        stockNote: "Ø150–630 mm in stock",
        diameterMin: 150,
        diameterMax: 630,
        standards: ["EN 13476-1:2018"],
        specificSpecs: { "Length": "12 m", "Jointing": "Rubber-seal coupler" },
      },
    ],
  },

  {
    id: "spiral-pp-sewage-pipe",
    slug: "spiral-pp-sewage-pipe",
    name: "Spiral PP Sewage Pipe",
    shortName: "Spiral PP",
    category: "civil",
    material: "PP (Polypropylene)",
    application: "Large-Diameter Municipal Sewage",
    description:
      "Spiral-wound polypropylene structured-wall pipe for large-diameter trunk sewers and industrial wastewater. The spiral manufacturing process enables diameters far beyond standard extrusion, making this the preferred solution for major municipal infrastructure. 95% of production is exported across Southeast Europe.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop&q=80",
    standards: ["EN 13476"],
    keyProperties: {
      "Material": "Polypropylene (PP) structured wall",
      "Max Diameter": "Ø2000 mm",
      "Standard Length": "6 m",
      "Stiffness": "SN4 to SN16",
      "Jointing": "Integrated rubber seal",
      "Application": "Municipal trunk sewers, industrial wastewater",
    },
    dimensions: [
      { dn: 300,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
      { dn: 400,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
      { dn: 500,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
      { dn: 600,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
      { dn: 800,  sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
      { dn: 1000, sn: { sn4: true, sn8: true }, lengths: "6 m", available: "stock" },
      { dn: 1200, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "order" },
      { dn: 1500, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "order" },
      { dn: 2000, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "order" },
    ],
    featured: true,
    tags: ["sewage", "large-diameter", "PP", "spiral"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø300–1000 mm in stock",
        orderNote: "Ø1200–2000 mm on order",
        diameterMin: 300,
        diameterMax: 2000,
        standards: ["EN 13476"],
        specificSpecs: { "Founded": "1975", "Export share": "95%", "Stiffness": "SN4–SN16" },
      },
    ],
  },

  {
    id: "pe-gas-pipe",
    slug: "pe-gas-pipe",
    name: "PE Gas Distribution Pipe",
    shortName: "PE Gas",
    category: "civil",
    material: "HDPE / PE100-RC",
    application: "Gas Distribution",
    description:
      "PE100-RC (Resistance to Crack) gas distribution pipe with characteristic yellow stripe for unmistakable identification on site. Engineered to EN 1555 for natural gas and LPG networks, SDR 11 and SDR 17 ratings. The enhanced crack-resistance compound makes this suitable for difficult installation conditions.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&fit=crop&q=80",
    standards: ["EN 1555", "EN 12201"],
    keyProperties: {
      "Material": "PE100-RC",
      "Colour": "Black with yellow stripe",
      "Compound": "Resistant to crack propagation",
      "SDR Classes": "SDR 11 / SDR 17",
      "Pressure": "PN4 to PN10",
    },
    dimensions: [
      { dn: 20,  od: 20,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN10": 2.3 }, available: "stock" },
      { dn: 32,  od: 32,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN10": 3.0 }, available: "stock" },
      { dn: 63,  od: 63,  wallByClass: { "SDR17/PN10": 3.8, "SDR11/PN10": 5.8 }, available: "stock" },
      { dn: 90,  od: 90,  wallByClass: { "SDR17/PN10": 5.4, "SDR11/PN10": 8.2 }, available: "stock" },
      { dn: 110, od: 110, wallByClass: { "SDR17/PN10": 6.6, "SDR11/PN10": 10.0 }, available: "partial" },
      { dn: 160, od: 160, wallByClass: { "SDR17/PN10": 9.5, "SDR11/PN10": 14.6 }, available: "order" },
      { dn: 200, od: 200, wallByClass: { "SDR17/PN10": 11.9 }, available: "order" },
      { dn: 315, od: 315, wallByClass: { "SDR17/PN10": 18.7 }, available: "order" },
    ],
    tags: ["gas", "PE100-RC", "infrastructure"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø20–110 mm in stock",
        orderNote: "Ø110–315 mm on order",
        diameterMin: 20,
        diameterMax: 315,
        standards: ["EN 1555", "EN 12201"],
        specificSpecs: { "SDR": "SDR 11 / SDR 17", "Colour": "Black + yellow stripe" },
      },
    ],
  },

  {
    id: "electric-optic-conduit",
    slug: "electric-optic-conduit",
    name: "Electric & Optical Conduit",
    shortName: "HDPE Conduit",
    category: "civil",
    material: "HDPE",
    application: "Cable Protection",
    description:
      "HDPE conduit pipe for underground protection of electrical cables, fibre-optic lines, and telecommunications infrastructure. PTT-standard monotube in single and twin configurations. Smooth inner bore allows easy cable pulling. Available in opaque black for electrical and with stripe coding for fibre-optic identification.",
    image: "/products/industrial/konti-cable-duct.jpg",
    standards: ["EN 61386", "PTT Standard"],
    keyProperties: {
      "Material": "HDPE",
      "Types": "Monotube · Bitube",
      "Monotub Optic": "40×1.2 mm (8 ATM) / 40×2.4 mm (10 ATM)",
      "Colour": "Black / Orange (electric) · Orange with stripe (optic)",
      "Jointing": "Coupler or direct bury",
    },
    dimensions: [
      { dn: 40, od: 40, wallByClass: { "8 ATM": 1.2, "10 ATM": 2.4 }, lengths: "coils / bars", available: "stock" },
      { dn: 50, od: 50, lengths: "coils / bars", available: "stock" },
      { dn: 63, od: 63, lengths: "coils / bars", available: "partial" },
      { dn: 110, od: 110, lengths: "6 m bars", available: "partial" },
      { dn: 160, od: 160, lengths: "6 m bars", available: "order" },
    ],
    tags: ["conduit", "optic", "electric", "telecom"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø40 & Ø50 monotube optic in stock; bitube on order",
        orderNote: "Bitube and larger sizes on order",
        diameterMin: 40,
        diameterMax: 110,
        specificSpecs: { "Monotub 40×1.2 mm": "8 ATM — in stock", "Monotub 40×2.4 mm": "10 ATM — in stock", "Bitube": "On order only" },
      },
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø40–110 mm in stock",
        orderNote: "Ø110–160 mm on order",
        diameterMin: 40,
        diameterMax: 160,
        standards: ["EN 61386"],
      },
    ],
  },

  {
    id: "pph-drainage-pipe",
    slug: "pph-drainage-pipe",
    name: "PP-H Gravity Drainage Pipe",
    shortName: "PP-H Drainage",
    category: "civil",
    material: "PP-H (Polypropylene Homopolymer)",
    application: "Gravity Drainage & Soil Stacks",
    description:
      "PP-H (polypropylene homopolymer) gravity drainage pipe with distinctive white lining for building drainage, soil stacks, and acoustic-rated installations. PP-H Silent uses mineral-filled compounds to reduce flow noise — ideal for multi-storey residential and hotel construction.",
    image: "/products/civil/ferplast-pp-h-pipe.png",
    standards: ["EN 1451"],
    keyProperties: {
      "Material": "PP-H / PP-H Silent (mineral filled)",
      "Colour": "Grey with white lining",
      "Silent Variant": "PP-H Silent — mineral filled for acoustic performance",
      "Standard Length": "0.5 m · 1 m · 2 m · 3 m",
      "Fittings": "Elbows Ø50–315 mm · T & Y Ø50–200 mm",
    },
    dimensions: [
      { dn: 50,  od: 56,  lengths: "0.5–3 m", available: "stock" },
      { dn: 75,  od: 82,  lengths: "0.5–3 m", available: "stock" },
      { dn: 90,  od: 98,  lengths: "0.5–3 m", available: "stock" },
      { dn: 110, od: 119, lengths: "0.5–3 m", available: "stock" },
      { dn: 125, od: 135, lengths: "0.5–3 m", available: "stock" },
      { dn: 160, od: 172, lengths: "3 m", available: "order" },
      { dn: 200, od: 215, lengths: "3 m", available: "order" },
      { dn: 315, od: 337, lengths: "3 m", available: "order" },
    ],
    tags: ["drainage", "PP-H", "building", "silent", "acoustic"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø50–125 mm standard in stock; elbows Ø50–110 mm in stock",
        orderNote: "PP-H Silent on order; Ø160+ on order; elbows Ø110–315 mm on order",
        diameterMin: 50,
        diameterMax: 315,
        specificSpecs: {
          "T & Y fittings": "Ø50–160 in stock; Ø160–200 on order",
          "Elbows": "Ø50–110 in stock; Ø110–315 on order",
        },
      },
    ],
  },

  {
    id: "hdpe-inspection-chamber",
    slug: "hdpe-inspection-chamber",
    name: "HDPE Inspection Chamber",
    shortName: "Inspection Chamber",
    category: "civil",
    material: "HDPE",
    application: "Sewage Access & Maintenance",
    description:
      "Prefabricated HDPE inspection chamber for gravity sewage and stormwater networks. Factory-assembled risers and base units reduce on-site installation time by up to 60% compared to traditional concrete chambers. Compatible with standard corrugated pipe couplers. Produced to EN 13598-2:2009; standard inner diameters ID 800, 1000, and 1200 mm.",
    image: "/products/civil/ferplast-hdpe-corrugated.png",
    standards: ["EN 13598"],
    keyProperties: {
      "Material": "HDPE",
      "Body Diameters": "Ø315 mm · Ø425 mm · Ø630 mm",
      "Max Installation Depth": "Up to 6 m",
      "Cover Load Class": "B125 to D400",
      "Socket Couplers": "Up to Ø630 mm in stock",
    },
    dimensions: [
      { dn: 315, available: "stock" },
      { dn: 425, available: "stock" },
      { dn: 630, available: "stock" },
    ],
    tags: ["chamber", "inspection", "manhole", "sewage"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "in-stock",
        stockNote: "Ø315, Ø425, Ø630 in stock; socket couplers to Ø630 in stock",
        diameterMin: 315,
        diameterMax: 630,
        standards: ["EN 13598"],
        specificSpecs: { "Depth": "Up to 6 m", "Cover": "B125–D400" },
      },
    ],
  },

  {
    id: "water-storage-tank",
    slug: "water-storage-tank",
    name: "Plastic Water Storage Tank",
    shortName: "Water Tank",
    category: "civil",
    material: "HDPE",
    application: "Water Storage",
    description:
      "Rotationally moulded HDPE water storage tanks for residential, agricultural, and light industrial water supply. Food-grade compound suitable for potable water. Standard 500 L and 1000 L sizes in stock; larger capacities and custom configurations available on order.",
    image: "/products/civil/ferplast-water-reservoir.png",
    standards: ["EU Food Contact Regulations"],
    keyProperties: {
      "Material": "Food-grade HDPE",
      "Standard Capacities": "500 L · 1000 L (in stock)",
      "Fitting": "Inlet, outlet, and overflow connections",
      "UV Stabilised": "Yes",
    },
    dimensions: [
      { dn: 500,  lengths: "500 L", available: "stock" },
      { dn: 1000, lengths: "1000 L", available: "stock" },
      { dn: 2000, lengths: "2000 L", available: "order" },
      { dn: 5000, lengths: "5000 L", available: "order" },
    ],
    tags: ["tank", "storage", "water", "potable"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "500 L and 1000 L in stock",
        orderNote: "Larger capacities on order",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: { "In Stock": "500 L · 1000 L", "On Order": "Larger sizes" },
      },
    ],
  },

  {
    id: "construction-damp-proof-membrane",
    slug: "construction-damp-proof-membrane",
    name: "Construction Damp-Proof Membrane",
    shortName: "DPM",
    category: "civil",
    material: "LDPE",
    application: "Waterproofing & Construction",
    description:
      "Heavy-duty polyethylene damp-proof membrane for under-slab and foundation waterproofing. Produced from recycled PE granulates to EN 13967. Available in multiple thicknesses up to 500 µm and widths up to 8 m for large continuous pours.",
    image:
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop&q=80",
    standards: ["EN 13967"],
    keyProperties: {
      "Material": "LDPE (recycled compound)",
      "Thickness": "200–500 µm",
      "Width": "Up to 8 m",
      "Roll Length": "Standard 25 m rolls",
    },
    tags: ["waterproofing", "membrane", "construction", "DPM"],
    suppliers: [
      {
        partnerId: "plastika-ks",
        partnerName: "PLASTIKA",
        country: "Kosovo",
        color: "#22c55e",
        availability: "in-stock",
        stockNote: "Standard sizes in stock",
        diameterMin: 0,
        diameterMax: 0,
        standards: ["EN 13967"],
        specificSpecs: { "Thickness": "200–500 µm", "Width": "Up to 8 m" },
      },
    ],
  },

  // ── AGRICULTURAL ──────────────────────────────────────────────────────────

  {
    id: "fitt-mint",
    slug: "fitt-mint",
    name: "FITT Mint",
    shortName: "FITT Mint",
    category: "agri",
    material: "PVC",
    application: "Garden Watering & Hobby Irrigation",
    description:
      "FITT Mint is a four-layer PVC garden hose designed for regular hobby use in garden watering and irrigation. Its black inner layer actively prevents algae formation, while the outer cover is UV-stabilised for long service life in outdoor conditions. The hose performs reliably between −10 °C and +40 °C and carries a 10-year manufacturer guarantee.",
    image:
      "https://fitt-cdn.thron.com/delivery/public/image/fitt/5ba2b06e-31a2-4aa9-a0d6-3ea34c8c1eef/pf4brg/std/1000x0/FITT%20Mint%20render.jpg",
    standards: ["EN ISO 1307"],
    keyProperties: {
      "Material": "PVC — 4-layer construction",
      "Reinforcement": "Polyester braided mesh",
      "Inner Diameter": "12.5 / 15 / 19 / 25 mm",
      "Roll Lengths": "15 / 25 / 30 / 50 m",
      "Bursting Pressure": "21–24 bar",
      "Temperature Range": "−10 °C to +40 °C",
      "Inner Layer": "Anti-algae black",
      "Origin": "Made in Italy",
      "Guarantee": "10 years",
    },
    dimensions: [
      { dn: 13, lengths: "15 / 25 / 30 / 50 m", available: "stock" },
      { dn: 15, lengths: "15 / 25 / 30 / 50 m", available: "stock" },
      { dn: 19, lengths: "15 / 25 / 30 / 50 m", available: "stock" },
      { dn: 25, lengths: "25 / 50 m",          available: "stock" },
    ],
    featured: true,
    tags: ["hose", "garden", "FITT", "Mint", "PVC"],
    suppliers: [
      {
        partnerId: "fitt",
        partnerName: "FITT",
        country: "Italy",
        color: "#06b6d4",
        availability: "in-stock",
        stockNote: "½″ / ⅝″ / ¾″ × 24 Bar × 25–50 m in stock",
        diameterMin: 12,
        diameterMax: 25,
        standards: ["EN ISO 1307"],
        specificSpecs: {
          "Construction": "4-layer braided mesh PVC",
          "Inner Layer": "Anti-algae black",
          "Source": "fitt.com/product/fitt_mint",
        },
      },
    ],
  },

  {
    id: "fitt-mimosa",
    slug: "fitt-mimosa",
    name: "FITT Mimosa",
    shortName: "FITT Mimosa",
    category: "agri",
    material: "PVC",
    application: "Semi-Professional Agricultural Hose",
    description:
      "FITT Mimosa is a three-layer PVC hose engineered for semi-professional use in agricultural environments and intensive garden applications. High-tenacity polyester braided mesh delivers superior pressure resistance compared to standard hobby hoses, with bursting pressure up to 40 bar on smaller diameters. The opaque yellow anti-UV outer jacket with twin green stripes provides immediate brand recognition and UV protection, while the anti-algae black inner layer keeps the waterway clean.",
    image:
      "https://fitt-cdn.thron.com/delivery/public/image/fitt/74893973-8195-44e7-a2f8-f28772d4cbaa/pf4brg/std/1000x0/FITT%20Mimosa%20render.jpg",
    standards: ["EN ISO 1307"],
    keyProperties: {
      "Material": "PVC — 3-layer semi-professional",
      "Reinforcement": "High-tenacity polyester braid",
      "Inner Diameter": "12.5 / 15 / 19 / 25 / 30 mm",
      "Roll Lengths": "10 / 15 / 20 / 25 / 50 m",
      "Bursting Pressure": "21–40 bar (diameter-dependent)",
      "Temperature Range": "−10 °C to +40 °C",
      "Outer Colour": "Opaque yellow with twin green stripes",
      "Inner Layer": "Anti-algae black",
      "Origin": "Made in Italy",
      "Guarantee": "10 years",
    },
    dimensions: [
      { dn: 13, lengths: "25 / 50 m", available: "stock" },
      { dn: 15, lengths: "metres",    available: "stock" },
      { dn: 19, lengths: "metres",    available: "stock" },
      { dn: 25, lengths: "metres",    available: "stock" },
    ],
    featured: true,
    tags: ["hose", "agriculture", "FITT", "Mimosa", "PVC", "semi-professional"],
    suppliers: [
      {
        partnerId: "fitt",
        partnerName: "FITT",
        country: "Italy",
        color: "#06b6d4",
        availability: "in-stock",
        stockNote: "½″ × 40 Bar × 25/50 m · ⅝″/¾″/1″ available by metre",
        diameterMin: 12,
        diameterMax: 30,
        standards: ["EN ISO 1307"],
        specificSpecs: {
          "Construction": "3-layer high-tenacity braid",
          "Burst Pressure": "Up to 40 bar (½″)",
          "Source": "fitt.com/product/fitt_mimosa",
        },
      },
    ],
  },

  {
    id: "pvc-garden-hose",
    slug: "pvc-garden-hose",
    name: "PVC Garden & Irrigation Hose",
    shortName: "PVC Hose",
    category: "agri",
    material: "PVC",
    application: "Garden & Light Irrigation",
    description:
      "Flexible PVC garden hose with textile yarn reinforcement for improved burst pressure and kink resistance. Available in 1/2″, 3/4″, and 1″ diameters in roll lengths from 20 to 50 m. Flexoper 3 model features enhanced flexibility for low-temperature use.",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=800&fit=crop&q=80",
    standards: [],
    keyProperties: {
      "Models": "Perplast Classic · Flexoper 3",
      "Sizes": "1/2″ (13 mm) · 3/4″ (19 mm) · 1″ (25 mm)",
      "Rolls": "20 m · 25 m · 30 m · 50 m",
      "Reinforcement": "Textile yarn braid",
      "Max Pressure": "8 bar WP",
      "Temperature": "−5 °C to +50 °C",
    },
    dimensions: [
      { dn: 13, lengths: "20 m · 25 m · 30 m · 50 m", available: "stock" },
      { dn: 19, lengths: "20 m · 25 m · 50 m", available: "stock" },
      { dn: 25, lengths: "25 m · 50 m", available: "stock" },
    ],
    tags: ["hose", "garden", "PVC", "irrigation"],
    suppliers: [
      {
        partnerId: "perplast",
        partnerName: "Perplast Kompani",
        country: "North Macedonia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "Perplast Classic & Flexoper 3 in stock — 1/2″, 3/4″, 1″",
        diameterMin: 10,
        diameterMax: 50,
        specificSpecs: {
          "Perplast Classic": "1/2″ · 3/4″ · 1″",
          "Flexoper 3": "1/2″ in 20 m · 25 m · 30 m · 50 m rolls",
        },
      },
    ],
  },

  {
    id: "drip-irrigation-pipe",
    slug: "drip-irrigation-pipe",
    name: "Drip Irrigation Lateral Pipe",
    shortName: "Drip Lateral",
    category: "agri",
    material: "LDPE",
    application: "Precision Irrigation",
    description:
      "Thin-wall LDPE drip irrigation lateral with integrated or insertable pressure-compensating emitters at 20, 30, or 50 cm spacing. Designed for row crops, vineyards, and orchards. Supplied in 200 m and 500 m rolls for large-area installations.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop&q=80",
    standards: ["ISO 9261"],
    keyProperties: {
      "Material": "LDPE",
      "Diameters": "16 mm · 20 mm · 32 mm",
      "Wall Thickness": "0.9–1.5 mm",
      "Emitter Spacing": "20 cm · 30 cm · 50 cm",
      "Roll Length": "200 m · 500 m",
    },
    dimensions: [
      { dn: 16, wallByClass: { "Standard": 0.9 }, lengths: "200 m / 500 m rolls", available: "stock" },
      { dn: 20, wallByClass: { "Standard": 1.2 }, lengths: "200 m / 500 m rolls", available: "stock" },
      { dn: 32, wallByClass: { "Standard": 1.5 }, lengths: "200 m rolls", available: "partial" },
    ],
    tags: ["drip", "irrigation", "LDPE", "agriculture"],
    suppliers: [
      {
        partnerId: "albplast",
        partnerName: "Albplast",
        country: "Albania",
        color: "#64748b",
        availability: "partial",
        stockNote: "Ø16 & Ø20 mm in stock",
        orderNote: "Ø32 mm on order",
        diameterMin: 16,
        diameterMax: 32,
        specificSpecs: { "Emitter Spacing": "20 / 30 / 50 cm", "Rolls": "200 m / 500 m" },
      },
    ],
  },

  {
    id: "pe-irrigation-mainline",
    slug: "pe-irrigation-mainline",
    name: "PE100 Irrigation Mainline",
    shortName: "Irrigation Main",
    category: "agri",
    material: "HDPE",
    application: "Pressurised Irrigation",
    description:
      "PE100 solid-wall mainline pipe for pressurised sprinkler and drip irrigation networks. PN10 and PN16 pressure ratings for pumped systems. Compatible with standard compression and electrofusion fittings. Coil sizes up to 200 m for field installation without joints.",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=800&fit=crop&q=80",
    standards: ["ISO 4427", "EN 12201"],
    keyProperties: {
      "Material": "PE100",
      "Colour": "Black",
      "Coil Length": "Up to 200 m",
      "Jointing": "Butt fusion · Electrofusion · Compression fittings",
      "Pressure": "PN10 · PN16",
    },
    dimensions: [
      { dn: 20,  od: 20,  wallByClass: { "PN10": 1.9, "PN16": 2.3 }, lengths: "200 m coil", available: "stock" },
      { dn: 25,  od: 25,  wallByClass: { "PN10": 1.9, "PN16": 2.3 }, lengths: "200 m coil", available: "stock" },
      { dn: 32,  od: 32,  wallByClass: { "PN10": 1.9, "PN16": 3.0 }, lengths: "200 m coil", available: "stock" },
      { dn: 40,  od: 40,  wallByClass: { "PN10": 2.4, "PN16": 3.7 }, lengths: "200 m coil", available: "stock" },
      { dn: 50,  od: 50,  wallByClass: { "PN10": 3.0, "PN16": 4.6 }, lengths: "200 m coil", available: "stock" },
      { dn: 63,  od: 63,  wallByClass: { "PN10": 3.8, "PN16": 5.8 }, lengths: "100 m coil", available: "stock" },
      { dn: 75,  od: 75,  wallByClass: { "PN10": 4.5, "PN16": 6.8 }, lengths: "100 m coil", available: "partial" },
      { dn: 90,  od: 90,  wallByClass: { "PN10": 5.4, "PN16": 8.2 }, lengths: "6 m bars", available: "partial" },
      { dn: 110, od: 110, wallByClass: { "PN10": 6.6, "PN16": 10.0 }, lengths: "6 m bars", available: "order" },
    ],
    tags: ["irrigation", "mainline", "PE100", "agriculture"],
    suppliers: [
      {
        partnerId: "albplast",
        partnerName: "Albplast",
        country: "Albania",
        color: "#64748b",
        availability: "partial",
        stockNote: "Ø20–63 mm in stock",
        orderNote: "Ø75+ on order",
        diameterMin: 20,
        diameterMax: 110,
        standards: ["ISO 4427"],
        specificSpecs: { "Pressure": "PN10 · PN16", "Coil length": "Up to 200 m" },
      },
    ],
  },

  {
    id: "agricultural-film",
    slug: "agricultural-film",
    name: "Agricultural Polyethylene Film",
    shortName: "Agri Film",
    category: "agri",
    material: "LDPE / LLDPE",
    application: "Greenhouse & Mulching",
    description:
      "UV-stabilised PE film for greenhouse cover, ground mulching, and silage. Available in black/transparent for season extension and in white-on-black for reflective mulching. Multiple UV-lifetime ratings (2–5 years). Standard width 4 m, length 100 m per roll. Both Plastika KS (Kosovo) and Polins (Serbia) supply from recycled-grade PE.",
    image:
      "https://plastika-ks.com/wp-content/uploads/2018/01/greenhouse_2.jpg",
    standards: ["ISO 14001"],
    keyProperties: {
      "Material": "LDPE / LLDPE",
      "UV Lifetime": "2 years · 4 years · 5 years",
      "Standard Width": "4 m · 6.3 m",
      "Roll Length": "100 m",
      "Colours": "Black · White · Transparent",
    },
    tags: ["film", "greenhouse", "mulch", "agriculture", "PE"],
    suppliers: [
      {
        partnerId: "plastika-ks",
        partnerName: "PLASTIKA",
        country: "Kosovo",
        color: "#22c55e",
        availability: "in-stock",
        stockNote: "Black plasmas 2yr UV in stock — 4 m × 100 m (50 kg & 60 kg); 6.3 m × 100 m (60 kg); White plasmas in stock — 30 kg / 40 kg / 50 kg",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Black 4 m × 100 m": "50 kg · 60 kg",
          "Black 6.3 m × 100 m": "60 kg",
          "White 4 m × 100 m": "30 kg · 40 kg · 50 kg",
          "UV Rating": "2 years",
        },
      },
      {
        partnerId: "polins",
        partnerName: "Polins doo",
        country: "Serbia",
        color: "#64748b",
        availability: "partial",
        stockNote: "Greenhouse cover film in stock — 80–200 µm",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: { "Thickness": "80–200 µm", "Width": "4–14 m", "UV Lifetime": "2–5 years" },
      },
    ],
  },

  // ── INDUSTRIAL ────────────────────────────────────────────────────────────

  {
    id: "industrial-rubber-hose",
    slug: "industrial-rubber-hose",
    name: "Industrial Rubber Hose",
    shortName: "Rubber Hose",
    category: "industrial",
    material: "Rubber",
    application: "Air · Water · Oil · Chemical Transfer",
    description:
      "Heavy-duty rubber hoses for compressed air, water, oil, and chemical transfer in industrial, construction, and mining environments. Two-ply textile or wire braid reinforcement for high-pressure and vacuum applications. SEL-Polimer has been manufacturing rubber hoses since 1957.",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&h=800&fit=crop&q=80",
    standards: ["ISO 9001"],
    keyProperties: {
      "Material": "Natural / synthetic rubber",
      "Reinforcement": "Textile braid / Wire braid",
      "Diameter Range": "6–150 mm",
      "Pressure": "10–40 bar WP",
      "Temperature": "−30 °C to +100 °C",
    },
    dimensions: [
      { dn: 6,   lengths: "coils", available: "stock" },
      { dn: 13,  lengths: "coils", available: "stock" },
      { dn: 19,  lengths: "coils", available: "stock" },
      { dn: 25,  lengths: "coils", available: "stock" },
      { dn: 32,  lengths: "coils", available: "stock" },
      { dn: 50,  lengths: "coils", available: "stock" },
      { dn: 76,  lengths: "coils", available: "partial" },
      { dn: 100, lengths: "coils", available: "partial" },
      { dn: 150, lengths: "coils", available: "order" },
    ],
    tags: ["rubber", "hose", "industrial", "pneumatic"],
    suppliers: [
      {
        partnerId: "sel-polimer",
        partnerName: "SEL-Polimer",
        country: "Turkey",
        color: "#f59e0b",
        availability: "in-stock",
        stockNote: "Ø6–100 mm standard range in stock",
        orderNote: "Ø100–150 mm special sizes on order",
        diameterMin: 6,
        diameterMax: 150,
        standards: ["ISO 9001"],
        specificSpecs: { "Founded": "1957", "Pressure": "10–40 bar WP", "Temperature": "−30 °C to +100 °C" },
      },
    ],
  },

  {
    id: "pvc-suction-hose",
    slug: "pvc-suction-hose",
    name: "PVC Suction & Delivery Hose",
    shortName: "PVC Suction",
    category: "industrial",
    material: "PVC",
    application: "Water · Slurry · Chemical Transfer",
    description:
      "Flexible PVC suction and delivery hose with rigid PVC spiral helix for shape retention under vacuum. Used for water, slurry, and light-chemical transfer in agriculture, construction, and industry. Handles up to −0.9 bar vacuum and positive delivery pressure.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop&q=80",
    standards: ["ISO 9001"],
    keyProperties: {
      "Material": "PVC with rigid PVC helix",
      "Diameter Range": "20–200 mm",
      "Vacuum": "Up to −0.9 bar",
      "Temperature": "−10 °C to +60 °C",
    },
    dimensions: [
      { dn: 20,  lengths: "coils / lengths", available: "stock" },
      { dn: 25,  lengths: "coils / lengths", available: "stock" },
      { dn: 32,  lengths: "coils / lengths", available: "stock" },
      { dn: 50,  lengths: "coils / lengths", available: "stock" },
      { dn: 75,  lengths: "lengths", available: "stock" },
      { dn: 100, lengths: "lengths", available: "partial" },
      { dn: 150, lengths: "lengths", available: "order" },
      { dn: 200, lengths: "lengths", available: "order" },
    ],
    tags: ["PVC", "suction", "hose", "vacuum", "slurry"],
    suppliers: [
      {
        partnerId: "sel-polimer",
        partnerName: "SEL-Polimer",
        country: "Turkey",
        color: "#f59e0b",
        availability: "partial",
        stockNote: "Ø20–75 mm in stock",
        orderNote: "Ø100–200 mm on order",
        diameterMin: 20,
        diameterMax: 200,
        specificSpecs: { "Helix": "Rigid PVC spiral", "Vacuum": "−0.9 bar" },
      },
    ],
  },

  {
    id: "spiral-transparent-hose",
    slug: "spiral-transparent-hose",
    name: "Spiral Transparent Hose",
    shortName: "Spiral Hose",
    category: "industrial",
    material: "PVC",
    application: "Industrial Fluid Transfer",
    description:
      "Clear or caramel-tinted PVC spiral hose with rigid helix reinforcement for suction and delivery of water, light chemicals, and granular materials. Excellent bend radius and full transparency for flow monitoring. Troy ST range covers Ø19–120 mm in standard hose reel and cut lengths.",
    image:
      "https://cdn.shopify.com/s/files/1/0565/8991/0105/products/01.2422.0012.0000_1.jpg?v=1679143405",
    standards: [],
    keyProperties: {
      "Material": "Clear / Caramel PVC with rigid spiral",
      "Sizes": "1/2″ (13 mm) · 3/4″ (19 mm) · 1″ (25 mm) and above",
      "Range": "Ø19–120 mm",
      "Transparency": "Full (clear) or amber (caramel)",
      "Model": "Troy ST / Carameli",
    },
    dimensions: [
      { dn: 13,  lengths: "50 m coil", available: "stock" },
      { dn: 19,  lengths: "50 m coil", available: "stock" },
      { dn: 25,  lengths: "50 m coil", available: "stock" },
      { dn: 32,  lengths: "25 m coil", available: "partial" },
      { dn: 50,  lengths: "25 m coil", available: "partial" },
      { dn: 75,  lengths: "cut lengths", available: "order" },
      { dn: 100, lengths: "cut lengths", available: "order" },
      { dn: 120, lengths: "cut lengths", available: "order" },
    ],
    tags: ["spiral", "transparent", "hose", "PVC", "clear"],
    suppliers: [
      {
        partnerId: "sel-polimer",
        partnerName: "SEL-Polimer",
        country: "Turkey",
        color: "#f59e0b",
        availability: "partial",
        stockNote: "1/2″, 3/4″, 1″ clear and caramel in stock",
        orderNote: "Ø32+ on order",
        diameterMin: 13,
        diameterMax: 120,
        specificSpecs: { "Models": "Troy ST (clear) · Carameli (caramel)", "Range": "Ø19–120 mm" },
      },
    ],
  },

  {
    id: "recycled-pe-granulates",
    slug: "recycled-pe-granulates",
    name: "Recycled PE Granulates",
    shortName: "PE Granulates",
    category: "industrial",
    material: "HDPE / LDPE (Recycled)",
    application: "Plastic Processing & Re-manufacture",
    description:
      "Post-industrial and post-consumer polyethylene granulates for use as base material in film extrusion, pipe production, and injection moulding. Processed under ISO 14001 environmental management. Two regional recycling partners provide continuous supply.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=800&fit=crop&q=80",
    standards: ["ISO 14001"],
    keyProperties: {
      "Input Streams": "Post-industrial · Post-consumer PE",
      "Output Form": "Pelletised granulate",
      "Grades": "HDPE · LDPE",
      "Applications": "Film extrusion · Pipe production · Injection moulding",
    },
    tags: ["recycled", "granulate", "HDPE", "LDPE", "circular"],
    suppliers: [
      {
        partnerId: "plastika-ks",
        partnerName: "PLASTIKA",
        country: "Kosovo",
        color: "#22c55e",
        availability: "in-stock",
        stockNote: "HDPE and LDPE granulates in regular stock",
        diameterMin: 0,
        diameterMax: 0,
        standards: ["ISO 14001"],
        specificSpecs: { "Grades": "HDPE · LDPE", "Form": "Pelletised granulate" },
      },
      {
        partnerId: "plastika-nv",
        partnerName: "Plastika DOO Nova Varoš",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "In-house recycling, continuous output",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: { "Energy": "Solar-powered facility", "Recycling": "In-house" },
      },
    ],
  },

  {
    id: "industrial-packaging-film",
    slug: "industrial-packaging-film",
    name: "Industrial PE Packaging Film",
    shortName: "Packaging Film",
    category: "industrial",
    material: "LDPE",
    application: "Pallet Wrapping & Product Protection",
    description:
      "Stretch and shrink PE films for pallet wrapping, product bundling, and protective industrial packaging. Widths up to 2000 mm. Produced at solar-powered facility with in-house PE recycling. Most catalogue lines in stock except the black specialty variants.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=800&fit=crop&q=80",
    standards: [],
    keyProperties: {
      "Material": "LDPE",
      "Thickness": "15–50 µm",
      "Width": "Up to 2000 mm",
      "Core Size": "76 mm",
      "Types": "Stretch film · Shrink film",
    },
    tags: ["film", "packaging", "industrial", "stretch", "PE"],
    suppliers: [
      {
        partnerId: "plastika-nv",
        partnerName: "Plastika DOO Nova Varoš",
        country: "Serbia",
        color: "#64748b",
        availability: "partial",
        stockNote: "Most lines in stock (see catalogue); black specialty variants on order",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: { "Thickness": "15–50 µm", "Width": "Up to 2000 mm", "Core": "76 mm" },
      },
    ],
  },

  // ── Water storage tanks ────────────────────────────────────────────────────

  {
    id: "pe-water-storage-tank",
    slug: "pe-water-storage-tank",
    name: "Polyethylene Water Storage Tank",
    shortName: "PE Water Tank",
    category: "civil",
    material: "HDPE",
    application: "Water Storage & Cisterns",
    description:
      "Rotationally moulded one-piece HDPE tanks for residential, agricultural, and municipal water storage. UV-stabilised, food-contact safe, and frost-resistant. Standard capacities from 300 L to 10 000 L. Flat-bottom vertical tanks and horizontal transport tanks both available. Ø500 L and Ø1000 L are in regular stock.",
    image: "/products/civil/ferplast-water-reservoir.png",
    standards: ["Food-contact HDPE", "EU 10/2011"],
    keyProperties: {
      "Material":       "HDPE (food-grade)",
      "Manufacturing":  "Rotational moulding — seamless one-piece",
      "UV Stabilised":  "Yes",
      "Colours":        "Black / Green / Blue",
      "Fittings":       "Bottom outlet · Lid · Float valve",
      "Capacities":     "300 L · 500 L · 1 000 L · 2 000 L · 5 000 L · 10 000 L",
    },
    dimensions: [
      { dn: 300,   lengths: "vertical",   available: "order" },
      { dn: 500,   lengths: "vertical",   available: "stock" },
      { dn: 1000,  lengths: "vertical",   available: "stock" },
      { dn: 2000,  lengths: "vertical",   available: "order" },
      { dn: 5000,  lengths: "vertical",   available: "order" },
      { dn: 10000, lengths: "vertical",   available: "order" },
    ],
    tags: ["tank", "cistern", "water-storage", "HDPE"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "500 L and 1 000 L tanks in stock",
        orderNote: "300 L, 2 000 L, 5 000 L, 10 000 L on order",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Stock sizes": "500 L · 1 000 L",
          "Outlet":      "Bottom ¾″ BSP fitting",
          "Lid":         "Included",
        },
      },
    ],
  },

  // ── PVC underground drainage pipe ─────────────────────────────────────────

  {
    id: "pvc-underground-drainage",
    slug: "pvc-underground-drainage",
    name: "PVC Underground Drainage Pipe",
    shortName: "PVC Drainage",
    category: "civil",
    material: "PVC-U",
    application: "Gravity Drainage & Cable Protection",
    description:
      "Unplasticised PVC (PVC-U) pipe for gravity drainage, municipal sewerage, and underground cable protection. Available in three wall series: SN2 (light duty), SN4 (standard), and SN8 (heavy load). Smooth inner bore for maximum flow, rubber-seal socket for leak-free jointing. Teqja International produces locally in Albania across the full diameter range.",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=800&fit=crop&q=80",
    standards: ["EN 1401", "EN 13476"],
    keyProperties: {
      "Material":        "PVC-U (unplasticised)",
      "Wall Series":     "SN2 (light) · SN4 (standard) · SN8 (heavy)",
      "Colour":          "Orange (cable protection) · Grey (drainage)",
      "Standard Length": "6 m with socket",
      "Jointing":        "Rubber-seal socket or solvent cement",
      "Application":     "Gravity drainage · Municipal sewers · Cable conduit",
    },
    dimensions: [
      { dn: 110, od: 110, wallByClass: { "SN2": 2.2, "SN4": 3.2, "SN8": 4.2 }, lengths: "6 m", available: "stock" },
      { dn: 125, od: 125, wallByClass: { "SN2": 2.5, "SN4": 3.7, "SN8": 4.8 }, lengths: "6 m", available: "stock" },
      { dn: 160, od: 160, wallByClass: { "SN2": 3.2, "SN4": 4.7, "SN8": 6.2 }, lengths: "6 m", available: "stock" },
      { dn: 200, od: 200, wallByClass: { "SN2": 4.0, "SN4": 5.9, "SN8": 7.7 }, lengths: "6 m", available: "stock" },
      { dn: 250, od: 250, wallByClass: { "SN4": 7.3, "SN8": 9.6 }, lengths: "6 m", available: "partial" },
      { dn: 315, od: 315, wallByClass: { "SN4": 9.2, "SN8": 12.1 }, lengths: "6 m", available: "partial" },
      { dn: 400, od: 400, wallByClass: { "SN4": 11.7 }, lengths: "6 m", available: "order" },
      { dn: 500, od: 500, wallByClass: { "SN4": 14.6 }, lengths: "6 m", available: "order" },
    ],
    tags: ["PVC", "drainage", "sewer", "cable-protection", "SN4", "SN8"],
    suppliers: [
      {
        partnerId: "teqja",
        partnerName: "Teqja International",
        country: "Albania",
        color: "#22d3ee",
        availability: "partial",
        stockNote: "SN2 · SN4 · SN8 in Ø110–200 mm — full range in stock",
        orderNote: "Ø250+ and SN8 large diameters on order",
        diameterMin: 110,
        diameterMax: 500,
        standards: ["EN 1401"],
        specificSpecs: {
          "Production":    "Local Albanian",
          "Stock range":   "Ø110–200 mm all wall classes",
          "Cable colour":  "Orange for cable protection · Grey for drainage",
        },
      },
    ],
  },

  {
    id: "food-grade-barrel",
    slug: "food-grade-barrel",
    name: "Food-Grade Plastic Barrel",
    shortName: "Food Barrel",
    category: "industrial",
    material: "HDPE",
    application: "Food Storage & Transport",
    description:
      "EU food-contact certified HDPE barrels for storage and transport of liquids, semi-liquids, and solid foodstuffs. Stackable design with screw-top lids. Standard capacities 30–220 L. Specialist and custom barrels available on order from ASSOS-VIOKON (Greece).",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=800&fit=crop&q=80",
    standards: ["EU 10/2011 Food Contact"],
    keyProperties: {
      "Material": "Food-grade HDPE",
      "Certification": "EU Food Contact Regulation 10/2011",
      "Capacities": "30 L · 60 L · 120 L · 220 L",
      "Closure": "Screw-top lid",
      "Stackable": "Yes",
    },
    tags: ["barrel", "food-grade", "storage", "HDPE"],
    suppliers: [
      {
        partnerId: "assos-viokon",
        partnerName: "ASSOS-VIOKON",
        country: "Greece",
        color: "#3b82f6",
        availability: "partial",
        stockNote: "Standard 60 L and 120 L in stock",
        orderNote: "Specialty barrels and accessories on order",
        diameterMin: 0,
        diameterMax: 0,
        standards: ["EU 10/2011"],
        specificSpecs: { "Capacities": "30 / 60 / 120 / 220 L", "Closure": "Screw-top lid" },
      },
    ],
  },

  // ─── HDPE Socket Coupling for Corrugated Pipe (Konti) ──────────────────────

  {
    id: "hdpe-socket-coupling",
    slug: "hdpe-socket-coupling",
    name: "HDPE Socket Coupling",
    shortName: "Socket Coupler",
    category: "civil",
    material: "HDPE",
    application: "Corrugated Pipe Jointing",
    description:
      "Injection-moulded and rotomoulded HDPE sockets for joining corrugated sewage and drainage pipes. Manufactured by Konti Hidroplast to match the full OD/ID dimension series — from Ø110 through Ø1000 mm — with paired EPDM gaskets for leak-tight gravity-line joints.",
    image: "/products/civil/konti-kan-fittings-socket.jpg",
    standards: ["EN 13476"],
    keyProperties: {
      "Material": "HDPE",
      "Manufacturing": "Injection (Ø110–800) · Rotomould (Ø800–1000)",
      "Sealing": "Paired EPDM rubber gasket",
      "OD Range": "Ø110–1000 mm",
      "ID Range": "Ø111.6–1010 mm",
      "Length Range": "140–330 mm",
    },
    dimensions: [
      { dn: 110,  od: 126,   lengths: "140 mm",  available: "stock" },
      { dn: 125,  od: 138.8, lengths: "144 mm",  available: "stock" },
      { dn: 160,  od: 178.1, lengths: "200 mm",  available: "stock" },
      { dn: 200,  od: 218.1, lengths: "220 mm",  available: "stock" },
      { dn: 250,  od: 273,   lengths: "220 mm",  available: "stock" },
      { dn: 315,  od: 352.7, lengths: "255 mm",  available: "stock" },
      { dn: 400,  od: 432.5, lengths: "225 mm",  available: "stock" },
      { dn: 500,  od: 540.5, lengths: "255 mm",  available: "stock" },
      { dn: 630,  od: 683.8, lengths: "320 mm",  available: "stock" },
      { dn: 800,  od: 856,   lengths: "237 mm",  available: "order" },
      { dn: 1000, od: 1066,  lengths: "330 mm",  available: "order" },
    ],
    tags: ["coupling", "socket", "corrugated", "fitting"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø110–630 mm in stock",
        orderNote: "Ø800 & Ø1000 (injection and rotomould) on order",
        diameterMin: 110,
        diameterMax: 1000,
        standards: ["EN 13476"],
        specificSpecs: {
          "Production Methods": "Injection · Rotomould",
          "Catalogue Reference": "Konti Kan Fittings — HDPE Socket OD",
        },
      },
    ],
  },

  // ─── Decorative Plastic Planters (Roto) ─────────────────────────────────────

  {
    id: "decorative-plastic-planters",
    slug: "decorative-plastic-planters",
    name: "Decorative Plastic Planters",
    shortName: "Planters",
    category: "agri",
    material: "Injection-Moulded PE",
    application: "Landscaping & Outdoor Décor",
    description:
      "A full catalogue of designer plastic planters and outdoor vases by Roto (North Macedonia). Styles include Edelweis, Stoniness, Teak, Modern, Samba, Balcone, Tulip, Margerita, Vase, Jazz, Rumba, Barrel and Nusa series — supplied in S / M / L / XL / XXL sizes with matching wall-mounted units and watering cans.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&h=800&fit=crop&q=80",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised injection-moulded PE",
      "Style Families": "Edelweis · Stoniness · Teak · Modern · Samba · Balcone · Tulip · Vase · Barrel · Nusa",
      "Size Range": "S · M · L · XL · XXL",
      "Wall Mount": "Available in select styles",
      "Watering Cans": "Available",
    },
    tags: ["planter", "decorative", "garden", "landscaping"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "partial",
        stockNote: "Most lines stocked by size",
        orderNote: "Bulk orders & full ranges shipped on request",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Catalogue": "Roto General Offer 2022",
          "Range": "12+ style families across S–XXL sizing",
        },
      },
    ],
  },

  // ─── Manual Sprayer Pumps (Polins) ──────────────────────────────────────────

  {
    id: "manual-sprayer-pump",
    slug: "manual-sprayer-pump",
    name: "Manual Garden Sprayer",
    shortName: "Manual Sprayer",
    category: "agri",
    material: "HDPE",
    application: "Spraying & Plant Treatment",
    description:
      "Polins doo, established in 1996 in Odžaci, Serbia, produces this manual pump-action garden sprayer for hobby and small-scale professional use in applying water-soluble plant-care agents — herbicides, insecticides, fungicides, and liquid fertilisers. Each unit includes a piston pump with a safety pressure-relief valve, a carrying strap, a spray hose with trigger handle, and an extension lance. Available in 5 L, 8 L, and 10 L tank capacities to match plot size.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop&q=80",
    standards: [],
    keyProperties: {
      "Manufacturer": "Polins doo, Odžaci, Serbia (est. 1996)",
      "Tank Capacities": "5 L · 8 L · 10 L",
      "Tank Material": "HDPE",
      "Pump Type": "Manual piston pump",
      "Pressure Relief": "Integrated safety valve",
      "Package": "Tank + pump · Carry strap · Hose · Trigger handle · Lance",
      "Application": "Herbicides · Insecticides · Fungicides · Liquid fertilisers",
    },
    tags: ["sprayer", "pump", "agriculture", "treatment", "manual"],
    suppliers: [
      {
        partnerId: "polins",
        partnerName: "Polins",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "5 L · 8 L · 10 L in stock",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Source": "polins.co.rs/products/sprayers",
          "Variants": "5 L · 8 L · 10 L",
        },
      },
    ],
  },

  // ─── Polins Electra Lux 16 — Battery Back Sprayer ──────────────────────────

  {
    id: "polins-electra-lux-16",
    slug: "polins-electra-lux-16",
    name: "Polins Electra Lux 16 Battery Sprayer",
    shortName: "Electra Lux 16",
    category: "agri",
    material: "HDPE",
    application: "Battery-Powered Crop Spraying",
    description:
      "The Polins Electra Lux 16 is a 16-litre battery-powered back sprayer for semi-professional use across larger agricultural plots and orchards. A rechargeable lithium-ion battery drives an electric pump that delivers consistent spray pressure through the lance — eliminating the physical effort of manual pumping. Pressure is adjustable via a potentiometer for fine fog to coarser jet patterns. Designed exclusively for water-soluble plant-care agents.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop&q=80",
    standards: [],
    keyProperties: {
      "Manufacturer": "Polins doo, Odžaci, Serbia",
      "Tank Capacity": "16 L",
      "Tank Material": "HDPE",
      "Power Source": "Rechargeable lithium-ion battery",
      "Pump Type": "Electric (battery-driven)",
      "Pressure Control": "Potentiometer (variable)",
      "Battery Life": "≈300 cycles to 50% capacity",
      "Carry": "Padded back harness with straps",
    },
    tags: ["sprayer", "battery", "electric", "agriculture", "Polins"],
    suppliers: [
      {
        partnerId: "polins",
        partnerName: "Polins",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "16 L battery model available",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Source": "polins.co.rs/products/sprayers/back-sprayer-electra-lux-16",
          "Battery": "Rechargeable Li-ion",
        },
      },
    ],
  },

  // ─── Palaplast HDPE 100 Irrigation Pipe ────────────────────────────────────

  {
    id: "palaplast-hdpe100-irrigation",
    slug: "palaplast-hdpe100-irrigation",
    name: "Palaplast HDPE 100 Irrigation Pipe",
    shortName: "Palaplast HDPE100",
    category: "agri",
    material: "HDPE PE100",
    application: "Pressurised Irrigation Mainline",
    description:
      "Palaplast's HDPE 100 irrigation pipe is manufactured from high-density polyethylene PE100 compound to EN 12201-2. Designed for primary mainlines and sub-mainlines in pressurised agricultural irrigation systems, the pipe is supplied in straight lengths and coils across a wide diameter range. The material offers excellent chemical resistance and long service life, making it suitable for both above-ground seasonal layouts and buried permanent networks.",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=800&fit=crop&q=80",
    standards: ["EN 12201-2", "ISO 9001"],
    keyProperties: {
      "Material": "HDPE PE100",
      "Standard": "EN 12201-2",
      "Diameter Range": "Ø16–160 mm (OD)",
      "Pressure Classes": "PN4 · PN6 · PN10 · PN16",
      "Supply Form": "Coils ≤Ø63 mm · Straight bars ≥Ø20 mm",
      "Colour": "Black with blue stripe (potable-water compliant)",
      "UV Stabilised": "Yes — exposed installation rated",
      "Compatible Fittings": "Palaplast compression & butt-fusion",
    },
    dimensions: [
      { dn: 16,  od: 16,  wallByClass: { "PN10": 1.6 }, available: "stock" },
      { dn: 20,  od: 20,  wallByClass: { "PN10": 2.0, "PN16": 2.3 }, available: "stock" },
      { dn: 25,  od: 25,  wallByClass: { "PN10": 2.0, "PN16": 2.3 }, available: "stock" },
      { dn: 32,  od: 32,  wallByClass: { "PN10": 2.0, "PN16": 3.0 }, available: "stock" },
      { dn: 40,  od: 40,  wallByClass: { "PN10": 2.4, "PN16": 3.7 }, available: "stock" },
      { dn: 50,  od: 50,  wallByClass: { "PN10": 3.0, "PN16": 4.6 }, available: "stock" },
      { dn: 63,  od: 63,  wallByClass: { "PN10": 3.8, "PN16": 5.8 }, available: "stock" },
      { dn: 75,  od: 75,  wallByClass: { "PN10": 4.5, "PN16": 6.8 }, available: "partial" },
      { dn: 90,  od: 90,  wallByClass: { "PN10": 5.4, "PN16": 8.2 }, available: "partial" },
      { dn: 110, od: 110, wallByClass: { "PN10": 6.6, "PN16": 10.0 }, available: "partial" },
      { dn: 125, od: 125, wallByClass: { "PN10": 7.4 }, available: "order" },
      { dn: 160, od: 160, wallByClass: { "PN10": 9.5 }, available: "order" },
    ],
    tags: ["irrigation", "PE100", "Palaplast", "agriculture", "EN 12201-2"],
    suppliers: [
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        country: "Greece",
        color: "#84cc16",
        availability: "partial",
        stockNote: "Ø16–63 mm coil & bars in stock",
        orderNote: "Ø75+ on order",
        diameterMin: 16,
        diameterMax: 160,
        pressureClasses: ["PN4", "PN6", "PN10", "PN16"],
        standards: ["EN 12201-2", "ISO 9001"],
        specificSpecs: {
          "Source": "palaplast.com/product-category/irrigation-en/irrigation-pipes-en",
          "Manufacturing": "Greek production · 4 500+ SKUs",
        },
      },
    ],
  },

  // ─── Palaplast PN10 Compression Fittings ───────────────────────────────────

  {
    id: "palaplast-compression-fittings",
    slug: "palaplast-compression-fittings",
    name: "Palaplast Compression Fittings",
    shortName: "PE Compression Fittings",
    category: "agri",
    material: "Polypropylene",
    application: "Tool-Free PE Pipe Jointing",
    description:
      "Palaplast's PN10 ATM compression fittings are manufactured from high-quality polypropylene for reliable tool-free connections to PE and LDPE irrigation pipes. The full range includes couplings, elbows, tees, end-caps, reducers, and saddles covering Ø16–63 mm. The fitting design ensures a watertight seal under pressure without specialist equipment, making them ideal for agricultural installers and irrigation contractors. A PN16 ATM series is also available for higher-pressure applications.",
    image:
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&h=800&fit=crop&q=80",
    standards: ["ISO 9001"],
    keyProperties: {
      "Material": "Polypropylene (PP)",
      "Diameter Range": "Ø16–63 mm",
      "Working Pressure": "PN10 ATM (PN16 series available)",
      "Connection": "Compression — tool-free",
      "Pipe Compatibility": "PE100 · HDPE80 · LDPE",
      "Range": "Couplings · Elbows · Tees · End-caps · Reducers · Saddles",
      "Certification": "ISO 9001",
    },
    tags: ["fittings", "compression", "PE", "Palaplast", "irrigation"],
    suppliers: [
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        country: "Greece",
        color: "#84cc16",
        availability: "in-stock",
        stockNote: "Full range Ø16–63 mm in stock",
        diameterMin: 16,
        diameterMax: 63,
        standards: ["ISO 9001"],
        specificSpecs: {
          "Source": "palaplast.com/product-category/irrigation-en/irrigation-fittings/compression-en",
          "Pressure Series": "PN10 standard · PN16 available",
        },
      },
    ],
  },

  // ─── Palaplast Paladrip Dripline ────────────────────────────────────────────

  {
    id: "palaplast-paladrip",
    slug: "palaplast-paladrip",
    name: "Palaplast Paladrip Dripline",
    shortName: "Paladrip",
    category: "agri",
    material: "LDPE",
    application: "In-Line Drip Irrigation",
    description:
      "Paladrip is Palaplast's in-line drip irrigation line, featuring flat turbulent-flow emitters integrated at uniform spacing along an LDPE tape. Designed for row-crop and vegetable irrigation, Paladrip delivers low, consistent drip flows per emitter to minimise water waste and maximise root-zone efficiency. The Paladrip range includes standard, FC (flat-emitter), XL and Slim variants to suit different soil types, crop spacings, and installation depths.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop&q=80",
    standards: ["ISO 9001"],
    keyProperties: {
      "Material": "LDPE",
      "Diameter": "Ø16 / Ø20 mm",
      "Variants": "Paladrip · Paladrip-FC · Paladrip-XL · Paladrip-Slim",
      "Emitter Spacing": "10 / 20 / 30 / 33 / 40 / 50 cm",
      "Flow per Emitter": "1.0 / 1.6 / 2.0 L/h (model-dependent)",
      "Operating Pressure": "0.5–1.5 bar typical",
      "Installation": "Surface or sub-surface",
      "Application": "Row crops · Vegetables · Orchards",
    },
    tags: ["drip", "irrigation", "Palaplast", "agriculture", "LDPE"],
    suppliers: [
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        country: "Greece",
        color: "#84cc16",
        availability: "in-stock",
        stockNote: "Standard Paladrip Ø16 in stock",
        orderNote: "FC / XL / Slim variants on order",
        diameterMin: 16,
        diameterMax: 20,
        standards: ["ISO 9001"],
        specificSpecs: {
          "Source": "palaplast.com/product-category/irrigation-en/irrigation-pipes-en/driplines-en",
          "Compatible With": "Palaplast filters & fertigation units",
        },
      },
    ],
  },

  // ─── Palaplast Plastic Irrigation Filter ───────────────────────────────────

  {
    id: "palaplast-irrigation-filter",
    slug: "palaplast-irrigation-filter",
    name: "Palaplast Irrigation Filter",
    shortName: "PP Filter",
    category: "agri",
    material: "Polypropylene",
    application: "Drip & Micro-Sprinkler Filtration",
    description:
      "Palaplast's plastic irrigation filters protect downstream drip emitters, micro-sprinklers, and valves from sand, sediment, and debris in agricultural water supplies. The range includes Y-type screen filters, self-cleaning disc filters, filter heads with transparent body for visual inspection, and complete filtration systems for larger networks. Available in ¾″, 1″, 1½″, and 2″ inlet sizes.",
    image:
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&h=800&fit=crop&q=80",
    standards: ["ISO 9001"],
    keyProperties: {
      "Material": "Polypropylene (PP)",
      "Filter Types": "Screen (Y-type) · Disc · Self-cleaning",
      "Inlet Sizes": "¾″ · 1″ · 1½″ · 2″ BSP",
      "Mesh Options": "80 / 120 / 155 mesh (screen type)",
      "Max Working Pressure": "8 bar",
      "Body": "Transparent option available",
    },
    tags: ["filter", "irrigation", "Palaplast", "drip", "agriculture"],
    suppliers: [
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        country: "Greece",
        color: "#84cc16",
        availability: "in-stock",
        stockNote: "¾″ to 2″ Y-type filters in stock",
        orderNote: "Self-cleaning & full systems on order",
        diameterMin: 0,
        diameterMax: 0,
        standards: ["ISO 9001"],
        specificSpecs: {
          "Source": "palaplast.com/product-category/irrigation-en/irrigation-fittings/filters-en",
          "Inlet Threads": "BSP",
        },
      },
    ],
  },

  // ─── Konti Hidroplast — PE-100 Water Supply Pipe ──────────────────────────

  {
    id: "konti-pe100-water-pipe",
    slug: "konti-pe100-water-pipe",
    name: "Konti PE-100 Water Supply Pipe",
    shortName: "PE-100 Water Pipe",
    category: "civil",
    material: "HDPE PE-100",
    application: "Water Supply & Pressure Distribution",
    description:
      "Konti Hidroplast's PE-100 water supply pipes are manufactured from third-generation high-density polyethylene (HDPE PE-100) to EN 12201-2 and ISO 4427. Rated for pressures from PN 6 to PN 25 (PN 32 on order), they are suitable for municipal water supply, pressurised distribution networks, gas transport, and irrigation mainlines. Pipes Ø 16–110 mm are supplied in coils; Ø 125–800 mm in straight 6 m or 12 m bars. The black outer colour with coextruded blue lines or full blue ensures UV stability and easy identification.",
    image: "/products/civil/konti-pe100-water-pipe.jpg",
    standards: ["EN 12201-2", "ISO 4427", "DIN 8074"],
    keyProperties: {
      "Material": "HDPE PE-100",
      "MRS": "10 MPa",
      "Safety Factor": "C = 1.25",
      "Diameter Range (stock)": "Ø 20–200 mm",
      "Diameter Range (order)": "Ø 20–630 mm",
      "Pressure Classes (stock)": "PN 6 · PN 10 · PN 16",
      "Pressure Classes (order)": "PN 25 · PN 32",
      "Colour": "Black + coextruded blue lines",
      "Coil Lengths": "Ø 16–110 mm",
      "Bar Lengths": "6 m / 12 m (Ø 125+)",
      "Certifications": "EN 12201-2 · ISO 4427 · DIN 8074",
      "Service Life": "50+ years",
    },
    dimensions: [
      { dn: 20,  od: 20,  wallByClass: { "SDR26/PN6": 1.9, "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
      { dn: 25,  od: 25,  wallByClass: { "SDR26/PN6": 1.9, "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
      { dn: 32,  od: 32,  wallByClass: { "SDR26/PN6": 2.0, "SDR17/PN10": 2.0, "SDR11/PN16": 3.0 }, available: "stock" },
      { dn: 40,  od: 40,  wallByClass: { "SDR26/PN6": 2.3, "SDR17/PN10": 2.4, "SDR11/PN16": 3.7 }, available: "stock" },
      { dn: 50,  od: 50,  wallByClass: { "SDR26/PN6": 2.0, "SDR17/PN10": 3.0, "SDR11/PN16": 4.6 }, available: "stock" },
      { dn: 63,  od: 63,  wallByClass: { "SDR26/PN6": 2.5, "SDR17/PN10": 3.8, "SDR11/PN16": 5.8 }, available: "stock" },
      { dn: 75,  od: 75,  wallByClass: { "SDR26/PN6": 2.9, "SDR17/PN10": 4.5, "SDR11/PN16": 6.8 }, available: "stock" },
      { dn: 90,  od: 90,  wallByClass: { "SDR26/PN6": 3.5, "SDR17/PN10": 5.4, "SDR11/PN16": 8.2 }, available: "stock" },
      { dn: 110, od: 110, wallByClass: { "SDR26/PN6": 4.3, "SDR17/PN10": 6.6, "SDR11/PN16": 10.0 }, available: "stock" },
      { dn: 125, od: 125, wallByClass: { "SDR26/PN6": 4.9, "SDR17/PN10": 7.4, "SDR11/PN16": 11.4 }, available: "partial" },
      { dn: 140, od: 140, wallByClass: { "SDR26/PN6": 5.5, "SDR17/PN10": 8.3, "SDR11/PN16": 12.7 }, available: "partial" },
      { dn: 160, od: 160, wallByClass: { "SDR26/PN6": 6.2, "SDR17/PN10": 9.5, "SDR11/PN16": 14.6 }, available: "partial" },
      { dn: 200, od: 200, wallByClass: { "SDR26/PN6": 7.7, "SDR17/PN10": 11.9, "SDR11/PN16": 18.2 }, available: "partial" },
      { dn: 250, od: 250, wallByClass: { "SDR26/PN6": 9.6, "SDR17/PN10": 14.8 }, available: "order" },
      { dn: 315, od: 315, wallByClass: { "SDR26/PN6": 12.1, "SDR17/PN10": 18.7 }, available: "order" },
      { dn: 400, od: 400, wallByClass: { "SDR26/PN6": 15.4, "SDR17/PN10": 23.7 }, available: "order" },
      { dn: 500, od: 500, wallByClass: { "SDR26/PN6": 19.1, "SDR17/PN10": 29.7 }, available: "order" },
      { dn: 630, od: 630, wallByClass: { "SDR26/PN6": 24.1, "SDR17/PN10": 37.4 }, available: "order" },
    ],
    tags: ["water", "PE100", "HDPE", "konti", "pressure", "EN12201"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø 20–200 mm in stock (PN 6, PN 10, PN 16)",
        orderNote: "Ø 200–630 mm and PN 25 / PN 32 on order",
        diameterMin: 20,
        diameterMax: 630,
        pressureClasses: ["PN6", "PN10", "PN16", "PN25", "PN32"],
        standards: ["EN 12201-2", "ISO 4427", "DIN 8074"],
        specificSpecs: {
          "Coils": "Ø 16–110 mm",
          "Straight bars": "6 m / 12 m (Ø 125+)",
          "Temperature": "−40 °C to +60 °C",
          "Jointing": "Butt fusion · Electrofusion · Mechanical fittings",
        },
      },
    ],
  },

  // ─── Konti Hidroplast — PE-100 RC Water Supply Pipe ───────────────────────

  {
    id: "konti-pe100rc-water-pipe",
    slug: "konti-pe100rc-water-pipe",
    name: "Konti PE-100 RC Water Supply Pipe",
    shortName: "PE-100 RC Pipe",
    category: "civil",
    material: "HDPE PE-100 RC",
    application: "Trenchless Installation & Water Supply",
    description:
      "PE-100 RC (Resistance to Crack) is a specialist variant of PE-100 engineered for exceptional resistance to slow crack growth and environmental stress cracking. Available as single-layer full-wall, double-layer coextruded, and triple-layer coextruded types (Types 1, 2, 3 to PAS 1075), these pipes are the preferred choice for trenchless installation methods such as directional drilling, pipe bursting, and sliplining. In stock Ø 25–110 mm at PN 10 and PN 16; full size range Ø 25–630 mm available on order.",
    image: "/products/civil/konti-pe100rc-pipe.jpg",
    standards: ["EN 12201-2", "PAS 1075"],
    keyProperties: {
      "Material": "HDPE PE-100 RC",
      "Types": "Type 1 (single-wall) · Type 2 (coextruded RC inner) · Type 3 (PP outer protective layer)",
      "Diameter Range (stock)": "Ø 25–110 mm",
      "Diameter Range (order)": "Ø 25–630 mm",
      "Pressure (stock)": "PN 10 · PN 16",
      "Pressure (order)": "PN 6 · PN 20 · PN 25 · PN 32",
      "Colour": "Black + yellow / orange lines, or full orange",
      "Service Life": "100+ years",
      "Application": "Trenchless installation · Directional drilling · Pipe bursting",
    },
    dimensions: [
      { dn: 25,  od: 25,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
      { dn: 32,  od: 32,  wallByClass: { "SDR17/PN10": 2.0, "SDR11/PN16": 3.0 }, available: "stock" },
      { dn: 40,  od: 40,  wallByClass: { "SDR17/PN10": 2.4, "SDR11/PN16": 3.7 }, available: "stock" },
      { dn: 50,  od: 50,  wallByClass: { "SDR17/PN10": 3.0, "SDR11/PN16": 4.6 }, available: "stock" },
      { dn: 63,  od: 63,  wallByClass: { "SDR17/PN10": 3.8, "SDR11/PN16": 5.8 }, available: "stock" },
      { dn: 75,  od: 75,  wallByClass: { "SDR17/PN10": 4.5, "SDR11/PN16": 6.8 }, available: "stock" },
      { dn: 90,  od: 90,  wallByClass: { "SDR17/PN10": 5.4, "SDR11/PN16": 8.2 }, available: "stock" },
      { dn: 110, od: 110, wallByClass: { "SDR17/PN10": 6.6, "SDR11/PN16": 10.0 }, available: "stock" },
      { dn: 125, od: 125, wallByClass: { "SDR17/PN10": 7.4 }, available: "order" },
      { dn: 160, od: 160, wallByClass: { "SDR17/PN10": 9.5 }, available: "order" },
      { dn: 200, od: 200, wallByClass: { "SDR17/PN10": 11.9 }, available: "order" },
      { dn: 250, od: 250, wallByClass: { "SDR17/PN10": 14.8 }, available: "order" },
      { dn: 315, od: 315, wallByClass: { "SDR17/PN10": 18.7 }, available: "order" },
      { dn: 400, od: 400, wallByClass: { "SDR17/PN10": 23.7 }, available: "order" },
      { dn: 500, od: 500, wallByClass: { "SDR17/PN10": 29.7 }, available: "order" },
      { dn: 630, od: 630, wallByClass: { "SDR17/PN10": 37.4 }, available: "order" },
    ],
    tags: ["water", "PE100-RC", "HDPE", "konti", "trenchless", "PAS1075"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø 25–110 mm in stock at PN 10 and PN 16",
        orderNote: "Full range including PN 20, PN 25, PN 32 on order",
        diameterMin: 25,
        diameterMax: 630,
        pressureClasses: ["PN10", "PN16", "PN20", "PN25", "PN32"],
        standards: ["EN 12201-2", "PAS 1075"],
        specificSpecs: {
          "Crack Resistance": "Superior slow crack growth vs standard PE-100",
          "Safety factor": "C = 1.25",
          "Design stress": "σ = 8.0 MPa",
        },
      },
    ],
  },

  // ─── Konti Kan — HDPE Corrugated Sewage Pipe SN4 ─────────────────────────

  {
    id: "konti-kan-corrugated-sn4",
    slug: "konti-kan-corrugated-sn4",
    name: "Konti Kan HDPE Corrugated Sewage Pipe — SN4",
    shortName: "Konti Kan SN4",
    category: "civil",
    material: "HDPE",
    application: "Gravity Sewage & Stormwater Drainage",
    description:
      "Konti Kan HDPE corrugated sewage pipes (SN4 stiffness class) are manufactured to EN 13476-3 and ISO 9969. The double-wall construction combines a smooth inner bore (minimum Manning's coefficient 0.009) with a corrugated outer wall that delivers structural ring stiffness ≥ 4 kN/m². Available in lengths of 6 m with integrated socket joints. Suitable for gravity sewage, stormwater drainage, agricultural drainage, and industrial wastewater systems. Ø 110–1000 mm in stock; SN8 class available on order.",
    image: "/products/civil/konti-kan-corrugated-sewage.jpg",
    standards: ["EN 13476-3", "ISO 9969"],
    keyProperties: {
      "Wall Type": "Double-wall: smooth inner / corrugated outer",
      "Ring Stiffness": "SN4 (≥ 4 kN/m²)",
      "Pipe Length": "6 m with integrated socket",
      "Diameter Range (stock)": "Ø 110–1000 mm (OD)",
      "Material": "HDPE — corrosion-proof, chemical-resistant",
      "Temperature": "−40 °C to +60 °C",
      "Service Life": "50+ years",
      "SN8": "Available on order",
    },
    dimensions: [
      { dn: 110,  od: 110,  weightPerMeter: 0.65, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 125,  od: 125,  weightPerMeter: 0.82, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 140,  od: 140,  sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 160,  od: 160,  weightPerMeter: 1.20, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 200,  od: 200,  weightPerMeter: 1.65, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 250,  od: 250,  weightPerMeter: 2.50, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 315,  od: 315,  weightPerMeter: 3.70, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 400,  od: 400,  weightPerMeter: 6.30, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 500,  od: 500,  weightPerMeter: 8.60, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 630,  od: 630,  weightPerMeter: 15.15, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 800,  od: 800,  weightPerMeter: 20.50, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
      { dn: 1000, od: 1000, weightPerMeter: 31.00, sn: { sn4: true, sn8: false }, lengths: "6 m", available: "stock" },
    ],
    tags: ["sewage", "corrugated", "SN4", "HDPE", "konti", "drainage"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "in-stock",
        stockNote: "SN4 in stock Ø 110–1000 mm",
        orderNote: "SN8 class available on order",
        diameterMin: 110,
        diameterMax: 1000,
        standards: ["EN 13476-3", "ISO 9969"],
        specificSpecs: {
          "Ring stiffness": "≥ 4 kN/m² (SN4)",
          "Length": "6 m with integrated socket",
          "Manning n": "≥ 0.009 (smooth inner bore)",
        },
      },
    ],
  },

  // ─── Konti Kan — Duct Cable Protection (Small Diameter) ──────────────────

  {
    id: "konti-kan-cable-duct",
    slug: "konti-kan-cable-duct",
    name: "Konti Kan Duct — Cable Protection Pipe",
    shortName: "Cable Duct",
    category: "industrial",
    material: "HDPE",
    application: "Cable Canalization & Protection",
    description:
      "Konti Kan Duct cable protection pipes have a smooth exterior and longitudinally ribbed interior surface, produced in coils up to 500 m. The ribbed interior reduces friction during cable installation. Available as single-tube (Ø 32, 40, 50 mm), twin-tube (bitub: Ø 32, 40, 50 mm), and quad configurations. In stock: Ø 40×1 at 2.0 mm wall (SDR 17 / 8 ATM) and 2.4 mm wall (SDR 13.6 / 10 ATM). Other configurations on order.",
    image: "/products/industrial/konti-cable-duct.jpg",
    standards: ["EN 61386", "EN 12201-2"],
    keyProperties: {
      "Exterior": "Smooth",
      "Interior": "Longitudinal ribbed (reduces pull-through friction)",
      "Configurations": "Single · Twin (bitub) · Quad",
      "Sizes": "Ø 32, 40, 50 mm (single & twin); Ø 32+40 mm quad",
      "In-Stock Size": "Ø 40×1 — SDR 17 (2.0 mm, 8 ATM) and SDR 13.6 (2.4 mm, 10 ATM)",
      "Coil Lengths": "Up to 500 m",
      "Colour": "Black / Orange / Grey",
      "Temperature": "−40 °C to +60 °C",
    },
    dimensions: [
      { dn: 32, od: 32, wallByClass: { "SDR17/8ATM": 2.0, "SDR13.6/10ATM": 2.4 }, lengths: "coils up to 500 m", available: "order" },
      { dn: 40, od: 40, wallByClass: { "SDR17/8ATM": 2.0, "SDR13.6/10ATM": 2.4 }, lengths: "coils up to 500 m", available: "stock" },
      { dn: 50, od: 50, wallByClass: { "SDR17/8ATM": 3.0 }, lengths: "coils up to 500 m", available: "order" },
    ],
    tags: ["cable", "conduit", "duct", "HDPE", "konti", "EN61386"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø 40×1 monotube at 2.0 mm (8 ATM) and 2.4 mm (10 ATM) in stock",
        orderNote: "Bitub (twin) and other sizes on order",
        diameterMin: 32,
        diameterMax: 75,
        standards: ["EN 61386", "EN 12201-2"],
        specificSpecs: {
          "In-stock": "Ø40×1 SDR 17 (2.0 mm) · Ø40×1 SDR 13.6 (2.4 mm)",
          "Bitub": "On order only",
          "Max coil length": "500 m",
        },
      },
    ],
  },

  // ─── Konti Kan — Optic Cable Protection (Double-Wall Corrugated) ──────────

  {
    id: "konti-kan-optic-cable-protection",
    slug: "konti-kan-optic-cable-protection",
    name: "Konti Kan Optic Cable Protection Pipe",
    shortName: "Optic Cable Duct",
    category: "industrial",
    material: "HDPE",
    application: "Fibre Optic & Telecom Cable Protection",
    description:
      "Konti Kan Optic Cable Protection pipes are double-wall HDPE pipes with a corrugated outer surface and smooth inner surface. Used as holders or protection conduits for fibre optic, telecommunications, and power cables — especially at road and bridge crossings. Produced in black, red, and yellow (custom colours on request) in straight lengths of 6 m or 12 m, and coils of 50 m. Nominal diameter: 75–200 mm OD. In stock: Ø 40 and Ø 50 mm sizes; all others on order.",
    image: "/products/industrial/konti-optic-cable-protection.jpg",
    standards: ["EN 50086", "EN 61386", "EN 13476-3"],
    keyProperties: {
      "Wall Type": "Double-wall: smooth inner / corrugated outer",
      "Diameter Range": "Ø 75–200 mm (OD)",
      "Length Options": "6 m / 12 m straight · 50 m coils",
      "Colour": "Black / Red / Yellow / Custom",
      "In Stock": "Ø 40 and Ø 50 mm",
      "Application": "Optic fibre · Telecom · Power cable at road crossings",
      "UV Stabilised": "Yes",
    },
    dimensions: [
      { dn: 40,  od: 40,  lengths: "50 m coil", available: "stock" },
      { dn: 50,  od: 50,  lengths: "50 m coil", available: "stock" },
      { dn: 75,  od: 75,  lengths: "6 m / 12 m", available: "order" },
      { dn: 110, od: 110, lengths: "6 m / 12 m", available: "order" },
      { dn: 160, od: 160, lengths: "6 m / 12 m", available: "order" },
      { dn: 200, od: 200, lengths: "6 m / 12 m", available: "order" },
    ],
    tags: ["optic", "cable", "conduit", "HDPE", "konti", "EN50086", "telecom"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø 40 and Ø 50 mm in stock",
        orderNote: "Ø 75–200 mm on order",
        diameterMin: 40,
        diameterMax: 200,
        standards: ["EN 50086", "EN 61386", "EN 13476-3"],
        specificSpecs: {
          "Colour options": "Black · Red · Yellow · Custom",
          "Coil lengths": "50 m",
          "Bar lengths": "6 m and 12 m",
          "Application": "Road and bridge crossings, underground cable routes",
        },
      },
    ],
  },

  // ─── Ferplast KS — HDPE Drainage Pipe ────────────────────────────────────

  {
    id: "ferplast-drainage-pipe",
    slug: "ferplast-drainage-pipe",
    name: "Ferplast HDPE Drainage Pipe",
    shortName: "HDPE Drainage",
    category: "civil",
    material: "HDPE",
    application: "Agricultural & Construction Sub-Surface Drainage",
    description:
      "Ferplast KS drainage pipes are manufactured from HDPE to EN 13476-3 and ISO 9969 for sub-surface drainage of agricultural land and construction sites. The pipe features a perforated section that faces upward during installation to allow water ingress, with the non-perforated section facing down to channel collected water away. Supplied in coils (Ø 90–160 mm) and 6 m bars (Ø 200–500 mm). In stock: Ø 110–200 mm. Ø 250–500 mm on order.",
    image: "/products/civil/ferplast-drainage-pipe.png",
    standards: ["EN 13476-3", "ISO 9969"],
    keyProperties: {
      "Material": "HDPE — perforated double-wall",
      "Application": "Sub-surface drainage · Agricultural land drainage",
      "Diameter Range (stock)": "Ø 110–200 mm",
      "Diameter Range (order)": "Ø 250–500 mm",
      "Supply Form": "Coils (Ø 90–160 mm) · 6 m bars (Ø 200–500 mm)",
      "Perforation": "Upper half perforated for water ingress",
    },
    dimensions: [
      { dn: 110, od: 110, weightPerMeter: 0.55, lengths: "50 m coil", available: "stock" },
      { dn: 125, od: 125, weightPerMeter: 0.65, lengths: "50 m coil", available: "stock" },
      { dn: 160, od: 160, weightPerMeter: 1.00, lengths: "50 m coil", available: "stock" },
      { dn: 200, od: 200, weightPerMeter: 1.65, lengths: "6 m",       available: "stock" },
      { dn: 250, od: 250, weightPerMeter: 2.50, lengths: "6 m",       available: "order" },
      { dn: 315, od: 315, weightPerMeter: 3.70, lengths: "6 m",       available: "order" },
      { dn: 400, od: 400, weightPerMeter: 6.30, lengths: "6 m",       available: "order" },
      { dn: 500, od: 500, weightPerMeter: 8.60, lengths: "6 m",       available: "order" },
    ],
    tags: ["drainage", "HDPE", "ferplast", "perforated", "agriculture"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø 110–200 mm in stock",
        orderNote: "Ø 250–500 mm on order",
        diameterMin: 110,
        diameterMax: 500,
        standards: ["EN 13476-3", "ISO 9969"],
        specificSpecs: {
          "Perforation": "Upper half — allows water ingress during installation",
          "Force Applied": "450 N (all sizes)",
          "Supply form": "50 m coils (≤Ø200 mm) · 6 m bars (Ø200+)",
        },
      },
    ],
  },

  // ─── Ferplast KS — HDPE Electric Cable Conduit ──────────────────────────

  {
    id: "ferplast-electric-conduit",
    slug: "ferplast-electric-conduit",
    name: "Ferplast HDPE Electric Cable Conduit",
    shortName: "Electric Conduit",
    category: "industrial",
    material: "HDPE",
    application: "Underground Electrical Cable Protection",
    description:
      "Ferplast KS electric cable conduits are manufactured from HDPE to EN 50086-2-4. Corrugated construction provides flexibility for routing while maintaining mechanical protection for electrical cables. Supplied in 50 m coils. In stock Ø 40–110 mm; Ø 125–160 mm on order.",
    image: "/products/industrial/ferplast-electric-conduit.png",
    standards: ["EN 50086-2-4"],
    keyProperties: {
      "Material": "HDPE — corrugated flexible",
      "Diameter Range (stock)": "Ø 40–110 mm",
      "Diameter Range (order)": "Ø 125–160 mm",
      "Supply Form": "50 m coils",
      "Standard": "EN 50086-2-4",
    },
    dimensions: [
      { dn: 40,  od: 40,  weightPerMeter: 0.113, lengths: "50 m coil", available: "stock" },
      { dn: 50,  od: 50,  weightPerMeter: 0.139, lengths: "50 m coil", available: "stock" },
      { dn: 63,  od: 63,  weightPerMeter: 0.200, lengths: "50 m coil", available: "stock" },
      { dn: 75,  od: 75,  weightPerMeter: 0.256, lengths: "50 m coil", available: "stock" },
      { dn: 90,  od: 90,  weightPerMeter: 0.350, lengths: "50 m coil", available: "stock" },
      { dn: 110, od: 110, weightPerMeter: 0.520, lengths: "50 m coil", available: "stock" },
      { dn: 125, od: 125, weightPerMeter: 0.650, lengths: "50 m coil", available: "order" },
      { dn: 160, od: 160, weightPerMeter: 1.000, lengths: "50 m coil", available: "order" },
    ],
    tags: ["conduit", "electric", "HDPE", "ferplast", "cable", "EN50086"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø 40–110 mm in stock",
        orderNote: "Ø 125–160 mm on order",
        diameterMin: 40,
        diameterMax: 160,
        standards: ["EN 50086-2-4"],
        specificSpecs: {
          "Type": "Corrugated flexible HDPE",
          "Supply": "50 m coils",
          "Force applied": "450 N (all sizes)",
        },
      },
    ],
  },

  // ─── Ferplast KS — PE-100 / PE-100 RC Water Supply Pipe ─────────────────

  {
    id: "ferplast-pe100-water-pipe",
    slug: "ferplast-pe100-water-pipe",
    name: "Ferplast PE-100 / PE-100 RC Water Supply Pipe",
    shortName: "Ferplast PE-100",
    category: "civil",
    material: "HDPE PE-100 / PE-100 RC",
    application: "Water Supply & Pressure Distribution",
    description:
      "Ferplast KS manufactures PE-100 and PE-100 RC water supply pipes to EN 12201-2 and ISO 4427 at its Kosovo production facility. In stock: Ø 20–90 mm. The full size range up to Ø 630 mm is available on order. Both PE-100 and the crack-resistant PE-100 RC grade are available across standard SDR pressure classes.",
    image: "/products/civil/ferplast-water-supply-pipe.png",
    standards: ["EN 12201-2", "ISO 4427"],
    keyProperties: {
      "Grades": "PE-100 · PE-100 RC",
      "Standard": "EN 12201-2 / ISO 4427",
      "Diameter (stock)": "Ø 20–90 mm",
      "Diameter (order)": "Ø 20–630 mm",
      "Pressure Classes": "PN 6 · PN 10 · PN 16 (PN 20 / PN 25 on order)",
      "Origin": "Kosovo production",
    },
    dimensions: [
      { dn: 20,  od: 20,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
      { dn: 25,  od: 25,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
      { dn: 32,  od: 32,  wallByClass: { "SDR17/PN10": 2.0, "SDR11/PN16": 3.0 }, available: "stock" },
      { dn: 40,  od: 40,  wallByClass: { "SDR17/PN10": 2.4, "SDR11/PN16": 3.7 }, available: "stock" },
      { dn: 50,  od: 50,  wallByClass: { "SDR17/PN10": 3.0, "SDR11/PN16": 4.6 }, available: "stock" },
      { dn: 63,  od: 63,  wallByClass: { "SDR17/PN10": 3.8, "SDR11/PN16": 5.8 }, available: "stock" },
      { dn: 75,  od: 75,  wallByClass: { "SDR17/PN10": 4.5, "SDR11/PN16": 6.8 }, available: "stock" },
      { dn: 90,  od: 90,  wallByClass: { "SDR17/PN10": 5.4, "SDR11/PN16": 8.2 }, available: "stock" },
      { dn: 110, od: 110, wallByClass: { "SDR17/PN10": 6.6, "SDR11/PN16": 10.0 }, available: "order" },
      { dn: 160, od: 160, wallByClass: { "SDR17/PN10": 9.5 }, available: "order" },
      { dn: 200, od: 200, wallByClass: { "SDR17/PN10": 11.9 }, available: "order" },
      { dn: 315, od: 315, wallByClass: { "SDR17/PN10": 18.7 }, available: "order" },
      { dn: 630, od: 630, wallByClass: { "SDR17/PN10": 37.4 }, available: "order" },
    ],
    tags: ["water", "PE100", "HDPE", "ferplast", "pressure", "EN12201"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø 20–90 mm in stock",
        orderNote: "Ø 90–630 mm on order",
        diameterMin: 20,
        diameterMax: 630,
        pressureClasses: ["PN6", "PN10", "PN16"],
        standards: ["EN 12201-2", "ISO 4427"],
        specificSpecs: {
          "Grades": "PE-100 · PE-100 RC",
          "Origin": "Kosovo production",
        },
      },
    ],
  },

  // ─── Ferplast KS — PE Optic Cable Protection Pipe ────────────────────────

  {
    id: "ferplast-optic-cable-pipe",
    slug: "ferplast-optic-cable-pipe",
    name: "Ferplast PE Optic Cable Protection Pipe",
    shortName: "Optic Cable Pipe",
    category: "industrial",
    material: "HDPE",
    application: "Fibre Optic & Telecom Cable Protection",
    description:
      "Ferplast KS optic cable protection pipes are manufactured from PE material to EN 12201, ISO 4427, and DIN 8074. Available as single-tube (një fish) and twin-tube (dy fish). Diameters: Ø 32, 40, 50 mm. In stock: Ø 40×2 (twin, 2.4 mm wall). All other configurations on order. SDR 17 PN 10 — Ø32×1 (2.0 mm), Ø40×1 (2.4 mm), Ø50×1 (3.0 mm). SDR 17 PN 10 twin — Ø32×2 (2.0 mm), Ø40×2 (2.4 mm), Ø50×2 (3.0 mm).",
    image: "/products/industrial/ferplast-optic-cable-pipe.png",
    standards: ["EN 12201", "ISO 4427", "DIN 8074"],
    keyProperties: {
      "Material": "PE (HDPE)",
      "Configurations": "Single (1 tube) · Twin (2 tubes)",
      "Sizes": "Ø 32 · 40 · 50 mm",
      "SDR Classes": "SDR 17 (PN 10) · SDR 13.6 (PN 12.5)",
      "In Stock": "Ø 40×2 (twin), 2.4 mm wall (SDR 17 PN 10)",
      "All Others": "On order",
    },
    dimensions: [
      { dn: 32, od: 32, wallByClass: { "SDR17/PN10": 2.0 }, lengths: "coils", available: "order" },
      { dn: 40, od: 40, wallByClass: { "SDR17/PN10": 2.4 }, lengths: "coils", available: "stock" },
      { dn: 50, od: 50, wallByClass: { "SDR17/PN10": 3.0 }, lengths: "coils", available: "order" },
    ],
    tags: ["optic", "cable", "PE", "ferplast", "telecom", "twin-tube"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø 40×2 twin (2.4 mm wall, SDR 17 PN 10) in stock",
        orderNote: "All single-tube and other twin-tube sizes on order",
        diameterMin: 32,
        diameterMax: 50,
        standards: ["EN 12201", "ISO 4427", "DIN 8074"],
        specificSpecs: {
          "Single tube SDR 17": "Ø32×1 (2.0 mm) · Ø40×1 (2.4 mm) · Ø50×1 (3.0 mm) — on order",
          "Twin tube SDR 17": "Ø32×2 (2.0 mm) · Ø40×2 (2.4 mm) — Ø40×2 in stock",
        },
      },
    ],
  },

  // ─── Ferplast KS — HDPE Water Storage Tank ───────────────────────────────

  {
    id: "ferplast-water-reservoir",
    slug: "ferplast-water-reservoir",
    name: "Ferplast HDPE Water Storage Tank",
    shortName: "HDPE Water Tank",
    category: "civil",
    material: "HDPE",
    application: "Potable Water Storage",
    description:
      "Ferplast KS manufactures rotationally moulded HDPE water storage tanks (rezervarë) from 500 litres to 5000 litres. The HDPE material ensures food-grade safety, UV resistance, and long service life. In stock: 500 L and 1000 L. Capacities from 1500 L to 5000 L are available on order.",
    image: "/products/civil/ferplast-water-reservoir.png",
    standards: [],
    keyProperties: {
      "Material": "HDPE (rotationally moulded)",
      "Capacity Range": "500 L – 5000 L",
      "In Stock": "500 L · 1000 L",
      "On Order": "1500 L · 2000 L · 3000 L · 5000 L",
      "Applications": "Potable water · Agricultural water · Industrial fluid storage",
      "UV Stabilised": "Yes",
    },
    dimensions: [
      { dn: 500,  lengths: "500 L",  available: "stock" },
      { dn: 1000, lengths: "1000 L", available: "stock" },
      { dn: 1500, lengths: "1500 L", available: "order" },
      { dn: 2000, lengths: "2000 L", available: "order" },
      { dn: 3000, lengths: "3000 L", available: "order" },
      { dn: 5000, lengths: "5000 L", available: "order" },
    ],
    tags: ["tank", "water", "HDPE", "ferplast", "storage", "reservoir"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "500 L and 1000 L in stock",
        orderNote: "1500 L – 5000 L on order",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Manufacturing": "Rotational moulding — seamless one-piece HDPE",
          "Food grade": "Yes — suitable for potable water",
        },
      },
    ],
  },

];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getProductGroup(slug: string): ProductGroup | undefined {
  return productGroups.find((g) => g.slug === slug);
}

export function getProductsByCategory(category: ProductGroup["category"]): ProductGroup[] {
  return productGroups.filter((g) => g.category === category);
}

export function getFeaturedProducts(): ProductGroup[] {
  return productGroups.filter((g) => g.featured);
}

export function getAllSupplierCount(): number {
  const ids = new Set(productGroups.flatMap((g) => g.suppliers.map((s) => s.partnerId)));
  return ids.size;
}
