export const company = {
  name: "Sukaj SHPK",
  established: 1995,
  capital: "74,482,766 ALL",
  location: "Shkodër, Albania",
  administrator: "Musli Sukaj",
  activity: "Import-export of plastic materials & wholesale trading",
  tagline: "Industrial plastic pipe systems — imported and distributed across the Balkans since 1995.",
  description:
    "Founded in 1995, Sukaj SHPK is an import-export and wholesale trading company headquartered in the Shkodër area. We supply complete pipe-system solutions for civil drainage, agricultural irrigation, and industrial routing projects, combining European manufacturing partnerships with regional logistics expertise.",
  stats: {
    yearsExperience: 30,
    countriesServed: 12,
    projectsCompleted: 2500,
    partnersCount: 12,
  },
};

export type PartnerType =
  | "manufacturer"
  | "recycler"
  | "packaging"
  | "hoses"
  | "local-albania";

export interface Partner {
  id: string;
  name: string;
  country: string;
  specialty: string;
  tagline: string;
  maxDiameter?: string;
  factorySize?: string;
  description: string;
  website: string;
  partnerType: PartnerType;
  keyStandards: string[];
  heroMetrics: string[];
  logo: { light?: string; dark?: string };
  featuredPriority: number;
  products: { name: string; type: string; diameters: string }[];
  featured: boolean;
  color: string;
}

