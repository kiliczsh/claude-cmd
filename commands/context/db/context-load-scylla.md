---
allowed-tools: mcp__context7__resolve-library-id, mcp__context7__get-library-docs, WebFetch, Write, Bash(gdate:*)
name: "Context Load Scylla"
description: "Load comprehensive ScyllaDB documentation context for development"
author: "wcygan"
tags: ["context","db"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Database configs: !`fd "(docker-compose|scylla|cassandra)" --max-depth 3 | head -5 || echo "No database configs found"`
- Existing Cassandra usage: !`rg "(cassandra|scylla|cql)" --type js --type ts --type go --type py | head -5 || echo "No Cassandra/ScyllaDB usage found"`
- Data modeling files: !`fd "(schema|model|migration)" --type f | head -5 || echo "No schema files found"`

## Your Task

STEP 1: Initialize Context Loading Session

- Create context session file: /tmp/scylla-context-$SESSION_ID.json
- Initialize documentation tracking and priority loading queue
- Set focus areas based on project context and detected patterns

STEP 2: Load Core ScyllaDB Documentation

TRY:

- Resolve ScyllaDB library ID using Context7 MCP server
- Load comprehensive documentation with focus on:
  - Data modeling principles and partition key design
  - CQL query language and optimization patterns
  - Performance tuning and cluster management
  - Monitoring, metrics, and operational best practices
    CATCH (context7_unavailable):
- Fallback to WebFetch for essential documentation URLs:
  - `https://docs.scylladb.com/stable/data-modeling/`
  - `https://docs.scylladb.com/stable/operating-scylla/`
  - `https://university.scylladb.com/courses/`

STEP 3: Focus Area Deep Dive

Load specialized context based on detected project needs:

IF Cassandra usage detected:

- Prioritize migration documentation and compatibility guides
- Load Cassandra vs ScyllaDB feature comparison
- Focus on performance optimization differences
- Emphasize driver configuration changes

ELSE IF Docker configs found:

- Emphasize container deployment and orchestration
- Load cluster configuration and scaling patterns
- Focus on monitoring and health check setup
- Document resource allocation best practices

ELSE IF schema files detected:

- Prioritize data modeling documentation
- Load partition key and clustering column strategies
- Focus on denormalization patterns and query optimization
- Emphasize compaction strategy selection

ELSE:

- Load general installation and configuration guidance
- Emphasize data modeling fundamentals
- Focus on CQL query patterns and performance

STEP 4: Synthesize Loaded Context

- Create actionable knowledge summary in context session file
- Organize by: data modeling, performance, operations, monitoring
- Highlight critical ScyllaDB-specific optimizations
- Document best practices and common anti-patterns

STEP 5: Validate Context Completeness

- Verify coverage of essential ScyllaDB concepts
- Ensure data modeling guidance is comprehensive
- Confirm performance optimization strategies are loaded
- Save context validation results to session state

## Expected Capabilities After Loading

Upon completion, you will provide expert guidance on:

- **Data Modeling**: Partition key design, clustering strategies, denormalization
- **Query Optimization**: CQL patterns, consistency levels, performance tuning
- **Cluster Operations**: Configuration, scaling, maintenance procedures
- **Monitoring**: Metrics collection, alerting, performance analysis
- **Driver Integration**: Connection patterns, error handling, best practices
- **Migration Planning**: Cassandra to ScyllaDB transition strategies
- **Performance Tuning**: Compaction, memory, I/O optimization

## Context Loading Priority

1. **High Priority**: Data modeling, CQL fundamentals, basic operations
2. **Medium Priority**: Performance tuning, cluster management, monitoring
3. **Low Priority**: Advanced features, specific integrations, troubleshooting

The goal is comprehensive ScyllaDB expertise enabling efficient NoSQL database design and high-performance distributed applications.