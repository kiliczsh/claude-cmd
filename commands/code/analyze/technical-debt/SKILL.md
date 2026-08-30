---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(git:*), Bash(jq:*), Bash(gdate:*), Task
name: "Technical Debt"
description: "Comprehensive technical debt analysis with actionable remediation strategies"
author: "wcygan"
tags: ["code","analyze"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Project root: !`pwd`
- Technology stack: !`fd "(Cargo\.toml|go\.mod|pom\.xml|deno\.json|package\.json)" . -d 2 | head -5 || echo "No technology files detected"`
- Project structure: !`fd . -t d -d 3 | head -10 || echo "No directories found"`
- Git status: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Recent commits: !`git log --oneline -5 2>/dev/null || echo "No git history"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`

## Your task

**IMMEDIATELY DEPLOY 8 PARALLEL TECHNICAL DEBT ANALYSIS AGENTS** for ultra-fast comprehensive debt assessment: **$ARGUMENTS**

Think deeply about comprehensive technical debt analysis while maximizing parallel execution for 8x speedup.

**CRITICAL**: Launch ALL agents simultaneously in first response - NO sequential processing.

## Parallel Technical Debt Analysis Framework

STEP 1: **LAUNCH ALL 8 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL PROCESSING** - Deploy these specialized debt analysis agents in parallel:

1. **Code Quality & Complexity Agent**: Cyclomatic complexity, large files, code smells, anti-patterns
2. **Dependency Health & Security Agent**: Outdated dependencies, vulnerabilities, unused packages, license compliance
3. **Performance Debt Agent**: Memory leaks, N+1 queries, sync operations, allocation bottlenecks
4. **Test Coverage & Quality Agent**: Coverage analysis, flaky tests, missing assertions, test scenarios
5. **Documentation Debt Agent**: API docs, README currency, comment debt, architectural documentation
6. **Architecture Violations Agent**: Circular dependencies, coupling issues, design violations
7. **Configuration & Environment Agent**: Config drift, environment inconsistencies, secret management
8. **Automation & CI/CD Debt Agent**: Missing automation, pipeline gaps, deployment issues

**Expected speedup**: 8x faster than sequential debt analysis.

STEP 2: Initialize Parallel Session Management

```json
// /tmp/technical-debt-analysis-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "phase": "parallel_analysis",
  "technology_stack": "auto-detect",
  "analysis_domains": [
    "code_quality",
    "dependencies",
    "performance",
    "testing",
    "documentation",
    "architecture",
    "configuration",
    "automation"
  ],
  "debt_findings": {},
  "priority_matrix": {},
  "remediation_roadmap": {}
}
```

STEP 3: Parallel Debt Discovery & Analysis

**ALL AGENTS WORK CONCURRENTLY:**

**Technical Debt Discovery Execution:**

```bash
# Code quality and complexity patterns
rg "if|else|while|for|match|switch|case|catch|\?\?" --count-matches
fd "\.(rs|go|java|ts|js|py)$" . --exec wc -l {} \; | rg "^\s*[5-9][0-9]{2,}"

# Dependency and security patterns
fd "(Cargo\.toml|go\.mod|pom\.xml|package\.json|requirements\.txt)" . -d 2
rg "unwrap\(\)|expect\(|panic!" --type rust -n
rg "password.*=|secret.*=|key.*=|token.*=" -n

# Performance and architecture patterns
rg "N\+1|blocking|sync|await|async" -n
rg "TODO|FIXME|HACK|XXX" -n
```

TRY:
Launch all 8 parallel agents for comprehensive debt analysis
Execute concurrent discovery across all debt dimensions
Synthesize findings from all agent results
Apply priority scoring (High/Medium/Low) based on impact
Generate quantified metrics and remediation roadmap
Update session state: phase = "debt_analysis_complete"

CATCH (agent_failures):
Continue with available agent results
Document failed analysis areas
Provide partial debt assessment with gaps identified
Generate basic remediation roadmap

FINALLY:
Aggregate all parallel agent findings
Create comprehensive debt assessment matrix
Generate structured remediation plan with effort estimates
Save artifacts: debt-analysis.md, remediation-roadmap.md
Clean up temporary analysis files

STEP 4: **Parallel Results Synthesis**

WAIT for ALL 8 agents to complete debt analysis
AGGREGATE findings from all parallel streams:

- Code quality metrics and complexity hotspots
- Dependency vulnerabilities and outdated packages
- Performance bottlenecks and inefficient patterns
- Test coverage gaps and quality issues
- Documentation debt and missing API docs
- Architecture violations and circular dependencies
- Configuration drift and environment inconsistencies
- Automation gaps and CI/CD debt

GENERATE structured remediation roadmap:

- Immediate actions (security vulnerabilities, critical issues)
- Short-term actions (1-4 weeks: performance, quality improvements)
- Long-term actions (1-3 months: architecture, documentation)
- Automation opportunities (CI/CD, pre-commit hooks, monitoring)

CREATE debt priority matrix:

```json
{
  "immediate_actions": ["Critical security fixes", "Performance blockers"],
  "short_term_actions": ["Code quality improvements", "Test coverage"],
  "long_term_actions": ["Architecture refactoring", "Documentation"],
  "automation_opportunities": ["Pre-commit hooks", "Dependency updates"],
  "prevention_strategies": ["Quality gates", "Security scanning"]
}
```

## Analysis Commands Reference

### Modern Tool Usage Examples

**File Discovery (using fd instead of find):**

```bash
# Source files by language
fd "\.(rs|go|java|ts|js|py)$" src/

# Large files identification
fd "\.(rs|go|java|ts)$" . --exec wc -l {} \; | rg "^\s*[5-9][0-9]{2,}" | head -20

# Configuration files
fd "(config|\.env|\.yml|\.yaml|\.toml|\.json)$" . -d 3
```

**Code Pattern Analysis (using rg instead of grep):**

```bash
# Complexity indicators
rg "if|else|while|for|match|switch|case|catch|\?\?" --count-matches

# Anti-patterns
rg "unwrap\(\)|expect\(|panic!" --type rust -n
rg "interface\{\}" --type go -n
rg "instanceof|\.getClass\(\)" --type java -n

# Security patterns
rg "password.*=|secret.*=|key.*=|token.*=" -n
rg "eval\(|exec\(|system\(" -n
```

**Dependency Analysis:**

```bash
# Rust
cargo outdated --root-deps-only 2>/dev/null || echo "Cargo not available"
cargo audit 2>/dev/null || echo "cargo-audit not installed"

# Go
go list -u -m all 2>/dev/null | rg "\[" || echo "Go modules not available"
govulncheck ./... 2>/dev/null || echo "govulncheck not installed"

# Java Maven
./mvnw versions:display-dependency-updates 2>/dev/null || echo "Maven not available"

# Deno
deno info --json 2>/dev/null | jq '.modules[] | select(.specifier | startswith("http"))' 2>/dev/null || echo "Deno not available"
```

## State Management Schema

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "phase": "analysis_complete",
  "technology_stack": {
    "detected_languages": [],
    "build_tools": [],
    "frameworks": []
  },
  "analysis_results": {
    "code_quality": {
      "complexity_score": "number",
      "large_files_count": "number",
      "code_smells": []
    },
    "dependencies": {
      "outdated_count": "number",
      "vulnerabilities": [],
      "unused_dependencies": []
    },
    "performance": {
      "bottlenecks": [],
      "inefficient_patterns": [],
      "memory_issues": []
    },
    "testing": {
      "coverage_percentage": "number",
      "quality_issues": [],
      "missing_tests": []
    },
    "documentation": {
      "missing_docs": [],
      "outdated_docs": [],
      "comment_debt": []
    },
    "architecture": {
      "circular_dependencies": [],
      "coupling_issues": [],
      "design_violations": []
    }
  },
  "debt_priority_matrix": {
    "high_priority": [],
    "medium_priority": [],
    "low_priority": []
  },
  "remediation_roadmap": {
    "immediate_actions": [],
    "short_term_actions": [],
    "long_term_actions": []
  },
  "metrics": {
    "total_debt_score": "number",
    "trend_direction": "improving|stable|degrading",
    "technical_debt_ratio": "percentage"
  }
}
```

### Expected Performance & Outcomes:

**8x Performance Improvement:**

- **Sequential time**: 40-50 seconds for comprehensive debt analysis
- **Parallel time**: 5-7 seconds with 8 sub-agents
- **Speedup**: 8x faster through aggressive parallelization

**Comprehensive Technical Debt Assessment:**

- Complete debt assessment across all dimensions
- Prioritized remediation roadmap with effort estimates
- Security vulnerability analysis with immediate action items
- Dependency health report with update recommendations
- Code quality metrics with improvement opportunities
- Performance bottleneck identification with optimization strategies
- Test coverage gaps with testing strategy recommendations
- Documentation debt assessment with writing guidelines
- Architecture violation analysis with refactoring suggestions
- Automation setup guide for continuous debt monitoring

**Parallel Architecture Benefits:**

- **Token efficiency**: 45-55% reduction through specialized agent contexts
- **Comprehensive coverage**: All debt dimensions analyzed simultaneously
- **Consistent quality**: No trade-offs between speed and thoroughness
- **Actionable results**: Immediate/short-term/long-term remediation plans

## Automation Integration

- Pre-commit hooks for code quality enforcement
- CI pipeline checks for dependency security
- Regular dependency update automation
- Code quality gates for pull request approval
- Security scanning in deployment pipelines
- Technical debt tracking in project management tools

The optimized technical debt analyzer delivers **instant comprehensive debt assessment** through high-performance parallel execution, transforming debt analysis from a time-consuming sequential process into a lightning-fast intelligent debt management system.