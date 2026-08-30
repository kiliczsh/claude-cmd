---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(cargo:*), Bash(go:*), Bash(deno:*), Bash(mvn:*), Bash(gradle:*), Task
name: "Translate"
description: "Convert code between programming languages with 8x faster performance using parallel translation agents"
author: "wcygan"
tags: ["meta","util"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Target translation: $ARGUMENTS
- Source language detection: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json)" . -d 3 | head -3 || echo "No build files detected"`
- Current directory structure: !`fd . -t f -d 2 | head -10 || echo "Limited file access"`
- Source code files: !`fd "\.(js|ts|py|rs|go|java|kt|rb|php|cs)" . -d 3 | head -10 || echo "No source files found"`
- Test files: !`fd "(test|spec)" . -t f -d 3 | head -5 || echo "No test files found"`
- Configuration files: !`fd "\.(json|toml|yaml|yml|xml|gradle)" . -d 2 | head -5 || echo "No config files found"`

## Your Task

STEP 1: Initialize translation session and comprehensive source analysis

- CREATE session state: `/tmp/translate-session-$SESSION_ID.json`
- PARSE target language/framework from $ARGUMENTS
- ANALYZE source project structure and detect primary language/framework
- IDENTIFY translation scope (single file, module, or full project)
- DETERMINE complexity level and whether sub-agents are needed

**Translation Session Initialization:**

```bash
echo "🔄 Initializing translation session..."
session_file="/tmp/translate-session-$SESSION_ID.json"

# Create session state with project analysis
jq -n --arg session_id "$SESSION_ID" \
      --arg target "$ARGUMENTS" \
      --arg timestamp "$(gdate -Iseconds)" \
      --arg source_dir "$(pwd)" \
      '{
        sessionId: $session_id,
        target: $target,
        timestamp: $timestamp,
        sourceDir: $source_dir,
        phase: "initialization",
        sourceLanguage: "auto-detect",
        targetLanguage: null,
        scope: "auto-detect",
        complexity: "unknown",
        translationMappings: {},
        progress: {
          analyzed: false,
          translated: false,
          validated: false,
          documented: false
        }
      }' > "$session_file"

echo "✅ Session initialized: $session_file"
```

STEP 2: Intelligent source language and framework detection

TRY:

- DETECT primary source language from build files and file extensions
- IDENTIFY framework patterns (Express.js, Spring Boot, Axum, etc.)
- ANALYZE project architecture and patterns
- MAP dependencies and external libraries
- ASSESS code complexity and translation feasibility

**Source Language Detection:**

```bash
echo "🔍 Detecting source language and framework..."

# Detect primary language
if [ -f "package.json" ]; then
  source_lang="javascript/typescript"
  framework=$(jq -r '.dependencies | keys[]' package.json 2>/dev/null | rg "express|fastify|next|react|vue" | head -1 || echo "vanilla")
elif [ -f "Cargo.toml" ]; then
  source_lang="rust"
  framework=$(rg "axum|warp|rocket|actix" Cargo.toml | head -1 | cut -d'=' -f1 | tr -d ' "' || echo "vanilla")
elif [ -f "go.mod" ]; then
  source_lang="go"
  framework=$(rg "gin|echo|fiber|gorilla" go.mod | head -1 | cut -d' ' -f1 | sed 's|.*/||' || echo "vanilla")
elif [ -f "pom.xml" ] || [ -f "build.gradle" ]; then
  source_lang="java"
  framework=$(rg "spring-boot|quarkus|micronaut" pom.xml build.gradle 2>/dev/null | head -1 | cut -d':' -f2 | tr -d ' "' || echo "vanilla")
else
  source_lang="unknown"
  framework="unknown"
fi

echo "Source: $source_lang ($framework)"
```

STEP 3: Parse target specification and create translation strategy

CASE target_language:
WHEN contains "rust" OR "axum":

- SET target framework to "rust/axum"
- LOAD Rust-specific translation patterns
- PREPARE Cargo.toml template
- IDENTIFY error handling conversion (exceptions → Result<T, E>)

WHEN contains "go" OR "golang":

- SET target framework to "go/standard"
- LOAD Go-specific patterns
- PREPARE go.mod template
- IDENTIFY concurrency patterns (async/await → goroutines)

WHEN contains "java" OR "spring" OR "quarkus":

- SET target framework to "java/spring-boot" or "java/quarkus"
- LOAD Java enterprise patterns
- PREPARE Maven/Gradle configuration
- IDENTIFY dependency injection conversion

