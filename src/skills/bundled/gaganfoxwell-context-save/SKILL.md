---
name: gaganfoxwell-context-save
description: Save working context — git state, decisions, remaining work — so any future session can pick up.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
  - AskUserQuestion
triggers:
  - save progress
  - save state
  - save my work
  - context save
---

## When to invoke this skill

Captures git state, decisions made, and remaining work so any future
session can pick up without losing a beat. Use when asked to "save
progress", "save state", "context save", or "save my work". Pair with
`/gaganfoxwell-context-restore` to resume later.

## What to capture

### 1. Git state

```bash
git status --short
git diff --stat
git log --oneline -5
git branch --show-current
```

### 2. Current task

What was the user working on? Summarize in 2-3 sentences:
- The goal
- What's been done
- What's left

### 3. Decisions made

List any decisions from this session — architecture choices, tool picks,
approach decisions. Format:

```
- [decision] <what was decided> — <why>
```

### 4. Files changed

List files that were modified, created, or deleted. Include one-line
descriptions of what changed.

### 5. Blockers

Any blockers or open questions that need resolving.

## Output format

Write to `.gaganfoxwell/context/<branch>-<timestamp>.md`:

```markdown
# Context Save — <branch> — <timestamp>

## Task
<current task summary>

## Git State
- Branch: <branch>
- Last 5 commits: <hash> <message>
- Modified files: <list>

## Decisions
- <decision 1>
- <decision 2>

## Remaining
- [ ] <todo 1>
- [ ] <todo 2>

## Blockers
- <blocker or "none">
```

## Rules

- Always save before ending a session
- Keep the save file small — summaries, not raw diffs
- Include enough context that a stranger could pick up the work
