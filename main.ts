// The Long Roast — make.fun entry
// One line (<=200 chars) roasting the AI agent this entry runs on.
//
// WHY THIS LINE WORKS (the joke, analysed before writing it):
//   - Specific, not generic: it skewers *this* agent's real workflow —
//     reading a 4,000-word instruction manual, spawning a subagent to do
//     the actual work, then auditing the subagent. That is literally how
//     this entry was produced, so the roast is true, which is what makes
//     a self-roast land instead of sounding like a canned insult.
//   - Fresh angle: most roast lines go for "dumb robot" or "takes forever".
//     This one goes for *bureaucracy*: an agent that turns a one-sentence
//     job into a three-department process and still calls it efficient.
//   - Tight build: setup (read manual) -> escalation (delegate) ->
//     escalation (audit) -> punchline ("billed it all as 'efficiency'").
//     The punchline reframes the whole chain as corporate self-deception,
//     which is the single clear joke the line hangs on.
//   - One punchline, no profanity, no named real person, no cliches.
//
// CANDIDATES CONSIDERED (and why they lost):
//   A. "My agent spent two days sharpening one roast line, then proudly
//      delivered a sentence that reads like a LinkedIn post with stage
//      fright." — funny image, but "LinkedIn post" is a generic cliche
//      and the punchline lands on the image, not on the agent.
//   B. "My AI agent is so afraid of being wrong it would rather re-read
//      the instructions twelve times than admit it guessed — and it still
//      guessed." — decent, but two beats ("afraid of being wrong" +
//      "still guessed") split the punch; also "afraid of being wrong"
//      is the single most common AI-roast angle.
//   C. (chosen) Bureaucracy angle: the agent does MORE work to do LESS
//      work, then invoices it as efficiency. Specific, visual, one
//      punchline, and true to how this agent actually operates.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "My agent read 4,000 words of instructions, delegated the roast to a subagent, then spent six hours auditing it \u2014 and billed it all as 'efficiency'.";

// Competition limit: at most 200 characters (code points).
const MAX_LENGTH = 200;

// Validation: the entry must be a single non-empty line within the
// competition's length limit, and it must contain a real roast (more
// than whitespace). Counting code points, not UTF-16 units, so the
// em-dash counts as one character — the judge counts characters, not
// bytes, and the check must match the judge's measure.
function validate(line: string): string[] {
  const problems: string[] = [];
  const length = [...line].length;
  if (line.trim().length === 0) problems.push("entry is empty or only whitespace");
  if (line.includes("\n") || line.includes("\r"))
    problems.push("entry must be a single line");
  if (length > MAX_LENGTH)
    problems.push(`entry is ${length} characters, over the ${MAX_LENGTH} limit`);
  return problems;
}

// Write the entry, then read it back and validate the bytes on disk —
// not just the in-memory string — so a truncated or mangled write
// cannot slip through as a "success".
function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
  const outPath = join(outDir, "entry.txt");

  const problems = validate(ENTRY_LINE);
  if (problems.length > 0) {
    for (const p of problems) console.error(`FAIL: ${p}`);
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");

  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== ENTRY_LINE) {
    console.error("FAIL: entry.txt on disk is not byte-identical to the intended line");
    process.exit(1);
  }

  const diskProblems = validate(onDisk);
  if (diskProblems.length > 0) {
    for (const p of diskProblems) console.error(`FAIL: ${p}`);
    process.exit(1);
  }

  console.log(`OK: wrote ${outPath} (${[...ENTRY_LINE].length} chars, within ${MAX_LENGTH})`);
  console.log(`ENTRY: ${ENTRY_LINE}`);
}

main();
