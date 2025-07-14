---
allowed-tools: Write, MultiEdit, Bash(go:*), Bash(buf:*), Bash(mkdir:*), Bash(cd:*), Bash(gdate:*), Bash(which:*)
name: "Scaffold Go Connect"
description: "Scaffold production-ready Go ConnectRPC server with Protocol Buffers and type-safe service definitions"
author: "wcygan"
tags: ["scaffold","go"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Project name: $ARGUMENTS
- Current directory: !`pwd`
- Go version: !`go version 2>/dev/null || echo "Go not installed"`
- Buf CLI status: !`which buf >/dev/null && echo "✓ installed" || echo "❌ missing - install with: go install github.com/bufbuild/buf/cmd/buf@latest"`
- Available ports: !`lsof -ti:8080 >/dev/null && echo "Port 8080 busy" || echo "Port 8080 available"`

## Your Task

STEP 1: Initialize session state and validate prerequisites

```bash
# Initialize scaffold session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "projectName": "'$ARGUMENTS'",
  "scaffoldType": "go-connectrpc",
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "status": "initializing"
}' > /tmp/scaffold-session-$SESSION_ID.json
```

TRY:

- VALIDATE project name is provided and valid
- CHECK Go installation and minimum version requirements
- VERIFY buf CLI availability for Protocol Buffer management
- ENSURE target directory doesn't already exist

CATCH (prerequisites_failed):

- LOG missing dependencies to session state
- PROVIDE installation instructions for missing tools
- EXIT gracefully with clear error messages

STEP 2: Create project structure with ConnectRPC best practices

**Directory Structure Creation:**

```bash
mkdir -p $ARGUMENTS
cd $ARGUMENTS

# Core project directories
mkdir -p {
  proto/greet/v1,
  internal/server,
  internal/service,
  cmd/server,
  gen
}
```

**Project Layout (Following Go Standards):**

- `proto/` - Protocol Buffer schema definitions
- `internal/` - Private application code
- `cmd/` - Main application entry points
- `gen/` - Generated code from Protocol Buffers

STEP 3: Protocol Buffer schema setup with buf.yaml configuration

**buf.yaml Configuration:**

```yaml
# buf.yaml
version: v1
deps:
  - buf.build/googleapis/googleapis
lint:
  use:
    - DEFAULT
breaking:
  use:
    - FILE
```

**buf.gen.yaml Configuration:**

```yaml
# buf.gen.yaml
version: v1
plugins:
  - plugin: buf.build/protocolbuffers/go
    out: gen
    opt: paths=source_relative
  - plugin: buf.build/connectrpc/go
    out: gen
    opt: paths=source_relative
```

**Protocol Buffer Service Definition:**

```proto
// proto/greet/v1/greet.proto
syntax = "proto3";

package greet.v1;

option go_package = "github.com/example/$ARGUMENTS/gen/greet/v1;greetv1";

service GreetService {
  rpc Greet(GreetRequest) returns (GreetResponse);
  rpc GreetStream(stream GreetRequest) returns (stream GreetResponse);
}

message GreetRequest {
  string name = 1;
}

message GreetResponse {
  string message = 1;
  int64 timestamp = 2;
}
```

STEP 4: Go module initialization and dependency management

**Go Module Setup:**

```bash
# Initialize Go module
go mod init github.com/example/$ARGUMENTS

# Add ConnectRPC dependencies
go get connectrpc.com/connect
go get golang.org/x/net/http2
go get golang.org/x/net/http2/h2c
```

STEP 5: Generate Protocol Buffer code using buf

**Code Generation:**

```bash
# Generate Go code from Protocol Buffers
buf generate

# Verify generated files
echo "Generated files:"
fd "\.pb\.go$" gen/
fd "connect\.go$" gen/
```

STEP 6: Implement ConnectRPC server with production patterns

**Service Implementation (internal/service/greet.go):**

```go
package service

import (
	"context"
	"fmt"
	"time"

	"connectrpc.com/connect"
	greetv1 "github.com/example/$ARGUMENTS/gen/greet/v1"
)

type GreetService struct{}

func NewGreetService() *GreetService {
	return &GreetService{}
}

func (s *GreetService) Greet(
	ctx context.Context,
	req *connect.Request[greetv1.GreetRequest],
) (*connect.Response[greetv1.GreetResponse], error) {
	res := connect.NewResponse(&greetv1.GreetResponse{
		Message:   fmt.Sprintf("Hello, %s!", req.Msg.Name),
		Timestamp: time.Now().Unix(),
	})
	res.Header().Set("Custom-Header", "from-connect")
	return res, nil
}

func (s *GreetService) GreetStream(
	ctx context.Context,
	stream *connect.BidiStream[greetv1.GreetRequest, greetv1.GreetResponse],
) error {
	for {
		req, err := stream.Receive()
		if err != nil {
			return err
		}
		
		res := &greetv1.GreetResponse{
			Message:   fmt.Sprintf("Streaming hello, %s!", req.Name),
			Timestamp: time.Now().Unix(),
		}
		
		if err := stream.Send(res); err != nil {
			return err
		}
	}
}
```

**Server Implementation (cmd/server/main.go):**

```go
package main

import (
	"log"
	"net/http"

	"connectrpc.com/connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	greetv1connect "github.com/example/$ARGUMENTS/gen/greet/v1/greetv1connect"
	"github.com/example/$ARGUMENTS/internal/service"
)

func main() {
	greetService := service.NewGreetService()
	path, handler := greetv1connect.NewGreetServiceHandler(greetService)
	
	mux := http.NewServeMux()
	mux.Handle(path, handler)
	
	// Enable CORS for web clients
	corsHandler := func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Connect-Protocol-Version")
			
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			h.ServeHTTP(w, r)
		})
	}
	
	server := &http.Server{
		Addr:    ":8080",
		Handler: h2c.NewHandler(corsHandler(mux), &http2.Server{}),
	}
	
	log.Println("ConnectRPC server listening on :8080")
	log.Println("Try: curl -X POST http://localhost:8080/greet.v1.GreetService/Greet -H 'Content-Type: application/json' -d '{\"name\": \"World\"}'")
	
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
```

STEP 7: Create development and testing infrastructure

**Makefile for Common Operations:**

```makefile
# Makefile
.PHONY: generate build run test clean

generate:
	buf generate

build: generate
	go build -o bin/server cmd/server/main.go

run: build
	./bin/server

test:
	go test ./...

clean:
	rm -rf gen/ bin/

lint:
	buf lint
	golangci-lint run
```

**Development docker-compose.yml:**

```yaml
# docker-compose.yml
version: "3.8"
services:
  $ARGUMENTS:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ENV=development
    volumes:
      - .:/app
    working_dir: /app
```

STEP 8: Finalize project and validate setup

**Final Steps:**

```bash
# Generate Protocol Buffer code
buf generate

# Download dependencies
go mod tidy

# Build project to verify setup
go build -o bin/server cmd/server/main.go

# Update session state
jq '.status = "completed" | .completedAt = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"' /tmp/scaffold-session-$SESSION_ID.json > /tmp/scaffold-session-$SESSION_ID.tmp && mv /tmp/scaffold-session-$SESSION_ID.tmp /tmp/scaffold-session-$SESSION_ID.json
```

**Project Validation:**

- Verify all generated files exist
- Confirm Go module dependencies resolved
- Test server compilation
- Validate Protocol Buffer schema

FINALLY:

- REPORT project creation status and next steps
- PROVIDE quick start commands
- SUGGEST development workflow recommendations

## Example Usage

```bash
/scaffold-go-connect greet-api
```

**This creates a production-ready ConnectRPC server with:**

- Protocol Buffer schema in `proto/greet/v1/greet.proto`
- Buf configuration for schema management and code generation
- Go server implementation with ConnectRPC handlers
- HTTP/2 support with h2c for development
- Bidirectional streaming capabilities
- CORS-enabled for web client integration
- Type-safe client/server communication
- Production-ready project structure
- Development tooling (Makefile, Docker Compose)
- Server listening on localhost:8080

## ConnectRPC Features Reference

### Core Benefits

- **Simple HTTP**: Works with any HTTP client, curl, browsers
- **Three protocols**: gRPC, gRPC-Web, and Connect's own protocol
- **Streaming**: Bidirectional, client, and server streaming support
- **Interceptors**: Middleware for auth, logging, metrics, retries
- **Error handling**: Rich error details with connect.Error type
- **Production ready**: Load balancers, proxies, CDNs work out of the box

### Key Capabilities

- **Routing**: Standard HTTP mux compatibility, custom routing
- **Streaming**: `stream` keyword in proto for real-time communication
- **Interceptors**: Chain-able middleware with `connect.UnaryInterceptorFunc`
- **Errors**: Structured errors with codes, messages, and details
- **Deployment**: Works behind any HTTP proxy, no gRPC infrastructure needed

### Development Workflow

1. Define services in `.proto` files
2. Generate code with `buf generate`
3. Implement service handlers
4. Add interceptors for cross-cutting concerns
5. Deploy as standard HTTP service

## Quick Start Commands

```bash
# After scaffolding
cd $ARGUMENTS

# Generate code and build
make build

# Run server
make run

# Test API
curl -X POST http://localhost:8080/greet.v1.GreetService/Greet \
  -H 'Content-Type: application/json' \
  -d '{"name": "World"}'

# Development with auto-reload
go run cmd/server/main.go
```

## Next Steps

1. **Add Authentication**: Implement JWT middleware interceptors
2. **Add Observability**: Integrate logging, metrics, and tracing
3. **Database Integration**: Add repository pattern with your preferred DB
4. **Client Generation**: Generate TypeScript/JavaScript clients for web
5. **Deployment**: Configure Kubernetes manifests or Docker images
6. **Testing**: Add unit tests for services and integration tests
7. **Documentation**: Generate API docs from Protocol Buffer schemas