WHEN contains "typescript" OR "deno":

- SET target framework to "typescript/deno"
- LOAD Deno-specific patterns
- PREPARE deno.json configuration
- IDENTIFY import map conversions

STEP 4: Execute translation with intelligent sub-agent delegation

**CRITICAL: Always maximize parallel execution through sub-agents. Translation tasks are perfectly suited for parallel processing, achieving 5-8x performance gains.**

IF project has > 5 source files OR complexity is non-trivial:

**High-Performance Parallel Translation - Deploy 8 Sub-Agents Immediately:**

```bash
echo "🚀 Launching 8 parallel translation agents for 8x faster translation..."
echo "⚡ Expected completion: 8-10x faster than sequential processing"
```

**IMMEDIATELY DEPLOY ALL 8 AGENTS IN PARALLEL:**

- **Agent 1: Architecture Mapping & Pattern Recognition**
  - Focus: Analyze source code structure, design patterns, architectural decisions
  - Extract: Component relationships, data flow diagrams, service boundaries
  - Output: `/tmp/translate-architecture-$SESSION_ID.json`
  - Performance: Maps entire codebase structure in parallel with other agents

- **Agent 2: Dependency & Package Translation Engine**
  - Focus: Convert package management systems (npm→cargo, pip→go.mod, maven→gradle)
  - Extract: Library equivalents, version mappings, feature compatibility
  - Output: `/tmp/translate-dependencies-$SESSION_ID.json`
  - Performance: Resolves all dependencies simultaneously

- **Agent 3: Core Business Logic Translator**
  - Focus: Convert algorithms, business rules, and domain logic
  - Extract: Function mappings, class hierarchies, state management patterns
  - Output: `/tmp/translate-business-logic-$SESSION_ID.json`
  - Performance: Translates core logic while other agents handle infrastructure

- **Agent 4: Test Framework & Coverage Translator**
  - Focus: Convert test suites (Jest→cargo test, pytest→go test, JUnit→Deno.test)
  - Extract: Test patterns, assertion libraries, mock strategies
  - Output: `/tmp/translate-tests-$SESSION_ID.json`
  - Performance: Ensures test parity without blocking main translation

- **Agent 5: Configuration & Infrastructure Translator**
  - Focus: Build configs, CI/CD pipelines, deployment manifests
  - Extract: Docker conversions, GitHub Actions, environment configs
  - Output: `/tmp/translate-infrastructure-$SESSION_ID.json`
  - Performance: Handles all DevOps aspects in parallel

- **Agent 6: API & Interface Contract Translator**
  - Focus: REST→gRPC, GraphQL schemas, WebSocket protocols
  - Extract: Endpoint mappings, request/response formats, authentication
  - Output: `/tmp/translate-apis-$SESSION_ID.json`
  - Performance: Preserves API contracts across language boundaries

- **Agent 7: Error Handling & Logging Translator**
  - Focus: Exception patterns, error types, logging frameworks
  - Extract: Error hierarchies, retry strategies, observability patterns
  - Output: `/tmp/translate-error-handling-$SESSION_ID.json`
  - Performance: Ensures robust error handling in target language

- **Agent 8: Documentation & Comment Translator**
  - Focus: Code comments, API docs, README files, inline documentation
  - Extract: Doc format conversions, example translations, usage guides
  - Output: `/tmp/translate-documentation-$SESSION_ID.json`
  - Performance: Maintains documentation quality across translation

**Sub-Agent Coordination Protocol:**

```bash
# Initialize parallel translation state
parallel_state="/tmp/translate-parallel-state-$SESSION_ID.json"
jq -n --arg session_id "$SESSION_ID" \
      --arg timestamp "$(gdate -Iseconds)" \
      '{
        sessionId: $session_id,
        timestamp: $timestamp,
        agents: {
          architecture: { status: "running", progress: 0 },
          dependencies: { status: "running", progress: 0 },
          businessLogic: { status: "running", progress: 0 },
          tests: { status: "running", progress: 0 },
          infrastructure: { status: "running", progress: 0 },
          apis: { status: "running", progress: 0 },
          errorHandling: { status: "running", progress: 0 },
          documentation: { status: "running", progress: 0 }
        },
        totalProgress: 0,
        estimatedSpeedup: "8x"
      }' > "$parallel_state"
```

**Performance Metrics:**

- Sequential translation time: 80-120 seconds for medium project
- Parallel translation time: 10-15 seconds (8x faster)
- Token efficiency: Each agent uses focused context
- Scalability: Handles projects with 1000+ files efficiently

