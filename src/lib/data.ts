export const company = {
  name: "Sukaj SHPK",
  established: 1995,
  capital: "74.4M ALL",
  location: "Shkoder, Albania",
  tagline: "Sukaj SHPK supplies and manufactures industrial plastic pipe systems across the Balkans.",
  description: "Since 1995, Sukaj SHPK has delivered civil, agricultural, and industrial plastic components with European partnerships and local production capability.",
  stats: {
    yearsExperience: 30,
    countriesServed: 12,
    projectsCompleted: 2500,
    partnersCount: 15
  }
};

export const partners = [
  {
    id: "konti",
    name: "Konti",
    country: "Slovenia",
    specialty: "Spiral Sewage Pipes (PP/HDPE)",
    tagline: "The Underground Titan",
    maxDiameter: "2000mm",
    description: "Premium spiral-wound sewage systems for municipal and industrial applications. Engineering underground infrastructure that lasts generations.",
    products: [
      { name: "Konti Kan", type: "Spiral PP Pipe", diameters: "300-2000mm" },
      { name: "Konti Drain", type: "Perforated Drainage", diameters: "100-600mm" }
    ],
    featured: true,
    color: "#f97316"
  },
  {
    id: "fitt",
    name: "FITT",
    country: "Italy",
    specialty: "Technical Hoses & Garden Systems",
    tagline: "Surface Precision",
    maxDiameter: "100mm",
    description: "Italian engineering meets everyday utility. From professional irrigation to premium garden hoses.",
    products: [
      { name: "FITT Force", type: "Reinforced PVC", diameters: "12-50mm" },
      { name: "FITT Bluforce", type: "Water Supply", diameters: "20-100mm" }
    ],
    featured: true,
    color: "#22d3ee"
  },
  {
    id: "ferplast",
    name: "Ferplast",
    country: "Italy",
    specialty: "Flexible Conduits & Cable Protection",
    tagline: "The Invisible Shield",
    description: "Protecting critical infrastructure with flexible conduit systems for electrical and telecommunications.",
    products: [
      { name: "Flexiplast", type: "Corrugated Conduit", diameters: "16-63mm" },
      { name: "Duoplast", type: "Double-wall Protection", diameters: "40-200mm" }
    ],
    featured: false,
    color: "#a855f7"
  },
  {
    id: "plastika-ks",
    name: "Plastika-ks",
    country: "Slovenia",
    specialty: "Recycled HDPE Systems",
    tagline: "Circular Infrastructure",
    description: "Pioneering sustainable infrastructure with recycled materials. Building tomorrow with yesterday's resources.",
    products: [
      { name: "EcoKan", type: "Recycled HDPE", diameters: "200-800mm" }
    ],
    featured: true,
    color: "#22c55e"
  },
  {
    id: "arol-plast",
    name: "Arol-Plast",
    country: "Albania",
    specialty: "Local Manufacturing Partner",
    tagline: "Vertical Integration",
    factorySize: "200,000 sqm",
    description: "Our strategic manufacturing partner in Albania. Enabling local production and rapid delivery across the Balkans.",
    products: [
      { name: "Custom Extrusion", type: "HDPE/PVC", diameters: "20-630mm" }
    ],
    featured: true,
    color: "#ef4444"
  }
];

export const timeline = [
  {
    year: 1995,
    title: "Foundation",
    description: "Sukaj SHPK established in Shkoder, Albania. Beginning as a specialized trading company focused on infrastructure materials.",
    milestone: "company_founded"
  },
  {
    year: 2009,
    title: "Capital Injection",
    description: "Major capital restructuring with 74.4M ALL investment. Expanding partnerships across Europe.",
    milestone: "capital_growth"
  },
  {
    year: 2015,
    title: "European Expansion",
    description: "Formal partnerships with Konti (Slovenia) and FITT (Italy). Becoming the premier distributor for the Balkans.",
    milestone: "partnerships"
  },
  {
    year: 2024,
    title: "Arol-Plast Merger",
    description: "Strategic merger with Arol-Plast. Transition from trader to manufacturer. Vertical integration complete.",
    milestone: "vertical_integration",
    highlight: true
  }
];

export const categories = [
  {
    id: "civil",
    name: "Civil Engineering",
    description: "Municipal infrastructure, sewage systems, and urban drainage solutions.",
    icon: "Building2",
    products: ["Konti Kan", "Konti Drain", "Duoplast"]
  },
  {
    id: "agri",
    name: "Agriculture",
    description: "Irrigation systems, water management, and agricultural drainage.",
    icon: "Sprout",
    products: ["FITT Bluforce", "FITT Force", "EcoKan"]
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Heavy-duty conduits, cable protection, and factory infrastructure.",
    icon: "Factory",
    products: ["Flexiplast", "Duoplast", "Custom Extrusion"]
  }
];

export const products = [
  {
    id: 1,
    name: "Konti Kan 2000",
    partner: "Konti",
    category: "civil",
    material: "PP",
    application: "Sewage",
    diameterMin: 300,
    diameterMax: 2000,
    description: "The flagship spiral sewage pipe. Engineered for maximum flow capacity and structural integrity.",
    specs: {
      wallThickness: "Variable SN4-SN16",
      length: "6m standard",
      joints: "Integrated rubber seal"
    }
  },
  {
    id: 2,
    name: "FITT Bluforce",
    partner: "FITT",
    category: "agri",
    material: "HDPE",
    application: "Water",
    diameterMin: 20,
    diameterMax: 100,
    description: "Premium water supply system with superior pressure resistance.",
    specs: {
      pressure: "PN16",
      length: "50-100m coils",
      color: "Blue stripe identification"
    }
  },
  {
    id: 3,
    name: "Flexiplast Conduit",
    partner: "Ferplast",
    category: "industrial",
    material: "PVC",
    application: "Electrical",
    diameterMin: 16,
    diameterMax: 63,
    description: "Flexible corrugated conduit for electrical cable protection.",
    specs: {
      bendRadius: "3x diameter",
      temperature: "-5°C to +60°C",
      resistance: "UV stabilized"
    }
  },
  {
    id: 4,
    name: "EcoKan Recycled",
    partner: "Plastika-ks",
    category: "civil",
    material: "HDPE",
    application: "Drainage",
    diameterMin: 200,
    diameterMax: 800,
    description: "Sustainable drainage solution from 100% recycled HDPE.",
    specs: {
      recycledContent: "100%",
      certification: "ISO 14001",
      lifespan: "100+ years"
    }
  },
  {
    id: 5,
    name: "Duoplast Double-Wall",
    partner: "Ferplast",
    category: "industrial",
    material: "HDPE",
    application: "Cable",
    diameterMin: 40,
    diameterMax: 200,
    description: "Double-wall protection system for underground cable routing.",
    specs: {
      structure: "Smooth inner, corrugated outer",
      pullStrength: "250N",
      color: "Orange safety marking"
    }
  }
];
