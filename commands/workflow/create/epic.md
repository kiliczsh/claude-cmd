---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(git:*), Bash(gh:*), Bash(fd:*), Bash(rg:*), Bash(eza:*), Bash(jq:*), Bash(gdate:*), Bash(docker:*), Bash(kubectl:*)
name: "Epic"
description: "Orchestrates large-scale, cross-repository architectural epics with parallel coordination and dependency management"
author: "wcygan"
tags: ["workflow","create"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Epic target: $ARGUMENTS
- Current directory: !`pwd`
- Git repository info: !`git remote get-url origin 2>/dev/null || echo "No remote origin"`
- Branch status: !`git branch --show-current 2>/dev/null || echo "Not a git repository"`
- Worktree list: !`git worktree list 2>/dev/null | head -5 || echo "No worktrees found"`
- Organization repositories: !`gh repo list --limit 10 --json name,description 2>/dev/null | jq -r '.[] | "\(.name): \(.description // \"No description\")"' | head -5 || echo "GitHub CLI not configured"`
- Docker containers: !`docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" 2>/dev/null | head -3 || echo "Docker not available"`
- Kubernetes context: !`kubectl config current-context 2>/dev/null || echo "No kubernetes context"`

## Your Task

STEP 1: Initialize epic orchestration session and analyze scope

- CREATE epic session state: `/tmp/epic-session-$SESSION_ID.json`
- ANALYZE target scope from $ARGUMENTS
- DETERMINE epic type: migration, refactoring, feature-rollout, infrastructure
- IDENTIFY affected repositories and services from Context section

```bash
# Initialize epic orchestration session
echo '{
  "sessionId": "'$SESSION_ID'",
  "epicTarget": "'$ARGUMENTS'",
  "epicType": "auto-detect",
  "affectedRepositories": [],
  "estimatedComplexity": "unknown",
  "coordinationStrategy": "parallel"
}' > /tmp/epic-session-$SESSION_ID.json
```

STEP 2: Comprehensive epic scope analysis with parallel sub-agent coordination

TRY:

IF epic_complexity == "enterprise" OR affected_repositories > 5:

LAUNCH parallel sub-agents for comprehensive scope analysis:

- **Agent 1: Repository Discovery**: Scan and catalog all affected repositories
  - Focus: Monorepo subdirectories, organization repositories, dependency relationships
  - Tools: gh repo list, fd for service discovery, git submodule analysis
  - Output: Complete repository manifest with metadata and dependencies

- **Agent 2: Service Architecture Analysis**: Map service interactions and dependencies
  - Focus: API dependencies, database relationships, shared libraries, communication patterns
  - Tools: rg for import analysis, configuration file examination, API endpoint discovery
  - Output: Service dependency graph and impact assessment

- **Agent 3: Infrastructure Impact Assessment**: Evaluate infrastructure and deployment requirements
  - Focus: Kubernetes manifests, Docker configurations, CI/CD pipelines, deployment patterns
  - Tools: kubectl for cluster analysis, docker for container assessment
  - Output: Infrastructure change requirements and deployment strategy

- **Agent 4: Timeline & Resource Estimation**: Calculate effort and resource requirements
  - Focus: Code complexity analysis, team capacity, historical velocity, risk assessment
  - Tools: git log for velocity analysis, code metrics, team availability
  - Output: Realistic timeline with phases and resource allocation

ELSE:

EXECUTE streamlined scope analysis for focused epics:

**Repository Discovery:**

```bash
# Scan current repository structure
echo "📁 Analyzing repository structure..."
fd . -t d -d 2 | head -10

# Check for monorepo services
if fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml)" . -d 3 | wc -l | grep -v "^[01]$" >/dev/null; then
  echo "🔍 Monorepo structure detected - multiple services found"
else
  echo "📦 Single repository detected"
fi
```

**Epic Impact Assessment:**

```bash
# Generate comprehensive impact analysis
echo "📊 Epic Impact Analysis:"
echo "Repositories affected: $(jq '.affectedRepositories | length' /tmp/epic-session-$SESSION_ID.json)"
echo "Epic type: $(jq -r '.epicType' /tmp/epic-session-$SESSION_ID.json)"
echo "Estimated complexity: $(jq -r '.estimatedComplexity' /tmp/epic-session-$SESSION_ID.json)"
echo "Coordination strategy: $(jq -r '.coordinationStrategy' /tmp/epic-session-$SESSION_ID.json)"

# Technology stack analysis
echo "🔧 Technology stack:"
fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|deno\.json)" . | \
  rg -o "(package\.json|Cargo\.toml|go\.mod|pom\.xml|deno\.json)" | \
  sort | uniq -c
```

STEP 3: Master epic plan generation with programmatic structure

CASE epic_type:
WHEN "migration":

**Technology Migration Epic Template:**

```markdown
# Epic: $ARGUMENTS

## Overview

**Session ID**: $SESSION_ID
**Epic Type**: Technology Migration
**Initiated**: $(gdate -Iseconds 2>/dev/null || date -Iseconds)
**Coordinator**: $(git config user.name 2>/dev/null || echo "Unknown")

**Goal**: $ARGUMENTS

**Scope Analysis**:

- Affected repositories: $(jq '.affectedRepositories | length' /tmp/epic-session-$SESSION_ID.json)
- Technology stack: Multi-language ($(fd "(package\.json|Cargo\.toml|go\.mod)" . | wc -l | tr -d ' ') services)
- Deployment target: $(kubectl config current-context 2>/dev/null || echo "Traditional deployment")

**Estimated Timeline**: $(jq -r '.estimatedComplexity' /tmp/epic-session-$SESSION_ID.json) complexity
**Risk Level**: High (involves production services)
```

## Success Criteria

- [ ] Epic target achieved: $ARGUMENTS
- [ ] Zero production incidents during implementation
- [ ] All affected services successfully migrated
- [ ] Performance metrics meet or exceed baseline
- [ ] Complete documentation and team training
- [ ] Rollback procedures tested and documented
- [ ] Post-epic monitoring and alerting operational

## Epic Phases

### Phase 1: Foundation and Planning (Week 1)

**Goal**: Establish epic infrastructure and detailed planning

**Coordination Strategy**: Parallel preparation across all repositories

**Tasks**:

- [ ] Create epic coordination workspace with git worktrees
- [ ] Generate repository-specific PLAN.md files for all affected services
- [ ] Set up shared infrastructure (CI/CD, monitoring, rollback mechanisms)
- [ ] Establish communication channels and status reporting
- [ ] Create epic dashboard for progress tracking

**Sub-Agent Delegation for Repository Planning**:

LAUNCH parallel sub-agents to create repository-specific plans:

FOR EACH repository IN affected_repositories:

- **Planning Agent {repository}**: Create detailed implementation plan
  - Focus: Repository-specific migration strategy, dependencies, testing approach
  - Tools: Read existing code, analyze patterns, create PLAN.md
  - Output: Comprehensive repository migration plan with checkpoints

**Success Criteria**:

- [ ] All repositories have detailed PLAN.md files
- [ ] Epic coordination infrastructure operational
- [ ] Git worktrees created for parallel development
- [ ] Team assignments and responsibilities documented

**Dependencies**: None (foundation work)

### Phase 2: Critical Path Implementation (Weeks 2-4)

**Goal**: Implement changes in dependency-critical services first

**Coordination Strategy**: Sequential implementation respecting dependencies

**Critical Path Analysis**:

```bash
# Identify critical path through dependency analysis
echo "🎯 Critical path services (implement first):"
jq -r '.criticalPath[]?' /tmp/epic-session-$SESSION_ID.json 2>/dev/null || echo "  - Auto-detecting from dependencies..."
```

**Parallel Implementation Workflow**:

FOR EACH critical_service IN critical_path:

- **Implementation Team {service}**: Dedicated git worktree and development team
  - Repository: `../epic-{service}-$SESSION_ID`
  - Branch: `epic/$EPIC_ID`
  - Lead: Assigned team member
  - Focus: Core migration with comprehensive testing

**Tasks (Per Service)**:

- [ ] Create dedicated worktree: `git worktree add ../epic-{service}-$SESSION_ID epic/$EPIC_ID`
- [ ] Follow repository-specific PLAN.md implementation steps
- [ ] Implement with feature flags for gradual rollout
- [ ] Create comprehensive test suite (unit, integration, e2e)
- [ ] Performance testing and optimization
- [ ] Documentation and runbook updates

**Success Criteria**:

- [ ] All critical path services successfully migrated
- [ ] Feature flags enable safe traffic migration
- [ ] Performance metrics meet baseline requirements
- [ ] Zero production incidents during implementation

**Dependencies**: Phase 1 completion

### Phase 3: Parallel Service Migration (Weeks 5-8)

**Goal**: Migrate remaining services using true parallel execution

**Coordination Strategy**: Maximum parallelism with git worktree isolation

**Parallel Worktree Architecture**:

```bash
# Create isolated worktrees for each service team
FOR service IN remaining_services:
  git worktree add ../epic-$service-$SESSION_ID epic/$EPIC_ID-$service
  echo "🌿 Worktree created: ../epic-$service-$SESSION_ID"
done
```

**Sub-Agent Service Migration Coordination**:

LAUNCH parallel implementation sub-agents:

- **Agent {Service A}**: Complete service migration in dedicated worktree
  - Worktree: `../epic-service-a-$SESSION_ID`
  - Focus: Follow PLAN.md, implement tests, performance optimization
  - Coordination: Update shared status in `/tmp/epic-coordination-$SESSION_ID.json`

- **Agent {Service B}**: Complete service migration in dedicated worktree
  - Worktree: `../epic-service-b-$SESSION_ID`
  - Focus: Follow PLAN.md, implement tests, performance optimization
  - Coordination: Update shared status in `/tmp/epic-coordination-$SESSION_ID.json`

- **Agent {Service C}**: Complete service migration in dedicated worktree
  - Worktree: `../epic-service-c-$SESSION_ID`
  - Focus: Follow PLAN.md, implement tests, performance optimization
  - Coordination: Update shared status in `/tmp/epic-coordination-$SESSION_ID.json`

**Coordination Checkpoints**:

- Week 6: All services complete individual implementation
- Week 7: Cross-service integration testing
- Week 8: Coordinated production rollout with monitoring

### Phase 4: Supporting Services & Integration (Weeks 9-11)

**Goal**: Complete remaining services and comprehensive integration testing

**Batch Processing with Parallel Execution**:

```bash
# Group supporting services by dependency clusters
echo "📦 Supporting service migration batches:"
jq -r '.supportingServices[]?' /tmp/epic-session-$SESSION_ID.json 2>/dev/null || echo "  - Auto-detecting supporting services..."
```

**Parallel Batch Migration Strategy**:

FOR EACH service_batch IN supporting_service_batches:
LAUNCH parallel sub-agents for batch processing:

- **Batch Implementation Agent**: Migrate service batch in parallel
  - Focus: 2-3 services per batch, shared dependency optimization
  - Tools: Git worktrees for isolation, shared coordination state
  - Output: Completed service migrations with integration testing

**Integration Testing Coordination**:

- **Integration Test Agent**: Comprehensive end-to-end testing
  - Focus: Cross-service compatibility, performance regression testing
  - Tools: Docker Compose for local testing, Kubernetes for staging
  - Output: Integration test results and performance benchmarks

### Phase 5: Cleanup and Epic Consolidation (Week 12)

**Goal**: Finalize epic and consolidate all changes

**Epic Consolidation Strategy**:

```bash
# Consolidate all worktree changes back to main repositories
echo "🔄 Consolidating epic changes..."
FOR worktree IN epic_worktrees:
  cd $worktree
  git push origin epic/$EPIC_ID
  gh pr create --title "Epic: $ARGUMENTS - $service" --body "Epic implementation for $service"
  cd -
done
```

**Final Epic Tasks**:

- [ ] Consolidate all git worktree changes via pull requests
- [ ] Remove deprecated implementation patterns
- [ ] Optimize performance across all affected services
- [ ] Update comprehensive documentation and runbooks
- [ ] Conduct post-epic performance analysis and retrospective
- [ ] Clean up epic coordination infrastructure
- [ ] Archive epic session state and lessons learned

CATCH (epic_implementation_failed):

- LOG comprehensive error details to epic session state
- TRIGGER automatic rollback procedures for affected services
- PRESERVE work in progress via git worktrees
- GENERATE post-mortem analysis and lessons learned

## Risk Mitigation & Rollback Strategy

### High-Risk Items with Automated Handling

1. **Coordination Complexity**: Multiple teams and repositories
   - **Mitigation**: Git worktrees provide complete isolation
   - **Rollback**: Each worktree can be rolled back independently
   - **Automation**: `/tmp/epic-coordination-$SESSION_ID.json` tracks all states

2. **Integration Conflicts**: Cross-service compatibility
   - **Mitigation**: Comprehensive integration testing in Phase 4
   - **Rollback**: Feature flags enable instant traffic switching
   - **Automation**: Automated rollback triggers based on error rates

3. **Performance Regression**: Epic implementation overhead
   - **Mitigation**: Parallel performance testing throughout implementation
   - **Rollback**: Git worktrees enable rapid reversion
   - **Automation**: Performance monitoring with automatic alerts

### Epic Rollback Coordination

```bash
# Epic-wide rollback procedure
echo "🚨 Initiating epic rollback..."
echo "Rollback target: $1" # phase number or 'full'

# Rollback all worktrees to specified checkpoint
FOR worktree IN $(git worktree list | grep epic-$SESSION_ID | cut -f1 -d' '):
  cd $worktree
  git reset --hard epic-checkpoint-$1
  cd -
done

# Update epic coordination state
jq '.status = "rollback" | .rollbackTarget = "'$1'"' /tmp/epic-coordination-$SESSION_ID.json > /tmp/epic-coordination-$SESSION_ID.tmp
mv /tmp/epic-coordination-$SESSION_ID.tmp /tmp/epic-coordination-$SESSION_ID.json
```

STEP 4: Resource allocation and team coordination setup

### Git Worktree Team Allocation

```bash
# Automatic team assignment based on repository analysis
echo "👥 Team allocation strategy:"
echo "Epic Coordinator: $(git config user.name)"
echo "Session ID: $SESSION_ID"
echo "Affected repositories: $(jq '.affectedRepositories | length' /tmp/epic-session-$SESSION_ID.json)"

# Create team assignment in coordination state
jq '.teamAllocation = {
  "epicCoordinator": "'$(git config user.name)'",
  "sessionId": "'$SESSION_ID'",
  "worktreeStrategy": "parallel-isolation",
  "coordinationMethod": "shared-state-files"
}' /tmp/epic-session-$SESSION_ID.json > /tmp/epic-session-$SESSION_ID.tmp
mv /tmp/epic-session-$SESSION_ID.tmp /tmp/epic-session-$SESSION_ID.json
```

### Infrastructure Requirements

- **Git worktrees**: Parallel development isolation for each service
- **Shared coordination state**: `/tmp/epic-coordination-$SESSION_ID.json`
- **Performance testing**: Automated benchmarking in each worktree
- **Monitoring integration**: Real-time epic progress tracking

## Communication & Coordination

### Automated Status Tracking

```bash
# Real-time epic status command
/epic status
# Displays:
# - Current phase and completion percentage
# - Worktree status for each service
# - Integration test results
# - Performance benchmarks
# - Risk assessment and blockers
```

### Shared State Coordination

- **Epic coordination**: `/tmp/epic-coordination-$SESSION_ID.json`
- **Progress tracking**: Real-time updates from all worktrees
- **Status reporting**: Automated generation from shared state
- **Documentation**: Auto-generated from implementation progress

### Git Worktree Communication Pattern

```bash
# Each worktree updates shared coordination state
echo "📊 Updating epic coordination state..."
jq '.repositories["'$CURRENT_SERVICE'"] = {
  "status": "'$STATUS'",
  "worktree": "'$PWD'",
  "progress": '$PROGRESS',
  "lastUpdate": "'$(gdate -Iseconds)'"
}' /tmp/epic-coordination-$SESSION_ID.json > /tmp/epic-coordination-$SESSION_ID.tmp
mv /tmp/epic-coordination-$SESSION_ID.tmp /tmp/epic-coordination-$SESSION_ID.json
```

STEP 5: Epic execution and coordination management

### Dependency Management

```bash
# Automated dependency checking
echo "🔗 Checking epic dependencies..."
jq -r '.dependencies[]?' /tmp/epic-session-$SESSION_ID.json 2>/dev/null || echo "  - Dependencies auto-detected from repository analysis"

# Cross-service dependency validation
FOR service IN affected_services:
  echo "Validating $service dependencies..."
  # Check if dependent services are ready
done
```

### Automated Blocker Detection

```bash
# Real-time blocker identification
echo "⚠️ Epic blockers analysis:"
jq -r '.blockers[]?' /tmp/epic-coordination-$SESSION_ID.json 2>/dev/null || echo "  - No blockers detected"

# Performance regression detection
echo "📈 Performance regression monitoring active"
```

## Success Metrics & Validation

### Automated Performance Validation

```bash
# Epic performance metrics collection
echo "📊 Epic performance metrics:"
echo "Baseline metrics: $(jq -r '.performanceBaseline' /tmp/epic-session-$SESSION_ID.json 2>/dev/null || echo 'Collecting...')"
echo "Current metrics: $(jq -r '.currentPerformance' /tmp/epic-coordination-$SESSION_ID.json 2>/dev/null || echo 'Monitoring...')"
```

### Quality Assurance Targets

- Zero production incidents during epic implementation
- 100% test coverage across all affected services
- Complete documentation auto-generated from implementation
- Comprehensive performance benchmarking

### Epic Success Validation

```bash
# Automated success criteria validation
echo "✅ Epic success validation:"
echo "Target achieved: $ARGUMENTS"
echo "All services migrated: $(jq -r '.allServicesMigrated' /tmp/epic-coordination-$SESSION_ID.json)"
echo "Performance targets met: $(jq -r '.performanceTargetsMet' /tmp/epic-coordination-$SESSION_ID.json)"
echo "Zero incidents: $(jq -r '.zeroIncidents' /tmp/epic-coordination-$SESSION_ID.json)"
```

STEP 6: Repository-specific plan generation with sub-agent delegation

LAUNCH parallel sub-agents for repository-specific planning:

FOR EACH repository IN affected_repositories:

- **Repository Planning Agent {repository}**: Generate tailored PLAN.md
  - Focus: Repository-specific implementation strategy, testing approach, deployment plan
  - Tools: Read existing code, analyze patterns, create comprehensive PLAN.md
  - Output: Complete repository migration plan with git worktree integration

**Example Generated Service Plan Template:**

````markdown
# {Service} Epic Implementation Plan

## Epic Integration

- **Epic Session ID**: $SESSION_ID
- **Epic Target**: $ARGUMENTS
- **Service Worktree**: ../epic-{service}-$SESSION_ID
- **Coordination State**: /tmp/epic-coordination-$SESSION_ID.json

## Implementation Strategy

### STEP 1: Worktree Setup and Isolation

```bash
# Create dedicated worktree for this service
git worktree add ../epic-{service}-$SESSION_ID epic/$EPIC_ID-{service}
cd ../epic-{service}-$SESSION_ID

# Update coordination state
jq '.repositories["{service}"] = {
  "status": "worktree-created",
  "worktree": "'$PWD'",
  "startTime": "'$(gdate -Iseconds)'"
}' /tmp/epic-coordination-$SESSION_ID.json > /tmp/epic-coordination-$SESSION_ID.tmp
```
````

### STEP 2: Implementation Following Epic Guidelines

- [ ] Implement epic target: $ARGUMENTS
- [ ] Follow service-specific patterns and requirements
- [ ] Create comprehensive test suite
- [ ] Update coordination state after each major step

### STEP 3: Integration with Epic Coordination

- [ ] Regular status updates to shared coordination state
- [ ] Integration testing with other epic services
- [ ] Performance validation and benchmarking
- [ ] Documentation and runbook updates

### STEP 4: Epic Consolidation

- [ ] Create pull request for epic implementation
- [ ] Coordinate merge with other epic services
- [ ] Clean up worktree after successful integration

````
STEP 7: Cross-repository coordination with shared state management

**Epic Coordination State Management:**

```bash
# Initialize comprehensive coordination state
echo '{
  "epicId": "epic-'$SESSION_ID'",
  "epicTarget": "'$ARGUMENTS'",
  "status": "in_progress",
  "currentPhase": "phase_1",
  "sessionId": "'$SESSION_ID'",
  "initiatedBy": "'$(git config user.name)'",
  "startTime": "'$(gdate -Iseconds)'",
  "repositories": {},
  "worktrees": {},
  "milestones": {
    "phase_1_target": "'$(gdate -d '+1 week' -Iseconds 2>/dev/null || date -d '+1 week' -Iseconds 2>/dev/null || echo 'Week 1')'",
    "phase_2_target": "'$(gdate -d '+3 weeks' -Iseconds 2>/dev/null || date -d '+3 weeks' -Iseconds 2>/dev/null || echo 'Week 3')'",
    "epic_completion_target": "'$(gdate -d '+12 weeks' -Iseconds 2>/dev/null || date -d '+12 weeks' -Iseconds 2>/dev/null || echo 'Week 12')'"
  },
  "performanceBaseline": {},
  "risks": [],
  "blockers": []
}' > /tmp/epic-coordination-$SESSION_ID.json
````

**Real-time Coordination Monitoring:**

```bash
# Epic status command for real-time monitoring
alias epic-status='jq -r "Epic: \(.epicTarget) | Status: \(.status) | Phase: \(.currentPhase) | Repositories: \(.repositories | length)" /tmp/epic-coordination-$SESSION_ID.json'

# Repository status summary
alias epic-repos='jq -r ".repositories | to_entries[] | \"\(.key): \(.value.status) (\(.value.progress // 0)%)\"" /tmp/epic-coordination-$SESSION_ID.json'
```

STEP 8: Epic orchestration and automation with modern tooling

**Epic Management Commands:**

```bash
# Epic orchestration functions
epic_status() {
  echo "📊 Epic Status: $(jq -r '.status' /tmp/epic-coordination-$SESSION_ID.json)"
  echo "🎯 Current Phase: $(jq -r '.currentPhase' /tmp/epic-coordination-$SESSION_ID.json)"
  echo "📁 Repositories: $(jq -r '.repositories | length' /tmp/epic-coordination-$SESSION_ID.json)"
  echo "🌿 Worktrees: $(jq -r '.worktrees | length' /tmp/epic-coordination-$SESSION_ID.json)"
  
  echo "\n📋 Repository Status:"
  jq -r '.repositories | to_entries[] | "  \(.key): \(.value.status)"' /tmp/epic-coordination-$SESSION_ID.json
}

epic_start_phase() {
  local PHASE=$1
  echo "🚀 Starting Epic Phase $PHASE"
  
  # Update coordination state
  jq '.currentPhase = "phase_'$PHASE'" | .phases["phase_'$PHASE'"].startTime = "'$(gdate -Iseconds)'"' \
    /tmp/epic-coordination-$SESSION_ID.json > /tmp/epic-coordination-$SESSION_ID.tmp
  mv /tmp/epic-coordination-$SESSION_ID.tmp /tmp/epic-coordination-$SESSION_ID.json
  
  # Launch sub-agents for parallel phase execution
  echo "🔄 Launching parallel sub-agents for phase $PHASE..."
}

epic_create_worktrees() {
  echo "🌿 Creating git worktrees for parallel development..."
  
  jq -r '.repositories | keys[]' /tmp/epic-coordination-$SESSION_ID.json | while read repo; do
    local worktree_path="../epic-$repo-$SESSION_ID"
    git worktree add $worktree_path epic/$SESSION_ID-$repo
    
    # Update coordination state with worktree info
    jq '.worktrees["'$repo'"] = {
      "path": "'$worktree_path'",
      "branch": "epic/'$SESSION_ID'-'$repo'",
      "createdAt": "'$(gdate -Iseconds)'"
    }' /tmp/epic-coordination-$SESSION_ID.json > /tmp/epic-coordination-$SESSION_ID.tmp
    mv /tmp/epic-coordination-$SESSION_ID.tmp /tmp/epic-coordination-$SESSION_ID.json
    
    echo "  ✅ Created worktree: $worktree_path"
  done
}

