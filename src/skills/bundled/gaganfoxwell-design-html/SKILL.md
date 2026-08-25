---
name: gaganfoxwell-design-html
description: >-
  Turn approved mockups into production-quality HTML/CSS. Works with approved
  mockups from gaganfoxwell-design-shotgun, CEO plans, or from scratch.
  Text reflows, heights are computed, layouts are dynamic.
  Use when: "finalize this design", "turn this into HTML", "build me a page",
  or "implement this design".
triggers:
  - build the design
  - code the mockup
  - make design real
  - finalize this design
  - turn this into html
tags:
  - design
  - html
  - css
  - implementation
  - frontend
  - production
produces:
  - html-page
  - css-styles
  - design-implementation
---

# Design to HTML (gaganfoxwell)

Turn approved mockups into production-quality HTML/CSS. Text actually reflows,
heights adjust to content, layouts are dynamic.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## UX Principles

### The Three Laws of Usability

1. **Don't make me think.** Every page should be self-evident.
2. **Clicks don't matter, thinking does.** Three mindless clicks beat one
   click that requires thought.
3. **Omit, then omit again.** Get rid of half the words, then half of what's left.

### How Users Actually Behave

- **Users scan, they don't read.** Design for scanning: visual hierarchy,
  clearly defined areas, headings, highlighted key terms.
- **Users satisfice.** They pick the first reasonable option.
- **Users muddle through.** They don't figure out how things work.
- **Users don't read instructions.** They dive in.

### Billboard Design for Interfaces

- **Use conventions.** Logo top-left, nav top/left, search = magnifying glass.
- **Visual hierarchy is everything.** More important = more prominent.
- **Make clickable things obviously clickable.** No relying on hover states.
- **Eliminate noise.** Fix by removal, not addition.
- **Clarity trumps consistency.** Choose clarity every time.

---

## Step 0: Input Detection

Detect what design context exists:

```bash
ls docs/designs/ 2>/dev/null | head -10
cat DESIGN.md 2>/dev/null | head -50 || echo "NO_DESIGN_MD"
ls docs/ 2>/dev/null | grep -i "design\|mockup\|variant" | head -10
```

**If approved mockups exist:** Read them and extract the design direction.
**If DESIGN.md exists:** Read it for design system constraints.
**If neither:** Ask the user for a description of what to build.

---

## Step 1: Design Analysis

Extract design tokens from the approved mockup or description:

1. **Colors:** Primary, secondary, accent, background, text, error, success
2. **Typography:** Font families, sizes, weights, line heights
3. **Spacing:** Padding, margin, gap values
4. **Layout:** Grid system, max widths, breakpoints
5. **Components:** Buttons, cards, inputs, navigation patterns

---

## Step 2: HTML Structure

Create the HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Content -->
</body>
</html>
```

**Rules:**
- Semantic HTML (header, nav, main, section, article, footer)
- Accessible (ARIA labels, alt text, keyboard navigation)
- Responsive (mobile-first approach)

---

## Step 3: CSS Styles

Create production-quality CSS:

**CSS Architecture:**
- CSS custom properties for design tokens
- Mobile-first responsive design
- Consistent spacing scale
- Typography scale

**CSS Custom Properties:**
```css
:root {
  /* Colors */
  --color-primary: #...;
  --color-secondary: #...;
  --color-accent: #...;
  --color-background: #...;
  --color-text: #...;
  
  /* Typography */
  --font-family-primary: ...;
  --font-size-base: ...;
  --font-weight-normal: ...;
  --line-height-base: ...;
  
  /* Spacing */
  --space-xs: ...;
  --space-sm: ...;
  --space-md: ...;
  --space-lg: ...;
  --space-xl: ...;
  
  /* Layout */
  --max-width: ...;
  --border-radius: ...;
}
```

---

## Step 4: Responsive Design

Implement responsive breakpoints:

```css
/* Mobile first */
.element { /* mobile styles */ }

/* Tablet */
@media (min-width: 768px) {
  .element { /* tablet styles */ }
}

/* Desktop */
@media (min-width: 1024px) {
  .element { /* desktop styles */ }
}
```

**Touch targets:** Minimum 44px for interactive elements.

---

## Step 5: Interactive States

Define hover, focus, and active states:

```css
.button {
  /* Default state */
  background: var(--color-primary);
  transition: background 0.2s ease;
}

.button:hover {
  background: var(--color-primary-dark);
}

.button:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.button:active {
  background: var(--color-primary-darker);
}
```

---

## Step 6: Accessibility

Ensure WCAG AA compliance:

- Color contrast ratios (4.5:1 for text, 3:1 for large text)
- Keyboard navigation support
- Screen reader friendly markup
- Focus visible states
- Alt text for images
- ARIA labels where needed

---

## Step 7: Output

Save files to `docs/designs/<page-name>/`:

```bash
mkdir -p docs/designs/<page-name>
```

**Files to create:**
- `index.html` — the page
- `styles.css` — the styles

### Design Implementation Report

Write to `docs/YYYY-MM-DD-<slug>-design-implementation.md`:

```markdown
# Design Implementation: <Page Name>

**Date:** YYYY-MM-DD
**Source:** <approved mockup or description>

## Design Tokens
- **Colors:** <list>
- **Typography:** <list>
- **Spacing:** <list>

## Components Implemented
- <component 1>
- <component 2>

## Responsive Breakpoints
- Mobile: <min-width>
- Tablet: <min-width>
- Desktop: <min-width>

## Accessibility
- WCAG AA compliant: YES/NO
- Keyboard navigation: YES/NO
- Screen reader tested: YES/NO

## Files
- `docs/designs/<page-name>/index.html`
- `docs/designs/<page-name>/styles.css`
```

---

## Baton Memory

```bash
baton memory add "Design HTML: <page> — implemented from <source>" --files docs/designs/<page-name>/ docs/YYYY-MM-DD-<slug>-design-implementation.md 2>/dev/null || true
```

---

## Completion

End with:
1. **What was built** — the page/component name
2. **Source** — what mockup or description was used
3. **Design tokens** — colors, fonts, spacing extracted
4. **Files** — where the HTML and CSS were saved
5. **Responsive** — breakpoints implemented
6. **Accessibility** — WCAG AA compliance status
