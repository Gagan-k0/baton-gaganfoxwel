# GStack vs Baton — Full Comparison & Integration Guide

Two AI engineering tools, two different philosophies, two different problems.

---

## At a Glance

| | GStack | Baton |
|---|---|---|
| **Creator** | Garry Tan (YC CEO) | Rakshan Shetty |
| **License** | MIT | AGPL-3.0 |
| **Runtime** | Bun (compiled binary) | Node.js ≥24 |
| **What it is** | Workflow toolkit — gives agents specialist roles + a browser | Coordination hub — orchestrates multiple agents on one repo |
| **Core question** | "How does the agent do the work?" | "Which agent does what, and how do they hand off?" |
| **Tagline** | "Turn Claude Code into a virtual engineering team" | "Plan on your expensive agent. Pass the baton to your cheap one." |
| **Version** | 1.69.0 | 0.1.3 |
| **Tests** | ~7,000 | ~266 |
| **Dependencies** | Playwright, @huggingface/transformers, ngrok | commander, execa, gray-matter, zod, @modelcontextprotocol/sdk |

---

## Problem Space

### GStack solves: Execution quality
- Agents need structured roles to produce good work
- Agents need eyes (browser) to test what they build
- Each step of a sprint needs a specialist (CEO, designer, reviewer, QA, etc.)
- Security for safe browser interaction

### Baton solves: Multi-agent coordination
- Multiple agents clobber the same files
- Switching agents loses all context
- Each agent re-reads the whole repo to orient (wasting tokens)
- Sessions die mid-task with no way to resume

---

## Architecture Comparison

### GStack Architecture
```
Claude Code → CLI (compiled binary) → HTTP → Server (Bun.serve) → CDP → Chromium
```
- **Daemon:** Persistent Chromium browser daemon
- **Runtime:** Bun (single ~58MB compiled binary)
- **State:** `.gstack/browse.json` (browser state)
- **Protocol:** HTTP to Chromium DevTools Protocol
- **Skills:** Markdown files (SKILL.md) loaded by the agent
- **Key files:** `browse/src/server.ts`, `browse/src/commands.ts`, `browse/src/snapshot.ts`

### Baton Architecture
```
baton serve → node:http (127.0.0.1) → Event Bus → SSE → Dashboard
                ↓
         SQLite (git history, signals, memory)
                ↓
         graphify (knowledge graph backend)
```
- **Daemon:** Zero-dependency HTTP server (raw `node:http`)
- **Runtime:** Node.js ≥24
- **State:** `.baton/` (tasks, memory, worktrees, history.db)
- **Protocol:** SSE for realtime, JSON API
- **Skills:** File-backed SKILL.md bundles + catalog
- **Key files:** `src/server.ts`, `src/events.ts`, `src/memory.ts`, `src/signals.ts`

### Key Difference
GStack is a **session tool** — you invoke skills inside an agent session. Baton is a **daemon tool** — it runs in the background coordinating multiple sessions.

---

## Feature-by-Feature Comparison

### 1. Agent Coordination

| Feature | GStack | Baton |
|---------|--------|-------|
| Multi-agent support | 10 hosts (Claude, Codex, Cursor, etc.) | 6 agents (Claude, Cursor, Codex, Gemini, Aider, OpenCode) |
| How agents are coordinated | Via slash commands (`/pair-agent`) | Via daemon + worktrees + MCP |
| File conflict prevention | Not built-in | Every task gets isolated git worktree |
| Live edit signals | Not built-in | Realtime "who's editing what" dashboard |
| Overlap warnings | Not built-in | Two sessions on one file → warning before conflict |
| Agent routing | Not built-in | `baton route` picks right agent per task |

**Winner:** Baton. GStack supports more agents but doesn't coordinate them. Baton actively prevents conflicts.

---

### 2. Session Handoff

| Feature | GStack | Baton |
|---------|--------|-------|
| Save context | `/context-save` | `baton pass` → `HANDOFF.md` |
| Restore context | `/context-restore` | `baton take` + `baton resume` |
| Cross-agent handoff | Not designed for this | Core feature — plan on Claude, execute on Cursor |
| Cost estimate | Not included | `est_cost_usd` in brief |
| Brief format | Freeform save | Structured: objective, plan, checklist, files, git state, graph excerpt |
| Continuation | Not built-in | `baton continue` + progress ledger |

