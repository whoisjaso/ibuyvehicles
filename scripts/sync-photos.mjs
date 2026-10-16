// Scans public/photos for files named by slot code (A01.jpg, B03-wrecked.png,
// e01.webp...) and writes src/data/photos.generated.json. Runs before every dev
// and build, so placing an image is just: upload it to public/photos/ named
// with its code.
import { readdirSync, writeFileSync, readFileSync } from "node:fs";

const dir = new URL("../public/photos/", import.meta.url);
const out = new URL("../src/data/photos.generated.json", import.meta.url);
const found = {};
for (const f of readdirSync(dir).sort()) {
  const m = f.match(/^([a-z]\d{2})(?=[-_. ])[^/]*\.(jpe?g|png|webp|avif)$/i);
  if (m) found[m[1].toUpperCase()] ??= `/photos/${f}`;
}
const next = JSON.stringify(found, null, 2) + "\n";
let prev = "";
try { prev = readFileSync(out, "utf8"); } catch {}
if (prev !== next) writeFileSync(out, next);
console.log(`photos: ${Object.keys(found).join(", ") || "none placed yet"}`);
