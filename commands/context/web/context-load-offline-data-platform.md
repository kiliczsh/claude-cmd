---
allowed-tools: mcp__context7__resolve-library-id, mcp__context7__get-library-docs, WebFetch, Task, Read, Write, Bash(gdate:*), Bash(fd:*), Bash(rg:*), Bash(kubectl:*), Bash(jq:*), Bash(wc:*)
name: "Context Load Offline Data Platform"
description: "Load comprehensive lakehouse architecture context with parallel documentation loading and project-specific optimization"
author: "wcygan"
tags: ["context","web"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /context-load-offline-data-platform

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Current directory: !`pwd`
- Project structure: !`fd . -t d -d 3 | head -10 || echo "No directories found"`
- Kubernetes manifests: !`fd "\.(yaml|yml)$" . | rg -l "(kind:|apiVersion:)" | wc -l | tr -d ' ' || echo "0"`
- Data platform indicators: !`fd "(trino|iceberg|nessie|spark|airflow|ceph)" . -i | head -5 || echo "No data platform files detected"`
- Helm charts: !`fd "Chart.yaml" . | wc -l | tr -d ' ' || echo "0"`
- Docker compose files: !`fd "(docker-compose|compose)\.(yml|yaml)$" . | wc -l | tr -d ' ' || echo "0"`
- Configuration files: !`fd "\.(toml|json|conf|properties)$" . | head -5 || echo "No config files"`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "Yes" || echo "No"`

## Your Task

STEP 1: Initialize comprehensive lakehouse documentation loading session

- VALIDATE required tools availability (fd, rg, git, jq)
- CREATE session state file: `/tmp/context-lakehouse-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "initialization",
    "project_context": "auto-detect",
    "documentation_sources": {
      "trino": { "status": "pending", "method": "unknown" },
      "iceberg": { "status": "pending", "method": "unknown" },
      "nessie": { "status": "pending", "method": "unknown" },
      "spark": { "status": "pending", "method": "unknown" },
      "airflow": { "status": "pending", "method": "unknown" },
      "rook_ceph": { "status": "pending", "method": "unknown" }
    },
    "context_loaded": {},
    "completion_status": "in_progress"
  }
  ```
- ANALYZE project context from detected files and structure

STEP 2: Project-specific context analysis and optimization strategy

Think deeply about the optimal documentation loading strategy based on the detected project characteristics and infrastructure.

- IF Kubernetes manifests > 0:
  - PRIORITIZE Kubernetes-native deployment patterns
  - FOCUS on operator-based installations and configurations
  - EMPHASIZE cloud-native storage and networking considerations
- IF Docker compose files > 0:
  - PRIORITIZE container-based local development setups
  - FOCUS on service orchestration and networking
  - EMPHASIZE development workflow optimizations
- ELSE:
  - PROVIDE general lakehouse architecture guidance
  - FOCUS on deployment flexibility and technology selection

STEP 3: Context7 availability detection and method selection

TRY:

- TEST Context7 MCP server availability by attempting to resolve a library ID
- UPDATE session state with detection results

IF Context7 available:

- SET documentation_method = "context7_mcp"
- EXECUTE parallel Context7 documentation loading:
  1. **Trino Agent**: Load Trino distributed SQL documentation
  2. **Iceberg Agent**: Load Apache Iceberg table format documentation
  3. **Nessie Agent**: Load Nessie catalog version control documentation
  4. **Spark Agent**: Load Apache Spark on Kubernetes documentation
  5. **Airflow Agent**: Load Apache Airflow orchestration documentation
  6. **Ceph Agent**: Load Rook Ceph storage documentation

ELSE:

- SET documentation_method = "webfetch_fallback"
- EXECUTE parallel WebFetch documentation loading with Task tool:
  1. **Trino Documentation Agent**: `https://trino.io/docs/current/`
     - FOCUS: cluster configuration, query optimization, connector setup, performance tuning
  2. **Apache Iceberg Agent**: `https://iceberg.apache.org/docs/latest/`
     - FOCUS: table format, partitioning, schema evolution, catalog management
  3. **Nessie Agent**: `https://projectnessie.org/docs/`
     - FOCUS: version control concepts, branching strategies, catalog integration
  4. **Apache Spark K8s Agent**: `https://spark.apache.org/docs/latest/running-on-kubernetes.html`
     - FOCUS: operator deployment, job submission, resource management
  5. **Apache Airflow Agent**: `https://airflow.apache.org/docs/apache-airflow/stable/`
     - FOCUS: KubernetesExecutor, DAG design, operator usage, monitoring
  6. **Rook Ceph Agent**: `https://rook.io/docs/rook/latest-release/Storage-Configuration/Object-Storage-RGW/object-storage/`
     - FOCUS: S3-compatible object storage, bucket policies, performance tuning, multi-site replication

CATCH (context7_unavailable OR webfetch_network_error OR tool_availability_error):

- LOG error details to session state
- PROVIDE comprehensive internal knowledge fallback
- SAVE offline documentation recommendations to `/tmp/context-lakehouse-$SESSION_ID-offline.md`
- CONTINUE with available information and graceful degradation

STEP 4: Parallel documentation synthesis and organization

- COORDINATE findings from all documentation loading agents
- ORGANIZE context by architectural layers:
  - **Compute Layer**: Trino distributed SQL and Spark processing
  - **Storage Layer**: Apache Iceberg table format and Rook Ceph object storage
  - **Catalog Layer**: Nessie version control and metadata management
  - **Orchestration Layer**: Apache Airflow workflow management
  - **Infrastructure Layer**: Kubernetes deployment and networking

STEP 5: Project-specific context synthesis and recommendations

