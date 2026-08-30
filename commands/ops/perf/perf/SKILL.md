---
allowed-tools: Task, Read, Write, Bash(rg:*), Bash(fd:*), Bash(ps:*), Bash(htop:*), Bash(jq:*), Bash(gdate:*), Bash(kubectl:*), Bash(docker:*), Bash(cargo:*), Bash(go:*), Bash(mvn:*), Bash(gradle:*)
name: "Perf"
description: "Comprehensive performance analysis and optimization with intelligent profiling and sub-agent coordination"
author: "wcygan"
tags: ["ops","perf"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Performance target: $ARGUMENTS
- Project structure: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json)" . -d 3 | head -5 || echo "No build files detected"`
- Running processes: !`ps aux | rg "(java|go|rust|node|deno|python)" | head -5 || echo "No target processes detected"`
- System resources: !`echo "CPU: $(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 'unknown') cores | RAM: $(free -h 2>/dev/null | rg 'Mem:' | awk '{print $2}' || echo 'unknown')" 2>/dev/null || echo "System info unavailable"`
- Container status: !`docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null | head -5 || echo "No Docker containers"`
- K8s resources: !`kubectl get pods --all-namespaces 2>/dev/null | head -5 || echo "No Kubernetes cluster"`

## Your Task

STEP 1: Initialize comprehensive performance analysis session

- CREATE performance analysis state: `/tmp/perf-analysis-$SESSION_ID.json`
- ANALYZE project technology stack from Context section
- DETERMINE analysis scope based on target: $ARGUMENTS
- VALIDATE required profiling tools availability

```bash
# Initialize performance analysis session
echo '{
  "sessionId": "'$SESSION_ID'",
  "target": "'$ARGUMENTS'",
  "technologyStack": [],
  "profiledComponents": [],
  "optimizationOpportunities": [],
  "performanceBaseline": {}
}' > /tmp/perf-analysis-$SESSION_ID.json
```

STEP 2: Technology-aware performance profiling strategy

TRY:

CASE detected_technology:
WHEN "java_project":

- EXECUTE JVM performance profiling with JProfiler/async-profiler
- ANALYZE JMX metrics, heap dumps, GC logs
- CHECK Spring Boot actuator endpoints for metrics
- VALIDATE connection pool configurations (HikariCP)

WHEN "go_project":

- ENABLE pprof profiling endpoints: `go tool pprof`
- EXECUTE CPU and memory profiling: `go test -bench . -cpuprofile`
- ANALYZE goroutine usage and channel patterns
- CHECK for race conditions: `go test -race`

WHEN "rust_project":

- GENERATE flame graphs: `cargo flamegraph`
- PROFILE with perf and valgrind for memory analysis
- ANALYZE async runtime performance (Tokio/async-std)
- CHECK for unnecessary allocations and clones

WHEN "typescript_node_project":

- ENABLE Node.js profiling: `node --prof` or `clinic.js`
- ANALYZE event loop utilization and async patterns
- CHECK for memory leaks with heap snapshots
- VALIDATE worker thread usage patterns

WHEN "deno_project":

- USE Deno's built-in profiling: `deno run --inspect`
- ANALYZE V8 performance patterns
- CHECK import resolution and dependency loading
- VALIDATE async/await patterns and Promise usage

**Language-Specific Profiling Commands:**

```bash
# Java profiling
if fd "pom\.xml|build\.gradle" . | head -1 >/dev/null; then
  echo "☕ Java project detected - enabling JVM profiling"
  # async-profiler or JProfiler integration
fi

# Go profiling
if fd "go\.mod" . | head -1 >/dev/null; then
  echo "🐹 Go project detected - enabling pprof"
  # go tool pprof integration
fi

# Rust profiling
if fd "Cargo\.toml" . | head -1 >/dev/null; then
  echo "🦀 Rust project detected - enabling cargo profiling"
  # cargo flamegraph integration
fi
```

STEP 3: Parallel performance analysis using sub-agent architecture

IF performance_scope == "comprehensive" OR target_complexity == "high":

LAUNCH parallel sub-agents for systematic performance exploration:

- **Agent 1: Algorithm Analysis**: Analyze computational complexity and algorithm efficiency
  - Focus: Big O analysis, nested loops, recursive patterns, memoization opportunities
  - Tools: Static code analysis, complexity detection, pattern recognition
  - Output: Algorithm bottlenecks with complexity ratings and optimization suggestions

