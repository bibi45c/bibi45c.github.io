// Build-time facts for the footer status line, evaluated once per `next build`. Server components only.
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export const postCount = fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".mdx")).length;

// UTC, so local and CI builds agree on the date.
export const builtAt = new Date().toISOString().slice(0, 10);

export const commit = (() => {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execSync("git rev-parse --short=7 HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || "dev";
  } catch {
    return "dev";
  }
})();
