# Gaganfoxwell Skills — Baton Integration

> 26 skills ported from GStack to Baton. All build-verified and registered in
> `src/skills/catalog.ts`. Full source: `src/skills/bundled/<name>/SKILL.md`.

---

## Quick Reference

| # | Skill | Phase | Triggers | What it does |
|---|-------|-------|----------|-------------|
| 1 | `gaganfoxwell-office-hours` | Plan | `brainstorm this`, `office hours`, `is this worth building` | YC-style product diagnosis — two modes: Startup (forcing questions) and Builder (design thinking) |
| 2 | `gaganfoxwell-ceo-review` | Plan | `think bigger`, `expand scope`, `strategy review` | CEO/founder-mode plan review — 4 modes: expansion, selective, hold, reduction |
| 3 | `gaganfoxwell-eng-review` | Plan | `review architecture`, `eng plan review`, `lock in the plan` | Eng manager-mode review — architecture, data flow, edge cases, tests |
| 4 | `gaganfoxwell-review` | Impl | `review this pr`, `code review`, `check my diff` | Pre-landing code review — SQL safety, race conditions, trust boundaries, confidence scores |
| 5 | `gaganfoxwell-investigate` | Impl | `debug this`, `fix this bug`, `root cause analysis` | Systematic debugging — Iron Law: no fixes without root cause first |
| 6 | `gaganfoxwell-design-audit` | Impl | `visual design audit`, `design qa`, `design polish` | Live-site visual audit with fix loop — typography, spacing, hierarchy, AI slop detection |
| 7 | `gaganfoxwell-design-shotgun` | Impl | `explore design variants`, `show me design options` | Multiple AI design variants, comparison board, structured feedback |
| 8 | `gaganfoxwell-design-html` | Impl | `build the design`, `turn this into html` | Turn mockups into production HTML/CSS — responsive, accessible, semantic |
| 9 | `gaganfoxwell-devex-audit` | Impl | `test the dx`, `dx audit`, `try the onboarding` | Live DX audit — TTHW measurement, 8-dimension scorecard |
| 10 | `gaganfoxwell-qa` | Impl | `qa test this`, `find bugs on site`, `test the app` | Systematic QA — 3 tiers (quick/standard/exhaustive), health scores, fix loop |
| 11 | `gaganfoxwell-qa-report` | Impl | `qa report only`, `just report bugs` | Report-only QA — no code changes, just evidence |
| 12 | `gaganfoxwell-scrape` | Impl | `scrape this page`, `get data from`, `extract from` | Pull data from web pages — read-only, JSON output |
| 13 | `gaganfoxwell-skillify` | Impl | `skillify`, `codify this scrape`, `make this permanent` | Codify scrape into permanent reusable skill — script + test + fixture |
| 14 | `gaganfoxwell-careful` | Safety | `be careful`, `safety mode`, `prod mode` | Warn before destructive commands — rm -rf, DROP TABLE, force-push |
| 15 | `gaganfoxwell-freeze` | Safety | `freeze edits`, `lock editing scope` | Restrict file edits to a specific directory |
| 16 | `gaganfoxwell-guard` | Safety | `full safety mode`, `lock it down` | Combined careful + freeze — maximum safety |
| 17 | `gaganfoxwell-unfreeze` | Safety | `unfreeze edits`, `unlock all directories` | Clear freeze boundary |
| 18 | `gaganfoxwell-readonly` | Safety | `read only mode`, `inspect only` | No writes, no commits, no destructive operations |
| 19 | `gaganfoxwell-private` | Safety | `private mode`, `no external calls` | No data leaves the machine — no WebFetch, no curl |
| 20 | `gaganfoxwell-learn` | Utility | `show learnings`, `what have we learned` | Review, search, prune project learnings across sessions |
| 21 | `gaganfoxwell-context-save` | Utility | `save progress`, `context save` | Save git state, decisions, remaining work |
| 22 | `gaganfoxwell-context-restore` | Utility | `resume where i left off`, `context restore` | Restore saved context — picks up where you left off |
| 23 | `gaganfoxwell-first-task` | Utility | `first task`, `new project setup`, `get started` | Orient, set up, complete first meaningful work in new project |
| 24 | `gaganfoxwell-teach` | Utility | `teach you about`, `learn this pattern` | Capture project-specific patterns, conventions, domain context |
| 25 | `gaganfoxwell-fork` | Utility | `fork this`, `create worktree`, `parallel work` | Create isolated git worktree for parallel work |
| 26 | `gaganfoxwell-browse` | Browser | `browse a page`, `fetch a url` | Fetch web pages via WebFetch — lightweight read-only browser |

