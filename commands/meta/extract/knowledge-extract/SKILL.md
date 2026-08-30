---
allowed-tools: Task, Read, Write, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(eza:*), Bash(bat:*)
name: "Knowledge Extract"
description: "Extract comprehensive domain knowledge and architectural patterns using parallel analysis"
author: "wcygan"
tags: ["meta","extract"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Target project: $ARGUMENTS
- Project structure: !`fd . -t d -d 3 | head -10 || echo "No directories found"`
- Build system detection: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle)" . -d 3 | head -5 || echo "No build files detected"`
- Documentation exists: !`fd "(README|ARCHITECTURE|DESIGN|DOCS)" . -t f -d 2 | head -3 || echo "No docs found"`
- Code languages: !`fd "\.(rs|go|java|ts|js|py|rb)$" . | head -5 | sed 's/.*\.//' | sort -u | tr '\n' ' ' || echo "No code files"`
- Repository size: !`eza -la . | head -3 || ls -la . | head -3`

## Your Task

STEP 1: Initialize knowledge extraction session with state management

- CREATE session state file: `/tmp/knowledge-extract-state-$SESSION_ID.json`
- INITIALIZE extraction scope and project boundaries
- DETERMINE primary technology stacks and architectural complexity
- ASSESS existing documentation completeness and quality gaps

```bash
echo '{' > /tmp/knowledge-extract-state-$SESSION_ID.json
echo '  "sessionId": "'$SESSION_ID'",' >> /tmp/knowledge-extract-state-$SESSION_ID.json
echo '  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",' >> /tmp/knowledge-extract-state-$SESSION_ID.json
echo '  "project": "'$ARGUMENTS'",' >> /tmp/knowledge-extract-state-$SESSION_ID.json
echo '  "phase": "initialization",' >> /tmp/knowledge-extract-state-$SESSION_ID.json
echo '  "completed_phases": [],' >> /tmp/knowledge-extract-state-$SESSION_ID.json
echo '  "discovered_domains": [],' >> /tmp/knowledge-extract-state-$SESSION_ID.json
echo '  "architectural_patterns": [],' >> /tmp/knowledge-extract-state-$SESSION_ID.json
echo '  "knowledge_artifacts": []' >> /tmp/knowledge-extract-state-$SESSION_ID.json
echo '}' >> /tmp/knowledge-extract-state-$SESSION_ID.json
```

STEP 2: Parallel domain discovery using strategic sub-agent delegation

TRY:

- LAUNCH 8 parallel sub-agents for comprehensive codebase analysis
- EACH sub-agent focuses on specific architectural aspect
- COORDINATE findings through session state management
- SYNTHESIZE results for architectural understanding

**Parallel Sub-Agent Knowledge Extraction:**

LAUNCH parallel sub-agents for simultaneous domain analysis:

- **Agent 1: Domain Model Discovery**: Analyze core business entities, data models, and domain types
  - Focus: struct/class/interface definitions, enums, data transfer objects
  - Extract: Business terminology, entity relationships, data constraints
  - Save findings: Domain entities, business rules, validation logic

- **Agent 2: Service Architecture Analysis**: Map service layers, handlers, and business logic patterns
  - Focus: Service implementations, controllers, handlers, repositories
  - Extract: Service boundaries, dependency patterns, integration points
  - Save findings: Service interfaces, business workflows, architectural layers

- **Agent 3: API & Interface Documentation**: Discover all external and internal APIs
  - Focus: REST endpoints, RPC services, GraphQL schemas, OpenAPI specs
  - Extract: API contracts, request/response patterns, authentication flows
  - Save findings: Endpoint inventory, API documentation, integration guides

- **Agent 4: Data Architecture Mapping**: Analyze database schemas, migrations, and data flow
  - Focus: Migration files, ORM models, SQL queries, data transformations
  - Extract: Schema evolution, data relationships, query patterns
  - Save findings: Database design, data flow diagrams, migration strategies

- **Agent 5: Business Logic & Workflow Analysis**: Identify state machines, business rules, and processes
  - Focus: State management, workflow engines, business calculations, validation rules
  - Extract: Business processes, state transitions, rule engines
  - Save findings: Workflow documentation, business rule catalog, process maps

