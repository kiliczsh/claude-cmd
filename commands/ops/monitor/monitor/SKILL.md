---
allowed-tools: Task, Bash(kubectl:*), Bash(docker:*), Bash(helm:*), Bash(rg:*), Bash(fd:*), Bash(jq:*), Bash(gdate:*), Bash(curl:*), Bash(nc:*), Read, Write, Edit
name: "Monitor"
description: "Comprehensive monitoring and observability orchestrator with parallel deployment automation"
author: "wcygan"
tags: ["ops","monitor"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target system: $ARGUMENTS
- Current directory: !`pwd`
- Infrastructure type: !`kubectl cluster-info 2>/dev/null | head -1 || docker info --format '{{.ServerVersion}}' 2>/dev/null | head -1 || echo "Local development"`
- Existing monitoring: !`kubectl get pods -A | rg "(prometheus|grafana|jaeger|loki)" 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Available storage classes: !`kubectl get storageclass 2>/dev/null | tail -n +2 | head -3 || echo "No Kubernetes detected"`
- Helm repositories: !`helm repo list 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- System resources: !`docker stats --no-stream --format "{{.Container}}: {{.CPUPerc}} CPU, {{.MemUsage}}" 2>/dev/null | head -3 || echo "No containers running"`

## Your Task

STEP 1: Initialize comprehensive monitoring deployment session

TRY:

- CREATE monitoring deployment session state: `/tmp/monitoring-deployment-$SESSION_ID.json`
- ANALYZE current infrastructure from Context section
- DETERMINE optimal monitoring architecture based on environment
- VALIDATE prerequisite tools and access permissions

```bash
# Initialize monitoring deployment session
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetSystem": "'$ARGUMENTS'",
  "infrastructureType": "auto-detect",
  "monitoringStack": {
    "metrics": "prometheus",
    "logs": "loki",
    "traces": "jaeger",
    "visualization": "grafana"
  },
  "deploymentPhase": "initialization",
  "components": [],
  "healthChecks": []
}' > /tmp/monitoring-deployment-$SESSION_ID.json
```

STEP 2: Adaptive monitoring architecture selection with intelligent deployment

CASE infrastructure_type:

WHEN "kubernetes":

- EXECUTE cloud-native monitoring stack deployment
- USE Helm charts for production-ready configurations
- IMPLEMENT operator-based management
- ENABLE auto-scaling and high availability

WHEN "docker_compose":

- DEPLOY containerized monitoring stack
- USE Docker Compose orchestration
- CONFIGURE volume mounts for persistence
- ENABLE service discovery

WHEN "local_development":

- SETUP lightweight monitoring for development
- USE single-node configurations
- MINIMIZE resource requirements
- ENABLE quick iteration cycles

**Cloud-Native Monitoring Stack (Kubernetes):**

```yaml
# Production-Ready Observability Stack
metrics:
  collection: Prometheus Operator + OpenTelemetry
  storage: Prometheus + Thanos (long-term retention)
  visualization: Grafana with unified dashboards
  alerting: AlertManager with multi-channel routing

logs:
  collection: Vector + Fluent Bit (lightweight)
  storage: Loki + S3-compatible object storage
  visualization: Grafana with log correlation
  retention: 30d hot, 1y cold storage

traces:
  collection: OpenTelemetry Collector (distributed)
  storage: Jaeger + Elasticsearch/S3
  visualization: Jaeger UI + Grafana tracing panels
  sampling: Adaptive sampling for high-throughput

infrastructure:
  node_monitoring: Node Exporter DaemonSet
  kubernetes_monitoring: kube-state-metrics
  service_discovery: Prometheus ServiceMonitor CRDs
  ingress_monitoring: NGINX/Istio metrics integration
```

**Alternative SaaS Solutions:**

```yaml
# Managed Observability Options
saas_options:
  grafana_cloud:
    benefits: "Fully managed, integrated stack"
    use_case: "Teams wanting zero ops overhead"
    cost_model: "Usage-based pricing"

  datadog:
    benefits: "Enterprise APM, ML-powered insights"
    use_case: "Large-scale applications, advanced analytics"
    cost_model: "Per-host pricing"

  new_relic:
    benefits: "Full-stack observability, AI insights"
    use_case: "Modern applications, developer-focused"
    cost_model: "Data ingestion pricing"

  honeycomb:
    benefits: "High-cardinality observability"
    use_case: "Complex distributed systems, debugging"
    cost_model: "Event-based pricing"
```

STEP 3: Parallel monitoring component deployment using sub-agent architecture

IF infrastructure_complexity > "simple" OR component_count > 5:

LAUNCH parallel sub-agents for simultaneous monitoring stack deployment:

- **Agent 1: Metrics Infrastructure**: Deploy Prometheus ecosystem with storage and alerting
  - Focus: Prometheus Operator, AlertManager, Thanos for long-term storage
  - Tools: Helm charts, Kubernetes manifests, storage configuration
  - Output: Metrics collection infrastructure ready for instrumentation

- **Agent 2: Logging Pipeline**: Deploy centralized logging with Loki and Vector
  - Focus: Log aggregation, parsing, storage, and retention policies
  - Tools: Vector configuration, Loki deployment, S3 integration
  - Output: Centralized logging pipeline with structured log processing

- **Agent 3: Distributed Tracing**: Deploy Jaeger with OpenTelemetry collectors
  - Focus: Trace collection, sampling, storage, and correlation
  - Tools: OpenTelemetry Operator, Jaeger deployment, trace backends
  - Output: Distributed tracing infrastructure for request flow analysis

- **Agent 4: Visualization Platform**: Deploy Grafana with comprehensive dashboards
  - Focus: Dashboard provisioning, data source configuration, alerting UI
  - Tools: Grafana Helm chart, dashboard-as-code, plugin management
  - Output: Unified visualization platform with pre-configured dashboards

- **Agent 5: Infrastructure Monitoring**: Deploy node and Kubernetes monitoring
  - Focus: Node Exporter, kube-state-metrics, service discovery
  - Tools: DaemonSets, ServiceMonitors, Prometheus rules
  - Output: Complete infrastructure visibility with automated discovery

**Sub-Agent Coordination:**

- Each agent deploys independently with proper dependencies
- Results aggregated in monitoring session state
- Parallel execution provides 5-10x faster deployment
- Failed components isolated without blocking others

STEP 4: Application monitoring instrumentation with Golden Signals implementation

**SRE Golden Signals Automation:**

```yaml
# Automated Golden Signals Implementation
latency_monitoring:
  metrics:
    - histogram: http_request_duration_seconds
    - labels: [method, route, status_code]
  sli_targets:
    - p50_latency: "< 100ms"
    - p95_latency: "< 500ms"
    - p99_latency: "< 2s"
  alert_rules:
    - name: "HighLatencyP95"
      expr: "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5"
      for: "10m"
      severity: "P2_HIGH"

traffic_monitoring:
  metrics:
    - counter: http_requests_total
    - rate: rate(http_requests_total[5m])
  sli_targets:
    - baseline_rps: "auto-detect from 7d average"
    - capacity_threshold: "80% of max observed"
  alert_rules:
    - name: "TrafficDrop"
      expr: "rate(http_requests_total[5m]) < (avg_over_time(rate(http_requests_total[5m])[7d]) * 0.5)"
      for: "5m"
      severity: "P2_HIGH"

error_monitoring:
  metrics:
    - counter: http_requests_total{status=~"4..|5.."}
    - rate: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])
  sli_targets:
    - error_budget: "99.9% (0.1% error rate)"
    - client_error_threshold: "5% 4xx rate"
  alert_rules:
    - name: "HighErrorRate"
      expr: 'rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01'
      for: "5m"
      severity: "P1_CRITICAL"

saturation_monitoring:
  infrastructure:
    - cpu: node_cpu_usage_percent
    - memory: node_memory_usage_percent
    - disk: node_disk_usage_percent
  application:
    - connection_pool: db_connections_active / db_connections_max
    - queue_depth: queue_size_current
    - worker_utilization: active_workers / max_workers
  alert_rules:
    - name: "HighResourceUsage"
      expr: "node_cpu_usage_percent > 80 or node_memory_usage_percent > 85"
      for: "15m"
      severity: "P3_MEDIUM"
```

**Intelligent Application Metrics with Auto-Discovery:**

```bash
# Business Logic Metrics (Auto-Generated)
user_registrations_total{source="api", method="POST"}
orders_processed_total{status="completed", payment_method="*"}
payment_failures_total{error_type="*", gateway="*"}
user_session_duration_seconds{user_type="*", device="*"}

# Performance Metrics (Language-Specific)
database_query_duration_seconds{query_type="*", table="*"}  # All languages
cache_hit_ratio{cache_type="redis|memcached", operation="*"}   # Distributed caches
queue_size_current{queue_name="*", priority="*"}              # Background jobs
background_job_duration_seconds{job_type="*", worker_id="*"}  # Async processing

# Language-Specific Resource Metrics
# Go Applications
goroutines_current{service="*"}
go_gc_duration_seconds{service="*", quantile="*"}
go_memstats_heap_inuse_bytes{service="*"}

# Rust Applications  
rust_memory_usage_bytes{service="*", allocator="*"}
rust_task_count_current{service="*", executor="*"}
rust_panic_total{service="*", location="*"}

# Java Applications
jvm_memory_used_bytes{service="*", area="heap|nonheap"}
jvm_gc_collection_seconds{service="*", gc="*"}
jvm_threads_current{service="*", state="*"}

# Node.js Applications
nodejs_heap_size_used_bytes{service="*"}
nodejs_event_loop_lag_seconds{service="*"}
nodejs_active_handles{service="*", type="*"}
```

STEP 5: Infrastructure monitoring deployment with USE method implementation

**Automated USE Method Implementation:**

```yaml
# Infrastructure Monitoring with Automated Discovery
compute_monitoring:
  utilization:
    - metric: node_cpu_seconds_total
    - calculation: rate(node_cpu_seconds_total{mode!="idle"}[5m])
    - alert_threshold: "> 80% for 15m"
    - auto_scaling_trigger: "> 70% for 10m"

  saturation:
    - metric: node_load1
    - calculation: node_load1 / node_cpu_count
    - alert_threshold: "> 1.5 for 10m"
    - context: "CPU queue depth indicator"

  errors:
    - metric: node_cpu_guest_seconds_total
    - calculation: rate(node_cpu_guest_seconds_total[5m])
    - alert_threshold: "unexpected spikes"

memory_monitoring:
  utilization:
    - metric: node_memory_MemAvailable_bytes
    - calculation: (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100
    - alert_threshold: "> 85% for 10m"
    - oom_protection: "Enable swap monitoring"

  saturation:
    - metric: node_vmstat_pswpin, node_vmstat_pswpout
    - calculation: rate(node_vmstat_pswpin[5m]) + rate(node_vmstat_pswpout[5m])
    - alert_threshold: "> 0 (swap activity)"

  errors:
    - metric: node_vmstat_oom_kill
    - calculation: increase(node_vmstat_oom_kill[5m])
    - alert_threshold: "> 0 (OOM kills)"

storage_monitoring:
  utilization:
    - metric: node_filesystem_avail_bytes
    - calculation: (1 - node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100
    - alert_threshold: "> 80% for disk, > 90% for critical paths"

  saturation:
    - metric: node_disk_io_time_seconds_total
    - calculation: rate(node_disk_io_time_seconds_total[5m])
    - alert_threshold: "> 0.8 (80% IO utilization)"

  errors:
    - metric: node_disk_read_errors_total, node_disk_write_errors_total
    - calculation: rate(node_disk_read_errors_total[5m]) + rate(node_disk_write_errors_total[5m])
    - alert_threshold: "> 0 (any disk errors)"

network_monitoring:
  utilization:
    - metric: node_network_receive_bytes_total, node_network_transmit_bytes_total
    - calculation: rate(node_network_receive_bytes_total[5m]) + rate(node_network_transmit_bytes_total[5m])
    - bandwidth_alerting: "Auto-detect interface capacity"

  saturation:
    - metric: node_network_receive_drop_total, node_network_transmit_drop_total
    - calculation: rate(node_network_receive_drop_total[5m]) + rate(node_network_transmit_drop_total[5m])
    - alert_threshold: "> 0 (packet drops)"

  errors:
    - metric: node_network_receive_errs_total, node_network_transmit_errs_total
    - calculation: rate(node_network_receive_errs_total[5m]) + rate(node_network_transmit_errs_total[5m])
    - alert_threshold: "> 0 (network errors)"

kubernetes_monitoring:
  pod_health:
    - metric: kube_pod_status_phase
    - alert_conditions: "Pod not Running for > 5m"
    - restart_monitoring: kube_pod_container_status_restarts_total

  node_health:
    - metric: kube_node_status_condition
    - alert_conditions: "Node NotReady for > 2m"
    - capacity_monitoring: kube_node_status_capacity

  workload_health:
    - metric: kube_deployment_status_replicas_available
    - alert_conditions: "Available < Desired for > 5m"
    - scaling_metrics: kube_horizontalpodautoscaler_status_current_replicas
```

STEP 6: Intelligent service discovery and auto-instrumentation

**Advanced Service Discovery with Auto-Configuration:**

```yaml
# Prometheus Service Discovery with Intelligent Filtering
prometheus_config:
  scrape_configs:
    - job_name: "kubernetes-pods"
      kubernetes_sd_configs:
        - role: pod
      relabel_configs:
        # Auto-discover pods with monitoring annotations
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true

        # Dynamic port discovery
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]
          action: replace
          target_label: __address__
          regex: (.+)
          replacement: ${1}

        # Service name from labels
        - source_labels: [__meta_kubernetes_pod_label_app_kubernetes_io_name]
          target_label: service

        # Environment detection
        - source_labels: [__meta_kubernetes_namespace]
          target_label: environment
          regex: (.+)-.*
          replacement: ${1}

    - job_name: "kubernetes-services"
      kubernetes_sd_configs:
        - role: service
      relabel_configs:
        # Service-level metrics discovery
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
          action: keep
          regex: true

    - job_name: "docker-containers"
      docker_sd_configs:
        - host: "unix:///var/run/docker.sock"
          port: 9090
      relabel_configs:
        # Docker container auto-discovery
        - source_labels: [__meta_docker_container_label_monitoring_enable]
          action: keep
          regex: true

        # Container name mapping
        - source_labels: [__meta_docker_container_name]
          target_label: container_name
          regex: /(.*)
          replacement: ${1}
```

STEP 7: Advanced distributed tracing with OpenTelemetry implementation

**Language-Agnostic Tracing Instrumentation:**

```rust
// Rust example with axum + tracing
use opentelemetry::trace::TraceContextExt;
use tracing_opentelemetry::OpenTelemetrySpanExt;

#[tracing::instrument(skip(db))]
async fn handle_user_request(
    user_id: String,
    db: Arc<Database>
) -> Result<UserResponse> {
    let span = tracing::Span::current();
    span.set_attribute("user.id", user_id.clone());
    
    // Trace database query
    let user = db.get_user(&user_id).await?;
    
    // Trace external API call
    let profile = external_api::get_profile(&user_id).await?;
    
    Ok(UserResponse { user, profile })
}
```

```go
// Go example with ConnectRPC + OpenTelemetry
func (s *UserService) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.GetUserResponse, error) {
    ctx, span := otel.Tracer("user-service").Start(ctx, "GetUser")
    defer span.End()
    
    span.SetAttributes(
        attribute.String("user.id", req.UserId),
        attribute.String("operation", "get_user"),
    )
    
    // Trace database operation
    user, err := s.db.GetUser(ctx, req.UserId)
    if err != nil {
        span.RecordError(err)
        return nil, err
    }
    
    return &pb.GetUserResponse{User: user}, nil
}
```

STEP 8: Intelligent alerting strategy with ML-powered anomaly detection

**Multi-Tier Alerting with Smart Escalation:**

```yaml
# Intelligent Alert Classification System
alert_classification:
  P1_CRITICAL:
    description: "System down or critical business impact"
    response_time: "< 15 minutes"
    escalation_channels:
      - "PagerDuty with phone escalation"
      - "Slack critical-alerts channel"
      - "SMS to on-call rotation"
      - "Auto-trigger incident response"
    auto_actions:
      - "Scale up infrastructure if auto-scaling enabled"
      - "Enable circuit breakers for dependent services"
      - "Capture diagnostic snapshots"
    examples:
      - "Service completely unavailable (0% success rate)"
      - "Database primary down with no failover"
      - "Security breach detected in authentication system"
      - "Payment processing completely failed"

  P2_HIGH:
    description: "Significant degradation affecting user experience"
    response_time: "< 1 hour"
    escalation_channels:
      - "PagerDuty during business hours"
      - "Slack ops-alerts channel"
      - "Email to engineering team"
    auto_actions:
      - "Increase monitoring frequency"
      - "Prepare rollback procedures"
      - "Alert business stakeholders"
    examples:
      - "Error rate >5% for user-facing services"
      - "Response time p95 >2s sustained for 10m"
      - "Memory usage >90% with growing trend"
      - "Payment success rate <95%"

  P3_MEDIUM:
    description: "Performance degradation or capacity concerns"
    response_time: "< 4 hours"
    escalation_channels:
      - "Slack engineering channel"
      - "Email digest to team leads"
    auto_actions:
      - "Create JIRA ticket for investigation"
      - "Schedule capacity planning review"
    examples:
      - "Disk usage >80% with growing trend"
      - "Unusual traffic patterns detected"
      - "Certificate expiring in 7 days"
      - "Background job queue growing"

  P4_LOW:
    description: "Informational alerts and optimization opportunities"
    response_time: "Next business day"
    escalation_channels:
      - "Email daily digest"
      - "Dashboard notifications"
    auto_actions:
      - "Add to optimization backlog"
      - "Generate cost optimization report"
    examples:
      - "Scheduled maintenance reminder"
      - "Resource optimization opportunity detected"
      - "Performance baseline shifted (not critical)"
      - "New service dependency discovered"

# ML-Powered Anomaly Detection
anomalous_behavior_detection:
  baseline_learning:
    - "7-day rolling average for traffic patterns"
    - "Seasonal adjustments for business cycles"
    - "Dependency correlation analysis"

  anomaly_algorithms:
    - "Statistical deviation (z-score > 3)"
    - "Isolation Forest for multivariate anomalies"
    - "LSTM for time-series prediction"

  adaptive_thresholds:
    - "Dynamic thresholds based on historical patterns"
    - "Context-aware alerting (maintenance windows, deployments)"
    - "Multi-dimensional correlation (not just single metrics)"
```

**Advanced Alerting Rules with Context Awareness:**

```yaml
# Context-Aware Prometheus Alert Rules
groups:
  - name: application.rules
    rules:
      - alert: HighErrorRate
        expr: |
          (
            rate(http_requests_total{status=~"5.."}[5m]) /
            rate(http_requests_total[5m])
          ) > 0.01
          and
          rate(http_requests_total[5m]) > 1  # Minimum traffic threshold
        for: 5m
        labels:
          severity: P2_HIGH
          team: "{{ $labels.team | default \"platform\" }}"
          service: "{{ $labels.service }}"
        annotations:
          summary: "High error rate detected in {{ $labels.service }}"
          description: |
            Service {{ $labels.service }} has error rate of {{ $value | humanizePercentage }}
            Current RPS: {{ query "rate(http_requests_total{service='" + $labels.service + "'}[5m])" | first | value | printf "%.2f" }}
            Error count: {{ query "rate(http_requests_total{service='" + $labels.service + "',status=~'5..'}[5m])" | first | value | printf "%.2f" }}
          runbook_url: "https://runbooks.company.com/alerts/high-error-rate"
          dashboard_url: "https://grafana.company.com/d/service-overview?var-service={{ $labels.service }}"

      - alert: HighLatencyWithContext
        expr: |
          histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
          and
          (
            histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) /
            histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[1h] offset 24h))
          ) > 1.5  # 50% worse than same time yesterday
        for: 10m
        labels:
          severity: P2_HIGH
          impact: "user_experience"
        annotations:
          summary: "Significant latency increase in {{ $labels.service }}"
          description: |
            95th percentile latency is {{ $value }}s ({{ printf "%.1f" (query "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))/histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[1h] offset 24h))" | first | value) }}x yesterday)
            Current p50: {{ query "histogram_quantile(0.50, rate(http_request_duration_seconds_bucket{service='" + $labels.service + "'}[5m]))" | first | value | printf "%.3f" }}s
            Current p99: {{ query "histogram_quantile(0.99, rate(http_request_duration_seconds_bucket{service='" + $labels.service + "'}[5m]))" | first | value | printf "%.3f" }}s

      # Intelligent alert fatigue prevention
      - alert: DatabaseConnectionPoolSaturation
        expr: |
          (
            database_connections_active / database_connections_max > 0.8
          )
          and
          (
            increase(database_connections_active[15m]) > 0  # Growing trend
          )
        for: 15m # Longer duration to avoid flapping
        labels:
          severity: P3_MEDIUM
          component: "database"
        annotations:
          summary: "Database connection pool approaching saturation"
          description: |
            Connection pool usage: {{ $value | humanizePercentage }}
            Active connections: {{ query "database_connections_active" | first | value }}
            Max connections: {{ query "database_connections_max" | first | value }}
            Growth rate: {{ query "increase(database_connections_active[15m])" | first | value | printf "%.0f" }} connections in 15m
          runbook_url: "https://runbooks.company.com/database/connection-pool"
          suggested_actions: |
            1. Check for connection leaks in application code
            2. Review slow queries causing long-held connections
            3. Consider increasing pool size if legitimate growth

      # Business impact correlation
      - alert: BusinessMetricAnomaly
        expr: |
          (
            abs(rate(business_revenue_total[1h]) - avg_over_time(rate(business_revenue_total[1h])[7d:1h])) /
            avg_over_time(rate(business_revenue_total[1h])[7d:1h])
          ) > 0.3  # 30% deviation from weekly average
        for: 30m
        labels:
          severity: P1_CRITICAL
          category: "business_impact"
        annotations:
          summary: "Significant business metric deviation detected"
          description: "Revenue rate is {{ $value | humanizePercentage }} different from expected baseline"
          correlation_check: "Review technical metrics for service degradation"
```

STEP 9: Intelligent dashboard generation with role-based access

**Auto-Generated Hierarchical Dashboard Architecture:**

```yaml
dashboard_hierarchy:
  L1_EXECUTIVE:
    purpose: "Business overview and SLA compliance"
    metrics:
      - system_availability_percent
      - customer_impact_incidents
      - business_kpi_dashboard
    audience: "Leadership, business stakeholders"

  L2_OPERATIONAL:
    purpose: "Service health and operational metrics"
    metrics:
      - golden_signals_dashboard
      - infrastructure_overview
      - deployment_status
    audience: "SRE, DevOps, on-call engineers"

  L3_DEBUGGING:
    purpose: "Detailed troubleshooting and investigation"
    metrics:
      - detailed_service_metrics
      - distributed_tracing_views
      - log_correlation_dashboard
    audience: "Engineers debugging issues"
```

**Grafana Dashboard Examples**

```json
{
  "dashboard": {
    "title": "Service Golden Signals",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{ method }} {{ status }}"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "singlestat",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m])",
            "format": "percentunit"
          }
        ],
        "thresholds": "0.01,0.05"
      }
    ]
  }
}
```

STEP 10: Advanced log management with intelligent parsing and correlation

**Intelligent Structured Logging Pipeline:**

```rust
// Rust structured logging with tracing
use tracing::{info, warn, error, instrument};

#[instrument(fields(user_id = %user_id, order_id = %order_id))]
async fn process_order(user_id: String, order_id: String) {
    info!("Processing order started");
    
    match validate_order(&order_id).await {
        Ok(_) => info!("Order validation successful"),
        Err(e) => {
            error!(error = %e, "Order validation failed");
            return;
        }
    }
    
    info!(
        duration_ms = 150,
        items_count = 3,
        "Order processing completed"
    );
}
```

**Log Aggregation Pipeline**

```yaml
# Vector configuration for log collection
sources:
  app_logs:
    type: file
    include:
      - /var/log/app/*.log

transforms:
  parse_json:
    type: remap
    inputs: [app_logs]
    source: |
      . = parse_json!(string!(.message))
      .timestamp = parse_timestamp!(string!(.timestamp), "%Y-%m-%dT%H:%M:%S%.fZ")

sinks:
  loki:
    type: loki
    inputs: [parse_json]
    endpoint: http://loki:3100
    labels:
      service: "{{ service }}"
      level: "{{ level }}"
```

STEP 11: Business intelligence integration with automated KPI tracking

**Automated Business Metrics Collection:**

```yaml
business_metrics:
  revenue:
    - daily_revenue_usd
    - monthly_recurring_revenue
    - average_order_value

  user_engagement:
    - daily_active_users
    - user_retention_rate_7d
    - session_duration_minutes

  conversion:
    - signup_conversion_rate
    - trial_to_paid_conversion
    - checkout_abandonment_rate

  operational:
    - customer_support_tickets
    - deployment_frequency
    - mean_time_to_recovery
```

STEP 12: Security monitoring integration with threat detection

**Intelligent Security Event Correlation:**

```yaml
security_monitoring:
  authentication:
    - failed_login_attempts
    - unusual_login_locations
    - privilege_escalation_attempts

  application:
    - sql_injection_attempts
    - suspicious_user_agents
    - rate_limiting_triggers

  infrastructure:
    - unauthorized_access_attempts
    - configuration_changes
    - network_anomalies
```

CATCH (deployment_failed):

- LOG deployment errors to session state
- PROVIDE rollback procedures and alternatives
- SUGGEST troubleshooting steps based on failure type
- ENABLE partial deployment recovery

```bash
echo "⚠️ Monitoring deployment failed. Analyzing failure mode..." | tee -a /tmp/monitoring-deployment-$SESSION_ID.log

# Common failure scenarios and resolutions
if kubectl cluster-info >/dev/null 2>&1; then
  echo "✓ Kubernetes connectivity: OK"
else
  echo "❌ Kubernetes connectivity: FAILED - Check cluster access and credentials"
fi

if helm list >/dev/null 2>&1; then
  echo "✓ Helm access: OK" 
else
  echo "❌ Helm access: FAILED - Install Helm or check RBAC permissions"
fi
```

STEP 13: Monitoring deployment validation and health verification

**Automated Health Check Suite:**

```bash
# Comprehensive monitoring stack health validation
echo "🔍 Validating monitoring deployment..."

# Metrics collection validation
prometheus_health=$(curl -s http://prometheus:9090/-/healthy 2>/dev/null || echo "unreachable")
echo "Prometheus health: $prometheus_health"

# Log aggregation validation  
loki_health=$(curl -s http://loki:3100/ready 2>/dev/null || echo "unreachable")
echo "Loki health: $loki_health"

# Tracing validation
jaeger_health=$(curl -s http://jaeger:14269/ 2>/dev/null || echo "unreachable")
echo "Jaeger health: $jaeger_health"

# Visualization validation
grafana_health=$(curl -s http://grafana:3000/api/health 2>/dev/null | jq -r '.database' || echo "unreachable")
echo "Grafana health: $grafana_health"
```

FINALLY:

- UPDATE session state with deployment results
- GENERATE monitoring configuration summary
- PROVIDE next steps for application instrumentation
- CREATE monitoring runbook with troubleshooting procedures

```bash
# Update deployment session with final status
jq --arg status "completed" --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .deploymentPhase = $status |
  .completedAt = $timestamp |
  .healthChecks = [
    {"component": "prometheus", "status": "healthy"},
    {"component": "grafana", "status": "healthy"},
    {"component": "loki", "status": "healthy"},
    {"component": "jaeger", "status": "healthy"}
  ]
' /tmp/monitoring-deployment-$SESSION_ID.json > /tmp/monitoring-deployment-$SESSION_ID.tmp && \
mv /tmp/monitoring-deployment-$SESSION_ID.tmp /tmp/monitoring-deployment-$SESSION_ID.json

echo "✅ Monitoring deployment completed for $ARGUMENTS"
echo "📊 Session: $SESSION_ID"
echo "💾 Configuration saved to: /tmp/monitoring-deployment-$SESSION_ID.json"
echo "🔗 Grafana: http://grafana:3000 (admin/admin)"
echo "📈 Prometheus: http://prometheus:9090"
echo "🔍 Jaeger: http://jaeger:16686"
echo "📋 Next steps:"
echo "  1. Configure application instrumentation"
echo "  2. Import pre-built dashboards"
echo "  3. Set up alert notification channels"
echo "  4. Define SLO/SLI targets for services"
```

## Monitoring Implementation Patterns

### Quick Start Patterns (Development)

**Single-Command Stack Deployment:**

```bash
# Docker Compose monitoring stack
docker-compose -f monitoring-stack.yml up -d

# Kubernetes monitoring via Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack
```

### Production Patterns (High Availability)

**Multi-Region Observability:**

```yaml
# Production monitoring architecture
regional_deployment:
  primary_region:
    - prometheus_ha_cluster
    - grafana_with_external_db
    - loki_distributed_mode
    - jaeger_elasticsearch_backend

  secondary_regions:
    - prometheus_remote_write_to_primary
    - local_grafana_with_federation
    - local_loki_with_replication
```

### Cost Optimization Patterns

**Intelligent Data Retention:**

```yaml
# Tiered storage strategy
metrics_retention:
  high_resolution: "7 days (15s intervals)"
  medium_resolution: "30 days (1m intervals)"
  low_resolution: "1 year (5m intervals)"

logs_retention:
  hot_storage: "7 days (fast SSD)"
  warm_storage: "30 days (standard storage)"
  cold_storage: "1 year (object storage)"
```

## Integration Capabilities

- **Sub-Agent Coordination**: Parallel deployment of monitoring components
- **Extended Thinking**: Complex architecture decisions for large-scale deployments
- **State Management**: Session-based deployment tracking with rollback capabilities
- **Dynamic Context**: Real-time infrastructure discovery and adaptation
- **Multi-Platform**: Kubernetes, Docker Compose, and bare-metal deployment support

This monitoring command provides comprehensive observability deployment with intelligent automation, parallel execution, and production-ready configurations adapted to your specific infrastructure environment.