# AGENT TASK — Sukaj SHPK Website Product Implementation
# Paste this entire prompt into Claude Code or your coding agent.

## CONTEXT
You have full access to the repo at the current working directory.
The website is Next.js + TypeScript. Products live in `src/data/products-data.ts`.
The live site currently shows 24 products, ALL with Unsplash placeholder images.
Your job: implement the products below with real images. Then build and verify.

---

## STEP 1 — READ THE SCHEMA FIRST

Run: `cat src/data/products-data.ts`

Study the EXACT TypeScript type/interface used for products. Do not guess field names.
Then run: `cat src/app/catalog/[slug]/page.tsx` (or wherever the product detail page is)
to understand how fields are rendered.

---

## STEP 2 — DOWNLOAD REAL PRODUCT IMAGES

Use `curl` to download these images directly from the manufacturer websites.
Save them to `public/products/[category]/[filename].webp` using cwebp or just save as .jpg if cwebp is unavailable.

### Konti Hidroplast images (from nmtester.com — publicly accessible):
```bash
mkdir -p public/products/civil public/products/industrial public/products/agri

# PE-100 Water Supply Pipe — real Konti factory photo
curl -o public/products/civil/konti-pe100-water-pipe.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/12/Gogo_20240703_8889-Edit_1.jpg"

# PE-100 RC pipe
curl -o public/products/civil/konti-pe100rc-pipe.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/12/Gogo_20240703_9021-Edit_1.jpg"

# Konti Kan corrugated sewage pipe
curl -o public/products/civil/konti-kan-corrugated-sewage.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/12/Konti-Hidroplast-Proizvodstvo-27-1.jpg"

# Cable protection duct pipe (small diameter)
curl -o public/products/industrial/konti-cable-duct.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/10/duct-close-up-min.jpg"

# Konti Kan Optic Cable protection (double wall corrugated)
curl -o public/products/industrial/konti-optic-cable-protection.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/10/KONTI-KAN-DUCT-Double-layered-corrugated-pipes-min.jpg"

# Konti Kan Fittings (socket)
curl -o public/products/civil/konti-kan-fittings-socket.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/10/Konti-Kan-Fittings.png"
```

### Ferplast KS images (from ferplast-ks.com — publicly accessible):
```bash
# Corrugated HDPE pipes (brinjëzuar) — the site thumbnail
curl -o public/products/civil/ferplast-hdpe-corrugated.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/brin-1-2.png"

# Water supply pipes (ujësjellës)
curl -o public/products/civil/ferplast-water-supply-pipe.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/uj-1-1.png"

# Electric pipes (kabllo elektrik)
curl -o public/products/industrial/ferplast-electric-conduit.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/elk160-1-1.png"

# Drainage pipes (drenazhimi)
curl -o public/products/civil/ferplast-drainage-pipe.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/drenazh-1-1.png"

# PP-H pipes
curl -o public/products/civil/ferplast-pp-h-pipe.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/pp-h-1-1.png"

# Optic cable pipes
curl -o public/products/industrial/ferplast-optic-cable-pipe.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/optik-1-1.png"

# Water containers / reservoirs
curl -o public/products/civil/ferplast-water-reservoir.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/rez-1-1.png"
```

Verify all downloads: `ls -la public/products/civil/ public/products/industrial/`
If any file is 0 bytes or returns 403, note it and use the best Unsplash fallback described below.

---

## STEP 3 — ADD PRODUCTS TO products-data.ts

After reading the schema in Step 1, add the following products using the EXACT schema format.
Below I describe each product with all verified data. You must translate these into whatever
TypeScript structure the existing file uses.

---

### KONTI HIDROPLAST PRODUCTS

**Source:** https://nmtester.com/kontihidroplast/water-supply-systems/
**Partner ID in your data:** `konti-hidroplast`

---

