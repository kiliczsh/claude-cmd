---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), WebFetch, Task
name: "Context Load Fresh Connect Stack"
description: "Load comprehensive context about Fresh + ConnectRPC full-stack architecture with project-specific analysis"
author: "wcygan"
tags: ["context","web"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Project structure: !`fd . -t d -d 3 | head -10 || echo "No directories found"`
- Fresh indicators: !`fd "deno.json" . -d 2 -x jq -r '.imports | keys[]? // empty' {} 2>/dev/null | rg "@fresh" || echo "No Fresh imports found"`
- Go backend indicators: !`fd "go.mod" . -d 3 | head -3 || echo "No Go modules found"`
- ConnectRPC patterns: !`rg "connectrpc|connect-go|@connectrpc" . --type typescript --type go | head -5 || echo "No ConnectRPC patterns found"`
- Buf.build packages: !`rg "@buf/.*\.bufbuild" . --type json --type typescript | head -3 || echo "No buf.build packages found"`
- Docker setup: !`fd "docker-compose.yml|Dockerfile" . -d 2 || echo "No Docker configuration found"`
- Technology stack summary: !`echo "Frontend: $(fd "deno.json" . -d 2 | wc -l | tr -d ' ') | Backend: $(fd "go.mod" . -d 3 | wc -l | tr -d ' ') | Docker: $(fd "docker-compose.yml" . -d 2 | wc -l | tr -d ' ')"`

## Your Task

STEP 1: Initialize comprehensive Fresh + ConnectRPC context loading session

- CREATE session state file: `/tmp/fresh-connect-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "$(date -Iseconds)",
    "phase": "initialization",
    "architecture_type": "auto-detect",
    "frontend_detected": false,
    "backend_detected": false,
    "integration_patterns": [],
    "documentation_loaded": {},
    "project_analysis": {},
    "context_areas": [
      "architecture_overview",
      "project_structure",
      "development_workflow",
      "integration_patterns",
      "production_features"
    ],
    "checkpoints": []
  }
  ```
- CREATE context workspace: `/tmp/fresh-connect-context-$SESSION_ID/`

STEP 2: Project architecture detection and analysis

TRY:

- Think deeply about the optimal Fresh + ConnectRPC architecture patterns based on the detected project structure

- ANALYZE project structure from Context section
- DETERMINE Fresh + ConnectRPC architecture type:

  IF Fresh indicators found AND Go backend indicators found:
  - SET architecture_type = "full_stack_fresh_connect"
  - ENABLE comprehensive full-stack context loading
  - PRIORITIZE: Integration patterns, API proxy setup, type safety

  ELSE IF Fresh indicators found AND NOT Go backend:
  - SET architecture_type = "fresh_frontend_only"
  - FOCUS on Fresh-specific patterns and potential ConnectRPC integration
  - PRIORITIZE: Frontend architecture, potential backend integration

  ELSE IF Go backend indicators found AND NOT Fresh:
  - SET architecture_type = "connectrpc_backend_only"
  - FOCUS on ConnectRPC service patterns and frontend integration readiness
  - PRIORITIZE: Backend architecture, API design, frontend integration prep

  ELSE:
  - SET architecture_type = "greenfield_setup"
  - PROVIDE comprehensive setup guidance for new Fresh + ConnectRPC project
  - PRIORITIZE: Project initialization, architecture decisions, tooling setup

CATCH (project_analysis_failed):

- LOG analysis issues to session state
- CONTINUE with generic Fresh + ConnectRPC guidance
- PROVIDE manual project setup instructions

STEP 3: Adaptive documentation loading based on detected architecture

CASE architecture_type:
WHEN "full_stack_fresh_connect":

- Think harder about full-stack integration patterns and potential architectural challenges
- USE Task tool for parallel documentation loading with 5 specialized agents:
  1. **Fresh Architecture Agent**: Load Fresh 2.0 Islands, SSR, routing patterns
     - SAVE findings to: `/tmp/fresh-connect-context-$SESSION_ID/fresh-architecture.json`
  2. **ConnectRPC Integration Agent**: Load Go ConnectRPC, buf.build, protobuf patterns
     - SAVE findings to: `/tmp/fresh-connect-context-$SESSION_ID/connectrpc-integration.json`
  3. **API Proxy Patterns Agent**: Load proxy configuration, CORS, type safety
     - SAVE findings to: `/tmp/fresh-connect-context-$SESSION_ID/api-proxy-patterns.json`
  4. **Development Workflow Agent**: Load Deno tasks, hot reload, Docker setup
     - SAVE findings to: `/tmp/fresh-connect-context-$SESSION_ID/dev-workflow.json`
  5. **Production Deployment Agent**: Load deployment, monitoring, security patterns
     - SAVE findings to: `/tmp/fresh-connect-context-$SESSION_ID/production-patterns.json`

WHEN "fresh_frontend_only":

- EXECUTE focused Fresh documentation loading:
  - Think deeply about Fresh 2.0 architecture and integration capabilities
  - LOAD: Fresh Islands, routing, Preact signals, API integration patterns
  - FOCUS: Preparing for potential ConnectRPC backend integration
  - PROVIDE: Backend integration readiness assessment

WHEN "connectrpc_backend_only":

- EXECUTE focused ConnectRPC documentation loading:
  - Think harder about ConnectRPC service design and frontend integration
  - LOAD: Go ConnectRPC, protobuf schemas, CORS handling, API design
  - FOCUS: Frontend-ready API design and integration patterns
  - PROVIDE: Fresh frontend integration guidance

WHEN "greenfield_setup":

- EXECUTE comprehensive setup documentation loading:
  - LOAD: Project initialization, architecture decisions, tooling setup
  - FOCUS: Best practices for Fresh + ConnectRPC project creation
  - PROVIDE: Step-by-step project setup guidance

STEP 4: Comprehensive documentation fetching and context synthesis

TRY:

**Core Framework Documentation:**

1. **Fresh Framework Context**
   - TRY WebFetch: `https://fresh.deno.dev/docs/introduction`
   - FOCUS: Islands architecture, SSR, routing, deployment
   - EXTRACT: Key concepts, integration patterns, best practices
   - FALLBACK: Use embedded documentation if fetch fails

2. **Fresh 2.0 Evolution**
   - TRY WebFetch: `https://deno.com/blog/an-update-on-fresh`
   - FOCUS: New features, migration guidance, alpha stability
   - EXTRACT: Production readiness, breaking changes, roadmap
   - FALLBACK: Reference cached alpha documentation patterns

3. **ConnectRPC Go Documentation**
   - TRY WebFetch: `https://connectrpc.com/docs/go/getting-started`
   - FOCUS: Service implementation, middleware, testing
   - EXTRACT: Best practices, error handling, performance patterns
   - FALLBACK: Use embedded Go service patterns

4. **ConnectRPC Web Integration**
   - TRY WebFetch: `https://connectrpc.com/docs/web/getting-started`
   - FOCUS: Browser client setup, transport configuration
   - EXTRACT: Integration patterns, debugging, optimization
   - FALLBACK: Reference client setup examples below

5. **Protocol Buffers Schema Design**
   - TRY WebFetch: `https://developers.google.com/protocol-buffers/docs/proto3`
   - FOCUS: Schema design, evolution, best practices
   - EXTRACT: Type safety, versioning, performance considerations
   - FALLBACK: Use embedded protobuf best practices

CATCH (documentation_fetch_failed):

- LOG failed sources to session state with specific error details
- CONTINUE with available documentation and embedded examples
- PROVIDE comprehensive manual documentation references
- SAVE detailed fallback resources list with alternative sources

STEP 5: Project-specific context organization and synthesis

- Think deeply about integrating all loaded context into actionable guidance for the specific project architecture
- ORGANIZE loaded context by architecture domains:
  - **Frontend Architecture**: Fresh Islands, SSR, client-side state
  - **Backend Services**: ConnectRPC handlers, middleware, testing
  - **Integration Layer**: API proxy, CORS, type safety
  - **Development Experience**: Hot reload, task automation, debugging
  - **Production Deployment**: Docker, monitoring, security
  - **Type Safety**: End-to-end type flow, schema evolution

- SYNTHESIZE project-specific guidance with comprehensive analysis:
  - Integration patterns tailored to detected project structure
  - Optimization strategies for current technology stack
  - Migration paths for architecture evolution with risk assessment
  - Performance considerations and bottleneck prevention
  - Security best practices for the specific stack combination

STEP 6: Session state management and context completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/fresh-connect-context-cache-$SESSION_ID.json`
- CREATE comprehensive context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary with key integration areas
- CLEAN UP temporary processing files: `/tmp/fresh-connect-temp-$SESSION_ID-*`

## Essential Integration Patterns

**Core Architecture Components (loaded into context):**

### 1. Package Installation (BSR/Buf Schema Registry)

**Buf.build Package Integration:**

```bash
# Install from Buf Schema Registry
deno install npm:@buf/wcygan_hello.bufbuild_es
```

**Dependencies Configuration Pattern:**

```json
// deno.json imports section
{
  "imports": {
    "@fresh/core": "jsr:@fresh/core@^2.0.0-alpha.22",
    "@preact/signals": "npm:@preact/signals@^1.3.0",
    "@connectrpc/connect": "npm:@connectrpc/connect@^2.0.0",
    "@connectrpc/connect-web": "npm:@connectrpc/connect-web@^2.0.0",
    "@buf/your_org_schema.bufbuild_es": "npm:@buf/your_org_schema.bufbuild_es@^2.5.2"
  },
  "nodeModulesDir": "auto"
}
```

### 2. API Proxy Route (Critical for Frontend-Backend Communication)

```typescript
// frontend/routes/api/[...path].ts
import { type FreshContext } from "@fresh/core";

const BACKEND_URL = Deno.env.get("BACKEND_URL") || "http://localhost:3007";

export async function handler(req: Request, _ctx: FreshContext) {
  const url = new URL(req.url);
  const backendUrl = `${BACKEND_URL}${url.pathname.replace("/api", "")}`;

  const response = await fetch(backendUrl, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  // Clone response with CORS headers
  const corsHeaders = new Headers(response.headers);
  corsHeaders.set("Access-Control-Allow-Origin", "*");
  corsHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  corsHeaders.set("Access-Control-Allow-Headers", "Content-Type, Connect-Protocol-Version");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: corsHeaders,
  });
}
```

### 3. Frontend Island Component with ConnectRPC Client

```typescript
// frontend/islands/GreeterApp.tsx
import { useSignal } from "@preact/signals";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { GreeterService } from "@buf/wcygan_hello.bufbuild_es/hello/v1/hello_connect";

