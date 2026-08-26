# Gaganfoxwell Skills — Baton Integration

> 26 skills integrated into Baton. All build-verified and registered in
> `src/skills/catalog.ts`. Full source: `src/skills/bundled/<name>/SKILL.md`.

---

## Quick Reference

| # | Skill | Phase | Trigger phrases |
|---|-------|-------|-----------------|
| 1 | `gaganfoxwell-office-hours` | Plan | "brainstorm this", "office hours", "is this worth building" |
| 2 | `gaganfoxwell-ceo-review` | Plan | "think bigger", "expand scope", "strategy review" |
| 3 | `gaganfoxwell-eng-review` | Plan | "review architecture", "lock in the plan" |
| 4 | `gaganfoxwell-review` | Impl | "review this pr", "code review", "check my diff" |
| 5 | `gaganfoxwell-investigate` | Impl | "debug this", "fix this bug", "root cause analysis" |
| 6 | `gaganfoxwell-design-audit` | Impl | "visual design audit", "design polish" |
| 7 | `gaganfoxwell-design-shotgun` | Impl | "explore design variants", "show me design options" |
| 8 | `gaganfoxwell-design-html` | Impl | "build the design", "turn this into html" |
| 9 | `gaganfoxwell-devex-audit` | Impl | "dx audit", "try the onboarding", "test developer experience" |
| 10 | `gaganfoxwell-qa` | Impl | "qa test this", "find bugs on site", "test the app" |
| 11 | `gaganfoxwell-qa-report` | Impl | "qa report only", "just report bugs" |
| 12 | `gaganfoxwell-scrape` | Impl | "scrape this page", "get data from", "extract from" |
| 13 | `gaganfoxwell-skillify` | Impl | "skillify", "codify this scrape", "make this permanent" |
| 14 | `gaganfoxwell-careful` | Safety | "be careful", "safety mode", "prod mode" |
| 15 | `gaganfoxwell-freeze` | Safety | "freeze edits to directory", "only edit this folder" |
| 16 | `gaganfoxwell-guard` | Safety | "full safety mode", "lock it down" |
| 17 | `gaganfoxwell-unfreeze` | Safety | "unfreeze edits", "unlock all directories" |
| 18 | `gaganfoxwell-readonly` | Safety | "read only mode", "inspect only" |
| 19 | `gaganfoxwell-private` | Safety | "private mode", "no external calls" |
| 20 | `gaganfoxwell-learn` | Utility | "show learnings", "what have we learned" |
| 21 | `gaganfoxwell-context-save` | Utility | "save progress", "save my work" |
| 22 | `gaganfoxwell-context-restore` | Utility | "resume where i left off", "where was i" |
| 23 | `gaganfoxwell-first-task` | Utility | "first task", "new project setup", "get started" |
| 24 | `gaganfoxwell-teach` | Utility | "teach you about", "remember this" |
| 25 | `gaganfoxwell-fork` | Utility | "fork this", "create worktree", "parallel work" |
| 26 | `gaganfoxwell-browse` | Browser | "browse a page", "fetch a url" |

---

## How to Use Skills (General)

### Invocation

Skills are markdown instructions the agent loads and follows. Reference them by
name or by trigger phrase in your message to any agent:

```
Use the gaganfoxwell-investigate skill to debug this.
```

or naturally:

```
Debug this — login returns 500 intermittently.
```

### The recommended lifecycle chain

```
gaganfoxwell-office-hours      (validate the idea)
        ↓
gaganfoxwell-ceo-review        (challenge scope/ambition)
        ↓
gaganfoxwell-eng-review        (lock architecture)
        ↓
[implement]                    (+ gaganfoxwell-freeze to stay scoped)
        ↓
gaganfoxwell-review            (pre-landing code review)
        ↓
gaganfoxwell-qa                (test & fix)
        ↓
gaganfoxwell-context-save      (checkpoint before ending session)
```

### Verify installation

```bash
baton skills list          # all 26 should appear as [bundled]
baton skills install gaganfoxwell-qa   # install one into an agent
```

---

# Skill Catalog — Full Details

---

