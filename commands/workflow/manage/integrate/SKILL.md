---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(eza:*), Bash(bat:*), Bash(jq:*), Bash(gdate:*), Bash(docker:*), Bash(kubectl:*), Bash(curl:*), Bash(git:*)
name: "Integrate"
description: "Intelligent integration orchestrator for services, APIs, databases, and tools with error handling and monitoring"
author: "wcygan"
tags: ["workflow","manage"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Integration target: $ARGUMENTS
- Current directory: !`pwd`
- Project structure: !`eza -la --tree --level=2 2>/dev/null | head -10 || fd . -t d -d 2 | head -5`
- Existing integrations: !`fd "(client|connector|adapter|integration|api)" --type f -d 3 | head -10 || echo "No integration files detected"`
- Configuration files: !`fd "(.env|config|settings)" --type f -d 2 | head -5 || echo "No config files found"`
- Running services: !`docker ps --format "table {{.Names}}\t{{.Status}}" 2>/dev/null | head -5 || echo "No Docker services running"`
- Git status: !`git status --porcelain 2>/dev/null | head -5 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize integration session and analyze existing architecture

- CREATE session state file: `/tmp/integration-session-$SESSION_ID.json`
- ANALYZE project structure and technology stack from Context section
- DETECT existing integrations, APIs, and service connections
- IDENTIFY integration complexity and requirements

```bash
# Initialize integration session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "integrationTarget": "'$ARGUMENTS'",
  "existingIntegrations": [],
  "integrationPattern": "auto-detect",
  "securityProfile": "production"
}' > /tmp/integration-session-$SESSION_ID.json
```

STEP 2: Comprehensive integration analysis with parallel sub-agent coordination

TRY:

IF integration_complexity == "multi-service" OR target_includes_multiple_systems:

LAUNCH parallel sub-agents for comprehensive integration analysis:

- **Agent 1: API Discovery & Analysis**: Identify existing API endpoints, schemas, and authentication
  - Focus: REST APIs, GraphQL endpoints, RPC services, authentication mechanisms
  - Tools: rg for API patterns, fd for OpenAPI specs, curl for endpoint testing
  - Output: API inventory with capabilities and integration requirements

- **Agent 2: Database Integration Assessment**: Analyze database connections and data flows
  - Focus: Connection strings, ORM configurations, migration patterns, data schemas
  - Tools: rg for database patterns, analysis of config files and models
  - Output: Database integration strategy and data flow requirements

- **Agent 3: Service Discovery & Orchestration**: Map microservices and container architecture
  - Focus: Docker services, Kubernetes deployments, service mesh configuration
  - Tools: docker commands, kubectl queries, service discovery analysis
  - Output: Service topology and orchestration requirements

- **Agent 4: Security & Compliance Analysis**: Evaluate security requirements and patterns
  - Focus: Authentication, authorization, secrets management, encryption
  - Tools: rg for credential patterns, security configuration analysis
  - Output: Security integration requirements and compliance considerations

- **Agent 5: Monitoring & Observability Setup**: Design integration monitoring strategy
  - Focus: Logging, metrics, tracing, health checks, error handling
  - Tools: Analysis of existing monitoring patterns, log configurations
  - Output: Observability integration plan and alerting strategy

ELSE:

EXECUTE streamlined single-service integration analysis:

```bash
# Single-service integration analysis
echo "🔍 Analyzing single-service integration requirements for: $ARGUMENTS"

# Identify existing patterns
rg "(http|https|api|client|sdk)" --type-add 'config:*.{json,yaml,toml}' --type config
fd "(client|connector|adapter|integration)" --type f

# Check for credentials and configuration
rg "(API_KEY|CLIENT_ID|SECRET|TOKEN)" .env* --no-ignore 2>/dev/null || echo "No credential files found"
rg "(endpoint|baseUrl|host|url)" --type-add 'config:*.{json,yaml,toml}' --type config

# Find current integration patterns
rg "(fetch|axios|request|WebClient|http\.)" -A 2 -B 1
```

STEP 3: Intelligent integration pattern selection and implementation

CASE integration_type:
WHEN "api_integration":

**REST API Integration (TypeScript/Deno optimized):**

```typescript
// api-integration.ts
interface APIConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  retryAttempts?: number;
}

class APIIntegration {
  constructor(private config: APIConfig) {}

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(this.config.apiKey && { "Authorization": `Bearer ${this.config.apiKey}` }),
      ...options.headers,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < (this.config.retryAttempts || 3); attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers,
          signal: AbortSignal.timeout(this.config.timeout || 30000),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;
        if (attempt < (this.config.retryAttempts || 3) - 1) {
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError;
  }
}
```

WHEN "database_integration":

**Database Integration (Multi-database support):**

```typescript
// database-integration.ts
import { Client } from "https://deno.land/x/postgres/mod.ts";
import { connect } from "https://deno.land/x/redis/mod.ts";