export const partners: Partner[] = [
  {
    id: "konti-hidroplast",
    name: "Konti Hidroplast",
    country: "North Macedonia",
    specialty: "PE/PP Pipe Producer — Spiral & Solid Wall",
    tagline: "Export-oriented pipe manufacturing since 1975",
    maxDiameter: "Ø 2000 mm",
    description:
      "Founded in 1975, Konti Hidroplast is one of the region's largest PE/PP pipe producers. Their spiral-wound sewage pipes reach diameters up to 2000 mm, serving export markets across Southeast Europe.",
    website: "https://konti-hidroplast.com.mk",
    partnerType: "manufacturer",
    keyStandards: ["EN 13476", "EN 12201"],
    heroMetrics: ["Ø up to 2000 mm", "95 % export", "Est. 1975"],
    logo: { dark: "/partners/konti-hidroplast/logo.svg" },
    featuredPriority: 1,
    products: [
      { name: "Spiral Sewage Pipe", type: "PP Spiral", diameters: "300–2000 mm" },
      { name: "Solid Wall PE Pipe", type: "PE100", diameters: "20–630 mm" },
    ],
    featured: true,
    color: "#f97316",
  },
  {
    id: "ferplast-ks",
    name: "Ferplast",
    country: "Kosovo",
    specialty: "Corrugated HDPE Pipes SN4/SN8",
    tagline: "Corrugated pipe specialist since 1996",
    maxDiameter: "ID 2000 mm",
    description:
      "Founded in 1996, Ferplast produces corrugated HDPE pipes in SN4 and SN8 stiffness classes with outer/inner diameter ranges up to ID 2000, plus additional pipe categories for infrastructure.",
    website: "https://ferplast-ks.com",
    partnerType: "manufacturer",
    keyStandards: ["EN 13476", "SN4", "SN8"],
    heroMetrics: ["ID up to 2000 mm", "SN4 / SN8", "Est. 1996"],
    logo: { dark: "/partners/ferplast-ks/logo.svg" },
    featuredPriority: 2,
    products: [
      { name: "Corrugated HDPE SN4", type: "HDPE Corrugated", diameters: "100–2000 mm" },
      { name: "Corrugated HDPE SN8", type: "HDPE Corrugated", diameters: "100–1200 mm" },
    ],
    featured: true,
    color: "#a855f7",
  },
  {
    id: "teqja",
    name: "Teqja International",
    country: "Albania",
    specialty: "HDPE 100 & Corrugated Pipe Manufacturer",
    tagline: "Albanian manufacturer with ISO certification",
    maxDiameter: "Ø 630 mm",
    description:
      "Teqja International manufactures HDPE 100 pipes from 20–630 mm (PN4–PN32) and corrugated pipes per EN 13476-1:2018 in 12 m lengths. ISO-certified production for water and sewage networks.",
    website: "https://teqja.com.al",
    partnerType: "local-albania",
    keyStandards: ["EN 13476-1:2018", "ISO 9001", "HDPE PE100"],
    heroMetrics: ["Ø 20–630 mm", "PN4–PN32", "12 m lengths"],
    logo: { dark: "/partners/teqja/logo.svg" },
    featuredPriority: 3,
    products: [
      { name: "HDPE 100 Pressure Pipe", type: "HDPE PE100", diameters: "20–630 mm" },
      { name: "Corrugated Sewage Pipe", type: "HDPE Corrugated", diameters: "150–630 mm" },
    ],
    featured: true,
    color: "#ef4444",
  },
  {
    id: "fitt",
    name: "FITT",
    country: "Italy",
    specialty: "Technical Hoses & Garden Systems",
    tagline: "Italian hose engineering for every application",
    maxDiameter: "Ø 100 mm",
    description:
      "FITT is a leading Italian manufacturer of thermoplastic hoses for garden, industrial, and water-supply applications. Key product lines include FITT Force, FITT Mint, and FITT Mimosa.",
    website: "https://fitt.com",
    partnerType: "hoses",
    keyStandards: ["EN ISO 1307", "REACH"],
    heroMetrics: ["3 flagship lines", "Global distribution", "Made in Italy"],
    logo: { dark: "/partners/fitt/logo.svg" },
    featuredPriority: 4,
    products: [
      { name: "FITT Force", type: "Reinforced PVC Hose", diameters: "12–50 mm" },
      { name: "FITT Mint", type: "Garden Hose", diameters: "12–25 mm" },
      { name: "FITT Mimosa", type: "Lightweight Hose", diameters: "12–19 mm" },
    ],
    featured: true,
    color: "#22d3ee",
  },
  {
    id: "plastika-ks",
    name: "PLASTIKA",
    country: "Kosovo",
    specialty: "Recycling → Granulates → Agricultural & Construction Foils",
    tagline: "Circular-economy plastics for agriculture & construction",
    description:
      "PLASTIKA processes recycled plastics into granulates and produces agricultural and construction foils, contributing to the circular economy in the Balkans.",
    website: "https://plastika-ks.com/en",
    partnerType: "recycler",
    keyStandards: ["ISO 14001"],
    heroMetrics: ["Recycled granulates", "Agri & construction foils"],
    logo: { dark: "/partners/plastika-ks/logo.svg" },
    featuredPriority: 5,
    products: [
      { name: "Recycled Granulates", type: "HDPE/LDPE Granulate", diameters: "N/A" },
      { name: "Agricultural Film", type: "PE Film", diameters: "N/A" },
    ],
    featured: true,
    color: "#22c55e",
  },
  {
    id: "assos-viokon",
    name: "ASSOS-VIOKON",
    country: "Greece",
    specialty: "Plastic Food Packaging — Barrels & Accessories",
    tagline: "Greek packaging specialist for food & industry",
    description:
      "ASSOS-VIOKON manufactures plastic food-packaging items including general and specialty barrels plus related accessories for the food-service and industrial sectors.",
    website: "https://viokon.gr",
    partnerType: "packaging",
    keyStandards: ["EU Food Contact"],
    heroMetrics: ["Barrels & accessories", "Food-grade plastics"],
    logo: { dark: "/partners/assos-viokon/logo.svg" },
    featuredPriority: 8,
    products: [
      { name: "General Barrels", type: "Food-Grade Plastic", diameters: "N/A" },
      { name: "Special Barrels", type: "Food-Grade Plastic", diameters: "N/A" },
    ],
    featured: false,
    color: "#3b82f6",
  },
  {
    id: "polins",
    name: "Polins doo",
    country: "Serbia",
    specialty: "Agricultural & Household Plastic Products",
    tagline: "Serbian plastics processor — 70 workers, 5 000 m² facility",
    description:
      "Founded in 1996, Polins doo processes plastics for agricultural and household products from a ~5 000 m² facility with approximately 70 workers.",
    website: "https://polins.co.rs",
    partnerType: "manufacturer",
    keyStandards: [],
    heroMetrics: ["~70 workers", "~5 000 m² facility", "Est. 1996"],
    logo: { dark: "/partners/polins/logo.svg" },
    featuredPriority: 9,
    products: [
      { name: "Agricultural Plastics", type: "Various PE/PP", diameters: "N/A" },
    ],
    featured: false,
    color: "#64748b",
  },
  {
    id: "plastika-nv",
    name: "Plastika DOO Nova Varoš",
    country: "Serbia",
    specialty: "Plastic Processing & Packaging with In-House Recycling",
    tagline: "Packaging factory with in-house recycling & solar initiative",
    description:
      "Plastika DOO Nova Varoš is a plastic-processing and packaging factory with in-house recycling capabilities and a solar-energy initiative for sustainable operations.",
    website: "https://plastikanv.com",
    partnerType: "recycler",
    keyStandards: [],
    heroMetrics: ["In-house recycling", "Solar-powered ops"],
    logo: { dark: "/partners/plastika-nv/logo.svg" },
    featuredPriority: 10,
    products: [
      { name: "Plastic Packaging", type: "PE/PP Packaging", diameters: "N/A" },
    ],
    featured: false,
    color: "#64748b",
  },
  {
    id: "poly-plast-system",
    name: "Poly Plast System",
    country: "Albania",
    specialty: "Plastic Pipe Manufacturer",
    tagline: "Albanian pipe manufacturer",
    description:
      "Poly Plast System is an Albanian manufacturer of plastic pipe systems for water supply and infrastructure projects.",
    website: "https://polyplastsystem.com",
    partnerType: "local-albania",
    keyStandards: [],
    heroMetrics: ["Local manufacturer"],
    logo: { dark: "/partners/poly-plast-system/logo.svg" },
    featuredPriority: 7,
    products: [
      { name: "PE Pipe Systems", type: "HDPE", diameters: "20–400 mm" },
    ],
    featured: false,
    color: "#ef4444",
  },
  {
    id: "sel-polimer",
    name: "Polimer Kauçuk / SEL-Polimer",
    country: "Turkey",
    specialty: "Rubber & PVC Hose Manufacturer",
    tagline: "Turkish hose manufacturer since 1957",
    description:
      "Polimer Kauçuk Sanayi (SEL-Polimer) has been manufacturing rubber and PVC hoses since 1957, serving industrial, agricultural, and construction markets.",
    website: "https://sel-polimer.com",
    partnerType: "hoses",
    keyStandards: ["ISO 9001"],
    heroMetrics: ["Est. 1957", "Rubber & PVC hoses"],
    logo: { dark: "/partners/sel-polimer/logo.svg" },
    featuredPriority: 6,
    products: [
      { name: "Industrial Rubber Hose", type: "Rubber", diameters: "6–150 mm" },
      { name: "PVC Suction Hose", type: "PVC", diameters: "20–200 mm" },
    ],
    featured: false,
    color: "#f59e0b",
  },
  {
    id: "perplast",
    name: "Perplast Kompani",
    country: "North Macedonia",
    specialty: "PVC Hoses & PVC Granulate",
    tagline: "PVC hose & granulate producer from Tetovo",
    description:
      "Based in Tetovo, Perplast Kompani produces PVC hoses and PVC granulate for regional distribution.",
    website: "",
    partnerType: "hoses",
    keyStandards: [],
    heroMetrics: ["PVC hoses", "PVC granulate"],
    logo: { dark: "/partners/perplast/logo.svg" },
    featuredPriority: 11,
    products: [
      { name: "PVC Hose", type: "PVC", diameters: "10–100 mm" },
      { name: "PVC Granulate", type: "PVC Granulate", diameters: "N/A" },
    ],
    featured: false,
    color: "#64748b",
  },
  {
    id: "albplast",
    name: "Albplast",
    country: "Albania",
    specialty: "Irrigation & Water Pipe Systems",
    tagline: "Albanian producer for irrigation & water networks",
    description:
      "Albplast is an Albanian producer focused on irrigation and water-pipe systems for local and regional infrastructure projects.",
    website: "",
    partnerType: "local-albania",
    keyStandards: [],
    heroMetrics: ["Irrigation focus"],
    logo: { dark: "/partners/albplast/logo.svg" },
    featuredPriority: 12,
    products: [
      { name: "Irrigation Pipe", type: "PE", diameters: "20–110 mm" },
    ],
    featured: false,
    color: "#64748b",
  },
];

