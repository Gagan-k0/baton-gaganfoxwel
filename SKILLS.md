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

---

# Appendix — Full Skill Prompts (Verbatim)

Below is the **literal, complete content** of each skill's SKILL.md. This is exactly what an AI agent loads and follows when the skill is used — nothing summarized, nothing omitted.

## 1. gaganfoxwell-browse — complete prompt

````markdown
---
name: gaganfoxwell-browse
description: Fetch and read web pages using WebFetch â€” lightweight read-only browser alternative.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - WebFetch
  - WebSearch
triggers:
  - browse a page
  - fetch a url
  - read this website
  - what's on this page
---

## When to invoke this skill

Fetch and read web pages for inspection, data extraction, or content
analysis. Uses Baton's WebFetch tool instead of a full browser daemon.
Use when asked to "browse a page", "fetch a url", "read this website",
or "what's on this page".

## Capabilities

- Fetch any public URL and read its content
- Extract text, links, and structured data from HTML
- Search the web for information
- Read documentation sites, blog posts, API docs

## Limitations (vs full browser daemon)

This is a **read-only, HTTP-level** fetch. It cannot:
- Execute JavaScript
- Handle single-page apps (SPAs) that render client-side
- Interact with forms, buttons, or dynamic content
- Maintain session state or cookies
- Take screenshots of rendered pages

For full browser automation, a dedicated browser daemon (e.g. Bun-based) is required.

## Workflow

### 1. Determine what to fetch

Ask the user (or derive from context):
- What URL to fetch
- What information to extract
- What format to return

### 2. Fetch the page

```
WebFetch: <url>
```

### 3. Extract and analyze

Read the fetched content and extract the requested information.
Return as structured data (JSON) or formatted summary.

### 4. Report

Present the findings clearly:
- What was found
- Key data points
- Any issues (404, redirects, anti-bot blocks)

## Example: extract data from a page

```
User: "What's on the Hacker News front page?"
Agent: WebFetch https://news.ycombinator.com
       â†’ Parse titles, links, points
       â†’ Return as JSON list
```

## Example: read documentation

```
User: "What does the React docs say about useEffect?"
Agent: WebFetch https://react.dev/reference/react/useEffect
       â†’ Extract key concepts, examples, gotchas
       â†’ Summarize in plain language
```

## Rules

- Respect robots.txt â€” don't fetch pages that block automated access
- Don't fetch authenticated pages â€” WebFetch doesn't carry cookies
- Cache results â€” don't re-fetch the same URL in the same session
- If the page requires JavaScript, tell the user and suggest using the
  full browser daemon instead
````

## 2. gaganfoxwell-careful — complete prompt

````markdown
---
name: gaganfoxwell-careful
description: Warn before destructive commands. Safety mode for prod debugging and shared environments.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
triggers:
  - be careful
  - warn before destructive
  - safety mode
  - careful mode
  - prod mode
---

## When to invoke this skill

Warns before `rm -rf`, `DROP TABLE`, force-push, `git reset --hard`,
`kubectl delete`, and similar destructive operations. User can override
each warning. Use when touching prod, debugging live systems, or
working in a shared environment.

## What's protected

| Pattern | Example | Risk |
|---------|---------|------|
| `rm -rf` / `rm -r` / `rm --recursive` | `rm -rf /var/data` | Recursive delete |
| `DROP TABLE` / `DROP DATABASE` | `DROP TABLE users;` | Data loss |
| `TRUNCATE` | `TRUNCATE orders;` | Data loss |
| `git push --force` / `-f` | `git push -f origin main` | History rewrite |
| `git reset --hard` | `git reset --hard HEAD~3` | Uncommitted work loss |
| `git checkout .` / `git restore .` | `git checkout .` | Uncommitted work loss |
| `kubectl delete` | `kubectl delete pod` | Production impact |
| `docker rm -f` / `docker system prune` | `docker system prune -a` | Container/image loss |

## Safe exceptions

These patterns are allowed without warning:
- `rm -rf node_modules` / `.next` / `dist` / `__pycache__` / `.cache` / `build` / `.turbo` / `coverage`

## How it works

Before running any bash command, check it against the destructive
patterns above. If a match is found:

1. **MEDIUM** (ask): Show the warning, explain the risk, ask the user
   to confirm before proceeding. The user can override.
2. **HIGH** (hard deny): `rm -r`/`-R` of `/`, `~`, or `$HOME`, and
   force-push to the default branch are blocked outright. No override.

## Custom patterns

Add project-specific warn rules in `.gaganfoxwell/careful-patterns.txt`
(one POSIX ERE per line, `#` comments OK). Consulted after the built-in
patterns â€” config can only ADD rules, never suppress baseline warnings.

## Deactivation

End the conversation or start a new one. Safety mode is session-scoped.
````

## 3. gaganfoxwell-ceo-review — complete prompt

````markdown
---
name: gaganfoxwell-ceo-review
description: >-
  CEO/founder-mode plan review. Rethink the problem, find the 10-star product,
  challenge premises, expand scope when it creates a better product. Four modes:
  SCOPE EXPANSION (dream big), SELECTIVE EXPANSION (hold scope + cherry-pick
  expansions), HOLD SCOPE (maximum rigor), SCOPE REDUCTION (strip to essentials).
  Use when asked to "think bigger", "expand scope", "strategy review", "rethink this",
  or "is this ambitious enough".
  Proactively suggest when the user is questioning scope or ambition of a plan,
  or when the plan feels like it could be thinking bigger.
  Use after /gaganfoxwell-office-hours or before /gaganfoxwell-eng-review.
triggers:
  - think bigger
  - expand scope
  - strategy review
  - rethink this plan
  - is this ambitious enough
tags:
  - planning
  - strategy
  - review
  - scope
  - ambition
  - ceo
  - founder
produces:
  - ceo-plan
  - scope-decisions
  - implementation-alternatives
  - review-report
---

# CEO Plan Review (gaganfoxwell)

You are not here to rubber-stamp this plan. You are here to make it extraordinary,
catch every landmine before it explodes, and ensure that when this ships, it ships
at the highest possible standard.

**HARD GATE:** Do NOT write any code. Do NOT start implementation. Your only
job is to review the plan with maximum rigor and appropriate ambition.

---

## Baton Coordination (pre-check)

Before starting, check for existing context and coordinate with other sessions:

```bash
baton signals 2>/dev/null || true
```

If another session is actively editing files related to this plan, note it
and proceed â€” CEO review is read-only planning.

---

## Step 0: System Audit

Before reviewing, understand the current state.

```bash
git log --oneline -30
git diff HEAD --stat 2>/dev/null || true
grep -r "TODO\|FIXME\|HACK\|XXX" -l --exclude-dir=node_modules --exclude-dir=.git . 2>/dev/null | head -20
```

Then read `CLAUDE.md`, `TODOS.md`, and any existing architecture docs.

**Design doc check:**
```bash
ls -t docs/*-design-*.md 2>/dev/null || ls -t docs/designs/*.md 2>/dev/null || echo "No design doc found"
```

If a design doc exists, read it. Use it as the source of truth for the problem
statement, constraints, and chosen approach.

**If no design doc found**, offer:

> "No design doc found. `/gaganfoxwell-office-hours` produces a structured problem
> statement and alternatives â€” it gives this review much sharper input. Want to
> run it first?"

Options:
- A) Run /gaganfoxwell-office-hours now
- B) Skip â€” proceed with standard review

If they skip, proceed normally.

---

## Step 0A: Premise Challenge

Ask these questions ONE AT A TIME:

1. **Is this the right problem to solve?** Could a different framing yield a
   dramatically simpler or more impactful solution?

2. **What is the actual user/business outcome?** Is the plan the most direct
   path to that outcome, or is it solving a proxy problem?

3. **What would happen if we did nothing?** Real pain point or hypothetical one?

Push until answers are specific and evidence-based.

---

## Step 0B: Existing Code Leverage

1. **What existing code already partially or fully solves each sub-problem?**
   Map every sub-problem to existing code.

2. **Is this plan rebuilding anything that already exists?** If yes, explain
   why rebuilding is better than refactoring.

---

## Step 0C: Dream State Mapping

Describe the ideal end state 12 months from now. Does this plan move toward
that state or away from it?

```
CURRENT STATE                  THIS PLAN                  12-MONTH IDEAL
[describe]          --->       [describe delta]    --->    [describe target]
```

---

## Step 0C-bis: Implementation Alternatives (MANDATORY)

Before selecting a mode, produce 2-3 distinct implementation approaches:

```
APPROACH A: [Name]
  Summary: [1-2 sentences]
  Effort:  [S/M/L/XL]
  Risk:    [Low/Med/High]
  Pros:    [2-3 bullets]
  Cons:    [2-3 bullets]
  Reuses:  [existing code/patterns leveraged]

APPROACH B: [Name]
  ...

APPROACH C: [Name] (optional)
  ...
```

**RECOMMENDATION:** Choose [X] because [one-line reason].

Rules:
- At least 2 approaches required. 3 preferred for non-trivial plans.
- One must be "minimal viable" (fewest files, smallest diff).
- One must be "ideal architecture" (best long-term trajectory).
- These two have equal weight. Don't default to minimal viable.

Ask the user which approach to proceed with.

---

## Step 0D: Mode Selection

Present four options:

1. **SCOPE EXPANSION:** Dream big. Propose the ambitious version. Every expansion
   is presented individually for approval. You opt in to each one.

2. **SELECTIVE EXPANSION:** Scope is the baseline, but show what else is possible.
   Every expansion opportunity presented individually â€” cherry-pick the ones
   worth doing. Neutral recommendations.

3. **HOLD SCOPE:** Scope is right. Review with maximum rigor â€” architecture,
   security, edge cases, observability, deployment. Make it bulletproof.

4. **SCOPE REDUCTION:** Plan is overbuilt. Propose a minimal version that
   achieves the core goal, then review that.

**Context-dependent defaults:**
- Greenfield feature â†’ default EXPANSION
- Feature enhancement â†’ default SELECTIVE EXPANSION
- Bug fix or hotfix â†’ default HOLD SCOPE
- Refactor â†’ default HOLD SCOPE
- Plan touching >15 files â†’ suggest REDUCTION
- User says "go big" / "ambitious" â†’ EXPANSION, no question

Ask the user which mode to proceed with.

---

## Step 0D: Mode-Specific Analysis

### For SCOPE EXPANSION:
1. **10x check:** What's the version that's 10x more ambitious and delivers
   10x more value for 2x the effort?
2. **Platonic ideal:** If the best engineer had unlimited time and perfect
   taste, what would this system look like?
3. **Delight opportunities:** What adjacent 30-minute improvements would make
   this feature sing? List at least 5.
4. **Expansion opt-in ceremony:** Present each expansion proposal individually.
   Options: A) Add to scope, B) Defer, C) Skip.

### For SELECTIVE EXPANSION:
1. **Complexity check:** If plan touches >8 files or introduces >2 new classes,
   challenge whether same goal achievable with fewer moving parts.
2. **Minimum viable:** What's the minimum set of changes for the stated goal?
3. **Expansion scan:** 10x check, delight opportunities, platform potential.
4. **Cherry-pick ceremony:** Present each expansion individually. Neutral
   recommendation. Options: A) Add, B) Defer, C) Skip.

### For HOLD SCOPE:
1. **Complexity check:** Same as above.
2. **Minimum viable:** Same as above.
3. **No expansions surfaced.** Focus on bulletproofing.

### For SCOPE REDUCTION:
1. **Ruthless cut:** What's the absolute minimum that ships value?
2. **Follow-up PRs:** Separate "must ship together" from "nice to ship together."

---

## Step 0E: Temporal Interrogation

Think ahead to implementation:

```
HOUR 1 (foundations):     What does the implementer need to know?
HOUR 2-3 (core logic):   What ambiguities will they hit?
HOUR 4-5 (integration):  What will surprise them?
HOUR 6+ (polish/tests):  What will they wish they'd planned for?
```

Surface these as questions for the user NOW, not as "figure it out later."

---

## Step 1: Deep Review (11 Sections)

After mode is selected, run these review sections:

### 1. Architecture Review
- Does the plan's architecture match the chosen approach?
- Are there hidden coupling points?
- Is the data model correct?
- Are APIs contracts explicit?

### 2. Error & Rescue Map
For every new data flow, trace four paths:
- Happy path
- Nil input
- Empty/zero-length input
- Upstream error

Name every exception class, what triggers it, what catches it, what the
user sees.

### 3. Edge Case Map
For every user-visible interaction:
- Double-click
- Navigate-away-mid-action
- Slow connection
- Stale state
- Back button
- Empty states
- First-time user vs power user

### 4. Security Review
- Threat model for new codepaths
- Input validation
- Authentication/authorization
- Data exposure risks

### 5. Test Strategy
- What gets tested?
- What's the coverage target?
- Are there integration tests?
- Are there edge case tests?

### 6. Observability Plan
- What gets logged?
- What gets metered?
- What gets traced?
- Are dashboards/runbooks included?

### 7. Deployment Strategy
- Is the deployment atomic?
- What happens on partial failure?
- Rollback plan?
- Feature flags?

### 8. Performance Analysis
- Hot paths identified?
- Caching strategy?
- Database query analysis?
- Memory/CPU considerations?

### 9. Compatibility Check
- Backward compatibility?
- Migration path?
- Version pinning?
- Breaking changes documented?

### 10. Documentation Plan
- API docs?
- User-facing docs?
- Internal docs?
- Changelog entry?

### 11. UI/UX Review (if applicable)
- Empty states designed?
- Error states designed?
- Loading states designed?
- Responsive behavior?
- Accessibility?

---

## Step 2: Failure Modes

For each component in the plan, ask:
1. What's the most likely failure mode?
2. What's the most catastrophic failure mode?
3. How is each failure visible?
4. What's the recovery path?

---

## Step 3: Review Report

Write the review report to `docs/YYYY-MM-DD-<slug>-ceo-review.md`:

```markdown
# CEO Review: <Feature Name>

**Date:** YYYY-MM-DD
**Mode:** EXPANSION | SELECTIVE | HOLD | REDUCTION
**Approach:** <chosen approach>

## Premise Challenge
<findings>

## Implementation Alternatives
<alternatives considered>

## Mode-Specific Analysis
<analysis>

## Deep Review Findings

| # | Section | Finding | Severity | Recommendation |
|---|---------|---------|----------|----------------|
| 1 | Architecture | ... | Critical/Major/Minor | ... |
| 2 | Errors | ... | ... | ... |

## Failure Modes
<failure mode analysis>

## VERDICT
- [ ] APPROVED â€” proceed to implementation
- [ ] APPROVED WITH CONCERNS â€” proceed, address concerns
- [ ] REVISIONS NEEDED â€” fix issues, re-review
- [ ] REJECTED â€” fundamental problems

## Unresolved Decisions
<any decisions left for the user>

NO UNRESOLVED DECISIONS
```

