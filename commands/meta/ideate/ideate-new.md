---
allowed-tools: Task, Read, Bash(fd:*), Bash(rg:*), Bash(wc:*), Bash(jq:*), Bash(gdate:*), Bash(eza:*)
name: "Ideate New"
description: "Discover and propose new Claude command opportunities through systematic analysis and parallel research"
author: "wcygan"
tags: ["meta","ideate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)000000"`
- Current time: !`gdate -Iseconds 2>/dev/null || date -Iseconds`
- Target focus area: $ARGUMENTS
- Existing commands count: !`fd "\.md$" claude/commands | wc -l | tr -d ' ' || echo "unknown"`
- Command categories: !`fd -t d . claude/commands -d 1 | eza --oneline 2>/dev/null | tr '\n' ', ' | sed 's/,$//' || echo "analysis, code, context, docs, git, meta, ops, scaffold, security, task, test, tool, workflow"`
- Recent command additions: !`fd "\.md$" claude/commands -x stat -f "%m %N" | sort -nr | head -3 | cut -d' ' -f2- | sed 's|^claude/commands/||' | sed 's|\.md$||' || echo "none detected"`
- Technology trend indicators: !`rg -i "(ai|ml|llm|kubernetes|docker|rust|go|deno|fresh)" claude/commands --count-matches | head -5 || echo "trend analysis needed"`

## Your Task

STEP 1: Initialize command opportunity analysis session

- CREATE session state file: `/tmp/ideate-session-$SESSION_ID.json`
- DETERMINE analysis scope based on focus area from Context
- INITIALIZE tracking structures for command gaps and opportunities

STEP 2: Parallel ecosystem analysis using sub-agent delegation

TRY:

LAUNCH 6 parallel sub-agents for comprehensive command ecosystem analysis:

- **Agent 1: Command Inventory & Categorization**: Analyze existing command structure
  - Count and categorize all commands in `claude/commands/` directory
  - Map commands by workflow stage (planning, development, testing, deployment, ops)
  - Identify command density patterns and coverage gaps
  - Extract naming conventions and complexity patterns

- **Agent 2: Developer Workflow Pain Points**: Research current pain points
  - Research common developer complaints and friction points
  - Identify repeated manual tasks lacking automation
  - Analyze complex workflows needing systematic approaches
  - Survey Stack Overflow trends and GitHub issue patterns

- **Agent 3: Technology Trend Analysis**: Track emerging technology adoption
  - Survey latest framework migrations (React → Next, etc.)
  - Research cloud-native development complexity growth
  - Identify AI/ML integration workflow gaps
  - Track mobile development automation opportunities

- **Agent 4: Command Pattern Analysis**: Deep-dive existing successful patterns
  - Analyze naming conventions (action-based, hyphenated, prefixed)
  - Review command complexity and argument patterns
  - Identify successful command structures for replication
  - Map command interdependencies and workflow chains

- **Agent 5: Industry Standards Research**: Analyze competitive landscape
  - Research CLI tools and command patterns in similar products
  - Identify industry best practices for developer tooling
  - Analyze enterprise workflow automation gaps
  - Survey developer productivity enhancement opportunities

- **Agent 6: Focus Area Deep Dive**: Specialized analysis based on $ARGUMENTS
  - IF focus-area specified: Deep analysis of ai-ml, frontend, cloud, mobile, database, security, or emerging
  - IF no focus specified: Cross-cutting analysis of all categories
  - Identify specialized command opportunities within focus domain
  - Research domain-specific pain points and automation gaps

CATCH (analysis_failed):

- LOG error details to session state
- CONTINUE with available analysis results
- PROVIDE recommendations based on partial data

STEP 3: Synthesize findings and identify high-impact opportunities

FOR EACH sub-agent result:

- AGGREGATE findings into session state
- IDENTIFY overlapping pain points (indicates high-impact opportunities)
- CLASSIFY opportunities by impact level and implementation complexity
- CROSS-REFERENCE with existing command ecosystem to avoid duplication

**Opportunity Classification Framework:**

```json
{
  "tier1_immediate": {
    "criteria": "Addresses widespread pain points, clear ROI, fits ecosystem",
    "examples": []
  },
  "tier2_strategic": {
    "criteria": "Emerging tech support, enterprise gaps, command synergy",
    "examples": []
  },
  "tier3_future": {
    "criteria": "Experimental tech, foundation building, niche value",
    "examples": []
  }
}
```

STEP 4: Generate command proposals with contextual intelligence

FOR EACH identified opportunity:

- DESIGN command following established patterns:
  - **Name**: Action-based, hyphenated, namespace-aware
  - **Usage**: `/command [optional-context]` format
  - **Auto-detection**: Project structure awareness (package.json, Cargo.toml, etc.)
  - **Smart defaults**: Work without arguments, progressive enhancement
  - **Graceful fallback**: Interactive guidance when context unclear

- CREATE comprehensive proposal including:
  - **Gap Description**: What current need is unmet
  - **Value Proposition**: How it improves developer workflow
  - **Context Awareness**: Detection and adaptation capabilities
  - **Implementation Complexity**: Effort estimation
  - **Tier Classification**: Priority level and timeline

ANALYZE findings using strategic prioritization framework:

**Tier 1 (Immediate Implementation)**

- Sort opportunities by impact × feasibility score
- Prioritize pain points affecting >50% of developers
- SELECT 3-5 highest-value command proposals

**Tier 2 (Strategic Development)**

- Identify emerging technology support needs
- Focus on enterprise workflow automation gaps
- GROUP related commands for coordinated development

**Tier 3 (Future Research)**

- Catalog experimental/niche opportunities
- BUILD foundation for next-generation capabilities
- DOCUMENT for future iteration cycles

STEP 6: Generate comprehensive output with implementation roadmap

CREATE structured output containing:

**Executive Summary**

- KEY findings from parallel analysis
- HIGHEST-impact opportunity areas identified
- STRATEGIC recommendations for command ecosystem growth

**Tiered Command Proposals**
FOR EACH proposed command:

```markdown
### /proposed-command-name

**Tier**: [1|2|3] - [Immediate|Strategic|Future]
**Gap**: What current need is unmet
**Value**: How it improves developer workflow\
**Usage**: `/command [args]` - Simple invocation pattern
**Context**: Auto-detection capabilities and project awareness
**Complexity**: [Low|Medium|High] implementation effort
**Timeline**: Suggested development phase
```

**Implementation Roadmap**

- **Phase 1** (0-3 months): Critical gap commands for immediate productivity gains
- **Phase 2** (3-6 months): Strategic technology support and workflow enhancement
- **Phase 3** (6+ months): Advanced capabilities and experimental features

**Research Areas Summary**

Based on analysis, focus areas for command development:

- **AI/ML Integration**: Workflow automation, model deployment, experiment tracking
- **Cloud-Native Operations**: Kubernetes troubleshooting, service mesh, container optimization
- **Developer Experience**: Build tool migration, performance optimization, testing automation
- **Security & Compliance**: Vulnerability scanning, dependency auditing, hardening processes
- **Database Operations**: Migration strategies, performance optimization, schema evolution
- **Mobile Development**: CI/CD automation, cross-platform support, store deployment

FINALLY:

- SAVE complete analysis to session state file
- PROVIDE actionable command proposals ready for implementation
- INCLUDE usage examples and integration guidance
- FOCUS on established patterns and design principles for ecosystem consistency