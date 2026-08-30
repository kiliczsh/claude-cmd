---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(go:*)
name: "Context Load Go Web"
description: "Load comprehensive Go web development documentation context with framework-specific optimization"
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
- Web frameworks: !`rg "(chi|gin|fiber|gorilla/mux|echo)" . --type go | wc -l | tr -d ' ' || echo "0"`
- HTTP handlers: !`rg "http\\.(Handler|HandlerFunc)" . --type go | wc -l | tr -d ' ' || echo "0"`
- Middleware patterns: !`rg "(middleware|Middleware)" . --type go | wc -l | tr -d ' ' || echo "0"`
- API routes: !`rg "(GET|POST|PUT|DELETE|PATCH).*(" . --type go | head -5 || echo "No API routes found"`
- Test files: !`fd "*_test\\.go$" . | head -5 || echo "No Go test files found"`
- Technology stack: !`fd "(deno\\.json|package\\.json|Cargo\\.toml)" . | head -3 || echo "Go-only project"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/go-web-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "go_web_features_detected": []
  }
  ```

STEP 2: Project-specific context analysis

- ANALYZE project structure from Context section
- DETERMINE specific Go web frameworks in use
- IDENTIFY documentation priorities based on project needs

IF Go projects with web framework usage found:

- FOCUS on project-specific framework patterns and middleware
- PRIORITIZE relevant HTTP handling and routing patterns
- INCLUDE testing and deployment contexts
  ELSE:
- LOAD general Go web development foundation
- EMPHASIZE getting-started guides and framework comparison
- INCLUDE project setup and basic HTTP server implementation

STEP 3: Strategic documentation loading

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by functional area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **Go HTTP Standard Library**
   - URL: `https://pkg.go.dev/net/http`
   - FETCH: HTTP handlers, middleware patterns, server/client implementation
   - FOCUS: HTTP fundamentals, handler functions, middleware chains
   - EXTRACT: Core patterns and performance considerations

2. **Chi Router Framework**
   - URL: `https://go-chi.io/` and `https://github.com/go-chi/chi`
   - FETCH: Lightweight routing, middleware composition, sub-routers
   - FOCUS: Routing patterns, middleware stacks, URL parameters
   - EXTRACT: Composable routing and middleware examples

3. **Gin Web Framework**
   - URL: `https://gin-gonic.com/docs/`
   - FETCH: Fast HTTP web framework with JSON support
   - FOCUS: Routing, middleware, JSON binding, template rendering
   - EXTRACT: High-performance patterns and binding examples

4. **Fiber Framework**
   - URL: `https://docs.gofiber.io/`
   - FETCH: Express.js inspired framework for Go
   - FOCUS: Fast routing, middleware, context handling, performance
   - EXTRACT: Express-like patterns and optimization techniques

5. **Gorilla Mux Router**
   - URL: `https://github.com/gorilla/mux` and `https://pkg.go.dev/github.com/gorilla/mux`
   - FETCH: Powerful URL router and dispatcher
   - FOCUS: Advanced routing, request matching, middleware
   - EXTRACT: Complex routing patterns and testing approaches

6. **Echo Framework**
   - URL: `https://echo.labstack.com/`
   - FETCH: High performance, extensible web framework
   - FOCUS: Routing, middleware, data binding, rendering
   - EXTRACT: Middleware patterns and performance optimization

7. **Go Web Development Best Practices**
   - URL: `https://golang.org/doc/articles/wiki/`
   - FETCH: Official Go web development tutorial and patterns
   - FOCUS: HTTP server patterns, template usage, error handling
   - EXTRACT: Canonical Go web development approaches

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and optimization

- ORGANIZE loaded context by functional area:
  - HTTP routing and URL patterns
  - Middleware implementation and chains
  - Request/response handling and data binding
  - JSON API development and validation
  - Error handling and status codes
  - HTTP client patterns and configuration
  - Testing strategies for web services
  - Performance optimization and monitoring
  - Security patterns and authentication

- SYNTHESIZE project-specific guidance:
  - Integration with existing Go codebase
  - Migration strategies between frameworks
  - Best practices for detected use cases
  - Security considerations for web applications

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/go-web-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE project_context:
WHEN "existing_web_service":

- PRIORITIZE: Framework-specific patterns, middleware optimization, testing
- FOCUS: Advanced routing, performance tuning, monitoring integration
- EXAMPLES: Middleware composition, API versioning, load testing

WHEN "microservices_architecture":

- PRIORITIZE: Service communication, health checks, observability
- FOCUS: HTTP clients, service discovery, circuit breakers
- EXAMPLES: Inter-service communication, distributed tracing

WHEN "rest_api_development":

- PRIORITIZE: API design, JSON handling, error responses
- FOCUS: RESTful patterns, validation, documentation
- EXAMPLES: CRUD operations, pagination, error handling

WHEN "new_web_project":

- PRIORITIZE: Framework selection, project setup, basic patterns
- FOCUS: Getting started, routing basics, middleware introduction
- EXAMPLES: Hello world services, basic CRUD, testing setup

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Go version compatibility
- VALIDATE code examples for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with current framework versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Go Web Development:**

- HTTP server and client implementation patterns
- Routing strategies and URL parameter handling
- Middleware design and composition patterns
- Request/response processing and data binding
- Error handling and HTTP status code management
- Testing strategies for web services and APIs

**Framework-Specific Patterns:**

- Chi router composable middleware and sub-routing
- Gin framework JSON binding and high-performance patterns
- Fiber Express-like development and optimization
- Gorilla Mux advanced routing and request matching
- Echo framework extensible architecture and data binding
- Standard library net/http foundational patterns

**Advanced Development Techniques:**

- RESTful API design and implementation
- JSON processing, validation, and error handling
- Middleware chains and custom middleware development
- HTTP client configuration and connection management
- Performance optimization and benchmarking
- Security patterns and authentication integration

**Testing and Quality Assurance:**

- HTTP handler testing strategies and patterns
- Integration testing for web services
- Mock server implementation and testing
- Performance testing and load testing approaches
- API documentation and contract testing
- Debugging and monitoring web applications

**Production Deployment:**

- Server configuration and deployment strategies
- Performance monitoring and metrics collection
- Security hardening and authentication patterns
- Scaling strategies and load balancing
- Container deployment and orchestration
- CI/CD integration for web services

The context loading adapts to your specific project structure and emphasizes the most relevant Go web development documentation areas for your current development needs.