- **Agent 2: Data Structure Optimization**: Evaluate data structure choices and access patterns
  - Focus: Array vs Set vs Map usage, inefficient lookups, cache locality, memory layout
  - Tools: Code pattern analysis, data structure usage tracking
  - Output: Data structure recommendations with performance impact estimates

- **Agent 3: Database Performance**: Analyze database queries and connection patterns
  - Focus: N+1 queries, missing indexes, JOIN optimization, connection pooling
  - Tools: Query analysis, EXPLAIN ANALYZE, database metrics
  - Output: Database optimization plan with query improvements

- **Agent 4: Async/Concurrency Analysis**: Evaluate async patterns and parallel processing
  - Focus: Thread pools, async/await usage, goroutines/channels, reactive patterns
  - Tools: Concurrency pattern analysis, deadlock detection
  - Output: Concurrency optimization with scalability improvements

- **Agent 5: Caching Strategy**: Analyze current caching and propose improvements
  - Focus: Application-level caching, distributed caching, cache invalidation
  - Tools: Cache hit rate analysis, TTL optimization, cache pattern evaluation
  - Output: Comprehensive caching strategy with implementation plan

- **Agent 6: Resource Optimization**: Analyze resource usage and efficiency
  - Focus: Memory allocation, I/O patterns, connection pooling, resource cleanup
  - Tools: Resource tracking, allocation analysis, leak detection
  - Output: Resource optimization plan with memory and I/O improvements

**Sub-Agent Coordination:**

```bash
# Each agent reports findings to session state
echo "Launching parallel performance analysis agents..."
echo "Results will be aggregated for comprehensive optimization plan"
```

STEP 4: Automated performance baseline and profiling

**System Performance Baseline:**

```bash
# CPU and memory baseline
echo "📊 Establishing performance baseline:"
echo "CPU usage: $(top -l 1 -s 0 | rg "CPU usage" || echo "unavailable")"
echo "Memory usage: $(vm_stat 2>/dev/null | rg "Pages" | head -3 || echo "unavailable")"
echo "Load average: $(uptime | awk -F'load averages:' '{print $2}' || echo "unavailable")"

# Application-specific metrics
if pgrep java >/dev/null; then
  echo "☕ Java JVM metrics:"
  # jstat, jcmd for heap and GC analysis
fi

if pgrep -f "go run" >/dev/null; then
  echo "🐹 Go runtime metrics:"
  # GOMEMLIMIT, GOMAXPROCS analysis
fi
```

**Automated Profiling Integration:**

```bash
# Language-specific profiling activation
project_type=$(fd "(package\.json|Cargo\.toml|go\.mod)" . | head -1)
if [[ -n "$project_type" ]]; then
  echo "🎯 Activating profiling for detected project type"
  # Integrate with language-specific profiling tools
fi
```

STEP 5: Performance metrics collection and analysis

TRY:

**Latency and Throughput Analysis:**

```bash
# HTTP endpoint performance (if applicable)
if rg "(http|router|server)" src/ >/dev/null 2>&1; then
  echo "🌐 HTTP service detected - analyzing endpoint performance"
  # Integration with load testing tools (k6, wrk, etc.)
fi

# Database query performance
if rg "(SELECT|INSERT|UPDATE|DELETE)" . --type sql >/dev/null 2>&1; then
  echo "🗄️ Database queries detected - analyzing SQL performance"
  # EXPLAIN ANALYZE integration
fi
```

**Resource Utilization Metrics:**

```bash
# Container resource analysis
if docker ps >/dev/null 2>&1; then
  echo "🐳 Docker containers detected - analyzing resource usage"
  docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
fi

# Kubernetes resource analysis
if kubectl get nodes >/dev/null 2>&1; then
  echo "☸️ Kubernetes cluster detected - analyzing pod performance"
  kubectl top pods --all-namespaces 2>/dev/null || echo "Metrics server required"
fi
```

CATCH (profiling_failed):

- LOG profiling errors to session state
- PROVIDE alternative analysis strategies
- SUGGEST tool installation or configuration

```bash
echo "⚠️ Profiling execution failed. Checking tool availability:"
echo "Performance tools status:"
echo "  htop: $(which htop >/dev/null && echo '✓ installed' || echo '❌ missing')"
echo "  docker: $(which docker >/dev/null && echo '✓ installed' || echo '❌ missing')"
echo "  kubectl: $(which kubectl >/dev/null && echo '✓ installed' || echo '❌ missing')"
```