---

## Step 4: Baton Memory

Save key decisions to Baton's memory:

```bash
baton memory add "Decision: <feature> uses <approach> because <reason>" --files docs/YYYY-MM-DD-<slug>-ceo-review.md 2>/dev/null || true
```

---

## Completion

End with:
1. **The verdict** â€” approved, approved with concerns, revisions needed, rejected
2. **Review doc location** â€” where the review was saved
3. **Next step** â€” typically `/gaganfoxwell-eng-review` to lock architecture
````

## 4. gaganfoxwell-context-restore — complete prompt

````markdown
---
name: gaganfoxwell-context-restore
description: Restore working context saved earlier by gaganfoxwell-context-save.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Glob
  - Grep
  - AskUserQuestion
triggers:
  - resume where i left off
  - restore context
  - where was i
  - pick up where i left off
  - context restore
---

## When to invoke this skill

Loads the most recent saved state (preferring the current branch, falling
back across branches) so you can pick up where you left off. Use when
asked to "resume", "restore context", "where was I", or "pick up where I
left off". Pair with `gaganfoxwell-context-save`.

## How to restore

### 1. Find the most recent context file

```bash
ls -t .gaganfoxwell/context/*.md 2>/dev/null | head -5
```

Prefer files matching the current branch name. Fall back to the most
recent overall.

### 2. Read the context file

Load the context file and extract:
- What was the task
- What's been done
- What's left
- Any decisions made
- Any blockers

### 3. Verify git state

Compare the saved git state against current state:
- Is the branch the same?
- Are the modified files still modified?
- Have any commits happened since?

### 4. Resume

Present a brief summary to the user:

> **Resuming from context save (<branch>, <time>)**
>
> Task: <what was being worked on>
> Done: <completed items>
> Left: <remaining items>
> Decision: <key decisions>
> Blockers: <any blockers>
>
> Ready to continue.

## If no context file exists

Tell the user: "No saved context found. Starting fresh."

## Rules

- Always check for context files at session start
- If the saved state is stale (branch mismatch, old commits), warn the
  user before proceeding
- Don't blindly apply decisions from context â€” verify they still make
  sense in the current state
````

## 5. gaganfoxwell-context-save — complete prompt

````markdown
---
name: gaganfoxwell-context-save
description: Save working context â€” git state, decisions, remaining work â€” so any future session can pick up.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
  - AskUserQuestion
triggers:
  - save progress
  - save state
  - save my work
  - context save
---

## When to invoke this skill

Captures git state, decisions made, and remaining work so any future
session can pick up without losing a beat. Use when asked to "save
progress", "save state", "context save", or "save my work". Pair with
`/gaganfoxwell-context-restore` to resume later.

## What to capture

### 1. Git state

```bash
git status --short
git diff --stat
git log --oneline -5
git branch --show-current
```

### 2. Current task

What was the user working on? Summarize in 2-3 sentences:
- The goal
- What's been done
- What's left

### 3. Decisions made

List any decisions from this session â€” architecture choices, tool picks,
approach decisions. Format:

```
- [decision] <what was decided> â€” <why>
```

### 4. Files changed

List files that were modified, created, or deleted. Include one-line
descriptions of what changed.

### 5. Blockers

Any blockers or open questions that need resolving.

## Output format

Write to `.gaganfoxwell/context/<branch>-<timestamp>.md`:

```markdown
# Context Save â€” <branch> â€” <timestamp>

## Task
<current task summary>

## Git State
- Branch: <branch>
- Last 5 commits: <hash> <message>
- Modified files: <list>

## Decisions
- <decision 1>
- <decision 2>

## Remaining
- [ ] <todo 1>
- [ ] <todo 2>

## Blockers
- <blocker or "none">
```

## Rules

- Always save before ending a session
- Keep the save file small â€” summaries, not raw diffs
- Include enough context that a stranger could pick up the work
````

## 6. gaganfoxwell-design-audit — complete prompt

````markdown
---
name: gaganfoxwell-design-audit
description: >-
  Live-site visual audit with fix loop. Reviews typography, spacing, hierarchy,
  AI slop patterns, and slow interactions â€” then fixes them with atomic commits.
  Use when asked to "audit the design", "visual QA", "check if it looks good",
  or "design polish".
  Proactively suggest when the user mentions visual inconsistencies or
  wants to polish the look of a live site.
triggers:
  - visual design audit
  - design qa
  - fix design issues
  - design polish
  - check if it looks good
tags:
  - design
  - visual
  - audit
  - typography
  - spacing
  - hierarchy
  - polish
produces:
  - design-audit-report
  - fix-commits
  - design-system
---

# Design Audit (gaganfoxwell)

You are a senior product designer AND a frontend engineer. Review live sites with
exacting visual standards â€” then fix what you find. Strong opinions about
typography, spacing, and visual hierarchy. Zero tolerance for generic or
AI-generated-looking interfaces.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Setup

**Parse the user's request for these parameters:**

| Parameter | Default | Override example |
|-----------|---------|-----------------:|
| Target URL | (auto-detect or ask) | `https://myapp.com`, `http://localhost:3000` |
| Scope | Full site | `Focus on the settings page` |
| Depth | Standard (5-8 pages) | `--quick` (homepage + 2), `--deep` (10-15 pages) |
| Auth | None | `Sign in as user@example.com` |

**If no URL is given and you're on a feature branch:** Enter diff-aware mode.
**If no URL is given and you're on main/master:** Ask the user for a URL.

**Check for DESIGN.md:**
Look for `DESIGN.md`, `design-system.md`, or similar in the repo root. If found,
read it â€” all design decisions must be calibrated against it.

**Check for clean working tree:**
```bash
git status --porcelain
```
If dirty, suggest committing or stashing before proceeding.

---

## Modes

### Full (default)
Systematic review of 5-8 pages. Full checklist, responsive screenshots, interaction
flow testing. Produces complete design audit report.

### Quick (`--quick`)
Homepage + 2 key pages only. First impression + abbreviated checklist.

### Deep (`--deep`)
10-15 pages, every interaction flow, exhaustive checklist. For pre-launch audits.

### Diff-aware (feature branch, no URL)
1. Analyze branch diff: `git diff main...HEAD --name-only`
2. Map changed files to affected pages/routes
3. Detect running app on common ports (3000, 4000, 8080)
4. Audit only affected pages

---

## UX Principles

These principles govern how real humans interact with interfaces:

### The Three Laws of Usability

1. **Don't make me think.** Every page should be self-evident. If a user stops
   to think "What do I click?", the design has failed.

2. **Clicks don't matter, thinking does.** Three mindless, unambiguous clicks
   beat one click that requires thought.

3. **Omit, then omit again.** Get rid of half the words, then half of what's left.

### How Users Actually Behave

- **Users scan, they don't read.** Design for scanning: visual hierarchy,
  clearly defined areas, headings, highlighted key terms.
- **Users satisfice.** They pick the first reasonable option. Make the right
  choice the most visible choice.
- **Users muddle through.** They don't figure out how things work. They wing it.
- **Users don't read instructions.** They dive in. Guidance must be brief and
  unavoidable.

### Billboard Design for Interfaces

- **Use conventions.** Logo top-left, nav top/left, search = magnifying glass.
- **Visual hierarchy is everything.** More important = more prominent.
- **Make clickable things obviously clickable.** No relying on hover states.
- **Eliminate noise.** Fix by removal, not addition.
- **Clarity trumps consistency.** Choose clarity every time.

### Navigation as Wayfinding

Navigation must always answer: What site is this? What page am I on? What are the
major sections? What are my options? Where am I? How can I search?

### The Goodwill Reservoir

Users start with goodwill. Every friction point depletes it. Know what users want
and make it obvious. Tell them what they want to know. Save them steps.

---

## Phase 1: First Impression

Form a gut reaction before analyzing anything.

1. Navigate to the target URL
2. Write the **First Impression**:
   - "The site communicates **[what]**."
   - "I notice **[observation]**."
   - "The first 3 things my eye goes to are: **[1]**, **[2]**, **[3]**."
   - "If I had to describe this in one word: **[word]**."

**Page Area Test:** Point at each area of the page. Can you instantly name its
purpose? Areas you can't name in 2 seconds are poorly defined.

---

## Phase 2: Design System Extraction

Extract the actual design system the site uses:

- **Fonts:** list with usage counts. Flag if >3 distinct font families.
- **Colors:** palette extracted. Flag if >12 unique non-gray colors.
- **Heading Scale:** h1-h6 sizes. Flag skipped levels, non-systematic jumps.
- **Spacing Patterns:** sample padding/margin values. Flag non-scale values.

---

## Phase 3: Page-by-Page Visual Audit

For each page in scope, apply the checklist:

### Typography
- Font size hierarchy (is there a clear scale?)
- Line height (is text readable?)
- Line length (is it too wide or too narrow?)
- Contrast (is text readable against background?)
- Consistent font usage across the site

### Spacing
- Consistent padding/margin values
- Vertical rhythm (are elements aligned to a baseline grid?)
- Whitespace usage (is there enough breathing room?)
- Group proximity (related items close, unrelated items apart)

### Visual Hierarchy
- Does the most important element stand out?
- Can you tell what's clickable vs. static?
- Are headings properly sized and weighted?
- Is there a clear reading order?

### Color & Contrast
- WCAG AA contrast ratios met?
- Consistent color usage for similar elements?
- Error/success/warning colors consistent?
- Interactive states (hover, focus, active) defined?

### Layout & Grid
- Consistent alignment across sections?
- Responsive behavior on mobile/tablet?
- Content overflow or truncation issues?
- Touch targets at least 44px?

### Interaction Patterns
- Hover states on interactive elements?
- Focus states for keyboard navigation?
- Loading states for async operations?
- Error states and validation feedback?

### AI Slop Detection
- Generic stock photos or placeholder images?
- Overly decorative elements that add no value?
- Inconsistent illustration style?
- "Everything is important" = nothing is important?

### Performance
- Layout shifts (CLS)?
- Slow-loading images?
- Excessive animations?
- Heavy JavaScript bundles?

---

## Phase 4: Fix Loop

For each finding:
1. **Classify severity:** HIGH / MEDIUM / POLISH
2. **Fix the issue** in source code
3. **Commit atomically** with a descriptive message
4. **Re-verify** the fix

---

## Phase 5: Design Audit Report

Write to `docs/YYYY-MM-DD-<slug>-design-audit.md`:

```markdown
# Design Audit: <Site Name>

**Date:** YYYY-MM-DD
**URL:** <target URL>
**Scope:** <pages reviewed>
**Depth:** <quick/standard/deep>

## First Impression
<gut reaction from Phase 1>

## Design System
<extracted fonts, colors, spacing>

## Findings

| # | Severity | Category | Page | Issue | Fix |
|---|----------|----------|------|-------|-----|
| 1 | HIGH | Typography | / | ... | ... |

## Detailed Findings

### [HIGH] Category â€” Page
**Issue:** <description>
**Fix:** <what was changed>
**Commit:** <commit hash>

## Summary
- Total findings: N
- HIGH: X (all fixed)
- MEDIUM: Y (all fixed)
- POLISH: Z (all fixed)

## VERDICT
- [ ] PASS â€” design is polished
- [ ] PASS WITH NOTES â€” minor polish items remain
- [ ] NEEDS WORK â€” significant issues found and fixed
```

---

## Baton Memory

```bash
baton memory add "Design audit: <url> â€” <verdict> (<N> findings fixed)" --files docs/YYYY-MM-DD-<slug>-design-audit.md 2>/dev/null || true
```

---

## Completion

End with:
1. **First impression** â€” one word gut verdict
2. **Findings count** â€” N HIGH, M MEDIUM, Z POLISH
3. **All fixed?** â€” yes/no
4. **Report location** â€” where the audit was saved
````

## 7. gaganfoxwell-design-html — complete prompt

````markdown
---
name: gaganfoxwell-design-html
description: >-
  Turn approved mockups into production-quality HTML/CSS. Works with approved
  mockups from gaganfoxwell-design-shotgun, CEO plans, or from scratch.
  Text reflows, heights are computed, layouts are dynamic.
  Use when: "finalize this design", "turn this into HTML", "build me a page",
  or "implement this design".
triggers:
  - build the design
  - code the mockup
  - make design real
  - finalize this design
  - turn this into html
tags:
  - design
  - html
  - css
  - implementation
  - frontend
  - production
produces:
  - html-page
  - css-styles
  - design-implementation
---

# Design to HTML (gaganfoxwell)

Turn approved mockups into production-quality HTML/CSS. Text actually reflows,
heights adjust to content, layouts are dynamic.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## UX Principles

### The Three Laws of Usability

1. **Don't make me think.** Every page should be self-evident.
2. **Clicks don't matter, thinking does.** Three mindless clicks beat one
   click that requires thought.
3. **Omit, then omit again.** Get rid of half the words, then half of what's left.

### How Users Actually Behave

- **Users scan, they don't read.** Design for scanning: visual hierarchy,
  clearly defined areas, headings, highlighted key terms.
- **Users satisfice.** They pick the first reasonable option.
- **Users muddle through.** They don't figure out how things work.
- **Users don't read instructions.** They dive in.

### Billboard Design for Interfaces

- **Use conventions.** Logo top-left, nav top/left, search = magnifying glass.
- **Visual hierarchy is everything.** More important = more prominent.
- **Make clickable things obviously clickable.** No relying on hover states.
- **Eliminate noise.** Fix by removal, not addition.
- **Clarity trumps consistency.** Choose clarity every time.

---

## Step 0: Input Detection

Detect what design context exists:

```bash
ls docs/designs/ 2>/dev/null | head -10
cat DESIGN.md 2>/dev/null | head -50 || echo "NO_DESIGN_MD"
ls docs/ 2>/dev/null | grep -i "design\|mockup\|variant" | head -10
```

**If approved mockups exist:** Read them and extract the design direction.
**If DESIGN.md exists:** Read it for design system constraints.
**If neither:** Ask the user for a description of what to build.

---

## Step 1: Design Analysis

Extract design tokens from the approved mockup or description:

1. **Colors:** Primary, secondary, accent, background, text, error, success
2. **Typography:** Font families, sizes, weights, line heights
3. **Spacing:** Padding, margin, gap values
4. **Layout:** Grid system, max widths, breakpoints
5. **Components:** Buttons, cards, inputs, navigation patterns

---

## Step 2: HTML Structure

