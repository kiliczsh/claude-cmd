---
allowed-tools: Write, Read, Bash(gdate:*), Bash(date:*), Bash(pwd:*), Bash(fd:*), Bash(rg:*), Task
name: "Map"
description: "Ultra-fast strategic roadmap generation using 8 parallel sub-agents for comprehensive analysis"
author: "wcygan"
tags: ["analyze","code"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N`
- Current directory: !`pwd`
- Existing planning files: !`fd -t f -e md . | rg -i "plan|roadmap|strategy" | head -5 || echo "No existing planning files found"`
- Initiative: $ARGUMENTS

## Your task

**IMMEDIATELY DEPLOY 8 PARALLEL SUB-AGENTS** for instant comprehensive roadmap generation

STEP 1: Initialize planning session

- Create session ID for state tracking
- Initialize results directory: /tmp/roadmap-results-$SESSION_ID/
- Set up state file: /tmp/strategic-planning-state-$SESSION_ID.json

STEP 2: **LAUNCH ALL 8 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL ANALYSIS** - All agents work in parallel:

1. **Scope Analysis Agent**: Analyze initiative boundaries and constraints
2. **Goals Strategy Agent**: Generate SMART goals and success metrics
3. **Milestone Planning Agent**: Break down goals into actionable milestones
4. **Risk Assessment Agent**: Identify risks and mitigation strategies
5. **Resource Planning Agent**: Estimate resources, skills, and budget
6. **Timeline Agent**: Create realistic schedules with dependencies
7. **Stakeholder Agent**: Map stakeholders and communication plans
8. **Success Metrics Agent**: Define KPIs and measurement frameworks

Each agent saves analysis to: /tmp/roadmap-results-$SESSION_ID/agent-N.json

**Expected speedup: 8x faster roadmap generation**

IF $ARGUMENTS is vague or incomplete:

- Request clarification on specific aspects
- Identify missing context or requirements
- Suggest refinements to initiative description

ELSE:

- Extract core problem statement
- Identify target audience and stakeholders
- Determine scope boundaries and constraints
- Assess complexity and resource requirements

STEP 3: Generate strategic goals

FOR EACH major aspect of the initiative:

- Create 3-5 SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)
- Establish success metrics and KPIs
- Define dependencies between goals
- Assign priority levels (High/Medium/Low)

STEP 4: Create milestone checkpoints

FOR EACH strategic goal:

- Break down into 3-7 actionable milestones
- Define clear deliverables and acceptance criteria
- Establish realistic timelines with buffer periods
- Identify resource requirements and skill dependencies
- Map inter-milestone dependencies

STEP 5: Perform risk assessment

- Identify potential blockers and risks (technical, resource, external)
- Assess impact and probability for each risk
- Develop mitigation strategies and contingency plans
- Create fallback approaches for critical paths

STEP 6: Generate structured roadmap

TRY:

- Compile all analysis into standardized roadmap format
- Create markdown file with consistent structure
- Include visual timeline and dependency mapping
- Add resource allocation and effort estimates

CATCH (formatting errors):

- Validate markdown structure
- Fix any formatting inconsistencies
- Ensure all sections are properly organized

STEP 7: Save and track session

- Write roadmap to file: `{initiative-name}-roadmap-{SESSION_ID}.md`
- Save session state for potential refinement
- Generate summary of next steps and immediate actions

## Roadmap Template Structure

```markdown
# Initiative: {Initiative Name}

## Executive Summary

{One-paragraph overview of initiative and expected outcomes}

## Strategic Goals

### Goal 1: {Goal Name}

- **Objective**: {Clear statement of what we're achieving}
- **Success Metrics**: {Quantifiable measures of success}
- **Timeline**: {Estimated completion timeframe}
- **Priority**: {High/Medium/Low}

### Goal 2: {Goal Name}

...

## Implementation Roadmap

### Phase 1: {Phase Name} ({Timeline})

**Milestone 1.1**: {Milestone Name}

- [ ] {Deliverable/Task}
- [ ] {Success Criteria}
- **Dependencies**: {List any blocking items}
- **Estimated Effort**: {Time/resource estimate}
- **Owner**: {Responsible party}

**Milestone 1.2**: {Milestone Name}
...

### Phase 2: {Phase Name} ({Timeline})

...

## Risk Analysis

| Risk Category | Description        | Impact       | Probability  | Mitigation Strategy   |
| ------------- | ------------------ | ------------ | ------------ | --------------------- |
| Technical     | {Risk description} | High/Med/Low | High/Med/Low | {Mitigation approach} |
| Resource      | {Risk description} | High/Med/Low | High/Med/Low | {Mitigation approach} |
| External      | {Risk description} | High/Med/Low | High/Med/Low | {Mitigation approach} |

## Resource Requirements

- **Human Resources**: {Skills and roles needed}
- **Technical Resources**: {Tools, infrastructure, licenses}
- **Budget**: {Estimated costs by category}
- **Timeline**: {Overall project duration}

## Success Criteria

- [ ] {Measurable outcome 1}
- [ ] {Measurable outcome 2}
- [ ] {Measurable outcome 3}

## Next Steps

1. {Immediate action item with owner}
2. {Next priority with timeline}
3. {Follow-up milestone target}
```

## State Management

IF previous planning session exists:

- Load previous state from /tmp/strategic-planning-state-*.json
- Offer to continue/refine existing roadmap
- Preserve session history and iterations

ELSE:

- Start fresh planning session
- Initialize new state tracking
- Create baseline roadmap structure

FINALLY:

- Save session state for resumability
- Update progress tracking
- Clean up temporary files if session complete