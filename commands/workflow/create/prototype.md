---
allowed-tools: Task, Write, Edit, MultiEdit, Bash(mkdir:*), Bash(cd:*), Bash(deno:*), Bash(cargo:*), Bash(go:*), Bash(npm:*), Bash(fd:*), Bash(rg:*), Bash(gdate:*), Bash(jq:*), Bash(git:*)
name: "Prototype"
description: "Intelligent prototyping orchestrator with technology detection, rapid scaffolding, and validation automation"
author: "wcygan"
tags: ["workflow","create"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Prototype target: $ARGUMENTS
- Current directory: !`pwd`
- Existing projects: !`fd "(package\.json|Cargo\.toml|go\.mod|deno\.json|pom\.xml|build\.gradle)" . -d 2 | head -5 || echo "No existing projects detected"`
- Technology stack hints: !`echo "$ARGUMENTS" | rg -o "(rust|go|deno|node|react|vue|api|cli|web|frontend|backend)" | head -3 || echo "No technology hints in description"`
- Available tools: !`echo "deno: $(which deno >/dev/null && echo ✓ || echo ✗) | cargo: $(which cargo >/dev/null && echo ✓ || echo ✗) | go: $(which go >/dev/null && echo ✓ || echo ✗) | node: $(which node >/dev/null && echo ✓ || echo ✗)"`

## Your Task

STEP 1: Initialize intelligent prototyping session with technology detection

- CREATE session state file: `/tmp/prototype-session-$SESSION_ID.json`
- ANALYZE prototype requirements from $ARGUMENTS
- DETECT optimal technology stack based on description and available tools
- DETERMINE prototype complexity (simple proof-of-concept vs. multi-component system)

```bash
# Initialize prototyping session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "prototypeTarget": "'$ARGUMENTS'",
  "detectedTechnology": "auto-detect",
  "complexity": "simple",
  "components": [],
  "timeEstimate": "2-4 hours",
  "validationCriteria": []
}' > /tmp/prototype-session-$SESSION_ID.json
```

STEP 2: Intelligent technology stack selection and project scaffolding

TRY:

**Technology Detection Algorithm:**

```bash
# Analyze requirements and select optimal stack
determine_tech_stack() {
  local description="$ARGUMENTS"
  
  case "$description" in
    *"api"*|*"backend"*|*"service"*)
      if command -v deno >/dev/null; then
        echo "deno-fresh-api"
      elif command -v cargo >/dev/null; then
        echo "rust-axum"
      elif command -v go >/dev/null; then
        echo "go-connectrpc"
      else
        echo "node-express"
      fi
      ;;
    *"cli"*|*"tool"*|*"command"*)
      if command -v cargo >/dev/null; then
        echo "rust-clap"
      elif command -v deno >/dev/null; then
        echo "deno-cli"
      elif command -v go >/dev/null; then
        echo "go-cobra"
      else
        echo "node-commander"
      fi
      ;;
    *"web"*|*"frontend"*|*"ui"*)
      if command -v deno >/dev/null; then
        echo "deno-fresh"
      else
        echo "react-vite"
      fi
      ;;
    *"data"*|*"pipeline"*|*"processing"*)
      if command -v deno >/dev/null; then
        echo "deno-streams"
      elif command -v cargo >/dev/null; then
        echo "rust-tokio"
      else
        echo "node-streams"
      fi
      ;;
    *)
      echo "deno-general"
      ;;
  esac
}
```

**Rapid Project Scaffolding:**

CASE detected_technology:
WHEN "deno-fresh-api":

```bash
# Deno Fresh API Prototype
mkdir -p prototype-$SESSION_ID/routes/api
cd prototype-$SESSION_ID

# Initialize Deno project
deno init --lib

# Create minimal API prototype
cat > routes/api/demo.ts << 'EOF'
import { FreshContext } from "$fresh/server.ts";

interface DemoRequest {
  action: string;
  data?: any;
}

interface DemoResponse {
  success: boolean;
  result: any;
  timestamp: string;
  prototype: boolean;
}

export const handler = {
  async POST(req: Request, _ctx: FreshContext): Promise<Response> {
    try {
      const body: DemoRequest = await req.json();
      
      // Prototype logic implementation
      const result = await processPrototypeRequest(body);
      
      const response: DemoResponse = {
        success: true,
        result,
        timestamp: new Date().toISOString(),
        prototype: true
      };
      
      return Response.json(response);
    } catch (error) {
      return Response.json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        prototype: true
      }, { status: 400 });
    }
  }
};

async function processPrototypeRequest(request: DemoRequest): Promise<any> {
  // Mock implementation for rapid prototyping
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate processing
  
  return {
    processed: request.data,
    action: request.action,
    metrics: {
      processingTimeMs: 100,
      itemsProcessed: Array.isArray(request.data) ? request.data.length : 1
    }
  };
}
EOF

# Create deno.json with prototype tasks
cat > deno.json << 'EOF'
{
  "imports": {
    "$fresh/": "jsr:@fresh/core@^2.0.0-alpha.22/"
  },
  "tasks": {
    "dev": "deno run --allow-all --watch main.ts",
    "test": "deno test --allow-all",
    "proto-test": "curl -X POST http://localhost:8000/api/demo -H 'Content-Type: application/json' -d '{\"action\":\"test\",\"data\":[1,2,3]}'"
  }
}
EOF

# Create main server file
cat > main.ts << 'EOF'
import { serve } from "$fresh/server.ts";

console.log("🚀 API Prototype running on http://localhost:8000");
console.log("📊 Test endpoint: POST /api/demo");
console.log("🧪 Run tests: deno task proto-test");

await serve();
EOF
```

WHEN "rust-clap":

```bash
# Rust CLI Prototype
mkdir -p prototype-$SESSION_ID/src
cd prototype-$SESSION_ID

# Initialize Cargo project
cargo init --name prototype-cli

# Create CLI prototype with Clap
cat > src/main.rs << 'EOF'
use clap::{Parser, Subcommand};
use anyhow::{Result, Context};
use std::fs;
use std::path::PathBuf;

#[derive(Parser)]
#[command(name = "prototype")]
#[command(about = "A prototype CLI tool for testing concepts")]
#[command(version)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
    
    /// Enable verbose output
    #[arg(short, long)]
    verbose: bool,
}

#[derive(Subcommand)]
enum Commands {
    /// Process input file
    Process {
        /// Input file path
        #[arg(short, long)]
        input: PathBuf,
        
        /// Output format
        #[arg(short, long, default_value = "json")]
        format: String,
    },
    /// Generate sample data
    Generate {
        /// Number of items to generate
        #[arg(short, long, default_value = "10")]
        count: usize,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    
    match cli.command {
        Commands::Process { input, format } => {
            process_file(&input, &format, cli.verbose)
                .context("Failed to process file")?;
        }
        Commands::Generate { count } => {
            generate_data(count, cli.verbose)
                .context("Failed to generate data")?;
        }
    }
    
    Ok(())
}

fn process_file(path: &PathBuf, format: &str, verbose: bool) -> Result<()> {
    if verbose {
        println!("📂 Processing file: {}", path.display());
    }
    
    let content = fs::read_to_string(path)
        .context("Failed to read input file")?;
    
    // Prototype processing logic
    let lines: Vec<&str> = content.lines().collect();
    let word_count: usize = lines.iter()
        .map(|line| line.split_whitespace().count())
        .sum();
    
    match format.as_str() {
        "json" => {
            println!("{{");
            println!("  \"lines\": {},", lines.len());
            println!("  \"words\": {},", word_count);
            println!("  \"chars\": {},", content.len());
            println!("  \"prototype\": true");
            println!("}}");
        }
        "text" => {
            println!("Lines: {}", lines.len());
            println!("Words: {}", word_count);
            println!("Characters: {}", content.len());
        }
        _ => anyhow::bail!("Unsupported format: {}", format),
    }
    
    Ok(())
}

fn generate_data(count: usize, verbose: bool) -> Result<()> {
    if verbose {
        println!("🎲 Generating {} sample items", count);
    }
    
    println!("[");
    for i in 0..count {
        println!("  {{");
        println!("    \"id\": {},", i + 1);
        println!("    \"name\": \"Item {}\",", i + 1);
        println!("    \"value\": {},", (i + 1) * 10);
        println!("    \"timestamp\": \"{}\"", chrono::Utc::now().to_rfc3339());
        println!("  }}{}", if i < count - 1 { "," } else { "" });
    }
    println!("]");
    
    Ok(())
}
EOF

# Update Cargo.toml with dependencies
cat > Cargo.toml << 'EOF'
[package]
name = "prototype-cli"
version = "0.1.0"
edition = "2021"

[[bin]]
name = "prototype"
path = "src/main.rs"

[dependencies]
clap = { version = "4.5", features = ["derive"] }
anyhow = "1.0"
chrono = { version = "0.4", features = ["serde"] }
EOF
```

WHEN "go-connectrpc":

```bash
# Go ConnectRPC Service Prototype
mkdir -p prototype-$SESSION_ID/{cmd/server,internal/handler,proto}
cd prototype-$SESSION_ID

# Initialize Go module
go mod init prototype-service

# Create protobuf definition
cat > proto/demo.proto << 'EOF'
syntax = "proto3";

package demo.v1;

option go_package = "prototype-service/internal/gen/demo/v1;demov1";

service DemoService {
  rpc ProcessData(ProcessDataRequest) returns (ProcessDataResponse) {}
  rpc GetHealth(GetHealthRequest) returns (GetHealthResponse) {}
}

message ProcessDataRequest {
  string action = 1;
  bytes data = 2;
  map<string, string> metadata = 3;
}

message ProcessDataResponse {
  bool success = 1;
  bytes result = 2;
  int64 processing_time_ms = 3;
  string timestamp = 4;
}

message GetHealthRequest {}

message GetHealthResponse {
  string status = 1;
  string version = 2;
  int64 uptime_seconds = 3;
}
EOF

# Create service handler
cat > internal/handler/demo.go << 'EOF'
package handler

import (
    "context"
    "encoding/json"
    "time"
    
    "connectrpc.com/connect"
    demov1 "prototype-service/internal/gen/demo/v1"
)

type DemoHandler struct {
    startTime time.Time
}

func NewDemoHandler() *DemoHandler {
    return &DemoHandler{
        startTime: time.Now(),
    }
}

func (h *DemoHandler) ProcessData(
    ctx context.Context,
    req *connect.Request[demov1.ProcessDataRequest],
) (*connect.Response[demov1.ProcessDataResponse], error) {
    start := time.Now()
    
    // Prototype processing logic
    var data interface{}
    if err := json.Unmarshal(req.Msg.Data, &data); err != nil {
        return nil, connect.NewError(connect.CodeInvalidArgument, err)
    }
    
    // Mock processing
    result := map[string]interface{}{
        "action": req.Msg.Action,
        "processed": data,
        "metadata": req.Msg.Metadata,
        "prototype": true,
    }
    
    resultBytes, _ := json.Marshal(result)
    
    resp := &demov1.ProcessDataResponse{
        Success:          true,
        Result:           resultBytes,
        ProcessingTimeMs: time.Since(start).Milliseconds(),
        Timestamp:        time.Now().UTC().Format(time.RFC3339),
    }
    
    return connect.NewResponse(resp), nil
}

func (h *DemoHandler) GetHealth(
    ctx context.Context,
    req *connect.Request[demov1.GetHealthRequest],
) (*connect.Response[demov1.GetHealthResponse], error) {
    resp := &demov1.GetHealthResponse{
        Status:        "healthy",
        Version:       "prototype-v0.1.0",
        UptimeSeconds: int64(time.Since(h.startTime).Seconds()),
    }
    
    return connect.NewResponse(resp), nil
}
EOF

# Create server main
cat > cmd/server/main.go << 'EOF'
package main

import (
    "fmt"
    "log"
    "net/http"
    
    "connectrpc.com/connect"
    "golang.org/x/net/http2"
    "golang.org/x/net/http2/h2c"
    
    "prototype-service/internal/handler"
    demov1 "prototype-service/internal/gen/demo/v1"
    "prototype-service/internal/gen/demo/v1/demov1connect"
)

func main() {
    demoHandler := handler.NewDemoHandler()
    
    mux := http.NewServeMux()
    path, handler := demov1connect.NewDemoServiceHandler(demoHandler)
    mux.Handle(path, handler)
    
    fmt.Println("🚀 ConnectRPC Prototype Service running on :8080")
    fmt.Println("🔗 Service endpoints:")
    fmt.Println("  - POST /demo.v1.DemoService/ProcessData")
    fmt.Println("  - POST /demo.v1.DemoService/GetHealth")
    
    log.Fatal(http.ListenAndServe(
        ":8080",
        h2c.NewHandler(mux, &http2.Server{}),
    ))
}
EOF
```

STEP 3: Prototype validation and testing infrastructure

**Automated Testing Setup:**

```bash
# Create comprehensive test suite for prototype
create_test_suite() {
  case "$detected_technology" in
    "deno-"*)
      cat > test_prototype.ts << 'EOF'
import { assertEquals, assertExists } from "@std/assert";

Deno.test("Prototype API functionality", async (t) => {
  await t.step("health check", async () => {
    const response = await fetch("http://localhost:8000/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "health", data: null })
    });
    
    assertEquals(response.status, 200);
    const data = await response.json();
    assertEquals(data.success, true);
    assertExists(data.timestamp);
  });
  
  await t.step("data processing", async () => {
    const testData = [1, 2, 3, 4, 5];
    const response = await fetch("http://localhost:8000/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "process", data: testData })
    });
    
    const result = await response.json();
    assertEquals(result.success, true);
    assertEquals(result.result.processed, testData);
  });
});
EOF
      ;;
    "rust-"*)
      cat > tests/integration.rs << 'EOF'
use assert_cmd::Command;
use predicates::prelude::*;
use std::fs;
use tempfile::NamedTempFile;

#[test]
fn test_process_command() {
    let mut file = NamedTempFile::new().unwrap();
    writeln!(file, "Hello world\nThis is a test").unwrap();
    
    let mut cmd = Command::cargo_bin("prototype").unwrap();
    cmd.args(&["process", "--input", file.path().to_str().unwrap()])
        .assert()
        .success()
        .stdout(predicate::str::contains("lines"))
        .stdout(predicate::str::contains("words"));
}

#[test]
fn test_generate_command() {
    let mut cmd = Command::cargo_bin("prototype").unwrap();
    cmd.args(&["generate", "--count", "3"])
        .assert()
        .success()
        .stdout(predicate::str::contains("\"id\": 1"))
        .stdout(predicate::str::contains("\"id\": 3"));
}
EOF
      ;;
  esac
}
```

STEP 4: Performance metrics and validation criteria

**Prototype Benchmarking:**

```bash
# Create performance measurement tools
create_benchmark_suite() {
  echo "⚡ Setting up performance benchmarks..."
  
  # API endpoint benchmarking
  if [[ "$detected_technology" == *"api"* ]]; then
    cat > benchmark_api.sh << 'EOF'
#!/bin/bash
echo "🔥 API Performance Benchmark"
echo "Testing endpoint: http://localhost:8000/api/demo"

# Warmup
curl -s -X POST http://localhost:8000/api/demo \
  -H "Content-Type: application/json" \
  -d '{"action":"warmup","data":null}' > /dev/null

# Benchmark
echo "📊 Running 100 requests..."
start_time=$(date +%s%N)

for i in {1..100}; do
  curl -s -X POST http://localhost:8000/api/demo \
    -H "Content-Type: application/json" \
    -d "{\"action\":\"test\",\"data\":$i}" > /dev/null
done

end_time=$(date +%s%N)
total_time_ms=$(( (end_time - start_time) / 1000000 ))
avg_time_ms=$(( total_time_ms / 100 ))

echo "✅ Results:"
echo "  Total time: ${total_time_ms}ms"
echo "  Average response time: ${avg_time_ms}ms"
echo "  Requests per second: $(( 100000 / avg_time_ms ))"
EOF
    chmod +x benchmark_api.sh
  fi
}
```

STEP 5: Documentation and usage guide generation

**Automated Documentation:**

```bash
# Generate comprehensive prototype documentation
cat > PROTOTYPE.md << EOF
# Prototype: $ARGUMENTS

**Status:** ✅ Working Prototype  
**Technology Stack:** \$detected_technology  
**Build Time:** \$(date -Iseconds)  
**Session ID:** $SESSION_ID

## Quick Start

\`\`\`bash
# Clone prototype
git clone [prototype-repo] prototype-$SESSION_ID
cd prototype-$SESSION_ID

# Install dependencies and run
\$installation_commands

# Test functionality
\$test_commands
\`\`\`

## What Works

- ✅ Core functionality implemented
- ✅ Basic error handling and validation
- ✅ Automated testing suite
- ✅ Performance benchmarking
- ✅ API documentation (if applicable)

## Current Limitations

- ⚠️ Prototype-level error handling only
- ⚠️ In-memory storage (no persistence)
- ⚠️ Limited input validation
- ⚠️ No authentication/authorization
- ⚠️ Basic logging implementation

## Performance Metrics

- **Response Time:** < 100ms (average)
- **Throughput:** 1000+ requests/second
- **Memory Usage:** < 50MB
- **Build Time:** < 30 seconds

## Architecture Decisions

- **Chosen Stack:** Optimized for rapid development and testing
- **Trade-offs:** Prioritized speed over production-readiness
- **Dependencies:** Minimal external dependencies for reliability

## Next Steps for Production

1. **Add Authentication:** Implement JWT or OAuth2
2. **Add Persistence:** Database integration and migrations
3. **Error Handling:** Comprehensive error handling and recovery
4. **Monitoring:** Structured logging, metrics, and alerting
5. **Security:** Input validation, rate limiting, HTTPS
6. **Documentation:** API documentation and user guides
7. **Testing:** Comprehensive unit, integration, and e2e tests
8. **Deployment:** Container packaging and orchestration

## Key Learnings

- **Technical Insights:** [Discovered during implementation]
- **Performance Characteristics:** [Measured bottlenecks and optimizations]
- **Architecture Patterns:** [Effective patterns for this use case]
- **Risk Assessment:** [Potential production challenges identified]

## Prototype Validation

\`\`\`bash
# Run validation suite
\$validation_commands

# Expected output:
# ✅ All core features functional
# ✅ Performance targets met
# ✅ Error handling working
# ⚠️ Production readiness: 40%
\`\`\`

EOF
```

CATCH (prototype_creation_failed):

- LOG detailed error information to session state
- PROVIDE alternative technology stacks
- SUGGEST manual prototype creation steps
- SAVE partial progress for continuation

```bash
echo "❌ Prototype creation encountered issues. Troubleshooting:"
echo "  1. Verify required tools are installed and accessible"
echo "  2. Check internet connectivity for dependency downloads"
echo "  3. Ensure sufficient disk space for project creation"
echo "  4. Review error logs in session state file"
echo "💡 Alternative approaches:"
echo "  - Try different technology stack"
echo "  - Create minimal manual prototype"
echo "  - Use online prototype platforms"
```

STEP 6: Session state management and completion reporting

**Finalize Prototype Session:**

```bash
# Update session state with results
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" \
   --arg tech "$detected_technology" \
   --arg status "completed" '
  .completedAt = $timestamp |
  .selectedTechnology = $tech |
  .status = $status |
  .deliverables = [
    "Working prototype application",
    "Automated test suite", 
    "Performance benchmarks",
    "Documentation and usage guide",
    "Next steps roadmap"
  ]
' /tmp/prototype-session-$SESSION_ID.json > /tmp/prototype-session-$SESSION_ID.tmp && \
mv /tmp/prototype-session-$SESSION_ID.tmp /tmp/prototype-session-$SESSION_ID.json
```

FINALLY:

- SAVE all prototype artifacts to organized directory structure
- PROVIDE clear instructions for testing and validation
- GENERATE production roadmap with concrete next steps
- ARCHIVE session state for future reference

**Prototype Session Summary:**

```bash
echo "🎉 Prototype completed successfully!"
echo "📦 Project: $ARGUMENTS"
echo "🛠️ Technology: $detected_technology"
echo "📂 Location: prototype-$SESSION_ID/"
echo "⏱️ Session: $SESSION_ID"
echo ""
echo "🚀 Quick Start Commands:"
echo "  cd prototype-$SESSION_ID"
echo "  $start_command"
echo ""
echo "🧪 Validation:"
echo "  $test_command"
echo ""
echo "📊 Performance:"
echo "  $benchmark_command"
echo ""
echo "📋 Next Steps:"
echo "  1. Review PROTOTYPE.md for detailed information"
echo "  2. Run validation tests to verify functionality"
echo "  3. Use prototype to validate hypotheses"
echo "  4. Plan production implementation roadmap"
```

## Prototype Strategy Framework

### Time-Boxed Development

- **Duration:** 2-4 hours maximum
- **Focus:** Single core feature or concept validation
- **Scope:** Happy path implementation only
- **Quality:** Functional over perfect

### Technology Selection Criteria

1. **Developer Familiarity:** Use known tools for speed
2. **Tool Availability:** Leverage installed development environment
3. **Iteration Speed:** Prioritize fast feedback loops
4. **Concept Alignment:** Match technology to problem domain

### Validation Methodology

- **Functional Testing:** Core feature works end-to-end
- **Performance Testing:** Basic performance characteristics
- **Usability Testing:** Interface is intuitive and responsive
- **Technical Feasibility:** No major implementation blockers

### Success Metrics

- ✅ **Proof of Concept:** Core hypothesis validated
- ✅ **Technical Feasibility:** Implementation path clear
- ✅ **Performance Baseline:** Acceptable response times
- ✅ **User Experience:** Basic workflow functional
- ✅ **Learning Objectives:** Key insights captured

This intelligent prototyping command adapts to your requirements, automatically selects optimal technology stacks, provides comprehensive validation, and delivers production-ready roadmaps for successful concept validation.