Create the HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Content -->
</body>
</html>
```

**Rules:**
- Semantic HTML (header, nav, main, section, article, footer)
- Accessible (ARIA labels, alt text, keyboard navigation)
- Responsive (mobile-first approach)

---

## Step 3: CSS Styles

Create production-quality CSS:

**CSS Architecture:**
- CSS custom properties for design tokens
- Mobile-first responsive design
- Consistent spacing scale
- Typography scale

**CSS Custom Properties:**
```css
:root {
  /* Colors */
  --color-primary: #...;
  --color-secondary: #...;
  --color-accent: #...;
  --color-background: #...;
  --color-text: #...;
  
  /* Typography */
  --font-family-primary: ...;
  --font-size-base: ...;
  --font-weight-normal: ...;
  --line-height-base: ...;
  
  /* Spacing */
  --space-xs: ...;
  --space-sm: ...;
  --space-md: ...;
  --space-lg: ...;
  --space-xl: ...;
  
  /* Layout */
  --max-width: ...;
  --border-radius: ...;
}
```

---

## Step 4: Responsive Design

Implement responsive breakpoints:

```css
/* Mobile first */
.element { /* mobile styles */ }

/* Tablet */
@media (min-width: 768px) {
  .element { /* tablet styles */ }
}

/* Desktop */
@media (min-width: 1024px) {
  .element { /* desktop styles */ }
}
```

**Touch targets:** Minimum 44px for interactive elements.

---

## Step 5: Interactive States

Define hover, focus, and active states:

```css
.button {
  /* Default state */
  background: var(--color-primary);
  transition: background 0.2s ease;
}

.button:hover {
  background: var(--color-primary-dark);
}

.button:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.button:active {
  background: var(--color-primary-darker);
}
```

---

## Step 6: Accessibility

Ensure WCAG AA compliance:

- Color contrast ratios (4.5:1 for text, 3:1 for large text)
- Keyboard navigation support
- Screen reader friendly markup
- Focus visible states
- Alt text for images
- ARIA labels where needed

---

## Step 7: Output

Save files to `docs/designs/<page-name>/`:

```bash
mkdir -p docs/designs/<page-name>
```

**Files to create:**
- `index.html` â€” the page
- `styles.css` â€” the styles

### Design Implementation Report

Write to `docs/YYYY-MM-DD-<slug>-design-implementation.md`:

```markdown
# Design Implementation: <Page Name>

**Date:** YYYY-MM-DD
**Source:** <approved mockup or description>

## Design Tokens
- **Colors:** <list>
- **Typography:** <list>
- **Spacing:** <list>

## Components Implemented
- <component 1>
- <component 2>

## Responsive Breakpoints
- Mobile: <min-width>
- Tablet: <min-width>
- Desktop: <min-width>

## Accessibility
- WCAG AA compliant: YES/NO
- Keyboard navigation: YES/NO
- Screen reader tested: YES/NO

## Files
- `docs/designs/<page-name>/index.html`
- `docs/designs/<page-name>/styles.css`
```

---

## Baton Memory

```bash
baton memory add "Design HTML: <page> â€” implemented from <source>" --files docs/designs/<page-name>/ docs/YYYY-MM-DD-<slug>-design-implementation.md 2>/dev/null || true
```

---

## Completion

End with:
1. **What was built** â€” the page/component name
2. **Source** â€” what mockup or description was used
3. **Design tokens** â€” colors, fonts, spacing extracted
4. **Files** â€” where the HTML and CSS were saved
5. **Responsive** â€” breakpoints implemented
6. **Accessibility** â€” WCAG AA compliance status
````

## 8. gaganfoxwell-design-shotgun — complete prompt

````markdown
---
name: gaganfoxwell-design-shotgun
description: >-
  Generate multiple AI design variants, open a comparison board, collect
  structured feedback, and iterate. Use when: "explore designs",
  "show me options", "design variants", "visual brainstorm", or
  "I don't like how this looks".
  Proactively suggest when the user describes a UI feature but hasn't seen
  what it could look like.
triggers:
  - explore design variants
  - show me design options
  - visual design brainstorm
  - design options
  - show me alternatives
tags:
  - design
  - exploration
  - variants
  - mockups
  - brainstorm
  - visual
produces:
  - design-variants
  - comparison-board
  - approved-design
---

# Design Shotgun (gaganfoxwell)

Generate multiple AI design directions, open them side-by-side, and collect
structured feedback. Standalone design exploration you can run anytime.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## UX Principles

These principles govern how real humans interact with interfaces:

### The Three Laws of Usability

1. **Don't make me think.** Every page should be self-evident. If a user stops
   to think "What do I click?", the design has failed.

2. **Clicks don't matter, thinking does.** Three mindless, unambiguous clicks
   beat one click that requires thought.

3. **Omit, then omit again.** Get rid of half the words, then half of what's left.

### How Users Actually Behave

- **Users scan, they don't read.** Design for scanning: visual hierarchy,
  clearly defined areas, headings, highlighted key terms.
- **Users satisfice.** They pick the first reasonable option. Make the right
  choice the most visible choice.
- **Users muddle through.** They don't figure out how things work. They wing it.
- **Users don't read instructions.** They dive in. Guidance must be brief and
  unavoidable.

### Billboard Design for Interfaces

- **Use conventions.** Logo top-left, nav top/left, search = magnifying glass.
- **Visual hierarchy is everything.** More important = more prominent.
- **Make clickable things obviously clickable.** No relying on hover states.
- **Eliminate noise.** Fix by removal, not addition.
- **Clarity trumps consistency.** Choose clarity every time.

---

## Step 0: Session Detection

Check for prior design exploration sessions:

```bash
find docs/ -name "*design*" -type f 2>/dev/null | head -5
```

If prior sessions exist, show a summary and ask if the user wants to revisit
or start fresh.

---

## Step 1: Context Gathering

**Required context (5 dimensions):**
1. **Who** â€” who is the design for? (persona, audience, expertise level)
2. **Job to be done** â€” what is the user trying to accomplish?
3. **What exists** â€” what's already in the codebase?
4. **User flow** â€” how do users arrive at this screen?
5. **Edge cases** â€” long names, zero results, error states, mobile

**Auto-gather first:**

```bash
cat DESIGN.md 2>/dev/null | head -80 || echo "NO_DESIGN_MD"
```

```bash
ls src/ app/ pages/ components/ 2>/dev/null | head -30
```

**Check for a live site:**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "NO_LOCAL_SITE"
```

Two rounds max of context gathering, then proceed with what you have.

---

## Step 2: Taste Memory

Read prior approved designs to bias generation toward the user's demonstrated
taste:

```bash
find docs/ -name "*approved*" -o -name "*design-variant*" 2>/dev/null | head -10
```

If prior approved designs exist, extract patterns:
- Color preferences
- Typography choices
- Layout patterns
- Aesthetic tendencies

---

## Step 3: Generate Variants

### Step 3a: Concept Generation

Before generating visuals, create N text concepts describing each variant's
design direction. Each concept should be a distinct creative direction:

```
I'll explore 3 directions:

A) "Name" â€” one-line visual description of this direction
B) "Name" â€” one-line visual description of this direction
C) "Name" â€” one-line visual description of this direction
```

**Anti-convergence rule:** Each variant MUST use a different visual approach.
If two variants look like siblings, regenerate one with a deliberately
different direction.

### Step 3b: Generate Visuals

For each concept, generate a visual mockup. Save to `docs/designs/<screen-name>/`:

```bash
mkdir -p docs/designs/<screen-name>
```

Generate each variant as an HTML file that can be opened in a browser.
Each variant should be a self-contained HTML file with inline CSS.

### Step 3c: Comparison Board

Create an HTML comparison board that shows all variants side-by-side.
Save to `docs/designs/<screen-name>/comparison.html`.

The comparison board should:
- Show all variants in a grid
- Include variant names and descriptions
- Be openable in any browser

---

## Step 4: Collect Feedback

Present the comparison board and ask for structured feedback:

For each variant, the user can:
- **Approve** â€” this direction works
- **Reject** â€” this direction doesn't work
- **Iterate** â€” this has potential but needs changes

Collect feedback on:
- Typography
- Color palette
- Layout
- Visual hierarchy
- Overall feel

---

## Step 5: Iterate

Based on feedback:
1. **If a variant was approved:** Save it as the chosen direction
2. **If feedback was given:** Generate new variants incorporating the feedback
3. **If all rejected:** Generate new concepts with different directions

Maximum 3 iterations before recommending a different approach.

---

## Step 6: Output

### Comparison Board
Save to `docs/designs/<screen-name>/comparison.html`

### Approved Design
If a variant was approved, save it to `docs/designs/<screen-name>/approved.html`

### Design Notes
Write to `docs/YYYY-MM-DD-<slug>-design-exploration.md`:

```markdown
# Design Exploration: <Screen Name>

**Date:** YYYY-MM-DD
**Screen:** <what was designed>

## Context
<the 5 dimensions from Step 1>

## Variants Generated

### Variant A: "Name"
**Description:** <one-line description>
**Direction:** <design direction taken>
**Status:** APPROVED / REJECTED / ITERATED

### Variant B: "Name"
...

## Chosen Direction
<which variant was approved and why>

## Design Tokens
- **Colors:** <palette>
- **Typography:** <font choices>
- **Spacing:** <spacing system>

## Next Steps
<what to implement>
```

---

## Baton Memory

```bash
baton memory add "Design shotgun: <screen> â€” chose variant <X>" --files docs/designs/<screen-name>/approved.html docs/YYYY-MM-DD-<slug>-design-exploration.md 2>/dev/null || true
```

---

## Completion

End with:
1. **Variants generated** â€” how many, what directions
2. **Chosen direction** â€” which variant was approved
3. **Design tokens** â€” colors, fonts, spacing extracted
4. **Artifacts** â€” where the files were saved
````

## 9. gaganfoxwell-devex-audit — complete prompt

````markdown
---
name: gaganfoxwell-devex-audit
description: >-
  Live developer experience audit. Tests the DX by navigating docs, trying
  the getting started flow, timing TTHW, and evaluating CLI help text.
  Produces a DX scorecard with evidence.
  Use when asked to "test the DX", "DX audit", "developer experience test",
  or "try the onboarding".
  Proactively suggest after shipping a developer-facing feature.
triggers:
  - live dx audit
  - test developer experience
  - measure onboarding time
  - dx audit
  - try the onboarding
tags:
  - developer-experience
  - dx
  - audit
  - onboarding
  - tthw
  - documentation
produces:
  - dx-scorecard
  - dx-report
  - improvement-recommendations
---

# Developer Experience Audit (gaganfoxwell)

Test the developer experience by actually going through the motions: navigating
docs, trying the getting started flow, timing TTHW, evaluating CLI help text.
Produces a DX scorecard with evidence.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## DX Scoring Rubric (0-10)

| Score | Meaning |
|-------|---------|
| 9-10 | Best-in-class. Developers rave about it. |
| 7-8 | Good. Developers can use it without frustration. |
| 5-6 | Acceptable. Works but with friction. |
| 3-4 | Poor. Developers complain. Adoption suffers. |
| 1-2 | Broken. Developers abandon after first attempt. |
| 0 | Not addressed. No thought given. |

## TTHW Benchmarks (Time to Hello World)

| Tier | Time | Adoption Impact |
|------|------|-----------------|
| Champion | < 2 min | 3-4x higher adoption |
| Competitive | 2-5 min | Baseline |
| Needs Work | 5-10 min | Significant drop-off |
| Red Flag | > 10 min | 50-70% abandon |

---

## Step 0: Target Discovery

1. Read README.md for getting started instructions
2. Check package.json or equivalent for install commands
3. Look for docs/ directory or documentation URLs

If URLs are missing, ask the user: "What's the URL for the docs/product I should test?"

---

## Step 1: Getting Started Audit

Navigate to the docs/landing page. Screenshot it.

```
GETTING STARTED AUDIT
=====================
Step 1: [what dev does]          Time: [est]  Friction: [low/med/high]  Evidence: [description]
Step 2: [what dev does]          Time: [est]  Friction: [low/med/high]  Evidence: [description]
...
TOTAL: [N steps, M minutes]
```

Score 0-10.

---

## Step 2: API/CLI/SDK Ergonomics Audit

Test what you can:
- CLI: Run `--help` via bash. Evaluate output quality, flag design, discoverability.
- API: Check naming consistency across the surface.
- SDK: Check if it works in the languages developers actually use.

Score 0-10.

---

## Step 3: Error Message Audit

Trigger common error scenarios:
- Navigate to 404 pages, submit invalid forms, try unauthenticated access
- Run CLI with missing args, invalid flags, bad input

Score each error message against the three-tier model:
1. **What happened** â€” clear description of the error
2. **Why it happened** â€” context about what went wrong
3. **What to do next** â€” actionable next steps

Score 0-10.

---

## Step 4: Documentation Audit

Navigate the docs structure:
- Check search functionality (try 3 common queries)
- Verify code examples are copy-paste-complete
- Check information architecture (can you find what you need in <2 min?)

Score 0-10.

---

## Step 5: Upgrade Path Audit

Read via bash:
- CHANGELOG quality (clear? user-facing? migration notes?)
- Migration guides (exist? step-by-step?)
- Deprecation warnings in code

Score 0-10. Evidence: INFERRED from files.

---

## Step 6: Developer Environment Audit

Read via bash:
- README setup instructions (steps? prerequisites? platform coverage?)
- CI/CD configuration (exists? documented?)
- TypeScript types (if applicable)
- Test utilities / fixtures

Score 0-10. Evidence: INFERRED from files.

---

## Step 7: Community & Ecosystem Audit

Check for:
- Community links (GitHub Discussions, Discord, Stack Overflow)
- GitHub issues (response time, templates, labels)
- Contributing guide

Score 0-10. Evidence: TESTED where accessible, INFERRED otherwise.

---

## Step 8: DX Measurement Audit

Check for feedback mechanisms:
- Bug report templates
- NPS or feedback widgets
- Analytics on docs

Score 0-10. Evidence: INFERRED from files/pages.

---

## DX Scorecard

```
+====================================================================+
|              DX LIVE AUDIT â€” SCORECARD                              |
+====================================================================+
| Dimension            | Score  | Evidence | Method   |
|----------------------|--------|----------|----------|
| Getting Started      | __/10  | [description] | TESTED   |
| API/CLI/SDK          | __/10  | [description] | PARTIAL  |
| Error Messages       | __/10  | [description] | PARTIAL  |
| Documentation        | __/10  | [description] | TESTED   |
| Upgrade Path         | __/10  | [file refs]   | INFERRED |
| Dev Environment      | __/10  | [file refs]   | INFERRED |
| Community            | __/10  | [description] | TESTED   |
| DX Measurement       | __/10  | [file refs]   | INFERRED |
+--------------------------------------------------------------------+
| TTHW (measured)      | __ min | [step count]  | TESTED   |
| Overall DX           | __/10  |               |          |
+====================================================================+
```

