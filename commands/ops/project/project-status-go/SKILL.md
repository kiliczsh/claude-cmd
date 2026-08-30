---
allowed-tools: Task, Bash(go:*), Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(echo:*), Bash(which:*), Bash(eza:*), Bash(bat:*)
name: "Project Status Go"
description: "Ultra-fast Go project health check using 8 parallel sub-agents for comprehensive analysis"
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
- Go version: !`go version 2>/dev/null || echo "Go not installed"`
- Project detected: !`[ -f go.mod ] && echo "✅ Go module found" || echo "❌ No go.mod found"`
- Module name: !`go list -m 2>/dev/null || echo "Not in a Go module"`
- Go workspace: !`[ -f go.work ] && echo "Go workspace detected" || echo "Single module project"`

## Your Task

**IMMEDIATELY DEPLOY 8 PARALLEL GO PROJECT HEALTH AGENTS** for ultra-fast comprehensive project analysis: **${ARGUMENTS:-quick} mode**

**CRITICAL**: Launch ALL agents simultaneously in first response - NO sequential processing.

## Parallel Go Project Health Framework

**NO SEQUENTIAL PROCESSING** - Deploy these specialized Go health analysis agents in parallel:

1. **Build & Compilation Agent**: Go build status, compilation errors, race condition detection, build optimization analysis
2. **Test Suite & Coverage Agent**: Test execution, coverage analysis, benchmark detection, test quality assessment
3. **Code Quality & Vet Agent**: go vet analysis, code quality metrics, best practices validation, maintainability checks
4. **Format & Standards Agent**: gofmt checking, code formatting consistency, style guide compliance
5. **Dependencies & Security Agent**: Module analysis, dependency updates, vulnerability scanning with govulncheck
6. **Static Analysis Agent**: staticcheck analysis, advanced linting, code smell detection, performance issues
7. **Project Structure Agent**: File organization, package structure, ConnectRPC detection, architecture patterns
8. **Performance & Metrics Agent**: Binary size analysis, benchmark detection, optimization opportunities, profiling readiness

**Expected speedup**: 8x faster than sequential health checks.

**IMMEDIATELY LAUNCH ALL 8 AGENTS:**

**Agent 1: Build & Compilation Analysis**
Analyze Go build health, compilation status, race condition detection, and build configuration. Check for build errors, missing dependencies, and compilation issues.

**Agent 2: Test Suite & Coverage Analysis**
Evaluate test execution, coverage metrics, benchmark detection, and test quality patterns. Identify missing tests, coverage gaps, and test performance.

**Agent 3: Code Quality & Vet Analysis**
Perform go vet analysis, identify code quality issues, best practice violations, and maintainability problems. Check for potential bugs and anti-patterns.

**Agent 4: Format & Standards Analysis**
Verify code formatting consistency with gofmt, style guide compliance, and formatting standards. Identify unformatted files and style inconsistencies.

**Agent 5: Dependencies & Security Analysis**
Analyze module dependencies, security vulnerabilities, outdated packages, and dependency management. Check for security issues with govulncheck.

**Agent 6: Static Analysis Agent**
Perform advanced static analysis with staticcheck, identify complex code issues, performance problems, and advanced linting violations.

**Agent 7: Project Structure Analysis**
Assess package organization, directory structure, ConnectRPC usage, architectural patterns, and Go project best practices. Identify structural issues.

**Agent 8: Performance & Metrics Analysis**
Analyze binary size, benchmark availability, performance optimization opportunities, and profiling readiness. Identify performance bottlenecks.

**CRITICAL**: All agents execute simultaneously for maximum efficiency. Synthesis happens after all agents complete.

Expected completion time: 8x faster than traditional sequential analysis.

## Quick Reference

### Usage Examples

```bash
# Quick health check (default)
/project-status-go

# Detailed analysis with all checks
/project-status-go detailed

# From a specific project directory
cd my-go-project && /project-status-go
```

### Health Checks Performed

1. **Build Health**: Compilation and race condition detection
2. **Test Suite**: Test execution, coverage analysis
3. **Code Quality**: go vet, gofmt, staticcheck
4. **Module Health**: Tidiness, verification, updates
5. **Security**: Vulnerability scanning with govulncheck
6. **Project Structure**: Best practices and organization
7. **Performance**: Benchmarks and concurrency analysis (detailed mode)
8. **Static Analysis**: Advanced linting and code quality metrics

This command provides comprehensive Go project health monitoring with a focus on best practices and security through parallel sub-agent analysis.