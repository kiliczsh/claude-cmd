---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(mvn:*), Bash(gradle:*), Task
name: "Context Load Java Quarkus"
description: "Load comprehensive Java Quarkus documentation context with project-specific optimization"
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
- Quarkus projects: !`rg "quarkus" . --type xml --type gradle | wc -l | tr -d ' ' || echo "0"`
- Quarkus extensions: !`rg "quarkus-[a-zA-Z-]+" . --type xml --type gradle | head -10 || echo "No Quarkus extensions detected"`
- Application properties: !`fd "(application\.properties|application\.yml|application\.yaml)" . | head -3 || echo "No config files found"`
- Native build config: !`fd "(native|graalvm)" . -t d | head -3 || echo "No native build config"`
- Reactive dependencies: !`rg "(mutiny|vertx|reactive)" . --type xml --type gradle | wc -l | tr -d ' ' || echo "0"`
- MicroProfile usage: !`rg "(microprofile|mp-)" . --type xml --type gradle | wc -l | tr -d ' ' || echo "0"`
- Test frameworks: !`rg "(junit|testcontainers|rest-assured)" . --type xml --type gradle | wc -l | tr -d ' ' || echo "0"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/quarkus-context-$SESSION_ID.json`
- SET initial state with project analysis results from Context section
- DETERMINE project-specific documentation priorities

```json
// /tmp/quarkus-context-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "phase": "discovery|loading|organization|completion",
  "project_analysis": {
    "hasQuarkusProjects": "boolean",
    "detectedExtensions": [],
    "reactivePatterns": "boolean",
    "microProfileUsage": "boolean",
    "nativeBuildSetup": "boolean",
    "testingFrameworks": []
  },
  "context_strategy": "new_project|existing_quarkus|migration|comprehensive",
  "loaded_documentation": [],
  "prioritized_areas": [],
  "checkpoints": {
    "discovery_complete": false,
    "core_docs_loaded": false,
    "extensions_loaded": false,
    "testing_loaded": false,
    "deployment_loaded": false
  }
}
```

STEP 2: Project-specific analysis and strategy selection

Think deeply about optimal documentation loading strategies based on project complexity and Quarkus adoption level.

CASE project_context:
WHEN "existing_quarkus_project":

- PRIORITIZE: Extension-specific guides, performance optimization, native compilation
- FOCUS: Advanced patterns, reactive programming, MicroProfile integration
- EMPHASIZE: Testing strategies, deployment optimization, monitoring setup

WHEN "new_quarkus_project":

- PRIORITIZE: Getting started guides, basic configuration, essential extensions
- FOCUS: Project setup, dependency injection, configuration management
- EMPHASIZE: Development workflow, basic testing, local development

WHEN "migration_to_quarkus":

- PRIORITIZE: Migration guides, Spring to Quarkus conversion, compatibility layers
- FOCUS: Incremental migration, dependency mapping, testing during migration
- EMPHASIZE: Performance comparisons, feature parity, deployment strategies

WHEN "comprehensive_learning":

- PRIORITIZE: Complete framework coverage, advanced patterns, best practices
- FOCUS: Native compilation, reactive programming, extension development
- EMPHASIZE: Performance optimization, cloud deployment, observability

STEP 3: Strategic documentation loading with error handling

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL with retry logic
- PROCESS and organize information by functional area
- SAVE loaded context summary to session state

**Core Documentation Sources (Priority Order):**

FOR EACH priority_level IN ["essential", "advanced", "specialized"]:

**Essential Documentation (Priority 1):**

1. **Quarkus Getting Started Guide**
   - URL: `https://quarkus.io/guides/getting-started`
   - FETCH: Project setup, dependency injection, basic configuration
   - FOCUS: CDI patterns, configuration properties, development mode
   - EXTRACT: Code examples and project structure patterns

2. **Quarkus Guides Overview**
   - URL: `https://quarkus.io/guides/`
   - FETCH: Guide categories, extension catalog, integration patterns
   - FOCUS: Available extensions, integration guides, best practices
   - EXTRACT: Extension compatibility matrix and usage patterns

3. **Native Image Compilation**
   - URL: `https://quarkus.io/guides/building-native-image`
   - FETCH: GraalVM integration, compilation optimization, troubleshooting
   - FOCUS: Native image configuration, reflection hints, build optimization
   - EXTRACT: Performance metrics and compilation best practices

**Advanced Documentation (Priority 2):**

4. **Reactive Programming with Mutiny**
   - URL: `https://quarkus.io/guides/getting-started-reactive`
   - FETCH: Reactive streams, Mutiny patterns, non-blocking I/O
   - FOCUS: Async processing, backpressure handling, error management
   - EXTRACT: Reactive architecture patterns and performance considerations

5. **MicroProfile Integration**
   - URL: `https://microprofile.io/`
   - FETCH: Health checks, metrics, fault tolerance, JWT authentication
   - FOCUS: Observability patterns, resilience strategies, security
   - EXTRACT: MicroProfile specification implementation examples

6. **Testing Strategies**
   - URL: `https://quarkus.io/guides/getting-started-testing`
   - FETCH: Test framework integration, mocking, TestContainers
   - FOCUS: Unit testing, integration testing, native image testing
   - EXTRACT: Testing patterns and CI/CD integration

