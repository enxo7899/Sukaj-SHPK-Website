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
    // Common property labels
    propertyLabels: {
      "Material": { sq: "Materiali", en: "Material" },
      "Reinforcement": { sq: "Përforcimi", en: "Reinforcement" },
      "Inner Diameter": { sq: "Diametri i Brendshëm", en: "Inner Diameter" },
      "Roll Lengths": { sq: "Gjatësitë e Bobinave", en: "Roll Lengths" },
      "Bursting Pressure": { sq: "Presioni i Plasjes", en: "Bursting Pressure" },
      "Temperature Range": { sq: "Gama e Temperaturës", en: "Temperature Range" },
      "Outer Colour": { sq: "Ngjyra e Jashtme", en: "Outer Colour" },
      "Inner Layer": { sq: "Shtresa e Brendshme", en: "Inner Layer" },
      "Origin": { sq: "Origjina", en: "Origin" },
      "Guarantee": { sq: "Garancia", en: "Guarantee" },
      "Made in Italy": { sq: "Prodhuar në Itali", en: "Made in Italy" },
      "Anti-algae black": { sq: "E zezë anti-algë", en: "Anti-algae black" },
      "Polyester braided mesh": { sq: "Rrjetë e thurur poliester", en: "Polyester braided mesh" },
      "High-tenacity polyester braid": { sq: "Thurje poliester me rezistencë të lartë", en: "High-tenacity polyester braid" },
      "Opaque yellow with twin green stripes": { sq: "E verdhë opake me vija të gjelbra", en: "Opaque yellow with twin green stripes" },
      "Construction": { sq: "Ndërtimi", en: "Construction" },
      "Nozzle": { sq: "Pista", en: "Nozzle" },
      "Fittings": { sq: "Fitingjet", en: "Fittings" },
      "Environmental Impact": { sq: "Ndikimi Mjedisor", en: "Environmental Impact" },
      "Repairable": { sq: "E Riparueshme", en: "Repairable" },
      "PVC-free TPE (Thermoplastic Elastomer)": { sq: "TPE pa PVC (Elastomer Termoplastik)", en: "PVC-free TPE (Thermoplastic Elastomer)" },
      "Eco-design — 2× lighter, 3× more compact": { sq: "Eko-dizajn — 2× më e lehtë, 3× më kompakte", en: "Eco-design — 2× lighter, 3× more compact" },
      "Compact ergonomic MOMODESIGN — adjustable jet/cone": { sq: "MOMODESIGN kompakte ergonomike — rreze/kon i rregullueshëm", en: "Compact ergonomic MOMODESIGN — adjustable jet/cone" },
      "Easily replaceable premium thermoplastic": { sq: "Termoplastik premium i zëvendësueshëm lehtë", en: "Easily replaceable premium thermoplastic" },
      "−43% CO₂e vs. standard hose · 100% carbon offset": { sq: "−43% CO₂e vs. zorrë standarde · 100% kompensim karboni", en: "−43% CO₂e vs. standard hose · 100% carbon offset" },
      "Yes — replaceable fittings and nozzle": { sq: "Po — fitingje dhe pistë të zëvendësueshme", en: "Yes — replaceable fittings and nozzle" },
      "30 years": { sq: "30 vjet", en: "30 years" },
      "10 years": { sq: "10 vjet", en: "10 years" },
      // FITT Force supplier specs
      "Eco-Design": { sq: "Eko-Dizajn", en: "Eco-Design" },
      "Weight": { sq: "Pesha", en: "Weight" },
      "Compactness": { sq: "Kompaktësia", en: "Compactness" },
      "Carbon Footprint": { sq: "Gjurma e Karbonit", en: "Carbon Footprint" },
      "Carbon Offset": { sq: "Kompensimi i Karbonit", en: "Carbon Offset" },
      "Nozzle Design": { sq: "Dizajni i Pistës", en: "Nozzle Design" },
      "Drip-Proof": { sq: "Pa Pikime", en: "Drip-Proof" },
      "Source": { sq: "Burimi", en: "Source" },
      "Low impact product — PVC-free TPE construction": { sq: "Produkt me ndikim të ulët — ndërtim TPE pa PVC", en: "Low impact product — PVC-free TPE construction" },
      "2× lighter than traditional hoses": { sq: "2× më e lehtë se zorrët tradicionale", en: "2× lighter than traditional hoses" },
      "3× more compact for easy storage": { sq: "3× më kompakte për ruajtje të lehtë", en: "3× more compact for easy storage" },
      "−43% CO₂e emissions (ISO 14067 verified by TÜV Italia)": { sq: "−43% emetim CO₂e (ISO 14067 verifikuar nga TÜV Italia)", en: "−43% CO₂e emissions (ISO 14067 verified by TÜV Italia)" },
      "100% production emissions offset by certified credits": { sq: "100% e emetimeve të prodhimit kompensohen me kredite të certifikuara", en: "100% production emissions offset by certified credits" },
      "MOMODESIGN collaboration — ergonomic, adjustable": { sq: "Bashkëpunim MOMODESIGN — ergonomike, e rregullueshme", en: "MOMODESIGN collaboration — ergonomic, adjustable" },
      "Premium thermoplastic with soft rubber grip": { sq: "Termoplastik premium me kapje gome të butë", en: "Premium thermoplastic with soft rubber grip" },
      "100% drip-proof construction": { sq: "Ndërtim 100% pa pikime", en: "100% drip-proof construction" },
      "30 m (without nozzle)": { sq: "30 m (pa pistë)", en: "30 m (without nozzle)" },
      "½\" × 30 m (without nozzle) in stock": { sq: "½\" × 30 m (pa pistë) në stok", en: "½\" × 30 m (without nozzle) in stock" },
      // Mixed content values
      "1/2\": 30 m (without nozzle)": { sq: "1/2\": 30 m (pa pistë)", en: "1/2\": 30 m (without nozzle)" },
      "−10 °C to +40 °C": { sq: "−10 °C deri +40 °C", en: "−10 °C to +40 °C" },
      "12.5 mm": { sq: "12.5 mm", en: "12.5 mm" },
      // Pista Ekoplast hose properties
      "Pressure Rating": { sq: "Vlerësimi i Presionit", en: "Pressure Rating" },
      "Manufacturer": { sq: "Prodhuesi", en: "Manufacturer" },
      "Flexibility": { sq: "Fleksibiliteti", en: "Flexibility" },
      "Durability": { sq: "Qëndrueshmëria", en: "Durability" },
      "Connection": { sq: "Lidhja", en: "Connection" },
      "Usage": { sq: "Përdorimi", en: "Usage" },
      "Roll Length": { sq: "Gjatësia e Bobinës", en: "Roll Length" },
      "PVC — reinforced construction": { sq: "PVC — ndërtim i përforcuar", en: "PVC — reinforced construction" },
      "PVC — 3-layer construction": { sq: "PVC — ndërtim 3-shtresor", en: "PVC — 3-layer construction" },
      "12.5 / 19 / 25 mm": { sq: "12.5 / 19 / 25 mm", en: "12.5 / 19 / 25 mm" },
      "50 m standard": { sq: "50 m standarde", en: "50 m standard" },
      "Multi-layer reinforced PVC": { sq: "PVC shumë-shtresor i përforcuar", en: "Multi-layer reinforced PVC" },
      "3-layer reinforced PVC": { sq: "PVC 3-shtresor i përforcuar", en: "3-layer reinforced PVC" },
      "Garden watering & agricultural irrigation": { sq: "Ujitje kopshti & vaditje bujqësore", en: "Garden watering & agricultural irrigation" },
      "−5 °C to +50 °C": { sq: "−5 °C deri +50 °C", en: "−5 °C to +50 °C" },
      "Standard garden hose pressure": { sq: "Presion standard zorre kopshti", en: "Standard garden hose pressure" },
      "Made in Kosovo": { sq: "Prodhuar në Kosovë", en: "Made in Kosovo" },
      "Pista Ekoplast": { sq: "Pista Ekoplast", en: "Pista Ekoplast" },
      "Good flexibility for easy handling": { sq: "Fleksibilitet i mirë për trajtim të lehtë", en: "Good flexibility for easy handling" },
      "UV-resistant outer layer": { sq: "Shtresë e jashtme rezistente ndaj UV", en: "UV-resistant outer layer" },
      "Standard garden hose fittings": { sq: "Fitingje standarde zorre kopshti", en: "Standard garden hose fittings" },
      "Residential & agricultural watering": { sq: "Vaditje rezidenciale & bujqësore", en: "Residential & agricultural watering" },
      "50 m": { sq: "50 m", en: "50 m" },
      "½\" / ¾\" / 1\" × 50 m në stok": { sq: "½\" / ¾\" / 1\" × 50 m në stok", en: "½\" / ¾\" / 1\" × 50 m in stock" },
    },
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
    name: { sq: "Zorrë Bujqësore dhe Kopshti FITT Mint", en: "FITT Mint Garden & Agricultural Hose" },
    shortName: { sq: "FITT Mint", en: "FITT Mint" },
    description: {
      sq: "Zorrë PVC me katër shtresa për ujitje kopshti dhe bujqësore. Shtresa e brendshme e zezë anti-algë, mbulesë e jashtme e stabilizuar UV. Rezistencë presioni 21-24 bar. Garanci 10 vjet. Prodhuar në Itali. Gjatësi: 1/2\" (15-50m), 5/8\"/3/4\"/1\" (50m).",
      en: "Four-layer PVC hose for garden and agricultural watering. Anti-algae black inner layer, UV-stabilized outer cover. Pressure resistance 21-24 bar. 10-year guarantee. Made in Italy. Lengths: 1/2\" (15-50m), 5/8\"/3/4\"/1\" (50m).",
    },
  },
  "fitt-mimosa": {
    name: { sq: "Zorrë Bujqësore dhe Kopshti FITT Mimosa", en: "FITT Mimosa Garden & Agricultural Hose" },
    shortName: { sq: "FITT Mimosa", en: "FITT Mimosa" },
    description: {
      sq: "Zorrë PVC me tre shtresa për përdorim gjysmë-profesional bujqësor dhe kopshti. Rezistencë presioni deri 40 bar. Ngjyrë e verdhë me vija të gjelbra. Garanci 10 vjet. Prodhuar në Itali. Gjatësi: 1/2\" (15-50m), 5/8\"/3/4\"/1\" (50m).",
      en: "Three-layer PVC hose for semi-professional agricultural and garden use. Pressure resistance up to 40 bar. Yellow with green stripes. 10-year guarantee. Made in Italy. Lengths: 1/2\" (15-50m), 5/8\"/3/4\"/1\" (50m).",
    },
  },
  "fitt-force": {
    name: { sq: "Zorrë FITT Force", en: "FITT Force Hose" },
    shortName: { sq: "FITT Force", en: "FITT Force" },
    description: {
      sq: "Zorrë eko-dizajn pa PVC, 2× më e lehtë dhe 3× më kompakte. −43% emetim CO₂. Dizajn MOMODESIGN, fitingje të zëvendësueshme, 100% pa pikime. Emetimet e karbonit kompensohen 100%. Garanci 30 vjet. Prodhuar në Itali. Gjatësi: 1/2\" 30m (pa pistë).",
      en: "PVC-free eco-design hose, 2× lighter and 3× more compact. −43% CO₂ emissions. MOMODESIGN design, replaceable fittings, 100% drip-proof. Carbon emissions 100% offset. 30-year guarantee. Made in Italy. Length: 1/2\" 30m (without nozzle).",
    },
  },
  "pista-ekoplast-watering-hose": {
    name: { sq: "Zorrë Për Vaditje Pista Ekoplast", en: "Pista Ekoplast Watering Hose" },
    shortName: { sq: "Pista Ekoplast", en: "Pista Ekoplast" },
    description: {
      sq: "Zorrë PVC me tre shtresa e qëndrueshme për vaditje kopshti dhe bujqësore. Ndërtim i përforcuar tre-shtresor për performancë afatgjatë. Dizajni shumë-shtresor ofron forcë dhe fleksibilitet superior. Prodhuar në Kosovë nga Pista Ekoplast. Diametra të shumtë për nevoja të ndryshme. Gjatësi standarde 50m. E përshtatshme për ujitje kopshti, vaditje bujqësore dhe shpërndarje uji.",
      en: "Durable three-layer PVC hose for garden and agricultural watering. Reinforced 3-layer construction for long-lasting performance. Multi-layer design provides superior strength and flexibility. Made in Kosovo by Pista Ekoplast. Multiple diameters for different needs. Standard 50m length. Suitable for garden irrigation, agricultural watering, and water distribution.",
    },
  },
  "roto-jazz-planter": {
    name: { sq: "Vazo Jazz ROTO", en: "ROTO Jazz Planter" },
    shortName: { sq: "Jazz ROTO", en: "Jazz ROTO" },
    description: {
      sq: "Vazo dekorative ROTO Jazz me siluetë klasike konike dhe sipërfaqe të ashpër me pamje natyrale. E prodhuar nga polietileni i stabilizuar UV me teknologji rotomoldimi, e lehtë për transport, rezistente ndaj goditjeve, kushteve atmosferike dhe zbehjes së ngjyrës. E përshtatshme për ambiente të brendshme, tarraca, kopshte, hyrje biznesesh dhe hapësira komerciale.",
      en: "The ROTO Jazz planter has a classic conical silhouette and rough natural-look surface. Manufactured from UV-stabilised polyethylene using rotational moulding, it is lightweight, impact-resistant and weatherproof. Suitable for indoor spaces, terraces, gardens, business entrances and commercial areas. Available in three sizes: S, M and L.",
    },
  },
  "roto-rumba-planter": {
    name: { sq: "Vazo Rumba ROTO", en: "ROTO Rumba Planter" },
    shortName: { sq: "Rumba ROTO", en: "Rumba ROTO" },
    description: {
      sq: "Vazo ROTO Rumba me formë të rrumbullakët, grykë të gjerë dhe profil të ulët, ideale për lule sezonale, shkurre të vogla dhe bimë dekorative. Materiali PE i stabilizuar UV e bën të qëndrueshme ndaj diellit, ngrirjes dhe përdorimit të jashtëm, ndërsa pesha e ulët e bën të lehtë për zhvendosje në kopshte, ballkone dhe ambiente publike.",
      en: "The ROTO Rumba planter has a rounded form, wide mouth and low profile, ideal for seasonal flowers, small shrubs and decorative plants. Manufactured from UV-stabilised polyethylene using rotational moulding, it is resistant to UV exposure, frost and outdoor conditions. Suitable for gardens, balconies and public spaces. Available in three sizes: S, M and L.",
    },
  },
  "roto-barrel-planter": {
    name: { sq: "Vazo Barrel ROTO", en: "ROTO Barrel Planter" },
    shortName: { sq: "Barrel ROTO", en: "Barrel ROTO" },
    description: {
      sq: "Vazo ROTO Barrel me pamje fuçie tradicionale dhe teksturë imitim druri, e prodhuar nga polietileni i stabilizuar UV me teknologji rotomoldimi. Sjell karakter rustik dhe të ngrohtë në kopshte, tarraca, lokale mikpritjeje dhe ambiente komerciale. E lehtë, praktike dhe rezistente ndaj kushteve atmosferike. E disponueshme si model i veçantë dhe në madhësi S, M, L, XL dhe XXL.",
      en: "The ROTO Barrel planter has a traditional barrel shape with a wood-grain imitation surface. Manufactured from UV-stabilised polyethylene using rotational moulding, it brings a rustic and warm character to gardens, terraces, hospitality venues and commercial outdoor areas. Available as a standalone model and in sizes S, M, L, XL and XXL.",
    },
  },
  "roto-polka-planter": {
    name: { sq: "Vazo Polka ROTO", en: "ROTO Polka Planter" },
    shortName: { sq: "Polka ROTO", en: "Polka ROTO" },
    description: {
      sq: "Vazo ROTO Polka ka dizajn klasik me imitim druri dhe formë të rrumbullakët dekorative. E prodhuar nga polietileni i stabilizuar UV me teknologjinë e rotomoldimit, ofron pamje tradicionale, përdorim praktik dhe qëndrueshmëri ndaj kushteve atmosferike. E përshtatshme për tarraca, kopshte, hyrje dhe ambiente dekorative. E disponueshme në tri madhësi: S, M dhe L.",
      en: "The ROTO Polka planter is a classic rounded decorative planter with a wood-imitation finish. Manufactured from UV-stabilised polyethylene using rotational moulding, it combines a traditional appearance with practical handling and outdoor durability. Suitable for terraces, gardens, entrances and decorative outdoor spaces. Available in three sizes: S, M and L.",
    },
  },
  "roto-quadro-planter": {
    name: { sq: "Vazo Quadro ROTO", en: "ROTO Quadro Planter" },
    shortName: { sq: "Quadro ROTO", en: "Quadro ROTO" },
    description: {
      sq: "Vazo ROTO Quadro ka formë katrore të zgjatur dhe dizajn modern arkitekturor. E prodhuar nga polietileni i stabilizuar UV me teknologjinë e rotomoldimit, profili i lartë e bën të përshtatshme për bimë vertikale, palma të vogla dhe ambiente moderne. E disponueshme në tri madhësi: S, M dhe L.",
      en: "The ROTO Quadro planter is a tall, tapered square planter with a contemporary architectural profile. Manufactured from UV-stabilised polyethylene using rotational moulding, its upright proportions suit ornamental grasses, small palms and modern planting arrangements. Available in three sizes: S, M and L.",
    },
  },
  "roto-tango-line-planter": {
    name: { sq: "Vazo Tango / Line ROTO", en: "ROTO Tango / Line Planter" },
    shortName: { sq: "Tango / Line ROTO", en: "Tango / Line ROTO" },
    description: {
      sq: "Vazo ROTO Tango / Line ka dizajn drejtkëndor arkitekturor me linja të pastra, ideale për ndarje hapësire, ballkone, dyqane, tarraca dhe kopshte moderne. E prodhuar nga polietileni i stabilizuar UV me teknologjinë e rotomoldimit, është e qëndrueshme ndaj ngricës dhe rrezeve UV. E disponueshme në madhësi L dhe XL.",
      en: "The ROTO Tango / Line planter is a low-profile architectural planter with clean rectangular lines, ideal for space division, balconies, retail areas, terraces and modern gardens. Manufactured from UV-stabilised polyethylene using rotational moulding, it is resistant to frost and UV exposure. Available in sizes L and XL.",
    },
  },
  "roto-basket-planter": {
    name: { sq: "Vazo Basket ROTO (e Madhe)", en: "ROTO Basket Planter (Large)" },
    shortName: { sq: "Basket ROTO (e Madhe)", en: "Basket ROTO (Large)" },
    description: {
      sq: "Vazo ROTO Basket e madhe ka sipërfaqe të strukturuar në imitim të një shporte të thurur. E prodhuar nga polietileni i stabilizuar UV me teknologjinë e rotomoldimit, sjell pamje të ngrohtë dhe natyrale në ambiente komerciale, hotele, restorante, hyrje, tarraca dhe hapësira publike. E disponueshme në formate të mëdha: Basket, Basket XL dhe Basket XXL.",
      en: "The ROTO Basket large planter has a textured woven-basket appearance and is manufactured from UV-stabilised polyethylene using rotational moulding. It brings a warm and natural look to commercial spaces, hotels, restaurants, entrances, terraces and public landscaping. Available in three large formats: Basket, Basket XL and Basket XXL.",
    },
  },
  "roto-teak-planter": {
    name: { sq: "Vazo Teak ROTO", en: "ROTO Teak Planter" },
    shortName: { sq: "Teak ROTO", en: "Teak ROTO" },
    description: {
      sq: "Vazoja ROTO Teak ka një sipërfaqe që imiton drurin e tikut dhe një formë moderne dekorative. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit, ajo ofron pamjen e drurit me peshën e lehtë dhe qëndrueshmërinë e plastikës. E përshtatshme për tarraca, ambiente mikpritjeje, hyrje, kopshte dhe si ndarëse hapësirash. E disponueshme në dy madhësi: S dhe L.",
      en: "The ROTO Teak planter has a teak-wood imitation surface and a modern decorative form. Manufactured from UV-stabilised polyethylene using rotational moulding, it delivers the appearance of wood with the light weight and durability of rotomoulded plastic. Suitable for terraces, hospitality spaces, entrances, gardens and space dividers. Available in two sizes: S and L.",
    },
  },
  "roto-samba-planter": {
    name: { sq: "Vazo Samba ROTO", en: "ROTO Samba Planter" },
    shortName: { sq: "Samba ROTO", en: "Samba ROTO" },
    description: {
      sq: "Vazoja ROTO Samba është një vazo e gjatë skulpturore dhe elegante, e prodhuar nga polietileni i stabilizuar UV. Përmasat e saj vertikale dhe sipërfaqja dekorative e bëjnë atë një element të fortë vizual për hyrjet e hoteleve, restoranteve, tarracave premium dhe peizazheve komerciale. E disponueshme në madhësitë M dhe L.",
      en: "The ROTO Samba planter is a tall, elegant sculptural planter manufactured from UV-stabilised polyethylene using rotational moulding. Its vertical proportions and decorative surface make it a strong statement piece for hotel entrances, restaurants, premium terraces and commercial landscaping. Available in sizes M and L.",
    },
  },
  "roto-balcone-planter": {
    name: { sq: "Vazo Balcone ROTO", en: "ROTO Balcone Planter" },
    shortName: { sq: "Balcone ROTO", en: "Balcone ROTO" },
    description: {
      sq: "Vazoja ROTO Balcone është projektuar për t'u vendosur mbi parmakët e ballkoneve ose çative. Forma e saj përshtatet mbi hekurin dhe ofron një zgjidhje praktike dekorative për ballkone, tarraca dhe hapësira të vogla urbane. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit.",
      en: "The ROTO Balcone planter is designed to sit over balcony or roof railings. Its shaped form fits over the rail and provides a practical decorative planting solution for balconies, terraces and compact urban spaces. Manufactured from UV-stabilised polyethylene using rotational moulding.",
    },
  },
  "roto-balcone-duo-ovale": {
    name: { sq: "Vazo Balcone Duo-Ovale ROTO", en: "ROTO Balcone Duo-Ovale Planter" },
    shortName: { sq: "Balcone Duo-Ovale ROTO", en: "Balcone Duo-Ovale ROTO" },
    description: {
      sq: "ROTO Balcone Duo-Ovale është varianti oval i zgjatur i familjes Balcone. Me përmasat 600 × 300 mm, ofron më shumë hapësirë për mbjellje se Balcone standard dhe është ideale për ballkone me parmak më të gjerë ose ku dëshirohet një eksponim dekorativ më i madh. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit.",
      en: "The ROTO Balcone Duo-Ovale is the elongated oval variant of the Balcone railing planter family. At 600 × 300 mm, it offers more planting space than the standard Balcone and is ideal for balconies with wider railings or where a larger decorative display is desired.",
    },
  },
  "roto-edelweis-planter": {
    name: { sq: "Vazo Edelweis ROTO", en: "ROTO Edelweis Planter" },
    shortName: { sq: "Edelweis ROTO", en: "Edelweis ROTO" },
    description: {
      sq: "Vazoja ROTO Edelweis është një vazo drejtkëndëshe me një përfundim me teksturë guri, e prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. Është e përshtatshme për ballkone, hyrje, kopshte dhe ndarjen e hapësirave të jashtme. E disponueshme në madhësitë S, L dhe XL.",
      en: "The ROTO Edelweis planter is a rectangular trough planter with a stone-textured finish, manufactured from UV-stabilised polyethylene using rotational moulding. It is suitable for balconies, entrances, gardens and outdoor space division. Available in sizes S, L and XL.",
    },
  },
  "roto-edelweis-ovale": {
    name: { sq: "Vazo Edelweis Ovale ROTO", en: "ROTO Edelweis Ovale Planter" },
    shortName: { sq: "Edelweis Ovale ROTO", en: "Edelweis Ovale ROTO" },
    description: {
      sq: "ROTO Edelweis Ovale është varianti oval i familjes Edelweis, me një formë eliptike të zgjatur dhe pamje dekorative guri. E prodhuar nga polietileni i stabilizuar UV, është e përshtatshme për mbjellje lineare në tarraca, hyrje, ballkone dhe oborre.",
      en: "The ROTO Edelweis Ovale is the oval variant of the Edelweis family, with an elongated elliptical form and decorative stone-look appearance. Manufactured from UV-stabilised polyethylene using rotational moulding, it is suitable for linear planting on terraces, entrances, balconies and courtyards.",
    },
  },
  "roto-edelweis-round": {
    name: { sq: "Vazo Edelweis e Rrumbullakët ROTO", en: "ROTO Edelweis Round Planter" },
    shortName: { sq: "Edelweis Round ROTO", en: "Edelweis Round ROTO" },
    description: {
      sq: "ROTO Edelweis Round është varianti i rrumbullakët i familjes Edelweis, me formën e një tasi të ulët dhe përfundim dekorativ guri. E përshtatshme për lule sezonale, bimë dekorative, kopshte, tarraca dhe hyrje. E disponueshme në madhësitë S dhe M.",
      en: "The ROTO Edelweis Round is the round variant of the Edelweis family, with a low bowl form and decorative stone-look finish. Manufactured from UV-stabilised polyethylene using rotational moulding, it is suitable for seasonal flowers, decorative plants, gardens, terraces and entrance areas. Available in sizes S and M.",
    },
  },
  "roto-stoniness-planter": {
    name: { sq: "Vazo Stoniness ROTO", en: "ROTO Stoniness Planter" },
    shortName: { sq: "Stoniness ROTO", en: "Stoniness ROTO" },
    description: {
      sq: "Vazoja ROTO Stoniness ka një teksturë natyrale të theksuar guri dhe pamje dekorative rustike. Ajo jep përshtypjen e një vazoje të rëndë guri, por është e lehtë dhe më praktike për përdorim në natyrë. E përshtatshme për kopshte, hyrje publike dhe peizazhe urbane. E disponueshme në S, M, L dhe XL.",
      en: "The ROTO Stoniness planter has a pronounced natural stone-look texture and rustic decorative appearance. Manufactured from UV-stabilised polyethylene using rotational moulding, it gives the impression of a heavy stone planter while remaining lightweight and practical for outdoor use. Available in sizes S, M, L and XL.",
    },
  },
  "roto-shoe-planter": {
    name: { sq: "Vazo Këpucë ROTO", en: "ROTO Shoe Planter" },
    shortName: { sq: "Shoe ROTO", en: "Shoe ROTO" },
    description: {
      sq: "Vazoja ROTO Shoe është një vazo dekorative me formën e një këpuce të vjetër, ideale si element vizual në kopshte, oborre rustike dhe hapësira verore. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. E disponueshme në madhësitë S dhe L.",
      en: "The ROTO Shoe planter is a novelty decorative planter shaped like an old shoe, ideal as a visual feature in gardens, rustic courtyards and summer outdoor spaces. Manufactured from UV-stabilised polyethylene using rotational moulding. Available in sizes S and L.",
    },
  },
  "roto-elephant-planter": {
    name: { sq: "Vazo Elefant ROTO", en: "ROTO Elephant Planter" },
    shortName: { sq: "Elephant ROTO", en: "Elephant ROTO" },
    description: {
      sq: "ROTO Elephant është një element dekorativ kopshti në formë elefanti. Mund të përdoret si vazo ose si zbukurim i veçantë në kopshte, oborre dhe hapësira familjare në natyrë. E prodhuar nga polietileni i stabilizuar UV.",
      en: "The ROTO Elephant is a decorative elephant-shaped garden piece manufactured from UV-stabilised polyethylene using rotational moulding. It can be used as a decorative planter or as a standalone ornament in gardens, courtyards and family outdoor spaces.",
    },
  },
  "roto-sack-bag-planter": {
    name: { sq: "Vazo Thes ROTO", en: "ROTO Sack Planter" },
    shortName: { sq: "Thes ROTO", en: "Sack ROTO" },
    description: {
      sq: "Vazoja ROTO Thes ka formën e një thesi të lidhur dhe pamje dekorative rustike. E prodhuar nga polietileni i stabilizuar UV, është e përshtatshme për lule, erëza ose si një pjesë dekorative dalluese në kopshte dhe tarraca.",
      en: "The ROTO Sack planter is shaped like a tied sack and has a rustic decorative appearance. Manufactured from UV-stabilised polyethylene using rotational moulding, it is suitable for flowers, herbs or as a distinctive decorative piece in gardens and terraces.",
    },
  },
  "roto-jelka": {
    name: { sq: "Vazo Jelka ROTO", en: "ROTO Jelka Planter" },
    shortName: { sq: "Jelka ROTO", en: "Jelka ROTO" },
    description: {
      sq: "ROTO Jelka është një vazo dekorative në formë peme bredhi, e prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. Shërben si element zbukurues i spikatur për kopshte, tarraca dhe ekspozita sezonale.",
      en: "The ROTO Jelka is a decorative fir-tree shaped planter manufactured from UV-stabilised polyethylene using rotational moulding. It serves as a distinctive ornamental piece for gardens, terraces and seasonal displays.",
    },
  },
  "roto-margerita": {
    name: { sq: "Vazo Margerita ROTO", en: "ROTO Margerita Planter" },
    shortName: { sq: "Margerita ROTO", en: "Margerita ROTO" },
    description: {
      sq: "Vazoja ROTO Margerita është një tas i cekët dekorativ me buzë në formë petalizash margerite, e prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. Forma e gjerë dhe e ulët e bën të përshtatshme për ekspozita lulesh në tokë, tarraca dhe ambiente kopshti. E disponueshme në madhësi S, M dhe L.",
      en: "The ROTO Margerita planter is a shallow decorative bowl with a daisy-petal edge design, manufactured from UV-stabilised polyethylene using rotational moulding. Its wide low form makes it suitable for ground-level flower displays, terraces and decorative garden settings. Available in sizes S, M and L.",
    },
  },
  "roto-vase": {
    name: { sq: "Vazo Klasike ROTO", en: "ROTO Vase Planter" },
    shortName: { sq: "Vase ROTO", en: "Vase ROTO" },
    description: {
      sq: "Vazoja ROTO Vase ka formë klasike me profil të lakuar dhe detaje dekorative. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit, është e përshtatshme për hyrje, tarraca, oborre dhe kopshte formale. E disponueshme në madhësi S, M dhe L.",
      en: "The ROTO Vase planter has a classical vase form with a curved profile and decorative detailing. Manufactured from UV-stabilised polyethylene using rotational moulding, it is suitable for entrances, terraces, courtyards and formal garden settings. Available in sizes S, M and L.",
    },
  },
  "roto-donkey": {
    name: { sq: "Vazo Gomari ROTO", en: "ROTO Donkey Planter" },
    shortName: { sq: "Gomari ROTO", en: "Donkey ROTO" },
    description: {
      sq: "ROTO Gomari është një vazo dekorative novatrice në formë gomari me shumale për mbjellje, e prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. Është një element i veçantë dhe lozhdak për kopshte, oborre dhe hapësira familjare.",
      en: "The ROTO Donkey is a novelty decorative planter shaped like a donkey with panniers for planting. Manufactured from UV-stabilised polyethylene using rotational moulding, it is a distinctive and playful piece for gardens, courtyards and family outdoor spaces.",
    },
  },
  "roto-amphora": {
    name: { sq: "Vazo Amfora ROTO", en: "ROTO Amphora Planter" },
    shortName: { sq: "Amfora ROTO", en: "Amphora ROTO" },
    description: {
      sq: "Vazoja ROTO Amfora është modeluar sipas formës klasike të amforës greke. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit, i jep hyrjeve, tarracave dhe kopshteve formale një karakter elegant mesdhetar.",
      en: "The ROTO Amphora planter is modelled on the classical Greek amphora form. Manufactured from UV-stabilised polyethylene using rotational moulding, it gives entrances, terraces and formal gardens an elegant Mediterranean character.",
    },
  },
  "roto-herb": {
    name: { sq: "Vazo Bimësh Aromatike ROTO", en: "ROTO Herb Planter" },
    shortName: { sq: "Herb ROTO", en: "Herb ROTO" },
    description: {
      sq: "Vazoja ROTO Herb është një vazo kompakte me shumë xhepa e projektuar për kultivimin e bimëve aromatike, luleve të vogla dhe bimëve dekorative. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit, është praktike për tarraca, ballkone dhe kopshte kuzhinës.",
      en: "The ROTO Herb planter is a compact multi-pocket planter designed for growing herbs, small flowers and aromatic plants. Manufactured from UV-stabilised polyethylene using rotational moulding, it is practical for terraces, balconies and kitchen gardens.",
    },
  },
  "roto-swan": {
    name: { sq: "Vazo Mjellme ROTO", en: "ROTO Swan Planter" },
    shortName: { sq: "Mjellme ROTO", en: "Swan ROTO" },
    description: {
      sq: "ROTO Mjellme është një vazo dekorative në formë mjellme, e prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. Forma e saj elegante e bën atë një element të spikatur zbukurues për liqenet e kopshteve, hyrjet dhe ambientin formal të jashtëm. E disponueshme në madhësi S dhe L.",
      en: "The ROTO Swan is a decorative swan-shaped planter manufactured from UV-stabilised polyethylene using rotational moulding. Its elegant form makes it a distinctive ornamental piece for garden ponds, entrances and formal outdoor settings. Available in sizes S and L.",
    },
  },
  "roto-boy-wheelbarrow": {
    name: { sq: "Djali me Karrocë ROTO", en: "ROTO Boy with Wheelbarrow" },
    shortName: { sq: "Djali me Karrocë ROTO", en: "Boy Wheelbarrow ROTO" },
    description: {
      sq: "ROTO Djali me Karrocë është një figurë dekorative e kopshtit e një djali që shtyn një karrocë-vazo. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit, është një element i këndshëm dhe lozhdak për kopshte familjare, oborre dhe zona loje.",
      en: "The ROTO Boy with Wheelbarrow is a decorative garden figure of a boy pushing a wheelbarrow planter. Manufactured from UV-stabilised polyethylene using rotational moulding, it is a charming and playful ornament for family gardens, courtyards and children's play areas.",
    },
  },
  "roto-girl-wheelbarrow": {
    name: { sq: "Vajza me Karrocë ROTO", en: "ROTO Girl with Wheelbarrow" },
    shortName: { sq: "Vajza me Karrocë ROTO", en: "Girl Wheelbarrow ROTO" },
    description: {
      sq: "ROTO Vajza me Karrocë është një figurë dekorative e kopshtit e një vajze që shtyn një karrocë-vazo. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit, është një element i këndshëm zbukurues për kopshte familjare, oborre dhe hapësira të jashtme dekorative.",
      en: "The ROTO Girl with Wheelbarrow is a decorative garden figure of a girl pushing a wheelbarrow planter. Manufactured from UV-stabilised polyethylene using rotational moulding, it is a charming ornament for family gardens, courtyards and decorative outdoor spaces.",
    },
  },
  "roto-basket-small": {
    name: { sq: "Vazo Basket ROTO (e Vogël)", en: "ROTO Basket Planter (Small)" },
    shortName: { sq: "Basket ROTO (e Vogël)", en: "Basket Small ROTO" },
    description: {
      sq: "Vazo ROTO Basket e vogël ka sipërfaqe të strukturuar në imitim të një shporte të thurur dhe është e prodhuar nga polietileni i stabilizuar UV me teknologjinë e rotomoldimit. Kompakte dhe e versatile, është e përshtatshme për ballkone, tarraca, hyrje dhe ekspozita dekorative më të vogla. E disponueshme në madhësi S, M dhe L.",
      en: "The ROTO Basket small planter has a textured woven-basket appearance and is manufactured from UV-stabilised polyethylene using rotational moulding. Compact and versatile, it is suitable for balconies, terraces, entrances and smaller decorative displays. Available in sizes S, M and L.",
    },
  },
  "roto-modern": {
    name: { sq: "Vazo Modern ROTO", en: "ROTO Modern Planter" },
    shortName: { sq: "Modern ROTO", en: "Modern ROTO" },
    description: {
      sq: "Vazoja ROTO Modern ka formë bashkëkohore të pastër me sipërfaqe të lëmuara, e përshtatshme për arkitekturë moderne, zyra, hotele dhe hapësira urbane të jashtme. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. E disponueshme në madhësi M dhe L.",
      en: "The ROTO Modern planter has a clean contemporary form with smooth surfaces, suitable for modern architecture, offices, hotels and urban outdoor spaces. Manufactured from UV-stabilised polyethylene using rotational moulding. Available in sizes M and L.",
    },
  },
  "roto-trobentica": {
    name: { sq: "Vazo Trobentica ROTO", en: "ROTO Trobentica Planter" },
    shortName: { sq: "Trobentica ROTO", en: "Trobentica ROTO" },
    description: {
      sq: "Vazoja ROTO Trobentica është një vazo dekorative me formë të frymëzuar nga luleja e trobendicës, e prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. Është një element i bukur zbukurues për kopshte, tarraca dhe ekspozita sezonale lulesh.",
      en: "The ROTO Trobentica planter is a decorative planter with a primrose-inspired form, manufactured from UV-stabilised polyethylene using rotational moulding. It is a charming accent piece for gardens, terraces and seasonal flower displays.",
    },
  },
  "roto-corner": {
    name: { sq: "Vazo Cep ROTO", en: "ROTO Corner Planter" },
    shortName: { sq: "Cep ROTO", en: "Corner ROTO" },
    description: {
      sq: "Vazoja ROTO Cep është projektuar për t'u vendosur në cepe dhe për të shfrytëzuar hapësirat këndore në ballkone, tarraca dhe kopshte. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit, maksimizon potencialin e mbjelljes në hapësirat kompakte të cepave.",
      en: "The ROTO Corner planter is designed to fit into corners and make use of angular spaces on balconies, terraces and in gardens. Manufactured from UV-stabilised polyethylene using rotational moulding, it maximises planting potential in compact corner areas.",
    },
  },
  "roto-can-lambik": {
    name: { sq: "Vazo Shiko / Lambik ROTO", en: "ROTO Can / Lambik Planter" },
    shortName: { sq: "Lambik ROTO", en: "Can / Lambik ROTO" },
    description: {
      sq: "Vazoja ROTO Lambik ka formën e një shikoje tradicionale, e prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. Është një element zbukurues i këndshëm për kopshte rustike, tarraca dhe hapësira të jashtme me stil vintage.",
      en: "The ROTO Can / Lambik planter is shaped like a traditional watering can, manufactured from UV-stabilised polyethylene using rotational moulding. It is a charming decorative piece for rustic gardens, terraces and vintage-style outdoor spaces.",
    },
  },
  "roto-bell": {
    name: { sq: "Vazo Këmbanë ROTO", en: "ROTO Bell Planter" },
    shortName: { sq: "Këmbanë ROTO", en: "Bell ROTO" },
    description: {
      sq: "Vazoja ROTO Këmbanë ka formë klasike këmbane dhe profil të lëmuar, e përshtatshme për kopshte tradicionale dhe bashkëkohore, tarraca dhe hyrje. E prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. E disponueshme në madhësi S, M dhe L.",
      en: "The ROTO Bell planter has a classic bell form and a smooth profile suitable for traditional and contemporary gardens, terraces and entrance areas. Manufactured from UV-stabilised polyethylene using rotational moulding. Available in sizes S, M and L.",
    },
  },
  "roto-wheelbarrow": {
    name: { sq: "Karrocë Dekorative ROTO", en: "ROTO Wheelbarrow Planter" },
    shortName: { sq: "Karrocë ROTO", en: "Wheelbarrow ROTO" },
    description: {
      sq: "Vazoja ROTO Karrocë është një karrocë dekorative me madhësi të plotë, e prodhuar nga polietileni i stabilizuar UV me anë të rotomoldimit. Është një element i spikatur zbukurues për qendrat e kopshtarisë, hapësirat tregtare dhe ekspozitat dekorative.",
      en: "The ROTO Wheelbarrow planter is a full-size decorative wheelbarrow planter manufactured from UV-stabilised polyethylene using rotational moulding. It is a distinctive feature piece for garden centres, retail spaces and decorative garden displays.",
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
  "polins-sprayer-garden-micro-1l": {
    name: { sq: "Spërkatëse Polins Garden Micro 1L", en: "Polins Sprayer Garden Micro 1L" },
    shortName: { sq: "Garden Micro 1L", en: "Garden Micro 1L" },
    description: {
      sq: "Spërkatësja Polins Garden Micro 1L është një zgjidhje praktike dhe e lehtë për spërkatje të përditshme në kopsht, ballkon, serrë ose ambiente shtëpie. Kapaciteti 1 litër e bën të përshtatshme për përdorim të shpejtë me ujë ose preparate të tretshme për kujdesin e bimëve. Forma kompakte, pesha e ulët dhe përdorimi i thjeshtë e bëjnë ideale për lule, fidanë, bimë dekorative dhe mirëmbajtje të gjelbërimit.",
      en: "The Polins Garden Micro 1L is a practical and lightweight solution for everyday spraying in gardens, balconies, greenhouses or home environments. The 1-litre capacity makes it suitable for quick use with water or water-soluble preparations for plant care. Its compact form, low weight and simple use make it ideal for flowers, seedlings, decorative plants and greenery maintenance.",
    },
  },
  "polins-sprayer-clear-2-0": {
    name: { sq: "Spërkatëse Polins Clear 2.0", en: "Polins Sprayer Clear 2.0" },
    shortName: { sq: "Clear 2.0", en: "Clear 2.0" },
    description: {
      sq: "Spërkatësja Polins Clear 2.0 është projektuar për përdorim me preparate të tretshme në ujë për kujdesin e bimëve, si produkte ushqyese, herbicide, insekticide ose fungicide. Trupi transparent ndihmon në kontrollin e nivelit të lëngut gjatë punës, ndërsa kapaciteti 2 litra ofron balancë të mirë mes praktikës dhe autonomisë. E përshtatshme për përdorim në kopshte, sera, ambiente bujqësore të vogla dhe mirëmbajtje të bimëve dekorative.",
      en: "The Polins Clear 2.0 sprayer is designed for use with water-soluble preparations for plant care, such as nutrients, herbicides, insecticides or fungicides. The transparent body helps monitor the liquid level during work, while the 2-litre capacity offers a good balance between practicality and autonomy. Suitable for gardens, greenhouses, small agricultural areas and decorative plant maintenance.",
    },
  },
  "polins-sprayer-garden-mini": {
    name: { sq: "Spërkatëse Polins Garden Mini 1.5L / 2.5L", en: "Polins Sprayer Garden Mini 1.5L / 2.5L" },
    shortName: { sq: "Garden Mini", en: "Garden Mini" },
    description: {
      sq: "Polins Garden Mini është spërkatëse kompakte me pompë, e përshtatshme për përdorim me preparate të tretshme në ujë për kujdesin e bimëve. Modelet 1.5L dhe 2.5L janë praktike për përdorim në ballkone, kopshte të vogla, sera dhe hapësira ku kërkohet kontroll i saktë gjatë spërkatjes. Produkti është i lehtë për t'u mbajtur, i thjeshtë për t'u përdorur dhe i përshtatshëm për lule, fidanë dhe bimë dekorative.",
      en: "The Polins Garden Mini is a compact pump sprayer suitable for use with water-soluble preparations for plant care. The 1.5L and 2.5L models are practical for use on balconies, small gardens, greenhouses and spaces where precise spraying control is required. The product is easy to carry, simple to use and suitable for flowers, seedlings and decorative plants.",
    },
  },
  "polins-sprayer-garden-5-8-10": {
    name: { sq: "Spërkatëse Polins Garden 5L / 8L / 10L", en: "Polins Sprayer Garden 5L / 8L / 10L" },
    shortName: { sq: "Garden 5-8-10", en: "Garden 5-8-10" },
    description: {
      sq: "Seria Polins Garden 5, 8 dhe 10 është krijuar për spërkatje të bimëve me preparate të tretshme në ujë, përfshirë produkte ushqyese, insekticide, fungicide dhe herbicide. Çdo set përfshin rezervuarin me pompë, valvul sigurie, rrip mbajtës, tubin me dorezë, zgjatuesin e spërkatjes dhe manualin e përdorimit. Është një zgjidhje praktike për kopshte, pemishte të vogla, sera dhe punë bujqësore të përditshme.",
      en: "The Polins Garden 5, 8 and 10 series is designed for spraying plants with water-soluble preparations, including nutrients, insecticides, fungicides and herbicides. Each set includes the tank with pump, safety valve, carry strap, hose with handle, spray lance and user manual. A practical solution for gardens, small orchards, greenhouses and everyday agricultural work.",
    },
  },
  "polins-sprayer-garden-hobby-5-8-10": {
    name: { sq: "Spërkatëse Polins Garden Hobby 5L / 8L / 10L", en: "Polins Sprayer Garden Hobby 5L / 8L / 10L" },
    shortName: { sq: "Garden Hobby 5-8-10", en: "Garden Hobby 5-8-10" },
    description: {
      sq: "Polins Garden Hobby është linjë spërkatësesh presioni për përdorues që kërkojnë pajisje të besueshme për kopshtari, lule, pemë dhe bimë dekorative. Produkti është i përshtatshëm për preparate të tretshme në ujë dhe vjen me rezervuar, pompë, rrip mbajtës, tub me dorezë, zgjatues spërkatjeje dhe manual përdorimi. Variantet 5L, 8L dhe 10L mbulojnë nevoja të ndryshme nga përdorimi shtëpiak deri te punët më të gjera në kopsht.",
      en: "The Polins Garden Hobby is a line of pressure sprayers for users who need reliable equipment for gardening, flowers, trees and decorative plants. The product is suitable for water-soluble preparations and comes with a tank, pump, carry strap, hose with handle, spray lance and user manual. The 5L, 8L and 10L variants cover different needs from home use to larger garden tasks.",
    },
  },
  "polins-back-sprayer-garden-hobby-12-16": {
    name: { sq: "Spërkatëse Shpine Polins Garden Hobby 12L / 16L", en: "Polins Back Sprayer Garden Hobby 12L / 16L" },
    shortName: { sq: "Spërkatëse Shpine 12-16L", en: "Back Sprayer Hobby 12-16" },
    description: {
      sq: "Spërkatësja e shpinës Polins Garden Hobby 12/16 është projektuar për përdorim më intensiv në kopshte, pemishte, sera dhe sipërfaqe bujqësore. Kapacitetet 12L dhe 16L mundësojnë autonomi më të madhe gjatë punës, ndërsa forma e shpinës e bën më të lehtë mbajtjen gjatë spërkatjes. Produkti përdoret me preparate të tretshme në ujë për kujdesin e bimëve dhe është i përshtatshëm për përdorues që kërkojnë volum më të madh se spërkatëset klasike të dorës.",
      en: "The Polins Garden Hobby 12/16 back sprayer is designed for more intensive use in gardens, orchards, greenhouses and agricultural surfaces. The 12L and 16L capacities allow greater autonomy during work, while the backpack design makes carrying easier during spraying. Suitable for users who need a larger volume than classic hand sprayers.",
    },
  },
  "polins-bins-screw-cap": {
    name: { sq: "Kova Polins me Kapak me Vidë dhe Gomine", en: "Polins Bins with Screw Cap and Gasket" },
    shortName: { sq: "Kova me Kapak Vidë", en: "Bins with Screw Cap" },
    description: {
      sq: "Kovat Polins me kapak me vidë dhe gomine janë të përshtatshme për ruajtje, transport dhe ambalazhim të produkteve të ndryshme. Kapaku me vidë ndihmon në mbyllje më të sigurt, ndërsa gomina rrit izolimin dhe praktikën në përdorim. Variantet 5L, 10L, 15L dhe 20L i bëjnë këto enë të përshtatshme për përdorim në ekonomi familjare, bujqësi, industri të lehtë dhe magazinim.",
      en: "Polins bins with screw cap and gasket are suitable for storage, transport and packaging of various products. The screw cap helps achieve a more secure closure, while the gasket increases insulation and practicality in use. The 5L, 10L, 15L and 20L variants make these containers suitable for home economy, agriculture, light industry and storage.",
    },
  },
  "polins-bucket-with-handles-20l": {
    name: { sq: "Kovë Polins 20L me Doreza", en: "Polins Bucket with Handles 20L" },
    shortName: { sq: "Kovë 20L me Doreza", en: "Bucket 20L with Handles" },
    description: {
      sq: "Kova Polins 20L me doreza është zgjidhje praktike për mbajtje, transport dhe përdorim të përditshëm në ambiente shtëpiake, bujqësore ose industriale të lehta. Dorezat ndihmojnë në kapje dhe lëvizje më të lehtë, ndërsa kapaciteti 20L e bën të përshtatshme për sasi më të mëdha materiali ose lëngu.",
      en: "The Polins 20L bucket with handles is a practical solution for holding, transporting and everyday use in home, agricultural or light industrial environments. The handles make it easier to grip and move, while the 20L capacity makes it suitable for larger quantities of material or liquid.",
    },
  },
  "polins-hanging-poultry-feeder-18kg": {
    name: { sq: "Ushqyes i Varur Polins për Shpendë 18kg", en: "Polins Hanging Poultry Feeder 18kg" },
    shortName: { sq: "Ushqyes i Varur 18kg", en: "Hanging Feeder 18kg" },
    description: {
      sq: "Ushqyesi i varur Polins për shpendë është i përshtatshëm për ferma, oborre dhe ambiente ku kërkohet furnizim i rregullt me ushqim për pula ose shpendë të tjerë. Kapaciteti 18kg redukton nevojën për rimbushje të shpeshta, ndërsa forma e varur ndihmon në mbajtjen e ushqimit më të pastër dhe më të aksesueshëm për shpendët.",
      en: "The Polins hanging poultry feeder is suitable for farms, yards and environments where regular food supply is needed for chickens or other poultry. The 18kg capacity reduces the need for frequent refilling, while the hanging design helps keep the feed cleaner and more accessible for the birds.",
    },
  },
  "polins-poultry-feeder-400": {
    name: { sq: "Ushqyes Polins Ø400 për Shpendë", en: "Polins Poultry Feeder Ø400" },
    shortName: { sq: "Ushqyes Ø400", en: "Feeder Ø400" },
    description: {
      sq: "Ushqyesi Polins Ø400 është projektuar për ushqimin e shpendëve me kapacitet 13kg. Diametri 400mm ofron hapësirë të mirë aksesimi për shpendët, ndërsa materiali plastik është praktik për pastrim dhe përdorim të përditshëm. I përshtatshëm për ferma të vogla, oborre familjare dhe përdorim bujqësor.",
      en: "The Polins Ø400 feeder is designed for feeding poultry with a 13kg capacity. The 400mm diameter provides good access space for the birds, while the plastic material is practical for cleaning and everyday use. Suitable for small farms, family yards and agricultural use.",
    },
  },
  "polins-poultry-feeder-250": {
    name: { sq: "Ushqyes Polins Ø250 për Shpendë", en: "Polins Poultry Feeder Ø250" },
    shortName: { sq: "Ushqyes Ø250", en: "Feeder Ø250" },
    description: {
      sq: "Ushqyesi Polins Ø250 është i përshtatshëm për ambiente më të vogla, oborre familjare dhe grupe më të vogla shpendësh. Kapaciteti 3.5kg dhe forma kompakte e bëjnë të lehtë për vendosje, mbushje dhe pastrim. Produkt praktik për ushqim të grimcuar ose pluhur.",
      en: "The Polins Ø250 feeder is suitable for smaller environments, family yards and smaller groups of poultry. The 3.5kg capacity and compact form make it easy to place, fill and clean. A practical product for pellet or powder feed.",
    },
  },
  "polins-poultry-feeder-200": {
    name: { sq: "Ushqyes Polins Ø200 për Shpendë", en: "Polins Poultry Feeder Ø200" },
    shortName: { sq: "Ushqyes Ø200", en: "Feeder Ø200" },
    description: {
      sq: "Ushqyesi Polins Ø200 është model kompakt për furnizimin e shpendëve me ushqim të grimcuar ose pluhur. Me kapacitet 3kg, është i përshtatshëm për përdorim të përditshëm në oborre, ferma të vogla dhe ambiente ku kërkohet zgjidhje e thjeshtë dhe higjienike.",
      en: "The Polins Ø200 feeder is a compact model for supplying poultry with pellet or powder feed. With a 3kg capacity, it is suitable for everyday use in yards, small farms and environments where a simple and hygienic solution is needed.",
    },
  },
  "polins-hanging-poultry-drinker-10l": {
    name: { sq: "Pijëse e Varur Polins për Shpendë 10L", en: "Polins Hanging Poultry Drinker 10L" },
    shortName: { sq: "Pijëse e Varur 10L", en: "Hanging Drinker 10L" },
    description: {
      sq: "Pijësja e varur Polins 10L është projektuar për furnizim të pastër dhe të qëndrueshëm me ujë për shpendët. Forma e varur ndihmon në reduktimin e ndotjes së ujit, ndërsa kapaciteti 10L e bën të përshtatshme për përdorim në ferma, oborre dhe ambiente ku mbahen shpendë.",
      en: "The Polins hanging drinker 10L is designed for clean and consistent water supply for poultry. The hanging design helps reduce water contamination, while the 10L capacity makes it suitable for use on farms, in yards and environments where poultry are kept.",
    },
  },
  "polins-poultry-drinker-250-5l": {
    name: { sq: "Pijëse Polins Ø250 për Shpendë 5L", en: "Polins Poultry Drinker Ø250 5L" },
    shortName: { sq: "Pijëse Ø250 5L", en: "Drinker Ø250 5L" },
    description: {
      sq: "Pijësja Polins Ø250 me kapacitet 5L është zgjidhje praktike për furnizim me ujë në oborre, ferma të vogla dhe ambiente të kujdesit për shpendë. Diametri i tabakasë dhe lartësia e saj janë të përshtatshme për përdorim të përditshëm, ndërsa materiali plastik lehtëson pastrimin.",
      en: "The Polins Ø250 drinker with 5L capacity is a practical solution for water supply in yards, small farms and poultry care environments. The tray diameter and height are suitable for everyday use, while the plastic material makes cleaning easy.",
    },
  },
  "polins-poultry-drinker-200-4l": {
    name: { sq: "Pijëse Polins Ø200 për Shpendë 4L", en: "Polins Poultry Drinker Ø200 4L" },
    shortName: { sq: "Pijëse Ø200 4L", en: "Drinker Ø200 4L" },
    description: {
      sq: "Pijësja Polins Ø200 është model kompakt me kapacitet 4L, e përshtatshme për grupe më të vogla shpendësh dhe përdorim familjar. Forma e saj praktike mundëson furnizim të vazhdueshëm me ujë, ndërsa materiali plastik është i lehtë për pastrim dhe mirëmbajtje.",
      en: "The Polins Ø200 drinker is a compact model with 4L capacity, suitable for smaller groups of poultry and family use. Its practical design enables continuous water supply, while the plastic material is easy to clean and maintain.",
    },
  },
  "polins-drinker-with-bottle-thread": {
    name: { sq: "Pijëse Polins me Filetë për Shishe", en: "Polins Drinker with Bottle Thread" },
    shortName: { sq: "Pijëse me Filetë Shishe", en: "Bottle Thread Drinker" },
    description: {
      sq: "Pijësja Polins me filetë për shishe është zgjidhje ekonomike dhe praktike për furnizimin e shpendëve me ujë. Produkti lidhet me shishe të përshtatshme, ndaj kapaciteti përcaktohet nga madhësia e shishes së përdorur. Është e lehtë, kompakte dhe e përshtatshme për oborre, përdorim familjar dhe ferma të vogla.",
      en: "The Polins drinker with bottle thread is an economical and practical solution for supplying poultry with water. The product connects to a suitable bottle, so the capacity is determined by the size of the bottle used. It is lightweight, compact and suitable for yards, family use and small farms.",
    },
  },
  "polins-planter-fruit-vegetable-growing": {
    name: { sq: "Mbjellëse Polins për Fruta dhe Perime", en: "Polins Planter for Fruit and Vegetable Growing" },
    shortName: { sq: "Mbjellëse Fruta-Perime", en: "Fruit & Vegetable Planter" },
    description: {
      sq: "Mbjellësja Polins për fruta dhe perime është pajisje praktike për punë bujqësore dhe kopshtari, e projektuar për të ndihmuar në mbjellje më të rregullt dhe më efikase. Produkti është i lehtë, i thjeshtë për përdorim dhe i përshtatshëm për ferma, kopshte, sera dhe kultivues që kërkojnë mjete praktike për mbjellje.",
      en: "The Polins planter for fruit and vegetable growing is a practical tool for agricultural and gardening work, designed to help with more regular and efficient planting. The product is lightweight, simple to use and suitable for farms, gardens, greenhouses and growers who need practical planting tools.",
    },
  },
  "polins-plastic-shovel-with-handle-1002": {
    name: { sq: "Lopatë Plastike Polins me Dorezë", en: "Polins Plastic Shovel with Handle" },
    shortName: { sq: "Lopatë Plastike 1002", en: "Plastic Shovel 1002" },
    description: {
      sq: "Lopata plastike Polins me dorezë, kodi 1002, është e përshtatshme për pastrim bore dhe përdorime të ndryshme praktike në ambiente shtëpiake, oborre, magazina ose hapësira pune. Trupi plastik e bën më të lehtë në përdorim, ndërsa doreza ndihmon në kapje dhe manovrim më të mirë.",
      en: "The Polins plastic shovel with handle, code 1002, is suitable for snow clearing and various practical uses in home environments, yards, warehouses or work spaces. The plastic body makes it lighter in use, while the handle helps with better grip and manoeuvring.",
    },
  },
  "polins-plastic-shovel-l35-handle-alu-profile-1014": {
    name: { sq: "Lopatë Plastike Polins L35 me Dorezë dhe Profil Alumini", en: "Polins Plastic Shovel L35 with Handle and Aluminium Profile" },
    shortName: { sq: "Lopatë L35 Alu 1014", en: "Shovel L35 Alu 1014" },
    description: {
      sq: "Lopata plastike Polins L35 me dorezë dhe profil alumini, kodi 1014, është projektuar për përdorim më të qëndrueshëm në pastrim bore dhe punë të ndryshme jashtë. Profili i aluminit ndihmon në forcimin e pjesës së punës, ndërsa doreza e bën produktin më praktik për përdorim të përditshëm.",
      en: "The Polins L35 plastic shovel with handle and aluminium profile, code 1014, is designed for more durable use in snow clearing and various outdoor tasks. The aluminium profile helps reinforce the working part, while the handle makes the product more practical for everyday use.",
    },
  },
  "polins-plastic-shovel-l35-eko-with-handle-1012": {
    name: { sq: "Lopatë Plastike Polins L35 Eko me Dorezë", en: "Polins Plastic Shovel L35 Eko with Handle" },
    shortName: { sq: "Lopatë L35 Eko 1012", en: "Shovel L35 Eko 1012" },
    description: {
      sq: "Lopata plastike Polins L35 Eko me dorezë, kodi 1012, është zgjidhje praktike për pastrim bore dhe përdorime të ndryshme në oborre, ambiente pune dhe hapësira shtëpiake. Dizajni L35 Eko ofron funksionalitet të mirë për përdorim të përditshëm, duke ruajtur peshë të ulët dhe manovrim të lehtë.",
      en: "The Polins L35 Eko plastic shovel with handle, code 1012, is a practical solution for snow clearing and various uses in yards, work environments and home spaces. The L35 Eko design offers good functionality for everyday use, maintaining low weight and easy manoeuvring.",
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
