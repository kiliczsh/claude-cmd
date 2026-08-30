---
allowed-tools: Task, Read, Write, Bash(fd:*), Bash(rg:*), Bash(eza:*), Bash(bat:*), Bash(jq:*), Bash(gdate:*), Bash(git:*), Bash(gh:*), Bash(wc:*)
name: "Plan"
description: "Comprehensive project analysis and hierarchical planning orchestrator with integrated task management"
author: "wcygan"
tags: ["workflow","manage"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target project: $ARGUMENTS
- Current directory: !`pwd`
- Project structure: !`eza -la --tree --level=2 2>/dev/null | head -15 || fd . -t d -d 2 | head -10`
- Build files detected: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json|Makefile|CMakeLists\.txt)" . -d 3 | head -10 || echo "No build files detected"`
- Documentation files: !`fd "(README|CONTRIBUTING|CHANGELOG|LICENSE)" . -d 2 -t f | head -5 || echo "No documentation files found"`
- Recent activity: !`git log --oneline -5 2>/dev/null | head -5 || echo "No git repository or commits found"`
- Repository status: !`git status --porcelain 2>/dev/null | wc -l | tr -d ' ' || echo "0"` uncommitted changes
- Codebase size: !`fd "\.(js|ts|jsx|tsx|rs|go|java|py|rb|php|c|cpp|h|hpp|cs|kt|swift|scala)" . | wc -l | tr -d ' '` source files
- Test coverage: !`fd "(test|spec)" . -t d | wc -l | tr -d ' '` test directories

## Your Task

STEP 1: Initialize comprehensive planning session with intelligent project analysis

- CREATE session state file: `/tmp/plan-session-$SESSION_ID.json`
- ANALYZE project complexity and technology stack from Context section
- DETERMINE planning strategy based on codebase size and structure
- VALIDATE project requirements and constraints

```bash
# Initialize planning session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetProject": "'$ARGUMENTS'",
  "detectedTechnologies": [],
  "planningStrategy": "auto-detect",
  "complexityLevel": "medium",
  "taskCategories": []
}' > /tmp/plan-session-$SESSION_ID.json
```

STEP 2: Parallel codebase analysis using sub-agent coordination

TRY:

IF codebase_size > 100 files OR technology_stack == "polyglot":

LAUNCH parallel sub-agents for comprehensive project discovery:

- **Agent 1: Architecture & Structure Analysis**: Analyze overall project organization and design patterns
  - Focus: Directory structure, module organization, architectural patterns, design principles
  - Tools: fd for structure discovery, rg for pattern searches, eza for hierarchy visualization
  - Output: Architectural overview with component relationships and design patterns

- **Agent 2: Technology Stack & Dependencies**: Map all technologies, frameworks, and dependencies
  - Focus: Build files, package managers, runtime requirements, version constraints
  - Tools: rg for dependency searches, analysis of configuration files
  - Output: Technology manifest with build requirements and compatibility matrix

- **Agent 3: Documentation & Standards Assessment**: Evaluate existing documentation and coding standards
  - Focus: README quality, API docs, code comments, style guides, conventions
  - Tools: fd for documentation discovery, rg for comment patterns, quality assessment
  - Output: Documentation audit with gaps and improvement recommendations

- **Agent 4: Test Coverage & Quality Metrics**: Analyze testing strategy and code quality indicators
  - Focus: Test structure, coverage patterns, quality gates, CI/CD configuration
  - Tools: fd for test discovery, rg for test patterns, coverage analysis
  - Output: Quality assessment with testing strategy and improvement areas

- **Agent 5: Development Workflow & Operations**: Examine development practices and operational setup
  - Focus: Git workflows, CI/CD pipelines, deployment processes, monitoring
  - Tools: git log analysis, CI configuration review, operational tooling
  - Output: Workflow analysis with operational readiness and automation opportunities

ELSE:

EXECUTE streamlined single-agent analysis for smaller projects:

```bash
# Streamlined analysis for smaller codebases
echo "🔍 Analyzing project structure and requirements..."
```

