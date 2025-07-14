---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(bat:*), Bash(eza:*), Bash(jq:*), Bash(gdate:*), Bash(docker:*), Bash(wc:*), Bash(head:*), Bash(mvn:*), Bash(gradle:*), Bash(cargo:*), Bash(go:*), Bash(npm:*), Bash(deno:*)
name: "Integration Test"
description: "Comprehensive integration testing orchestrator with parallel technology analysis and strategy generation"
author: "wcygan"
tags: ["test","generate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target project: $ARGUMENTS
- Current directory: !`pwd`
- Build files detected: !`fd "(package\.json|Cargo\.toml|go\.mod|deno\.json|pom\.xml|build\.gradle)" . -d 3 | head -5 || echo "No build files detected"`
- Codebase size: !`fd "\.(js|ts|jsx|tsx|rs|go|java|py|rb|php|c|cpp|h|hpp|cs|kt|swift|scala)" . | wc -l | tr -d ' '` files
- Project structure: !`eza -la --tree --level=2 2>/dev/null | head -10 || fd . -t d -d 2 | head -10`
- Test directories: !`fd "(test|tests|spec|__tests__|integration)" . -t d -d 3 | head -5 || echo "No test directories found"`
- Database configs: !`rg "(postgres|mysql|redis|mongo|sqlite)" . --type-add 'config:*.{json,yaml,yml,toml,env}' --type config -l | head -3 || echo "No database configs detected"`
- Service definitions: !`fd "(docker-compose|compose)" . -e yml -e yaml | head -3 || echo "No service compositions found"`

## Your Task

STEP 1: Initialize comprehensive integration testing session with technology analysis

- CREATE session state file: `/tmp/integration-test-session-$SESSION_ID.json`
- ANALYZE project structure and technology stack from Context section
- DETERMINE testing complexity based on codebase size and architecture patterns
- IDENTIFY integration points, external dependencies, and service boundaries

```bash
# Initialize integration testing session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetProject": "'$ARGUMENTS'",
  "detectedTechnologies": [],
  "architecturePattern": "auto-detect",
  "integrationPoints": [],
  "testingStrategy": "comprehensive",
  "frameworkRecommendations": []
}' > /tmp/integration-test-session-$SESSION_ID.json
```

STEP 2: Parallel technology stack analysis with sub-agent coordination

TRY:

IF codebase_size > 50 files OR multiple_technologies_detected:

LAUNCH parallel sub-agents for comprehensive technology analysis:

- **Agent 1: Backend Framework Analysis**: Analyze server-side technologies and frameworks
  - Focus: Go/ConnectRPC, Rust/Axum, Java/Spring Boot, Node.js patterns, Python/FastAPI
  - Tools: fd for configuration discovery, rg for framework pattern detection
  - Output: Backend technology manifest with integration testing requirements

- **Agent 2: Database & Storage Analysis**: Identify data persistence layers and testing strategies
  - Focus: PostgreSQL, Redis alternatives (DragonflyDB), NoSQL, in-memory databases
  - Tools: rg for connection strings, configuration file analysis
  - Output: Database testing strategy with TestContainers and mock implementations

- **Agent 3: Message Queue & Event Systems**: Analyze asynchronous communication patterns
  - Focus: Kafka alternatives (RedPanda), RabbitMQ, event sourcing, CQRS patterns
  - Tools: rg for message queue configurations, event pattern detection
  - Output: Event-driven testing strategy with embedded brokers and message verification

- **Agent 4: External Service Integration**: Map third-party dependencies and API integrations
  - Focus: HTTP APIs, GraphQL endpoints, payment systems, authentication providers
  - Tools: rg for API endpoints, configuration analysis, service discovery
  - Output: Service virtualization strategy with WireMock, MSW, contract testing

- **Agent 5: Infrastructure & Deployment**: Analyze containerization and deployment patterns
  - Focus: Docker configurations, Kubernetes manifests, service mesh integration
  - Tools: fd for infrastructure files, Docker/K8s configuration analysis
  - Output: Infrastructure testing strategy with TestContainers and embedded services

**Sub-Agent Coordination:**

```bash
# Each agent reports findings to session state under respective domains
echo "Parallel technology analysis launched for comprehensive integration testing strategy..."
echo "Results will be synthesized into tailored testing recommendations"
```

ELSE:

EXECUTE streamlined single-technology analysis:

```bash
# Single-technology analysis for smaller projects
echo "🔍 Analyzing focused integration testing requirements..."
```

STEP 3: Architecture pattern recognition and integration point mapping

**Architecture Pattern Detection:**

```bash
# Microservices detection
if fd "docker-compose" . -e yml -e yaml | head -1 >/dev/null; then
  echo "🏗️ Microservices architecture detected - service-to-service testing required"
fi

# Monolithic pattern detection
if fd "(main\.rs|main\.go|app\.py|Application\.java)" . | head -1 >/dev/null; then
  echo "🏛️ Monolithic architecture detected - module integration testing focus"
fi

# Event-driven pattern detection
if rg "(kafka|rabbitmq|event|saga|cqrs)" . --ignore-case -l | head -1 >/dev/null; then
  echo "⚡ Event-driven architecture detected - event flow testing required"
fi
```

**Integration Point Discovery:**

```bash
# API endpoint discovery
echo "🔍 Discovering API integration points:"
rg "(POST|GET|PUT|DELETE|PATCH).*[\"']\/.*[\"']" . --type-add 'code:*.{js,ts,rs,go,java,py}' --type code -o | head -10

# Database connection analysis
echo "🗄️ Analyzing database integration requirements:"
rg "(connection.*string|database.*url|db.*host)" . --ignore-case -l | head -5

# External service detection
echo "🌐 Identifying external service dependencies:"
rg "(api\..*\.com|\.googleapis\.|stripe\.|paypal\.|oauth)" . -l | head -5
```

STEP 4: Framework-specific integration testing strategy generation

CASE detected_primary_technology:

WHEN "deno":

**Deno Fresh Integration Testing Strategy:**

```typescript
// Integration test setup with Fresh 2.0 patterns
import { assertEquals } from "@std/assert";
import { createHandler } from "$fresh/server.ts";
import { TestDatabase } from "./utils/test-database.ts";

Deno.test("API integration test suite", async (t) => {
  const testDb = new TestDatabase();
  await testDb.setup();

  await t.step("user creation flow", async () => {
    const handler = createHandler(manifest, {
      database: testDb.connection,
    });

    const response = await handler(
      new Request("http://localhost/api/users", {
        method: "POST",
        body: JSON.stringify({ name: "Test User", email: "test@example.com" }),
        headers: { "Content-Type": "application/json" },
      }),
    );

    assertEquals(response.status, 201);

    // Verify database persistence
    const user = await testDb.query("SELECT * FROM users WHERE email = $1", ["test@example.com"]);
    assertEquals(user.length, 1);
  });

  await testDb.cleanup();
});
```

WHEN "rust":

**Rust Axum Integration Testing Strategy:**

```rust
// Integration tests with TestContainers and real database
use axum_test::TestServer;
use sqlx::PgPool;
use testcontainers::{clients::Cli, images::postgres::Postgres, Container};

#[tokio::test]
async fn test_user_creation_integration() {
    let docker = Cli::default();
    let postgres_image = Postgres::default();
    let postgres_container = docker.run(postgres_image);
    
    let connection_string = format!(
        "postgres://postgres:postgres@localhost:{}/postgres",
        postgres_container.get_host_port_ipv4(5432)
    );
    
    let pool = PgPool::connect(&connection_string).await.unwrap();
    sqlx::migrate!("./migrations").run(&pool).await.unwrap();
    
    let app = create_app(pool.clone()).await;
    let server = TestServer::new(app).unwrap();
    
    let response = server
        .post("/api/users")
        .json(&serde_json::json!({
            "name": "Test User",
            "email": "test@example.com"
        }))
        .await;
    
    response.assert_status_created();
    
    // Verify database state
    let user = sqlx::query!("SELECT id, name, email FROM users WHERE email = $1", "test@example.com")
        .fetch_one(&pool)
        .await
        .unwrap();
    
    assert_eq!(user.name, "Test User");
}
```

WHEN "go":

**Go ConnectRPC Integration Testing Strategy:**

```go
package integration_test

import (
    "context"
    "testing"
    "github.com/stretchr/testify/assert"
    "github.com/testcontainers/testcontainers-go"
    "github.com/testcontainers/testcontainers-go/wait"
)

func TestUserServiceIntegration(t *testing.T) {
    ctx := context.Background()
    
    // Setup PostgreSQL test container
    pgContainer, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
        ContainerRequest: testcontainers.ContainerRequest{
            Image:        "postgres:15",
            ExposedPorts: []string{"5432/tcp"},
            Env: map[string]string{
                "POSTGRES_PASSWORD": "test",
                "POSTGRES_DB":       "testdb",
            },
            WaitingFor: wait.ForListeningPort("5432/tcp"),
        },
        Started: true,
    })
    assert.NoError(t, err)
    defer pgContainer.Terminate(ctx)
    
    // Get database connection
    port, err := pgContainer.MappedPort(ctx, "5432")
    assert.NoError(t, err)
    
    dbURL := fmt.Sprintf("postgres://postgres:test@localhost:%s/testdb?sslmode=disable", port.Port())
    
    // Setup service with real database
    userService := setupUserService(dbURL)
    
    // Test user creation through ConnectRPC
    createReq := connect.NewRequest(&userv1.CreateUserRequest{
        Name:  "Test User",
        Email: "test@example.com",
    })
    
    resp, err := userService.CreateUser(ctx, createReq)
    assert.NoError(t, err)
    assert.Equal(t, "Test User", resp.Msg.User.Name)
    
    // Verify database persistence
    var count int
    err = db.QueryRow("SELECT COUNT(*) FROM users WHERE email = $1", "test@example.com").Scan(&count)
    assert.NoError(t, err)
    assert.Equal(t, 1, count)
}
```

WHEN "java":

**Java Spring Boot + Temporal Integration Testing Strategy:**

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class UserWorkflowIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    private TestWorkflowEnvironment testWorkflowEnv;
    private WorkflowClient workflowClient;
    
    @BeforeEach
    void setUp() {
        testWorkflowEnv = TestWorkflowEnvironment.newInstance();
        workflowClient = testWorkflowEnv.getWorkflowClient();
        
        // Register workflow and activities
        Worker worker = testWorkflowEnv.newWorker("user-task-queue");
        worker.registerWorkflowImplementationTypes(UserRegistrationWorkflowImpl.class);
        worker.registerActivitiesImplementations(new UserActivitiesImpl(userRepository));
        testWorkflowEnv.start();
    }
    
    @Test
    @Transactional
    void testUserRegistrationWorkflow() {
        // Start workflow
        UserRegistrationWorkflow workflow = workflowClient.newWorkflowStub(
            UserRegistrationWorkflow.class,
            WorkflowOptions.newBuilder()
                .setWorkflowId("test-user-registration-" + UUID.randomUUID())
                .setTaskQueue("user-task-queue")
                .build()
        );
        
        UserRegistrationRequest request = new UserRegistrationRequest(
            "Test User",
            "test@example.com",
            "secure-password"
        );
        
        // Execute workflow
        UserRegistrationResult result = workflow.registerUser(request);
        
        // Assert workflow completion
        assertThat(result.isSuccess()).isTrue();
        assertThat(result.getUserId()).isNotNull();
        
        // Verify database state
        Optional<User> user = userRepository.findByEmail("test@example.com");
        assertThat(user).isPresent();
        assertThat(user.get().getName()).isEqualTo("Test User");
        assertThat(user.get().isEmailVerified()).isTrue();
    }
    
    @AfterEach
    void tearDown() {
        testWorkflowEnv.close();
    }
}
```

STEP 5: External service integration and contract testing implementation

**Service Virtualization Setup:**

```bash
# Generate WireMock configuration for external services
cat > wiremock-mappings.json << 'EOF'
{
  "mappings": [
    {
      "request": {
        "method": "POST",
        "url": "/api/payments",
        "headers": {
          "Content-Type": {
            "equalTo": "application/json"
          }
        }
      },
      "response": {
        "status": 200,
        "headers": {
          "Content-Type": "application/json"
        },
        "body": "{\"id\": \"payment-123\", \"status\": \"completed\"}"
      }
    }
  ]
}
EOF
```

**Contract Testing with Pact:**

```javascript
// Consumer-driven contract testing setup
const { Pact } = require("@pact-foundation/pact");
const path = require("path");