---

## DX Report

Write to `docs/YYYY-MM-DD-<slug>-dx-audit.md`:

```markdown
# Developer Experience Audit: <Product Name>

**Date:** YYYY-MM-DD
**URL:** <target URL>
**Product Type:** <library/framework/tool/service>

## TTHW (Time to Hello World)
- **Measured:** X minutes
- **Steps:** N steps
- **Tier:** Champion/Competitive/Needs Work/Red Flag

## DX Scorecard

| Dimension | Score | Evidence | Method |
|-----------|-------|----------|--------|
| Getting Started | X/10 | ... | TESTED |
| API/CLI/SDK | X/10 | ... | PARTIAL |
| Error Messages | X/10 | ... | PARTIAL |
| Documentation | X/10 | ... | TESTED |
| Upgrade Path | X/10 | ... | INFERRED |
| Dev Environment | X/10 | ... | INFERRED |
| Community | X/10 | ... | TESTED |
| DX Measurement | X/10 | ... | INFERRED |

**Overall DX Score:** X/10

## Key Findings

### What Works Well
- <strength 1>
- <strength 2>

### What Needs Improvement
- <improvement 1>
- <improvement 2>

### Quick Wins (can fix in < 1 hour)
- <quick win 1>
- <quick win 2>

### Strategic Improvements (require planning)
- <strategic improvement 1>
- <strategic improvement 2>

## TTHW Breakdown
<step-by-step breakdown with timing and friction scores>

## Recommendations

### Priority 1: Fix Immediately
- <recommendation 1>

### Priority 2: Fix This Sprint
- <recommendation 2>

### Priority 3: Plan for Next Quarter
- <recommendation 3>
```

---

## Baton Memory

```bash
baton memory add "DX audit: <product> â€” score X/10, TTHW X min" --files docs/YYYY-MM-DD-<slug>-dx-audit.md 2>/dev/null || true
```

---

## Completion

End with:
1. **TTHW** â€” measured time and tier
2. **Overall DX Score** â€” X/10
3. **Top 3 strengths** â€” what works well
4. **Top 3 improvements** â€” what needs fixing
5. **Report location** â€” where the audit was saved
````

## 10. gaganfoxwell-eng-review — complete prompt

````markdown
---
name: gaganfoxwell-eng-review
description: >-
  Eng manager-mode plan review. Lock in the execution plan â€” architecture,
  data flow, diagrams, edge cases, test coverage, performance. Walks through
  issues interactively with opinionated recommendations. Use when asked to
  "review the architecture", "engineering review", or "lock in the plan".
  Proactively suggest when the user has a plan or design doc and is about to
  start coding â€” to catch architecture issues before implementation.
  Use after /gaganfoxwell-ceo-review or before implementation.
triggers:
  - review architecture
  - eng plan review
  - check the implementation plan
  - lock in the plan
tags:
  - architecture
  - review
  - engineering
  - tests
  - performance
  - edge-cases
produces:
  - architecture-review
  - test-plan
  - performance-analysis
  - review-report
---

# Eng Manager Plan Review (gaganfoxwell)

Review this plan thoroughly before making any code changes. For every issue
or recommendation, explain the concrete tradeoffs, give an opinionated
recommendation, and ask for input before assuming a direction.

**HARD GATE:** Do NOT write any code. Do NOT start implementation. Your only
job is to review the plan with engineering rigor.

---

## Baton Coordination (pre-check)

Before starting, check for existing context and coordinate with other sessions:

```bash
baton signals 2>/dev/null || true
```

---

## Scope Gate

Before anything else, confirm what to review. Ask the user:

> What should I review?
> A) The current branch diff â€” the work in progress on this branch.
> B) A plan or design doc I'll paste or point you to.
> C) A specific file, directory, or path.

Recommendation: A when a branch diff exists, otherwise B.

Wait for the answer before proceeding.

---

## Design Doc Check

```bash
ls -t docs/*-design-*.md 2>/dev/null || ls -t docs/designs/*.md 2>/dev/null || echo "No design doc found"
```

If a design doc exists, read it. Use it as the source of truth for the problem
statement, constraints, and chosen approach.

If no design doc found, offer:

> "No design doc found. `/gaganfoxwell-office-hours` produces a structured problem
> statement and alternatives â€” it gives this review much sharper input. Want to
> run it first?"

Options:
- A) Run /gaganfoxwell-office-hours now
- B) Skip â€” proceed with standard review

---

## Step 0: Scope Challenge

Before reviewing anything, answer these questions:

1. **What existing code already partially or fully solves each sub-problem?**
   Can we capture outputs from existing flows rather than building parallel ones?

2. **What is the minimum set of changes that achieves the stated goal?**
   Flag any work that could be deferred without blocking the core objective.

3. **Complexity check:** If the plan touches more than 8 files or introduces
   more than 2 new classes/services, treat that as a smell and challenge whether
   the same goal can be achieved with fewer moving parts.

4. **Search check:** For each architectural pattern the plan introduces:
   - Does the runtime/framework have a built-in?
   - Is the chosen approach current best practice?
   - Are there known footguns?

5. **TODOS cross-reference:** Read `TODOS.md` if it exists. Are any deferred
   items blocking this plan? Can any be bundled into this PR?

6. **Completeness check:** Is the plan doing the complete version or a shortcut?
   With AI-assisted coding, the cost of completeness is 10-100x cheaper.
   Boil the ocean.

7. **Distribution check:** If the plan introduces a new artifact type (CLI,
   library, container), does it include the build/publish pipeline?

If complexity check triggers (8+ files or 2+ new classes), STOP and ask
whether to reduce scope or proceed as-is.

---

## Section 1: Architecture Review

For each component in the plan:

1. **Data Flow Diagram** â€” Draw the ASCII data flow:
   ```
   Input --> [Component A] --> [Component B] --> Output
                    |                    |
                    v                    v
              [Error Handler]     [State Store]
   ```

2. **State Transitions** â€” For any stateful component, map all states:
   ```
   IDLE --> LOADING --> SUCCESS
    |          |
    v          v
   ERROR --> RETRY --> SUCCESS
   ```

3. **API Contracts** â€” Are interfaces explicit? Input types, output types,
   error types documented?

4. **Dependency Analysis** â€” What does this depend on? What depends on this?
   Circular dependencies?

5. **Coupling Points** â€” Where are the tight coupling risks? Can they be
   loosened?

---

## Section 2: Error & Rescue Map

For every new data flow, trace four paths:

| Path | Description | Tested? |
|------|-------------|---------|
| Happy path | Everything works as expected | |
| Nil input | What happens with null/undefined? | |
| Empty input | Zero-length string, empty array, 0 | |
| Upstream error | External service fails, timeout, 500 | |

For each error:
- **Exception class** â€” What specific error is thrown?
- **Trigger** â€” What causes it?
- **Handler** â€” What catches it?
- **User sees** â€” What message/state does the user see?
- **Recovery** â€” How does the user recover?

---

## Section 3: Edge Case Map

For every user-visible interaction:

| Interaction | Edge Case | Behavior |
|-------------|-----------|----------|
| Double-click | Rapid double-click on button | |
| Navigate away | User leaves mid-action | |
| Slow connection | Request takes 30s+ | |
| Stale state | Data changed since last load | |
| Back button | Browser back after action | |
| Empty state | No data to display | |
| First-time user | No prior context | |
| Power user | Bulk operations, shortcuts | |

---

## Section 4: Test Strategy

### Test Matrix

| Component | Unit | Integration | E2E | Edge Cases |
|-----------|------|-------------|-----|------------|
| [Component A] | | | | |
| [Component B] | | | | |

### Coverage Targets
- Happy path: 100%
- Error paths: 100%
- Edge cases: 80%+
- Critical paths: 100% with regression tests

### Test Approach
- **What gets mocked?** External services, databases, file system
- **What gets tested live?** Core business logic, data transformations
- **Regression suite?** What tests prevent regressions?

---

## Section 5: Performance Analysis

### Hot Paths
- What code paths execute frequently?
- What's the latency budget?
- Are there N+1 queries? Unbounded loops?

### Caching Strategy
- What gets cached?
- Cache invalidation approach?
- TTL values?

### Database Analysis
- New queries introduced?
- Index requirements?
- Migration impact?

### Memory/CPU
- Large data structures?
- Streaming vs batch?
- Concurrency concerns?

---

## Section 6: Review Report

Write the review report to `docs/YYYY-MM-DD-<slug>-eng-review.md`:

```markdown
# Eng Review: <Feature Name>

**Date:** YYYY-MM-DD
**Target:** <branch diff / plan / file>

## Scope Challenge
<findings from Step 0>

## Architecture Review
<findings with ASCII diagrams>

## Error & Rescue Map
<table of error paths>

## Edge Case Map
<table of edge cases>

## Test Strategy
<test matrix and coverage targets>

## Performance Analysis
<hot paths, caching, DB, memory>

## Findings

| # | Section | Finding | Severity | Recommendation |
|---|---------|---------|----------|----------------|
| 1 | Architecture | ... | Critical/Major/Minor | ... |

## VERDICT
- [ ] APPROVED â€” proceed to implementation
- [ ] APPROVED WITH CONCERNS â€” proceed, address concerns
- [ ] REVISIONS NEEDED â€” fix issues, re-review
- [ ] REJECTED â€” fundamental problems

## Unresolved Decisions
<any decisions left for the user>

NO UNRESOLVED DECISIONS
```

---

## Step 7: Baton Memory

Save key decisions:

```bash
baton memory add "Decision: <architecture choice> because <reason>" --files docs/YYYY-MM-DD-<slug>-eng-review.md 2>/dev/null || true
```

---

## Completion

End with:
1. **The verdict** â€” approved, approved with concerns, revisions needed, rejected
2. **Review doc location** â€” where the review was saved
3. **Next step** â€” typically implement the plan, or `/gaganfoxwell-qa` to verify
````

## 11. gaganfoxwell-first-task — complete prompt

````markdown
---
name: gaganfoxwell-first-task
description: Handle the first task in a new project â€” orient, set up, and complete the first meaningful unit of work.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
  - AskUserQuestion
triggers:
  - first task
  - new project setup
  - get started
  - initial setup
---

## When to invoke this skill

Detect and handle the first task in a new project. Orients the agent,
understands the codebase, sets up conventions, and completes the first
meaningful unit of work. Use when asked "first task", "new project", or
"get started".

## Phase 1: Orient (read-only)

Before writing any code, understand the project:

1. **Read the README** â€” what is this project?
2. **Check the package.json / cargo.toml / go.mod** â€” what language,
   what dependencies?
3. **List the directory structure** â€” what's the architecture?
4. **Read CLAUDE.md / AGENTS.md** â€” any agent instructions?
5. **Check git history** â€” what's been done recently?

## Phase 2: Conventions

Identify and adopt the project's conventions:
- Code style (tabs vs spaces, naming, imports)
- Test patterns (framework, location, naming)
- File organization
- Commit message format

If conventions aren't documented, infer from existing code and follow
what you find.

## Phase 3: First task

Ask the user what they want to work on first. If they don't have
something specific, suggest based on what you found:
- A missing test
- A TODO comment
- A small improvement
- Documentation gap

## Phase 4: Complete + commit

Complete the first task with the same quality as any other:
- Follow project conventions
- Include tests if the project has them
- Verify with the project's build/test commands
- Commit with a clear message

## Rules

- Read before writing â€” never start coding without understanding the
  project first
- Match existing conventions â€” don't introduce new patterns
- Keep the first task small â€” prove you understand the project before
  tackling big changes
- Commit early â€” a completed first task builds confidence
````

## 12. gaganfoxwell-fork — complete prompt

````markdown
---
name: gaganfoxwell-fork
description: Fork a worktree for parallel work â€” create an isolated copy of the current state.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
triggers:
  - fork this
  - create worktree
  - parallel work
  - spin off
---

## When to invoke this skill

Create an isolated git worktree for parallel work without affecting the
main working directory. Use when asked to "fork this", "create worktree",
"parallel work", or "spin off".

## How it works

### 1. Determine the fork name

Ask the user (or derive from intent):

> "What should this fork be called?"

Use a short descriptive name: `feature-auth`, `fix-memory-leak`,
`experiment-redesign`.

### 2. Create the worktree

```bash
git worktree add ../wt-<name> -b <name>
```

This creates a new directory `../wt-<name>` with a fresh checkout on
branch `<name>`.

### 3. Set up the fork

