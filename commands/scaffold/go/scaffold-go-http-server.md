---
allowed-tools: Write, MultiEdit, Bash(go:*), Bash(gdate:*), Bash(mkdir:*), Bash(cd:*), Bash(pwd:*), Bash(touch:*), Bash(echo:*)
name: "Scaffold Go Http Server"
description: "Scaffold production-ready Go HTTP server with Grafana-inspired patterns and comprehensive best practices"
author: "wcygan"
tags: ["scaffold","go"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Current directory: !`pwd`
- Project name: $ARGUMENTS
- Go version: !`go version 2>/dev/null || echo "Go not found - will need installation"`
- Current directory name: !`basename $(pwd)`
- Existing files: !`ls -la 2>/dev/null | head -5 || echo "Directory empty or inaccessible"`

## Your Task

STEP 1: Initialize project structure and session state

TRY:

- DETERMINE project name: IF $ARGUMENTS provided, use it; ELSE use current directory name
- CREATE session state file: `/tmp/go-scaffold-session-$SESSION_ID.json`
- VALIDATE Go installation and version compatibility
- PREPARE project directory structure

```bash
# Initialize session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "projectName": "'$PROJECT_NAME'",
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "status": "initializing",
  "files_created": [],
  "steps_completed": []
}' > /tmp/go-scaffold-session-$SESSION_ID.json
```

CATCH (initialization_failed):

- LOG error details to session state
- PROVIDE Go installation guidance if missing
- EXIT gracefully with setup instructions

STEP 2: Scaffold production-ready Go HTTP server with comprehensive architecture

FOR EACH file in scaffold structure:

**A. Core Application Files (Grafana-Inspired Architecture):**

1. **main.go** - Minimal main function with run() pattern (no global state)
2. **server.go** - Server constructor returning http.Handler (dependency injection)
3. **routes.go** - Centralized route definitions with factory pattern
4. **handlers.go** - HTTP handlers with explicit dependency injection
5. **middleware.go** - Production-ready middleware stack
6. **health.go** - Comprehensive health check with graceful degradation

**B. Infrastructure Files:**

7. **go.mod** - Go module initialization with minimal dependencies
8. **Dockerfile** - Multi-stage Docker build for production
9. **docker-compose.yml** - Local development environment
10. **.gitignore** - Go-specific gitignore patterns
11. **README.md** - Concise quick-start documentation

**C. Documentation & Best Practices:**

12. **docs/best-practices.md** - Comprehensive production patterns guide

**Core Implementation Requirements (Grafana Gold Standard):**

**1. Server Constructor Pattern (No Global State):**

- `NewServer()` function with explicit dependency injection
- Returns `http.Handler` for composability and testing
- Zero global variables or init() functions

**2. Production Server Configuration (Critical Timeouts):**

- ReadTimeout, WriteTimeout, IdleTimeout, ReadHeaderTimeout
- MaxHeaderBytes limiting for security
- Proper HTTP/2 support configuration

**3. Essential Middleware Stack:**

- Structured request logging with request IDs
- Security headers (HSTS, CSP, X-Frame-Options, etc.)
- Panic recovery with stack trace logging
- CORS handling for API endpoints

**4. Handler Factory Pattern:**

- Handler factories returning `http.Handler`
- Closure-based dependency access
- Comprehensive error handling with proper HTTP status codes
- JSON request/response validation

**5. Health Check Implementation:**

- `/healthz` endpoint with structured JSON response
- Dependency health validation (database, external services)
- Graceful degradation during shutdown sequences

**6. Graceful Shutdown (Signal Handling):**

- SIGTERM and SIGINT signal handling
- Context-based shutdown with configurable timeout
- Resource cleanup coordination

STEP 3: Execute systematic file creation with production-ready implementations

FOR EACH file in project structure:

- CREATE file with complete, production-ready implementation
- FOLLOW Grafana-inspired patterns exactly
- INCLUDE comprehensive error handling
- ADD detailed code comments explaining patterns
- UPDATE session state with file creation

**Required API Endpoints:**

- `GET /healthz` - Health check with dependency validation
- `GET /api/v1/items` - Example resource listing with pagination
- `POST /api/v1/items` - Example resource creation with validation
- `GET /api/v1/items/{id}` - Example resource retrieval with proper error handling

**Environment Configuration Support:**

- PORT (default: 8080)
- LOG_LEVEL (debug, info, warn, error)
- SHUTDOWN_TIMEOUT (default: 30s)
- TLS_CERT_PATH and TLS_KEY_PATH for HTTPS

STEP 4: Initialize Go module and validate project

- EXECUTE `go mod init $PROJECT_NAME` to initialize Go module
- RUN `go mod tidy` to resolve dependencies
- VERIFY server starts successfully with basic smoke test
- UPDATE session state with initialization status

STEP 5: Create comprehensive best practices documentation

- CREATE `/docs/best-practices.md` with production patterns guide
- INCLUDE all Grafana-inspired architectural patterns
- DOCUMENT security hardening and performance optimization
- ADD testing strategies and deployment guidelines

**Best Practices Documentation Structure:**

## Best Practices Documentation Content for `/docs/best-practices.md`:

**Core Sections to Include:**

1. **Core Architecture Patterns** - Server constructor, handler factories, minimal main
2. **Production Server Configuration** - Critical timeouts and HTTP/2 setup
3. **Middleware Design** - Composable patterns and essential middleware
4. **Handler Patterns** - JSON API handlers with comprehensive validation
5. **Security Hardening** - Input validation and security headers
6. **Performance Optimization** - Connection pooling and memory management
7. **Testing Strategies** - Handler testing and integration patterns
8. **Deployment Guidelines** - Production checklist and common pitfalls

STEP 6: Finalize project setup and provide quick start instructions

- CREATE quick start instructions in project README
- TEST server startup and endpoint responses
- GENERATE project summary with key commands
- UPDATE session state to "completed"

```bash
# Final session state update
jq --arg status "completed" --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .status = $status |
  .completed_timestamp = $timestamp |
  .steps_completed += ["project_scaffolded", "documentation_created", "validation_passed"]
' /tmp/go-scaffold-session-$SESSION_ID.json > /tmp/go-scaffold-session-$SESSION_ID.tmp && \
mv /tmp/go-scaffold-session-$SESSION_ID.tmp /tmp/go-scaffold-session-$SESSION_ID.json
```

FINALLY:

- PROVIDE quick start commands for development
- SHOW project structure overview
- INCLUDE next steps for customization
- CLEAN UP temporary session files

## Production Implementation Template

**Complete reference implementation:** [See full content above for production-ready Go HTTP server patterns]

**Key Documentation Sections:**

- Core Architecture Patterns (Server constructor, handler factories)
- Production Server Configuration (Critical timeouts)
- Middleware Design (Composable patterns)
- Handler Patterns (JSON API with validation)
- Security Hardening (Input validation, headers)
- Testing Strategies (Handler testing)
- Deployment Guidelines (Production checklist)

Focus on creating a production-ready foundation following Grafana-inspired patterns while maintaining simplicity and standard library usage.