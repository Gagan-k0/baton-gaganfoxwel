---
name: gaganfoxwell-fork
description: Fork a worktree for parallel work — create an isolated copy of the current state.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
triggers:
  - fork this
  - create worktree
  - parallel work
  - spin off
---

## When to invoke this skill

Create an isolated git worktree for parallel work without affecting the
main working directory. Use when asked to "fork this", "create worktree",
"parallel work", or "spin off".

## How it works

### 1. Determine the fork name

Ask the user (or derive from intent):

> "What should this fork be called?"

Use a short descriptive name: `feature-auth`, `fix-memory-leak`,
`experiment-redesign`.

### 2. Create the worktree

```bash
git worktree add ../wt-<name> -b <name>
```

This creates a new directory `../wt-<name>` with a fresh checkout on
branch `<name>`.

### 3. Set up the fork

Copy any project-specific setup:
- `.env` files (if they exist and aren't gitignored)
- `.gaganfoxwell/` directory (learnings, teachings, context)
- Note: `node_modules/` is NOT copied — run `npm install` in the new
  worktree

### 4. Report

Tell the user:
- Where the fork lives: `../wt-<name>`
- What branch it's on: `<name>`
- How to get there: `cd ../wt-<name>`
- How to merge back: `git merge <name>` from the main worktree

## Rules

- Always create from the current branch
- Never fork with uncommitted changes — commit or stash first
- Keep fork names descriptive but short
- Report the merge command — the user will need it later

## Baton integration

In Baton's multi-agent workflow, forks are how agents work in parallel.
Each agent gets its own worktree via `baton new "<task>"` which creates
an isolated worktree automatically. This skill is for manual forks
outside Baton's coordination.
