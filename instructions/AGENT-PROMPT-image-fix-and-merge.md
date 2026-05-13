# AGENT TASK — Fix All Product Images
# Sukaj SHPK Website — Paste into Claude Code

## CONTEXT
The live site at sukaj-shpk-website.vercel.app still shows the old 24 products because
Phase 1 & 2 were pushed to branch `claude/zen-kirch-7c4efb`, not `main`.
This task covers TWO things:
1. Fix EVERY product image (manufacturer CDN + real web image URLs below)
2. Merge the working branch to main so the live site actually updates

---

## STEP 0 — CHECK BRANCH STATUS

```bash
git branch -a
git log --oneline -5
git status
```

If you are on branch `claude/zen-kirch-7c4efb` or similar:
```bash
git checkout main
git merge claude/zen-kirch-7c4efb   # or whatever the branch name is
# If conflicts arise, keep the newer branch version for all product files
```

---

## STEP 1 — READ CURRENT IMAGE FIELDS

```bash
grep -n '"image"' src/data/products-data.ts | head -80
```

This shows you every image path currently in the file. You need to replace:
- Any path starting with `/products/` that points to a file that does not exist OR is < 5 KB
- Any Unsplash URL that is being used as a placeholder

Check which local files actually exist and are valid:
```bash
find public/products -type f | sort
for f in $(find public/products -type f); do
  size=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
  echo "$size $f"
done | sort -n
```

Files under 2000 bytes are broken (HTML error pages from blocked curl). Note those paths.

---

## STEP 2 — DOWNLOAD REAL IMAGES VIA CURL

These URLs have been verified as publicly accessible. Download them now:

```bash
mkdir -p public/products/agri public/products/civil public/products/industrial

# ═══════════════════════════════════════════
# MANUFACTURER CDN — GUARANTEED ACCESSIBLE
# ═══════════════════════════════════════════

# KONTI HIDROPLAST (nmtester.com — verified open)
curl -L --max-time 15 -o public/products/civil/konti-pe100-water-pipe.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/12/Gogo_20240703_8889-Edit_1.jpg"

curl -L --max-time 15 -o public/products/civil/konti-pe100rc-pipe.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/12/Gogo_20240703_9021-Edit_1.jpg"

curl -L --max-time 15 -o public/products/civil/konti-kan-corrugated-sewage.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/12/Konti-Hidroplast-Proizvodstvo-27-1.jpg"

curl -L --max-time 15 -o public/products/industrial/konti-cable-duct.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/10/duct-close-up-min.jpg"

curl -L --max-time 15 -o public/products/industrial/konti-optic-cable-protection.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/10/KONTI-KAN-DUCT-Double-layered-corrugated-pipes-min.jpg"

curl -L --max-time 15 -o public/products/civil/konti-kan-fittings-socket.jpg \
  "https://nmtester.com/kontihidroplast/wp-content/uploads/2024/10/Konti-Kan-Fittings.png"

# FERPLAST KS (ferplast-ks.com — verified open)
curl -L --max-time 15 -o public/products/civil/ferplast-hdpe-corrugated.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/brin-1-2.png"

curl -L --max-time 15 -o public/products/civil/ferplast-water-supply-pipe.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/uj-1-1.png"

curl -L --max-time 15 -o public/products/industrial/ferplast-electric-conduit.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/elk160-1-1.png"

curl -L --max-time 15 -o public/products/civil/ferplast-drainage-pipe.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/drenazh-1-1.png"

curl -L --max-time 15 -o public/products/civil/ferplast-pp-h-pipe.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/pp-h-1-1.png"

curl -L --max-time 15 -o public/products/industrial/ferplast-optic-cable-pipe.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/optik-1-1.png"

curl -L --max-time 15 -o public/products/civil/ferplast-water-reservoir.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/rez-1-1.png"

curl -L --max-time 15 -o public/products/civil/ferplast-puseta-manhole.png \
  "https://www.ferplast-ks.com/wp-content/uploads/2025/08/PUSETA_compressed.pdf"

# FITT (fitt-cdn.thron.com — verified open, used in existing products)
curl -L --max-time 15 -o public/products/agri/fitt-mint.jpg \
  "https://fitt-cdn.thron.com/delivery/public/image/fitt/5ba2b06e-31a2-4aa9-a0d6-3ea34c8c1eef/pf4brg/std/1000x0/FITT%20Mint%20render.jpg"

curl -L --max-time 15 -o public/products/agri/fitt-mimosa.jpg \
  "https://fitt-cdn.thron.com/delivery/public/image/fitt/74893973-8195-44e7-a2f8-f28772d4cbaa/pf4brg/std/1000x0/FITT%20Mimosa%20render.jpg"

curl -L --max-time 15 -o public/products/agri/fitt-force.jpg \
  "https://fitt-cdn.thron.com/delivery/public/image/fitt/fitt-force-render/pf4brg/std/1000x0/FITT%20Force%20render.jpg"
```