STEP 3: Intelligent task categorization and dependency mapping

CASE project_complexity:
WHEN "enterprise":

**Enterprise-Scale Task Categories:**

- **Foundation Tasks** (Sequential, High Priority):
  - Infrastructure setup and configuration
  - Security framework implementation
  - Core architecture establishment
  - Database schema and migrations

- **Parallel Development Streams** (Independent Execution):
  - Feature module development (multiple teams)
  - UI/UX implementation (design system)
  - API development (microservices)
  - Testing automation (quality assurance)

- **Integration Phases** (Coordination Required):
  - System integration testing
  - Performance optimization
  - Security auditing and compliance
  - Production deployment preparation

WHEN "startup":

**Startup-Scale Task Categories:**

- **MVP Foundation** (Sequential):
  - Core functionality implementation
  - Basic user authentication
  - Essential API endpoints
  - Minimal viable interface

- **Parallel Enhancement** (Independent):
  - Feature extensions
  - UI/UX improvements
  - Documentation creation
  - Testing implementation

- **Launch Preparation** (Coordination):
  - Integration testing
  - Deployment automation
  - Monitoring setup
  - Performance validation

STEP 4: Hierarchical plan generation with programmatic task management

**Dynamic Plan Creation Process:**

```bash
# Create main plan with detected project context
project_name="$ARGUMENTS"
plan_id="plan-$(echo "$project_name" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"

echo "📋 Creating hierarchical plan: $plan_id"
echo "🎯 Target: $project_name"
echo "⏱️ Session: $SESSION_ID"
```

CASE planning_strategy:
WHEN "comprehensive":

**Comprehensive Planning Workflow:**

```bash
# STEP 4.1: Initialize main plan
/task-create plan "$project_name" --priority=high --tags="project,planning,architecture"

# STEP 4.2: Create phase-based tasks
/task-create task "$project_name/discovery-analysis" --priority=high --tags="analysis,research"
/task-create task "$project_name/foundation-setup" --priority=high --tags="infrastructure,setup"
/task-create task "$project_name/core-development" --priority=high --tags="features,implementation"
/task-create task "$project_name/integration-testing" --priority=medium --tags="testing,validation"
/task-create task "$project_name/optimization-polish" --priority=medium --tags="performance,polish"
/task-create task "$project_name/deployment-launch" --priority=medium --tags="deployment,production"

# STEP 4.3: Discovery & Analysis subtasks
/task-create subtask "$project_name/discovery-analysis/architecture-assessment" --priority=high
/task-create subtask "$project_name/discovery-analysis/technology-audit" --priority=high
/task-create subtask "$project_name/discovery-analysis/requirements-gathering" --priority=high
/task-create subtask "$project_name/discovery-analysis/risk-assessment" --priority=medium

# STEP 4.4: Foundation Setup subtasks
/task-create subtask "$project_name/foundation-setup/project-structure" --priority=high
/task-create subtask "$project_name/foundation-setup/dependency-management" --priority=high
/task-create subtask "$project_name/foundation-setup/development-environment" --priority=high
/task-create subtask "$project_name/foundation-setup/ci-cd-pipeline" --priority=medium
/task-create subtask "$project_name/foundation-setup/security-framework" --priority=medium

# STEP 4.5: Core Development subtasks (parallel execution ready)
/task-create subtask "$project_name/core-development/api-implementation" --priority=high
/task-create subtask "$project_name/core-development/database-design" --priority=high
/task-create subtask "$project_name/core-development/business-logic" --priority=high
/task-create subtask "$project_name/core-development/user-interface" --priority=medium
/task-create subtask "$project_name/core-development/authentication-authorization" --priority=medium
```

WHEN "agile":

**Agile Sprint-Based Planning:**

