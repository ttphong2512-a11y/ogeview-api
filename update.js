import fs from "fs";

async function get(url){
  const res = await fetch(url);
  return await res.json();
}

const season = await get("https://api.jikan.moe/v4/seasons/now?limit=20");
const top = await get("https://api.jikan.moe/v4/top/anime?limit=10");
const popular = await get("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10");

async function getDetails(list){

  const result = {};

  for(const anime of list){

    try{

      const full = await get(
        `https://api.jikan.moe/v4/anime/${anime.mal_id}/full`
      );

      result[anime.mal_id] = full.data;

      await new Promise(r=>setTimeout(r,500));

    }catch(e){

      console.log("Skip", anime.mal_id);

    }

  }

  return result;
}

const details = await getDetails([
  ...season.data,
  ...top.data,
  ...popular.data
]);

const data = {
  updated: new Date().toISOString(),
  season,
  top,
  popular,
  details
};

fs.writeFileSync(
  "data.json",
  JSON.stringify(data, null, 2)
);

console.log("Done!");
