---
allowed-tools: WebFetch, mcp__context7__resolve-library-id, mcp__context7__get-library-docs, Bash(fd:*), Bash(rg:*), Bash(gdate:*), Bash(wc:*), Bash(git:*), Read, Write, Task
name: "Context Load Testing Rust"
description: "Load comprehensive Rust testing documentation with adaptive framework detection and project-specific optimization"
author: "wcygan"
tags: ["context","testing"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Rust files count: !`fd "\\.rs$" . | wc -l | tr -d ' ' || echo "0"`
- Test files count: !`fd "test" . -t f | wc -l | tr -d ' ' || echo "0"`
- Cargo.toml files: !`fd "(Cargo\\.toml)" . -d 3 | wc -l | tr -d ' ' || echo "0"`
- Standard tests: !`rg "#\\[test\\]" . --type rust | wc -l | tr -d ' ' || echo "0"`
- Async tests: !`rg "#\\[tokio::test\\]" . --type rust | wc -l | tr -d ' ' || echo "0"`
- Testcontainers usage: !`rg "testcontainers" . --type toml | wc -l | tr -d ' ' || echo "0"`
- Criterion benchmarks: !`rg "criterion" . --type toml | wc -l | tr -d ' ' || echo "0"`
- PropTest usage: !`rg "proptest" . --type toml | wc -l | tr -d ' ' || echo "0"`
- Mockall usage: !`rg "mockall" . --type toml | wc -l | tr -d ' ' || echo "0"`
- Workspace detection: !`rg "\\[workspace\\]" . --type toml | wc -l | tr -d ' ' || echo "0"`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "Yes" || echo "No"`

## Your Task

STEP 1: Initialize comprehensive testing context session

- CREATE session state file: `/tmp/rust-testing-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "$(date -Iseconds)",
    "phase": "initialization",
    "project_analysis": {
      "rust_files": "auto-detect",
      "test_files": "auto-detect",
      "testing_frameworks": [],
      "project_complexity": "unknown",
      "workspace_type": "unknown"
    },
    "documentation_targets": [],
    "context_loaded": {},
    "specialized_guidance": [],
    "checkpoints": []
  }
  ```
- ANALYZE project structure from Context section for testing framework detection

STEP 2: Project complexity analysis and testing framework detection

Think deeply about the optimal testing documentation loading strategy based on detected project characteristics.

- DETERMINE project complexity level:
  IF Rust files > 100 AND Test files > 20:
  - SET complexity = "enterprise"
  - ENABLE comprehensive testing documentation loading
    ELSE IF Rust files > 20 AND Test files > 5:
  - SET complexity = "moderate"
  - FOCUS on practical testing patterns and frameworks
    ELSE:
  - SET complexity = "basic"
  - PRIORITIZE fundamental testing concepts and simple patterns

- DETECT testing frameworks and patterns:
  - IF Async tests > 0: ADD "tokio-testing" to frameworks
  - IF Testcontainers > 0: ADD "integration-testing" to frameworks
  - IF Criterion > 0: ADD "benchmarking" to frameworks
  - IF PropTest > 0: ADD "property-testing" to frameworks
  - IF Mockall > 0: ADD "mocking" to frameworks
  - IF Workspace > 0: ADD "workspace-testing" to frameworks

STEP 3: Adaptive documentation loading with parallel sub-agent delegation

TRY:

CASE project_complexity:
WHEN "enterprise":

- LOAD comprehensive testing documentation using sub-agent parallel strategy:

  **Launch 6 parallel sub-agents for documentation gathering:**

  1. **Core Testing Agent**:
     - WebFetch: `https://doc.rust-lang.org/book/ch11-00-testing.html`
     - FOCUS: Unit tests, integration tests, documentation tests, test organization
     - Context7: resolve-library-id for "rust-test-patterns"

  2. **Async Testing Agent** (if async tests detected):
     - WebFetch: `https://docs.rs/tokio/latest/tokio/test/index.html`
     - FOCUS: async runtime testing, multi-threaded testing, time control
     - Context7: get-library-docs for tokio testing patterns

  3. **Integration Testing Agent** (if testcontainers detected):
     - WebFetch: `https://docs.rs/testcontainers/latest/testcontainers/`
     - FOCUS: database testing, service integration, container lifecycle
     - Context7: resolve-library-id for "testcontainers-rs"

  4. **Performance Testing Agent** (if criterion detected):
     - WebFetch: `https://docs.rs/criterion/latest/criterion/`
     - FOCUS: benchmarking, statistical analysis, performance regression testing
     - Context7: get-library-docs for criterion benchmarking

  5. **Property Testing Agent** (if proptest detected):
     - WebFetch: `https://docs.rs/proptest/latest/proptest/`
     - FOCUS: test generation, fuzzing, property verification
     - Context7: resolve-library-id for "proptest"

  6. **Mocking Agent** (if mockall detected):
     - WebFetch: `https://docs.rs/mockall/latest/mockall/`
     - FOCUS: dependency injection, mock creation, test isolation
     - Context7: get-library-docs for mockall patterns

  **Sub-Agent Coordination:**
  - Each agent works independently on their domain
  - Save findings to `/tmp/rust-testing-agent-$AGENT_ID-$SESSION_ID.json`
  - Main agent synthesizes all results into comprehensive context

