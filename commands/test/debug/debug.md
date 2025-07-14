---
allowed-tools: Task, Read, Write, Edit, Bash(rg:*), Bash(fd:*), Bash(bat:*), Bash(eza:*), Bash(jq:*), Bash(gdate:*), Bash(git:*), Bash(docker:*), Bash(kubectl:*), Bash(ps:*), Bash(netstat:*), Bash(lsof:*), Bash(strace:*), Bash(gdb:*), Bash(lldb:*), Bash(jstack:*), Bash(jcmd:*), Bash(delve:*), Bash(go:*), Bash(cargo:*), Bash(mvn:*), Bash(gradle:*), Bash(deno:*)
name: "Debug"
description: "Systematic debugging orchestrator with multi-language support and intelligent root cause analysis"
author: "wcygan"
tags: ["test","debug"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Debug target: $ARGUMENTS
- Current directory: !`pwd`
- Project structure: !`eza -la --tree --level=2 2>/dev/null | head -10 || fd . -t d -d 2 | head -8`
- Build files detected: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json)" . -d 3 | head -5 || echo "No build files detected"`
- Git status: !`git status --porcelain 2>/dev/null | head -5 || echo "No git repository"`
- Recent commits: !`git log --oneline -3 2>/dev/null || echo "No git history"`
- Running processes: !`ps aux | rg -E "(java|go|rust|deno|node)" | head -3 2>/dev/null || echo "No relevant processes found"`
- System logs (recent): !`tail -5 /var/log/system.log 2>/dev/null || dmesg | tail -3 2>/dev/null || echo "System logs unavailable"`

## Your Task

STEP 1: Initialize systematic debugging session with intelligent issue classification

- CREATE session state file: `/tmp/debug-session-$SESSION_ID.json`
- ANALYZE issue description from Context section for patterns
- CLASSIFY debug target type (error message, performance issue, crash, etc.)
- DETECT project technology stack and select appropriate debugging tools

```bash
# Initialize debugging session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "debugTarget": "'$ARGUMENTS'",
  "issueType": "auto-detect",
  "technologyStack": [],
  "debugStrategy": "systematic",
  "findings": [],
  "recommendedActions": []
}' > /tmp/debug-session-$SESSION_ID.json
```

STEP 2: Multi-phase debugging analysis with parallel sub-agent coordination

TRY:

IF issue_complexity == "complex_system_issue" OR technology_stack == "multi-service":

LAUNCH parallel sub-agents for comprehensive debugging analysis:

- **Agent 1: Error Analysis**: Parse and analyze error messages, stack traces, and logs
  - Focus: Error patterns, stack trace analysis, log correlation, exception chains
  - Tools: rg for log parsing, language-specific stack trace analyzers
  - Output: Root cause candidates with confidence scores

- **Agent 2: Code Path Analysis**: Trace execution flow and identify potential failure points
  - Focus: Function calls, variable states, control flow, recent code changes
  - Tools: rg for code search, git for change analysis, static analysis
  - Output: Execution timeline and state analysis

- **Agent 3: Environment Analysis**: Examine runtime environment and system state
  - Focus: Dependencies, configuration, resource usage, external services
  - Tools: docker, kubectl, ps, netstat for system state analysis
  - Output: Environmental factors and configuration issues

- **Agent 4: Historical Analysis**: Review recent changes and deployment history
  - Focus: Git history, deployment logs, configuration changes
  - Tools: git log, docker history, configuration diff analysis
  - Output: Change correlation and regression analysis

ELSE:

EXECUTE streamlined single-service debugging workflow:

```bash
# Direct debugging analysis for simpler issues
echo "🔍 Executing focused debugging analysis..."
```

STEP 3: Technology-specific debugging strategy execution
TRY:

CASE detected_technology:
WHEN "java":

```bash
# Java-specific debugging workflow
echo "☕ Java debugging strategy activated"

# Check for running Java processes
jps -v || ps aux | rg java

# Generate thread dump if process found
if jstack_pid=$(jps | rg -v Jps | head -1 | cut -d' ' -f1); then
  echo "Generating thread dump for PID: $jstack_pid"
  jstack $jstack_pid > /tmp/threaddump-$SESSION_ID.txt
fi

# Check JVM flags and heap usage
jcmd $jstack_pid VM.flags 2>/dev/null || echo "JVM flags unavailable"
jcmd $jstack_pid GC.run_finalization 2>/dev/null || echo "GC info unavailable"
```

**Java Debugging Actions:**

