---
name: gaganfoxwell-unfreeze
description: Clear the freeze boundary, allowing edits to all directories again.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
triggers:
  - unfreeze edits
  - unlock all directories
  - remove edit restrictions
---

## When to invoke this skill

Use when you want to widen edit scope without ending the session. Clears
the directory restriction set by `/freeze` or `/guard`.

## How to clear

1. Read `.gaganfoxwell/freeze-dir.txt`
2. Show the previous boundary: "Freeze boundary cleared (was:
   `<previous>`). Edits are now allowed everywhere."
3. Delete `.gaganfoxwell/freeze-dir.txt`

## Notes

- Only clears the freeze boundary — destructive command warnings from
  `/careful` remain active for the session
- To clear everything, end the session
