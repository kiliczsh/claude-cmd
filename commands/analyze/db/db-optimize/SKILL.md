---
allowed-tools: Bash(psql:*), Bash(mysql:*), Bash(mongosh:*), Bash(sqlite3:*), Read, Write, Task
name: "Db Optimize"
description: "Comprehensive database performance optimization with intelligent analysis and automated improvements"
author: "wcygan"
tags: ["analyze","db"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Database systems detected: !`(command -v psql >/dev/null && echo "PostgreSQL") || true; (command -v mysql >/dev/null && echo "MySQL") || true; (command -v mongosh >/dev/null && echo "MongoDB") || true; fd "\.(sqlite|db)$" . -t f | head -1 >/dev/null && echo "SQLite" || true`
- Docker services: !`docker-compose ps 2>/dev/null | rg "(postgres|mysql|mongo)" | head -5 || echo "No database containers running"`
- Database configs: !`fd "(\.env|docker-compose\.yml|database\.yml)" . -t f | head -5 || echo "No database config files found"`
- Environment variables: !`env | rg "DATABASE_URL|DB_" | cut -d'=' -f1 || echo "No database env vars"`
- Project type: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml)" . -t f -d 1 | head -1 | xargs basename 2>/dev/null || echo "Unknown"`

## Your Task

**CRITICAL: Deploy 9-12 parallel sub-agents IMMEDIATELY for ultra-fast database optimization. Sequential analysis is OBSOLETE.**

Perform comprehensive database performance optimization for $ARGUMENTS using 9-12x faster parallel analysis.

**Expected speedup: 9-12x faster than traditional sequential optimization.**

STEP 1: Instant Parallel Database Discovery and Analysis

**IMMEDIATELY LAUNCH 10 PARALLEL AGENTS** for comprehensive database system discovery:

[Deploy all agents in single response - NO sequential execution]

- **Agent 1: Connection Discovery**: Find all database connections, test connectivity, gather credentials
- **Agent 2: Schema Analyzer**: Map all tables, views, materialized views, indexes, constraints
- **Agent 3: Query Performance Scanner**: Identify slow queries, missing indexes, N+1 problems
- **Agent 4: Configuration Auditor**: Analyze database settings, memory allocation, connection pools
- **Agent 5: Storage Optimizer**: Check table sizes, bloat, fragmentation, partition opportunities
- **Agent 6: Statistics Analyzer**: Review table statistics, histogram accuracy, cardinality estimates
- **Agent 7: Lock & Concurrency Detector**: Find blocking queries, deadlocks, lock contention
- **Agent 8: Replication & Backup Auditor**: Check lag, backup schedules, recovery readiness
- **Agent 9: Security Scanner**: Analyze permissions, exposed data, encryption status
- **Agent 10: Monitoring Gap Finder**: Identify missing metrics, alerts, performance baselines

**CRITICAL: All agents execute simultaneously. Zero waiting between agent launches.**

STEP 2: Database-Specific Deep Optimization (Parallel)

IF PostgreSQL detected:
**SPAWN 10 SPECIALIZED POSTGRES AGENTS NOW**:

- **PG-Agent-1**: Analyze pg_stat_statements for query patterns
- **PG-Agent-2**: Optimize autovacuum settings and bloat
- **PG-Agent-3**: Index usage analysis with pg_stat_user_indexes
- **PG-Agent-4**: Connection pool and pgbouncer optimization
- **PG-Agent-5**: Partition strategy recommendations
- **PG-Agent-6**: WAL and checkpoint tuning
- **PG-Agent-7**: Extension usage optimization (pg_stat_statements, etc.)
- **PG-Agent-8**: Query plan analysis for top queries
- **PG-Agent-9**: Memory settings optimization (shared_buffers, work_mem)
- **PG-Agent-10**: Parallel query execution tuning

IF MySQL/MariaDB detected:
**LAUNCH 10 MYSQL OPTIMIZATION AGENTS**:

- **MySQL-Agent-1**: InnoDB buffer pool optimization
- **MySQL-Agent-2**: Query cache and performance schema analysis
- **MySQL-Agent-3**: Index cardinality and selectivity analysis
- **MySQL-Agent-4**: Binary log and replication optimization
- **MySQL-Agent-5**: Thread pool and connection handling
- **MySQL-Agent-6**: Temporary table and sort buffer tuning
- **MySQL-Agent-7**: Partition pruning opportunities
- **MySQL-Agent-8**: Storage engine optimization
- **MySQL-Agent-9**: Join buffer and query optimizer hints
- **MySQL-Agent-10**: Slow query log deep analysis

IF MongoDB detected:
**DEPLOY 10 MONGODB SPECIALISTS**:

- **Mongo-Agent-1**: Collection scan elimination
- **Mongo-Agent-2**: Index intersection opportunities
- **Mongo-Agent-3**: Aggregation pipeline optimization
- **Mongo-Agent-4**: Working set size analysis
- **Mongo-Agent-5**: Shard key effectiveness
- **Mongo-Agent-6**: WiredTiger cache optimization
- **Mongo-Agent-7**: Read preference and write concern tuning
- **Mongo-Agent-8**: Connection pool sizing
- **Mongo-Agent-9**: Profiler data deep analysis
- **Mongo-Agent-10**: Replica set configuration optimization

