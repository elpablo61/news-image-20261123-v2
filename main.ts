import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
// The harness runs the program twice and both runs must write the same
// bytes: refuse to pass silently if the copy ever comes out short.
if (statSync(dst).size !== statSync(src).size) {
  throw new Error(`entry.png copy mismatch: ${statSync(dst).size} != ${statSync(src).size}`);
}
