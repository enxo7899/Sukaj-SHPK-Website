# AGENT TASK — Phase 2: All Remaining Products + Cross-Provider Feature
# Sukaj SHPK Website — Paste this entire prompt into Claude Code.

---

## CRITICAL: READ THE SCHEMA FIRST

```bash
cat src/data/products-data.ts | head -150
```

Study EVERY field name and TypeScript type exactly. Then:

```bash
cat src/app/catalog/\[slug\]/page.tsx
```

Understand how the product detail page renders. You must match the schema precisely.

---

## CRITICAL: NEW FEATURE — CROSS-PROVIDER DISPLAY

Several products are available from multiple suppliers (e.g. PE-100 water pipe from BOTH
Konti Hidroplast AND Ferplast KS). For these, the product detail page must show an
"Also available from" section listing the other partner(s).

**How to implement this:**
1. Add an optional field to the product data type: `alsoAvailableFrom?: string[]`
   (array of partner slugs, e.g. `["ferplast-ks"]`)
2. In the product detail page (`/catalog/[slug]/page.tsx`), after the specs section,
   add a section that reads: "Also available from: [Partner Name]" with a link to
   `?partner=[partnerSlug]` or to the partner's catalog filter.
3. Style it as a subtle info card — not the main focus, but clearly visible.

**Products that share a category and need this cross-provider link:**

| Product | Primary Partner | Also Available From |
|---|---|---|
| PE-100 Water Supply Pipe | konti-hidroplast | ferplast-ks |
| PE-100 RC Water Supply Pipe | konti-hidroplast | ferplast-ks |
| HDPE Corrugated Sewage SN4 | ferplast-ks | konti-hidroplast |
| HDPE Corrugated Sewage SN8 | ferplast-ks | konti-hidroplast |
| PE Water Supply (Ferplast) | ferplast-ks | konti-hidroplast |
| HDPE Corrugated (Konti Kan) | konti-hidroplast | ferplast-ks |

Apply `alsoAvailableFrom` field to these products when you add/update them.

---

## STEP 1: DOWNLOAD ALL IMAGES

Run these curl commands. Verify each file is > 5KB before proceeding.

```bash
mkdir -p public/products/agri public/products/civil public/products/industrial

# ── POLINS (Serbia) ── polins.co.rs ──────────────────────────
curl -L -o public/products/agri/polins-sprayer-manual.jpg \
  "https://polins.co.rs/wp-content/uploads/2022/02/basprickalica.jpg"
curl -L -o public/products/agri/polins-electra-battery-sprayer.jpg \
  "https://polins.co.rs/wp-content/uploads/2022/02/electra-lux.jpg"
curl -L -o public/products/agri/polins-water-trough.jpg \
  "https://polins.co.rs/wp-content/uploads/2022/02/korito-za-vodu.jpg"
curl -L -o public/products/agri/polins-milk-can.jpg \
  "https://polins.co.rs/wp-content/uploads/2022/02/bidon.jpg"

# ── PALAPLAST (Greece) ── palaplast.com ──────────────────────
# Palaplast pipes - use their CDN images
curl -L -o public/products/agri/palaplast-ldpe-pipe.jpg \
  "https://palaplast.com/wp-content/uploads/ldpe-pipe.jpg"
curl -L -o public/products/agri/palaplast-hdpe-pipe.jpg \
  "https://palaplast.com/wp-content/uploads/hdpe-pipe.jpg"
curl -L -o public/products/agri/palaplast-compression-fittings.jpg \
  "https://palaplast.com/wp-content/uploads/compression-fittings.jpg"
curl -L -o public/products/agri/palaplast-rekorder-fittings.jpg \
  "https://palaplast.com/wp-content/uploads/rekorder.jpg"
curl -L -o public/products/agri/palaplast-filter.jpg \
  "https://palaplast.com/wp-content/uploads/filter.jpg"

# ── ROTO (North Macedonia) ── shop-roto.eu ───────────────────
curl -L -o public/products/agri/roto-edelweis-planter.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16138.jpg"
curl -L -o public/products/agri/roto-stoniness-planter.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16144.jpg"
curl -L -o public/products/agri/roto-jazz-planter.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16687.jpg"
curl -L -o public/products/agri/roto-rumba-planter.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16680.jpg"
curl -L -o public/products/agri/roto-barrel-planter.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16140.jpg"
curl -L -o public/products/agri/roto-nusa-planter.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16160.jpg"
curl -L -o public/products/agri/roto-tulip-planter.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16032.jpg"
curl -L -o public/products/agri/roto-water-tank-otw.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/151171.jpg"
curl -L -o public/products/agri/roto-water-tank-tcw.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/152636.jpg"
curl -L -o public/products/agri/roto-plastik-tank.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16543.jpg"

# ── PERPLAST (North Macedonia) ── perplastkompani.com ────────
curl -L -o public/products/agri/perplast-classic-pvc-hose.jpg \
  "https://perplastkompani.com/wp-content/uploads/classic-hose.jpg"
curl -L -o public/products/agri/perplast-flexoper3.jpg \
  "https://perplastkompani.com/wp-content/uploads/flexoper3.jpg"

# ── HIDROTEK / SEL-Polimer (Turkey) ─────────────────────────
curl -L -o public/products/agri/sel-troy-green-spiral-hose.jpg \
  "https://hidrotekhortum.com.tr/cdn/shop/products/yesil-spiral-hortum.jpg"
curl -L -o public/products/agri/sel-caramel-garden-hose.jpg \
  "https://hidrotekhortum.com.tr/cdn/shop/products/caramel-bahce-hortumu.jpg"

# ── CONFORT-AL (Albania) ─────────────────────────────────────
curl -L -o public/products/civil/confort-pvc-fittings.jpg \
  "https://confort-al.com/wp-content/uploads/pvc-fittings.jpg"
curl -L -o public/products/civil/confort-ppht-pipe.jpg \
  "https://confort-al.com/wp-content/uploads/ppht-pipe.jpg"

# ── XIER VALVE (China) ─────────────────────────────────────
curl -L -o public/products/civil/xier-upvc-ball-valve.jpg \
  "https://www.xiervalve.com/wp-content/uploads/xe01007-ball-valve.jpg"

# ── PLASTIKA NV (Serbia) ─────────────────────────────────────
curl -L -o public/products/industrial/plastika-nv-agricultural-film.jpg \
  "https://plastikanv.com/wp-content/uploads/agricultural-film.jpg"
```

After downloading, check each:
```bash
ls -lh public/products/agri/ public/products/civil/ public/products/industrial/
```