**CRITICAL: Database-specific agents run in parallel with discovery agents. Total 20+ agents working simultaneously.**

STEP 3: Parallel Risk Assessment and Optimization Strategy

**DEPLOY 12 RISK ASSESSMENT AGENTS IMMEDIATELY**:

[All agents launch simultaneously for instant comprehensive analysis]

- **Risk-Agent-1**: Production impact analyzer - downtime requirements, business hours
- **Risk-Agent-2**: Data integrity validator - constraint violations, data loss risks
- **Risk-Agent-3**: Performance regression detector - identify potential slowdowns
- **Risk-Agent-4**: Rollback strategy planner - create instant recovery procedures
- **Risk-Agent-5**: Index impact calculator - write performance vs read gains
- **Risk-Agent-6**: Memory pressure analyzer - resource competition risks
- **Risk-Agent-7**: Replication lag predictor - impact on read replicas
- **Risk-Agent-8**: Lock escalation analyzer - concurrency impact assessment
- **Risk-Agent-9**: Cost-benefit analyzer - implementation effort vs gains
- **Risk-Agent-10**: Dependency mapper - application code impact analysis
- **Risk-Agent-11**: Maintenance window optimizer - minimal disruption scheduling
- **Risk-Agent-12**: Compliance checker - regulatory and audit requirements

**CRITICAL: Risk assessment happens in parallel with optimization discovery. No sequential delays.**

STEP 4: Parallel Implementation Orchestration

**LAUNCH 10 IMPLEMENTATION AGENTS FOR SAFE PARALLEL EXECUTION**:

[Coordinate parallel but safe implementation]

- **Impl-Agent-1**: Online index creator - CREATE INDEX CONCURRENTLY coordinator
- **Impl-Agent-2**: Statistics updater - ANALYZE and histogram refresher
- **Impl-Agent-3**: Configuration optimizer - parameter tuning with restart coordination
- **Impl-Agent-4**: Partition manager - online partition creation and management
- **Impl-Agent-5**: Vacuum coordinator - bloat removal without blocking
- **Impl-Agent-6**: Cache warmer - preload critical data after changes
- **Impl-Agent-7**: Connection pool tuner - dynamic pool sizing
- **Impl-Agent-8**: Query hint injector - optimizer hint deployment
- **Impl-Agent-9**: Monitoring enabler - activate performance tracking
- **Impl-Agent-10**: Rollback guardian - continuous validation and instant rollback

**Session state tracking for coordinated implementation:**

```json
{
  "implementationPhase": "indexing|statistics|configuration|validation",
  "parallelOperations": ["index_users_email", "analyze_orders", "vacuum_products"],
  "completedOperations": [],
  "rollbackQueue": [],
  "performanceBaseline": {}
}
```

STEP 5: Real-time Validation Network

**SPAWN 10 VALIDATION AGENTS FOR CONTINUOUS MONITORING**:

- **Validation-Agent-1**: Query performance comparator - before/after analysis
- **Validation-Agent-2**: Index usage verifier - confirm optimizer adoption
- **Validation-Agent-3**: Resource utilization monitor - CPU/memory/IO tracking
- **Validation-Agent-4**: Error rate analyzer - detect new failures
- **Validation-Agent-5**: Connection pool monitor - saturation detection
- **Validation-Agent-6**: Replication health checker - lag monitoring
- **Validation-Agent-7**: Lock contention tracker - deadlock detection
- **Validation-Agent-8**: Cache hit rate analyzer - efficiency validation
- **Validation-Agent-9**: Transaction throughput meter - TPS comparison
- **Validation-Agent-10**: Application latency tracker - end-user impact

**CRITICAL: Validation agents run continuously during implementation. Real-time feedback loop.**

STEP 6: Parallel Monitoring Infrastructure Deployment

**INSTANTLY DEPLOY 10 MONITORING SETUP AGENTS**:

[All monitoring agents work simultaneously]

- **Monitor-Agent-1**: Query performance dashboard generator - real-time slow query tracking
- **Monitor-Agent-2**: Resource utilization alerting - CPU/memory/disk thresholds
- **Monitor-Agent-3**: Replication monitoring setup - lag alerts and health checks
- **Monitor-Agent-4**: Lock monitoring framework - deadlock detection and alerting
- **Monitor-Agent-5**: Index effectiveness tracker - usage patterns and efficiency
- **Monitor-Agent-6**: Connection pool analyzer - saturation and timeout tracking
- **Monitor-Agent-7**: Cache performance monitor - hit rates and eviction patterns
- **Monitor-Agent-8**: Capacity planning analyzer - growth trends and forecasting
- **Monitor-Agent-9**: Anomaly detection setup - baseline deviation alerts
- **Monitor-Agent-10**: Automated maintenance scheduler - vacuum, analyze, optimize

**CRITICAL: Complete monitoring infrastructure deployed in parallel. 10x faster setup.**

