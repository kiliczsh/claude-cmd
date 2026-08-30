---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(cargo:*)
name: "Context Load Rust Web"
description: "Load comprehensive Rust web development documentation context with project-specific optimization"
author: "wcygan"
tags: ["context","rust"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "session-$(date +%s)000000000"`
- Current directory: !`pwd`
- Rust projects: !`fd "Cargo\\.toml" . | head -5 || echo "No Rust projects found"`
- Axum usage: !`rg "axum" . --type rust | wc -l | tr -d ' ' || echo "0"`
- Tokio usage: !`rg "tokio" . --type rust | wc -l | tr -d ' ' || echo "0"`
- Web dependencies: !`rg "(axum|warp|actix-web|rocket)" . --type toml | head -5 || echo "No web frameworks found"`
- Database usage: !`rg "(sqlx|diesel|sea-orm)" . --type toml | head -3 || echo "No database crates found"`
- Test files: !`fd "*test*\\.rs$" . | head -5 || echo "No Rust test files found"`
- Technology stack: !`fd "(deno\\.json|package\\.json|go\\.mod)" . | head -3 || echo "Rust-only project"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/rust-web-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "rust_web_features_detected": []
  }
  ```

STEP 2: Project-specific context analysis

- ANALYZE project structure from Context section
- DETERMINE specific Rust web frameworks and crates in use
- IDENTIFY documentation priorities based on project needs

IF Rust projects with web framework usage found:

- FOCUS on project-specific framework patterns and async handling
- PRIORITIZE relevant HTTP handling and database integration patterns
- INCLUDE testing and deployment contexts
  ELSE:
- LOAD general Rust web development foundation
- EMPHASIZE getting-started guides and framework comparison
- INCLUDE project setup and basic HTTP server implementation

STEP 3: Strategic documentation loading

Think deeply about optimal documentation loading strategies for Rust web development ecosystems.

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by functional area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **Axum Web Framework**
   - URL: `https://docs.rs/axum/latest/axum/`
   - FETCH: Routing, handlers, extractors, middleware, response types
   - FOCUS: HTTP server patterns, request/response handling, async patterns
   - EXTRACT: Implementation examples and performance considerations

2. **Tokio Async Runtime**
   - URL: `https://docs.rs/tokio/latest/tokio/`
   - FETCH: Async runtime, tasks, I/O primitives, timers, synchronization
   - FOCUS: Async/await patterns, task spawning, resource management
   - EXTRACT: Concurrency patterns and performance optimization

3. **Serde Serialization Framework**
   - URL: `https://docs.rs/serde/latest/serde/`
   - FETCH: Derive macros, JSON handling, custom serializers/deserializers
   - FOCUS: API serialization, data validation, error handling
   - EXTRACT: JSON API patterns and custom type handling

4. **SQLx Database Toolkit**
   - URL: `https://docs.rs/sqlx/latest/sqlx/`
   - FETCH: Async queries, connection pools, migrations, compile-time verification
   - FOCUS: Database integration, query building, transaction management
   - EXTRACT: Type-safe database patterns and connection handling

5. **Tower Service Abstraction**
   - URL: `https://docs.rs/tower/latest/tower/`
   - FETCH: Service trait, middleware layers, timeouts, rate limiting
   - FOCUS: Middleware composition, service discovery, load balancing
   - EXTRACT: Composable service patterns and middleware development

6. **Tracing Observability Framework**
   - URL: `https://docs.rs/tracing/latest/tracing/`
   - FETCH: Structured logging, spans, events, subscribers, instrumentation
   - FOCUS: Application observability, debugging, performance monitoring
   - EXTRACT: Logging patterns and observability best practices

7. **Alternative Web Frameworks** (if detected):
   - **Warp**: `https://docs.rs/warp/latest/warp/` - Filter-based web framework
   - **Actix-web**: `https://docs.rs/actix-web/latest/actix_web/` - Actor-based web framework
   - **Rocket**: `https://docs.rs/rocket/latest/rocket/` - Type-safe web framework
   - FOCUS: Framework-specific patterns and migration strategies
   - EXTRACT: Comparative analysis and migration guidance

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and optimization

- ORGANIZE loaded context by functional area:
  - HTTP server setup and routing with Axum
  - Async request handling and tokio patterns
  - JSON API development with serde serialization
  - Database integration with SQLx and connection pooling
  - Middleware implementation and tower service composition
  - Error handling strategies and custom error types
  - Testing strategies for async web applications
  - Structured logging and observability with tracing
  - Performance optimization and profiling

- SYNTHESIZE project-specific guidance:
  - Integration with existing Rust codebase
  - Migration strategies from other web frameworks
  - Best practices for detected use cases
  - Security considerations for web applications

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/rust-web-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE project_context:
WHEN "existing_axum_service":

- PRIORITIZE: Advanced axum patterns, middleware optimization, testing
- FOCUS: Performance tuning, error handling, observability integration
- EXAMPLES: Custom extractors, middleware composition, async testing

WHEN "microservices_architecture":

- PRIORITIZE: Service communication, health checks, distributed tracing
- FOCUS: Tower services, load balancing, circuit breakers
- EXAMPLES: Service discovery, inter-service communication, monitoring

WHEN "rest_api_development":

- PRIORITIZE: API design, JSON handling, validation, documentation
- FOCUS: Serde patterns, error responses, API versioning
- EXAMPLES: CRUD operations, pagination, authentication

WHEN "new_rust_web_project":

- PRIORITIZE: Project setup, framework selection, basic patterns
- FOCUS: Getting started, routing basics, async fundamentals
- EXAMPLES: Hello world services, basic CRUD, testing setup

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Rust version compatibility
- VALIDATE code examples for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with current crate versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Rust Web Development:**

- Axum framework routing, handlers, and extractors
- Tokio async runtime patterns and task management
- Serde serialization for JSON APIs and data validation
- SQLx database integration with compile-time safety
- Tower middleware composition and service abstractions
- Tracing structured logging and observability patterns

**Advanced Implementation Techniques:**

- Custom middleware development and composition
- Error handling strategies and custom error types
- Async request/response processing patterns
- Database connection pooling and transaction management
- Performance optimization and profiling techniques
- Testing strategies for async web applications

**Project Integration:**

- Cargo workspace setup and dependency management
- Build system integration and deployment strategies
- Development workflow with cargo tools
- Testing framework integration and best practices
- Security configuration and authentication patterns
- Container deployment and orchestration

**Framework-Specific Expertise:**

- Axum vs Warp vs Actix-web vs Rocket comparison
- Migration strategies between web frameworks
- Framework-specific patterns and optimization techniques
- Integration with existing Rust ecosystem tools
- Performance benchmarking and optimization

The context loading adapts to your specific project structure and emphasizes the most relevant Rust web development documentation areas for your current development needs.