## 1. gaganfoxwell-office-hours

**What it contains**

A YC-partner-style product diagnostic that runs BEFORE any code is written.
Two modes selected by your goal:

- **Startup mode (Phase 2A):** six forcing questions asked one at a time, with
  pushback until answers are specific and evidence-based:
  1. Demand Reality — evidence someone would be upset if this vanished
  2. Status Quo — what users do today (spreadsheets/workarounds)
  3. Desperate Specificity — name one person who needs this
  4. Narrowest Wedge — smallest version someone pays for this week
  5. Observation — when did you last watch a user struggle
  6. Future-Fit — what breaks at 12 months
  Includes anti-sycophancy rules and 5 named pushback patterns.
- **Builder mode (Phase 2B):** design-thinking diagnostic (what/who/pain/
  scope/timeline/stack) for hackathons, learning, side projects.

Then: 2–3 implementation alternatives (Narrow Wedge / Balanced Build / Full
Vision) with effort + risk, and a design doc written to disk.

**How to use — step by step**

1. Say: `"Office hours: I want to build <one-line idea>."`
2. Answer the goal question (startup vs builder) — it routes the mode.
3. Answer the forcing questions one at a time; expect pushback on vague answers.
4. Receive alternatives A/B/C with effort/risk; pick one.
5. Get the design doc saved at `docs/YYYY-MM-DD-<slug>-design.md`.

**Inputs:** a one-line idea. **Outputs:** `docs/*-design.md`, Baton memory entries,
recommended next skill (`ceo-review`).

**Example**
> You: "Office hours — an app that tells me which of my subscriptions I forgot to cancel."
> Skill asks: "What's your goal with this?" → you answer → Q1..Q6 follow.

---

## 2. gaganfoxwell-ceo-review

**What it contains**

Founder-mode plan review that challenges premises and calibrates ambition.
Contents:

- System Audit (git log, TODOs, existing design docs)
- Premise Challenge — right problem? real outcome? cost of doing nothing?
- Existing-code leverage mapping (don't rebuild what exists)
- Dream-state mapping (current → plan → 12-month ideal)
- Mandatory 2–3 implementation approaches (one minimal-viable, one ideal)
- Mode selection: **SCOPE EXPANSION / SELECTIVE EXPANSION / HOLD SCOPE /
  SCOPE REDUCTION**, with context-aware defaults (bug fix → hold scope)
- Deep review across 11 sections (architecture, error paths, edge cases,
  security, tests, observability, deployment, performance, compatibility,
  docs, UI/UX), failure-mode analysis, verdict report.

**How to use — step by step**

1. Have a plan or design doc first (`office-hours` output works best).
2. Say: `"CEO review the plan in docs/2026-08-25-x-design.md"` or `"Think bigger on this plan."`
3. Answer premise questions honestly.
4. Choose one implementation approach (A/B/C).
5. Choose a review mode (expansion/selective/hold/reduction). If expanding,
   approve/reject each expansion individually.
6. Receive `docs/YYYY-MM-DD-<slug>-ceo-review.md` with an APPROVED /
   APPROVED WITH CONCERNS / REVISIONS NEEDED / REJECTED verdict.

**Inputs:** a plan/design doc or branch. **Outputs:** CEO review report + verdict.

---

## 3. gaganfoxwell-eng-review

**What it contains**

Engineering-manager plan review that locks execution before coding:

- Scope gate: choose reviewing target (branch diff / pasted plan / files)
- Scope challenge: minimum-change analysis, complexity smell check (>8 files
  or >2 new services = stop and ask), framework built-in search, TODOS
  cross-reference, completeness check
- Architecture review with ASCII data-flow diagrams, state transitions, API
  contracts, dependency/coupling analysis
- Error & rescue map (happy path / nil / empty / upstream failure per flow)
- Edge-case map (double-click, navigate-away, slow connection, stale state…)
- Test strategy matrix + coverage targets
- Performance analysis (hot paths, caching, DB indexes, memory)

**How to use — step by step**

1. Say: `"Eng review this plan"` (or `"review architecture"`).
2. Pick review target: A) branch diff, B) paste plan, C) specific path.
3. If complexity check triggers, decide reduce-vs-proceed.
4. Walk through findings interactively — each has a recommendation and asks
   for your call.
