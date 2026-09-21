# Gaganfoxwell Skills Overview

Gaganfoxwell is an AI engineering workflow toolkit that transforms Claude Code, Cursor, Codex, and other AI coding agents into a virtual engineering team with 53+ specialist roles, each invoked via slash commands or Baton.

## How It Works

### The Core Concept

Each skill is a `SKILL.md` file — a structured prompt that tells the AI agent to adopt a specific specialist role. Skills follow a sprint workflow:

**Think → Plan → Build → Review → Test → Ship → Reflect**

Each skill feeds into the next. `/office-hours` writes a design doc that `/plan-ceo-review` reads. `/plan-eng-review` writes a test plan that `/qa` picks up. `/review` catches bugs that `/ship` verifies are fixed.

### The Technical Stack

```
Claude Code → CLI (compiled binary) → HTTP → Server (Bun.serve) → CDP → Chromium
```

- **Runtime:** Bun (v1.0+) — compiled single ~58MB binary, native SQLite, native TypeScript
- **Browser:** Persistent Chromium daemon with sub-second commands (~100-200ms)
- **Security:** Localhost-only binding, bearer token auth, prompt injection defense
- **Skills:** Generated from `.tmpl` templates, committed to repo, CI-validated

---

## Skills by Category

### 1. Plan-Mode Reviews (Before Writing Code)

| Skill | Specialist Role | What It Does |
|-------|----------------|--------------|
| `/office-hours` | YC Office Hours | Start here. Six forcing questions that reframe your product before you write code. Pushes back on your framing, challenges premises, generates implementation alternatives. |
| `/plan-ceo-review` | CEO / Founder | Rethink the problem. Find the 10-star product hiding inside the request. Four modes: Expansion, Selective Expansion, Hold Scope, Reduction. |
| `/plan-eng-review` | Eng Manager | Lock in architecture, data flow, diagrams, edge cases, and tests. Forces hidden assumptions into the open. |
| `/plan-design-review` | Senior Designer | Rates each design dimension 0-10, explains what a 10 looks like, then edits the plan to get there. AI Slop detection. |
| `/plan-devex-review` | Developer Experience Lead | Interactive DX review: explores developer personas, benchmarks against competitors' TTHW, designs your magical moment, traces friction points step by step. |
| `/design-consultation` | Design Partner | Build a complete design system from scratch. Researches the landscape, proposes creative risks, generates realistic product mockups. |
| `/autoplan` | Review Pipeline | One command, fully reviewed plan. Runs CEO → design → eng review automatically with encoded decision principles. |
| `/spec` | Spec Author | Turn vague intent into a precise, executable spec in five phases (why, scope, technical with mandatory code-reading, draft, file). |

---

### 2. Implementation + Review (Building & Auditing)

| Skill | Specialist Role | What It Does |
|-------|----------------|--------------|
| `/review` | Staff Engineer | Find the bugs that pass CI but blow up in production. Auto-fixes the obvious ones. Flags completeness gaps. |
| `/codex` | Second Opinion | Independent code review from OpenAI Codex CLI. Three modes: review (pass/fail gate), adversarial challenge, and open consultation. |
| `/investigate` | Debugger | Systematic root-cause debugging. Iron Law: no fixes without investigation. Traces data flow, tests hypotheses, stops after 3 failed fixes. |
| `/design-review` | Designer Who Codes | Same audit as /plan-design-review, then fixes what it finds. Atomic commits, before/after screenshots. |
| `/design-shotgun` | Design Explorer | Generate 4-6 AI mockup variants, opens a comparison board in your browser, collects your feedback, and iterates. Taste memory learns what you like. |
| `/design-html` | Design Engineer | Turn a mockup into production HTML that actually works. Pretext computed layout: text reflows, heights adjust, layouts are dynamic. 30KB, zero deps. |
| `/devex-review` | DX Tester | Live developer experience audit. Actually tests your onboarding: navigates docs, tries the getting started flow, times TTHW, screenshots errors. |
| `/qa` | QA Lead | Test your app, find bugs, fix them with atomic commits, re-verify. Auto-generates regression tests for every fix. |
| `/qa-only` | QA Reporter | Same methodology as /qa but report only. Pure bug report without code changes. |
| `/scrape` | Data Extractor | Pull data from a web page. First call prototypes; codified call runs in ~200ms. |
| `/skillify` | Skill Builder | Codify the most recent successful `/scrape` flow into a permanent browser-skill. |

