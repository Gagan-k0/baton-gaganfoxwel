---
name: gaganfoxwell-teach
description: Teach the agent project-specific patterns, conventions, and context that aren't in the code.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
triggers:
  - teach you about
  - learn this pattern
  - remember this
  - project context
  - explain our approach
---

## When to invoke this skill

The user wants to teach the agent about project-specific knowledge that
isn't obvious from the code: naming conventions, architectural decisions,
team preferences, domain context, or historical context. Use when asked
to "teach you about", "learn this pattern", "remember this", or
"explain our approach".

## What to capture

### 1. Architectural decisions

Why is the codebase structured this way? What trade-offs were made?

### 2. Naming conventions

Project-specific naming patterns that aren't standard for the language:
- `use*` hooks vs `get*` functions
- Service vs Manager vs Handler naming
- File naming patterns

### 3. Domain context

Business logic, domain rules, and terminology that an outsider wouldn't
know:
- What "order" means in this system
- How the billing cycle works
- What "active" status means

### 4. Gotchas

Things that will trip up a new developer:
- "Don't modify X without checking Y"
- "The tests for Z are in a different repo"
- "We use an older version of A that doesn't support B"

### 5. Preferred patterns

How things should be done in this project:
- "Always use the repository pattern, never raw SQL"
- "New features go in src/features/, not src/lib/"
- "Tests use factory functions, not fixtures"

## Where to store

Write to `.gaganfoxwell/teachings.md` in the project root:

```markdown
# Project Teachings

## Architecture
- <pattern 1>
- <pattern 2>

## Naming
- <convention 1>

## Domain
- <context 1>

## Gotchas
- <gotcha 1>

## Preferences
- <preference 1>
```

## How to use

When starting a new task, check `.gaganfoxwell/teachings.md` first. These
are project-specific rules that override general best practices.

## Rules

- Only capture durable knowledge — not one-off instructions
- Keep it concise — bullet points, not essays
- Update when the project evolves
