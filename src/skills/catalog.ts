// Copyright (C) 2026 Rakshan Shetty
// SPDX-License-Identifier: AGPL-3.0-or-later
/**
 * Skill catalog — the curated, searchable set of reusable agent workflows Baton
 * ships with. A "skill" is a named markdown playbook (objective + steps) that an
 * agent can install into its own config dir and invoke. There are two kinds:
 *
 *   - File-backed skills under ./bundled/<id>/ — a real SKILL.md (with YAML
 *     frontmatter) plus an optional references/ folder of supporting files
 *     loaded on demand. These can be multi-KB and multi-file; we keep them as
 *     editable files rather than embedding them as strings. (The build copies
 *     ./bundled into dist/skills/bundled — see scripts/copy-assets.mjs.)
 *   - Inline skills — short single-file playbooks defined right here.
 *
 * install.ts renders each into the format a given CLI understands
 * (.claude/skills/<id>/SKILL.md + references/, or .cursor/rules/<id>.mdc).
 * Imported skills (from a path/URL) live alongside these at runtime, read out of
 * <repo>/.baton/skills, and carry source: 'imported'.
 */
import { parseFrontmatter } from '../util/frontmatter.js';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

export interface SkillReference {
  /** Path relative to the skill dir, e.g. "references/blast-radius-checklist.md". */
  rel: string;
  content: string;
}

/** The human-facing 3-line explainer shown on skill cards: what the skill is,
 *  how it works, and the advantage. Distinct from `description`, which is the
 *  agent-facing trigger text (long, keyword-dense) — humans need three short
 *  lines, not a paragraph. */
export interface SkillExplain {
  what: string;
  how: string;
  win: string;
}

export interface SkillDef {
  id: string;
  /** Display name. */
  name: string;
  /** One-line summary an agent uses to decide relevance — keep it searchable. */
  description: string;
  /** Free-text keywords for search (beyond words already in name/description). */
  tags: string[];
  /** Baton artifacts the skill reads or produces, surfaced as chips in the UI. */
  produces: string[];
  /** The playbook body (no frontmatter). */
  body: string;
  /** Supporting files installed alongside the skill (loaded on demand by the agent). */
  references: SkillReference[];
  source: 'bundled' | 'imported';
  /** 3-line human explainer (what / how / win) for the UI. Bundled skills carry
   *  one; imported skills fall back to their description. */
  explain?: SkillExplain;
  /**
   * Verbatim SKILL.md (frontmatter + body) for skills authored as files. When
   * present and the on-disk `name` already matches the id, Claude installs get
   * this byte-for-byte so a hand-tuned skill isn't reflowed. Inline/imported
   * skills leave this undefined and are re-rendered.
   */
  raw?: string;
}

/** Where file-backed skills live, both compiled (dist/skills/bundled) and in dev (src/skills/bundled). */
const BUNDLED_DIR = fileURLToPath(new URL('./bundled', import.meta.url));

/**
 * Tags/produces for file-backed skills whose SKILL.md frontmatter doesn't carry
 * them (so the source file stays a clean, portable Claude skill). Frontmatter
 * `tags:` / `produces:` arrays, if present, take precedence over these.
 */