---

## How to Use

### Invocation

Skills are invoked by name. In Baton's agent context, reference the skill:

```
Use the gaganfoxwell-investigate skill to debug this issue.
```

Or reference by trigger phrase:

```
Debug this — the login page returns 500 intermittently.
```

### Skill Chaining

Skills are designed to chain:

```
office-hours → ceo-review → eng-review → [implement] → review → qa
```

### Safety Modes

Activate safety modes before risky work:

```
Activate gaganfoxwell-guard for maximum safety.
```

This enables both destructive command warnings and directory-scoped edits.

---

## Full Skill Documentation

Below is the complete SKILL.md content for each skill.

---

### 1. gaganfoxwell-office-hours

**Phase:** Plan-Mode | **Triggers:** `brainstorm this`, `is this worth building`, `help me think through`, `office hours`, `I have an idea`

**What it does:** YC Office Hours with two modes. Startup mode: six forcing questions that expose demand reality, status quo, desperate specificity, narrowest wedge, observation, and future-fit. Builder mode: design thinking brainstorming for side projects, hackathons, learning, and open source. Saves a design doc.

**Full source:** `src/skills/bundled/gaganfoxwell-office-hours/SKILL.md`

**Key workflow:**
1. Phase 1: Context Gathering — read project files, git history, assess product stage
2. Phase 2A (Startup): Six forcing questions — Demand Reality, Status Quo, Desperate Specificity, Narrowest Wedge, Observation, Future-Fit
3. Phase 2B (Builder): Builder Diagnostic — What/Who/Pain/Scope/Timeline/Stack
4. Phase 3: Implementation Alternatives — Narrow Wedge, Balanced Build, Full Vision
5. Phase 4: Design Doc — save to `docs/YYYY-MM-DD-<slug>-design.md`
6. Phase 5: Baton Memory — save decisions

---

### 2. gaganfoxwell-ceo-review

**Phase:** Plan-Mode | **Triggers:** `think bigger`, `expand scope`, `strategy review`, `rethink this plan`, `is this ambitious enough`

**What it does:** CEO/founder-mode plan review. Rethink the problem, find the 10-star product, challenge premises, expand scope when it creates a better product. Four modes: SCOPE EXPANSION, SELECTIVE EXPANSION, HOLD SCOPE, SCOPE REDUCTION.

**Full source:** `src/skills/bundled/gaganfoxwell-ceo-review/SKILL.md`

**Key workflow:**
1. Step 0: System Audit — git log, TODOs, design doc check
2. Step 0A: Premise Challenge — is this the right problem?
3. Step 0B: Existing Code Leverage — what already exists?
4. Step 0C: Dream State Mapping — 12-month ideal state
5. Step 0C-bis: Implementation Alternatives — 2-3 approaches mandatory
6. Step 0D: Mode Selection — expansion/selective/hold/reduction
7. Step 1: Deep Review (11 sections) — architecture, errors, edge cases, security, tests, observability, deployment, performance, compatibility, docs, UI/UX
8. Step 2: Failure Modes
9. Step 3: Review Report

---

### 3. gaganfoxwell-eng-review

**Phase:** Plan-Mode | **Triggers:** `review architecture`, `eng plan review`, `check the implementation plan`, `lock in the plan`