---

### 3. Release + Deploy (Shipping to Production)

| Skill | Specialist Role | What It Does |
|-------|----------------|--------------|
| `/ship` | Release Engineer | Sync main, run tests, audit coverage, push, open PR. Bootstraps test frameworks if you don't have one. |
| `/land-and-deploy` | Release Engineer | Merge the PR, wait for CI and deploy, verify production health. One command from "approved" to "verified in production." |
| `/canary` | SRE | Post-deploy monitoring loop. Watches for console errors, performance regressions, and page failures. |
| `/landing-report` | Dashboard | Read-only dashboard for the workspace-aware ship queue. |
| `/document-release` | Technical Writer | Update all project docs to match what you just shipped. Catches stale READMEs automatically. |
| `/document-generate` | Documentation Author | Generate missing docs from scratch using the Diataxis framework. Researches the codebase first, then writes reference / how-to / tutorial / explanation docs. |
| `/setup-deploy` | Deploy Configurator | One-time setup for `/land-and-deploy`. Detects your platform, production URL, and deploy commands. |
| `/gaganfoxwell-upgrade` | Self-Updater | Upgrade gaganfoxwell to latest. Detects global vs vendored install, syncs both, shows what changed. |

---

### 4. Operational + Memory (Running & Learning)

| Skill | Specialist Role | What It Does |
|-------|----------------|--------------|
| `/context-save` | Session Manager | Save working context (git state, decisions, remaining work). |
| `/context-restore` | Session Manager | Resume from a saved context, even across Conductor workspaces. |
| `/learn` | Memory | Manage what gaganfoxwell learned across sessions. Review, search, prune, and export project-specific patterns, pitfalls, and preferences. |
| `/retro` | Eng Manager | Team-aware weekly retro. Per-person breakdowns, shipping streaks, test health trends, growth opportunities. |
| `/health` | Quality Dashboard | Code quality dashboard (type checker, linter, tests, dead code). |
| `/benchmark` | Performance Engineer | Performance regression detection (page load, Core Web Vitals). |
| `/benchmark-models` | Benchmark Runner | Cross-model benchmark for skills (Claude, GPT, Gemini side-by-side). |
| `/cso` | Chief Security Officer | OWASP Top 10 + STRIDE threat model. Zero-noise: 17 false positive exclusions, 8/10+ confidence gate. |
| `/setup-gbrain` | Brain Onboarding | Set up gbrain for cross-machine session memory sync. |
| `/sync-gbrain` | Brain Sync | Keep gbrain current with this repo's code; refresh agent search guidance in CLAUDE.md. |

---

### 5. Browser + Agent Integration (Web Interaction)

| Skill | Specialist Role | What It Does |
|-------|----------------|--------------|
| `/browse` | QA Engineer | Give the agent eyes. Real Chromium browser, real clicks, real screenshots. ~100ms per command. |
| `/open-gaganfoxwell-browser` | Browser Launcher | Launch Gaganfoxwell Browser with sidebar, anti-bot stealth, and auto model routing. |
| `/setup-browser-cookies` | Session Manager | Import cookies from your real browser (Chrome, Arc, Brave, Edge) into the headless session. |
| `/pair-agent` | Multi-Agent Coordinator | Share your browser with any AI agent. One command, one paste, connected. Scoped tokens, tab isolation, rate limiting. |

---

### 6. iOS QA (Real Device Testing)

