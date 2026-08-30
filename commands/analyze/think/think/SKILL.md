---
allowed-tools: mcp__sequential-thinking__sequentialthinking, Write, Read, Bash(gdate:*)
name: "Think"
description: "Engage in deep, structured reasoning using sequential thinking"
author: "wcygan"
tags: ["analyze","think"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Working directory: !`pwd`
- Current time: !`gdate '+%Y-%m-%d %H:%M:%S'`

## Your Task

STEP 1: Initialize Thinking Session

- Create thinking state file: /tmp/think-session-$SESSION_ID.json
- Initialize with topic: $ARGUMENTS
- Set thinking depth based on complexity assessment

STEP 2: Adaptive Deep Thinking Strategy

**FOR complex multi-dimensional problems requiring comprehensive analysis:**

**CRITICAL: Combine sequential thinking with parallel perspective analysis for maximum insight generation**

EXECUTE hybrid approach:

1. **Initial Sequential Thinking Phase**: Use sequential thinking tool for core problem exploration
   - Start with 8-12 initial thoughts for comprehensive problem mapping
   - Allow thinking to evolve organically - adjust total_thoughts as needed
   - Question and revise previous thoughts when new insights emerge
   - Generate multiple solution hypotheses and verify them systematically

2. **Parallel Perspective Analysis**: Deploy specialized thinking agents for different analytical dimensions
   - **Agent 1: First Principles Analysis**: Break down problem to fundamental components and build up solutions
   - **Agent 2: Systems Thinking**: Analyze interconnections, feedback loops, and emergent properties
   - **Agent 3: Stakeholder Analysis**: Examine multiple stakeholder viewpoints, incentives, and constraints
   - **Agent 4: Temporal Analysis**: Investigate past trends, current state, and future implications
   - **Agent 5: Risk & Scenario Analysis**: Explore potential failure modes, edge cases, and alternative scenarios

3. **Integration & Synthesis**: Combine sequential insights with parallel perspectives for breakthrough understanding

**Sub-Thinking Coordination:**

- Sequential thinking provides deep logical progression and insight evolution
- Parallel agents provide comprehensive perspective coverage and analytical rigor
- Combined approach delivers both depth and breadth for complex problem solving
- Results synthesized into actionable insights with multiple validation approaches

**FOR straightforward problems requiring focused analysis:**

Use enhanced sequential thinking approach:

- Start with 5-8 initial thoughts for problem exploration
- Allow thinking to evolve organically - adjust total_thoughts as needed
- Question and revise previous thoughts when new insights emerge
- Generate solution hypotheses and verify them
- Continue until reaching satisfactory understanding

Key thinking approaches to incorporate:

- First principles analysis
- Systems thinking (interconnections and emergent properties)
- Contrarian perspectives and devil's advocate
- Temporal analysis (past trends, future implications)
- Stakeholder viewpoints and incentives
- Analogical reasoning from other domains

STEP 3: Synthesize Insights

FOR EACH major insight discovered:

- Document the breakthrough realization
- Explain why it's significant
- Identify implications and next steps

STEP 4: Create Actionable Output

Generate structured output including:

- Key insights and novel perspectives
- Critical factors and leverage points
- Practical recommendations
- Open questions requiring further exploration

## Thinking Depth Guidelines

IF topic is straightforward:

- Use standard thinking mode (5-8 thoughts)

ELSE IF topic involves complex systems or decisions:

- Use extended thinking with revision cycles
- Allow 10-15+ thoughts with backtracking

ELSE IF topic requires breakthrough insights:

- Use maximum thinking depth
- Encourage branching and alternative paths
- Continue until novel connections emerge

## Output Structure

```markdown
# Deep Analysis: [Topic]

## Core Insights

1. **[Primary Breakthrough]**
   - What: [Key realization]
   - Why: [Significance and implications]
   - How: [Practical applications]

2. **[Secondary Insight]**
   - [Brief description and importance]

## Critical Factors

- [Highest leverage points for action]
- [Key variables that determine outcomes]
- [Important trade-offs and tensions]

## Recommendations

### Immediate Actions

1. [Next steps to take]
2. [Experiments to run]
3. [Information to gather]

### Strategic Implications

- [How this changes approach]
- [New opportunities to pursue]
- [Risks to monitor]

## Open Questions

- [Areas requiring further exploration]
- [Assumptions to validate]
- [Scenarios to consider]
```

## Integration with Workflow

- Combine with `/investigate` for evidence-based input
- Follow with `/plan` to organize implementation
- Use `/deep-dive` for specific aspects needing more exploration
- Apply insights in `/options` for decision-making

The goal is breakthrough understanding through rigorous, multi-perspective analysis that leads to better decisions and creative solutions.