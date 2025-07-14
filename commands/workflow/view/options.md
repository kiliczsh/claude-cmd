---
allowed-tools: Task, Read, Bash(rg:*), Bash(fd:*), Bash(gdate:*), Bash(jq:*), Bash(bat:*)
name: "Options"
description: "Strategic decision analysis framework with multi-approach evaluation and recommendation scoring"
author: "wcygan"
tags: ["workflow","view"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Analysis target: $ARGUMENTS
- Current project context: !`pwd`
- Available resources: !`eza -la . 2>/dev/null | head -5 || fd . -d 1 | head -5`
- Technology stack: !`fd "(package\.json|Cargo\.toml|go\.mod|deno\.json|pom\.xml)" . -d 2 | head -3 || echo "No build files detected"`

## Your Task

STEP 1: Initialize strategic analysis session

- CREATE session state file: `/tmp/options-analysis-$SESSION_ID.json`
- PARSE problem statement from $ARGUMENTS
- IDENTIFY analysis scope and complexity level
- DETERMINE whether to use parallel sub-agent approach for comprehensive evaluation

```bash
# Initialize analysis session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "problemStatement": "'$ARGUMENTS'",
  "analysisType": "auto-detect",
  "optionsGenerated": 0,
  "recommendationMatrix": []
}' > /tmp/options-analysis-$SESSION_ID.json
```

STEP 2: Multi-dimensional problem analysis and scope determination

TRY:

IF problem_complexity == "high" OR analysis_scope == "architectural":

LAUNCH parallel sub-agents for comprehensive option exploration:

- **Agent 1: Technical Feasibility Analysis**: Evaluate technical constraints, dependencies, and implementation challenges
  - Focus: Technology stack compatibility, performance implications, scalability considerations
  - Output: Technical feasibility matrix with risk assessment

- **Agent 2: Resource & Timeline Analysis**: Assess effort, cost, and timeline implications for each approach
  - Focus: Development effort, team expertise, timeline constraints, budget considerations
  - Output: Resource allocation matrix with effort estimates

- **Agent 3: Risk Assessment**: Identify potential risks, failure modes, and mitigation strategies
  - Focus: Technical risks, business risks, operational risks, security implications
  - Output: Risk matrix with mitigation strategies

- **Agent 4: Strategic Alignment**: Evaluate alignment with business goals, architectural principles, and long-term vision
  - Focus: Strategic fit, maintainability, extensibility, team capabilities
  - Output: Strategic alignment scoring with justification

ELSE:

EXECUTE streamlined single-agent analysis for focused problems

```bash
echo "🎯 Executing focused analysis for well-defined problem scope"
```

STEP 3: Systematic option generation and evaluation framework

**Structured Analysis Framework:**

FOR EACH viable approach (aim for 3-5 options):

#### Option [N]: [Descriptive Name]

**Overview**: Brief description of the approach with architectural context

**Technical Analysis**:

- Implementation complexity and dependencies
- Performance implications and scalability profile
- Integration points and compatibility requirements
- Security considerations and compliance impacts

**Resource Analysis**:

- **Complexity**: Low/Medium/High with justification
- **Time Estimate**: Realistic timeline (hours/days/weeks/months)
- **Team Requirements**: Solo / Small (2-3) / Medium (4-6) / Large (7+) team
- **Skill Requirements**: Existing vs. new expertise needed
- **Maintenance Overhead**: Ongoing operational requirements

**Strategic Evaluation**:

- **Benefits**: 3-5 key advantages with business impact
- **Trade-offs**: 2-4 limitations or risks with mitigation strategies
- **Long-term Viability**: Maintainability, extensibility, and evolution path
- **Best For**: Specific scenarios where this approach excels

STEP 4: Intelligent recommendation synthesis

**Comparative Analysis Matrix:**

```bash
# Generate structured comparison data
echo "Creating recommendation matrix with weighted scoring..."
```

| Approach | Complexity | Timeline | Risk Level | Scalability | Maintainability | Strategic Fit | Weighted Score |
| -------- | ---------- | -------- | ---------- | ----------- | --------------- | ------------- | -------------- |
| Option 1 | Low (3)    | 2d (4)   | Low (4)    | Medium (3)  | High (4)        | High (4)      | 3.6/5.0        |
| Option 2 | High (1)   | 2w (2)   | Med (3)    | High (4)    | Medium (3)      | Medium (3)    | 2.7/5.0        |
| Option 3 | Med (2)    | 1w (3)   | Low (4)    | High (4)    | High (4)        | High (4)      | 3.5/5.0        |

**Decision Framework:**

1. **Primary Recommendation**: State top choice with clear rationale
   - Why this option best balances all factors
   - Specific advantages for current context
   - Risk mitigation strategies

2. **Fallback Strategy**: Alternative if primary approach encounters blockers
   - Clear triggers for switching approaches
   - Transition strategy and sunk cost considerations

3. **Critical Decision Points**: Key moments requiring stakeholder input
   - Technical validation checkpoints
   - Resource allocation decisions
   - Timeline confirmation gates

STEP 5: Actionable implementation roadmap

**Immediate Next Steps (0-2 weeks):**

- [ ] Specific validation tasks for chosen approach
- [ ] Resource allocation and team assignment
- [ ] Risk mitigation setup
- [ ] Technical proof-of-concept definition

**Medium-term Milestones (2-8 weeks):**

- [ ] Implementation phases with deliverables
- [ ] Integration testing and validation
- [ ] Performance benchmarking
- [ ] Documentation and knowledge transfer

**Long-term Considerations (2+ months):**

- [ ] Maintenance strategy and operational procedures
- [ ] Scaling plan and capacity requirements
- [ ] Evolution roadmap and future enhancements

CATCH (analysis_failed):

- LOG error details to session state
- PROVIDE simplified analysis framework
- SUGGEST alternative evaluation approaches

```bash
echo "⚠️ Complex analysis failed. Falling back to simplified evaluation framework."
echo "Consider breaking down the problem into smaller, more focused questions."
```

FINALLY:

- UPDATE session state with analysis results
- SAVE recommendation matrix to `/tmp/options-analysis-$SESSION_ID.json`
- PROVIDE guidance for next steps based on recommended approach

## Analysis Guidelines

**Objective Decision-Making:**

- Base recommendations on quantifiable metrics where possible
- Consider both technical debt and business value
- Account for team expertise and learning curve
- Factor in timeline constraints and resource availability

**Comprehensive Evaluation:**

- Short-term implementation vs. long-term maintenance costs
- Technical excellence vs. pragmatic delivery
- Innovation opportunities vs. proven approaches
- Internal capabilities vs. external dependencies

**Context-Aware Analysis:**

- Current project phase (MVP, growth, optimization, maintenance)
- Team composition and skill distribution
- Organizational constraints and approval processes
- Technology stack compatibility and architectural alignment

## Example Usage Scenarios

```bash
# Architectural decision analysis
/options "Choose between microservices vs monolith for our new e-commerce platform"

# Technology selection
/options "Select frontend framework: React vs Vue vs Svelte for admin dashboard"

# Implementation strategy
/options "Database migration approach: gradual vs big-bang for 100M+ records"

# Team organization
/options "Development workflow: feature branches vs trunk-based development"

# Infrastructure decisions
/options "Deployment strategy: Kubernetes vs serverless vs traditional VMs"
```

**Session State Management:**

```bash
# Analysis results are cached for follow-up questions
echo "📊 Analysis session: $SESSION_ID"
echo "💾 Results cached in: /tmp/options-analysis-$SESSION_ID.json"
echo "🔄 Use session ID for follow-up analysis or refinement"
```