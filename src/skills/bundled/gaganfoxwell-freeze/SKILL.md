---
name: gaganfoxwell-freeze
description: Restrict file edits to a specific directory for the session.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
triggers:
  - freeze edits to directory
  - lock editing scope
  - restrict file changes
  - only edit this folder
  - lock down edits
---

## When to invoke this skill

Blocks Edit and Write outside the allowed path. Use when debugging to
prevent accidentally "fixing" unrelated code, or when you want to scope
changes to one module.

## Setup

Ask the user which directory to restrict edits to:

> "Which directory should I restrict edits to? Files outside this path
> will be blocked from editing."

Once the user provides a path:

1. Resolve to absolute path
2. Store in `.gaganfoxwell/freeze-dir.txt` in the project root
3. Confirm: "Edits are now restricted to `<path>/`."

## Rules

- Any Edit or Write targeting a file outside the freeze directory is
  **blocked** (not just warned)
- Read, Bash, Glob, Grep are unaffected — only writes are restricted
- Symlinks are resolved through their final component
- Trailing `/` on the path prevents `/src` matching `/src-old`

## How to check

Before every Edit or Write:
1. Read `.gaganfoxwell/freeze-dir.txt`
2. Resolve the target `file_path` to absolute
3. If the target does not start with the freeze directory, block the
   operation and tell the user why

## Notes

- This prevents accidental edits, not a security boundary — Bash
  commands like `sed` can still modify files outside the boundary
- To change the boundary, run `/freeze` again with a new path
- To remove it, run `/unfreeze` or end the session