**What it does:** Eng manager-mode plan review. Lock in the execution plan — architecture, data flow, diagrams, edge cases, test coverage, performance.

**Full source:** `src/skills/bundled/gaganfoxwell-eng-review/SKILL.md`

**Key workflow:**
1. Scope Gate — what to review (branch diff, plan, or file)
2. Step 0: Scope Challenge — existing code, minimum changes, complexity check
3. Section 1: Architecture Review — data flow diagrams, state transitions, API contracts
4. Section 2: Error & Rescue Map — happy path, nil, empty, upstream error
5. Section 3: Edge Case Map — double-click, navigate away, slow connection, stale state
6. Section 4: Test Strategy — test matrix, coverage targets
7. Section 5: Performance Analysis — hot paths, caching, database, memory
8. Section 6: Review Report with VERDICT

---

### 4. gaganfoxwell-review

**Phase:** Implementation | **Triggers:** `review this pr`, `code review`, `check my diff`, `pre-landing review`

**What it does:** Pre-landing code review. Analyzes diff against base branch for SQL safety, race conditions, trust boundary violations. Includes scope drift detection, confidence-calibrated findings, specialist dispatch.

**Full source:** `src/skills/bundled/gaganfoxwell-review/SKILL.md`

**Key workflow:**
1. Step 0: Detect platform and base branch
2. Step 1: Check branch — nothing to review if on base
3. Step 2: Scope Drift Detection — did they build what was requested?
4. Step 3: Get the diff
5. Step 4: Critical Pass — SQL safety, race conditions, trust boundaries, shell injection, enum completeness
6. Step 5: Confidence Calibration — every finding rated 1-10
7. Step 6: Specialist Dispatch — testing, maintainability, security, performance, data migration, API contract, design
8. Step 7: Fix-First Classification — AUTO-FIX, ASK, NOTE
9. Step 8: Review Report with VERDICT

---

### 5. gaganfoxwell-investigate

**Phase:** Implementation | **Triggers:** `debug this`, `fix this bug`, `why is this broken`, `root cause analysis`, `investigate this error`

**What it does:** Systematic debugging with root cause investigation. No fixes without root cause first. Four phases: investigate, analyze, hypothesize, implement.

**Full source:** `src/skills/bundled/gaganfoxwell-investigate/SKILL.md`

**Key workflow:**
1. Phase 1: Root Cause Investigation — collect symptoms, read code, check recent changes, reproduce
2. Phase 2: Pattern Analysis — race condition, nil propagation, state corruption, integration failure, config drift, stale cache
3. Phase 3: Hypothesis Testing — confirm with evidence, 3-strike rule
4. Phase 4: Implementation — minimal fix, verify, regression test, blast radius check

**IRON LAW:** No fixes without root cause investigation first.

---

### 6. gaganfoxwell-design-audit

**Phase:** Implementation | **Triggers:** `visual design audit`, `design qa`, `fix design issues`, `design polish`, `check if it looks good`

**What it does:** Live-site visual audit with fix loop. Reviews typography, spacing, hierarchy, AI slop patterns, and slow interactions — then fixes them with atomic commits.

**Full source:** `src/skills/bundled/gaganfoxwell-design-audit/SKILL.md`

**Key workflow:**
1. Phase 1: First Impression — gut reaction, page area test
2. Phase 2: Design System Extraction — fonts, colors, heading scale, spacing
3. Phase 3: Page-by-Page Visual Audit — typography, spacing, hierarchy, color, layout, interaction, AI slop, performance
4. Phase 4: Fix Loop — classify severity, fix, commit atomically, re-verify
5. Phase 5: Design Audit Report

---

### 7. gaganfoxwell-design-shotgun

**Phase:** Implementation | **Triggers:** `explore design variants`, `show me design options`, `visual design brainstorm`, `design options`

**What it does:** Generate multiple AI design directions, open them side-by-side, collect structured feedback, and iterate.