```bash
# STEP 4.1: Sprint-based task creation
/task-create plan "$project_name" --priority=high --tags="agile,sprint,iterative"

# STEP 4.2: Sprint 1 - MVP Foundation
/task-create task "$project_name/sprint-1-mvp" --priority=high --tags="mvp,foundation"
/task-create subtask "$project_name/sprint-1-mvp/core-features-minimal" --priority=high
/task-create subtask "$project_name/sprint-1-mvp/basic-ui-skeleton" --priority=high
/task-create subtask "$project_name/sprint-1-mvp/essential-api-endpoints" --priority=high

# STEP 4.3: Sprint 2 - Feature Enhancement
/task-create task "$project_name/sprint-2-enhancement" --priority=medium --tags="features,enhancement"
/task-create subtask "$project_name/sprint-2-enhancement/advanced-features" --priority=medium
/task-create subtask "$project_name/sprint-2-enhancement/ui-ux-improvements" --priority=medium
/task-create subtask "$project_name/sprint-2-enhancement/performance-optimization" --priority=medium
```

**Hierarchical Structure Generation:**

```bash
# Automatic directory structure creation
echo "📁 Plan structure will be organized as:"
echo "/tasks/$project_name/"
echo "├── plan.md                           # High-level strategic overview"
echo "├── status.json                       # Real-time progress tracking"
echo "├── session-$SESSION_ID.json          # Session-specific state"
echo "├── discovery-analysis/"
echo "│   ├── task.md                      # Phase overview and coordination"
echo "│   ├── architecture-assessment.md   # Detailed analysis"
echo "│   ├── technology-audit.md          # Technology stack review"
echo "│   └── requirements-gathering.md    # Requirements documentation"
echo "├── foundation-setup/"
echo "│   ├── task.md                      # Infrastructure coordination"
echo "│   ├── project-structure.md         # Project organization"
echo "│   ├── dependency-management.md     # Dependency strategy"
echo "│   └── development-environment.md   # Environment setup"
echo "└── [additional phases as created]"
```

STEP 5: Multi-agent coordination architecture with git worktree integration

**Parallel Development Coordination:**

```bash
# STEP 5.1: Git worktree setup for parallel execution
echo "🔄 Setting up multi-agent coordination..."

# Foundation Agent (Agent A)
echo "Agent A - Foundation & Infrastructure:"
echo "  git worktree add ../project-foundation-$SESSION_ID feature/foundation-setup"
echo "  cd ../project-foundation-$SESSION_ID"
echo "  /task-list --task='$project_name/foundation-setup'"

# Development Agent (Agent B)
echo "Agent B - Core Development:"
echo "  git worktree add ../project-development-$SESSION_ID feature/core-development"
echo "  cd ../project-development-$SESSION_ID"
echo "  /task-list --task='$project_name/core-development'"

# Testing Agent (Agent C)
echo "Agent C - Testing & Validation:"
echo "  git worktree add ../project-testing-$SESSION_ID feature/testing-validation"
echo "  cd ../project-testing-$SESSION_ID"
echo "  /task-list --task='$project_name/integration-testing'"

# Documentation Agent (Agent D)
echo "Agent D - Documentation & Polish:"
echo "  git worktree add ../project-docs-$SESSION_ID feature/documentation"
echo "  cd ../project-docs-$SESSION_ID"
echo "  /task-list --task='$project_name/optimization-polish'"
```

**Inter-Agent Communication Setup:**

```bash
# STEP 5.2: Shared state management
shared_state_dir="/tmp/$project_name-coordination-$SESSION_ID"
mkdir -p "$shared_state_dir"

# Create coordination files
echo '{
  "projectName": "'$project_name'",
  "sessionId": "'$SESSION_ID'",
  "agents": {
    "foundation": {"status": "ready", "workdir": "../project-foundation-'$SESSION_ID'"},
    "development": {"status": "ready", "workdir": "../project-development-'$SESSION_ID'"},
    "testing": {"status": "ready", "workdir": "../project-testing-'$SESSION_ID'"},
    "documentation": {"status": "ready", "workdir": "../project-docs-'$SESSION_ID'"}
  },
  "joinPoints": [
    {"name": "foundation-complete", "dependencies": ["foundation"], "triggers": ["development", "testing"]},
    {"name": "development-complete", "dependencies": ["development"], "triggers": ["testing"]},
    {"name": "integration-ready", "dependencies": ["development", "testing"], "triggers": ["documentation"]}
  ]
}' > "$shared_state_dir/coordination.json"

echo "📊 Coordination state: $shared_state_dir/coordination.json"
```

