---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(k6:*), Bash(artillery:*), Bash(docker:*), Bash(curl:*), Bash(eza:*), Bash(bat:*)
name: "Load Test"
description: "Comprehensive load testing orchestrator with intelligent scenario generation, performance baselines, and automated analysis"
author: "wcygan"
tags: ["test","run"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Load test target: $ARGUMENTS
- Current directory: !`pwd`
- Project structure: !`eza -la --tree --level=2 2>/dev/null | head -15 || fd . -t d -d 2 | head -10`
- Technology stack: !`fd "(package\.json|Cargo\.toml|go\.mod|deno\.json|pom\.xml|build\.gradle)" . -d 3 | head -10 || echo "No build files detected"`
- Load testing tools: !`echo "k6: $(which k6 >/dev/null && echo ✓ || echo ✗) | artillery: $(which artillery >/dev/null && echo ✓ || echo ✗) | docker: $(which docker >/dev/null && echo ✓ || echo ✗)"`
- Existing endpoints: !`rg "(app|router|handler)\.(get|post|put|delete|patch)" --type js --type ts -m 5 2>/dev/null | head -5 || echo "No API routes detected"`
- Running services: !`docker ps --format "table {{.Names}}\t{{.Ports}}" 2>/dev/null | head -5 || echo "No Docker services detected"`
- Available ports: !`netstat -an 2>/dev/null | rg ":3000|:8000|:8080" | head -3 || echo "No common dev ports in use"`

## Your Task

STEP 1: Initialize load testing session with intelligent context analysis

- CREATE session state file: `/tmp/load-test-session-$SESSION_ID.json`
- ANALYZE project structure from Context section
- DETECT primary technology stack and frameworks
- IDENTIFY existing load testing configurations
- VALIDATE load testing tools availability (k6, artillery, docker are REQUIRED)

```bash
# Initialize load testing session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "target": "'$ARGUMENTS'",
  "detectedFramework": "auto-detect",
  "loadTestingTool": "k6",
  "scenarioStrategy": "intelligent",
  "baselineRequired": true,
  "ciIntegration": true
}' > /tmp/load-test-session-$SESSION_ID.json
```

STEP 2: Intelligent target detection and analysis strategy

CASE target_type:
WHEN "no_arguments":

- EXECUTE comprehensive project analysis for API discovery
- DETECT OpenAPI/Swagger specifications in project
- IDENTIFY docker-compose services with exposed ports
- PROVIDE interactive endpoint selection interface

WHEN "endpoint_url":

- CREATE targeted load tests for specific URL endpoint
- AUTO-DETECT authentication requirements via endpoint analysis
- ANALYZE response patterns for realistic test scenarios
- GENERATE endpoint-specific performance thresholds

WHEN "api_spec_file":

- PARSE comprehensive test suite from OpenAPI/Swagger specification
- CREATE weighted scenario distributions based on endpoint criticality
- INCLUDE all endpoint combinations with realistic data flows
- GENERATE full API coverage testing matrix

STEP 3: Advanced framework detection with parallel sub-agent analysis

TRY:

IF project_complexity == "enterprise" OR codebase_size > 100_files:

LAUNCH parallel sub-agents for comprehensive load testing strategy:

- **Agent 1: Technology Stack Analysis**: Analyze project dependencies and frameworks
  - Focus: Package managers, runtime dependencies, existing test tools
  - Tools: fd for file discovery, jq for JSON parsing, rg for pattern matching
  - Output: Technology manifest with recommended load testing tools

- **Agent 2: API Surface Discovery**: Map all available API endpoints and services
  - Focus: REST endpoints, GraphQL schemas, gRPC services, WebSocket connections
  - Tools: rg for route patterns, framework-specific endpoint detection
  - Output: Comprehensive API inventory with criticality scoring

- **Agent 3: Performance Requirements Analysis**: Determine performance criteria and SLAs
  - Focus: Existing monitoring, performance budgets, business requirements
  - Tools: Analysis of monitoring configs, SLA documents, performance metrics
  - Output: Performance baseline requirements and threshold definitions

- **Agent 4: Infrastructure Assessment**: Evaluate deployment and scaling characteristics
  - Focus: Container orchestration, database connections, external dependencies
  - Tools: docker-compose analysis, kubernetes manifest detection
  - Output: Infrastructure constraints and scaling considerations

ELSE:

EXECUTE streamlined framework detection:

```bash
# Detect existing load testing tools
echo "🔍 Analyzing project for load testing tools..."
fd "package.json" . | xargs jq -r '.devDependencies | keys[]?' 2>/dev/null | rg "(k6|artillery|wrk|autocannon)" || echo "No existing tools found"

# Check for load testing configurations
echo "📁 Searching for existing load test configs..."
fd "(k6|artillery|wrk)\.(js|yml|yaml|json)$" . --max-depth 3 || echo "No load test configs found"

# Analyze project language preferences for tool recommendation
project_tech=$(fd "(package\.json|Cargo\.toml|go\.mod|deno\.json)" . | head -1)
case $project_tech in
  *package.json*|*deno.json*) echo "🎯 JavaScript/TypeScript project - k6 or Artillery recommended" ;;
  *go.mod*) echo "🐹 Go project - wrk or hey recommended" ;;
  *Cargo.toml*) echo "🦀 Rust project - drill or wrk recommended" ;;
  *) echo "📊 Multi-language project - k6 recommended for versatility" ;;
esac
```

STEP 4: Intelligent load test generation with framework-specific optimizations

**Comprehensive API Endpoint Discovery:**

```bash
# Advanced framework-specific endpoint extraction
echo "🔍 Discovering API endpoints for load testing..."

# JavaScript/TypeScript frameworks
if fd "package\.json" . | head -1 >/dev/null; then
  echo "📡 Analyzing JavaScript/TypeScript API routes..."
  rg "(app|router|handler)\.(get|post|put|delete|patch)" --type js --type ts -A 2 -B 1 | head -20
  rg "@(Get|Post|Put|Delete|Patch)" --type ts -A 2 | head -10  # NestJS decorators
fi

# Rust web frameworks
if fd "Cargo\.toml" . | head -1 >/dev/null; then
  echo "🦀 Analyzing Rust web service routes..."
  rg "Router::new\(\)|\.route\(|\.get\(|\.post\(" --type rust -A 2 -B 1 | head -20
  rg "#\[axum::debug_handler\]|#\[get\(|#\[post\(" --type rust -A 1 | head -10  # Axum handlers
fi

# Go web frameworks
if fd "go\.mod" . | head -1 >/dev/null; then
  echo "🐹 Analyzing Go web service routes..."
  rg "router\.(GET|POST|PUT|DELETE)|r\.(GET|POST)" --type go -A 2 -B 1 | head -20
  rg "connect\.|grpc\.|rpc" --type go -A 2 | head -10  # gRPC/ConnectRPC
fi

# Java Spring/Quarkus
if fd "(pom\.xml|build\.gradle)" . | head -1 >/dev/null; then
  echo "☕ Analyzing Java web service endpoints..."
  rg "@(GetMapping|PostMapping|PutMapping|DeleteMapping|RequestMapping)" --type java -A 2 -B 1 | head -20
  rg "@Path\(|@GET|@POST" --type java -A 1 | head -10  # JAX-RS
fi

# Deno Fresh
if fd "deno\.json" . | head -1 >/dev/null; then
  echo "🦕 Analyzing Deno Fresh API routes..."
  rg "handler|export.*function.*(GET|POST)" --type ts -A 2 -B 1 | head -20
fi
```

**OpenAPI/Swagger Analysis:**

```typescript
// Parse OpenAPI spec for comprehensive testing
interface OpenAPISpec {
  paths: Record<string, {
    get?: OperationObject;
    post?: OperationObject;
    put?: OperationObject;
    delete?: OperationObject;
  }>;
  components?: {
    schemas?: Record<string, SchemaObject>;
    securitySchemes?: Record<string, SecuritySchemeObject>;
  };
}

function generateLoadTestScenarios(spec: OpenAPISpec) {
  const scenarios = [];

  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      scenarios.push({
        name: operation.operationId || `${method.toUpperCase()} ${path}`,
        path: path,
        method: method.toUpperCase(),
        weight: calculateWeight(operation),
        auth: detectAuthRequirements(operation),
        parameters: extractParameters(operation),
        requestBody: generateRequestBody(operation),
      });
    }
  }

  return scenarios;
}
```

### 2. K6 Load Test Generation

**Basic Load Test Template:**

```javascript
// Generated K6 load test for API endpoints
import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");

// Test configuration
export const options = {
  stages: [
    { duration: "2m", target: 10 }, // Ramp up
    { duration: "5m", target: 10 }, // Stay at 10 users
    { duration: "2m", target: 20 }, // Ramp up to 20 users
    { duration: "5m", target: 20 }, // Stay at 20 users
    { duration: "2m", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests must complete below 500ms
    http_req_failed: ["rate<0.1"], // Error rate must be below 10%
    errors: ["rate<0.1"],
  },
};

// Base URL configuration
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

// Authentication setup
let authHeaders = {};
if (__ENV.API_KEY) {
  authHeaders["Authorization"] = `Bearer ${__ENV.API_KEY}`;
}

// Test data
const testUsers = [
  { email: "test1@example.com", name: "Test User 1" },
  { email: "test2@example.com", name: "Test User 2" },
  { email: "test3@example.com", name: "Test User 3" },
];

export default function () {
  // Test scenario selection based on weights
  const scenario = selectScenario();

  switch (scenario) {
    case "getUsers":
      testGetUsers();
      break;
    case "createUser":
      testCreateUser();
      break;
    case "getUserById":
      testGetUserById();
      break;
    case "updateUser":
      testUpdateUser();
      break;
    case "deleteUser":
      testDeleteUser();
      break;
  }

  sleep(1); // Think time between requests
}

function selectScenario() {
  const scenarios = [
    { name: "getUsers", weight: 40 },
    { name: "createUser", weight: 20 },
    { name: "getUserById", weight: 25 },
    { name: "updateUser", weight: 10 },
    { name: "deleteUser", weight: 5 },
  ];

  const random = Math.random() * 100;
  let cumulative = 0;

  for (const scenario of scenarios) {
    cumulative += scenario.weight;
    if (random <= cumulative) {
      return scenario.name;
    }
  }

  return scenarios[0].name;
}

function testGetUsers() {
  const response = http.get(`${BASE_URL}/api/users`, {
    headers: authHeaders,
  });

  check(response, {
    "GET /api/users status is 200": (r) => r.status === 200,
    "GET /api/users response time < 500ms": (r) => r.timings.duration < 500,
    "GET /api/users has users array": (r) => {
      try {
        const body = JSON.parse(r.body);
        return Array.isArray(body.users);
      } catch {
        return false;
      }
    },
  }) || errorRate.add(1);
}

function testCreateUser() {
  const user = testUsers[Math.floor(Math.random() * testUsers.length)];
  const payload = {
    ...user,
    email: `${Date.now()}_${user.email}`, // Ensure unique email
  };

  const response = http.post(
    `${BASE_URL}/api/users`,
    JSON.stringify(payload),
    {
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
    },
  );

  check(response, {
    "POST /api/users status is 201": (r) => r.status === 201,
    "POST /api/users response time < 1000ms": (r) => r.timings.duration < 1000,
    "POST /api/users returns user ID": (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.id !== undefined;
      } catch {
        return false;
      }
    },
  }) || errorRate.add(1);
}

function testGetUserById() {
  // Simulate getting a user by ID (using a range of likely IDs)
  const userId = Math.floor(Math.random() * 1000) + 1;

  const response = http.get(`${BASE_URL}/api/users/${userId}`, {
    headers: authHeaders,
  });

  check(response, {
    "GET /api/users/:id response time < 300ms": (r) => r.timings.duration < 300,
    "GET /api/users/:id status is 200 or 404": (r) => r.status === 200 || r.status === 404,
  }) || errorRate.add(1);
}

function testUpdateUser() {
  const userId = Math.floor(Math.random() * 100) + 1;
  const updateData = {
    name: `Updated User ${Date.now()}`,
  };

  const response = http.put(
    `${BASE_URL}/api/users/${userId}`,
    JSON.stringify(updateData),
    {
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
    },
  );

  check(response, {
    "PUT /api/users/:id response time < 800ms": (r) => r.timings.duration < 800,
    "PUT /api/users/:id status is 200 or 404": (r) => r.status === 200 || r.status === 404,
  }) || errorRate.add(1);
}

function testDeleteUser() {
  const userId = Math.floor(Math.random() * 100) + 1;

  const response = http.del(`${BASE_URL}/api/users/${userId}`, null, {
    headers: authHeaders,
  });

  check(response, {
    "DELETE /api/users/:id response time < 500ms": (r) => r.timings.duration < 500,
    "DELETE /api/users/:id status is 200 or 404": (r) => r.status === 200 || r.status === 404,
  }) || errorRate.add(1);
}
```

### 3. Artillery Load Test Generation

**Artillery Configuration:**

```yaml
# Generated Artillery load test configuration
config:
  target: '{{ $environment.BASE_URL | default("http://localhost:3000") }}'
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 120
      arrivalRate: 10
      name: "Steady load"
    - duration: 60
      arrivalRate: 20
      name: "Peak load"
    - duration: 60
      arrivalRate: 5
      name: "Cool down"
  variables:
    userEmail:
      - "test1@example.com"
      - "test2@example.com"
      - "test3@example.com"
  plugins:
    - artillery-plugin-metrics-by-endpoint
    - artillery-plugin-statsd
  processor: "./processor.js"

scenarios:
  - name: "User Management Flow"
    weight: 60
    flow:
      - get:
          url: "/api/health"
          capture:
            - json: "$.status"
              as: "healthStatus"
      - think: 1
      - get:
          url: "/api/users"
          headers:
            Authorization: "Bearer {{ $environment.API_KEY }}"
          capture:
            - json: "$.users[0].id"
              as: "userId"
      - think: 2
      - get:
          url: "/api/users/{{ userId }}"
          headers:
            Authorization: "Bearer {{ $environment.API_KEY }}"

  - name: "Create and Update User"
    weight: 30
    flow:
      - post:
          url: "/api/users"
          headers:
            Authorization: "Bearer {{ $environment.API_KEY }}"
            Content-Type: "application/json"
          json:
            email: "{{ userEmail }}_{{ $timestamp }}"
            name: "Load Test User"
          capture:
            - json: "$.id"
              as: "newUserId"
      - think: 1
      - put:
          url: "/api/users/{{ newUserId }}"
          headers:
            Authorization: "Bearer {{ $environment.API_KEY }}"
            Content-Type: "application/json"
          json:
            name: "Updated Load Test User"

  - name: "High Frequency Reads"
    weight: 10
    flow:
      - loop:
          - get:
              url: "/api/users/{{ $randomInt(1, 1000) }}"
              headers:
                Authorization: "Bearer {{ $environment.API_KEY }}"
          - think: 0.5
        count: 5
```

### 4. Performance Baseline Generation

**Automated Baseline Creation:**

```typescript
// Performance baseline generator
interface PerformanceBaseline {
  endpoint: string;
  method: string;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  throughputRps: number;
  errorRate: number;
  timestamp: string;
}

async function generateBaseline(endpoint: string): Promise<PerformanceBaseline> {
  // Run lightweight baseline test
  const results = await runBaselineTest(endpoint);

  return {
    endpoint,
    method: detectHttpMethod(endpoint),
    p50ResponseTime: results.responseTime.p50,
    p95ResponseTime: results.responseTime.p95,
    p99ResponseTime: results.responseTime.p99,
    throughputRps: results.throughput.rps,
    errorRate: results.errors.rate,
    timestamp: new Date().toISOString(),
  };
}

// Baseline comparison for regression detection
function compareWithBaseline(
  current: PerformanceBaseline,
  baseline: PerformanceBaseline,
): PerformanceReport {
  const regressions = [];

  if (current.p95ResponseTime > baseline.p95ResponseTime * 1.2) {
    regressions.push({
      metric: "p95ResponseTime",
      current: current.p95ResponseTime,
      baseline: baseline.p95ResponseTime,
      degradation: ((current.p95ResponseTime / baseline.p95ResponseTime) - 1) * 100,
    });
  }

  if (current.errorRate > baseline.errorRate * 1.5) {
    regressions.push({
      metric: "errorRate",
      current: current.errorRate,
      baseline: baseline.errorRate,
      degradation: ((current.errorRate / baseline.errorRate) - 1) * 100,
    });
  }

  return {
    status: regressions.length > 0 ? "REGRESSION_DETECTED" : "PERFORMANCE_STABLE",
    regressions,
    summary: generatePerformanceSummary(current, baseline),
  };
}
```

### 5. CI/CD Integration

**GitHub Actions Integration:**

```yaml
# Generated performance testing workflow
name: Load Testing

on:
  pull_request:
    branches: [main]
  schedule:
    - cron: "0 2 * * *" # Daily at 2 AM

jobs:
  load-test:
    runs-on: ubuntu-latest

    services:
      app:
        image: ${{ env.APP_IMAGE }}
        ports:
          - 3000:3000
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install k6
        run: |
          curl https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz -L | tar xvz --strip-components 1
          sudo mv k6 /usr/local/bin/

      - name: Wait for service
        run: |
          timeout 60 bash -c 'until curl -f http://localhost:3000/health; do sleep 2; done'

      - name: Run load tests
        run: |
          k6 run --out json=results.json load-test.js
        env:
          BASE_URL: http://localhost:3000
          API_KEY: ${{ secrets.TEST_API_KEY }}

      - name: Analyze results
        run: |
          node analyze-performance.js results.json

      - name: Upload results
        uses: actions/upload-artifact@v4
        with:
          name: load-test-results
          path: |
            results.json
            performance-report.html

      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('performance-summary.md', 'utf8');

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: report
            });
```

## Deno Task Integration

**Generated deno.json tasks:**

```json
{
  "tasks": {
    "load-test": "k6 run load-test.js",
    "load-test:watch": "k6 run --watch load-test.js",
    "load-test:smoke": "k6 run --vus 1 --duration 30s load-test.js",
    "load-test:stress": "k6 run --vus 100 --duration 10m load-test.js",
    "load-test:spike": "k6 run --stage 0:0,1m:100,2m:100,3m:0 load-test.js",
    "baseline": "k6 run --vus 10 --duration 2m load-test.js --out json=baseline.json",
    "perf-report": "node analyze-performance.js results.json"
  }
}
```

## Output

The command generates:

1. **Load Test Scripts**: K6, Artillery, or tool-specific test configurations
2. **Test Scenarios**: Realistic user behavior patterns and weighted distributions
3. **Performance Baselines**: Automated baseline capture and regression detection
4. **CI Integration**: GitHub Actions workflows for automated testing
5. **Analysis Tools**: Result parsing and performance report generation
6. **Monitoring Setup**: Grafana dashboards and alert configurations

## Integration with Other Commands

- Use with `/monitor` for ongoing performance tracking
- Combine with `/deploy` for staging environment testing
- Integrate with `/ci-gen` for automated pipeline setup
- Follow with `/bottleneck` for performance optimization
- Use with `/health-check` for comprehensive monitoring

The load testing setup adapts to detected technology stacks and provides comprehensive performance validation with automated regression detection and CI/CD integration.