---
allowed-tools: Task, Bash(hyperfine:*), Bash(rg:*), Bash(fd:*), Bash(wrk:*), Bash(k6:*), Bash(perf:*), Bash(jq:*), Bash(gdate:*), Bash(cargo:*), Bash(go:*), Bash(mvn:*), Bash(deno:*), Bash(valgrind:*), Bash(time:*), Bash(docker:*), Bash(curl:*), Bash(psql:*), Bash(dragonfly-cli:*), Bash(stress:*), Read, Write
name: "Benchmark"
description: "Comprehensive performance analysis and optimization orchestrator with parallel benchmarking capabilities"
author: "wcygan"
tags: ["ops","perf"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Benchmark target: $ARGUMENTS
- Project type: !`fd "(Cargo.toml|go.mod|package.json|pom.xml|deno.json)" . -d 2 | head -3 || echo "No build files detected"`
- Available performance tools: !`echo "hyperfine: $(which hyperfine >/dev/null && echo ✓ || echo ❌) | wrk: $(which wrk >/dev/null && echo ✓ || echo ❌) | k6: $(which k6 >/dev/null && echo ✓ || echo ❌) | perf: $(which perf >/dev/null && echo ✓ || echo ❌)"`
- Current directory: !`pwd`
- System specs: !`echo "CPU: $(sysctl -n hw.ncpu 2>/dev/null || nproc 2>/dev/null || echo 'unknown') cores | RAM: $(echo $(($(sysctl -n hw.memsize 2>/dev/null || grep MemTotal /proc/meminfo 2>/dev/null | awk '{print $2}' || echo 0) / 1024 / 1024))MB 2>/dev/null || echo 'unknown')MB"`
- Git status: !`git status --porcelain | wc -l | tr -d ' '` uncommitted changes

## Your Task

STEP 1: Initialize comprehensive performance analysis session

- CREATE session state file: `/tmp/benchmark-session-$SESSION_ID.json`
- ANALYZE project structure and detect benchmark targets
- VALIDATE performance tooling availability (hyperfine, wrk, perf are MANDATORY)
- DETERMINE benchmarking strategy based on project type and target

```bash
# Initialize benchmark session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "target": "'$ARGUMENTS'",
  "projectType": "auto-detect",
  "benchmarkStrategy": "comprehensive",
  "phases": ["baseline", "profiling", "optimization", "validation"],
  "currentPhase": "baseline",
  "results": {},
  "recommendations": []
}' > /tmp/benchmark-session-$SESSION_ID.json
```

STEP 2: Adaptive benchmarking strategy with parallel execution

TRY:

CASE project_complexity:
WHEN "simple_binary":

- EXECUTE direct hyperfine benchmarking with system monitoring
- PROFILE with built-in tools
- GENERATE immediate optimization recommendations

WHEN "multi_component_system":

- LAUNCH parallel sub-agents for comprehensive analysis
- COORDINATE results from multiple benchmark domains
- SYNTHESIZE findings into holistic performance profile

WHEN "distributed_application":

- ORCHESTRATE load testing scenarios
- MONITOR system-wide performance metrics
- ANALYZE bottlenecks across service boundaries

**Parallel Performance Analysis (Sub-Agent Architecture):**

IF project_complexity == "complex" OR benchmark_scope == "comprehensive":

LAUNCH parallel sub-agents for multi-dimensional performance analysis:

- **Agent 1: Binary Performance**: Baseline measurement with hyperfine and system profiling
  - Focus: Execution time, memory usage, CPU utilization patterns
  - Tools: hyperfine, time, valgrind, perf for CPU/memory profiling
  - Output: Baseline metrics and hotspot identification

- **Agent 2: API/Service Performance**: HTTP endpoint and service layer benchmarking
  - Focus: Throughput, latency percentiles, connection handling
  - Tools: wrk, k6 for load testing, curl for endpoint validation
  - Output: Service performance characteristics and scaling limits

- **Agent 3: Database Performance**: Data layer optimization and query analysis
  - Focus: Connection pooling, query performance, transaction throughput
  - Tools: Database-specific profiling, connection pool testing
  - Output: Database bottlenecks and optimization opportunities

- **Agent 4: System Resource Analysis**: Infrastructure and resource utilization
  - Focus: Memory patterns, CPU hotspots, I/O characteristics
  - Tools: perf, system monitoring, resource profiling
  - Output: System-level optimization recommendations

- **Agent 5: Regression Testing**: Historical performance comparison and CI integration
  - Focus: Performance trend analysis, regression detection, automated testing setup
  - Tools: Benchmark result comparison, JSON analysis, CI pipeline integration
  - Output: Performance monitoring and alerting configuration

**Sub-Agent Coordination:**

```bash
# Each agent reports findings to session state
echo "Parallel performance analysis agents launched..."
echo "Results will be aggregated for comprehensive optimization strategy"
```

STEP 3: Baseline performance measurement with intelligent detection

**Language-Specific Benchmarking:**

```bash
# Rust Performance Analysis
if fd "Cargo.toml" . | head -1 >/dev/null; then
  echo "🦀 Rust project detected - comprehensive Rust benchmarking"
  
  # Built-in benchmarks with detailed metrics
  cargo bench --bench '*' -- --output-format json > /tmp/rust-bench-$SESSION_ID.json
  
  # Release build optimization verification
  cargo build --release --verbose
  
  # Hyperfine analysis with statistical rigor
  hyperfine --warmup 5 --runs 20 \
    --export-json /tmp/rust-hyperfine-$SESSION_ID.json \
    --parameter-scan threads 1 $(nproc) \
    'RAYON_NUM_THREADS={threads} ./target/release/$(basename $PWD)' || \
    hyperfine --warmup 5 --runs 20 './target/release/$(basename $PWD)'
  
  # Memory profiling with Rust-specific tools
  if command -v heaptrack >/dev/null; then
    heaptrack ./target/release/$(basename $PWD) > /tmp/rust-memory-$SESSION_ID.log
  fi
fi

# Go Performance Analysis
if fd "go.mod" . | head -1 >/dev/null; then
  echo "🐹 Go project detected - comprehensive Go benchmarking"
  
  # Built-in benchmarks with memory allocation tracking
  go test -bench=. -benchmem -cpuprofile=/tmp/go-cpu-$SESSION_ID.prof \
    -memprofile=/tmp/go-mem-$SESSION_ID.prof ./... || echo "No benchmarks found"
  
  # Build optimization verification
  go build -ldflags="-s -w" -o app-optimized .
  go build -o app-debug .
  
  # Comparative performance analysis
  hyperfine --warmup 3 --runs 15 \
    --export-json /tmp/go-hyperfine-$SESSION_ID.json \
    'optimized build' './app-optimized' \
    'debug build' './app-debug'
  
  # pprof integration for detailed profiling
  if pgrep app-optimized >/dev/null; then
    go tool pprof -http=:8080 /tmp/go-cpu-$SESSION_ID.prof &
    echo "pprof server started at http://localhost:8080"
  fi
fi

# Java Performance Analysis
if fd "pom.xml" . | head -1 >/dev/null; then
  echo "☕ Java project detected - comprehensive JVM benchmarking"
  
  # JMH microbenchmarks
  ./mvnw clean compile exec:exec -Dexec.mainClass="org.openjdk.jmh.Main" \
    -Dexec.args="-rf json -rff /tmp/java-jmh-$SESSION_ID.json" || \
    echo "⚠️ Add JMH dependency for microbenchmarks"
  
  # Application-level benchmarking
  java -XX:+UseG1GC -XX:+UnlockExperimentalVMOptions \
    -XX:+UseZGC -jar target/*.jar &
  APP_PID=$!
  sleep 10
  
  # Service endpoint benchmarking
  hyperfine --warmup 3 --runs 10 \
    --export-json /tmp/java-service-$SESSION_ID.json \
    'curl -s http://localhost:8080/health'
  
  # JVM profiling
  if command -v async-profiler >/dev/null; then
    java -jar async-profiler.jar -d 30 -e cpu \
      -f /tmp/java-profile-$SESSION_ID.html $APP_PID
  fi
  
  kill $APP_PID 2>/dev/null
fi

# Deno Performance Analysis
if fd "deno.json" . | head -1 >/dev/null; then
  echo "🦕 Deno project detected - comprehensive Deno benchmarking"
  
  # Built-in Deno benchmarks
  fd ".*bench.*\.(ts|js)$" . | xargs -I {} deno bench {} \
    --json > /tmp/deno-bench-$SESSION_ID.json || echo "No bench files found"
  
  # Application benchmarking
  if [[ -f "deno.json" ]] && jq -e '.tasks.start' deno.json >/dev/null; then
    deno task build 2>/dev/null || echo "No build task defined"
    hyperfine --warmup 3 --runs 10 \
      --export-json /tmp/deno-hyperfine-$SESSION_ID.json \
      'deno task start --port 8001 &; sleep 5; curl -s http://localhost:8001/health; pkill -f "deno task start"'
  fi
  
  # V8 profiling integration
  deno run --v8-flags=--prof --allow-all main.ts 2>/dev/null || echo "Main entry point not found"
fi
```

**System Resource Monitoring with Statistical Analysis:**

```bash
# Comprehensive resource monitoring during execution
echo "📊 System resource monitoring with statistical analysis"

# Multi-parameter performance analysis
hyperfine --export-json /tmp/baseline-$SESSION_ID.json \
  --warmup 3 --runs 10 \
  --prepare 'sleep 1 && sync' \
  --parameter-list input '100,1000,10000,100000' \
  --parameter-list threads '1,2,4,8' \
  'THREADS={threads} ./app --input {input}' || \
  hyperfine --export-json /tmp/baseline-$SESSION_ID.json \
    --warmup 3 --runs 10 './app'

# Memory profiling with multiple tools
echo "🧠 Memory analysis"
if command -v valgrind >/dev/null; then
  valgrind --tool=massif --massif-out-file=/tmp/massif-$SESSION_ID.out ./app 2>/dev/null
  ms_print /tmp/massif-$SESSION_ID.out > /tmp/memory-analysis-$SESSION_ID.txt
else
  echo "⚠️ Valgrind not available - using system time for memory analysis"
fi

# Detailed system resource analysis
/usr/bin/time -l ./app 2>&1 | tee /tmp/system-resources-$SESSION_ID.txt || \
  /usr/bin/time -v ./app 2>&1 | tee /tmp/system-resources-$SESSION_ID.txt

# CPU profiling with perf (Linux) or system profiler (macOS)
if command -v perf >/dev/null; then
  perf record -g -o /tmp/perf-$SESSION_ID.data ./app
  perf report -i /tmp/perf-$SESSION_ID.data > /tmp/perf-analysis-$SESSION_ID.txt
elif [[ "$(uname)" == "Darwin" ]]; then
  instruments -t "Time Profiler" -D /tmp/instruments-$SESSION_ID.trace ./app 2>/dev/null || \
    echo "⚠️ Instruments not available on macOS"
fi
```

STEP 4: Application-level benchmarks with service-oriented analysis

**HTTP API Performance with Progressive Load Testing:**

```bash
echo "🌐 HTTP API performance analysis with progressive load testing"

# Intelligent service discovery and startup
if [[ -f "docker-compose.yml" ]]; then
  echo "🐳 Docker Compose detected - starting services"
  docker-compose up -d
  sleep 15
else
  # Start application with optimized settings
  ./app --performance-mode &
  APP_PID=$!
  sleep 10
fi

# Service health verification
echo "🔍 Verifying service health"
for attempt in {1..30}; do
  if curl -sf http://localhost:8080/health >/dev/null 2>&1; then
    echo "✅ Service is healthy"
    break
  fi
  echo "⏳ Attempt $attempt/30 - waiting for service..."
  sleep 2
done

# Baseline API performance with wrk
echo "📈 Baseline API performance measurement"
wrk -t4 -c10 -d30s --latency http://localhost:8080/health > /tmp/api-baseline-$SESSION_ID.txt

# Progressive load testing with detailed metrics
echo "🚀 Progressive load testing"
for conns in 10 25 50 100 200 500 1000; do
  echo "📊 Testing with $conns connections"
  wrk -t$(nproc) -c$conns -d15s --latency --timeout 10s \
    http://localhost:8080/api/endpoint > /tmp/api-load-${conns}-$SESSION_ID.txt
  
  # Break if error rate exceeds threshold
  if grep -q "Socket errors" /tmp/api-load-${conns}-$SESSION_ID.txt; then
    echo "⚠️ Socket errors detected at $conns connections - stopping progressive test"
    break
  fi
  
  sleep 5  # Recovery time between tests
done

# k6 scenarios for realistic user patterns
echo "👥 Realistic user pattern simulation with k6"
cat > /tmp/k6-scenario-$SESSION_ID.js << 'EOF'
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 10 },   // Ramp-up
    { duration: '5m', target: 100 },  // Steady state
    { duration: '2m', target: 200 },  // Peak load
    { duration: '3m', target: 200 },  // Sustained peak
    { duration: '2m', target: 0 },    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    errors: ['rate<0.01'],
  },
};

export default function() {
  const response = http.get('http://localhost:8080/api/data');
  const success = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  errorRate.add(!success);
  sleep(Math.random() * 3 + 1); // Random sleep 1-4 seconds
}
EOF

if command -v k6 >/dev/null; then
  k6 run --out json=/tmp/k6-results-$SESSION_ID.json /tmp/k6-scenario-$SESSION_ID.js
else
  echo "⚠️ k6 not available - install with: brew install k6"
fi

# Cleanup
if [[ -n "$APP_PID" ]]; then
  kill $APP_PID 2>/dev/null
fi
```

**Database Performance with Connection Pool Optimization:**

```bash
echo "🗄️ Database performance analysis with connection pool optimization"

# Detect database type and configure accordingly
if [[ -f "docker-compose.yml" ]] && grep -q "postgres" docker-compose.yml; then
  echo "🐘 PostgreSQL detected"
  DB_TYPE="postgres"
  DB_URL="postgresql://localhost:5432/benchmark_db"
elif [[ -f "docker-compose.yml" ]] && grep -q "mysql" docker-compose.yml; then
  echo "🐬 MySQL detected"
  DB_TYPE="mysql"
  DB_URL="mysql://localhost:3306/benchmark_db"
else
  echo "📊 Generic database benchmarking"
  DB_TYPE="generic"
fi

# Connection pool optimization testing
echo "🔄 Connection pool optimization analysis"
for pool_size in 5 10 15 25 50 75 100; do
  echo "📊 Testing pool size: $pool_size"
  
  DATABASE_POOL_SIZE=$pool_size timeout 60s ./app benchmark-db \
    --output-json > /tmp/db-pool-${pool_size}-$SESSION_ID.json 2>&1 || \
    echo "Pool size $pool_size completed or timed out"
  
  # Monitor connection metrics
  if [[ "$DB_TYPE" == "postgres" ]]; then
    psql $DB_URL -c "SELECT count(*) as active_connections FROM pg_stat_activity;" \
      >> /tmp/db-connections-$SESSION_ID.log 2>/dev/null
  fi
  
  sleep 2  # Recovery time
done

# Bulk operation performance matrix
echo "📈 Bulk operation performance matrix"
for operation in insert select update delete; do
  for count in 1000 5000 10000 50000; do
    echo "🔄 Testing $operation with $count records"
    
    timeout 120s ./app benchmark-$operation --count $count \
      --json-output > /tmp/db-${operation}-${count}-$SESSION_ID.json 2>&1 || \
      echo "Operation $operation with $count records completed or timed out"
    
    # Database-specific monitoring
    if [[ "$DB_TYPE" == "postgres" ]]; then
      psql $DB_URL -c "SELECT schemaname,tablename,n_tup_ins,n_tup_upd,n_tup_del FROM pg_stat_user_tables;" \
        >> /tmp/db-stats-$SESSION_ID.log 2>/dev/null
    fi
  done
done

# Query performance analysis
echo "🔍 Query performance analysis"
if [[ "$DB_TYPE" == "postgres" ]]; then
  # Enable query statistics
  psql $DB_URL -c "SELECT pg_stat_reset();" 2>/dev/null
  
  # Run benchmark queries
  ./app benchmark-queries --duration 60s > /tmp/query-bench-$SESSION_ID.txt 2>&1
  
  # Analyze slow queries
  psql $DB_URL -c "SELECT query, calls, total_time, mean_time FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;" \
    > /tmp/slow-queries-$SESSION_ID.txt 2>/dev/null
else
  ./app benchmark-queries --duration 60s > /tmp/query-bench-$SESSION_ID.txt 2>&1
fi
```

STEP 5: Profiling and hotspot analysis with multi-dimensional insights

**CPU Profiling:**

```bash
# Rust
if [ -f "Cargo.toml" ]; then
  # Install flamegraph tools
  cargo install flamegraph
  sudo cargo flamegraph --bench bench_name
  
  # perf-based profiling
  perf record --call-graph=dwarf ./target/release/app
  perf report
fi

# Go
if [ -f "go.mod" ]; then
  # Built-in pprof
  go tool pprof http://localhost:8080/debug/pprof/profile?seconds=30
  go tool pprof http://localhost:8080/debug/pprof/heap
  
  # CPU profile during execution
  ./app -cpuprofile=cpu.prof
  go tool pprof cpu.prof
fi

# Java
if [ -f "pom.xml" ]; then
  # JProfiler or async-profiler
  java -jar async-profiler.jar -d 30 -e cpu -f profile.html $(pgrep java)
  
  # JVM built-in tools
  jstack $(pgrep java) > thread_dump.txt
  jmap -dump:format=b,file=heap.hprof $(pgrep java)
fi
```

**Memory Profiling:**

```bash
# Rust memory usage
if command -v heaptrack &> /dev/null; then
  heaptrack ./target/release/app
  heaptrack_gui heaptrack.app.*.zst
fi

# Go memory analysis
if [ -f "go.mod" ]; then
  go tool pprof http://localhost:8080/debug/pprof/allocs
  go tool pprof http://localhost:8080/debug/pprof/heap
fi

# General memory monitoring
ps aux | grep app | awk '{print $6}' # RSS memory
cat /proc/$(pgrep app)/status | grep VmRSS
```

STEP 6: Performance regression detection with historical analysis

**Historical Comparison:**

```bash
# Store current benchmark results
mkdir -p benchmarks/$(date +%Y-%m-%d)

# Run benchmarks and store results
hyperfine --export-json "benchmarks/$(date +%Y-%m-%d)/hyperfine.json" \
  --warmup 3 './app --benchmark'

# Compare with previous results
if [ -f "benchmarks/baseline/hyperfine.json" ]; then
  echo "Comparing with baseline..."
  jq -r '.results[0].mean' "benchmarks/$(date +%Y-%m-%d)/hyperfine.json"
  jq -r '.results[0].mean' "benchmarks/baseline/hyperfine.json"
fi
```

**Continuous Benchmarking Setup:**

```bash
# Create benchmark tracking script
cat > scripts/track-performance.ts << 'EOF'
#!/usr/bin/env -S deno run --allow-all

import { $ } from "jsr:@david/dax@0.42.0";

interface BenchmarkResult {
  timestamp: string;
  version: string;
  metrics: {
    throughput: number;
    latency: number;
    memory: number;
  };
}

const results: BenchmarkResult[] = [];

// Run benchmarks and collect metrics
const version = await $`git rev-parse --short HEAD`.text();
const timestamp = new Date().toISOString();

console.log(`Running benchmarks for ${version}...`);

// Add benchmark execution logic here
const metrics = {
  throughput: 1000, // requests/second
  latency: 50,      // milliseconds
  memory: 128       // MB
};

results.push({ timestamp, version, metrics });

// Store results
await Deno.writeTextFile(
  `benchmarks/${timestamp.split('T')[0]}/results.json`,
  JSON.stringify(results, null, 2)
);
EOF

chmod +x scripts/track-performance.ts
```

STEP 7: Optimization implementation with systematic validation

**Algorithm Optimization:**

```bash
# Profile algorithmic complexity
echo "Testing algorithmic performance..."

for size in 100 1000 10000 100000; do
  echo "Input size: $size"
  time ./app --algorithm-test --size $size
done

# Compare different algorithms
./app --compare-algorithms --iterations 1000
```

**Concurrency Optimization:**

```bash
# Test different concurrency levels
for threads in 1 2 4 8 16; do
  echo "Testing with $threads threads"
  THREAD_COUNT=$threads ./app --benchmark-concurrent
done

# Async vs sync performance
./app --benchmark-sync
./app --benchmark-async
```

**Memory Optimization:**

```bash
# Test different allocation strategies
./app --benchmark-allocation-strategy=pool
./app --benchmark-allocation-strategy=arena
./app --benchmark-allocation-strategy=default

# Cache performance testing
for cache_size in 1MB 10MB 100MB 1GB; do
  echo "Cache size: $cache_size"
  CACHE_SIZE=$cache_size ./app --benchmark-cache
done
```

STEP 8: Infrastructure benchmarks with modern stack optimization

**Database Performance:**

```bash
# PostgreSQL tuning
echo "Testing database configurations..."

# Connection pooling
for pool in 5 10 20 50 100; do
  echo "Pool size: $pool"
  DATABASE_POOL_SIZE=$pool ./app --db-benchmark
done

# Query optimization
psql -d appdb -c "EXPLAIN ANALYZE SELECT * FROM table WHERE condition;"

# Index performance
./app --benchmark-queries --with-indexes
./app --benchmark-queries --without-indexes
```

**Network Performance:**

```bash
# Network latency impact
tc qdisc add dev lo root netem delay 10ms  # Add artificial latency
./app --network-benchmark
tc qdisc del dev lo root  # Remove latency

# Compression impact
./app --benchmark-compression=none
./app --benchmark-compression=gzip
./app --benchmark-compression=brotli
```

**Caching Performance:**

```bash
# DragonflyDB vs no cache
echo "Testing cache performance..."
./app --benchmark-no-cache
./app --benchmark-with-cache

# Cache hit ratio analysis
dragonfly-cli --latency-history
```

STEP 9: Load testing scenarios with chaos engineering

**Realistic User Patterns:**

```bash
# Create load testing scenarios
cat > load-test-scenarios.js << 'EOF'
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 10 },   // Ramp-up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp-down
  ],
};

export default function() {
  // Typical user journey
  let response = http.get('http://localhost:8080/api/data');
  check(response, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
  
  response = http.post('http://localhost:8080/api/process', 
    JSON.stringify({data: 'test'}),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(response, { 'status is 200': (r) => r.status === 200 });
  sleep(2);
}
EOF

# Run load test
k6 run load-test-scenarios.js
```

**Chaos Engineering:**

```bash
# Network partitions
iptables -A INPUT -s localhost -j DROP  # Simulate network issues
./app --chaos-test
iptables -D INPUT -s localhost -j DROP  # Restore network

# Resource exhaustion
stress --cpu 8 --timeout 60s &  # CPU stress
./app --performance-under-stress
```

STEP 10: Performance monitoring setup with observability stack

**Metrics Collection:**

```bash
# Prometheus metrics setup
cat > prometheus.yml << 'EOF'
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'app'
    static_configs:
      - targets: ['localhost:9090']
EOF

# Grafana dashboard config
echo "Set up Grafana dashboards for:"
echo "- Request latency (p50, p95, p99)"
echo "- Throughput (requests/second)"
echo "- Error rate"
echo "- Resource utilization (CPU, memory)"
```

**Alerting Setup:**

```yaml
# alerting-rules.yml
groups:
  - name: performance
    rules:
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"

      - alert: LowThroughput
        expr: rate(http_requests_total[5m]) < 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Low throughput detected"
```

STEP 11: Optimization recommendations with impact analysis

**Performance Tuning Guide:**

```markdown
# Performance Optimization Results

## Baseline Metrics

- Throughput: X requests/second
- P95 Latency: X milliseconds
- Memory Usage: X MB
- CPU Usage: X%

## Optimization Opportunities

1. **Algorithm Improvements**
   - Replace O(n²) with O(n log n) algorithm
   - Implement caching for expensive computations

2. **Concurrency Optimizations**
   - Increase thread pool size to X
   - Implement connection pooling

3. **Memory Optimizations**
   - Reduce allocations in hot path
   - Implement object pooling

4. **Infrastructure Tuning**
   - Database connection pool: X connections
   - Cache size: X MB
   - JVM heap: X GB (if Java)
```

STEP 12: Automated performance testing with CI/CD integration

````bash
# CI/CD integration script
cat > .github/workflows/performance.yml << 'EOF'
name: Performance Tests

    on:
      pull_request:
        branches: [main]

    jobs:
      benchmark:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v4
        
        - name: Run benchmarks
          run: |
            ./scripts/run-benchmarks.sh
            
        - name: Compare with baseline
          run: |
            ./scripts/compare-performance.sh
            
        - name: Comment PR with results
          uses: actions/github-script@v6
          with:
            script: |
              // Post performance results to PR
    EOF
    ```

CATCH (benchmark_execution_failed):

- LOG detailed error information to session state
- PROVIDE alternative benchmarking strategies
- SUGGEST tool installation and configuration fixes
- CONTINUE with available tools and partial analysis

```bash
echo "⚠️ Benchmark execution encountered issues. Analyzing available alternatives..."
echo "Tool availability check:"
echo "  hyperfine: $(which hyperfine >/dev/null && echo '✓ available' || echo '❌ missing - install with: brew install hyperfine')"
echo "  wrk: $(which wrk >/dev/null && echo '✓ available' || echo '❌ missing - install with: brew install wrk')"
echo "  k6: $(which k6 >/dev/null && echo '✓ available' || echo '❌ missing - install with: brew install k6')"
echo "  perf: $(which perf >/dev/null && echo '✓ available' || echo '❌ missing - install with: apt install linux-perf')"
````

STEP 13: Results aggregation and performance optimization strategy

**Comprehensive Analysis Report Generation:**

```bash
# Aggregate all benchmark results
echo "📊 Generating comprehensive performance analysis report"

# Create final report structure
cat > /tmp/performance-report-$SESSION_ID.md << EOF
# Performance Analysis Report

**Session ID:** $SESSION_ID  
**Target:** $ARGUMENTS  
**Timestamp:** $(gdate -Iseconds 2>/dev/null || date -Iseconds)  
**System:** $(uname -s) $(uname -m)  

## Executive Summary

$(jq -r '.results.summary // "Benchmark execution completed"' /tmp/benchmark-session-$SESSION_ID.json)

## Baseline Metrics

- **Execution Time:** $(jq -r '.results[0].mean // "N/A"' /tmp/baseline-$SESSION_ID.json 2>/dev/null)s
- **Memory Usage:** $(grep "Maximum resident" /tmp/system-resources-$SESSION_ID.txt 2>/dev/null | awk '{print $6}' || echo "N/A")KB
- **CPU Utilization:** $(grep "Percent of CPU" /tmp/system-resources-$SESSION_ID.txt 2>/dev/null | awk '{print $7}' || echo "N/A")

## Performance Bottlenecks Identified

$(cat /tmp/perf-analysis-$SESSION_ID.txt 2>/dev/null | head -10 || echo "No profiling data available")

## Optimization Recommendations

### High Priority
- Algorithm optimization opportunities
- Memory allocation improvements
- Concurrency enhancement potential

### Medium Priority
- Caching strategy implementation
- Database query optimization
- Network latency reduction

### Infrastructure Tuning
- Connection pool sizing: $(echo "Optimal pool size based on testing")
- JVM/Runtime configuration adjustments
- System resource allocation optimization

## Performance Monitoring Setup

- Baseline metrics established for regression detection
- Alerting thresholds configured
- Continuous benchmarking pipeline ready

EOF

echo "📈 Performance report generated: /tmp/performance-report-$SESSION_ID.md"
```

**Session State Finalization:**

```bash
# Update session state with final results
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" \
   --arg phase "completed" \
   '.currentPhase = $phase | .completedAt = $timestamp | .status = "success"' \
   /tmp/benchmark-session-$SESSION_ID.json > /tmp/benchmark-session-$SESSION_ID.tmp && \
mv /tmp/benchmark-session-$SESSION_ID.tmp /tmp/benchmark-session-$SESSION_ID.json
```

FINALLY:

- CLEAN up temporary benchmark artifacts
- PRESERVE performance reports and session state
- PROVIDE actionable next steps for optimization
- SUGGEST continuous performance monitoring setup

## Key Performance Indicators (KPIs)

- **Throughput**: Requests/second, transactions/second
- **Latency Percentiles**: P50, P95, P99 response times
- **Resource Utilization**: CPU, memory, network, disk I/O
- **Error Rates**: Failure percentage under various load conditions
- **Scalability Metrics**: Performance degradation curves
- **Efficiency Ratios**: Throughput per resource unit

## Optimization Deliverables

1. **Performance Baseline**: Comprehensive current state metrics
2. **Bottleneck Analysis**: Identified performance limiting factors
3. **Optimization Roadmap**: Prioritized improvement opportunities
4. **Monitoring Setup**: Continuous performance tracking configuration
5. **Regression Detection**: Automated performance validation pipeline
6. **Load Testing Suite**: Realistic user scenario simulations
7. **Profiling Reports**: Detailed code and system-level hotspot analysis
8. **Infrastructure Recommendations**: System and deployment optimizations

This comprehensive benchmarking command provides end-to-end performance analysis with parallel execution capabilities, modern tooling integration, and actionable optimization strategies tailored to your specific technology stack.