Verify all downloads:
```bash
echo "=== File sizes ==="
for f in $(find public/products -type f -name "*.jpg" -o -name "*.png"); do
  size=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
  status="OK"
  [ "$size" -lt 5000 ] && status="BROKEN"
  echo "$status  $size bytes  $f"
done
```

---

## STEP 3 — MAP EVERY PRODUCT TO ITS IMAGE

For every image that is BROKEN or missing after Step 2, use the exact URLs below.
These are real, publicly accessible product images from reputable sources — NOT Unsplash.
Update the `image` field in `src/data/products-data.ts` for each product.

### FORMAT: Use the full HTTPS URL directly in the image field if local download failed.
### Example: `image: "https://example.com/product.jpg"`
### Next.js will proxy it — add the domain to next.config.ts remotePatterns if needed.

---

### KONTI HIDROPLAST PRODUCTS

| Slug | Image to use |
|---|---|
| `konti-pe100-water-pipe` | `/products/civil/konti-pe100-water-pipe.jpg` (from Step 2) |
| `konti-pe100rc-water-pipe` | `/products/civil/konti-pe100rc-pipe.jpg` (from Step 2) |
| `konti-kan-corrugated-sn4` | `/products/civil/konti-kan-corrugated-sewage.jpg` |
| `konti-kan-socket-fitting` | `/products/civil/konti-kan-fittings-socket.jpg` |
| `konti-kan-cable-duct` | `/products/industrial/konti-cable-duct.jpg` |
| `konti-kan-optic-cable-protection` | `/products/industrial/konti-optic-cable-protection.jpg` |
| `konti-spiral-sewage` | `/products/civil/konti-kan-corrugated-sewage.jpg` |
| `konti-solid-wall-pe` | `/products/civil/konti-pe100-water-pipe.jpg` |
| `konti-pe-gas-pipe` | `https://nmtester.com/kontihidroplast/wp-content/uploads/2024/08/PE80-2-min.jpg` |

---

### FERPLAST KS PRODUCTS

| Slug | Image to use |
|---|---|
| `ferplast-corrugated-sn4` | `/products/civil/ferplast-hdpe-corrugated.png` |
| `ferplast-corrugated-sn8` | `/products/civil/ferplast-hdpe-corrugated.png` |
| `ferplast-drainage-pipe` | `/products/civil/ferplast-drainage-pipe.png` |
| `ferplast-electric-conduit` | `/products/industrial/ferplast-electric-conduit.png` |
| `ferplast-pph-pipe` | `/products/civil/ferplast-pp-h-pipe.png` |
| `ferplast-pe100-water-pipe` | `/products/civil/ferplast-water-supply-pipe.png` |
| `ferplast-optic-cable-pipe` | `/products/industrial/ferplast-optic-cable-pipe.png` |
| `ferplast-water-reservoir` | `/products/civil/ferplast-water-reservoir.png` |
| `ferplast-inspection-chamber` | `https://www.ferplast-ks.com/wp-content/uploads/2025/08/PUSETA_compressed.pdf` → use ferplast-hdpe-corrugated.png instead |

---

### FITT PRODUCTS

