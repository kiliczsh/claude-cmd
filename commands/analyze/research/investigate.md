---
allowed-tools: Task, WebFetch, Read, Grep, Bash(rg:*), Bash(fd:*), Bash(gdate:*), Bash(jq:*), Bash(git:status), Bash(git:branch), Bash(pwd:*)
name: "Investigate"
description: "Conduct thorough investigation using codebase analysis and web research for optimal solutions"
author: "wcygan"
tags: ["analyze","research"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /investigate

Conduct thorough investigation of a topic, technology, or approach using codebase analysis and web research to determine optimal solutions with up-to-date information.

## Context

- Session ID: !`gdate +%s%N`
- Investigation target: $ARGUMENTS
- Current directory: !`pwd`
- Project structure: !`fd . -t d -d 2 | head -10 || echo "No subdirectories"`
- Technology stack: !`fd -e json -e toml -e xml -e txt . | rg "(deno\.json|package\.json|Cargo\.toml|pom\.xml|requirements\.txt|composer\.json)" | head -5 || echo "No technology files detected"`
- Git repository: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`

## Usage

```
/investigate [topic or question]
```

## Your Task

STEP 1: Investigation Setup and Context Analysis

- Create session state file: /tmp/investigate-state-$SESSION_ID.json
- Parse investigation topic: $ARGUMENTS
- Identify key terms and concepts from the investigation target
- Determine investigation scope and depth requirements
- Save initial context to state file

STEP 2: Codebase Discovery (Parallel Sub-Agent Approach)

FOR complex investigations requiring extensive codebase analysis:

**CRITICAL: Deploy parallel sub-agents for comprehensive investigation (7-9x faster research)**

IMMEDIATELY launch 8 specialized investigation agents:

- **Agent 1: Implementation Pattern Analysis**: Search for existing implementations and architectural patterns
  - Focus: Current implementations, design patterns, code structure, architecture decisions
  - Tools: Code pattern analysis, architecture mapping, implementation discovery
  - Output: Existing solution catalog with pattern assessment and architectural insights

- **Agent 2: Configuration & Dependencies Analysis**: Analyze configuration files and dependency ecosystem
  - Focus: Configuration files, dependency versions, environment settings, build configurations
  - Tools: Configuration analysis, dependency tree analysis, version compatibility checking
  - Output: Configuration landscape with dependency analysis and compatibility assessment

- **Agent 3: Documentation & Knowledge Analysis**: Review documentation and architectural decisions
  - Focus: READMEs, architectural docs, decision records, inline documentation
  - Tools: Documentation analysis, knowledge extraction, decision tracking
  - Output: Knowledge baseline with documentation gaps and architectural context

- **Agent 4: Test Coverage & Validation Analysis**: Examine test coverage and validation approaches
  - Focus: Test strategies, coverage metrics, validation patterns, quality assurance
  - Tools: Test analysis, coverage assessment, validation pattern discovery
  - Output: Testing insights with coverage analysis and validation strategy assessment

- **Agent 5: Integration & Component Analysis**: Map component relationships and integration points
  - Focus: Service boundaries, API contracts, data flows, integration patterns
  - Tools: Component mapping, integration analysis, API contract discovery
  - Output: Integration landscape with component relationships and interaction patterns

- **Agent 6: Industry Standards & Best Practices Research**: Research current industry standards and emerging trends
  - Focus: Industry benchmarks, best practices, emerging trends, standard compliance
  - Tools: Web research, standards analysis, trend monitoring, benchmark comparison
  - Output: Industry landscape with standards compliance and trend analysis

- **Agent 7: Technology Comparison & Alternative Analysis**: Compare alternative technologies and approaches
  - Focus: Alternative solutions, technology comparisons, trade-off analysis, migration paths
  - Tools: Technology research, comparison analysis, migration assessment, trade-off evaluation
  - Output: Technology options with comparative analysis and migration considerations

- **Agent 8: Risk Assessment & Future-Proofing Analysis**: Evaluate risks and future-proofing considerations
  - Focus: Risk factors, future trends, technology longevity, support ecosystem
  - Tools: Risk analysis, future trend assessment, ecosystem evaluation, sustainability analysis
  - Output: Risk assessment with future-proofing recommendations and mitigation strategies

**Sub-Agent Coordination:**

- Each agent saves findings to `/tmp/investigation-agents-$SESSION_ID/`
- Parallel execution provides 7-9x speed improvement over sequential research
- Cross-agent correlation provides comprehensive multi-dimensional analysis
- Results synthesized into cohesive investigation report with confidence scoring

ELSE (simple investigations):

Execute sequential codebase analysis:

- Search existing implementations: rg "$ARGUMENTS" --type-add 'code:*.{rs,go,java,ts,js,py}' -t code
- Find related configuration: rg "$ARGUMENTS" --type yaml --type json --type toml
- Look for documentation: fd "README|ARCHITECTURE|DESIGN" --type f | xargs rg -l "$ARGUMENTS"

STEP 3: Pattern Discovery and Architecture Analysis

TRY:

- Find implementation patterns: rg "impl._$ARGUMENTS|class.*$ARGUMENTS|interface._$ARGUMENTS" -A 5 -B 2
- Analyze dependencies: rg "$ARGUMENTS" package.json Cargo.toml go.mod pom.xml requirements.txt
- Check test coverage: fd "test|spec" --type f | xargs rg -l "$ARGUMENTS"
- Document architectural relationships and data flows

CATCH (pattern_not_found):

- Note absence of existing implementations
- Document opportunity for greenfield implementation
- Focus investigation on industry best practices

STEP 4: Web Research and Technology Comparison

Execute comprehensive web research:

- Search for "$ARGUMENTS best practices 2025"
- Find benchmark comparisons and case studies
- Review GitHub trends and community adoption
- Check Stack Overflow for recent solutions and common issues
- Analyze Reddit discussions for real-world experiences

STEP 5: Solution Synthesis and Evaluation

Apply evaluation framework:

- Technical criteria: performance, scalability, security, maintenance
- Project fit: stack alignment, team expertise, migration complexity
- Future-proofing: maturity, community support, corporate backing
- Cost-benefit analysis and risk assessment

STEP 6: Recommendation Formulation and State Management

Generate structured investigation report with:

- Executive summary with key findings
- Current state analysis from codebase exploration
- Options evaluation with pros/cons for each approach
- Final recommendation with implementation strategy
- Risk mitigation strategies and next steps

STEP 7: State Management and Session Cleanup

TRY:

- Update session state: /tmp/investigate-state-$SESSION_ID.json
- Save investigation results for future reference
- Create checkpoint for resumable investigations
- Generate summary statistics and insights

CATCH (investigation_incomplete):

- Save partial results to state file
- Document areas requiring additional research
- Create resumption instructions for next session
- Mark investigation as pending completion

FINALLY:

- Clean up temporary files: /tmp/investigate-temp-$SESSION_ID-*
- Archive investigation artifacts if requested
- Update session metrics and completion status

#### Output Structure

````markdown
# Investigation: [Topic]

## Executive Summary

[2-3 sentence overview of findings and recommendation]

## Current State Analysis

### Existing Implementation

- [What's currently in the codebase]
- [Patterns and approaches used]
- [Identified pain points]

### Industry Standards (2025)

- [Current best practices]
- [Emerging trends]
- [Common pitfalls to avoid]

## Options Evaluation

### Option 1: [Approach Name]

**Pros:**

- [Advantage 1]
- [Advantage 2]

**Cons:**

- [Disadvantage 1]
- [Disadvantage 2]

**Real-world Usage:**

- [Company/Project using this]
- [Performance metrics if available]

### Option 2: [Alternative Approach]

[Similar structure]

## Recommendation

### Optimal Solution: [Chosen Approach]

**Rationale:**

1. [Key reason 1]
2. [Key reason 2]
3. [Key reason 3]

**Implementation Strategy:**

```[language]
// Code example showing recommended approach
```
````

**Migration Path:**

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Supporting Evidence

### Benchmarks

- [Performance comparison data]
- [Resource usage metrics]

### Case Studies

- [Relevant implementation example]
- [Lessons learned]

### Expert Opinions

- [Quote from authority/documentation]
- [Community consensus]

## Risk Mitigation

- **Risk 1**: [Description] → [Mitigation strategy]
- **Risk 2**: [Description] → [Mitigation strategy]

## Next Steps

1. [ ] [Immediate action item]
2. [ ] [Short-term task]
3. [ ] [Long-term consideration]

## Resources

- [Official Documentation](link)
- [Tutorial/Guide](link)
- [Community Forum](link)
- [Example Repository](link)

```
### Investigation Examples

#### Example 1: State Management
```

/investigate What's the best state management solution for our Rust microservices?

```
Investigation would:
- Analyze current state handling in codebase
- Research Rust state management patterns (2025)
- Compare options (Actor model, Event Sourcing, CQRS)
- Recommend based on project needs

#### Example 2: Authentication Strategy
```

/investigate Should we migrate from JWT to PASETO for our authentication?

```
Investigation would:
- Review current JWT implementation
- Research PASETO adoption and security benefits
- Analyze migration complexity
- Provide security comparison and recommendation

#### Example 3: Database Technology
```

/investigate Is ScyllaDB the right choice for our high-throughput event storage?

```
Investigation would:
- Examine current data patterns and volume
- Research ScyllaDB vs alternatives (Cassandra, DynamoDB)
- Analyze performance benchmarks
- Consider operational complexity

### Special Considerations

1. **Time-Sensitive Information**
   - Always search for content from last 12 months
   - Note deprecation warnings
   - Check for breaking changes

2. **Authoritative Sources**
   - Prioritize official documentation
   - Verify claims with multiple sources
   - Check GitHub star/fork counts for adoption

3. **Context Awareness**
   - Consider team's technology preferences (from CLAUDE.md)
   - Account for infrastructure constraints
   - Respect existing architectural decisions

4. **Balanced Perspective**
   - Present multiple viewpoints
   - Include contrarian opinions
   - Acknowledge trade-offs

### Integration with Other Commands

- Use after `/options` to deep-dive into specific choice
- Combine with `/elaborate` for implementation details
- Follow with `/plan` to execute recommendation
- Use `/benchmark` to validate performance claims

### Output Guidelines

- Lead with actionable recommendations
- Support claims with evidence
- Provide clear migration paths
- Include code examples
- Link to authoritative sources
- Acknowledge uncertainty where it exists
- **IMPORTANT**: Return investigation results directly to the user in the response - DO NOT write results to a file unless explicitly requested
```