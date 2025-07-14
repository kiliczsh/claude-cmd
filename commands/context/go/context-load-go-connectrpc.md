---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(go:*)
name: "Context Load Go Connectrpc"
description: "Load comprehensive Go ConnectRPC documentation context with project-specific optimization"
author: "wcygan"
tags: ["context","go"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Go projects: !`fd "go\\.mod" . | head -5 || echo "No Go projects found"`
- ConnectRPC usage: !`rg "connect-go|connectrpc\\.com" . --type go | wc -l | tr -d ' ' || echo "0"`
- Protocol buffers: !`fd "\\.proto$" . | head -5 || echo "No .proto files found"`
- Generated code: !`fd ".*\\.pb\\.go$" . | head -5 || echo "No generated Go files found"`
- Buf configuration: !`fd "(buf\\.yaml|buf\\.yml|buf\\.gen\\.yaml)" . | head -3 || echo "No Buf config found"`
- Technology stack: !`fd "(deno\\.json|package\\.json|Cargo\\.toml)" . | head -3 || echo "Go-only project"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/go-connectrpc-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "go_features_detected": []
  }
  ```

STEP 2: Project-specific context analysis

- ANALYZE project structure from Context section
- DETERMINE specific ConnectRPC features in use
- IDENTIFY documentation priorities based on project needs

IF Go projects with ConnectRPC usage found:

- FOCUS on project-specific implementation patterns
- PRIORITIZE relevant service definitions and client patterns
- INCLUDE deployment and testing contexts
  ELSE:
- LOAD general ConnectRPC foundation and getting-started guides
- EMPHASIZE setup, configuration, and basic service implementation
- INCLUDE project setup and code generation workflows

STEP 3: Strategic documentation loading

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by functional area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **ConnectRPC Official Documentation**
   - URL: `https://connectrpc.com/docs/`
   - FETCH: Core concepts, getting started, service implementation
   - FOCUS: Protocol definition, code generation, streaming patterns
   - EXTRACT: Implementation examples and best practices

2. **ConnectRPC Go Implementation**
   - URL: `https://connectrpc.com/docs/go/`
   - FETCH: Go-specific implementation patterns and client libraries
   - FOCUS: Service handlers, client creation, middleware integration
   - EXTRACT: Go code examples and configuration patterns

3. **Buf Schema Registry Documentation**
   - URL: `https://buf.build/docs/`
   - FETCH: Schema management, code generation, breaking change detection
   - FOCUS: Buf CLI usage, module system, code generation
   - EXTRACT: Workflow automation and CI/CD integration patterns

4. **Protocol Buffers Language Guide**
   - URL: `https://protobuf.dev/programming-guides/proto3/`
   - FETCH: Proto3 syntax, message definitions, service declarations
   - FOCUS: Field types, message composition, service design
   - EXTRACT: Schema design best practices and optimization patterns

5. **ConnectRPC Examples Repository**
   - URL: `https://github.com/connectrpc/examples-go`
   - FETCH: Practical implementation examples and patterns
   - FOCUS: Real-world service implementations and client usage
   - EXTRACT: Complete example applications and integration patterns

6. **gRPC Go Integration Guide**
   - URL: `https://grpc.io/docs/languages/go/`
   - FETCH: gRPC compatibility and migration patterns
   - FOCUS: Interceptors, error handling, streaming patterns
   - EXTRACT: Advanced patterns and performance optimization

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and optimization

- ORGANIZE loaded context by functional area:
  - Service definition and Protocol Buffers design
  - Code generation and build workflows
  - Server implementation and handler patterns
  - Client implementation and connection management
  - Streaming patterns (unary, server, client, bidirectional)
  - Interceptors and middleware chains
  - Error handling and status codes
  - Testing strategies and mock generation
  - Performance optimization and monitoring

- SYNTHESIZE project-specific guidance:
  - Integration with existing Go codebase
  - Migration strategies from gRPC or REST APIs
  - Best practices for detected use cases
  - Security considerations for RPC services

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/go-connectrpc-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE project_context:
WHEN "existing_connectrpc_services":

- PRIORITIZE: Service implementation patterns, client usage, interceptors
- FOCUS: Advanced streaming, error handling, performance optimization
- EXAMPLES: Service composition, client connection pooling

WHEN "grpc_migration":

- PRIORITIZE: Migration guides, compatibility patterns, feature parity
- FOCUS: gRPC to ConnectRPC migration, interceptor conversion
- EXAMPLES: Gradual migration strategies, dual-protocol support

WHEN "new_rpc_project":

- PRIORITIZE: Getting started, project setup, basic service implementation
- FOCUS: Protocol buffer design, code generation, basic patterns
- EXAMPLES: Simple services, client-server communication

WHEN "microservices_architecture":

- PRIORITIZE: Service discovery, load balancing, observability
- FOCUS: Service mesh integration, health checks, circuit breakers
- EXAMPLES: Distributed systems patterns, service composition

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Go version compatibility
- VALIDATE code examples for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with current ConnectRPC versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core ConnectRPC Capabilities:**

- Protocol Buffer schema design and best practices
- ConnectRPC service implementation with Go
- Client generation and connection management
- Streaming patterns (unary, server, client, bidirectional)
- Interceptor chains and middleware integration
- Error handling strategies and status codes

**Advanced Implementation Techniques:**

- Code generation workflows with Buf
- Custom interceptors and middleware development
- Connection pooling and resource management
- Testing strategies with mocks and test clients
- Performance optimization and monitoring
- Observability integration (tracing, metrics, logging)

**Project Integration:**

- Go module setup and dependency management
- Build system integration (Make, Bazel, CI/CD)
- Development workflow with code generation
- Testing framework integration and best practices
- Security configuration and authentication patterns
- Deployment strategies and service mesh integration

**Development Workflow:**

- IDE integration and tooling setup
- Debugging RPC services and clients
- Code generation automation and CI integration
- Performance profiling and optimization
- Migration patterns from REST or gRPC
- Monitoring and observability setup

The context loading adapts to your specific project structure and emphasizes the most relevant ConnectRPC documentation areas for your current development needs.