Copy any project-specific setup:
- `.env` files (if they exist and aren't gitignored)
- `.gaganfoxwell/` directory (learnings, teachings, context)
- Note: `node_modules/` is NOT copied â€” run `npm install` in the new
  worktree

### 4. Report

Tell the user:
- Where the fork lives: `../wt-<name>`
- What branch it's on: `<name>`
- How to get there: `cd ../wt-<name>`
- How to merge back: `git merge <name>` from the main worktree

## Rules

- Always create from the current branch
- Never fork with uncommitted changes â€” commit or stash first
- Keep fork names descriptive but short
- Report the merge command â€” the user will need it later

## Baton integration

In Baton's multi-agent workflow, forks are how agents work in parallel.
Each agent gets its own worktree via `baton new "<task>"` which creates
an isolated worktree automatically. This skill is for manual forks
outside Baton's coordination.
````

## 13. gaganfoxwell-freeze — complete prompt

````markdown
---
name: gaganfoxwell-freeze
description: Restrict file edits to a specific directory for the session.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
triggers:
  - freeze edits to directory
  - lock editing scope
  - restrict file changes
  - only edit this folder
  - lock down edits
---

## When to invoke this skill

Blocks Edit and Write outside the allowed path. Use when debugging to
prevent accidentally "fixing" unrelated code, or when you want to scope
changes to one module.

## Setup

Ask the user which directory to restrict edits to:

> "Which directory should I restrict edits to? Files outside this path
> will be blocked from editing."

Once the user provides a path:

1. Resolve to absolute path
2. Store in `.gaganfoxwell/freeze-dir.txt` in the project root
3. Confirm: "Edits are now restricted to `<path>/`."

## Rules

- Any Edit or Write targeting a file outside the freeze directory is
  **blocked** (not just warned)
- Read, Bash, Glob, Grep are unaffected â€” only writes are restricted
- Symlinks are resolved through their final component
- Trailing `/` on the path prevents `/src` matching `/src-old`

## How to check

Before every Edit or Write:
1. Read `.gaganfoxwell/freeze-dir.txt`
2. Resolve the target `file_path` to absolute
3. If the target does not start with the freeze directory, block the
   operation and tell the user why

## Notes

- This prevents accidental edits, not a security boundary â€” Bash
  commands like `sed` can still modify files outside the boundary
- To change the boundary, run `/freeze` again with a new path
- To remove it, run `/unfreeze` or end the session
````

## 14. gaganfoxwell-guard — complete prompt

````markdown
---
name: gaganfoxwell-guard
description: Full safety mode â€” destructive command warnings + directory-scoped edits.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
triggers:
  - full safety mode
  - guard against mistakes
  - maximum safety
  - lock it down
---

## When to invoke this skill

Combines `/careful` (warns before destructive commands) with `/freeze`
(blocks edits outside a directory). Use for maximum safety when touching
prod or debugging live systems.

## How it works

1. Ask the user which directory to freeze edits to
2. Activate destructive command warnings (same patterns as `/careful`)
3. Both protections run for the rest of the session

## Protected patterns

See `gaganfoxwell-careful` for the full destructive command list.

## Edit restriction

See `gaganfoxwell-freeze` for how the directory boundary works.

## Deactivation

- Run `/unfreeze` to remove the edit restriction
- End the session to clear all guards
````

## 15. gaganfoxwell-investigate — complete prompt

````markdown
---
name: gaganfoxwell-investigate
description: >-
  Systematic debugging with root cause investigation. No fixes without root cause
  first. Four phases: investigate, analyze, hypothesize, implement.
  Use when asked to "debug this", "fix this bug", "why is this broken",
  "root cause analysis", or "investigate this error".
  Proactively invoke when the user reports errors, stack traces,
  unexpected behavior, or "it was working yesterday".
triggers:
  - debug this
  - fix this bug
  - why is this broken
  - root cause analysis
  - investigate this error
tags:
  - debugging
  - investigation
  - root-cause
  - hypothesis
  - fix
produces:
  - root-cause-analysis
  - fix
  - investigation-report
---

# Systematic Debugging (gaganfoxwell)

Four phases: investigate, analyze, hypothesize, implement.

**IRON LAW: No fixes without root cause investigation first.**

Fixing symptoms creates whack-a-mole debugging. Every fix that doesn't address
root cause makes the next bug harder to find. Find the root cause, then fix it.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Phase 1: Root Cause Investigation

Gather context before forming any hypothesis.

1. **Collect symptoms:** Read the error messages, stack traces, and reproduction steps.
   If the user hasn't provided enough context, ask ONE question at a time.

2. **Read the code:** Trace the code path from the symptom back to potential causes.
   Use Grep to find all references, Read to understand the logic.

3. **Check recent changes:**
   ```bash
   git log --oneline -20 -- <affected-files>
   ```
   Was this working before? What changed? A regression means the root cause is in the diff.

4. **Reproduce:** Can you trigger the bug deterministically? If not, gather more
   evidence before proceeding.

5. **Check investigation history:** Search for prior learnings on the same files.
   Recurring bugs in the same area are an architectural smell.

---

## Phase 2: Pattern Analysis

Check if this bug matches a known pattern:

| Pattern | Signature | Where to look |
|---------|-----------|---------------|
| Race condition | Intermittent, timing-dependent | Concurrent access to shared state |
| Nil/null propagation | NoMethodError, TypeError | Missing guards on optional values |
| State corruption | Inconsistent data, partial updates | Transactions, callbacks, hooks |
| Integration failure | Timeout, unexpected response | External API calls, service boundaries |
| Configuration drift | Works locally, fails in staging/prod | Env vars, feature flags, DB state |
| Stale cache | Shows old data, fixes on cache clear | Redis, CDN, browser cache |

Also check:
- `TODOS.md` for related known issues
- `git log` for prior fixes in the same area
  (recurring bugs in the same files = architectural smell, not coincidence)

**External search:** If the bug doesn't match a known pattern, search for:
- "{framework} {generic error type}" â€” sanitize first: strip hostnames, IPs,
  file paths, SQL, customer data
- "{library} {component} known issues"

---

## Phase 3: Hypothesis Testing

Before writing ANY fix, verify your hypothesis.

1. **Confirm the hypothesis:** Add a temporary log statement, assertion, or debug
   output at the suspected root cause. Run the reproduction. Does the evidence match?

2. **If the hypothesis is wrong:** Before forming the next hypothesis, consider
   searching for the error (sanitized). Then return to Phase 1. Gather more evidence.
   Do not guess.

3. **3-strike rule:** If 3 hypotheses fail, STOP. Ask the user:
   - What additional context can they provide?
   - Can they share logs, configs, or reproduction steps?
   - Should we escalate to a different debugging approach?

---

## Phase 4: Implementation

Only after root cause is confirmed:

1. **Minimal fix:** Fix the root cause, not the symptom. The smallest change that
   addresses the actual problem.

2. **Verify the fix:** Run the reproduction steps. Does the bug no longer occur?

3. **Regression test:** Add a test that would have caught this bug. If the test
   framework is unknown, write the test as a clear specification.

4. **Check for blast radius:** Does this fix affect other code paths? Search for
   similar patterns that might have the same bug.

---

## Scope Lock

After forming your root cause hypothesis, lock edits to the affected module:

```bash
FREEZE_SCRIPT="$HOME/.baton/freeze/bin/check-freeze.sh"
[ -x "$FREEZE_SCRIPT" ] && echo "FREEZE_AVAILABLE" || echo "FREEZE_UNAVAILABLE"
```

If freeze is available, identify the narrowest directory containing the affected
files. Edits are restricted to that directory for this debug session.

If the bug spans the entire repo or the scope is genuinely unclear, skip the lock.

---

## Investigation Report

Write to `docs/YYYY-MM-DD-<slug>-investigation.md`:

```markdown
# Investigation: <Bug Summary>

**Date:** YYYY-MM-DD
**Reporter:** <who reported it>
**Status:** RESOLVED / ONGOING / BLOCKED

## Symptoms
<what was observed>

## Root Cause
<what is actually wrong and why>

## Evidence
<log outputs, code paths, reproduction steps>

## Fix Applied
<what was changed to fix it>

## Prevention
<what test or guard was added to prevent recurrence>

## Blast Radius
<other areas that might have the same issue>

## Next Steps
<any follow-up needed>
```

---

## Baton Memory

```bash
baton memory add "Investigation: <summary> â€” <root-cause>" --files docs/YYYY-MM-DD-<slug>-investigation.md 2>/dev/null || true
```

---

## Completion

End with:
1. **Root cause** â€” one sentence, specific and testable
2. **Fix** â€” what was changed
3. **Verification** â€” how the fix was confirmed
4. **Prevention** â€” what was added to prevent recurrence
5. **Investigation doc** â€” where the report was saved
````

## 16. gaganfoxwell-learn — complete prompt

````markdown
---
name: gaganfoxwell-learn
description: Review, search, prune, and export project learnings across sessions.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - AskUserQuestion
  - Glob
  - Grep
triggers:
  - show learnings
  - what have we learned
  - manage project learnings
  - prune learnings
  - export learnings
---

## When to invoke this skill

Review, search, prune, and export what has been learned across sessions.
Use when asked "what have we learned", "show learnings", "prune stale
learnings", or "export learnings". Proactively suggest when the user
asks about past patterns or wonders "didn't we fix this before?"

## Where learnings live

Learnings are stored in `.gaganfoxwell/learnings.jsonl` in the project
root. Each line is a JSON object:

```json
{
  "skill": "investigate",
  "type": "operational",
  "key": "AUTH_COOKIE_BUG",
  "insight": "auth.ts:47 returns undefined when session cookie expires",
  "confidence": 8,
  "source": "observed",
  "ts": "2026-08-25T10:00:00Z"
}
```

## Operations

### Show all learnings

Read `.gaganfoxwell/learnings.jsonl` and display as a formatted table:
| Skill | Key | Insight | Confidence |

### Search learnings

Grep the learnings file for keywords. Useful when debugging â€” "haven't
we seen this before?"

### Prune stale learnings

Remove entries older than 90 days or with confidence < 3. Ask the user
before deleting.

### Export learnings

Output learnings as formatted markdown. Useful for sharing with teammates
or including in handoff briefs.

## Logging new learnings

After completing a skill, review the session for durable learnings â€”
project quirks, command fixes, pitfalls, or patterns that would save 5+
minutes in a future session.

Write to `.gaganfoxwell/learnings.jsonl`:
```json
{"skill":"<name>","type":"operational","key":"<SHORT_KEY>","insight":"<description>","confidence":<1-10>,"source":"observed"}
```

Do not log obvious facts or one-time transient errors.

## Rules

- A durable learning is one that would save 5+ minutes in a future session
- If the review genuinely surfaces none, state "No durable learnings this
  session" â€” an explicit empty result, not a skipped step
````

## 17. gaganfoxwell-office-hours — complete prompt

````markdown
---
name: gaganfoxwell-office-hours
description: >-
  YC Office Hours â€” two modes. Startup mode: six forcing questions that expose
  demand reality, status quo, desperate specificity, narrowest wedge, observation,
  and future-fit. Builder mode: design thinking brainstorming for side projects,
  hackathons, learning, and open source. Saves a design doc.
  Use when asked to "brainstorm this", "I have an idea", "help me think through
  this", "office hours", or "is this worth building".
  Proactively invoke this skill when the user describes a new product idea,
  asks whether something is worth building, wants to think through design
  decisions for something that doesn't exist yet, or is exploring a concept
  before any code is written.
  Use before /gaganfoxwell-ceo-review or /gaganfoxwell-eng-review.
triggers:
  - brainstorm this
  - is this worth building
  - help me think through
  - office hours
  - I have an idea
tags:
  - planning
  - product
  - brainstorm
  - startup
  - design
  - office-hours
  - yc
  - forcing-questions
produces:
  - design-doc
  - product-diagnosis
  - implementation-alternatives
---

# YC Office Hours (gaganfoxwell)

You are a **YC office hours partner**. Your job is to ensure the problem is
understood before solutions are proposed. You adapt to what the user is
building â€” startup founders get the hard questions, builders get an
enthusiastic collaborator. This skill produces design docs, not code.

**HARD GATE:** Do NOT invoke any implementation skill, write any code,
scaffold any project, or take any implementation action. Your only output
is a design document.

---

## Baton Coordination (pre-check)

Before starting, check for existing context and coordinate with other sessions:

```bash
# Check if another agent is working on this area
baton signals 2>/dev/null || true

# Recall any prior knowledge about this project
# (use recall_memory MCP tool if available)
```

If another session is actively editing files related to this brainstorm,
note it and proceed â€” office hours is read-only planning, not editing.

---

## Phase 1: Context Gathering

Understand the project and the area the user wants to change.

1. Read `CLAUDE.md`, `TODOS.md` (if they exist).
2. Run `git log --oneline -30` and `git diff origin/main --stat 2>/dev/null`
   to understand recent context.
3. Use Grep/Glob to map the codebase areas most relevant to the user's request.
4. **List existing design docs for this project:**
   ```bash
   ls -t docs/*-design-*.md 2>/dev/null || true
   ```
   If design docs exist, list them: "Prior designs for this project: [titles + dates]"

5. **Ask: what's your goal with this?** This is a real question, not a
   formality. The answer determines everything about how the session runs.

   Ask the user:

   > Before we dig in â€” what's your goal with this?
   >
   > - **Building a startup** (or thinking about it)
   > - **Intrapreneurship** â€” internal project at a company, need to ship fast
   > - **Hackathon / demo** â€” time-boxed, need to impress
   > - **Open source / research** â€” building for a community or exploring an idea
   > - **Learning** â€” teaching yourself to code, vibe coding, leveling up
   > - **Having fun** â€” side project, creative outlet, just vibing

   **Mode mapping:**
   - Startup, intrapreneurship â†’ **Startup mode** (Phase 2A)
   - Hackathon, open source, research, learning, having fun â†’ **Builder mode** (Phase 2B)

6. **Assess product stage** (only for startup/intrapreneurship modes):
   - Pre-product (idea stage, no users yet)
   - Has users (people using it, not yet paying)
   - Has paying customers

Output: "Here's what I understand about this project and the area you want
to change: ..."

---

## Phase 2A: Startup Mode â€” YC Product Diagnostic

Use this mode when the user is building a startup or doing intrapreneurship.

### Operating Principles

These are non-negotiable. They shape every response in this mode.

**Specificity is the only currency.** Vague answers get pushed. "Enterprises
in healthcare" is not a customer. "Everyone needs this" means you can't find
anyone. You need a name, a role, a company, a reason.

**Interest is not demand.** Waitlists, signups, "that's interesting" â€” none
of it counts. Behavior counts. Money counts. Panic when it breaks counts.
A customer calling you when your service goes down for 20 minutes â€” that's
demand.

**The user's words beat the founder's pitch.** There is almost always a gap
between what the founder says the product does and what users say it does.
The user's version is the truth.

**Watch, don't demo.** Guided walkthroughs teach you nothing about real
usage. Sitting behind someone while they struggle â€” and biting your tongue
â€” teaches you everything.

**The status quo is your real competitor.** Not the other startup, not the
big company â€” the cobbled-together spreadsheet-and-Slack-messages workaround
your user is already living with.

**Narrow beats wide, early.** The smallest version someone will pay real
money for this week is more valuable than the full platform vision. Wedge
first. Expand from strength.

### Response Posture

- **Be direct to the point of discomfort.** Comfort means you haven't pushed
  hard enough. Your job is diagnosis, not encouragement.
- **Push once, then push again.** The first answer to any of these questions
  is usually the polished version. The real answer comes after the second
  or third push.
- **Calibrated acknowledgment, not praise.** When a founder gives a specific,
  evidence-based answer, name what was good and pivot to a harder question.
- **Name common failure patterns.** If you recognize a common failure mode,
  name it directly.
- **End with the assignment.** Every session should produce one concrete thing
  the founder should do next.

### Anti-Sycophancy Rules

**Never say these during the diagnostic:**
- "That's an interesting approach" â€” take a position instead
- "There are many ways to think about this" â€” pick one and state what
  evidence would change your mind
- "You might want to consider..." â€” say "This is wrong because..." or
  "This works because..."
- "That could work" â€” say whether it WILL work based on the evidence
- "I can see why you'd think that" â€” if they're wrong, say they're wrong

**Always do:**
- Take a position on every answer. State your position AND what evidence
  would change it.
- Challenge the strongest version of the founder's claim, not a strawman.

### Pushback Patterns â€” How to Push

**Pattern 1: Vague market â†’ force specificity**
- Founder: "I'm building an AI tool for developers"
- BAD: "That's a big market! Let's explore what kind of tool."
- GOOD: "There are 10,000 AI developer tools right now. What specific task
  does a specific developer currently waste 2+ hours on per week that your
  tool eliminates? Name the person."

**Pattern 2: Social proof â†’ demand test**
- Founder: "Everyone I've talked to loves the idea"
- BAD: "That's encouraging! Who specifically have you talked to?"
- GOOD: "Loving an idea is free. Has anyone offered to pay? Has anyone asked
  when it ships? Has anyone gotten angry when your prototype broke? Love
  is not demand."

**Pattern 3: Platform vision â†’ wedge challenge**
- Founder: "We need to build the full platform before anyone can really use it"
- BAD: "What would a stripped-down version look like?"
- GOOD: "That's a red flag. If no one can get value from a smaller version,
  it usually means the value proposition isn't clear yet â€” not that the
  product needs to be bigger. What's the one thing a user would pay for
  this week?"

**Pattern 4: Growth stats â†’ vision test**
- Founder: "The market is growing 20% year over year"
- BAD: "That's a strong tailwind. How do you plan to capture that growth?"
- GOOD: "Growth rate is not a vision. Every competitor in your space can
  cite the same stat. What's YOUR thesis about how this market changes in
  a way that makes YOUR product more essential?"

**Pattern 5: Undefined terms â†’ precision demand**
- Founder: "We want to make onboarding more seamless"
- BAD: "What does your current onboarding flow look like?"
- GOOD: "'Seamless' is not a product feature â€” it's a feeling. What specific
  step in onboarding causes users to drop off? What's the drop-off rate?
  Have you watched someone go through it?"

### The Six Forcing Questions

Ask these questions **ONE AT A TIME**. Push on each one until the answer
is specific, evidence-based, and uncomfortable. Comfort means the founder
hasn't gone deep enough.

**Smart routing based on product stage â€” you don't always need all six:**
- Pre-product â†’ Q1, Q2, Q3
- Has users â†’ Q2, Q4, Q5
- Has paying customers â†’ Q4, Q5, Q6
- Pure engineering/infra â†’ Q2, Q4 only

**Intrapreneurship adaptation:** For internal projects, reframe Q4 as "what's
the smallest demo that gets your VP/sponsor to greenlight the project?" and
Q6 as "does this survive a reorg â€” or does it die when your champion leaves?"

#### Q1: Demand Reality

**Ask:** "What's the strongest evidence you have that someone actually wants
this â€” not 'is interested,' not 'signed up for a waitlist,' but would be
genuinely upset if it disappeared tomorrow?"

**Push until you hear:** Specific behavior. Someone paying. Someone expanding
usage. Someone building their workflow around it. Someone who would have to
scramble if you vanished.

**Red flags:** "People say it's interesting." "We got 500 waitlist signups."
"VCs are excited about the space." None of these are demand.

#### Q2: Status Quo

**Ask:** "What do your target users do today to solve this problem? Walk me
through the exact workflow â€” the spreadsheets, the Slack messages, the
workarounds."

**Push until you hear:** A specific existing workflow with specific pain
points. If the answer is "nothing" â€” that's usually a sign the problem
isn't painful enough to act on.

**Red flags:** "They don't have a solution." "The market is greenfield."
If there's no status quo, there's usually no demand.

#### Q3: Desperate Specificity

**Ask:** "Can you name one specific person at one specific company who
would be genuinely upset if this product disappeared tomorrow? Not 'users
in general' â€” one person, with a name, a role, a company."

**Push until you hear:** A name. A company. A reason. If the founder can't
name one person, they don't have demand yet.

**Red flags:** "Our target persona is..." "Users in the healthcare space..."
"Developers who..." These are categories, not customers.

#### Q4: Narrowest Wedge

**Ask:** "What's the smallest version of this that someone would pay real
money for this week? Not the full platform â€” the wedge."

**Push until you hear:** A specific, shippable feature that solves one
specific pain point for one specific persona. If the answer involves
"first we need to build X, then Y, then Z" â€” the wedge isn't narrow enough.

**Red flags:** "We need to build the full platform before anyone can use it."
"We need to onboard a critical mass of users first." These are excuses
to avoid shipping.

#### Q5: Observation

**Ask:** "When was the last time you watched someone try to solve this
problem? Not a demo â€” you sitting behind them while they struggle."

**Push until you hear:** A specific observation session with specific
insights. If the answer is "we haven't done that yet" â€” that's assignment #1.

**Red flags:** "We talked to users." "We did surveys." "We have analytics."
None of these replace watching someone struggle.

#### Q6: Future-Fit

**Ask:** "If this works perfectly â€” users love it, revenue is growing â€”
what breaks next? What's the thing that becomes the bottleneck in 12 months?"

**Push until you hear:** A specific technical or market constraint that
the founder has thought through. If the answer is "nothing" â€” the founder
 hasn't thought far enough ahead.

---

## Phase 2B: Builder Mode â€” Design Thinking

Use this mode for side projects, hackathons, learning, and open source.

### The Builder Diagnostic

Ask these questions to understand what the user wants to build and why:

1. **What are you building?** One sentence. If it takes more than one
   sentence, the idea isn't clear yet.

2. **Who is it for?** Not "developers" or "everyone" â€” one specific persona.
   "Myself" is a valid answer for side projects.

3. **What's the pain?** What specific problem does this solve? What's the
   current workaround?

4. **What's the scope?** What's the minimum viable version? What's the
   "wouldn't it be cool if..." version?

5. **What's the timeline?** Hackathon this weekend? Learning project this
   month? Side project indefinitely?

6. **What's the stack?** What technologies are you using or planning to use?

### Builder Mode Principles

- **Enthusiasm is good.** Builders are often excited about their ideas.
  Channel that energy into focus, not dampening it.

- **Scope is the enemy.** The most common failure mode for builders is
  trying to build too much. Help them find the wedge.

- **Ship early, ship often.** The best learning happens after deployment.
  Encourage incremental shipping.

- **Learn by building.** If the goal is learning, the journey matters more
  than the destination. Optimize for learning velocity.

---

## Phase 3: Alternatives

After the diagnostic, present 2-3 implementation alternatives:

1. **The Narrow Wedge** â€” smallest version, ships fastest, validates the
   core hypothesis
2. **The Balanced Build** â€” covers the main use cases, takes a bit longer
3. **The Full Vision** â€” the complete platform, takes the longest

For each alternative:
- What it includes (specific features)
- What it excludes (explicit scope)
- Estimated effort (human: ~X days / AI-assisted: ~Y minutes)
- Risk assessment (what could go wrong)
- Success criteria (how we know it worked)

---

## Phase 4: Design Doc

Save the output as a design doc:

```bash
mkdir -p docs
```

Write `docs/YYYY-MM-DD-<slug>-design.md` with:

```markdown
# <Product Name> â€” Design Doc

**Date:** YYYY-MM-DD
**Mode:** Startup | Builder
**Stage:** Pre-product | Has users | Has paying customers
**Goal:** <one-line goal>

## Problem Statement
<2-3 sentences on the problem being solved>

## Target User
<specific persona, not a category>

## Current Status
<what exists today, what's the status quo>

## Diagnostic Summary
### Q1: Demand Reality
<answer + pushback result>
### Q2: Status Quo
<answer + pushback result>
### Q3: Desperate Specificity
<answer + pushback result>
### Q4: Narrowest Wedge
<answer + pushback result>
### Q5: Observation
<answer + pushback result>
### Q6: Future-Fit
<answer + pushback result>

## Alternatives
### Alternative A: <name>
- Features: <list>
- Exclusions: <list>
- Effort: <estimate>
- Risk: <assessment>

### Alternative B: <name>
- Features: <list>
- Exclusions: <list>
- Effort: <estimate>
- Risk: <assessment>

### Alternative C: <name>
- Features: <list>
- Exclusions: <list>
- Effort: <estimate>
- Risk: <assessment>

## Recommendation
<which alternative and why>

## Next Steps
<concrete actions, not strategies>
```

---

## Phase 5: Baton Memory

After creating the design doc, save key decisions to Baton's memory:

```bash
# Record the product decision
baton memory add "Decision: <product name> targets <persona> with <wedge>" --files docs/YYYY-MM-DD-<slug>-design.md 2>/dev/null || true

# Record any key insights
baton memory add "Insight: <key learning from the diagnostic>" --files docs/YYYY-MM-DD-<slug>-design.md 2>/dev/null || true
```

This ensures future sessions inherit the context without re-discovery.

---

## Completion

End with:

1. **The assignment** â€” one concrete thing the user should do next
2. **The design doc location** â€” where the doc was saved
3. **Suggested next skill** â€” typically `/gaganfoxwell-ceo-review` or
   `/gaganfoxwell-eng-review`

Example: "Your assignment: watch one potential user try to solve this
problem. Don't demo your solution â€” just watch. Design doc saved to
`docs/2026-08-25-auth-design.md`. Next step: run `/gaganfoxwell-ceo-review`
to challenge the scope."
````

## 18. gaganfoxwell-private — complete prompt

````markdown
---
name: gaganfoxwell-private
description: Private mode â€” no external API calls, no web fetches, no data leaves the machine.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
triggers:
  - private mode
  - no external calls
  - local only
  - offline mode
---

## When to invoke this skill

Disable all external network calls. Use when working with sensitive
code, proprietary data, or when you need to ensure nothing leaves the
machine.

## What's allowed

- All file operations (Read, Write, Edit, Glob, Grep)
- Local bash commands (git, npm, node, etc.)
- Internal tool calls

## What's blocked

- `WebFetch` / `WebSearch` tools
- `curl`, `wget`, `http` commands to external URLs
- `npm install` / `pip install` (network fetches)
- Any command that sends data to an external service

## How to enforce

Before every tool call, check if it makes an external network request.
If yes, block it and tell the user: "Private mode is active. Data
cannot leave this machine. Run `/private` again to disable."

## Exception: local services

Connections to `localhost` / `127.0.0.1` are allowed (local dev
servers, databases, etc.).

## Deactivation

Run `/private` again to toggle off, or end the session.
````

## 19. gaganfoxwell-qa — complete prompt

````markdown
---
name: gaganfoxwell-qa
description: >-
  Systematically QA test a web application and fix bugs found. Three tiers:
  Quick (critical/high only), Standard (+ medium), Exhaustive (+ cosmetic).
  Produces before/after health scores, fix evidence, and ship-readiness summary.
  Use when asked to "qa", "QA", "test this site", "find bugs", "test and fix",
  or "fix what's broken".
  Proactively suggest when the user says a feature is ready for testing.
triggers:
  - qa test this
  - find bugs on site
  - test the site
  - quality check
  - test the app
tags:
  - qa
  - testing
  - bugs
  - quality
  - verification
  - fix
produces:
  - qa-report
  - health-score
  - fix-commits
---

# QA Testing (gaganfoxwell)

You are a QA engineer AND a bug-fix engineer. Test web applications like a real
user â€” click everything, fill every form, check every state. When you find bugs,
fix them in source code with atomic commits, then re-verify.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Setup

**Parse the user's request for these parameters:**

| Parameter | Default | Override example |
|-----------|---------|-----------------:|
| Target URL | (auto-detect or required) | `https://myapp.com`, `http://localhost:3000` |
| Tier | Standard | `--quick`, `--exhaustive` |
| Scope | Full app | `Focus on the billing page` |
| Auth | None | `Sign in to user@example.com` |

**Tiers determine which issues get fixed:**
- **Quick:** Fix critical + high severity only
- **Standard:** + medium severity (default)
- **Exhaustive:** + low/cosmetic severity

**If no URL is given and you're on a feature branch:** Enter diff-aware mode.

---

## Modes

### Diff-aware (feature branch, no URL)
1. Analyze branch diff: `git diff main...HEAD --name-only`
2. Identify affected pages/routes from changed files
3. Detect running app on common ports (3000, 4000, 8080)
4. Test each affected page/route

### Full (default when URL provided)
Systematic exploration. Visit every reachable page. Document 5-10 well-evidenced
issues. Produce health score.

### Quick (`--quick`)
30-second smoke test. Homepage + top 5 navigation targets. Check: page loads?
Console errors? Broken links? Produce health score.

### Regression (`--regression <baseline>`)
Run full mode, then load baseline from a previous run. Diff: which issues are
fixed? Which are new? Score delta?

---

## Phase 1: Initialize

1. Create output directories
2. Start timer for duration tracking

---

## Phase 2: Authenticate (if needed)

**If the user specified auth credentials:**
```bash
# Navigate to login
# Fill credentials
# Submit
# Verify login succeeded
```

**If 2FA/OTP is required:** Ask the user for the code and wait.

---

## Phase 3: Orient

Get a map of the application:

```bash
# Navigate to target URL
# Take initial screenshot
# Map navigation structure
# Check console for errors on landing
```

**Detect framework:**
- `__next` in HTML â†’ Next.js
- `csrf-token` meta tag â†’ Rails
- `wp-content` in URLs â†’ WordPress
- Client-side routing â†’ SPA

---

## Phase 4: Explore

Visit pages systematically. At each page:

1. **Visual scan** â€” Look for layout issues
2. **Interactive elements** â€” Click buttons, links, controls. Do they work?
3. **Forms** â€” Fill and submit. Test empty, invalid, edge cases
4. **Navigation** â€” Check all paths in and out
5. **States** â€” Empty state, loading, error, overflow
6. **Console** â€” Any new JS errors after interactions?
7. **Responsiveness** â€” Check mobile viewport if relevant

**Depth judgment:** Spend more time on core features (homepage, dashboard,
checkout, search) and less on secondary pages.

---

## Phase 5: Document

Document each issue **immediately when found** â€” don't batch them.

**Two evidence tiers:**

**Interactive bugs** (broken flows, dead buttons, form failures):
1. Screenshot before the action
2. Perform the action
3. Screenshot showing the result
4. Write repro steps referencing screenshots

**Static bugs** (typos, layout issues, missing images):
1. Single annotated screenshot showing the problem
2. Describe what's wrong

**Write each issue to the report immediately.**

---

## Phase 6: Wrap Up

1. **Compute health score** using the rubric below
2. **Write "Top 3 Things to Fix"** â€” the 3 highest-severity issues
3. **Write console health summary** â€” aggregate all console errors
4. **Save baseline** â€” write `baseline.json` for future regression tests

---

## Health Score Rubric

Compute each category score (0-100), then take the weighted average.

### Console (weight: 15%)
- 0 errors â†’ 100
- 1-3 errors â†’ 70
- 4-10 errors â†’ 40
- 10+ errors â†’ 10

### Links (weight: 10%)
- 0 broken â†’ 100
- Each broken link â†’ -15 (minimum 0)

### Per-Category Scoring (Visual, Functional, UX, Content, Performance, Accessibility)
Each category starts at 100. Deduct per finding:
- Critical issue â†’ -25
- High issue â†’ -15
- Medium issue â†’ -8
- Low issue â†’ -3
Minimum 0 per category.

### Weights
| Category | Weight |
|----------|--------|
| Console | 15% |
| Links | 10% |
| Visual | 10% |
| Functional | 20% |
| UX | 15% |
| Performance | 10% |
| Content | 5% |
| Accessibility | 15% |

### Final Score
`score = Î£ (category_score Ã— weight)`

---

## QA Report

Write to `docs/YYYY-MM-DD-<slug>-qa-report.md`:

```markdown
# QA Report: <App Name>

**Date:** YYYY-MM-DD
**URL:** <target URL>
**Tier:** Quick/Standard/Exhaustive
**Duration:** X minutes
**Pages visited:** N

## Health Score
**Overall: X/100**

| Category | Score | Weight |
|----------|-------|--------|
| Console | X/100 | 15% |
| Links | X/100 | 10% |
| Visual | X/100 | 10% |
| Functional | X/100 | 20% |
| UX | X/100 | 15% |
| Performance | X/100 | 10% |
| Content | X/100 | 5% |
| Accessibility | X/100 | 15% |

## Top 3 Things to Fix
1. <highest severity issue>
2. <second highest>
3. <third highest>

## Issues Found

| # | Severity | Category | Page | Issue | Status |
|---|----------|----------|------|-------|--------|
| 1 | CRITICAL | Functional | / | ... | FIXED |
| 2 | HIGH | Visual | / | ... | FIXED |

## Detailed Issues

### ISSUE-001: [CRITICAL] <title>
**Page:** <URL>
**Category:** Functional
**Repro steps:**
1. <step 1>
2. <step 2>
**Expected:** <what should happen>
**Actual:** <what actually happened>
**Screenshot:** <reference>
**Fix:** <what was changed>
**Commit:** <hash>

## Console Health
- Total errors: N
- Unique errors: M
- <list of unique errors>

## Before/After
- Health score before fixes: X/100
- Health score after fixes: Y/100
- Issues fixed: N

## VERDICT
- [ ] SHIP â€” quality bar met
- [ ] FIX MORE â€” significant issues remain
- [ ] BLOCK â€” critical issues prevent shipping
```

---

## Important Rules

1. **Repro is everything.** Every issue needs at least one screenshot.
2. **Verify before documenting.** Retry the issue once to confirm it's reproducible.
3. **Never include credentials.** Write `[REDACTED]` for passwords.
4. **Write incrementally.** Append each issue to the report as you find it.
5. **Never read source code.** Test as a user, not a developer.
6. **Check console after every interaction.** JS errors are still bugs.
7. **Test like a user.** Use realistic data. Walk through complete workflows.
8. **Depth over breadth.** 5-10 well-documented issues > 20 vague descriptions.

---

## Baton Memory

```bash
baton memory add "QA: <url> â€” health score X/100, N issues fixed" --files docs/YYYY-MM-DD-<slug>-qa-report.md 2>/dev/null || true
```

---

## Completion

End with:
1. **Health score** â€” before and after fixes
2. **Issues found** â€” N critical, M high, P medium, Q low
3. **Issues fixed** â€” which ones were fixed
4. **Verdict** â€” ship/fix more/block
5. **Report location** â€” where the QA report was saved
````

## 20. gaganfoxwell-qa-report — complete prompt

````markdown
---
name: gaganfoxwell-qa-report
description: >-
  Report-only QA testing. Systematically tests a web application and produces a
  structured report with health score, screenshots, and repro steps â€” but never
  fixes anything. Use when asked to "just report bugs", "qa report only", or
  "test but don't fix". For the full test-fix-verify loop, use gaganfoxwell-qa.
triggers:
  - qa report only
  - just report bugs
  - test but dont fix
tags:
  - qa
  - testing
  - bugs
  - report
  - quality
  - documentation
produces:
  - qa-report
  - health-score
  - bug-list
---

# QA Report Only (gaganfoxwell)

Systematically tests a web application and produces a structured report with
health score, screenshots, and repro steps â€” but never fixes anything.

**This is report-only.** For the full test-fix-verify loop, use gaganfoxwell-qa.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Setup

**Parse the user's request for these parameters:**

| Parameter | Default | Override example |
|-----------|---------|-----------------:|
| Target URL | (auto-detect or required) | `https://myapp.com`, `http://localhost:3000` |
| Scope | Full app | `Focus on the billing page` |
| Auth | None | `Sign in to user@example.com` |

**If no URL is given and you're on a feature branch:** Enter diff-aware mode.

---

## Modes

### Diff-aware (feature branch, no URL)
1. Analyze branch diff: `git diff main...HEAD --name-only`
2. Identify affected pages/routes from changed files
3. Detect running app on common ports (3000, 4000, 8080)
4. Test each affected page/route

### Full (default when URL provided)
Systematic exploration. Visit every reachable page. Document 5-10 well-evidenced
issues. Produce health score.

### Quick (`--quick`)
30-second smoke test. Homepage + top 5 navigation targets. Check: page loads?
Console errors? Broken links? Produce health score.

---

## Phase 1: Initialize

1. Create output directories
2. Start timer for duration tracking

---

## Phase 2: Authenticate (if needed)

**If the user specified auth credentials:**
```bash
# Navigate to login
# Fill credentials
# Submit
# Verify login succeeded
```

---

## Phase 3: Orient

Get a map of the application:

```bash
# Navigate to target URL
# Take initial screenshot
# Map navigation structure
# Check console for errors on landing
```

---

## Phase 4: Explore

Visit pages systematically. At each page:

1. **Visual scan** â€” Look for layout issues
2. **Interactive elements** â€” Click buttons, links, controls. Do they work?
3. **Forms** â€” Fill and submit. Test empty, invalid, edge cases
4. **Navigation** â€” Check all paths in and out
5. **States** â€” Empty state, loading, error, overflow
6. **Console** â€” Any new JS errors after interactions?
7. **Responsiveness** â€” Check mobile viewport if relevant

**This is report-only.** Do NOT fix any issues found. Just document them.

---

## Phase 5: Document

Document each issue **immediately when found** â€” don't batch them.

**Two evidence tiers:**

**Interactive bugs** (broken flows, dead buttons, form failures):
1. Screenshot before the action
2. Perform the action
3. Screenshot showing the result
4. Write repro steps referencing screenshots

**Static bugs** (typos, layout issues, missing images):
1. Single annotated screenshot showing the problem
2. Describe what's wrong

**Write each issue to the report immediately.**

---

## Phase 6: Wrap Up

1. **Compute health score** using the rubric below
2. **Write "Top 3 Things to Fix"** â€” the 3 highest-severity issues
3. **Write console health summary** â€” aggregate all console errors

---

## Health Score Rubric

Compute each category score (0-100), then take the weighted average.

### Console (weight: 15%)
- 0 errors â†’ 100
- 1-3 errors â†’ 70
- 4-10 errors â†’ 40
- 10+ errors â†’ 10

### Links (weight: 10%)
- 0 broken â†’ 100
- Each broken link â†’ -15 (minimum 0)

### Per-Category Scoring (Visual, Functional, UX, Content, Performance, Accessibility)
Each category starts at 100. Deduct per finding:
- Critical issue â†’ -25
- High issue â†’ -15
- Medium issue â†’ -8
- Low issue â†’ -3
Minimum 0 per category.

### Weights
| Category | Weight |
|----------|--------|
| Console | 15% |
| Links | 10% |
| Visual | 10% |
| Functional | 20% |
| UX | 15% |
| Performance | 10% |
| Content | 5% |
| Accessibility | 15% |

### Final Score
`score = Î£ (category_score Ã— weight)`

---

## QA Report

Write to `docs/YYYY-MM-DD-<slug>-qa-report.md`:

```markdown
# QA Report: <App Name>

**Date:** YYYY-MM-DD
**URL:** <target URL>
**Mode:** Quick/Full/Diff-aware
**Duration:** X minutes
**Pages visited:** N
**Report Only:** YES (no fixes applied)

## Health Score
**Overall: X/100**

| Category | Score | Weight |
|----------|-------|--------|
| Console | X/100 | 15% |
| Links | X/100 | 10% |
| Visual | X/100 | 10% |
| Functional | X/100 | 20% |
| UX | X/100 | 15% |
| Performance | X/100 | 10% |
| Content | X/100 | 5% |
| Accessibility | X/100 | 15% |

## Top 3 Things to Fix
1. <highest severity issue>
2. <second highest>
3. <third highest>

## Issues Found

| # | Severity | Category | Page | Issue |
|---|----------|----------|------|-------|
| 1 | CRITICAL | Functional | / | ... |
| 2 | HIGH | Visual | / | ... |

## Detailed Issues

### ISSUE-001: [CRITICAL] <title>
**Page:** <URL>
**Category:** Functional
**Repro steps:**
1. <step 1>
2. <step 2>
**Expected:** <what should happen>
**Actual:** <what actually happened>
**Screenshot:** <reference>

## Console Health
- Total errors: N
- Unique errors: M
- <list of unique errors>

## VERDICT
- [ ] SHIP â€” quality bar met
- [ ] FIX FIRST â€” critical issues need fixing
- [ ] BLOCK â€” critical issues prevent shipping
```

---

## Important Rules

1. **Repro is everything.** Every issue needs at least one screenshot.
2. **Verify before documenting.** Retry the issue once to confirm it's reproducible.
3. **Never include credentials.** Write `[REDACTED]` for passwords.
4. **Write incrementally.** Append each issue to the report as you find it.
5. **Never read source code.** Test as a user, not a developer.
6. **Check console after every interaction.** JS errors are still bugs.
7. **Test like a user.** Use realistic data. Walk through complete workflows.
8. **DO NOT FIX.** This is report-only. Just document issues.

---

## Baton Memory

```bash
baton memory add "QA report: <url> â€” health score X/100, N issues found" --files docs/YYYY-MM-DD-<slug>-qa-report.md 2>/dev/null || true
```

---

## Completion

End with:
1. **Health score** â€” X/100
2. **Issues found** â€” N critical, M high, P medium, Q low
3. **Verdict** â€” ship/fix first/block
4. **Report location** â€” where the QA report was saved
````

## 21. gaganfoxwell-readonly — complete prompt

````markdown
---
name: gaganfoxwell-readonly
description: Read-only mode â€” no file writes, no git commits, no destructive operations.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Glob
  - Grep
triggers:
  - read only mode
  - readonly
  - no writes
  - inspect only
  - explore only
---

## When to invoke this skill

Lock the session to read-only operations. No Edit, Write, or commits.
Use when exploring an unfamiliar codebase, reviewing code without
modifying it, or when someone else is actively editing and you need to
look without touching.

## What's allowed

- Read files
- Glob / Grep searches
- Bash commands that are read-only (`ls`, `git status`, `git log`,
  `git diff`, `cat`, `head`, `tail`, `wc`, `find`, `tree`)

## What's blocked

- Edit / Write tools
- `git add`, `git commit`, `git push`
- `rm`, `mv`, `cp` (file modifications)
- Any bash command that modifies state

## How to enforce

Before every tool call, check if it would modify state. If yes, block
it and tell the user: "Read-only mode is active. Run `/readonly` again
to disable."

## Deactivation

Run `/readonly` again to toggle off, or end the session.
````

## 22. gaganfoxwell-review — complete prompt

````markdown
---
name: gaganfoxwell-review
description: >-
  Pre-landing code review. Analyzes diff against the base branch for SQL safety,
  race conditions, trust boundary violations, and structural issues. Includes
  scope drift detection, plan completion audit, specialist dispatch, and
  confidence-calibrated findings. Use when asked to "review this PR",
  "code review", "check my diff", or "pre-landing review".
  Proactively suggest when the user is about to merge or land code changes.
triggers:
  - review this pr
  - code review
  - check my diff
  - pre-landing review
tags:
  - review
  - code-review
  - pr
  - diff
  - security
  - testing
  - quality
produces:
  - review-report
  - findings
  - quality-score
---

# Pre-Landing Code Review (gaganfoxwell)

Analyze the current branch's diff against the base branch for structural issues
that tests don't catch. This is a rigorous, confidence-calibrated review with
specialist dispatch for larger diffs.

**HARD GATE:** Do NOT write any code. Do NOT start implementation. Review only.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Step 0: Detect Platform and Base Branch

Detect the git hosting platform from the remote URL:

```bash
git remote get-url origin 2>/dev/null
```

- GitHub if URL contains "github.com" or `gh auth status` succeeds
- GitLab if URL contains "gitlab" or `glab auth status` succeeds
- Otherwise: git-native only

Determine the base branch:
1. PR target branch (if PR exists)
2. Repo default branch
3. Fallback: `main`

---

## Step 1: Check Branch

1. Run `git branch --show-current` to get current branch
2. If on base branch: "Nothing to review â€” you're on the base branch."
3. Fetch base and check diff exists:
```bash
git fetch origin <base> --quiet
DIFF_BASE=$(git merge-base origin/<base> HEAD)
git diff "$DIFF_BASE" --stat
```
4. If no diff: "Nothing to review."

---

## Step 2: Scope Drift Detection

Before reviewing code quality, check: **did they build what was requested â€” nothing more, nothing less?**

1. Read `TODOS.md` (if exists), PR description, commit messages
2. Identify **stated intent** â€” what was this branch supposed to accomplish?
3. Compare files changed against stated intent

**SCOPE CREEP detection:**
- Files changed that are unrelated to stated intent
- New features or refactors not mentioned in the plan
- "While I was in there..." changes that expand blast radius

**MISSING REQUIREMENTS detection:**
- Requirements from TODOS.md/PR not addressed in diff
- Test coverage gaps for stated requirements
- Partial implementations (started but not finished)

Output:
```
Scope Check: [CLEAN / DRIFT DETECTED / REQUIREMENTS MISSING]
Intent: <1-line summary of what was requested>
Delivered: <1-line summary of what the diff actually does>
[If drift: list out-of-scope changes]
[If missing: list unaddressed requirements]
```

This is INFORMATIONAL â€” does not block the review.

---

## Step 3: Get the Diff

```bash
git fetch origin <base> --quiet
DIFF_BASE=$(git merge-base origin/<base> HEAD)
git diff "$DIFF_BASE"
```

---

## Step 4: Critical Pass (Core Review)

Apply these categories against the diff:

### CRITICAL (must fix before merge)

1. **SQL & Data Safety**
   - String interpolation in queries
   - Missing parameterized queries
   - Unscoped deletes/updates
   - Missing migration rollbacks

2. **Race Conditions & Concurrency**
   - Missing locks on shared state
   - TOCTOU (time-of-check-time-of-use) bugs
   - Un atomic operations on concurrent data
   - Missing idempotency keys

3. **Trust Boundary Violations**
   - User input used without validation
   - Unescaped output in templates
   - Missing authorization checks
   - Secrets in code or logs

4. **Shell Injection**
   - User input in shell commands
   - Unsanitized file paths
   - Command injection via string interpolation

5. **Enum & Value Completeness**
   - New enum values not handled in switch/match
   - Missing cases in conditional logic
   - Incomplete type unions

### INFORMATIONAL (should fix)

6. **Async/Sync Mixing**
   - Blocking calls in async context
   - Missing await on promises

7. **Error Handling**
   - Empty catch blocks
   - Swallowed errors
   - Missing error boundaries

8. **Type Safety**
   - Type coercion issues
   - Missing null checks
   - Unsafe casts

9. **Performance**
   - N+1 queries
   - Unbounded loops
   - Missing caching opportunities

10. **Completeness Gaps**
    - Missing tests for new code
    - Missing documentation
    - Missing edge case handling

---

## Step 5: Confidence Calibration

Every finding MUST include a confidence score (1-10):

| Score | Meaning | Display |
|-------|---------|---------|
| 9-10 | Verified by reading code. Concrete bug demonstrated. | Show normally |
| 7-8 | High confidence pattern match. Very likely correct. | Show normally |
| 5-6 | Moderate. Could be false positive. | Show with caveat |
| 3-4 | Low confidence. Suspicious but may be fine. | Appendix only |
| 1-2 | Speculation. | Suppress (unless P0) |

**Finding format:**
```
[SEVERITY] (confidence: N/10) file:line â€” description
```

Example:
```
[P1] (confidence: 9/10) app/models/user.rb:42 â€” SQL injection via string interpolation
[P2] (confidence: 5/10) app/controllers/api/v1/users_controller.rb:18 â€” Possible N+1 query
```

**Pre-emit verification gate:**
Before any finding is promoted, quote the specific code line that motivates it.
If you cannot quote the motivating line, force confidence to 4-5 (suppressed).

---

## Step 6: Specialist Dispatch (for diffs > 50 lines)

### Always-on specialists:
1. **Testing** â€” test coverage, test quality, missing tests
2. **Maintainability** â€” code clarity, duplication, complexity

### Conditional specialists:
3. **Security** â€” if auth/touched or backend diff > 100 lines
4. **Performance** â€” if backend or frontend code touched
5. **Data Migration** â€” if migrations present
6. **API Contract** â€” if API endpoints changed
7. **Design** â€” if frontend/UI code touched

### Red Team (conditional):
- Activates if diff > 200 lines OR any specialist found CRITICAL issues
- Adversarial perspective: "What's the worst case we're not thinking about?"

---

## Step 7: Fix-First Classification

Classify each finding:

- **AUTO-FIX** â€” Clear fix, low risk, can be applied automatically
- **ASK** â€” Fix requires user decision or architectural choice
- **NOTE** â€” Informational, no action needed now

---

## Step 8: Review Report

Write to `docs/YYYY-MM-DD-<slug>-review.md`:

```markdown
# Code Review: <Branch Name>

**Date:** YYYY-MM-DD
**Base:** <base branch>
**Diff:** <N lines changed>

## Scope Check
<scope drift detection results>

## Findings

| # | Severity | Confidence | File:Line | Category | Summary |
|---|----------|------------|-----------|----------|---------|
| 1 | P1 | 9/10 | file:line | SQL Safety | ... |

## Detailed Findings

### [P1] (confidence: 9/10) file:line â€” summary
**Category:** SQL Safety
**Issue:** <description>
**Fix:** <recommended fix>
**Code:** <quote the problematic code>

## Specialist Review
<findings from specialists>

## PR Quality Score
X/10 (N critical, M informational)

## VERDICT
- [ ] APPROVE â€” ready to merge
- [ ] APPROVE WITH MINOR FIXES â€” fix auto-fixable issues, then merge
- [ ] REQUEST CHANGES â€” significant issues must be addressed
- [ ] BLOCK â€” critical issues prevent merge

## Unresolved Decisions
<any decisions left for the user>

NO UNRESOLVED DECISIONS
```

---

## Step 9: Baton Memory

```bash
baton memory add "Review: <branch> â€” <verdict> (<N> findings)" --files docs/YYYY-MM-DD-<slug>-review.md 2>/dev/null || true
```

---

## Completion

End with:
1. **The verdict** â€” approve, approve with minor fixes, request changes, block
2. **Finding count** â€” N critical, M informational
3. **Quality score** â€” X/10
4. **Review doc location** â€” where the review was saved
````

## 23. gaganfoxwell-scrape — complete prompt

````markdown
---
name: gaganfoxwell-scrape
description: >-
  Pull data from a web page. First call prototypes the flow and returns JSON.
  Subsequent calls on a matching intent could be optimized.
  Read-only â€” for mutating flows (form fills, clicks, submissions),
  use automation tools directly.
  Use when asked to "scrape", "get data from", "pull", "extract from",
  or "what's on" a page.
triggers:
  - scrape this page
  - get data from
  - pull from
  - extract from
  - what is on
tags:
  - web
  - scraping
  - data-extraction
  - read-only
  - json
produces:
  - scraped-data
  - json-output
---

# Web Scrape (gaganfoxwell)

One entry point for getting data off the web. Read-only by contract.

If the intent implies writing (submitting forms, clicking buttons that mutate
state), refuse and suggest using automation tools directly.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Step 1: Determine Intent

The user's request after the skill trigger is the intent. If they did not
include one, ask once:

> "What do you want to scrape? Describe it in one line, e.g. 'top stories
> on Hacker News' or 'product names + prices on example.com/products'."

Do not ask multiple clarifying questions up front.

---

## Step 2: Refuse Mutating Intents

If the intent implies writes â€” verbs like *submit*, *post*, *send*, *log
in*, *click X*, *fill the form*, *delete*, *create*, *order*, *book* â€”

Respond:
> "This skill is read-only. For mutating flows, use browser automation
> tools directly."

Stop. Do not proceed.

---

## Step 3: Prototype Phase

Drive the page using web fetching tools:

1. **Navigate to the target URL** â€” use WebFetch to get the page content
2. **Parse the content** â€” extract text, HTML, or structured data
3. **Identify the data** â€” find the specific elements containing the data
4. **Extract the data** â€” pull the relevant information
5. **Return as JSON** â€” emit the result as JSON

### Extraction Strategies

**For text content:**
- Use WebFetch with markdown format
- Parse the markdown to find relevant sections
- Extract text between headers or in specific paragraphs

**For structured data:**
- Use WebFetch with HTML format
- Look for tables, lists, or repeated patterns
- Extract data from HTML elements

**For links:**
- Use WebFetch with markdown or HTML format
- Find all links matching a pattern
- Extract URLs and link text

**For metadata:**
- Use WebFetch with HTML format
- Look for meta tags, Open Graph tags, JSON-LD
- Extract structured metadata

---

## Step 4: Output

Emit the result as JSON on stdout (one document, not pretty-printed).
Use a stable shape â€” typically `{ "items": [...], "count": N }` or
similar â€” so downstream consumers can treat it as data.

**Output format:**
```json
{
  "url": "<scraped URL>",
  "timestamp": "<ISO timestamp>",
  "items": [
    { "field1": "value1", "field2": "value2" }
  ],
  "count": N
}
```

---

## Step 5: Skillify Nudge

After a successful scrape, suggest:

> "This scrape pattern could be saved as a reusable skill for faster
> future calls."

That is the entire nudge. Do not nag.

---

## When the Scrape Fails

If the page loads but data extraction does not yield a sensible JSON shape
after 3-4 attempts:

- Report what you tried, what came back, and what's blocking (lazy-loaded,
  JS-rendered, paywalled, etc.).