STEP 6: Advanced planning features with intelligent automation

**Dependency Graph Management:**

```bash
# STEP 6.1: Automated dependency detection and mapping
echo "🔗 Generating dependency graph..."

# Create dependency mapping
echo '{
  "dependencies": {
    "foundation-setup": [],
    "core-development": ["foundation-setup"],
    "integration-testing": ["core-development"],
    "optimization-polish": ["integration-testing"],
    "deployment-launch": ["optimization-polish"]
  },
  "parallelExecution": {
    "foundation-phase": ["project-structure", "dependency-management", "development-environment"],
    "development-phase": ["api-implementation", "database-design", "business-logic"],
    "testing-phase": ["unit-tests", "integration-tests", "performance-tests"]
  }
}' > "/tmp/plan-dependencies-$SESSION_ID.json"
```

**Risk Assessment & Mitigation:**

```bash
# STEP 6.2: Intelligent risk identification
echo "⚠️ Performing risk assessment..."

# High-risk task identification
risk_factors=(
  "database-migrations" "security-implementation" "third-party-integrations"
  "performance-bottlenecks" "deployment-complexity" "team-coordination"
)

for risk in "${risk_factors[@]}"; do
  echo "  🔍 Analyzing risk: $risk"
  # Tag high-risk subtasks with appropriate priority and mitigation strategies
done
```

**Resource Allocation & Load Balancing:**

```bash
# STEP 6.3: Intelligent resource allocation
echo "👥 Optimizing resource allocation..."

# Calculate optimal agent distribution
echo '{
  "agentCapacity": {
    "foundation": {"concurrent": 3, "specialty": "infrastructure"},
    "development": {"concurrent": 5, "specialty": "implementation"},
    "testing": {"concurrent": 4, "specialty": "validation"},
    "documentation": {"concurrent": 2, "specialty": "communication"}
  },
  "loadBalancing": {
    "priorityDistribution": "even",
    "complexityWeighting": "agent-specific",
    "deadlineAlignment": "cascade"
  }
}' > "/tmp/resource-allocation-$SESSION_ID.json"
```

STEP 7: Automatic TodoWrite integration with hierarchical progress tracking

**Intelligent Todo Synchronization:**

```bash
# STEP 7.1: Create hierarchical todo structure
echo "📝 Synchronizing with TodoWrite system..."

# Plan-level todo creation
Todo_Plan="Complete comprehensive plan for $project_name"
echo "Creating plan todo: $Todo_Plan"

# Phase-level todos (tasks)
Todo_Discovery="Complete discovery and analysis phase for $project_name"
Todo_Foundation="Complete foundation setup for $project_name"
Todo_Development="Complete core development for $project_name"
Todo_Integration="Complete integration and testing for $project_name"

# Subtask-level todos (specific actions)
Todo_Architecture="Assess current architecture and design patterns"
Todo_Dependencies="Audit and optimize dependency management"
Todo_API="Implement core API endpoints and business logic"
Todo_Testing="Establish comprehensive testing framework"
```

**Upward Progress Flow Implementation:**

```bash
# STEP 7.2: Progress aggregation automation
echo "📊 Setting up progress flow automation..."

# Create progress tracking state
echo '{
  "progressFlow": {
    "subtask": "individual completion",
    "task": "aggregated from subtasks",
    "plan": "calculated from all tasks",
    "todo": "synced with plan progress"
  },
  "automationRules": {
    "subtaskComplete": "update parent task progress",
    "taskComplete": "update plan progress",
    "planMilestone": "update todo status"
  }
}' > "/tmp/progress-automation-$SESSION_ID.json"
```

