import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { articleCounterPaths, parseViewCount } from "../lib/recommendations.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = resolve(root, "data/article-popularity.json");
const previous = JSON.parse(await readFile(snapshotPath, "utf8"));
const siteCode = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || previous.siteCode;
if (!/^[a-z0-9_-]+$/i.test(siteCode)) throw new Error("Invalid public GoatCounter site code");

const slugs = (await readdir(resolve(root, "content/blog")))
  .filter(file => file.endsWith(".mdx"))
  .map(file => file.slice(0, -4))
  .sort();
const paths = slugs.flatMap(articleCounterPaths);
const results = new Map();
let cursor = 0;
let nextRequest = 0;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getCount(path) {
  // Keep the public counter refresh below four requests per second.
  const start = Math.max(Date.now(), nextRequest);
  nextRequest = start + 300;
  await sleep(Math.max(0, start - Date.now()));
  const response = await fetch(
    "https://" + siteCode + ".goatcounter.com/counter/" + encodeURIComponent(path) + ".json",
    { signal: AbortSignal.timeout(8000) },
  );
  if (!response.ok && response.status !== 404) throw new Error("Public counter HTTP " + response.status);
  const count = parseViewCount((await response.json()).count);
  if (count === null) throw new Error("Invalid public counter response");
  return count;
}

async function worker() {
  while (cursor < paths.length) {
    const path = paths[cursor++];
    try {
      results.set(path, await getCount(path));
    } catch {
      // Missing data stays unknown; it must never be silently ranked as zero.
    }
  }
}

await Promise.all(Array.from({ length: 4 }, worker));
if (results.size === paths.length) {
  const counts = Object.fromEntries(slugs.map(slug => [
    slug,
    articleCounterPaths(slug).reduce((sum, path) => sum + results.get(path), 0),
  ]));
  await writeFile(snapshotPath, JSON.stringify({
    siteCode,
    updatedAt: new Date().toISOString(),
    counts,
  }, null, 2) + "\n");
  console.log("Recommendation counts refreshed: " + slugs.length + " articles, both language routes.");
} else {
  console.warn("Recommendation counters incomplete (" + results.size + "/" + paths.length + "); keeping the last complete snapshot.");
  if (siteCode !== previous.siteCode) {
    await writeFile(snapshotPath, JSON.stringify({ siteCode, updatedAt: null, counts: {} }, null, 2) + "\n");
  }
}