**Full source:** `src/skills/bundled/gaganfoxwell-design-shotgun/SKILL.md`

**Key workflow:**
1. Step 1: Context Gathering — who, job-to-be-done, what exists, user flow, edge cases
2. Step 2: Taste Memory — read prior approved designs
3. Step 3: Generate Variants — concept generation, visual generation, comparison board
4. Step 4: Collect Feedback — approve/reject/iterate per variant
5. Step 5: Iterate — max 3 iterations
6. Step 6: Output — comparison board, approved design, design notes

---

### 8. gaganfoxwell-design-html

**Phase:** Implementation | **Triggers:** `build the design`, `code the mockup`, `make design real`, `finalize this design`, `turn this into html`

**What it does:** Turn approved mockups into production-quality HTML/CSS. Text reflows, heights computed, layouts dynamic.

**Full source:** `src/skills/bundled/gaganfoxwell-design-html/SKILL.md`

**Key workflow:**
1. Step 0: Input Detection — check for approved mockups or DESIGN.md
2. Step 1: Design Analysis — extract tokens (colors, typography, spacing, layout, components)
3. Step 2: HTML Structure — semantic, accessible, responsive
4. Step 3: CSS Styles — custom properties, mobile-first, spacing scale
5. Step 4: Responsive Design — breakpoints (mobile/tablet/desktop)
6. Step 5: Interactive States — hover, focus, active
7. Step 6: Accessibility — WCAG AA compliance
8. Step 7: Output — save to `docs/designs/<page-name>/`

---

### 9. gaganfoxwell-devex-audit

**Phase:** Implementation | **Triggers:** `live dx audit`, `test developer experience`, `measure onboarding time`, `dx audit`, `try the onboarding`

**What it does:** Live developer experience audit. Tests the DX by navigating docs, trying the getting started flow, timing TTHW (Time To Hello World), and evaluating CLI help text.

**Full source:** `src/skills/bundled/gaganfoxwell-devex-audit/SKILL.md`

**Produces:** DX scorecard, DX report, improvement recommendations

---

### 10. gaganfoxwell-qa

**Phase:** Implementation | **Triggers:** `qa test this`, `find bugs on site`, `test the site`, `quality check`, `test the app`

**What it does:** Systematically QA test a web application and fix bugs found. Three tiers: Quick (critical/high only), Standard (+ medium), Exhaustive (+ cosmetic). Produces before/after health scores.

**Full source:** `src/skills/bundled/gaganfoxwell-qa/SKILL.md`

**Produces:** QA report, health score, fix commits

---

### 11. gaganfoxwell-qa-report

**Phase:** Implementation | **Triggers:** `qa report only`, `just report bugs`, `test but dont fix`

**What it does:** Report-only QA testing. Systematically tests a web application and produces a structured report — but never fixes anything.

**Full source:** `src/skills/bundled/gaganfoxwell-qa-report/SKILL.md`

**Produces:** QA report, health score, bug list

---

### 12. gaganfoxwell-scrape

**Phase:** Implementation | **Triggers:** `scrape this page`, `get data from`, `pull from`, `extract from`, `what is on`

**What it does:** Pull data from a web page. First call prototypes the flow and returns JSON. Read-only.

**Full source:** `src/skills/bundled/gaganfoxwell-scrape/SKILL.md`

**Produces:** Scraped data, JSON output

---

### 13. gaganfoxwell-skillify

**Phase:** Implementation | **Triggers:** `skillify`, `codify this scrape`, `save this scrape`, `make this permanent`

**What it does:** Codify a successful scrape into a permanent, reusable skill on disk. Future calls run in ~200ms.

**Full source:** `src/skills/bundled/gaganfoxwell-skillify/SKILL.md`

**Key workflow:**
1. Confirm scrape flow exists
2. Name the skill
3. Synthesize scraper script (pure function: HTML in, data out)
4. Capture fixture (real HTML snapshot)
5. Write test (at least one non-smoke assertion)
6. Stage the skill
7. Run test
8. Approval gate (mandatory)
9. Commit or discard
10. Verify