| Skill | Specialist Role | What It Does |
|-------|----------------|--------------|
| `/ios-qa` | iOS QA Engineer | Drive a real iPhone over USB CoreDevice via an embedded StateServer in the app. |
| `/ios-fix` | iOS Bug Fixer | Autonomous iOS bug fixer with regression snapshot capture. |
| `/ios-design-review` | iOS Designer | Designer's-eye QA on a real iPhone — 10-dimension Apple HIG rubric. |
| `/ios-clean` | iOS Cleanup | Strip DebugBridge + #if DEBUG wiring before a Release build. |
| `/ios-sync` | iOS Bridge Sync | Regenerate the iOS debug bridge against the latest upstream templates. |

---

### 7. Safety + Scoping (Protective Measures)

| Skill | Specialist Role | What It Does |
|-------|----------------|--------------|
| `/careful` | Safety Guard | Warn before destructive commands (rm -rf, DROP TABLE, force-push). Say "be careful" to activate. |
| `/freeze` | Edit Lock | Restrict file edits to one directory. Prevents accidental changes outside scope while debugging. |
| `/guard` | Full Safety | `/careful` + `/freeze` in one command. Maximum safety for prod work. |
| `/unfreeze` | Unlock | Remove the `/freeze` boundary. |

---

### 8. Standalone Tools (CLI Binaries)

| Command | What It Does |
|---------|--------------|
| `gaganfoxwell-model-benchmark` | Cross-model benchmark — run the same prompt through Claude, GPT, and Gemini; compare latency, tokens, cost. |
| `gaganfoxwell-taste-update` | Design taste learning — writes approvals and rejections from `/design-shotgun` into a persistent per-project taste profile. |
| `gaganfoxwell-egress` | Egress receipt auditor — every gaganfoxwell-initiated off-machine send writes a tamper-evident receipt. |
| `gaganfoxwell-context-bill` | Token bill-of-materials — read-only, offline audit of what an installed skills tree costs in tokens. |
| `gaganfoxwell-code-intelligence` | Code-intelligence provider picker — wraps GBrain, Sourcebot, and Graphify behind one interface. |
| `gaganfoxwell-verify-gate` | Verification stop hook — blocks a Claude Code turn from ending until the project's declared verify command passes. |
| `gaganfoxwell-wtree` | Working-tree fingerprint — prints a content hash of what's actually on disk. |
| `gaganfoxwell-evidence` | Verification-evidence ledger — records what ran against which working-tree fingerprint. |
| `gaganfoxwell-issue-guard` | Tracker-text trust envelope — fetches GitHub issue/PR text and wraps it in a labeled envelope. |
| `gaganfoxwell-ios-qa-daemon` | iOS QA daemon — Mac-side broker between an agent and a connected iPhone over USB CoreDevice. |
| `gaganfoxwell-ios-qa-mint` | iOS allowlist manager — owner-grant CLI for the tailnet allowlist. |
| `gaganfoxwell-ios-qa-regen` | iOS bridge regenerator — deterministically installs the canonical DebugBridge package. |

---

## The Ref System

Gaganfoxwell uses a **ref system** (`@e1`, `@e2`, `@c1`) for addressing page elements without CSS selectors:

1. Agent runs: `$B snapshot -i`
2. Server calls Playwright's `page.accessibility.snapshot()`
3. Parser walks the ARIA tree, assigns sequential refs: `@e1`, `@e2`, `@e3...`
4. For each ref, builds a Playwright Locator: `getByRole(role, { name }).nth(index)`
5. Stores `Map<string, RefEntry>` on the BrowserManager instance
6. Returns the annotated tree as plain text

Later, when the agent runs `$B click @e3`, the server resolves `@e3` → Locator → `locator.click()`.

**Why Locators, not DOM mutation?**
- CSP (Content Security Policy) blocks DOM modification
- React/Vue/Svelte hydration can strip injected attributes
- Shadow DOM can't be reached from outside

Playwright Locators are external to the DOM — no CSP issues, no framework conflicts.

---

## Security Architecture