epic_create_prs() {
  echo "🔄 Creating pull requests for all epic services..."
  
  jq -r '.worktrees | to_entries[]' /tmp/epic-coordination-$SESSION_ID.json | while read worktree_info; do
    local repo=$(echo $worktree_info | jq -r '.key')
    local path=$(echo $worktree_info | jq -r '.value.path')
    
    cd $path
    gh pr create --title "Epic: $ARGUMENTS - $repo" --body "$(cat <<'EOF'
## Epic Implementation

- Epic Session: $SESSION_ID
- Epic Target: $ARGUMENTS
- Repository: $repo

## Changes

- Implemented epic target for $repo
- Following epic coordination strategy
- Comprehensive testing and validation

## Epic Coordination

- Coordination state: `/tmp/epic-coordination-$SESSION_ID.json`
- Worktree path: $path
- Integration tested with other epic services
EOF
)"
    cd -
  done
}
```

STEP 9: Automated progress tracking and epic dashboard generation

**Real-time Epic Dashboard Generation:**

```bash
# Generate epic dashboard from coordination state
epic_generate_dashboard() {
  local epic_target=$(jq -r '.epicTarget' /tmp/epic-coordination-$SESSION_ID.json)
  local current_phase=$(jq -r '.currentPhase' /tmp/epic-coordination-$SESSION_ID.json)
  local session_id=$(jq -r '.sessionId' /tmp/epic-coordination-$SESSION_ID.json)
  
  cat > epic-dashboard-$SESSION_ID.md <<EOF
# Epic Progress Dashboard: $epic_target

## Epic Overview
- **Session ID**: $session_id
- **Epic Target**: $epic_target
- **Current Phase**: $current_phase
- **Started**: $(jq -r '.startTime' /tmp/epic-coordination-$SESSION_ID.json)
- **Coordinator**: $(jq -r '.initiatedBy' /tmp/epic-coordination-$SESSION_ID.json)

## Repository Status
$(jq -r '.repositories | to_entries[] | "- **\(.key)**: \(.value.status) (\(.value.progress // 0)%)"' /tmp/epic-coordination-$SESSION_ID.json)

## Worktree Status
$(jq -r '.worktrees | to_entries[] | "- **\(.key)**: \(.value.path) (\(.value.branch))"' /tmp/epic-coordination-$SESSION_ID.json)

## Current Blockers
$(jq -r '.blockers[]?' /tmp/epic-coordination-$SESSION_ID.json 2>/dev/null | sed 's/^/- /' || echo "- No blockers detected")

## Performance Metrics
- **Baseline**: $(jq -r '.performanceBaseline // "Collecting..."' /tmp/epic-coordination-$SESSION_ID.json)
- **Current**: $(jq -r '.currentPerformance // "Monitoring..."' /tmp/epic-coordination-$SESSION_ID.json)

## Next Actions
- Continue current phase implementation
- Monitor worktree progress
- Update coordination state regularly

---
*Auto-generated from epic coordination state at $(gdate)*
EOF

  echo "📊 Epic dashboard generated: epic-dashboard-$SESSION_ID.md"
}
```

**Automated Progress Reporting:**

```bash
# Real-time progress updates
epic_update_progress() {
  local repo=$1
  local status=$2
  local progress=$3
  
  jq '.repositories["'$repo'"].status = "'$status'" |
      .repositories["'$repo'"].progress = '$progress' |
      .repositories["'$repo'"].lastUpdate = "'$(gdate -Iseconds)'"' \
    /tmp/epic-coordination-$SESSION_ID.json > /tmp/epic-coordination-$SESSION_ID.tmp
  mv /tmp/epic-coordination-$SESSION_ID.tmp /tmp/epic-coordination-$SESSION_ID.json
  
  echo "📈 Updated $repo: $status ($progress%)"
}
```

FINALLY:

- SAVE epic session state for resumability
- GENERATE comprehensive epic plan and coordination infrastructure
- PROVIDE epic management commands for ongoing coordination
- ENSURE all git worktrees are properly configured for parallel development

## Epic Command Usage Examples

### Start a new epic:

```
/epic "Migrate all services from REST to gRPC"
```

### Check epic status:

```
/epic status
# Real-time status from coordination state
```

### Continue epic work:

```
/epic continue
# Resumes from saved session state
```

### Emergency rollback:

```
/epic rollback --to-phase 1
# Rolls back all worktrees to specified phase
```

### Generate epic dashboard:

```
/epic dashboard
# Creates epic-dashboard-$SESSION_ID.md
```

## Advanced Epic Coordination Features

### Automatic Git Worktree Management

```bash
# Epic automatically creates isolated development environments
echo "🌿 Creating epic worktree infrastructure..."
FOR service IN affected_services:
  git worktree add ../epic-$service-$SESSION_ID epic/$SESSION_ID-$service
  echo "  ✅ Worktree: ../epic-$service-$SESSION_ID"