#### Product A: Konti PE-100 Water Supply Pipe
- slug: `konti-pe100-water-pipe`
- name: `PE-100 Water Supply Pipe`
- category: `civil`
- material: `HDPE`
- use: `Water`
- diameter min: 20, max: 200 (stock); up to 630 on order
- image: `/products/civil/konti-pe100-water-pipe.jpg`
- standards: `EN 12201-2`, `ISO 4427`, `DIN 8074`
- badges: `PE100`, `EN 12201-2`
- shortDescription: "PE-100 HDPE water supply pipe for drinking water, pressurised distribution networks, and irrigation mains. Black with coextruded blue lines."
- description: "Konti Hidroplast's PE-100 water supply pipes are manufactured from third-generation high-density polyethylene (HDPE PE-100) to EN 12201-2 and ISO 4427. Rated for pressures from PN 6 to PN 25 (PN 32 on order), they are suitable for municipal water supply, pressurised distribution networks, gas transport, and irrigation mainlines. Pipes Ø 16–110 mm are supplied in coils; Ø 125–800 mm in straight 6 m or 12 m bars. The black outer colour with coextruded blue lines or full blue ensures UV stability and easy identification."
- features:
  - PE-100 compound — MRS 10, design stress σ = 8.0 MPa, safety factor C = 1.25
  - Pressure classes PN 6, PN 10, PN 16 in stock (Ø 20–200 mm); PN 25 on order
  - Black with coextruded blue lines, or blue with inner white layer
  - Coils for Ø 16–110 mm; straight bars 6 m / 12 m for Ø 125+
  - Operating temperature: −40 °C to +60 °C
  - Service life: 50+ years
  - 100% recyclable HDPE material
  - Compatible with butt fusion, electrofusion, and mechanical fittings
- specs table (use whatever format your schema has):
  - Standard: EN 12201-2 / ISO 4427 / DIN 8074
  - Material: HDPE PE-100
  - MRS: 10 MPa
  - Safety factor: C = 1.25
  - Diameter range (stock): Ø 20–200 mm
  - Diameter range (order): Ø 20–630 mm
  - Pressure classes (stock): PN 6, PN 10, PN 16
  - Pressure classes (order): PN 25, PN 32
  - Colour: Black + blue coextruded lines
  - Coil lengths: Ø 16–110 mm
  - Bar lengths: 6 m / 12 m (Ø 125+)
  - Certifications: EN 12201-2, ISO 4427, DIN 8074

---

#### Product B: Konti PE-100 RC Water Supply Pipe
- slug: `konti-pe100rc-water-pipe`
- name: `PE-100 RC Water Supply Pipe`
- category: `civil`
- material: `HDPE`
- use: `Water`
- diameter min: 25, max: 110 (stock PN10+PN16); up to 630 on order
- image: `/products/civil/konti-pe100rc-pipe.jpg`
- standards: `EN 12201-2`, `PAS 1075`
- badges: `PE100 RC`, `EN 12201-2`, `PAS 1075`
- shortDescription: "PE-100 RC crack-resistant HDPE pipe for trenchless installation and demanding soil conditions. Ø 25–110 mm in stock at PN 10 and PN 16."
- description: "PE-100 RC (Resistance to Crack) is a specialist variant of PE-100 engineered for exceptional resistance to slow crack growth and environmental stress cracking. Available as single-layer full-wall, double-layer coextruded, and triple-layer coextruded types (Types 1, 2, 3 to PAS 1075), these pipes are the preferred choice for trenchless installation methods such as directional drilling, pipe bursting, and sliplining. In stock Ø 25–110 mm at PN 10 and PN 16; full size range Ø 25–630 mm available on order."
- features:
  - PE-100 RC material — superior slow crack growth resistance vs standard PE-100
  - Available as single-layer, double-layer coextruded, or triple-layer coextruded (Types 1/2/3)
  - Standards: EN 12201-2 and PAS 1075
  - In stock: Ø 25–110 mm, PN 10 and PN 16
  - On order: full range including PN 20, PN 25, PN 32
  - Colour: Black with yellow or orange lines, or entirely orange
  - Service life: 100+ years under normal conditions
  - Ideal for trenchless installation, directional drilling, pipe bursting
  - Safety factor C = 1.25; design stress σ = 8.0 MPa
- specs table:
  - Standard: EN 12201-2 / PAS 1075
  - Material: HDPE PE-100 RC
  - Types: Type 1 (single-wall), Type 2 (coextruded inner RC layer), Type 3 (PP outer protective layer)
  - Diameter range (stock): Ø 25–110 mm
  - Diameter range (order): Ø 25–630 mm
  - Pressure (stock): PN 10, PN 16
  - Pressure (order): PN 6, PN 20, PN 25, PN 32
  - Colour: Black + yellow/orange lines or full orange
  - Service life: 100+ years

---