For ANY file that is 0 bytes, < 1 KB, or 404, replace it with the best Unsplash fallback:
- Sprayer/agricultural: `https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&q=80`
- Garden hose: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80`
- Decorative planter/vase: `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&q=80`
- Water tank/container: `https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&q=80`
- PVC fittings/pipe: `https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80`
- Film/packaging: `https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop&q=80`

---

## STEP 2: SEARCH FOR PRODUCT IMAGES NOT DOWNLOADABLE VIA CURL

For these products, web_search for the best matching image and use the image URL directly:

1. **Roto decorative planters** — search: `site:shop-roto.eu [product name]` and use the
   product image URL. If blocked, use the Unsplash planter fallback above.
2. **Perplast Classic Hose** — search: `perplastkompani.com classic pvc hose` and use the
   image from their product page.
3. **Perplast Flexoper-3** — search: `perplastkompani.com flexoper 3` for product image.
4. **SEL-Troy Green Spiral Hose** — search: `hidrotekhortum.com.tr sel-troy green spiral hose`
5. **Xier UPCV Ball Valve** — search: `xiervalve.com XE01007 compact ball valve`

---

## STEP 3: ADD ALL NEW PARTNERS TO partners-data.ts

Read partners-data.ts schema first: `cat src/data/partners-data.ts`

Add these partners if they don't exist (match the exact schema):

### Polins doo (UPDATE if exists — fix description)
- id: `polins`
- name: `Polins doo`
- country: `Serbia`
- website: `https://polins.co.rs`
- description: "Agricultural plastics manufacturer based in Odžaci, Serbia since 1996. Specialising in manual and battery sprayers, animal troughs, milk canisters, and garden tools."
- products summary: "Manual & battery sprayers, livestock troughs, milk/water canisters, plastic shovels"

### Palaplast (ADD NEW)
- id: `palaplast`
- name: `Palaplast`
- country: `Greece`
- website: `https://palaplast.com`
- description: "Leading Greek manufacturer of plastic irrigation pipes and fittings since 1982. ISO 9001 certified. Product range exceeds 4,500 codes. Present in 70+ countries."
- products summary: "LDPE/HDPE irrigation pipes, compression fittings (rekorder), screen filters, drippers"

### Roto (UPDATE if exists — fix description: NOT tanks, it's planters + tanks)
- id: `roto`
- name: `Roto`
- country: `North Macedonia`
- website: `https://shop-roto.eu`
- description: "Rotomould plastics manufacturer from North Macedonia producing decorative garden planters, outdoor ornaments, and HDPE water storage tanks."
- products summary: "Decorative planters (Edelweis, Stoniness, Jazz, Rumba, Barrel, Tulip, Nusa), water storage tanks (OTW, TCW, Tank)"

### Hidrotek / SEL-Polimer (UPDATE if exists)
- id: `sel-polimer`
- name: `Polimer Kauçuk / SEL-Polimer`
- country: `Turkey`
- website: `https://hidrotekhortum.com.tr`
- description: "Turkish hose manufacturer distributing SEL-branded PVC garden, spiral suction, and irrigation hoses. Est. 1957."
- products summary: "SEL-Troy green spiral suction hose, Caramel garden hose, industrial rubber hoses"

### Confort-AL (ADD NEW)
- id: `confort-al`
- name: `Confort sh.p.k`
- country: `Albania`
- website: `https://confort-al.com`
- description: "Albanian manufacturer of pipes and fittings in PVC, PPHT, and PPR. Established 1995 in Durrës. EN 1329-1:2014 and ISO 9001:2015 certified."
- products summary: "PVC fittings (sewage & drainage), PPHT pipes & fittings, PPR pipes, rectangular gutters, PP manholes"

### Xier Valve (ADD NEW)
- id: `xier-valve`
- name: `Xier Valve`
- country: `China`
- website: `https://www.xiervalve.com`
- description: "Chinese manufacturer of UPVC compact ball valves and industrial valve solutions for water management systems."
- products summary: "UPVC compact ball valves (long handle, XE01007–XE01009)"

### Plastika NV (UPDATE if exists)
- id: `plastika-nv`
- name: `Plastika DOO Nova Varoš`
- country: `Serbia`
- website: `https://plastikanv.com`
- description: "Serbian plastic processing company with in-house recycling and solar-powered operations. Produces agricultural PE films and industrial packaging."
- products summary: "Agricultural PE film (2-year, 4-year), white PE film, packaging film"

---

## STEP 4: ADD ALL PRODUCTS

For EACH product below, match the exact schema from Step 0. Include `alsoAvailableFrom` where noted.

---

### ══════════════════════════════════════════
### POLINS DOO — Serbia
### Source: polins.co.rs + your offer image (page 58, dated 17.9.2025)
### ══════════════════════════════════════════

**IMPORTANT:** The existing entry `polins-agricultural-film` (slug) is WRONG — it says
"Greenhouse Cover Film" but Polins does NOT make greenhouse film. DELETE or REPLACE it.

#### Product P1: Manual Garden Sprayer — Pompe Sperkatje Polins
- slug: `polins-manual-sprayer`
- name: `Manual Garden Sprayer`
- partner: `polins`
- category: `agri`
- material: `HDPE` / `PP`
- use: `Agriculture`
- image: `/products/agri/polins-sprayer-manual.jpg`
- badges: `IN STOCK`
- shortDescription: "Manual pump-action garden sprayer for applying pesticides, herbicides, fungicides, and liquid fertilisers. Available in 1 L, 1.5 L, 2 L, 2.5 L, 5 L, 10 L, 12 L, and 16 L."
- description: "Polins doo manufactures a complete range of manual pump-action garden sprayers (Pompe Sperkatje). All models feature an HDPE tank, a manual piston pump with safety pressure-relief valve, carry strap, spray hose, trigger handle, and lance extension. The Clear variant (2 L) has a transparent tank for easy liquid level monitoring. All models are suitable for water-soluble herbicides, insecticides, fungicides, and liquid plant nutrition products."
- features:
  - Complete range from 1 L to 16 L tank capacity
  - HDPE tank — UV-stable, chemical-resistant
  - Manual piston pump with integrated safety valve
  - Carry strap, hose, trigger handle, and lance included
  - 2 L Clear variant with transparent tank
  - Suitable for herbicides, insecticides, fungicides, liquid fertilisers
- specs:
  | Model | Capacity | Note |
  | Pompe Sperkatje Polins | 1 L | Manual |
  | Pompe Sperkatje Polins | 1.5 L | Manual |
  | Pompe Sperkatje Polins | 2 L | Manual |
  | Pompe Sperkatje Polins CLEAR | 2 L | Transparent tank |
  | Pompe Sperkatje Polins | 5 L | Manual |
  | Pompe Sperkatje Polins | 10 L | Manual |
  | Pompe Sperkatje Polins | 12 L | Manual |
  | Pompe Sperkatje Polins | 16 L | Manual |
- sourceUrl: `https://polins.co.rs/products/sprayers/?lang=en`