STEP 6: Optimization recommendation generation

**Structured Performance Report:**

```bash
# Generate comprehensive performance report
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .analysisComplete = true |
  .completedAt = $timestamp |
  .recommendations = []
' /tmp/perf-analysis-$SESSION_ID.json > /tmp/perf-analysis-$SESSION_ID.tmp &&
mv /tmp/perf-analysis-$SESSION_ID.tmp /tmp/perf-analysis-$SESSION_ID.json
```

**Performance Optimization Priority Matrix:**

1. **Critical Impact, Low Effort** (Quick wins)
   - Database index additions
   - Connection pool tuning
   - Basic caching implementation

2. **High Impact, Medium Effort** (Strategic improvements)
   - Algorithm optimization
   - Data structure changes
   - Async pattern improvements

3. **High Impact, High Effort** (Architectural changes)
   - Microservice decomposition
   - Distributed caching implementation
   - Database sharding/partitioning

STEP 7: Load testing and monitoring setup

**Load Testing Framework:**

```bash
# Generate language-appropriate load testing scripts
echo "🔄 Setting up load testing framework"

# k6 for HTTP services
if rg "http" src/ >/dev/null 2>&1; then
  echo "Generating k6 load testing scripts"
fi

# Benchmark tests for libraries
if fd "Cargo\.toml" . >/dev/null; then
  echo "Setting up Rust criterion benchmarks"
elif fd "go\.mod" . >/dev/null; then
  echo "Setting up Go benchmark tests"
fi
```

**Monitoring Dashboard Configuration:**

```bash
# Prometheus/Grafana setup recommendations
echo "📈 Monitoring setup recommendations:"
echo "  - Prometheus metrics collection"
echo "  - Grafana dashboard configuration"
echo "  - AlertManager thresholds"
echo "  - Custom SLI/SLO definitions"
```

FINALLY:

- SAVE comprehensive performance analysis to session state
- PROVIDE actionable optimization roadmap
- SUGGEST follow-up profiling sessions
- CLEAN UP temporary profiling data

## Performance Analysis Output

**Deliverables:**

1. **Performance Bottleneck Report**
   - Ranked by impact and effort to fix
   - Specific code locations and patterns
   - Quantified performance gains

2. **Technology-Specific Recommendations**
   - JVM tuning for Java applications
   - Goroutine optimization for Go services
   - Async runtime tuning for Rust/Tokio
   - V8 optimization for Node.js/Deno

3. **Implementation Roadmap**
   - Phased optimization approach
   - Effort estimates and timelines
   - Risk assessment and rollback plans

4. **Monitoring & Testing Setup**
   - Continuous profiling integration
   - Load testing automation
   - Performance regression detection
   - SLI/SLO definitions

5. **Before/After Metrics**
   - Latency percentiles (p50, p95, p99)
   - Throughput improvements (RPS)
   - Resource utilization changes
   - Cost optimization impact

## Performance Patterns by Technology

### Java/JVM Optimization

- **Heap tuning**: G1GC vs ZGC vs Parallel GC selection
- **Connection pooling**: HikariCP configuration optimization
- **Virtual threads**: Java 21+ virtual thread adoption
- **Spring Boot**: Actuator metrics and auto-configuration tuning

### Go Performance Patterns

- **Goroutine pools**: Worker pattern implementation
- **Memory allocation**: Reduce unnecessary allocations
- **Channel optimization**: Buffered vs unbuffered channel usage
- **Context propagation**: Proper cancellation and timeout handling

### Rust Performance Patterns

- **Zero-copy optimization**: Avoid unnecessary clones
- **Async runtime tuning**: Tokio worker thread configuration
- **Memory layout**: Struct field ordering and alignment
- **SIMD utilization**: Vectorized operations where applicable

### Database Optimization

- **PostgreSQL**: Query planner hints, partial indexes, materialized views
- **Connection pooling**: pgbouncer configuration for PostgreSQL
- **DragonflyDB**: Redis-compatible caching with better performance
- **Query optimization**: EXPLAIN ANALYZE driven improvements

This comprehensive performance analysis command provides systematic optimization across all technology stacks with intelligent profiling and parallel analysis capabilities.