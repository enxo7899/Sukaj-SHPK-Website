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
  "pe100-pressure-pipe": {
    name: { sq: "Tub Presioni PE100", en: "PE100 Pressure Pipe" },
    shortName: { sq: "PE100", en: "PE100" },
    description: {
      sq: "Tub presioni PE100 me densitet të lartë për shpërndarje uji të pijshëm, linja kryesore ujitjeje dhe aplikime industriale me presion. Certifikuar sipas EN 12201 dhe ISO 4427 për siguri maksimale.",
      en: "High-density polyethylene PE100 pressure pipe for potable water distribution, irrigation mains, and pressurised industrial applications.",
    },
  },
  "corrugated-hdpe-sewage": {
    name: { sq: "Tub Kanalizimi i Korruguar HDPE", en: "Corrugated HDPE Sewage Pipe" },
    shortName: { sq: "HDPE i Korruguar", en: "Corrugated HDPE" },
    description: {
      sq: "Tub i korruguar me mur të dyfishtë HDPE me sipërfaqe të brendshme të lëmuar, projektuar për kanalizim gravitacional, ujëra atmosferike dhe kullim nëntokësor.",
      en: "Double-wall corrugated HDPE pipe with smooth inner bore and structured outer wall, designed for gravity sewage, stormwater, and sub-surface drainage.",
    },
  },
  "spiral-pp-sewage-pipe": {
    name: { sq: "Tub Kanalizimi PP Spiral", en: "Spiral PP Sewage Pipe" },
    shortName: { sq: "PP Spirale", en: "Spiral PP" },
    description: {
      sq: "Tub polipropileni me mur të strukturuar spiral për kanalizime kryesore me diametër të madh dhe ujëra të ndotura industriale.",
      en: "Spiral-wound polypropylene structured-wall pipe for large-diameter trunk sewers and industrial wastewater.",
    },
  },
  "pe-gas-pipe": {
    name: { sq: "Tub Shpërndarjeje Gazi PE", en: "PE Gas Distribution Pipe" },
    shortName: { sq: "PE Gaz", en: "PE Gas" },
    description: {
      sq: "Tub shpërndarjeje gazi PE100-RC me vijë të verdhë karakteristike për identifikim të sigurt në rrjetet e gazit natyror dhe GLN.",
      en: "PE100-RC gas distribution pipe with characteristic yellow stripe for identification in natural gas and LPG networks.",
    },
  },
  "electric-optic-conduit": {
    name: { sq: "Tub Mbrojtës për Kabllo Elektrike & Optike", en: "Electric & Optical Conduit" },
    shortName: { sq: "Kanal HDPE", en: "HDPE Conduit" },
    description: {
      sq: "Tub kanali HDPE për mbrojtjen nëntokësore të kabllove elektrike, linjave me fibër optike dhe infrastrukturës së telekomunikacionit.",
      en: "HDPE conduit pipe for underground protection of electrical cables, fibre-optic lines, and telecommunications infrastructure.",
    },
  },
  "pph-drainage-pipe": {
    name: { sq: "Tub Kullimi Gravitacional PP-H", en: "PP-H Gravity Drainage Pipe" },
    shortName: { sq: "PP-H Kullim", en: "PP-H Drainage" },
    description: {
      sq: "Tub kullimi gravitacional PP-H me veshje të bardhë të brendshme për kullim ndërtesash, kolona sanitare dhe ventilim.",
      en: "PP-H gravity drainage pipe with distinctive white lining for building drainage, soil stacks, and ventilation.",
    },
  },
  "hdpe-inspection-chamber": {
    name: { sq: "Pusëtë Inspektimi HDPE", en: "HDPE Inspection Chamber" },
    shortName: { sq: "Pusëtë Inspektimi", en: "Inspection Chamber" },
    description: {
      sq: "Pusëtë inspektimi e parafabrikuar HDPE për rrjete kanalizimi gravitacional dhe stuhi uji. Montim i shpejtë në kantier.",
      en: "Prefabricated HDPE inspection chamber for gravity sewage and stormwater networks. Fast on-site assembly.",
    },
  },
  "water-storage-tank": {
    name: { sq: "Depozitë Uji Plastike", en: "Plastic Water Storage Tank" },
    shortName: { sq: "Depozitë Uji", en: "Water Tank" },
    description: {
      sq: "Depozita uji HDPE të formuara me rrotullim për furnizim rezidencial, bujqësor dhe industrial të lehtë. Certifikuar për kontakt me ushqime.",
      en: "Rotationally moulded HDPE water storage tanks for residential, agricultural, and light industrial water supply.",
    },
  },
  "construction-damp-proof-membrane": {
    name: { sq: "Membranë Hidroizoluese për Ndërtim", en: "Construction Damp-Proof Membrane" },
    shortName: { sq: "Membranë", en: "DPM" },
    description: {
      sq: "Membranë hidroizoluese polietileni e rëndë për nën-pllaka dhe themele. Prodhuar nga granulat PE të ricikluara.",
      en: "Heavy-duty polyethylene damp-proof membrane for under-slab and foundation waterproofing.",
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
  "pvc-garden-hose": {
    name: { sq: "Zorrë Kopshti & Ujitjeje PVC", en: "PVC Garden & Irrigation Hose" },
    shortName: { sq: "Zorrë PVC", en: "PVC Hose" },
    description: {
      sq: "Zorrë fleksibël PVC me përforcim fije tekstili për rezistencë më të mirë ndaj shpërthimit dhe përdredhjes.",
      en: "Flexible PVC garden hose with textile yarn reinforcement for improved burst pressure and kink resistance.",
    },
  },
  "drip-irrigation-pipe": {
    name: { sq: "Tub Ujitjeje me Pika", en: "Drip Irrigation Lateral Pipe" },
    shortName: { sq: "Ujitje me Pika", en: "Drip Lateral" },
    description: {
      sq: "Tub anësor LDPE me mur të hollë për ujitje me pika, me emetues të integruar ose të futshëm në distanca 20, 30 ose 50 cm.",
      en: "Thin-wall LDPE drip irrigation lateral with integrated or insertable emitters at 20, 30, or 50 cm spacing.",
    },
  },
  "pe-irrigation-mainline": {
    name: { sq: "Tub Kryesor Ujitjeje PE100", en: "PE100 Irrigation Mainline" },
    shortName: { sq: "Linjë Kryesore", en: "Irrigation Main" },
    description: {
      sq: "Tub kryesor PE100 me mur solid për rrjete ujitjeje me presion. Klasat PN10 dhe PN16 për shpërndarje të besueshme uji.",
      en: "PE100 solid-wall mainline pipe for pressurised sprinkler and drip irrigation networks.",
    },
  },
  "agricultural-film": {
    name: { sq: "Film Bujqësor Polietileni", en: "Agricultural Polyethylene Film" },
    shortName: { sq: "Film Bujqësor", en: "Agri Film" },
    description: {
      sq: "Film PE i stabilizuar ndaj UV për mbulesë serrash, mulçim toke dhe silazhë. I disponueshëm në të zezë/transparente.",
      en: "UV-stabilised PE film for greenhouse cover, ground mulching, and silage.",
    },
  },
  "industrial-rubber-hose": {
    name: { sq: "Zorrë Industriale Gome", en: "Industrial Rubber Hose" },
    shortName: { sq: "Zorrë Gome", en: "Rubber Hose" },
    description: {
      sq: "Zorrë gome e rëndë për ajër të kompresuar, ujë, vaj dhe transfer kimik në mjedise industriale, ndërtimi dhe minierat.",
      en: "Heavy-duty rubber hoses for compressed air, water, oil, and chemical transfer in industrial, construction, and mining environments.",
    },
  },
  "pvc-suction-hose": {
    name: { sq: "Zorrë Thithëse & Shpërndarëse PVC", en: "PVC Suction & Delivery Hose" },
    shortName: { sq: "Thithëse PVC", en: "PVC Suction" },
    description: {
      sq: "Zorrë fleksibël thithëse PVC me spirale të ngurtë PVC për ruajtjen e formës nën vakum. Për ujë, llum dhe transferim të lehtë kimik.",
      en: "Flexible PVC suction and delivery hose with rigid PVC spiral helix for shape retention under vacuum.",
    },
  },
  "spiral-transparent-hose": {
    name: { sq: "Zorrë Transparente me Spirale", en: "Spiral Transparent Hose" },
    shortName: { sq: "Zorrë Spirale", en: "Spiral Hose" },
    description: {
      sq: "Zorrë PVC transparente ose me ngjyrë karameli me përforcim spirale të ngurtë për thithje dhe shpërndarje uji dhe lëngjesh të lehta.",
      en: "Clear or caramel-tinted PVC spiral hose with rigid helix reinforcement for suction and delivery of water and light liquids.",
    },
  },
  "recycled-pe-granulates": {
    name: { sq: "Granulat PE të Ricikluara", en: "Recycled PE Granulates" },
    shortName: { sq: "Granulat PE", en: "PE Granulates" },
    description: {
      sq: "Granulat polietileni post-industriale dhe post-konsumuese si lëndë bazë për prodhimin e filmave, tubave dhe produkteve plastike.",
      en: "Post-industrial and post-consumer polyethylene granulates for use as base material in film extrusion, pipe production, and injection moulding.",
    },
  },
  "industrial-packaging-film": {
    name: { sq: "Film Paketimi Industrial PE", en: "Industrial PE Packaging Film" },
    shortName: { sq: "Film Paketimi", en: "Packaging Film" },
    description: {
      sq: "Filma PE për mbështjellje paletash, grupim produktesh dhe paketim mbrojtës industrial.",
      en: "Stretch and shrink PE films for pallet wrapping, product bundling, and protective industrial packaging.",
    },
  },
  "pe-water-storage-tank": {
    name: { sq: "Depozitë Uji Polietileni", en: "Polyethylene Water Storage Tank" },
    shortName: { sq: "Depozitë PE", en: "PE Water Tank" },
    description: {
      sq: "Depozita HDPE njëpjesëshe të formuara me rrotullim për magazinim uji rezidencial, bujqësor dhe komunal. Të stabilizuara ndaj UV.",
      en: "Rotationally moulded one-piece HDPE tanks for residential, agricultural, and municipal water storage.",
    },
  },
  "pvc-underground-drainage": {
    name: { sq: "Tub Kullimi Nëntokësor PVC", en: "PVC Underground Drainage Pipe" },
    shortName: { sq: "Kullim PVC", en: "PVC Drainage" },
    description: {
      sq: "Tub PVC-U për kullim gravitacional, kanalizim komunal dhe mbrojtje kabllosh nëntokësore.",
      en: "PVC-U pipe for gravity drainage, municipal sewerage, and underground cable protection.",
    },
  },
  "food-grade-barrel": {
    name: { sq: "Fuçi Plastike për Ushqime", en: "Food-Grade Plastic Barrel" },
    shortName: { sq: "Fuçi Ushqimore", en: "Food Barrel" },
    description: {
      sq: "Fuçi HDPE të certifikuara për kontakt me ushqime për magazinim dhe transport lëngjesh, gjysmë-lëngjesh dhe ushqimeve të ngurta.",
      en: "EU food-contact certified HDPE barrels for storage and transport of liquids, semi-liquids, and solid foodstuffs.",
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
    name: { sq: "Vazo Dekorative Plastike", en: "Decorative Plastic Planters" },
    shortName: { sq: "Vazo Dekorative", en: "Planters" },
    description: {
      sq: "Katalog i plotë vazosh dhe mbajtësesh lulesh plastike dekorative nga Roto (Maqedonia e Veriut). Modele të ndryshme për ambiente të brendshme dhe të jashtme.",
      en: "A full catalogue of designer plastic planters and outdoor vases by Roto (North Macedonia).",
    },
  },
  "manual-sprayer-pump": {
    name: { sq: "Spërkatës Manual Kopshti", en: "Manual Garden Sprayer" },
    shortName: { sq: "Spërkatës Manual", en: "Manual Sprayer" },
    description: {
      sq: "Spërkatës manual me pompë për kopësht dhe bujqësi në shkallë të vogël. Prodhuar nga Polins doo, Serbi.",
      en: "Manual pump-action garden sprayer for hobby and small-scale agriculture. Produced by Polins doo, Serbia.",
    },
  },
  "polins-electra-lux-16": {
    name: { sq: "Spërkatës me Bateri Polins Electra Lux 16", en: "Polins Electra Lux 16 Battery Sprayer" },
    shortName: { sq: "Electra Lux 16", en: "Electra Lux 16" },
    description: {
      sq: "Spërkatës shpine me bateri 16 litra për përdorim gjysmë-profesional në sipërfaqe bujqësore dhe pemëtore.",
      en: "16-litre battery-powered back sprayer for semi-professional use across larger agricultural areas and orchards.",
    },
  },
  "palaplast-hdpe100-irrigation": {
    name: { sq: "Tub Ujitjeje HDPE 100 Palaplast", en: "Palaplast HDPE 100 Irrigation Pipe" },
    shortName: { sq: "Palaplast HDPE100", en: "Palaplast HDPE100" },
    description: {
      sq: "Tub ujitjeje HDPE 100 i prodhuar sipas EN 12201-2 për rrjete ujitjeje me presion, furnizim uji dhe aplikime industriale.",
      en: "Palaplast's HDPE 100 irrigation pipe manufactured to EN 12201-2 for pressurised irrigation, water supply, and industrial applications.",
    },
  },
  "palaplast-compression-fittings": {
    name: { sq: "Fitingje Kompresioni Palaplast", en: "Palaplast Compression Fittings" },
    shortName: { sq: "Fitingje PE", en: "PE Compression Fittings" },
    description: {
      sq: "Fitingje kompresioni PN10 ATM nga polipropilen i cilësisë së lartë për lidhje pa vegla të tubave PE dhe HDPE.",
      en: "PN10 ATM compression fittings manufactured from high-quality polypropylene for reliable tool-free connections.",
    },
  },
  "palaplast-paladrip": {
    name: { sq: "Linjë Pikuese Palaplast Paladrip", en: "Palaplast Paladrip Dripline" },
    shortName: { sq: "Paladrip", en: "Paladrip" },
    description: {
      sq: "Linjë ujitjeje me pika me emetues të integruar në distanca uniforme për shpërndarje të njëtrajtshme uji në kultura bujqësore.",
      en: "In-line drip irrigation line with flat turbulent-flow emitters integrated at uniform spacing for even water distribution.",
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
  "konti-pe100-water-pipe": {
    name: { sq: "Tub Furnizimi Uji PE-100 Konti", en: "Konti PE-100 Water Supply Pipe" },
    shortName: { sq: "PE-100 Ujësjellës", en: "PE-100 Water Pipe" },
    description: {
      sq: "Tuba furnizimi uji PE-100 nga Konti Hidroplast, të prodhuara nga polietileni me densitet të lartë i gjeneratës së tretë.",
      en: "Konti Hidroplast's PE-100 water supply pipes manufactured from third-generation high-density polyethylene.",
    },
  },
  "konti-pe100rc-water-pipe": {
    name: { sq: "Tub Furnizimi Uji PE-100 RC Konti", en: "Konti PE-100 RC Water Supply Pipe" },
    shortName: { sq: "PE-100 RC", en: "PE-100 RC Pipe" },
    description: {
      sq: "PE-100 RC (Rezistencë ndaj Çarjes) — variant i specializuar i PE-100 me rezistencë të jashtëzakonshme ndaj rritjes së ngadaltë të çarjeve.",
      en: "PE-100 RC (Resistance to Crack) is a specialist variant of PE-100 engineered for exceptional resistance to slow crack growth.",
    },
  },
  "konti-kan-corrugated-sn4": {
    name: { sq: "Tub Kanalizimi i Korruguar HDPE Konti Kan — SN4", en: "Konti Kan HDPE Corrugated Sewage Pipe — SN4" },
    shortName: { sq: "Konti Kan SN4", en: "Konti Kan SN4" },
    description: {
      sq: "Tuba kanalizimi të korruguar HDPE (klasa SN4) të prodhuar sipas EN 13476-3 dhe ISO 9969 me mur të dyfishtë.",
      en: "HDPE corrugated sewage pipes (SN4 stiffness class) manufactured to EN 13476-3 and ISO 9969.",
    },
  },
  "konti-kan-cable-duct": {
    name: { sq: "Kanal Mbrojtës Kabllosh Konti Kan", en: "Konti Kan Duct — Cable Protection Pipe" },
    shortName: { sq: "Kanal Kabllosh", en: "Cable Duct" },
    description: {
      sq: "Tuba mbrojtëse kabllosh me sipërfaqe të jashtme të lëmuar dhe brendësi me brinjë gjatësore, në spirale për instalim fleksibël.",
      en: "Cable protection pipes with smooth exterior and longitudinally ribbed interior surface, produced in coils for flexible installation.",
    },
  },
  "konti-kan-optic-cable-protection": {
    name: { sq: "Tub Mbrojtës Kabllo Optike Konti Kan", en: "Konti Kan Optic Cable Protection Pipe" },
    shortName: { sq: "Kanal Optik", en: "Optic Cable Duct" },
    description: {
      sq: "Tuba HDPE me mur të dyfishtë me sipërfaqe të jashtme të korruguar dhe të brendshme të lëmuar për mbrojtje fibër optike.",
      en: "Double-wall HDPE pipes with corrugated outer surface and smooth inner surface for fibre-optic cable protection.",
    },
  },
  "ferplast-drainage-pipe": {
    name: { sq: "Tub Kullimi HDPE Ferplast", en: "Ferplast HDPE Drainage Pipe" },
    shortName: { sq: "Kullim HDPE", en: "HDPE Drainage" },
    description: {
      sq: "Tuba kullimi HDPE sipas EN 13476-3 dhe ISO 9969 për kullim nëntokësor të tokës bujqësore dhe rrugore.",
      en: "HDPE drainage pipes manufactured to EN 13476-3 and ISO 9969 for sub-surface drainage of agricultural and road land.",
    },
  },
  "ferplast-electric-conduit": {
    name: { sq: "Kanal Kabllor Elektrik HDPE Ferplast", en: "Ferplast HDPE Electric Cable Conduit" },
    shortName: { sq: "Kanal Elektrik", en: "Electric Conduit" },
    description: {
      sq: "Kanale kabllore elektrike HDPE sipas EN 50086-2-4. Ndërtimi i korruguar siguron fleksibilitet dhe mbrojtje mekanike.",
      en: "HDPE electric cable conduits manufactured to EN 50086-2-4 with corrugated construction for flexibility and mechanical protection.",
    },
  },
  "ferplast-pe100-water-pipe": {
    name: { sq: "Tub Furnizimi Uji PE-100 / PE-100 RC Ferplast", en: "Ferplast PE-100 / PE-100 RC Water Supply Pipe" },
    shortName: { sq: "Ferplast PE-100", en: "Ferplast PE-100" },
    description: {
      sq: "Tuba furnizimi uji PE-100 dhe PE-100 RC sipas EN 12201-2 dhe ISO 4427 nga fabrika e Ferplast në Kosovë.",
      en: "PE-100 and PE-100 RC water supply pipes to EN 12201-2 and ISO 4427 from Ferplast's Kosovo production facility.",
    },
  },
  "ferplast-optic-cable-pipe": {
    name: { sq: "Tub Mbrojtës Kabllo Optike PE Ferplast", en: "Ferplast PE Optic Cable Protection Pipe" },
    shortName: { sq: "Kanal Optik", en: "Optic Cable Pipe" },
    description: {
      sq: "Tuba mbrojtëse kabllo optike PE sipas EN 12201, ISO 4427 dhe DIN 8074 nga Ferplast.",
      en: "PE optic cable protection pipes to EN 12201, ISO 4427, and DIN 8074 from Ferplast.",
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
  "palaplast-ldpe-pipe-6atm": {
    name: { sq: "Tub Ujitjeje LDPE 6 ATM Palaplast", en: "Palaplast LDPE Irrigation Pipe — 6 ATM" },
    shortName: { sq: "LDPE 6 ATM", en: "LDPE 6 ATM" },
    description: {
      sq: "Tuba ujitjeje LDPE 6 ATM si nën-anësore dhe linja dytësore kryesore në sisteme ujitjeje bujqësore.",
      en: "LDPE irrigation pipes rated at 6 ATM for sub-laterals and secondary mainlines in agricultural irrigation systems.",
    },
  },
  "palaplast-hdpe-pipe-6atm": {
    name: { sq: "Tub Ujitjeje HDPE 6 ATM Palaplast", en: "Palaplast HDPE Irrigation Pipe — 6 ATM" },
    shortName: { sq: "HDPE 6 ATM", en: "HDPE 6 ATM" },
    description: {
      sq: "Tub kryesor ujitjeje HDPE 6 ATM. Diametra Ø 40–110 mm. Për shpërndarje me presion në rrjete bujqësore.",
      en: "HDPE irrigation mainline pipe rated at 6 ATM. Sizes Ø 40–110 mm. For pressurised distribution in agricultural networks.",
    },
  },
  "palaplast-hdpe-pipe-10atm": {
    name: { sq: "Tub Ujitjeje HDPE 10 ATM Palaplast", en: "Palaplast HDPE Irrigation Pipe — 10 ATM" },
    shortName: { sq: "HDPE 10 ATM", en: "HDPE 10 ATM" },
    description: {
      sq: "Tub kryesor ujitjeje HDPE me presion të lartë 10 ATM. Për rrjete shpërndarjeje primare me presion pune më të lartë.",
      en: "High-pressure HDPE irrigation mainline pipe rated at 10 ATM for primary distribution networks requiring higher working pressure.",
    },
  },
  "palaplast-rekorder-10atm": {
    name: { sq: "Fitingje Kompresioni Rekorder 10 ATM Palaplast", en: "Palaplast Compression Fittings (Rekorder) — 10 ATM" },
    shortName: { sq: "Rekorder 10 ATM", en: "Rekorder 10 ATM" },
    description: {
      sq: "Fitingje kompresioni 10 ATM (rekorder) nga polipropilen për lidhje pa vegla të tubave PE dhe HDPE.",
      en: "10 ATM compression fittings (rekorder) from polypropylene for tool-free connection to PE and HDPE pipes.",
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
  "roto-edelweis-planter": {
    name: { sq: "Vazo Dekorative Roto Edelweis", en: "Roto Edelweis Decorative Planter" },
    shortName: { sq: "Edelweis", en: "Edelweis" },
    description: {
      sq: "Vazo dekorative drejtkëndëshe me mbarim teksture guri natyral nga Roto. Në madhësi S, L dhe XL.",
      en: "Rectangular decorative planter with natural stone-texture finish from Roto. Available in S, L, and XL.",
    },
  },
  "roto-stoniness-planter": {
    name: { sq: "Vazo Dekorative Roto Stoniness", en: "Roto Stoniness Decorative Planter" },
    shortName: { sq: "Stoniness", en: "Stoniness" },
    description: {
      sq: "Vazo rrumbullakët me efekt guri tekstural. Gama Stoniness në katër madhësi — S, M, L dhe XL.",
      en: "Round textured stone-effect garden planter. The Stoniness range in four sizes — S, M, L, and XL.",
    },
  },
  "roto-jazz-planter": {
    name: { sq: "Vazo Kopshti Roto Jazz", en: "Roto Jazz Garden Planter" },
    shortName: { sq: "Jazz", en: "Jazz" },
    description: {
      sq: "Vazo rrumbullakët Jazz në tre madhësi. Dizajn elegant për vendosje në ambiente të brendshme dhe të jashtme.",
      en: "Round Jazz garden planter in three sizes. Sleek design for indoor and outdoor placement.",
    },
  },
  "roto-rumba-planter": {
    name: { sq: "Vazo Kopshti Roto Rumba", en: "Roto Rumba Garden Planter" },
    shortName: { sq: "Rumba", en: "Rumba" },
    description: {
      sq: "Vazo rrumbullakët Rumba me grykë të gjerë në madhësi S, M dhe L. Ideale për shkurre dhe bimë voluminoze.",
      en: "Wide-mouth round Rumba garden planter in S, M, and L sizes. Ideal for shrubs and bushy plantings.",
    },
  },
  "roto-barrel-planter": {
    name: { sq: "Vazo Dekorative Roto Barrel", en: "Roto Barrel Decorative Planter" },
    shortName: { sq: "Barrel", en: "Barrel" },
    description: {
      sq: "Vazo dekorative në formë fuçie për kopësht. E disponueshme si model tekë dhe në madhësi S / M / L.",
      en: "Barrel-shaped decorative planter for gardens. Available as single model and in S / M / L sizes.",
    },
  },
  "roto-nusa-planter": {
    name: { sq: "Vazo Dekorative Roto Nusa", en: "Roto Nusa Decorative Planter" },
    shortName: { sq: "Nusa", en: "Nusa" },
    description: {
      sq: "Vazo drejtkëndëshe Nusa me brinjë dhe varianti rrumbullakët. Nga ballkoni i vogël deri në tarracë të madhe.",
      en: "Rectangular ribbed Nusa planter and round Nusa variant. From small balcony to large terrace.",
    },
  },
  "roto-novelty-planters": {
    name: { sq: "Vazo Dekorative Roto Tulip & Fantazi", en: "Roto Tulip & Novelty Decorative Planters" },
    shortName: { sq: "Gamë Fantazi", en: "Novelty Range" },
    description: {
      sq: "Gamë e gjerë vazosh dekorative fantazi nga Roto — Tulip, Shoe (Këpucë), Elephant, Sailing, dhe të tjera.",
      en: "Broad range of Roto novelty decorative planters — Tulip, Shoe, Elephant, Sailing, and more.",
    },
  },
  "roto-water-tank-otw": {
    name: { sq: "Depozitë Uji Katrore Roto OTW", en: "Roto OTW Square Water Storage Tank" },
    shortName: { sq: "OTW Barrel", en: "OTW Barrel" },
    description: {
      sq: "Depozitë uji HDPE me trup katror (Barrel OTW). Kapacitete: 60 L, 100 L, 150 L, 200 L dhe 300 L. Të grumbullueshme.",
      en: "Rotomoulded HDPE square-body water storage tank (Barrel OTW). Capacities: 60–300 L. Stackable.",
    },
  },
  "roto-cisterna-otw": {
    name: { sq: "Cisternë Uji Roto OTW", en: "Roto OTW Water Storage Cistern" },
    shortName: { sq: "Cisternë OTW", en: "OTW Cisterna" },
    description: {
      sq: "Cisterna të mëdha uji HDPE. Kapacitete 500 L, 1000 L dhe 1500 L. Për furnizim rezidencial dhe bujqësor.",
      en: "Large HDPE water cisterns. Capacities 500 L, 1000 L, and 1500 L. For residential and agricultural supply.",
    },
  },
  "roto-water-tank-tcw": {
    name: { sq: "Depozitë Uji Roto TCW Vezake", en: "Roto TCW Vezake Water Storage Tank" },
    shortName: { sq: "TCW Vezake", en: "TCW Vezake" },
    description: {
      sq: "Depozitë uji HDPE vertikale ovale (Cisternë TCW). Kapacitete nga 70 L deri 750 L.",
      en: "Vertical oval HDPE water storage tank (Cisterna TCW). Capacities from 70 L to 750 L.",
    },
  },
  "roto-plastik-tank-large": {
    name: { sq: "Depozitë Roto Plastik — Kapacitet i Madh", en: "Roto Plastik Tank — Large Capacity" },
    shortName: { sq: "Depozitë Plastik", en: "Plastik Tank" },
    description: {
      sq: "Depozita HDPE me kapacitet të madh për ujë. Madhësi 2500 L, 3500 L dhe 5000 L.",
      en: "Large-capacity HDPE storage tanks for water. Sizes 2500 L, 3500 L, and 5000 L.",
    },
  },
  "perplast-pvc-hose": {
    name: { sq: "Zorrë Kopshti PVC Perplast Classic", en: "Perplast Classic PVC Garden Hose" },
    shortName: { sq: "Perplast Classic", en: "Perplast Classic" },
    description: {
      sq: "Zorrë kopshti PVC me shumë shtresa nga Perplast Kompani për ujitje të përgjithshme kopshti dhe bujqësore.",
      en: "Perplast's Classic PVC garden hose with multi-layer construction for general garden and agricultural watering.",
    },
  },
  "perplast-flexoper-3": {
    name: { sq: "Zorrë PVC e Përforcuar Perplast Flexoper-3", en: "Perplast Flexoper-3 Reinforced PVC Hose" },
    shortName: { sq: "Flexoper-3", en: "Flexoper-3" },
    description: {
      sq: "Zorrë PVC me tre shtresa e përforcuar Flexoper-3 me rezistencë më të lartë presioni se modeli Classic.",
      en: "Three-layer reinforced PVC hose Flexoper-3 with improved pressure resistance over the Classic model.",
    },
  },
  "sel-troy-green-spiral-hose": {
    name: { sq: "Zorrë Thithëse PVC Spirale SEL-Troy Green", en: "SEL-Troy Green PVC Spiral Suction Hose" },
    shortName: { sq: "SEL-Troy Green", en: "SEL-Troy Green" },
    description: {
      sq: "Zorrë e fortë PVC thithëse dhe shpërndarëse me spirale nga SEL-Polimer për aplikime profesionale.",
      en: "Robust PVC suction and delivery spiral hose from SEL-Polimer for professional applications.",
    },
  },
  "sel-caramel-garden-hose": {
    name: { sq: "Zorrë Kopshti PVC SEL Caramel", en: "SEL Caramel PVC Garden Hose" },
    shortName: { sq: "SEL Caramel", en: "SEL Caramel" },
    description: {
      sq: "Zorrë kopshti PVC me ngjyrë karameli nga SEL-Polimer. Në stok në ½″, ¾″ dhe 1″.",
      en: "Caramel-orange PVC garden hose from SEL-Polimer. In stock in ½″, ¾″, and 1″ sizes.",
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
  "plastika-nv-agri-film-2yr-50kg": {
    name: { sq: "Film Bujqësor PE 2-Vjeçar Plastika NV — 4×100 m (50 kg)", en: "Plastika NV 2-Year Agricultural PE Film — 4×100 m (50 kg)" },
    shortName: { sq: "Film 50 kg", en: "Agri Film 50 kg" },
    description: {
      sq: "Film bujqësor PE i stabilizuar ndaj UV 2 vjeçar. Gjerësi 4 m, gjatësi 100 m, peshë 50 kg për rul.",
      en: "2-year UV-stabilised agricultural PE film. Width 4 m, length 100 m, weight 50 kg per roll.",
    },
  },
  "plastika-nv-agri-film-2yr-60kg": {
    name: { sq: "Film Bujqësor PE 2-Vjeçar Plastika NV — 4×100 m (60 kg)", en: "Plastika NV 2-Year Agricultural PE Film — 4×100 m (60 kg)" },
    shortName: { sq: "Film 60 kg", en: "Agri Film 60 kg" },
    description: {
      sq: "Film PE 2-vjeçar më i rëndë. Gjerësi 4 m, gjatësi 100 m, peshë 60 kg për rul. Për serra që kërkojnë trashësi më të madhe.",
      en: "Heavier 2-year UV-stabilised PE film roll. Width 4 m, length 100 m, weight 60 kg per roll.",
    },
  },
  "plastika-nv-agri-film-2yr-6m": {
    name: { sq: "Film Bujqësor PE 2-Vjeçar Plastika NV — 6.3×100 m (60 kg)", en: "Plastika NV 2-Year Agricultural PE Film — 6.3×100 m (60 kg)" },
    shortName: { sq: "Film 6.3 m", en: "Agri Film 6.3 m" },
    description: {
      sq: "Film PE bujqësor ekstra i gjerë 2-vjeçar. Gjerësi 6.3 m, gjatësi 100 m. Për serra me hapësirë të gjerë.",
      en: "Extra-wide 2-year UV-stabilised agricultural PE film. Width 6.3 m, length 100 m.",
    },
  },
  "plastika-nv-white-film": {
    name: { sq: "Film PE i Bardhë Bujqësor Plastika NV", en: "Plastika NV White PE Agricultural Film" },
    shortName: { sq: "Film i Bardhë", en: "White PE Film" },
    description: {
      sq: "Film polietileni i bardhë për serra ose mbulim bujqësor. Gjerësi 4 m, gjatësi 100 m.",
      en: "White PE film for greenhouse or agricultural covering. Width 4 m, length 100 m.",
    },
  },
  "ferplast-water-reservoir": {
    name: { sq: "Depozitë Uji HDPE Ferplast", en: "Ferplast HDPE Water Storage Tank" },
    shortName: { sq: "Depozitë Ferplast", en: "HDPE Water Tank" },
    description: {
      sq: "Depozita uji HDPE të formuara me rrotullim nga Ferplast, nga 500 deri 5000 litra.",
      en: "Rotationally moulded HDPE water storage tanks from Ferplast, from 500 to 5000 litres.",
    },
  },
  "ferplast-corrugated-sn4": {
    name: { sq: "Tub Kanalizimi i Korruguar HDPE Ferplast — SN4", en: "Ferplast Corrugated HDPE Sewage Pipe — SN4" },
    shortName: { sq: "Ferplast SN4", en: "Ferplast SN4" },
    description: {
      sq: "Tub kanalizimi i korruguar HDPE me klasë ngurtësie SN4 nga Ferplast.",
      en: "Double-wall corrugated HDPE sewage pipe in SN4 ring stiffness class from Ferplast.",
    },
  },
  "ferplast-corrugated-sn8": {
    name: { sq: "Tub Kanalizimi i Korruguar HDPE Ferplast — SN8", en: "Ferplast Corrugated HDPE Sewage Pipe — SN8" },
    shortName: { sq: "Ferplast SN8", en: "Ferplast SN8" },
    description: {
      sq: "Tub kanalizimi i korruguar HDPE me klasë ngurtësie SN8 nga Ferplast për ngarkesa më të rënda trafiku.",
      en: "Double-wall corrugated HDPE sewage pipe in SN8 ring stiffness class from Ferplast for heavier traffic loads.",
    },
  },
  "ferplast-pph-pipe": {
    name: { sq: "Tub Kullimi PP-H Ferplast", en: "Ferplast PP-H Gravity Drainage Pipe" },
    shortName: { sq: "Ferplast PP-H", en: "Ferplast PP-H" },
    description: {
      sq: "Tub kullimi PP-H për ujëra të ndotura ndërtesash dhe sisteme kullimi gravitacional nga Ferplast.",
      en: "Ferplast PP-H drainage pipe for building waste-water and gravity drainage systems.",
    },
  },
  "konti-kan-socket-fitting": {
    name: { sq: "Bashkues Socket Konti Kan (HDPE)", en: "Konti Kan Socket Fitting (HDPE)" },
    shortName: { sq: "Bashkues Konti", en: "Konti Socket" },
    description: {
      sq: "Bashkues socket HDPE për tuba kanalizimi të korruguar Konti Kan, në variante me injeksion dhe rrotullim.",
      en: "HDPE socket coupling for Konti Kan corrugated sewage pipes, in injection and rotomoulded variants.",
    },
  },
  "palaplast-irrigation-filters": {
    name: { sq: "Filtra Ujitjeje Palaplast", en: "Palaplast Irrigation Filters" },
    shortName: { sq: "Filtër Palaplast", en: "Palaplast Filter" },
    description: {
      sq: "Filtra plastikë ujitjeje (rrjetë/disk/hidrocionikë) për mbrojtjen e linjave pikuese nga sedimenti.",
      en: "Plastic irrigation filters (screen/disc/hydrocyclonic variants) for protecting driplines from sediment.",
    },
  },
  "polins-battery-sprayer-electra-lux": {
    name: { sq: "Spërkatës me Bateri Polins Electra Lux", en: "Polins Battery Sprayer Electra Lux" },
    shortName: { sq: "Electra Lux", en: "Electra Lux" },
    description: {
      sq: "Spërkatës shpine me bateri nga gama Electra Lux për pemëtore, vreshta dhe sipërfaqe të gjera bujqësore.",
      en: "Battery backpack sprayer in the Electra Lux range for orchards, vineyards, and broad-acre application.",
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