- Remote debugging with JDWP: `-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005`
- Conditional breakpoints in IDE with expression evaluation
- JVM diagnostic flags: `-XX:+PrintGCDetails -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/`
- Thread dumps and heap analysis with jstack, jcmd, jhat
- Flight Recorder: `-XX:+UnlockCommercialFeatures -XX:+FlightRecorder`

WHEN "go":

```bash
# Go-specific debugging workflow
echo "🐹 Go debugging strategy activated"

# Check for Go binaries and build info
fd -e go . | head -5
go version 2>/dev/null || echo "Go not available"

# Check for race conditions in recent builds
if [ -f "go.mod" ]; then
  echo "Checking for recent race detector usage..."
  rg "go run -race|go test -race" . || echo "No race detection usage found"
fi

# Check for goroutine leaks in running processes
ps aux | rg go | head -3
```

**Go Debugging Actions:**

- Delve debugger: `dlv debug ./main.go` or `dlv attach <pid>`
- pprof for runtime analysis: `go tool pprof http://localhost:6060/debug/pprof/heap`
- Race detector: `go run -race main.go` or `go test -race ./...`
- Structured logging with context: `log/slog` with contextual fields
- Goroutine analysis: `go tool pprof http://localhost:6060/debug/pprof/goroutine`

WHEN "rust":

```bash
# Rust-specific debugging workflow
echo "🦀 Rust debugging strategy activated"

# Check Cargo configuration and recent builds
fd Cargo.toml . | head -3
cargo --version 2>/dev/null || echo "Cargo not available"

# Set backtrace environment for detailed error info
export RUST_BACKTRACE=full
export RUST_LOG=debug

# Check for recent panic or error patterns
rg "panic!|unwrap|expect" src/ | head -5 2>/dev/null || echo "No panic patterns found"
```

**Rust Debugging Actions:**

- Environment variables: `RUST_BACKTRACE=full RUST_LOG=debug`
- GDB/LLDB integration: `rust-gdb target/debug/binary` or `rust-lldb`
- Debug macros: `dbg!()` macro for variable inspection
- Cargo expand: `cargo expand` for macro debugging
- Memory debugging: `valgrind --tool=memcheck ./target/debug/binary`

WHEN "deno":

```bash
# Deno-specific debugging workflow
echo "⚡ Deno debugging strategy activated"

# Check Deno configuration and permissions
fd deno.json . | head -3
deno --version 2>/dev/null || echo "Deno not available"

# Check for permission-related issues
rg "PermissionDenied|NotAllowed" . | head -3 2>/dev/null || echo "No permission errors found"

# Analyze module dependency graph
if [ -f "deno.json" ]; then
  echo "Analyzing module dependencies..."
  deno info --json . 2>/dev/null | jq '.modules | length' 2>/dev/null || echo "Module analysis failed"
fi
```

**Deno/TypeScript Debugging Actions:**

- Chrome DevTools debugging: `deno run --inspect-brk --allow-all script.ts`
- Console debugging: `console.log()` and `Deno.inspect()` for object inspection
- Stack traces: `Error().stack` and proper error boundary handling
- Permission debugging: Start with `--allow-all`, then restrict systematically
- Module graph inspection: `deno info script.ts` for dependency analysis
- Fresh framework debugging: `_middleware.ts` for request logging

WHEN "docker":

```bash
# Docker/Container debugging workflow
echo "🐳 Container debugging strategy activated"

# Check container status and logs
docker ps -a | head -5 2>/dev/null || echo "Docker not available"
docker logs --tail=20 $(docker ps -q | head -1) 2>/dev/null || echo "No container logs"

# Check container resource usage
docker stats --no-stream 2>/dev/null | head -3 || echo "Docker stats unavailable"
```

**Container Debugging Actions:**

- Container logs: `docker logs -f <container_id>`
- Interactive debugging: `docker exec -it <container_id> /bin/bash`
- Resource monitoring: `docker stats` for CPU/memory usage
- Network debugging: `docker network ls` and `docker port <container_id>`
- Volume inspection: `docker volume inspect <volume_name>`

CATCH (debugging_tool_unavailable):

- LOG missing tool to session state
- PROVIDE alternative debugging approaches
- SUGGEST tool installation commands

```bash
echo "⚠️ Some debugging tools unavailable. Checking alternatives..."
echo "Available tools:"
echo "  rg: $(which rg >/dev/null && echo '✓' || echo '❌ - install with: brew install ripgrep')"
echo "  fd: $(which fd >/dev/null && echo '✓' || echo '❌ - install with: brew install fd')"
echo "  bat: $(which bat >/dev/null && echo '✓' || echo '❌ - install with: brew install bat')"
echo "  jq: $(which jq >/dev/null && echo '✓' || echo '❌ - install with: brew install jq')"
```

