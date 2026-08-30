---
allowed-tools: Read, Bash(fd:*), Bash(rg:*), Bash(eza:*), Bash(jq:*), Bash(yq:*), Bash(gdate:*), Task
name: "Ideate Commands"
description: "Generate intelligent project-specific slash command ideas through comprehensive codebase analysis"
author: "wcygan"
tags: ["meta","command"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Target project context: $ARGUMENTS
- Project structure: !`fd . -t d -d 2 | head -10 || echo "No subdirectories found"`
- Technology indicators: !`fd "(package\.json|Cargo\.toml|go\.mod|deno\.json|pom\.xml|build\.gradle)" . -d 3 | head -5 || echo "No build files detected"`
- Existing scripts/tasks: !`fd "(scripts|tasks|bin)" . -t d -d 2 | head -3 || echo "No script directories found"`
- Configuration files: !`fd "\.(env|config|yml|yaml|toml|json)" . -d 2 | rg -v node_modules | head -8 || echo "No config files found"`
- Documentation: !`fd "(README|CONTRIBUTING|CHANGELOG|DOCS)" . -t f -d 2 | head -5 || echo "No documentation found"`
- Existing Claude commands: !`fd "\.md$" .claude/commands 2>/dev/null | wc -l | tr -d ' ' || echo "0"` custom commands

## Your Task

STEP 1: Initialize intelligent command ideation session

- CREATE session state file: `/tmp/ideate-commands-$SESSION_ID.json`
- ANALYZE project context from dynamic discovery above
- DETERMINE project complexity and technology stack
- IDENTIFY automation opportunities and workflow pain points

STEP 2: Comprehensive project analysis with technology-specific insights

TRY:

- DETECT primary programming languages and frameworks
- ANALYZE build systems and dependency management patterns
- SCAN FOR common development workflows and scripts
- IDENTIFY testing strategies and quality assurance patterns
- EXAMINE deployment and operations configurations
- EVALUATE team collaboration and documentation practices

**Technology Stack Analysis:**

```bash
# Modern CLI-based project discovery
echo "Analyzing project with modern tools..."

# Language detection using fd and rg
lang_indicators=$(fd "\.(rs|go|ts|js|java|py|rb|php|cpp|c)$" . -d 3 | head -20)
echo "Source files: $lang_indicators"

# Framework detection
framework_files=$(fd "(Cargo\.toml|go\.mod|package\.json|requirements\.txt|Gemfile|composer\.json)" . -d 2)
echo "Framework files: $framework_files"

# Infrastructure and operations
infra_files=$(fd "(Dockerfile|docker-compose|kubernetes|terraform|\.tf)" . -d 3)
echo "Infrastructure: $infra_files"

# CI/CD detection
ci_patterns=$(fd "(\.github|\.gitlab-ci|jenkins|buildkite)" . -t d -d 2)
echo "CI/CD: $ci_patterns"
```

STEP 3: Pattern recognition and workflow identification

CASE project_complexity:

WHEN "simple_single_technology":

- GENERATE 3-5 focused command suggestions
- EMPHASIZE development lifecycle automation
- FOCUS on build, test, and deployment workflows

WHEN "complex_multi_technology":

- LAUNCH parallel sub-agents for comprehensive analysis
- DELEGATE different technology aspects to specialized agents
- SYNTHESIZE findings for holistic command suggestions

**Sub-Agent Delegation for Complex Projects:**

IF project has multiple technologies OR extensive infrastructure:

LAUNCH parallel sub-agents to analyze different aspects:

- **Agent 1: Development Workflows**: Analyze build systems, testing patterns, and development lifecycle
- **Agent 2: Operations & Infrastructure**: Examine deployment, monitoring, and infrastructure management
- **Agent 3: Code Quality & Security**: Study linting, security scanning, and compliance requirements
- **Agent 4: Team Collaboration**: Review documentation, onboarding, and knowledge sharing practices
- **Agent 5: Performance & Optimization**: Identify performance testing, profiling, and optimization opportunities

Each agent provides specialized command suggestions for their domain.

STEP 4: Generate targeted command suggestions with implementation details

FOR EACH identified workflow pattern:

**Command Suggestion Format:**

```json
{
  "command_name": "/project:suggested-command",
  "category": "development|operations|quality|team|security",
  "priority": "high|medium|low",
  "frequency": "daily|weekly|monthly|adhoc",
  "time_saved": "estimated minutes per use",
  "purpose": "One-line description",
  "key_actions": [
    "Primary action with specific tools",
    "Secondary validation or reporting step",
    "Optional cleanup or follow-up action"
  ],
  "parameters": {
    "required": "$ARGUMENTS usage description",
    "optional": "Additional parameter options"
  },
  "implementation_complexity": "simple|moderate|complex",
  "dependencies": ["required tools or configurations"],
  "example_usage": "/project:command-name [arguments]",
  "estimated_benefit": "Quantified impact description"
}
```

**Technology-Specific Command Categories:**

Rust/Cargo Projects:

- `/project:cargo-audit-security` - Security vulnerability scanning
- `/project:cargo-deps-outdated` - Dependency update analysis
- `/project:cargo-bench-compare` - Performance regression testing
- `/project:cargo-doc-publish` - Documentation generation and publishing

Go Projects:

- `/project:go-mod-vulnerability` - Module security scanning
- `/project:go-test-coverage-report` - Comprehensive coverage analysis
- `/project:go-race-detection` - Concurrent code validation
- `/project:go-build-optimization` - Build performance analysis

Deno/TypeScript Projects:

- `/project:deno-deps-graph` - Dependency visualization
- `/project:deno-bundle-analysis` - Bundle size optimization
- `/project:deno-permissions-audit` - Security permissions review
- `/project:deno-performance-profile` - Runtime performance analysis

Java/Spring Projects:

- `/project:spring-health-check` - Application health validation
- `/project:maven-security-scan` - Dependency vulnerability analysis
- `/project:jpa-migration-validate` - Database schema validation
- `/project:temporal-workflow-test` - Workflow determinism testing

Multi-Service/Container Projects:

- `/project:docker-compose-health` - Service health monitoring
- `/project:container-security-scan` - Image vulnerability analysis
- `/project:service-dependency-map` - Inter-service dependency visualization
- `/project:logs-aggregation-analyze` - Distributed logging analysis

STEP 5: Prioritization and impact analysis

**Impact Assessment Matrix:**

FOR EACH suggested command:

- CALCULATE time savings potential (frequency × time per execution)
- EVALUATE error reduction impact (automation vs manual process)
- ASSESS team standardization benefits
- CONSIDER onboarding and knowledge transfer value
- ESTIMATE implementation effort and maintenance cost

**Prioritization Criteria:**

1. **High Priority**: Daily use, high time savings, error-prone manual process
2. **Medium Priority**: Weekly use, moderate complexity, team standardization benefits
3. **Low Priority**: Occasional use, specialized scenarios, nice-to-have automation

STEP 6: Format comprehensive recommendations with implementation guidance

**Output Structure:**

```markdown
# Project-Specific Slash Command Recommendations

## Executive Summary

- Total commands suggested: X
- Estimated weekly time savings: Y hours
- Implementation priority breakdown: High (X), Medium (Y), Low (Z)

## High Priority Commands (Implement First)

[Detailed command specifications]

## Medium Priority Commands (Second Phase)

[Detailed command specifications]

## Low Priority Commands (Future Consideration)

[Detailed command specifications]

## Implementation Roadmap

1. Phase 1 (Week 1-2): High priority commands
2. Phase 2 (Week 3-4): Medium priority commands
3. Phase 3 (Ongoing): Low priority and specialized commands

## Success Metrics

- Time saved per week
- Error reduction percentage
- Team adoption rate
- Developer satisfaction improvement
```

STEP 7: Extended thinking for complex analysis scenarios

IF project complexity is high OR requires architectural decisions:

- USE extended thinking to deeply analyze workflow optimization opportunities
- CONSIDER "think hard" for comprehensive automation strategy
- EVALUATE "think harder" for complex multi-service coordination patterns

STEP 8: Save session results and provide refinement capabilities

- SAVE complete analysis to session state file
- INCLUDE prioritized command suggestions with implementation details
- PROVIDE refinement prompts for iterative improvement
- ENABLE follow-up analysis for specific command categories

FINALLY:

- CLEAN UP temporary analysis files
- PROVIDE clear next steps for command implementation
- SUGGEST integration with existing development workflows