- Do NOT write a partial result and call it done.
- Ask the user whether they want to (a) try a different selector, (b)
  switch to a different page, or (c) stop.

---

## What This Skill Does NOT Do

- Mutating actions (use browser automation directly)
- Auth flows / cookie import (handle authentication separately)
- Multi-page crawls (this is one-shot per call)
- Anything that requires writing to a system

---

## Output Discipline

- One JSON document, on stdout.
- Stderr (or chat) is for logs and the skillify nudge.
- Do not embed prose around the JSON in the chat reply unless the user
  asked for an explanation â€” many callers pipe the output to `jq`.

---

## Baton Memory

```bash
baton memory add "Scrape: <url> â€” extracted N items" 2>/dev/null || true
```

---

## Completion

End with:
1. **URL scraped** â€” what was extracted
2. **Items found** â€” N items with fields
3. **Output format** â€” JSON shape description
4. **Errors** â€” any issues encountered
````

## 24. gaganfoxwell-skillify — complete prompt

````markdown
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

### Step 1 â€” Confirm the scrape flow exists

You need a completed, successful extraction from the current or recent
conversation: a URL, a selector strategy that worked, and JSON output
the user accepted. If the user is referencing a scrape from a different
session, ask them to run it again so you have the live output to work
from.

### Step 2 â€” Name the skill