STEP 4: Systematic common pitfall analysis with pattern recognition

TRY:

FOR EACH detected_technology IN project_stack:

**Java Common Issues Analysis:**

```bash
# Analyze Java-specific patterns
if fd -e java . | head -1 >/dev/null; then
  echo "🔍 Analyzing Java pitfall patterns..."
  
  # Check for NPE-prone patterns
  rg "\.)" --type java | head -5 && echo "Potential NPE chains found"
  
  # Concurrency issue detection
  rg "synchronized|volatile|AtomicReference" --type java | wc -l
  
  # Resource leak detection
  rg "new.*Stream|new.*Connection" --type java | head -3
  
  # Memory leak patterns
  rg "static.*List|static.*Map" --type java | head -3
fi
```

- **NullPointerException causes**: Unguarded method chaining, unvalidated parameters
- **Concurrency issues**: Deadlocks, race conditions, improper synchronization
- **Memory leaks**: Static collections, unclosed resources, listener leaks
- **ClassLoader problems**: Missing dependencies, version conflicts
- **Resource leaks**: Unclosed streams, connections, database cursors

**Go Common Issues Analysis:**

```bash
# Analyze Go-specific patterns
if fd -e go . | head -1 >/dev/null; then
  echo "🔍 Analyzing Go pitfall patterns..."
  
  # Nil pointer checks
  rg "\*.*\.|\[.*\]" --type go | head -5
  
  # Goroutine leak detection
  rg "go func|go " --type go | wc -l
  
  # Channel deadlock patterns
  rg "<-.*chan|chan.*<-" --type go | head -3
  
  # Interface assertion issues
  rg "\.(\*|.*Type)" --type go | head -3
fi
```

- **Nil pointer dereferences**: Unchecked pointer operations, uninitialized structs
- **Goroutine leaks**: Missing context cancellation, infinite loops
- **Channel deadlocks**: Unbuffered channels, missing receivers
- **Interface{} type assertions**: Unsafe type conversions, missing ok checks
- **Slice capacity vs length**: Index out of bounds, memory over-allocation

**Rust Common Issues Analysis:**

```bash
# Analyze Rust-specific patterns
if fd -e rs . | head -1 >/dev/null; then
  echo "🔍 Analyzing Rust pitfall patterns..."
  
  # Borrow checker violation patterns
  rg "&mut.*&mut|&.*&mut" --type rust | head -3
  
  # Unsafe code detection
  rg "unsafe" --type rust | wc -l
  
  # Panic patterns
  rg "panic!|unwrap|expect" --type rust | head -5
  
  # Lifetime issue indicators
  rg "'[a-z]+" --type rust | head -3
fi
```

- **Borrow checker violations**: Multiple mutable references, use after move
- **Lifetime issues**: Dangling references, complex lifetime parameters
- **Move semantics confusion**: Use after move, clone vs move decisions
- **Unsafe code problems**: Memory safety violations, undefined behavior
- **Panic in production**: Unhandled unwrap(), expect() in critical paths

**Deno/TypeScript Common Issues Analysis:**

```bash
# Analyze Deno-specific patterns
if fd -e ts -e js . | head -1 >/dev/null; then
  echo "🔍 Analyzing Deno/TypeScript pitfall patterns..."
  
  # Permission error patterns
  rg "Deno\.(read|write|run)|--allow" . | head -3
  
  # Module resolution issues
  rg "import.*from.*['\"]" . | head -5
  
  # Top-level await problems
  rg "await.*import|import.*await" . | head -3
  
  # Memory leak indicators
  rg "setInterval|setTimeout.*(?!clear)" . | head -3
fi
```

- **Permission errors**: File, network, env access without proper flags
- **Module resolution failures**: Incorrect import paths, missing import maps
- **Import map configuration**: Malformed JSON, circular dependencies
- **Top-level await deadlocks**: Promise chains, unresolved imports
- **Memory leaks**: Uncleaned intervals, event listener accumulation

STEP 5: Minimal reproduction case creation with test automation

TRY:

```bash
# Create reproduction environment
mkdir -p /tmp/debug-reproduction-$SESSION_ID
cd /tmp/debug-reproduction-$SESSION_ID

echo "Creating minimal reproduction case..."
echo "Target issue: $ARGUMENTS"
```

**Reproduction Strategy:**

1. **Isolate Problem Code**:
   - Extract minimal failing code segment
   - Remove unrelated dependencies and complexity
   - Preserve essential context and state

2. **Create Reproduction Script**:
   - Document exact steps to trigger the issue
   - Include environment setup requirements
   - Provide expected vs actual behavior