const provider = new Pact({
  consumer: "user-service",
  provider: "payment-service",
  port: 1234,
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pacts"),
});

describe("Payment Service Contract", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  test("processes payment successfully", async () => {
    await provider.addInteraction({
      state: "user has valid payment method",
      uponReceiving: "a payment request",
      withRequest: {
        method: "POST",
        path: "/payments",
        headers: { "Content-Type": "application/json" },
        body: { amount: 100, currency: "USD" },
      },
      willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { id: "payment-123", status: "completed" },
      },
    });

    const response = await makePayment({ amount: 100, currency: "USD" });
    expect(response.status).toBe("completed");
  });
});
```

STEP 6: CI/CD integration and automation pipeline setup

**GitHub Actions Integration Testing Workflow:**

```yaml
name: Integration Tests

on: [push, pull_request]

jobs:
  integration-tests:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      dragonfly:
        image: docker.dragonflydb.io/dragonflydb/dragonfly:latest
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Technology Stack
        run: |
          # Technology-specific setup based on detected stack
          if [ -f "deno.json" ]; then
            curl -fsSL https://deno.land/x/install/install.sh | sh
            echo "$HOME/.deno/bin" >> $GITHUB_PATH
          elif [ -f "Cargo.toml" ]; then
            curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
            source $HOME/.cargo/env
          elif [ -f "go.mod" ]; then
            go version
          elif [ -f "package.json" ]; then
            npm ci
          fi

      - name: Run Integration Tests
        run: |
          # Execute integration test suite based on technology
          if [ -f "deno.json" ]; then
            deno task test:integration
          elif [ -f "Cargo.toml" ]; then
            cargo test --test integration
          elif [ -f "go.mod" ]; then
            go test -tags=integration ./...
          elif [ -f "package.json" ]; then
            npm run test:integration
          fi
        env:
          DATABASE_URL: postgres://postgres:test@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
