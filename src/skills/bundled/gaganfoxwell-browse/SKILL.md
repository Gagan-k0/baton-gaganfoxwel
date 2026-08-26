---
name: gaganfoxwell-browse
description: Fetch and read web pages using WebFetch — lightweight read-only browser alternative.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - WebFetch
  - WebSearch
triggers:
  - browse a page
  - fetch a url
  - read this website
  - what's on this page
---

## When to invoke this skill

Fetch and read web pages for inspection, data extraction, or content
analysis. Uses Baton's WebFetch tool instead of a full browser daemon.
Use when asked to "browse a page", "fetch a url", "read this website",
or "what's on this page".

## Capabilities

- Fetch any public URL and read its content
- Extract text, links, and structured data from HTML
- Search the web for information
- Read documentation sites, blog posts, API docs

## Limitations (vs full browser daemon)

This is a **read-only, HTTP-level** fetch. It cannot:
- Execute JavaScript
- Handle single-page apps (SPAs) that render client-side
- Interact with forms, buttons, or dynamic content
- Maintain session state or cookies
- Take screenshots of rendered pages

For full browser automation, a dedicated browser daemon (e.g. Bun-based) is required.

## Workflow

### 1. Determine what to fetch

Ask the user (or derive from context):
- What URL to fetch
- What information to extract
- What format to return

### 2. Fetch the page

```
WebFetch: <url>
```

### 3. Extract and analyze

Read the fetched content and extract the requested information.
Return as structured data (JSON) or formatted summary.

### 4. Report

Present the findings clearly:
- What was found
- Key data points
- Any issues (404, redirects, anti-bot blocks)

## Example: extract data from a page

```
User: "What's on the Hacker News front page?"
Agent: WebFetch https://news.ycombinator.com
       → Parse titles, links, points
       → Return as JSON list
```

## Example: read documentation

```
User: "What does the React docs say about useEffect?"
Agent: WebFetch https://react.dev/reference/react/useEffect
       → Extract key concepts, examples, gotchas
       → Summarize in plain language
```

## Rules

- Respect robots.txt — don't fetch pages that block automated access
- Don't fetch authenticated pages — WebFetch doesn't carry cookies
- Cache results — don't re-fetch the same URL in the same session
- If the page requires JavaScript, tell the user and suggest using the
  full browser daemon instead