const BUNDLED_META: Record<string, { tags: string[]; produces: string[] }> = {
  'basic-setup': {
    tags: ['setup', 'scaffold', 'new project', 'boilerplate', 'starter', 'folder structure', 'project structure', 'architecture', 'mvc', 'feature-sliced', 'clean architecture', 'hexagonal', 'modular monolith', 'microservices', 'best practice', 'convention', 'gitleaks', 'secrets', 'api key', 'env', '.env', 'leak', 'pre-commit', 'hook', 'push protection', 'security', 'devsecops', 'beginner', 'onboarding', 'next.js', 'react', 'vite', 'nuxt', 'nestjs', 'express', 'django', 'fastapi', 'agents.md', 'structure.md', 'audit', 'cleanup'],
    produces: ['plain-language interview', 'structure pattern choice', 'scaffolded project', '.gitleaks.toml + pre-commit hook', 'push protection + CI backstop', '.env.example', 'STRUCTURE.md (humans)', 'AGENTS.md (agents)', 'planted-secret drill proof', 'ranked repair plan (mid-phase)'],
  },
  'bug-fix': {
    tags: ['bug', 'fix', 'debug', 'error', 'crash', 'regression', 'root cause', 'reproduce', 'blast radius', 'skeptic', 'review', 'worktree', 'commit'],
    produces: ['reproduction', 'blast-radius audit', 'root-cause analysis', 'approved plan', 'regression re-verify', 'bugfix report', 'auto-commit (never pushes)'],
  },
  'token-efficient-coding': {
    tags: ['token', 'tokens', 'cost', 'context', 'efficient', 'minimal diff', 'context rot', 'compaction', 'read', 'grep', 'cheap', 'budget'],
    produces: ['targeted reads', 'minimal diffs', 'lower token cost', 'compaction'],
  },
  'traceable-changes': {
    tags: ['traceability', 'atomic commit', 'commit', 'conventional commits', 'worktree', 'blame', 'bisect', 'revert', 'git history', 'audit', 'multi-agent'],
    produces: ['atomic commits', 'isolated worktree', 'conventional messages', 'bisectable history'],
  },
  'memory-light': {
    tags: ['memory', 'context window', 'context rot', 'compaction', 'recall', 'handoff', 'long-horizon', 'multi-session', 'externalize state', 'facts'],
    produces: ['recall-before-explore', 'externalized state', 'durable facts', 'handoff brief'],
  },
  'verify-before-done': {
    tags: ['verify', 'verification', 'double-check', 'hallucination', 'regression', 'skeptic', 'review', 'tests', 'build', 'done', 'symbol exists'],
    produces: ['re-read diff', 'symbol-existence check', 'build/test/lint run', 'independent skeptic re-check'],
  },
  'code-review': {
    tags: ['review', 'code review', 'pr', 'pull request', 'diff', 'branch', 'merge', 'standards', 'conventions', 'spec', 'scope creep', 'code smell', 'fowler', 'security', 'vulnerability', 'injection', 'parallel', 'sub-agent', 'skeptic'],
    produces: ['pinned fixed point', 'standards findings', 'spec findings', 'security findings', 'refuted-first verification', 'routed next steps', 'durable review record (.baton/reviews)'],
  },
  handoff: {
    tags: ['handoff', 'relay', 'usage limit', 'context limit', 'resume', 'continue', 'session', 'brief', 'pass', 'take', 'blocked', 'multi-agent'],
    produces: ['handoff brief', 'pickup command', 'resumed session'],
  },
  'lean-code': {
    tags: ['lean', 'restraint', 'over-engineering', 'yagni', 'simplicity', 'minimal', 'reuse', 'stdlib', 'native', 'one-liner', 'ponytail'],
    produces: ['restraint ladder', 'smallest working diff', 'reuse over rewrite', 'safety carve-outs preserved'],
  },
  'stack-migration': {
    tags: ['migrate', 'migration', 'port', 'convert', 'rewrite', 'angular', 'react', 'next.js', 'nextjs', 'vue', 'nestjs', 'express', 'framework', 'stack', 'phase', 'parity', 'endpoints', 'components', 'dry', 'reuse', 'resumable', 'ledger', 'parallel', 'multi-agent', 'fan-out', 'worktree', 'cursor', 'codex', 'antigravity', 'handoff'],
    produces: ['codebase inventory', 'ordered phase plan', 'MIGRATION.md ledger', 'reuse index', 'per-phase parity re-verify', '95% skeptic gate', 'auto-commit per phase (never pushes)', 'parallel fan-out plan + per-phase HANDOFF briefs'],
  },
  'gaganfoxwell-office-hours': {
    tags: ['planning', 'product', 'brainstorm', 'startup', 'design', 'office-hours', 'yc', 'forcing-questions', 'idea', 'validate'],
    produces: ['design-doc', 'product-diagnosis', 'implementation-alternatives'],
  },
  'gaganfoxwell-ceo-review': {
    tags: ['planning', 'strategy', 'review', 'scope', 'ambition', 'ceo', 'founder', 'think-bigger', 'expand'],
    produces: ['ceo-plan', 'scope-decisions', 'implementation-alternatives', 'review-report'],
  },
  'gaganfoxwell-eng-review': {
    tags: ['architecture', 'review', 'engineering', 'tests', 'performance', 'edge-cases', 'data-flow', 'error-handling'],
    produces: ['architecture-review', 'test-plan', 'performance-analysis', 'review-report'],
  },
  'gaganfoxwell-review': {
    tags: ['review', 'code-review', 'pr', 'diff', 'security', 'testing', 'quality', 'pre-landing'],
    produces: ['review-report', 'findings', 'quality-score'],
  },
  'gaganfoxwell-investigate': {
    tags: ['debugging', 'investigation', 'root-cause', 'hypothesis', 'fix', 'regression'],
    produces: ['root-cause-analysis', 'fix', 'investigation-report'],
  },
  'gaganfoxwell-design-audit': {
    tags: ['design', 'visual', 'audit', 'typography', 'spacing', 'hierarchy', 'polish', 'ui'],
    produces: ['design-audit-report', 'fix-commits', 'design-system'],
  },
  'gaganfoxwell-design-shotgun': {
    tags: ['design', 'exploration', 'variants', 'mockups', 'brainstorm', 'visual'],
    produces: ['design-variants', 'comparison-board', 'approved-design'],
  },
  'gaganfoxwell-design-html': {
    tags: ['design', 'html', 'css', 'implementation', 'frontend', 'production'],
    produces: ['html-page', 'css-styles', 'design-implementation'],
  },
  'gaganfoxwell-devex-audit': {
    tags: ['developer-experience', 'dx', 'audit', 'onboarding', 'tthw', 'documentation'],
    produces: ['dx-scorecard', 'dx-report', 'improvement-recommendations'],
  },
  'gaganfoxwell-qa': {
    tags: ['qa', 'testing', 'bugs', 'quality', 'verification', 'fix'],
    produces: ['qa-report', 'health-score', 'fix-commits'],
  },
  'gaganfoxwell-qa-report': {
    tags: ['qa', 'testing', 'bugs', 'report', 'quality', 'documentation'],
    produces: ['qa-report', 'health-score', 'bug-list'],
  },
  'gaganfoxwell-scrape': {
    tags: ['web', 'scraping', 'data-extraction', 'read-only', 'json'],
    produces: ['scraped-data', 'json-output'],
  },
  'gaganfoxwell-skillify': {
    tags: ['web', 'scraping', 'codify', 'skill-creation', 'automation'],
    produces: ['skill-script', 'test', 'fixture'],
  },
  'gaganfoxwell-careful': {
    tags: ['safety', 'destructive', 'guardrails', 'prod'],
    produces: ['warning'],
  },
  'gaganfoxwell-freeze': {
    tags: ['safety', 'scope', 'directory', 'restrict'],
    produces: ['freeze-boundary'],
  },
  'gaganfoxwell-guard': {
    tags: ['safety', 'full', 'maximum', 'careful', 'freeze'],
    produces: ['guard-active'],
  },
  'gaganfoxwell-unfreeze': {
    tags: ['safety', 'unfreeze', 'unlock', 'clear'],
    produces: ['freeze-cleared'],
  },
  'gaganfoxwell-readonly': {
    tags: ['safety', 'read-only', 'inspect', 'explore'],
    produces: ['readonly-mode'],
  },
  'gaganfoxwell-private': {
    tags: ['safety', 'private', 'offline', 'no-external'],
    produces: ['private-mode'],
  },
  'gaganfoxwell-learn': {
    tags: ['utility', 'learnings', 'knowledge', 'memory'],
    produces: ['learnings', 'search-results'],
  },
  'gaganfoxwell-context-save': {
    tags: ['utility', 'save', 'checkpoint', 'context'],
    produces: ['context-file'],
  },
  'gaganfoxwell-context-restore': {
    tags: ['utility', 'restore', 'resume', 'context'],
    produces: ['restored-context'],
  },
  'gaganfoxwell-first-task': {
    tags: ['utility', 'onboarding', 'new-project', 'setup'],
    produces: ['orientation', 'first-commit'],
  },
  'gaganfoxwell-teach': {
    tags: ['utility', 'teach', 'conventions', 'patterns'],
    produces: ['teachings'],
  },
  'gaganfoxwell-fork': {
    tags: ['utility', 'worktree', 'parallel', 'isolation'],
    produces: ['worktree'],
  },
};