#### Product C: Konti Kan HDPE Corrugated Sewage Pipe SN4 (IN STOCK)
- slug: `konti-kan-corrugated-sn4`  ← UPDATE this slug if it already exists in the file
- name: `Konti Kan HDPE Corrugated Sewage Pipe — SN4`
- category: `civil`
- material: `HDPE`
- use: `Sewage`
- diameter min: 110, max: 1000 (stock); up to 1000 full range
- image: `/products/civil/konti-kan-corrugated-sewage.jpg`
- standards: `EN 13476-3`, `ISO 9969`
- badges: `SN4`, `EN 13476-3`, `IN STOCK`
- availability note: IN STOCK Ø 110–1000 mm. SN8 available on order.
- shortDescription: "Double-wall HDPE corrugated sewage pipe SN4. Smooth inner bore for maximum flow, corrugated outer wall for structural strength. In stock Ø 110–1000 mm."
- description: "Konti Kan HDPE corrugated sewage pipes (SN4 stiffness class) are manufactured to EN 13476-3 and ISO 9969. The double-wall construction combines a smooth inner bore (minimum Manning's coefficient 0.009) with a corrugated outer wall that delivers structural ring stiffness ≥ 4 kN/m². Available in lengths of 6 m with integrated socket joints. Suitable for gravity sewage, stormwater drainage, agricultural drainage, and industrial wastewater systems. Ø 110–1000 mm in stock; SN8 class available on order."
- features:
  - Double-wall construction: smooth inner / corrugated outer
  - Ring stiffness: SN4 (≥ 4 kN/m²) — in stock
  - Pipe length: 6 m with integrated socket
  - Diameter range (stock): Ø 110–1000 mm (OD)
  - Material: HDPE — corrosion-proof, chemical-resistant
  - Operating temperature: −40 °C to +60 °C
  - Service life: 50+ years
  - Lightweight — easier transport vs concrete
  - Fully recyclable
- specs table (from your PDF — OD/SN4 table):
  | DN (mm) | OD (mm) | ID (mm) | E4 (mm) | E5 (mm) | H (mm) | P (mm) |
  | 110 | 110 | 93 | 1.00 | 1.00 | 7.5 | 10.5 |
  | 125 | 125 | 108 | 1.10 | 1.00 | 8.5 | 12.5 |
  | 140 | 140 | 123 | 1.10 | 1.00 | 8.5 | 14 |
  | 160 | 160 | 140 | 1.20 | 1.00 | 10.0 | 17.5 |
  | 200 | 200 | 178 | 1.40 | 1.10 | 11.0 | 22.5 |
  | 250 | 250 | 216 | 1.70 | 1.40 | 17.0 | 26.5 |
  | 315 | 315 | 271 | 1.90 | 1.60 | 22.0 | 34 |
  | 400 | 400 | 346 | 2.30 | 2.00 | 27.0 | 49.5 |
  | 500 | 500 | 432 | 2.80 | 2.80 | 34.0 | 57 |
  | 630 | 630 | 544 | 3.30 | 3.30 | 43.0 | 68.5 |
  | 800 | 800 | 690 | 4.40 | 4.10 | 55.0 | 105 |
  | 1000 | 1000 | 861 | 6.50 | 5.00 | 70.0 | 125 |
  (If the schema supports a dimensionTable field, add this. Otherwise add it to the description.)

---

#### Product D: Konti Kan Socket Fitting (HDPE Corrugated)
- slug: `konti-kan-socket-fitting`
- name: `Konti Kan Socket Fitting (HDPE)`
- category: `civil`
- material: `HDPE`
- use: `Sewage`
- diameter min: 110, max: 1000
- image: `/products/civil/konti-kan-fittings-socket.jpg`
- standards: `EN 13476-3`
- badges: `EN 13476-3`
- availability note: OD 110–630 IN STOCK. OD 800–1000 on order (injection & rotomould variants).
- shortDescription: "HDPE socket coupling for Konti Kan corrugated sewage pipes. In stock OD 110–630 mm. OD 800–1000 mm available on order."
- description: "Konti Kan socket fittings (муф/socket) are HDPE couplings designed for joining Konti Kan corrugated sewage pipes without welding. Supplied in injection-moulded form for OD 110–630 mm and rotomould form for OD 800–1000 mm. Sockets OD 110–630 mm are held in stock; larger sizes are available on order."
- specs table (from your PDF photo):
  | Socket | OD (mm) | ID (mm) | L (mm) | Availability |
  | OD 110 | 126.0 | 111.6 | 140 | In Stock |
  | OD 125 | 138.8 | 126.8 | 144 | In Stock |
  | OD 160 | 178.1 | 162.1 | 200 | In Stock |
  | OD 200 | 218.1 | 202.5 | 220 | In Stock |
  | OD 250 | 273.0 | 253.0 | 220 | In Stock |
  | OD 315 | 352.7 | 318.7 | 255 | In Stock |
  | OD 400 | 432.5 | 404.5 | 225 | In Stock |
  | OD 500 | 540.5 | 505.5 | 255 | In Stock |
  | OD 630 | 683.8 | 636.8 | 320 | In Stock |
  | OD 800 injection | 856.0 | 808.0 | 237 | On Order |
  | OD 800 rotomould | 902.0 | 808.0 | 245 | On Order |
  | OD 1000 injection | 1066.0 | 1010.0 | 330 | On Order |
  | OD 1000 rotomould | 1120.0 | 1010.0 | 324 | On Order |