#### Product P2: Battery-Powered Back Sprayer — Electra Lux 16
- slug: `polins-battery-sprayer-electra-lux`
- name: `Electra Lux 16 Battery Back Sprayer`
- partner: `polins`
- category: `agri`
- material: `HDPE`
- use: `Agriculture`
- image: `/products/agri/polins-electra-battery-sprayer.jpg`
- badges: `IN STOCK`, `Battery Powered`
- shortDescription: "16-litre battery-powered back sprayer. Motorised pump for consistent pressure without manual pumping effort."
- description: "The Polins Electra Lux 16 is a 16-litre battery-powered back sprayer. A rechargeable lithium-ion battery drives an electric pump delivering consistent spray pressure. Pressure is adjustable via potentiometer. Suitable for herbicides, insecticides, fungicides, and liquid fertilisers."
- specs:
  - Capacity: 16 L
  - Power: Rechargeable lithium-ion battery
  - Pump: Electric (motorised)
  - Pressure control: Potentiometer (variable)
  - Battery life: ~300 cycles to 50% capacity
  - Application: Plant-care chemicals (water-soluble)
- sourceUrl: `https://polins.co.rs/products/sprayers/back-sprayer-electra-lux-16/?lang=en`

#### Product P3: Livestock Water Trough — Vaska Uji per Pula
- slug: `polins-water-trough`
- name: `Livestock Water Trough`
- partner: `polins`
- category: `agri`
- material: `HDPE`
- use: `Agriculture`
- image: `/products/agri/polins-water-trough.jpg`
- badges: `IN STOCK`
- shortDescription: "HDPE water trough for poultry and livestock. Available in round sizes 200 mm, 250 mm, and 340 mm diameter."
- description: "Polins doo manufactures durable HDPE livestock water troughs (Vaska Uji per Pula) designed for poultry and small livestock. Available as open troughs and as troughs with integrated water bottle holders. Sizes: 200 mm, 250 mm, and 340 mm diameter."
- specs:
  | Model | Size | Notes |
  | Vaska Uji per Pula | 200 mm | Round open trough |
  | Vaska Uji per Pula | 250 mm | Round open trough |
  | Vaska Uji per Pula me Bidon | — | With bottle holder |
  | Vaska Uji per Pula | 340 mm | Large round |

#### Product P4: Livestock Feed Trough — Vaska Ushqyese per Pula
- slug: `polins-feed-trough`
- name: `Livestock Feed Trough`
- partner: `polins`
- category: `agri`
- material: `HDPE`
- use: `Agriculture`
- image: `/products/agri/polins-water-trough.jpg` (reuse — same style product)
- badges: `IN STOCK`
- shortDescription: "Polypropylene feed trough for poultry and livestock. Sizes: 200 mm, 250 mm, 400 mm, 445 mm."
- specs:
  | Model | Size |
  | Vaska Ushqyese per Pula | 200 mm |
  | Vaska Ushqyese per Pula | 250 mm |
  | Vaska Ushqyese per Pula | 400 mm |
  | Vaska Ushqyese per Pula | 445 mm |

#### Product P5: Milk / Food Canister — Bidon Mjalt + Qumesht
- slug: `polins-milk-canister`
- name: `Food-Grade Milk & Honey Canister`
- partner: `polins`
- category: `agri`
- material: `HDPE`
- use: `Agriculture`
- image: `/products/agri/polins-milk-can.jpg`
- badges: `IN STOCK`
- shortDescription: "Food-grade HDPE canisters for milk, honey, and food liquids. Sizes: 5 L, 10 L, 15 L, 20 L."
- specs:
  | Model | Capacity |
  | Bidon Mjalt + Qumesht Polins | 5 L |
  | Bidon Mjalt + Qumesht Polins | 10 L |
  | Bidon Mjalt + Qumesht Polins | 15 L |
  | Bidon Mjalt + Qumesht Polins | 20 L |

#### Product P6: Water Canister — Bidon Uji
- slug: `polins-water-canister`
- name: `HDPE Water Canister`
- partner: `polins`
- category: `agri`
- material: `HDPE`
- use: `Agriculture`
- image: `/products/agri/polins-milk-can.jpg`
- badges: `IN STOCK`
- shortDescription: "HDPE water storage canisters. Available in 10 L and 20 L."
- specs:
  | Bidon Uji Polins | 10 L |
  | Bidon Uji Polins | 20 L |

---

### ══════════════════════════════════════════
### PALAPLAST — Greece
### Source: palaplast.com + internal offer images (dated 05.07.2023)
### Image 2 (LDPE/HDPE pipes 6 ATM + 10 ATM), Image 3 (Rekorder fittings 10 ATM),
### Image 4 (Filters + end-caps + lotuese)
### ══════════════════════════════════════════

#### Product PA1: LDPE Irrigation Pipe — 6 ATM
- slug: `palaplast-ldpe-pipe-6atm`
- name: `LDPE Irrigation Pipe — 6 ATM`
- partner: `palaplast`
- category: `agri`
- material: `LDPE`
- use: `Agriculture`
- diameter min: 20, max: 32
- image: `/products/agri/palaplast-ldpe-pipe.jpg`
- standards: `EN 12201-2`
- badges: `6 ATM`, `IN STOCK`
- shortDescription: "Low-density polyethylene (LDPE) irrigation mainline pipe, 6 ATM working pressure. Supplied by the metre. Diameters: 20, 25, 32 mm."
- description: "Palaplast LDPE irrigation pipes rated at 6 ATM are used as sub-laterals and secondary mainlines in agricultural irrigation networks. Highly flexible for easy field layout. Sold by the metre."
- specs:
  | Diameter (mm) | Pressure | Unit |
  | 20 | 6 ATM | per metre |
  | 25 | 6 ATM | per metre |
  | 32 | 6 ATM | per metre |
- sourceUrl: `https://palaplast.com/product-category/irrigation-en/irrigation-pipes-en/ldpe-en/`

#### Product PA2: HDPE Irrigation Pipe — 6 ATM
- slug: `palaplast-hdpe-pipe-6atm`
- name: `HDPE Irrigation Pipe — 6 ATM`
- partner: `palaplast`
- category: `agri`
- material: `HDPE`
- use: `Agriculture`
- diameter min: 40, max: 110
- image: `/products/agri/palaplast-hdpe-pipe.jpg`
- standards: `EN 12201-2`
- badges: `6 ATM`, `IN STOCK`
- shortDescription: "HDPE irrigation mainline pipe, 6 ATM working pressure. Sizes 40–110 mm. Sold per metre."
- specs:
  | Diameter (mm) | Pressure | Unit |
  | 40 | 6 ATM | per metre |
  | 50 | 6 ATM | per metre |
  | 63 | 6 ATM | per metre |
  | 75 | 6 ATM | per metre |
  | 90 | 6 ATM | per metre |
  | 110 | 6 ATM | per metre |
- sourceUrl: `https://palaplast.com/product-category/irrigation-en/irrigation-pipes-en/`