### Authentication
- **Bearer token auth:** Random UUID per session, written to `.gaganfoxwell/browse.json` (mode 0o600)
- **Localhost-only binding:** `127.0.0.1`, not reachable from network

### Dual-Listener Tunnel
- **Local listener:** Full command surface, cookie picker, health
- **Tunnel listener:** Locked allowlist for remote agents (`/connect`, `/command` only)

### Prompt Injection Defense (Sidebar Agent)
- **L1-L3:** Content filters (datamarking, hidden-element strip, ARIA scrubbing, URL blocklist)
- **L4:** ML classifier (22MB BERT-small ONNX model, runs locally)
- **L5:** Canary tokens (random system-prompt token whose leak means compromise)
- **L6:** Ensemble combiner (requires 2 classifiers to agree before blocking)

### Egress Receipt Ledger
Every off-machine send writes a hash-chained, tamper-evident receipt to `~/.gaganfoxwell/security/egress.jsonl` before sending. Inspect with `gaganfoxwell-egress list`, verify with `gaganfoxwell-egress verify`.

---

## Multi-Agent Support (10 Hosts)

| Agent | Flag | Skills Install To |
|-------|------|-------------------|
| Claude Code | (default) | `~/.claude/skills/gaganfoxwell/` |
| OpenAI Codex CLI | `--host codex` | `~/.codex/skills/gaganfoxwell-*/` |
| OpenCode | `--host opencode` | `~/.config/opencode/skills/gaganfoxwell-*/` |
| Cursor | `--host cursor` | `~/.cursor/skills/gaganfoxwell-*/` |
| Factory Droid | `--host factory` | `~/.factory/skills/gaganfoxwell-*/` |
| Slate | `--host slate` | `~/.slate/skills/gaganfoxwell-*/` |
| Kiro | `--host kiro` | `~/.kiro/skills/gaganfoxwell-*/` |
| Hermes | `--host hermes` | `~/.hermes/skills/gaganfoxwell-*/` |
| GBrain (mod) | `--host gbrain` | `~/.gbrain/skills/gaganfoxwell-*/` |
| OpenClaw | via Claude | Claude Code sessions |

---

## Quick Start

```bash
# Install
git clone --single-branch --depth 1 https://github.com/Gagan-k0/baton-gaganfoxwel.git ~/.claude/skills/gaganfoxwell
cd ~/.claude/skills/gaganfoxwell && ./setup

# Try it
/office-hours          # Reframe your product idea
/plan-ceo-review       # CEO-level challenge
/review                # Find bugs that pass CI
/qa https://staging.example.com  # Browser-based QA
/ship                  # Run tests, push, open PR
```

---

## Key Files

| File | Purpose |
|------|---------|
| `ARCHITECTURE.md` | System design and internals |
| `CONTRIBUTING.md` | Development workflow |
| `ETHOS.md` | Builder philosophy |
| `BROWSER.md` | Full browser command reference |
| `CHANGELOG.md` | Version history |
| `USING_GBRAIN_WITH_GAGANFOXWELL.md` | GBrain integration guide |

---

## Build Commands

```bash
bun install              # install dependencies
bun run test             # run free tests (no API spend, ~90-100s)
bun run build            # generate docs + compile binaries
bun run gen:skill-docs   # regenerate SKILL.md files from templates
bun run skill:check      # health dashboard for all skills
```

---

## Philosophy

### Boil the Ocean
When the complete implementation costs minutes more than the shortcut — do the complete thing. Every time. The old caution ("don't boil the ocean") has quietly turned into an excuse.

### Search Before Building
The 1000x engineer's first instinct is "has someone already solved this?" not "let me design it from scratch." Three layers: tried-and-true (Layer 1), new-and-popular (Layer 2), first-principles (Layer 3).

### User Sovereignty
AI models recommend. Users decide. When two models agree on a change but the user says "no" — the user is right. Always.

---

**License:** MIT | **Version:** 1.69.0 | **Runtime:** Bun v1.0+