---

#### Product E: Konti Kan Duct Cable Protection (Small Diameter)
- slug: `konti-kan-cable-duct`
- name: `Konti Kan Duct — Cable Protection Pipe`
- category: `industrial`
- material: `HDPE`
- use: `Industrial`
- diameter min: 32, max: 75
- image: `/products/industrial/konti-cable-duct.jpg`
- standards: `EN 61386`, `EN 12201-2`
- badges: `EN 61386`, `IN STOCK`
- availability: In stock Ø 40 mm (Ø40×1 2.4 mm wall, 10 ATM) and Ø 40 mm (Ø40×1 2.0 mm wall, 8 ATM). Other sizes on order.
- shortDescription: "HDPE smooth-exterior, ribbed-interior duct pipe for cable canalization. Single, twin, and quad configurations. Ø 32–75 mm. Supplied in coils up to 500 m."
- description: "Konti Kan Duct cable protection pipes have a smooth exterior and longitudinally ribbed interior surface, produced in coils up to 500 m. The ribbed interior reduces friction during cable installation. Available as single-tube (Ø 32, 40, 50 mm), twin-tube (Ø 32, 40, 50 mm), and quad configurations. In stock: Ø 40×1 at 2.0 mm wall (SDR 17 / 8 ATM) and 2.4 mm wall (SDR 13.6 / 10 ATM). Other configurations on order."
- features:
  - Smooth exterior / longitudinal ribbed interior (reduces cable pull-through friction)
  - Configurations: single, twin (bitub), and quad tubes
  - Ø 32, 40, 50 mm in single and twin; Ø 32+40 mm in quad
  - Coils up to 500 m — reduces joints in long runs
  - In stock: Ø40×1 — SDR 17 (2.0 mm, 8 ATM) and SDR 13.6 (2.4 mm, 10 ATM)
  - Bitub (twin) on order only
  - Material: HDPE — UV-stable, chemical-resistant, −40 °C to +60 °C
  - EN 61386 / EN 12201-2 compliant
- specs:
  - Standard: EN 61386 / EN 12201-2
  - Diameter range: Ø 32–75 mm (OD)
  - Wall thickness (stock): 2.0 mm (SDR 17, 8 ATM) | 2.4 mm (SDR 13.6, 10 ATM)
  - In-stock size: Ø 40×1 monotube
  - Configuration: Single / Twin (bitub) / Quad
  - Coil lengths: up to 500 m
  - Colour: Black / Orange / Grey

---

#### Product F: Konti Kan Optic Cable Protection (Double-Wall Corrugated)
- slug: `konti-kan-optic-cable-protection`
- name: `Konti Kan Optic Cable Protection Pipe`
- category: `industrial`
- material: `HDPE`
- use: `Industrial`
- diameter min: 75, max: 200
- image: `/products/industrial/konti-optic-cable-protection.jpg`
- standards: `EN 50086`, `EN 61386`, `EN 13476-3`
- badges: `EN 50086`, `IN STOCK`
- availability: In stock Ø 40 and Ø 50 mm; other sizes on order.
- shortDescription: "Double-wall HDPE corrugated pipe with smooth interior for optic cable, telecom, and power cable protection at road and bridge crossings."
- description: "Konti Kan Optic Cable Protection pipes are double-wall HDPE pipes with a corrugated outer surface and smooth inner surface. Used as holders or protection conduits for fibre optic, telecommunications, and power cables — especially at road and bridge crossings. Produced in black, red, and yellow (custom colours on request) in straight lengths of 6 m or 12 m, and coils of 50 m. Nominal diameter: 75–200 mm OD. In stock: Ø 40 and Ø 50 mm sizes; all others on order."
- features:
  - Double-wall: smooth inner bore / corrugated outer surface
  - Available in black, red, yellow (custom colours on request)
  - Straight lengths: 6 m and 12 m; coils: 50 m
  - UV-stabilised, chemical-resistant HDPE
  - Ø 75–200 mm nominal outer diameter
  - In stock: Ø 40 and Ø 50; other sizes on order
  - Suitable for road/bridge crossings and underground cable routes
  - Compliant with EN 50086, EN 61386, EN 13476-3
