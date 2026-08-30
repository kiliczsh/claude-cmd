---
allowed-tools: Task, Read, Write, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(docker:*), Bash(kubectl:*), Bash(git:*)
name: "Observe"
description: "Transform applications into fully observable systems with comprehensive metrics, logging, tracing, and monitoring dashboards"
author: "wcygan"
tags: ["ops","monitor"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target service: $ARGUMENTS
- Current directory: !`pwd`
- Project languages: !`fd "(Cargo.toml|go.mod|package.json|pom.xml|build.gradle|deno.json)" . -d 3 | head -5 || echo "No build files detected"`
- Existing observability: !`fd "(prometheus|grafana|otel|jaeger|zipkin)" . -t d -d 2 | head -3 || echo "No existing observability detected"`
- Docker environment: !`docker info >/dev/null 2>&1 && echo "✓ Docker available" || echo "✗ Docker not available"`
- Kubernetes context: !`kubectl config current-context 2>/dev/null || echo "No k8s context"`
- Git branch: !`git branch --show-current 2>/dev/null || echo "Not in git repo"`
- Service discovery: !`rg -l "(main|app|server|service)" --type-add 'code:*.{go,rs,java,js,ts,py}' --type code . | head -3 || echo "No main service files found"`

## Your Task

STEP 1: Initialize observability transformation session

- CREATE session state file: `/tmp/observability-session-$SESSION_ID.json`
- ANALYZE target service architecture from Context section
- DETERMINE technology stack and existing observability infrastructure
- VALIDATE required tools and environments (Docker, Kubernetes, build tools)

```bash
# Initialize observability session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetService": "'$ARGUMENTS'",
  "detectedLanguages": [],
  "existingObservability": [],
  "transformationStrategy": "full-stack",
  "generatedArtifacts": []
}' > /tmp/observability-session-$SESSION_ID.json
```

STEP 2: Service architecture analysis with parallel discovery

IF complex_service_architecture OR multiple_technologies_detected:

LAUNCH parallel sub-agents for comprehensive service analysis:

- **Agent 1: Service Discovery**: Analyze service structure, entry points, and main components
  - Focus: Main service files, configuration, deployment manifests
  - Extract: Service architecture, technology stack, existing instrumentation
  - Output: Service profile with observability requirements

- **Agent 2: Dependencies Analysis**: Map external dependencies and integration points
  - Focus: Database connections, external APIs, message queues, caches
  - Extract: Integration patterns, failure points, latency sources
  - Output: Dependency map with observability insertion points

- **Agent 3: Existing Observability Audit**: Assess current monitoring and logging
  - Focus: Existing metrics, logging frameworks, monitoring tools
  - Extract: Current observability gaps and enhancement opportunities
  - Output: Observability gap analysis and enhancement plan

- **Agent 4: Technology Stack Assessment**: Evaluate framework-specific observability options
  - Focus: Language-specific libraries, framework integrations, best practices
  - Extract: Optimal instrumentation libraries and patterns
  - Output: Technology-specific implementation recommendations

ELSE:

**Direct Service Analysis:**

- EXECUTE targeted service discovery using project language detection
- IDENTIFY main service entry points and key business logic
- ANALYZE existing observability patterns and gaps

STEP 3: Comprehensive observability instrumentation

TRY:

**Metrics Instrumentation Implementation:**

CASE detected_language:
WHEN "go":

- IMPLEMENT Prometheus metrics with histogram and counter patterns
- ADD HTTP middleware for request duration, rate, and error tracking
- CREATE custom business metrics for service-specific operations
- GENERATE `/metrics` endpoint with proper Prometheus exposition format

```go
// Generated metrics instrumentation
var (
    httpDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "http_request_duration_seconds",
            Help: "Duration of HTTP requests",
            Buckets: prometheus.DefBuckets,
        },
        []string{"method", "endpoint", "status_code"},
    )
    
    requestsTotal = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total", 
            Help: "Total number of HTTP requests",
        },
        []string{"method", "endpoint", "status_code"},
    )
)
```

WHEN "rust":

- IMPLEMENT metrics crate with Prometheus exporter
- ADD axum/warp middleware for automatic HTTP instrumentation
- CREATE custom gauges and histograms for application metrics
- INTEGRATE with tracing ecosystem for structured observability

```rust
// Generated Rust metrics
use metrics::{counter, histogram, gauge};

#[instrument]
async fn handle_request(req: Request<Body>) -> Result<Response<Body>, Error> {
    let start = Instant::now();
    let method = req.method().as_str();
    let path = req.uri().path();
    
    let result = process_request(req).await;
    
    let duration = start.elapsed().as_secs_f64();
    histogram!("http_request_duration_seconds")
        .with_tag("method", method)
        .with_tag("path", path)
        .record(duration);
        
    counter!("http_requests_total")
        .with_tag("method", method)
        .with_tag("status", result.status().as_str())
        .increment(1);
        
    result
}
```

WHEN "java":

- IMPLEMENT Micrometer metrics with Spring Boot Actuator
- ADD automatic HTTP request instrumentation
- CREATE custom meters for business logic monitoring
- CONFIGURE Prometheus registry for metric exposition

WHEN "javascript|typescript":

- IMPLEMENT prom-client for Node.js applications
- ADD Express/Fastify middleware for HTTP metrics
- CREATE custom metrics for business operations
- INTEGRATE with OpenTelemetry for unified observability

**Structured Logging Enhancement:**

FOR EACH service_component:

- REPLACE printf/console.log with structured logging
- ADD request correlation IDs for distributed tracing
- IMPLEMENT JSON log format for machine parsing
- CREATE contextual loggers with consistent field naming

**Distributed Tracing Integration:**

- IMPLEMENT OpenTelemetry auto-instrumentation
- ADD manual spans for critical business operations
- CONFIGURE trace exporters (Jaeger, Zipkin, or cloud providers)
- CREATE trace correlation across service boundaries

STEP 4: Health checks and service monitoring

**Comprehensive Health Check Implementation:**

```go
// Generated health check system
type HealthCheck struct {
    database    DatabaseChecker
    redis       RedisChecker
    externalAPI ExternalAPIChecker
}

func (h *HealthCheck) CheckHealth(ctx context.Context) HealthStatus {
    checks := map[string]ComponentHealth{
        "database":     h.database.Check(ctx),
        "redis":        h.redis.Check(ctx),
        "external_api": h.externalAPI.Check(ctx),
    }
    
    overall := "healthy"
    for _, check := range checks {
        if check.Status != "healthy" {
            overall = "unhealthy"
            break
        }
    }
    
    return HealthStatus{
        Status:     overall,
        Timestamp:  time.Now(),
        Components: checks,
        Version:    buildInfo.Version,
        Uptime:     time.Since(startTime),
    }
}
```

**Kubernetes Integration:**

IF kubernetes_environment_detected:

- CREATE readiness and liveness probe endpoints
- ADD Prometheus ServiceMonitor for metric scraping
- GENERATE Grafana dashboard ConfigMaps
- IMPLEMENT PodMonitor for comprehensive pod metrics

STEP 5: Monitoring dashboard and alerting generation

**Grafana Dashboard Creation:**

- GENERATE service-specific Grafana dashboard JSON
- IMPLEMENT golden signals monitoring (latency, traffic, errors, saturation)
- CREATE detailed breakdowns by endpoint and error type
- ADD resource utilization and capacity planning panels

**Prometheus Alerting Rules:**

```yaml
# Generated alert rules
groups:
  - name: $ARGUMENTS-service-alerts
    rules:
      - alert: HighErrorRate
        expr: |
          (
            sum(rate(http_requests_total{service="$ARGUMENTS",status_code=~"5.."}[5m])) /
            sum(rate(http_requests_total{service="$ARGUMENTS"}[5m]))
          ) > 0.05
        for: 2m
        labels:
          severity: critical
          service: $ARGUMENTS
        annotations:
          summary: "High error rate detected"
          description: "Service {{ $labels.service }} has error rate above 5% for 2 minutes"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket{service="$ARGUMENTS"}[5m])) by (le)
          ) > 0.5
        for: 3m
        labels:
          severity: warning
          service: $ARGUMENTS
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is above 500ms"
```

STEP 6: Docker and Kubernetes observability integration

**Container Observability:**

IF docker_environment:

- CREATE multi-stage Dockerfile with observability agents
- ADD Prometheus node exporter as sidecar
- CONFIGURE log aggregation for container environments
- IMPLEMENT distributed tracing in containerized setup

**Kubernetes Manifests:**

IF kubernetes_environment:

- GENERATE ServiceMonitor for Prometheus discovery
- CREATE Grafana dashboard ConfigMaps
- ADD PodMonitor for comprehensive pod observability
- IMPLEMENT trace collection with OpenTelemetry Operator

STEP 7: Documentation and runbook generation

**Observability Documentation:**

- CREATE observability runbook with dashboard URLs
- DOCUMENT metric definitions and alert thresholds
- GENERATE troubleshooting guides for common issues
- PROVIDE SLA/SLO definitions and monitoring approach

**Generated File Structure:**

```
observability/
├── metrics/
│   ├── prometheus.yml      # Scrape configuration
│   └── metrics.{go|rs|java|js}  # Application metrics code
├── dashboards/
│   ├── service-overview.json
│   └── detailed-metrics.json
├── alerts/
│   └── service-alerts.yml
├── tracing/
│   └── otel-config.yml
├── health/
│   └── health-checks.{go|rs|java|js}
└── docs/
    ├── observability-runbook.md
    └── troubleshooting-guide.md
```

CATCH (observability_implementation_failed):

- LOG detailed error information to session state
- PROVIDE alternative implementation strategies
- SUGGEST manual instrumentation approaches
- CREATE minimal observability baseline

```bash
echo "⚠️ Observability implementation encountered issues:"
echo "Technology stack: $(jq -r '.detectedLanguages[]' /tmp/observability-session-$SESSION_ID.json)"
echo "Available tools: Docker: $(docker --version 2>/dev/null || echo 'Not available'), Kubernetes: $(kubectl version --client 2>/dev/null || echo 'Not available')"
echo "Fallback: Creating basic monitoring setup with manual configuration"
```

STEP 8: Validation and testing

**Observability Validation:**

- TEST metric endpoints for proper Prometheus formatting
- VALIDATE log output for structured JSON format
- VERIFY trace propagation across service boundaries
- CHECK health endpoint responses and error handling

**Integration Testing:**

- RUN load test to verify metric collection
- GENERATE test traces and verify collection
- VALIDATE dashboard rendering with generated metrics
- TEST alert rule firing with simulated conditions

FINALLY:

**Session Completion and Summary:**

```bash
# Update observability session with results
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .completedAt = $timestamp |
  .status = "completed"
' /tmp/observability-session-$SESSION_ID.json > /tmp/observability-session-$SESSION_ID.tmp && \
mv /tmp/observability-session-$SESSION_ID.tmp /tmp/observability-session-$SESSION_ID.json

echo "✅ Observability transformation completed for $ARGUMENTS"
echo "📊 Generated artifacts: $(jq -r '.generatedArtifacts | length' /tmp/observability-session-$SESSION_ID.json) files"
echo "🔍 Session: $SESSION_ID"
echo "💾 Configuration saved in: observability/ directory"
echo "📈 Next steps:"
echo "  1. Deploy updated service with observability instrumentation"
echo "  2. Import Grafana dashboards from observability/dashboards/"
echo "  3. Apply Prometheus alert rules from observability/alerts/"
echo "  4. Configure trace collection and analysis"
echo "📚 Documentation: observability/docs/observability-runbook.md"
```

## Technology Support

**Metrics Libraries:**

- **Go**: Prometheus client, expvar
- **Rust**: metrics, prometheus crate
- **Java**: Micrometer, Prometheus JVM client
- **Node/Deno**: prom-client, @opentelemetry/metrics

**Logging Frameworks:**

- **Go**: slog, logrus, zap
- **Rust**: tracing, log + env_logger
- **Java**: Logback, Log4j2 with JSON encoders
- **Node/Deno**: winston, pino

**Tracing Systems:**

- OpenTelemetry (all languages)
- Jaeger and Zipkin compatible
- Cloud provider tracing (AWS X-Ray, Google Cloud Trace)

## Integration with Other Commands

- Use with `/deploy` to add monitoring to Kubernetes deployments
- Combine with `/harden` for security-aware logging (no sensitive data)
- Use after `/containerize` to add observability to Docker images
- Integrate with `/ci-gen` to test observability endpoints in CI

### What it adds:

#### 1. Metrics Instrumentation

Injects comprehensive Prometheus metrics for key operations:

**HTTP/API Metrics:**

- Request duration histograms with percentiles (p50, p95, p99)
- Request rate counters by endpoint and method
- Error rate counters by status code and error type
- Active connections and concurrent requests

**Application Metrics:**

- Business logic counters (user registrations, orders, etc.)
- Resource utilization (memory, CPU, database connections)
- Queue depths and processing times
- Cache hit/miss ratios

**Framework-Specific Implementation:**

**Go (with Prometheus client):**

```go
var (
    httpDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "http_request_duration_seconds",
            Help: "Duration of HTTP requests",
            Buckets: prometheus.DefBuckets,
        },
        []string{"method", "endpoint", "status_code"},
    )
    
    requestsTotal = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total", 
            Help: "Total number of HTTP requests",
        },
        []string{"method", "endpoint", "status_code"},
    )
)

// Middleware injection
func MetricsMiddleware(next http.Handler) http.Handler {
    return promhttp.InstrumentHandlerDuration(httpDuration,
        promhttp.InstrumentHandlerCounter(requestsTotal, next))
}
```

**Rust (with metrics crate):**

```rust
use metrics::{counter, histogram, gauge};

#[instrument]
async fn handle_request(req: Request<Body>) -> Result<Response<Body>, Error> {
    let start = Instant::now();
    let method = req.method().as_str();
    let path = req.uri().path();
    
    let result = process_request(req).await;
    
    let duration = start.elapsed().as_secs_f64();
    histogram!("http_request_duration_seconds")
        .with_tag("method", method)
        .with_tag("path", path)
        .record(duration);
        
    counter!("http_requests_total")
        .with_tag("method", method)
        .with_tag("status", result.status().as_str())
        .increment(1);
        
    result
}
```

#### 2. Structured Logging

Refactors logging to use structured, machine-readable formats:

**Log Structure Enhancement:**

- JSON format for log aggregation systems
- Consistent field naming and data types
- Request correlation IDs for tracing
- Structured error context and stack traces

**Framework Integration:**

**Go (with slog):**

```go
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
    Level: slog.LevelInfo,
}))

func handleUser(w http.ResponseWriter, r *http.Request) {
    requestID := r.Header.Get("X-Request-ID")
    
    logger.InfoContext(r.Context(), "processing user request",
        slog.String("request_id", requestID),
        slog.String("user_id", getUserID(r)),
        slog.String("endpoint", r.URL.Path),
        slog.Duration("processing_time", time.Since(start)),
    )
}
```

**Rust (with tracing):**

```rust
use tracing::{info, error, instrument};

#[instrument(fields(user_id = %user.id, request_id = %req_id))]
async fn process_user_order(user: &User, order: Order, req_id: String) -> Result<OrderResponse, OrderError> {
    info!("processing order for user");
    
    match create_order(&order).await {
        Ok(response) => {
            info!(order_id = %response.id, "order created successfully");
            Ok(response)
        },
        Err(e) => {
            error!(error = %e, "failed to create order");
            Err(e)
        }
    }
}
```

#### 3. Distributed Tracing

Implements OpenTelemetry for request flow visibility:

**Trace Context Propagation:**

- Automatic span creation for HTTP requests
- Database query tracing with SQL statements
- External service call instrumentation
- Custom business logic spans

**Integration Examples:**

**Java (with OpenTelemetry):**

```java
@RestController
public class UserController {
    
    @GetMapping("/users/{id}")
    @WithSpan("get_user_by_id")
    public ResponseEntity<User> getUser(@SpanAttribute("user.id") @PathVariable Long id) {
        Span currentSpan = Span.current();
        currentSpan.addEvent("starting user lookup");
        
        User user = userService.findById(id);
        currentSpan.setAllAttributes(Attributes.of(
            AttributeKey.stringKey("user.email"), user.getEmail(),
            AttributeKey.longKey("user.created_timestamp"), user.getCreatedAt().toEpochMilli()
        ));
        
        return ResponseEntity.ok(user);
    }
}
```

#### 4. Health Checks and Readiness Probes

Creates comprehensive health monitoring endpoints:

**Health Check Implementation:**

```go
type HealthCheck struct {
    database    DatabaseChecker
    redis       RedisChecker
    externalAPI ExternalAPIChecker
}

func (h *HealthCheck) CheckHealth(ctx context.Context) HealthStatus {
    checks := map[string]ComponentHealth{
        "database":     h.database.Check(ctx),
        "redis":        h.redis.Check(ctx),
        "external_api": h.externalAPI.Check(ctx),
    }
    
    overall := "healthy"
    for _, check := range checks {
        if check.Status != "healthy" {
            overall = "unhealthy"
            break
        }
    }
    
    return HealthStatus{
        Status:     overall,
        Timestamp:  time.Now(),
        Components: checks,
        Version:    buildInfo.Version,
        Uptime:     time.Since(startTime),
    }
}
```

### 5. Monitoring Dashboards

Generates Grafana dashboard configurations:

**Dashboard Features:**

- Service overview with golden signals (latency, traffic, errors, saturation)
- Detailed breakdowns by endpoint and error type
- Resource utilization and capacity planning
- SLA/SLO tracking with burn rate alerts

**Generated Dashboard JSON:**

```json
{
  "dashboard": {
    "title": "User Service Monitoring",
    "panels": [
      {
        "title": "Request Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{service=\"user-service\"}[5m]))",
            "legendFormat": "Requests/sec"
          }
        ]
      },
      {
        "title": "Response Time Percentiles",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.50, http_request_duration_seconds_bucket{service=\"user-service\"})",
            "legendFormat": "p50"
          },
          {
            "expr": "histogram_quantile(0.95, http_request_duration_seconds_bucket{service=\"user-service\"})",
            "legendFormat": "p95"
          }
        ]
      }
    ]
  }
}
```

### 6. Alerting Rules

Creates Prometheus alerting rules for common failure modes:

**Generated Alert Rules:**

```yaml
groups:
  - name: user-service-alerts
    rules:
      - alert: HighErrorRate
        expr: |
          (
            sum(rate(http_requests_total{service="user-service",status_code=~"5.."}[5m])) /
            sum(rate(http_requests_total{service="user-service"}[5m]))
          ) > 0.05
        for: 2m
        labels:
          severity: critical
          service: user-service
        annotations:
          summary: "High error rate detected"
          description: "Service {{ $labels.service }} has error rate above 5% for 2 minutes"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket{service="user-service"}[5m])) by (le)
          ) > 0.5
        for: 3m
        labels:
          severity: warning
          service: user-service
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is above 500ms"
```

## Examples

### Add full observability to a service:

```
/observe user-service
```

### Add only metrics instrumentation:

```
/observe api-gateway --metrics-only
```

### Add distributed tracing:

```
/observe payment-service --tracing
```

## Generated File Structure

```
observability/
├── metrics/
│   ├── prometheus.yml      # Scrape configuration
│   └── metrics.go|rs|java  # Application metrics code
├── dashboards/
│   ├── service-overview.json
│   └── detailed-metrics.json
├── alerts/
│   └── service-alerts.yml
└── tracing/
    └── otel-config.yml
```

## Technology Support

**Metrics Libraries:**

- **Go**: Prometheus client, expvar
- **Rust**: metrics, prometheus crate
- **Java**: Micrometer, Prometheus JVM client
- **Node/Deno**: prom-client, @opentelemetry/metrics

**Logging Frameworks:**

- **Go**: slog, logrus, zap
- **Rust**: tracing, log + env_logger
- **Java**: Logback, Log4j2 with JSON encoders
- **Node/Deno**: winston, pino

**Tracing Systems:**

- OpenTelemetry (all languages)
- Jaeger and Zipkin compatible
- Cloud provider tracing (AWS X-Ray, Google Cloud Trace)

## Integration with Other Commands

- Use with `/deploy` to add monitoring to Kubernetes deployments
- Combine with `/harden` for security-aware logging (no sensitive data)
- Use after `/containerize` to add observability to Docker images
- Integrate with `/ci-gen` to test observability endpoints in CI