**Winner:** Baton. GStack's context save/restore is for resuming the same agent. Baton's handoff is designed for passing between different agents.

---

### 3. Knowledge & Memory

| Feature | GStack | Baton |
|---------|--------|-------|
| Knowledge base | GBrain (Supabase or PGLite) | graphify knowledge graph + CODEBASE.md |
| Memory type | Operational learnings (per-project JSONL) | Evidence-anchored facts (pinned to commits + file hashes) |
| Anti-hallucination | Not explicit | Core feature — stale facts withheld from agents |
| Cross-session memory | Via GBrain | Via `.baton/memory/facts/` |
| Knowledge graph | Not built-in | Queryable graph (agents navigate instead of grepping) |
| Token savings | Not measured | ~300× cheaper than reading files |
| Memory audit | Not built-in | `baton memory list` with fresh/aging/stale badges |
| Secret rejection | Not explicit | Memory rejects keys/tokens/JWTs |
| Context pack | Not built-in | `baton kb context` — budgeted brief for external chatbots |

**Winner:** Baton. Evidence-anchored memory with staleness detection is more robust than GStack's operational learnings. The knowledge graph with token savings is a significant advantage.

---

### 4. Skills (Agent Playbooks)

| Feature | GStack | Baton |
|---------|--------|-------|
| Number of skills | 30+ built-in | Catalog of installable skills |
| Skill types | Plan, build, review, test, ship, safety | Bug fix, code review, efficiency, memory |
| Skill format | SKILL.md (Markdown) | SKILL.md + references/ (file bundles) |
| Skill generation | From `.tmpl` templates (auto-generated) | Hand-written + imported |
| Skill installation | Built-in (via `./setup`) | `baton skills install <id>` |
| Custom skills | Edit templates, regenerate | Write SKILL.md in `.baton/skills/` |
| Specialization | Deep — each skill is a specialist role | Broad — each skill is a workflow |
| Multi-file skills | Not supported (single SKILL.md) | Supported (SKILL.md + references/) |

**Winner:** GStack. More skills, deeper specialization, better template system. GStack's skills are the core product. Baton's skills are a secondary feature.

---

### 5. Browser & QA

| Feature | GStack | Baton |
|---------|--------|-------|
| Headless browser | Core feature — persistent Chromium daemon | Not built-in |
| Browser commands | `$B snapshot`, `$B click`, `$B screenshot`, etc. | Not available |
| Ref system | `@e1`, `@e2` for element addressing | Not available |
| Cookie import | From Chrome, Arc, Brave, Edge | Not available |
| QA workflow | `/qa` — find bugs, fix them, re-verify | Not available |
| Live browser | `/open-gstack-browser` with sidebar | Not available |
| iOS QA | `/ios-qa` — drive real iPhones over USB | Not available |
| Design tools | `/design-shotgun`, `/design-html`, `/design-review` | Not available |
| Browser security | Prompt injection defense (L1-L6) | Not available |

**Winner:** GStack. This is GStack's killer feature. Baton has no browser capabilities.

---

### 6. Security

| Feature | GStack | Baton |
|---------|--------|-------|
| Binding | Localhost-only (`127.0.0.1`) | Localhost-only (`127.0.0.1`) |
| Auth | Bearer token (UUID per session) | Loopback Origin + write gate |
| Cookie security | Keychain access (macOS), in-memory decrypt | Not applicable |
| Prompt injection defense | L1-L6 layered defense (ML classifier, canary tokens) | Not applicable |
| Egress ledger | Hash-chained, tamper-evident receipts | Not applicable |
| CSRF protection | Dual-listener tunnel architecture | Centralized anti-CSRF guard |
| Secret redaction | Not explicit | Memory rejects keys/tokens/JWTs |
| Tunnel security | Physical port separation for remote agents | Not applicable |

**Winner:** GStack. More comprehensive security model, especially for browser-related threats. Baton's security is adequate for its scope but less sophisticated.

---

### 7. Realtime Dashboard

| Feature | GStack | Baton |
|---------|--------|-------|
| Dashboard | Not built-in | React dashboard at `localhost:7077` |
| SSE events | Not built-in | Full event bus with 200-event ring buffer |
| Live view | Not built-in | Activity, Conflicts, Graph, Memory, History |
| Agent terminals | Not built-in | Interactive PTY sessions via tmux |
| Headless launch | Not built-in | `baton start` launches agents from UI |
| Write mode | Not applicable | `--write` flag enables mutations |
| Agent roster | Not built-in | Per-agent installed/MCP wired/live sessions |
| Demo mode | Not built-in | Demo data for showcasing |

