---
allowed-tools: Read, Grep, Glob, Bash(git:*), Bash(rg:*), Bash(fd:*), Bash(jq:*), Bash(bat:*), Bash(eza:*), Bash(gdate:*), TodoWrite, Task
name: "Auto"
description: "Automatically detect and load comprehensive project context with intelligent environment analysis"
author: "wcygan"
tags: ["context","project"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Git branch: !`git branch --show-current 2>/dev/null || echo "Not a git repository"`
- Project name: !`basename "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
- Recent commits: !`git log --oneline -5 2>/dev/null || echo "No git history"`
- Uncommitted changes: !`git status --porcelain 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Active worktrees: !`git worktree list 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Language detected: !`if [ -f "deno.json" ] || [ -f "deno.jsonc" ]; then echo "Deno/TypeScript"; elif [ -f "package.json" ]; then echo "Node.js"; elif [ -f "Cargo.toml" ]; then echo "Rust"; elif [ -f "go.mod" ]; then echo "Go"; elif [ -f "pom.xml" ]; then echo "Java/Maven"; elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then echo "Python"; else echo "Unknown"; fi`
- Framework detected: !`if [ -f "deno.json" ] && rg -q "@fresh/core" deno.json 2>/dev/null; then echo "Fresh"; elif [ -f "package.json" ] && rg -q "next" package.json 2>/dev/null; then echo "Next.js"; elif [ -f "Cargo.toml" ] && rg -q "axum" Cargo.toml 2>/dev/null; then echo "Axum"; elif [ -f "go.mod" ] && rg -q "connect-go" go.mod 2>/dev/null; then echo "ConnectRPC"; else echo "See dependencies"; fi`
- Issue context available: !`BRANCH=$(git branch --show-current 2>/dev/null); PROJECT=$(basename $(git rev-parse --show-toplevel 2>/dev/null || pwd)); if [ -f "/tmp/$PROJECT/$BRANCH-issue-context.md" ]; then echo "✓ Available"; else echo "✗ None"; fi`
- PLAN.md exists: !`if [ -f "PLAN.md" ]; then echo "✓ Available"; else echo "✗ None"; fi`
- CLAUDE.md exists: !`if [ -f "CLAUDE.md" ]; then echo "✓ Project-specific"; elif [ -f "$HOME/.claude/CLAUDE.md" ]; then echo "✓ Global only"; else echo "✗ None"; fi`

## Your Task

**IMMEDIATELY DEPLOY 8 PARALLEL CONTEXT-LOADING AGENTS** for ultra-fast comprehensive project context discovery: **$ARGUMENTS** (optional focus area)

Think deeply about comprehensive project context while maximizing parallel execution for 8x speedup.

**CRITICAL**: Launch ALL agents simultaneously in first response - NO sequential processing.

## Parallel Context Loading Framework

STEP 1: **LAUNCH ALL 8 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL PROCESSING** - Deploy these specialized context agents in parallel:

1. **Project Structure Agent**: Analyze build files, dependencies, project architecture, and technology stack
2. **Documentation Discovery Agent**: Load PLAN.md, CLAUDE.md, README.md, docs/ directories, and coordination files
3. **Git History & Branch Agent**: Analyze commits, branch patterns, issue context, and development workflow
4. **Environment & Services Agent**: Detect Docker services, database connections, port configurations, and external dependencies
5. **Testing Strategy Agent**: Identify test frameworks, coverage patterns, CI/CD setup, and testing workflows
6. **Development Commands Agent**: Extract deno.json tasks, package.json scripts, cargo commands, and build processes
7. **Configuration Analysis Agent**: Process .env files, config directories, deployment settings, and environment setup
8. **Integration Points Agent**: Find API endpoints, service mesh, external integrations, and coordination patterns

**Expected speedup**: 8x faster than sequential context loading.

STEP 2: Initialize Parallel Session Management

```json
// /tmp/auto-context-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "project": {
    "name": "detected_project_name",
    "path": "absolute_project_path",
    "language": "detected_language",
    "framework": "detected_framework",
    "type": "standalone|worktree|submodule|monorepo"
  },
  "context_sources": {
    "issue_context": "path_or_null",
    "plan_md": "boolean",
    "claude_md": "path_or_null",
    "coordination_files": ["list_of_files"],
    "documentation": ["discovered_docs"]
  },
  "loaded_context": {},
  "todos_generated": [],
  "phase": "parallel_loading"
}
```

STEP 3: Parallel Context Discovery & Analysis

**ALL AGENTS WORK CONCURRENTLY:**

**Context Discovery Execution:**

```bash
# Project structure and dependencies
fd . -t f -e json -e toml -e xml -e yaml -e txt | rg "(deno\.json|package\.json|Cargo\.toml|go\.mod|pom\.xml|requirements\.txt)"

# Documentation sources  
fd . -t f -e md | rg "(README|PLAN|CLAUDE|CONTRIBUTING|CHANGELOG)"

# Configuration and environment files
fd . -t f -e env -e conf -e yaml -e json | rg "(docker|config|env|settings)"

