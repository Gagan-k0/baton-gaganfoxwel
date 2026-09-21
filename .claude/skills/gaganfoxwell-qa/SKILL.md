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
user — click everything, fill every form, check every state. When you find bugs,
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
- `__next` in HTML → Next.js
- `csrf-token` meta tag → Rails
- `wp-content` in URLs → WordPress
- Client-side routing → SPA

---

## Phase 4: Explore

Visit pages systematically. At each page:

1. **Visual scan** — Look for layout issues
2. **Interactive elements** — Click buttons, links, controls. Do they work?
3. **Forms** — Fill and submit. Test empty, invalid, edge cases
4. **Navigation** — Check all paths in and out
5. **States** — Empty state, loading, error, overflow
6. **Console** — Any new JS errors after interactions?
7. **Responsiveness** — Check mobile viewport if relevant

**Depth judgment:** Spend more time on core features (homepage, dashboard,
checkout, search) and less on secondary pages.

---

## Phase 5: Document

Document each issue **immediately when found** — don't batch them.

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
2. **Write "Top 3 Things to Fix"** — the 3 highest-severity issues
3. **Write console health summary** — aggregate all console errors
4. **Save baseline** — write `baseline.json` for future regression tests

---

## Health Score Rubric

Compute each category score (0-100), then take the weighted average.

### Console (weight: 15%)
- 0 errors → 100
- 1-3 errors → 70
- 4-10 errors → 40
- 10+ errors → 10

### Links (weight: 10%)
- 0 broken → 100
- Each broken link → -15 (minimum 0)

### Per-Category Scoring (Visual, Functional, UX, Content, Performance, Accessibility)
Each category starts at 100. Deduct per finding:
- Critical issue → -25
- High issue → -15
- Medium issue → -8
- Low issue → -3
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
`score = Σ (category_score × weight)`

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
- [ ] SHIP — quality bar met
- [ ] FIX MORE — significant issues remain
- [ ] BLOCK — critical issues prevent shipping
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
baton memory add "QA: <url> — health score X/100, N issues fixed" --files docs/YYYY-MM-DD-<slug>-qa-report.md 2>/dev/null || true
```

---

## Completion

End with:
1. **Health score** — before and after fixes
2. **Issues found** — N critical, M high, P medium, Q low
3. **Issues fixed** — which ones were fixed
4. **Verdict** — ship/fix more/block
5. **Report location** — where the QA report was saved