const transport = createConnectTransport({
  baseUrl: "/api",
  useBinaryFormat: false,
});

const client = createClient(GreeterService, transport);

export function GreeterApp() {
  const name = useSignal("");
  const greeting = useSignal("");
  const loading = useSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    loading.value = true;

    try {
      const response = await client.sayHello({ name: name.value });
      greeting.value = response.message;
    } catch (error) {
      greeting.value = `Error: ${error.message}`;
    } finally {
      loading.value = false;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name.value}
        onInput={(e) => name.value = e.currentTarget.value}
        placeholder="Enter your name"
      />
      <button type="submit" disabled={loading.value}>
        {loading.value ? "Loading..." : "Say Hello"}
      </button>
      {greeting.value && <p>{greeting.value}</p>}
    </form>
  );
}
```

### 4. Backend ConnectRPC Service

```go
// backend/cmd/server/main.go
package main

import (
    "log"
    "net/http"
    "github.com/connectrpc/connect-go"
    hellov1 "buf.build/gen/go/wcygan/hello/protocolbuffers/go/hello/v1"
    "buf.build/gen/go/wcygan/hello/connectrpc/go/hello/v1/hellov1connect"
)

type GreeterService struct{}

func (s *GreeterService) SayHello(
    ctx context.Context,
    req *connect.Request[hellov1.SayHelloRequest],
) (*connect.Response[hellov1.SayHelloResponse], error) {
    name := req.Msg.Name
    if name == "" {
        name = "World"
    }

    return connect.NewResponse(&hellov1.SayHelloResponse{
        Message: fmt.Sprintf("Hello, %s!", name),
    }), nil
}

