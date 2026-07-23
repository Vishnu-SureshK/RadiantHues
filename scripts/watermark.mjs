// Bakes the "@RadiantHues" watermark into the actual pixels of every artwork
// image, so it survives download/screenshot (unlike a CSS overlay).
//
// Run:  npm run watermark            (watermark any not-yet-processed images)
//   or: npm run watermark -- --force (re-watermark everything from originals)
//
// How originals are protected:
//   • The first time an image is processed, its pristine original is copied to
//     /art-source (which is git-ignored — it never ships to the public repo).
//   • The watermarked version is written back to public/images (what the site
//     serves and what visitors can download).
//   • Re-running is idempotent: it always re-bakes from the pristine original,
//     so the watermark never stacks on itself.
//
// Only files named artwork-* are watermarked (the portrait is left untouched).

import sharp from "sharp";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, extname } from "node:path";
import { existsSync, mkdirSync, copyFileSync, readdirSync, readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const imagesDir = join(root, "public", "images");
const sourceDir = join(root, "art-source");
const artworksJson = join(root, "src", "content", "artworks.json");

const TEXT = "@RadiantHues";

const isImage = (f) => /\.(jpe?g|png|webp)$/i.test(f);
const isArtwork = (f) => f.startsWith("artwork-") && isImage(f);
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

// The set of image files to protect: every artwork-* file on disk PLUS every
// image actually referenced by the gallery data (covers any future image that
// doesn't follow the artwork-* naming convention). The portrait is excluded.
function targetFiles() {
  const set = new Set(readdirSync(imagesDir).filter(isArtwork));
  try {
    const arts = JSON.parse(readFileSync(artworksJson, "utf8"));
    for (const a of arts) {
      if (a?.image) set.add(a.image.replace(/^\/images\//, ""));
    }
  } catch {
    /* artworks.json missing/unreadable — fall back to filename convention only */
  }
  return [...set].filter((f) => isImage(f) && existsSync(join(imagesDir, f)));
}

// SVG watermark sized relative to the image: bottom-right, white with a soft
// dark outline so it stays legible on light or dark artwork.
function watermarkSvg(width, height) {
  const fontSize = Math.max(16, Math.round(width * 0.03));
  const padX = Math.round(width * 0.02);
  const padY = Math.round(height * 0.022);
  const stroke = Math.max(1, fontSize * 0.05);
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${width - padX}" y="${height - padY}" text-anchor="end"
        font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${fontSize}"
        fill="#ffffff" fill-opacity="0.72"
        stroke="#000000" stroke-opacity="0.35" stroke-width="${stroke}" paint-order="stroke">${TEXT}</text>
    </svg>`,
  );
}

async function watermarkFile(srcPath, outPath) {
  // Auto-orient by EXIF first so the watermark lands in the visual bottom-right.
  const { data, info } = await sharp(srcPath).rotate().toBuffer({ resolveWithObject: true });
  const svg = watermarkSvg(info.width, info.height);

  let pipeline = sharp(data).composite([{ input: svg, top: 0, left: 0 }]);
  const ext = extname(outPath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") pipeline = pipeline.jpeg({ quality: 92 });
  else if (ext === ".webp") pipeline = pipeline.webp({ quality: 92 });
  else if (ext === ".png") pipeline = pipeline.png();

  await pipeline.toFile(outPath);
}

export async function watermarkAll({ force = false } = {}) {
  if (!existsSync(sourceDir)) mkdirSync(sourceDir, { recursive: true });

  const files = targetFiles();

  let done = 0;
  for (const f of files) {
    const outPath = join(imagesDir, f);
    const srcPath = join(sourceDir, f);

    if (!existsSync(srcPath)) {
      // First time we see this image: back up the pristine original.
      copyFileSync(outPath, srcPath);
    } else if (!force) {
      // Original already backed up → public copy is already watermarked. Skip.
      continue;
    }

    await watermarkFile(srcPath, outPath);
    console.log(`  watermarked ${f}`);
    done++;
  }

  console.log(
    done ? `\n✓ Watermarked ${done} image(s).` : "\n✓ All images already watermarked.",
  );
  return done;
}

// Audit: confirm every artwork image in public/images carries the watermark.
// A file is considered watermarked when its pristine original is backed up in
// /art-source AND the published file differs from that original (i.e. the mark
// was baked in). Returns the list of problems (empty means all good).
export function checkAll() {
  const files = targetFiles();
  const problems = [];

  for (const f of files) {
    const outPath = join(imagesDir, f);
    const srcPath = join(sourceDir, f);
    if (!existsSync(srcPath)) {
      problems.push({ file: f, reason: "no backed-up original — never watermarked" });
    } else if (sha256(outPath) === sha256(srcPath)) {
      problems.push({ file: f, reason: "identical to original — watermark missing" });
    }
  }

  console.log(`\nWatermark audit — ${files.length} artwork image(s) checked`);
  if (problems.length === 0) {
    console.log("✓ Every artwork image is watermarked.\n");
  } else {
    console.log(`✗ ${problems.length} image(s) NOT watermarked:`);
    problems.forEach((p) => console.log(`    • ${p.file} — ${p.reason}`));
    console.log("\n  Fix: run  npm run art  (or  npm run watermark)  then commit.\n");
  }
  return problems;
}

// Allow running standalone:
//   node scripts/watermark.mjs           watermark new images
//   node scripts/watermark.mjs --force   re-watermark all from originals
//   node scripts/watermark.mjs --check   audit only (exit 1 if any unprotected)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--check")) {
    const problems = checkAll();
    process.exit(problems.length ? 1 : 0);
  } else {
    await watermarkAll({ force: process.argv.includes("--force") });
  }
}
