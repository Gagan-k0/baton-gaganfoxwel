---
name: gaganfoxwell-context-restore
description: Restore working context saved earlier by gaganfoxwell-context-save.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Glob
  - Grep
  - AskUserQuestion
triggers:
  - resume where i left off
  - restore context
  - where was i
  - pick up where i left off
  - context restore
---

## When to invoke this skill

Loads the most recent saved state (preferring the current branch, falling
back across branches) so you can pick up where you left off. Use when
asked to "resume", "restore context", "where was I", or "pick up where I
left off". Pair with `gaganfoxwell-context-save`.

## How to restore

### 1. Find the most recent context file

```bash
ls -t .gaganfoxwell/context/*.md 2>/dev/null | head -5
```

Prefer files matching the current branch name. Fall back to the most
recent overall.

### 2. Read the context file

Load the context file and extract:
- What was the task
- What's been done
- What's left
- Any decisions made
- Any blockers

### 3. Verify git state

Compare the saved git state against current state:
- Is the branch the same?
- Are the modified files still modified?
- Have any commits happened since?

### 4. Resume

Present a brief summary to the user:

> **Resuming from context save (<branch>, <time>)**
>
> Task: <what was being worked on>
> Done: <completed items>
> Left: <remaining items>
> Decision: <key decisions>
> Blockers: <any blockers>
>
> Ready to continue.

## If no context file exists

Tell the user: "No saved context found. Starting fresh."

## Rules

- Always check for context files at session start
- If the saved state is stale (branch mismatch, old commits), warn the
  user before proceeding
- Don't blindly apply decisions from context — verify they still make
  sense in the current state