5. Get `docs/YYYY-MM-DD-<slug>-eng-review.md` with verdict.

**Inputs:** diff/plan/path. **Outputs:** eng review report + verdict + test matrix.

---

## 4. gaganfoxwell-review

**What it contains**

Pre-landing PR/diff review for bugs tests don't catch:

- Scope-drift detection (did the branch build what was requested — no more,
  no less?)
- CRITICAL pass categories: SQL/data safety, race conditions & TOCTOU, trust
  boundaries, shell injection, enum completeness
- INFORMATIONAL pass: async/sync mixing, swallowed errors, type safety,
  N+1 queries, completeness gaps
- Confidence calibration: every finding scored 1–10; low-confidence findings
  are suppressed unless P0; you must be able to quote the offending line
- Specialist dispatch for diffs >50 lines (testing, maintainability, security,
  performance, migrations, API contract, design) + red-team pass for >200 lines
- Fix-first classification (AUTO-FIX / ASK / NOTE) and a quality score X/10.

**How to use — step by step**

1. Be on a feature branch with changes vs base.
2. Say: `"Code review"` or `"Review this PR before I land it."`
3. Read the scope-check line (CLEAN / DRIFT DETECTED / REQUIREMENTS MISSING).
4. Review findings table — each shows severity + confidence + file:line.
5. Approve AUTO-FIX items; decide ASK items.
6. Get `docs/YYYY-MM-DD-<slug>-review.md` with APPROVE / REQUEST CHANGES / BLOCK.

**Inputs:** current branch diff. **Outputs:** review report, findings, quality score.

---

## 5. gaganfoxwell-investigate

**What it contains**

Systematic debugging under an Iron Law: **no fixes without root cause first**.

- Phase 1 Root Cause Investigation: symptoms, code tracing, `git log` on
  affected files, deterministic reproduction, prior-investigation lookup
- Phase 2 Pattern Analysis: known bug-pattern table (race condition, nil
  propagation, state corruption, integration failure, config drift, stale
  cache) + sanitized external search
- Phase 3 Hypothesis Testing: verify with logs/assertions before fixing;
  3-strike rule forces asking for help instead of guessing
- Phase 4 Implementation: minimal root-cause fix, reproduction verification,
  regression test, blast-radius scan
- Optional scope lock (freeze to affected directory) and investigation report.

**How to use — step by step**

1. Say: `"Investigate why checkout fails with 500 on empty cart."`
2. Provide symptoms/logs when asked — one question at a time.
3. Wait through hypothesis testing; if 3 hypotheses fail you'll be asked for
   extra context rather than getting a guess-fix.
4. Confirm the minimal fix + regression test.
5. Get `docs/YYYY-MM-DD-<slug>-investigation.md` documenting root cause,
   evidence, fix, prevention, blast radius.

**Inputs:** symptom description. **Outputs:** root cause, fix commit, regression
test, investigation report.

---

## 6. gaganfoxwell-design-audit

**What it contains**

Senior-designer visual audit of a live site with a fix loop:

- Modes: full (5–8 pages) / `--quick` (homepage+2) / `--deep` (10–15) /
  diff-aware (feature branch, audits only pages your diff touches)
- First-impression capture, page-area test, design-system extraction
  (fonts/colors/heading scale/spacing flags)
- Checklist per page: typography, spacing, hierarchy, WCAG contrast, layout,
  interaction states, AI-slop detection (stock photos, decoration without
  value), performance (CLS, heavy bundles)
- Fix loop: classify HIGH/MEDIUM/POLISH → fix in source → atomic commit →
  re-verify
- UX principles embedded (don't-make-me-think, users scan/satisfice/muddle
  through, billboard design, goodwill reservoir)

**How to use — step by step**

1. Have the site running (localhost:3000 etc.) or give a URL.
2. Say: `"Design audit http://localhost:3000"` (add `--quick` or `--deep`).
3. Optionally scope it: `"Focus on the settings page."`
4. Each finding gets fixed and committed atomically — watch the commits land.
5. Get `docs/YYYY-MM-DD-<slug>-design-audit.md` with PASS/PASS WITH NOTES/
   NEEDS WORK verdict.