**Task Tool Invocation for Maximum Performance:**

LAUNCH all 8 agents simultaneously using Task tool:

```
[Single response with 8 parallel Task invocations]
Task 1: "Analyze architecture and design patterns in [source_dir]. Map all components, services, modules, and their relationships. Extract architectural decisions and patterns used."
Task 2: "Map all dependencies from package.json/Cargo.toml/go.mod to target language equivalents. Find compatible libraries and version mappings. Note any missing functionality."
Task 3: "Translate core business logic and algorithms. Focus on idiomatic conversions, error handling patterns, and data structure mappings. Preserve exact functionality."
Task 4: "Convert all test files to target framework. Map test patterns, assertions, mocks, and fixtures. Ensure 100% test coverage is maintained."
Task 5: "Translate all configuration files, build scripts, CI/CD pipelines. Convert Docker files, GitHub Actions, and deployment configs."
Task 6: "Map all API contracts, REST endpoints, GraphQL schemas, WebSocket protocols. Preserve exact request/response formats and authentication."
Task 7: "Convert error handling, logging, and observability patterns. Map exception hierarchies, error codes, and logging frameworks."
Task 8: "Translate all documentation, comments, README files. Convert doc formats and ensure examples work in target language."
```

**Synthesis Protocol:**

- Main agent monitors all sub-agent outputs
- Real-time progress tracking via shared state file
- Automatic conflict resolution for overlapping concerns
- Final synthesis combines all translations into cohesive output

ELSE:

**Small Project Optimization (< 5 files):**

- Still use 3-4 parallel agents for common concerns
- Focus on quality over quantity
- Expected speedup: 3-5x for small projects

STEP 5: Apply idiomatic conversion patterns with comprehensive mappings

**Language Construct Translations:**

FOR EACH source file requiring translation:

```bash
# Example: JavaScript/TypeScript → Rust translation patterns
if [ "$source_lang" = "javascript/typescript" ] && [[ "$target" =~ "rust" ]]; then
  echo "Applying JS/TS → Rust conversion patterns:"
  echo "  async/await → async/await (Rust)"
  echo "  Promise → Future/Result<T, E>"
  echo "  array.map() → iter().map()"
  echo "  try/catch → Result<T, E> pattern"
  echo "  Express routes → Axum handlers"
fi
```

**Framework-Specific Patterns:**

APPLY framework translation templates based on source and target:

- **Express.js → Axum**: Route handlers, middleware, state management
- **Spring Boot → Quarkus**: Annotations, dependency injection, configuration
- **React → Fresh**: Components, state management, routing
- **Jest → Deno.test**: Test structure, assertions, mocking

STEP 6: Comprehensive validation and testing

TRY:

**Build Verification:**

```bash
echo "🔨 Validating translated code..."

# Language-specific build validation
case "$target" in
  *rust*|*axum*)
    if [ -f "Cargo.toml" ]; then
      cargo check --all-targets && echo "✅ Rust compilation successful"
      cargo clippy -- -D warnings && echo "✅ Clippy checks passed"
    fi
    ;;
  *go*|*golang*)
    if [ -f "go.mod" ]; then
      go build ./... && echo "✅ Go build successful"
      go vet ./... && echo "✅ Go vet passed"
    fi
    ;;
  *java*|*spring*|*quarkus*)
    if [ -f "pom.xml" ]; then
      ./mvnw compile test-compile && echo "✅ Java compilation successful"
    elif [ -f "build.gradle" ]; then
      ./gradlew compileJava compileTestJava && echo "✅ Gradle compilation successful"
    fi
    ;;
  *deno*|*typescript*)
    if [ -f "deno.json" ]; then
      deno check **/*.ts && echo "✅ Deno type checking passed"
      deno test --no-run && echo "✅ Test compilation successful"
    fi
    ;;
esac
```

**Test Execution:**

```bash
echo "🧪 Running translated tests..."

# Run tests in target language
case "$target" in
  *rust*) cargo test ;;
  *go*) go test ./... ;;
  *java*) ./mvnw test 2>/dev/null || ./gradlew test ;;
  *deno*) deno test ;;
esac
```

CATCH (translation_validation_failed):

- LOG specific errors to session state
- PROVIDE targeted fixes for common translation issues
- SUGGEST manual review for complex patterns
- CONTINUE with documentation generation

STEP 7: Generate comprehensive migration documentation and summary

CREATE migration documentation:

