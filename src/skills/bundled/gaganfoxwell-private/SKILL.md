---
name: gaganfoxwell-private
description: Private mode — no external API calls, no web fetches, no data leaves the machine.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
triggers:
  - private mode
  - no external calls
  - local only
  - offline mode
---

## When to invoke this skill

Disable all external network calls. Use when working with sensitive
code, proprietary data, or when you need to ensure nothing leaves the
machine.

## What's allowed

- All file operations (Read, Write, Edit, Glob, Grep)
- Local bash commands (git, npm, node, etc.)
- Internal tool calls

## What's blocked

- `WebFetch` / `WebSearch` tools
- `curl`, `wget`, `http` commands to external URLs
- `npm install` / `pip install` (network fetches)
- Any command that sends data to an external service

## How to enforce

Before every tool call, check if it makes an external network request.
If yes, block it and tell the user: "Private mode is active. Data
cannot leave this machine. Run `/private` again to disable."

## Exception: local services

Connections to `localhost` / `127.0.0.1` are allowed (local dev
servers, databases, etc.).

## Deactivation

Run `/private` again to toggle off, or end the session.
