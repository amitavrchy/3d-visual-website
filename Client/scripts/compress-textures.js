const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..", "public", "textures");
const before = { bytes: 0, files: 0 };
const after = { bytes: 0, files: 0 };

async function convert(rel, maxEdge, quality = 72) {
  const src = path.join(root, rel);
  if (!fs.existsSync(src)) {
    console.log("missing", rel);
    return null;
  }
  const st = fs.statSync(src);
  before.bytes += st.size;
  before.files++;
  const ext = path.extname(src).toLowerCase();
  const outRel = rel.replace(/\.(jpe?g|png)$/i, ".webp");
  const out = path.join(root, outRel);
  const img = sharp(src).rotate();
  const meta = await img.metadata();
  const w = meta.width || maxEdge;
  const h = meta.height || maxEdge;
  const scale = Math.min(1, maxEdge / Math.max(w, h));
  const tw = Math.max(1, Math.round(w * scale));
  const th = Math.max(1, Math.round(h * scale));
  const pipeline =
    ext === ".png"
      ? img.resize(tw, th, { fit: "inside" }).webp({ quality, alphaQuality: 80, effort: 5 })
      : img.resize(tw, th, { fit: "inside" }).webp({ quality, effort: 5 });
  await pipeline.toFile(out);
  const ost = fs.statSync(out);
  after.bytes += ost.size;
  after.files++;
  console.log(
    (st.size / 1024).toFixed(0) + "KB -> " + (ost.size / 1024).toFixed(0) + "KB  " + rel + " => " + outRel + " (" + tw + "x" + th + ")",
  );
  return outRel;
}

(async () => {
  const jobs = [
    ["planets/2k_mercury.jpg", 1024],
    ["planets/2k_venus_atmosphere.jpg", 1024],
    ["planets/2k_earth_daymap.jpg", 1024],
    ["planets/2k_earth_clouds.jpg", 1024],
    ["planets/2k_moon.jpg", 512],
    ["planets/2k_mars.jpg", 1024],
    ["planets/2k_jupiter.jpg", 1024],
    ["planets/2k_saturn.jpg", 1024],
    ["planets/2k_uranus.jpg", 1024],
    ["planets/2k_neptune.jpg", 1024],
    ["planets/2k_sun.jpg", 1024],
    ["planets/2k_saturn_ring_alpha.png", 1024, 80],
    ["sky/2k_stars_milky_way.jpg", 2048, 70],
  ];
  for (const [rel, edge, q] of jobs) {
    await convert(rel, edge, q ?? 72);
  }
  const previews = [
    "planets/2k_mercury.jpg",
    "planets/2k_venus_atmosphere.jpg",
    "planets/2k_earth_daymap.jpg",
    "planets/2k_mars.jpg",
    "planets/2k_jupiter.jpg",
    "planets/2k_saturn.jpg",
    "planets/2k_uranus.jpg",
    "planets/2k_neptune.jpg",
    "planets/2k_sun.jpg",
  ];
  fs.mkdirSync(path.join(root, "preview"), { recursive: true });
  for (const rel of previews) {
    const src = path.join(root, rel);
    const base = path.basename(rel).replace(/\.(jpe?g|png)$/i, ".webp");
    const out = path.join(root, "preview", base);
    await sharp(src).resize(256, 256, { fit: "inside" }).webp({ quality: 60, effort: 4 }).toFile(out);
    after.bytes += fs.statSync(out).size;
    after.files++;
    console.log("preview", base, (fs.statSync(out).size / 1024).toFixed(0) + "KB");
  }

  console.log("\nBEFORE", (before.bytes / 1024 / 1024).toFixed(2), "MB", before.files, "files");
  console.log("AFTER (webp+preview)", (after.bytes / 1024 / 1024).toFixed(2), "MB", after.files, "files");
})();
