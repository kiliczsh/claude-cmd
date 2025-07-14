---
allowed-tools: Task, Bash(kubectl:*), Bash(docker:*), Bash(curl:*), Bash(jq:*), Bash(systemctl:*), Bash(gdate:*), Bash(rg:*), Bash(fd:*), Read, Write
name: "Health Check"
description: "Comprehensive health monitoring orchestrator with parallel system assessment and automated alerting"
author: "wcygan"
tags: ["ops","infra"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target system: $ARGUMENTS
- Current directory: !`pwd`
- Kubernetes context: !`kubectl config current-context 2>/dev/null || echo "No K8s context"`
- Docker daemon: !`docker info --format '{{.ServerVersion}}' 2>/dev/null || echo "Docker unavailable"`
- System load: !`uptime | awk '{print $10, $11, $12}' 2>/dev/null || echo "Load unavailable"`
- Available tools: !`echo "kubectl: $(which kubectl >/dev/null && echo ✓ || echo ✗) | docker: $(which docker >/dev/null && echo ✓ || echo ✗) | curl: $(which curl >/dev/null && echo ✓ || echo ✗)"`

**Live System Assessment:**

- **Cluster Status**: !`kubectl get nodes -o json 2>/dev/null | jq -r '.items[]? | "\(.metadata.name): \(.status.conditions[-1].type)"' | head -5 || echo "Kubernetes cluster not accessible"`
- **Container Health**: !`docker ps --format "table {{.Names}}\t{{.Status}}" 2>/dev/null | head -10 || echo "Docker containers not accessible"`
- **Failed Services**: !`systemctl --failed --no-legend 2>/dev/null | wc -l | tr -d ' ' || echo "0"` failed systemd services
- **Resource Usage**: !`free -h 2>/dev/null | awk 'NR==2{print "Memory: " $3 "/" $2}' && df -h / 2>/dev/null | awk 'NR==2{print "Disk: " $3 "/" $2 " (" $5 " used)"}' || echo "Resource info unavailable"`
- **Health Endpoints**: !`curl -s --connect-timeout 3 http://localhost:8080/health 2>/dev/null | jq -r '.status // "Health endpoint unreachable"' || echo "Health endpoint unreachable"`

## Your Task

STEP 1: Initialize health monitoring session and analyze system architecture

TRY:

```bash
# Initialize session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetSystem": "'$ARGUMENTS'",
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "healthChecks": [],
  "systemComponents": [],
  "monitoringTools": []
}' > /tmp/health-session-$SESSION_ID.json
```

- ANALYZE system architecture from Context section
- IDENTIFY critical components requiring health monitoring
- DETERMINE monitoring complexity based on infrastructure type
- VALIDATE required tools availability (kubectl, docker, curl are essential)

STEP 2: Comprehensive system discovery using parallel analysis

IF system_complexity == "distributed" OR target_system contains "kubernetes|docker|microservices":

**CRITICAL: Deploy parallel sub-agents for comprehensive health assessment (8-10x faster system analysis)**

IMMEDIATELY launch 8 specialized health monitoring agents:

- **Agent 1: Infrastructure Health Analysis**: Analyze Kubernetes cluster, nodes, networking, and orchestration
  - Focus: Pod status, node health, resource allocation, network connectivity, cluster-level services
  - Tools: kubectl with JSON output, cluster-level health indicators, network testing, service mesh analysis
  - Output: Infrastructure readiness and capacity analysis with resource optimization recommendations

- **Agent 2: Container Ecosystem Health**: Assess Docker containers, images, volumes, and container orchestration
  - Focus: Container status, resource usage, health check configurations, image vulnerabilities, volume health
  - Tools: docker commands, container inspection, log analysis, image scanning, volume monitoring
  - Output: Container ecosystem health and resource utilization with security and performance insights

- **Agent 3: Application Service Health**: Evaluate application-level health endpoints, APIs, and service dependencies
  - Focus: HTTP health checks, API availability, service dependencies, response times, error rates
  - Tools: curl, API testing, response validation, load testing, dependency mapping
  - Output: Application service availability and response metrics with performance optimization recommendations

- **Agent 4: System Resource Monitoring**: Monitor system-level resources, performance, and capacity planning
  - Focus: CPU, memory, disk, network utilization and capacity, system performance metrics
  - Tools: system monitoring commands, resource analysis, performance profiling, capacity planning
  - Output: Resource availability and performance bottlenecks with scaling recommendations

- **Agent 5: Configuration & Alerting Analysis**: Review monitoring and alerting setup, configuration drift
  - Focus: Existing monitoring tools, alert configurations, dashboards, configuration management
  - Tools: file analysis, configuration validation, alert testing, dashboard analysis
  - Output: Current monitoring coverage and improvement opportunities with alerting optimization

- **Agent 6: Security & Compliance Health**: Assess security posture, compliance status, and vulnerability management
  - Focus: Security configurations, compliance checks, vulnerability scanning, access controls
  - Tools: security scanning, compliance validation, vulnerability assessment, access auditing
  - Output: Security health assessment with compliance gaps and vulnerability remediation

- **Agent 7: Performance & Scalability Analysis**: Analyze performance metrics, scalability patterns, and optimization opportunities
  - Focus: Performance trends, scalability bottlenecks, resource optimization, load patterns
  - Tools: performance monitoring, scalability testing, resource optimization, trend analysis
  - Output: Performance insights with scalability recommendations and optimization strategies

- **Agent 8: Operational Readiness Assessment**: Evaluate operational procedures, backup systems, and disaster recovery
  - Focus: Backup systems, disaster recovery, operational procedures, monitoring coverage
  - Tools: backup validation, DR testing, operational procedure analysis, monitoring gap analysis
  - Output: Operational readiness assessment with DR improvements and operational optimization

**Sub-Agent Coordination:**

- Each agent saves findings to `/tmp/health-monitoring-agents-$SESSION_ID/`
- Parallel execution provides 8-10x speed improvement over sequential health assessment
- Cross-agent correlation identifies systemic issues across infrastructure domains
- Results synthesized into comprehensive health report with prioritized action items

ELSE:

**Execute focused health check for simple systems:**

STEP 3: Configuration discovery and analysis

TRY:

```bash
# Discover system configuration files
echo "📁 Discovering system configuration..."
fd "(docker-compose|k8s|deployment|health)" --type f -d 3 | head -10

# Find existing health check implementations
echo "🔍 Locating health check implementations..."
rg "health|status|ping|ready|live" --type-add 'config:*.{yaml,yml,json,toml}' --type config -l | head -5
rg "(/health|/ping|/status|healthcheck)" --type-add 'code:*.{ts,js,go,rs,java,py}' --type code -l | head -5

# Check for monitoring tools
echo "📊 Checking monitoring infrastructure..."
fd "(prometheus|grafana|datadog|newrelic|monitoring)" --type f -d 2 | head -5
```

CATCH (discovery_failed):

- LOG error details to session state
- PROVIDE manual configuration guidance
- SUGGEST basic health check implementation

STEP 4: Health check implementation strategy

CASE system_type:

WHEN "kubernetes":

**Kubernetes-Native Health Monitoring:**

```bash
# Comprehensive cluster health assessment
echo "🎯 Kubernetes cluster health analysis:"

# Node health and resource availability
kubectl get nodes -o json | jq -r '.items[] | "Node: \(.metadata.name) | Status: \(.status.conditions[-1].type) | Resources: CPU=\(.status.allocatable.cpu) Memory=\(.status.allocatable.memory)"'

# Pod health across all namespaces
kubectl get pods --all-namespaces -o json | jq -r '.items[] | select(.status.phase != "Running") | "⚠️ \(.metadata.namespace)/\(.metadata.name): \(.status.phase)"' | head -10

# Service endpoints and connectivity
kubectl get services --all-namespaces -o json | jq -r '.items[] | select(.spec.type == "LoadBalancer" or .spec.type == "NodePort") | "Service: \(.metadata.namespace)/\(.metadata.name) | Type: \(.spec.type)"'

# Resource usage and limits
kubectl top nodes 2>/dev/null || echo "Metrics server not available"
kubectl top pods --all-namespaces 2>/dev/null | head -10 || echo "Pod metrics not available"
```

WHEN "docker":

**Docker Container Health Assessment:**

```bash
echo "🐳 Docker container health analysis:"

# Container status and health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | head -15

# Container resource usage
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" | head -10

# Health check configurations
docker inspect $(docker ps -q) | jq -r '.[] | select(.Config.Healthcheck) | "✓ \(.Name): \(.Config.Healthcheck.Test[1:] | join(" "))"' 2>/dev/null | head -5

# Volume and network status
docker volume ls | wc -l | awk '{print "📂 Volumes: " $1}'
docker network ls | wc -l | awk '{print "🌐 Networks: " $1}'
```

WHEN "application":

**Application-Level Health Monitoring:**

```bash
echo "🚀 Application health endpoint analysis:"

# Test primary health endpoints
for port in 8080 3000 8000 8090 9000; do
  echo "Testing port $port..."
  curl -s --connect-timeout 2 "http://localhost:$port/health" | head -1 2>/dev/null || echo "Port $port: No response"
done

# Discover application configurations
echo "📋 Application configuration discovery:"
fd "(package\.json|deno\.json|Cargo\.toml|pom\.xml|go\.mod)" --type f | head -5

# Find health check implementations in code
echo "💻 Code-level health check implementations:"
rg "(healthcheck|health.*endpoint|/health|/ping)" --type-add 'src:*.{ts,js,go,rs,java,py}' --type src -A 2 -B 1 | head -10
```

STEP 5: Real-time monitoring dashboard generation

TRY:

**Generate live health monitoring dashboard:**

```bash
# Create monitoring session directory
mkdir -p /tmp/health-monitor-$SESSION_ID

# Generate HTML health dashboard
cat > /tmp/health-monitor-$SESSION_ID/dashboard.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>System Health Dashboard</title>
    <meta http-equiv="refresh" content="30">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .health-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .health-card { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .status-healthy { border-left: 4px solid #28a745; }
        .status-warning { border-left: 4px solid #ffc107; }
        .status-critical { border-left: 4px solid #dc3545; }
        .metric { display: flex; justify-content: space-between; margin: 8px 0; }
        .timestamp { color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <h1>🏥 System Health Dashboard</h1>
    <div class="timestamp">Last updated: $(date)</div>
    <div class="health-grid">
        <!-- Health cards will be populated by monitoring script -->
    </div>
    <script>
        // Auto-refresh functionality
        setTimeout(() => location.reload(), 30000);
    </script>
</body>
</html>
EOF

echo "📊 Health dashboard created: /tmp/health-monitor-$SESSION_ID/dashboard.html"
```

STEP 6: Automated health check implementation

**Health Check Implementation Templates:**

CASE target_language:

WHEN "typescript|javascript":

**TypeScript/JavaScript Health Service:**

```typescript
// Enhanced health-check service with monitoring integration
interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  uptime: number;
  sessionId: string;
  environment: string;
  checks: Record<string, CheckResult>;
  metrics: SystemMetrics;
}

interface CheckResult {
  status: "pass" | "fail" | "warn";
  message?: string;
  responseTime?: number;
  details?: Record<string, any>;
  lastCheck?: string;
  checkCount?: number;
}

interface SystemMetrics {
  cpuUsage?: number;
  memoryUsage?: number;
  diskUsage?: number;
  activeConnections?: number;
  requestRate?: number;
}

class AdvancedHealthCheckService {
  private startTime = Date.now();
  private checks = new Map<string, () => Promise<CheckResult>>();
  private checkHistory = new Map<string, CheckResult[]>();
  private sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.initializeDefaultChecks();
  }

  private initializeDefaultChecks() {
    // System resource checks
    this.register("system_memory", async () => {
      const memInfo = await this.getMemoryInfo();
      const usage = memInfo.used / memInfo.total;
      return {
        status: usage > 0.9 ? "fail" : usage > 0.75 ? "warn" : "pass",
        details: { usage: Math.round(usage * 100), used: memInfo.used, total: memInfo.total },
        message: usage > 0.9 ? "Critical memory usage" : undefined,
      };
    });

    this.register("system_disk", async () => {
      const diskInfo = await this.getDiskInfo();
      const usage = diskInfo.used / diskInfo.total;
      return {
        status: usage > 0.95 ? "fail" : usage > 0.85 ? "warn" : "pass",
        details: { usage: Math.round(usage * 100), available: diskInfo.available },
        message: usage > 0.95 ? "Critical disk space" : undefined,
      };
    });
  }

  register(name: string, check: () => Promise<CheckResult>) {
    this.checks.set(name, check);
    this.checkHistory.set(name, []);
  }

  async getHealth(): Promise<HealthStatus> {
    const results: Record<string, CheckResult> = {};
    let overallStatus: "healthy" | "degraded" | "unhealthy" = "healthy";

    // Execute all checks in parallel with timeout
    const checkPromises = Array.from(this.checks.entries()).map(async ([name, check]) => {
      const start = Date.now();
      try {
        const timeoutPromise = new Promise<CheckResult>((_, reject) =>
          setTimeout(() => reject(new Error("Check timeout")), 5000)
        );

        const result = await Promise.race([check(), timeoutPromise]);
        result.responseTime = Date.now() - start;
        result.lastCheck = new Date().toISOString();

        // Update check history
        const history = this.checkHistory.get(name) || [];
        history.push(result);
        if (history.length > 10) history.shift(); // Keep last 10 results
        this.checkHistory.set(name, history);
        result.checkCount = history.length;

        return [name, result] as [string, CheckResult];
      } catch (error) {
        const failResult: CheckResult = {
          status: "fail",
          message: error.message,
          responseTime: Date.now() - start,
          lastCheck: new Date().toISOString(),
        };
        return [name, failResult] as [string, CheckResult];
      }
    });

    const checkResults = await Promise.allSettled(checkPromises);

    // Process results and determine overall status
    for (const promiseResult of checkResults) {
      if (promiseResult.status === "fulfilled") {
        const [name, result] = promiseResult.value;
        results[name] = result;

        if (result.status === "fail") {
          overallStatus = "unhealthy";
        } else if (result.status === "warn" && overallStatus === "healthy") {
          overallStatus = "degraded";
        }
      }
    }

    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: Deno.env.get("APP_VERSION") || "unknown",
      uptime: Date.now() - this.startTime,
      sessionId: this.sessionId,
      environment: Deno.env.get("NODE_ENV") || "development",
      checks: results,
      metrics: await this.getSystemMetrics(),
    };
  }

  private async getMemoryInfo() {
    // Platform-specific memory info implementation
    try {
      const proc = new Deno.Command("free", { args: ["-b"] });
      const output = await proc.output();
      const text = new TextDecoder().decode(output.stdout);
      const memLine = text.split("\n")[1];
      const [, total, used] = memLine.split(/\s+/).map(Number);
      return { total, used };
    } catch {
      return { total: 0, used: 0 };
    }
  }

  private async getDiskInfo() {
    try {
      const proc = new Deno.Command("df", { args: ["-b", "/"] });
      const output = await proc.output();
      const text = new TextDecoder().decode(output.stdout);
      const diskLine = text.split("\n")[1];
      const [, total, used, available] = diskLine.split(/\s+/).map(Number);
      return { total, used, available };
    } catch {
      return { total: 0, used: 0, available: 0 };
    }
  }

  private async getSystemMetrics(): Promise<SystemMetrics> {
    return {
      cpuUsage: await this.getCpuUsage(),
      memoryUsage: (await this.getMemoryInfo()).used,
      diskUsage: (await this.getDiskInfo()).used,
      activeConnections: await this.getActiveConnections(),
    };
  }

  private async getCpuUsage(): Promise<number> {
    try {
      const proc = new Deno.Command("uptime");
      const output = await proc.output();
      const text = new TextDecoder().decode(output.stdout);
      const loadMatch = text.match(/load average: ([\d.]+)/);
      return loadMatch ? parseFloat(loadMatch[1]) : 0;
    } catch {
      return 0;
    }
  }

  private async getActiveConnections(): Promise<number> {
    try {
      const proc = new Deno.Command("netstat", { args: ["-an"] });
      const output = await proc.output();
      const text = new TextDecoder().decode(output.stdout);
      return text.split("\n").filter((line) => line.includes("ESTABLISHED")).length;
    } catch {
      return 0;
    }
  }
}

// Usage example with session management
const sessionId = Deno.env.get("HEALTH_SESSION_ID") || crypto.randomUUID();
const healthService = new AdvancedHealthCheckService(sessionId);

// Enhanced database check with connection pooling
healthService.register("database", async () => {
  try {
    const start = Date.now();
    // Replace with your actual database connection
    // await db.query("SELECT 1");
    const latency = Date.now() - start;

    // Simulate database health check
    const isHealthy = latency < 1000; // Example threshold

    return {
      status: latency < 100 ? "pass" : latency < 500 ? "warn" : "fail",
      details: {
        latency,
        connectionPool: { active: 5, idle: 10, max: 20 },
        lastQuery: new Date().toISOString(),
      },
      message: latency > 500 ? "High database latency detected" : undefined,
    };
  } catch (error) {
    return {
      status: "fail",
      message: `Database connection failed: ${error.message}`,
      details: { error: error.name },
    };
  }
});

// Enhanced cache check with metrics
healthService.register("cache", async () => {
  try {
    const start = Date.now();
    // Replace with your actual cache connection
    // await redis.ping();
    const latency = Date.now() - start;

    // Simulate cache metrics
    const memoryUsage = Math.random() * 2_000_000_000; // Example memory usage

    return {
      status: memoryUsage < 1_000_000_000 ? "pass" : memoryUsage < 1_500_000_000 ? "warn" : "fail",
      details: {
        latency,
        memory: Math.round(memoryUsage / 1024 / 1024), // MB
        hitRate: 0.95,
        connections: 42,
      },
      message: memoryUsage > 1_500_000_000 ? "Cache memory usage critical" : undefined,
    };
  } catch (error) {
    return {
      status: "fail",
      message: `Cache connection failed: ${error.message}`,
      details: { error: error.name },
    };
  }
});

// External dependency check with circuit breaker pattern
healthService.register("external_api", async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Replace with your actual external API
    const response = await fetch("https://httpbin.org/status/200", {
      signal: controller.signal,
      headers: { "User-Agent": "Health-Check/1.0" },
    });

    clearTimeout(timeoutId);

    return {
      status: response.ok ? "pass" : response.status < 500 ? "warn" : "fail",
      details: {
        statusCode: response.status,
        responseTime: response.headers.get("x-response-time") || "unknown",
        endpoint: "external-api",
      },
      message: !response.ok ? `API returned ${response.status}` : undefined,
    };
  } catch (error) {
    return {
      status: "fail",
      message: error.name === "AbortError" ? "API timeout" : "API unreachable",
      details: { error: error.name },
    };
  }
});

// Export health check endpoint
export async function healthCheckHandler(): Promise<Response> {
  const health = await healthService.getHealth();
  const status = health.status === "healthy" ? 200 : health.status === "degraded" ? 200 : 503;

  return new Response(JSON.stringify(health, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "X-Health-Check-Version": "2.0",
    },
  });
}
```

WHEN "rust":

**Rust Health Check Service:**

```rust
// Advanced Rust health check implementation
use std::time::{Duration, Instant};
use serde::{Serialize, Deserialize};
use tokio::time::timeout;
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct HealthCheck {
    pub status: HealthStatus,
    pub timestamp: String,
    pub session_id: String,
    pub uptime: u64,
    pub version: String,
    pub checks: HashMap<String, ComponentCheck>,
    pub system: SystemInfo,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum HealthStatus {
    Healthy,
    Degraded,
    Unhealthy,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct ComponentCheck {
    pub name: String,
    pub status: CheckStatus,
    pub response_time_ms: u64,
    pub message: Option<String>,
    pub details: Option<serde_json::Value>,
    pub last_check: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum CheckStatus {
    Pass,
    Warn,
    Fail,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SystemInfo {
    pub cpu_usage: f32,
    pub memory_usage_mb: u64,
    pub disk_usage_percent: f32,
    pub open_connections: u32,
    pub load_average: f32,
}

pub struct HealthService {
    start_time: Instant,
    session_id: String,
    checks: HashMap<String, Box<dyn HealthChecker + Send + Sync>>,
}

#[async_trait::async_trait]
pub trait HealthChecker {
    async fn check(&self) -> ComponentCheck;
}

impl HealthService {
    pub fn new(session_id: String) -> Self {
        let mut service = Self {
            start_time: Instant::now(),
            session_id,
            checks: HashMap::new(),
        };
        
        // Register default system checks
        service.register("system_resources", Box::new(SystemResourceChecker));
        service
    }
    
    pub fn register(&mut self, name: &str, checker: Box<dyn HealthChecker + Send + Sync>) {
        self.checks.insert(name.to_string(), checker);
    }
    
    pub async fn perform_health_check(&self) -> HealthCheck {
        let mut checks = HashMap::new();
        let mut overall_status = HealthStatus::Healthy;
        
        // Execute all checks in parallel with timeout
        let check_futures: Vec<_> = self.checks.iter().map(|(name, checker)| {
            let name = name.clone();
            async move {
                match timeout(Duration::from_secs(5), checker.check()).await {
                    Ok(result) => (name, result),
                    Err(_) => (name, ComponentCheck {
                        name: name.clone(),
                        status: CheckStatus::Fail,
                        response_time_ms: 5000,
                        message: Some("Check timeout".to_string()),
                        details: None,
                        last_check: chrono::Utc::now().to_rfc3339(),
                    })
                }
            }
        }).collect();
        
        let results = futures::future::join_all(check_futures).await;
        
        // Process results and determine overall status
        for (name, check) in results {
            match check.status {
                CheckStatus::Fail => overall_status = HealthStatus::Unhealthy,
                CheckStatus::Warn if overall_status == HealthStatus::Healthy => {
                    overall_status = HealthStatus::Degraded
                }
                _ => {}
            }
            checks.insert(name, check);
        }
        
        HealthCheck {
            status: overall_status,
            timestamp: chrono::Utc::now().to_rfc3339(),
            session_id: self.session_id.clone(),
            uptime: self.start_time.elapsed().as_secs(),
            version: env!("CARGO_PKG_VERSION").to_string(),
            checks,
            system: get_system_info().await,
        }
    }
}

// System resource checker implementation
struct SystemResourceChecker;

#[async_trait::async_trait]
impl HealthChecker for SystemResourceChecker {
    async fn check(&self) -> ComponentCheck {
        let start = Instant::now();
        
        let memory_info = get_memory_info().await;
        let memory_usage_percent = (memory_info.used as f32 / memory_info.total as f32) * 100.0;
        
        let status = if memory_usage_percent > 90.0 {
            CheckStatus::Fail
        } else if memory_usage_percent > 75.0 {
            CheckStatus::Warn  
        } else {
            CheckStatus::Pass
        };
        
        let message = if memory_usage_percent > 90.0 {
            Some(format!("Critical memory usage: {:.1}%", memory_usage_percent))
        } else if memory_usage_percent > 75.0 {
            Some(format!("High memory usage: {:.1}%", memory_usage_percent))
        } else {
            None
        };
        
        ComponentCheck {
            name: "system_resources".to_string(),
            status,
            response_time_ms: start.elapsed().as_millis() as u64,
            message,
            details: Some(serde_json::json!({
                "memory_usage_percent": memory_usage_percent,
                "memory_used_mb": memory_info.used / 1024 / 1024,
                "memory_total_mb": memory_info.total / 1024 / 1024
            })),
            last_check: chrono::Utc::now().to_rfc3339(),
        }
    }
}

#[derive(Debug)]
struct MemoryInfo {
    total: u64,
    used: u64,
}

async fn get_memory_info() -> MemoryInfo {
    // Platform-specific memory info implementation
    #[cfg(target_os = "linux")]
    {
        if let Ok(meminfo) = tokio::fs::read_to_string("/proc/meminfo").await {
            let mut total = 0;
            let mut available = 0;
            
            for line in meminfo.lines() {
                if line.starts_with("MemTotal:") {
                    total = line.split_whitespace().nth(1)
                        .and_then(|s| s.parse::<u64>().ok())
                        .unwrap_or(0) * 1024; // Convert from KB to bytes
                } else if line.starts_with("MemAvailable:") {
                    available = line.split_whitespace().nth(1)
                        .and_then(|s| s.parse::<u64>().ok())
                        .unwrap_or(0) * 1024; // Convert from KB to bytes
                }
            }
            
            return MemoryInfo {
                total,
                used: total.saturating_sub(available),
            };
        }
    }
    
    // Fallback for other platforms or if /proc/meminfo is not available
    MemoryInfo { total: 0, used: 0 }
}

async fn get_system_info() -> SystemInfo {
    let memory_info = get_memory_info().await;
    
    SystemInfo {
        cpu_usage: get_cpu_usage().await,
        memory_usage_mb: memory_info.used / 1024 / 1024,
        disk_usage_percent: get_disk_usage().await,
        open_connections: get_connection_count().await,
        load_average: get_load_average().await,
    }
}

async fn get_cpu_usage() -> f32 {
    // Simplified CPU usage - in production, implement proper CPU monitoring
    0.0
}

async fn get_disk_usage() -> f32 {
    // Simplified disk usage - in production, implement proper disk monitoring
    0.0
}

async fn get_connection_count() -> u32 {
    // Simplified connection count - in production, implement proper network monitoring
    0
}

async fn get_load_average() -> f32 {
    // Platform-specific load average implementation
    #[cfg(target_os = "linux")]
    {
        if let Ok(loadavg) = tokio::fs::read_to_string("/proc/loadavg").await {
            return loadavg.split_whitespace().next()
                .and_then(|s| s.parse::<f32>().ok())
                .unwrap_or(0.0);
        }
    }
    0.0
}

// Usage example
pub async fn create_health_service() -> HealthService {
    let session_id = uuid::Uuid::new_v4().to_string();
    let mut service = HealthService::new(session_id);
    
    // Register additional custom checks here
    // service.register("database", Box::new(DatabaseChecker::new()));
    // service.register("cache", Box::new(CacheChecker::new()));
    
    service
}
```

WHEN "kubernetes":

**Kubernetes Health Probe Configuration:**

```yaml
# Enhanced Kubernetes health probe configuration with monitoring
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
  labels:
    app: api-service
    health.monitoring/enabled: "true"
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-service
  template:
    metadata:
      labels:
        app: api-service
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9090"
        prometheus.io/path: "/metrics"
    spec:
      containers:
        - name: api
          image: api:latest
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
            - name: metrics
              containerPort: 9090
              protocol: TCP

          # Enhanced environment variables for health checks
          env:
            - name: HEALTH_SESSION_ID
              valueFrom:
                fieldRef:
                  fieldPath: metadata.uid
            - name: POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName

          # Comprehensive health probe configuration
          livenessProbe:
            httpGet:
              path: /health/live
              port: http
              httpHeaders:
                - name: X-Health-Check-Type
                  value: liveness
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
            successThreshold: 1

          readinessProbe:
            httpGet:
              path: /health/ready
              port: http
              httpHeaders:
                - name: X-Health-Check-Type
                  value: readiness
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 2
            successThreshold: 1

          startupProbe:
            httpGet:
              path: /health/startup
              port: http
              httpHeaders:
                - name: X-Health-Check-Type
                  value: startup
            initialDelaySeconds: 0
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 30
            successThreshold: 1

          # Resource constraints for reliable health checks
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"

          # Security context
          securityContext:
            runAsNonRoot: true
            runAsUser: 65534
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop:
                - ALL

          # Volume mounts for health check persistence
          volumeMounts:
            - name: health-data
              mountPath: /tmp/health
            - name: logs
              mountPath: /var/log

      volumes:
        - name: health-data
          emptyDir:
            sizeLimit: 100Mi
        - name: logs
          emptyDir:
            sizeLimit: 1Gi

      # Service account for monitoring access
      serviceAccountName: api-service-monitor

---
# Service for health check endpoints
apiVersion: v1
kind: Service
metadata:
  name: api-service
  labels:
    app: api-service
spec:
  selector:
    app: api-service
  ports:
    - name: http
      port: 80
      targetPort: http
      protocol: TCP
    - name: metrics
      port: 9090
      targetPort: metrics
      protocol: TCP
  type: ClusterIP

---
# ServiceMonitor for Prometheus scraping
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: api-service-monitor
  labels:
    app: api-service
spec:
  selector:
    matchLabels:
      app: api-service
  endpoints:
    - port: metrics
      interval: 30s
      path: /metrics
      honorLabels: true
```

STEP 7: Monitoring integration and alerting configuration

**Prometheus Metrics Integration:**

```yaml
# prometheus-health-monitoring.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: health-monitoring-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s

    rule_files:
      - "health_alerts.yml"

    scrape_configs:
      - job_name: 'health-checks'
        static_configs:
          - targets: ['localhost:9090']
        metrics_path: '/metrics'
        scrape_interval: 30s
        scrape_timeout: 10s

      - job_name: 'kubernetes-health'
        kubernetes_sd_configs:
          - role: endpoints
        relabel_configs:
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)

    alerting:
      alertmanagers:
        - static_configs:
            - targets:
                - alertmanager:9093

  health_alerts.yml: |
    groups:
      - name: health_checks
        interval: 30s
        rules:
          - alert: ServiceUnhealthy
            expr: health_check_status == 0
            for: 2m
            labels:
              severity: critical
              team: platform
            annotations:
              summary: "Service {{ $labels.check_name }} is unhealthy"
              description: "{{ $labels.check_name }} has been failing for more than 2 minutes"
              runbook_url: "https://runbooks.example.com/health-checks"

          - alert: HighResponseTime
            expr: health_check_duration_seconds > 1
            for: 5m
            labels:
              severity: warning
              team: platform
            annotations:
              summary: "High response time for {{ $labels.check_name }}"
              description: "Health check {{ $labels.check_name }} response time is {{ $value }}s"

          - alert: HighMemoryUsage
            expr: system_memory_usage_percent > 90
            for: 3m
            labels:
              severity: critical
              team: platform
            annotations:
              summary: "Critical memory usage on {{ $labels.instance }}"
              description: "Memory usage is {{ $value }}% on {{ $labels.instance }}"

          - alert: HighDiskUsage
            expr: system_disk_usage_percent > 95
            for: 1m
            labels:
              severity: critical
              team: platform
            annotations:
              summary: "Critical disk usage on {{ $labels.instance }}"
              description: "Disk usage is {{ $value }}% on {{ $labels.instance }}"

          - alert: HealthCheckDown
            expr: up{job="health-checks"} == 0
            for: 1m
            labels:
              severity: critical
              team: platform
            annotations:
              summary: "Health check endpoint is down"
              description: "Health check endpoint {{ $labels.instance }} has been down for more than 1 minute"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  labels:
    app: prometheus
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
        - name: prometheus
          image: prom/prometheus:latest
          ports:
            - containerPort: 9090
          volumeMounts:
            - name: config
              mountPath: /etc/prometheus
          args:
            - "--config.file=/etc/prometheus/prometheus.yml"
            - "--storage.tsdb.path=/prometheus/"
            - "--web.console.libraries=/etc/prometheus/console_libraries"
            - "--web.console.templates=/etc/prometheus/consoles"
            - "--web.enable-lifecycle"
            - "--web.enable-admin-api"
      volumes:
        - name: config
          configMap:
            name: health-monitoring-config
```

STEP 8: Generate comprehensive health monitoring setup

**Live Health Dashboard Implementation:**

TRY:

```bash
# Create comprehensive monitoring dashboard
cat > /tmp/health-monitor-$SESSION_ID/live-dashboard.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Health Monitor Dashboard</title>
    <meta http-equiv="refresh" content="15">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', system-ui, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .dashboard { 
            max-width: 1400px; 
            margin: 0 auto; 
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        }
        .title {
            color: #2c3e50;
            font-size: 2.5em;
            font-weight: 700;
        }
        .status-indicator {
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 1.1em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .status-healthy { background: #2ecc71; color: white; }
        .status-degraded { background: #f39c12; color: white; }
        .status-critical { background: #e74c3c; color: white; }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border-left: 4px solid #3498db;
            transition: transform 0.2s ease;
        }
        .metric-card:hover {
            transform: translateY(-5px);
        }
        .metric-title {
            font-size: 0.9em;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        .metric-subtitle {
            font-size: 0.8em;
            color: #95a5a6;
        }
        .health-checks {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }
        .checks-header {
            font-size: 1.3em;
            color: #2c3e50;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .check-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #ecf0f1;
        }
        .check-item:last-child {
            border-bottom: none;
        }
        .check-name {
            font-weight: 500;
            color: #2c3e50;
        }
        .check-status {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        .status-pass { background: #2ecc71; }
        .status-warn { background: #f39c12; }
        .status-fail { background: #e74c3c; }
        .timestamp {
            text-align: center;
            color: #7f8c8d;
            font-size: 0.9em;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ecf0f1;
        }
        .auto-refresh {
            color: #3498db;
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1 class="title">🏥 Health Monitor</h1>
            <div class="status-indicator status-healthy" id="overall-status">
                System Healthy
            </div>
        </div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-title">System Uptime</div>
                <div class="metric-value" id="uptime">Loading...</div>
                <div class="metric-subtitle">Days:Hours:Minutes</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Memory Usage</div>
                <div class="metric-value" id="memory">Loading...</div>
                <div class="metric-subtitle">Used / Total</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Active Connections</div>
                <div class="metric-value" id="connections">Loading...</div>
                <div class="metric-subtitle">Current connections</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Health Checks</div>
                <div class="metric-value" id="check-count">Loading...</div>
                <div class="metric-subtitle">Passing / Total</div>
            </div>
        </div>
        
        <div class="health-checks">
            <div class="checks-header">🔍 Component Health Status</div>
            <div id="health-checks-list">
                <div class="check-item">
                    <span class="check-name">Loading health checks...</span>
                    <div class="check-status">
                        <span class="status-dot status-pass"></span>
                        <span>Initializing</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="timestamp">
            <div>Last updated: <span id="last-update">$(date)</span></div>
            <div class="auto-refresh">⚡ Auto-refresh every 15 seconds</div>
        </div>
    </div>
    
    <script>
        // Simulate real-time health data updates
        function updateHealthData() {
            // In a real implementation, this would fetch from your health endpoint
            const healthData = {
                status: 'healthy',
                uptime: '2d 14h 32m',
                memory: '2.4GB / 8GB',
                connections: 42,
                checks: {
                    database: 'pass',
                    cache: 'pass', 
                    api: 'pass',
                    storage: 'warn'
                }
            };
            
            // Update metrics
            document.getElementById('uptime').textContent = healthData.uptime;
            document.getElementById('memory').textContent = healthData.memory;
            document.getElementById('connections').textContent = healthData.connections;
            
            // Update check count
            const passCount = Object.values(healthData.checks).filter(s => s === 'pass').length;
            const totalCount = Object.keys(healthData.checks).length;
            document.getElementById('check-count').textContent = `${passCount} / ${totalCount}`;
            
            // Update health checks list
            const checksList = document.getElementById('health-checks-list');
            checksList.innerHTML = Object.entries(healthData.checks).map(([name, status]) => `
                <div class="check-item">
                    <span class="check-name">${name.charAt(0).toUpperCase() + name.slice(1)} Service</span>
                    <div class="check-status">
                        <span class="status-dot status-${status}"></span>
                        <span>${status.toUpperCase()}</span>
                    </div>
                </div>
            `).join('');
            
            // Update timestamp
            document.getElementById('last-update').textContent = new Date().toLocaleString();
        }
        
        // Initialize and set up auto-refresh
        updateHealthData();
        setInterval(updateHealthData, 15000);
        
        // Update page title with status
        document.title = '🏥 Health Monitor - System Healthy';
    </script>
</body>
</html>
EOF

echo "✅ Live dashboard created: /tmp/health-monitor-$SESSION_ID/live-dashboard.html"
echo "🌐 Open in browser: file:///tmp/health-monitor-$SESSION_ID/live-dashboard.html"
```

STEP 9: Final session summary and monitoring setup

**Complete Health Monitoring Package:**

```bash
# Generate comprehensive health monitoring summary
echo "🎯 Health monitoring setup completed successfully!"
echo ""
echo "📊 Session Summary:"
echo "  Session ID: $SESSION_ID"
echo "  Target System: $ARGUMENTS"
echo "  Generated Files:"
echo "    - Live Dashboard: /tmp/health-monitor-$SESSION_ID/live-dashboard.html"
echo "    - Session State: /tmp/health-session-$SESSION_ID.json"
echo ""
echo "🚀 Next Steps:"
echo "  1. Review generated health check templates"
echo "  2. Implement language-specific health services"
echo "  3. Configure Kubernetes probes (if applicable)"
echo "  4. Set up Prometheus monitoring"
echo "  5. Configure alerting rules"
echo ""
echo "📋 Health Check Endpoints to Implement:"
echo "  - GET /health        - Comprehensive health status"
echo "  - GET /health/live   - Liveness probe (Kubernetes)"
echo "  - GET /health/ready  - Readiness probe (Kubernetes)"
echo "  - GET /health/startup - Startup probe (Kubernetes)"
echo "  - GET /metrics       - Prometheus metrics"
echo ""
echo "⚠️ Critical Configuration Notes:"
echo "  - Set appropriate timeouts for all health checks"
echo "  - Implement circuit breaker patterns for external dependencies"
echo "  - Use parallel execution for multiple health checks"
echo "  - Include meaningful error messages and response times"
echo "  - Monitor trends, not just current state"
echo ""
echo "🔗 Additional Resources:"
echo "  - Kubernetes Health Checks: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"
echo "  - Prometheus Monitoring: https://prometheus.io/docs/guides/"
echo "  - Health Check Best Practices: https://microservices.io/patterns/observability/health-check-api.html"

# Update session state with completion
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .timestamp = $timestamp |
  .status = "completed" |
  .summary = {
    "healthChecksConfigured": true,
    "dashboardGenerated": true,
    "monitoringSetup": true,
    "kubernetesProbes": true
  }
' /tmp/health-session-$SESSION_ID.json > /tmp/health-session-$SESSION_ID.tmp && \
mv /tmp/health-session-$SESSION_ID.tmp /tmp/health-session-$SESSION_ID.json
```

CATCH (monitoring_setup_failed):

- LOG error details to session state
- PROVIDE troubleshooting guidance
- SUGGEST alternative monitoring approaches

FINALLY:

- SAVE session state for future reference
- PROVIDE comprehensive setup summary
- OFFER follow-up configuration guidance

## Implementation Templates Reference

**Quick Start Health Check Examples:**

**Simple HTTP Health Check (Node.js/Express):**

```javascript
// Simple Express.js health check
const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "1.0.0",
  };

  res.status(200).json(health);
});

app.listen(3000, () => {
  console.log("Health check endpoint available at http://localhost:3000/health");
});
```

**Go Health Check (Gin Framework):**

```go
package main

import (
    "net/http"
    "time"
    "github.com/gin-gonic/gin"
)

type HealthResponse struct {
    Status    string    `json:"status"`
    Timestamp time.Time `json:"timestamp"`
    Uptime    string    `json:"uptime"`
    Version   string    `json:"version"`
}

var startTime = time.Now()

func healthHandler(c *gin.Context) {
    health := HealthResponse{
        Status:    "healthy",
        Timestamp: time.Now(),
        Uptime:    time.Since(startTime).String(),
        Version:   "1.0.0",
    }
    
    c.JSON(http.StatusOK, health)
}

func main() {
    r := gin.Default()
    r.GET("/health", healthHandler)
    r.Run(":8080")
}
```

**Python Health Check (FastAPI):**

```python
from fastapi import FastAPI
from datetime import datetime
import time
import os

app = FastAPI()
start_time = time.time()

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "uptime": time.time() - start_time,
        "version": os.getenv("APP_VERSION", "1.0.0")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

**Docker Health Check:**

```dockerfile
# Dockerfile with health check
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Add health check
HEALTHCHEK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "server.js"]
```

**Basic Shell Health Check:**

```bash
#!/bin/bash
# simple-health-check.sh