**Inputs:** URL (or feature branch). **Outputs:** fixes as commits, audit report.

---

## 7. gaganfoxwell-design-shotgun

**What it contains**

Parallel design exploration:

- 5-dimension context gathering (who / job-to-be-done / what exists / user
  flow / edge cases)
- Taste memory: reads previously approved designs to bias toward your taste
- Concept generation with anti-convergence rule (every variant must take a
  visibly different direction — siblings get regenerated)
- Self-contained HTML mockups per variant + a side-by-side comparison board
- Structured feedback loop: per variant Approve / Reject / Iterate, max 3
  iterations
- Design tokens extraction from the winner.

**How to use — step by step**

1. Say: `"Show me design options for the pricing page."`
2. Confirm context if asked (audience, flow).
3. Open `docs/designs/pricing-page/comparison.html` in a browser.
4. Reply per variant: `"A: iterate — darker palette"`, `"B: reject"`,
   `"C: approve"`.
5. Winner lands at `docs/designs/pricing-page/approved.html` + exploration notes.

**Inputs:** screen/page name + rough intent. **Outputs:** variant HTMLs,
comparison board, approved design, design tokens.

---

## 8. gaganfoxwell-design-html

**What it contains**

Mockup-to-production HTML/CSS converter:

- Input detection (approved shotgun mockups, DESIGN.md, or plain description)
- Token extraction: colors, typography scale, spacing scale, breakpoints,
  component inventory
- Semantic HTML skeleton (header/nav/main/section/footer, ARIA, alt text)
- CSS custom properties for every token; mobile-first media queries;
  44px touch targets; hover/focus/active states; WCAG AA contrast
- Output written to `docs/designs/<page>/index.html` + `styles.css` plus an
  implementation report.

**How to use — step by step**

1. After design-shotgun approves a variant (or with any reference),
   say: `"Turn the approved pricing design into HTML."`
2. Agent extracts tokens and writes semantic HTML + tokenized CSS.
3. Open the file locally to inspect; request tweaks as normal edits.
4. Report confirms responsive breakpoints + accessibility status.

**Inputs:** approved mockup / DESIGN.md / description. **Outputs:** production-
ready index.html + styles.css + report.

---

## 9. gaganfoxwell-devex-audit

**What it contains**

Developer-experience audit that walks your onboarding like a real user:

- TTHW measurement (Time-To-Hello-World) against tiers: <2min Champion,
  2–5 Competitive, 5–10 Needs Work, >10 Red Flag
- 8-dimension scorecard 0–10 each: Getting Started, API/CLI/SDK ergonomics,
  Error Messages (what happened/why/next-steps model), Documentation,
  Upgrade Path, Dev Environment, Community, DX Measurement — each tagged
  TESTED / PARTIAL / INFERRED
- Findings split into Quick Wins (<1h), This-Sprint, Next-Quarter.

**How to use — step by step**

1. Say: `"DX audit this repo"` or `"Try the onboarding and time it."`
2. Point it at docs URL if the README doesn't have one.
3. It follows your own quickstart literally — every snag is scored.
4. Get the ASCII scorecard + `docs/YYYY-MM-DD-<slug>-dx-audit.md`.

**Inputs:** repo/docs URL. **Outputs:** DX scorecard, TTHW, prioritized fixes.

---

## 10. gaganfoxwell-qa

**What it contains**

QA-engineer + fixer in one, for web apps:

- Tiers: `--quick` (critical/high), standard (+medium, default),
  `--exhaustive` (+cosmetic); modes: full / diff-aware / smoke / regression
  vs a saved baseline.json
- Phases: init → authenticate (asks for OTP codes when needed) → orient
  (framework detection) → explore every page (clicks, forms incl. empty/
  invalid/edge, navigation, states, console after each interaction,
  mobile viewport) → document immediately with before/action screenshots →
  health score