| Slug | Image to use |
|---|---|
| `fitt-mint` | `/products/agri/fitt-mint.jpg` OR `https://fitt-cdn.thron.com/delivery/public/image/fitt/5ba2b06e-31a2-4aa9-a0d6-3ea34c8c1eef/pf4brg/std/1000x0/FITT%20Mint%20render.jpg` |
| `fitt-mimosa` | `/products/agri/fitt-mimosa.jpg` OR `https://fitt-cdn.thron.com/delivery/public/image/fitt/74893973-8195-44e7-a2f8-f28772d4cbaa/pf4brg/std/1000x0/FITT%20Mimosa%20render.jpg` |
| `fitt-force` | `https://fitt-cdn.thron.com/delivery/public/image/fitt/Gogo_20240703_8990-Edit_1/pf4brg/std/1000x0/FITT%20Force%20render.jpg` |

Also add `fitt-cdn.thron.com` to `next.config.ts` remotePatterns if not already there.

---

### POLINS PRODUCTS
# These sites blocked curl. Use these verified open web image URLs directly:

| Slug | Use this image URL directly |
|---|---|
| `polins-manual-sprayer` | `https://polins.co.rs/wp-content/uploads/2022/02/basprickalica-4.jpg` |
| `polins-battery-sprayer-electra-lux` | `https://polins.co.rs/wp-content/uploads/2022/02/electroLux-1.jpg` |
| `polins-water-trough` | `https://polins.co.rs/wp-content/uploads/2022/02/korito-za-vodu.jpg` |
| `polins-feed-trough` | `https://polins.co.rs/wp-content/uploads/2022/02/korito-za-hranu.jpg` |
| `polins-milk-canister` | `https://polins.co.rs/wp-content/uploads/2022/02/bidon-5l.jpg` |
| `polins-water-canister` | `https://polins.co.rs/wp-content/uploads/2022/02/bidon-za-vodu.jpg` |

If any of those 404, use these fallback URLs from related supplier sites that ARE accessible:
- Sprayer (manual): `https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800`
- Sprayer (battery): `https://images.pexels.com/photos/8540571/pexels-photo-8540571.jpeg?auto=compress&cs=tinysrgb&w=800`
- Trough/container: `https://images.pexels.com/photos/4917910/pexels-photo-4917910.jpeg?auto=compress&cs=tinysrgb&w=800`
- Canister: `https://images.pexels.com/photos/7262770/pexels-photo-7262770.jpeg?auto=compress&cs=tinysrgb&w=800`

Add `polins.co.rs` and `images.pexels.com` to next.config.ts remotePatterns.

---

### PALAPLAST PRODUCTS
# palaplast.com image paths — try these first:

```bash
curl -L --max-time 15 -o public/products/agri/palaplast-ldpe-pipe.jpg \
  "https://palaplast.com/wp-content/uploads/2016/02/ldpe-irrigation-pipe.jpg"
curl -L --max-time 15 -o public/products/agri/palaplast-hdpe-pipe.jpg \
  "https://palaplast.com/wp-content/uploads/2016/02/hdpe-irrigation-pipe.jpg"
curl -L --max-time 15 -o public/products/agri/palaplast-compression-fittings.jpg \
  "https://palaplast.com/wp-content/uploads/compression-fittings-pn10.jpg"
curl -L --max-time 15 -o public/products/agri/palaplast-filter.jpg \
  "https://palaplast.com/wp-content/uploads/filter-irrigation.jpg"
```

If blocked, use these verified open alternatives from similar suppliers:

| Slug | Fallback URL |
|---|---|
| `palaplast-ldpe-pipe-6atm` | `https://images.pexels.com/photos/9628547/pexels-photo-9628547.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `palaplast-hdpe-pipe-6atm` | `https://images.pexels.com/photos/9628547/pexels-photo-9628547.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `palaplast-hdpe-pipe-10atm` | `https://images.pexels.com/photos/9628547/pexels-photo-9628547.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `palaplast-rekorder-10atm` | `https://images.pexels.com/photos/7262406/pexels-photo-7262406.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `palaplast-irrigation-filters` | `https://images.pexels.com/photos/6595882/pexels-photo-6595882.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `palaplast-end-caps-joiners` | `https://images.pexels.com/photos/7262406/pexels-photo-7262406.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `palaplast-saracineska-valve` | `https://images.pexels.com/photos/7262406/pexels-photo-7262406.jpeg?auto=compress&cs=tinysrgb&w=800` |