func main() {
    greeter := &GreeterService{}
    path, handler := hellov1connect.NewGreeterServiceHandler(greeter)

    mux := http.NewServeMux()
    mux.Handle(path, handler)

    // Add CORS middleware
    corsHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Connect-Protocol-Version")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        mux.ServeHTTP(w, r)
    })

    log.Fatal(http.ListenAndServe(":3007", corsHandler))
}
```

### 5. Buf.build Registry Configuration

**NPM Registry Setup:**

```bash
# .npmrc configuration
@buf:registry=https://buf.build/gen/npm/v1/
```

**Project Structure Integration:**

```
project/
├── frontend/              # Fresh 2.0 application
│   ├── deno.json         # Dependencies and tasks
│   ├── .npmrc            # Buf.build registry config
│   ├── routes/
│   │   └── api/[...path].ts  # API proxy for ConnectRPC
│   └── islands/          # Interactive components
├── backend/              # Go ConnectRPC service
│   ├── go.mod           # Go dependencies
│   ├── cmd/server/      # Main server implementation
│   └── internal/        # Service logic
├── proto/               # Protocol Buffer schemas
├── docker-compose.yml   # Development orchestration
└── deno.json           # Root task automation
```

### 6. Docker Compose for Local Development

```yaml
# docker-compose.yml
services:
  backend:
    build: ./backend
    ports:
      - "3007:3007"
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3007/health"]

  frontend:
    build: ./frontend
    ports:
      - "8007:8007"
    environment:
      - BACKEND_URL=http://backend:3007
    depends_on:
      backend:
        condition: service_healthy
