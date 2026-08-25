---
name: gaganfoxwell-learn
description: Review, search, prune, and export project learnings across sessions.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - AskUserQuestion
  - Glob
  - Grep
triggers:
  - show learnings
  - what have we learned
  - manage project learnings
  - prune learnings
  - export learnings
---

## When to invoke this skill

Review, search, prune, and export what has been learned across sessions.
Use when asked "what have we learned", "show learnings", "prune stale
learnings", or "export learnings". Proactively suggest when the user
asks about past patterns or wonders "didn't we fix this before?"

## Where learnings live

Learnings are stored in `.gaganfoxwell/learnings.jsonl` in the project
root. Each line is a JSON object:

```json
{
  "skill": "investigate",
  "type": "operational",
  "key": "AUTH_COOKIE_BUG",
  "insight": "auth.ts:47 returns undefined when session cookie expires",
  "confidence": 8,
  "source": "observed",
  "ts": "2026-08-25T10:00:00Z"
}
```

## Operations

### Show all learnings

Read `.gaganfoxwell/learnings.jsonl` and display as a formatted table:
| Skill | Key | Insight | Confidence |

### Search learnings

Grep the learnings file for keywords. Useful when debugging — "haven't
we seen this before?"

### Prune stale learnings

Remove entries older than 90 days or with confidence < 3. Ask the user
before deleting.

### Export learnings

Output learnings as formatted markdown. Useful for sharing with teammates
or including in handoff briefs.

## Logging new learnings

After completing a skill, review the session for durable learnings —
project quirks, command fixes, pitfalls, or patterns that would save 5+
minutes in a future session.

Write to `.gaganfoxwell/learnings.jsonl`:
```json
{"skill":"<name>","type":"operational","key":"<SHORT_KEY>","insight":"<description>","confidence":<1-10>,"source":"observed"}
```

Do not log obvious facts or one-time transient errors.

## Rules

- A durable learning is one that would save 5+ minutes in a future session
- If the review genuinely surfaces none, state "No durable learnings this
  session" — an explicit empty result, not a skipped step