class DatabaseIntegration {
  private pgClient: Client;
  private redisClient: Redis;

  async initialize() {
    // PostgreSQL connection
    this.pgClient = new Client({
      hostname: Deno.env.get("PG_HOST") || "localhost",
      port: parseInt(Deno.env.get("PG_PORT") || "5432"),
      user: Deno.env.get("PG_USER"),
      password: Deno.env.get("PG_PASSWORD"),
      database: Deno.env.get("PG_DATABASE"),
    });

    // Redis connection for caching
    this.redisClient = await connect({
      hostname: Deno.env.get("REDIS_HOST") || "localhost",
      port: parseInt(Deno.env.get("REDIS_PORT") || "6379"),
    });

    await this.pgClient.connect();
  }

  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    const cacheKey = `query:${sql}:${JSON.stringify(params)}`;

    // Check cache first
    const cached = await this.redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Execute query
    const result = await this.pgClient.queryObject<T>(sql, params);

    // Cache result
    await this.redisClient.setex(cacheKey, 300, JSON.stringify(result.rows));

    return result.rows;
  }
}
```

WHEN "message_queue":

**Message Queue Integration (Go/RabbitMQ optimized):**

```go
// queue-integration.go
package integration

import (
    "github.com/rabbitmq/amqp091-go"
    "encoding/json"
    "time"
)

type QueueIntegration struct {
    conn    *amqp091.Connection
    channel *amqp091.Channel
}

func NewQueueIntegration(url string) (*QueueIntegration, error) {
    conn, err := amqp091.Dial(url)
    if err != nil {
        return nil, err
    }
    
    ch, err := conn.Channel()
    if err != nil {
        return nil, err
    }
    
    return &QueueIntegration{
        conn:    conn,
        channel: ch,
    }, nil
}

func (q *QueueIntegration) Publish(queue string, message interface{}) error {
    body, err := json.Marshal(message)
    if err != nil {
        return err
    }
    
    return q.channel.Publish(
        "",    // exchange
        queue, // routing key
        false, // mandatory
        false, // immediate
        amqp091.Publishing{
            ContentType: "application/json",
            Body:        body,
            Timestamp:   time.Now(),
        },
    )
}

func (q *QueueIntegration) Subscribe(queue string, handler func([]byte) error) error {
    msgs, err := q.channel.Consume(
        queue,
        "",    // consumer
        false, // auto-ack
        false, // exclusive
        false, // no-local
        false, // no-wait
        nil,   // args
    )
    if err != nil {
        return err
    }
    
    go func() {
        for msg := range msgs {
            if err := handler(msg.Body); err != nil {
                msg.Nack(false, true) // requeue on error
            } else {
                msg.Ack(false)
            }
        }
    }()
    
    return nil
}
```

WHEN "webhook_integration":

**Webhook Integration (Event-driven architecture):**

```typescript
// webhook-integration.ts
interface WebhookConfig {
  secret: string;
  endpoint: string;
  events: string[];
}

class WebhookIntegration {
  private handlers = new Map<string, Function[]>();

  constructor(private config: WebhookConfig) {}

  on(event: string, handler: Function) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler);
  }

  async handleWebhook(req: Request): Promise<Response> {
    // Verify signature
    const signature = req.headers.get("X-Webhook-Signature");
    if (!this.verifySignature(await req.text(), signature)) {
      return new Response("Invalid signature", { status: 401 });
    }

    const payload = await req.json();
    const event = payload.event || req.headers.get("X-Event-Type");

    // Process event
    const handlers = this.handlers.get(event) || [];
    await Promise.all(handlers.map((h) => h(payload)));

    return new Response("OK", { status: 200 });
  }

  private verifySignature(body: string, signature: string | null): boolean {
    if (!signature) return false;

    const encoder = new TextEncoder();
    const key = encoder.encode(this.config.secret);
    const data = encoder.encode(body);

    // HMAC verification
    return crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      data,
    );
  }
}
```

STEP 4: Service orchestration and workflow management

**Service Orchestration Engine:**

```typescript
// orchestration.ts
class ServiceOrchestrator {
  private services: Map<string, any> = new Map();

  register(name: string, service: any) {
    this.services.set(name, service);
  }

