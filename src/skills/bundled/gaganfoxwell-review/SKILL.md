---
name: gaganfoxwell-review
description: >-
  Pre-landing code review. Analyzes diff against the base branch for SQL safety,
  race conditions, trust boundary violations, and structural issues. Includes
  scope drift detection, plan completion audit, specialist dispatch, and
  confidence-calibrated findings. Use when asked to "review this PR",
  "code review", "check my diff", or "pre-landing review".
  Proactively suggest when the user is about to merge or land code changes.
triggers:
  - review this pr
  - code review
  - check my diff
  - pre-landing review
tags:
  - review
  - code-review
  - pr
  - diff
  - security
  - testing
  - quality
produces:
  - review-report
  - findings
  - quality-score
---

# Pre-Landing Code Review (gaganfoxwell)

Analyze the current branch's diff against the base branch for structural issues
that tests don't catch. This is a rigorous, confidence-calibrated review with
specialist dispatch for larger diffs.

**HARD GATE:** Do NOT write any code. Do NOT start implementation. Review only.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Step 0: Detect Platform and Base Branch

Detect the git hosting platform from the remote URL:

```bash
git remote get-url origin 2>/dev/null
```

- GitHub if URL contains "github.com" or `gh auth status` succeeds
- GitLab if URL contains "gitlab" or `glab auth status` succeeds
- Otherwise: git-native only

Determine the base branch:
1. PR target branch (if PR exists)
2. Repo default branch
3. Fallback: `main`

---

## Step 1: Check Branch

1. Run `git branch --show-current` to get current branch
2. If on base branch: "Nothing to review — you're on the base branch."
3. Fetch base and check diff exists:
```bash
git fetch origin <base> --quiet
DIFF_BASE=$(git merge-base origin/<base> HEAD)
git diff "$DIFF_BASE" --stat
```
4. If no diff: "Nothing to review."

---

## Step 2: Scope Drift Detection

Before reviewing code quality, check: **did they build what was requested — nothing more, nothing less?**

1. Read `TODOS.md` (if exists), PR description, commit messages
2. Identify **stated intent** — what was this branch supposed to accomplish?
3. Compare files changed against stated intent

**SCOPE CREEP detection:**
- Files changed that are unrelated to stated intent
- New features or refactors not mentioned in the plan
- "While I was in there..." changes that expand blast radius

**MISSING REQUIREMENTS detection:**
- Requirements from TODOS.md/PR not addressed in diff
- Test coverage gaps for stated requirements
- Partial implementations (started but not finished)

Output:
```
Scope Check: [CLEAN / DRIFT DETECTED / REQUIREMENTS MISSING]
Intent: <1-line summary of what was requested>
Delivered: <1-line summary of what the diff actually does>
[If drift: list out-of-scope changes]
[If missing: list unaddressed requirements]
```

This is INFORMATIONAL — does not block the review.

---

## Step 3: Get the Diff

```bash
git fetch origin <base> --quiet
DIFF_BASE=$(git merge-base origin/<base> HEAD)
git diff "$DIFF_BASE"
```

---

## Step 4: Critical Pass (Core Review)

Apply these categories against the diff:

### CRITICAL (must fix before merge)

1. **SQL & Data Safety**
   - String interpolation in queries
   - Missing parameterized queries
   - Unscoped deletes/updates
   - Missing migration rollbacks

2. **Race Conditions & Concurrency**
   - Missing locks on shared state
   - TOCTOU (time-of-check-time-of-use) bugs
   - Un atomic operations on concurrent data
   - Missing idempotency keys

3. **Trust Boundary Violations**
   - User input used without validation
   - Unescaped output in templates
   - Missing authorization checks
   - Secrets in code or logs

4. **Shell Injection**
   - User input in shell commands
   - Unsanitized file paths
   - Command injection via string interpolation

5. **Enum & Value Completeness**
   - New enum values not handled in switch/match
   - Missing cases in conditional logic
   - Incomplete type unions

### INFORMATIONAL (should fix)