export const partnerTypeLabels: Record<PartnerType, string> = {
  manufacturer: "Manufacturers",
  recycler: "Recycling & Foils",
  packaging: "Packaging",
  hoses: "Hoses",
  "local-albania": "Local Albania",
};

export const timeline = [
  {
    year: 1995,
    title: "Foundation",
    description:
      "Sukaj SHPK established in the Shkodër area as a specialized trading company focused on import-export of plastic materials.",
    milestone: "company_founded",
  },
  {
    year: 2009,
    title: "Capital Restructuring",
    description:
      "Major capital restructuring reaching 74,482,766 ALL. Expanding wholesale partnerships across Southeast Europe.",
    milestone: "capital_growth",
  },
  {
    year: 2015,
    title: "European Expansion",
    description:
      "Formal partnerships with Konti Hidroplast and FITT. Becoming a premier pipe-system distributor for the Balkans.",
    milestone: "partnerships",
  },
  {
    year: 2024,
    title: "Regional Network",
    description:
      "Consolidated a network of 12 partner manufacturers across 7 countries — Albania, Kosovo, North Macedonia, Serbia, Greece, Italy, and Turkey.",
    milestone: "network_growth",
    highlight: true,
  },
];

export const categories = [
  {
    id: "civil",
    name: "Civil Engineering",
    description: "Municipal infrastructure, sewage systems, and urban drainage solutions.",
    icon: "Building2",
    products: ["Spiral Sewage Pipe", "Corrugated HDPE SN4", "Corrugated Sewage Pipe"],
  },
  {
    id: "agri",
    name: "Agriculture",
    description: "Irrigation systems, water management, and agricultural drainage.",
    icon: "Sprout",
    products: ["FITT Force", "FITT Mint", "Irrigation Pipe", "Agricultural Film"],
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Heavy-duty conduits, cable protection, and factory infrastructure.",
    icon: "Factory",
    products: [
      "Industrial Rubber Hose",
      "PVC Suction Hose",
      "Solid Wall PE Pipe",
    ],
  },
];