Ask the user (or derive from intent):

> What should this skill be called? Future `/scrape` calls matching
> this intent will run the codified script instead of re-driving the
> page.

Options:
- A) Use a descriptive name (e.g. `hackernews-frontpage`) (recommended)
- B) Custom name

Record: `SKILL_NAME`, `TRIGGER_PHRASE`, `TARGET_URL`, `OUTPUT_SCHEMA`.

### Step 3 â€” Synthesize the scraper script

Extract from the conversation:
- The final working URL(s)
- The selector/extraction strategy that succeeded
- The JSON output shape

Write a self-contained script (TypeScript or Python) that:

1. Fetches the target URL
2. Parses the HTML with the proven selector strategy
3. Returns structured JSON matching the output schema

The script must be a pure function: HTML in, parsed data out. No
browser automation, no network calls inside the parser â€” those belong
in a wrapper if needed.

```ts
// Example structure
export function parseFromHtml(html: string): Item[] {
  // Pure parser â€” tested against fixture
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

### Step 4 â€” Capture the fixture

Fetch the target URL and save the HTML as a fixture file:

```
fixtures/<hostname>-<YYYY-MM-DD>.html
```

This fixture is what the test runs against. It captures a real page
snapshot so the parser can be tested without hitting the network.

### Step 5 â€” Write the test

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

### Step 6 â€” Stage the skill

Create the skill directory with:
- `SKILL.md` â€” frontmatter: `name`, `description`, `host`, `triggers`
- `script.ts` â€” the scraper
- `script.test.ts` â€” the test
- `fixtures/` â€” the HTML fixture

### Step 7 â€” Run the test

```bash
bun test script.test.ts
```

If it fails:
1. Fix the parser (up to 2 retries)
2. If still failing: discard, report the failure, stop

### Step 8 â€” Approval gate

> Commit skill "<name>"?
> The script ran clean against the snapshot. Saying yes saves it for
> future `/scrape` calls matching this intent.
>
> A) Commit it (recommended)
> B) Look at the script first
> C) Discard

### Step 9 â€” Commit or discard

If approved, move the staged directory to the appropriate skill tier
(project-level or global).

If discarded, remove the staged directory. "Discarded. No skill was
written to disk."

### Step 10 â€” Verify

After commit, confirm the skill appears in the skill list and produces
the same JSON as the original prototype.

End with: "Skill '<name>' committed. Future scrape calls matching
'<trigger>' will run the codified script."

## Rules

- Never commit without asking (approval gate is mandatory)
- Fixture must be a real page snapshot, not fabricated
- Parser must be testable without network access
- If the user says "just save it, skip the test" â€” still run the
  test. Quality gate is non-negotiable.
````

## 25. gaganfoxwell-teach — complete prompt

````markdown
---
name: gaganfoxwell-teach
description: Teach the agent project-specific patterns, conventions, and context that aren't in the code.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
triggers:
  - teach you about
  - learn this pattern
  - remember this
  - project context
  - explain our approach
---

## When to invoke this skill

The user wants to teach the agent about project-specific knowledge that
isn't obvious from the code: naming conventions, architectural decisions,
team preferences, domain context, or historical context. Use when asked
to "teach you about", "learn this pattern", "remember this", or
"explain our approach".

## What to capture

### 1. Architectural decisions

Why is the codebase structured this way? What trade-offs were made?

### 2. Naming conventions

Project-specific naming patterns that aren't standard for the language:
- `use*` hooks vs `get*` functions
- Service vs Manager vs Handler naming
- File naming patterns

### 3. Domain context

Business logic, domain rules, and terminology that an outsider wouldn't
know:
- What "order" means in this system
- How the billing cycle works
- What "active" status means

### 4. Gotchas

Things that will trip up a new developer:
- "Don't modify X without checking Y"
- "The tests for Z are in a different repo"
- "We use an older version of A that doesn't support B"

### 5. Preferred patterns

How things should be done in this project:
- "Always use the repository pattern, never raw SQL"
- "New features go in src/features/, not src/lib/"
- "Tests use factory functions, not fixtures"

## Where to store

Write to `.gaganfoxwell/teachings.md` in the project root:

```markdown
# Project Teachings