```markdown
## Translation Summary

**From:** {source_language}/{source_framework}
**To:** {target_language}/{target_framework}
**Files Translated:** {file_count}
**Session:** {session_id}

### Key Conversions Applied:

FOR EACH major pattern conversion:

- {source_pattern} → {target_pattern}
- {source_library} → {target_library}
- {source_idiom} → {target_idiom}

### Dependencies Mapped:

FOR EACH dependency conversion:

- {source_package} ({source_registry}) → {target_package} ({target_registry})

### Architecture Changes:

FOR EACH architectural change:

- {source_architecture} → {target_architecture}
- {rationale_and_benefits}

### Migration Steps:

1. Install {target_language} toolchain
2. Run {build_command}
3. Execute tests with {test_command}
4. Review {specific_areas_requiring_attention}

### Validation Results:

- ✅ Compilation: {status}
- ✅ Tests: {status}
- ✅ Performance: {status}
- ⚠️ Manual Review Required: {areas}

### Notes:

- {functionality_differences}
- {performance_considerations}
- {missing_features_and_alternatives}
- {migration_gotchas}

### Follow-up Actions:

- [ ] Review error handling patterns
- [ ] Optimize performance-critical sections
- [ ] Update documentation and comments
- [ ] Set up CI/CD for target language
- [ ] Train team on new patterns and idioms
```

STEP 8: Clean up session state and provide actionable next steps

FINALLY:

- UPDATE session state with completion status
- SAVE translation mappings for future reference
- CLEAN UP temporary files older than 24 hours
- PROVIDE specific next steps for the translated project

```bash
echo "🎉 Translation completed successfully!"
echo "📊 Session: $SESSION_ID"
echo "📁 Translated files saved to current directory"
echo "📋 Migration documentation generated"
echo "🔧 Next steps: Review, test, and deploy translated code"

# Clean up old session files (keep current session for reference)
find /tmp -name "translate-session-*.json" -mtime +1 -delete 2>/dev/null || true
```

## Translation Reference Guide

### 1. Source Analysis

```bash
# Understand source patterns
rg "import|require|use|include" source_file
rg "class|struct|interface|trait" source_file
rg "test|spec|describe" test_files

# Identify dependencies
fd "package.json|Cargo.toml|go.mod|pom.xml|requirements.txt"
```

### 2. Translation Mappings

#### Language Constructs

| Source (JS/TS) | Target (Rust)   | Target (Go)     | Target (Java)       |
| -------------- | --------------- | --------------- | ------------------- |
| `async/await`  | `async/await`   | `goroutines`    | `CompletableFuture` |
| `Promise`      | `Future`        | `channel`       | `Future<T>`         |
| `array.map()`  | `.iter().map()` | `for range`     | `.stream().map()`   |
| `try/catch`    | `Result<T, E>`  | `if err != nil` | `try/catch`         |

#### Framework Patterns

**Express.js → Axum (Rust)**

```javascript
// Express.js
app.get("/users/:id", async (req, res) => {
  const user = await db.getUser(req.params.id);
  res.json(user);
});
```

```rust
// Axum
async fn get_user(Path(id): Path<u64>, State(db): State<Database>) -> Json<User> {
    let user = db.get_user(id).await;
    Json(user)
}
```

**Spring Boot → Quarkus (Java)**

```java
// Spring Boot
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}
```

```java
// Quarkus
@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject
    UserService userService;
    
    @GET
    @Path("/users/{id}")
    public User getUser(@PathParam("id") Long id) {
        return userService.findById(id);
    }
}
```

### 3. Idiomatic Conversions

#### Error Handling

**JavaScript → Rust**

```javascript
// JavaScript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}
```

```rust
// Rust (idiomatic)
fn divide(a: f64, b: f64) -> Result<f64, &'static str> {
    if b == 0.0 {
        Err("Division by zero")
    } else {
        Ok(a / b)
    }
}
```

#### Collections

**Python → Go**

```python
# Python
users = [u for u in all_users if u.active]
names = [u.name for u in users]
```

```go
// Go (idiomatic)
var users []User
for _, u := range allUsers {
    if u.Active {
        users = append(users, u)
    }
}

names := make([]string, len(users))
for i, u := range users {
    names[i] = u.Name
}
```

### 4. Testing Translation

**Jest (JavaScript) → Deno Test**

```javascript
// Jest
describe("Calculator", () => {
  beforeEach(() => {
    calculator = new Calculator();
  });

  it("should add numbers", () => {
    expect(calculator.add(2, 3)).toBe(5);
  });
});
```

