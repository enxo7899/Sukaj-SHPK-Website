/**
 * Sukaj SHPK — Site translations
 *
 * Albanian (sq) is the default language. English (en) is the secondary.
 * Albanian copy is hand-adapted for natural professional B2B reading,
 * not a literal English-to-Albanian translation.
 */

export type Locale = "sq" | "en";

export const DEFAULT_LOCALE: Locale = "sq";
export const LOCALES: readonly Locale[] = ["sq", "en"] as const;

export const localeMeta: Record<Locale, { label: string; short: string; flag: string }> = {
  sq: { label: "Shqip", short: "SQ", flag: "🇦🇱" },
  en: { label: "English", short: "EN", flag: "🇬🇧" },
};

// Type-safe translation key tree
export const translations = {
  // ── Navigation ──────────────────────────────────────────────────────────
  nav: {
    civil: { sq: "CIVILE", en: "CIVIL" },
    agri: { sq: "BUJQËSI", en: "AGRI" },
    industrial: { sq: "INDUSTRIALE", en: "INDUSTRIAL" },
    partners: { sq: "PARTNERËT", en: "PARTNERS" },
    about: { sq: "RRETH NESH", en: "ABOUT" },
    contact: { sq: "KONTAKT", en: "CONTACT" },
    exploreCatalog: { sq: "EKSPLORO KATALOGUN", en: "EXPLORE CATALOG" },
    languageLabel: { sq: "Gjuha", en: "Language" },
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: { sq: "Shkodër, Shqipëri — Themeluar më", en: "Shkodër, Albania — Est." },
    headline1: { sq: "Zgjidhje Premium", en: "Premium Pipe Solutions" },
    headline2: { sq: "Tubash për Ballkanin.", en: "Built for the Balkans." },
    description: {
      sq: "Importues dhe shpërndarës kryesor i sistemeve të tubave HDPE, PP dhe PVC. Nga kanalizimet tek ujitja, ofrojmë zgjidhje infrastrukturore me standarde evropiane në bashkëpunim me",
      en: "Leading importer and wholesaler of HDPE, PP, and PVC pipe systems. From sewage to irrigation, we deliver European-grade infrastructure solutions partnering with",
    },
    descriptionPartners: { sq: "prodhues", en: "manufacturers" },
    descriptionAcross: { sq: "në", en: "across" },
    descriptionCountries: { sq: "vende", en: "countries" },
    ctaCatalog: { sq: "Eksploro Katalogun", en: "Explore Catalog" },
    ctaQuote: { sq: "Kërko Ofertë", en: "Request a Quote" },
    // Hero inline stats (different from the full stats section below)
    statProjects: { sq: "Projekte të Realizuara", en: "Projects Completed" },
    statMaxDiameter: { sq: "Diametri Maks. (Ø)", en: "Max Pipe Diameter" },
    statWarehouses: { sq: "Depo Logjistike", en: "Logistics Depots" },
  },

  // ── Categories section (homepage) ──────────────────────────────────────
  categories: {
    eyebrow: { sq: "Zgjidhje Industriale", en: "Industry Solutions" },
    title1: { sq: "Të projektuara për çdo", en: "Engineered for Every" },
    title2: { sq: "Aplikim.", en: "Application." },
    subtitle: {
      sq: "Nga sistemet komunale të kanalizimit tek ujitja bujqësore — zgjidhje të sakta për çdo sektor.",
      en: "From municipal sewage systems to agricultural irrigation — precision solutions for every sector.",
    },
    civilName: { sq: "Inxhinieri Civile", en: "Civil Engineering" },
    civilDescription: {
      sq: "Infrastrukturë komunale, sisteme kanalizimi dhe kullimi urban.",
      en: "Municipal infrastructure, sewage systems, and urban drainage solutions.",
    },
    agriName: { sq: "Bujqësi", en: "Agriculture" },
    agriDescription: {
      sq: "Sisteme ujitjeje, menaxhim uji dhe kullim bujqësor.",
      en: "Irrigation systems, water management, and agricultural drainage.",
    },
    industrialName: { sq: "Industriale", en: "Industrial" },
    industrialDescription: {
      sq: "Tubacione të rënda, mbrojtje kabllosh dhe infrastrukturë fabrikash.",
      en: "Heavy-duty conduits, cable protection, and factory infrastructure.",
    },
    learnMore: { sq: "Mëso më shumë", en: "Learn more" },
  },

  // ── Stats section ──────────────────────────────────────────────────────
  stats: {
    eyebrow: { sq: "Tre Dekada Përvojë", en: "Three Decades of Experience" },
    yearsLabel: { sq: "Vite Përvojë", en: "Years of Experience" },
    countriesLabel: { sq: "Vende të Shërbyera", en: "Countries Served" },
    projectsLabel: { sq: "Projekte të Përfunduara", en: "Projects Completed" },
    partnersLabel: { sq: "Partnerë Strategjikë", en: "Strategic Partners" },
  },

  // ── Why us ─────────────────────────────────────────────────────────────
  whyUs: {
    eyebrow: { sq: "Pse Sukaj SHPK", en: "Why Sukaj SHPK" },
    title: { sq: "Eksperienca Industriale që Mund t'i Besoni.", en: "Industrial Expertise You Can Trust." },
    p1Title: { sq: "Trashëgimi 30-Vjeçare", en: "30-Year Heritage" },
    p1Desc: {
      sq: "I themeluar më 1995, me një rrjet të konsoliduar shpërndarjeje dhe partneritetesh të verifikuara prodhimi.",
      en: "Founded in 1995, with a consolidated distribution network and verified manufacturing partnerships.",
    },
    p2Title: { sq: "Standarde Europiane", en: "European Standards" },
    p2Desc: {
      sq: "Të gjitha produktet plotësojnë EN 12201, EN 13476, ISO 9001 dhe certifikime të tjera ndërkombëtare.",
      en: "All products meet EN 12201, EN 13476, ISO 9001 and other international certifications.",
    },
    p3Title: { sq: "Mbulim Rajonal", en: "Regional Coverage" },
    p3Desc: {
      sq: "Logjistikë dhe magazina në Shkodër, Tiranë dhe Laç për dorëzim të shpejtë në të gjithë rajonin.",
      en: "Logistics and warehouses in Shkodër, Tirana and Laç for fast delivery across the region.",
    },
    p4Title: { sq: "Mbështetje Teknike", en: "Technical Support" },
    p4Desc: {
      sq: "Konsultim direkt me ekipin tonë për dimensionim, specifika dhe zgjedhje materialesh.",
      en: "Direct consultation with our team for sizing, specifications, and material selection.",
    },
  },

  // ── CTA ────────────────────────────────────────────────────────────────
  // ── Featured Products (homepage) ────────────────────────────────────────
  featuredProducts: {
    eyebrow: { sq: "Produkte të Zgjedhura", en: "Featured Products" },
    title: { sq: "Zgjidhjet Tona Më të Kërkuara", en: "Our Most Requested Solutions" },
    subtitle: {
      sq: "Produkte të certifikuara sipas standardeve evropiane, të disponueshme nga partnerët tanë të verifikuar.",
      en: "European-certified products, available from our verified manufacturing partners.",
    },
    viewAll: { sq: "Shiko Katalogun e Plotë", en: "Browse Full Catalog" },
    viewDetails: { sq: "Shiko Detajet", en: "View Details" },
  },

  cta: {
    eyebrow: { sq: "Filloni Projektin Tuaj", en: "Start Your Project" },
    title: { sq: "Gati për hapin e radhës të projektit tuaj?", en: "Ready for the next conversation?" },
    subtitle: {
      sq: "Kontaktoni ekipin tonë për një ofertë teknike, konsulencë dimensionimi ose disponueshmëri të materialeve.",
      en: "Contact our team for a technical quote, sizing consultation, or material availability.",
    },
    button: { sq: "Kërko Ofertë", en: "Get a Quote" },
  },

  // ── Footer ─────────────────────────────────────────────────────────────
  footer: {
    description: {
      sq: "Import-eksport materialesh plastike dhe tregti shumicë e sistemeve industriale të tubave në të gjithë Ballkanin që nga viti 1995.",
      en: "Import-export of plastic materials & wholesale trading of industrial pipe systems across the Balkans since 1995.",
    },
    administrator: { sq: "Administratori", en: "Administrator" },
    solutionsHeading: { sq: "Zgjidhjet", en: "Solutions" },
    civilEngineering: { sq: "Inxhinieri Civile", en: "Civil Engineering" },
    agriculture: { sq: "Bujqësi", en: "Agriculture" },
    industrial: { sq: "Industriale", en: "Industrial" },
    fullCatalog: { sq: "Katalogu i Plotë", en: "Full Catalog" },
    partnersHeading: { sq: "Partnerët", en: "Partners" },
    viewAllPartners: { sq: "Shiko të gjithë partnerët →", en: "View all partners →" },
    companyHeading: { sq: "Kompania", en: "Company" },
    aboutUs: { sq: "Rreth Nesh", en: "About Us" },
    ourHistory: { sq: "Historia Jonë", en: "Our History" },
    contact: { sq: "Kontakt", en: "Contact" },
    rightsReserved: { sq: "TË GJITHA TË DREJTAT E REZERVUARA.", en: "ALL RIGHTS RESERVED." },
    privacy: { sq: "Politika e Privatësisë", en: "Privacy Policy" },
    terms: { sq: "Kushtet e Shërbimit", en: "Terms of Service" },
  },

  // ── Catalog ────────────────────────────────────────────────────────────
  catalog: {
    pageTitle: { sq: "Katalogu i Produkteve", en: "Product Catalog" },
    pageSubtitle: {
      sq: "Eksploroni gamën tonë të plotë të sistemeve të tubave nga prodhues europianë të certifikuar.",
      en: "Explore our complete range of pipe systems from certified European manufacturers.",
    },
    searchPlaceholder: { sq: "Kërko tuba, depozita, fitingje...", en: "Search pipes, tanks, fittings..." },
    filters: { sq: "Filtrat", en: "Filters" },
    quickFilters: { sq: "Filtra të Shpejta", en: "Quick filters" },
    material: { sq: "Materiali", en: "Material" },
    application: { sq: "Aplikimi", en: "Application" },
    diameter: { sq: "Diametri", en: "Diameter" },
    supplier: { sq: "Furnizuesi", en: "Supplier" },
    clear: { sq: "Pastro", en: "Clear" },
    clearAll: { sq: "Pastro të gjitha", en: "Clear all" },
    clearAllFilters: { sq: "Pastro të gjitha filtrat", en: "Clear all filters" },
    showing: { sq: "Po shfaqen", en: "Showing" },
    productFamily: { sq: "familje produktesh", en: "product family" },
    productFamilies: { sq: "familje produktesh", en: "product families" },
    across: { sq: "në", en: "across" },
    supplierOffer: { sq: "ofertë furnizuesi", en: "supplier offer" },
    supplierOffers: { sq: "oferta furnizuesish", en: "supplier offers" },
    sortBy: { sq: "Rendit sipas", en: "Sort by" },
    sortRecommended: { sq: "Të rekomanduara", en: "Recommended" },
    sortMostSuppliers: { sq: "Më shumë furnizues", en: "Most supplier options" },
    sortDiaAsc: { sq: "Diametri më i vogël i pari", en: "Smallest diameter first" },
    sortDiaDesc: { sq: "Diametri më i madh i pari", en: "Largest diameter first" },
    allProducts: { sq: "Të Gjitha Produktet", en: "All Products" },
    inStock: { sq: "Në Stok", en: "In Stock" },
    partial: { sq: "Pjesërisht", en: "Partial" },
    onOrder: { sq: "Me Porosi", en: "On Order" },
    suppliers: { sq: "furnizues", en: "suppliers" },
    supplierOne: { sq: "furnizues", en: "supplier" },
    viewDetails: { sq: "Shiko detajet", en: "View details" },
    diameterLabel: { sq: "DIAMETRI", en: "DIAMETER" },
    standardsLabel: { sq: "STANDARDET", en: "STANDARDS" },
    categoryLabel: { sq: "KATEGORIA", en: "CATEGORY" },
    proprietary: { sq: "Pronësore", en: "Proprietary" },
    noResultsTitle: { sq: "Asnjë produkt nuk përputhet me filtrat tuaj", en: "No products match your filters" },
    noResultsSubtitle: {
      sq: "Provoni të zgjeroni kriteret e kërkimit ose hiqni disa filtra.",
      en: "Try broadening your search criteria or removing some filters.",
    },
    contactUs: { sq: "Na Kontaktoni", en: "Contact Us" },
    productTypesLabel: { sq: "Tipe Produktesh", en: "Product Types" },
    supplierPartnersLabel: { sq: "Partnerë Furnizimi", en: "Supplier Partners" },
    totalSupplyOffers: { sq: "Oferta Totale Furnizimi", en: "Total Supply Offers" },
    fullyInStock: { sq: "Plotësisht në Stok", en: "Fully In Stock" },
    // Material families
    matPeHdpe: { sq: "PE / HDPE", en: "PE / HDPE" },
    matPp: { sq: "PP / Polipropilen", en: "PP / Polypropylene" },
    matPvc: { sq: "PVC", en: "PVC" },
    matRubber: { sq: "Gomë", en: "Rubber" },
    matOther: { sq: "Të tjera / Të përziera", en: "Other / Mixed" },
    // Application families
    appWaterPressure: { sq: "Furnizim me ujë & presion", en: "Water supply & pressure" },
    appSewageDrainage: { sq: "Kanalizim & kullim", en: "Sewage & drainage" },
    appIrrigation: { sq: "Ujitje & bujqësi", en: "Irrigation & agriculture" },
    appCableTelecom: { sq: "Mbrojtje kabllosh & telekom", en: "Cable & telecom protection" },
    appStorageTanks: { sq: "Magazinim & depozita", en: "Storage & tanks" },
    appIndustrialTransfer: { sq: "Transferim industrial", en: "Industrial transfer" },
    appPackagingConstruction: { sq: "Paketim & ndërtim", en: "Packaging & construction" },
    appOutdoorDecor: { sq: "Mjedis i jashtëm & dekor", en: "Outdoor & décor" },
    appGas: { sq: "Shpërndarje gazi", en: "Gas distribution" },
    appFittings: { sq: "Fitingje & aksesorë", en: "Fittings & accessories" },
    appOther: { sq: "Të tjera", en: "Other" },
    // Quick filters
    qfInStock: { sq: "Në stok", en: "In Stock" },
    qfCivil: { sq: "Civile", en: "Civil" },
    qfAgriculture: { sq: "Bujqësi", en: "Agriculture" },
    qfIndustrial: { sq: "Industriale", en: "Industrial" },
    qfLargeDiameter: { sq: "Diametër i madh", en: "Large diameter" },
    qfPressureSystems: { sq: "Sisteme me presion", en: "Pressure systems" },
  },

  // ── About page ─────────────────────────────────────────────────────────
  about: {
    eyebrow: { sq: "Rreth Sukaj SHPK", en: "About Sukaj SHPK" },
    headline1: { sq: "Në shërbim të Ballkanit", en: "Serving the Balkans" },
    headline2: { sq: "që nga viti 1995.", en: "since 1995." },
    leadParagraph: {
      sq: "Që nga themelimi në Shkodër më 1995, Sukaj SHPK është kthyer në një nga shpërndarësit kryesorë të sistemeve të tubave plastikë në Shqipëri dhe rajon — duke kombinuar partneritete me prodhues europianë të certifikuar me ekspertizë lokale logjistike.",
      en: "Since its founding in Shkodër in 1995, Sukaj SHPK has become one of the leading distributors of plastic pipe systems in Albania and the region — combining partnerships with certified European manufacturers with local logistics expertise.",
    },
    established: { sq: "Themeluar", en: "Established" },
    headquarters: { sq: "Selia", en: "Headquarters" },
    activity: { sq: "Aktiviteti", en: "Activity" },
    activityValue: { sq: "Import-eksport & shumicë", en: "Import-export & wholesale" },
    administrator: { sq: "Administratori", en: "Administrator" },
    ourBusiness: { sq: "Aktiviteti Ynë", en: "Our Business" },
    businessTitle: {
      sq: "Shpërndarësi kryesor i sistemeve të tubave për Ballkanin.",
      en: "The premier pipe-system distributor for the Balkans.",
    },
    businessP1: {
      sq: "I themeluar më {year} në {location}, Sukaj SHPK operon si kompani import-eksporti dhe tregtie shumicë e specializuar në materiale plastike — kryesisht sisteme tubash për aplikime civile, bujqësore dhe industriale.",
      en: "Founded in {year} in {location}, Sukaj SHPK operates as an import-export and wholesale trading company specialising in plastic materials — primarily pipe systems for civil, agricultural and industrial applications.",
    },
    businessP2: {
      sq: "Kapitali ynë i regjistruar prej {capital} mbështet një rrjet logjistike dhe shpërndarjeje që mbulon {countries} vende në Europën Juglindore.",
      en: "Our registered capital of {capital} underpins a logistics and distribution network reaching {countries} countries across Southeast Europe.",
    },
    businessP3: {
      sq: "Punojmë drejtpërdrejt me {partners} partnerë prodhues europianë — duke menaxhuar furnizimin, dokumentacionin e importit, zhdoganimin dhe dorëzimin e fundit në mënyrë që kontraktorët dhe bashkitë të përqendrohen te ndërtimi.",
      en: "We work directly with {partners} European manufacturing partners — handling sourcing, import documentation, customs clearance and last-mile delivery so contractors and municipalities can focus on building.",
    },
    pillarCivil: { sq: "Infrastrukturë Civile", en: "Civil Infrastructure" },
    pillarCivilDetail: { sq: "Kanalizime, kullim, ujësjellës", en: "Sewage, drainage, water mains" },
    pillarRegion: { sq: "Mbulim Rajonal", en: "Regional Reach" },
    pillarRegionDetail: { sq: "12 vende në Europën Juglindore", en: "12 countries across SE Europe" },
    pillarPartners: { sq: "12 Partnerë", en: "12 Partners" },
    pillarPartnersDetail: { sq: "Në 7 vende", en: "Across 7 countries" },
    pillarYears: { sq: "30 Vite", en: "30 Years" },
    pillarYearsDetail: { sq: "Tregti e pandërprerë që nga 1995", en: "Uninterrupted trading since 1995" },
    partnerCountries: { sq: "Vendet e Partnerëve", en: "Partner Countries" },
    manufacturingNetwork: { sq: "Rrjeti i Prodhimit", en: "Manufacturing Network" },
    countryAlbania: { sq: "Shqipëri", en: "Albania" },
    countryKosovo: { sq: "Kosovë", en: "Kosovo" },
    countryNorthMacedonia: { sq: "Maqedonia e Veriut", en: "North Macedonia" },
    countrySerbia: { sq: "Serbi", en: "Serbia" },
    countryGreece: { sq: "Greqi", en: "Greece" },
    countryItaly: { sq: "Itali", en: "Italy" },
    countryTurkey: { sq: "Turqi", en: "Turkey" },
    partnerSingular: { sq: "partner", en: "partner" },
    partnerPlural: { sq: "partnerë", en: "partners" },
    sustainability: { sq: "Qëndrueshmëria", en: "Sustainability" },
    sustainTitle1: { sq: "Ndërtuar për të qëndruar.", en: "Built to last." },
    sustainTitle2: { sq: "Ndërtuar me përgjegjësi.", en: "Built responsibly." },
    sustainSubtitle: {
      sq: "Qëndrueshmëria fillon me jetëgjatësinë. Çdo tub që furnizojmë është projektuar për dekada shërbimi — dhe disa partnerë mbyllin ciklin nëpërmjet programeve aktive të riciklimit.",
      en: "Durability is sustainability. Every pipe we supply is engineered for decades of service — and several of our partners close the loop through active recycling programmes.",
    },
    sustainLife: { sq: "Vite jetë shërbimi", en: "Years service life" },
    sustainLifeDetail: {
      sq: "Sistemet e tubave PE dhe PP janë projektuar për 100+ vite nën tokë, duke eliminuar ciklet e shpeshta zëvendësimi.",
      en: "PE and PP pipe systems are engineered for 100+ years underground, eliminating frequent replacement cycles.",
    },
    sustainRecycling: { sq: "Partnerë riciklimi", en: "Recycling partners" },
    sustainRecyclingDetail: {
      sq: "PLASTIKA (Kosovë) dhe Plastika DOO Nova Varoš (Serbi) konvertojnë mbetjet plastike post-konsumuese në granulat dhe filma të rinj.",
      en: "PLASTIKA (Kosovo) and Plastika DOO Nova Varoš (Serbia) convert post-consumer plastic waste into new granulates and films.",
    },
    sustainRegional: { sq: "Vende të Ballkanit", en: "Balkan countries" },
    sustainRegionalDetail: {
      sq: "Furnizimi rajonal nga prodhues ballkanikë redukton emetimet e transportit krahasuar me zinxhirë globalë furnizimi.",
      en: "Regional sourcing from Balkan manufacturers cuts transport emissions compared to distant global supply chains.",
    },
    ourNetwork: { sq: "Rrjeti Ynë", en: "Our Network" },
    keyPartners: { sq: "Partnerë kryesorë prodhues", en: "Key manufacturing partners" },
    allProfiles: { sq: "Të gjithë profilet", en: "All profiles" },
  },

  // ── Contact page ───────────────────────────────────────────────────────
  contact: {
    eyebrow: { sq: "KONTAKTONI", en: "CONTACT US" },
    headline: { sq: "LE TË NDËRTOJMË SË BASHKU.", en: "LET'S BUILD TOGETHER." },
    subtitle: {
      sq: "Nga konsulenca teknike te ofertat e projekteve — ekipi ynë është gati t'ju mbështesë me nevojat tuaja infrastrukturore.",
      en: "From technical consultations to project quotes — our team is ready to support your infrastructure needs.",
    },
    addressLabel: { sq: "Adresa", en: "Address" },
    phoneLabel: { sq: "Telefoni", en: "Phone" },
    emailLabel: { sq: "Email-i", en: "Email" },
    hoursLabel: { sq: "Orari", en: "Hours" },
    hoursValue: { sq: "Hënë–Premte: 08:00–17:00", en: "Mon–Fri: 08:00–17:00" },
    formName: { sq: "Emri *", en: "Full name *" },
    formEmail: { sq: "Email-i *", en: "Email *" },
    formCompany: { sq: "Kompania", en: "Company" },
    formProject: { sq: "Lloji i projektit", en: "Project type" },
    formMessage: { sq: "Mesazhi *", en: "Message *" },
    formSubmit: { sq: "Dërgo Mesazhin", en: "Send Message" },
    formSuccess: { sq: "Faleminderit! Do t'ju kontaktojmë së shpejti.", en: "Thank you! We will contact you soon." },
    technicalSupport: { sq: "Mbështetje Teknike", en: "Technical Support" },
    technicalSupportDesc: {
      sq: "Keni nevojë për konsulencë specifikimi ose dimensionimi? Telefononi direkt skuadrën tonë teknike.",
      en: "Need specification or sizing consultation? Call our technical team directly.",
    },
    callTeam: { sq: "Telefono ekipin →", en: "Call the team →" },
  },

  // ── Partners page ──────────────────────────────────────────────────────
  partners: {
    eyebrow: { sq: "Rrjeti Ynë i Partnerëve", en: "Our Partner Network" },
    title: {
      sq: "Prodhues të certifikuar nga e gjithë Evropa.",
      en: "Certified manufacturers from across Europe.",
    },
    subtitle: {
      sq: "Bashkëpunojmë vetëm me prodhues që plotësojnë standardet më të rrepta të cilësisë.",
      en: "We partner only with manufacturers meeting the strictest quality standards.",
    },
    pageEyebrow: { sq: "PORTOFOLI I PARTNERËVE", en: "PARTNER DIRECTORY" },
    pageTitle: { sq: "EKSCELENCË RAJONALE.", en: "REGIONAL EXCELLENCE." },
    pageSubtitle: {
      sq: "12 partnerë prodhues dhe furnizimi në Shqipëri, Kosovë, Maqedoninë e Veriut, Serbi, Greqi, Itali dhe Turqi.",
      en: "12 manufacturing and supply partners across Albania, Kosovo, North Macedonia, Serbia, Greece, Italy, and Turkey.",
    },
    allPartners: { sq: "Të Gjithë Partnerët", en: "All Partners" },
    viewProducts: { sq: "Shiko Produktet", en: "View Products" },
    noPartners: { sq: "Asnjë partner në këtë kategori.", en: "No partners in this category." },
    showAll: { sq: "Shfaq të gjithë partnerët", en: "Show all partners" },
    showLess: { sq: "Shfaq më pak", en: "Show fewer partners" },
    specialty: { sq: "SPECIALITETI", en: "SPECIALTY" },
    visitWebsite: { sq: "Vizitoni faqen", en: "Visit website" },
    keyProducts: { sq: "Produkte Kryesore", en: "Key Products" },
    standards: { sq: "Standardet", en: "Standards" },
    keyStandards: { sq: "STANDARDET KRYESORE", en: "KEY STANDARDS" },
    factory: { sq: "Fabrika", en: "Factory" },
    maxDiameter: { sq: "DIAMETRI MAKSIMAL", en: "MAX DIAMETER" },
    typeManufacturer: { sq: "Prodhues", en: "Manufacturer" },
    typeRecycler: { sq: "Riciklim & Folie", en: "Recycling & Foils" },
    typePackaging: { sq: "Paketim", en: "Packaging" },
    typeHoses: { sq: "Tuba të Butë", en: "Hoses" },
    typeLocalAlbania: { sq: "Lokal Shqipëri", en: "Local Albania" },
    website: { sq: "Faqja e internetit", en: "Website" },
    statsPartners: { sq: "Partnerë", en: "Partners" },
    statsCountries: { sq: "Vende", en: "Countries" },
    statsSectors: { sq: "Sektorë", en: "Sectors" },
  },

  // ── Product detail page ────────────────────────────────────────────────
  productDetail: {
    backToCatalog: { sq: "Kthehu te katalogu", en: "Back to catalog" },
    overview: { sq: "Përmbledhje", en: "Overview" },
    keyProperties: { sq: "Veçoritë Kryesore", en: "Key Properties" },
    suppliers: { sq: "Furnizuesit", en: "Suppliers" },
    suppliersAvailable: {
      sq: "furnizues të disponueshëm për këtë produkt",
      en: "suppliers available for this product",
    },
    stockNote: { sq: "Në stok", en: "In stock" },
    orderNote: { sq: "Me porosi", en: "On order" },
    diameterRange: { sq: "Gama e diametrit", en: "Diameter range" },
    pressureClasses: { sq: "Klasat e presionit", en: "Pressure classes" },
    standards: { sq: "Standardet", en: "Standards" },
    dimensions: { sq: "Dimensionet", en: "Dimensions" },
    fittings: { sq: "Aksesorët", en: "Fittings" },
    technicalSpecs: { sq: "Specifikimet Teknike", en: "Technical Specifications" },
    alsoAvailableFrom: { sq: "Po ashtu i disponueshëm nga", en: "Also available from" },
    relatedProducts: { sq: "Produkte të Lidhura", en: "Related Products" },
    requestQuote: { sq: "Kërko Ofertë për Këtë Produkt", en: "Request Quote for This Product" },
    application: { sq: "Aplikimi", en: "Application" },
    material: { sq: "Materiali", en: "Material" },
    viewSupplier: { sq: "Shiko furnizuesin", en: "View supplier" },
  },

  // ── Locations section ─────────────────────────────────────────────────
  locations: {
    eyebrow: { sq: "Vendndodhjet Tona", en: "Our Locations" },
    title: { sq: "Logjistikë rajonale, dorëzim i shpejtë.", en: "Regional logistics, fast delivery." },
    subtitle: {
      sq: "Tre vendndodhje strategjike në Shqipërinë veriore dhe qendrore për mbulim optimal të rajonit.",
      en: "Three strategic locations in northern and central Albania for optimal regional coverage.",
    },
    viewOnMaps: { sq: "Shiko në Hartë", en: "View on Maps" },
    getDirections: { sq: "Merr udhëzimet", en: "Get directions" },
    openInGoogleMaps: { sq: "Hap në Google Maps", en: "Open in Google Maps" },
    labelWarehouse: { sq: "Magazinë & Shpërndarje", en: "Warehouse & Distribution" },
    labelHeadquarters: { sq: "Selia Qendrore", en: "Headquarters" },
    labelRegionalDepot: { sq: "Depo Rajonale", en: "Regional Depot" },
    voreDescription: {
      sq: "Qendër kryesore shpërndarjeje në aksin Tiranë–Vorë, që mbulon rajonin e kryeqytetit dhe Shqipërinë e jugut.",
      en: "Central distribution hub on the Tiranë–Vorë highway, serving the capital region and southern Albania.",
    },
    shkoderDescription: {
      sq: "Selia e kompanisë dhe qendra kryesore e operacioneve që nga viti 1995, me zyrë dhe showroom.",
      en: "Company headquarters and primary operations center since 1995. Main office and showroom.",
    },
    lacDescription: {
      sq: "Depo rajonale veriore për stok dhe furnizim të shpejtë në Kurbin dhe zonat përreth.",
      en: "Northern regional storage and fast-delivery depot for Kurbin and surrounding districts.",
    },
  },

  // ── Timeline ──────────────────────────────────────────────────────────
  timeline: {
    eyebrow: { sq: "Historia Jonë", en: "Our History" },
    title: { sq: "Tre dekada zhvillimi dhe besimi.", en: "Three decades of growth." },
    m1Title: { sq: "Themelimi", en: "Foundation" },
    m1Desc: {
      sq: "Sukaj SHPK u themelua në zonën e Shkodrës si kompani tregtare e specializuar në import-eksportin e materialeve plastike.",
      en: "Sukaj SHPK established in the Shkodër area as a specialized trading company focused on import-export of plastic materials.",
    },
    m2Title: { sq: "Ristrukturimi i Kapitalit", en: "Capital Restructuring" },
    m2Desc: {
      sq: "Kompania realizoi ristrukturim të rëndësishëm të kapitalit, duke arritur 74,482,766 ALL dhe zgjeruar partneritetet me shumicë në Evropën Juglindore.",
      en: "Major capital restructuring reaching 74,482,766 ALL. Expanding wholesale partnerships across Southeast Europe.",
    },
    m3Title: { sq: "Zgjerimi Evropian", en: "European Expansion" },
    m3Desc: {
      sq: "U formalizuan partneritete me Konti Hidroplast dhe FITT, duke forcuar pozicionin e kompanisë si distributore kryesore e sistemeve të tubave në Ballkan.",
      en: "Formal partnerships with Konti Hidroplast and FITT. Becoming a premier pipe-system distributor for the Balkans.",
    },
    m4Title: { sq: "Rrjeti Rajonal", en: "Regional Network" },
    m4Desc: {
      sq: "U konsolidua rrjeti me 12 partnerë prodhues në 7 vende: Shqipëri, Kosovë, Maqedoni e Veriut, Serbi, Greqi, Itali dhe Turqi.",
      en: "Consolidated a network of 12 partner manufacturers across 7 countries — Albania, Kosovo, North Macedonia, Serbia, Greece, Italy, and Turkey.",
    },
  },
} as const;

