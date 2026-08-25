---
name: gaganfoxwell-design-shotgun
description: >-
  Generate multiple AI design variants, open a comparison board, collect
  structured feedback, and iterate. Use when: "explore designs",
  "show me options", "design variants", "visual brainstorm", or
  "I don't like how this looks".
  Proactively suggest when the user describes a UI feature but hasn't seen
  what it could look like.
triggers:
  - explore design variants
  - show me design options
  - visual design brainstorm
  - design options
  - show me alternatives
tags:
  - design
  - exploration
  - variants
  - mockups
  - brainstorm
  - visual
produces:
  - design-variants
  - comparison-board
  - approved-design
---

# Design Shotgun (gaganfoxwell)

Generate multiple AI design directions, open them side-by-side, and collect
structured feedback. Standalone design exploration you can run anytime.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## UX Principles

These principles govern how real humans interact with interfaces:

### The Three Laws of Usability

1. **Don't make me think.** Every page should be self-evident. If a user stops
   to think "What do I click?", the design has failed.

2. **Clicks don't matter, thinking does.** Three mindless, unambiguous clicks
   beat one click that requires thought.

3. **Omit, then omit again.** Get rid of half the words, then half of what's left.

### How Users Actually Behave

- **Users scan, they don't read.** Design for scanning: visual hierarchy,
  clearly defined areas, headings, highlighted key terms.
- **Users satisfice.** They pick the first reasonable option. Make the right
  choice the most visible choice.
- **Users muddle through.** They don't figure out how things work. They wing it.
- **Users don't read instructions.** They dive in. Guidance must be brief and
  unavoidable.

### Billboard Design for Interfaces

- **Use conventions.** Logo top-left, nav top/left, search = magnifying glass.
- **Visual hierarchy is everything.** More important = more prominent.
- **Make clickable things obviously clickable.** No relying on hover states.
- **Eliminate noise.** Fix by removal, not addition.
- **Clarity trumps consistency.** Choose clarity every time.

---

## Step 0: Session Detection

Check for prior design exploration sessions:

```bash
find docs/ -name "*design*" -type f 2>/dev/null | head -5
```

If prior sessions exist, show a summary and ask if the user wants to revisit
or start fresh.

---

## Step 1: Context Gathering

**Required context (5 dimensions):**
1. **Who** — who is the design for? (persona, audience, expertise level)
2. **Job to be done** — what is the user trying to accomplish?
3. **What exists** — what's already in the codebase?
4. **User flow** — how do users arrive at this screen?
5. **Edge cases** — long names, zero results, error states, mobile

**Auto-gather first:**

```bash
cat DESIGN.md 2>/dev/null | head -80 || echo "NO_DESIGN_MD"
```

```bash
ls src/ app/ pages/ components/ 2>/dev/null | head -30
```

**Check for a live site:**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "NO_LOCAL_SITE"
```

Two rounds max of context gathering, then proceed with what you have.

---

## Step 2: Taste Memory

Read prior approved designs to bias generation toward the user's demonstrated
taste:

```bash
find docs/ -name "*approved*" -o -name "*design-variant*" 2>/dev/null | head -10
```

If prior approved designs exist, extract patterns:
- Color preferences
- Typography choices
- Layout patterns
- Aesthetic tendencies

---

## Step 3: Generate Variants

### Step 3a: Concept Generation

Before generating visuals, create N text concepts describing each variant's
design direction. Each concept should be a distinct creative direction:

```
I'll explore 3 directions:

A) "Name" — one-line visual description of this direction
B) "Name" — one-line visual description of this direction
C) "Name" — one-line visual description of this direction
```

**Anti-convergence rule:** Each variant MUST use a different visual approach.
If two variants look like siblings, regenerate one with a deliberately
different direction.

### Step 3b: Generate Visuals

For each concept, generate a visual mockup. Save to `docs/designs/<screen-name>/`:

```bash
mkdir -p docs/designs/<screen-name>
```

Generate each variant as an HTML file that can be opened in a browser.
Each variant should be a self-contained HTML file with inline CSS.

### Step 3c: Comparison Board

Create an HTML comparison board that shows all variants side-by-side.
Save to `docs/designs/<screen-name>/comparison.html`.

The comparison board should:
- Show all variants in a grid
- Include variant names and descriptions
- Be openable in any browser

---

## Step 4: Collect Feedback

Present the comparison board and ask for structured feedback:

For each variant, the user can:
- **Approve** — this direction works
- **Reject** — this direction doesn't work
- **Iterate** — this has potential but needs changes

Collect feedback on:
- Typography
- Color palette
- Layout
- Visual hierarchy
- Overall feel

---

## Step 5: Iterate

Based on feedback:
1. **If a variant was approved:** Save it as the chosen direction
2. **If feedback was given:** Generate new variants incorporating the feedback
3. **If all rejected:** Generate new concepts with different directions

Maximum 3 iterations before recommending a different approach.

---

## Step 6: Output

### Comparison Board
Save to `docs/designs/<screen-name>/comparison.html`

### Approved Design
If a variant was approved, save it to `docs/designs/<screen-name>/approved.html`

### Design Notes
Write to `docs/YYYY-MM-DD-<slug>-design-exploration.md`:

```markdown
# Design Exploration: <Screen Name>

**Date:** YYYY-MM-DD
**Screen:** <what was designed>

## Context
<the 5 dimensions from Step 1>

## Variants Generated

### Variant A: "Name"
**Description:** <one-line description>
**Direction:** <design direction taken>
**Status:** APPROVED / REJECTED / ITERATED

### Variant B: "Name"
...

## Chosen Direction
<which variant was approved and why>

## Design Tokens
- **Colors:** <palette>
- **Typography:** <font choices>
- **Spacing:** <spacing system>

## Next Steps
<what to implement>
```

---

## Baton Memory

```bash
baton memory add "Design shotgun: <screen> — chose variant <X>" --files docs/designs/<screen-name>/approved.html docs/YYYY-MM-DD-<slug>-design-exploration.md 2>/dev/null || true
```

---

## Completion

End with:
1. **Variants generated** — how many, what directions
2. **Chosen direction** — which variant was approved
3. **Design tokens** — colors, fonts, spacing extracted
4. **Artifacts** — where the files were saved
