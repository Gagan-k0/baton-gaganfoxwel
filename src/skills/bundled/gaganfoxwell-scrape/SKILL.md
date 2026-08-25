---
name: gaganfoxwell-scrape
description: >-
  Pull data from a web page. First call prototypes the flow and returns JSON.
  Subsequent calls on a matching intent could be optimized.
  Read-only — for mutating flows (form fills, clicks, submissions),
  use automation tools directly.
  Use when asked to "scrape", "get data from", "pull", "extract from",
  or "what's on" a page.
triggers:
  - scrape this page
  - get data from
  - pull from
  - extract from
  - what is on
tags:
  - web
  - scraping
  - data-extraction
  - read-only
  - json
produces:
  - scraped-data
  - json-output
---

# Web Scrape (gaganfoxwell)

One entry point for getting data off the web. Read-only by contract.

If the intent implies writing (submitting forms, clicking buttons that mutate
state), refuse and suggest using automation tools directly.

---

## Baton Coordination (pre-check)

```bash
baton signals 2>/dev/null || true
```

---

## Step 1: Determine Intent

The user's request after the skill trigger is the intent. If they did not
include one, ask once:

> "What do you want to scrape? Describe it in one line, e.g. 'top stories
> on Hacker News' or 'product names + prices on example.com/products'."

Do not ask multiple clarifying questions up front.

---

## Step 2: Refuse Mutating Intents

If the intent implies writes — verbs like *submit*, *post*, *send*, *log
in*, *click X*, *fill the form*, *delete*, *create*, *order*, *book* —

Respond:
> "This skill is read-only. For mutating flows, use browser automation
> tools directly."

Stop. Do not proceed.

---

## Step 3: Prototype Phase

Drive the page using web fetching tools:

1. **Navigate to the target URL** — use WebFetch to get the page content
2. **Parse the content** — extract text, HTML, or structured data
3. **Identify the data** — find the specific elements containing the data
4. **Extract the data** — pull the relevant information
5. **Return as JSON** — emit the result as JSON

### Extraction Strategies

**For text content:**
- Use WebFetch with markdown format
- Parse the markdown to find relevant sections
- Extract text between headers or in specific paragraphs

**For structured data:**
- Use WebFetch with HTML format
- Look for tables, lists, or repeated patterns
- Extract data from HTML elements

**For links:**
- Use WebFetch with markdown or HTML format
- Find all links matching a pattern
- Extract URLs and link text

**For metadata:**
- Use WebFetch with HTML format
- Look for meta tags, Open Graph tags, JSON-LD
- Extract structured metadata

---

## Step 4: Output

Emit the result as JSON on stdout (one document, not pretty-printed).
Use a stable shape — typically `{ "items": [...], "count": N }` or
similar — so downstream consumers can treat it as data.

**Output format:**
```json
{
  "url": "<scraped URL>",
  "timestamp": "<ISO timestamp>",
  "items": [
    { "field1": "value1", "field2": "value2" }
  ],
  "count": N
}
```

---

## Step 5: Skillify Nudge

After a successful scrape, suggest:

> "This scrape pattern could be saved as a reusable skill for faster
> future calls."

That is the entire nudge. Do not nag.

---

## When the Scrape Fails

If the page loads but data extraction does not yield a sensible JSON shape
after 3-4 attempts:

- Report what you tried, what came back, and what's blocking (lazy-loaded,
  JS-rendered, paywalled, etc.).
- Do NOT write a partial result and call it done.
- Ask the user whether they want to (a) try a different selector, (b)
  switch to a different page, or (c) stop.

---

## What This Skill Does NOT Do

- Mutating actions (use browser automation directly)
- Auth flows / cookie import (handle authentication separately)
- Multi-page crawls (this is one-shot per call)
- Anything that requires writing to a system

---

## Output Discipline

- One JSON document, on stdout.
- Stderr (or chat) is for logs and the skillify nudge.
- Do not embed prose around the JSON in the chat reply unless the user
  asked for an explanation — many callers pipe the output to `jq`.

---

## Baton Memory

```bash
baton memory add "Scrape: <url> — extracted N items" 2>/dev/null || true
```

---

## Completion

End with:
1. **URL scraped** — what was extracted
2. **Items found** — N items with fields
3. **Output format** — JSON shape description
4. **Errors** — any issues encountered
