# Gaganfoxwell Integration — Memory & Tracking

> **Project:** Integrate GStack (renamed to **gaganfoxwell**) into Baton
> **Created:** 2026-08-25
> **Status:** In Progress
> **Last Updated:** 2026-08-25

---

## Project Overview

Rename GStack to **gaganfoxwell** and integrate its skills into the Baton project. If Baton already has a feature, skip it. If not, implement it.

**GStack source:** `C:\Users\lenovo\Desktop\Baton-Multi-Agent-\gstack\`
**Baton source:** `C:\Users\lenovo\Desktop\Baton-Multi-Agent-\Baton-Multi-Agent-\`

---

## Naming Convention

| Old Name | New Name |
|----------|----------|
| GStack | gaganfoxwell |
| gstack | gaganfoxwell |
| GStack Browser | gaganfoxwell Browser |
| `/gstack-qa` | `/gaganfoxwell-qa` or `/qa` |
| `~/.gstack/` | `~/.gaganfoxwell/` |
| `.gstack/browse.json` | `.gaganfoxwell/browse.json` |
| `gstack-upgrade` | `gaganfoxwell-upgrade` |

---

## Skill Inventory

### Baton Current Skills (12 total — KEEP ALL)

| # | Skill | Status | Action |
|---|-------|--------|--------|
| 1 | basic-setup | KEEP | No change |
| 2 | bug-fix | KEEP | No change |
| 3 | code-review | KEEP | No change |
| 4 | handoff | KEEP | No change |
| 5 | lean-code | KEEP | No change |
| 6 | memory-light | KEEP | No change |
| 7 | stack-migration | KEEP | No change |
| 8 | token-efficient-coding | KEEP | No change |
| 9 | traceable-changes | KEEP | No change |
| 10 | verify-before-done | KEEP | No change |
| 11 | map-codebase | KEEP | No change (inline) |
| 12 | safe-refactor | KEEP | No change (inline) |

---

### GStack Skills — Skip (Baton Already Has)

These skills exist in both projects. Baton's version is kept. GStack versions are NOT ported.

| # | GStack Skill | Baton Equivalent | Why Skip |
|---|-------------|------------------|----------|
| 1 | bug-fix | bug-fix | Baton has identical functionality |
| 2 | code-review | code-review | Baton has 3-axis review (Standards, Spec, Security) |
| 3 | handoff | handoff | Baton has HANDOFF.md with cost estimates |
| 4 | context-save | handoff | Baton's handoff covers this |
| 5 | context-restore | handoff | Baton's resume covers this |
| 6 | learn | memory-light | Baton has evidence-anchored memory |
| 7 | lean-code | lean-code | identical concept |
| 8 | token-efficient-coding | token-efficient-coding | identical concept |
| 9 | traceable-changes | traceable-changes | identical concept |
| 10 | verify-before-done | verify-before-done | identical concept |

**Total skipped: 10**

---

### GStack Skills — Implement in Baton (gaganfoxwell)

These are GStack skills that Baton does NOT have. Port them as gaganfoxwell skills.

#### Phase 1: Plan-Mode Skills (Priority: HIGH)

| # | GStack Skill | New Name | Description | Complexity |
|---|-------------|----------|-------------|------------|
| 1 | office-hours | gaganfoxwell-office-hours | YC-style product reframing. Six forcing questions. | Low — pure prompt |
| 2 | plan-ceo-review | gaganfoxwell-ceo-review | CEO-level scope challenge. 4 modes. | Low — pure prompt |
| 3 | plan-eng-review | gaganfoxwell-eng-review | Architecture lock. Data flow, edge cases, tests. | Low — pure prompt |
| 4 | plan-design-review | gaganfoxwell-design-review | Design dimension scoring 0-10. AI slop detection. | Low — pure prompt |
| 5 | plan-devex-review | gaganfoxwell-devex-review | Developer experience audit. TTHW, friction points. | Low — pure prompt |
| 6 | autoplan | gaganfoxwell-autoplan | Auto-run CEO → design → eng review pipeline. | Medium — chains skills |
| 7 | spec | gaganfoxwell-spec | Turn vague intent into executable spec (5 phases). | Medium — GitHub integration |
| 8 | design-consultation | gaganfoxwell-design-consult | Build design system from scratch. | Medium — needs image gen |

#### Phase 2: Implementation Skills (Priority: HIGH)

| # | GStack Skill | New Name | Description | Complexity |
|---|-------------|----------|-------------|------------|
| 9 | review | gaganfoxwell-review | Pre-landing PR review. Find bugs that pass CI. | Medium — needs diff analysis |
| 10 | investigate | gaganfoxwell-investigate | Systematic root-cause debugging. Iron Law. | Low — pure prompt |
| 11 | design-review | gaganfoxwell-design-audit | Live-site visual audit + fix loop. | HIGH — needs browser |
| 12 | design-shotgun | gaganfoxwell-design-shotgun | Generate 4-6 AI mockup variants. | HIGH — needs image gen |
| 13 | design-html | gaganfoxwell-design-html | Turn mockup into production HTML/CSS. | HIGH — needs Pretext |
| 14 | devex-review | gaganfoxwell-devex-audit | Live developer experience audit. | HIGH — needs browser |
| 15 | qa | gaganfoxwell-qa | Browser-based QA. Find bugs, fix, re-verify. | HIGH — needs browser |
| 16 | qa-only | gaganfoxwell-qa-report | QA report without code changes. | HIGH — needs browser |
| 17 | scrape | gaganfoxwell-scrape | Pull data from web pages. | HIGH — needs browser |
| 18 | skillify | gaganfoxwell-skillify | Codify scrape flow into permanent skill. | HIGH — needs browser |

#### Phase 3: Release Skills (Priority: MEDIUM)

| # | GStack Skill | New Name | Description | Complexity |
|---|-------------|----------|-------------|------------|
| 19 | ship | gaganfoxwell-ship | Run tests, review, push, open PR. | Medium — git + CI |
| 20 | land-and-deploy | gaganfoxwell-deploy | Merge PR, wait for CI, verify production. | Medium — CI/CD |
| 21 | canary | gaganfoxwell-canary | Post-deploy monitoring loop. | HIGH — needs browser |
| 22 | document-release | gaganfoxwell-doc-release | Update all docs to match shipped code. | Medium — file analysis |
| 23 | document-generate | gaganfoxwell-doc-generate | Generate Diataxis docs from code. | Medium — file analysis |
| 24 | setup-deploy | gaganfoxwell-setup-deploy | One-time deploy config detection. | Low — platform detection |
| 25 | landing-report | gaganfoxwell-landing-report | Read-only ship queue dashboard. | Low — CLI only |

#### Phase 4: Operational Skills (Priority: MEDIUM)

| # | GStack Skill | New Name | Description | Complexity |
|---|-------------|----------|-------------|------------|
| 26 | health | gaganfoxwell-health | Code quality dashboard. | Medium — tool integration |
| 27 | benchmark | gaganfoxwell-benchmark | Performance regression detection. | HIGH — needs browser |
| 28 | benchmark-models | gaganfoxwell-bench-models | Cross-model benchmark. | Medium — API calls |
| 29 | retro | gaganfoxwell-retro | Weekly engineering retrospective. | Medium — git analysis |
| 30 | cso | gaganfoxwell-cso | OWASP + STRIDE security audit. | Medium — pure prompt |
| 31 | plan-tune | gaganfoxwell-plan-tune | Self-tuning question sensitivity. | Low — config only |

#### Phase 5: Browser Skills (Priority: LOW — requires Bun runtime)

| # | GStack Skill | New Name | Description | Complexity |
|---|-------------|----------|-------------|------------|
| 32 | browse | gaganfoxwell-browse | Headless Chromium browser daemon. | CRITICAL — needs Bun |
| 33 | open-gstack-browser | gaganfoxwell-browser | Launch visible browser with sidebar. | CRITICAL — needs Bun |
| 34 | setup-browser-cookies | gaganfoxwell-cookies | Import cookies from real browser. | CRITICAL — needs Bun |
| 35 | pair-agent | gaganfoxwell-pair | Pair remote agent with browser. | CRITICAL — needs Bun |

#### Phase 6: iOS Skills (Priority: LOW — Mac only)

| # | GStack Skill | New Name | Description | Complexity |
|---|-------------|----------|-------------|------------|
| 36 | ios-qa | gaganfoxwell-ios-qa | Drive real iPhones over USB. | HIGH — Mac + USB |
| 37 | ios-fix | gaganfoxwell-ios-fix | Autonomous iOS bug fixer. | HIGH — Mac + USB |
| 38 | ios-design-review | gaganfoxwell-ios-design | iOS HIG audit on real device. | HIGH — Mac + USB |
| 39 | ios-clean | gaganfoxwell-ios-clean | Strip DebugBridge before Release. | Medium — SPM |
| 40 | ios-sync | gaganfoxwell-ios-sync | Regenerate iOS debug bridge. | Medium — SPM |

#### Phase 7: Safety Skills (Priority: LOW)

| # | GStack Skill | New Name | Description | Complexity |
|---|-------------|----------|-------------|------------|
| 41 | careful | gaganfoxwell-careful | Warn before destructive commands. | Low — pure prompt |
| 42 | freeze | gaganfoxwell-freeze | Lock edits to one directory. | Low — pure prompt |
| 43 | guard | gaganfoxwell-guard | careful + freeze combined. | Low — pure prompt |
| 44 | unfreeze | gaganfoxwell-unfreeze | Remove freeze boundary. | Low — pure prompt |

#### Phase 8: Utility Skills (Priority: LOW)

| # | GStack Skill | New Name | Description | Complexity |
|---|-------------|----------|-------------|------------|
| 45 | make-pdf | gaganfoxwell-pdf | Markdown to publication-quality PDF. | Medium — rendering |
| 46 | diagram | gaganfoxwell-diagram | English to mermaid/excalidraw/SVG. | Medium — rendering |
| 47 | setup-gbrain | gaganfoxwell-brain-setup | Set up gbrain knowledge base. | Medium — DB setup |
| 48 | sync-gbrain | gaganfoxwell-brain-sync | Keep gbrain current with repo code. | Medium — indexing |

**Total to implement: 48**

---

## Implementation Priority Matrix

### MUST HAVE (Phase 1-2, ~15 skills)
These are the core value-add skills that Baton doesn't have:

1. gaganfoxwell-office-hours
2. gaganfoxwell-ceo-review
3. gaganfoxwell-eng-review
4. gaganfoxwell-design-review
5. gaganfoxwell-devex-review
6. gaganfoxwell-autoplan
7. gaganfoxwell-spec
8. gaganfoxwell-review
9. gaganfoxwell-investigate
10. gaganfoxwell-qa
11. gaganfoxwell-qa-report
12. gaganfoxwell-ship
13. gaganfoxwell-deploy
14. gaganfoxwell-cso
15. gaganfoxwell-retro

### SHOULD HAVE (Phase 3-4, ~15 skills)
These add significant value:

16. gaganfoxwell-design-consult
17. gaganfoxwell-design-html
18. gaganfoxwell-design-shotgun
19. gaganfoxwell-doc-release
20. gaganfoxwell-doc-generate
21. gaganfoxwell-setup-deploy
22. gaganfoxwell-landing-report
23. gaganfoxwell-health
24. gaganfoxwell-benchmark
25. gaganfoxwell-bench-models
26. gaganfoxwell-plan-tune
27. gaganfoxwell-scrape
28. gaganfoxwell-skillify
29. gaganfoxwell-canary
30. gaganfoxwell-devex-audit

### NICE TO HAVE (Phase 5-8, ~18 skills)
These require external dependencies or are niche:

31. gaganfoxwell-browse (needs Bun)
32. gaganfoxwell-browser (needs Bun)
33. gaganfoxwell-cookies (needs Bun)
34. gaganfoxwell-pair (needs Bun)
35-39. iOS skills (needs Mac)
40-43. Safety skills
44-48. Utility skills

---

## How to Use gaganfoxwell Skills Inside Baton

### Installation

```bash
# Install gaganfoxwell skills into Baton's catalog
cd Baton-Multi-Agent-/Baton-Multi-Agent-
baton skills install gaganfoxwell-office-hours
baton skills install gaganfoxwell-ceo-review
baton skills install gaganfoxwell-qa
# ... etc

