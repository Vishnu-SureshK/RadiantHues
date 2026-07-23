// One-command deploy — watermarks any new images, then stages, commits, and
// pushes to main.
//
// Run:  npm run push            (uses a dated default message)
//   or: npm run push -- "your commit message here"
//
// This runs entirely in your terminal — it does NOT use any AI/model tokens.
// Pushing to main triggers the Vercel deploy to radianthues.com.

import { execSync } from "node:child_process";
import { watermarkAll } from "./watermark.mjs";

function run(cmd) {
  return execSync(cmd, { encoding: "utf8" });
}

const custom = process.argv.slice(2).join(" ").trim();
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const message = custom || `Update site ${today}`;

try {
  // Guarantee: nothing deploys without a watermark. Any image added since the
  // last run is watermarked here before it's committed (idempotent — already
  // watermarked images are skipped).
  await watermarkAll();

  run("git add -A");

  // Commit. If there's nothing staged, git exits non-zero — that's fine,
  // we may still have local commits waiting to push.
  try {
    process.stdout.write(run(`git commit -m "${message.replace(/"/g, '\\"')}"`));
  } catch {
    console.log("Nothing new to commit — checking for unpushed commits...");
  }

  process.stdout.write(run("git push origin main"));
  console.log("\n✓ Pushed to GitHub. Vercel will redeploy radianthues.com in ~1-2 min.");
} catch (err) {
  console.error("\n✗ Push failed:\n" + (err.stdout || err.stderr || err.message));
  process.exit(1);
}