---

### 14. gaganfoxwell-careful

**Phase:** Safety | **Triggers:** `be careful`, `warn before destructive`, `safety mode`, `careful mode`, `prod mode`

**What it does:** Warn before destructive commands. Checks every bash command against destructive patterns.

**Full source:** `src/skills/bundled/gaganfoxwell-careful/SKILL.md`

**Protected patterns:**
- `rm -rf` / `rm -r` / `rm --recursive`
- `DROP TABLE` / `DROP DATABASE` / `TRUNCATE`
- `git push --force` / `git reset --hard`
- `git checkout .` / `git restore .`
- `kubectl delete` / `docker rm -f` / `docker system prune`

**Safe exceptions:** `rm -rf node_modules`, `.next`, `dist`, `__pycache__`, `.cache`, `build`, `.turbo`, `coverage`

**Custom patterns:** Add to `.gaganfoxwell/careful-patterns.txt` (one POSIX ERE per line)

---

### 15. gaganfoxwell-freeze

**Phase:** Safety | **Triggers:** `freeze edits to directory`, `lock editing scope`, `restrict file changes`, `only edit this folder`

**What it does:** Restrict file edits to a specific directory for the session.

**Full source:** `src/skills/bundled/gaganfoxwell-freeze/SKILL.md`

**How it works:**
1. Ask user for directory path
2. Store in `.gaganfoxwell/freeze-dir.txt`
3. Before every Edit/Write, check if target starts with freeze directory
4. If not, block the operation

---

### 16. gaganfoxwell-guard

**Phase:** Safety | **Triggers:** `full safety mode`, `guard against mistakes`, `maximum safety`, `lock it down`

**What it does:** Full safety mode — combines `/careful` (destructive command warnings) with `/freeze` (directory-scoped edits).

**Full source:** `src/skills/bundled/gaganfoxwell-guard/SKILL.md`

---

### 17. gaganfoxwell-unfreeze

**Phase:** Safety | **Triggers:** `unfreeze edits`, `unlock all directories`, `remove edit restrictions`

**What it does:** Clear the freeze boundary, allowing edits to all directories again.

**Full source:** `src/skills/bundled/gaganfoxwell-unfreeze/SKILL.md`

---

### 18. gaganfoxwell-readonly

**Phase:** Safety | **Triggers:** `read only mode`, `readonly`, `no writes`, `inspect only`, `explore only`

**What it does:** Read-only mode — no file writes, no git commits, no destructive operations.

**Full source:** `src/skills/bundled/gaganfoxwell-readonly/SKILL.md`

**Allowed:** Read, Glob, Grep, read-only bash (`ls`, `git status`, `git log`, `git diff`, `cat`, `head`, `tail`, `wc`, `find`, `tree`)

**Blocked:** Edit/Write, `git add`/`commit`/`push`, `rm`/`mv`/`cp`

---

### 19. gaganfoxwell-private

**Phase:** Safety | **Triggers:** `private mode`, `no external calls`, `local only`, `offline mode`

**What it does:** Private mode — no external API calls, no web fetches, no data leaves the machine.

**Full source:** `src/skills/bundled/gaganfoxwell-private/SKILL.md`

**Allowed:** All file operations, local bash commands

**Blocked:** WebFetch/WebSearch, `curl`/`wget`, `npm install`/`pip install`

**Exception:** `localhost` / `127.0.0.1` connections allowed

---

### 20. gaganfoxwell-learn

**Phase:** Utility | **Triggers:** `show learnings`, `what have we learned`, `manage project learnings`, `prune learnings`, `export learnings`

**What it does:** Review, search, prune, and export project learnings across sessions.

**Full source:** `src/skills/bundled/gaganfoxwell-learn/SKILL.md`