HEALTH_ENDPOINT="http://localhost:8080/health"
TIMEOUT=5

echo "🏥 Performing health check..."

# Test HTTP endpoint
if curl -sf --max-time $TIMEOUT "$HEALTH_ENDPOINT" >/dev/null; then
    echo "✅ Health check passed"
    exit 0
else
    echo "❌ Health check failed"
    exit 1
fi
```

## Best Practices Summary

### Health Check Design Principles

1. **Lightweight Checks**: Keep health checks fast (< 100ms) and resource-efficient
2. **Meaningful Status**: Use clear status levels (healthy/degraded/unhealthy)
3. **Dependency Validation**: Check critical dependencies (database, cache, external APIs)
4. **Timeout Management**: Set appropriate timeouts for all external calls
5. **Circuit Breaker Pattern**: Fail fast for known problematic dependencies
6. **Metrics Integration**: Export health metrics for monitoring and alerting
7. **Trend Monitoring**: Track health check trends, not just current state

### Implementation Checklist

- [ ] **Basic HTTP Health Endpoint** (`/health`)
- [ ] **Kubernetes Probes** (liveness, readiness, startup)
- [ ] **Prometheus Metrics** (duration, status, system resources)
- [ ] **Alerting Rules** (critical failures, performance degradation)
- [ ] **Dashboard** (real-time status visualization)
- [ ] **Documentation** (endpoint specifications, troubleshooting)
- [ ] **Testing** (failure scenarios, timeout handling)

### Quick Commands

```bash
# Test health endpoint
curl -s http://localhost:8080/health | jq

# Monitor health in real-time
watch -n 5 'curl -s http://localhost:8080/health | jq .status'

# Check Kubernetes pod health
kubectl get pods -o wide | grep -v Running

# View health metrics
curl -s http://localhost:9090/metrics | grep health
```

### Emergency Response

**When Health Checks Fail:**

1. **Immediate Actions**:
   - Check service logs for errors
   - Verify network connectivity
   - Validate configuration files
   - Review recent deployments

2. **Investigation Steps**:
   - Test dependencies manually
   - Check resource utilization
   - Validate credentials/secrets
   - Review monitoring dashboards

3. **Recovery Actions**:
   - Restart unhealthy services
   - Scale resources if needed
   - Rollback problematic deployments
   - Update health check thresholds

This comprehensive health monitoring setup provides real-time visibility into system health, automated alerting for issues, and detailed diagnostics for troubleshooting.