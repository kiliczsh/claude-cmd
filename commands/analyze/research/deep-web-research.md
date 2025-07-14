---
allowed-tools: Task, WebSearch, WebFetch, Write, Bash(gdate:*), Bash(pwd:*), Bash(fd:*), Bash(rg:*), Bash(git:*)
name: "Deep Web Research"
description: "Comprehensive parallel web research with multi-agent analysis and synthesis"
author: "wcygan"
tags: ["analyze","research"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Project type: !`fd -e json -e toml -e xml . | rg "(deno\.json|package\.json|Cargo\.toml|pom\.xml|requirements\.txt)" | head -3 || echo "No project files detected"`
- Technology stack: !`fd -e json . | head -3 | xargs -I {} rg "(react|vue|angular|typescript|python|rust|go|java|kubernetes|docker)" {} | head -5 || echo "No stack detected"`
- Git context: !`git status --porcelain | head -3 2>/dev/null || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`
- Research query: $ARGUMENTS

## Your Task

Conduct comprehensive web research using parallel sub-agents for thorough coverage and analysis.

Think deeply about the optimal research strategy for this specific query, considering:

- Technical complexity and scope
- Time-sensitive vs. foundational information needs
- Target audience (beginner, intermediate, expert)
- Project context and practical application requirements

STEP 1: Research Strategy Initialization

- Parse research query: $ARGUMENTS
- Initialize session state: /tmp/deep-web-research-$SESSION_ID.json
- Determine research complexity (simple/moderate/complex)
- Generate research angles and perspectives
- Create agent delegation strategy

STEP 2: Multi-Perspective Query Generation

- Generate 5-7 search query variations:
  - Current best practices and standards
  - Real-world implementation experiences
  - Recent trends and innovations
  - Comparative analysis and alternatives
  - Security and performance considerations
  - Common pitfalls and lessons learned
  - Enterprise vs. small-scale approaches

STEP 3: Parallel Research Execution

Deploy 5 research agents in parallel:

**Agent 1: Authoritative Sources Research**

- Task: "Research official documentation, standards, and authoritative best practices for: $ARGUMENTS"
- Focus: Official docs, RFC standards, vendor documentation
- Sources: 2-3 authoritative sources
- Output: /tmp/research-auth-$SESSION_ID.json

**Agent 2: Community Insights Research**

- Task: "Research community experiences, forums, and practical implementations for: $ARGUMENTS"
- Focus: Stack Overflow, Reddit, GitHub discussions, practitioner blogs
- Sources: 2-3 community sources
- Output: /tmp/research-community-$SESSION_ID.json

**Agent 3: Innovation and Trends Research**

- Task: "Research recent developments, emerging trends, and cutting-edge approaches for: $ARGUMENTS"
- Focus: Recent conference talks, innovation blogs, research papers
- Sources: 2-3 trend sources
- Output: /tmp/research-trends-$SESSION_ID.json

**Agent 4: Comparative Analysis Research**

- Task: "Research alternatives, comparisons, and decision criteria for: $ARGUMENTS"
- Focus: Technology comparisons, decision frameworks, trade-off analyses
- Sources: 2-3 comparative sources
- Output: /tmp/research-comparison-$SESSION_ID.json

**Agent 5: Risk and Implementation Research**

- Task: "Research risks, challenges, implementation considerations, and mitigation strategies for: $ARGUMENTS"
- Focus: Case studies, failure analyses, implementation guides
- Sources: 2-3 implementation sources
- Output: /tmp/research-risks-$SESSION_ID.json

STEP 4: Research Coordination and Validation

WAIT for all 5 agents to complete research phases.

FOR EACH agent result:

- Validate source quality and recency
- Extract key findings and insights
- Identify conflicting information
- Score source authority and relevance
- Update session state with findings

STEP 5: Cross-Reference Analysis

Think harder about potential biases in the sources and how to synthesize conflicting information:

- Identify consensus vs. debate areas
- Validate claims across multiple sources
- Resolve conflicting recommendations
- Assess information recency and relevance
- Weight findings by source authority

STEP 6: Comprehensive Report Generation

Create detailed research report: /tmp/deep-research-report-$SESSION_ID.md

Report structure:

```markdown
# Deep Research Report: [Query]

## Executive Summary

- Key findings (3-5 bullet points)
- Primary recommendations
- Critical considerations

## Detailed Findings

### Current Best Practices

[Synthesized from Agent 1]

### Community Insights

[Synthesized from Agent 2]

### Emerging Trends

[Synthesized from Agent 3]

### Comparative Analysis

[Synthesized from Agent 4]

### Implementation Considerations

[Synthesized from Agent 5]

## Recommendations

### For [Project Context]

- Specific actionable recommendations
- Implementation priorities
- Risk mitigation strategies

## Further Research

- Recommended deep-dive topics
- Additional resources
- Follow-up questions

## Sources

[Comprehensive source list with quality ratings]
```

STEP 7: Context-Aware Recommendations

IF project context detected:

- Tailor recommendations to detected technology stack
- Provide specific implementation guidance
- Include project-relevant examples
- Suggest integration approaches

ELSE:

- Provide general best practices
- Include multiple implementation options
- Focus on foundational concepts

STEP 8: Quality Validation and Output

TRY:

- Validate report completeness and accuracy
- Ensure all research angles covered
- Verify source citations and links
- Generate executive summary
- Save final report to session directory

CATCH (incomplete_research):

- Identify missing research areas
- Launch additional targeted research agents
- Supplement findings with focused searches
- Update report with additional insights

CATCH (conflicting_information):

- Document conflicting viewpoints
- Research additional sources for clarification
- Provide balanced analysis of different perspectives
- Include uncertainty acknowledgments

FINALLY:

- Update session state: research_complete
- Archive research artifacts
- Clean up temporary files: /tmp/_-$SESSION_ID-temp_
- Display final report location and key insights

## Research Quality Standards

**Source Validation Criteria:**

- Recency (prefer sources within 2 years for tech topics)
- Authority (official docs > expert blogs > forum posts)
- Practical relevance (implementation guides > theoretical discussions)
- Community validation (upvotes, citations, adoption)

**Analysis Depth Requirements:**

- Minimum 8-12 high-quality sources across all agents
- Cross-validation of claims across 3+ sources
- Coverage of all major perspectives and approaches
- Identification of consensus vs. debate areas

**Output Quality Assurance:**

- Executive summary under 200 words
- Detailed findings with source citations
- Actionable recommendations with implementation guidance
- Balanced analysis of trade-offs and considerations

Perfect for architectural decisions, technology evaluations, and comprehensive technical research requiring deep analysis and multiple perspectives.