  async executeWorkflow(workflow: WorkflowDefinition) {
    const context: WorkflowContext = {
      data: {},
      errors: [],
    };

    for (const step of workflow.steps) {
      try {
        const service = this.services.get(step.service);
        if (!service) {
          throw new Error(`Service ${step.service} not found`);
        }

        const result = await service[step.method](...step.args);
        context.data[step.outputKey] = result;

        // Handle conditional branching
        if (step.condition && !step.condition(context)) {
          continue;
        }
      } catch (error) {
        context.errors.push({ step: step.name, error });

        if (step.onError === "fail") {
          throw error;
        } else if (step.onError === "skip") {
          continue;
        }
        // retry logic here
      }
    }

    return context;
  }
}
```

STEP 5: Authentication and authorization integration

**Authentication Integration (OAuth2/OIDC support):**

```typescript
// auth-integration.ts
class AuthIntegration {
  async integrateOAuth(provider: string) {
    const config = {
      google: {
        authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenUrl: "https://oauth2.googleapis.com/token",
        scope: "openid email profile",
      },
      github: {
        authUrl: "https://github.com/login/oauth/authorize",
        tokenUrl: "https://github.com/login/oauth/access_token",
        scope: "read:user user:email",
      },
    };

    return {
      getAuthUrl(clientId: string, redirectUri: string) {
        const params = new URLSearchParams({
          client_id: clientId,
          redirect_uri: redirectUri,
          response_type: "code",
          scope: config[provider].scope,
        });

        return `${config[provider].authUrl}?${params}`;
      },

      async exchangeToken(code: string, clientId: string, clientSecret: string) {
        const response = await fetch(config[provider].tokenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "authorization_code",
          }),
        });

        return response.json();
      },
    };
  }
}
```

STEP 6: Monitoring, observability, and error handling

**Monitoring Integration (Production-ready observability):**

```typescript
// monitoring-integration.ts
class MonitoringIntegration {
  constructor(
    private metrics: MetricsClient,
    private logger: Logger,
  ) {}

  wrapIntegration<T extends Function>(name: string, fn: T): T {
    return (async (...args: any[]) => {
      const start = Date.now();
      const labels = { integration: name };

      try {
        this.metrics.increment("integration.calls", labels);
        const result = await fn(...args);

        this.metrics.histogram("integration.duration", Date.now() - start, labels);
        this.metrics.increment("integration.success", labels);

        return result;
      } catch (error) {
        this.metrics.increment("integration.errors", labels);
        this.logger.error(`Integration ${name} failed`, { error, args });
        throw error;
      }
    }) as any;
  }
}
```

STEP 7: Generate production-ready integration artifacts

TRY:

**Generate Integration Documentation:**

```bash
# Create integration documentation
echo "📋 Generating integration documentation for: $ARGUMENTS"
```

**Integration Configuration Template:**

```yaml
# integration-config.yml
integration:
  name: "${ARGUMENTS//[^a-zA-Z0-9]/-}"
  source:
    type: "auto-detected"
    endpoint: "${SOURCE_ENDPOINT}"
    auth:
      type: "${AUTH_METHOD}"
      credentials: "${CREDENTIAL_SOURCE}"
  target:
    type: "auto-detected"
    endpoint: "${TARGET_ENDPOINT}"
    auth:
      type: "${AUTH_METHOD}"
      credentials: "${CREDENTIAL_SOURCE}"
  sync:
    strategy: "${real-time|batch|event-driven}"
    frequency: "${CRON_EXPRESSION}"
    batch_size: 100
    timeout: 30000
  monitoring:
    metrics: true
    logging: "structured"
    alerts:
      error_rate_threshold: 0.05
      latency_threshold: 5000
  resilience:
    retry:
      attempts: 3
      backoff: "exponential"
      base_delay: 1000
    circuit_breaker:
      enabled: true
      failure_threshold: 5
      timeout: 60000
```

**Production Deployment Strategy:**

```bash
# Create deployment checklist
echo "🚀 Production deployment checklist:"
echo "1. ✅ Environment variables configured"
echo "2. ✅ Authentication credentials secured"
echo "3. ✅ Monitoring and alerting configured"
echo "4. ✅ Error handling and retry logic implemented"
echo "5. ✅ Integration tests passing"
echo "6. ✅ Performance benchmarks validated"
echo "7. ✅ Security review completed"
echo "8. ✅ Documentation updated"
```

CATCH (integration_failed):

- LOG error details to session state
- PROVIDE alternative integration strategies
- SUGGEST troubleshooting steps

```bash
echo "⚠️ Integration setup failed. Analyzing issues..."
echo "Common integration issues:"
echo "  - Network connectivity problems"
echo "  - Authentication/authorization failures"
echo "  - API version mismatches"
echo "  - Configuration errors"
echo "  - Security policy restrictions"
```

STEP 8: Integration testing and validation

**Comprehensive Testing Strategy:**

```bash
# Connection testing
echo "🧪 Testing integration connectivity..."

# API endpoint validation
if command -v curl >/dev/null; then
  echo "Testing API endpoints with curl..."
fi

# Database connection testing
echo "Validating database connections..."

# Service discovery testing
if command -v docker >/dev/null; then
  echo "Testing service connectivity..."
  docker ps --format "table {{.Names}}\t{{.Status}}"
