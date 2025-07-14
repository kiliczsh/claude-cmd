---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(gdate:*), Bash(jq:*), Task
name: "Api"
description: "Generate comprehensive API endpoint with framework detection, implementation, tests, and documentation"
author: "wcygan"
tags: ["code","generate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Project structure: !`fd . -t d -d 3 | head -20 || echo "No subdirectories found"`
- Technology stack: !`fd -e json -e toml -e rs -e go -e java . | rg "(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle)" | head -5 || echo "No technology files detected"`
- Existing API files: !`fd "(api|controller|handler|route|endpoint)" . -t f | head -10 || echo "No API files found"`
- Framework configs: !`fd "(spring|axum|gin|express|fastify)" . -t f | head -5 || echo "No framework configs found"`
- Database configs: !`fd "(database|db|migration|schema)" . -t f | head -5 || echo "No database configs found"`
- Test patterns: !`fd "\.(test|spec)\.(rs|go|java|js|ts)$" . | head -5 || echo "No test files found"`
- Git status: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`

## Your Task

Generate comprehensive API endpoint for $ARGUMENTS using intelligent framework detection, parallel implementation, and extensive testing.

STEP 1: Framework Detection and Analysis

IF Java project detected (pom.xml/build.gradle):

- Analyze Spring Boot vs Quarkus patterns
- Check existing @RestController patterns
- Review Jackson/JSON configuration
  ELSE IF Rust project detected (Cargo.toml):
- Analyze Axum vs Actix-web usage patterns
- Check existing handler implementations
- Review serde configuration
  ELSE IF Go project detected (go.mod):
- Analyze ConnectRPC vs Gin/Echo patterns
- Check existing route definitions
- Review protobuf usage if ConnectRPC
  ELSE IF Node.js project detected (package.json):
- Analyze Express vs Fastify vs Hapi patterns
- Check existing middleware setup
- Review TypeScript configuration

STEP 2: API Design Phase (with Extended Thinking)

Think deeply about the optimal API design patterns for this specific endpoint:

- Consider RESTful vs gRPC vs GraphQL appropriateness
- Think harder about authentication and authorization requirements
- Analyze rate limiting and caching strategies
- Evaluate error handling and response patterns

Design decisions:

- HTTP method selection (GET, POST, PUT, DELETE, PATCH)
- RESTful URL path following project conventions
- Request parameters (path, query, body)
- Response schema and status codes
- Comprehensive error responses and edge cases
- Security considerations and input validation

STEP 3: Parallel Implementation Strategy

Use sub-agents for parallel development to optimize implementation time:

**Sub-Agent 1**: Core endpoint implementation
**Sub-Agent 2**: Comprehensive test suite generation
**Sub-Agent 3**: API documentation (OpenAPI/Swagger) generation
**Sub-Agent 4**: Database integration and migrations
**Sub-Agent 5**: Security and validation implementation

Implement endpoint based on detected framework:

**Spring Boot (Java):**

```java
@RestController
@RequestMapping("/api/v1")
public class Controller {
    @PostMapping("/resource")
    public ResponseEntity<Response> create(@Valid @RequestBody Request req) {
        // Implementation
    }
}
```

**ConnectRPC (Go):**

```go
func (s *Server) Method(ctx context.Context,
    req *connect.Request[pb.Request]) (*connect.Response[pb.Response], error) {
    // Implementation
}
```

**Axum (Rust):**

```rust
async fn handler(
    State(state): State<AppState>,
    Json(payload): Json<Request>,
) -> Result<Json<Response>, StatusCode> {
    // Implementation
}
```

- Add comprehensive input validation and sanitization
- Implement business logic with proper separation of concerns
- Add structured error handling with proper HTTP status codes
- Include structured logging with correlation IDs
- Implement rate limiting and request throttling
- Add metrics and monitoring hooks

STEP 4: Security Implementation (Think deeply about security implications)

- Add robust authentication checks (JWT, OAuth2, API keys)
- Implement fine-grained authorization/permission checks
- Validate and sanitize all inputs (SQL injection, XSS prevention)
- Implement OWASP security headers
- Add CORS configuration with proper origin validation
- Implement request signing and verification if required
- Add security audit logging
- Configure rate limiting per user/IP

STEP 5: Comprehensive Test Generation

Generate extensive test suite covering all scenarios:

**Java (JUnit/MockMvc):**

```java
@Test
void testEndpoint() throws Exception {
    mockMvc.perform(post("/api/v1/resource")
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonRequest))
        .andExpect(status().isOk());
}
```

**Go (testing package):**

```go
func TestEndpoint(t *testing.T) {
    req := httptest.NewRequest("POST", "/api/v1/resource", body)
    w := httptest.NewRecorder()
    handler(w, req)
    assert.Equal(t, http.StatusOK, w.Code)
}
```

**Rust (axum-test):**

```rust
#[tokio::test]
async fn test_endpoint() {
    let app = create_app();
    let response = app.oneshot(request).await.unwrap();
    assert_eq!(response.status(), StatusCode::OK);
}
```

- Unit tests for all business logic
- Integration tests with database
- API contract tests (response schema validation)
- Security tests (auth bypass, injection attempts)
- Performance tests (load testing with k6 or Gatling)
- Edge cases and invalid input handling
- Error scenario testing (network failures, database issues)

STEP 6: Documentation Generation

- Generate OpenAPI/Swagger specification
- Create comprehensive request/response examples
- Document all error codes and troubleshooting
- Add rate limiting and quota information
- Document authentication and authorization requirements
- Provide Curl/HTTPie/client library examples
- Generate API changelog and versioning information

STEP 7: Database and Service Integration

Framework-specific database integration:

- **Java**: JPA/Hibernate, JOOQ, MyBatis with connection pooling
- **Go**: sqlx, GORM, Ent with connection pooling
- **Rust**: sqlx, Diesel, SeaORM with connection pooling
- **Node.js**: Prisma, TypeORM, Sequelize

Implementation details:

- Implement repository/service pattern
- Generate database migrations (Flyway, migrate, sqlx)
- Configure connection pooling and health checks
- Add caching layer (DragonflyDB preferred over Redis)
- Consider event sourcing with RedPanda (preferred over Kafka)
- Implement database transaction management
- Add database monitoring and performance metrics

STEP 8: State Management and Progress Tracking

```json
// /tmp/api-generation-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "phase": "implementation",
  "detectedFramework": "detected_framework",
  "generatedArtifacts": {
    "endpoint": "path/to/endpoint/file",
    "tests": "path/to/test/file",
    "documentation": "path/to/docs/file",
    "migrations": "path/to/migration/file"
  },
  "subAgents": {
    "implementation": "completed",
    "testing": "in_progress",
    "documentation": "pending",
    "database": "pending",
    "security": "completed"
  },
  "checkpoints": {
    "lastCheckpoint": "security_implementation_complete",
    "nextMilestone": "comprehensive_testing",
    "rollbackPoint": "initial_analysis"
  },
  "metrics": {
    "linesOfCode": 247,
    "testCoverage": "94%",
    "securityScore": "A",
    "performanceRating": "excellent"
  }
}
```

## Final Output

- Complete, production-ready endpoint implementation
- Comprehensive test suite with >90% coverage
- OpenAPI documentation with examples
- Database migrations and schema updates
- Security implementation with audit logging
- Performance optimizations and caching
- Client integration examples
- Deployment and monitoring configuration