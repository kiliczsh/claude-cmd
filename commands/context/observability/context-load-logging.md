---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*)
name: "Context Load Logging"
description: "Load comprehensive logging and observability documentation context with project-specific optimization"
author: "wcygan"
tags: ["context","observability"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Observability tools: !`fd "(loki|grafana|prometheus|jaeger|zipkin|otel)" . --type d | head -5 || echo "No observability tools found"`
- Logging usage: !`rg "logger|logging|log\." . --type go --type js --type ts --type rust --type java | wc -l | tr -d ' ' || echo "0"`
- Container configs: !`fd "(docker-compose\.yml|docker-compose\.yaml)$" . | head -3 || echo "No docker compose files found"`
- Config files: !`fd "(loki\.yml|grafana\.ini|prometheus\.yml)" . | head -3 || echo "No observability configs found"`
- Technology stack: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod)" . | head -3 || echo "No project files detected"`
- Kubernetes manifests: !`fd "\.ya?ml$" . | rg -l "kind:|apiVersion:" | head -3 || echo "No K8s manifests found"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

Think deeply about logging strategy, observability architecture, and structured logging patterns for comprehensive system monitoring.

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/logging-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "observability_features_detected": []
  }
  ```

STEP 2: Project-specific observability analysis

- ANALYZE project structure from Context section
- DETERMINE specific logging and observability needs
- IDENTIFY documentation priorities based on detected infrastructure

IF observability tools detected OR logging usage found:

- FOCUS on project-specific implementation patterns
- PRIORITIZE relevant configuration and integration guides
- INCLUDE deployment and monitoring contexts
  ELSE:
- LOAD foundational logging and observability concepts
- EMPHASIZE setup, configuration, and getting-started guides
- INCLUDE project integration and best practices workflows

STEP 3: Strategic documentation loading with project adaptation

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by functional area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **Loki Documentation and Configuration**
   - URL: `https://grafana.com/docs/loki/`
   - FETCH: Log aggregation, querying, configuration, storage patterns
   - FOCUS: LogQL query language, label strategies, retention policies
   - EXTRACT: Configuration examples and deployment patterns

2. **Structured Logging and Twelve-Factor Principles**
   - URL: `https://12factor.net/logs`
   - FETCH: Twelve-factor app logging principles and structured formats
   - FOCUS: Log streams, event correlation, centralized collection
   - EXTRACT: Implementation patterns and best practices

3. **OpenTelemetry Logging Integration**
   - URL: `https://opentelemetry.io/docs/concepts/signals/logs/`
   - FETCH: Trace correlation, log collection, exporters configuration
   - FOCUS: Context propagation, correlation IDs, instrumentation
   - EXTRACT: Language-specific implementation examples

4. **Grafana Log Management and Visualization**
   - URL: `https://grafana.com/docs/grafana/latest/explore/logs-integration/`
   - FETCH: Log visualization, correlation, querying interfaces
   - FOCUS: Dashboard design, alerting, log exploration patterns
   - EXTRACT: Query examples and visualization best practices

5. **Loki Best Practices and Performance**
   - URL: `https://grafana.com/docs/loki/latest/best-practices/`
   - FETCH: Label design, performance optimization, retention strategies
   - FOCUS: Query performance, storage efficiency, operational practices
   - EXTRACT: Production deployment and scaling guidance

6. **Observability Stack Integration**
   - URL: `https://grafana.com/docs/grafana/latest/datasources/loki/`
   - FETCH: Integration with Prometheus, Jaeger, and other observability tools
   - FOCUS: Cross-signal correlation, unified observability dashboards
   - EXTRACT: Architecture patterns and configuration examples

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and synthesis

- ORGANIZE loaded context by functional area:
  - Log aggregation and centralized collection strategies
  - Structured logging formats and schema design
  - Query optimization and LogQL best practices
  - Label design and cardinality management
  - Retention policies and storage optimization
  - Correlation with traces and metrics
  - Security, access control, and compliance
  - Performance monitoring and troubleshooting
  - Deployment patterns and infrastructure automation

- SYNTHESIZE project-specific guidance:
  - Integration with detected technology stack
  - Migration strategies from existing logging solutions
  - Best practices for identified use cases
  - Security considerations for log pipelines
  - Performance optimization for current scale

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/logging-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Project Infrastructure:**

CASE project_context:
WHEN "existing_observability_stack":

- PRIORITIZE: Integration patterns, migration guides, advanced configurations
- FOCUS: Multi-tool correlation, performance optimization, operational practices
- EXAMPLES: Complex queries, dashboard design, alerting strategies

WHEN "containerized_applications":

- PRIORITIZE: Container log collection, Kubernetes integration, service mesh logging
- FOCUS: Log routing, namespace isolation, resource management
- EXAMPLES: Fluent Bit configuration, log aggregation patterns

WHEN "microservices_architecture":

- PRIORITIZE: Distributed tracing correlation, service-level logging, request tracking
- FOCUS: Context propagation, correlation IDs, service discovery integration
- EXAMPLES: Request flow tracing, error correlation across services

WHEN "new_logging_implementation":

- PRIORITIZE: Getting started guides, basic configuration, structured logging setup
- FOCUS: Log format design, initial deployment, basic querying
- EXAMPLES: Simple configurations, basic dashboards, alert setup

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and version compatibility
- VALIDATE configuration examples for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with current tool versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Logging Capabilities:**

- Centralized log aggregation with Loki and alternatives
- Structured logging format design and implementation
- LogQL query language and optimization techniques
- Label strategy design and cardinality management
- Log retention policies and storage optimization
- Integration with tracing and metrics systems

**Advanced Implementation Techniques:**

- Log correlation across distributed systems
- High-performance log collection and processing
- Security and access control for log pipelines
- Alerting and notification based on log patterns
- Dashboard design for log visualization
- Operational practices for log management

**Project Integration:**

- Technology stack-specific logging implementation
- Container and Kubernetes logging strategies
- CI/CD integration for log management
- Monitoring and observability architecture design
- Migration from existing logging solutions
- Performance optimization and troubleshooting

**Development Workflow:**

- IDE integration and local development logging
- Testing logging implementations and configurations
- Debugging distributed systems with logs
- Performance profiling using log analysis
- Security audit and compliance logging
- Operational runbooks and incident response

The context loading adapts to your specific project infrastructure and emphasizes the most relevant logging and observability documentation areas for your current development and operational needs.