- **Agent 6: Configuration & Infrastructure Discovery**: Map deployment, configuration, and operational patterns
  - Focus: Config files, environment variables, deployment manifests, infrastructure as code
  - Extract: Deployment patterns, configuration management, operational procedures
  - Save findings: Deployment guides, configuration documentation, operational runbooks

- **Agent 7: Error Handling & Monitoring Analysis**: Document error patterns, logging, and observability
  - Focus: Error definitions, logging patterns, metrics, monitoring, alerting
  - Extract: Error handling strategies, observability patterns, debugging guides
  - Save findings: Error catalogs, monitoring documentation, troubleshooting guides

- **Agent 8: Testing & Quality Patterns**: Analyze testing strategies, coverage, and quality patterns
  - Focus: Test structure, mock patterns, integration tests, quality gates
  - Extract: Testing methodologies, quality standards, coverage patterns
  - Save findings: Testing guides, quality documentation, best practices

**Sub-Agent Coordination Protocol:**

- Each sub-agent executes independently using Task tool
- Results saved to session state under respective domains
- Parallel execution provides 6-8x performance improvement
- Failed agents report gracefully without blocking others
- Main agent synthesizes findings across all domains

CATCH (analysis_failed):

- LOG error details to session state
- CONTINUE with available analysis results
- DOCUMENT gaps and limitations in final report

STEP 3: Architectural synthesis and pattern identification

TRY:

- AGGREGATE findings from all sub-agents
- IDENTIFY cross-cutting architectural patterns
- MAP domain relationships and dependencies
- EXTRACT recurring design patterns and conventions
- SYNTHESIZE into coherent architectural understanding

**Pattern Recognition Process:**

FOR EACH architectural aspect:

```bash
# Cross-cutting pattern analysis
echo "Identifying recurring architectural patterns..."

# Service layer patterns
pattern_count=$(rg "Service|Handler|Controller|Repository" . | wc -l | tr -d ' ')
echo "Service layer implementations: $pattern_count"

# Domain modeling patterns  
entity_count=$(rg "struct|class|interface|enum" --type rust --type go --type java --type ts | wc -l | tr -d ' ')
echo "Domain entities discovered: $entity_count"

# Error handling patterns
error_count=$(rg "Error|Exception|Result|Option" --type rust --type go --type java --type ts | wc -l | tr -d ' ')
echo "Error handling patterns: $error_count"

# Update session state with pattern metrics
jq '.architectural_patterns += [{
  "serviceLayerCount": '$pattern_count',
  "domainEntityCount": '$entity_count',
  "errorHandlingCount": '$error_count',
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"
}]' /tmp/knowledge-extract-state-$SESSION_ID.json > /tmp/temp-state.json
mv /tmp/temp-state.json /tmp/knowledge-extract-state-$SESSION_ID.json
```

**Architectural Understanding Development:**

- ANALYZE service decomposition and modularity patterns
- IDENTIFY data flow and integration architectures
- MAP component dependencies and coupling patterns
- EXTRACT configuration and deployment strategies
- DOCUMENT security and authentication patterns

STEP 4: Knowledge artifact generation with structured documentation

TRY:

- SYNTHESIZE all sub-agent findings into comprehensive documentation
- CREATE structured knowledge artifacts for different audiences
- GENERATE actionable documentation with examples and usage patterns
- ESTABLISH knowledge maintenance and update processes

**Knowledge Artifact Creation Workflow:**

FOR EACH documentation artifact:

```bash
echo "Generating comprehensive knowledge documentation..."

# Create documentation directory structure
mkdir -p docs/extracted-knowledge/{architecture,domain,api,deployment,testing}

# Generate timestamp for artifact tracking
doc_timestamp=$(gdate -Iseconds 2>/dev/null || date -Iseconds)

# Update session state with artifact generation
jq '.phase = "artifact_generation" | .knowledge_artifacts += [{
  "type": "documentation_suite",
  "timestamp": "'$doc_timestamp'",
  "location": "docs/extracted-knowledge/",
  "status": "generating"
}]' /tmp/knowledge-extract-state-$SESSION_ID.json > /tmp/temp-state.json
mv /tmp/temp-state.json /tmp/knowledge-extract-state-$SESSION_ID.json
```