WHEN "moderate":

- LOAD focused testing documentation:
  1. **Rust Testing Fundamentals**:
     - WebFetch: `https://doc.rust-lang.org/book/ch11-00-testing.html`
     - FOCUS: Test organization, assertion patterns, test configuration

  2. **Framework-Specific Documentation** (based on detected frameworks):
     - FOR EACH detected framework: LOAD specialized documentation
     - PRIORITIZE most commonly used frameworks in project

WHEN "basic":

- LOAD essential testing documentation:
  1. **Basic Testing Guide**:
     - WebFetch: `https://doc.rust-lang.org/book/ch11-00-testing.html`
     - FOCUS: Writing first tests, basic assertions, running tests

  2. **Testing Best Practices**:
     - Context7: resolve-library-id for "rust-testing-guide"
     - FOCUS: Test structure, naming conventions, common patterns

CATCH (documentation_fetch_failed):

- LOG failed sources to session state: `/tmp/rust-testing-context-$SESSION_ID.json`
- CONTINUE with available documentation sources
- PROVIDE manual context loading instructions for failed sources
- SAVE fallback documentation references and alternative URLs

STEP 4: Specialized testing guidance synthesis

- ORGANIZE loaded context by testing domains:
  - **Test Organization**: File structure, naming conventions, module organization
  - **Unit Testing**: Function testing, struct testing, trait testing
  - **Integration Testing**: Multi-module testing, external service integration
  - **Async Testing**: Tokio test patterns, async assertion strategies
  - **Performance Testing**: Benchmarking setup, regression detection
  - **Property Testing**: Test generation, input strategies, shrinking
  - **Mocking**: Dependency isolation, mock lifecycle, verification patterns

- SYNTHESIZE project-specific testing strategies:
  - Integration with existing Rust project architecture
  - Testing patterns adapted to detected frameworks
  - Performance considerations for test suite execution
  - CI/CD integration recommendations for detected testing tools

STEP 5: Advanced testing patterns and workspace considerations

IF workspace_detected:

- ADD workspace-specific testing documentation:
  - Cross-crate testing strategies
  - Shared test utilities and common patterns
  - Integration testing across workspace members
  - Test configuration inheritance and override patterns

- LOAD additional workspace testing context:
  - WebFetch: Rust workspace testing best practices
  - FOCUS: Multi-crate test organization, shared dependencies

STEP 6: Session state management and context completion

- UPDATE session state with comprehensive testing context summary
- SAVE context cache: `/tmp/rust-testing-context-cache-$SESSION_ID.json`
- CREATE testing strategy report: `/tmp/rust-testing-strategy-$SESSION_ID.md`
- MARK completion checkpoint with loaded documentation summary

FINALLY:

- ARCHIVE testing context session data for future reference
- PROVIDE comprehensive testing context summary with framework-specific guidance
- CLEAN UP temporary processing files: `/tmp/rust-testing-temp-$SESSION_ID-*`

## Testing Framework Integration Matrix

**Adaptive Context Loading Based on Detected Frameworks:**

