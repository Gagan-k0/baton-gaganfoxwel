---
name: gaganfoxwell-investigate
description: >-
  Systematic debugging with root cause investigation. No fixes without root cause
  first. Four phases: investigate, analyze, hypothesize, implement.
  Use when asked to "debug this", "fix this bug", "why is this broken",
  "root cause analysis", or "investigate this error".
  Proactively invoke when the user reports errors, stack traces,
  unexpected behavior, or "it was working yesterday".
triggers:
  - debug this
  - fix this bug
  - why is this broken
  - root cause analysis
  - investigate this error
tags:
  - debugging
  - investigation
  - root-cause
  - hypothesis
  - fix
produces:
  - root-cause-analysis
  - fix
  - investigation-report
---

# Systematic Debugging (gaganfoxwell)

Four phases: investigate, analyze, hypothesize, implement.

**IRON LAW: No fixes without root cause investigation first.**

Fixing symptoms creates whack-a-mole debugging. Every fix that doesn't address
root cause makes the next bug harder to find. Find the root cause, then fix it.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Phase 1: Root Cause Investigation

Gather context before forming any hypothesis.

1. **Collect symptoms:** Read the error messages, stack traces, and reproduction steps.
   If the user hasn't provided enough context, ask ONE question at a time.

2. **Read the code:** Trace the code path from the symptom back to potential causes.
   Use Grep to find all references, Read to understand the logic.

3. **Check recent changes:**
   ```bash
   git log --oneline -20 -- <affected-files>
   ```
   Was this working before? What changed? A regression means the root cause is in the diff.

4. **Reproduce:** Can you trigger the bug deterministically? If not, gather more
   evidence before proceeding.

5. **Check investigation history:** Search for prior learnings on the same files.
   Recurring bugs in the same area are an architectural smell.

---

## Phase 2: Pattern Analysis

Check if this bug matches a known pattern:

| Pattern | Signature | Where to look |
|---------|-----------|---------------|
| Race condition | Intermittent, timing-dependent | Concurrent access to shared state |
| Nil/null propagation | NoMethodError, TypeError | Missing guards on optional values |
| State corruption | Inconsistent data, partial updates | Transactions, callbacks, hooks |
| Integration failure | Timeout, unexpected response | External API calls, service boundaries |
| Configuration drift | Works locally, fails in staging/prod | Env vars, feature flags, DB state |
| Stale cache | Shows old data, fixes on cache clear | Redis, CDN, browser cache |

Also check:
- `TODOS.md` for related known issues
- `git log` for prior fixes in the same area
  (recurring bugs in the same files = architectural smell, not coincidence)

**External search:** If the bug doesn't match a known pattern, search for:
- "{framework} {generic error type}" — sanitize first: strip hostnames, IPs,
  file paths, SQL, customer data
- "{library} {component} known issues"

---

## Phase 3: Hypothesis Testing

Before writing ANY fix, verify your hypothesis.

1. **Confirm the hypothesis:** Add a temporary log statement, assertion, or debug
   output at the suspected root cause. Run the reproduction. Does the evidence match?

2. **If the hypothesis is wrong:** Before forming the next hypothesis, consider
   searching for the error (sanitized). Then return to Phase 1. Gather more evidence.
   Do not guess.

3. **3-strike rule:** If 3 hypotheses fail, STOP. Ask the user:
   - What additional context can they provide?
   - Can they share logs, configs, or reproduction steps?
   - Should we escalate to a different debugging approach?

---

## Phase 4: Implementation

Only after root cause is confirmed:

1. **Minimal fix:** Fix the root cause, not the symptom. The smallest change that
   addresses the actual problem.

2. **Verify the fix:** Run the reproduction steps. Does the bug no longer occur?

3. **Regression test:** Add a test that would have caught this bug. If the test
   framework is unknown, write the test as a clear specification.

4. **Check for blast radius:** Does this fix affect other code paths? Search for
   similar patterns that might have the same bug.

---

## Scope Lock

After forming your root cause hypothesis, lock edits to the affected module:

```bash
FREEZE_SCRIPT="$HOME/.baton/freeze/bin/check-freeze.sh"
[ -x "$FREEZE_SCRIPT" ] && echo "FREEZE_AVAILABLE" || echo "FREEZE_UNAVAILABLE"
```

If freeze is available, identify the narrowest directory containing the affected
files. Edits are restricted to that directory for this debug session.

If the bug spans the entire repo or the scope is genuinely unclear, skip the lock.

---

## Investigation Report

Write to `docs/YYYY-MM-DD-<slug>-investigation.md`:

```markdown
# Investigation: <Bug Summary>

**Date:** YYYY-MM-DD
**Reporter:** <who reported it>
**Status:** RESOLVED / ONGOING / BLOCKED

## Symptoms
<what was observed>

## Root Cause
<what is actually wrong and why>

## Evidence
<log outputs, code paths, reproduction steps>

## Fix Applied
<what was changed to fix it>

## Prevention
<what test or guard was added to prevent recurrence>

## Blast Radius
<other areas that might have the same issue>

## Next Steps
<any follow-up needed>
```

---

## Baton Memory

```bash
baton memory add "Investigation: <summary> — <root-cause>" --files docs/YYYY-MM-DD-<slug>-investigation.md 2>/dev/null || true
```

---

## Completion

End with:
1. **Root cause** — one sentence, specific and testable
2. **Fix** — what was changed
3. **Verification** — how the fix was confirmed
4. **Prevention** — what was added to prevent recurrence
5. **Investigation doc** — where the report was saved
