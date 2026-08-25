---
name: gaganfoxwell-guard
description: Full safety mode — destructive command warnings + directory-scoped edits.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
triggers:
  - full safety mode
  - guard against mistakes
  - maximum safety
  - lock it down
---

## When to invoke this skill

Combines `/careful` (warns before destructive commands) with `/freeze`
(blocks edits outside a directory). Use for maximum safety when touching
prod or debugging live systems.

## How it works

1. Ask the user which directory to freeze edits to
2. Activate destructive command warnings (same patterns as `/careful`)
3. Both protections run for the rest of the session

## Protected patterns

See `gaganfoxwell-careful` for the full destructive command list.

## Edit restriction

See `gaganfoxwell-freeze` for how the directory boundary works.

## Deactivation

- Run `/unfreeze` to remove the edit restriction
- End the session to clear all guards