3. **Test Case Development**:
   - Write automated test that reproduces the bug
   - Ensure test fails consistently before fix
   - Validate test passes after fix implementation

STEP 6: Solution synthesis with defensive programming patterns

FOR EACH identified_issue IN findings:

**Technology-Specific Solution Patterns:**

**Java Solutions:**

```java
// Defensive null checking with Optional
Optional.ofNullable(object)
    .map(Object::method)
    .orElse(defaultValue);

// Resource management with try-with-resources
try (var resource = createResource()) {
    // Use resource safely
} catch (Exception e) {
    log.error("Resource operation failed", e);
}
```

**Go Solutions:**

```go
// Error wrapping with context
if err := operation(); err != nil {
    return fmt.Errorf("operation failed: %w", err)
}

// Defer cleanup pattern
func processFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close() // Guaranteed cleanup
    
    // Process file
    return nil
}
```

**Rust Solutions:**

```rust
// Result handling with match
match risky_operation() {
    Ok(value) => process_value(value),
    Err(e) => {
        eprintln!("Operation failed: {}", e);
        return Err(e);
    }
}

// Option handling with combinators
value.and_then(|v| transform(v))
     .unwrap_or_else(|| default_value())
```

**Deno Solutions:**

```typescript
// Proper error handling with typed errors
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  if (error instanceof Deno.errors.PermissionDenied) {
    console.error("Permission denied:", error.message);
  }
  throw error;
}

// Resource cleanup with using/disposable pattern
using resource = await createResource();
// Automatic cleanup when scope exits
```

STEP 7: Session state management and comprehensive reporting

**Update Session State:**

```bash
# Update debugging session with findings
jq --arg findings "$(cat findings.json 2>/dev/null || echo '[]')" \
   --arg solutions "$(cat solutions.json 2>/dev/null || echo '[]')" '
  .findings = ($findings | fromjson) |
  .recommendedActions = ($solutions | fromjson) |
  .status = "analysis_complete"
' /tmp/debug-session-$SESSION_ID.json > /tmp/debug-session-$SESSION_ID.tmp && \
mv /tmp/debug-session-$SESSION_ID.tmp /tmp/debug-session-$SESSION_ID.json
```

**Generate Comprehensive Debug Report:**

```bash
echo "✅ Debug Analysis Complete"
echo "🎯 Target: $ARGUMENTS"
echo "🔍 Session: $SESSION_ID"
echo "📊 Findings: $(jq '.findings | length' /tmp/debug-session-$SESSION_ID.json) issues identified"
echo "💡 Solutions: $(jq '.recommendedActions | length' /tmp/debug-session-$SESSION_ID.json) recommendations"
echo "📁 Report saved to: /tmp/debug-report-$SESSION_ID.md"
```

FINALLY:

- SAVE comprehensive debugging report
- PROVIDE prevention strategies and monitoring recommendations
- SUGGEST follow-up actions for long-term stability

## Output Format

**Structured Debugging Report:**

1. **Root Cause Analysis**
   - Primary issue identification with confidence score
   - Contributing factors and trigger conditions
   - Impact assessment and severity classification

2. **Step-by-Step Debugging Plan**
   - Immediate investigation steps
   - Tool-specific debugging commands
   - Data collection and analysis procedures

3. **Specific Code Changes**
   - Targeted fixes with code examples
   - Defensive programming improvements
   - Error handling enhancements

4. **Test Cases for Verification**
   - Unit tests to verify fix effectiveness
   - Integration tests for system-level validation
   - Regression tests to prevent reoccurrence

5. **Prevention Strategies**
   - **Code Review Checklist**: Language-specific review points
   - **Static Analysis Rules**: Automated detection patterns
   - **Monitoring Alerts**: Operational visibility improvements
   - **Documentation Updates**: Knowledge sharing and process improvements

## Advanced Debugging Patterns

### Distributed System Debugging

- **Distributed Tracing**: Correlation IDs, span analysis
- **Log Aggregation**: Centralized logging with structured data
- **Circuit Breakers**: Fault tolerance and cascading failure prevention
- **Health Checks**: Service dependency validation

### Performance Debugging

- **Profiling**: CPU, memory, and I/O analysis
- **Benchmarking**: Performance regression detection
- **Load Testing**: Scalability and bottleneck identification
- **APM Integration**: Application performance monitoring

### Security Debugging

- **Vulnerability Scanning**: Dependency and code analysis
- **Penetration Testing**: Security flaw identification
- **Audit Logging**: Security event tracking
- **Compliance Validation**: Regulatory requirement verification

This systematic debugging approach adapts to your technology stack, provides intelligent analysis through parallel sub-agents, and delivers actionable solutions with comprehensive prevention strategies.