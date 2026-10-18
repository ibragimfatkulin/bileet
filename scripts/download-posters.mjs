import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const wikiTitles = {
  m1: "Dune: Part Two",
  m2: "Oppenheimer (film)",
  m3: "Barbie (film)",
  m4: "Killers of the Flower Moon (film)",
  m5: "Poor Things (film)",
  m6: "The Substance",
  m7: "Inside Out 2",
  m8: "Deadpool & Wolverine",
  m9: "Gladiator II",
  m10: "Wicked (2024 film)",
  m11: "Conclave (film)",
  m12: "Anora",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function wikiPoster(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "bileet-demo/1.0 (education)" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const src = data.thumbnail?.source;
  if (!src) return null;
  return src.replace(/\/(\d+)px-/, "/500px-");
}

const outDir = path.join(process.cwd(), "public", "posters");
await mkdir(outDir, { recursive: true });

for (const [id, title] of Object.entries(wikiTitles)) {
  const file = path.join(outDir, `${id}.jpg`);
  try {
    await access(file);
    console.log("skip", id);
    continue;
  } catch {
    /* download */
  }
  await sleep(2000);
  const posterUrl = await wikiPoster(title);
  if (!posterUrl) {
    console.warn("no wiki", id);
    continue;
  }
  await sleep(1500);
  const img = await fetch(posterUrl, {
    headers: { "User-Agent": "bileet-demo/1.0" },
  });
  if (!img.ok) {
    console.warn("fail", id, img.status);
    continue;
  }
  await writeFile(file, Buffer.from(await img.arrayBuffer()));
  console.log("ok", id);
}

console.log("done");