STEP 7: Comprehensive Optimization Report Generation

**DEPLOY FINAL 8 REPORTING AGENTS FOR INSTANT DOCUMENTATION**:

- **Report-Agent-1**: Executive summary generator - ROI and performance gains
- **Report-Agent-2**: Technical deep-dive documenter - implementation details
- **Report-Agent-3**: Before/after comparator - metrics and benchmarks
- **Report-Agent-4**: Rollback procedure compiler - emergency response guide
- **Report-Agent-5**: Future optimization roadmap - next steps and recommendations
- **Report-Agent-6**: Monitoring guide creator - dashboard and alert documentation
- **Report-Agent-7**: Maintenance schedule generator - automated task calendar
- **Report-Agent-8**: Knowledge base updater - lessons learned and best practices

**Performance Metrics Summary:**

- **Analysis Speed**: 9-12x faster with 52+ parallel agents
- **Coverage**: 100% of database aspects analyzed simultaneously
- **Implementation Safety**: Parallel execution with coordinated rollback
- **Time to Value**: Minutes instead of hours for complete optimization
- **Ongoing Monitoring**: Automated infrastructure deployed instantly

STEP 8: State Management and Session Completion

```json
// /tmp/db-optimize-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "executionModel": "PARALLEL_52_AGENTS",
  "performanceMetrics": {
    "analysisSpeedup": "12x",
    "totalAgentsDeployed": 52,
    "parallelPhases": 8,
    "timeToComplete": "5-8 minutes",
    "sequentialEstimate": "60-90 minutes"
  },
  "phase": "discovery|analysis|optimization|validation|monitoring|complete",
  "parallelAgentGroups": {
    "discovery": {
      "agents": 10,
      "status": "complete",
      "findings": ["postgresql", "mysql", "mongodb", "redis", "elasticsearch"]
    },
    "databaseSpecific": {
      "postgresql": { "agents": 10, "optimizations": 15 },
      "mysql": { "agents": 10, "optimizations": 12 },
      "mongodb": { "agents": 10, "optimizations": 8 }
    },
    "riskAssessment": {
      "agents": 12,
      "criticalRisks": 0,
      "mediumRisks": 3,
      "lowRisks": 25
    },
    "implementation": {
      "agents": 10,
      "parallelOperations": ["index_creation", "statistics_update", "config_tuning"],
      "safetyChecks": "continuous"
    },
    "validation": {
      "agents": 10,
      "metricsTracked": 50,
      "performanceGain": "285%"
    },
    "monitoring": {
      "agents": 10,
      "dashboardsCreated": 5,
      "alertsConfigured": 25
    },
    "reporting": {
      "agents": 8,
      "documentsGenerated": 12
    }
  },
  "optimizationResults": {
    "indexesCreated": 23,
    "configChanges": 45,
    "performanceImprovement": "285%",
    "querySpeedup": "15x average, 50x best case",
    "riskLevel": "low",
    "downtime": "zero (online operations)",
    "rollbackCapability": "instant"
  },
  "parallelRecommendations": {
    "immediate": [
      "Deploy 10 agents for index creation",
      "Launch 5 agents for statistics updates",
      "Spawn 8 agents for cache warming"
    ],
    "scheduled": [
      "Parallel VACUUM on 10 tables",
      "Distributed statistics refresh",
      "Concurrent partition maintenance"
    ],
    "monitoring": [
      "Real-time query analysis grid",
      "Distributed lock monitoring",
      "Parallel performance tracking"
    ],
    "nextOptimization": [
      "Shard key optimization (10 agents)",
      "Read replica deployment (8 agents)",
      "Query parallelization (12 agents)"
    ]
  },
  "coordinationState": {
    "agentSynchronization": "lock-free",
    "conflictResolution": "automatic",
    "rollbackCoordination": "distributed consensus"
  },
  "checkpoints": {
    "parallel_discovery": true,
    "multi_db_analysis": true,
    "risk_assessment": true,
    "safe_implementation": true,
    "continuous_validation": true,
    "monitoring_deployed": true,
    "reports_generated": true
  }
}
```

FINALLY:

- Update session state: phase = "complete" with all 52 agents synchronized
- Consolidate parallel agent findings into unified optimization report
- Archive parallel execution metrics demonstrating 9-12x speedup
- Clean up agent coordination files: /tmp/db-optimize-agent-*-$SESSION_ID
- Synthesize next-phase parallel optimization opportunities
- Document parallel execution patterns for future optimization cycles

**CRITICAL SUCCESS METRICS:**

- **Total Execution Time**: 5-8 minutes (vs 60-90 minutes sequential)
- **Parallel Agents Deployed**: 52+ specialized optimization agents
- **Coverage**: 100% database aspects analyzed simultaneously
- **Performance Gain**: 285% average query performance improvement
- **Safety**: Zero-downtime implementation with instant rollback
- **Automation**: Complete monitoring infrastructure deployed in parallel

**This parallel approach transforms database optimization from hours-long sequential analysis to minutes-long comprehensive optimization with superior results.**