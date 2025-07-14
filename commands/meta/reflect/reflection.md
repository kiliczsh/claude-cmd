---
allowed-tools: Task, Read, Bash(git log:*), Bash(git diff:*), Bash(git branch:*), Bash(gh pr list:*), Bash(gh issue list:*), Bash(rg:*), Bash(fd:*), Bash(gdate:*), Bash(jq:*), Write
name: "Reflection"
description: "Ultra-fast comprehensive retrospective analysis using parallel reflection agents - 6-8x faster than sequential analysis"
author: "wcygan"
tags: ["meta","reflect"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Reflection scope: $ARGUMENTS
- Current branch: !`git branch --show-current 2>/dev/null || echo "no-git-repo"`
- Recent commits (last 10): !`git log --oneline -10 --since="1 week ago" 2>/dev/null || echo "No recent commits found"`
- Recent PRs: !`gh pr list --state all --limit 5 --json number,title,state,createdAt 2>/dev/null | jq -r '.[] | "#\(.number): \(.title) [\(.state)]"' 2>/dev/null || echo "No PR data available"`
- Open issues: !`gh issue list --state open --limit 5 --json number,title,labels 2>/dev/null | jq -r '.[] | "#\(.number): \(.title)"' 2>/dev/null || echo "No issue data available"`
- Project structure: !`fd . -t f -d 2 | head -10 2>/dev/null || echo "Limited file discovery"`
- Code changes analysis: !`git diff --stat HEAD~5..HEAD 2>/dev/null || echo "No recent changes to analyze"`
- Test results: !`rg "test.*pass|fail|error" . --type log -A 1 -B 1 | head -10 2>/dev/null || echo "No test logs found"`

## Your Task

**CRITICAL: IMMEDIATELY DEPLOY 8 PARALLEL REFLECTION AGENTS** for instant comprehensive analysis. Each agent operates independently for maximum efficiency.

**Expected speedup: 6-8x faster than sequential reflection analysis.**

STEP 1: Initialize parallel reflection session

- CREATE session state file: `/tmp/reflection-session-$SESSION_ID.json`
- **LAUNCH ALL 8 REFLECTION AGENTS SIMULTANEOUSLY:**

[Deploy all agents in single response - NO SEQUENTIAL EXECUTION]

**Agent 1 - Success Pattern Analyzer**: "Analyze all successful implementations, high-velocity periods, and positive outcomes from git history. Identify what worked well, breakthrough moments, and effective patterns. Extract specific examples from commits, PRs, and resolved issues."

**Agent 2 - Challenge & Bottleneck Investigator**: "Investigate technical debt, failed attempts, reverted commits, and workflow bottlenecks. Analyze unresolved issues, delayed PRs, and communication gaps. Find root causes and patterns in challenges."

**Agent 3 - Learning & Insight Extractor**: "Extract key learnings from code evolution, architectural decisions, and domain knowledge expansion. Correlate decisions with outcomes. Identify skill development patterns and knowledge gained."

**Agent 4 - Quantitative Metrics Analyzer**: "Calculate all quantitative metrics: development velocity, code quality trends, PR turnaround times, issue resolution patterns, test coverage changes, and collaboration health indicators."

**Agent 5 - Decision Impact Assessor**: "Review all major decisions from commit messages and PR discussions. Assess outcomes against objectives, analyze trade-offs made, and evaluate alternative paths not taken."

**Agent 6 - Team Collaboration Auditor**: "Analyze collaboration patterns, review quality, contributor diversity, communication effectiveness, and team dynamics evolution. Identify collaboration highlights and gaps."

**Agent 7 - Technical Achievement Scanner**: "Scan for technical milestones, architectural improvements, performance optimizations, security enhancements, and code quality improvements. Document specific achievements with evidence."

**Agent 8 - Future Improvement Generator**: "Based on all available data, generate actionable improvements prioritized by impact. Create SMART goals, design process experiments, and plan technical debt reduction strategies."

**CRITICAL**: All agents must execute in parallel. NO waiting between agent launches. This achieves 6-8x speedup over sequential analysis.

STEP 2: Synthesize parallel agent findings

**AWAIT all 8 agents to complete their parallel analysis**

- COLLECT findings from all reflection agents
- MERGE quantitative metrics from Agent 4
- SYNTHESIZE success patterns from Agent 1 with challenges from Agent 2
- CORRELATE decisions (Agent 5) with outcomes and learnings (Agent 3)
- COMBINE technical achievements (Agent 7) with collaboration patterns (Agent 6)
- INTEGRATE improvement recommendations from Agent 8

**Session State Management:**

```json
{
  "session_id": "$SESSION_ID",
  "parallel_agents": {
    "success_patterns": "completed",
    "challenges": "completed",
    "learnings": "completed",
    "metrics": "completed",
    "decisions": "completed",
    "collaboration": "completed",
    "achievements": "completed",
    "improvements": "completed"
  },
  "synthesis_state": "merging_insights",
  "performance_metrics": {
    "total_time": "8-12 seconds",
    "speedup": "6-8x",
    "agents_deployed": 8
  }
}
```

STEP 3: Generate ultra-comprehensive retrospective analysis

**Parallel Processing Benefits:**

- **Traditional Sequential Reflection**: 60-80 seconds for comprehensive analysis
- **Parallel Agent Reflection**: 8-12 seconds with 8 concurrent agents
- **Quality Enhancement**: More thorough coverage through specialized agents
- **Consistency**: Each agent follows structured analysis patterns
- **Scalability**: Can analyze larger codebases and longer timeframes

**Reflection Analysis Framework (Synthesized from all agents):**

FOR EACH reflection dimension:

**1. Context Establishment (Merged from all agents)**

```json
{
  "period_scope": "$ARGUMENTS or current session",
  "key_objectives": "extracted from git commits and PR descriptions",
  "stakeholders": "identified from git contributors and PR reviewers",
  "data_sources": ["git_history", "github_activity", "code_metrics", "test_results"]
}
```

**2. Success Pattern Recognition (Synthesized from Agent 1 & 7)**

- Successful implementations identified by Success Pattern Analyzer
- High-velocity periods and breakthrough moments from parallel analysis
- Effective collaboration patterns from Team Collaboration Auditor
- Technical achievements documented by Achievement Scanner
- Process improvements with measurable impact from multiple agents

**3. Challenge and Improvement Analysis (Synthesized from Agent 2 & 6)**

- Technical debt patterns mapped by Challenge Investigator
- Bottlenecks identified through parallel workflow analysis
- Failed attempts and learning opportunities from comprehensive scan
- Root causes analyzed by specialized agent focus
- Communication gaps identified by Collaboration Auditor

**4. Learning Extraction (Synthesized from Agent 3 & 5)**

- Decision-outcome correlations from parallel analysis
- Architectural lessons extracted by Learning Extractor
- Skill development patterns identified across multiple dimensions
- Domain knowledge expansion documented systematically
- Process discoveries from cross-agent insights

**5. Decision Impact Assessment (Primary: Agent 5, Enhanced by Agent 3)**

- Major decisions reviewed by Decision Impact Assessor
- Outcomes measured against objectives with quantitative backing
- Alternative paths analyzed with parallel perspective
- Trade-offs assessed with multi-dimensional view
- Future decision guidance from synthesized learnings

**6. Quantitative Analysis (Primary: Agent 4, Enhanced by all agents)**

**Comprehensive metrics from parallel analysis:**

- Development velocity calculated in real-time
- Code quality trends analyzed across dimensions
- Collaboration health measured by multiple indicators
- Issue resolution patterns tracked systematically
- Performance metrics aggregated from all agents

**7. Actionable Improvement Generation (Primary: Agent 8, Input from all)**

- Improvements prioritized using multi-agent insights
- SMART goals created from comprehensive analysis
- Process experiments designed with parallel perspectives
- Technical debt strategies from multiple viewpoints
- Learning activities scheduled based on identified gaps

STEP 4: Generate comprehensive retrospective document

CREATE structured reflection document with:

**📍 Executive Summary**

- Period analyzed and key metrics
- Top 3 successes and top 3 improvement areas
- Overall health assessment and trajectory

**✅ Achievements & Successes**

- Technical milestones with specific examples
- Process improvements with measurable impact
- Team collaboration highlights with evidence
- Individual growth demonstrations

**🔄 Areas for Improvement**

- Technical challenges with root cause analysis
- Process bottlenecks with proposed solutions
- Communication gaps with remediation strategies
- Resource optimization opportunities

**💡 Key Insights & Learnings**

- Technical patterns and architectural lessons
- Process discoveries and workflow optimizations
- Team dynamics evolution and collaboration patterns
- Domain knowledge expansion and user understanding

**🎯 Decision Analysis**

- Major decisions made with outcome assessment
- Trade-offs evaluated and their impact
- Alternative approaches considered
- Lessons for future decision-making

**📊 Quantitative Analysis**

- Development velocity trends
- Quality metrics evolution
- Collaboration health indicators
- Performance and efficiency measurements

**🚀 Action Plan**

- Immediate wins (next 1-2 weeks)
- Process improvements (next iteration)
- Technical improvements (next quarter)
- Learning and development goals

**🎉 Recognition & Celebrations**

- Individual contributions highlighted
- Team achievements acknowledged
- Problem-solving excellence recognized
- Growth milestones celebrated

STEP 5: Save reflection artifacts and state

- SAVE reflection document to `/tmp/reflection-output-$SESSION_ID.md`
- UPDATE session state with completion status
- CREATE follow-up action items for task tracking
- GENERATE summary for team sharing

CATCH (insufficient_data):

- DOCUMENT data limitations and gaps
- PROVIDE reflection based on available information
- SUGGEST additional data collection for future reflections
- OFFER alternative reflection approaches

FINALLY:

- CLEAN up temporary session files
- REPORT reflection completion status
- PROVIDE next steps for action item implementation

**Quality Standards:**

- Specific examples from parallel agent analysis
- Data-driven insights from multiple perspectives
- Balanced view synthesized from 8 specialized agents
- Forward-looking recommendations from dedicated improvement agent
- Growth-oriented insights from cross-agent synthesis
- Constructive solutions from comprehensive parallel analysis

**Performance Metrics:**

| Reflection Aspect         | Sequential Time    | Parallel Time     | Speedup   |
| ------------------------- | ------------------ | ----------------- | --------- |
| Success Pattern Analysis  | 10-15 seconds      | 1.5-2 seconds     | ~7x       |
| Challenge Investigation   | 8-12 seconds       | 1.5-2 seconds     | ~6x       |
| Learning Extraction       | 10-12 seconds      | 1.5-2 seconds     | ~6x       |
| Metrics Calculation       | 15-20 seconds      | 2-3 seconds       | ~7x       |
| Decision Assessment       | 8-10 seconds       | 1.5-2 seconds     | ~5x       |
| Collaboration Audit       | 10-12 seconds      | 1.5-2 seconds     | ~6x       |
| Achievement Scanning      | 8-10 seconds       | 1.5-2 seconds     | ~5x       |
| Improvement Generation    | 12-15 seconds      | 2-3 seconds       | ~6x       |
| **Total Reflection Time** | **80-100 seconds** | **12-15 seconds** | **~6-8x** |

**Key Advantages of Parallel Reflection:**

1. **Comprehensive Coverage**: 8 specialized agents analyze different dimensions simultaneously
2. **Faster Insights**: Get complete retrospective in 12-15 seconds vs 80-100 seconds
3. **Better Quality**: Each agent focuses deeply on their specialty area
4. **Scalability**: Can handle larger codebases and longer timeframes
5. **Consistency**: Structured analysis from each agent ensures nothing is missed
6. **Cross-Pollination**: Synthesis step combines insights for richer understanding