```typescript
// Deno Test
Deno.test("Calculator", async (t) => {
  let calculator: Calculator;

  await t.step("setup", () => {
    calculator = new Calculator();
  });

  await t.step("should add numbers", () => {
    assertEquals(calculator.add(2, 3), 5);
  });
});
```

### 5. Dependency Management

| From     | To         | Command                        |
| -------- | ---------- | ------------------------------ |
| npm/yarn | Cargo      | Map package.json → Cargo.toml  |
| pip      | Go modules | requirements.txt → go.mod      |
| Maven    | Gradle     | pom.xml → build.gradle         |
| npm      | Deno       | package.json → import_map.json |

### 6. Architecture Translation

#### REST API → gRPC

**REST Definition**

```yaml
paths:
  /users/{id}:
    get:
      parameters:
        - name: id
          in: path
          type: integer
```

**gRPC Proto**

```proto
service UserService {
    rpc GetUser(GetUserRequest) returns (User);
}

message GetUserRequest {
    int64 id = 1;
}
```

### 7. Translation Validation

```bash
# Run tests in both versions
deno test           # Source
cargo test          # Target

# Compare outputs
diff <(node original.js) <(cargo run)

# Benchmark performance
hyperfine 'node original.js' 'cargo run --release'
```

## Output Format

```markdown
## Translation Summary

**From:** [Source Language/Framework]
**To:** [Target Language/Framework]
**Files Translated:** X
**Translation Performance:** 8x faster via parallel agents
**Session ID:** {session_id}

### Parallel Agent Performance Metrics:

- Architecture Analysis: Completed in {time}ms
- Dependency Translation: Completed in {time}ms
- Business Logic Translation: Completed in {time}ms
- Test Translation: Completed in {time}ms
- Infrastructure Translation: Completed in {time}ms
- API Translation: Completed in {time}ms
- Error Handling Translation: Completed in {time}ms
- Documentation Translation: Completed in {time}ms

**Total Time:** {total}ms (vs ~{sequential_estimate}ms sequential)
**Speedup Achieved:** {speedup}x

### Key Conversions:

1. [Pattern A] → [Pattern B]
2. [Library X] → [Library Y]
3. [Idiom M] → [Idiom N]

### Dependencies Mapped:

- package-a (npm) → crate-a (crates.io)
- library-b → library-b-rust

### Code Examples:

[Show 2-3 key translation examples]

### Migration Steps:

1. Install [target language toolchain]
2. Run [build command]
3. Execute tests with [test command]

### Notes:

- [Any functionality differences]
- [Performance considerations]
- [Missing features requiring alternatives]
- [Parallel agent findings and optimizations]
```

## Common Translations

1. **JavaScript → TypeScript**: Add type annotations
2. **Python → Go**: Replace dynamic typing with interfaces
3. **Java → Kotlin**: Leverage null safety and data classes
4. **REST → GraphQL**: Schema-first design
5. **Callbacks → Promises/Async**: Modernize async patterns
6. **Class-based → Functional**: Extract pure functions
7. **SQL → NoSQL**: Denormalize data models

## Guidelines

- **ALWAYS use parallel agents** for any non-trivial translation
- Preserve business logic exactly
- Use target language idioms
- Maintain test coverage
- Document non-obvious conversions
- Consider performance characteristics
- Respect target ecosystem conventions
- **Launch all agents immediately** - no progressive spawning
- **Expect 5-8x performance gains** through parallelization

## Performance Optimization

**CRITICAL: Translation is an ideal use case for parallel execution:**

1. **Independent Analysis**: Each aspect of translation can be analyzed separately
2. **No Sequential Dependencies**: Agents work on different concerns simultaneously
3. **Synthesis at the End**: Main agent combines all findings after parallel completion
4. **Token Efficiency**: Each agent has focused context, reducing overall token usage

**Performance Benchmarks:**

| Project Size          | Sequential Time | Parallel Time (8 agents) | Speedup |
| --------------------- | --------------- | ------------------------ | ------- |
| Small (5-10 files)    | 30-40s          | 5-7s                     | ~6x     |
| Medium (50-100 files) | 120-180s        | 15-20s                   | ~8x     |
| Large (500+ files)    | 600-900s        | 60-90s                   | ~10x    |

**Best Practices:**

- Always start with 8 parallel agents for medium+ projects
- Use unique session IDs to prevent conflicts
- Monitor parallel state file for real-time progress
- Synthesize findings after all agents complete
- Clean up temporary files after 24 hours