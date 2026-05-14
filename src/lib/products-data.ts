// Product catalog — multi-supplier model
// Each ProductGroup represents a product TYPE; multiple partners can supply it.
// Availability data sourced from client meeting notes (May 2026).
// Reconstructed May 2026: 30+ duplicate company-specific SKUs merged into
// canonical product entries with multiple suppliers; 17 out-of-scope products removed.

export interface SupplierOffer {
  partnerId: string;
  partnerName: string;
  image?: string;
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
  /** Size designation (e.g., "1/2\"", "5/8\"") */
  size?: string;
  /** Wall thickness by SDR / PN class (key = "SDR17/PN10", value = mm) */
  wallByClass?: Record<string, number>;
  /** Stiffness class availability */
  sn?: { sn4?: boolean; sn8?: boolean };
  /** Approximate weight per metre (kg/m) */
  weightPerMeter?: number;
  /** Length options available */
  lengths?: string;
  /** Bursting pressure in bar (for hoses) */
  burstingPressure?: number;
  available: "stock" | "partial" | "order";
}

export interface TechnicalTableRow {
  od?: number | string;
  id?: number | string;
  wallThickness?: number;
  weight?: number | string;
  length?: string;
  force?: string;
  tolerance?: string;
  available: "stock" | "order";
}

export interface TechnicalTable {
  title: string;
  columns: string[];
  rows: TechnicalTableRow[];
  intermediateImage?: string;
}

export interface ProductFitting {
  id: string;
  name: string;
  image: string;
  diameters: string;
  description?: string;
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
  additionalImage?: string;
  standards: string[];
  keyProperties: Record<string, string>;
  dimensions?: DimensionRow[];
  technicalTables?: TechnicalTable[];
  fittings?: ProductFitting[];
  suppliers: SupplierOffer[];
  tags?: string[];
  featured?: boolean;
  /** Optional list of partner IDs (from src/lib/data.ts) that also supply
   *  an equivalent product. Rendered as an "Also available from" callout
   *  on the product detail page. */
  alsoAvailableFrom?: string[];
  /** Optional source URL for verified product specs */
  sourceUrl?: string;
}

// ─── PE100 Pressure Pipe Dimensions ─────────────────────────────────────────