fi
```

**Integration Health Checks:**

```typescript
// health-check.ts
interface HealthCheckResult {
  service: string;
  status: "healthy" | "degraded" | "unhealthy";
  latency: number;
  timestamp: string;
  details?: string;
}

async function performHealthCheck(integration: string): Promise<HealthCheckResult> {
  const start = Date.now();

  try {
    // Perform actual health check based on integration type
    const response = await fetch(`${integration}/health`);
    const latency = Date.now() - start;

    return {
      service: integration,
      status: response.ok ? "healthy" : "degraded",
      latency,
      timestamp: new Date().toISOString(),
      details: response.ok ? undefined : `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      service: integration,
      status: "unhealthy",
      latency: Date.now() - start,
      timestamp: new Date().toISOString(),
      details: error.message,
    };
  }
}
```

STEP 9: Session state management and integration registry

**Update Session State:**

```bash
# Update integration session with results
jq --arg target "$ARGUMENTS" --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .integrationTarget = $target |
  .completedAt = $timestamp |
  .status = "completed"
' /tmp/integration-session-$SESSION_ID.json > /tmp/integration-session-$SESSION_ID.tmp && \
mv /tmp/integration-session-$SESSION_ID.tmp /tmp/integration-session-$SESSION_ID.json
```

**Integration Summary:**

```bash
echo "✅ Integration completed successfully"
echo "🎯 Target: $ARGUMENTS"
echo "📊 Session: $SESSION_ID"
echo "⏱️ Completed at: $(gdate -Iseconds 2>/dev/null || date -Iseconds)"
echo "📁 Artifacts: /tmp/integration-session-$SESSION_ID.json"
echo "📖 Documentation: Available in project docs/"
```

FINALLY:

- SAVE session state and integration artifacts
- PROVIDE integration testing guidelines
- SUGGEST monitoring and maintenance procedures
- UPDATE project documentation with integration details

## Integration Patterns Reference

### Integration Types by Architecture

**Synchronous Patterns:**

- REST API integrations with request/response cycles
- Database query integrations with immediate results
- Microservice-to-microservice direct communication
- Real-time API aggregation and composition

**Asynchronous Patterns:**

- Event-driven architectures with message queues
- Webhook-based notification systems
- Batch processing integrations with scheduled execution
- Stream processing integrations for continuous data flow

**Hybrid Patterns:**

- Command Query Responsibility Segregation (CQRS)
- Event sourcing with read model projections
- Saga pattern for distributed transactions
- Circuit breaker pattern for resilient service communication

### Modern Integration Stack

**For Go Projects:**

- ConnectRPC for type-safe service communication
- GORM or sqlx for database integrations
- Go-kit for microservice patterns
- Prometheus for metrics integration

**For Rust Projects:**

- Axum for high-performance HTTP integrations
- SQLx for compile-time verified database queries
- Tokio for async runtime and networking
- Tracing for observability integration

**For TypeScript/Deno Projects:**

- Fresh for web application integrations
- Deno's built-in fetch for HTTP client integrations
- WebSocket API for real-time integrations
- Deno KV for simple state management

**For Java Projects:**

- Spring Boot with WebFlux for reactive integrations
- Spring Cloud for microservice patterns
- Quarkus for native compilation and performance
- Temporal for workflow orchestration

### Integration Best Practices

**Reliability:**

- Implement exponential backoff retry strategies
- Use circuit breakers for external service dependencies
- Design for idempotency in all integration endpoints
- Implement dead letter queues for failed message processing

**Security:**

- Use mutual TLS for service-to-service communication
- Implement OAuth2/OIDC for user context propagation
- Store secrets in dedicated secret management systems
- Validate and sanitize all external data inputs

**Observability:**

- Instrument all integration points with distributed tracing
- Implement structured logging with correlation IDs
- Monitor integration success rates, latency, and error patterns
- Set up alerting for integration health and performance degradation

**Performance:**

- Use connection pooling for database integrations
- Implement caching strategies for frequently accessed data
- Design for horizontal scaling with stateless integration services
- Use async patterns to prevent blocking operations

### Integration Testing Strategies

**Unit Testing:**

- Mock external dependencies for isolated testing
- Test error handling and retry logic
- Validate data transformation and mapping functions
- Test authentication and authorization flows

**Integration Testing:**

- Use TestContainers for database integration tests
- Test with real external services in staging environments
- Validate end-to-end data flow scenarios
- Test failure scenarios and recovery procedures

**Contract Testing:**

- Use Pact or similar tools for API contract validation
- Define and validate data schemas between services
- Test backward compatibility during service evolution
- Implement consumer-driven contract testing

This intelligent integration orchestrator adapts to your project architecture, leverages modern tools exclusively, and provides comprehensive integration capabilities through parallel sub-agent coordination when needed.

```
```