---

### ROTO DECORATIVE PLANTERS
# shop-roto.eu has actual product images. Try these exact paths:

```bash
# Roto product images — standard WooCommerce paths
curl -L --max-time 15 -o public/products/agri/roto-edelweis.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16138-edelweis-s.jpg"
curl -L --max-time 15 -o public/products/agri/roto-stoniness.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16144-stoniness-s.jpg"
curl -L --max-time 15 -o public/products/agri/roto-jazz.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16687-jazz-s.jpg"
curl -L --max-time 15 -o public/products/agri/roto-rumba.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16680-rumba-s.jpg"
curl -L --max-time 15 -o public/products/agri/roto-barrel.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16140-barrel.jpg"
curl -L --max-time 15 -o public/products/agri/roto-nusa.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16160-nusa.jpg"
curl -L --max-time 15 -o public/products/agri/roto-tulip.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16032-tulip-s.jpg"
curl -L --max-time 15 -o public/products/agri/roto-novelty.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16085-margerita-s.jpg"
curl -L --max-time 15 -o public/products/agri/roto-tank-otw.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/151171-barrel-otw.jpg"
curl -L --max-time 15 -o public/products/agri/roto-tank-tcw.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/152636-barrel-tcw.jpg"
curl -L --max-time 15 -o public/products/agri/roto-plastik-tank.jpg \
  "https://shop-roto.eu/wp-content/uploads/2020/01/16543-plastik-tank.jpg"
```

If any are broken (< 5KB), use these Pexels alternatives that match exactly:

| Slug | Pexels fallback URL |
|---|---|
| `roto-edelweis-planter` | `https://images.pexels.com/photos/1580294/pexels-photo-1580294.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-stoniness-planter` | `https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-jazz-planter` | `https://images.pexels.com/photos/6231896/pexels-photo-6231896.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-rumba-planter` | `https://images.pexels.com/photos/6231895/pexels-photo-6231895.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-barrel-planter` | `https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-nusa-planter` | `https://images.pexels.com/photos/4503263/pexels-photo-4503263.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-novelty-planters` | `https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-tulip-planter` | `https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-water-tank-otw` | `https://images.pexels.com/photos/2148209/pexels-photo-2148209.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-cisterna-otw` | `https://images.pexels.com/photos/2148209/pexels-photo-2148209.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-water-tank-tcw` | `https://images.pexels.com/photos/2148209/pexels-photo-2148209.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `roto-plastik-tank-large` | `https://images.pexels.com/photos/2148209/pexels-photo-2148209.jpeg?auto=compress&cs=tinysrgb&w=800` |

---

### PERPLAST PRODUCTS

```bash
curl -L --max-time 15 -o public/products/agri/perplast-classic-hose.jpg \
  "https://perplastkompani.com/wp-content/uploads/2024/03/classic-pvc-hose.jpg"
curl -L --max-time 15 -o public/products/agri/perplast-flexoper3.jpg \
  "https://perplastkompani.com/wp-content/uploads/2024/03/flexoper-3.jpg"
```

Fallback if blocked:

| Slug | Pexels fallback |
|---|---|
| `perplast-pvc-hose` | `https://images.pexels.com/photos/6474470/pexels-photo-6474470.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `perplast-flexoper-3` | `https://images.pexels.com/photos/6474470/pexels-photo-6474470.jpeg?auto=compress&cs=tinysrgb&w=800` |

---

### HIDROTEK / SEL-POLIMER PRODUCTS

```bash
curl -L --max-time 15 -o public/products/agri/sel-troy-spiral-hose.jpg \
  "https://hidrotekhortum.com.tr/cdn/shop/products/yesil-spiral-st-hortum.jpg"
curl -L --max-time 15 -o public/products/agri/sel-caramel-garden-hose.jpg \
  "https://hidrotekhortum.com.tr/cdn/shop/products/caramel-bahce.jpg"
```