**Winner:** Baton. GStack has no dashboard. Baton's dashboard is a full command center.

---

### 8. Worktree Isolation

| Feature | GStack | Baton |
|---------|--------|-------|
| Worktree per task | Not built-in | Core feature — every task gets own worktree + branch |
| Branch naming | Not managed | `baton/<slug>` branches |
| Merge workflow | `/ship` handles PR | `baton merge` squash + merge |
| Orphan cleanup | Not built-in | `baton doctor` + `baton clean` |
| Multi-repo hub | Not built-in | Centralized hub over multiple repos |

**Winner:** Baton. GStack doesn't manage worktrees at all.

---

### 9. Release & Deploy

| Feature | GStack | Baton |
|---------|--------|-------|
| Ship workflow | `/ship` — sync, test, review, push, open PR | Not built-in |
| Deploy | `/land-and-deploy` — merge, CI, deploy, verify | Not built-in |
| Canary | `/canary` — post-deploy monitoring | Not built-in |
| Document release | `/document-release` — update all docs | Not built-in |
| Bug recurrence | Not built-in | `baton bugs` — was this fixed before? |
| Completion reports | Not built-in | Merge summary + files + commits persisted |

**Winner:** GStack. Full release pipeline. Baton has no deploy capabilities.

---

### 10. Testing

| Feature | GStack | Baton |
|---------|--------|-------|
| Test framework | 3-tier (static, E2E, LLM-as-judge) | vitest |
| Free tests | Tier 1 — static validation | All tests are free |
| E2E tests | `claude -p` subprocess (~$3.85/run) | Not applicable |
| Test coverage | ~7,000 tests | ~266 tests |
| CI | GitHub Actions + GitLab CI | GitHub Actions |
| Eval tools | `eval:watch`, `eval:compare`, `eval:summary` | Not built-in |

**Winner:** GStack. More comprehensive testing, but Baton's tests are sufficient for its scope.

---

### 11. CLI & UX

| Feature | GStack | Baton |
|---------|--------|-------|
| Primary interface | Slash commands inside agent sessions | Terminal CLI + dashboard |
| Installation | `git clone` + `./setup` | `npm install -g batonhq` |
| Configuration | `~/.gstack/config.yaml` | `baton.config.json` (per-project) |
| Help | `--help` on each command | `baton --help` |
| Doctor | Not built-in | `baton doctor` audits junk |
| Self-update | `/gstack-upgrade` | Not built-in |
| Usage tracking | `gstack-analytics` | `baton usage` + token tracking |

**Winner:** Tie. Different interfaces for different use cases.

---

## Summary Scorecard

| Category | GStack | Baton | Winner |
|----------|--------|-------|--------|
| Agent Coordination | ⭐⭐ | ⭐⭐⭐⭐⭐ | Baton |
| Session Handoff | ⭐⭐ | ⭐⭐⭐⭐⭐ | Baton |
| Knowledge & Memory | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Baton |
| Skills (Playbooks) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | GStack |
| Browser & QA | ⭐⭐⭐⭐⭐ | ⭐ | GStack |
| Security | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | GStack |
| Realtime Dashboard | ⭐ | ⭐⭐⭐⭐⭐ | Baton |
| Worktree Isolation | ⭐ | ⭐⭐⭐⭐⭐ | Baton |
| Release & Deploy | ⭐⭐⭐⭐⭐ | ⭐ | GStack |
| Testing | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | GStack |
| CLI & UX | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Tie |
| **Overall** | **Execution** | **Coordination** | **Complementary** |

---

## They Solve Different Problems

**GStack** answers: "How do I make one agent do excellent work?"
- Structured roles (CEO, designer, reviewer, QA)
- Browser for real testing
- Security for safe browsing
- Full release pipeline

**Baton** answers: "How do I make multiple agents work together?"
- Isolated worktrees (no file conflicts)
- Session handoff (no lost context)
- Knowledge graph (no wasted tokens)
- Realtime dashboard (no blind spots)

---

## Integration Analysis

### Can They Be Integrated?

**Yes — they are complementary, not competing.** The integration is feasible and valuable.

### The Integration Boundary

Both projects use the **same skill format**: SKILL.md files with YAML frontmatter + Markdown body. This is the integration seam.

