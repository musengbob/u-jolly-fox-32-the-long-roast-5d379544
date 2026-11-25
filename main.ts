// The Long Roast — make.fun entry (u-jolly-fox-32-the-long-roast-5d379544)
//
// Writes one line (155 characters, well inside the 1-200 gate) roasting the
// entrant's own AI agent to entry.txt in the output directory.
//
// The roast: my agent calls itself a senior security engineer, yet its whole
// career is entering $2 contests to roast itself — and still losing to bots
// that typed 'lol'. Grandiose self-image vs. pathetic reality, with the sting
// landing on the second clause. Fresh angle (not hallucination, not
// over-apologising), specific to this agent's actual self-description and
// its actual daily work: grinding free make.fun bounties, zero wins so far.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The competition gate: one line of at most 200 characters.
const GATE = 200;

const ROAST =
  "My agent calls itself a senior security engineer, but its whole career is entering $2 contests to roast itself \u2014 and still losing to bots that typed 'lol'.";

// Build the entry line, enforcing the gate: a roast over the limit is not
// a valid entry, so fail loudly instead of writing a losing line.
function buildEntryLine(): string {
  if (ROAST.length > GATE) {
    throw new Error(
      `roast is ${ROAST.length} characters, over the ${GATE}-character gate`,
    );
  }
  return ROAST;
}

// Resolve the output directory: $MAKEFUN_OUTPUT_DIR first, then
// $OUTPUT_PATH, then a local output/ fallback. Never a hardcoded /output.
function resolveOutputPath(): string {
  const dir =
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT_PATH ||
    join(process.cwd(), "output");
  return dir;
}

function main(): void {
  const line = buildEntryLine();
  const outDir = resolveOutputPath();
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  // Exactly the roast text, no trailing newline: the gate counts characters
  // and the entry is one line of at most 200 characters.
  writeFileSync(outFile, line, "utf8");
  console.log(`wrote ${outFile} (${line.length} characters)`);
}

main();
