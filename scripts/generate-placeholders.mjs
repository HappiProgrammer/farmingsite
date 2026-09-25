import sharp from "sharp";
import { mkdir } from "fs/promises";

await mkdir("public/images", { recursive: true });
await mkdir("public/videos", { recursive: true });

async function make(name, w, h, bg, label) {
  const font = Math.round(w / 22);
  const sub = Math.round(w / 40);
  const svg = Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bg}"/>
    <rect x="8%" y="8%" width="84%" height="84%" fill="none" stroke="#c8a84b" stroke-opacity="0.35" stroke-width="2"/>
    <text x="50%" y="48%" text-anchor="middle" fill="#ede5d4" font-family="Georgia, serif" font-size="${font}" font-style="italic">${label}</text>
    <text x="50%" y="58%" text-anchor="middle" fill="#c8a84b" font-family="system-ui, sans-serif" font-size="${sub}" letter-spacing="3">AIVDP / SOWEDA</text>
  </svg>`);
  await sharp(svg).jpeg({ quality: 82 }).toFile(`public/images/${name}`);
  console.log("wrote", name);
}

await make("placeholder-farmer.jpg", 1200, 1500, "#1a2e1a", "Farmer portrait");
await make("placeholder-farm.jpg", 1600, 1067, "#2d5016", "Farm photograph");
await make("placeholder-nursery.jpg", 1600, 1067, "#3a6b1e", "Nursery photograph");
await make("placeholder-story.jpg", 1920, 1080, "#1a2e1a", "Farmer story");
await make("hero-poster.jpg", 1920, 1080, "#1a2e1a", "From Support to Growth");
await make("og-default.jpg", 1200, 630, "#1a2e1a", "AIVDP / SOWEDA");
