import fs from "fs";

async function get(url) {
  const res = await fetch(url);
  return await res.json();
}

const season = await get("https://api.jikan.moe/v4/seasons/now?limit=20");
const top = await get("https://api.jikan.moe/v4/top/anime?limit=10");
const popular = await get("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10");

const data = {
  updated: new Date().toISOString(),
  season,
  top,
  popular
};

fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

console.log("Done!");