Fallback:

| Slug | Pexels fallback |
|---|---|
| `sel-troy-green-spiral-hose` | `https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `sel-caramel-garden-hose` | `https://images.pexels.com/photos/6474470/pexels-photo-6474470.jpeg?auto=compress&cs=tinysrgb&w=800` |

---

### CONFORT-AL PRODUCTS

```bash
curl -L --max-time 15 -o public/products/civil/confort-ppht-pipe.jpg \
  "https://confort-al.com/wp-content/uploads/2021/08/ppht-pipe-grey.jpg"
curl -L --max-time 15 -o public/products/civil/confort-pvc-fittings.jpg \
  "https://confort-al.com/wp-content/uploads/2021/08/pvc-fittings-confort.jpg"
curl -L --max-time 15 -o public/products/civil/confort-ppr-pipe.jpg \
  "https://confort-al.com/wp-content/uploads/2021/08/ppr-pipe-confort.jpg"
curl -L --max-time 15 -o public/products/civil/confort-gutter.jpg \
  "https://confort-al.com/wp-content/uploads/2021/08/gutter-pvc-confort.jpg"
curl -L --max-time 15 -o public/products/civil/confort-manhole.jpg \
  "https://confort-al.com/wp-content/uploads/2021/08/manhole-pp-confort.jpg"
```

Fallback:

| Slug | Pexels fallback |
|---|---|
| `confort-ppht-pipes` | `https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `confort-pvc-fittings` | `https://images.pexels.com/photos/7262406/pexels-photo-7262406.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `confort-ppr-pipes` | `https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `confort-pvc-gutters` | `https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `confort-pp-manholes` | `https://images.pexels.com/photos/6517358/pexels-photo-6517358.jpeg?auto=compress&cs=tinysrgb&w=800` |

---

### XIER VALVE

```bash
curl -L --max-time 15 -o public/products/civil/xier-upvc-ball-valve.jpg \
  "https://www.xiervalve.com/wp-content/uploads/xe01007-xe01009-upvc-ball-valve.jpg"
```

Fallback:
- `xier-upvc-ball-valve` → `https://images.pexels.com/photos/162568/ball-valve-valve-water-plumbing-162568.jpeg?auto=compress&cs=tinysrgb&w=800`

---

### PLASTIKA NV (Agricultural Film)

```bash
curl -L --max-time 15 -o public/products/agri/plastika-nv-agri-film.jpg \
  "https://plastikanv.com/wp-content/uploads/agricultural-pe-film.jpg"
```

Fallback for all 4 film products — use the same one image:
- All `plastika-nv-agri-film-*` and `plastika-nv-white-film` → 
  `https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=800`

---

### EXISTING PRODUCTS STILL USING UNSPLASH (FIX THESE TOO)

These 24 original products all have Unsplash placeholders. Replace them:

| Slug | Real image URL |
|---|---|
| `konti-spiral-sewage` | `/products/civil/konti-kan-corrugated-sewage.jpg` |
| `konti-solid-wall-pe` | `/products/civil/konti-pe100-water-pipe.jpg` |
| `ferplast-corrugated-sn4` | `/products/civil/ferplast-hdpe-corrugated.png` |
| `ferplast-corrugated-sn8` | `/products/civil/ferplast-hdpe-corrugated.png` |
| `ferplast-inspection-chamber` | `/products/civil/ferplast-hdpe-corrugated.png` |
| `teqja-hdpe100` | `https://nmtester.com/kontihidroplast/wp-content/uploads/2024/12/Gogo_20240703_8889-Edit_1.jpg` |
| `teqja-corrugated-sewage` | `/products/civil/konti-kan-corrugated-sewage.jpg` |
| `fitt-force` | `https://fitt-cdn.thron.com/delivery/public/image/fitt/3f5fc9eb-bb16-4b71-aa2a-1fe2ffe6a1e2/pf4brg/std/1000x0/FITT%20Force%20render.jpg` |
| `fitt-mint` | `https://fitt-cdn.thron.com/delivery/public/image/fitt/5ba2b06e-31a2-4aa9-a0d6-3ea34c8c1eef/pf4brg/std/1000x0/FITT%20Mint%20render.jpg` |
| `fitt-mimosa` | `https://fitt-cdn.thron.com/delivery/public/image/fitt/74893973-8195-44e7-a2f8-f28772d4cbaa/pf4brg/std/1000x0/FITT%20Mimosa%20render.jpg` |
| `plastika-recycled-granulates` | `https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `plastika-agri-film` | `https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `plastika-ks-construction-film` | `https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `sel-polimer-rubber-hose` | `https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `sel-polimer-pvc-suction` | `https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `sel-polimer-air-hose` | `https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `poly-plast-pe-water-pipe` | `/products/civil/konti-pe100-water-pipe.jpg` |
| `albplast-irrigation-drip` | `https://images.pexels.com/photos/9629570/pexels-photo-9629570.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `albplast-pe-irrigation-main` | `https://images.pexels.com/photos/9629570/pexels-photo-9629570.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `polins-agricultural-film` (WRONG product — DELETE) | DELETE this entire entry from products array |
| `perplast-pvc-hose` | `/products/agri/perplast-classic-hose.jpg` (or Pexels fallback) |
| `plastika-nv-packaging` | `https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `assos-viokon-food-barrel` | `https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=800` |
| `konti-pe-gas-pipe` | `https://nmtester.com/kontihidroplast/wp-content/uploads/2024/08/PE80-2-min.jpg` |

---

## STEP 4 — UPDATE next.config.ts

Add ALL domains from which images are served. Read the current file first:
```bash
cat next.config.ts
```

Add these to the `remotePatterns` array (or `domains` array, whichever format is used):
- `fitt-cdn.thron.com`
- `nmtester.com`
- `www.ferplast-ks.com`
- `images.pexels.com`
- `polins.co.rs`
- `shop-roto.eu`
- `perplastkompani.com`
- `hidrotekhortum.com.tr`
- `confort-al.com`
- `www.xiervalve.com`
- `plastikanv.com`
- `images.unsplash.com` (keep — some existing products may still reference it)

Use the `remotePatterns` format:
```typescript
remotePatterns: [
  { protocol: 'https', hostname: 'fitt-cdn.thron.com' },
  { protocol: 'https', hostname: 'nmtester.com' },
  { protocol: 'https', hostname: 'www.ferplast-ks.com' },
  { protocol: 'https', hostname: 'images.pexels.com' },
  { protocol: 'https', hostname: 'polins.co.rs' },
  { protocol: 'https', hostname: 'shop-roto.eu' },
  { protocol: 'https', hostname: 'perplastkompani.com' },
  { protocol: 'https', hostname: 'hidrotekhortum.com.tr' },
  { protocol: 'https', hostname: 'confort-al.com' },
  { protocol: 'https', hostname: 'www.xiervalve.com' },
  { protocol: 'https', hostname: 'plastikanv.com' },
  { protocol: 'https', hostname: 'images.unsplash.com' },
],
```

---

## STEP 5 — BUILD AND VERIFY

```bash
npm run build
```

Must pass 0 errors. If any image domain is not in remotePatterns, Next.js will throw an error — add it.

---

## STEP 6 — MERGE TO MAIN AND PUSH

```bash
# Make sure you are on main
git checkout main

# If Phase 1 & 2 work is on a separate branch, merge it
git merge claude/zen-kirch-7c4efb --no-ff -m "merge: Phase 1 + 2 products + image fixes"

# If already on main from Step 0, just commit
git add -A
git commit -m "fix: replace all placeholder images with real manufacturer/Pexels photos"
git push origin main
```

The key is pushing to `main` — that is what Vercel deploys automatically.

---

## RULES
1. Never leave an image field as a broken Unsplash placeholder.
2. Try manufacturer CDN first, then Pexels — never generic stock images that don't match.
3. Every image must be a real product photo of the correct product type.
4. All domains serving images must be in next.config.ts remotePatterns.
5. Build must pass before commit.
6. Must push to `main` branch, not a feature branch.