**Storage:** `.gaganfoxwell/learnings.jsonl` — each line is a JSON object with `skill`, `type`, `key`, `insight`, `confidence`, `source`, `ts`.

---

### 21. gaganfoxwell-context-save

**Phase:** Utility | **Triggers:** `save progress`, `save state`, `save my work`, `context save`

**What it does:** Save working context — git state, decisions, remaining work.

**Full source:** `src/skills/bundled/gaganfoxwell-context-save/SKILL.md`

**Output:** `.gaganfoxwell/context/<branch>-<timestamp>.md` containing:
- Git state (branch, last 5 commits, modified files)
- Current task summary
- Decisions made
- Remaining work
- Blockers

---

### 22. gaganfoxwell-context-restore

**Phase:** Utility | **Triggers:** `resume where i left off`, `restore context`, `where was i`, `pick up where i left off`, `context restore`

**What it does:** Restore working context saved earlier by context-save.

**Full source:** `src/skills/bundled/gaganfoxwell-context-restore/SKILL.md`

**How it works:**
1. Find most recent context file (prefer current branch)
2. Read and extract task/decisions/remaining
3. Verify git state matches
4. Present summary and resume

---

### 23. gaganfoxwell-first-task

**Phase:** Utility | **Triggers:** `first task`, `new project setup`, `get started`, `initial setup`

**What it does:** Handle the first task in a new project — orient, set up, and complete the first meaningful unit of work.

**Full source:** `src/skills/bundled/gaganfoxwell-first-task/SKILL.md`

**Key workflow:**
1. Phase 1: Orient (read-only) — README, package.json, directory structure, CLAUDE.md, git history
2. Phase 2: Conventions — code style, test patterns, file organization, commit format
3. Phase 3: First task — ask user or suggest from TODOs
4. Phase 4: Complete + commit — follow conventions, include tests, verify, commit

---

### 24. gaganfoxwell-teach

**Phase:** Utility | **Triggers:** `teach you about`, `learn this pattern`, `remember this`, `project context`, `explain our approach`

**What it does:** Teach the agent project-specific patterns, conventions, and context that aren't in the code.

**Full source:** `src/skills/bundled/gaganfoxwell-teach/SKILL.md`

**What to capture:**
- Architectural decisions and why
- Naming conventions
- Domain context (business logic, terminology)
- Gotchas (things that trip up newcomers)
- Preferred patterns

**Storage:** `.gaganfoxwell/teachings.md`

---

### 25. gaganfoxwell-fork

**Phase:** Utility | **Triggers:** `fork this`, `create worktree`, `parallel work`, `spin off`

**What it does:** Fork a worktree for parallel work — create an isolated copy of the current state.

**Full source:** `src/skills/bundled/gaganfoxwell-fork/SKILL.md`

**How it works:**
1. Determine fork name
2. `git worktree add ../wt-<name> -b <name>`
3. Copy `.env`, `.gaganfoxwell/` (not `node_modules/`)
4. Report merge command

---

### 26. gaganfoxwell-browse

**Phase:** Browser | **Triggers:** `browse a page`, `fetch a url`, `read this website`, `what's on this page`

**What it does:** Fetch and read web pages using WebFetch — lightweight read-only browser alternative.

**Full source:** `src/skills/bundled/gaganfoxwell-browse/SKILL.md`

**Capabilities:** Fetch any public URL, extract text/links/data, search the web

**Limitations (vs full browser daemon):** No JavaScript execution, no SPAs, no forms, no cookies, no screenshots

---

## Integration Status

| Component | Status |
|-----------|--------|
| SKILL.md files | 26/26 present in `src/skills/bundled/` |
| catalog.ts BUNDLED_META | 26/26 registered |
| catalog.ts SKILL_EXPLAIN | 26/26 registered |
| Build (`npm run build`) | Passing |
| `skills list` output | All 26 appear |
| Git pushed | All commits pushed to `Gagan-k0/baton-gaganfoxwel` |