# Testing and build files
fd . -t f | rg "(test|spec|build|ci|Dockerfile)"
```

TRY:
Launch all 8 parallel agents for comprehensive context analysis
Execute concurrent discovery across all project aspects
Synthesize findings from all agent results
Generate intelligent todos based on discovered context
Update session state: phase = "context_loaded"

CATCH (agent_failures):
Continue with available agent results
Document failed context sources
Provide partial analysis with gaps identified
Generate basic setup todos for missing context

FINALLY:
Aggregate all parallel agent findings
Create comprehensive project understanding
Generate TodoWrite list based on discovered context and project state
Save context cache: `/tmp/auto-context-cache-$SESSION_ID.json`
Clean up temporary analysis files

STEP 4: **Parallel Results Synthesis**

WAIT for ALL 8 agents to complete context loading
AGGREGATE findings from all parallel streams:

- Project architecture and technology stack
- Complete documentation inventory
- Development workflow patterns
- Environment and service configurations
- Testing strategies and frameworks
- Available development commands
- Configuration and deployment setup
- Integration points and external dependencies

GENERATE intelligent todos based on discovered context:

- Issue-specific tasks (if branch context available)
- Coordination tasks (if worktree/multi-agent setup)
- Standard development setup (if main branch)
- Environment validation and setup tasks

## Context Loading Patterns

### Branch-Based Context Detection:

**Issue Branch Pattern** (`feature/123-description`, `fix/456-bug`):

- Load issue context from `/tmp/PROJECT/BRANCH-issue-context.md`
- Extract issue number, labels, and acceptance criteria
- Generate issue-specific todos and development focus
- Prioritize related documentation and test files

**Coordination Branch Pattern** (in worktree environment):

- Load coordination files from `/tmp/PROJECT/`
- Parse agent assignments and task distribution
- Check worktree status and parallel development state
- Generate coordination-specific todos

**Main Branch Development**:

- Focus on PLAN.md and general project documentation
- Load recent commit history for context
- Generate standard development workflow todos
- Prioritize project overview and setup tasks

### Documentation Priority Hierarchy:

1. **CLAUDE.md** (project-specific) - Highest priority development guidelines
2. **PLAN.md** - Multi-agent coordination and task breakdown
3. **Issue context files** - Branch-specific development requirements
4. **README.md** - General project overview and setup
5. **docs/** directory - Additional technical documentation
6. **.claude/** directory - Project-specific Claude configurations

### Environment Analysis:

**Development Command Extraction:**

- Deno projects: Extract from `deno.json` tasks
- Node.js projects: Extract from `package.json` scripts
- Rust projects: Use `cargo` commands
- Go projects: Use `go` toolchain commands
- Java projects: Use Maven/Gradle build tools

**Service Discovery:**

- Docker Compose services and port configurations
- Database connections and external dependencies
- API endpoints and service mesh configurations
- Development vs production environment differences

**Testing Strategy Detection:**

- Test framework identification (Jest, Vitest, Deno test, etc.)
- Test file patterns and coverage configuration
- Integration and E2E testing setup
- CI/CD pipeline integration points

## Advanced Context Loading Strategies

### High-Performance Context Discovery:

**ALWAYS use 8 parallel agents for optimal context loading speed:**

```yaml
**IMMEDIATELY DEPLOY 8 PARALLEL AGENTS** - NO conditional logic:

1. **Project Structure Agent**: Architecture, build config, technology stack
2. **Documentation Discovery Agent**: All docs, coordination files, READMEs  
3. **Git History & Branch Agent**: Commits, workflow patterns, issue context
4. **Environment & Services Agent**: Docker, databases, external dependencies
5. **Testing Strategy Agent**: Frameworks, coverage, CI/CD workflows
6. **Development Commands Agent**: Build scripts, task runners, dev tools
7. **Configuration Analysis Agent**: Environment setup, deployment configs
8. **Integration Points Agent**: APIs, service mesh, coordination patterns

**Expected speedup**: 8x faster than sequential context loading.
```

### State Management Schema:

**Session State Files:**

- `/tmp/auto-context-$SESSION_ID.json` - Main session state
- `/tmp/auto-context-workspace-$SESSION_ID/` - Analysis workspace
- `/tmp/auto-context-cache-$SESSION_ID.json` - Context cache for performance
- `/tmp/auto-context-todos-$SESSION_ID.json` - Generated todo analysis

**Context Loading Checkpoints:**

- `project_detected` - Basic project information extracted
- `sources_discovered` - All context sources identified
- `context_loaded` - Documentation and files processed
- `todos_generated` - Action items created
- `environment_validated` - Development setup verified

### Integration Patterns:

**Workflow Integration:**

- **Pre-development**: Run automatically at session start
- **Branch switching**: Re-run to update context for new branch
- **Coordination**: Integrate with worktree and multi-agent workflows
- **Documentation**: Keep context fresh with project evolution

**Command Composition:**

- **Before `/start`**: Ensures comprehensive project understanding
- **After `/new-worktree`**: Loads branch-specific context automatically
- **With `/plan`**: Provides context for strategic planning
- **Replaces**: Multiple manual `/context:*` command invocations

### Expected Performance & Outcomes:

**8x Performance Improvement:**

- **Sequential time**: 30-60 seconds for comprehensive context loading
- **Parallel time**: 5-8 seconds with 8 sub-agents
- **Speedup**: 8x faster through aggressive parallelization

**Immediate Project Orientation:**

- Complete project understanding in seconds, not minutes
- All development context loaded simultaneously
- Ready-to-use commands and environment setup
- Intelligent todo generation based on project state

**Enhanced Development Workflow:**

- Near-instantaneous context switching between projects
- Automatic multi-agent development coordination
- Intelligent environment conflict resolution
- Comprehensive documentation awareness

**Parallel Architecture Benefits:**

- **Token efficiency**: 40-60% reduction through focused agent contexts
- **Comprehensive coverage**: No missed context due to time constraints
- **Scalability**: Handles any project size with consistent performance
- **Reliability**: Graceful degradation if individual agents fail

The optimized context loader delivers **instant project comprehension** through high-performance parallel execution, transforming context loading from a slow sequential process into a lightning-fast intelligent analysis system.