#### Product PA3: HDPE Irrigation Pipe — 10 ATM
- slug: `palaplast-hdpe-pipe-10atm`
- name: `HDPE Irrigation Pipe — 10 ATM`
- partner: `palaplast`
- category: `agri`
- material: `HDPE`
- use: `Agriculture`
- diameter min: 20, max: 75
- image: `/products/agri/palaplast-hdpe-pipe.jpg`
- standards: `EN 12201-2`
- badges: `10 ATM`, `IN STOCK`
- shortDescription: "High-pressure HDPE irrigation mainline, 10 ATM. For primary distribution networks requiring higher working pressure. Sizes 20–75 mm."
- specs:
  | Diameter (mm) | Pressure | Unit |
  | 20 | 10 ATM | per metre |
  | 25 | 10 ATM | per metre |
  | 32 | 10 ATM | per metre |
  | 40 | 10 ATM | per metre |
  | 50 | 10 ATM | per metre |
  | 75 | 10 ATM | per metre |

#### Product PA4: Compression Fittings (Rekorder) — 10 ATM
- slug: `palaplast-rekorder-10atm`
- name: `Compression Fittings (Rekorder) — 10 ATM`
- partner: `palaplast`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- diameter min: 20, max: 110
- image: `/products/agri/palaplast-rekorder-fittings.jpg`
- standards: `PN 10`
- badges: `PN10`, `10 ATM`, `IN STOCK`
- shortDescription: "Polypropylene compression fittings (rekorder) rated at 10 ATM for PE and LDPE irrigation pipes. Full range: elbows (brryl), tees (tija), reducers, and male/female adapters."
- description: "Palaplast's 10 ATM compression fittings (known locally as 'rekorder') are manufactured from polypropylene for tool-free connection to PE and LDPE irrigation pipes. The range from internal offer page 5 (dated 05.07.2023) includes: BRRYL MASHKULL (male elbow), BRRRYL FEMER (female elbow), TIJA (equal tee), TIJA RED MASHKULL (reducing tee, male thread). Available in 20–110 mm diameter."
- specs (from image 3 — Rekorder 10ATM Palaplast):
  | Type | Sizes Available |
  | BRRYL MASHKULL (male elbow) | 50-1½", 50-2", 63-1½", 63-2", 75-2½", 90-3" |
  | BRRRYL FEMER (female elbow) | 75-2½", 90-3", 110-4" |
  | TIJA (equal tee) | 20, 25, 32, 40, 50, 63, 75, 90, 110 mm |
  | TIJA RED MASHKULL (reducing tee male) | 20-½", 20-¾", 25-¾", 25-1", 32-¾", 32-1", 40-1", 40-1¼", 40-1½", 40-2", 50-1½", 50-2", 63-1½", 63-2", 75-2", 75-2½", 90-3", 90-4", 110-3", 110-4" |
  | TIJA RED (reducer) | 25-20, 32-25 |
- sourceUrl: `https://palaplast.com/product-category/irrigation-en/irrigation-fittings/compression-en/`

#### Product PA5: Irrigation Filters — Filtra
- slug: `palaplast-irrigation-filters`
- name: `Irrigation Screen Filters`
- partner: `palaplast`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- diameter min: 0, max: 0
- image: `/products/agri/palaplast-filter.jpg`
- badges: `IN STOCK`
- shortDescription: "Polypropylene screen filters for drip irrigation, protecting emitters from sand and debris. Sizes ¾\", 1\", 1¼\", 1½\", 2\". Available with or without mini valve."
- specs (from image 4 — Filtra, Tapa, Lotuese):
  | Type | Size |
  | Filter SMALL | ¾" |
  | Filter (standard) | ¾" |
  | Filter LARGE | ¾" |
  | Filter | 1" |
  | Filter ME MINI VALVUL | 1" |
  | Filter | 1" 1¼" |
  | Filter ME MINI VALVUL | 1" 1¼" |
  | Filter | 1" 1½" |
  | Filter - (large) | 1" 1½" |
  | Filter ME MINI VALVUL | 2" |
  | Filter (large) | 2" |
  | Filter ME MINI VALVUL | 2" |
- sourceUrl: `https://palaplast.com/product-category/irrigation-en/irrigation-fittings/filters-en/`

#### Product PA6: End Caps & Pipe Joiners (Bashkuese Kallam / Tapa / Lotuese)
- slug: `palaplast-end-caps-joiners`
- name: `Irrigation End Caps, Pipe Joiners & Drip Emitters`
- partner: `palaplast`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- image: `/products/agri/palaplast-compression-fittings.jpg`
- badges: `IN STOCK`
- shortDescription: "Irrigation accessories: pipe end caps (tapa) ½\"–4\", pipe joiners/couplings (bashkuese kallam) Ø16–32 mm, and drip emitters (lotuese) in red, green, black."
- specs (from image 4):
  | Type | Size |
  | TAPA (end cap) | ½", ¾", 1", 1¼", 1½", 2", 2½", 3", 4" |
  | BASHKUESE KALLAM (pipe joiner) | Ø16, Ø20, Ø25, Ø32 mm |
  | LOTUESE (drip emitter) | Ø70 Red / Ø100 Green / Ø150 Black |
- sourceUrl: `https://palaplast.com/`

#### Product PA7: Saracineska (Stopcock/Valve) — From internal offer image 5
- slug: `palaplast-saracineska-valve`
- name: `Plastic Stopcock (Saracineska)`
- partner: `palaplast`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- diameter min: 16, max: 25
- image: `/products/agri/palaplast-compression-fittings.jpg`
- badges: `IN STOCK`
- shortDescription: "Plastic inline stopcock valve for irrigation pipe systems. Types: standard, A&K (blue), complete with pipe fittings. Sizes 16 and 20 mm."
- specs (from image 5 — Saraceneska, dated 24.6.2022):
  | Type | Size |
  | SARACINESKA KALLAM | 16 mm |
  | SARACINESKA KALLAM | 20 mm |
  | SARACINESKA KALLAM | 25 mm |
  | SARAC KALLAM PIPET – KOD 3158 | 16 mm |
  | SARAC KALLAM PIPET – KOD 3158 | 20 mm |
  | SARAC KALLAM PIPET A&K (BLU) | 16 mm |
  | SARACINESKA PLOTE PIPET -3162 | 16 mm |
  | SARACINESKA PLOTE PIPET -3162 | 20 mm |
  | SARACINESKA KOMPLETE (31672020) | 20 mm |
  | SARACINESKA KOMPLETE (31672525) | 25 mm |

---

### ══════════════════════════════════════════
### ROTO — North Macedonia
### Source: shop-roto.eu + internal offer images 6,7,8,9,10,11,12 (dated 19.02.2022)
### ══════════════════════════════════════════

NOTE: Roto makes TWO categories: (1) decorative planters/ornaments and (2) water tanks.
Both should have `category: "agri"` for planters and `category: "civil"` or "agri" for tanks.

