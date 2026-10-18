import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const movies = [
  { id: "m1", title: "Дюна: Часть вторая", c1: "#3d2914", c2: "#c9a227" },
  { id: "m2", title: "Оппенгеймер", c1: "#1a1a2e", c2: "#e94560" },
  { id: "m3", title: "Барби", c1: "#ff69b4", c2: "#ffc0cb" },
  { id: "m4", title: "Убийцы цветочной луны", c1: "#2d5016", c2: "#8fbc8f" },
  { id: "m5", title: "Бедные-несчастные", c1: "#4a1942", c2: "#c77dff" },
  { id: "m6", title: "Субстанция", c1: "#0d0d0d", c2: "#39ff14" },
  { id: "m7", title: "Головоломка 2", c1: "#1e3a5f", c2: "#87ceeb" },
  { id: "m8", title: "Дэдпул и Росомаха", c1: "#8b0000", c2: "#ffd700" },
  { id: "m9", title: "Гладиатор 2", c1: "#4a3728", c2: "#daa520" },
  { id: "m10", title: "Злая", c1: "#006400", c2: "#98fb98" },
  { id: "m11", title: "Конклав", c1: "#1c1c1c", c2: "#d4af37" },
  { id: "m12", title: "Анора", c1: "#2f4f4f", c2: "#f0e68c" },
];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function wrapTitle(title, max = 14) {
  const words = title.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > max && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function svgFor({ title, c1, c2 }) {
  const lines = wrapTitle(title);
  const tspans = lines
    .map((l, i) => `<tspan x="250" dy="${i === 0 ? 0 : 36}">${escapeXml(l)}</tspan>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="500" height="750" fill="url(#g)"/>
  <rect x="24" y="24" width="452" height="702" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
  <text x="250" y="360" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="32" font-weight="bold" fill="#fff">${tspans}</text>
  <text x="250" y="680" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="rgba(255,255,255,0.7)">bileet</text>
</svg>`;
}

const outDir = path.join(process.cwd(), "public", "posters");
await mkdir(outDir, { recursive: true });

for (const m of movies) {
  await writeFile(path.join(outDir, `${m.id}.svg`), svgFor(m), "utf8");
  console.log("generated", m.id);
}

console.log("done");
