---
name: gaganfoxwell-eng-review
description: >-
  Eng manager-mode plan review. Lock in the execution plan — architecture,
  data flow, diagrams, edge cases, test coverage, performance. Walks through
  issues interactively with opinionated recommendations. Use when asked to
  "review the architecture", "engineering review", or "lock in the plan".
  Proactively suggest when the user has a plan or design doc and is about to
  start coding — to catch architecture issues before implementation.
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
> A) The current branch diff — the work in progress on this branch.
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
> statement and alternatives — it gives this review much sharper input. Want to
> run it first?"

Options:
- A) Run /gaganfoxwell-office-hours now
- B) Skip — proceed with standard review

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

1. **Data Flow Diagram** — Draw the ASCII data flow:
   ```
   Input --> [Component A] --> [Component B] --> Output
                    |                    |
                    v                    v
              [Error Handler]     [State Store]
   ```

2. **State Transitions** — For any stateful component, map all states:
   ```
   IDLE --> LOADING --> SUCCESS
    |          |
    v          v
   ERROR --> RETRY --> SUCCESS
   ```

3. **API Contracts** — Are interfaces explicit? Input types, output types,
   error types documented?

4. **Dependency Analysis** — What does this depend on? What depends on this?
   Circular dependencies?

5. **Coupling Points** — Where are the tight coupling risks? Can they be
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
- **Exception class** — What specific error is thrown?
- **Trigger** — What causes it?
- **Handler** — What catches it?
- **User sees** — What message/state does the user see?
- **Recovery** — How does the user recover?

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
- [ ] APPROVED — proceed to implementation
- [ ] APPROVED WITH CONCERNS — proceed, address concerns
- [ ] REVISIONS NEEDED — fix issues, re-review
- [ ] REJECTED — fundamental problems

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
1. **The verdict** — approved, approved with concerns, revisions needed, rejected
2. **Review doc location** — where the review was saved
3. **Next step** — typically implement the plan, or `/gaganfoxwell-qa` to verify
