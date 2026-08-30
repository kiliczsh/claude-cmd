# Plugin Taxonomy and Approved Tag List

> **Status:** Approved — Phase 2 (Plugin Lifecycle)
> **Owner:** CPO
> **Related:** CMD-41, CMD-18 (Phase 2 Epic), CMD-25 (plugin init)

---

## Overview

This document defines the canonical taxonomy for claude-cmd plugins: the approved category list and the approved tag list. All plugins published to the registry must conform to this taxonomy.

**Why this matters:**
- Enables meaningful discovery and filtering in the plugin TUI
- Enforces consistency across community-contributed plugins
- Prevents tag sprawl (we already have 75 freeform tags in the skills registry — this tightens that up)

---

## Plugin Categories

Every plugin **must** declare exactly one primary `category` in its `plugin.json`. Categories are the top-level browse facets in the discovery TUI.

| Category | Description | Example Plugins |
|---|---|---|
| `developer-tools` | Code writing, editing, refactoring, scaffolding | code-reviewer, refactor-assist, scaffold-ts |
| `git` | Git operations, commit messages, PR management, branches | conventional-commits, pr-description, git-standup |
| `testing` | Test generation, coverage analysis, quality assurance | test-generator, coverage-report, snapshot-updater |
| `documentation` | Docs generation, README, API docs, inline comments | readme-gen, jsdoc-filler, changelog-writer |
| `project-management` | Task tracking, planning, estimation, sprint management | task-breakdown, estimation-poker, retrospective |
| `devops` | CI/CD, deployment, infrastructure, monitoring, k8s | gh-actions-gen, k8s-helper, deploy-check |
| `security` | Security scanning, vulnerability assessment, auditing | dep-audit, secrets-scan, owasp-check |
| `data` | Data processing, transformation, querying, analysis | sql-gen, json-transform, csv-analyzer |
| `ai-agents` | Agent definitions, persona prompts, prompt engineering | coder-agent, reviewer-agent, prompt-refiner |
| `language-specific` | Language or framework-specific tooling | go-tools, rust-helpers, java-spring, deno-utils |
| `productivity` | General developer productivity and workflow automation | daily-standup, focus-timer, context-switch |
| `mcp` | MCP server configurations and integrations | mcp-postgres, mcp-slack, mcp-github |
| `meta` | Tools about tools (validators, linters, generators for claude-cmd itself) | skill-linter, plugin-validator |

---

## Approved Tag List

Tags provide additional cross-cutting attributes. Each plugin may declare **up to 5 tags** from the approved list below. Tags outside this list will be **rejected** by the registry validator.

Tags are organized into groups for clarity but are a flat list in the registry.

### Workflow / Activity
| Tag | Use when the plugin... |
|---|---|
| `generate` | Creates new code, files, or content from scratch |
| `analyze` | Reads and interprets existing code or data |
| `refactor` | Rewrites or restructures existing code without changing behavior |
| `review` | Reviews code, PRs, or documents for quality |
| `fix` | Automatically fixes bugs, lint errors, or issues |
| `debug` | Helps diagnose and understand bugs |
| `migrate` | Moves code, data, or config from one format/system to another |
| `search` | Searches codebases, registries, or documentation |
| `audit` | Performs security, dependency, or compliance checks |
| `monitor` | Watches for events, metrics, or conditions at runtime |
| `scaffold` | Generates project or module scaffolding |
| `create` | Creates new resources (files, issues, PRs, etc.) |
| `extract` | Extracts structured information from unstructured input |
| `optimize` | Improves performance, size, or efficiency |
| `deploy` | Assists with deployment or release steps |
| `test` | Generates or runs tests |

### Domain
| Tag | Use when the plugin targets... |
|---|---|
| `git` | Git or GitHub workflows |
| `code` | General code manipulation |
| `docs` | Documentation generation or editing |
| `security` | Security-related tasks |
| `data` | Data processing or analysis |
| `api` | REST, GraphQL, or SDK interactions |
| `web` | Web frontend or browser-based tasks |
| `ai` | AI/LLM usage, prompt engineering |
| `mcp` | MCP server configuration |
| `infra` | Infrastructure as code, cloud resources |
| `devops` | CI/CD, deployment pipelines |
| `automation` | Repetitive task automation |
| `research` | Codebase exploration and understanding |
| `project-management` | Issue tracking, planning, estimation |

### Stack / Platform
| Tag | Use when the plugin is specific to... |
|---|---|
| `go` | Go language |
| `rust` | Rust language |
| `java` | Java / JVM ecosystem |
| `deno` | Deno runtime |
| `k8s` | Kubernetes |
| `github` | GitHub platform (not just git) |
| `ci` | CI/CD systems (GitHub Actions, CircleCI, etc.) |
| `typescript` | TypeScript / JavaScript |
| `python` | Python |
| `docker` | Docker / container tooling |
| `terraform` | Terraform / OpenTofu IaC |

### Meta / Quality
| Tag | Use when the plugin... |
|---|---|
| `productivity` | Improves developer daily workflow |
| `workflow` | Orchestrates multi-step processes |
| `best-practices` | Enforces coding or team standards |
| `learning` | Helps users understand concepts |
| `interactive` | Requires back-and-forth user input |

---

## Enforcement Rules

1. **Category is required.** A `plugin.json` without `category` fails validation.
2. **Category must be from the approved list.** Unknown categories fail validation.
3. **Tags are optional but capped at 5.** More than 5 tags fails validation.
4. **Tags must be from the approved list.** Unknown tags fail validation with a helpful error pointing to this document.
5. **No duplicates.** Repeated tags within a single plugin fail validation.

### Validation Error Messages

| Violation | Error message |
|---|---|
| Missing category | `plugin.json: "category" is required. Choose from: developer-tools, git, testing, ...` |
| Unknown category | `plugin.json: unknown category "xyz". Valid categories: developer-tools, git, testing, ...` |
| Too many tags | `plugin.json: max 5 tags allowed, got 7` |
| Unknown tag | `plugin.json: unknown tag "fedroa". Did you mean "fedora"? See docs/plugin-taxonomy.md for approved tags.` |

---

## Future Taxonomy Governance

- **Adding a category:** Requires CPO approval and a PR to this document.
- **Adding a tag:** Any contributor can propose a tag via GitHub issue with 5+ use cases. Approved by CPO.
- **Removing a tag:** Only if fewer than 3 plugins use it, with a 30-day deprecation notice.

---

## Changelog

| Date | Change |
|---|---|
| 2026-03-13 | Initial taxonomy defined (CMD-41) |