**Task Management Command Integration:**

```bash
# STEP 7.3: Command-line integration setup
echo "⚡ Setting up task management commands..."

# Generate command usage examples
echo "📋 Key commands for plan management:"
echo "  /task-list --plan='$project_name'           # View complete plan hierarchy"
echo "  /task-show '$project_name/foundation-setup' # Detailed task information"
echo "  /task-update '$project_name/core-development/api-implementation' --status=completed"
echo "  /task-list --status=active                   # Show all active tasks"
echo "  /task-list --status=blocked                  # Identify blockers"
echo "  /task-log '$project_name' 'Milestone reached: MVP completed'"
echo "  /task-search --tags='high-priority'          # Find urgent tasks"
```

STEP 8: Monitoring, updates, and dynamic replanning capabilities

**Real-Time Progress Visualization:**

```bash
# STEP 8.1: Progress monitoring setup
echo "📈 Implementing progress monitoring..."

# Create monitoring dashboard state
echo '{
  "dashboard": {
    "planOverview": "hierarchical progress tree",
    "agentStatus": "real-time agent coordination",
    "blockerAlerts": "automated blocker detection",
    "milestoneTracking": "progress milestone notifications"
  },
  "alerts": {
    "blockerDetected": "immediate notification",
    "milestoneReached": "progress celebration",
    "deadlineApproaching": "early warning system"
  }
}' > "/tmp/monitoring-config-$SESSION_ID.json"
```

**Dynamic Replanning Intelligence:**

```bash
# STEP 8.2: Adaptive planning automation
echo "🔄 Setting up dynamic replanning..."

# Replanning triggers and rules
echo '{
  "replanningTriggers": [
    "scope-change", "resource-constraint", "technical-blocker",
    "timeline-adjustment", "priority-shift", "dependency-update"
  ],
  "adaptationRules": {
    "scopeIncrease": "create additional subtasks",
    "resourceShortfall": "rebalance task distribution",
    "technicalBlocker": "create unblocking subtasks",
    "timelineCompression": "prioritize critical path"
  },
  "automatedActions": {
    "taskCreation": "auto-generate needed subtasks",
    "priorityAdjustment": "dynamic priority rebalancing",
    "resourceReallocation": "optimal agent redistribution"
  }
}' > "/tmp/replanning-intelligence-$SESSION_ID.json"
```

**Statistical Analysis & Reporting:**

```bash
# STEP 8.3: Automated statistics and reporting
echo "📊 Generating plan statistics..."

# Calculate plan metrics
total_tasks=$(echo '6')  # Discovery, Foundation, Development, Integration, Optimization, Deployment
total_subtasks=$(echo '24')  # Estimated based on comprehensive planning
completion_percentage=$(echo '0')  # Initial state

echo "Plan Statistics:"
echo "  📋 Total Tasks: $total_tasks"
echo "  📝 Total Subtasks: $total_subtasks"
echo "  ✅ Completion: $completion_percentage%"
echo "  🎯 Target: $project_name"
echo "  ⏱️ Session: $SESSION_ID"
echo "  🔄 Status: Planning Phase Complete"
```

STEP 9: Session completion and handoff coordination

**Session State Finalization:**

```bash
# STEP 9.1: Finalize session state and prepare for execution
echo "✅ Plan creation completed successfully"
echo "📋 Comprehensive plan generated for: $project_name"
echo "⏱️ Session: $SESSION_ID"
echo "📁 State files created in: /tmp/plan-session-$SESSION_ID/"
echo "🔗 Coordination files: /tmp/$project_name-coordination-$SESSION_ID/"
```

**Multi-Agent Handoff Instructions:**

