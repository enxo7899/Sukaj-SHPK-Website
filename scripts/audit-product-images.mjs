#!/usr/bin/env node
/**
 * Audits product images in `src/lib/products-data.ts`.
 *
 * Reports:
 *   - external (non-local) image URLs that should be downloaded locally
 *   - local image paths that point to a missing file
 *   - duplicate local images (used by 2+ products)
 *
 * Run with: npm run audit:images
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "src/lib/products-data.ts");

const src = fs.readFileSync(dataPath, "utf8");
const re = /id:\s*"([^"]+)"[\s\S]*?image:\s*(?:\n\s*)?"([^"]+)"/g;

const seen = new Set();
/** @type {Array<{ id: string; image: string }>} */
const products = [];
let m;
while ((m = re.exec(src))) {
  if (seen.has(m[1])) continue;
  seen.add(m[1]);
  products.push({ id: m[1], image: m[2] });
}

const external = products.filter((p) => !p.image.startsWith("/"));
const missing = products.filter((p) => {
  if (!p.image.startsWith("/")) return false;
  return !fs.existsSync(path.join(root, "public", p.image));
});
const counts = {};
for (const p of products) {
  if (p.image.startsWith("/"))
    counts[p.image] = (counts[p.image] ?? 0) + 1;
}
const duplicates = Object.entries(counts).filter(([, c]) => c > 1);

console.log(`Products: ${products.length}`);
console.log(`External: ${external.length}`);
for (const p of external) console.log(`  • ${p.id} → ${p.image}`);
console.log(`Missing local files: ${missing.length}`);
for (const p of missing) console.log(`  • ${p.id} → ${p.image}`);
console.log(`Duplicate local images (used 2+ times): ${duplicates.length}`);
for (const [img, c] of duplicates) {
  console.log(`  • ${img}  ×${c}`);
  for (const p of products) if (p.image === img) console.log(`      - ${p.id}`);
}

if (external.length || missing.length) process.exit(1);
