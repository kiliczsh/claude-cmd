---
allowed-tools: Task, WebFetch, Read, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(mvn:*), Bash(gradle:*)
name: "Context Load Java Temporal"
description: "Load comprehensive Java Temporal workflow documentation with project-specific optimization"
author: "wcygan"
tags: ["context","java"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Java projects: !`fd "(pom\.xml|build\.gradle|build\.gradle\.kts)" . | head -5 || echo "No Java projects found"`
- Temporal usage: !`rg "temporal|workflow|activity" . --type java | wc -l | tr -d ' ' || echo "0"`
- Spring Boot presence: !`rg "@SpringBootApplication|spring-boot" . --type java --type xml | wc -l | tr -d ' ' || echo "0"`
- Dependency management: !`fd "(pom\.xml|build\.gradle)" . -x rg "temporal" {} \; | head -3 || echo "No Temporal dependencies found"`
- Test files: !`fd ".*Test\.java$" . | wc -l | tr -d ' ' || echo "0"`
- Technology stack: !`fd "(deno\.json|package\.json|Cargo\.toml)" . | head -3 || echo "Java-focused project"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/java-temporal-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "temporal_features_detected": []
  }
  ```

STEP 2: Project analysis and documentation prioritization

- ANALYZE project structure from Context section
- DETERMINE specific Temporal features and patterns in use
- IDENTIFY documentation priorities based on project needs

Think deeply about optimal Temporal workflow documentation strategies for this specific project context.

IF Java projects with Temporal usage found:

- FOCUS on project-specific workflow patterns and activity implementations
- PRIORITIZE relevant testing strategies and deployment contexts
- INCLUDE performance optimization and monitoring contexts
  ELSE:
- LOAD foundational Temporal concepts and getting-started guides
- EMPHASIZE workflow design principles and best practices
- INCLUDE project setup and Spring Boot integration patterns

STEP 3: Parallel documentation loading with sub-agent delegation

TRY:

- LAUNCH 7 parallel sub-agents for simultaneous documentation loading
- EACH sub-agent processes one priority documentation source
- SAVE loaded context to session state from all agents
- SYNTHESIZE findings from parallel execution

**Parallel Sub-Agent Documentation Loading:**

LAUNCH parallel sub-agents to load comprehensive Temporal documentation:

- **Agent 1: Core Concepts**: Load foundational Temporal concepts from `https://docs.temporal.io/concepts`
  - Focus: Durable execution model, workflow lifecycle, task queues, signals, queries
  - Extract: Mental models and architectural patterns

- **Agent 2: Java SDK Guide**: Load Java implementation patterns from `https://docs.temporal.io/dev-guide/java`
  - Focus: Workflow definition, activity implementation, worker configuration
  - Extract: Code examples and configuration patterns

- **Agent 3: Testing Strategies**: Load testing methodologies from `https://docs.temporal.io/dev-guide/java/testing`
  - Focus: TestWorkflowEnvironment, time manipulation, mock activities, test determinism
  - Extract: Testing patterns and time-skipping techniques

- **Agent 4: Java Samples**: Load real-world examples from `https://github.com/temporalio/samples-java`
  - Focus: Production-ready workflow implementations and patterns
  - Extract: Complete example applications and integration patterns

- **Agent 5: Spring Integration**: Load Spring Boot patterns from `https://docs.temporal.io/dev-guide/java/foundations#dependency-injection`
  - Focus: Application configuration, dependency injection, bean management, lifecycle
  - Extract: Production deployment and configuration patterns

- **Agent 6: Production Operations**: Load operational guidance from `https://docs.temporal.io/production-deployment`
  - Focus: Deployment, monitoring, observability, scaling, metrics, alerting
  - Extract: Operational best practices and troubleshooting procedures

- **Agent 7: Versioning & Migration**: Load evolution strategies from `https://docs.temporal.io/dev-guide/java/versioning`
  - Focus: Versioning strategies, backward compatibility, migration, breaking changes
  - Extract: Versioning patterns and rollback procedures

**Sub-Agent Coordination:**

- Each sub-agent executes independently with WebFetch tool
- Results aggregated in session state under respective functional areas
- Parallel execution provides 5-7x performance improvement over sequential loading
- Failed agents report to session state without blocking others

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and project-specific synthesis

- ORGANIZE loaded context by functional area:
  - Workflow design and implementation patterns
  - Activity definition and execution strategies
  - Signal and query handling mechanisms
  - Testing methodologies and time manipulation
  - Worker configuration and scaling patterns
  - Error handling and retry policies
  - Versioning and migration strategies
  - Monitoring and observability integration
  - Spring Boot integration and dependency injection
  - Production deployment and operations

Think harder about advanced Temporal workflow patterns and their applicability to the detected project structure.

- SYNTHESIZE project-specific guidance:
  - Integration with existing Java application architecture
  - Migration strategies from synchronous to workflow-based processing
  - Testing strategies for complex business processes
  - Performance considerations for high-throughput workflows
  - Security and compliance patterns for workflow data

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/java-temporal-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE project_context:
WHEN "existing_temporal_workflows":

- PRIORITIZE: Advanced workflow patterns, performance optimization, versioning
- FOCUS: Production operations, monitoring, troubleshooting
- EXAMPLES: Complex workflow orchestration, high-throughput patterns

WHEN "spring_boot_integration":

- PRIORITIZE: Dependency injection, configuration management, lifecycle integration
- FOCUS: Bean configuration, application context, transaction management
- EXAMPLES: Spring-based workflow applications, configuration patterns

WHEN "new_temporal_project":

- PRIORITIZE: Getting started, basic concepts, simple workflow patterns
- FOCUS: Project setup, basic workflow implementation, testing foundations
- EXAMPLES: Simple workflows, activity implementation, basic testing

WHEN "microservices_architecture":

- PRIORITIZE: Service orchestration, distributed workflows, fault tolerance
- FOCUS: Inter-service communication, saga patterns, distributed state management
- EXAMPLES: Microservice orchestration, distributed transaction patterns

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Java version compatibility
- VALIDATE code examples for compilation and execution
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with current Temporal SDK versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Temporal Capabilities:**

- Workflow design patterns and implementation strategies
- Activity definition and execution models
- Signal and query handling mechanisms
- Task queue configuration and worker management
- Durable execution guarantees and fault tolerance

**Java-Specific Implementation:**

- Spring Boot integration and dependency injection patterns
- TestWorkflowEnvironment usage and testing strategies
- Java SDK configuration and optimization
- Type-safe workflow and activity definitions
- Exception handling and retry policy configuration

**Production Operations:**

- Deployment strategies and infrastructure requirements
- Monitoring, metrics, and observability setup
- Versioning and migration procedures
- Performance tuning and scaling considerations
- Security configuration and best practices

**Development Workflow:**

- Local development environment setup
- Testing strategies for workflow logic
- Debugging techniques and troubleshooting
- CI/CD integration and automated testing
- Code generation and build optimization

The context loading adapts to your specific project structure and emphasizes the most relevant Temporal documentation areas for your current Java development needs.

## Session State Management

```json
// /tmp/java-temporal-context-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "project_analysis": {
    "java_projects_found": "count",
    "temporal_usage_detected": "boolean",
    "spring_boot_integration": "boolean",
    "test_files_present": "count",
    "complexity_assessment": "simple|moderate|complex"
  },
  "documentation_strategy": {
    "prioritization_approach": "new_project|existing_workflows|spring_integration|microservices",
    "focus_areas": ["workflow_design", "testing", "production_ops"],
    "loaded_sources": [],
    "failed_sources": [],
    "fallback_strategies": []
  },
  "context_cache": {
    "core_concepts": {},
    "java_implementation": {},
    "testing_strategies": {},
    "production_operations": {},
    "spring_integration": {},
    "versioning_migration": {}
  },
  "project_recommendations": {
    "immediate_next_steps": [],
    "architectural_considerations": [],
    "testing_approach": [],
    "deployment_strategy": []
  }
}
```

**Advanced Features:**

- **Project-Specific Prioritization**: Adapts documentation loading based on detected Java project structure
- **Spring Boot Integration**: Special focus on dependency injection and application lifecycle
- **Testing Framework Integration**: Comprehensive TestWorkflowEnvironment patterns
- **Production Readiness**: Operations, monitoring, and deployment considerations
- **Extended Thinking Integration**: Deep workflow design analysis for complex business processes

## Integration Patterns

### With Existing Java Applications:

- **Spring Boot Integration**: Native dependency injection and configuration management
- **Microservices Architecture**: Workflow-based service orchestration patterns
- **Database Integration**: JPA/Hibernate compatibility and transaction management
- **Message Queue Integration**: Kafka, RabbitMQ, and event-driven workflow patterns

### Development Workflow Integration:

- **IDE Setup**: IntelliJ IDEA and VS Code configuration for Temporal development
- **Build Tools**: Maven and Gradle plugin configuration and optimization
- **Testing Framework**: JUnit 5 integration with TestWorkflowEnvironment
- **CI/CD Pipeline**: GitHub Actions and Jenkins integration patterns

### Monitoring and Observability:

- **Metrics Integration**: Micrometer and Prometheus integration
- **Logging**: SLF4J and Logback configuration for workflow visibility
- **Distributed Tracing**: OpenTelemetry and Jaeger integration
- **Health Checks**: Spring Boot Actuator integration for workflow health