/** What / how / advantage — three short lines per bundled skill, shown on the
 *  Skills screen so a human (or an agent browsing the catalog) understands each
 *  skill without reading its playbook. Keep every line under ~90 chars. */
const SKILL_EXPLAIN: Record<string, SkillExplain> = {
  'basic-setup': {
    what: 'Starts a project an experienced dev can read — and that can’t leak your keys.',
    how: 'Plain-language interview → pattern ladder → gitleaks hook + push protection + CI → STRUCTURE.md/AGENTS.md → proof drill.',
    win: 'Answer “1” to every question and still get an industry-standard, leak-proof project.',
  },
  'bug-fix': {
    what: 'A gated pipeline for fixing bugs without creating new ones.',
    how: 'Reproduce → audit blast radius → hypothesis-driven root cause → 95% skeptic-checked plan → fix → re-verify.',
    win: 'No duplicate fixes, no symptom patches, no regressions shipped.',
  },
  'lean-code': {
    what: 'The anti-over-engineering reflex (Ponytail’s "lazy senior dev" discipline).',
    how: 'Climbs a restraint ladder — YAGNI → reuse → stdlib → platform → one line — before writing code.',
    win: 'Smaller diffs, fewer dependencies, cheaper reviews; safety code stays untouched.',
  },
  'token-efficient-coding': {
    what: 'Work habits that cut a session’s token burn.',
    how: 'Read the map (CODEBASE.md / graph), not the repo; minimal diffs; never re-read what you know.',
    win: 'Sessions cost a fraction and stay sharp deeper into the context window.',
  },
  'traceable-changes': {
    what: 'Git discipline for repos where several agents commit.',
    how: 'One atomic commit per change, conventional messages, isolated worktrees.',
    win: 'Blame, bisect, and revert always work — any change traces to one commit.',
  },
  'memory-light': {
    what: 'Long-horizon work without dragging the whole history in context.',
    how: 'Recall memory before exploring; externalize state to disk, not the chat.',
    win: 'Sessions resume cheaply and nothing gets re-learned twice.',
  },
  'verify-before-done': {
    what: 'A "done means verified" gate before any completion claim.',
    how: 'Re-read the diff, confirm symbols exist, run build/tests, independent skeptic re-check.',
    win: 'Hallucinated "done" claims die before they ship.',
  },
  'code-review': {
    what: 'Reviews a diff since a fixed point along three axes that are never merged.',
    how: 'Standards, Spec and Security run as parallel sub-agents; every finding must survive a refute pass first.',
    win: 'No axis masks another, findings are verified not guessed, and they outlive the session.',
  },
  handoff: {
    what: 'The relay: pass unfinished work to another agent instead of losing it.',
    how: 'create_handoff writes done / pending / next step; the next agent runs `baton resume`.',
    win: 'A usage limit costs you a minute, not the whole investigation.',
  },
  'stack-migration': {
    what: 'Migrate a codebase to another stack (Angular→Next.js, etc.) feature-by-feature without losing parity.',
    how: 'Inventory → ordered phases → migrate one at ≥95% checked parity; fans out across agents; resumes from MIGRATION.md.',
    win: 'A 100+-file rewrite survives usage limits and lands with no dropped feature or duplicate code.',
  },
  'map-codebase': {
    what: 'Builds the repo map every other skill navigates by.',
    how: '`baton kb rebuild` → knowledge graph + CODEBASE.md, served to agents over MCP.',
    win: 'Orienting costs hundreds of tokens instead of hundreds of thousands.',
  },
  'safe-refactor': {
    what: 'Restructure code without changing behavior.',
    how: 'Green test baseline → isolated worktree → small steps → graph-checked callers.',
    win: 'Refactors land without breaking the caller you forgot existed.',
  },
  'gaganfoxwell-office-hours': {
    what: 'YC-style product diagnosis — six forcing questions that expose demand reality.',
    how: 'Startup mode: diagnostic on demand, status quo, wedge, observation, future-fit. Builder mode: design thinking for side projects and hackathons.',
    win: 'No code written until the problem is worth solving. Design doc saved.',
  },
  'gaganfoxwell-ceo-review': {
    what: 'CEO/founder-mode plan review — find the 10-star product in the request.',
    how: 'Premise challenge → dream state mapping → 4 review modes (expansion/selective/hold/reduction) → 11-section deep review → failure modes → verdict.',
    win: 'Every landmine caught before it explodes. Scope is deliberate, not accidental.',
  },
  'gaganfoxwell-eng-review': {
    what: 'Eng manager-mode plan review — lock architecture, data flow, tests, and performance.',
    how: 'Scope challenge → architecture review → error/edge case map → test strategy → performance analysis → verdict.',
    win: 'Architecture locked before a line of code is written. No surprises during implementation.',
  },
  'gaganfoxwell-review': {
    what: 'Pre-landing code review — catch bugs that pass CI but break in prod.',
    how: 'Scope drift detection → critical pass (SQL, race conditions, trust boundaries) → specialist dispatch → confidence-calibrated findings → verdict.',
    win: 'Every finding verified, confidence-scored, and actionable. No false positive noise.',
  },
  'gaganfoxwell-investigate': {
    what: 'Systematic debugging — no fixes without root cause investigation first.',
    how: 'Investigate (symptoms, code, changes) → Pattern analysis → Hypothesis testing → Minimal fix → Regression test.',
    win: 'Root cause found before any code is changed. No whack-a-mole debugging.',
  },
  'gaganfoxwell-design-audit': {
    what: 'Live-site visual audit — find and fix design issues before users notice.',
    how: 'First impression → Design system extraction → Page-by-page checklist → Fix loop with atomic commits.',
    win: 'Every visual issue found and fixed. Typography, spacing, hierarchy — all polished.',
  },
  'gaganfoxwell-design-shotgun': {
    what: 'Generate multiple AI design variants, compare side-by-side, pick your favorite.',
    how: 'Context gathering → Concept generation → Visual mockups → Comparison board → Feedback → Iterate.',
    win: 'See 3-8 design directions before committing. No more "what if I tried something different?"',
  },
  'gaganfoxwell-design-html': {
    what: 'Turn approved mockups into production-quality HTML/CSS.',
    how: 'Design analysis → Semantic HTML → CSS custom properties → Responsive design → Accessibility.',
    win: 'Production-ready HTML that actually works. Text reflows, heights adjust, layouts are dynamic.',
  },
  'gaganfoxwell-devex-audit': {
    what: 'Live developer experience audit — test the DX before your users do.',
    how: 'Getting started flow → API/CLI ergonomics → Error messages → Documentation → Upgrade path → Scorecard.',
    win: 'DX scorecard with evidence. TTHW measured, friction points identified, quick wins surfaced.',
  },
  'gaganfoxwell-qa': {
    what: 'Systematically QA test a web app and fix bugs found.',
    how: 'Explore pages → Find bugs → Document with screenshots → Fix in source → Re-verify → Health score.',
    win: 'Every bug found, fixed, and verified. Health score before/after. Ship with confidence.',
  },
  'gaganfoxwell-qa-report': {
    what: 'Report-only QA testing — find bugs without fixing them.',
    how: 'Explore pages → Find bugs → Document with screenshots → Health score → Verdict.',
    win: 'Bug report with evidence. No code changes. Decide what to fix yourself.',
  },
  'gaganfoxwell-scrape': {
    what: 'Pull data from a web page — read-only, returns JSON.',
    how: 'Determine intent → Refuse mutating flows → Prototype extraction → Return JSON → Suggest skillify.',
    win: 'Structured data from any web page. One-shot, read-only, JSON output.',
  },
  'gaganfoxwell-skillify': {
    what: 'Codify a successful scrape into a permanent, reusable skill on disk.',
    how: 'Confirm flow → Name skill → Synthesize script → Capture fixture → Write test → Stage → Test → Approve → Commit.',
    win: 'Future scrape calls with same intent run in ~200ms instead of re-driving the page.',
  },
  'gaganfoxwell-careful': {
    what: 'Warn before destructive commands — rm -rf, DROP TABLE, force-push, git reset --hard.',
    how: 'Check every bash command against destructive patterns. MEDIUM = warn and ask. HIGH = hard deny.',
    win: 'No more accidental data loss. User can override each warning.',
  },
  'gaganfoxwell-freeze': {
    what: 'Restrict file edits to a specific directory for the session.',
    how: 'Ask user for directory → Store boundary → Block Edit/Write outside path.',
    win: 'Debug without accidentally "fixing" unrelated code.',
  },
  'gaganfoxwell-guard': {
    what: 'Full safety mode — destructive command warnings + directory-scoped edits combined.',
    how: 'Activate careful + freeze together. Both protections run for the session.',
    win: 'Maximum safety for prod debugging or shared environments.',
  },
  'gaganfoxwell-unfreeze': {
    what: 'Clear the freeze boundary, allowing edits to all directories again.',
    how: 'Read freeze-dir.txt → Show previous boundary → Delete file.',
    win: 'Widen edit scope without ending the session.',
  },
  'gaganfoxwell-readonly': {
    what: 'Read-only mode — no file writes, no git commits, no destructive operations.',
    how: 'Block Edit/Write/commits. Allow Read/Glob/Grep and read-only bash.',
    win: 'Explore unfamiliar codebases safely. Look without touching.',
  },
  'gaganfoxwell-private': {
    what: 'Private mode — no external API calls, no web fetches, no data leaves the machine.',
    how: 'Block WebFetch/WebSearch, curl/wget, npm install. Allow localhost.',
    win: 'Work with sensitive code and proprietary data safely.',
  },
  'gaganfoxwell-learn': {
    what: 'Review, search, prune, and export project learnings across sessions.',
    how: 'Read learnings.jsonl → Search by keyword → Prune stale entries → Export as markdown.',
    win: 'Don\'t repeat mistakes. "Haven\'t we seen this before?" answered instantly.',
  },
  'gaganfoxwell-context-save': {
    what: 'Save working context — git state, decisions, remaining work.',
    how: 'Capture git status → Summarize task → List decisions → Write to .gaganfoxwell/context/.',
    win: 'Any future session can pick up without losing a beat.',
  },
  'gaganfoxwell-context-restore': {
    what: 'Restore working context saved earlier by context-save.',
    how: 'Find most recent context file → Read → Verify git state → Present summary → Resume.',
    win: 'Resume where you left off, even across agent sessions.',
  },
  'gaganfoxwell-first-task': {
    what: 'Handle the first task in a new project — orient, set up, complete first work.',
    how: 'Read README → Check dependencies → Identify conventions → Complete small first task → Commit.',
    win: 'New projects start fast with proven patterns, not trial and error.',
  },
  'gaganfoxwell-teach': {
    what: 'Teach the agent project-specific patterns, conventions, and domain context.',
    how: 'Ask user for context → Capture architectural decisions, naming, gotchas → Write to teachings.md.',
    win: 'Agent understands your project like a team member, not a tourist.',
  },
  'gaganfoxwell-fork': {
    what: 'Fork a worktree for parallel work — create an isolated copy of the current state.',
    how: 'Determine name → Create worktree → Set up project → Report merge command.',
    win: 'Parallel work without affecting the main working directory.',
  },
};