```

STEP 7: Session state management and testing strategy synthesis

**Update Session State with Strategy:**

```bash
# Update integration testing session with comprehensive strategy
jq --arg strategy "comprehensive" --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .testingStrategy = $strategy |
  .completedAnalysis = {
    "timestamp": $timestamp,
    "architecturePattern": .architecturePattern,
    "integrationPoints": (.integrationPoints // []),
    "frameworkRecommendations": (.frameworkRecommendations // [])
  }
' /tmp/integration-test-session-$SESSION_ID.json > /tmp/integration-test-session-$SESSION_ID.tmp && \
mv /tmp/integration-test-session-$SESSION_ID.tmp /tmp/integration-test-session-$SESSION_ID.json
```

**Generate Comprehensive Testing Implementation Guide:**

```bash
echo "✅ Integration testing strategy generated"
echo "🏗️ Architecture: $(jq -r '.architecturePattern' /tmp/integration-test-session-$SESSION_ID.json)"
echo "🔌 Integration points: $(jq -r '.integrationPoints | length' /tmp/integration-test-session-$SESSION_ID.json) identified"
echo "🧪 Testing frameworks: $(jq -r '.frameworkRecommendations | length' /tmp/integration-test-session-$SESSION_ID.json) recommended"
echo "⏱️ Session: $SESSION_ID"
echo "💾 Strategy saved to: /tmp/integration-test-session-$SESSION_ID.json"
```

CATCH (integration_analysis_failed):

- LOG analysis failures to session state
- PROVIDE fallback testing strategies
- SUGGEST manual integration point identification

```bash
echo "⚠️ Integration analysis encountered issues. Fallback recommendations:"
echo "  1. Start with basic HTTP API testing using your primary language's testing framework"
echo "  2. Add database integration using TestContainers or in-memory alternatives"
echo "  3. Mock external services using framework-specific tools (WireMock, MSW, etc.)"
echo "  4. Implement contract testing for service boundaries"
echo "  5. Set up CI/CD pipeline with service containers"
```

FINALLY:

- SAVE comprehensive integration testing strategy to session state
- PROVIDE implementation roadmap with prioritized testing phases
- SUGGEST next steps based on project complexity and timeline

## Integration Testing Best Practices

### Test Organization Strategy

- **Layer Separation**: Unit → Integration → Contract → End-to-End
- **Test Data Management**: Factories, fixtures, and deterministic data generation
- **Environment Isolation**: Separate test databases and service instances
- **Parallel Execution**: Design tests for concurrent execution safety

### Performance Considerations

- **Connection Pooling**: Reuse database connections across test cases
- **Container Reuse**: Share TestContainers across test suites when possible
- **Test Categorization**: Run fast integration tests in parallel, slower tests sequentially
- **Resource Cleanup**: Implement proper teardown to prevent resource leaks

### Framework-Specific Recommendations

**Deno Projects:**

- Use built-in `Deno.test()` with Fresh testing utilities
- Mock external dependencies with MSW or similar
- Leverage JSR packages for testing utilities

**Rust Projects:**

- TestContainers for real database integration
- `mockall` for service mocking
- `wiremock-rs` for HTTP service virtualization

**Go Projects:**

- `testify` for assertions and test structure
- TestContainers for infrastructure dependencies
- `net/http/httptest` for HTTP service testing

**Java Projects:**

- Spring Boot Test with `@TestContainers`
- Temporal's `TestWorkflowEnvironment` for workflow testing
- WireMock for external service mocking

This comprehensive integration testing strategy adapts to your specific technology stack, provides framework-specific implementations, and includes CI/CD automation for robust testing pipelines.