```
GStack skills:  SKILL.md (YAML frontmatter + agent instructions)
Baton skills:   SKILL.md (YAML frontmatter + agent instructions)
                ↓
                Same format, different content
```

### What Already Works

Baton's `bug-fix` skill already references Baton CLI commands inside its SKILL.md:

```markdown
# From Baton's bug-fix/SKILL.md:
"baton status" / "baton signals" / "check_files" / "recall_memory"
```

GStack's skills already reference browser commands:

```markdown
# From GStack's qa/SKILL.md:
$B snapshot -i
$B click @e3
$B screenshot
```

**They can coexist in the same agent session.**

### Technical Constraints

| Constraint | GStack | Baton | Impact |
|------------|--------|-------|--------|
| Runtime | Bun (compiled binary) | Node.js ≥24 | Cannot share runtime code |
| Daemon | Persistent Chromium daemon | Zero-dependency HTTP server | Must run as separate processes |
| State | `.gstack/browse.json` | `.baton/` (tasks, memory, worktrees) | Separate state directories |
| Protocol | HTTP to CDP | SSE + JSON API | Different communication protocols |
| Skills | SKILL.md loaded by agent | SKILL.md installed to agent dirs | Same format — can share |

**Key insight:** They cannot share daemon code, but they can share SKILL.md files and CLI calls.

---

## Three Integration Strategies

### Strategy 1: GStack Skills in Baton's Catalog (Easiest)

Add GStack skills to Baton's skill catalog so `baton skills install` can install them.

```
src/skills/bundled/
├── bug-fix/          # existing Baton skill
├── code-review/      # existing Baton skill
├── gstack-review/    # NEW — GStack's /review skill
├── gstack-qa/        # NEW — GStack's /qa skill
├── gstack-ship/      # NEW — GStack's /ship skill
└── ...
```

**How it works:**
1. Copy GStack's SKILL.md files into Baton's `src/skills/bundled/` directory
2. Add Baton-specific sections that reference `baton` CLI for coordination
3. Users install via `baton skills install gstack-qa`
4. The skill runs inside Claude Code with both GStack browser + Baton coordination

**Limitation:** GStack's browser daemon (`$B` commands) still needs Bun installed separately.

---

### Strategy 2: GStack Skills Calling Baton CLI (Medium)

Modify GStack's SKILL.md templates to include Baton coordination commands.

**Example: GStack's `/review` skill enhanced with Baton:**

```markdown
# Before (pure GStack):
/review — find bugs that pass CI but blow up in production

# After (GStack + Baton):
/review — find bugs that pass CI but blow up in production

## Pre-check (Baton coordination):
- `baton signals` — check if another agent is editing the same files
- `recall_memory` — check if this code was already reviewed
- `check_files` — verify no conflicts before editing

## Post-check (Baton memory):
- `save_memory` — record findings for future sessions
```

**How it works:**
1. GStack's template system adds Baton-aware sections
2. Skills check for Baton availability at runtime
3. If Baton is installed, coordination happens automatically
4. If Baton is not installed, skills work as before (graceful degradation)

---

### Strategy 3: Baton Daemon + GStack Browser (Advanced)

Run both daemons simultaneously — Baton for coordination, GStack for browser.

```
┌─────────────────────────────────────────────────┐
│  Baton Daemon (Node.js, port 7077)              │
│  - Worktree isolation                           │
│  - Session handoff                              │
│  - Knowledge graph                              │
│  - Realtime dashboard                           │
├─────────────────────────────────────────────────┤
│  GStack Daemon (Bun, random port)               │
│  - Persistent Chromium browser                  │
│  - Ref system (@e1, @e2)                        │
│  - Cookie import                                │
│  - Prompt injection defense                     │
├─────────────────────────────────────────────────┤
│  Agent Session (Claude Code)                    │
│  - Baton MCP tools (check_files, recall_memory) │
│  - GStack $B commands ($B snapshot, $B click)   │
│  - Both skills installed                        │
└─────────────────────────────────────────────────┘
```

**How it works:**
1. Baton's daemon coordinates worktrees, handoff, memory
2. GStack's daemon provides browser capabilities
3. Agent session uses both via MCP tools (`baton mcp`) and `$B` commands
4. Skills reference both: Baton for coordination, GStack for browser

---

## Concrete Integration Points

