---
allowed-tools: mcp__context7__resolve-library-id, mcp__context7__get-library-docs, WebFetch, Write, Bash(gdate:*), Read
name: "Context Load Postgres"
description: "Load comprehensive PostgreSQL documentation context with intelligent caching and state management"
author: "wcygan"
tags: ["context","db"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /context-load-postgres

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Database configs: !`fd "(database|db|postgres|pg)" --type f | head -10 || echo "No database configs found"`
- Environment files: !`fd "\.env" --type f | head -5 || echo "No environment files found"`
- Migration files: !`fd "(migration|migrate|schema)" --type d | head -5 || echo "No migration directories found"`
- PostgreSQL configs: !`fd "(postgresql\.conf|pg_hba\.conf)" --type f | head -5 || echo "No PostgreSQL configs found"`
- SQL files: !`fd "\.sql$" --type f | head -10 || echo "No SQL files found"`
- ORM configs: !`fd "(prisma|typeorm|sequelize|knex|diesel)" --type f | head -5 || echo "No ORM configs found"`

Load comprehensive documentation context for PostgreSQL database development.

## Your Task

STEP 1: Initialize Context Loading Session

- Create session state file: /tmp/postgres-context-$SESSION_ID.json
- Initialize context loading progress tracking
- Set up checkpoint system for resumable context loading
- Determine project-specific PostgreSQL requirements

STEP 2: Context7 PostgreSQL Documentation Loading

TRY:

- Use Context7 MCP server to resolve PostgreSQL library documentation
- Load core PostgreSQL documentation with focus on:
  - SQL reference and advanced features
  - Administration and configuration
  - Performance tuning and optimization
  - Extension development and usage
- Save checkpoint: context7_postgres_loaded

CATCH (context7_unavailable):

- Fallback to WebFetch tool for documentation gathering
- Document Context7 unavailability in session state
- Proceed with direct URL fetching approach

STEP 3: Comprehensive Documentation Gathering

FOR EACH documentation source:

- **PostgreSQL Documentation**: `https://www.postgresql.org/docs/current/`
  - Focus on: SQL reference, administration, performance tuning
- **PostgreSQL Tutorial**: `https://www.postgresql.org/docs/current/tutorial.html`
  - Focus on: getting started, basic concepts, advanced features
- **Performance Optimization**: `https://wiki.postgresql.org/wiki/Performance_Optimization`
  - Focus on: indexing, query optimization, configuration tuning
- **PostgreSQL Extensions**: `https://www.postgresql.org/docs/current/external-extensions.html`
  - Focus on: popular extensions, PostGIS, full-text search
- **Best Practices**: `https://wiki.postgresql.org/wiki/Don%27t_Do_This`
  - Focus on: common pitfalls, anti-patterns, recommendations

STEP 4: Project-Specific Context Enhancement

IF database configs detected:

- Analyze existing PostgreSQL configuration files
- Identify current version and extension usage
- Map database schema patterns and naming conventions
- Document performance bottlenecks and optimization opportunities

IF ORM configs detected:

- Load ORM-specific PostgreSQL integration patterns
- Analyze migration files for schema evolution patterns
- Identify query optimization opportunities within ORM context

STEP 5: Advanced PostgreSQL Context Loading

Think deeply about PostgreSQL architecture and optimization strategies.

**Priority Documentation Areas:**

- Advanced SQL features (CTEs, window functions, JSON operations)
- Indexing strategies (B-tree, GIN, GiST, SP-GiST, BRIN)
- Query optimization (EXPLAIN, pg_stat_statements, planner)
- Transaction management (isolation levels, locking, deadlocks)
- Backup and recovery (pg_dump, point-in-time recovery, streaming)
- Monitoring and maintenance (vacuum, analyze, autovacuum)
- Partitioning strategies (range, list, hash partitioning)
- Replication setup (streaming, logical, cascading)
- Extension usage (PostGIS, pg_stat_statements, pg_trgm)
- Security configuration (authentication, authorization, SSL)
- High availability (failover, load balancing, connection pooling)

STEP 6: Context Validation and Integration

TRY:

- Validate loaded documentation completeness
- Cross-reference project requirements with available context
- Generate project-specific PostgreSQL guidance summary
- Save checkpoint: context_validation_complete

CATCH (incomplete_context_loading):

- Document missing documentation sections
- Provide fallback guidance sources
- Create manual context loading instructions
- Save partial context state for incremental loading

CATCH (network_connectivity_issues):

- Use cached documentation if available
- Provide offline PostgreSQL reference materials
- Document connectivity limitations in session state
- Create alternative context loading strategy

FINALLY:

- Update PostgreSQL context session state
- Create context summary for current session
- Clean up temporary context files: /tmp/postgres-temp-$SESSION_ID-*
- Archive loaded context for future sessions

## State Management Structure

```json
// /tmp/postgres-context-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "context_sources": {
    "context7_available": true,
    "loaded_docs": [
      {
        "source": "postgresql_official_docs",
        "status": "loaded",
        "focus_areas": ["sql_reference", "administration", "performance"]
      }
    ],
    "failed_sources": [],
    "fallback_sources": []
  },
  "project_context": {
    "detected_version": "15.3",
    "extensions_used": ["pg_stat_statements", "postgis"],
    "orm_detected": "prisma",
    "migration_patterns": ["incremental", "versioned"]
  },
  "checkpoints": {
    "last_checkpoint": "context_validation_complete",
    "next_milestone": "expert_guidance_ready",
    "rollback_point": "context7_postgres_loaded"
  },
  "capabilities_loaded": [
    "advanced_sql_features",
    "indexing_strategies",
    "query_optimization",
    "performance_tuning",
    "replication_setup",
    "extension_usage",
    "security_best_practices",
    "backup_recovery"
  ]
}
```

## Expected Expert Capabilities

After successful context loading, Claude will provide expert guidance on:

- **Query Design**: Efficient PostgreSQL queries with advanced SQL features
- **Schema Design**: Optimal database schemas and normalization strategies
- **Index Optimization**: Strategic indexing for performance and storage efficiency
- **Performance Tuning**: Configuration optimization and query plan analysis
- **Replication**: Setup and management of streaming and logical replication
- **Extensions**: Integration and usage of PostgreSQL extensions ecosystem
- **Security**: Authentication, authorization, and data protection strategies
- **Operations**: Backup, recovery, monitoring, and maintenance procedures
- **Migration**: Safe schema evolution and data migration strategies
- **High Availability**: Failover, load balancing, and disaster recovery

## Session Isolation and Context Persistence

- Each context loading session maintains isolated state in /tmp/postgres-context-$SESSION_ID.json
- Checkpoint system enables resumable context loading for large documentation sets
- Context artifacts cached for subsequent sessions to improve loading performance
- Supports concurrent context loading sessions through unique session identifiers

## Usage Examples

```bash
# Basic PostgreSQL context loading
/context-load-postgres

# Context loading with specific focus (if extended)
/context-load-postgres performance-optimization
/context-load-postgres replication-setup
/context-load-postgres extension-development
```