- Weighted health-score rubric (Console 15%, Functional 20%, UX 15%,
  Accessibility 15%, Links 10%, Visual 10%, Performance 10%, Content 5%)
- Bugs fixed in source with atomic commits, then re-verified; rules include
  never reading source during testing (test as a user) and depth-over-breadth.

**How to use — step by step**

1. Run your app, then say: `"QA test http://localhost:3000"` (add
   `--quick`/`--exhaustive`; add credentials if auth needed).
2. Supply 2FA codes if prompted.
3. Watch issues appear in the report as they're found (with screenshots).
4. Fixes are committed per-issue and re-tested; final before/after scores shown.
5. Verdict: SHIP / FIX MORE / BLOCK in `docs/YYYY-MM-DD-<slug>-qa-report.md`.

**Inputs:** URL + optional tier/auth/scope. **Outputs:** fixed bugs (commits),
health score before/after, QA report, regression baseline.

---

## 11. gaganfoxwell-qa-report

**What it contains**

The same QA methodology as `gaganfoxwell-qa` but strictly report-only — zero
code changes. Produces the structured issue list, screenshots, repro steps,
health score, and Top-3-to-fix. Use when someone else will do the fixing.

**How to use — step by step**

1. Say: `"QA report only for http://localhost:3000"` or `"Just report bugs,
   don't fix anything."`
2. Same tier flags apply (`--quick`, `--exhaustive`).
3. Collect the report; hand it to whoever fixes.

**Inputs:** URL. **Outputs:** QA report + health score + bug list. **No commits.**

---

## 12. gaganfoxwell-scrape

**What it contains**

Read-only web data extraction with a strict contract:

- Step 1 takes a one-line intent ("top stories on HN"); asks once if missing
- Step 2 refuses mutating intents (submit/post/login/fill/delete/book…) —
  read-only by contract
- Step 3 prototypes via WebFetch: fetch page → parse → identify data →
  extract, with strategies for text / structured tables / links / metadata
  (meta tags, JSON-LD)
- Step 4 emits ONE JSON doc on stdout: `{ url, timestamp, items[], count }`
- Step 5 single-line suggestion to run skillify (no nagging)
- Failure honesty: after 3–4 failed extraction attempts it reports blockers
  (JS-rendered, paywalled) and offers options instead of faking output.

**How to use — step by step**

1. Say: `"Scrape https://news.ycombinator.com — titles, links, points."`
2. Get JSON back (pipe-friendly — no prose around the JSON unless asked).
3. Want it reusable? Follow up with skillify.

**Inputs:** URL + one-line intent. **Outputs:** JSON document.

---

## 13. gaganfoxwell-skillify

**What it contains**

Codifies a successful scrape into a permanent on-disk skill:

- Synthesizes `script.ts` whose parser is a PURE function (HTML in → data out;
  no network inside the parser) using only the final working approach
- Captures a real fixture `fixtures/<host>-<date>.html`
- Writes `script.test.ts` requiring non-smoke assertions (shape AND non-empty
  key fields)
- Stages everything (SKILL.md/script/test/fixture) → runs test → MANDATORY
  approval gate (Commit / Look first / Discard) → atomic commit or discard
- Post-commit verification that the codified run matches prototype output.

**How to use — step by step**

1. Right after a scrape you're happy with, say: `"Skillify this."`
2. Confirm/choose the skill name.
3. Tests run automatically; failures get ≤2 fix retries then abort cleanly.
4. At the gate reply `A` (commit), `B` (show me the script first), or `C`
   (discard).
5. Confirmation line reports where it landed and the trigger phrase for
   ~instant future runs.

**Inputs:** a completed scrape session. **Outputs:** permanent skill dir
(script + test + fixture + SKILL.md).

---

## 14. gaganfoxwell-careful

**What it contains**

Session-scoped guardrail mode. Every bash command is checked against
destructive patterns before running:

| Pattern family | Examples | Risk |
|---|---|---|
| Recursive delete | `rm -rf`, `rm -r` | Data loss |
| SQL destruction | `DROP TABLE/DATABASE`, `TRUNCATE` | Data loss |
| History rewrite | `git push --force/-f` | Remote rewrite |
| Work loss | `git reset --hard`, `git checkout .`, `git restore .` | Uncommitted loss |
| Infra deletion | `kubectl delete`, `docker rm -f`, `docker system prune` | Prod impact |