**Specialized Documentation (Priority 3):**

7. **Extension Development**
   - URL: `https://quarkus.io/guides/writing-extensions`
   - FETCH: Extension architecture, build time optimization, runtime behavior
   - FOCUS: Custom extension creation, annotation processing, reflection
   - EXTRACT: Extension development patterns and performance optimization

8. **Cloud Deployment Patterns**
   - URL: `https://quarkus.io/guides/deploying-to-kubernetes`
   - FETCH: Kubernetes deployment, container optimization, service mesh
   - FOCUS: Cloud-native patterns, observability, scaling strategies
   - EXTRACT: Deployment configuration and monitoring setup

CATCH (documentation_fetch_failed):

- LOG failed sources to session state with retry timestamps
- CONTINUE with available documentation sources
- PROVIDE manual context loading instructions for failed sources
- SAVE fallback documentation references for later retry

CATCH (network_connectivity_issues):

- SWITCH to offline documentation strategy if available
- PROVIDE local documentation setup instructions
- SAVE session state for later continuation when connectivity restored
- GENERATE documentation checklist for manual loading

STEP 4: Context organization and synthesis

Think harder about optimal knowledge organization for Java enterprise development patterns and Quarkus-specific optimizations.

PROCEDURE organize_loaded_context():

- SYNTHESIZE documentation by functional areas:
  - **Application Architecture**: Dependency injection, configuration, lifecycle
  - **Performance Optimization**: Native compilation, startup time, memory usage
  - **Reactive Programming**: Mutiny patterns, non-blocking I/O, streaming
  - **Enterprise Integration**: MicroProfile, messaging, database connectivity
  - **Testing and Quality**: Unit testing, integration testing, native testing
  - **Deployment and Operations**: Container optimization, cloud deployment, monitoring
  - **Extension Ecosystem**: Available extensions, custom development, integration

- CREATE project-specific guidance based on detected patterns:
  - Integration strategies for existing Spring Boot applications
  - Migration paths from traditional Java EE applications
  - Performance optimization recommendations for detected use cases
  - Security considerations for enterprise deployment
  - Monitoring and observability setup for production environments

STEP 5: Session completion and context validation

TRY:

- VALIDATE loaded context completeness against project requirements
- GENERATE context summary organized by development phase
- UPDATE session state with completion status and metrics
- CREATE context reference guide for future development tasks

IF project has Quarkus extensions:

- CROSS-REFERENCE extension documentation with loaded guides
- IDENTIFY missing extension-specific documentation needs
- RECOMMEND additional context loading for specialized extensions

IF reactive patterns detected:

- VALIDATE reactive programming context coverage
- ENSURE Mutiny and reactive streams documentation is comprehensive
- RECOMMEND performance testing strategies for reactive applications

FINALLY:

- ARCHIVE context session data: `/tmp/quarkus-context-archive-$SESSION_ID/`
- PROVIDE context loading summary with coverage metrics
- CLEAN UP temporary session files
- UPDATE session state: phase = "complete"

## Context Loading Strategies

**Adaptive Loading Based on Project Analysis:**

FOR existing_quarkus_projects:

- EMPHASIZE: Advanced patterns, performance optimization, extension integration
- INCLUDE: Native compilation strategies, reactive programming mastery
- FOCUS: Production deployment, monitoring, troubleshooting

FOR new_quarkus_development:

- EMPHASIZE: Getting started guides, project setup, basic patterns
- INCLUDE: Development workflow, configuration management, testing basics
- FOCUS: Local development, dependency management, basic deployment

FOR spring_boot_migration:

- EMPHASIZE: Migration guides, compatibility patterns, feature mapping
- INCLUDE: Incremental migration strategies, testing during transition
- FOCUS: Performance comparisons, deployment strategy migration

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Quarkus version compatibility
- VALIDATE code examples for current Java LTS versions (11, 17, 21)
- CHECK for deprecated APIs and migration guidance
- ENSURE security best practices are current and comprehensive
- CONFIRM native compilation examples work with latest GraalVM

## Expected Outcomes

After executing this command, you will have comprehensive context on:

**Core Quarkus Capabilities:**

- Supersonic startup times and low memory footprint optimization
- Native image compilation with GraalVM integration
- Reactive programming patterns with Mutiny
- Dependency injection with CDI and Arc container
- Configuration management and application profiles

**Enterprise Integration:**

- MicroProfile compliance (Health, Metrics, Fault Tolerance, JWT)
- Database connectivity with Hibernate ORM and Panache
- Messaging integration (Kafka, RabbitMQ, ActiveMQ)
- RESTful web services and OpenAPI integration
- Security patterns (OIDC, JWT, RBAC)

**Development and Testing:**

- Live coding and hot reload development workflow
- Comprehensive testing strategies (unit, integration, native)
- TestContainers integration for integration testing
- Continuous testing and dev services
- Debugging native applications

**Production Deployment:**

- Container optimization and multi-stage builds
- Kubernetes deployment with optimized resource usage
- Monitoring and observability (metrics, tracing, logging)
- Performance tuning and optimization strategies
- CI/CD pipeline integration and automation

The context loading adapts to your specific project structure and emphasizes the most relevant Quarkus documentation areas for your current development needs.