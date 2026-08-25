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
1. **What happened** — clear description of the error
2. **Why it happened** — context about what went wrong
3. **What to do next** — actionable next steps

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
|              DX LIVE AUDIT — SCORECARD                              |
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
baton memory add "DX audit: <product> — score X/10, TTHW X min" --files docs/YYYY-MM-DD-<slug>-dx-audit.md 2>/dev/null || true
```

---

## Completion

End with:
1. **TTHW** — measured time and tier
2. **Overall DX Score** — X/10
3. **Top 3 strengths** — what works well
4. **Top 3 improvements** — what needs fixing
5. **Report location** — where the audit was saved
