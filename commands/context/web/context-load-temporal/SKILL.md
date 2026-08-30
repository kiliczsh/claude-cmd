---
allowed-tools: WebFetch, Read, Write, Bash(curl:*), Bash(jq:*), Bash(gdate:*), Task
name: "Context Load Temporal"
description: "Load comprehensive Temporal workflow orchestration context with adaptive research and enterprise-grade implementation patterns"
author: "wcygan"
tags: ["context","web"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Target technology: Temporal Workflow Orchestration
- Documentation base: https://docs.temporal.io/
- Project type detection: !`fd "(go\.mod|Cargo\.toml|package\.json|pom\.xml|requirements\.txt)" . -d 2 | head -3 || echo "No project files detected"`
- Existing Temporal usage: !`rg "temporal" . --type go --type rust --type java --type typescript --type python -i | head -5 || echo "No Temporal usage detected"`
- Documentation availability: !`curl -s --head https://docs.temporal.io/ | head -1 || echo "Documentation unavailable"`
- Context loading strategy: comprehensive_parallel_research

## Your Task

STEP 1: Initialize Temporal context loading session

- CREATE session state file: `/tmp/temporal-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "target": "temporal-workflow-orchestration",
    "phase": "initialization",
    "project_context": "auto-detect",
    "documentation_sources": [],
    "research_domains": [
      "core-concepts",
      "workflow-patterns",
      "activity-patterns",
      "testing-strategies",
      "deployment-patterns",
      "monitoring-observability",
      "performance-optimization",
      "enterprise-patterns"
    ],
    "loaded_contexts": {},
    "implementation_examples": [],
    "best_practices": [],
    "checkpoints": []
  }
  ```
- INITIALIZE comprehensive documentation loading workspace

STEP 2: Project-specific context detection and research strategy

Think hard about the optimal context loading strategy based on detected project characteristics and existing Temporal usage patterns.

Think deeper about enterprise-grade implementation requirements, performance optimization strategies, and production deployment considerations for Temporal workflows.

- ANALYZE project context from detection commands
- DETERMINE primary development language and framework
- IDENTIFY existing Temporal integration patterns
- ASSESS documentation complexity and scope requirements

IF existing Temporal usage detected:

- SET research_focus = "enhancement_and_optimization"
- PRIORITIZE advanced patterns, performance tuning, and enterprise features
- FOCUS on integration patterns with existing codebase
  ELSE IF project files detected:
- SET research_focus = "implementation_planning"
- PRIORITIZE getting-started guides, basic patterns, and language-specific examples
- FOCUS on setup, configuration, and foundational concepts
  ELSE:
- SET research_focus = "comprehensive_overview"
- LOAD complete Temporal ecosystem knowledge
- FOCUS on architectural understanding and technology evaluation

STEP 3: Parallel documentation loading with comprehensive coverage

TRY:

IF research_focus == "comprehensive_overview":

- USE Task tool to delegate parallel documentation loading with 5 specialized agents:
  1. **Core Concepts Agent**: Load fundamental Temporal concepts
     - WebFetch: `https://docs.temporal.io/concepts`
     - FOCUS: workflows, activities, workers, task queues, durable execution
     - SAVE findings: `/tmp/temporal-context-$SESSION_ID/core-concepts.json`

  2. **Architecture & Deployment Agent**: Load system architecture and deployment patterns
     - WebFetch: `https://docs.temporal.io/production-deployment`
     - FOCUS: cluster setup, scaling, security, high availability
     - SAVE findings: `/tmp/temporal-context-$SESSION_ID/architecture.json`

  3. **Development Patterns Agent**: Load development guides and best practices
     - WebFetch: `https://docs.temporal.io/dev-guide`
     - FOCUS: workflow development, testing, debugging, versioning
     - SAVE findings: `/tmp/temporal-context-$SESSION_ID/development.json`

  4. **Language Integration Agent**: Load language-specific implementations
     - WebFetch: `https://docs.temporal.io/dev-guide/sdks`
     - FOCUS: Go, Java, TypeScript, Python, .NET SDKs
     - SAVE findings: `/tmp/temporal-context-$SESSION_ID/language-sdks.json`

  5. **Enterprise Features Agent**: Load enterprise-grade features and patterns
     - WebFetch: `https://docs.temporal.io/security`
     - FOCUS: security, compliance, multi-tenancy, governance
     - SAVE findings: `/tmp/temporal-context-$SESSION_ID/enterprise.json`

ELSE IF research_focus == "implementation_planning":

- EXECUTE focused context loading based on detected project type:
  - WebFetch primary documentation areas relevant to detected language
  - PRIORITIZE quick-start guides and basic implementation patterns
  - LOAD configuration and setup documentation
  - GATHER testing and debugging strategies

ELSE:

- PERFORM targeted context enhancement:
  - WebFetch advanced topics and optimization guides
  - FOCUS on performance tuning and enterprise patterns
  - LOAD troubleshooting and operational guides
  - GATHER monitoring and observability best practices

CATCH (documentation_unavailable):

- LOG unavailable sources to session state
- CONTINUE with available documentation sources
- PROVIDE offline documentation recommendations
- INCLUDE alternative learning resources and community content

STEP 4: Comprehensive Temporal knowledge synthesis

- ORGANIZE loaded context by implementation priority:
  - Foundation: Core concepts and architecture understanding
  - Setup: Installation, configuration, and basic workflow creation
  - Development: Advanced patterns, testing, and debugging
  - Production: Deployment, monitoring, and enterprise features
  - Optimization: Performance tuning and scalability patterns

- SYNTHESIZE project-specific guidance:
  - Integration strategies for detected technology stack
  - Migration patterns from existing workflow systems
  - Performance considerations for anticipated workloads
  - Security and compliance requirements

STEP 5: Language-specific implementation context

CASE detected_language:
WHEN "go":

- LOAD Go SDK documentation and examples
- FOCUS on context handling, error management, and concurrency patterns
- INCLUDE dependency injection and testing strategies
- DOCUMENT Go-specific best practices and performance optimizations

WHEN "java":

- LOAD Java SDK documentation and Spring Boot integration
- FOCUS on dependency injection, transaction handling, and testing frameworks
- INCLUDE enterprise patterns and microservices integration
- DOCUMENT Java-specific configuration and deployment strategies

WHEN "typescript" OR "javascript":

- LOAD TypeScript SDK documentation and Node.js patterns
- FOCUS on async/await patterns, error handling, and testing frameworks
- INCLUDE frontend integration and real-time updates
- DOCUMENT TypeScript-specific type safety and development workflows

WHEN "python":

- LOAD Python SDK documentation and framework integration
- FOCUS on async patterns, dependency management, and testing strategies
- INCLUDE data processing workflows and ML integration patterns
- DOCUMENT Python-specific deployment and scaling considerations

WHEN "multiple" OR "unknown":

- LOAD polyglot development guidance
- FOCUS on cross-language workflow coordination
- INCLUDE inter-service communication patterns
- DOCUMENT language-agnostic architectural principles

STEP 6: Enterprise-grade implementation patterns

- LOAD advanced Temporal features:
  - Multi-cluster deployment strategies
  - Workflow versioning and migration patterns
  - Advanced signal and query handling
  - Child workflow and continue-as-new patterns
  - Saga pattern implementation
  - Event sourcing integration
  - Monitoring and observability setup

- GATHER production-ready patterns:
  - Error handling and retry strategies
  - Resource management and scaling
  - Security and authentication integration
  - Performance monitoring and alerting
  - Disaster recovery and backup strategies

STEP 7: Context validation and artifact creation

TRY:

- VALIDATE loaded documentation for completeness and accuracy
- VERIFY code examples and configuration snippets
- CHECK for deprecated features and migration guides
- ENSURE integration patterns match detected project structure

CATCH (validation_failed):

- LOG validation issues to session state
- PROVIDE corrected examples and updated documentation
- INCLUDE troubleshooting guidance for common issues
- REFERENCE official support channels and community resources

STEP 8: State management and knowledge persistence

- UPDATE session state with loaded context summary
- CREATE comprehensive context guide: `/tmp/temporal-context-$SESSION_ID/complete-guide.md`
- GENERATE implementation checklist: `/tmp/temporal-context-$SESSION_ID/implementation-checklist.md`
- SAVE code examples: `/tmp/temporal-context-$SESSION_ID/examples/`
- CREATE deployment guide: `/tmp/temporal-context-$SESSION_ID/deployment-guide.md`
- DOCUMENT architectural decisions: `/tmp/temporal-context-$SESSION_ID/architecture-decisions.md`

FINALLY:

- UPDATE session state: phase = "complete"
- GENERATE context loading summary with key capabilities unlocked
- PROVIDE immediate next steps for Temporal implementation
- CLEAN UP temporary processing files: `/tmp/temporal-temp-$SESSION_ID-*`

## Temporal Knowledge Framework

### Core Concepts (Priority 1)

1. **Workflow Fundamentals**
   - Durable execution guarantees
   - Workflow state management
   - Deterministic execution requirements
   - Event sourcing and replay mechanisms

2. **Activity Patterns**
   - Idempotent activity design
   - Retry and timeout configurations
   - Heartbeat and cancellation handling
   - Resource management strategies

3. **Worker Architecture**
   - Task queue configuration
   - Worker scaling strategies
   - Resource allocation patterns
   - Load balancing considerations

### Implementation Patterns (Priority 2)

1. **Workflow Design Patterns**
   - Sequential processing workflows
   - Parallel execution patterns
   - Conditional branching strategies
   - Loop and iteration handling
   - Human-in-the-loop workflows

2. **Advanced Features**
   - Signal and query handling
   - Child workflow coordination
   - Continue-as-new patterns
   - Saga pattern implementation
   - Workflow versioning strategies

3. **Integration Patterns**
   - External system integration
   - Event-driven architectures
   - Microservices coordination
   - Data pipeline orchestration

### Production Readiness (Priority 3)

1. **Deployment Strategies**
   - Cluster setup and configuration
   - High availability patterns
   - Security and authentication
   - Multi-tenant architectures

2. **Monitoring & Observability**
   - Metrics collection and alerting
   - Distributed tracing integration
   - Log aggregation strategies
   - Performance monitoring

3. **Testing & Quality Assurance**
   - Unit testing workflows and activities
   - Integration testing strategies
   - End-to-end testing patterns
   - Test environment management

### Language-Specific Guidance

**Go SDK Best Practices:**

- Context propagation and cancellation
- Error handling and custom error types
- Struct-based workflow and activity definitions
- Dependency injection patterns
- Testing with testify and workflow test environments

**Java SDK Patterns:**

- Spring Boot integration and dependency injection
- Interface-based workflow and activity definitions
- Exception handling and custom error types
- JUnit testing with workflow test frameworks
- Enterprise integration patterns

**TypeScript SDK Approaches:**

- Promise-based async patterns
- Type-safe workflow and activity definitions
- Error handling with custom error classes
- Jest testing with workflow test utilities
- Node.js deployment and scaling

**Python SDK Strategies:**

- Async/await patterns for workflows and activities
- Dataclass-based workflow definitions
- Exception handling with custom exception types
- Pytest testing with workflow test fixtures
- Integration with data processing frameworks

## Expected Outcome

After comprehensive context loading, you will have expert-level knowledge of:

### Foundation Knowledge

- **Temporal Architecture**: Deep understanding of workflow orchestration principles
- **Core Concepts**: Workflows, activities, workers, task queues, and durable execution
- **Development Patterns**: Best practices for workflow and activity implementation
- **Testing Strategies**: Comprehensive testing approaches for distributed workflows

### Implementation Expertise

- **Language-Specific Guidance**: SDK-specific patterns and best practices
- **Integration Patterns**: Connecting Temporal with existing systems and architectures
- **Production Deployment**: Cluster setup, scaling, and operational considerations
- **Performance Optimization**: Tuning workflows and activities for optimal performance

### Enterprise Capabilities

- **Security & Compliance**: Authentication, authorization, and audit requirements
- **Multi-Tenancy**: Isolating workflows and managing shared resources
- **Monitoring & Observability**: Comprehensive visibility into workflow execution
- **Disaster Recovery**: Backup, restore, and business continuity strategies

### Advanced Features

- **Workflow Versioning**: Managing evolving business logic and backward compatibility
- **Signal & Query Handling**: Interactive workflows and real-time state inspection
- **Child Workflows**: Orchestrating complex business processes
- **Saga Patterns**: Managing distributed transactions and compensation logic

## Usage Examples

```bash
# Load comprehensive Temporal context
/context-load-temporal

# After context loading, ask specific questions:
"How do I implement a long-running approval workflow with human interaction?"
"What's the best way to handle retries and timeouts for external API calls?"
"How do I version my workflows to handle backward compatibility?"
"What monitoring should I set up for production Temporal workflows?"
```

## Context Loading Success Indicators

✅ **Core Concepts Loaded**: Fundamental understanding of durable execution
✅ **Implementation Patterns**: Language-specific development guidance
✅ **Production Readiness**: Deployment and operational best practices
✅ **Advanced Features**: Signal handling, versioning, and enterprise patterns
✅ **Testing Strategies**: Comprehensive testing and quality assurance approaches
✅ **Monitoring & Observability**: Production monitoring and alerting guidance
✅ **Security & Compliance**: Enterprise-grade security and governance patterns
✅ **Performance Optimization**: Scaling and tuning strategies for high-throughput scenarios