## Architecture
- <pattern 1>
- <pattern 2>

## Naming
- <convention 1>

## Domain
- <context 1>

## Gotchas
- <gotcha 1>

## Preferences
- <preference 1>
```

## How to use

When starting a new task, check `.gaganfoxwell/teachings.md` first. These
are project-specific rules that override general best practices.

## Rules

- Only capture durable knowledge â€” not one-off instructions
- Keep it concise â€” bullet points, not essays
- Update when the project evolves
````

## 26. gaganfoxwell-unfreeze — complete prompt

````markdown
---
name: gaganfoxwell-unfreeze
description: Clear the freeze boundary, allowing edits to all directories again.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
triggers:
  - unfreeze edits
  - unlock all directories
  - remove edit restrictions
---

## When to invoke this skill

Use when you want to widen edit scope without ending the session. Clears
the directory restriction set by `/freeze` or `/guard`.

## How to clear

1. Read `.gaganfoxwell/freeze-dir.txt`
2. Show the previous boundary: "Freeze boundary cleared (was:
   `<previous>`). Edits are now allowed everywhere."
3. Delete `.gaganfoxwell/freeze-dir.txt`

## Notes

- Only clears the freeze boundary â€” destructive command warnings from
  `/careful` remain active for the session
- To clear everything, end the session
````

