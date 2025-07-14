---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(cargo:*), Task
name: "Context Load Rust Db"
description: "Load comprehensive Rust database documentation context with project-specific ORM optimization"
author: "wcygan"
tags: ["context","rust"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Rust projects: !`fd "Cargo\\.toml" . | head -5 || echo "No Rust projects found"`
- Database crates: !`rg "(sqlx|diesel|sea-orm|tokio-postgres|rusqlite)" . --type rust | wc -l | tr -d ' ' || echo "0"`
- SQL files: !`fd "\\.(sql|migration)$" . | head -5 || echo "No SQL files found"`
- Migration directories: !`fd "(migrations|migrate)" . -t d | head -3 || echo "No migration directories found"`
- Database configs: !`rg "(DATABASE_URL|DB_)" . --type toml | head -3 || echo "No database config found"`
- Async runtime: !`rg "(tokio|async-std)" . --type rust | head -3 || echo "No async runtime detected"`
- Technology stack: !`fd "(deno\\.json|package\\.json|go\\.mod)" . | head -3 || echo "Rust-only project"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/rust-db-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "rust_db_features_detected": []
  }
  ```

STEP 2: Project-specific context analysis

Think deeply about the optimal documentation loading strategy based on detected Rust database patterns.

- ANALYZE project structure from Context section
- DETERMINE specific database crates and patterns in use
- IDENTIFY documentation priorities based on project needs

IF Rust projects with database usage found:

- FOCUS on project-specific ORM patterns and async database operations
- PRIORITIZE relevant connection pooling, migration, and testing contexts
- INCLUDE deployment and performance optimization contexts
  ELSE:
- LOAD general Rust database foundation and getting-started guides
- EMPHASIZE ORM comparison, setup guides, and basic CRUD operations
- INCLUDE project setup and dependency management workflows

STEP 3: Strategic documentation loading with adaptive focus

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL with project-specific prompts
- PROCESS and organize information by functional area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **SQLx Async SQL Toolkit**
   - URL: `https://docs.rs/sqlx/latest/sqlx/`
   - FETCH: Compile-time checked queries, connection pooling, async operations
   - FOCUS: Type safety, query macros, connection management, migrations
   - EXTRACT: Async patterns, error handling, and performance optimization

2. **Diesel ORM Framework**
   - URL: `https://docs.rs/diesel/latest/diesel/`
   - FETCH: Schema-first ORM, query builder, associations, migrations
   - FOCUS: Schema definition, query DSL, relationship mapping, performance
   - EXTRACT: Code generation patterns, migration workflows, testing strategies

3. **SeaORM Active Record**
   - URL: `https://docs.rs/sea-orm/latest/sea_orm/`
   - FETCH: Entity-based ORM, active record pattern, relations, async support
   - FOCUS: Entity definition, relationship management, transaction handling
   - EXTRACT: Modern async patterns, entity relationships, migration strategies

4. **SQLx GitHub Documentation**
   - URL: `https://github.com/launchbadge/sqlx/blob/main/README.md`
   - FETCH: Getting started guides, examples, best practices, feature comparisons
   - FOCUS: Project setup, integration patterns, performance considerations
   - EXTRACT: Real-world usage patterns and integration examples

5. **Rust Database Ecosystem Overview**
   - URL: `https://lib.rs/database`
   - FETCH: Ecosystem overview, crate comparisons, community recommendations
   - FOCUS: Library selection, ecosystem maturity, integration patterns
   - EXTRACT: Decision frameworks for choosing database libraries

6. **Async Rust Programming Patterns**
   - URL: `https://rust-lang.github.io/async-book/`
   - FETCH: Async fundamentals for database operations
   - FOCUS: Connection pooling, concurrent queries, error handling
   - EXTRACT: Async best practices for database-heavy applications

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions for failed sources
- SAVE fallback documentation references and alternative sources

STEP 4: Context organization and synthesis

Think harder about optimal organization of database concepts for Rust development workflows.

- ORGANIZE loaded context by functional area:
  - Database connection management and pooling strategies
  - Query building and execution (compile-time vs runtime)
  - Type safety and compile-time SQL verification
  - Async database operations and connection management
  - Transaction handling and isolation levels
  - Migration systems and schema management
  - Error handling patterns and recovery strategies
  - Performance optimization and monitoring
  - Testing strategies for database code
  - Integration patterns with web frameworks

- SYNTHESIZE project-specific guidance:
  - Integration with detected async runtimes (Tokio/async-std)
  - Migration strategies between different ORMs
  - Best practices for detected database patterns
  - Security considerations for database operations
  - Performance tuning for identified usage patterns

STEP 5: Advanced context enhancement

IF complex database architecture detected:

- USE Task tool to delegate specialized context loading:
  - **Performance Optimization Agent**: Focus on connection pooling, query optimization
  - **Migration Strategy Agent**: Focus on schema management and deployment patterns
  - **Testing Patterns Agent**: Focus on database testing, mocking, integration tests
- COORDINATE findings for comprehensive database development guidance

STEP 6: Session state management and completion

- UPDATE session state with loaded context summary and specialization areas
- SAVE context cache: `/tmp/rust-db-context-cache-$SESSION_ID.json`
- CREATE context summary report with prioritized areas
- MARK completion checkpoint: context_loading_complete

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE comprehensive context loading summary
- CLEAN UP temporary session files: `/tmp/rust-db-temp-$SESSION_ID-*`

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE project_context:
WHEN "existing_rust_database_service":

- PRIORITIZE: ORM-specific advanced patterns, performance tuning, migration strategies
- FOCUS: Query optimization, connection pooling, production deployment patterns
- EXAMPLES: Complex query patterns, transaction management, monitoring integration

WHEN "microservices_with_database":

- PRIORITIZE: Connection pooling, service isolation, data consistency patterns
- FOCUS: Distributed transactions, connection management, service communication
- EXAMPLES: Database per service, event sourcing, CQRS patterns

WHEN "new_rust_database_project":

- PRIORITIZE: ORM selection guidance, project setup, basic CRUD operations
- FOCUS: Getting started, dependency management, basic patterns
- EXAMPLES: Simple CRUD services, basic migration setup, testing fundamentals

WHEN "database_migration_project":

- PRIORITIZE: Migration strategies, ORM comparison, compatibility patterns
- FOCUS: Schema migration, data migration, rollback procedures
- EXAMPLES: Zero-downtime migrations, database versioning, rollback strategies

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Rust Database Development:**

- SQLx compile-time SQL verification and async query execution
- Diesel schema-first ORM patterns and query builder usage
- SeaORM entity-based development and active record patterns
- Connection pooling strategies and async database operations
- Type-safe query building and error handling patterns
- Migration systems and schema management workflows

**Advanced Development Techniques:**

- Async database patterns with Tokio and async-std
- Transaction management and isolation level handling
- Performance optimization and connection pooling strategies
- Testing strategies including integration and unit testing
- Error handling patterns and recovery mechanisms
- Security patterns and SQL injection prevention

**Production Deployment:**

- Database configuration and environment management
- Performance monitoring and query optimization
- Connection pool tuning and resource management
- Migration deployment strategies and rollback procedures
- Security hardening and access pattern optimization
- Monitoring and observability integration

The context loading adapts to your specific Rust project structure and emphasizes the most relevant database documentation areas for your current development needs.