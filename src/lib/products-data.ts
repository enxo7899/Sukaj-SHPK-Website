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
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop&q=80",
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
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=800&fit=crop&q=80",
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
    image:
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop&q=80",
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
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop&q=80",
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
      "Prefabricated HDPE inspection chamber for gravity sewage and stormwater networks. Factory-assembled risers and base units reduce on-site installation time by up to 60% compared to traditional concrete chambers. Compatible with standard corrugated pipe couplers.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop&q=80",
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
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=800&fit=crop&q=80",
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
    id: "fitt-technical-hose",
    slug: "fitt-technical-hose",
    name: "FITT Technical Garden Hose",
    shortName: "FITT Hose",
    category: "agri",
    material: "PVC",
    application: "Garden & Irrigation",
    description:
      "Italian-engineered PVC hoses from FITT — Europe's reference brand for garden and light irrigation hose systems. Three flagship lines cover every requirement from professional reinforced use (Force) to everyday gardening (Mint) to ultra-compact expandable storage (Mimosa). Anti-twist NTS® system on Mint. Sizes 1/2″, 3/4″, and 1″ in stock.",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=800&fit=crop&q=80",
    standards: ["EN ISO 1307", "REACH"],
    keyProperties: {
      "Sizes": "1/2″ (13 mm) · 3/4″ (19 mm) · 1″ (25 mm)",
      "Lines": "FITT Force · FITT Mint · FITT Mimosa",
      "FITT Force": "Reinforced PVC, 30 bar burst — professional use",
      "FITT Mint": "Anti-twist NTS® system, 15–50 m rolls",
      "FITT Mimosa": "Auto-expanding, ultra-light, 10–30 m",
      "Origin": "Made in Italy",
    },
    dimensions: [
      { dn: 13, lengths: "15 m · 25 m · 50 m", available: "stock" },
      { dn: 19, lengths: "15 m · 25 m · 50 m", available: "stock" },
      { dn: 25, lengths: "25 m", available: "stock" },
    ],
    featured: true,
    tags: ["hose", "garden", "irrigation", "FITT", "PVC"],
    suppliers: [
      {
        partnerId: "fitt",
        partnerName: "FITT",
        country: "Italy",
        color: "#06b6d4",
        availability: "in-stock",
        stockNote: "1/2″, 3/4″, 1″ in stock (Force, Mint, Mimosa lines)",
        diameterMin: 12,
        diameterMax: 50,
        standards: ["EN ISO 1307", "REACH"],
        specificSpecs: {
          "Force max pressure": "30 bar burst",
          "Mimosa": "25 m roll, 1/2″",
          "Temperature": "−10 °C to +60 °C",
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
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop&q=80",
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