- specs:
  - Standard: EN 50086 / EN 61386 / EN 13476-3
  - Material: HDPE (double-wall)
  - Diameter range: Ø 75–200 mm (OD)
  - Length: 6 m / 12 m straight; 50 m coils
  - Colour: Black / Red / Yellow / Custom
  - Application: Optic fibre, telecom, power cable protection

---

### FERPLAST KS PRODUCTS

**Source:** https://www.ferplast-ks.com
**Partner ID in your data:** `ferplast-ks`

NOTE: The existing entries `ferplast-corrugated-sn4` and `ferplast-corrugated-sn8` are stubs.
UPDATE them fully. Do not create duplicates — find the existing slugs and replace content.

---

#### Product G: Ferplast HDPE Corrugated Pipe SN4 (UPDATE existing entry)
- slug: `ferplast-corrugated-sn4` (UPDATE existing)
- name: `HDPE Corrugated Sewage Pipe — SN4`
- category: `civil`
- material: `HDPE`
- use: `Sewage`
- diameter min: 110, max: 1000
- image: `/products/civil/ferplast-hdpe-corrugated.png`
- standards: `EN 13476-3`, `ISO 9969`
- badges: `SN4`, `EN 13476-3`, `IN STOCK`
- availability: IN STOCK Ø 110–1000 mm. Blue inner layer.
- shortDescription: "HDPE double-wall corrugated sewage pipe SN4 with blue inner liner. Manufactured by Ferplast KS (Kosovo). In stock OD 110–1000 mm."
- description: "Ferplast KS produces HDPE double-wall corrugated sewage pipes to EN 13476-3 and ISO 9969 in both SN4 and SN8 ring stiffness classes. The SN4 version features a distinctive blue inner layer and is available in stock from OD 110 mm to OD 1000 mm. The smooth inner bore ensures low friction losses, while the corrugated outer wall provides structural ring stiffness ≥ 4 kN/m². Pipe length: 6 m with integrated socket. Suitable for gravity sewage, stormwater drainage, agricultural drainage, and industrial effluent."
- specs table (from your PDF Ferplast table):
  | DN/OD (mm) | DN/ID (mm) | Wall (mm) | Weight (kg/m) | Length | Ring Stiffness |
  | 110 | 93 | 1.00 | 0.65 | 6 m | ≥ 4 kN/m² |
  | 125 | 108 | 1.10 | 0.82 | 6 m | ≥ 4 kN/m² |
  | 160 | 138 | 1.20 | 1.20 | 6 m | ≥ 4 kN/m² |
  | 200 | 176 | 1.40 | 1.65 | 6 m | ≥ 4 kN/m² |
  | 250 | 218 | 1.70 | 2.50 | 6 m | ≥ 4 kN/m² |
  | 315 | 272 | 1.90 | 3.70 | 6 m | ≥ 4 kN/m² |
  | 400 | 344 | 2.30 | 6.30 | 6 m | ≥ 4 kN/m² |
  | 500 | 432 | 2.80 | 8.60 | 6 m | ≥ 4 kN/m² |
  | 630 | 540 | 3.30 | 15.15 | 6 m | ≥ 4 kN/m² |
  | 800 | 682 | 4.10 | 20.50 | 6 m | ≥ 4 kN/m² |
  | 1000 | 860 | 5.00 | 31.00 | 6 m | ≥ 4 kN/m² |

---