```

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE detected_architecture:
WHEN "full_stack_fresh_connect":

- PRIORITIZE: API proxy patterns, type safety, integration debugging
- FOCUS: Production deployment, performance optimization, monitoring
- EXAMPLES: Complex integrations, error handling, scaling patterns

WHEN "fresh_frontend_only":

- PRIORITIZE: Fresh architecture, potential backend integration
- FOCUS: API design, client-side patterns, data management
- EXAMPLES: ConnectRPC client setup, proxy configuration

WHEN "connectrpc_backend_only":

- PRIORITIZE: Service design, frontend-ready APIs, CORS configuration
- FOCUS: Protocol buffer design, middleware, testing
- EXAMPLES: Fresh integration patterns, client generation

WHEN "greenfield_setup":

- PRIORITIZE: Project setup, architecture decisions, tooling
- FOCUS: Best practices, development workflow, initial implementation
- EXAMPLES: Step-by-step setup, configuration templates

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY Fresh 2.0 alpha compatibility and stability
- VALIDATE ConnectRPC version compatibility
- CHECK for breaking changes and migration paths
- ENSURE buf.build integration patterns are current
- CONFIRM Docker and deployment patterns work with latest versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Fresh 2.0 Architecture:**

- Islands architecture with selective hydration
- SSR and client-side routing patterns
- Preact signals for reactive state management
- API integration and proxy patterns
- Production deployment and optimization

**ConnectRPC Integration:**

- Go service implementation patterns
- Type-safe RPC communication
- Protocol Buffer schema design
- Browser client configuration
- Error handling and middleware

**Full-Stack Integration:**

- API proxy route configuration
- CORS handling and security
- End-to-end type safety
- Development workflow automation
- Docker containerization and orchestration

**Production Considerations:**

- Multi-stage Docker builds
- Health checks and monitoring
- Security hardening
- Performance optimization
- Deployment strategies

The context loading adapts to your specific project structure and emphasizes the most relevant Fresh + ConnectRPC integration patterns for your current development needs.

## Session State Management

**State Files Created:**

- `/tmp/fresh-connect-context-$SESSION_ID.json` - Main session state
- `/tmp/fresh-connect-context-cache-$SESSION_ID.json` - Documentation cache
- `/tmp/fresh-connect-patterns-$SESSION_ID.json` - Integration patterns and recommendations

**Enhanced State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "phase": "initialization|detection|loading|synthesis|complete",
  "architecture_analysis": {
    "type": "full_stack_fresh_connect|fresh_frontend_only|connectrpc_backend_only|greenfield_setup",
    "fresh_detected": "boolean",
    "connectrpc_detected": "boolean",
    "docker_detected": "boolean",
    "complexity_level": "simple|moderate|enterprise"
  },
  "documentation_loaded": {
    "fresh_introduction": "loaded|failed|skipped",
    "fresh_2_update": "loaded|failed|skipped",
    "connectrpc_go": "loaded|failed|skipped",
    "connectrpc_web": "loaded|failed|skipped",
    "protobuf_guide": "loaded|failed|skipped"
  },
  "integration_patterns": {
    "api_proxy_configured": "boolean",
    "buf_registry_setup": "boolean",
    "docker_orchestration": "boolean",
    "type_safety_verified": "boolean"
  },
  "context_optimization": {
    "project_specific_patterns": [],
    "integration_recommendations": [],
    "performance_considerations": [],
    "deployment_strategies": []
  },
  "checkpoints": {
    "detection_complete": "boolean",
    "documentation_loaded": "boolean",
    "context_synthesized": "boolean",
    "session_archived": "boolean"
  }
}
```