**1. Architecture Overview (docs/extracted-knowledge/architecture/system-overview.md):**

```markdown
# System Architecture Overview

## Executive Summary

- [High-level system purpose and scope]
- [Key architectural decisions and trade-offs]
- [Technology stack and infrastructure choices]

## Core Architectural Patterns

- [Service decomposition strategy]
- [Data architecture and persistence patterns]
- [Integration and communication patterns]
- [Security and authentication approaches]

## System Boundaries and Context

- [External dependencies and integrations]
- [Internal service boundaries and responsibilities]
- [Data flow and processing pipelines]

## Quality Attributes

- [Performance characteristics and requirements]
- [Scalability and reliability patterns]
- [Security and compliance considerations]
```

**2. Domain Model Documentation (docs/extracted-knowledge/domain/business-model.md):**

```markdown
# Business Domain Model

## Core Business Entities

- [Primary domain objects and their responsibilities]
- [Entity relationships and dependencies]
- [Business rules and constraints]

## Domain Services and Workflows

- [Business process flows and state machines]
- [Domain service responsibilities and boundaries]
- [Business rule implementation patterns]

## Ubiquitous Language

- [Domain terminology and definitions]
- [Business concepts and their technical representations]
- [Communication patterns between domains]
```

**3. API Reference Documentation (docs/extracted-knowledge/api/api-reference.md):**

```markdown
# API Reference Guide

## REST API Endpoints

- [Complete endpoint inventory with methods and paths]
- [Request/response schemas and examples]
- [Authentication and authorization patterns]

## Internal Service APIs

- [Service interface definitions and contracts]
- [Inter-service communication patterns]
- [RPC/gRPC service documentation (if applicable)]

## Integration Patterns

- [External API integrations and client patterns]
- [Event-driven communication and messaging]
- [Data synchronization and consistency patterns]
```

**4. Developer Operations Guide (docs/extracted-knowledge/deployment/operations-guide.md):**

```markdown
# Operations and Deployment Guide

## Development Environment Setup

- [Local development requirements and setup]
- [Configuration management and environment variables]
- [Development workflow and debugging approaches]

## Deployment Strategies

- [Infrastructure architecture and deployment patterns]
- [CI/CD pipeline configuration and processes]
- [Environment promotion and release procedures]

## Monitoring and Observability

- [Logging patterns and log aggregation]
- [Metrics collection and alerting]
- [Distributed tracing and performance monitoring]

## Troubleshooting and Maintenance

- [Common issues and resolution procedures]
- [Performance tuning and optimization strategies]
- [Backup and disaster recovery procedures]
```

**5. Testing and Quality Assurance Guide (docs/extracted-knowledge/testing/testing-strategy.md):**

```markdown
# Testing Strategy and Quality Patterns

## Testing Architecture

- [Test organization and structure patterns]
- [Unit testing strategies and frameworks]
- [Integration testing approaches and tools]

## Quality Assurance Processes

- [Code review and quality gate procedures]
- [Static analysis and linting configurations]
- [Performance testing and benchmarking]

## Test Data and Fixtures

- [Test data management and generation]
- [Mock and stub patterns for external dependencies]
- [Test environment setup and teardown procedures]
```

CATCH (documentation_generation_failed):

- LOG specific generation failures to session state
- CONTINUE with successful artifact generation
- DOCUMENT incomplete sections for future completion
- PROVIDE guidance on manual completion steps

STEP 5: Knowledge validation and quality assurance

TRY:

- VALIDATE generated documentation for completeness and accuracy
- CROSS-REFERENCE findings with actual codebase implementation
- IDENTIFY knowledge gaps and areas requiring domain expert input
- ESTABLISH documentation maintenance and update procedures

**Validation Workflow:**

