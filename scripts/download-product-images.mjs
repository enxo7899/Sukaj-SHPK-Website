#!/usr/bin/env node
/**
 * Downloads remote product images into `public/products/<category>/`.
 *
 * Reads `scripts/product-image-manifest.json` for the URL→local mapping so
 * we never hot-link from external CDNs in production. Run with:
 *   npm run download:product-images
 *
 * Skips files that already exist (use --force to overwrite).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const manifestPath = path.join(__dirname, "product-image-manifest.json");

const force = process.argv.includes("--force");

if (!fs.existsSync(manifestPath)) {
  console.error(`Manifest not found: ${manifestPath}`);
  process.exit(1);
}

/** @type {Array<{ id: string; url: string; localPath: string; note?: string }>} */
const entries = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

let ok = 0;
let skipped = 0;
let failed = 0;

for (const entry of entries) {
  const dest = path.join(root, "public", entry.localPath.replace(/^\//, ""));
  const dir = path.dirname(dest);
  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(dest) && !force) {
    skipped++;
    console.log(`• skip   ${entry.id}  (${entry.localPath})`);
    continue;
  }

  try {
    process.stdout.write(`↓ fetch  ${entry.id}  ${entry.url}\n`);
    const res = await fetch(entry.url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; SukajCatalogBot/1.0; +https://sukaj-shpk-website.vercel.app/)",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    ok++;
    console.log(`✓ saved  ${entry.id}  ${(buf.length / 1024).toFixed(0)} KB → ${entry.localPath}`);
  } catch (err) {
    failed++;
    console.error(`✗ fail   ${entry.id}: ${err.message}`);
  }
}

console.log(`\nDone. ok=${ok} skipped=${skipped} failed=${failed}`);
process.exit(failed > 0 ? 1 : 0);