#### Product R1: Edelweis Decorative Planter
- slug: `roto-edelweis-planter`
- name: `Edelweis Decorative Planter`
- partner: `roto` (or existing slug if different)
- category: `agri`
- material: `PP`
- use: `Agriculture`
- image: `/products/agri/roto-edelweis-planter.jpg`
- badges: `IN STOCK`
- shortDescription: "Rectangular stone-effect decorative planter in three sizes: S, L, and XL. Also available in oval design."
- description: "Roto's Edelweis is a rectangular decorative planter with a natural stone texture finish, available in Small, Large, and XL. The Edelweis Ovale is an oval variant. Made from UV-stabilised rotomoulded polypropylene for outdoor use."
- specs:
  | Model | Code |
  | EDELWEIS S | 16138 |
  | EDELWEIS L | 16139 |
  | EDELWEIS XL | 16199 |
  | EDELWEIS OVALE | 16198 |
  | EDELWEIS ROUND S | 16113 |
  | EDELWEIS ROUND M | 16154 |
  | WALL-MURALE | 16035 |
- sourceUrl: `https://shop-roto.eu/shop/`

#### Product R2: Stoniness Decorative Planter
- slug: `roto-stoniness-planter`
- name: `Stoniness Decorative Planter`
- partner: `roto`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- image: `/products/agri/roto-stoniness-planter.jpg`
- badges: `IN STOCK`
- shortDescription: "Textured stone-effect round planter in four sizes: S, M, L, and XL."
- specs:
  | Model | Code |
  | STONINESS S | 16144 |
  | STONINESS M | 16143 |
  | STONINESS L | 16142 |
  | STONINESS XL | 16159 |

#### Product R3: Jazz Garden Planter
- slug: `roto-jazz-planter`
- name: `Jazz Garden Planter`
- partner: `roto`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- image: `/products/agri/roto-jazz-planter.jpg`
- badges: `IN STOCK`
- shortDescription: "Round garden planter in three sizes. Dimensions: S Ø300×270 mm, M Ø490×350 mm, L Ø500×430 mm."
- specs:
  | Model | Code | Dimensions |
  | VAZO JAZZ S | 16687 | Ø300×270 mm |
  | VAZO JAZZ M | 16686 | Ø490×350 mm |
  | VAZO JAZZ L | 16688 | Ø500×430 mm |

#### Product R4: Rumba Garden Planter
- slug: `roto-rumba-planter`
- name: `Rumba Garden Planter`
- partner: `roto`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- image: `/products/agri/roto-rumba-planter.jpg`
- badges: `IN STOCK`
- shortDescription: "Wide-mouth round garden planter in S, M, and L sizes."
- specs:
  | VAZO RUMBA S | 16680 |
  | VAZO RUMBA M | 16679 |
  | VAZO RUMBA L | 16681 |

#### Product R5: Barrel Decorative Planter
- slug: `roto-barrel-planter`
- name: `Barrel Decorative Planter`
- partner: `roto`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- image: `/products/agri/roto-barrel-planter.jpg`
- badges: `IN STOCK`
- shortDescription: "Barrel-shaped decorative planter / garden ornament. Available as single Barrel and multi-size Barrel S/M/L/XL/XXL."
- specs:
  | Model | Code |
  | VAZO BARREL (single) | 16140 |
  | VAZO BARREL S | 16167 |
  | VAZO BARREL M | 16168 |
  | VAZO BARREL L | 16169 |
  | VAZO BARREL XL | 16663 |
  | VAZO BARREL XXL | 16664 |

#### Product R6: Nusa Decorative Planter
- slug: `roto-nusa-planter`
- name: `Nusa Decorative Planter`
- partner: `roto`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- image: `/products/agri/roto-nusa-planter.jpg`
- badges: `IN STOCK`
- shortDescription: "Rectangular ribbed Nusa planter and round Nusa variant in multiple sizes."
- specs:
  | NUSA SQUAREDS S | 16160 |
  | NUSA S | 16030 |
  | NUSA XL | 16076 |
  | NUSA ROUND | 16014 |

#### Product R7: Tulip & Novelty Planters
- slug: `roto-novelty-planters`
- name: `Tulip & Novelty Decorative Planters`
- partner: `roto`
- category: `agri`
- material: `PP`
- use: `Agriculture`
- image: `/products/agri/roto-tulip-planter.jpg`
- badges: `IN STOCK`
- shortDescription: "Decorative novelty planters: Tulip, Shoe (Kepuce), Elephant, Sack, Vase, Margerita, Amphora, Bell, Herb, and animal figures."
- specs (from images 8, 9, 10, 11):
  | Model | Code |
  | TULIP S | 16032 |
  | TULIP L | 16036 |
  | TULIP XL | 16666 |
  | SHOE (KEPUCE) S | 16015 |
  | SHOE (KEPUCE) L | 16103 |
  | ELEPHANT | 16149 |
  | SACK (THES) | 16000 |
  | VASE S | 16053 |
  | VASE M | 16005 |
  | VASE L | 16099 |
  | MARGERITA S | 16085 |
  | MARGERITA M | 16086 |
  | MARGERITA L | 16087 |
  | CAN (LAMBIK) | 16281 |
  | JELKA S | 16166 |
  | TROBENTICA | 16068 |
  | BELL S | 16060 |
  | BELL M | 16061 |
  | BELL L | 16062 |
  | AMPHORA | 16108 |
  | HERB | 16050 |
  | SHELL (GUACKE) | 16101 |
  | SNAIL (KERMILL) S | 16104 |
  | SNAIL (KERMILL) L | 16182 |
  | SWAN (MJELME) S | 16082 |
  | SWAN (MJELME) L | 16084 |
  | DONKEY-GOMARI | 6054 |
  | CARRIAGE-KARROCE | 6192 |
  | DJALI ME KARROCE | 6146 |
  | VAJZA ME KARROCE | 6148 |
  | SEA GIRL-VAJZE DETI | 16094 |

#### Product R8: Roto Water Storage Tanks — OTW Square Barrel
- slug: `roto-water-tank-otw`
- name: `OTW Square Water Storage Tank`
- partner: `roto`
- category: `civil`
- material: `HDPE`
- use: `Water`
- image: `/products/agri/roto-water-tank-otw.jpg`
- badges: `IN STOCK`
- shortDescription: "Rotomoulded HDPE square-body water storage tanks (Barrel OTW). Capacities: 60 L to 300 L."
- specs (from image 12):
  | BARREL OTW | 60 L | Code 151171 |
  | BARREL OTW | 100 L | Code 151187 |
  | BARREL OTW | 150 L | Code 151175 |
  | BARREL OTW | 200 L | Code 151117 |
  | BARREL OTW | 300 L | Code 151180 |