```bash
# STEP 9.2: Prepare multi-agent execution handoff
echo "🚀 Ready for multi-agent execution:"
echo ""
echo "Foundation Agent (Terminal 1):"
echo "  git worktree add ../project-foundation-$SESSION_ID feature/foundation-setup"
echo "  cd ../project-foundation-$SESSION_ID"
echo "  /task-list --task='$project_name/foundation-setup'"
echo ""
echo "Development Agent (Terminal 2):"
echo "  git worktree add ../project-development-$SESSION_ID feature/core-development"
echo "  cd ../project-development-$SESSION_ID"
echo "  /task-list --task='$project_name/core-development'"
echo ""
echo "Testing Agent (Terminal 3):"
echo "  git worktree add ../project-testing-$SESSION_ID feature/testing-validation"
echo "  cd ../project-testing-$SESSION_ID"
echo "  /task-list --task='$project_name/integration-testing'"
echo ""
echo "Documentation Agent (Terminal 4):"
echo "  git worktree add ../project-docs-$SESSION_ID feature/documentation"
echo "  cd ../project-docs-$SESSION_ID"
echo "  /task-list --task='$project_name/optimization-polish'"
```

**Progress Monitoring Commands:**

```bash
# STEP 9.3: Provide ongoing monitoring guidance
echo "📊 Monitor progress with these commands:"
echo "  /task-list --plan='$project_name'                    # Complete plan overview"
echo "  /task-list --status=active                           # Active tasks across all agents"
echo "  /task-list --status=blocked                          # Identify and resolve blockers"
echo "  /task-show '$project_name'                           # High-level plan status"
echo "  /task-search --tags='high-priority'                  # Focus on critical path"
echo "  /task-log '$project_name' 'Progress update message'  # Log important milestones"
```

CATCH (planning_failed):

- LOG detailed error information to session state
- PROVIDE fallback planning strategies
- SUGGEST manual planning approaches
- PRESERVE partial progress for recovery

```bash
echo "⚠️ Planning execution encountered issues. Fallback options:"
echo "1. Manual task creation using /task-create commands"
echo "2. Simplified planning with reduced complexity"
echo "3. Phase-by-phase incremental planning"
echo "4. Recovery from partial session state"
```

FINALLY:

- SAVE comprehensive session state for future reference
- UPDATE planning metrics and success indicators
- PROVIDE clear next steps for project execution
- COORDINATE with task management system for ongoing tracking

```bash
# Final session state preservation
echo "💾 Session state preserved in:"
echo "  - /tmp/plan-session-$SESSION_ID.json"
echo "  - /tmp/$project_name-coordination-$SESSION_ID/"
echo "  - /tmp/progress-automation-$SESSION_ID.json"
echo "  - /tmp/monitoring-config-$SESSION_ID.json"
echo ""
echo "🎯 Plan ready for execution. Coordination files available for multi-agent workflows."
echo "📈 Use task management commands to track progress and coordinate team efforts."
```

## Planning Strategy Reference

### Project Complexity Assessment

**Micro Projects (< 10 files):**

- Single-agent execution
- Linear task progression
- Minimal coordination overhead
- Focus on rapid iteration

**Small Projects (10-100 files):**

- 2-3 agent coordination
- Parallel development streams
- Basic dependency management
- Agile sprint methodology

**Medium Projects (100-1000 files):**

- 4-6 agent coordination
- Complex dependency graphs
- Phase-based execution
- Advanced monitoring required

**Large Projects (1000+ files):**

- 6-10 agent coordination
- Enterprise-scale planning
- Sophisticated risk management
- Continuous integration focus

### Technology Stack Considerations

**Frontend-Heavy Projects:**

- Component-based task breakdown
- UI/UX coordination agents
- Design system implementation
- Cross-browser testing focus

**Backend-Heavy Projects:**

- API-first development approach
- Database-centric planning
- Microservices coordination
- Performance optimization focus

**Full-Stack Projects:**

- Frontend/backend agent separation
- Integration testing emphasis
- API contract coordination
- End-to-end workflow validation

**Infrastructure Projects:**

- DevOps-centric task structure
- Deployment automation focus
- Monitoring and observability
- Security and compliance integration

This planning command now provides comprehensive project analysis, intelligent task breakdown, multi-agent coordination, and sophisticated progress tracking capabilities for projects of any scale.