Behavior: MEDIUM matches warn-and-ask (you can override); HIGH shapes hard-deny
(`rm -r /`, force-push to default branch). Safe exceptions never warn
(`rm -rf node_modules/.next/dist/__pycache__/.cache/build/.turbo/coverage`).
Add project rules via `.gaganfoxwell/careful-patterns.txt` (additive only).

**How to use — step by step**

1. Before risky work say: `"Be careful"` / `"Enable safety mode."`
2. Work normally; destructive commands trigger a warning you confirm.
3. Mode lasts for the session; end session to clear.

---

## 15. gaganfoxwell-freeze

**What it contains**

Edit-scope lock. Edits outside one allowed directory are BLOCKED (not warned):

- Setup asks for the directory; stores boundary in
  `.gaganfoxwell/freeze-dir.txt`
- Every Edit/Write is checked against the resolved absolute path; symlinks
  resolve through their final component; trailing `/` stops `/src` matching
  `/src-old`
- Read/Glob/Grep/Bash unaffected — this blocks accidental edits, it is not a
  security sandbox (bash can still touch other paths).

**How to use — step by step**

1. Say: `"Freeze edits to src/auth/"`.
2. Confirmation names the boundary.
3. Any attempted edit elsewhere gets blocked with an explanation.
4. Change boundary by re-running freeze; clear with unfreeze.

---

## 16. gaganfoxwell-guard

**What it contains**

Maximum safety = careful + freeze together: destructive-command warnings AND
directory-scoped editing active simultaneously. For prod debugging or shared
environments.

**How to use — step by step**

1. Say: `"Full safety mode"` / `"Lock it down"`.
2. Name the directory to freeze when asked.
3. Both protections run until session ends (or unfreeze for the edit part).

---

## 17. gaganfoxwell-unfreeze

**What it contains**

Clears the freeze boundary set by freeze/guard: reads `.gaganfoxwell/
freeze-dir.txt`, announces the previous boundary, deletes it. Careful-mode
warnings remain active.

**How to use:** say `"Unfreeze"` → confirmation shows old boundary → all
directories editable again.

---

## 18. gaganfoxwell-readonly

**What it contains**

Hard look-don't-touch mode. Allowed: Read/Glob/Grep + read-only bash (`ls`,
`git status/log/diff`, `cat`, `head/tail`, `wc`, `find`, `tree`). Blocked:
Edit/Write, `git add/commit/push`, `rm/mv/cp`, any state-changing command.
Toggle behavior — running it again disables.

**How to use — step by step**

1. Say: `"Read-only mode"` before exploring an unfamiliar/untrusted codebase.
2. Ask questions freely; write attempts get blocked with a notice.
3. Say `"read only"` again (or end session) to lift.

---

## 19. gaganfoxwell-private

**What it contains**

No-exfiltration mode. Blocked: WebFetch/WebSearch, `curl/wget` to external
hosts, package installs that hit the network. Allowed: all local file work,
local git/npm scripts, and connections to localhost/127.0.0.1.

**How to use — step by step**

1. Say: `"Private mode"` when handling proprietary/sensitive code.
2. External-fetch attempts are blocked with an explanation.
3. Toggle off by repeating the phrase or ending the session.

---

## 20. gaganfoxwell-learn

**What it contains**

Project-memory manager over `.gaganfoxwell/learnings.jsonl`. Entries carry
skill, type, key, insight, confidence(1–10), source, timestamp. Operations:
list as a table, keyword search ("haven't we seen this before?"), prune
(older than 90 days or confidence <3 — always asks first), export as markdown
for teammates/handoffs. Logging rule: only durable learnings worth 5+ minutes;
explicit "no durable learnings" when none.

**How to use — step by step**

1. `"What have we learned?"` → formatted table.
2. `"Any learnings about auth cookies?"` → filtered matches.
3. `"Prune stale learnings"` → review list → confirm deletions.
4. `"Export learnings"` → markdown block to share.

