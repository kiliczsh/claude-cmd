---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(cargo:*)
name: "Context Load Rust Async"
description: "Load comprehensive Rust async programming context with project-specific optimization"
author: "wcygan"
tags: ["context","rust"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Rust projects: !`fd "Cargo\.toml" . | head -5 || echo "No Rust projects found"`
- Async usage: !`rg "tokio|async|futures|await" . --type rust | wc -l | tr -d ' ' || echo "0"`
- Async dependencies: !`rg "tokio|async-std|futures" . -A 1 -B 1 | head -10 || echo "No async dependencies found"`
- Rust edition: !`rg "edition.*=.*\"202" . --type toml | head -3 || echo "No edition info found"`
- Async frameworks: !`rg "actix|warp|axum|tower|hyper" . --type rust --type toml | head -5 || echo "No web frameworks found"`
- Technology stack: !`fd "(deno\.json|package\.json|go\.mod)" . | head -3 || echo "Rust-focused project"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/rust-async-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "async_patterns_detected": []
  }
  ```

STEP 2: Project-specific async context analysis

- ANALYZE Rust project structure from Context section
- DETERMINE specific async patterns and frameworks in use
- IDENTIFY documentation priorities based on project needs

IF Rust projects with async usage found:

- FOCUS on project-specific async patterns and implementations
- PRIORITIZE relevant async runtime and framework documentation
- INCLUDE performance optimization and debugging contexts
  ELSE:
- LOAD foundational async programming concepts and getting-started guides
- EMPHASIZE async/await fundamentals and basic patterns
- INCLUDE project setup and async runtime selection

STEP 3: Strategic documentation loading with extended thinking

- Think deeply about optimal async programming patterns for the detected project structure
- Consider performance implications and concurrent execution strategies

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by async programming domain
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **Tokio Runtime Documentation**
   - URL: `https://docs.rs/tokio/latest/tokio/`
   - FETCH: Runtime configuration, task management, spawning patterns
   - FOCUS: Runtime builder, task spawn, join handles, select! macro
   - EXTRACT: Performance optimization and debugging techniques

2. **Futures Crate Comprehensive Guide**
   - URL: `https://docs.rs/futures/latest/futures/`
   - FETCH: Future trait implementation, Stream processing, combinators
   - FOCUS: Custom futures, stream utilities, async trait patterns
   - EXTRACT: Advanced async composition and error handling

3. **Async-std Alternative Runtime**
   - URL: `https://docs.rs/async-std/latest/async_std/`
   - FETCH: Alternative async runtime patterns, filesystem, networking
   - FOCUS: Cross-platform async I/O, task spawning alternatives
   - EXTRACT: Runtime comparison and migration patterns

4. **The Async Book - Comprehensive Theory**
   - URL: `https://rust-lang.github.io/async-book/`
   - FETCH: Fundamental async concepts, pinning, executors, wake mechanism
   - FOCUS: Deep async internals, custom executor implementation
   - EXTRACT: Advanced async patterns and performance optimization

5. **Tokio Tutorial - Practical Implementation**
   - URL: `https://tokio.rs/tokio/tutorial`
   - FETCH: Hands-on examples, real-world patterns, best practices
   - FOCUS: Practical async application development
   - EXTRACT: Common patterns and production-ready implementations

6. **Async Channels and Synchronization**
   - URL: `https://docs.rs/tokio/latest/tokio/sync/index.html`
   - FETCH: Async synchronization primitives, channels, locks
   - FOCUS: mpsc, oneshot, broadcast channels, Mutex, RwLock
   - EXTRACT: Concurrent data sharing and communication patterns

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and synthesis

- ORGANIZE loaded context by async programming domains:
  - **Fundamentals**: async/await syntax, Future trait, execution model
  - **Runtime Management**: Tokio vs async-std, runtime configuration
  - **Task Coordination**: Spawning, joining, cancellation, timeouts
  - **Data Flow**: Streams, async iterators, backpressure handling
  - **Synchronization**: Channels, locks, atomic operations, barriers
  - **Error Handling**: Result propagation, panic handling, recovery
  - **Performance**: Profiling, optimization, memory management
  - **Testing**: Async test patterns, mocking, integration testing

- SYNTHESIZE project-specific guidance:
  - Integration with existing Rust codebase architecture
  - Migration strategies from sync to async code
  - Best practices for detected async patterns
  - Performance considerations for specific use cases

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/rust-async-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary with key focus areas
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE project_context:
WHEN "existing_async_rust_services":

- PRIORITIZE: Advanced async patterns, performance optimization, debugging
- FOCUS: Custom futures, stream processing, concurrency patterns
- EXAMPLES: Complex async compositions, backpressure handling

WHEN "sync_to_async_migration":

- PRIORITIZE: Migration strategies, compatibility patterns, incremental adoption
- FOCUS: Async trait conversion, blocking code integration
- EXAMPLES: Gradual async adoption, bridge patterns

WHEN "new_async_project":

- PRIORITIZE: Fundamentals, runtime selection, basic patterns
- FOCUS: async/await syntax, task spawning, error handling
- EXAMPLES: Simple async applications, common patterns

WHEN "web_framework_development":

- PRIORITIZE: HTTP async patterns, middleware, request handling
- FOCUS: Axum, Warp, Actix integration patterns
- EXAMPLES: Async web services, middleware composition

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Rust version compatibility
- VALIDATE async patterns for current async ecosystem
- CHECK for deprecated APIs and migration paths
- ENSURE performance best practices are highlighted
- CONFIRM examples work with current Tokio/async-std versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Async Fundamentals:**

- async/await syntax and execution model
- Future trait implementation and custom futures
- Stream trait and async iteration patterns
- Task spawning, joining, and lifecycle management
- Runtime selection and configuration (Tokio vs async-std)

**Advanced Async Techniques:**

- Custom async types and trait implementations
- Pinning and unsafe async patterns
- Executor internals and wake mechanism
- Zero-cost async abstractions
- Async trait objects and dynamic dispatch

**Practical Async Development:**

- Async channels (mpsc, oneshot, broadcast)
- Synchronization primitives (Mutex, RwLock, Semaphore)
- select! macro for concurrent operations
- Cancellation and timeout patterns
- Error handling and propagation strategies

**Performance and Debugging:**

- Async profiling and performance analysis
- Memory usage optimization
- Debugging async applications and deadlocks
- Testing strategies for async code
- Production monitoring and observability

**Integration Patterns:**

- Web framework integration (Axum, Warp, Actix)
- Database async patterns (sqlx, diesel-async)
- File system and networking async I/O
- Async trait composition and middleware patterns
- Cross-runtime compatibility and migration

The context loading adapts to your specific Rust project structure and emphasizes the most relevant async programming documentation areas for your current development needs.

## Session State Management

**State Files Created:**

- `/tmp/rust-async-context-$SESSION_ID.json` - Main session state
- `/tmp/rust-async-context-cache-$SESSION_ID.json` - Documentation cache
- `/tmp/rust-async-patterns-$SESSION_ID.json` - Detected patterns and recommendations

**Enhanced State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "phase": "discovery|loading|synthesis|complete",
  "project_analysis": {
    "rust_projects_count": "number",
    "async_usage_lines": "number",
    "detected_frameworks": ["tokio", "async-std", "actix"],
    "rust_edition": "2021",
    "complexity_level": "basic|intermediate|advanced"
  },
  "documentation_loaded": {
    "tokio_runtime": "loaded|failed|skipped",
    "futures_crate": "loaded|failed|skipped",
    "async_std": "loaded|failed|skipped",
    "async_book": "loaded|failed|skipped",
    "tokio_tutorial": "loaded|failed|skipped",
    "sync_primitives": "loaded|failed|skipped"
  },
  "focus_areas": [
    "fundamentals",
    "runtime_management",
    "task_coordination",
    "data_flow",
    "synchronization",
    "error_handling",
    "performance",
    "testing"
  ],
  "context_optimization": {
    "project_specific_patterns": [],
    "migration_guidance": [],
    "performance_considerations": [],
    "debugging_strategies": []
  },
  "checkpoints": {
    "discovery_complete": "boolean",
    "documentation_loaded": "boolean",
    "context_synthesized": "boolean",
    "session_archived": "boolean"
  }
}
```