---
name: gaganfoxwell-first-task
description: Handle the first task in a new project — orient, set up, and complete the first meaningful unit of work.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
  - AskUserQuestion
triggers:
  - first task
  - new project setup
  - get started
  - initial setup
---

## When to invoke this skill

Detect and handle the first task in a new project. Orients the agent,
understands the codebase, sets up conventions, and completes the first
meaningful unit of work. Use when asked "first task", "new project", or
"get started".

## Phase 1: Orient (read-only)

Before writing any code, understand the project:

1. **Read the README** — what is this project?
2. **Check the package.json / cargo.toml / go.mod** — what language,
   what dependencies?
3. **List the directory structure** — what's the architecture?
4. **Read CLAUDE.md / AGENTS.md** — any agent instructions?
5. **Check git history** — what's been done recently?

## Phase 2: Conventions

Identify and adopt the project's conventions:
- Code style (tabs vs spaces, naming, imports)
- Test patterns (framework, location, naming)
- File organization
- Commit message format

If conventions aren't documented, infer from existing code and follow
what you find.

## Phase 3: First task

Ask the user what they want to work on first. If they don't have
something specific, suggest based on what you found:
- A missing test
- A TODO comment
- A small improvement
- Documentation gap

## Phase 4: Complete + commit

Complete the first task with the same quality as any other:
- Follow project conventions
- Include tests if the project has them
- Verify with the project's build/test commands
- Commit with a clear message

## Rules

- Read before writing — never start coding without understanding the
  project first
- Match existing conventions — don't introduce new patterns
- Keep the first task small — prove you understand the project before
  tackling big changes
- Commit early — a completed first task builds confidence
