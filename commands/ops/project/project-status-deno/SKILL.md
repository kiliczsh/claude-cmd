---
allowed-tools: Task, Bash(deno:*), Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(echo:*), Bash(which:*), Bash(eza:*), Bash(bat:*)
name: "Project Status Deno"
description: "Ultra-fast Deno TypeScript project health check using 8 parallel sub-agents for comprehensive analysis"
author: "wcygan"
tags: ["ops","project"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Check mode: $ARGUMENTS (optional - quick or detailed, default: quick)
- Current directory: !`pwd`
- Deno version: !`deno --version 2>&1 | head -1 || echo "Deno not installed"`
- Project detected: !`[ -f deno.json ] || [ -f deno.jsonc ] && echo "✅ Deno project found" || echo "❌ No deno.json found"`
- Fresh project: !`rg -q "@fresh/core" deno.json* import_map.json 2>/dev/null && echo "Fresh 2.0 project detected" || echo "Not a Fresh project"`

## Your Task

**IMMEDIATELY DEPLOY 8 PARALLEL DENO PROJECT HEALTH AGENTS** for ultra-fast comprehensive project analysis: **${ARGUMENTS:-quick} mode**

**CRITICAL**: Launch ALL agents simultaneously in first response - NO sequential processing.

## Parallel Deno Project Health Framework

**NO SEQUENTIAL PROCESSING** - Deploy these specialized Deno health analysis agents in parallel:

1. **Type Checking & Compilation Agent**: TypeScript compilation, type errors, import validation, configuration analysis
2. **Test Suite & Coverage Agent**: Test execution, coverage analysis, test framework detection, test quality assessment
3. **Code Quality & Lint Agent**: Deno lint analysis, code style violations, best practices validation
4. **Format & Standards Agent**: Deno fmt checking, code formatting consistency, style guide compliance
5. **Dependencies & Security Agent**: Import analysis, JSR/npm dependencies, security vulnerabilities, lock file validation
6. **Task Management Agent**: deno.json configuration, available tasks, script analysis, project automation
7. **Project Structure Agent**: File organization, Fresh framework detection, architecture patterns, best practices
8. **Performance & Metrics Agent**: Build performance, bundle analysis, optimization opportunities, project metrics

**Expected speedup**: 8x faster than sequential health checks.

**IMMEDIATELY LAUNCH ALL 8 AGENTS:**

**Agent 1: Type Checking & Compilation Analysis**
Analyze TypeScript compilation health, type checking status, import resolution, and configuration validity. Check for type errors, missing definitions, and compiler options.

**Agent 2: Test Suite & Coverage Analysis**
Evaluate test execution, coverage metrics, test file discovery, framework detection, and test quality patterns. Identify missing tests and coverage gaps.

**Agent 3: Code Quality & Lint Analysis**
Perform Deno lint analysis, identify code style violations, best practice compliance, and maintainability issues. Check for code smells and anti-patterns.

**Agent 4: Format & Standards Analysis**
Verify code formatting consistency with Deno fmt, style guide compliance, and formatting standards. Identify unformatted files and style inconsistencies.

**Agent 5: Dependencies & Security Analysis**
Analyze import patterns, JSR vs npm dependencies, security vulnerabilities, lock file status, and dependency management. Check for outdated or vulnerable packages.

**Agent 6: Task Management Analysis**
Evaluate deno.json configuration, available tasks, script organization, and project automation. Check for missing or misconfigured tasks.

**Agent 7: Project Structure Analysis**
Assess file organization, directory structure, Fresh framework usage, architectural patterns, and project best practices. Identify missing files and structure issues.

**Agent 8: Performance & Metrics Analysis**
Analyze build performance, bundle size, optimization opportunities, and project metrics. Identify performance bottlenecks and optimization potential.

**CRITICAL**: All agents execute simultaneously for maximum efficiency. Synthesis happens after all agents complete.

Expected completion time: 8x faster than traditional sequential analysis.

## Quick Reference

### Usage Examples

```bash
# Quick health check (default)
/project-status-deno

# Detailed analysis with all checks
/project-status-deno detailed

# From a specific project directory
cd my-deno-project && /project-status-deno
```

### Health Checks Performed

1. **Type Checking**: TypeScript compilation and type safety
2. **Test Suite**: Test discovery, execution, and coverage
3. **Code Quality**: Linting and formatting standards
4. **Task Management**: deno.json configuration and tasks
5. **Dependencies**: Lock file, caching, and import analysis
6. **Project Structure**: Best practices and Fresh framework
7. **Import Patterns**: JSR vs NPM vs HTTPS imports (detailed mode)
8. **Performance**: Build metrics and optimization opportunities

This command provides comprehensive Deno project health monitoring with emphasis on modern Deno best practices and Fresh 2.0 support through parallel sub-agent analysis.