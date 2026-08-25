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
and proceed — CEO review is read-only planning.

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
> statement and alternatives — it gives this review much sharper input. Want to
> run it first?"

Options:
- A) Run /gaganfoxwell-office-hours now
- B) Skip — proceed with standard review

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
   Every expansion opportunity presented individually — cherry-pick the ones
   worth doing. Neutral recommendations.

3. **HOLD SCOPE:** Scope is right. Review with maximum rigor — architecture,
   security, edge cases, observability, deployment. Make it bulletproof.

4. **SCOPE REDUCTION:** Plan is overbuilt. Propose a minimal version that
   achieves the core goal, then review that.

**Context-dependent defaults:**
- Greenfield feature → default EXPANSION
- Feature enhancement → default SELECTIVE EXPANSION
- Bug fix or hotfix → default HOLD SCOPE
- Refactor → default HOLD SCOPE
- Plan touching >15 files → suggest REDUCTION
- User says "go big" / "ambitious" → EXPANSION, no question

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
- [ ] APPROVED — proceed to implementation
- [ ] APPROVED WITH CONCERNS — proceed, address concerns
- [ ] REVISIONS NEEDED — fix issues, re-review
- [ ] REJECTED — fundamental problems

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
1. **The verdict** — approved, approved with concerns, revisions needed, rejected
2. **Review doc location** — where the review was saved
3. **Next step** — typically `/gaganfoxwell-eng-review` to lock architecture