/* ---- inline single-file skills (short, no references) ---- */

const MAP_BODY = `# Map this codebase

Produce Baton's two navigation artifacts so every later agent reads a map
instead of the whole repo.

## Steps

- \`baton kb init\` — register this repo with the knowledge base if it isn't
  already.
- \`baton kb rebuild\` — build (or incrementally update) the graphify knowledge
  graph and regenerate \`CODEBASE.md\`, the compact repo map.
- Open \`CODEBASE.md\` and sanity-check it: the top-level structure, the entry
  points, and the key modules should be recognisable. If a major area is
  missing, the graph may need a full rebuild: \`baton kb rebuild --full\`.
- Wire the graph into your agent over MCP (the dashboard's **Connect MCP**
  button, or \`baton mcp\`) so you can query symbols directly.

The map costs ~hundreds of tokens to read; the raw repo costs ~hundreds of
thousands. Always navigate from the map.
`;

const REFACTOR_BODY = `# Safe refactor

Restructure code without changing behaviour, using worktrees and the knowledge
graph to stay safe.

## Steps

- Map first (see the *Map this codebase* skill) so you know every caller of the
  code you're about to move. Use the knowledge graph to find references — don't
  rely on grep alone.
- Open an isolated worktree: \`baton new "refactor: <area>"\`. Never refactor on
  a branch another agent is using.
- Establish a green baseline: run the build + tests **before** touching
  anything. If they aren't green, stop — fix or report that first.
- Make the change in small, behaviour-preserving steps. Re-run tests after each
  step. Check edit signals before touching shared files.
- Keep the public API identical unless the task says otherwise. If you must
  change a signature, update every caller the graph found.
- Record any non-obvious decision with \`baton memory add\`, then \`baton pass\`
  or \`baton merge\` the worktree once tests pass.
`;

