---
name: gaganfoxwell-qa-report
description: >-
  Report-only QA testing. Systematically tests a web application and produces a
  structured report with health score, screenshots, and repro steps — but never
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
health score, screenshots, and repro steps — but never fixes anything.

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

1. **Visual scan** — Look for layout issues
2. **Interactive elements** — Click buttons, links, controls. Do they work?
3. **Forms** — Fill and submit. Test empty, invalid, edge cases
4. **Navigation** — Check all paths in and out
5. **States** — Empty state, loading, error, overflow
6. **Console** — Any new JS errors after interactions?
7. **Responsiveness** — Check mobile viewport if relevant

**This is report-only.** Do NOT fix any issues found. Just document them.

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
- [ ] SHIP — quality bar met
- [ ] FIX FIRST — critical issues need fixing
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
8. **DO NOT FIX.** This is report-only. Just document issues.

---

## Baton Memory

```bash
baton memory add "QA report: <url> — health score X/100, N issues found" --files docs/YYYY-MM-DD-<slug>-qa-report.md 2>/dev/null || true
```

---

## Completion

End with:
1. **Health score** — X/100
2. **Issues found** — N critical, M high, P medium, Q low
3. **Verdict** — ship/fix first/block
4. **Report location** — where the QA report was saved