---

## 21. gaganfoxwell-context-save

**What it contains**

Session checkpoint writer → `.gaganfoxwell/context/<branch>-<timestamp>.md`
containing: git state (branch, last 5 commits, modified files), 2–3 sentence
task summary, decisions with rationale (`[decision] X — why`), remaining-work
checklist, blockers. Kept small — summaries, not raw diffs.

**How to use — step by step**

1. Before stopping (or before a risky operation) say: `"Save my progress."`
2. File path is echoed back.
3. Pair with context-restore next session.

---

## 22. gaganfoxwell-context-restore

**What it contains**

Resumes the newest checkpoint, preferring the current branch. Steps: locate
file → extract task/decisions/remaining/blockers → verify git still matches
(warns on branch mismatch/stale state — never blindly applies) → prints a
resumption brief (Task/Done/Left/Decisions/Blockers) so work continues.

**How to use:** new session → `"Where was I?"` or `"Resume where I left off"`
→ confirm brief looks right → continue.

---

## 23. gaganfoxwell-first-task

**What it contains**

New-project onboarding: Phase 1 Orient (README, manifests, tree, agent docs,
recent git history — all read-only); Phase 2 Conventions (style, tests,
organization, commit format — inferred from code if undocumented);
Phase 3 pick a first task (yours, or suggested from TODOs/tests/doc gaps);
Phase 4 complete it conventionally with tests, verified build, clean commit.

**How to use:** drop the agent into a fresh repo → `"First task"` → answer
what-to-build (or accept a suggestion) → receive a small proven commit.

---

## 24. gaganfoxwell-teach

**What it contains**

Captures tribal knowledge absent from code into `.gaganfoxwell/teachings.md`
under five sections: Architecture decisions + trade-offs, Naming conventions,
Domain context (business terms/rules), Gotchas ("don't touch X without Y"),
Preferred patterns ("features go in src/features/"). Checked FIRST when new
tasks start — these override generic best practice.

**How to use — step by step**

1. Say: `"Teach you about our billing domain"` or dump context and say
   `"Remember this."`
2. Agent distills it into the five sections (concise bullets) and saves.
3. Update anytime the project evolves; future sessions inherit it.

---

## 25. gaganfoxwell-fork

**What it contains**

Manual parallel-work isolation via `git worktree add ../wt-<name> -b <name>`:
refuses when uncommitted changes exist (commit/stash first), copies `.env`
and `.gaganfoxwell/` (never node_modules — run install there), reports cd +
merge-back commands. Note: `baton new "<task>"` does this automatically inside
Baton coordination — this skill is for manual/outside-Baton forks.

**How to use — step by step**

1. `"Fork this as experiment-redesign."`
2. Clean-tree check passes → worktree created at `../wt-experiment-redesign`.
3. `cd ../wt-experiment-redesign && npm install` → work there.
4. Merge later: `git merge experiment-redesign` from the main checkout.

---

## 26. gaganfoxwell-browse

**What it contains**

Lightweight read-only page reader built on WebFetch: fetch any public URL,
extract text/links/tables/metadata, return structured data. Explicit limits:
no JS execution, no SPAs, no form interaction, no cookies/sessions, no
screenshots. Rules: respect robots.txt, never fetch authenticated pages,
cache within session, and honestly redirect JS-heavy targets to a real
browser daemon.

**How to use — step by step**

1. `"Fetch https://example.com/docs and list the API endpoints."`
2. Content returns summarized/structured per your ask.
3. If the page needs JS, you'll be told instead of getting empty results.

---

## Integration Status

| Component | Status |
|-----------|--------|
| SKILL.md files | 26/26 present in `src/skills/bundled/` |
| catalog.ts BUNDLED_META | 26/26 registered |
| catalog.ts SKILL_EXPLAIN | 26/26 registered |
| Build (`npm run build`) | Passing |
| `skills list` output | All 26 appear |
| Source-name audit | 0 references to origin project anywhere in shipped code |
| Git pushed | All commits pushed to `Gagan-k0/baton-gaganfoxwel` |