/**
 * Product name & description translations.
 * Keys match `ProductGroup.id` from products-data.ts.
 * Albanian copy is adapted — not literal translation — to sound professional
 * and natural in the B2B pipe/infrastructure industry context.
 */
export const productTranslations: Record<
  string,
  { name: { sq: string; en: string }; shortName: { sq: string; en: string }; description: { sq: string; en: string } }
> = {
  // ── CIVIL ──────────────────────────────────────────────────────────────────
  "pe100-pressure-pipe": {
    name: { sq: "Tub Ujësjellësi PE100", en: "PE100 Pressure Pipe" },
    shortName: { sq: "PE100", en: "PE100" },
    description: {
      sq: "Tub presioni PE100 me densitet të lartë për shpërndarje uji të pijshëm, linja kryesore ujitjeje dhe aplikime industriale me presion. Certifikuar sipas EN 12201 dhe ISO 4427 për siguri maksimale.",
      en: "High-density polyethylene PE100 pressure pipe for potable water distribution, irrigation mains, and pressurised industrial applications.",
    },
  },
  "corrugated-hdpe-sewage": {
    name: { sq: "Tub Kanalizimi i Brinjëzuar (Korregate) HDPE", en: "Corrugated HDPE Sewage Pipe" },
    shortName: { sq: "HDPE i Korruguar", en: "Corrugated HDPE" },
    description: {
      sq: "Tub i korruguar me mur të dyfishtë HDPE me sipërfaqe të brendshme të lëmuar, projektuar për kanalizim gravitacional, ujëra atmosferike dhe kullim nëntokësor. Disponueshëm në klasa ngurtësie SN4 dhe SN8.",
      en: "Double-wall corrugated HDPE pipe with smooth inner bore and structured outer wall, designed for gravity sewage, stormwater, and sub-surface drainage. Available in SN4 and SN8 ring-stiffness classes.",
    },
  },
  "pph-drainage-pipe": {
    name: { sq: "Tub Shkarkimi PP-H", en: "PP-H Gravity Drainage Pipe" },
    shortName: { sq: "PP-H Shkarkim", en: "PP-H Drainage" },
    description: {
      sq: "Tub kullimi gravitacional PP-H me veshje të bardhë të brendshme për kullim ndërtesash, kolona sanitare dhe ventilim.",
      en: "PP-H gravity drainage pipe with distinctive white lining for building drainage, soil stacks, and ventilation.",
    },
  },
  "fitt-mint": {
    name: { sq: "FITT Mint", en: "FITT Mint" },
    shortName: { sq: "FITT Mint", en: "FITT Mint" },
    description: {
      sq: "FITT Mint është një zorrë kopshti PVC me katër shtresa, projektuar për përdorim hobi në ujitjen e kopshteve. Shtresa e brendshme e zezë pengon rritjen e algave.",
      en: "FITT Mint is a four-layer PVC garden hose designed for regular hobby use in garden watering and irrigation.",
    },
  },
  "fitt-mimosa": {
    name: { sq: "FITT Mimosa", en: "FITT Mimosa" },
    shortName: { sq: "FITT Mimosa", en: "FITT Mimosa" },
    description: {
      sq: "FITT Mimosa është një zorrë PVC me tre shtresa për përdorim gjysmë-profesional në mjedise bujqësore dhe ujitje intensive kopshtesh.",
      en: "FITT Mimosa is a three-layer PVC hose for semi-professional use in agricultural environments and intensive garden irrigation.",
    },
  },
  "hdpe-socket-coupling": {
    name: { sq: "Bashkues Socket HDPE", en: "HDPE Socket Coupling" },
    shortName: { sq: "Bashkues Socket", en: "Socket Coupler" },
    description: {
      sq: "Bashkues HDPE të formuar me injeksion dhe rrotullim për lidhjen e tubave të korruguar të kanalizimit dhe kullimit.",
      en: "Injection-moulded and rotomoulded HDPE sockets for joining corrugated sewage and drainage pipes.",
    },
  },
  "decorative-plastic-planters": {
    name: { sq: "Vazo Dekorative Plastike Roto", en: "Roto Decorative Plastic Planters" },
    shortName: { sq: "Vazo Dekorative", en: "Roto Planters" },
    description: {
      sq: "Koleksion i plotë vazosh dekorative plastike nga Roto (Maqedonia e Veriut): Edelweis (teksturë guri, drejtkëndëshe S/L/XL), Stoniness (rrumbullakët efekt guri S/M/L/XL), Jazz (elegante S/M/L), Rumba (grykë e gjerë S/M/L), Barrel (formë fuçie S/M/L), Nusa (me brinjë, drejtkëndëshe dhe rrumbullakët) dhe gamë fantazi Tulip, Shoe, Elephant e të tjera.",
      en: "Full collection of decorative plastic planters by Roto (North Macedonia): Edelweis (stone-texture rectangular S/L/XL), Stoniness (round stone-effect S/M/L/XL), Jazz (sleek S/M/L), Rumba (wide-mouth S/M/L), Barrel (barrel-shaped S/M/L), Nusa (ribbed rectangular and round), plus the novelty Tulip, Shoe, Elephant and more.",
    },
  },
  "palaplast-hdpe100-irrigation": {
    name: { sq: "Tuba Ujitjeje Palaplast — LDPE, HDPE & PE100", en: "Palaplast Irrigation Pipes — LDPE, HDPE & PE100" },
    shortName: { sq: "Palaplast Ujitje", en: "Palaplast Irrigation" },
    description: {
      sq: "Gamë e plotë tubash ujitjeje nga Palaplast: LDPE 6 ATM (Ø20–32 mm), HDPE 6 ATM (Ø40–110 mm), HDPE 10 ATM (Ø20–75 mm) dhe PE100 PN4–PN16 (Ø16–160 mm) sipas EN 12201-2.",
      en: "Full Palaplast irrigation pipe range: LDPE 6 ATM (Ø20–32 mm), HDPE 6 ATM (Ø40–110 mm), HDPE 10 ATM (Ø20–75 mm), and PE100 PN4–PN16 (Ø16–160 mm) to EN 12201-2.",
    },
  },
  "palaplast-compression-fittings": {
    name: { sq: "Fitingje Kompresioni Palaplast", en: "Palaplast Compression Fittings" },
    shortName: { sq: "Fitingje PE", en: "PE Compression Fittings" },
    description: {
      sq: "Fitingje kompresioni PN10 ATM nga polipropilen i cilësisë së lartë për lidhje pa vegla të tubave PE dhe HDPE. Gama Rekorder 10 ATM për presione më të larta.",
      en: "PN10 ATM compression fittings from high-quality polypropylene for tool-free connections to PE and HDPE pipes. Rekorder 10 ATM range for higher-pressure applications.",
    },
  },
  "palaplast-irrigation-filter": {
    name: { sq: "Filtër Ujitjeje Palaplast", en: "Palaplast Irrigation Filter" },
    shortName: { sq: "Filtër PP", en: "PP Filter" },
    description: {
      sq: "Filtra plastikë ujitjeje për mbrojtjen e emetuesve, mikro-spërkatësve dhe valvolave nga rëra dhe sedimenti.",
      en: "Plastic irrigation filters for protecting drip emitters, micro-sprinklers, and valves from sand and sediment.",
    },
  },
  "ferplast-drainage-pipe": {
    name: { sq: "Tub Dranazhimi HDPE-LDPE", en: "HDPE Perforated Sub-Surface Drainage Pipe" },
    shortName: { sq: "HDPE-LDPE Drenazh", en: "Perforated Drainage" },
    description: {
      sq: "Tuba kullimi HDPE të perforuar sipas EN 13476-3 dhe ISO 9969 për kullim nëntokësor të tokës bujqësore dhe rrugore.",
      en: "Perforated HDPE sub-surface drainage pipes to EN 13476-3 and ISO 9969 for agricultural land and road drainage.",
    },
  },
  "electric-conduit-hdpe": {
    name: { sq: "Tuba për Kabllo Elektrik", en: "Electrical Cable Conduit" },
    shortName: { sq: "Tuba Elektrik", en: "Electric Conduit" },
    description: {
      sq: "Tubat elektrik HDPE me dy shtresa (double wall) dhe me fije plastike sipas EN 50086-2-4. Konstruksioni me dy shtresa siguron rezistencë të lartë. Disponohen në dy gama: Ø16-32mm (ngjyra të ndryshme) dhe Ø40-160mm.",
      en: "HDPE double-wall electrical conduits with plastic thread to EN 50086-2-4. Double-layer construction ensures high strength. Available in two ranges: Ø16-32mm (various colors) and Ø40-160mm.",
    },
  },
  "optical-monotube-hdpe": {
    name: { sq: "Tub Optik Monotub Mbrojtës Kabllosh HDPE", en: "HDPE Optical Monotube Cable Protection" },
    shortName: { sq: "Monotub Optik", en: "Optical Monotube" },
    description: {
      sq: "Tuba HDPE me dy shtresa për mbrojtje kabllosh optikë dhe telekomunikacioni. Sipërfaqja e brendshme e lëmuar dhe e jashtme e valëzuar. Ideale për kalime rrugore, instalime nëntokësore. Jetëgjatësi 50+ vjet.",
      en: "HDPE double-wall pipes for optical and telecommunication cable protection. Smooth interior and corrugated exterior surface. Ideal for road crossings and underground installations. 50+ years service life.",
    },
  },
  "optical-bitube-hdpe": {
    name: { sq: "Tub Optik Bitub Mbrojtës Kabllosh HDPE", en: "HDPE Optical Bitube Cable Protection" },
    shortName: { sq: "Bitub Optik", en: "Optical Bitube" },
    description: {
      sq: "Tuba HDPE bitub (dy tuba) me dy shtresa për mbrojtje kabllosh optikë. Sistemi me dy tuba optimizon hapësirën dhe instalimin. Sipërfaqja e brendshme e lëmuar dhe e jashtme e valëzuar. Jetëgjatësi 50+ vjet.",
      en: "HDPE bitube (dual tube) double-wall pipes for optical cable protection. Dual-tube system optimizes space and installation. Smooth interior and corrugated exterior surface. 50+ years service life.",
    },
  },
  "polins-manual-sprayer": {
    name: { sq: "Spërkatës Manual Kopshti Polins", en: "Polins Manual Garden Sprayer" },
    shortName: { sq: "Spërkatës Manual", en: "Manual Sprayer Range" },
    description: {
      sq: "Gamë e plotë spërkatësish manualë me pompë për kopësht nga Polins doo. Të gjithë modelet kanë pompë bronzi dhe grykë bakri.",
      en: "Complete range of manual pump-action garden sprayers from Polins doo. All models feature brass pump and copper nozzle.",
    },
  },
  "polins-water-trough": {
    name: { sq: "Valetë Uji për Shpendë Polins", en: "Polins Livestock Water Trough" },
    shortName: { sq: "Valetë Uji", en: "Water Trough" },
    description: {
      sq: "Valetë uji HDPE të qëndrueshme për shpendë dhe bagëti të vogla. Prodhuar nga Polins doo, Serbi.",
      en: "Durable HDPE livestock water troughs for poultry and small livestock. Manufactured by Polins doo, Serbia.",
    },
  },
  "polins-feed-trough": {
    name: { sq: "Valetë Ushqyese për Shpendë Polins", en: "Polins Livestock Feed Trough" },
    shortName: { sq: "Valetë Ushqimi", en: "Feed Trough" },
    description: {
      sq: "Valetë ushqyese polipropileni për shpendë dhe bagëti të vogla. Ndërtim i fortë PP me jetëgjatësi të lartë.",
      en: "Polypropylene feed troughs for poultry and small livestock. Robust PP construction with long service life.",
    },
  },
  "polins-milk-canister": {
    name: { sq: "Bidon Qumështi & Mjalti Polins", en: "Polins Food-Grade Milk & Honey Canister" },
    shortName: { sq: "Bidon Qumështi", en: "Milk Canister" },
    description: {
      sq: "Bidona HDPE për kontakt me ushqime për magazinim të sigurt të qumështit, mjaltit dhe lëngjeve ushqimore në ferma.",
      en: "Food-grade HDPE canisters for safe storage of milk, honey, and food liquids on farms.",
    },
  },
  "polins-water-canister": {
    name: { sq: "Bidon Uji HDPE Polins", en: "Polins HDPE Water Canister" },
    shortName: { sq: "Bidon Uji", en: "Water Canister" },
    description: {
      sq: "Bidona HDPE për magazinim uji të pijshëm dhe lëngje të përgjithshme. Në 10 L dhe 20 L.",
      en: "HDPE water storage canisters for drinking water and general purpose liquid storage. Available in 10 L and 20 L.",
    },
  },
  "palaplast-end-caps-joiners": {
    name: { sq: "Tapa, Bashkuese & Emetues Pikash Palaplast", en: "Palaplast End Caps, Pipe Joiners & Drip Emitters" },
    shortName: { sq: "Tapa · Bashkuese · Emetues", en: "Caps · Joiners · Emitters" },
    description: {
      sq: "Aksesorë ujitjeje Palaplast: tapa tubash, bashkuese kallami dhe emetues pikash për sisteme ujitjeje.",
      en: "Palaplast irrigation accessories: pipe end caps, pipe joiners/couplings, and drip emitters for irrigation systems.",
    },
  },
  "palaplast-saracineska-valve": {
    name: { sq: "Saracineska Plastike Palaplast", en: "Palaplast Plastic Stopcock (Saracineska)" },
    shortName: { sq: "Saracineska", en: "Saracineska Valve" },
    description: {
      sq: "Valvola saracineska plastike për tuba ujitjeje PE dhe LDPE. Modele standarde dhe kompakte për menaxhim rrjeti.",
      en: "Plastic inline stopcock valves for PE and LDPE irrigation pipes. Standard and compact models for network management.",
    },
  },
  "perplast-pvc-hose": {
    name: { sq: "Zorrë PVC Perplast — Classic & Flexoper-3", en: "Perplast PVC Hose — Classic & Flexoper-3" },
    shortName: { sq: "Perplast PVC", en: "Perplast PVC" },
    description: {
      sq: "Gama e zorrave PVC nga Perplast Kompani: Classic me shumë shtresa për ujitje të përgjithshme kopshti dhe Flexoper-3 me tre shtresa e përforcuar me rezistencë më të lartë presioni.",
      en: "Perplast's PVC hose range: Classic multi-layer for general garden and agricultural watering, and Flexoper-3 reinforced three-layer with improved burst pressure resistance.",
    },
  },
  "confort-ppht-pipes": {
    name: { sq: "Tuba & Fitingje Kullimi PPHT Confort", en: "Confort PPHT Building Drainage Pipe & Fittings" },
    shortName: { sq: "Tub PPHT", en: "PPHT Pipe" },
    description: {
      sq: "Tuba dhe fitingje PPHT me dy shtresa sipas EN 1329-1 për kanalizim të brendshëm ndërtesash.",
      en: "Two-layer PPHT pipes and fittings to EN 1329-1 for internal building sewage and waste-water drainage.",
    },
  },
  "confort-pvc-fittings": {
    name: { sq: "Fitingje Kanalizimi & Kullimi PVC Confort", en: "Confort PVC Sewage & Drainage Fittings" },
    shortName: { sq: "Fitingje PVC", en: "PVC Fittings" },
    description: {
      sq: "Fitingje PVC nga Confort për sisteme tubash me temperaturë të lartë e të ulët, kanalizim nëntokësor dhe kullim.",
      en: "PVC fittings from Confort for high and low temperature piping, buried sewage, and drainage systems.",
    },
  },
  "confort-ppr-pipes": {
    name: { sq: "Tuba & Fitingje PPR për Ujë të Nxehtë & të Ftohtë Confort", en: "Confort PPR Hot & Cold Water Pipe & Fittings" },
    shortName: { sq: "Tub PPR", en: "PPR Pipe" },
    description: {
      sq: "Tuba dhe fitingje PPR për ujë të pijshëm të nxehtë e të ftohtë, ngrohje qendrore dhe ngrohje nën dysheme.",
      en: "PPR pipes and fittings for hot and cold potable water, central heating, and underfloor heating systems.",
    },
  },
  "confort-pvc-gutters": {
    name: { sq: "Llukat & Ullukë Shiu PVC Confort", en: "Confort PVC Rectangular Gutters & Rainpipes" },
    shortName: { sq: "Llukat PVC", en: "PVC Gutters" },
    description: {
      sq: "Llukat drejtkëndëshe PVC dhe ullukë shiu për kullim ujërash. Sistem i plotë me mbajtëse dhe lidhëse.",
      en: "PVC rectangular gutters and downpipes for rainwater drainage. Full system with brackets and connectors.",
    },
  },
  "confort-pp-manholes": {
    name: { sq: "Pusëta & Inspektime PP Confort", en: "Confort PP Manholes & Inspection Sumps" },
    shortName: { sq: "Pusëtë PP", en: "PP Manhole" },
    description: {
      sq: "Pusëta dhe gropa inspektimi polipropileni për sisteme kanalizimi nëntokësor. Prodhuar në Shqipëri.",
      en: "Polypropylene manholes and inspection sumps for underground sewage systems. Made in Albania.",
    },
  },
  "xier-upvc-ball-valve": {
    name: { sq: "Valvol Sferike UPVC Xier — Dorezë e Gjatë", en: "Xier UPVC Compact Ball Valve — Long Handle" },
    shortName: { sq: "Valvol UPVC", en: "UPVC Ball Valve" },
    description: {
      sq: "Valvol sferike kompakte UPVC me hapje të plotë për furnizim uji, ujitje dhe aplikime industriale.",
      en: "Full-bore UPVC compact ball valve for water supply, irrigation, and industrial applications.",
    },
  },
  "polins-battery-sprayer-electra-lux": {
    name: { sq: "Spërkatës me Bateri Polins Electra Lux", en: "Polins Battery Sprayer Electra Lux" },
    shortName: { sq: "Electra Lux", en: "Electra Lux" },
    description: {
      sq: "Spërkatës shpine me bateri nga gama Electra Lux për pemëtore, vreshta dhe sipërfaqe të gjera bujqësore. Disponueshëm në 12 L dhe 16 L.",
      en: "Battery backpack sprayer in the Electra Lux range for orchards, vineyards, and broad-acre application. Available in 12 L and 16 L.",
    },
  },

  // ── AGRI (new consolidated entries) ────────────────────────────────────────
  "plastika-nv-agri-film": {
    name: { sq: "Film Bujqësor PE Plastika NV", en: "Plastika NV Agricultural PE Film" },
    shortName: { sq: "Film Bujqësor", en: "Agri Film" },
    description: {
      sq: "Film polietileni i stabilizuar ndaj UV nga Plastika NV për mbulesë serrash dhe bujqësi. Disponueshëm: 2-vjeçar (4 m × 100 m në 50 kg ose 60 kg), 2-vjeçar ekstra i gjerë (6.3 m × 100 m) dhe film i bardhë (4 m × 100 m).",
      en: "UV-stabilised polyethylene film from Plastika NV for greenhouse and agricultural use. Available as: 2-year (4 m × 100 m in 50 kg or 60 kg rolls), 2-year extra-wide (6.3 m × 100 m), and white PE film (4 m × 100 m).",
    },
  },

  // ── CIVIL (new consolidated entries) ───────────────────────────────────────
  "pe100rc-water-pipe": {
    name: { sq: "Tub Ujësjellësi PE-100 RC", en: "PE-100 RC Water Supply Pipe" },
    shortName: { sq: "PE-100 RC", en: "PE-100 RC" },
    description: {
      sq: "PE-100 RC (Rezistencë ndaj Çarjes) — variant i specializuar i PE-100 me rezistencë të jashtëzakonshme ndaj rritjes së ngadaltë të çarjeve. Ideal për instalim pa hendek dhe zona me ngarkesë të lartë.",
      en: "PE-100 RC (Resistance to Crack) — a specialist variant of PE-100 with exceptional resistance to slow crack growth. Ideal for trenchless installation and high-stress environments.",
    },
  },
  "hdpe-cable-conduit": {
    name: { sq: "Kanal Mbrojtës Kabllosh HDPE", en: "HDPE Cable & Optic Conduit" },
    shortName: { sq: "Kanal Kabllosh", en: "Cable Conduit" },
    description: {
      sq: "Kanale mbrojtëse HDPE për kabllo elektrike dhe fibër optike nëntokësore. Disponueshëm në variante: kanal i brendshëm me brinjë (spirale), monotub optik PTT dhe tub me mur të dyfishtë (i korruguar jashtë, i lëmuar brenda).",
      en: "HDPE protective conduit for underground electrical cables and fibre optics. Available as ribbed inner duct (coil), PTT optic monotube, and double-wall pipe (corrugated outer / smooth inner).",
    },
  },
  "roto-water-tanks": {
    name: { sq: "Depozitë Uji HDPE Roto", en: "Roto HDPE Water Storage Tanks" },
    shortName: { sq: "Depozitë Roto", en: "Roto Water Tanks" },
    description: {
      sq: "Gamë e plotë depozitash uji HDPE të formuara me rrotullim nga Roto (Maqedonia e Veriut). Kapacitete nga 60 L deri 5000 L — modelet Barrel OTW (katrore), Cisternë OTW (të mëdha), TCW Vezake (ovale vertikale) dhe tanke me kapacitet të madh.",
      en: "Complete range of rotationally moulded HDPE water storage tanks by Roto (North Macedonia). Capacities from 60 L to 5000 L — Barrel OTW (square), OTW Cisterna (large), TCW Vezake (vertical oval), and large-capacity tanks.",
    },
  },

  // ── INDUSTRIAL ─────────────────────────────────────────────────────────────
  "sel-polimer-pvc-hoses": {
    name: { sq: "Zorrë PVC & Spirale SEL-Polimer", en: "SEL-Polimer PVC & Spiral Hoses" },
    shortName: { sq: "SEL-Polimer", en: "SEL-Polimer" },
    description: {
      sq: "Gamë e plotë zorrave PVC nga SEL-Polimer: Troy ST transparente me spirale PVC (Ø13–120 mm, thithëse & shpërndarëse), Troy Green spirale me ngjyrë (Ø19–120 mm) dhe Caramel zorrë kopshti (½″–1″) për ujitje dhe lidhje të përgjithshme.",
      en: "Full PVC hose range from SEL-Polimer: Troy ST clear spiral hose (Ø13–120 mm, suction & delivery), Troy Green coloured spiral (Ø19–120 mm), and Caramel garden hose (½″–1″) for irrigation and general connection.",
    },
  },
};

export type TranslationKey = string;

/**
 * Helper to get a translation by dotted path, e.g. `t("nav.civil")`.
 */
export function getTranslation(locale: Locale, key: string): string {
  const parts = key.split(".");
  let current: unknown = translations;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key; // fallback to key on missing
    }
  }
  if (current && typeof current === "object" && locale in current) {
    return (current as Record<Locale, string>)[locale];
  }
  // graceful fallback to en if sq is missing, then to key
  if (current && typeof current === "object" && "en" in current) {
    return (current as Record<string, string>).en;
  }
  return key;
}