done
```

### Epic Dependency Graph Generation

```bash
# Generate dependency visualization
epic_generate_dependency_graph() {
  echo "📊 Generating epic dependency graph..."
  
  cat > epic-dependencies-$SESSION_ID.mermaid <<EOF
graph TD
$(jq -r '.repositories | to_entries[] | "    \(.key)[\(.key)]"' /tmp/epic-coordination-$SESSION_ID.json)
$(jq -r '.dependencies[]?' /tmp/epic-coordination-$SESSION_ID.json 2>/dev/null | sed 's/^/    /' || echo "    # Dependencies auto-detected")
EOF

  echo "📈 Dependency graph: epic-dependencies-$SESSION_ID.mermaid"
}
```

### Epic Integration Testing Coordination

```bash
# Coordinated testing across all epic worktrees
epic_run_integration_tests() {
  echo "🧪 Running epic integration tests..."
  
  # Test each worktree in parallel
  jq -r '.worktrees | to_entries[]' /tmp/epic-coordination-$SESSION_ID.json | while read worktree_info; do
    local repo=$(echo $worktree_info | jq -r '.key')
    local path=$(echo $worktree_info | jq -r '.value.path')
    
    (
      cd $path
      echo "Testing $repo in worktree $path..."
      # Run repository-specific tests
      deno task test 2>/dev/null || npm test 2>/dev/null || cargo test 2>/dev/null || mvn test 2>/dev/null || echo "No test command found for $repo"
    ) &
  done
  
  wait # Wait for all parallel tests to complete
  echo "✅ Epic integration testing completed"
}
```

### Epic Command Integration

- **Epic Planning**: Uses parallel sub-agents to generate repository-specific PLAN.md files
- **Epic Coordination**: Integrates with git worktrees for true parallel development
- **Epic Testing**: Coordinates testing across all affected repositories
- **Epic Deployment**: Manages phased deployment with rollback capabilities
- **Epic Monitoring**: Real-time progress tracking and performance monitoring