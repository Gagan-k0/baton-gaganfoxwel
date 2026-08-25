---
name: gaganfoxwell-skillify
description: Codify a successful scrape into a permanent, reusable skill on disk. Future calls run in ~200ms instead of re-driving the page.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
  - WebFetch
triggers:
  - skillify
  - codify this scrape
  - save this scrape
  - make this permanent
---

## When to invoke this skill

Use when the user says "skillify", "codify this scrape", "save this
scrape", or "make this permanent" after a successful `/scrape` or
data-extraction flow. Walks back through the conversation, synthesizes
a self-contained scraper script + test + fixture, runs the test, and
asks before committing to disk.

## Workflow

### Step 1 — Confirm the scrape flow exists

You need a completed, successful extraction from the current or recent
conversation: a URL, a selector strategy that worked, and JSON output
the user accepted. If the user is referencing a scrape from a different
session, ask them to run it again so you have the live output to work
from.

### Step 2 — Name the skill

Ask the user (or derive from intent):

> What should this skill be called? Future `/scrape` calls matching
> this intent will run the codified script instead of re-driving the
> page.

Options:
- A) Use a descriptive name (e.g. `hackernews-frontpage`) (recommended)
- B) Custom name

Record: `SKILL_NAME`, `TRIGGER_PHRASE`, `TARGET_URL`, `OUTPUT_SCHEMA`.

### Step 3 — Synthesize the scraper script

Extract from the conversation:
- The final working URL(s)
- The selector/extraction strategy that succeeded
- The JSON output shape

Write a self-contained script (TypeScript or Python) that:

1. Fetches the target URL
2. Parses the HTML with the proven selector strategy
3. Returns structured JSON matching the output schema

The script must be a pure function: HTML in, parsed data out. No
browser automation, no network calls inside the parser — those belong
in a wrapper if needed.

```ts
// Example structure
export function parseFromHtml(html: string): Item[] {
  // Pure parser — tested against fixture
}

export interface Item {
  // Shape from the accepted JSON output
}

// Wrapper: fetch + parse + output
async function main() {
  const html = await fetch(TARGET_URL).then(r => r.text());
  const items = parseFromHtml(html);
  process.stdout.write(JSON.stringify({ items, count: items.length }) + '\n');
}
```

### Step 4 — Capture the fixture

Fetch the target URL and save the HTML as a fixture file:

```
fixtures/<hostname>-<YYYY-MM-DD>.html
```

This fixture is what the test runs against. It captures a real page
snapshot so the parser can be tested without hitting the network.

### Step 5 — Write the test

```ts
import { describe, it, expect } from 'bun:test';
import * as fs from 'fs';
import { parseFromHtml } from './script';

describe('<name> parser', () => {
  const html = fs.readFileSync('fixtures/<host>-<date>.html', 'utf-8');
  const items = parseFromHtml(html);

  it('returns items from the fixture', () => {
    expect(items.length).toBeGreaterThan(0);
  });

  it('every item has required fields', () => {
    for (const item of items) {
      expect(typeof item.key).toBe('string');
    }
  });
});
```

At least one non-smoke assertion: shape AND non-empty key fields.

### Step 6 — Stage the skill

Create the skill directory with:
- `SKILL.md` — frontmatter: `name`, `description`, `host`, `triggers`
- `script.ts` — the scraper
- `script.test.ts` — the test
- `fixtures/` — the HTML fixture

### Step 7 — Run the test

```bash
bun test script.test.ts
```

If it fails:
1. Fix the parser (up to 2 retries)
2. If still failing: discard, report the failure, stop

### Step 8 — Approval gate

> Commit skill "<name>"?
> The script ran clean against the snapshot. Saying yes saves it for
> future `/scrape` calls matching this intent.
>
> A) Commit it (recommended)
> B) Look at the script first
> C) Discard

### Step 9 — Commit or discard

If approved, move the staged directory to the appropriate skill tier
(project-level or global).

If discarded, remove the staged directory. "Discarded. No skill was
written to disk."

### Step 10 — Verify

After commit, confirm the skill appears in the skill list and produces
the same JSON as the original prototype.

End with: "Skill '<name>' committed. Future scrape calls matching
'<trigger>' will run the codified script."

## Rules

- Never commit without asking (approval gate is mandatory)
- Fixture must be a real page snapshot, not fabricated
- Parser must be testable without network access
- If the user says "just save it, skip the test" — still run the
  test. Quality gate is non-negotiable.
