---
allowed-tools: Read, Write, mcp__sequential-thinking__sequentialthinking
name: "Five"
description: "Apply five why's root cause analysis to a problem"
author: "wcygan"
tags: ["tool"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Problem description: $ARGUMENTS
- Session ID: !`gdate +%s%N`
- Analysis file: /tmp/five-whys-$SESSION_ID.md

## Your task

PROCEDURE five_whys_analysis():

STEP 1: Initialize analysis

- Parse the problem statement from $ARGUMENTS
- Create structured analysis document
- Set iteration counter to 1

STEP 2: Comprehensive root cause analysis with parallel investigation

**FOR complex problems (multi-system or organizational issues):**

**CRITICAL: Deploy 5 parallel sub-agents for comprehensive causal analysis (6-8x faster than sequential analysis)**

IMMEDIATELY launch parallel investigation agents:

- **Agent 1: Technical Analysis**: Investigate technical system failures, infrastructure issues, and code problems
  - Focus: System logs, error traces, performance metrics, configuration issues
  - Tools: Pattern analysis, failure correlation, dependency mapping
  - Expected: Technical root causes with evidence and reproduction steps

- **Agent 2: Process Analysis**: Examine workflow, procedural failures, and operational issues
  - Focus: Process documentation, workflow gaps, communication breakdowns
  - Tools: Process mapping, bottleneck identification, stakeholder analysis
  - Expected: Process improvement opportunities and organizational causes

- **Agent 3: Human Factors Analysis**: Analyze decision-making, knowledge gaps, and behavioral patterns
  - Focus: Training gaps, cognitive biases, decision context, expertise availability
  - Tools: Decision tree analysis, knowledge audit, competency mapping
  - Expected: Human-centered causes and training/support needs

- **Agent 4: Environmental Analysis**: Investigate external factors, market conditions, and contextual influences
  - Focus: Market changes, regulatory requirements, competitive pressures, resource constraints
  - Tools: Environmental scanning, PESTLE analysis, constraint identification
  - Expected: External factors and systemic influences beyond direct control

- **Agent 5: Historical Pattern Analysis**: Examine past incidents, trend analysis, and recurring patterns
  - Focus: Incident history, pattern recognition, trend analysis, preventive measures
  - Tools: Historical data analysis, pattern matching, predictive indicators
  - Expected: Recurring themes and systemic issues requiring long-term solutions

**Sub-Agent Coordination:**

- Each agent saves findings to `/tmp/five-whys-agents-$SESSION_ID/`
- Parallel investigation provides 6-8x speed improvement over sequential analysis
- Cross-agent correlation identifies multi-factorial root causes
- Results synthesized into unified causal chain with supporting evidence

**FOR simple problems (single-system or straightforward issues):**

EXECUTE traditional iterative questioning loop:
FOR iteration IN [1, 2, 3, 4, 5]:

- ASK: "Why does [current problem/answer] occur?"
- THINK deeply about potential causes
- IDENTIFY the most likely cause
- DOCUMENT the answer with supporting reasoning
- UPDATE current_answer = this iteration's answer
- IF root cause is clearly identified before iteration 5:
  - BREAK from loop

STEP 3: Synthesize findings

- REVIEW the chain of causes
- IDENTIFY the root cause (typically the final "why" answer)
- ANALYZE systemic issues revealed
- GENERATE actionable recommendations

STEP 4: Create comprehensive report

- Problem statement
- Five why's chain with reasoning
- Root cause identification
- Contributing factors
- Recommended solutions
- Preventive measures

STEP 5: Save analysis

- Write complete analysis to /tmp/five-whys-$SESSION_ID.md
- Present summary to user
- Highlight key insights and next steps

## Analysis structure

```markdown
# Five Why's Analysis

## Problem Statement

[Original problem description]

## Analysis Chain

### Why 1: [First why question]

**Answer**: [First answer]
**Reasoning**: [Supporting evidence and logic]

### Why 2: [Second why question based on answer 1]

**Answer**: [Second answer]
**Reasoning**: [Supporting evidence and logic]

[Continue for all iterations...]

## Root Cause

[Identified root cause with explanation]

## Recommendations

1. Immediate actions
2. Long-term solutions
3. Preventive measures

## Next Steps

[Actionable items based on analysis]
```

## Best practices

- Ask "why" about the answer from the previous iteration
- Focus on process and system failures, not individual blame
- Look for actionable root causes within your control
- Consider multiple contributing factors
- Validate assumptions with evidence when possible

## Example

Problem: "Website is slow"

1. Why? → Server response time is high
2. Why? → Database queries are taking too long
3. Why? → Queries aren't using indexes
4. Why? → Recent schema changes removed indexes
5. Why? → No index validation in deployment process
   Root cause: Missing deployment validation checks