```json
{
  "tokio-testing": {
    "priority": "high",
    "documentation": [
      "https://docs.rs/tokio/latest/tokio/test/",
      "async testing patterns",
      "multi-threaded async testing"
    ],
    "focus_areas": ["async runtime", "time control", "concurrent testing"]
  },
  "integration-testing": {
    "priority": "high",
    "documentation": [
      "https://docs.rs/testcontainers/latest/testcontainers/",
      "database integration patterns",
      "service testing strategies"
    ],
    "focus_areas": ["container lifecycle", "test isolation", "external dependencies"]
  },
  "benchmarking": {
    "priority": "medium",
    "documentation": [
      "https://docs.rs/criterion/latest/criterion/",
      "performance testing patterns",
      "statistical analysis"
    ],
    "focus_areas": ["benchmark setup", "regression detection", "performance CI"]
  },
  "property-testing": {
    "priority": "medium",
    "documentation": [
      "https://docs.rs/proptest/latest/proptest/",
      "fuzzing strategies",
      "property verification"
    ],
    "focus_areas": ["test generation", "input strategies", "shrinking algorithms"]
  },
  "mocking": {
    "priority": "medium",
    "documentation": [
      "https://docs.rs/mockall/latest/mockall/",
      "dependency injection patterns",
      "test double strategies"
    ],
    "focus_areas": ["mock creation", "verification patterns", "test isolation"]
  }
}
```

## Expected Outcome

After executing this command, you will have comprehensive, project-specific context on:

**Core Testing Fundamentals:**

- Unit test organization and structure patterns
- Integration test setup and configuration strategies
- Documentation test patterns and maintenance
- Test assertion strategies and custom assertion development
- Test configuration and environment management

**Framework-Specific Testing Patterns:**

- **Tokio Async Testing**: async test setup, runtime configuration, time control, concurrent test execution
- **Testcontainers Integration**: database testing, service integration, container lifecycle management
- **Criterion Benchmarking**: performance test setup, statistical analysis, regression detection
- **PropTest Property Testing**: test generation strategies, input shrinking, property verification
- **Mockall Mocking**: dependency injection, mock lifecycle, verification patterns

**Advanced Testing Strategies:**

- Test organization for large Rust projects and workspaces
- Cross-crate testing patterns and shared test utilities
- Performance optimization for test suite execution
- CI/CD integration with testing frameworks
- Test coverage analysis and reporting strategies

**Production Testing Considerations:**

- Testing strategies for async web services and APIs
- Database testing patterns with transactions and migrations
- Error handling testing and fault injection strategies
- Load testing and performance validation approaches
- Security testing patterns and vulnerability detection

The context loading adapts to your specific Rust project structure, detected testing frameworks, and emphasizes the most relevant testing documentation for your current development needs.

## Session State Management

**State Files Created:**

- `/tmp/rust-testing-context-$SESSION_ID.json` - Main session state and framework detection
- `/tmp/rust-testing-context-cache-$SESSION_ID.json` - Documentation cache and loading results
- `/tmp/rust-testing-strategy-$SESSION_ID.md` - Generated testing strategy report

**Enhanced State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "phase": "initialization|analysis|loading|synthesis|complete",
  "project_analysis": {
    "rust_files_count": "number",
    "test_files_count": "number",
    "workspace_type": "single|workspace|mixed",
    "project_complexity": "basic|moderate|enterprise",
    "detected_frameworks": {
      "tokio_testing": "boolean",
      "testcontainers": "boolean",
      "criterion": "boolean",
      "proptest": "boolean",
      "mockall": "boolean"
    }
  },
  "documentation_loaded": {
    "rust_testing_book": "loaded|failed|skipped",
    "tokio_testing": "loaded|failed|skipped",
    "testcontainers": "loaded|failed|skipped",
    "criterion": "loaded|failed|skipped",
    "proptest": "loaded|failed|skipped",
    "mockall": "loaded|failed|skipped"
  },
  "context_optimization": {
    "framework_specific_patterns": [],
    "project_integration_strategies": [],
    "performance_considerations": [],
    "workspace_testing_patterns": []
  },
  "testing_strategy": {
    "recommended_frameworks": [],
    "test_organization_pattern": "string",
    "ci_cd_integration": "recommendations",
    "performance_testing_approach": "strategy"
  },
  "checkpoints": {
    "analysis_complete": "boolean",
    "documentation_loaded": "boolean",
    "context_synthesized": "boolean",
    "strategy_generated": "boolean"
  }
}
```