const pe100Dimensions: DimensionRow[] = [
  { dn: 20,  od: 20,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
  { dn: 25,  od: 25,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 2.3 }, available: "stock" },
  { dn: 32,  od: 32,  wallByClass: { "SDR17/PN10": 1.9, "SDR11/PN16": 3.0 }, available: "stock" },
  { dn: 40,  od: 40,  wallByClass: { "SDR17/PN10": 2.4, "SDR11/PN16": 3.7 }, available: "stock" },
  { dn: 50,  od: 50,  wallByClass: { "SDR26/PN6": 2.0, "SDR17/PN10": 3.0, "SDR11/PN16": 4.6 }, available: "stock" },
  { dn: 63,  od: 63,  wallByClass: { "SDR26/PN6": 2.5, "SDR17/PN10": 3.8, "SDR11/PN16": 5.8 }, available: "stock" },
  { dn: 75,  od: 75,  wallByClass: { "SDR26/PN6": 2.9, "SDR17/PN10": 4.5, "SDR11/PN16": 6.8 }, available: "stock" },
  { dn: 90,  od: 90,  wallByClass: { "SDR26/PN6": 3.5, "SDR17/PN10": 5.4, "SDR11/PN16": 8.2 }, available: "stock" },
  { dn: 110, od: 110, wallByClass: { "SDR26/PN6": 4.3, "SDR17/PN10": 6.6, "SDR11/PN16": 10.0 }, available: "stock" },
  { dn: 125, od: 125, wallByClass: { "SDR26/PN6": 4.9, "SDR17/PN10": 7.4, "SDR11/PN16": 11.4 }, available: "stock" },
  { dn: 140, od: 140, wallByClass: { "SDR26/PN6": 5.5, "SDR17/PN10": 8.3, "SDR11/PN16": 12.7 }, available: "stock" },
  { dn: 160, od: 160, wallByClass: { "SDR26/PN6": 6.2, "SDR17/PN10": 9.5, "SDR11/PN16": 14.6 }, available: "stock" },
  { dn: 200, od: 200, wallByClass: { "SDR26/PN6": 7.7, "SDR17/PN10": 11.9, "SDR11/PN16": 18.2 }, available: "stock" },
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

  // Consolidated from: pe100-pressure-pipe + konti-pe100-water-pipe + ferplast-pe100-water-pipe
  {
    id: "pe100-pressure-pipe",
    slug: "pe100-pressure-pipe",
    name: "Tub Ujësjellësi PE100",
    shortName: "PE100",
    category: "civil",
    material: "HDPE / PE100",
    application: "Water Supply & Pressure Systems",
    description:
      "Tub PE100 me densitet të lartë për rrjete ujësjellësi, ujitje dhe linja industriale me presion. I projektuar për jetëgjatësi mbi 50 vite dhe i përshtatshëm për saldim me butt fusion dhe elektrofuizion. Disponohet në seri SDR për klasat PN6, PN10 dhe PN16, me diametra në stok dhe me porosi sipas kërkesës.",
    image: "/products/civil/pe100-water-pipe-cover.jpg",
    standards: ["EN 12201", "EN 12201-2", "ISO 4427", "DIN 8074", "ISO 9001"],
    keyProperties: {
      "Materiali": "PE100 (HDPE)",
      "Lloji i murit": "Mur i plotë (solid wall)",
      "Ngjyra": "E zezë me vijë blu / vija blu të koekstruduara",
      "Gjatësitë standarde": "Shufra 6 m ose 12 m / role deri në Ø110 mm",
      "Lidhja": "Butt fusion · Elektrofuzion · Fitingje mekanike",
      "Temperatura e punës": "0 °C deri +40 °C",
      "Klasat e presionit": "PN6 · PN10 · PN16",
      "Jetëgjatësia": "50+ vite",
    },
    dimensions: pe100Dimensions,
    featured: true,
    tags: ["water", "pressure", "HDPE", "PE100"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        image: "/products/civil/pe100-water-pipe-cover.jpg",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø20–200 mm në stok (PN6, PN10, PN16)",
        orderNote: "Ø225–630 mm vetëm me porosi",
        diameterMin: 20,
        diameterMax: 630,
        pressureClasses: ["PN6", "PN10", "PN16"],
        standards: ["EN 12201-2", "ISO 4427"],
        specificSpecs: {
          "Gradat": "PE-100",
          "Origjina": "Prodhim në Kosovë",
        },
      },
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        image: "/products/civil/pe100-water-pipe-cover.jpg",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø20–200 mm në stok (PN6, PN10, PN16)",
        orderNote: "Ø225–630 mm vetëm me porosi",
        diameterMin: 20,
        diameterMax: 630,
        pressureClasses: ["PN6", "PN10", "PN16"],
        standards: ["EN 12201-2", "ISO 4427", "DIN 8074"],
        specificSpecs: {
          "Role": "Ø16–110 mm",
          "Shufra": "6 m / 12 m (Ø125+)",
        },
      },
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        image: "/products/civil/palaplast-pe100-water-pipe.jpg",
        country: "Greece",
        color: "#0ea5a4",
        availability: "partial",
        stockNote: "Ø20–200 mm në stok (PN6, PN10, PN16)",
        orderNote: "Ø225–630 mm vetëm me porosi",
        diameterMin: 20,
        diameterMax: 630,
        pressureClasses: ["PN6", "PN10", "PN16"],
        standards: ["EN 12201-2", "ISO 4427"],
        specificSpecs: { "Materiali": "PE100", "Ngjyra": "E zezë me vijë blu" },
      },
    ],
  },

  // Renamed from konti-pe100rc-water-pipe → generic canonical id
  {
    id: "pe100rc-water-pipe",
    slug: "pe100rc-water-pipe",
    name: "Tub Ujësjellësi PE-100 RC",
    shortName: "PE100-RC",
    category: "civil",
    material: "HDPE PE-100 RC",
    application: "Trenchless Installation & Water Supply",
    description:
      "PE100-RC (Resistance to Crack) is a specialist variant of PE100 engineered for exceptional resistance to slow crack growth and environmental stress cracking. Available as single-layer full-wall, double-layer coextruded, and triple-layer coextruded types (Types 1, 2, 3 to PAS 1075), these pipes are the preferred choice for trenchless installation methods such as directional drilling, pipe bursting, and sliplining. In stock Ø25–110 mm at PN10 and PN16; full size range Ø25–630 mm on order. Service life rated 100+ years.",
    image: "/products/civil/pe100rc-water-pipe-cover.jpg",
    additionalImage: "/products/civil/pe100rc-installation.jpg",
    standards: ["EN 12201-2", "PAS 1075"],
    keyProperties: {
      "Materiali": "HDPE PE-100 RC",
      "Tipet": "Tipi 1 (mur i plotë) · Tipi 2 (RC i brendshëm koekstruduar) · Tipi 3 (shtresë mbrojtëse PP e jashtme)",
      "Gama e diametrit (stok)": "Ø25–110 mm",
      "Gama e diametrit (porosi)": "Ø25–630 mm",
      "Presioni (stok)": "PN10 · PN16",
      "Presioni (porosi)": "PN6 · PN20 · PN25 · PN32",
      "Ngjyra": "E zezë + vija të verdha/portokalli, ose portokalli e plotë",
      "Jetëgjatësia": "100+ vite",
      "Aplikimi": "Instalim pa hendek · Shpim drejtues · Plasaritje e tubave",
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
    tags: ["water", "PE100-RC", "HDPE", "trenchless", "PAS1075"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        image: "/products/civil/pe100rc-water-pipe-cover.jpg",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø25–110 mm në stok në PN10 dhe PN16",
        orderNote: "Gama e plotë përfshirë PN20, PN25, PN32 me porosi",
        diameterMin: 25,
        diameterMax: 630,
        pressureClasses: ["PN10", "PN16", "PN20", "PN25", "PN32"],
        standards: ["EN 12201-2", "PAS 1075"],
        specificSpecs: {
          "Rezistenca ndaj çarjes": "Rritje superiore e ngadaltë e çarjeve krahasuar me PE-100 standard",
          "Faktori i sigurisë": "C = 1.25",
          "Stresi i projektimit": "σ = 8.0 MPa",
        },
      },
    ],
  },

  // Consolidated from: corrugated-hdpe-sewage + konti-kan-corrugated-sn4 + ferplast-corrugated-sn4 + ferplast-corrugated-sn8
  {
    id: "corrugated-hdpe-sewage",
    slug: "corrugated-hdpe-sewage",
    name: "Tub Kanalizimi i Brinjëzuar (Korregate) HDPE",
    shortName: "Corrugated HDPE",
    category: "civil",
    material: "HDPE",
    application: "Gravity Sewage & Stormwater",
    description:
      "Double-wall corrugated HDPE pipe with smooth inner bore and structured outer wall, designed for gravity sewage, stormwater drainage and subsurface cable protection. SN4 class features a distinctive blue interior lining; SN8 features yellow lining for easy site identification. Available in diameters up to Ø2000 mm across three Balkan-region suppliers.",
    image: "/products/civil/corrugated-hdpe-cover.jpg",
    additionalImage: "/products/civil/corrugated-installation.jpg",
    standards: ["EN 13476-3", "ISO 9969"],
    keyProperties: {
      "Lloji i murit": "Mur i dyfishtë i brinjëzuar (i brendshëm i lëmuar)",
      "Vija SN4": "E brendshme blu",
      "Vija SN8": "E brendshme e verdhë",
      "Gjatësia standarde": "6 m me bashkues me vulë gome",
      "Lidhja": "Bashkues me gomë EPDM",
      "Thellësia e varrosjes": "0.5–8 m (varet nga ngarkesa)",
      "Diametri maksimal": "ID 2000 mm",
      "Forca e tubave SN4": "≥4 kN/m²",
      "Forca e tubave SN8": "≥8 kN/m²",
      "Toleranca e diametrit": "±5%",
    },
    technicalTables: [
      {
        title: "SN4 Corrugated Pipe — In Stock",
        columns: ["OD mm", "ID mm", "Wall thickness mm", "Weight kg/m", "Pipe length", "Pipe force kN/m²", "Diameter tolerance", "Status"],
        rows: [
          { od: 110, id: 93, wallThickness: 1.00, weight: 0.65, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 125, id: 108, wallThickness: 1.10, weight: 0.82, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 160, id: 138, wallThickness: 1.20, weight: 1.20, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 200, id: 176, wallThickness: 1.40, weight: 1.65, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 250, id: 218, wallThickness: 1.70, weight: 2.50, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 315, id: 272, wallThickness: 1.90, weight: 3.70, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 400, id: 344, wallThickness: 2.30, weight: 6.30, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 500, id: 432, wallThickness: 2.80, weight: 8.60, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 630, id: 540, wallThickness: 3.30, weight: 15.15, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 800, id: 682, wallThickness: 4.10, weight: 20.50, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
          { od: 1000, id: 860, wallThickness: 5.00, weight: 31.00, length: "6 m", force: "≥4", tolerance: "±5%", available: "stock" },
        ],
      },
      {
        title: "SN8 Corrugated Pipe — In Stock",
        columns: ["OD mm", "ID mm", "Wall thickness mm", "Weight kg/m", "Pipe length", "Pipe force kN/m²", "Diameter tolerance", "Status"],
        rows: [
          { od: 110, id: 93, wallThickness: 1.20, weight: 0.80, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 125, id: 108, wallThickness: 1.30, weight: 1.00, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 160, id: 138, wallThickness: 1.40, weight: 1.45, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 200, id: 176, wallThickness: 1.70, weight: 2.00, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 250, id: 218, wallThickness: 1.90, weight: 3.00, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 315, id: 272, wallThickness: 2.30, weight: 4.50, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 400, id: 344, wallThickness: 2.80, weight: 7.55, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 500, id: 432, wallThickness: 3.30, weight: 10.33, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 630, id: 540, wallThickness: 4.10, weight: 18.50, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 800, id: 682, wallThickness: 5.00, weight: 24.80, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
          { od: 1000, id: 860, wallThickness: 6.00, weight: 37.00, length: "6 m", force: "≥8", tolerance: "±5%", available: "stock" },
        ],
      },
      {
        title: "Corrugated System — On Order Only",
        columns: ["ID mm", "OD mm", "Diameter tolerance", "Status"],
        rows: [
          { id: 200, od: 233, tolerance: "±5%", available: "order" },
          { id: 250, od: 291, tolerance: "±5%", available: "order" },
          { id: 300, od: 350, tolerance: "±5%", available: "order" },
          { id: 400, od: 468, tolerance: "±5%", available: "order" },
          { id: 500, od: 585, tolerance: "±5%", available: "order" },
        ],
      },
      {
        title: "KRAH Pipe System — On Order Only",
        columns: ["ID mm", "OD mm", "Diameter tolerance", "Status"],
        rows: [
          { id: 800, od: 900, tolerance: "±5%", available: "order" },
          { id: 900, od: 1010, tolerance: "±5%", available: "order" },
          { id: 1000, od: 1120, tolerance: "±5%", available: "order" },
          { id: 1200, od: 1360, tolerance: "±5%", available: "order" },
          { id: 1400, od: 1550, tolerance: "±5%", available: "order" },
          { id: 1600, od: 1780, tolerance: "±5%", available: "order" },
          { id: 1800, od: 2000, tolerance: "±5%", available: "order" },
          { id: 2000, od: 2240, tolerance: "±5%", available: "order" },
        ],
      },
    ],
    featured: true,
    tags: ["sewage", "drainage", "corrugated", "SN4", "SN8", "KRAH"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        image: "/products/civil/corrugated-ferplast.jpg",
        country: "Kosovo",
        color: "#a855f7",
        availability: "in-stock",
        stockNote: "SN4 dhe SN8 në stok OD 110–1000 mm, gjatësi 6 m",
        orderNote: "Sistemi i korruguar ID 200–500 dhe tuba KRAH ID 800–2000 me porosi",
        diameterMin: 110,
        diameterMax: 2000,
        standards: ["EN 13476-3", "ISO 9969"],
        specificSpecs: {
          "Vija SN4": "Blu",
          "Vija SN8": "E verdhë",
          "Diametri maksimal në stok": "OD 1000 mm",
        },
      },
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        image: "/products/civil/corrugated-konti.jpg",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "in-stock",
        stockNote: "SN4 dhe SN8 në stok OD 110–1000 mm, gjatësi 6 m",
        orderNote: "Sistemi i korruguar ID 200–500 dhe tuba KRAH ID 800–2000 me porosi",
        diameterMin: 110,
        diameterMax: 2000,
        standards: ["EN 13476-3", "ISO 9969"],
        specificSpecs: {
          "Klasa primare": "SN4 (≥ 4 kN/m²)",
          "Gjatësia": "6 m me bashkues të integruar",
        },
      },
      {
        partnerId: "frutibest",
        partnerName: "FrutiBest SHPK",
        image: "/products/civil/corrugated-frutibest.jpg",
        country: "Albania",
        color: "#10b981",
        availability: "on-order",
        orderNote: "Të gjitha diametrat vetëm me porosi: SN4/SN8 OD 110–1000 mm, Sistemi i korruguar ID 200–500, KRAH ID 800–2000",
        diameterMin: 110,
        diameterMax: 2000,
        standards: ["EN 13476-3", "ISO 9969"],
        specificSpecs: {
          "Disponueshmëria": "Vetëm me porosi",
          "Sisteme": "SN4, SN8, Korruguar, KRAH",
        },
      },
    ],
  },

  // Consolidated from: pph-drainage-pipe + ferplast-pph-pipe
  {
    id: "pph-drainage-pipe",
    slug: "pph-drainage-pipe",
    name: "Tub Shkarkimi PP-H",
    shortName: "PP-H Shkarkim",
    category: "civil",
    material: "PP-H (Polypropylene Homopolymer)",
    application: "Gravity Drainage & Soil Stacks",
    description:
      "PP-H (polypropylene homopolymer) gravity drainage pipe with distinctive white lining for building drainage, soil stacks, and acoustic-rated installations. PP-H Silent uses mineral-filled compounds to reduce flow noise — ideal for multi-storey residential and hotel construction.",
    image: "/products/civil/pph-drainage-cover.jpg",
    additionalImage: "/products/civil/pph-drainage-installation.jpg",
    standards: ["EN 1451"],
    keyProperties: {
      "Materiali": "PP-H / PP-H Silent (i mbushur me minerale)",
      "Ngjyra": "Gri me veshje të bardhë",
      "Varianti i heshtur": "PP-H Silent — i mbushur me minerale për performancë akustike",
      "Gjatësia standarde": "0.25 m · 0.5 m · 1 m · 2 m · 3 m",
      "Aksesorët": "Bërryla Ø50–315 mm · T & Y Ø50–200 mm",
    },
    dimensions: [
      { dn: 50,  od: 56,  lengths: "0.25 · 0.5 · 1 · 2 · 3 m", available: "stock" },
      { dn: 75,  od: 82,  lengths: "0.25 · 0.5 · 1 · 2 · 3 m", available: "stock" },
      { dn: 110, od: 119, lengths: "0.25 · 0.5 · 1 · 2 · 3 m", available: "stock" },
      { dn: 125, od: 135, lengths: "0.25 · 0.5 · 1 · 2 · 3 m", available: "stock" },
    ],
    fittings: [
      {
        id: "y-fitting",
        name: "Y",
        image: "/products/civil/pph-fitting-y.jpg",
        diameters: "Ø50 · Ø75 · Ø110 · Ø125",
        description: "Bashkues Y për lidhje dege anësore",
      },
      {
        id: "t-fitting",
        name: "T",
        image: "/products/civil/pph-fitting-t.jpg",
        diameters: "Ø50 · Ø75 · Ø110 · Ø125",
        description: "Bashkues T për lidhje pingul",
      },
      {
        id: "elbow",
        name: "Bërryl",
        image: "/products/civil/pph-fitting-elbow.jpg",
        diameters: "Ø50 · Ø75 · Ø110 · Ø125",
        description: "Bërryl 87.5° për ndryshim drejtimi",
      },
    ],
    tags: ["drainage", "PP-H", "building", "silent", "acoustic"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        image: "/products/civil/pph-drainage-ferplast.jpg",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø50, Ø75, Ø110, Ø125 mm në stok; gjatësi 0.25–3 m",
        orderNote: "PP-H Silent me porosi; Ø90, Ø160+ me porosi; bërryla Ø160–315 mm me porosi",
        diameterMin: 50,
        diameterMax: 315,
        specificSpecs: {
          "Bashkuesit T & Y": "Ø50–160 në stok; Ø160–200 me porosi",
          "Bërryla": "Ø50–125 në stok; Ø160–315 me porosi",
        },
      },
    ],
  },

  {
    id: "ferplast-drainage-pipe",
    slug: "ferplast-drainage-pipe",
    name: "Tub Dranazhimi HDPE-LDPE",
    shortName: "HDPE-LDPE Drenazh",
    category: "civil",
    material: "HDPE-LDPE",
    application: "Agricultural & Construction Sub-Surface Drainage",
    description:
      "Perforated double-wall HDPE pipe for sub-surface drainage of agricultural land and construction sites. The pipe features a perforated upper section that allows groundwater ingress, with the non-perforated section channelling collected water away to outlets. Supplied in coils (Ø90–160 mm) and 6 m bars (Ø200–500 mm). In stock: Ø110–200 mm.",
    image: "/products/civil/hdpe-drainage-cover.jpg",
    additionalImage: "/products/civil/hdpe-drainage-installation.jpg",
    standards: ["EN 13476-3", "ISO 9969"],
    keyProperties: {
      "Materiali": "HDPE-LDPE — mur i dyfishtë i perforuar",
      "Aplikimi": "Drenazh nëntokësor · Drenazh toke bujqësore",
      "Gama e diametrit (stok)": "Ø110–200 mm",
      "Gama e diametrit (porosi)": "Ø250–500 mm",
      "Forma e furnizimit": "Bobina (Ø90–160 mm) · Shufra 6 m (Ø200–500 mm)",
      "Perforimi": "Gjysma e sipërme e perforuar për hyrje uji",
      "Ngurtësia SN4": "Shtresë e brendshme e zezë",
      "Ngurtësia SN8": "Shtresë e brendshme e verdhë",
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
    tags: ["drainage", "HDPE", "perforated", "agriculture", "subsurface"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        image: "/products/civil/hdpe-drainage-ferplast.jpg",
        country: "Kosovo",
        color: "#a855f7",
        availability: "partial",
        stockNote: "Ø110–200 mm në stok · SN4 (shtresë e brendshme e zezë)",
        orderNote: "Ø250–500 mm me porosi · SN8 (shtresë e brendshme e verdhë) me porosi",
        diameterMin: 110,
        diameterMax: 500,
        standards: ["EN 13476-3", "ISO 9969"],
        specificSpecs: {
          "Perforimi": "Gjysma e sipërme — lejon hyrje uji gjatë instalimit",
          "Forca e aplikuar": "450 N (të gjitha madhësitë)",
          "Forma e furnizimit": "Bobina 50 m (≤Ø200 mm) · Shufra 6 m (Ø200+)",
          "SN4 (në stok)": "Shtresë e brendshme e zezë",
          "SN8 (me porosi)": "Shtresë e brendshme e verdhë",
        },
      },
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        image: "/products/civil/hdpe-drainage-konti.jpg",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "partial",
        stockNote: "Ø110–200 mm në stok · SN4 (shtresë e brendshme e zezë)",
        orderNote: "Ø250–500 mm me porosi · SN8 (shtresë e brendshme e verdhë) me porosi",
        diameterMin: 110,
        diameterMax: 500,
        standards: ["EN 13476-3", "ISO 9969"],
        specificSpecs: {
          "Perforimi": "Gjysma e sipërme e perforuar",
          "Forma e furnizimit": "Bobina 50 m (≤Ø200 mm) · Shufra 6 m (Ø200+)",
          "SN4 (në stok)": "Shtresë e brendshme e zezë",
          "SN8 (me porosi)": "Shtresë e brendshme e verdhë",
        },
      },
    ],
  },

  {
    id: "electric-conduit-hdpe",
    slug: "electric-conduit-hdpe",
    name: "Tuba për Kabllo Elektrik",
    shortName: "Tuba Elektrik",
    category: "civil",
    material: "HDPE",
    application: "Electrical Cable Protection",
    description:
      "Tubat elektrik HDPE me dy shtresa (double wall) dhe me fije plastike, të prodhuara sipas standartit EN 50086-2-4. Konstruksioni me dy shtresa siguron rezistencë të lartë dhe fleksibilitet optimal. Disponohen në dy gama: Ø16-32mm (me fije plastike, ngjyra: e zezë, blu, e kuqe) dhe Ø40-160mm (me fije plastike). Forca e aplikuar 450-750 N. Ideale për mbrojtje kabllosh elektrikë në instalime nëntokësore dhe mbi tokë.",
    image: "/products/civil/electric-conduit-cover.jpg",
    additionalImage: "/products/civil/electric-conduit-installation.jpg",
    standards: ["EN 50086-2-4"],
    keyProperties: {
      "Materiali": "HDPE — dy shtresa (double wall)",
      "Tipi": "Me fije plastike (corrugated)",
      "Standardi": "EN 50086-2-4",
      "Gama e vogël": "Ø16–32 mm (ngjyra: e zezë, blu, e kuqe)",
      "Gama e madhe": "Ø40–160 mm",
      "Forca e aplikuar": "450–750 N",
      "Gjatësia": "50–100 m bobina",
      "Aplikimi": "Mbrojtje kabllosh elektrikë nëntokësor dhe mbi tokë",
    },
    technicalTables: [
      {
        title: "Tubat elektrik Ø40-160mm me fije Plastike sipas Standartit EN 50086-2-4",
        columns: ["DN (OD)", "DN (ID)", "Pesha/metër", "Forca", "Gjatësia"],
        rows: [
          { od: 40, id: 31.95, weight: "113 g/m", force: "450 N", length: "50 m", available: "stock" },
          { od: 50, id: 39.20, weight: "139 g/m", force: "450 N", length: "50 m", available: "stock" },
          { od: 63, id: 50.20, weight: "200 g/m", force: "450 N", length: "50 m", available: "stock" },
          { od: 75, id: 60.60, weight: "256 g/m", force: "450 N", length: "50 m", available: "stock" },
          { od: 90, id: 75.00, weight: "350 g/m", force: "450 N", length: "50 m", available: "stock" },
          { od: 110, id: 94.00, weight: "520 g/m", force: "450 N", length: "50 m", available: "stock" },
          { od: 125, id: 108.00, weight: "650 g/m", force: "450 N", length: "50 m", available: "stock" },
          { od: 160, id: 138.00, weight: "1000 g/m", force: "450 N", length: "50 m", available: "stock" },
        ],
        intermediateImage: "/products/civil/electric-conduit-small.jpg",
      },
      {
        title: "Tubat elektrik Ø16-32mm (Ngjyra: E zezë, Blu, E kuqe)",
        columns: ["DN (OD)", "DN (ID)", "Pesha/metër", "Forca", "Gjatësia"],
        rows: [
          { od: 16, id: 11.1, weight: "46 g/m", force: "750 N", length: "50-100 m", available: "stock" },
          { od: 20, id: 13.9, weight: "56 g/m", force: "750 N", length: "50-100 m", available: "stock" },
          { od: 22, id: 15.8, weight: "68 g/m", force: "750 N", length: "50-100 m", available: "stock" },
          { od: 25, id: 18.2, weight: "80 g/m", force: "750 N", length: "50-100 m", available: "stock" },
          { od: 32, id: 24.0, weight: "115 g/m", force: "750 N", length: "50-100 m", available: "stock" },
        ],
      },
    ],
    tags: ["electrical", "conduit", "HDPE", "cable-protection"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        availability: "in-stock",
        stockNote: "Të gjitha madhësitë në stok · Ø16-160 mm",
        diameterMin: 16,
        diameterMax: 160,
        standards: ["EN 50086-2-4"],
        specificSpecs: {
          "Ngjyrat (Ø16-32)": "E zezë · Blu · E kuqe",
          "Forca Ø16-32": "750 N",
          "Forca Ø40-160": "450 N",
          "Gjatësia": "50-100 m bobina",
        },
      },
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        availability: "on-order",
        orderNote: "Të gjitha madhësitë me porosi · Ø16-160 mm",
        diameterMin: 16,
        diameterMax: 160,
        standards: ["EN 50086-2-4"],
        specificSpecs: {
          "Koha e dorëzimit": "2-3 javë",
          "Sasia minimale": "Sipas kërkesës",
        },
      },
    ],
    sourceUrl: "https://www.ferplast-ks.com/wp-content/uploads/2025/08/ELEKTRIK.pdf",
  },

  {
    id: "optical-monotube-hdpe",
    slug: "optical-monotube-hdpe",
    name: "Tub Optik Monotub Mbrojtës Kabllosh HDPE",
    shortName: "Monotub Optik",
    category: "civil",
    material: "HDPE",
    application: "Optical & Telecommunication Cable Protection",
    description:
      "Tuba HDPE me dy shtresa (double wall) për mbrojtje kabllosh optikë dhe telekomunikacioni. Sipërfaqja e brendshme e lëmuar dhe e jashtme e valëzuar siguron rezistencë mekanike të lartë. Ideale për kalime rrugore dhe urash, instalime nëntokësore në ambiente urbane, rurale dhe industriale. Rezistencë e shkëlqyer ndaj konsumit, korrozionit dhe degradimit mjedisor. Prodhohen në ngjyra të zezë, të kuqe dhe të verdhë. Jetëgjatësi 50+ vjet.",
    image: "/products/civil/optical-monotube-cover.jpg",
    additionalImage: "/products/civil/optical-monotube-product.jpg",
    standards: ["EN 50086", "EN 61386", "EN 13476-3"],
    keyProperties: {
      "Materiali": "HDPE — dy shtresa (double wall)",
      "Sipërfaqja": "E brendshme e lëmuar · E jashtme e valëzuar",
      "Diametri nominal": "Ø75–200 mm (diametri i jashtëm)",
      "Ngjyrat": "E zezë · E kuqe · E verdhë",
      "Forma e furnizimit": "Shufra 6-12 m · Bobina 50 m",
      "Temperatura": "-40°C deri +60°C",
      "Jetëgjatësia": "50+ vjet",
      "Standarde": "EN 50086 · EN 61386 · EN 13476-3",
    },
    technicalTables: [
      {
        title: "HDPE PTT Monotube — Specifikime Teknike",
        columns: ["Diametri", "SDR", "Presioni", "Trashësia", "Disponueshmëria"],
        rows: [
          { od: "40x1", id: "SDR 21", weight: "PN6", force: "2.0 mm", available: "stock" },
          { od: "40x1", id: "SDR 17", weight: "PN10", force: "2.4 mm", available: "stock" },
          { od: "50x1", id: "SDR 21", weight: "PN6", force: "2.4 mm", available: "order" },
          { od: "50x1", id: "SDR 17", weight: "PN10", force: "3.0 mm", available: "order" },
          { od: "63x1", id: "SDR 21", weight: "PN6", force: "3.0 mm", available: "order" },
          { od: "63x1", id: "SDR 17", weight: "PN10", force: "3.8 mm", available: "order" },
          { od: "75x1", id: "SDR 21", weight: "PN6", force: "3.6 mm", available: "order" },
          { od: "75x1", id: "SDR 17", weight: "PN10", force: "4.5 mm", available: "order" },
          { od: "90x1", id: "SDR 21", weight: "PN6", force: "4.3 mm", available: "order" },
          { od: "90x1", id: "SDR 17", weight: "PN10", force: "5.4 mm", available: "order" },
          { od: "110x1", id: "SDR 21", weight: "PN6", force: "5.3 mm", available: "order" },
          { od: "110x1", id: "SDR 17", weight: "PN10", force: "6.6 mm", available: "order" },
          { od: "125x1", id: "SDR 21", weight: "PN6", force: "6.0 mm", available: "order" },
          { od: "125x1", id: "SDR 17", weight: "PN10", force: "7.4 mm", available: "order" },
          { od: "140x1", id: "SDR 21", weight: "PN6", force: "6.7 mm", available: "order" },
          { od: "140x1", id: "SDR 17", weight: "PN10", force: "8.3 mm", available: "order" },
          { od: "160x1", id: "SDR 21", weight: "PN6", force: "7.7 mm", available: "order" },
          { od: "160x1", id: "SDR 17", weight: "PN10", force: "9.5 mm", available: "order" },
          { od: "180x1", id: "SDR 21", weight: "PN6", force: "8.6 mm", available: "order" },
          { od: "180x1", id: "SDR 17", weight: "PN10", force: "10.7 mm", available: "order" },
          { od: "200x1", id: "SDR 21", weight: "PN6", force: "9.6 mm", available: "order" },
          { od: "200x1", id: "SDR 17", weight: "PN10", force: "11.9 mm", available: "order" },
        ],
      },
    ],
    tags: ["optical", "monotube", "HDPE", "cable-protection", "telecommunication"],
    suppliers: [
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        image: "/products/suppliers/konti-hidroplast.jpg",
        availability: "partial",
        stockNote: "Ø40mm (SDR 21 & SDR 17) në stok",
        orderNote: "Ø50-200mm me porosi · Koha e dorëzimit: 2-3 javë",
        diameterMin: 40,
        diameterMax: 200,
        standards: ["EN 50086", "EN 61386", "EN 13476-3"],
        specificSpecs: {
          "Ngjyrat": "E zezë · E kuqe · E verdhë",
          "Forma": "Shufra 6-12 m · Bobina 50 m",
          "Rezistenca UV": "E disponueshme për instalime të jashtme",
          "Rezistenca kimike": "Inert ndaj acideve dhe bazave",
        },
      },
    ],
  },

  {
    id: "optical-bitube-hdpe",
    slug: "optical-bitube-hdpe",
    name: "Tub Optik Bitub Mbrojtës Kabllosh HDPE",
    shortName: "Bitub Optik",
    category: "civil",
    material: "HDPE",
    application: "Optical & Telecommunication Cable Protection - Dual Tube",
    description:
      "Tuba HDPE bitub (dy tuba) me dy shtresa për mbrojtje kabllosh optikë dhe telekomunikacioni. Sistemi me dy tuba lejon kalimin e dy kabllove të pavarura në një tub të vetëm, duke optimizuar hapësirën dhe instalimin. Sipërfaqja e brendshme e lëmuar dhe e jashtme e valëzuar siguron rezistencë mekanike të lartë. Ideale për kalime rrugore dhe urash, instalime nëntokësore në ambiente urbane, rurale dhe industriale. Rezistencë e shkëlqyer ndaj konsumit, korrozionit dhe degradimit mjedisor. Jetëgjatësi 50+ vjet.",
    image: "/products/civil/optical-bitube-cover.jpg",
    additionalImage: "/products/civil/optical-bitube-cover.jpg",
    standards: ["EN 50086", "EN 61386", "EN 13476-3"],
    keyProperties: {
      "Materiali": "HDPE — dy shtresa (double wall)",
      "Tipi": "Bitub — dy tuba të brendshëm",
      "Sipërfaqja": "E brendshme e lëmuar · E jashtme e valëzuar",
      "Diametri nominal": "Ø40–63 mm (diametri i jashtëm)",
      "Ngjyrat": "E zezë · E kuqe · E verdhë",
      "Forma e furnizimit": "Shufra 6-12 m · Bobina 50 m",
      "Temperatura": "-40°C deri +60°C",
      "Jetëgjatësia": "50+ vjet",
      "Standarde": "EN 50086 · EN 61386 · EN 13476-3",
    },
    technicalTables: [
      {
        title: "HDPE PTT Bitube — Specifikime Teknike",
        columns: ["Diametri", "SDR", "Presioni", "Trashësia", "Disponueshmëria"],
        rows: [
          { od: "40x2", id: "SDR 17", weight: "10 ATM", force: "2.4 mm", available: "stock" },
          { od: "50x2", id: "SDR 17", weight: "10 ATM", force: "3.0 mm", available: "order" },
          { od: "63x2", id: "SDR 17", weight: "10 ATM", force: "3.8 mm", available: "order" },
        ],
      },
    ],
    tags: ["optical", "bitube", "HDPE", "cable-protection", "telecommunication", "dual-tube"],
    suppliers: [
      {
        partnerId: "ferplast-ks",
        partnerName: "Ferplast",
        country: "Kosovo",
        color: "#a855f7",
        image: "/products/suppliers/ferplast.jpg",
        availability: "partial",
        stockNote: "Ø40x2 SDR 17 në stok",
        orderNote: "Madhësi të tjera me porosi nga Konti Hidroplast",
        diameterMin: 40,
        diameterMax: 63,
        standards: ["EN 50086", "EN 61386", "EN 13476-3"],
        specificSpecs: {
          "Në stok": "Ø40x2 SDR 17 (10 ATM, 2.4mm)",
          "Ngjyrat": "E zezë · E kuqe · E verdhë",
          "Forma": "Shufra 6-12 m · Bobina 50 m",
        },
      },
      {
        partnerId: "konti-hidroplast",
        partnerName: "Konti Hidroplast",
        country: "North Macedonia",
        color: "#0891b2",
        image: "/products/suppliers/konti-hidroplast.jpg",
        availability: "on-order",
        orderNote: "Ø50-63mm me porosi · Koha e dorëzimit: 2-3 javë",
        diameterMin: 50,
        diameterMax: 63,
        standards: ["EN 50086", "EN 61386", "EN 13476-3"],
        specificSpecs: {
          "Me porosi": "Ø50x2, Ø63x2 SDR 17",
          "Ngjyrat": "E zezë · E kuqe · E verdhë",
          "Forma": "Shufra 6-12 m · Bobina 50 m",
          "Rezistenca UV": "E disponueshme për instalime të jashtme",
          "Rezistenca kimike": "Inert ndaj acideve dhe bazave",
        },
      },
    ],
  },

  {
    id: "fitt-mint",
    slug: "fitt-mint",
    name: "FITT Mint",
    shortName: "FITT Mint",
    category: "agri",
    material: "PVC",
    application: "Garden & Agricultural Watering",
    description:
      "FITT Mint is a four-layer PVC hose designed for garden and agricultural watering and irrigation. Its black inner layer actively prevents algae formation, while the outer cover is UV-stabilised for long service life in outdoor conditions. The hose performs reliably between −10 °C and +40 °C and carries a 10-year manufacturer guarantee.",
    image: "/products/agri/fitt-mint-hose.jpg",
    additionalImage: "/products/agri/fitt-mint-product.avif",
    standards: ["EN ISO 1307"],
    keyProperties: {
      "Material": "PVC — 4-layer construction",
      "Reinforcement": "Polyester braided mesh",
      "Inner Diameter": "12.5 / 15 / 19 / 25 mm",
      "Roll Lengths": "½″: 15/20/25/30/50 m · ⅝″/¾″/1″: 50 m",
      "Bursting Pressure": "21–24 bar",
      "Temperature Range": "−10 °C to +40 °C",
      "Inner Layer": "Anti-algae black",
      "Origin": "Made in Italy",
      "Guarantee": "10 years",
    },
    dimensions: [
      { dn: 13, size: "1/2\"", lengths: "15 / 20 / 25 / 30 / 50 m", burstingPressure: 24, available: "stock" },
      { dn: 15, size: "5/8\"", lengths: "50 m", burstingPressure: 24, available: "stock" },
      { dn: 19, size: "3/4\"", lengths: "50 m", burstingPressure: 24, available: "stock" },
      { dn: 25, size: "1\"", lengths: "50 m", burstingPressure: 21, available: "stock" },
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
    image: "/products/agri/fitt-mimosa-hose.jpg",
    additionalImage: "/products/agri/fitt-mimosa-product.avif",
    standards: ["EN ISO 1307"],
    keyProperties: {
      "Material": "PVC — 3-layer semi-professional",
      "Reinforcement": "High-tenacity polyester braid",
      "Inner Diameter": "12.5 / 15 / 19 / 25 mm",
      "Roll Lengths": "½″: 15/20/25/30/50 m · ⅝″/¾″/1″: 50 m",
      "Bursting Pressure": "21–40 bar (diameter-dependent)",
      "Temperature Range": "−10 °C to +40 °C",
      "Outer Colour": "Opaque yellow with twin green stripes",
      "Inner Layer": "Anti-algae black",
      "Origin": "Made in Italy",
      "Guarantee": "10 years",
    },
    dimensions: [
      { dn: 13, size: "1/2\"", lengths: "15 / 20 / 25 / 30 / 50 m", burstingPressure: 40, available: "stock" },
      { dn: 15, size: "5/8\"", lengths: "50 m", burstingPressure: 36, available: "stock" },
      { dn: 19, size: "3/4\"", lengths: "50 m", burstingPressure: 30, available: "stock" },
      { dn: 25, size: "1\"", lengths: "50 m", burstingPressure: 27, available: "stock" },
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
    id: "fitt-force",
    slug: "fitt-force",
    name: "FITT Force",
    shortName: "FITT Force",
    category: "agri",
    material: "PVC-free TPE",
    application: "Garden & Agricultural Watering",
    description:
      "FITT Force is an eco-design garden hose developed according to FITT's sustainability guidelines: performance, circularity, and reduction. This PVC-free hose is 2× lighter and 3× more compact than traditional hoses, with 43% lower CO₂ emissions. Features a compact ergonomic nozzle designed in collaboration with MOMODESIGN, easily replaceable fittings, and 100% drip-proof construction. Carbon emissions from production are 100% offset by certified carbon credits. Carries a 30-year manufacturer guarantee.",
    image: "/products/agri/fitt-force-cover.jpg",
    additionalImage: "/products/agri/fitt-force-product.jpg",
    standards: ["ISO 14067"],
    keyProperties: {
      "Material": "PVC-free TPE (Thermoplastic Elastomer)",
      "Construction": "Eco-design — 2× lighter, 3× more compact",
      "Inner Diameter": "12.5 mm",
      "Roll Lengths": "1/2\": 30 m (without nozzle)",
      "Nozzle": "Compact ergonomic MOMODESIGN — adjustable jet/cone",
      "Fittings": "Easily replaceable premium thermoplastic",
      "Environmental Impact": "−43% CO₂e vs. standard hose · 100% carbon offset",
      "Temperature Range": "−10 °C to +40 °C",
      "Repairable": "Yes — replaceable fittings and nozzle",
      "Origin": "Made in Italy",
      "Guarantee": "30 years",
    },
    dimensions: [
      { dn: 13, size: "1/2\"", lengths: "30 m (without nozzle)", available: "stock" },
    ],
    featured: true,
    tags: ["hose", "garden", "agriculture", "FITT", "Force", "eco-design", "PVC-free", "sustainable"],
    suppliers: [
      {
        partnerId: "fitt",
        partnerName: "FITT",
        country: "Italy",
        color: "#06b6d4",
        availability: "in-stock",
        stockNote: "½\" × 30 m (without nozzle) in stock",
        diameterMin: 12,
        diameterMax: 13,
        standards: ["ISO 14067"],
        specificSpecs: {
          "Eco-Design": "Low impact product — PVC-free TPE construction",
          "Weight": "2× lighter than traditional hoses",
          "Compactness": "3× more compact for easy storage",
          "Carbon Footprint": "−43% CO₂e emissions (ISO 14067 verified by TÜV Italia)",
          "Carbon Offset": "100% production emissions offset by certified credits",
          "Nozzle Design": "MOMODESIGN collaboration — ergonomic, adjustable",
          "Fittings": "Premium thermoplastic with soft rubber grip",
          "Drip-Proof": "100% drip-proof construction",
          "Source": "fitt.com/product/fitt_force",
        },
      },
    ],
  },

  {
    id: "pista-ekoplast-watering-hose",
    slug: "pista-ekoplast-watering-hose",
    name: "Pista Ekoplast Watering Hose",
    shortName: "Pista Ekoplast Hose",
    category: "agri",
    material: "PVC",
    application: "Garden & Agricultural Watering",
    description:
      "Pista Ekoplast watering hose is a durable three-layer PVC garden hose designed for reliable watering in residential and agricultural applications. Manufactured in Kosovo by Pista Ekoplast, this hose features reinforced three-layer construction for long-lasting performance in outdoor conditions. The multi-layer design provides superior strength and flexibility. Available in multiple diameters to suit different flow requirements, with standard 50-meter roll lengths for convenient coverage of large areas. Suitable for garden irrigation, agricultural watering, and general outdoor water distribution.",
    image: "/products/agri/pista-ekoplast-hose-cover.jpg",
    additionalImage: "/products/agri/pista-ekoplast-hose-product.jpg",
    standards: [],
    keyProperties: {
      "Material": "PVC — 3-layer construction",
      "Inner Diameter": "12.5 / 19 / 25 mm",
      "Roll Lengths": "50 m standard",
      "Construction": "3-layer reinforced PVC",
      "Application": "Garden watering & agricultural irrigation",
      "Temperature Range": "−5 °C to +50 °C",
      "Pressure Rating": "Standard garden hose pressure",
      "Origin": "Made in Kosovo",
      "Manufacturer": "Pista Ekoplast",
    },
    dimensions: [
      { dn: 13, size: "1/2\"", lengths: "50 m", available: "stock" },
      { dn: 19, size: "3/4\"", lengths: "50 m", available: "stock" },
      { dn: 25, size: "1\"", lengths: "50 m", available: "stock" },
    ],
    featured: true,
    tags: ["hose", "garden", "agriculture", "watering", "PVC", "Pista Ekoplast", "Kosovo"],
    suppliers: [
      {
        partnerId: "pista-ekoplast",
        partnerName: "Pista Ekoplast",
        country: "Kosovo",
        color: "#10b981",
        availability: "in-stock",
        stockNote: "½\" / ¾\" / 1\" × 50 m në stok",
        diameterMin: 12,
        diameterMax: 25,
        standards: [],
        specificSpecs: {
          "Construction": "3-layer reinforced PVC",
          "Flexibility": "Good flexibility for easy handling",
          "Durability": "UV-resistant outer layer",
          "Connection": "Standard garden hose fittings",
          "Usage": "Residential & agricultural watering",
          "Roll Length": "50 m standard",
        },
      },
    ],
  },

  // ── ROTO PLANTERS ─────────────────────────────────────────────────────────

  {
    id: "roto-jazz-planter",
    slug: "roto-jazz-planter",
    name: "ROTO Jazz Planter",
    shortName: "Jazz Planter",
    category: "agri",
    material: "UV-stabilised polyethylene, rotomoulded",
    application: "Decorative Garden Planters",
    description:
      "The ROTO Jazz planter is a decorative rotomoulded planter with a rounded shoulder silhouette and clean modern lines. Manufactured from UV-stabilised polyethylene, it is suitable for terraces, gardens, entrance areas and commercial landscaping. It is lightweight, weather-resistant, frost-resistant and durable against UV exposure. Available in three sizes: S, M and L.",
    image: "/images/products/roto/roto-jazz-family.png",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised polyethylene, rotomoulded",
      "Available Sizes": "S · M · L",
      "Application": "Terraces · Gardens · Entrance areas · Commercial landscaping",
      "Weather Resistance": "Frost-resistant · UV-resistant",
      "Weight": "Lightweight",
    },
    dimensions: [
      { dn: 300, size: "Jazz S", lengths: "Ø300 × 270 mm", available: "stock" },
      { dn: 450, size: "Jazz M", lengths: "Ø450 × 350 mm", available: "stock" },
      { dn: 500, size: "Jazz L", lengths: "Ø500 × 430 mm", available: "stock" },
    ],
    tags: ["planter", "decorative", "garden", "ROTO", "rotomoulded", "UV-resistant"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Jazz S (KODI 16687) · Jazz M (KODI 16686) · Jazz L (KODI 16688)",
        diameterMin: 300,
        diameterMax: 500,
        specificSpecs: {
          "Jazz S": "KODI 16687 — Ø300 × 270",
          "Jazz M": "KODI 16686 — Ø450 × 350",
          "Jazz L": "KODI 16688 — Ø500 × 430",
        },
      },
    ],
  },

  {
    id: "roto-rumba-planter",
    slug: "roto-rumba-planter",
    name: "ROTO Rumba Planter",
    shortName: "Rumba Planter",
    category: "agri",
    material: "UV-stabilised polyethylene, rotomoulded",
    application: "Decorative Garden Planters",
    description:
      "The ROTO Rumba planter is a low, wide-mouth rotomoulded bowl planter ideal for shrubs, ornamental grasses and seasonal arrangements. Manufactured from UV-stabilised polyethylene, it resists frost, UV exposure and outdoor weather conditions while remaining lightweight and easy to reposition. Suitable for gardens, terraces and public landscaping. Available in three sizes: S, M and L.",
    image: "/images/products/roto/roto-rumba-family.png",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised polyethylene, rotomoulded",
      "Available Sizes": "S · M · L",
      "Design": "Low-profile, wide-mouth bowl",
      "Application": "Shrubs · Ornamental grasses · Seasonal displays",
      "Weather Resistance": "Frost-resistant · UV-resistant",
    },
    dimensions: [
      { dn: 300, size: "Rumba S", lengths: "Ø300 × 270 mm", available: "stock" },
      { dn: 450, size: "Rumba M", lengths: "Ø450 × 350 mm", available: "stock" },
      { dn: 500, size: "Rumba L", lengths: "Ø500 × 430 mm", available: "stock" },
    ],
    tags: ["planter", "decorative", "garden", "ROTO", "rotomoulded", "bowl"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Rumba S (KODI 16680) · Rumba M (KODI 16679) · Rumba L (KODI 16681)",
        diameterMin: 300,
        diameterMax: 500,
        specificSpecs: {
          "Rumba S": "KODI 16680 — Ø300 × 270",
          "Rumba M": "KODI 16679 — Ø450 × 350",
          "Rumba L": "KODI 16681 — Ø500 × 430",
        },
      },
    ],
  },

  {
    id: "roto-barrel-standalone",
    slug: "roto-barrel-standalone",
    name: "ROTO Barrel Standalone Planter",
    shortName: "Barrel Standalone",
    category: "agri",
    material: "UV-stabilised polyethylene, rotomoulded",
    application: "Decorative Garden Planters",
    description:
      "The ROTO Barrel Standalone is a decorative barrel-style planter with a rustic wood-grain appearance. Manufactured from UV-stabilised polyethylene using rotational moulding, it is suitable for gardens, terraces, hospitality venues, summer spaces and decorative entrance areas. This standalone model must be treated separately from the Barrel size-range family.",
    image: "/images/products/roto/roto-barrel-standalone.png",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised polyethylene, rotomoulded",
      "Design": "Rustic wood-grain barrel style",
      "Application": "Gardens · Terraces · Hospitality venues · Entrance areas",
      "Weather Resistance": "UV-resistant · Outdoor rated",
    },
    dimensions: [
      { dn: 0, size: "Barrel Standalone", lengths: "KODI 16140", available: "stock" },
    ],
    tags: ["planter", "decorative", "garden", "ROTO", "barrel", "wood-grain"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Barrel Standalone (KODI 16140)",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Model": "KODI 16140 — Standalone barrel planter",
        },
      },
    ],
  },

  {
    id: "roto-barrel-planter",
    slug: "roto-barrel-planter",
    name: "ROTO Barrel Planter Family",
    shortName: "Barrel Family",
    category: "agri",
    material: "UV-stabilised polyethylene, rotomoulded",
    application: "Decorative Garden Planters",
    description:
      "The ROTO Barrel planter family is a range of decorative wood-grain barrel-style planters. Manufactured from UV-stabilised polyethylene using rotational moulding, it brings a rustic and warm character to gardens, terraces, hospitality venues, summer spaces and commercial outdoor areas. Lightweight, practical and weather-resistant for outdoor use. Available in sizes S, M, L, XL and XXL.",
    image: "/images/products/roto/roto-barrel-family.png",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised polyethylene, rotomoulded",
      "Available Sizes": "S · M · L · XL · XXL",
      "Design": "Wood-grain barrel style",
      "Application": "Gardens · Terraces · Hospitality · Commercial spaces",
      "Weather Resistance": "UV-resistant · Outdoor rated",
    },
    dimensions: [
      { dn: 0, size: "Barrel S", lengths: "KODI 16167", available: "stock" },
      { dn: 1, size: "Barrel M", lengths: "KODI 16168", available: "stock" },
      { dn: 2, size: "Barrel L", lengths: "KODI 16169", available: "stock" },
      { dn: 3, size: "Barrel XL", lengths: "KODI 16663", available: "stock" },
      { dn: 4, size: "Barrel XXL", lengths: "KODI 16664", available: "stock" },
    ],
    tags: ["planter", "decorative", "garden", "ROTO", "barrel", "wood-grain"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Barrel S/M/L/XL/XXL (KODI 16167/16168/16169/16663/16664)",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Barrel S": "KODI 16167",
          "Barrel M": "KODI 16168",
          "Barrel L": "KODI 16169",
          "Barrel XL": "KODI 16663",
          "Barrel XXL": "KODI 16664",
        },
      },
    ],
  },

  {
    id: "roto-polka-planter",
    slug: "roto-polka-planter",
    name: "ROTO Polka Planter",
    shortName: "Polka Planter",
    category: "agri",
    material: "UV-stabilised polyethylene, rotomoulded",
    application: "Decorative Garden Planters",
    description:
      "The ROTO Polka planter is a classic rounded decorative planter with a wood-imitation finish. Manufactured from UV-stabilised polyethylene using rotational moulding, it combines a traditional appearance with practical handling and outdoor durability. Suitable for terraces, gardens, entrances and decorative outdoor spaces. Available in three sizes: S, M and L.",
    image: "/images/products/roto/roto-polka-family.png",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised polyethylene, rotomoulded",
      "Available Sizes": "S · M · L",
      "Design": "Classic rounded with wood-imitation",
      "Application": "Terraces · Gardens · Entrances · Decorative spaces",
      "Weather Resistance": "UV-resistant · Outdoor rated",
    },
    dimensions: [
      { dn: 310, size: "Polka S", lengths: "Ø310 × 215 mm", available: "stock" },
      { dn: 380, size: "Polka M", lengths: "Ø380 × 320 mm", available: "stock" },
      { dn: 430, size: "Polka L", lengths: "Ø430 × 420 mm", available: "stock" },
    ],
    tags: ["planter", "decorative", "garden", "ROTO", "rotomoulded", "wood-imitation"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Polka S (KODI 16689) · Polka M (KODI 16690) · Polka L (KODI 16691)",
        diameterMin: 310,
        diameterMax: 430,
        specificSpecs: {
          "Polka S": "KODI 16689 — Ø310 × 215",
          "Polka M": "KODI 16690 — Ø380 × 320",
          "Polka L": "KODI 16691 — Ø430 × 420",
        },
      },
    ],
  },

  {
    id: "roto-quadro-planter",
    slug: "roto-quadro-planter",
    name: "ROTO Quadro Planter",
    shortName: "Quadro Planter",
    category: "agri",
    material: "UV-stabilised polyethylene, rotomoulded",
    application: "Decorative Garden Planters",
    description:
      "The ROTO Quadro planter is a tall, tapered square planter with a contemporary architectural profile. Manufactured from UV-stabilised polyethylene using rotational moulding, its upright proportions suit ornamental grasses, small palms and modern planting arrangements. Well suited to terraces, hotel entrances, office entrances and commercial spaces. Available in three sizes: S, M and L.",
    image: "/images/products/roto/roto-quadro-family.png",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised polyethylene, rotomoulded",
      "Available Sizes": "S · M · L",
      "Design": "Tall tapered square, contemporary",
      "Application": "Terraces · Hotel entrances · Office spaces · Commercial",
      "Weather Resistance": "UV-resistant · Outdoor rated",
    },
    dimensions: [
      { dn: 290, size: "Quadro S", lengths: "290 × 290 × 445 mm", available: "stock" },
      { dn: 380, size: "Quadro M", lengths: "380 × 380 × 590 mm", available: "stock" },
      { dn: 485, size: "Quadro L", lengths: "485 × 485 × 730 mm", available: "stock" },
    ],
    tags: ["planter", "decorative", "garden", "ROTO", "square", "contemporary"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Quadro S (KODI 16048) · Quadro M (KODI 16049) · Quadro L (KODI 16064)",
        diameterMin: 290,
        diameterMax: 485,
        specificSpecs: {
          "Quadro S": "KODI 16048 — 290 × 290 × 445",
          "Quadro M": "KODI 16049 — 380 × 380 × 590",
          "Quadro L": "KODI 16064 — 485 × 485 × 730",
        },
      },
    ],
  },

  {
    id: "roto-tango-line-planter",
    slug: "roto-tango-line-planter",
    name: "ROTO Tango / Line Planter",
    shortName: "Tango / Line",
    category: "agri",
    material: "UV-stabilised polyethylene, rotomoulded",
    application: "Decorative Garden Planters",
    description:
      "The ROTO Tango / Line planter is a low-profile architectural planter with clean rectangular lines, ideal for space division, balconies, retail areas, terraces and modern gardens. Manufactured from UV-stabilised polyethylene using rotational moulding, it is resistant to frost, UV exposure and outdoor conditions. For this test, publish the Line L and Line XL variants.",
    image: "/images/products/roto/roto-tango-line-family.png",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised polyethylene, rotomoulded",
      "Available Sizes": "L · XL",
      "Design": "Low-profile rectangular, architectural",
      "Application": "Space division · Balconies · Retail · Terraces · Modern gardens",
      "Weather Resistance": "Frost-resistant · UV-resistant",
    },
    dimensions: [
      { dn: 430, size: "Line L", lengths: "430 × 430 × 380 mm", available: "stock" },
      { dn: 950, size: "Line XL", lengths: "950 × 430 × 380 mm", available: "stock" },
    ],
    tags: ["planter", "decorative", "garden", "ROTO", "rectangular", "architectural"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Line L (KODI 16668) · Line XL (KODI 16667)",
        diameterMin: 430,
        diameterMax: 950,
        specificSpecs: {
          "Line L": "KODI 16668 — 430 × 430 × 380",
          "Line XL": "KODI 16667 — 950 × 430 × 380",
        },
      },
    ],
  },

  {
    id: "roto-basket-planter",
    slug: "roto-basket-planter",
    name: "ROTO Basket Planter",
    shortName: "Basket Planter",
    category: "agri",
    material: "UV-stabilised polyethylene, rotomoulded",
    application: "Decorative Garden Planters",
    description:
      "The ROTO Basket planter is a textured planter with a woven-basket appearance. Manufactured from UV-stabilised polyethylene using rotational moulding, it brings a warm and natural look to commercial spaces, hotels, restaurants, entrances, terraces and public landscaping. Available in large formats: Basket, Basket XL and Basket XXL.",
    image: "/images/products/roto/roto-basket-large-family.png",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised polyethylene, rotomoulded",
      "Available Sizes": "Basket · Basket XL · Basket XXL",
      "Design": "Textured woven-basket appearance",
      "Application": "Commercial · Hotels · Restaurants · Entrances · Public spaces",
      "Weather Resistance": "UV-resistant · Outdoor rated",
    },
    dimensions: [
      { dn: 0, size: "Basket", lengths: "KODI 16566", available: "stock" },
      { dn: 1, size: "Basket XL", lengths: "KODI 16669", available: "stock" },
      { dn: 2, size: "Basket XXL", lengths: "KODI 16656", available: "stock" },
    ],
    tags: ["planter", "decorative", "garden", "ROTO", "basket", "textured"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Basket (KODI 16566) · Basket XL (KODI 16669) · Basket XXL (KODI 16656)",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Basket": "KODI 16566",
          "Basket XL": "KODI 16669",
          "Basket XXL": "KODI 16656",
        },
      },
    ],
  },

  // Consolidated from: hdpe-socket-coupling + konti-kan-socket-fitting
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
      { dn: 110,  od: 126,   lengths: "140 mm", available: "stock" },
      { dn: 125,  od: 138.8, lengths: "144 mm", available: "stock" },
      { dn: 160,  od: 178.1, lengths: "200 mm", available: "stock" },
      { dn: 200,  od: 218.1, lengths: "220 mm", available: "stock" },
      { dn: 250,  od: 273,   lengths: "220 mm", available: "stock" },
      { dn: 315,  od: 352.7, lengths: "255 mm", available: "stock" },
      { dn: 400,  od: 432.5, lengths: "225 mm", available: "stock" },
      { dn: 500,  od: 540.5, lengths: "255 mm", available: "stock" },
      { dn: 630,  od: 683.8, lengths: "320 mm", available: "stock" },
      { dn: 800,  od: 856,   lengths: "237 mm", available: "order" },
      { dn: 1000, od: 1066,  lengths: "330 mm", available: "order" },
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

  // Consolidated from: roto-water-tank-otw + roto-cisterna-otw + roto-water-tank-tcw + roto-plastik-tank-large
  {
    id: "roto-water-tanks",
    slug: "roto-water-tanks",
    name: "Roto Water Storage Tank",
    shortName: "Roto Tank",
    category: "civil",
    material: "HDPE",
    application: "Water Storage & Cisterns",
    description:
      "Complete range of rotationally moulded HDPE water storage tanks by Roto (North Macedonia). Four series cover every scale: OTW Barrel (square body, stackable, 60–300 L), TCW Vezake (vertical oval, 70–750 L), OTW Cisterna (round, 500–1500 L), and Plastik Tank (large-capacity, 2500–5000 L). All tanks are UV-stabilised and food-contact safe. Linking connector kits allow 5000 L tanks to be chained for higher total capacity.",
    image: "/products/catalog/roto-otw-tank.jpg",
    standards: [],
    keyProperties: {
      "Material": "Rotomoulded HDPE — UV-stabilised, food-grade",
      "OTW Barrel (square, stackable)": "60 L · 100 L · 150 L · 200 L · 300 L",
      "TCW Vezake (vertical oval)": "70 L · 100 L · 150 L · 200 L · 300 L · 500 L · 750 L",
      "OTW Cisterna (round)": "500 L · 1000 L · 1500 L",
      "Plastik Tank (large-volume)": "2500 L · 3500 L · 5000 L",
      "Connectors (5000 L)": "400×200 and 600×200 linking kits available",
    },
    dimensions: [
      { dn: 60,   lengths: "OTW Barrel 60 L (151171)",       available: "stock" },
      { dn: 70,   lengths: "TCW Vezake 70 L (152636)",        available: "stock" },
      { dn: 100,  lengths: "OTW Barrel / TCW 100 L",          available: "stock" },
      { dn: 150,  lengths: "OTW Barrel / TCW 150 L",          available: "stock" },
      { dn: 200,  lengths: "OTW Barrel / TCW 200 L",          available: "stock" },
      { dn: 300,  lengths: "OTW Barrel / TCW 300 L",          available: "stock" },
      { dn: 500,  lengths: "TCW Vezake / OTW Cisterna 500 L", available: "stock" },
      { dn: 750,  lengths: "TCW Vezake 750 L — Black (153080)", available: "stock" },
      { dn: 1000, lengths: "OTW Cisterna 1000 L (16580)",     available: "stock" },
      { dn: 1500, lengths: "OTW Cisterna 1500 L (16590)",     available: "stock" },
      { dn: 2500, lengths: "Plastik Tank 2500 L (16543)",     available: "stock" },
      { dn: 3500, lengths: "Plastik Tank 3500 L (36233)",     available: "stock" },
      { dn: 5000, lengths: "Plastik Tank 5000 L (16234)",     available: "stock" },
    ],
    tags: ["tank", "cistern", "water-storage", "HDPE", "roto"],
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "in-stock",
        stockNote: "Full range 60 L–5000 L in stock",
        diameterMin: 60,
        diameterMax: 5000,
        specificSpecs: {
          "OTW Barrel codes": "151171 · 151187 · 151175 · 151117 · 151180",
          "TCW Vezake codes": "152636 · 152640 · 152646 · 152650 · 152796 · 152794 · 153080",
          "OTW Cisterna codes": "16578 · 16580 · 16590",
          "Plastik Tank codes": "16543 · 36233 · 16234",
          "5000 L connectors": "16358 (400×200) · 16357 (600×200)",
        },
      },
    ],
  },

  {
    id: "confort-ppht-pipes",
    slug: "confort-ppht-pipes",
    name: "Confort PPHT Building Drainage Pipe & Fittings",
    shortName: "PPHT Pipe",
    category: "civil",
    material: "PP",
    application: "Internal Building Sewage & Drainage",
    description:
      "Confort sh.p.k produces two-layer PPHT pipes and fittings to EN 1329-1:2014+A1:2008 for internal sewage and waste-water drainage in civil and industrial buildings. Available in grey colour, Ø32–160 mm, in lengths of 0.25 m, 0.5 m, 1 m, 2 m, and 3 m with single or double socket. Complete range of fittings available. Manufactured in Durrës, Albania since 1995. All products in stock.",
    image: "/products/civil/ferplast-pp-h-pipe.png",
    standards: ["EN 1329-1:2014+A1:2008", "ISO 9001:2015"],
    keyProperties: {
      "Material": "PPHT (polypropylene high-temperature)",
      "Diameter Range": "Ø32 / 40 / 50 / 75 / 90 / 100 / 110 / 125 / 160 mm",
      "Lengths": "0.25 m · 0.5 m · 1 m · 2 m · 3 m",
      "Colour": "Grey",
      "Joint": "Single or double socket",
      "Origin": "Made in Albania (Durrës)",
    },
    dimensions: [
      { dn: 32,  od: 32,  lengths: "0.25–3 m", available: "stock" },
      { dn: 40,  od: 40,  lengths: "0.25–3 m", available: "stock" },
      { dn: 50,  od: 50,  lengths: "0.25–3 m", available: "stock" },
      { dn: 75,  od: 75,  lengths: "0.5–3 m",  available: "stock" },
      { dn: 90,  od: 90,  lengths: "0.5–3 m",  available: "stock" },
      { dn: 100, od: 100, lengths: "0.5–3 m",  available: "stock" },
      { dn: 110, od: 110, lengths: "0.5–3 m",  available: "stock" },
      { dn: 125, od: 125, lengths: "0.5–3 m",  available: "stock" },
      { dn: 160, od: 160, lengths: "1–3 m",    available: "stock" },
    ],
    tags: ["PPHT", "pipe", "sewage", "drainage", "confort", "albania", "EN 1329"],
    sourceUrl: "https://confort-al.com/ppht-pipes-and-fittings/",
    suppliers: [
      {
        partnerId: "confort-al",
        partnerName: "Confort sh.p.k",
        country: "Albania",
        color: "#dc2626",
        availability: "in-stock",
        stockNote: "Full range Ø32–160 mm in stock",
        diameterMin: 32,
        diameterMax: 160,
        standards: ["EN 1329-1:2014+A1:2008", "ISO 9001:2015"],
        specificSpecs: { "Origin": "Durrës, Albania (est. 1995)" },
      },
    ],
  },

  {
    id: "confort-pvc-fittings",
    slug: "confort-pvc-fittings",
    name: "Confort PVC Sewage & Drainage Fittings",
    shortName: "PVC Fittings",
    category: "civil",
    material: "PVC",
    application: "Building Sewage & Drainage Fittings",
    description:
      "Confort produces PVC fittings for high and low temperature piping systems, buried and underground sewage, and drainage systems. Certified to EN 1329-1:2014+A1:2008. Complete fitting range: elbows, tees, Y-branches, reducers, couplings, end caps. Every product from the Confort PVC fittings catalogue is available in stock. Manufactured in Durrës, Albania since 1995.",
    image: "/products/catalog/confort-pvc-sewage-fittings.jpg",
    standards: ["EN 1329-1:2014+A1:2008", "ISO 9001:2015"],
    keyProperties: {
      "Material": "PVC",
      "Diameter Range": "Ø32–160 mm",
      "Product Types": "Elbows · Tees · Y-branches · Reducers · Couplings · End caps",
      "Origin": "Made in Albania (Durrës)",
    },
    dimensions: [
      { dn: 32,  lengths: "Elbow / Tee / Y / Reducer / Cap", available: "stock" },
      { dn: 40,  lengths: "Elbow / Tee / Y / Reducer / Cap", available: "stock" },
      { dn: 50,  lengths: "Elbow / Tee / Y / Reducer / Cap", available: "stock" },
      { dn: 75,  lengths: "Elbow / Tee / Y / Reducer / Cap", available: "stock" },
      { dn: 110, lengths: "Elbow / Tee / Y / Reducer / Cap", available: "stock" },
      { dn: 160, lengths: "Elbow / Tee / Y / Reducer / Cap", available: "stock" },
    ],
    tags: ["PVC", "fittings", "sewage", "drainage", "confort", "albania", "EN 1329"],
    sourceUrl: "https://confort-al.com/pvc-fittings/",
    suppliers: [
      {
        partnerId: "confort-al",
        partnerName: "Confort sh.p.k",
        country: "Albania",
        color: "#dc2626",
        availability: "in-stock",
        stockNote: "Full PVC fitting range Ø32–160 mm in stock",
        diameterMin: 32,
        diameterMax: 160,
        standards: ["EN 1329-1:2014+A1:2008", "ISO 9001:2015"],
        specificSpecs: { "Origin": "Durrës, Albania (est. 1995)" },
      },
    ],
  },

  {
    id: "confort-ppr-pipes",
    slug: "confort-ppr-pipes",
    name: "Confort PPR Hot & Cold Water Pipe & Fittings",
    shortName: "PPR Pipe",
    category: "civil",
    material: "PP",
    application: "Hot & Cold Potable Water · Heating",
    description:
      "Polypropylene Random (PPR) pipes and fittings for hot and cold potable water, central heating, and underfloor heating systems. Ø20–63 mm. Made in Albania at Confort's Durrës facility.",
    image: "/products/catalog/confort-ppr-pipes.jpg",
    standards: ["ISO 9001:2015"],
    keyProperties: {
      "Material": "PPR (Polypropylene Random)",
      "Diameter Range": "Ø20 · 25 · 32 · 40 · 50 · 63 mm",
      "Applications": "Hot/cold potable water · Central heating · Underfloor heating",
      "Origin": "Durrës, Albania",
    },
    dimensions: [
      { dn: 20, od: 20, available: "stock" },
      { dn: 25, od: 25, available: "stock" },
      { dn: 32, od: 32, available: "stock" },
      { dn: 40, od: 40, available: "stock" },
      { dn: 50, od: 50, available: "stock" },
      { dn: 63, od: 63, available: "stock" },
    ],
    tags: ["PPR", "pipe", "water", "heating", "confort", "albania"],
    sourceUrl: "https://confort-al.com/ppr-pipes-and-fittings/",
    suppliers: [
      {
        partnerId: "confort-al",
        partnerName: "Confort sh.p.k",
        country: "Albania",
        color: "#dc2626",
        availability: "in-stock",
        stockNote: "Ø20–63 mm in stock",
        diameterMin: 20,
        diameterMax: 63,
        standards: ["ISO 9001:2015"],
        specificSpecs: { "Applications": "Hot/cold potable water · Central heating · Underfloor" },
      },
    ],
  },

  {
    id: "confort-pvc-gutters",
    slug: "confort-pvc-gutters",
    name: "Confort PVC Rectangular Gutters & Rainpipes",
    shortName: "PVC Gutters",
    category: "civil",
    material: "PVC",
    application: "Rainwater Drainage",
    description:
      "PVC rectangular gutters and downpipes for rainwater drainage. Full system including brackets, connectors, and corner pieces. Made in Albania at Confort's Durrës facility.",
    image: "",
    standards: ["ISO 9001:2015"],
    keyProperties: {
      "Material": "PVC",
      "Profile": "Rectangular",
      "System": "Gutters · Downpipes · Brackets · Connectors",
      "Origin": "Durrës, Albania",
    },
    tags: ["gutter", "PVC", "rainpipe", "confort", "albania", "drainage"],
    sourceUrl: "https://confort-al.com/rectangular-pipes-and-fittings/",
    suppliers: [
      {
        partnerId: "confort-al",
        partnerName: "Confort sh.p.k",
        country: "Albania",
        color: "#dc2626",
        availability: "in-stock",
        stockNote: "Complete gutter system in stock",
        diameterMin: 0,
        diameterMax: 0,
        standards: ["ISO 9001:2015"],
      },
    ],
  },

  {
    id: "confort-pp-manholes",
    slug: "confort-pp-manholes",
    name: "Confort PP Manholes & Inspection Sumps",
    shortName: "PP Manhole",
    category: "civil",
    material: "PP",
    application: "Underground Sewage Inspection",
    description:
      "Polypropylene manholes and inspection sumps for underground sewage systems. Made in Albania at Confort's Durrës facility. All products in stock.",
    image: "",
    standards: ["ISO 9001:2015"],
    keyProperties: {
      "Material": "PP (polypropylene)",
      "Application": "Underground sewage inspection chambers",
      "Origin": "Durrës, Albania",
    },
    tags: ["manhole", "PP", "sewage", "confort", "albania", "inspection"],
    sourceUrl: "https://confort-al.com/",
    suppliers: [
      {
        partnerId: "confort-al",
        partnerName: "Confort sh.p.k",
        country: "Albania",
        color: "#dc2626",
        availability: "in-stock",
        stockNote: "PP manholes in stock",
        diameterMin: 0,
        diameterMax: 0,
        standards: ["ISO 9001:2015"],
      },
    ],
  },

  {
    id: "xier-upvc-ball-valve",
    slug: "xier-upvc-ball-valve",
    name: "Xier UPVC Compact Ball Valve — Long Handle",
    shortName: "UPVC Ball Valve",
    category: "civil",
    material: "PVC",
    application: "Water · Irrigation · Pool Systems",
    description:
      "Xier Valve's UPVC compact ball valve (long handle series XE01007–XE01009) is a full-bore PVC valve for water supply, irrigation networks, and industrial fluid control. The compact body and long handle allow easy operation in tight spaces. UPVC construction is corrosion-free and suitable for potable water, agricultural chemicals, and mild industrial fluids. Sizes ½″ to 4″.",
    image: "/products/catalog/xier-upvc-ball-valve.webp",
    standards: ["ISO 9001"],
    keyProperties: {
      "Material": "UPVC (unplasticised PVC)",
      "Models": "XE01007 · XE01008 · XE01009",
      "Size Range": "½″–4″ (DN15–110 mm)",
      "Operation": "¼ turn, long ergonomic handle",
      "Connection": "Socket or threaded",
      "Bore": "Full bore — minimal flow restriction",
      "Applications": "Water supply · Irrigation · Pool systems",
    },
    dimensions: [
      { dn: 15,  lengths: "½″ · XE01007", available: "stock" },
      { dn: 20,  lengths: "¾″ · XE01007", available: "stock" },
      { dn: 25,  lengths: "1″ · XE01008",  available: "stock" },
      { dn: 32,  lengths: "1¼″ · XE01008", available: "stock" },
      { dn: 40,  lengths: "1½″ · XE01008", available: "stock" },
      { dn: 50,  lengths: "2″ · XE01008",  available: "stock" },
      { dn: 63,  lengths: "2½″ · XE01009", available: "stock" },
      { dn: 75,  lengths: "3″ · XE01009",  available: "stock" },
      { dn: 110, lengths: "4″ · XE01009",  available: "stock" },
    ],
    tags: ["valve", "UPVC", "ball-valve", "xier", "water", "irrigation"],
    sourceUrl: "https://www.xiervalve.com/product/upvc-compact-ball-valve/upvc-compact-ball-valve-upvc-compact-ball-valve/xe01007-xe01009-long-handle.html",
    suppliers: [
      {
        partnerId: "xier-valve",
        partnerName: "Xier Valve",
        country: "China",
        color: "#7c3aed",
        availability: "in-stock",
        stockNote: "½″–4″ in stock (XE01007–XE01009)",
        diameterMin: 15,
        diameterMax: 110,
        standards: ["ISO 9001"],
        specificSpecs: { "Operation": "Quarter-turn long handle", "Bore": "Full bore" },
      },
    ],
  },

  // ── AGRICULTURAL ──────────────────────────────────────────────────────────

  // Consolidated from: pvc-garden-hose + perplast-pvc-hose + perplast-flexoper-3
  {
    id: "perplast-pvc-hose",
    slug: "perplast-pvc-hose",
    name: "Perplast PVC Garden Hose",
    shortName: "Perplast Hose",
    category: "agri",
    material: "PVC",
    application: "Garden & Light Agriculture Watering",
    description:
      "Perplast Kompani's PVC garden hoses are manufactured at their Tetovo, North Macedonia facility from laboratory-tested premium PVC compound. The Classic model is a multi-layer construction for general garden and agricultural watering, car washing, and light cleaning. The Flexoper-3 is a three-layer reinforced variant offering improved burst pressure. In stock in ½″, ¾″, and 1″ diameters across 20–50 m roll lengths.",
    image: "/products/catalog/perplast-classic.jpg",
    standards: [],
    keyProperties: {
      "Models": "Perplast Classic (multi-layer) · Flexoper-3 (3-layer reinforced)",
      "Sizes": "½″ (13 mm) · ¾″ (19 mm) · 1″ (25 mm)",
      "Roll Lengths": "20 m · 25 m · 30 m · 50 m",
      "Max Pressure": "8 bar WP (Classic) · higher (Flexoper-3)",
      "Temperature": "−5 °C to +50 °C",
      "Origin": "Tetovo, North Macedonia",
    },
    dimensions: [
      { dn: 13, lengths: "Classic & Flexoper-3 — 20 / 25 / 30 / 50 m", available: "stock" },
      { dn: 19, lengths: "Classic — 20 / 25 / 50 m",                   available: "stock" },
      { dn: 25, lengths: "Classic — 25 / 50 m",                        available: "stock" },
    ],
    tags: ["hose", "garden", "PVC", "perplast", "classic", "flexoper"],
    sourceUrl: "https://perplastkompani.com/",
    suppliers: [
      {
        partnerId: "perplast",
        partnerName: "Perplast Kompani",
        country: "North Macedonia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "Classic & Flexoper-3 in stock — ½″, ¾″, 1″",
        diameterMin: 13,
        diameterMax: 25,
        specificSpecs: {
          "Perplast Classic": "½″ · ¾″ · 1″ in 20 / 25 / 30 / 50 m rolls",
          "Flexoper-3": "½″ in 20 m · 25 m · 50 m rolls — 3-layer reinforced PVC",
        },
      },
    ],
  },

  // Consolidated from: palaplast-hdpe100-irrigation + palaplast-ldpe-pipe-6atm
  //                    + palaplast-hdpe-pipe-6atm + palaplast-hdpe-pipe-10atm
  {
    id: "palaplast-hdpe100-irrigation",
    slug: "palaplast-hdpe100-irrigation",
    name: "Palaplast Irrigation Pipe",
    shortName: "Palaplast Irrigation",
    category: "agri",
    material: "HDPE PE100 / LDPE",
    application: "Pressurised Irrigation Mainline",
    description:
      "Palaplast's irrigation pipe range covers the full spectrum from flexible LDPE sub-laterals to PE100 mainlines. LDPE pipes (Ø20–32 mm, 6 ATM) are sold by the metre for easy field layout. HDPE pipes cover Ø16–160 mm at 6 ATM and Ø20–110 mm at 10 ATM, with full PE100 PN4–PN16 compliance for primary distribution networks. All material manufactured to EN 12201-2 with ISO 9001 certification. Over 4500 catalogue SKUs from Palaplast's Greek production facility.",
    image: "/products/catalog/palaplast-hydropal-hdpe-pipe.jpg",
    standards: ["EN 12201-2", "ISO 9001"],
    keyProperties: {
      "LDPE (6 ATM)": "Ø20 · 25 · 32 mm — sold per metre",
      "HDPE (6 ATM)": "Ø40–110 mm — sold per metre",
      "HDPE (10 ATM)": "Ø20–75 mm — sold per metre",
      "HDPE PE100 (PN4–PN16)": "Ø16–160 mm — coils ≤Ø63 mm / bars Ø75+",
      "Colour": "Black with blue stripe (potable-water compliant)",
      "UV Stabilised": "Yes — rated for exposed above-ground installation",
      "Compatible Fittings": "Palaplast compression, butt-fusion, Rekorder",
    },
    dimensions: [
      { dn: 16,  od: 16,  wallByClass: { "PN10": 1.6 }, available: "stock" },
      { dn: 20,  od: 20,  wallByClass: { "6 ATM LDPE": 1.4, "10 ATM": 2.0, "PN10": 2.0, "PN16": 2.3 }, available: "stock" },
      { dn: 25,  od: 25,  wallByClass: { "6 ATM LDPE": 1.6, "10 ATM": 2.0, "PN10": 2.0, "PN16": 2.3 }, available: "stock" },
      { dn: 32,  od: 32,  wallByClass: { "6 ATM LDPE": 1.9, "10 ATM": 2.0, "PN10": 2.0, "PN16": 3.0 }, available: "stock" },
      { dn: 40,  od: 40,  wallByClass: { "6 ATM": 2.0, "10 ATM": 2.4, "PN10": 2.4, "PN16": 3.7 }, available: "stock" },
      { dn: 50,  od: 50,  wallByClass: { "6 ATM": 2.0, "10 ATM": 3.0, "PN10": 3.0, "PN16": 4.6 }, available: "stock" },
      { dn: 63,  od: 63,  wallByClass: { "6 ATM": 2.5, "PN10": 3.8, "PN16": 5.8 }, available: "stock" },
      { dn: 75,  od: 75,  wallByClass: { "6 ATM": 2.9, "10 ATM": 4.5, "PN10": 4.5, "PN16": 6.8 }, available: "partial" },
      { dn: 90,  od: 90,  wallByClass: { "6 ATM": 3.5, "PN10": 5.4, "PN16": 8.2 }, available: "partial" },
      { dn: 110, od: 110, wallByClass: { "6 ATM": 4.3, "10 ATM": 6.6, "PN10": 6.6, "PN16": 10.0 }, available: "partial" },
      { dn: 125, od: 125, wallByClass: { "PN10": 7.4 }, available: "order" },
      { dn: 160, od: 160, wallByClass: { "PN10": 9.5 }, available: "order" },
    ],
    tags: ["irrigation", "PE100", "LDPE", "Palaplast", "agriculture", "EN 12201-2"],
    sourceUrl: "https://palaplast.com/product-category/irrigation-en/irrigation-pipes-en",
    suppliers: [
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        country: "Greece",
        color: "#84cc16",
        availability: "partial",
        stockNote: "Ø16–63 mm coil & bars in stock across all pressure classes",
        orderNote: "Ø75+ on order",
        diameterMin: 16,
        diameterMax: 160,
        pressureClasses: ["6 ATM", "10 ATM", "PN4", "PN6", "PN10", "PN16"],
        standards: ["EN 12201-2", "ISO 9001"],
        specificSpecs: {
          "Manufacturing": "Greek production · 4500+ SKUs",
          "Sale form": "Per metre (LDPE/HDPE 6 & 10 ATM) · Coils/bars (PE100)",
        },
      },
    ],
  },

  // Enhanced from: palaplast-compression-fittings + palaplast-rekorder-10atm merged
  {
    id: "palaplast-compression-fittings",
    slug: "palaplast-compression-fittings",
    name: "Palaplast Compression Fittings",
    shortName: "PE Compression Fittings",
    category: "agri",
    material: "Polypropylene",
    application: "Tool-Free PE Pipe Jointing",
    description:
      "Palaplast's PN10 ATM compression fittings (Rekorder series) are manufactured from high-quality polypropylene for reliable tool-free connections to PE and LDPE irrigation pipes. The full range covers Ø16–110 mm and includes couplings, elbows, tees, end-caps, reducers, and saddles. Rekorder male elbows (Brryl Mashkull), female elbows (Brryl Femer), equal tees (Tija), and reducing tees (Tija Red Mashkull) complete the jointing system. A PN16 ATM series is also available for higher-pressure applications.",
    image: "/products/catalog/palaplast-compression-fitting.webp",
    standards: ["ISO 9001"],
    keyProperties: {
      "Material": "Polypropylene (PP)",
      "Diameter Range": "Ø16–110 mm",
      "Working Pressure": "PN10 ATM (PN16 series available)",
      "Connection": "Compression — tool-free",
      "Pipe Compatibility": "PE100 · HDPE80 · LDPE",
      "Range": "Couplings · Elbows · Tees · End-caps · Reducers · Saddles",
      "Rekorder Elbows (Brryl Mashkull)": "Ø50–90 mm with BSP male thread",
      "Rekorder Tee (Tija)": "Ø20–110 mm equal tee",
      "Certification": "ISO 9001",
    },
    tags: ["fittings", "compression", "PE", "Palaplast", "irrigation", "rekorder"],
    sourceUrl: "https://palaplast.com/product-category/irrigation-en/irrigation-fittings/compression-en",
    suppliers: [
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        country: "Greece",
        color: "#84cc16",
        availability: "in-stock",
        stockNote: "Full range Ø16–110 mm in stock",
        diameterMin: 16,
        diameterMax: 110,
        standards: ["ISO 9001"],
        specificSpecs: {
          "Pressure Series": "PN10 standard · PN16 available",
          "Brryl Mashkull (male elbow)": "50-1½″ · 50-2″ · 63-1½″ · 63-2″ · 75-2½″ · 90-3″",
          "Brryl Femer (female elbow)": "75-2½″ · 90-3″ · 110-4″",
          "Tija (equal tee)": "Ø20–110 mm",
          "Tija Red Mashkull (reducing tee)": "25-20 · 32-25",
        },
      },
    ],
  },

  {
    id: "palaplast-end-caps-joiners",
    slug: "palaplast-end-caps-joiners",
    name: "Palaplast End Caps, Pipe Joiners & Drip Emitters",
    shortName: "Caps · Joiners · Emitters",
    category: "agri",
    material: "PP",
    application: "Irrigation Accessories",
    description:
      "Palaplast irrigation accessories: pipe end caps (TAPA) ½″–4″, pipe joiners / couplings (BASHKUESE KALLAM) Ø16–32 mm, and drip emitters (LOTUESE) in red (Ø70 L/h), green (Ø100 L/h), and black (Ø150 L/h) flow ratings. All in stock.",
    image: "/products/catalog/palaplast-compression-fitting.webp",
    standards: [],
    keyProperties: {
      "Material": "Polypropylene (PP)",
      "End Caps (Tapa)": "½″ · ¾″ · 1″ · 1¼″ · 1½″ · 2″ · 2½″ · 3″ · 4″",
      "Joiners (Bashkuese Kallam)": "Ø16 · 20 · 25 · 32 mm",
      "Drip Emitters (Lotuese)": "Ø70 (Red) · Ø100 (Green) · Ø150 (Black)",
    },
    dimensions: [
      { dn: 16, lengths: "Bashkuese · Lotuese", available: "stock" },
      { dn: 20, lengths: "Bashkuese · Tapa",    available: "stock" },
      { dn: 25, lengths: "Bashkuese · Tapa",    available: "stock" },
      { dn: 32, lengths: "Bashkuese · Tapa",    available: "stock" },
      { dn: 50, lengths: "Tapa",                available: "stock" },
      { dn: 75, lengths: "Tapa · Lotuese",      available: "stock" },
    ],
    tags: ["fittings", "endcaps", "joiners", "drippers", "palaplast", "irrigation"],
    sourceUrl: "https://palaplast.com/",
    suppliers: [
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        country: "Greece",
        color: "#84cc16",
        availability: "in-stock",
        stockNote: "Full range in stock",
        diameterMin: 16,
        diameterMax: 110,
        standards: [],
        specificSpecs: {
          "Tapa sizes": "½″–4″",
          "Bashkuese Kallam": "Ø16 / 20 / 25 / 32 mm",
          "Lotuese (drippers)": "Red Ø70 · Green Ø100 · Black Ø150",
        },
      },
    ],
  },

  {
    id: "palaplast-saracineska-valve",
    slug: "palaplast-saracineska-valve",
    name: "Palaplast Plastic Stopcock (Saracineska)",
    shortName: "Saracineska Valve",
    category: "agri",
    material: "PP",
    application: "Irrigation Inline Shut-Off",
    description:
      "Plastic inline stopcock valves (Saracineska) for PE and LDPE irrigation pipes. Types include standard SARACINESKA KALLAM, A&K (blue), Pipet 3158, Plote 3162, and Komplete with full pipe-fittings package. Sizes 16, 20, and 25 mm.",
    image: "",
    standards: [],
    keyProperties: {
      "Material": "Polypropylene (PP)",
      "Sizes": "16 mm · 20 mm · 25 mm",
      "Variants": "Saracineska Kallam · Pipet (Kod 3158) · A&K (Blu) · Plote (3162) · Komplete (31672020 / 31672525)",
      "Operation": "Inline shut-off (¼-turn handle)",
    },
    dimensions: [
      { dn: 16, lengths: "Kallam · Pipet · A&K · Plote", available: "stock" },
      { dn: 20, lengths: "Kallam · Pipet · Plote · Komplete", available: "stock" },
      { dn: 25, lengths: "Kallam · Komplete", available: "stock" },
    ],
    tags: ["valve", "stopcock", "saracineska", "palaplast", "irrigation"],
    suppliers: [
      {
        partnerId: "palaplast",
        partnerName: "Palaplast",
        country: "Greece",
        color: "#84cc16",
        availability: "in-stock",
        stockNote: "16 / 20 / 25 mm variants in stock",
        diameterMin: 16,
        diameterMax: 25,
        specificSpecs: {
          "Codes": "3158 (Pipet) · 3162 (Plote) · 31672020 / 31672525 (Komplete)",
        },
      },
    ],
  },

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
    image: "/products/catalog/palaplast-hydrocyclonic-filter.jpg",
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
    sourceUrl: "https://palaplast.com/product-category/irrigation-en/irrigation-fittings/filters-en",
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
          "Inlet Threads": "BSP",
          "Source": "palaplast.com/product-category/irrigation-en/irrigation-fittings/filters-en",
        },
      },
    ],
  },

  // Enhanced consolidated entry — replaces 7 individual Roto planter product entries
  {
    id: "decorative-plastic-planters",
    slug: "decorative-plastic-planters",
    name: "Decorative Plastic Planters",
    shortName: "Planters",
    category: "agri",
    material: "Rotomoulded PP",
    application: "Landscaping & Outdoor Décor",
    description:
      "A complete catalogue of designer plastic planters and garden ornaments by Roto (North Macedonia). Style families include: Edelweis (stone-texture rectangular / oval / round / wall-murale), Stoniness (round textured stone, S–XL), Jazz (sleek round vase, S–L), Rumba (wide-mouth round, S–L), Barrel (single and S–XXL sized), Nusa (ribbed rectangular), Tulip (S / L / XL), and a broad novelty range covering Shoe, Elephant, Sack, Vase, Margerita, Bell, Amphora, Snail, Swan, Donkey, Carriage, and Sea Girl. All supplied in UV-stabilised rotomoulded polypropylene for long outdoor use. Watering cans and matching wall-mount units available.",
    image: "",
    standards: [],
    keyProperties: {
      "Material": "UV-stabilised rotomoulded PP",
      "Style Families": "Edelweis · Stoniness · Jazz · Rumba · Barrel · Nusa · Tulip · Novelty range",
      "Size Range": "S · M · L · XL · XXL (style-dependent)",
      "Wall Mount": "Available in Edelweis Murale",
      "Watering Cans": "Available",
      "Novelty Range": "Shoe · Elephant · Sack · Vase · Margerita · Bell · Amphora · Snail · Swan · Donkey · Carriage · Sea Girl",
    },
    tags: ["planter", "decorative", "garden", "landscaping", "roto"],
    sourceUrl: "https://shop-roto.eu/shop/",
    suppliers: [
      {
        partnerId: "roto",
        partnerName: "Roto",
        country: "North Macedonia",
        color: "#14b8a6",
        availability: "partial",
        stockNote: "Most style families stocked across key sizes",
        orderNote: "Full ranges and bulk orders shipped on request",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Edelweis": "16138 (S) · 16139 (L) · 16199 (XL) · 16198 (Ovale) · 16113 (Round S) · 16154 (Round M) · 16035 (Wall-Murale)",
          "Stoniness": "16144 (S) · 16143 (M) · 16142 (L) · 16159 (XL)",
          "Jazz": "16687 (S Ø300) · 16686 (M Ø490) · 16688 (L Ø500)",
          "Rumba": "16680 (S) · 16679 (M) · 16681 (L)",
          "Barrel": "16140 · 16167 (S) · 16168 (M) · 16169 (L) · 16663 (XL) · 16664 (XXL)",
          "Nusa": "16160 (Squareds S) · 16030 (S) · 16076 (XL) · 16014 (Round)",
          "Novelty codes": "16032 · 16036 · 16666 · 16015 · 16103 · 16149 · 16000 · 16053 · 16085–87 · 16060–62 · 16108",
          "Catalogue": "Roto General Offer 2022",
        },
      },
    ],
  },

  // Kept as the authoritative sprayer entry — duplicate manual-sprayer-pump removed
  {
    id: "polins-manual-sprayer",
    slug: "polins-manual-sprayer",
    name: "Polins Manual Garden Sprayer",
    shortName: "Manual Sprayer Range",
    category: "agri",
    material: "HDPE / PP",
    application: "Plant Treatment & Spraying",
    description:
      "Polins doo manufactures a complete range of manual pump-action garden sprayers (Pompe Sperkatje). All models feature an HDPE tank, a manual piston pump with safety pressure-relief valve, carry strap, spray hose, trigger handle, and lance extension. The Clear variant (2 L) has a transparent tank for easy liquid level monitoring. All models are suitable for water-soluble herbicides, insecticides, fungicides, and liquid plant nutrition products.",
    image: "",
    standards: [],
    keyProperties: {
      "Manufacturer": "Polins doo, Odžaci, Serbia (est. 1996)",
      "Capacity Range": "1 L · 1.5 L · 2 L · 2.5 L · 5 L · 10 L · 12 L · 16 L",
      "Tank Material": "HDPE",
      "Pump Type": "Manual piston with safety pressure-relief valve",
      "Clear Variant": "2 L transparent tank for level monitoring",
      "Package": "Tank + pump · Carry strap · Spray hose · Trigger handle · Lance",
      "Application": "Herbicides · Insecticides · Fungicides · Liquid fertilisers",
    },
    dimensions: [
      { dn: 1,  lengths: "1 L",       available: "stock" },
      { dn: 2,  lengths: "1.5 L",     available: "stock" },
      { dn: 3,  lengths: "2 L",       available: "stock" },
      { dn: 4,  lengths: "2 L Clear", available: "stock" },
      { dn: 5,  lengths: "5 L",       available: "stock" },
      { dn: 10, lengths: "10 L",      available: "stock" },
      { dn: 12, lengths: "12 L",      available: "stock" },
      { dn: 16, lengths: "16 L",      available: "stock" },
    ],
    tags: ["sprayer", "polins", "manual", "agriculture", "treatment"],
    sourceUrl: "https://polins.co.rs/products/sprayers/?lang=en",
    suppliers: [
      {
        partnerId: "polins",
        partnerName: "Polins",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "Full range 1 L–16 L in stock",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Variants": "1 L · 1.5 L · 2 L · 2 L Clear · 5 L · 10 L · 12 L · 16 L",
        },
      },
    ],
  },

  // Kept as the authoritative battery sprayer entry — duplicate polins-electra-lux-16 removed
  {
    id: "polins-battery-sprayer-electra-lux",
    slug: "polins-battery-sprayer-electra-lux",
    name: "Polins Battery Sprayer Electra Lux",
    shortName: "Electra Lux",
    category: "agri",
    material: "HDPE",
    application: "Battery-Powered Agricultural Spraying",
    description:
      "The Polins Electra Lux 16 is a 16-litre battery-powered back sprayer for semi-professional use across larger agricultural plots and orchards. A rechargeable lithium-ion battery drives an electric pump that delivers consistent spray pressure through the lance — eliminating the physical effort of manual pumping. Pressure is adjustable via a potentiometer for fine fog to coarser jet patterns. Designed exclusively for water-soluble plant-care agents.",
    image: "/products/catalog/polins-electra-battery.jpg",
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
    tags: ["sprayer", "polins", "battery", "electric", "agriculture", "electra"],
    sourceUrl: "https://polins.co.rs/products/sprayers/back-sprayer-electra-lux-16",
    suppliers: [
      {
        partnerId: "polins",
        partnerName: "Polins",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "Electra Lux 16 L in stock",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "Battery": "Rechargeable Li-ion · ≈300 cycles to 50% capacity",
        },
      },
    ],
  },

  {
    id: "polins-water-trough",
    slug: "polins-water-trough",
    name: "Polins Livestock Water Trough",
    shortName: "Water Trough",
    category: "agri",
    material: "HDPE",
    application: "Poultry & Livestock Watering",
    description:
      "Polins doo manufactures durable HDPE livestock water troughs (Vaska Uji per Pula) designed for poultry and small livestock. Available as open round troughs and as troughs with integrated water-bottle holders. Sizes: 200 mm, 250 mm, and 340 mm diameter.",
    image: "/products/catalog/polins-water-trough.jpg",
    standards: [],
    keyProperties: {
      "Material": "HDPE — UV-stable, food-grade",
      "Sizes": "Ø200 mm · Ø250 mm · Ø340 mm",
      "Variants": "Open round trough · With bottle holder (me Bidon)",
      "Application": "Poultry · Small livestock · Hobby farming",
    },
    dimensions: [
      { dn: 200, lengths: "Ø200 mm round", available: "stock" },
      { dn: 250, lengths: "Ø250 mm round", available: "stock" },
      { dn: 340, lengths: "Ø340 mm round", available: "stock" },
    ],
    tags: ["trough", "livestock", "poultry", "polins", "agriculture"],
    suppliers: [
      {
        partnerId: "polins",
        partnerName: "Polins",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "All sizes in stock",
        diameterMin: 200,
        diameterMax: 340,
        specificSpecs: { "Models": "Vaska Uji per Pula · Vaska Uji per Pula me Bidon" },
      },
    ],
  },

  {
    id: "polins-feed-trough",
    slug: "polins-feed-trough",
    name: "Polins Livestock Feed Trough",
    shortName: "Feed Trough",
    category: "agri",
    material: "PP",
    application: "Poultry & Livestock Feeding",
    description:
      "Polins doo manufactures polypropylene feed troughs (Vaska Ushqyese per Pula) for poultry and small livestock. Robust PP construction is easy to clean and resistant to feed acids. Available in four sizes from 200 mm to 445 mm.",
    image: "/products/catalog/polins-feed-trough.jpg",
    standards: [],
    keyProperties: {
      "Material": "Polypropylene — feed-acid resistant",
      "Sizes": "200 mm · 250 mm · 400 mm · 445 mm",
      "Application": "Poultry · Small livestock",
    },
    dimensions: [
      { dn: 200, lengths: "200 mm", available: "stock" },
      { dn: 250, lengths: "250 mm", available: "stock" },
      { dn: 400, lengths: "400 mm", available: "stock" },
      { dn: 445, lengths: "445 mm", available: "stock" },
    ],
    tags: ["trough", "feed", "livestock", "poultry", "polins"],
    suppliers: [
      {
        partnerId: "polins",
        partnerName: "Polins",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "All sizes in stock",
        diameterMin: 200,
        diameterMax: 445,
        specificSpecs: { "Model": "Vaska Ushqyese per Pula" },
      },
    ],
  },

  {
    id: "polins-milk-canister",
    slug: "polins-milk-canister",
    name: "Polins Food-Grade Milk & Honey Canister",
    shortName: "Milk Canister",
    category: "agri",
    material: "HDPE",
    application: "Milk · Honey · Food Liquid Storage",
    description:
      "Polins doo food-grade HDPE canisters (Bidon Mjalt + Qumesht) for safe storage of milk, honey, and food liquids on small farms and in dairy operations. Available in 5 L, 10 L, 15 L, and 20 L capacities with sealing lid.",
    image: "",
    standards: [],
    keyProperties: {
      "Material": "Food-grade HDPE",
      "Capacities": "5 L · 10 L · 15 L · 20 L",
      "Closure": "Sealing lid",
      "Application": "Milk · Honey · Food liquids",
    },
    dimensions: [
      { dn: 5,  lengths: "5 L",  available: "stock" },
      { dn: 10, lengths: "10 L", available: "stock" },
      { dn: 15, lengths: "15 L", available: "stock" },
      { dn: 20, lengths: "20 L", available: "stock" },
    ],
    tags: ["canister", "milk", "honey", "food", "polins", "HDPE"],
    suppliers: [
      {
        partnerId: "polins",
        partnerName: "Polins",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "5 L · 10 L · 15 L · 20 L in stock",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: { "Model": "Bidon Mjalt + Qumesht Polins" },
      },
    ],
  },

  {
    id: "polins-water-canister",
    slug: "polins-water-canister",
    name: "Polins HDPE Water Canister",
    shortName: "Water Canister",
    category: "agri",
    material: "HDPE",
    application: "Drinking Water Storage & Transport",
    description:
      "HDPE water storage canisters (Bidon Uji) for drinking water and general purpose liquid storage. Available in 10 L and 20 L capacities. Stackable design with sealing cap.",
    image: "",
    standards: [],
    keyProperties: {
      "Material": "HDPE — food-grade",
      "Capacities": "10 L · 20 L",
      "Application": "Drinking water · General liquid storage",
    },
    dimensions: [
      { dn: 10, lengths: "10 L", available: "stock" },
      { dn: 20, lengths: "20 L", available: "stock" },
    ],
    tags: ["canister", "water", "polins", "HDPE", "storage"],
    suppliers: [
      {
        partnerId: "polins",
        partnerName: "Polins",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "10 L and 20 L in stock",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: { "Model": "Bidon Uji Polins" },
      },
    ],
  },

  // Consolidated from: plastika-nv-agri-film-2yr-50kg + plastika-nv-agri-film-2yr-60kg
  //                    + plastika-nv-agri-film-2yr-6m + plastika-nv-white-film
  {
    id: "plastika-nv-agri-film",
    slug: "plastika-nv-agri-film",
    name: "Plastika NV Agricultural PE Film",
    shortName: "Agri PE Film",
    category: "agri",
    material: "LDPE",
    application: "Greenhouse Cover & Mulching",
    description:
      "2-year UV-stabilised agricultural polyethylene film manufactured at Plastika DOO Nova Varoš (Serbia) using in-house recycled PE at a solar-powered facility. Available in black rolls (4 m × 100 m at 50 kg or 60 kg, and extra-wide 6.3 m × 100 m at 60 kg) for greenhouse covering, and white reflective rolls (4 m × 100 m at 30 / 40 / 50 kg) for mulching and under-canopy light improvement.",
    image: "/products/agri/plastika-greenhouse-film.jpg",
    standards: [],
    keyProperties: {
      "Material": "LDPE — 2-year UV-stabilised",
      "Black rolls (4 m × 100 m)": "50 kg and 60 kg per roll",
      "Black rolls (6.3 m × 100 m)": "60 kg per roll — fewer joints in wide tunnels",
      "White rolls (4 m × 100 m)": "30 kg · 40 kg · 50 kg — reflective surface",
      "Application": "Greenhouse cover · Ground mulching · Protected-crop production",
      "Production": "Solar-powered facility with in-house PE recycling",
    },
    dimensions: [
      { dn: 4000, lengths: "Black 4 m × 100 m · 50 kg",  available: "stock" },
      { dn: 4001, lengths: "Black 4 m × 100 m · 60 kg",  available: "stock" },
      { dn: 6300, lengths: "Black 6.3 m × 100 m · 60 kg", available: "stock" },
      { dn: 4002, lengths: "White 4 m × 100 m · 30 kg",  available: "stock" },
      { dn: 4003, lengths: "White 4 m × 100 m · 40 kg",  available: "stock" },
      { dn: 4004, lengths: "White 4 m × 100 m · 50 kg",  available: "stock" },
    ],
    tags: ["film", "PE", "agricultural", "plastika-nv", "greenhouse", "mulch"],
    suppliers: [
      {
        partnerId: "plastika-nv",
        partnerName: "Plastika DOO Nova Varoš",
        country: "Serbia",
        color: "#64748b",
        availability: "in-stock",
        stockNote: "All variants in stock",
        diameterMin: 0,
        diameterMax: 0,
        specificSpecs: {
          "UV Life": "2 years",
          "Facility": "Solar-powered · In-house PE recycling",
          "Black options": "4 m × 50 kg · 4 m × 60 kg · 6.3 m × 60 kg",
          "White options": "4 m × 30 kg · 4 m × 40 kg · 4 m × 50 kg",
        },
      },
    ],
  },

  // ── INDUSTRIAL ────────────────────────────────────────────────────────────

  // Consolidated from: spiral-transparent-hose + sel-troy-green-spiral-hose + sel-caramel-garden-hose
  {
    id: "sel-polimer-pvc-hoses",
    slug: "sel-polimer-pvc-hoses",
    name: "SEL-Polimer PVC Hose Range",
    shortName: "SEL Hoses",
    category: "industrial",
    material: "PVC",
    application: "Garden · Agriculture · Industrial Fluid Transfer",
    description:
      "SEL-Polimer (distributed via Hidrotek Hortum, Turkey) supplies a complete PVC hose portfolio for garden, agricultural, and industrial use. The Troy ST range is a clear/transparent PVC spiral suction hose with rigid helix reinforcement for vacuum-rated fluid transfer (Ø19–120 mm). The Troy Green is the same spiral construction in green for agricultural irrigation and chemical handling. The Caramel is a flexible orange garden hose for hobby and general use (½″–1″). All three types are in stock.",
    image: "/products/catalog/sel-troy-spiral.jpg",
    standards: [],
    keyProperties: {
      "Troy ST (Clear Spiral)": "Ø13–120 mm · transparent PVC · vacuum rated · full/coil lengths",
      "Troy Green Spiral": "Ø19–120 mm · green PVC spiral · suction/delivery · agricultural",
      "Caramel Garden Hose": "Ø13 / 19 / 25 mm (½″ / ¾″ / 1″) · flexible orange PVC",
      "Construction": "Smooth inner PVC + rigid PVC helix spiral (Troy series)",
      "Vacuum Rating": "Yes — spiral prevents collapse under suction",
      "Temperature": "−10 °C to +60 °C",
    },
    dimensions: [
      { dn: 13,  lengths: "½″ — Caramel (per m / 50 m coil)", available: "stock" },
      { dn: 19,  lengths: "¾″ / Ø19 — Caramel & Troy Green (per m / coil)", available: "stock" },
      { dn: 25,  lengths: "1″ / Ø25 — Caramel & Troy (per m / coil)", available: "stock" },
      { dn: 32,  lengths: "Ø32 — Troy ST & Green (25 m coil)", available: "partial" },
      { dn: 50,  lengths: "Ø50 — Troy ST & Green (25 m coil)", available: "partial" },
      { dn: 75,  lengths: "Ø75 — Troy (cut lengths)",           available: "order" },
      { dn: 100, lengths: "Ø100 — Troy (cut lengths)",          available: "order" },
      { dn: 120, lengths: "Ø120 — Troy (cut lengths)",          available: "order" },
    ],
    tags: ["hose", "spiral", "PVC", "sel-polimer", "garden", "suction", "caramel", "transparent"],
    sourceUrl: "https://hidrotekhortum.com.tr/en/",
    suppliers: [
      {
        partnerId: "sel-polimer",
        partnerName: "SEL-Polimer",
        country: "Turkey",
        color: "#f59e0b",
        availability: "partial",
        stockNote: "Troy ST & Green (Ø19–120 mm) in stock; Caramel ½″/¾″/1″ in stock",
        orderNote: "Ø75+ cut lengths on order",
        diameterMin: 13,
        diameterMax: 120,
        specificSpecs: {
          "Troy ST": "Clear spiral · Ø13–120 mm — vacuum/suction rated",
          "Troy Green": "Green spiral · Ø19–120 mm — agriculture & chemicals",
          "Caramel": "Orange garden hose · ½″ · ¾″ · 1″",
          "Founded": "1957",
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