const INLINE_SKILLS: SkillDef[] = [
  {
    id: 'map-codebase',
    name: 'Map this codebase',
    description: 'Build the graphify knowledge graph and CODEBASE.md so agents navigate a compact map instead of reading the whole repo.',
    tags: ['map', 'graphify', 'knowledge graph', 'codebase', 'index', 'navigate', 'onboarding'],
    produces: ['CODEBASE.md', 'knowledge graph'],
    body: MAP_BODY,
    references: [],
    source: 'bundled',
    explain: SKILL_EXPLAIN['map-codebase'],
  },
  {
    id: 'safe-refactor',
    name: 'Safe refactor',
    description: 'Restructure code without changing behaviour, using worktrees, a green test baseline, and the knowledge graph to find every caller.',
    tags: ['refactor', 'cleanup', 'restructure', 'rename', 'move', 'worktree', 'tests'],
    produces: ['worktree', 'knowledge graph', 'memory'],
    body: REFACTOR_BODY,
    references: [],
    source: 'bundled',
    explain: SKILL_EXPLAIN['safe-refactor'],
  },
];

/* ---- file-backed loader (cached — bundled skills never change at runtime) ---- */

let fileBackedCache: SkillDef[] | null = null;

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : [];
}

async function loadOneFileSkill(id: string): Promise<SkillDef | null> {
  const skillPath = join(BUNDLED_DIR, id, 'SKILL.md');
  if (!existsSync(skillPath)) return null;
  const raw = await readFile(skillPath, 'utf-8');
  const parsed = parseFrontmatter(raw);
  const data = parsed.data;
  const name = String(data.name ?? id).trim() || id;
  // Folded/multiline YAML descriptions arrive as one string with newlines — flatten.
  const description = String(data.description ?? '').replace(/\s+/g, ' ').trim();

  const references: SkillReference[] = [];
  const refDir = join(BUNDLED_DIR, id, 'references');
  if (existsSync(refDir)) {
    let files: string[] = [];
    try { files = await readdir(refDir); } catch { files = []; }
    for (const f of files.sort()) {
      try {
        references.push({ rel: `references/${f}`, content: await readFile(join(refDir, f), 'utf-8') });
      } catch { /* skip unreadable reference */ }
    }
  }

  const meta = BUNDLED_META[id] ?? { tags: [], produces: [] };
  const fmTags = asStringArray(data.tags);
  const fmProduces = asStringArray(data.produces);
  // raw is byte-faithful only when the on-disk name already equals the id.
  const nameMatchesId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === id;

  return {
    id,
    name,
    description: description || `The ${id} skill.`,
    tags: fmTags.length ? fmTags : meta.tags,
    produces: fmProduces.length ? fmProduces : meta.produces,
    body: parsed.content.trim() + '\n',
    references,
    source: 'bundled',
    explain: SKILL_EXPLAIN[id],
    raw: nameMatchesId ? raw : undefined,
  };
}

async function loadFileBackedSkills(): Promise<SkillDef[]> {
  if (fileBackedCache) return fileBackedCache;
  const out: SkillDef[] = [];
  if (existsSync(BUNDLED_DIR)) {
    let entries: { name: string; isDirectory(): boolean }[] = [];
    try { entries = await readdir(BUNDLED_DIR, { withFileTypes: true }); } catch { entries = []; }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      try {
        const skill = await loadOneFileSkill(e.name);
        if (skill) out.push(skill);
      } catch { /* skip a malformed bundled skill rather than break the catalog */ }
    }
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  fileBackedCache = out;
  return out;
}

/** All skills Baton ships: file-backed (./bundled) + inline. */
export async function bundledSkills(): Promise<SkillDef[]> {
  return [...(await loadFileBackedSkills()), ...INLINE_SKILLS];
}