```bash
echo "Validating extracted knowledge artifacts..."

# Check documentation completeness
doc_files=$(fd "\.md$" docs/extracted-knowledge | wc -l | tr -d ' ')
echo "Generated documentation files: $doc_files"

# Validate cross-references and links
broken_links=$(rg "\[.*\]\(.*\)" docs/extracted-knowledge --type md | wc -l | tr -d ' ')
echo "Internal references found: $broken_links"

# Update final session state
jq '.phase = "completed" | .completed_phases += ["initialization", "discovery", "synthesis", "documentation", "validation"] | .knowledge_artifacts[-1].status = "completed"' /tmp/knowledge-extract-state-$SESSION_ID.json > /tmp/temp-state.json
mv /tmp/temp-state.json /tmp/knowledge-extract-state-$SESSION_ID.json
```

STEP 6: Generate comprehensive summary and next actions

FINALLY:

- COMPILE comprehensive knowledge extraction summary
- PROVIDE actionable next steps for knowledge utilization
- ESTABLISH documentation maintenance and evolution procedures
- INTEGRATE with existing development and onboarding workflows

**Knowledge Extraction Summary Report:**

```markdown
# Knowledge Extraction Session Summary

## Session Overview

- **Project**: $ARGUMENTS
- **Session ID**: $SESSION_ID
- **Extraction Date**: $(gdate -Iseconds 2>/dev/null || date -Iseconds)
- **Analysis Scope**: [Comprehensive architectural and domain analysis]

## Discovered Knowledge Assets

- **Architecture Documentation**: System design and component relationships
- **Domain Model**: Business entities, rules, and workflows
- **API Reference**: Service interfaces and integration patterns
- **Operational Guide**: Deployment, monitoring, and maintenance procedures
- **Testing Strategy**: Quality assurance and testing methodologies

## Key Architectural Insights

- [Primary architectural patterns and design decisions]
- [Technology stack and infrastructure choices]
- [Service boundaries and integration strategies]
- [Data architecture and persistence patterns]

## Recommendations and Next Steps

### Immediate Actions

1. **Review Documentation**: Validate extracted knowledge with domain experts
2. **Fill Knowledge Gaps**: Identify and document missing domain information
3. **Integrate with Onboarding**: Use `/onboard` command with generated documentation
4. **Establish Maintenance**: Set up documentation update processes

### Long-term Knowledge Management

1. **Living Documentation**: Integrate documentation into development workflow
2. **Knowledge Sharing**: Schedule team knowledge transfer sessions
3. **Continuous Evolution**: Establish documentation review and update cycles
4. **Architecture Decision Records**: Document future architectural decisions

## Documentation Artifacts

- `docs/extracted-knowledge/architecture/system-overview.md`
- `docs/extracted-knowledge/domain/business-model.md`
- `docs/extracted-knowledge/api/api-reference.md`
- `docs/extracted-knowledge/deployment/operations-guide.md`
- `docs/extracted-knowledge/testing/testing-strategy.md`

## Session State

- **Status**: ✅ Completed successfully
- **Artifacts Generated**: 5 comprehensive documentation files
- **Knowledge Coverage**: Architecture, Domain, API, Operations, Testing
- **Quality Assurance**: Validation and cross-referencing completed
```

**Knowledge Integration Workflow:**

- CONNECT extracted knowledge with existing project documentation
- PROVIDE integration guidance for development team adoption
- ESTABLISH feedback loops for continuous knowledge refinement
- CREATE pathways for knowledge application in development workflows

**Clean up session artifacts:**

```bash
# Archive session state for future reference
mv /tmp/knowledge-extract-state-$SESSION_ID.json docs/extracted-knowledge/session-state-$(gdate +%Y%m%d-%H%M%S).json 2>/dev/null || mv /tmp/knowledge-extract-state-$SESSION_ID.json docs/extracted-knowledge/session-state-$(date +%Y%m%d-%H%M%S).json

echo "✅ Knowledge extraction completed successfully"
echo "📚 Documentation available in: docs/extracted-knowledge/"
echo "🔄 Next: Review and validate extracted knowledge with domain experts"
```