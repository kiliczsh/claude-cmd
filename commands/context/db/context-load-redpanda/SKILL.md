---
allowed-tools: mcp__context7__resolve-library-id, mcp__context7__get-library-docs, WebFetch, Read, Write, Bash(gdate:*)
name: "Context Load Redpanda"
description: "Load comprehensive Redpanda streaming platform documentation context"
author: "wcygan"
tags: ["context","db"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Technology stack: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod)" --max-depth 2 | head -5 || echo "No framework files detected"`
- Streaming configs: !`echo "No streaming configurations found"`
- Docker configs: !`fd "docker-compose.*\.ya?ml" --max-depth 2 | head -3 || echo "No Docker Compose files found"`
- Kafka references: !`rg "kafka" --type js --type ts --type go --type rust --max-count 5 | head -3 || echo "No Kafka references found"`

## Your Task

PROCEDURE load_redpanda_context():

STEP 1: Session Initialization and Context Resolution

- Initialize session state file: /tmp/redpanda-context-$SESSION_ID.json
- Detect project streaming requirements and current technology stack
- Identify existing Kafka/streaming implementations for migration context

TRY:

- Use Context7 MCP server to resolve Redpanda library documentation
- Create comprehensive context loading strategy
- Set up progress tracking for multi-source documentation loading

CATCH (context7_unavailable):

- Fall back to WebFetch for direct documentation access
- Document limited context availability in session state
- Continue with web-based documentation loading

STEP 2: Comprehensive Documentation Loading

Think deeply about the optimal documentation loading strategy for Redpanda streaming platform expertise.

Load documentation from multiple authoritative sources in parallel:

**Primary Documentation Sources:**

- **Core Architecture & Getting Started**:
  - URL: `https://docs.redpanda.com/current/get-started/`
  - Focus: Installation, configuration, basic usage patterns
  - Priority: Essential for foundation knowledge

- **Kafka API Compatibility**:
  - URL: `https://docs.redpanda.com/current/reference/kafka-compatibility/`
  - Focus: API compatibility matrix, migration strategies, client libraries
  - Priority: Critical for migration planning

- **Performance & Administration**:
  - URL: `https://docs.redpanda.com/current/manage/cluster-maintenance/`
  - Focus: Performance tuning, monitoring, troubleshooting, optimization
  - Priority: High for production deployment

- **Schema Registry Management**:
  - URL: `https://docs.redpanda.com/current/manage/schema-registry/`
  - Focus: Schema management, compatibility, evolution strategies
  - Priority: High for data governance

**Advanced Topics Sources:**

- **Producer/Consumer Patterns**:
  - URL: `https://docs.redpanda.com/current/develop/`
  - Focus: Client development, streaming patterns, best practices
  - Priority: Medium for development guidance

- **Security & Access Control**:
  - URL: `https://docs.redpanda.com/current/manage/security/`
  - Focus: Authentication, authorization, encryption, compliance
  - Priority: Medium for production security

STEP 3: Context Integration and Knowledge Synthesis

TRY:

- Load and process documentation from all identified sources
- Synthesize streaming platform knowledge across:
  - High-throughput message processing architectures
  - Low-latency streaming application patterns
  - Schema evolution and compatibility strategies
  - Consumer group management and rebalancing
  - Transaction support and exactly-once semantics
  - Production monitoring and observability
  - Performance optimization techniques
  - Migration strategies from Apache Kafka

- Create comprehensive knowledge base covering:
  - **Streaming Architecture**: Topic design, partition strategies, replication
  - **Client Development**: Producer/consumer patterns, error handling, retry logic
  - **Schema Management**: Registry usage, compatibility modes, evolution
  - **Performance Optimization**: Throughput tuning, latency reduction, resource management
  - **Operational Excellence**: Monitoring, alerting, capacity planning, troubleshooting
  - **Migration Planning**: Kafka compatibility, client migration, data migration

- Update session state with loaded context sources and knowledge areas
- Save comprehensive context summary to: /tmp/redpanda-knowledge-$SESSION_ID.json

CATCH (documentation_load_failed):

- Document failed documentation sources
- Continue with available context from successful loads
- Provide alternative documentation recommendations
- Save partial context loading results

CATCH (network_connectivity_issues):

- Save session state for resumption
- Provide offline documentation alternatives
- Create recovery plan for context loading completion
- Document connectivity requirements

STEP 4: Context Validation and Expertise Confirmation

- Validate loaded context for completeness across key knowledge areas:
  - ✓ Streaming architecture fundamentals
  - ✓ Kafka API compatibility and migration
  - ✓ Performance optimization strategies
  - ✓ Schema registry management
  - ✓ Production deployment best practices
  - ✓ Monitoring and troubleshooting

- Confirm readiness to provide expert guidance on:
  - Building high-performance streaming applications
  - Optimizing message throughput and latency
  - Managing schema evolution and compatibility
  - Implementing robust consumer patterns
  - Performance tuning for production workloads
  - Monitoring streaming pipeline health
  - Migrating from Apache Kafka to Redpanda
  - Troubleshooting streaming application issues

STEP 5: Session Completion and Knowledge Activation

TRY:

- Generate context loading summary report
- Activate Redpanda streaming platform expertise
- Provide immediate readiness confirmation
- Clean up temporary session files

FINALLY:

- Update session state: phase = "context_loaded"
- Archive context loading artifacts
- Clean up temporary files: /tmp/redpanda-temp-$SESSION_ID-*
- Confirm expert-level Redpanda knowledge availability

## Expected Knowledge Areas

After successful context loading, expert guidance available for:

### Streaming Architecture & Design

- Topic and partition design strategies
- Message ordering and delivery guarantees
- Replication and high availability patterns
- Cluster sizing and capacity planning

### Application Development

- Producer optimization patterns
- Consumer group management
- Error handling and retry strategies
- Transaction support implementation

### Performance & Operations

- Throughput optimization techniques
- Latency reduction strategies
- Resource monitoring and alerting
- Performance tuning methodologies

### Migration & Integration

- Kafka compatibility assessment
- Client library migration strategies
- Data migration planning and execution
- Integration with existing infrastructure

### Schema Management

- Schema registry configuration and usage
- Compatibility mode selection
- Schema evolution strategies
- Data governance implementation

## State Management Schema

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "context_loading_phase": "initialization|loading|integration|validation|completed",
  "documentation_sources": {
    "core_docs": "load_status",
    "kafka_compatibility": "load_status",
    "performance_guides": "load_status",
    "schema_registry": "load_status",
    "development_guides": "load_status",
    "security_docs": "load_status"
  },
  "knowledge_areas_covered": [
    "streaming_architecture",
    "kafka_migration",
    "performance_optimization",
    "schema_management",
    "production_operations",
    "monitoring_observability"
  ],
  "expertise_level": "expert|intermediate|basic",
  "context_quality": "comprehensive|partial|limited",
  "ready_for_consultation": "boolean",
  "fallback_documentation": [
    "alternative_sources_if_primary_failed"
  ]
}
```

## Usage Examples

After loading context, you can immediately leverage expert knowledge:

```bash
# Load Redpanda context
/context-load-redpanda

# Then use for streaming development
"Help me design a high-throughput event processing system using Redpanda"
"What's the best approach for migrating from Kafka to Redpanda?"
"How should I optimize consumer group performance for low latency?"
"Design a schema evolution strategy for my event streaming platform"
```