#### Product R9: Roto Water Storage Tanks — OTW Cisterna (Large)
- slug: `roto-cisterna-otw`
- name: `OTW-Roto Water Storage Cistern`
- partner: `roto`
- category: `civil`
- material: `HDPE`
- use: `Water`
- image: `/products/agri/roto-water-tank-otw.jpg`
- badges: `IN STOCK`
- shortDescription: "Large rotomoulded HDPE water cisterns (Depozita – Cisterna). Capacities: 500 L, 1000 L, and 1500 L."
- specs:
  | BARREL OTW-ROTO | 500 L | Code 16578 |
  | BARREL OTW-ROTO | 1000 L | Code 16580 |
  | BARREL OTW-ROTO | 1500 L | Code 16590 |

#### Product R10: Roto TCW Vezake Water Tanks
- slug: `roto-water-tank-tcw`
- name: `TCW Vezake Water Storage Tank`
- partner: `roto`
- category: `civil`
- material: `HDPE`
- use: `Water`
- image: `/products/agri/roto-water-tank-tcw.jpg`
- badges: `IN STOCK`
- shortDescription: "Vertical oval HDPE water storage tanks (Cisterna TCW/Barrel TCW). 70 L to 750 L capacity."
- specs:
  | BARREL TCW | 70 L | Code 152636 |
  | BARREL TCW | 100 L | Code 152640 |
  | BARREL TCW | 150 L | Code 152646 |
  | BARREL TCW | 200 L | Code 152650 |
  | BARREL TCW | 300 L | Code 152796 |
  | BARREL TCW | 500 L | Code 152794 |
  | BARREL TCW | 750 L | Code 153080 (Black) |

#### Product R11: Roto Plastik Tank (Large Green Tanks)
- slug: `roto-plastik-tank-large`
- name: `Plastik Tank — Large Capacity`
- partner: `roto`
- category: `civil`
- material: `HDPE`
- use: `Water`
- image: `/products/agri/roto-plastik-tank.jpg`
- badges: `IN STOCK`
- shortDescription: "Large-capacity HDPE storage tanks for water. Sizes: 2500 L, 3500 L, and 5000 L. Connectors available for 5000 L."
- specs:
  | PLASTIK TANK | 2500 L | Code 16543 |
  | PLASTIK TANK | 3500 L | Code 36233 |
  | PLASTIK TANK | 5000 L | Code 16234 |
  | BASHKUESE per TANK 5000 L | 400×200 | Code 16358 |
  | BASHKUESE per TANK 5000 L | 600×200 | Code 16357 |

---

### ══════════════════════════════════════════
### PERPLAST KOMPANI — North Macedonia
### Source: perplastkompani.com
### ══════════════════════════════════════════

