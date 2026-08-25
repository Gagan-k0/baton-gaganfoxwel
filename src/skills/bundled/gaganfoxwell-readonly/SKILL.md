---
name: gaganfoxwell-readonly
description: Read-only mode — no file writes, no git commits, no destructive operations.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Glob
  - Grep
triggers:
  - read only mode
  - readonly
  - no writes
  - inspect only
  - explore only
---

## When to invoke this skill

Lock the session to read-only operations. No Edit, Write, or commits.
Use when exploring an unfamiliar codebase, reviewing code without
modifying it, or when someone else is actively editing and you need to
look without touching.

## What's allowed

- Read files
- Glob / Grep searches
- Bash commands that are read-only (`ls`, `git status`, `git log`,
  `git diff`, `cat`, `head`, `tail`, `wc`, `find`, `tree`)

## What's blocked

- Edit / Write tools
- `git add`, `git commit`, `git push`
- `rm`, `mv`, `cp` (file modifications)
- Any bash command that modifies state

## How to enforce

Before every tool call, check if it would modify state. If yes, block
it and tell the user: "Read-only mode is active. Run `/readonly` again
to disable."

## Deactivation

Run `/readonly` again to toggle off, or end the session.
