# SKILL.md Authoring Guide

> **Audience:** External contributors and skill authors
> **Owner:** CPO
> **Related:** [TEMPLATE.md](../commands/TEMPLATE.md), [plugin-taxonomy.md](plugin-taxonomy.md), [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## What is a SKILL.md?

A `SKILL.md` is a Markdown file that defines a reusable skill for Claude Code agents. Skills are the core extension unit of the claude-cmd ecosystem — they tell Claude Code *what* to do, *when* to do it, and *what tools* it may use to do it.

When you install a skill via `claude-cmd`, it is placed in `~/.claude/skills/<skill-name>/SKILL.md`. Claude Code reads this file to understand the skill's purpose and activate it automatically when relevant.

Skills conform to the [agentskills.io](https://agentskills.io) open standard and extend it with Claude Code-specific fields.

---

## File Structure

Every `SKILL.md` has two parts:

1. **YAML frontmatter** — machine-readable metadata between `---` delimiters
2. **Markdown body** — the actual instructions and prompt delivered to Claude

```
---
<frontmatter here>
---

<skill body here>
```

---

## Frontmatter Reference

### Required Fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Human-readable skill name. Used in the TUI and registry. |
| `description` | string | What this skill does and when to activate it. Max 1024 chars. Agents use this for automatic selection. |

```yaml
name: "Conventional Commit"
description: "Create git commits following the Conventional Commits specification. Use when committing code changes."
```

### Optional — agentskills.io Standard Fields

| Field | Type | Description |
|---|---|---|
| `license` | string | SPDX license identifier (e.g. `MIT`, `Apache-2.0`) |
| `compatibility` | string | Free-text compatibility note |
| `metadata.author` | string | Your name or GitHub username |
| `metadata.tags` | array | Up to 5 tags from the [approved tag list](plugin-taxonomy.md) |
| `metadata.version` | string | Semantic version (`1.0.0`) |
| `metadata.created_at` | ISO 8601 | Creation date |
| `metadata.updated_at` | ISO 8601 | Last updated date |

```yaml
license: "MIT"
metadata:
  author: "your-github-username"
  tags: ["git", "generate"]
  version: "1.0.0"
  created_at: "2025-07-01T00:00:00Z"
  updated_at: "2025-07-01T00:00:00Z"
```

### Optional — Claude Code Extension Fields

These fields are not part of the agentskills.io spec but are recognized by Claude Code:

| Field | Type | Description |
|---|---|---|
| `allowed-tools` | string | Space or comma-separated list of tools the skill may use. Restricts tool access for safety. |
| `user-invocable` | boolean | If `true`, the skill can be triggered by a user slash command (`/skill-name`). Default: `false`. |
| `argument-hint` | string | Hint shown in the TUI when the skill accepts arguments (e.g. `"<branch-name>"`). |
| `model` | string | Override the Claude model used for this skill (e.g. `claude-sonnet-4-6`). |
| `disable-model-invocation` | boolean | If `true`, Claude will not be invoked; the skill acts as a pure prompt template. |

#### `allowed-tools` Syntax

The `allowed-tools` field accepts tool names with optional fine-grained restrictions:

```yaml
# Allow full access to Read and Write
allowed-tools: Read Write

# Allow Bash but only for specific commands
allowed-tools: Read Write Bash(git add:*) Bash(git commit:*)

# Allow specific MCP tools
allowed-tools: Read Bash(npm:*) mcp__context7__resolve-library-id

# Allow all tools (use sparingly — prefer explicit allow-lists)
allowed-tools: "*"
```

**Security note:** Always prefer explicit allow-lists over `"*"`. Restricting tool access limits blast radius if a skill is invoked unexpectedly.

---

## Skill Body

The skill body is plain Markdown that Claude reads as its prompt. It should:

- Explain **what** to do in clear, step-by-step language
- Use a **Context** section to inject real-time shell output via `!` syntax
- Use **STEP N** headings to structure multi-step workflows
- Use **TRY / CATCH** blocks for error handling

### Context Section (Dynamic Shell Injection)

Claude Code supports running shell commands at skill load time using `!` prefix syntax. Output is injected inline before Claude processes the skill:

```markdown
## Context

- Current directory: !`pwd`
- Git status: !`git status --porcelain | head -20`
- Node version: !`node --version 2>/dev/null || echo "Node not installed"`
- Recent commits: !`git log --oneline -5 2>/dev/null || echo "Not a git repo"`
```

**Best practices for `!` commands:**
- Always include a fallback (`|| echo "..."`) so the skill doesn't break in unexpected environments
- Limit output (use `| head -N`) to avoid overwhelming context
- Only inject what the skill actually needs — each line costs tokens

### STEP Structure

For multi-step workflows, use a numbered STEP pattern:

```markdown
## Your Task

STEP 1: Analyze the current state
- EXAMINE the context above
- DETERMINE what action is needed

STEP 2: Take action
- DO the thing
- VERIFY the result

STEP 3: Report back
- SUMMARIZE what was done
- HIGHLIGHT any issues found
```

### TRY / CATCH Pattern

For operations that may fail (network, tools, file access), use the TRY/CATCH pattern:

```markdown
TRY:
- CALL the external service
- PROCESS the response

CATCH (service_unavailable):
- LOG the error
- FALL BACK to local data
- CONTINUE with degraded functionality
```

### Arguments Placeholder

If your skill accepts user-provided arguments (e.g. `claude-cmd install my-skill -- --branch main`), reference them with `$ARGUMENTS`:

```markdown
## Arguments

$ARGUMENTS
```

---

## Complete Examples

### Minimal Skill

```markdown
---
name: "List TODOs"
description: "Find all TODO comments in the current project. Use when auditing technical debt."
metadata:
  author: "your-github-username"
  tags: ["analyze", "code"]
  version: "1.0.0"
allowed-tools: Bash(rg:*) Bash(grep:*)
---

## Your Task

Find all TODO, FIXME, and HACK comments in the codebase.

STEP 1: Search for TODO comments
- RUN `rg -n "TODO|FIXME|HACK" --glob "!node_modules" --glob "!dist"` to find all comments
- GROUP results by file

STEP 2: Summarize findings
- COUNT total occurrences per type
- HIGHLIGHT any critical or blocking TODOs
- SUGGEST which are good first-issue candidates
```

### Intermediate Skill (with dynamic context)

```markdown
---
name: "PR Description"
description: "Generate a pull request description from recent commits. Use when opening a GitHub PR."
metadata:
  author: "your-github-username"
  tags: ["git", "generate", "docs"]
  version: "1.0.0"
allowed-tools: Bash(git log:*) Bash(git diff:*)
user-invocable: true
argument-hint: "<base-branch>"
---

## Context

- Current branch: !`git branch --show-current 2>/dev/null || echo "unknown"`
- Commits vs main: !`git log main..HEAD --oneline 2>/dev/null | head -20 || echo "No commits found"`
- Files changed: !`git diff main --name-only 2>/dev/null | head -20 || echo "No diff"`

## Your Task

Generate a clear, concise pull request description.

STEP 1: Understand the changes
- REVIEW the commits and diff from the Context section
- IDENTIFY the primary purpose of this PR (feature, fix, refactor, etc.)

STEP 2: Write the PR description
- TITLE: One line, imperative mood, ≤70 chars
- SUMMARY: 2–3 bullets covering what changed and why
- TEST PLAN: Checklist of how to verify the changes work

STEP 3: Output
- PRESENT the description in copy-ready Markdown

## Arguments

Base branch to diff against (default: main): $ARGUMENTS
```

### Advanced Skill (with MCP tool + error handling)

See [commands/context/deno/context-load-deno-fresh/SKILL.md](../commands/context/deno/context-load-deno-fresh/SKILL.md) for a full example using Context7 MCP, TRY/CATCH, and parallel sub-agent loading.

---

## Directory Structure

Each skill lives in its own named directory:

```
commands/
└── <category>/
    └── <skill-name>/
        └── SKILL.md
```

**Naming rules:**
- Use lowercase kebab-case: `my-skill-name`
- Keep names concise and descriptive: `pr-description`, not `generate-pull-request-description-from-commits`
- Use the category as a namespace prefix when names might collide: `git-commit`, not just `commit`

**Categories** map to the top-level subdirectories under `commands/`:

| Directory | Use for |
|---|---|
| `agent/` | Agent persona definitions |
| `analyze/` | Code analysis and review |
| `code/` | Code generation and refactoring |
| `context/` | Context-loading skills |
| `docs/` | Documentation generation |
| `git/` | Git operations |
| `github/` | GitHub-specific workflows |
| `kubernetes/` | Kubernetes operations |
| `ops/` | DevOps and infrastructure |
| `scaffold/` | Project scaffolding |
| `security/` | Security auditing |
| `test/` | Test generation and analysis |
| `workflow/` | Multi-step orchestration |

---

## Validation Checklist

Before submitting a skill, verify:

- [ ] `name` field is present and ≤100 chars
- [ ] `description` field is present and ≤1024 chars
- [ ] `allowed-tools` is set and as restrictive as possible
- [ ] `!` shell commands have fallbacks (`|| echo "..."`)
- [ ] `metadata.tags` uses only [approved tags](plugin-taxonomy.md) (max 5)
- [ ] `metadata.version` follows semver (`1.0.0`)
- [ ] Skill directory name matches kebab-case skill name
- [ ] Skill is placed in the correct category directory

You can validate your skill locally with:

```bash
claude-cmd validate commands/<category>/<skill-name>/SKILL.md
```

---

## Submitting to the Registry

1. **Fork** the [claude-cmd repository](https://github.com/kiliczsh/claude-cmd)
2. **Create** your skill file at `commands/<category>/<skill-name>/SKILL.md` using [TEMPLATE.md](../commands/TEMPLATE.md) as a starting point
3. **Regenerate** the command index: `npm run parse-commands`
4. **Validate** your skill: `claude-cmd validate` (once CMD-15 ships)
5. **Test locally**: `claude-cmd --local install <skill-name>`
6. **Open a PR** referencing the skill category and a brief description

### PR Title Convention

```
feat(skills): add <skill-name> to <category>/
```

Example:
```
feat(skills): add pr-description to git/
```

---

## Community Standards

- Skills should be general-purpose, not repo-specific
- Include a `license` field — MIT is preferred for community submissions
- Do not hardcode absolute paths or credentials
- Avoid shell commands that modify state in the `## Context` section — context is read-only
- If a skill requires an external tool (e.g. `rg`, `fd`, `deno`), document the prerequisite in the skill body

---

## Getting Help

- **Issues:** [github.com/kiliczsh/claude-cmd/issues](https://github.com/kiliczsh/claude-cmd/issues)
- **Discussions:** GitHub Discussions for authoring questions
- **Examples:** Browse [commands/](../commands/) for real-world skills to copy from
- **Template:** Start with [commands/TEMPLATE.md](../commands/TEMPLATE.md)
