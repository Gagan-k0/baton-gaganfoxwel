# Gaganfoxwell Skills Comprehensive Reference Guide

> **Baton Multi-Agent Coordination Suite**  
> Complete reference manual for all 26 Gaganfoxwell agent skills (`gaganfoxwell-*`), covering when and where to use each skill, methodology, triggers, input/output contracts, and recommended execution pipelines.

---

## Table of Contents

1. [Quick Reference Matrix](#1-quick-reference-matrix)
2. [Lifecycle Chains & Recommended Pipelines](#2-lifecycle-chains--recommended-pipelines)
3. [Deep Dive: All 26 Skills Explained](#3-deep-dive-all-26-skills-explained)
   - [Phase 1: Planning & Architecture](#phase-1-planning--architecture)
     - [1. gaganfoxwell-office-hours](#1-gaganfoxwell-office-hours)
     - [2. gaganfoxwell-ceo-review](#2-gaganfoxwell-ceo-review)
     - [3. gaganfoxwell-eng-review](#3-gaganfoxwell-eng-review)
   - [Phase 2: Implementation, Design, Web & QA](#phase-2-implementation-design-web--qa)
     - [4. gaganfoxwell-review](#4-gaganfoxwell-review)
     - [5. gaganfoxwell-investigate](#5-gaganfoxwell-investigate)
     - [6. gaganfoxwell-design-audit](#6-gaganfoxwell-design-audit)
     - [7. gaganfoxwell-design-shotgun](#7-gaganfoxwell-design-shotgun)
     - [8. gaganfoxwell-design-html](#8-gaganfoxwell-design-html)
     - [9. gaganfoxwell-devex-audit](#9-gaganfoxwell-devex-audit)
     - [10. gaganfoxwell-qa](#10-gaganfoxwell-qa)
     - [11. gaganfoxwell-qa-report](#11-gaganfoxwell-qa-report)
     - [12. gaganfoxwell-scrape](#12-gaganfoxwell-scrape)
     - [13. gaganfoxwell-skillify](#13-gaganfoxwell-skillify)
   - [Phase 3: Safety Modes & Guardrails](#phase-3-safety-modes--guardrails)
     - [14. gaganfoxwell-careful](#14-gaganfoxwell-careful)
     - [15. gaganfoxwell-freeze](#15-gaganfoxwell-freeze)
     - [16. gaganfoxwell-guard](#16-gaganfoxwell-guard)
     - [17. gaganfoxwell-unfreeze](#17-gaganfoxwell-unfreeze)
     - [18. gaganfoxwell-readonly](#18-gaganfoxwell-readonly)
     - [19. gaganfoxwell-private](#19-gaganfoxwell-private)
   - [Phase 4: Context, Memory & Utilities](#phase-4-context-memory--utilities)
     - [20. gaganfoxwell-learn](#20-gaganfoxwell-learn)
     - [21. gaganfoxwell-context-save](#21-gaganfoxwell-context-save)
     - [22. gaganfoxwell-context-restore](#22-gaganfoxwell-context-restore)
     - [23. gaganfoxwell-first-task](#23-gaganfoxwell-first-task)
     - [24. gaganfoxwell-teach](#24-gaganfoxwell-teach)
     - [25. gaganfoxwell-fork](#25-gaganfoxwell-fork)
     - [26. gaganfoxwell-browse](#26-gaganfoxwell-browse)
4. [CLI Management & Installation Guide](#4-cli-management--installation-guide)
5. [Rules & Best Practices When Stacking Skills](#5-rules--best-practices-when-stacking-skills)

---

## 1. Quick Reference Matrix

| # | Skill ID | Category | Primary Triggers | Primary Output Artifact |
|---|---|---|---|---|
| 1 | `gaganfoxwell-office-hours` | Plan | `"office hours"`, `"brainstorm this"` | `docs/YYYY-MM-DD-*-design.md` (3 alternatives) |
| 2 | `gaganfoxwell-ceo-review` | Plan | `"ceo review"`, `"think bigger"` | `docs/YYYY-MM-DD-*-ceo-review.md` (verdict) |
| 3 | `gaganfoxwell-eng-review` | Plan | `"eng review"`, `"review architecture"` | `docs/YYYY-MM-DD-*-eng-review.md` (test plan) |
| 4 | `gaganfoxwell-review` | Impl | `"code review"`, `"review this pr"` | `docs/YYYY-MM-DD-*-review.md` (findings table) |
| 5 | `gaganfoxwell-investigate` | Impl | `"debug this"`, `"fix this bug"` | `docs/YYYY-MM-DD-*-investigation.md` + fix commit |
| 6 | `gaganfoxwell-design-audit` | Impl | `"visual design audit"`, `"design polish"` | Atomic styling commits + audit report |
| 7 | `gaganfoxwell-design-shotgun` | Impl | `"explore design variants"` | `comparison.html` + mockup HTML files |
| 8 | `gaganfoxwell-design-html` | Impl | `"build the design"`, `"turn into html"` | Production `index.html` + `styles.css` |
| 9 | `gaganfoxwell-devex-audit` | Impl | `"dx audit"`, `"try the onboarding"` | DX scorecard (0-10) + TTHW measurement |
| 10 | `gaganfoxwell-qa` | Impl | `"qa test this"`, `"find bugs on site"` | Atomic bugfix commits + health score report |
| 11 | `gaganfoxwell-qa-report` | Impl | `"qa report only"`, `"just report bugs"` | Report-only QA document (no code changed) |
| 12 | `gaganfoxwell-scrape` | Impl | `"scrape this page"`, `"get data from"` | Clean, pipe-friendly JSON output |
| 13 | `gaganfoxwell-skillify` | Impl | `"skillify"`, `"codify this scrape"` | Permanent runnable skill package (`script.ts`, `test.ts`) |
| 14 | `gaganfoxwell-careful` | Safety | `"be careful"`, `"safety mode"` | Destructive command interception |
| 15 | `gaganfoxwell-freeze` | Safety | `"freeze edits to directory"` | Directory edit boundary lock (`freeze-dir.txt`) |
| 16 | `gaganfoxwell-guard` | Safety | `"full safety mode"`, `"lock it down"` | Combined command + directory protection |
| 17 | `gaganfoxwell-unfreeze` | Safety | `"unfreeze edits"`, `"unlock all"` | Cleared directory boundary |
| 18 | `gaganfoxwell-readonly` | Safety | `"read only mode"`, `"inspect only"` | Hard no-write lock (all file writes blocked) |
| 19 | `gaganfoxwell-private` | Safety | `"private mode"`, `"no external calls"` | Airgapped offline mode (no network calls) |
| 20 | `gaganfoxwell-learn` | Utility | `"show learnings"`, `"what have we learned"` | Searchable `.gaganfoxwell/learnings.jsonl` |
| 21 | `gaganfoxwell-context-save` | Utility | `"save progress"`, `"save my work"` | Snapshot in `.gaganfoxwell/context/` |
| 22 | `gaganfoxwell-context-restore` | Utility | `"resume where i left off"`, `"where was i"` | Context recovery & executive brief |
| 23 | `gaganfoxwell-first-task` | Utility | `"first task"`, `"get started"` | Inferred repo rules + clean initial commit |
| 24 | `gaganfoxwell-teach` | Utility | `"teach you about"`, `"remember this"` | Tribal knowledge in `.gaganfoxwell/teachings.md` |
| 25 | `gaganfoxwell-fork` | Utility | `"fork this"`, `"create worktree"` | Isolated git worktree directory & branch |
| 26 | `gaganfoxwell-browse` | Utility | `"browse a page"`, `"fetch a url"` | Clean markdown extraction from web URL |

---

## 2. Lifecycle Chains & Recommended Pipelines

Different engineering tasks require different sequences of skills. Below are the battle-tested combinations:

### Pipeline A: Complete End-to-End Feature Loop
```
1. gaganfoxwell-office-hours   ──▶ Validates demand & proposes 3 build sizes (Narrow/Balanced/Full)
        │
2. gaganfoxwell-ceo-review     ──▶ Challenges premises, selects scope expansion/reduction mode
        │
3. gaganfoxwell-eng-review     ──▶ Locks data flow, error paths, and test matrix before coding
        │
4. [Implementation]            ──▶ Code the feature (+ gaganfoxwell-freeze to avoid sprawl)
        │
5. gaganfoxwell-review         ──▶ Pre-landing code review checking SQL, race conditions, trust
        │
6. gaganfoxwell-qa             ──▶ Automated user-perspective testing + atomic bug fixing
        │
7. gaganfoxwell-context-save   ──▶ Checkpoints decisions, git state, and remaining tasks
```

### Pipeline B: Systematic Debugging Loop
```
1. gaganfoxwell-investigate    ──▶ Root-cause investigation; 3-strike rule prevents guess-fixing
        │
2. gaganfoxwell-freeze         ──▶ Locks edits strictly to suspect directory
        │
3. [Fix & Verify]              ──▶ Minimal root-cause fix + regression test
        │
4. gaganfoxwell-learn          ──▶ Logs durable insight into project memory so bug never recurs
```

### Pipeline C: Frontend UI/UX Design Loop
```
1. gaganfoxwell-design-shotgun ──▶ Generates 3-6 distinct visual mockups on side-by-side board
        │
2. gaganfoxwell-design-html    ──▶ Converts approved mockup into responsive, accessible HTML/CSS
        │
3. gaganfoxwell-design-audit   ──▶ Live browser audit; detects AI slop, polishes spacing/typography
```

### Pipeline D: High-Stakes Production / Sensitive Code Loop
```
1. gaganfoxwell-guard          ──▶ Command protection (rm -rf, DROP TABLE) + directory freeze
        │
2. gaganfoxwell-private        ──▶ Blocks all external fetches, search queries, and exfiltration
        │
3. gaganfoxwell-readonly       ──▶ (Optional) If strictly auditing without making modifications
```

---

## 3. Deep Dive: All 26 Skills Explained

---

### Phase 1: Planning & Architecture

#### 1. `gaganfoxwell-office-hours`
* **When & Where to Use:** Before writing any code for a new product, startup idea, or major feature.
* **Problem it Solves:** Prevents building software nobody needs. Forces clarity before sinking hours into code.
* **How it Works:**
  - **Startup Mode:** Conducts a YC-partner diagnostic with 6 forcing questions:
    1. *Demand Reality:* Evidence someone would be genuinely upset if this disappeared.
    2. *Status Quo:* How users solve the problem today (spreadsheets, manual workarounds).
    3. *Desperate Specificity:* Name one real, specific person who urgently needs this.
    4. *Narrowest Wedge:* The smallest version someone would pay for or adopt this week.
    5. *Observation:* When did you last observe a user actively struggling with this?
    6. *Future-Fit:* What breaks or becomes unmaintainable in 12 months?
  - **Builder Mode:** Rapid design-thinking diagnostic for hackathons, tools, or learning projects.
* **Inputs:** A 1-sentence product or feature idea.
* **Outputs:** `docs/YYYY-MM-DD-<slug>-design.md` detailing 3 implementation approaches: *Narrow Wedge*, *Balanced Build*, and *Full Vision*, with risk and effort ratings.

#### 2. `gaganfoxwell-ceo-review`
* **When & Where to Use:** Immediately after completing a preliminary plan or design doc, before engineering begins.
* **Problem it Solves:** Prevents under-ambition and accidental scope creep. Forces conscious decisions about whether to expand or shrink scope.
* **How it Works:**
  - Audits existing code leverage (never rebuild what already exists in the repo).
  - Challenges premises: "Is this solving the right problem? What is the cost of doing nothing?"
  - Evaluates 4 deliberate modes:
    - `SCOPE EXPANSION`: Find the 10-star ideal experience.
    - `SELECTIVE EXPANSION`: Add only high-leverage delight features.
    - `HOLD SCOPE`: Strictly enforce boundaries (standard for bug fixes and refactors).
    - `SCOPE REDUCTION`: Cut features down to the absolute bare minimum MVP.
  - Reviews 11 core areas: Architecture, Error Paths, Edge Cases, Security, Tests, Observability, Deployment, Performance, Compatibility, Docs, UI/UX.
* **Inputs:** A design doc, plan, or branch diff.
* **Outputs:** `docs/YYYY-MM-DD-<slug>-ceo-review.md` with an `APPROVED`, `APPROVED WITH CONCERNS`, or `REVISIONS NEEDED` verdict.

#### 3. `gaganfoxwell-eng-review`
* **When & Where to Use:** Right before developers write the first line of code on an approved plan.
* **Problem it Solves:** Eliminates mid-build architectural rework and unforeseen implementation roadblocks.
* **How it Works:**
  - Enforces a Complexity Smell Check: If a plan touches $>8$ files or introduces $>2$ new services, it pauses for explicit human justification.
  - Draws ASCII data-flow diagrams and state transition maps.
  - Builds an Error & Rescue Map: Happy path, empty state, network failure, and upstream timeout per flow.
  - Maps Edge Cases: Double clicks, rapid navigation, slow connections, expired tokens, stale local state.
  - Locks in the testing strategy matrix (Unit, Integration, E2E coverage goals).
* **Inputs:** Plan text, diff, or target path.
* **Outputs:** `docs/YYYY-MM-DD-<slug>-eng-review.md` with locked architecture and test matrix.

---

### Phase 2: Implementation, Design, Web & QA

#### 4. `gaganfoxwell-review`
* **When & Where to Use:** On a feature branch prior to merging any PR into `main`.
* **Problem it Solves:** Catches subtle, catastrophic bugs that automated tests and CI pass right through.
* **How it Works:**
  - **Scope Drift Check:** Flags whether the diff built more or less than what was requested.
  - **Critical Pass:** Audits SQL injection, TOCTOU race conditions, missing transaction boundaries, unescaped shell commands, and authorization bypasses.
  - **Confidence Calibration:** Every finding is scored 1–10. Findings with confidence $<7$ are suppressed unless they are P0 security flaws. The reviewer must quote the exact offending line.
  - **Specialist Dispatch:** Diffs $>50$ lines trigger specialist passes (Security, Performance, Migrations, API Contracts).
* **Inputs:** Git branch diff against base.
* **Outputs:** Review report (`docs/YYYY-MM-DD-*-review.md`) with a quality score ($X/10$), categorized findings (Auto-fix, Ask, Note), and an `APPROVE` or `BLOCK` verdict.

#### 5. `gaganfoxwell-investigate`
* **When & Where to Use:** Any non-trivial bug, crash, test failure, or intermittent error.
* **Problem it Solves:** Enforces the *Iron Law*: **No fixes without root cause first**. Prevents guess-fixing and superficial symptom patches.
* **How it Works:**
  - Phase 1: Traces symptoms, inspects `git log` on modified files, and constructs a deterministic reproduction test.
  - Phase 2: Compares against known failure patterns (race conditions, nil propagation, stale caches, config drift).
  - Phase 3: **3-Strike Hypothesis Rule** — the agent must formulate and test hypotheses with logs or assertions. If 3 consecutive hypotheses fail, it must stop and ask for human context rather than guessing a patch.
  - Phase 4: Delivers a minimal fix, confirms reproduction failure $\rightarrow$ pass, and runs a blast-radius scan.
* **Inputs:** Symptom description, stack trace, or failing test.
* **Outputs:** Deterministic regression test, minimal fix commit, and `docs/YYYY-MM-DD-*-investigation.md`.

#### 6. `gaganfoxwell-design-audit`
* **When & Where to Use:** On a running web application (`http://localhost:3000` or staging URL).
* **Problem it Solves:** Catches visual clumsiness, inconsistent spacing, broken typography, and AI-slop layouts.
* **How it Works:**
  - Inspects live pages across desktop and mobile viewports.
  - Extracts the design system (fonts, palette, spacing units).
  - Checks WCAG AA color contrast, interactive hover/active states, and layout shift (CLS).
  - Runs an **AI-Slop Detection Pass**: Flags meaningless decorations, generic stock images, and unstyled form fields.
  - Fixes discovered issues directly in the source code with atomic git commits.
* **Inputs:** Application URL (e.g., `http://localhost:3000`).
* **Outputs:** Atomic styling fix commits and `docs/YYYY-MM-DD-*-design-audit.md`.

#### 7. `gaganfoxwell-design-shotgun`
* **When & Where to Use:** Designing a new page or screen when you want to compare distinct visual directions.
* **Problem it solves:** Prevents committing to the first mediocre layout that comes to mind.
* **How it Works:**
  - Gathers 5 dimensions: Target audience, user job-to-be-done, existing brand tokens, user flow, edge cases.
  - Generates 3 to 6 visually divergent HTML concepts (anti-convergence rule: every variant must take a genuinely distinct design philosophy).
  - Builds an interactive `comparison.html` board for side-by-side browser inspection.
  - Allows per-variant Approve, Reject, or Iterate feedback.
* **Inputs:** Screen/page name and user intent.
* **Outputs:** Standalone mockup HTML files, side-by-side comparison board, and extracted design tokens for the approved winner.

#### 8. `gaganfoxwell-design-html`
* **When & Where to Use:** Turning an approved design mockup into production-ready frontend code.
* **Problem it Solves:** Converts static concepts into responsive, maintainable, production-grade markup.
* **How it Works:**
  - Extracts typography scales, color schemes, and spacing scales into CSS custom properties (`--color-primary`, `--space-4`, etc.).
  - Writes semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<dialog>`).
  - Implements mobile-first media queries, $\ge 44\text{px}$ touch targets, and full ARIA accessibility tags.
* **Inputs:** Approved mockup HTML, `DESIGN.md`, or visual description.
* **Outputs:** Production `index.html` + `styles.css` with accessibility verification.

#### 9. `gaganfoxwell-devex-audit`
* **When & Where to Use:** Prior to releasing an API, CLI, developer SDK, or open-source repo.
* **Problem it Solves:** Exposes onboarding snags and developer friction before external users experience them.
* **How it Works:**
  - Times the **Time-To-Hello-World (TTHW)**: Champion ($<2\text{ min}$), Competitive ($2\text{--}5\text{ min}$), Needs Work ($5\text{--}10\text{ min}$), Red Flag ($>10\text{ min}$).
  - Evaluates an 8-dimension scorecard (0–10 each): Getting Started, API/CLI Ergonomics, Error Messages, Documentation, Upgrade Path, Dev Environment, Community, DX Measurement.
  - Categorizes fixes into Quick Wins ($<1\text{ hr}$), This Sprint, and Next Quarter.
* **Inputs:** Repository path or documentation URL.
* **Outputs:** ASCII scorecard, TTHW measurement, and `docs/YYYY-MM-DD-*-dx-audit.md`.

#### 10. `gaganfoxwell-qa`
* **When & Where to Use:** When a web application feature is complete and needs end-to-end verification and bug fixing.
* **Problem it Solves:** Automates the role of a full-time QA engineer and bug fixer.
* **How it Works:**
  - **Rule: Never read source code during testing** (tests purely from the user's perspective).
  - Tiers: `--quick` (Critical/High only), Standard (adds Medium), `--exhaustive` (adds Cosmetic).
  - Navigates routes, clicks interactive elements, submits empty, invalid, and boundary form data.
  - Monitors the browser console after every single action for unhandled exceptions or network errors.
  - Takes screenshots of bugs, fixes the underlying code in source, commits each fix atomically, and re-tests.
* **Inputs:** Application URL (e.g., `http://localhost:3000`).
* **Outputs:** Atomic fix commits, before/after weighted health scores, and `docs/YYYY-MM-DD-*-qa-report.md`.

#### 11. `gaganfoxwell-qa-report`
* **When & Where to Use:** When you want full QA testing evidence, but someone else will write the fixes.
* **Problem it Solves:** Provides comprehensive QA verification without making unauthorized code edits.
* **How it Works:**
  - Runs the identical testing and exploration methodology as `gaganfoxwell-qa`.
  - Strictly report-only: makes **zero commits and zero code changes**.
  - Ranks findings by severity and calculates the weighted health score.
* **Inputs:** Application URL.
* **Outputs:** `docs/YYYY-MM-DD-*-qa-report.md` with repro steps, screenshots, and Top-3 priority fixes.

#### 12. `gaganfoxwell-scrape`
* **When & Where to Use:** When an agent needs structured data from any public web page.
* **Problem it Solves:** Clean, pipe-friendly data extraction that refuses mutating flows (logins, checkouts, form submits).
* **How it Works:**
  - Prototypes page fetch, extracts tables, structured text, or JSON-LD metadata.
  - Emits clean JSON to stdout: `{ url, timestamp, items[], count }`.
  - Transparently fails on paywalls or complex client-side JS barriers instead of faking output.
* **Inputs:** Target URL and extraction goal.
* **Outputs:** Formatted JSON data.

#### 13. `gaganfoxwell-skillify`
* **When & Where to Use:** Right after a successful one-off scrape that will be needed repeatedly.
* **Problem it Solves:** Re-scraping via AI models is slow and burns tokens. Skillify converts the flow into a permanent, deterministic script.
* **How it Works:**
  - Synthesizes a pure TypeScript parser (`script.ts`) with no network dependencies in the parsing function.
  - Saves a real HTML fixture (`fixtures/<host>-<date>.html`).
  - Writes a unit test (`script.test.ts`) validating data shape and non-empty key fields.
  - Commits the permanent skill directory only after passing local tests.
* **Inputs:** A completed scrape session.
* **Outputs:** Permanent runnable skill package executing future calls in $\sim 200\text{ms}$.

---

### Phase 3: Safety Modes & Guardrails

#### 14. `gaganfoxwell-careful`
* **When & Where to Use:** When operating near production databases, shared servers, or during complex git rebases.
* **Problem it Solves:** Prevents catastrophic accidental data loss or force-push accidents.
* **How it Works:**
  - Intercepts shell commands before execution.
  - Hard-denies dangerous operations (e.g. `rm -rf /`, force-pushing to `main`/`master`).
  - Warns and requires explicit human confirmation for destructive patterns (`DROP TABLE`, `TRUNCATE`, `git reset --hard`, `git checkout .`, `docker rm -f`).
* **Inputs:** Session command stream.
* **Outputs:** Active session-scoped command interceptor.

#### 15. `gaganfoxwell-freeze`
* **When & Where to Use:** During targeted bug fixing or localized refactoring where touching other folders is forbidden.
* **Problem it Solves:** Prevents scope sprawl. An agent fixing an auth bug will be blocked if it attempts to edit files in payments or UI.
* **How it Works:**
  - Records the allowed folder in `.gaganfoxwell/freeze-dir.txt`.
  - Validates every file write against the resolved absolute directory path.
  - File writes outside the target folder are hard-blocked with an explanatory error.
* **Inputs:** Target directory path (e.g., `src/auth/`).
* **Outputs:** Enforced edit boundary.

#### 16. `gaganfoxwell-guard`
* **When & Where to Use:** High-risk production debugging or shared multi-agent repositories.
* **Problem it Solves:** Maximum safety. Combines both destructive command warnings (`careful`) and directory write restriction (`freeze`).
* **Inputs:** Target directory path.
* **Outputs:** Both command guardrails and directory edit boundary active simultaneously.

#### 17. `gaganfoxwell-unfreeze`
* **When & Where to Use:** When a scoped fix is finished and full repository access is needed again.
* **Problem it Solves:** Removes directory restrictions without terminating the agent session.
* **Inputs:** None.
* **Outputs:** Deletes `.gaganfoxwell/freeze-dir.txt` and restores full repo edit permissions.

#### 18. `gaganfoxwell-readonly`
* **When & Where to Use:** Exploring an untrusted repository, inspecting code without risk of accidental changes.
* **Problem it Solves:** Complete write lockdown.
* **How it Works:**
  - Allows: File reading, grepping, file listing, `git status`, `git log`, `git diff`.
  - Blocks: All file edits, file writes, `git add`, `git commit`, `git push`, and mutating shell commands.
* **Inputs:** None.
* **Outputs:** Read-only inspection environment.

#### 19. `gaganfoxwell-private`
* **When & Where to Use:** Working with proprietary source code, internal security keys, or customer PII.
* **Problem it Solves:** Prevents intellectual property leakage or external telemetry.
* **How it Works:**
  - Blocks: Web searches, external HTTP requests, `curl`/`wget` to non-local hosts, package installs requiring remote registries.
  - Allows: Local filesystem work, local git operations, connections to `localhost` / `127.0.0.1`.
* **Inputs:** None.
* **Outputs:** Airgapped session mode.

---

### Phase 4: Context, Memory & Utilities

#### 20. `gaganfoxwell-learn`
* **When & Where to Use:** After resolving a tricky defect, understanding a quirky API, or when checking if a problem was seen before.
* **Problem it Solves:** Prevents teams and agents from making the same mistake twice.
* **How it Works:**
  - Reads and writes to `.gaganfoxwell/learnings.jsonl`.
  - Every entry carries skill, insight, confidence score (1–10), source file, and timestamp.
  - Enables instant keyword searching: *"Have we seen this SQLite lock error before?"*
  - Provides automated pruning of stale or low-confidence learnings ($<3$).
* **Inputs:** Learning query or insight text.
* **Outputs:** Formatted learnings table or exported markdown summary.

#### 21. `gaganfoxwell-context-save`
* **When & Where to Use:** At the end of every working session, before switching branches, or prior to hitting LLM context limits.
* **Problem it Solves:** Eliminates the frustration of losing conversational context between agent sessions.
* **How it Works:**
  - Automatically captures git state (branch, last 5 commits, modified files).
  - Summarizes the active task, key decisions made with rationales, remaining checklist items, and known blockers.
  - Writes a compact markdown snapshot to `.gaganfoxwell/context/<branch>-<timestamp>.md`.
* **Inputs:** Current session state.
* **Outputs:** Checkpoint markdown file.

#### 22. `gaganfoxwell-context-restore`
* **When & Where to Use:** At the start of any new session or when resuming work after a break.
* **Problem it Solves:** Resumes immediately where you left off without requiring you to re-explain the project.
* **How it Works:**
  - Finds the most recent context checkpoint matching the current branch.
  - Validates that git state matches the checkpoint (warns if the branch diverged).
  - Outputs an executive resumption brief: Task, What's Done, What's Left, Key Decisions, and Blockers.
* **Inputs:** Checkpoint files in `.gaganfoxwell/context/`.
* **Outputs:** Resumption brief and ready-to-execute prompt.

#### 23. `gaganfoxwell-first-task`
* **When & Where to Use:** Dropping an AI agent into a brand-new or completely unfamiliar repository.
* **Problem it Solves:** Speeds up onboarding and prevents agents from writing code that clashes with repo conventions.
* **How it Works:**
  - Phase 1 Orient: Reads README, dependency manifests, folder tree, and recent git history.
  - Phase 2 Conventions: Infers coding style, lint rules, test patterns, and commit conventions.
  - Phase 3 Pick Task: Recommends a small first task from TODOs or accepts user instruction.
  - Phase 4 Deliver: Implements the task, runs tests, and delivers a clean, verified commit.
* **Inputs:** Fresh repository.
* **Outputs:** Repository orientation and initial verified commit.

#### 24. `gaganfoxwell-teach`
* **When & Where to Use:** Passing domain-specific rules, architectural decisions, or gotchas to the agent.
* **Problem it Solves:** Captures tribal knowledge that cannot be deduced simply by reading code.
* **How it Works:**
  - Distills user input into 5 structured sections:
    1. *Architectural Decisions & Tradeoffs*
    2. *Naming Conventions*
    3. *Domain Context & Terminology*
    4. *Gotchas ("Never touch X without Y")*
    5. *Preferred Patterns*
  - Saves to `.gaganfoxwell/teachings.md`, which is read first at the start of all future tasks.
* **Inputs:** Human explanation of project rules.
* **Outputs:** Durable `.gaganfoxwell/teachings.md` reference file.

#### 25. `gaganfoxwell-fork`
* **When & Where to Use:** When you want to experiment with an alternative approach or risky refactor in parallel.
* **Problem it Solves:** Prevents dirtying or breaking the main working tree during speculative coding.
* **How it Works:**
  - Creates an isolated git worktree and new branch.
  - Copies necessary uncommitted environment files.
  - Outputs instructions on how to merge or discard the fork when the experiment concludes.
* **Inputs:** Experiment/task name.
* **Outputs:** Isolated worktree directory and branch.

#### 26. `gaganfoxwell-browse`
* **When & Where to Use:** When the agent needs to read documentation, check an API reference, or inspect a web page.
* **Problem it Solves:** Provides fast, lightweight web content reading without the memory overhead of a heavy browser daemon.
* **How it Works:**
  - Fetches the URL over HTTP.
  - Parses HTML, strips navigation boilerplate, and extracts clean markdown/text.
* **Inputs:** URL to read.
* **Outputs:** Extracted markdown content.

---

## 4. CLI Management & Installation Guide

Baton's CLI manages skills across all your installed agents (Claude Code, Cursor, Antigravity) with single commands.

```bash
# List all skills and see which are installed
baton skills list

# Install a skill into ALL detected agents (Claude Code, Cursor, Antigravity)
baton skills install gaganfoxwell-qa

# Install a skill into a specific agent only
baton skills install gaganfoxwell-office-hours --agent claude
baton skills install gaganfoxwell-review --agent cursor
baton skills install gaganfoxwell-guard --agent antigravity

# Show the complete playbook for any skill
baton skills show gaganfoxwell-investigate

# Uninstall a skill from all agents
baton skills uninstall gaganfoxwell-careful
```

---

## 5. Rules & Best Practices When Stacking Skills

1. **Plan skills are cheap; wrong builds are expensive:** Running `office-hours` $\rightarrow$ `ceo-review` $\rightarrow$ `eng-review` takes 10 minutes. Rebuilding a feature because nobody validated the premise takes days.
2. **Never land a diff without `review`:** Automated unit tests verify expected behavior; `gaganfoxwell-review` catches what tests miss (SQL safety, race conditions, trust boundaries).
3. **Freeze during debugging:** Activate `gaganfoxwell-freeze` during debug sessions so the agent doesn't "clean up" unrelated code.
4. **Test as a user (`qa`) before reading code:** The rule *"never read source code while QA testing"* exposes bugs that developers overlook because they know how the code was written.
5. **Stack safety skills freely; run planning skills sequentially:** Safety modes (`careful`, `freeze`, `private`) compose together seamlessly (e.g. `guard` = `careful` + `freeze`). Planning skills each drive the conversation and should be run in order, not simultaneously.
6. **Save context before ending:** Always invoke `gaganfoxwell-context-save` before ending your workday or before switching tasks.