#### Product H: Ferplast HDPE Corrugated Pipe SN8 (UPDATE existing entry)
- slug: `ferplast-corrugated-sn8` (UPDATE existing)
- name: `HDPE Corrugated Sewage Pipe — SN8`
- category: `civil`
- material: `HDPE`
- use: `Sewage`
- diameter min: 110, max: 1000
- image: `/products/civil/ferplast-hdpe-corrugated.png` (same image, note yellow inner liner in description)
- standards: `EN 13476-3`, `ISO 9969`
- badges: `SN8`, `EN 13476-3`, `IN STOCK`
- availability: IN STOCK Ø 110–1000 mm. Yellow inner layer.
- shortDescription: "HDPE double-wall corrugated sewage pipe SN8 with yellow inner liner for heavy-traffic applications. In stock OD 110–1000 mm."
- description: "Ferplast KS's SN8 corrugated pipe has a yellow inner layer distinguishing it from the SN4 blue-liner variant. Ring stiffness ≥ 8 kN/m² makes it suitable for roads, car parks, and areas with heavy surface loads. Same double-wall HDPE construction to EN 13476-3 / ISO 9969, available in 6 m lengths with integrated socket. In stock Ø 110–1000 mm."
- specs: Same OD/ID dimensions as SN4 table above but with SN8 ring stiffness column. Note that wall thicknesses are slightly greater in the SN8 class for the same diameter.

---

#### Product I: Ferplast Drainage Pipe (Tuba drenazhimi)
- slug: `ferplast-drainage-pipe`
- name: `HDPE Drainage Pipe`
- category: `civil`
- material: `HDPE`
- use: `Drainage`
- diameter min: 110, max: 200 (stock); 250–500 on order
- image: `/products/civil/ferplast-drainage-pipe.png`
- standards: `EN 13476-3`, `ISO 9969`
- badges: `EN 13476-3`, `IN STOCK Ø 110–200`
- shortDescription: "Perforated HDPE drainage pipe for agricultural land drainage and sub-surface water management. Ø 90–500 mm. In stock Ø 110–200 mm."
- description: "Ferplast KS drainage pipes are manufactured from HDPE to EN 13476-3 and ISO 9969 for sub-surface drainage of agricultural land and construction sites. The pipe features a perforated section that faces upward during installation to allow water ingress, with the non-perforated section facing down to channel collected water away. Supplied in coils (Ø 90–160 mm) and 6 m bars (Ø 200–500 mm). In stock: Ø 110–200 mm. Ø 250–500 mm on order."
- specs table (from your PDF drainage table):
  | DN/OD (mm) | DN/ID (mm) | Weight | Force Applied | Length |
  | 110 | 94.00 | 550 g/m | 450 N | 50 m |
  | 125 | 108.00 | 650 g/m | 450 N | 50 m |
  | 160 | 138.00 | 1000 g/m | 450 N | 50 m |
  | 200 | 176.00 | 1650 g/m | 450 N | 6 m |
  | 250 | 218.00 | 2500 g/m | 450 N | 6 m |
  | 315 | 272.00 | 3700 g/m | 450 N | 6 m |
  | 400 | 344.00 | 6300 g/m | 450 N | 6 m |
  | 500 | 432.00 | 8600 g/m | 450 N | 6 m |

---

#### Product J: Ferplast Electric Conduit (Tuba kabllo elektrik)
- slug: `ferplast-electric-conduit`
- name: `HDPE Electric Cable Conduit`
- category: `industrial`
- material: `HDPE`
- use: `Industrial`
- diameter min: 40, max: 110 (stock); 125–160 on order
- image: `/products/industrial/ferplast-electric-conduit.png`
- standards: `EN 50086-2-4`
- badges: `EN 50086-2-4`, `IN STOCK Ø 40–110`
- shortDescription: "HDPE corrugated electric cable conduit to EN 50086-2-4. In stock Ø 40–110 mm; Ø 125–160 mm on order."
- description: "Ferplast KS electric cable conduits are manufactured from HDPE to EN 50086-2-4. Corrugated construction provides flexibility for routing while maintaining mechanical protection for electrical cables. Supplied in 50 m coils. In stock Ø 40–110 mm; Ø 125–160 mm on order."
- specs table (from your PDF electric conduit table):
  | DN/OD (mm) | DN/ID (mm) | Weight | Force Applied | Length |
  | 40 | 31.95 | 113 g/m | 450 N | 50 m |
  | 50 | 39.20 | 139 g/m | 450 N | 50 m |
  | 63 | 50.20 | 200 g/m | 450 N | 50 m |
  | 75 | 60.60 | 256 g/m | 450 N | 50 m |
  | 90 | 75.00 | 350 g/m | 450 N | 50 m |
  | 110 | 94.00 | 520 g/m | 450 N | 50 m |
  | 125 | 108.00 | 650 g/m | 450 N | 50 m |
  | 160 | 138.00 | 1000 g/m | 450 N | 50 m |