Think harder about lakehouse implementation strategies based on detected project context and infrastructure patterns.

- SYNTHESIZE project-specific recommendations:
  - Integration with existing Kubernetes infrastructure
  - Optimal resource allocation and scaling strategies
  - Security and networking considerations
  - Monitoring and observability patterns
  - Data governance and compliance frameworks

STEP 6: Comprehensive context integration with extended thinking

- PRIORITIZE documentation sections based on project context:
  - **Distributed SQL Optimization**: Trino cost-based optimization, partition pruning, predicate pushdown
  - **Table Management**: Iceberg snapshots, time travel, compaction strategies, schema evolution
  - **Version Control Workflows**: Nessie branching for experimentation, rollback, and data lineage
  - **Processing Patterns**: Spark structured streaming with Iceberg sinks and CDC patterns
  - **Orchestration**: Airflow operators for Trino queries, Spark jobs, and data quality checks
  - **Storage Layer**: Rook Ceph S3 configuration, bucket lifecycle policies, storage classes, performance tuning
  - **Storage Layout**: Parquet file optimization, Z-ordering, bloom filters, compression strategies
  - **Catalog Integration**: Unified metadata across Trino, Spark, and Nessie with RBAC
  - **Monitoring**: Query performance metrics, Ceph cluster health, storage utilization, data freshness
  - **Multi-cluster Coordination**: Federation patterns, disaster recovery, and cross-region replication

STEP 7: State management and session completion

- UPDATE session state with loaded context and completion status
- ATOMIC write to state file with file locking for concurrent safety
- CREATE comprehensive context summary: `/tmp/context-lakehouse-$SESSION_ID-summary.md`
- SAVE technology-specific guides: `/tmp/context-lakehouse-$SESSION_ID/`
  - `trino-optimization-guide.md`
  - `iceberg-management-patterns.md`
  - `nessie-versioning-workflows.md`
  - `spark-kubernetes-deployment.md`
  - `airflow-lakehouse-dags.md`
  - `ceph-storage-configuration.md`
- GENERATE project-specific implementation roadmap

STEP 8: Advanced lakehouse architecture guidance synthesis

TRY:

- VALIDATE loaded documentation for completeness and currency
- CROSS-REFERENCE best practices across all components
- IDENTIFY integration patterns and potential conflicts
- GENERATE comprehensive implementation guidance

CATCH (incomplete_documentation):

- LOG missing documentation areas
- PROVIDE alternative resources and community links
- INCLUDE troubleshooting guidance for documentation gaps

FINALLY:

- UPDATE session state: phase = "complete"
- GENERATE comprehensive lakehouse context summary
- REPORT loaded documentation sources and coverage
- CLEAN UP temporary processing files

## Expert Guidance Capabilities

After successful context loading, you will have comprehensive knowledge for:

### Architecture & Design

- Building production-ready lakehouse architectures on Kubernetes with optimal resource allocation
- Designing multi-tenant data platforms with proper isolation and security
- Planning migration strategies from traditional data warehouses to lakehouse architecture
- Implementing disaster recovery and business continuity for lakehouse systems

### Data Management

- Implementing ACID transactions with Iceberg tables and handling concurrent writes
- Managing data versioning workflows with Nessie branches, tags, and merge strategies
- Designing efficient data layouts with partitioning, clustering, and file organization
- Implementing data governance frameworks with lineage, quality, and compliance

### Query & Processing Optimization

- Optimizing Trino queries for large-scale analytics with cost-based optimization
- Implementing Spark structured streaming with Iceberg sinks and CDC patterns
- Designing batch and streaming workloads with optimal resource utilization
- Troubleshooting distributed query performance and identifying bottlenecks

### Infrastructure & Operations

- Configuring Rook Ceph for S3-compatible lakehouse storage with performance tuning
- Designing resilient Airflow DAGs with KubernetesExecutor and error handling
- Implementing comprehensive monitoring and alerting for lakehouse components
- Managing storage lifecycle policies, compaction strategies, and cost optimization

### Integration & Connectivity

- Integrating S3-compatible storage with analytical engines and BI tools
- Implementing unified metadata catalogs across Trino, Spark, and Nessie
- Designing secure network topologies and access control patterns
- Connecting external data sources and implementing data ingestion pipelines

## Session State Schema

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "phase": "initialization|loading|synthesis|validation|complete",
  "project_context": {
    "infrastructure": "kubernetes|docker-compose|hybrid|unknown",
    "manifest_count": 0,
    "data_platform_indicators": [],
    "deployment_patterns": []
  },
  "documentation_method": "context7_mcp|webfetch_fallback|internal_knowledge",
  "documentation_sources": {
    "trino": {
      "status": "pending|loading|completed|failed",
      "method": "context7|webfetch|internal",
      "coverage": "full|partial|minimal",
      "focus_areas": []
    },
    "iceberg": { "status": "...", "method": "...", "coverage": "...", "focus_areas": [] },
    "nessie": { "status": "...", "method": "...", "coverage": "...", "focus_areas": [] },
    "spark": { "status": "...", "method": "...", "coverage": "...", "focus_areas": [] },
    "airflow": { "status": "...", "method": "...", "coverage": "...", "focus_areas": [] },
    "rook_ceph": { "status": "...", "method": "...", "coverage": "...", "focus_areas": [] }
  },
  "context_loaded": {
    "architecture_patterns": {},
    "deployment_guides": {},
    "optimization_strategies": {},
    "troubleshooting_guides": {},
    "integration_patterns": {}
  },
  "completion_status": "in_progress|completed|failed",
  "artifacts_created": [],
  "recommendations": []
}
```

## Usage

```bash
/context-load-offline-data-platform
```