export interface Product {
  id: number;
  slug: string;
  name: string;
  partner: string;
  partnerId: string;
  category: string;
  material: string;
  application: string;
  diameterMin: number;
  diameterMax: number;
  description: string;
  standard?: string[];
  pressureClass?: string;
  datasheetUrl?: string;
  image?: string;
  specs: Record<string, string>;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "konti-spiral-sewage",
    name: "Spiral Sewage Pipe",
    partner: "Konti Hidroplast",
    partnerId: "konti-hidroplast",
    category: "civil",
    material: "PP",
    application: "Sewage",
    diameterMin: 300,
    diameterMax: 2000,
    description:
      "Spiral-wound polypropylene sewage pipe for municipal and industrial waste-water networks. Available in large diameters for trunk-line applications.",
    standard: ["EN 13476"],
    pressureClass: "SN4–SN16",
    specs: {
      wallType: "Spiral-wound structured wall",
      length: "6 m standard",
      joints: "Integrated rubber seal",
    },
  },
  {
    id: 2,
    slug: "konti-solid-wall-pe",
    name: "Solid Wall PE Pipe",
    partner: "Konti Hidroplast",
    partnerId: "konti-hidroplast",
    category: "civil",
    material: "HDPE",
    application: "Water",
    diameterMin: 20,
    diameterMax: 630,
    description:
      "PE100 solid-wall pressure pipe for potable water and gas networks.",
    standard: ["EN 12201"],
    pressureClass: "PN6–PN25",
    specs: {
      material: "PE100",
      color: "Black with blue stripe",
      coilsOrBars: "Coils ≤110 mm / Bars 6–12 m",
    },
  },
  {
    id: 3,
    slug: "ferplast-corrugated-sn4",
    name: "Corrugated HDPE SN4",
    partner: "Ferplast",
    partnerId: "ferplast-ks",
    category: "civil",
    material: "HDPE",
    application: "Sewage",
    diameterMin: 100,
    diameterMax: 2000,
    description:
      "Double-wall corrugated HDPE pipe at SN4 stiffness class for gravity sewage and storm-water drainage.",
    standard: ["EN 13476", "SN4"],
    pressureClass: "SN4",
    specs: {
      structure: "Smooth inner / corrugated outer",
      joints: "Coupler with rubber seal",
      length: "6 m",
    },
  },
  {
    id: 4,
    slug: "ferplast-corrugated-sn8",
    name: "Corrugated HDPE SN8",
    partner: "Ferplast",
    partnerId: "ferplast-ks",
    category: "civil",
    material: "HDPE",
    application: "Drainage",
    diameterMin: 100,
    diameterMax: 1200,
    description:
      "Higher-stiffness corrugated HDPE pipe for deeper burial depths and heavier traffic loads.",
    standard: ["EN 13476", "SN8"],
    pressureClass: "SN8",
    specs: {
      structure: "Smooth inner / corrugated outer",
      joints: "Coupler with rubber seal",
      length: "6 m",
    },
  },
  {
    id: 5,
    slug: "teqja-hdpe100",
    name: "HDPE 100 Pressure Pipe",
    partner: "Teqja International",
    partnerId: "teqja",
    category: "civil",
    material: "HDPE",
    application: "Water",
    diameterMin: 20,
    diameterMax: 630,
    description:
      "Locally manufactured HDPE PE100 pressure pipe, PN4–PN32, for water supply and irrigation mains.",
    standard: ["EN 12201", "ISO 9001"],
    pressureClass: "PN4–PN32",
    specs: {
      material: "PE100",
      lengths: "6 m / 12 m bars; coils ≤110 mm",
      color: "Black with blue stripe",
    },
  },
  {
    id: 6,
    slug: "teqja-corrugated-sewage",
    name: "Corrugated Sewage Pipe",
    partner: "Teqja International",
    partnerId: "teqja",
    category: "civil",
    material: "HDPE",
    application: "Sewage",
    diameterMin: 150,
    diameterMax: 630,
    description:
      "EN 13476-1:2018 corrugated sewage pipe produced in 12 m lengths for municipal networks.",
    standard: ["EN 13476-1:2018"],
    specs: {
      structure: "Double-wall corrugated",
      length: "12 m",
      joints: "Rubber-seal coupler",
    },
  },
  {
    id: 7,
    slug: "fitt-force",
    name: "FITT Force",
    partner: "FITT",
    partnerId: "fitt",
    category: "agri",
    material: "PVC",
    application: "Water",
    diameterMin: 12,
    diameterMax: 50,
    description:
      "Reinforced PVC hose designed for demanding garden and light irrigation use. High burst-pressure resistance.",
    standard: ["EN ISO 1307"],
    specs: {
      reinforcement: "Textile braid",
      maxPressure: "30 bar burst",
      temperature: "-10 °C to +60 °C",
    },
  },
  {
    id: 8,
    slug: "fitt-mint",
    name: "FITT Mint",
    partner: "FITT",
    partnerId: "fitt",
    category: "agri",
    material: "PVC",
    application: "Water",
    diameterMin: 12,
    diameterMax: 25,
    description:
      "Mid-range garden hose with anti-twist technology and NTS® system for easy connection.",
    specs: {
      feature: "Anti-twist NTS® system",
      length: "15–50 m",
      color: "Mint green",
    },
  },
  {
    id: 9,
    slug: "fitt-mimosa",
    name: "FITT Mimosa",
    partner: "FITT",
    partnerId: "fitt",
    category: "agri",
    material: "PVC",
    application: "Water",
    diameterMin: 12,
    diameterMax: 19,
    description:
      "Ultra-lightweight, compact garden hose that expands under pressure. Ideal for small gardens and balconies.",
    specs: {
      feature: "Auto-expanding",
      weight: "Ultra-light",
      length: "10–30 m",
    },
  },
  {
    id: 10,
    slug: "plastika-recycled-granulates",
    name: "Recycled Granulates",
    partner: "PLASTIKA",
    partnerId: "plastika-ks",
    category: "industrial",
    material: "HDPE",
    application: "Recycling",
    diameterMin: 0,
    diameterMax: 0,
    description:
      "Recycled HDPE and LDPE granulates produced from post-industrial and post-consumer waste. Base material for film and pipe extrusion.",
    standard: ["ISO 14001"],
    specs: {
      inputStream: "Post-industrial / post-consumer",
      outputForm: "Pelletised granulate",
      applications: "Film, pipe, injection",
    },
  },
  {
    id: 11,
    slug: "plastika-agri-film",
    name: "Agricultural Film",
    partner: "PLASTIKA",
    partnerId: "plastika-ks",
    category: "agri",
    material: "LDPE",
    application: "Agriculture",
    diameterMin: 0,
    diameterMax: 0,
    description:
      "PE film for greenhouse covering, mulching, and silage — produced from recycled granulates.",
    specs: {
      thickness: "40–200 µm",
      width: "Up to 12 m",
      uvStabilised: "Yes",
    },
  },
  {
    id: 12,
    slug: "sel-polimer-rubber-hose",
    name: "Industrial Rubber Hose",
    partner: "Polimer Kauçuk / SEL-Polimer",
    partnerId: "sel-polimer",
    category: "industrial",
    material: "Rubber",
    application: "Industrial",
    diameterMin: 6,
    diameterMax: 150,
    description:
      "Heavy-duty rubber hoses for air, water, oil, and chemical transfer in industrial environments.",
    standard: ["ISO 9001"],
    specs: {
      reinforcement: "Textile / wire braid",
      temperature: "-30 °C to +100 °C",
      pressure: "10–40 bar WP",
    },
  },
  {
    id: 13,
    slug: "sel-polimer-pvc-suction",
    name: "PVC Suction Hose",
    partner: "Polimer Kauçuk / SEL-Polimer",
    partnerId: "sel-polimer",
    category: "industrial",
    material: "PVC",
    application: "Water",
    diameterMin: 20,
    diameterMax: 200,
    description:
      "PVC suction and delivery hose with rigid PVC helix for water, slurry, and light-chemical transfer.",
    specs: {
      helix: "Rigid PVC spiral",
      vacuum: "Up to −0.9 bar",
      temperature: "-10 °C to +60 °C",
    },
  },
];