---

#### Product K: Ferplast PP-H Building Drainage Pipe
- slug: `ferplast-pph-pipe`
- name: `PP-H Building Drainage Pipe`
- category: `civil`
- material: `PP`
- use: `Sewage`
- diameter min: 50, max: 125 (stock); PP-H Silent on order
- image: `/products/civil/ferplast-pp-h-pipe.png`
- standards: `EN 1451-B`, `DIN 8061`
- badges: `EN 1451-B`, `IN STOCK Ø 50–125`
- shortDescription: "Polypropylene PP-H building drainage pipe with white inner layer. Ø 50–125 mm in stock. PP-H Silent variant on order."
- description: "Ferplast KS PP-H pipes are manufactured from homopolymer polypropylene to EN 1451-B and DIN 8061, designed for internal building sewage and sanitary drainage. The white inner layer is standard. In stock: Ø 50–125 mm. PP-H Silent (acoustic-damped) variant available on order. Elbows (Brrylat) in stock Ø 50–110 mm; T and Y branches in stock Ø 50–160 mm."
- specs:
  - Standard: EN 1451-B / DIN 8061
  - Material: PP-H (homopolymer polypropylene)
  - Diameter range (stock): Ø 50–125 mm
  - Inner layer colour: White
  - PP-H Silent: On order only
  - Elbows (Brrylat): In stock Ø 50–110 mm; larger on order
  - T/Y Fittings: In stock Ø 50–160 mm; larger on order

---