6. **Async/Sync Mixing**
   - Blocking calls in async context
   - Missing await on promises

7. **Error Handling**
   - Empty catch blocks
   - Swallowed errors
   - Missing error boundaries

8. **Type Safety**
   - Type coercion issues
   - Missing null checks
   - Unsafe casts

9. **Performance**
   - N+1 queries
   - Unbounded loops
   - Missing caching opportunities

10. **Completeness Gaps**
    - Missing tests for new code
    - Missing documentation
    - Missing edge case handling

---

## Step 5: Confidence Calibration

Every finding MUST include a confidence score (1-10):

| Score | Meaning | Display |
|-------|---------|---------|
| 9-10 | Verified by reading code. Concrete bug demonstrated. | Show normally |
| 7-8 | High confidence pattern match. Very likely correct. | Show normally |
| 5-6 | Moderate. Could be false positive. | Show with caveat |
| 3-4 | Low confidence. Suspicious but may be fine. | Appendix only |
| 1-2 | Speculation. | Suppress (unless P0) |

**Finding format:**
```
[SEVERITY] (confidence: N/10) file:line — description
```

Example:
```
[P1] (confidence: 9/10) app/models/user.rb:42 — SQL injection via string interpolation
[P2] (confidence: 5/10) app/controllers/api/v1/users_controller.rb:18 — Possible N+1 query
```

**Pre-emit verification gate:**
Before any finding is promoted, quote the specific code line that motivates it.
If you cannot quote the motivating line, force confidence to 4-5 (suppressed).

---

## Step 6: Specialist Dispatch (for diffs > 50 lines)

### Always-on specialists:
1. **Testing** — test coverage, test quality, missing tests
2. **Maintainability** — code clarity, duplication, complexity

### Conditional specialists:
3. **Security** — if auth/touched or backend diff > 100 lines
4. **Performance** — if backend or frontend code touched
5. **Data Migration** — if migrations present
6. **API Contract** — if API endpoints changed
7. **Design** — if frontend/UI code touched

### Red Team (conditional):
- Activates if diff > 200 lines OR any specialist found CRITICAL issues
- Adversarial perspective: "What's the worst case we're not thinking about?"

---

## Step 7: Fix-First Classification

Classify each finding:

- **AUTO-FIX** — Clear fix, low risk, can be applied automatically
- **ASK** — Fix requires user decision or architectural choice
- **NOTE** — Informational, no action needed now

---

## Step 8: Review Report

Write to `docs/YYYY-MM-DD-<slug>-review.md`:

```markdown
# Code Review: <Branch Name>

**Date:** YYYY-MM-DD
**Base:** <base branch>
**Diff:** <N lines changed>

## Scope Check
<scope drift detection results>

## Findings

| # | Severity | Confidence | File:Line | Category | Summary |
|---|----------|------------|-----------|----------|---------|
| 1 | P1 | 9/10 | file:line | SQL Safety | ... |

## Detailed Findings

### [P1] (confidence: 9/10) file:line — summary
**Category:** SQL Safety
**Issue:** <description>
**Fix:** <recommended fix>
**Code:** <quote the problematic code>

## Specialist Review
<findings from specialists>

## PR Quality Score
X/10 (N critical, M informational)

## VERDICT
- [ ] APPROVE — ready to merge
- [ ] APPROVE WITH MINOR FIXES — fix auto-fixable issues, then merge
- [ ] REQUEST CHANGES — significant issues must be addressed
- [ ] BLOCK — critical issues prevent merge

## Unresolved Decisions
<any decisions left for the user>

NO UNRESOLVED DECISIONS
```

---

## Step 9: Baton Memory

```bash
baton memory add "Review: <branch> — <verdict> (<N> findings)" --files docs/YYYY-MM-DD-<slug>-review.md 2>/dev/null || true
```

---

## Completion

End with:
1. **The verdict** — approve, approve with minor fixes, request changes, block
2. **Finding count** — N critical, M informational
3. **Quality score** — X/10
4. **Review doc location** — where the review was saved