# Or install all at once
baton skills install --all gaganfoxwell-*
```

### Usage in Agent Sessions

**Step 1: Create isolated worktree (Baton)**
```bash
baton new "build user auth feature"
cd .baton/wt/build-user-auth-feature
```

**Step 2: Plan with gaganfoxwell skills (inside agent session)**
```bash
# Inside Claude Code / Cursor / Codex
/gaganfoxwell-office-hours        # Reframe the product idea
/gaganfoxwell-ceo-review          # CEO-level challenge
/gaganfoxwell-eng-review          # Lock architecture
```

**Step 3: Execute with gaganfoxwell + Baton coordination**
```bash
# Baton coordination
baton signals                     # Check who's editing what
check_files src/auth.ts           # Is this file busy?

# gaganfoxwell execution
/gaganfoxwell-review              # Code review
/gaganfoxwell-qa https://staging.app.com  # Browser QA
```

**Step 4: Hand off to cheaper agent (Baton)**
```bash
baton pass build-user-auth --to cursor
# On Cursor:
baton take build-user-auth
```

**Step 5: Ship with gaganfoxwell**
```bash
/gaganfoxwell-ship                # Run tests, push, open PR
/gaganfoxwell-deploy              # Merge, CI, verify
```

**Step 6: Remember (Baton memory)**
```bash
save_memory "Auth uses JWT with 24h expiry" --files src/auth.ts
baton memory list                 # Verify it's saved
```

### Skill Discovery

Agents discover gaganfoxwell skills through Baton's catalog:

```bash
baton skills list                 # Shows all 60+ skills
baton skills list --tag gaganfoxwell  # Shows only gaganfoxwell skills
baton skills search "review"      # Find review-related skills
```

### MCP Integration

gaganfoxwell skills can use Baton's MCP tools:

```
# In SKILL.md files:
- check_files     → Baton MCP: is this file busy?
- recall_memory   → Baton MCP: what do we know about this?
- save_memory     → Baton MCP: record this fact
- query_graph     → Baton MCP: navigate the codebase
- who_touched     → Baton MCP: who edited this file?
```

---

## Technical Integration Notes

### Runtime Boundary

| Component | Runtime | Cannot Share |
|-----------|---------|--------------|
| Baton daemon | Node.js ≥24 | — |
| gaganfoxwell browser daemon | Bun | Different process |
| Agent session | Agent's runtime | Skills are Markdown |

**Solution:** Run both daemons. Skills reference both via CLI calls.

### Skill Format Compatibility

Both projects use identical SKILL.md format:
- YAML frontmatter (name, description)
- Markdown body (instructions)
- Optional references/ directory

**No format conversion needed.**

### File Locations

| What | Baton Location | gaganfoxwell Location |
|------|---------------|----------------------|
| Skills source | `src/skills/bundled/` | `*/SKILL.md.tmpl` |
| Skills installed | `.claude/skills/` or `.cursor/rules/` | `~/.claude/skills/gaganfoxwell/` |
| Memory | `.baton/memory/facts/` | `~/.gaganfoxwell/learnings/` |
| State | `.baton/` | `.gaganfoxwell/browse.json` |
| Config | `baton.config.json` | `~/.gaganfoxwell/config.yaml` |

---

## Files to Modify

### Baton Side

| File | Change |
|------|--------|
| `src/skills/catalog.ts` | Add gaganfoxwell skill entries |
| `src/skills/bundled/` | Add gaganfoxwell SKILL.md files |
| `src/skills/install.ts` | Handle gaganfoxwell skill format |
| `src/commands/skills.ts` | Add `--gaganfoxwell` filter |
| `web/src/` | Add gaganfoxwell browser panel (Phase 3) |

### gaganfoxwell Side (templates)

| File | Change |
|------|--------|
| `*/SKILL.md.tmpl` | Add Baton coordination sections |
| Add `baton signals` pre-check | To review, qa, ship skills |
| Add `save_memory` post-check | To review, ship, retro skills |
| Add `recall_memory` pre-check | To all skills |

---

## Progress Tracker

### Phase 1: Plan-Mode Skills
- [x] gaganfoxwell-office-hours
- [x] gaganfoxwell-ceo-review
- [x] gaganfoxwell-eng-review
- [ ] gaganfoxwell-design-review
- [ ] gaganfoxwell-devex-review
- [ ] gaganfoxwell-autoplan
- [ ] gaganfoxwell-spec
- [ ] gaganfoxwell-design-consult

### Phase 2: Implementation Skills
- [x] gaganfoxwell-review
- [ ] gaganfoxwell-investigate
- [ ] gaganfoxwell-design-audit
- [ ] gaganfoxwell-design-shotgun
- [ ] gaganfoxwell-design-html
- [ ] gaganfoxwell-devex-audit
- [ ] gaganfoxwell-qa
- [ ] gaganfoxwell-qa-report
- [ ] gaganfoxwell-scrape
- [ ] gaganfoxwell-skillify

### Phase 3: Release Skills
- [ ] gaganfoxwell-ship
- [ ] gaganfoxwell-deploy
- [ ] gaganfoxwell-canary
- [ ] gaganfoxwell-doc-release
- [ ] gaganfoxwell-doc-generate
- [ ] gaganfoxwell-setup-deploy
- [ ] gaganfoxwell-landing-report

### Phase 4: Operational Skills
- [ ] gaganfoxwell-health
- [ ] gaganfoxwell-benchmark
- [ ] gaganfoxwell-bench-models
- [ ] gaganfoxwell-retro
- [ ] gaganfoxwell-cso
- [ ] gaganfoxwell-plan-tune

### Phase 5: Browser Skills (requires Bun)
- [ ] gaganfoxwell-browse
- [ ] gaganfoxwell-browser
- [ ] gaganfoxwell-cookies
- [ ] gaganfoxwell-pair

### Phase 6: iOS Skills (requires Mac)
- [ ] gaganfoxwell-ios-qa
- [ ] gaganfoxwell-ios-fix
- [ ] gaganfoxwell-ios-design
- [ ] gaganfoxwell-ios-clean
- [ ] gaganfoxwell-ios-sync

### Phase 7: Safety Skills
- [ ] gaganfoxwell-careful
- [ ] gaganfoxwell-freeze
- [ ] gaganfoxwell-guard
- [ ] gaganfoxwell-unfreeze

### Phase 8: Utility Skills
- [ ] gaganfoxwell-pdf
- [ ] gaganfoxwell-diagram
- [ ] gaganfoxwell-brain-setup
- [ ] gaganfoxwell-brain-sync

---

## Key Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-25 | Rename GStack to gaganfoxwell | User request |
| 2026-08-25 | Skip 10 skills (Baton already has) | No duplication |
| 2026-08-25 | Implement 48 skills in phases | Prioritize value |
| 2026-08-25 | Browser skills in Phase 5 | Requires Bun runtime |
| 2026-08-25 | iOS skills in Phase 6 | Mac-only, niche |

---

## Notes

- GStack's browser daemon requires Bun — cannot be ported to Node.js directly
- Baton's evidence-anchored memory is superior to GStack's operational learnings
- Both projects use identical SKILL.md format — no conversion needed
- Skills can coexist in the same agent session
- Baton's MCP tools provide coordination that GStack lacks
- gaganfoxwell skills should add Baton coordination calls (check_files, save_memory)