#### Product L: Ferplast PE-100 Water Supply Pipe (Tuba per ujësjellës)
- slug: `ferplast-pe100-water-pipe`
- name: `PE-100 / PE-100 RC Water Supply Pipe`
- category: `civil`
- material: `HDPE`
- use: `Water`
- diameter min: 20, max: 90 (stock); up to 630 on order
- image: `/products/civil/ferplast-water-supply-pipe.png`
- standards: `EN 12201-2`, `ISO 4427`
- badges: `PE100`, `EN 12201-2`, `IN STOCK Ø 20–90`
- shortDescription: "PE-100 and PE-100 RC water supply pipes to EN 12201-2. In stock Ø 20–90 mm. Full range up to Ø 630 mm on order."
- description: "Ferplast KS manufactures PE-100 and PE-100 RC water supply pipes to EN 12201-2 and ISO 4427. In stock: Ø 20–90 mm. The full size range up to Ø 630 mm is available on order. Both PE-100 and the crack-resistant PE-100 RC grade are available. Datasheet: https://www.ferplast-ks.com/wp-content/uploads/2025/08/TUBAT-EUJESJELLSIT_compressed.pdf"
- specs:
  - Standard: EN 12201-2 / ISO 4427
  - Grades: PE-100 and PE-100 RC
  - Diameter (stock): Ø 20–90 mm
  - Diameter (order): Ø 20–630 mm
  - Datasheet: [Download](https://www.ferplast-ks.com/wp-content/uploads/2025/08/TUBAT-EUJESJELLSIT_compressed.pdf)

---

#### Product M: Ferplast Optic Cable Pipe (Tuba kabllo optike)
- slug: `ferplast-optic-cable-pipe`
- name: `PE Optic Cable Protection Pipe`
- category: `industrial`
- material: `HDPE`
- use: `Industrial`
- diameter min: 32, max: 50
- image: `/products/industrial/ferplast-optic-cable-pipe.png`
- standards: `EN 12201`, `ISO 4427`, `DIN 8074`
- badges: `EN 12201`, `IN STOCK Ø 40×2`
- availability: In stock: Ø 40×2 at 2.4 mm wall. Others on order.
- shortDescription: "PE optic cable protection pipe, single or twin configuration. Ø 32, 40, 50 mm. In stock: Ø 40×2 (2.4 mm wall)."
- description: "Ferplast KS optic cable protection pipes are manufactured from PE material to EN 12201, ISO 4427, and DIN 8074. Available as single-tube (një fish) and twin-tube (dy fish). Diameters: Ø 32, 40, 50 mm. In stock: Ø 40×2 (twin, 2.4 mm wall). All other configurations on order. From the verified price list (03.07.2024): Single SDR 17 PN10 — Ø32×1 (2.0 mm), Ø40×1 (2.4 mm), Ø50×1 (3.0 mm). Twin SDR 17 PN10 — Ø32×2 (2.0 mm), Ø40×2 (2.4 mm), Ø50×2 (3.0 mm)."
- specs:
  - Standard: EN 12201 / ISO 4427 / DIN 8074
  - Configurations: Single (1 tube) / Twin (2 tubes)
  - Sizes: Ø 32, 40, 50 mm
  - SDR classes: SDR 17 (PN 10) and SDR 13.6 (PN 12.5)
  - In stock: Ø 40×2, 2.4 mm wall (SDR 17 PN10)
  - All others on order

---

#### Product N: Ferplast HDPE Water Reservoir (Rezervarë)
- slug: `ferplast-water-reservoir`
- name: `HDPE Water Storage Tank`
- category: `civil`
- material: `HDPE`
- use: `Water`
- diameter min: 0, max: 0 (N/A — capacity based)
- image: `/products/civil/ferplast-water-reservoir.png`
- standards: (none specified on site)
- badges: `HDPE`, `IN STOCK 500–1000 L`
- availability: In stock 500 L – 1000 L. 1500 L–5000 L on order.
- shortDescription: "Rotationally moulded HDPE water storage tanks, 500 L–5000 L capacity. In stock 500–1000 L."
- description: "Ferplast KS manufactures rotationally moulded HDPE water storage tanks (rezervarë) from 500 litres to 5000 litres. The HDPE material ensures food-grade safety, UV resistance, and long service life. In stock: 500 L and 1000 L. Capacities from 1500 L to 5000 L are available on order."
- specs:
  - Material: HDPE (rotomoulded)
  - Capacity range: 500 L – 5000 L
  - In stock: 500 L / 1000 L
  - On order: 1500 L / 2000 L / 3000 L / 5000 L
  - Application: Potable water storage, agricultural water, industrial fluid storage

---

## STEP 4 — UPDATE EXISTING STUBS WITH BETTER CONTENT

These slugs already exist but have empty specs or Unsplash images. UPDATE them:

1. `konti-spiral-sewage` — already exists, update image to `/products/civil/konti-kan-corrugated-sewage.jpg`
2. `konti-solid-wall-pe` — update image to `/products/civil/konti-pe100-water-pipe.jpg`
3. `ferplast-corrugated-sn4` — fully replace with Product G above
4. `ferplast-corrugated-sn8` — fully replace with Product H above
5. `ferplast-inspection-chamber` — update image to `/products/civil/ferplast-hdpe-corrugated.png`; rename to "HDPE Inspection Chamber / Manhole" with note: produced to EN 13598-2:2009, ID 800/1000/1200 mm

---

## STEP 5 — VERIFY BUILD

```bash
npm run build
# or: pnpm build

# Check all new routes return 200:
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/konti-pe100-water-pipe
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/konti-pe100rc-water-pipe
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/konti-kan-corrugated-sn4
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/konti-kan-socket-fitting
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/konti-kan-cable-duct
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/konti-kan-optic-cable-protection
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/ferplast-drainage-pipe
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/ferplast-electric-conduit
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/ferplast-pph-pipe
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/ferplast-pe100-water-pipe
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/ferplast-optic-cable-pipe
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalog/ferplast-water-reservoir
```

All must return 200. Fix any TypeScript errors before committing.

---

## STEP 6 — COMMIT AND PUSH

```bash
git add -A
git commit -m "feat: add Konti Hidroplast + Ferplast KS products with real manufacturer images"
git push origin main
```

---

## IMPORTANT RULES

1. Read the schema FIRST. Match field names exactly.
2. Do NOT invent specs. Every number above comes from the manufacturer's website or the PDF.
3. Downloaded images must be verified (not 0 bytes) before use.
4. If a curl download fails (403/404), use this Unsplash fallback by product type:
   - Corrugated sewage pipe: `https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&q=80`
   - Water supply/PE pipe: `https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop&q=80`
   - Cable conduit: `https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop&q=80`
   - Reservoir/tank: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80`
5. Do NOT change any other products beyond what is listed here.
6. Do NOT overwrite the existing project structure.
7. Commit only after the build passes with no errors.
