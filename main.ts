import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "LGTM. The refactor is clean, the tests pass, and this function will outlive us all \u2014 it just doesn't know it yet.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Post-write verification: re-read entry.txt and assert the guards.
const written = readFileSync(outPath, "utf8");
const lines = written.replace(/\n$/, "").split("\n");
if (lines.length !== 1) {
  throw new Error(`entry.txt must hold exactly 1 line, got ${lines.length}`);
}
if (lines[0].length > 140) {
  throw new Error(`entry line is ${lines[0].length} chars, over the 140 limit`);
}
if (lines[0] !== LINE) {
  throw new Error("entry.txt content does not match the entry line");
}
console.log(`entry.txt OK: 1 line, ${lines[0].length} chars`);
