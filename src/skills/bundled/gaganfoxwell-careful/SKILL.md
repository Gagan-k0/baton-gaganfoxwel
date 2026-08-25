---
name: gaganfoxwell-careful
description: Warn before destructive commands. Safety mode for prod debugging and shared environments.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
triggers:
  - be careful
  - warn before destructive
  - safety mode
  - careful mode
  - prod mode
---

## When to invoke this skill

Warns before `rm -rf`, `DROP TABLE`, force-push, `git reset --hard`,
`kubectl delete`, and similar destructive operations. User can override
each warning. Use when touching prod, debugging live systems, or
working in a shared environment.

## What's protected

| Pattern | Example | Risk |
|---------|---------|------|
| `rm -rf` / `rm -r` / `rm --recursive` | `rm -rf /var/data` | Recursive delete |
| `DROP TABLE` / `DROP DATABASE` | `DROP TABLE users;` | Data loss |
| `TRUNCATE` | `TRUNCATE orders;` | Data loss |
| `git push --force` / `-f` | `git push -f origin main` | History rewrite |
| `git reset --hard` | `git reset --hard HEAD~3` | Uncommitted work loss |
| `git checkout .` / `git restore .` | `git checkout .` | Uncommitted work loss |
| `kubectl delete` | `kubectl delete pod` | Production impact |
| `docker rm -f` / `docker system prune` | `docker system prune -a` | Container/image loss |

## Safe exceptions

These patterns are allowed without warning:
- `rm -rf node_modules` / `.next` / `dist` / `__pycache__` / `.cache` / `build` / `.turbo` / `coverage`

## How it works

Before running any bash command, check it against the destructive
patterns above. If a match is found:

1. **MEDIUM** (ask): Show the warning, explain the risk, ask the user
   to confirm before proceeding. The user can override.
2. **HIGH** (hard deny): `rm -r`/`-R` of `/`, `~`, or `$HOME`, and
   force-push to the default branch are blocked outright. No override.

## Custom patterns

Add project-specific warn rules in `.gaganfoxwell/careful-patterns.txt`
(one POSIX ERE per line, `#` comments OK). Consulted after the built-in
patterns — config can only ADD rules, never suppress baseline warnings.

## Deactivation

End the conversation or start a new one. Safety mode is session-scoped.