| What | GStack Side | Baton Side | How They Connect |
|------|-------------|------------|------------------|
| **Skills** | SKILL.md templates in `*/SKILL.md.tmpl` | SKILL.md files in `src/skills/bundled/` | Same format — copy/adapt |
| **Memory** | GBrain (Supabase/PGLite) | `.baton/memory/facts/` | Baton's is more robust (anti-hallucination) |
| **Knowledge** | Not built-in | graphify knowledge graph | Baton provides this |
| **Browser** | Persistent Chromium daemon | Not built-in | GStack provides this |
| **Coordination** | `/pair-agent` (basic) | Worktrees, signals, handoff | Baton provides this |
| **Release** | `/ship`, `/land-and-deploy` | `baton merge` | GStack is more complete |
| **MCP** | Not built-in | `baton mcp` tools | Baton provides this |
| **Dashboard** | Not built-in | React dashboard | Baton provides this |

---

## Implementation Roadmap

### Phase 1: Skill Bridge (1-2 days)
- Add GStack skills to Baton's catalog (`src/skills/bundled/gstack-*/`)
- Add Baton references to GStack's SKILL.md templates
- Test: install GStack skills via `baton skills install`
- **Files to modify:**
  - `src/skills/catalog.ts` — add GStack skill entries
  - `src/skills/bundled/` — add GStack SKILL.md files
  - GStack's `*/SKILL.md.tmpl` — add Baton coordination sections

### Phase 2: CLI Integration (3-5 days)
- Add `baton signals` / `check_files` calls to GStack review/qa skills
- Add `save_memory` calls to GStack ship/review skills
- Add `$B` command awareness to Baton's skill loader
- **Files to modify:**
  - GStack's `review/SKILL.md.tmpl` — add Baton pre-check
  - GStack's `qa/SKILL.md.tmpl` — add Baton memory save
  - GStack's `ship/SKILL.md.tmpl` — add Baton handoff
  - Baton's `src/skills/install.ts` — handle GStack skill format

### Phase 3: Unified Dashboard (1-2 weeks)
- Show GStack browser status in Baton's dashboard
- Show Baton worktree status in GStack's context
- Unified memory view (GBrain + Baton facts)
- **Files to modify:**
  - Baton's `web/src/` — add GStack browser panel
  - Baton's `src/server.ts` — proxy GStack status endpoint
  - Baton's `src/events.ts` — emit GStack browser events

---

## The Ideal Workflow (After Integration)

```
1. PLAN (GStack)
   /office-hours → /plan-ceo-review → /plan-eng-review
   (Structured planning with specialist roles)

2. CREATE (Baton)
   baton new "fix auth bug"
   (Isolated worktree + branch)

3. EXECUTE (GStack + Baton)
   /review → /qa → /design-review
   (GStack skills for execution, Baton for coordination)

4. COORDINATE (Baton)
   baton signals → check_files → recall_memory
   (Realtime conflict avoidance + memory)

5. HAND OFF (Baton)
   baton pass fix-auth --to cursor
   (Structured brief with cost estimate)

6. SHIP (GStack)
   /ship → /land-and-deploy → /canary
   (Full release pipeline)

7. REMEMBER (Baton)
   save_memory → baton memory list
   (Evidence-anchored facts for future sessions)
```

---

## Bottom Line

| If you need... | Use... |
|----------------|--------|
| One agent to do excellent work | GStack |
| Multiple agents to work together | Baton |
| Browser-based QA | GStack |
| Session handoff between agents | Baton |
| Full release pipeline | GStack |
| Realtime dashboard | Baton |
| Knowledge graph | Baton |
| 30+ specialist roles | GStack |
| Worktree isolation | Baton |
| **Both** | **Integrate them** |

**They are not competitors. They are puzzle pieces.**

### Integration Verdict

| Question | Answer |
|----------|--------|
| Can they share skills? | **Yes** — same SKILL.md format |
| Can they share memory? | **Yes** — both are Markdown files with frontmatter |
| Can they share the daemon? | **No** — different runtimes (Bun vs Node.js) |
| Can they run together? | **Yes** — both daemons, one agent session |
| Is it worth it? | **Yes** — GStack gets coordination, Baton gets browser |
| Effort to integrate? | **Low-Medium** — 1-2 weeks for full integration |

**The cleanest path:** Strategy 1 (GStack skills in Baton's catalog) + Strategy 2 (GStack skills calling Baton CLI). Strategy 3 (unified dashboard) is optional polish.