#### Product PE1: Classic PVC Garden Hose (UPDATE existing `perplast-pvc-hose`)
- slug: `perplast-pvc-hose` (UPDATE existing entry)
- name: `Classic PVC Garden Hose`
- partner: `perplast`
- category: `agri`
- material: `PVC`
- use: `Water`
- diameter min: 13, max: 25 (½", ¾", 1")
- image: `/products/agri/perplast-classic-pvc-hose.jpg`
- badges: `IN STOCK`
- availability: IN STOCK in ½" (13 mm), ¾" (19 mm), and 1" (25 mm)
- shortDescription: "Multi-layer PVC garden hose for general watering, agriculture, and light washing. In stock: ½\", ¾\", and 1\" internal diameter."
- description: "Perplast Kompani's Classic PVC garden hose is a multi-layer construction for general garden and agricultural watering, car washing, and light cleaning applications. The hose is manufactured at their factory in Tetovo, North Macedonia from laboratory-tested premium PVC compound. In stock in ½\", ¾\", and 1\" (13 mm, 19 mm, 25 mm inner diameter)."
- specs:
  | Size | Inner Diameter | Availability |
  | ½" | 13 mm | In Stock |
  | ¾" | 19 mm | In Stock |
  | 1" | 25 mm | In Stock |
- sourceUrl: `https://perplastkompani.com/product/perplast-classic-pvc-hose/`

#### Product PE2: Flexoper-3 PVC Reinforced Hose
- slug: `perplast-flexoper-3`
- name: `Flexoper-3 Reinforced PVC Garden Hose`
- partner: `perplast`
- category: `agri`
- material: `PVC`
- use: `Water`
- diameter min: 13, max: 13
- image: `/products/agri/perplast-flexoper3.jpg`
- badges: `IN STOCK`
- availability: IN STOCK ½" in 20 m, 25 m, and 50 m coils
- shortDescription: "3-layer reinforced PVC garden hose. Available ½\" in 20 m, 25 m, and 50 m lengths."
- description: "The Perplast Flexoper-3 is a three-layer reinforced PVC hose offering improved pressure resistance over the Classic model. In stock in ½\" (13 mm internal diameter) in coil lengths of 20 m, 25 m, and 50 m."
- specs:
  | Size | Length | Availability |
  | ½" (13 mm) | 20 m | In Stock |
  | ½" (13 mm) | 25 m | In Stock |
  | ½" (13 mm) | 50 m | In Stock |
- sourceUrl: `https://perplastkompani.com/product/flexoper-3/`

---

### ══════════════════════════════════════════
### HIDROTEK / SEL-POLIMER — Turkey
### Source: hidrotekhortum.com.tr
### ══════════════════════════════════════════

#### Product H1: SEL-Troy Green Spiral Suction Hose (UPDATE existing `sel-polimer-pvc-suction`)
- slug: `sel-troy-green-spiral-hose`
- name: `SEL-Troy Green PVC Spiral Suction Hose`
- partner: `sel-polimer`
- category: `industrial`
- material: `PVC`
- use: `Water`
- diameter min: 19, max: 120
- image: `/products/agri/sel-troy-green-spiral-hose.jpg`
- badges: `IN STOCK Ø19–120 mm`
- availability: IN STOCK Ø 19 mm to Ø 120 mm
- shortDescription: "Green PVC spiral suction and delivery hose (SEL-Troy ST). Flexible inner PVC surface, shock-resistant rigid PVC spiral. Ø 19–120 mm in stock. For agriculture, irrigation, fertilisation, and chemical transfer."
- description: "The SEL-Troy ST green spiral hose by SEL-Polimer (distributed via Hidrotek Hortum, Turkey) is a robust PVC suction and delivery hose with a smooth flexible inner PVC layer and shock-resistant rigid PVC helix spiral. The spiral reinforcement prevents collapse under vacuum (suction). Used in agriculture for irrigation, pesticide application, fertiliser transfer, and light chemical handling. Available Ø 19 mm to Ø 120 mm in stock."
- features:
  - Smooth flexible PVC inner surface
  - Shock-resistant rigid PVC spiral helix — vacuum/suction rated
  - Suitable for water, agricultural chemicals, fertilisers, and light acids
  - Colour: Green with green spiral
  - Ø 19–120 mm in stock
  - Available per metre or in coils
- specs:
  - Material: PVC inner + rigid PVC spiral
  - Colour: Green
  - Diameter range (stock): Ø 19–120 mm
  - Application: Suction & delivery — irrigation, fertilisation, light chemicals
  - Standard: SEL brand (Turkey)
- sourceUrl: `https://hidrotekhortum.com.tr/en/collections/yesil-spiral-hortum-sel-troy-st`

#### Product H2: Caramel Garden Hose (SEL, ½", ¾", 1")
- slug: `sel-caramel-garden-hose`
- name: `Caramel PVC Garden Hose`
- partner: `sel-polimer`
- category: `agri`
- material: `PVC`
- use: `Water`
- diameter min: 13, max: 25
- image: `/products/agri/sel-caramel-garden-hose.jpg`
- badges: `IN STOCK ½" ¾" 1"`
- availability: IN STOCK ½", ¾", and 1"
- shortDescription: "Caramel-orange PVC garden hose. In stock in ½\", ¾\", and 1\" sizes. For garden watering and general use."
- specs:
  | Size | Inner Diameter | Availability |
  | ½" | 13 mm | In Stock |
  | ¾" | 19 mm | In Stock |
  | 1" | 25 mm | In Stock |
- sourceUrl: `https://hidrotekhortum.com.tr/en/products/1-caramel-turuncu-bahce-hortumu`

---

### ══════════════════════════════════════════
### CONFORT-AL — Albania
### Source: confort-al.com (Est. 1995, Durrës, Albania)
### ALL products are IN STOCK
### ══════════════════════════════════════════

NOTE: Add `confort-al` as a new partner first (see Step 3).

#### Product C1: PPHT Pipes & Fittings (Building Sewage)
- slug: `confort-ppht-pipes`
- name: `PPHT Building Drainage Pipe & Fittings`
- partner: `confort-al`
- category: `civil`
- material: `PP`
- use: `Sewage`
- diameter min: 32, max: 160
- image: `/products/civil/confort-pvc-fittings.jpg`
- standards: `EN 1329-1:2014+A1:2008`
- badges: `EN 1329-1`, `IN STOCK`, `Local Albania`
- shortDescription: "Two-layer PPHT pipes and fittings for building sewage and waste-water drainage. Grey, Ø 32–160 mm, in lengths 0.25–3 m. EN 1329-1:2014 certified."
- description: "Confort sh.p.k produces two-layer PPHT pipes and fittings to EN 1329-1:2014+A1:2008 for internal sewage and waste-water drainage in civil and industrial buildings. Available in grey colour, Ø 32–160 mm, in lengths of 0.25 m, 0.5 m, 1 m, 2 m, and 3 m with single or double socket. Complete range of fittings available. Manufactured in Durrës, Albania since 1995. All products in stock."
- specs:
  - Standard: EN 1329-1:2014+A1:2008
  - Material: PPHT (polypropylene high temperature)
  - Diameter range: Ø 32, 40, 50, 75, 90, 100, 110, 125, 160 mm
  - Lengths: 0.25 m / 0.5 m / 1 m / 2 m / 3 m
  - Colour: Grey
  - Joint: Single or double socket
  - Origin: Made in Albania (Durrës)
- sourceUrl: `https://confort-al.com/ppht-pipes-and-fittings/`

#### Product C2: PVC Fittings (Sewage & Drainage)
- slug: `confort-pvc-fittings`
- name: `PVC Sewage & Drainage Fittings`
- partner: `confort-al`
- category: `civil`
- material: `PVC`
- use: `Sewage`
- diameter min: 32, max: 160
- image: `/products/civil/confort-pvc-fittings.jpg`
- standards: `EN 1329-1:2014+A1:2008`
- badges: `EN 1329-1`, `IN STOCK`, `Local Albania`
- shortDescription: "Full range of PVC fittings for building sewage, drainage, and underground systems under pressure. EN 1329-1:2014 certified. Made in Albania."
- description: "Confort produces PVC fittings for high and low temperature piping systems, buried and underground sewage, and drainage systems. Certified to EN 1329-1:2014+A1:2008. Complete fitting range: elbows, tees, reducers, couplings, caps. Every product from the Confort PVC fittings catalogue is available in stock. Manufactured in Durrës, Albania since 1995."
- specs:
  - Standard: EN 1329-1:2014+A1:2008
  - Material: PVC
  - Diameter range: Ø 32–160 mm
  - Product types: Elbows, tees, Y-branches, reducers, couplings, end caps
  - Origin: Made in Albania (Durrës)
  - ISO 9001:2015 certified
- sourceUrl: `https://confort-al.com/pvc-fittings/`

#### Product C3: PPR Pipes & Fittings (Hot & Cold Water)
- slug: `confort-ppr-pipes`
- name: `PPR Hot & Cold Water Pipe & Fittings`
- partner: `confort-al`
- category: `civil`
- material: `PP`
- use: `Water`
- diameter min: 20, max: 63
- image: `/products/civil/confort-ppht-pipe.jpg`
- badges: `IN STOCK`, `Local Albania`
- shortDescription: "Polypropylene Random (PPR) pipes and fittings for hot and cold potable water, central heating, and underfloor systems. Ø 20–63 mm. Made in Albania."
- specs:
  - Material: PPR (Polypropylene Random)
  - Diameter range: Ø 20, 25, 32, 40, 50, 63 mm
  - Applications: Hot/cold potable water, central heating, underfloor heating
  - Origin: Made in Albania (Durrës)
- sourceUrl: `https://confort-al.com/ppr-pipes-and-fittings/`

#### Product C4: Rectangular Gutters & Rainpipes in PVC
- slug: `confort-pvc-gutters`
- name: `PVC Rectangular Gutters & Rainpipes`
- partner: `confort-al`
- category: `civil`
- material: `PVC`
- use: `Drainage`
- image: `/products/civil/confort-pvc-fittings.jpg`
- badges: `IN STOCK`, `Local Albania`
- shortDescription: "PVC rectangular gutters and downpipes for rainwater drainage. Full system including brackets and connectors. Made in Albania."
- sourceUrl: `https://confort-al.com/rectangular-pipes-and-fittings/`

#### Product C5: PP Manholes & Sumps
- slug: `confort-pp-manholes`
- name: `PP Manholes & Inspection Sumps`
- partner: `confort-al`
- category: `civil`
- material: `PP`
- use: `Sewage`
- image: `/products/civil/confort-pvc-fittings.jpg`
- badges: `IN STOCK`, `Local Albania`
- shortDescription: "Polypropylene manholes and inspection sumps for underground sewage systems. Made in Albania."
- sourceUrl: `https://confort-al.com/`

---

### ══════════════════════════════════════════
### XIER VALVE — China
### Source: xiervalve.com
### ══════════════════════════════════════════

#### Product X1: UPVC Compact Ball Valve — Long Handle
- slug: `xier-upvc-ball-valve`
- name: `UPVC Compact Ball Valve — Long Handle`
- partner: `xier-valve`
- category: `civil`
- material: `PVC`
- use: `Water`
- diameter min: 15, max: 110 (½" to 4")
- image: `/products/civil/xier-upvc-ball-valve.jpg`
- standards: `ISO 9001`
- badges: `IN STOCK`, `UPVC`
- shortDescription: "UPVC compact ball valve with long handle (models XE01007–XE01009). Full bore design for water management systems, irrigation, and industrial fluid control."
- description: "Xier Valve's UPVC compact ball valve (long handle series XE01007–XE01009) is a full-bore PVC valve for water supply, irrigation networks, and industrial fluid control. The compact body and long handle allow easy operation in tight spaces. UPVC construction is corrosion-free and suitable for potable water, agricultural chemicals, and mild industrial fluids."
- features:
  - UPVC body and ball — corrosion-resistant, lightweight
  - Full-bore design — minimal flow restriction
  - Long ergonomic handle for easy quarter-turn operation
  - Suitable for potable water, irrigation, industrial fluids
  - Sizes ½" to 4" (DN15 to DN110)
  - ISO 9001 quality-assured
- specs:
  - Material: UPVC (unplasticised PVC)
  - Models: XE01007, XE01008, XE01009
  - Size range: ½" – 4" (DN 15–110 mm)
  - Operation: ¼ turn, long handle
  - Connection: Socket or threaded
  - Applications: Water supply, irrigation, pool systems
- sourceUrl: `https://www.xiervalve.com/product/upvc-compact-ball-valve/upvc-compact-ball-valve-upvc-compact-ball-valve/xe01007-xe01009-long-handle.html`

---

### ══════════════════════════════════════════
### PLASTIKA NV — Serbia
### Source: plastikanv.com + text from docx ("Plasmas 2 vjecar...")
### ══════════════════════════════════════════

NOTE: "Plasmas 2 vjecar" = "Plastmasë 2-vjeçar" = 2-year agricultural PE film
"Plasmas i bardhe" = white PE film

#### Product PL1: 2-Year Agricultural PE Film — 4 m × 100 m (50 kg)
- slug: `plastika-nv-agri-film-2yr-50kg`
- name: `2-Year Agricultural PE Film — 4×100 m (50 kg)`
- partner: `plastika-nv`
- category: `agri`
- material: `LDPE`
- use: `Agriculture`
- image: `/products/industrial/plastika-nv-agricultural-film.jpg`
- badges: `IN STOCK`
- shortDescription: "2-year UV-stabilised agricultural polyethylene film. Width 4 m, length 100 m, weight 50 kg. For greenhouse covering."
- specs:
  - UV life: 2 years
  - Width: 4 m
  - Length: 100 m per roll
  - Weight: 50 kg per roll

#### Product PL2: 2-Year Agricultural PE Film — 4 m × 100 m (60 kg)
- slug: `plastika-nv-agri-film-2yr-60kg`
- name: `2-Year Agricultural PE Film — 4×100 m (60 kg)`
- partner: `plastika-nv`
- category: `agri`
- material: `LDPE`
- use: `Agriculture`
- image: `/products/industrial/plastika-nv-agricultural-film.jpg`
- badges: `IN STOCK`
- shortDescription: "2-year UV-stabilised agricultural PE film. Width 4 m, length 100 m, weight 60 kg."
- specs:
  - UV life: 2 years
  - Width: 4 m
  - Length: 100 m
  - Weight: 60 kg

#### Product PL3: 2-Year Agricultural PE Film — 6.3 m × 100 m (60 kg)
- slug: `plastika-nv-agri-film-2yr-6m`
- name: `2-Year Agricultural PE Film — 6.3×100 m (60 kg)`
- partner: `plastika-nv`
- category: `agri`
- material: `LDPE`
- use: `Agriculture`
- image: `/products/industrial/plastika-nv-agricultural-film.jpg`
- badges: `IN STOCK`
- shortDescription: "2-year UV-stabilised agricultural PE film, extra wide. Width 6.3 m, length 100 m, weight 60 kg."
- specs:
  - UV life: 2 years
  - Width: 6.3 m
  - Length: 100 m
  - Weight: 60 kg

#### Product PL4: White PE Film (UPDATE existing `plastika-nv-packaging`)
- slug: `plastika-nv-white-film` (or update existing)
- name: `White PE Agricultural Film`
- partner: `plastika-nv`
- category: `agri`
- material: `LDPE`
- use: `Agriculture`
- image: `/products/industrial/plastika-nv-agricultural-film.jpg`
- badges: `IN STOCK`
- shortDescription: "White polyethylene film for greenhouse or agricultural covering. Width 4 m, length 100 m. Available in 30 kg, 40 kg, and 50 kg rolls."
- specs:
  | Colour | Width | Length | Weight |
  | White | 4 m | 100 m | 30 kg |
  | White | 4 m | 100 m | 40 kg |
  | White | 4 m | 100 m | 50 kg |

---

## STEP 5: VERIFY BUILD

```bash
npm run build
# or pnpm build
```

All must pass with 0 TypeScript errors. Fix any type errors before proceeding.

Spot-check routes:
```bash
# Start dev server in background
npm run dev &
sleep 5

# Check a sample of new routes
for slug in polins-manual-sprayer palaplast-ldpe-pipe-6atm palaplast-rekorder-10atm \
  roto-edelweis-planter roto-water-tank-otw roto-plastik-tank-large \
  perplast-flexoper-3 sel-troy-green-spiral-hose sel-caramel-garden-hose \
  confort-ppht-pipes confort-pvc-fittings xier-upvc-ball-valve \
  plastika-nv-agri-film-2yr-50kg; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/$slug)
  echo "$slug → $code"
done
```

All must return 200.

---

## STEP 6: COMMIT AND PUSH

```bash
git add -A
git commit -m "feat: add Phase 2 products — Polins, Palaplast, Roto, Perplast, Hidrotek, Confort-AL, Xier, Plastika NV + cross-provider feature"
git push origin main
```

---

## STRICT RULES

1. **Read the schema first** — field names must match exactly.
2. **No invented specs** — every dimension and name above comes from the manufacturer sites or the verified internal offer documents (images 1–12).
3. **Cross-provider feature** — implement `alsoAvailableFrom` for the 6 products listed at the top. This is non-optional.
4. **Roto description** — Roto is a planter AND tank manufacturer, NOT a pipe company. Don't label their products as pipes.
5. **Polins "Greenhouse Cover Film"** — this existing entry is wrong. Replace or delete it.
6. **Confort-AL** — every product is IN STOCK. Don't qualify with "on order."
7. **If a curl download fails** → use the Unsplash fallback listed in Step 1, don't leave a broken image path.
8. **Build must pass before commit** — no TypeScript errors allowed.
9. **Do not touch** the Konti or Ferplast products already added in Phase 1.
