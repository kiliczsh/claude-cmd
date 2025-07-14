---
allowed-tools: Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(git:*), Task
name: "Refactor"
description: "Ultra-fast parallel refactoring analysis with 8-10x speedup through concurrent smell detection and intelligent improvement strategies"
author: "wcygan"
tags: ["code","refactor"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "session-$(date +%s)000000000"`
- Current directory: !`pwd`
- Target: $ARGUMENTS
- Project structure: !`fd . -t d -d 3 | head -15 || echo "No directory structure detected"`
- Code files: !`fd "\.(java|go|rs|py|ts|js|cpp|c|kt|scala|rb|php|cs|swift)$" . | wc -l | tr -d ' ' || echo "0"`
- Test files: !`fd "(test|spec)" . -t f | wc -l | tr -d ' ' || echo "0"`
- Large files: !`fd "\.(java|go|rs|py|ts|js|cpp|c)$" . -x wc -l {} \; 2>/dev/null | awk '{if($1>500) count++} END {print count+0}' || echo "0"`
- Technology stack: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|requirements\.txt|composer\.json)" . | head -5 || echo "No project files detected"`
- Dependencies: !`rg "(import|require|use|include)" . --type java --type go --type rust --type python --type typescript | wc -l | tr -d ' ' || echo "0"`
- Git status: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`
- Recent commits: !`git log --oneline -3 2>/dev/null || echo "No git history"`

## Your Task

**CRITICAL: Maximize parallel execution for 8-10x faster refactoring analysis. Sequential processing is obsolete.**

Think deeply about optimal refactoring strategies for this codebase. Consider maintainability, performance, and architectural patterns.

STEP 1: Initialize refactoring session

- CREATE session state file: `/tmp/refactor-analysis-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "target": "$ARGUMENTS",
    "phase": "discovery",
    "language": "auto-detect",
    "smells": [],
    "refactorings": [],
    "priority_order": [],
    "test_coverage": null,
    "checkpoints": []
  }
  ```

STEP 2: Determine analysis scope and approach

Think harder about the optimal analysis strategy based on codebase complexity and architectural depth.

IF $ARGUMENTS is directory AND contains >100 files:

- USE sub-agent delegation for parallel analysis
- SET scope to "comprehensive"
- CREATE inter-agent communication files: `/tmp/refactor-agents-$SESSION_ID/`
  ELSE IF $ARGUMENTS is single large file (>1000 lines):
- USE extended thinking for complex architectural analysis
- SET scope to "deep"
- ENABLE ultrathink mode for intricate dependency analysis
  ELSE:
- PERFORM focused sequential analysis
- SET scope to "targeted"
- USE extended thinking for critical refactoring decisions

STEP 3: Ultra-fast parallel code smell detection

**IMMEDIATELY DEPLOY 10 PARALLEL AGENTS** for instant comprehensive refactoring analysis:

[Launch ALL agents simultaneously - NO sequential execution]

Task 1: **Architectural Smell Detection Agent**

- Find god classes, feature envy, inappropriate intimacy
- Map cyclic dependencies and layering violations
- Identify monolithic structures needing decomposition
- Detect misplaced responsibilities and SRP violations
- Output: `/tmp/refactor-agents-$SESSION_ID/architectural-smells.json`

Task 2: **Code Duplication Hunter Agent**

- Detect exact and near-duplicate code blocks
- Find structural duplication patterns across modules
- Identify copy-paste inheritance and template patterns
- Calculate duplication hotspots and impact scores
- Output: `/tmp/refactor-agents-$SESSION_ID/duplication-analysis.json`

Task 3: **Complexity Analyzer Agent**

- Calculate cyclomatic complexity for all methods
- Identify deeply nested code blocks and conditionals
- Find methods exceeding cognitive complexity thresholds
- Detect complex boolean expressions needing simplification
- Output: `/tmp/refactor-agents-$SESSION_ID/complexity-metrics.json`

Task 4: **Type Safety Auditor Agent**

- Scan for weak typing and missing type annotations
- Identify unsafe casts and type coercions
- Find null/undefined handling issues
- Detect generic type inconsistencies
- Output: `/tmp/refactor-agents-$SESSION_ID/type-safety-report.json`

Task 5: **Performance Bottleneck Agent**

- Identify O(n²) algorithms and inefficient loops
- Find memory leaks and resource management issues
- Detect N+1 queries and database inefficiencies
- Analyze collection usage and data structure choices
- Output: `/tmp/refactor-agents-$SESSION_ID/performance-bottlenecks.json`

Task 6: **Design Pattern Violation Agent**

- Detect anti-patterns (singleton abuse, anemic models)
- Find missing design patterns opportunities
- Identify SOLID principle violations
- Check for proper abstraction levels
- Output: `/tmp/refactor-agents-$SESSION_ID/pattern-violations.json`

Task 7: **Test Quality Inspector Agent**

- Analyze test coverage gaps and blind spots
- Find brittle tests and flaky test patterns
- Identify missing edge case coverage
- Detect test code smells and duplication
- Output: `/tmp/refactor-agents-$SESSION_ID/test-quality-report.json`

Task 8: **Dependency Analysis Agent**

- Map internal and external dependencies
- Identify tightly coupled modules
- Find unused dependencies and imports
- Detect dependency version conflicts
- Output: `/tmp/refactor-agents-$SESSION_ID/dependency-analysis.json`

Task 9: **Security Smell Detection Agent**

- Find hardcoded credentials and secrets
- Identify injection vulnerabilities
- Detect insecure random generation
- Check for missing input validation
- Output: `/tmp/refactor-agents-$SESSION_ID/security-smells.json`

Task 10: **Documentation Debt Agent**

- Find undocumented public APIs
- Identify outdated or misleading comments
- Detect missing architectural documentation
- Analyze code-to-documentation ratio
- Output: `/tmp/refactor-agents-$SESSION_ID/documentation-debt.json`

**CRITICAL PERFORMANCE METRICS:**

- Sequential analysis time: 50-80 seconds
- Parallel analysis time: 5-8 seconds
- Expected speedup: 10x faster
- All agents execute concurrently with zero dependencies

**SYNTHESIS AFTER PARALLEL COMPLETION:**

- Aggregate all agent findings
- Cross-reference issues across domains
- Generate unified refactoring priority matrix
- Create comprehensive improvement roadmap

FOR targeted scope:

- EXECUTE sequential analysis:
  - Language detection and context setup
  - Code smell identification
  - Complexity metrics calculation
  - Test coverage assessment

STEP 4: Language-specific smell detection

CASE detected language:
WHEN "java":

- ANALYZE for anemic domain models, god objects
- CHECK excessive static method usage
- IDENTIFY primitive obsession patterns
- REVIEW inheritance vs composition opportunities

WHEN "go":

- SCAN for empty interfaces (interface{})
- CHECK for goroutine leaks and missing error handling
- IDENTIFY package dependency cycles
- REVIEW struct size and method organization

WHEN "rust":

- ANALYZE Rc/RefCell overuse patterns
- CHECK for unnecessary cloning operations
- IDENTIFY missing trait implementations
- REVIEW error handling patterns and unwrap() usage

WHEN "typescript" OR "javascript":

- CHECK for any types and missing type annotations
- IDENTIFY callback hell and promise chain issues
- ANALYZE component complexity and props drilling
- REVIEW async/await patterns

WHEN "python":

- ANALYZE class hierarchy and multiple inheritance
- CHECK for missing type hints and docstrings
- IDENTIFY list comprehension overuse
- REVIEW exception handling patterns

STEP 5: Test coverage verification

TRY:

- EXECUTE language-specific coverage commands:
  - Java: `mvn test jacoco:report` OR `gradle test jacocoTestReport`
  - Go: `go test -cover ./...`
  - Rust: `cargo tarpaulin --out xml` OR `cargo test`
  - TypeScript: `npm test -- --coverage` OR `deno test --coverage`
  - Python: `pytest --cov=src --cov-report=xml`
- PARSE coverage reports for critical path analysis
- IDENTIFY untested code areas requiring attention
  CATCH (coverage_tool_missing):
- DOCUMENT coverage tool setup requirements
- SUGGEST manual test verification approach
- PROCEED with refactoring analysis

STEP 6: Refactoring priority analysis

- CALCULATE impact scores for each identified smell:
  - Maintainability impact (1-10)
  - Performance impact (1-10)
  - Security risk (1-10)
  - Refactoring difficulty (1-10)
- SORT by priority: (maintainability + performance + security) / difficulty
- GROUP by risk level: high, medium, low
- CREATE incremental refactoring plan

STEP 7: Generate refactoring recommendations

FOR EACH high-priority smell:

- DESCRIBE specific refactoring technique
- PROVIDE code examples (before/after)
- ESTIMATE effort and risk
- SUGGEST testing strategy
- DOCUMENT rollback plan

STEP 8: State management and progress tracking

- UPDATE session state with analysis results
- SAVE refactoring plan to `/tmp/refactor-plan-$SESSION_ID.md`
- CREATE checkpoint before each major refactoring
- TRACK test execution results and coverage changes

## Advanced Parallel Refactoring Coordination

**CRITICAL: Never analyze files sequentially. Always use 8-10 parallel agents for instant results.**

### Cross-Agent Communication Protocol

Each agent produces structured JSON output for coordination:

```json
{
  "agent_id": "architectural_smell_detection",
  "timestamp": "ISO_8601",
  "findings": [...],
  "cross_cutting_concerns": ["related_to_agent_X", "impacts_agent_Y"],
  "severity_score": 0-100,
  "refactoring_candidates": [...]
}
```

### Parallel Agent Execution Strategy

**LAUNCH ALL 10 AGENTS IN FIRST RESPONSE:**

1. **Architectural Smell Detection Agent**
   - God classes and feature envy patterns
   - Inappropriate intimacy between classes
   - Cyclic dependencies and layer violations
   - Misplaced responsibilities (SRP violations)
   - **Expected execution time**: 5-6 seconds

2. **Code Duplication Hunter Agent**
   - Token-based similarity detection
   - Structural duplication across modules
   - Copy-paste inheritance patterns
   - Template method duplication
   - **Expected execution time**: 4-5 seconds

3. **Complexity Analyzer Agent**
   - Cyclomatic complexity calculations
   - Cognitive complexity metrics
   - Nested conditional depth analysis
   - Boolean expression complexity
   - **Expected execution time**: 3-4 seconds

4. **Type Safety Auditor Agent**
   - Weak typing detection
   - Null safety violations
   - Generic type consistency
   - Type coercion risks
   - **Expected execution time**: 4-5 seconds

5. **Performance Bottleneck Agent**
   - Algorithm complexity analysis
   - Memory leak detection
   - Database query optimization
   - Collection efficiency analysis
   - **Expected execution time**: 5-6 seconds

6. **Design Pattern Violation Agent**
   - Anti-pattern detection
   - SOLID principle violations
   - Missing pattern opportunities
   - Abstraction level analysis
   - **Expected execution time**: 4-5 seconds

7. **Test Quality Inspector Agent**
   - Coverage gap analysis
   - Test brittleness detection
   - Edge case identification
   - Test smell detection
   - **Expected execution time**: 5-6 seconds

8. **Dependency Analysis Agent**
   - Coupling metrics calculation
   - Unused dependency detection
   - Version conflict analysis
   - Circular dependency mapping
   - **Expected execution time**: 3-4 seconds

9. **Security Smell Detection Agent**
   - Credential exposure scanning
   - Injection vulnerability detection
   - Cryptographic weakness analysis
   - Input validation gaps
   - **Expected execution time**: 4-5 seconds

10. **Documentation Debt Agent**
    - API documentation coverage
    - Comment accuracy analysis
    - Architecture documentation gaps
    - Code-to-doc ratio metrics
    - **Expected execution time**: 3-4 seconds

### Agent Coordination Matrix

```
Agent Dependencies (executed in parallel, synthesized after):
┌─────────────────┬──────────────┬──────────────┬──────────────┐
│ Primary Agent   │ Shares With  │ Receives From│ Priority     │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Architectural   │ All agents   │ Complexity   │ Critical     │
│ Duplication     │ Test Quality │ Performance  │ High         │
│ Complexity      │ Architectural│ None         │ Critical     │
│ Type Safety     │ Security     │ Dependency   │ High         │
│ Performance     │ Architectural│ Complexity   │ Critical     │
│ Design Pattern  │ Architectural│ All agents   │ Medium       │
│ Test Quality    │ All agents   │ Complexity   │ High         │
│ Dependency      │ Architectural│ None         │ Medium       │
│ Security        │ Type Safety  │ Dependency   │ Critical     │
│ Documentation   │ All agents   │ None         │ Low          │
└─────────────────┴──────────────┴──────────────┴──────────────┘
```

### Performance Optimization Techniques

1. **Token Budget Allocation**
   - Each agent: 2000-3000 tokens
   - Focused scope per agent
   - No redundant analysis

2. **Result Caching**
   - Cache expensive computations
   - Share parsed ASTs between agents
   - Reuse file read operations

3. **Early Termination**
   - Stop analysis if critical issues found
   - Prioritize high-impact refactorings
   - Skip low-value improvements

### Synthesis and Prioritization

After all agents complete (5-8 seconds total):

1. **Merge findings** from all agents
2. **Cross-reference** related issues
3. **Calculate composite scores**:
   ```
   Priority = (Severity × Impact × Frequency) / Effort
   ```
4. **Generate unified refactoring plan**
5. **Create dependency graph** for refactoring order

## Language-Specific Refactoring Patterns

### Java Refactoring Techniques

**Anemic Domain Model → Rich Domain Model**

```java
// Before: Anemic model
public class Customer {
    private String name;
    private String email;
    // Only getters/setters
}

public class CustomerService {
    public boolean isEligibleForDiscount(Customer customer) {
        // Business logic here
    }
}

// After: Rich domain model
public class Customer {
    private String name;
    private Email email;
    
    public boolean isEligibleForDiscount() {
        // Business logic moved to domain
        return this.getTotalOrders() > 10;
    }
}
```

**Replace Conditional with Strategy Pattern**

```java
// Before: Complex conditionals
public class PaymentProcessor {
    public void processPayment(PaymentType type, double amount) {
        if (type == PaymentType.CREDIT_CARD) {
            // Credit card logic
        } else if (type == PaymentType.PAYPAL) {
            // PayPal logic
        } else if (type == PaymentType.BANK_TRANSFER) {
            // Bank transfer logic
        }
    }
}

// After: Strategy pattern
public interface PaymentStrategy {
    void processPayment(double amount);
}

public class PaymentProcessor {
    private PaymentStrategy strategy;
    
    public void processPayment(double amount) {
        strategy.processPayment(amount);
    }
}
```

### Go Refactoring Techniques

**Replace Empty Interface with Type-Safe Alternatives**

```go
// Before: Empty interface
func ProcessData(data interface{}) error {
    switch v := data.(type) {
    case string:
        // Handle string
    case int:
        // Handle int
    default:
        return fmt.Errorf("unsupported type")
    }
    return nil
}

// After: Type-safe approach
type DataProcessor interface {
    Process() error
}

func ProcessData(processor DataProcessor) error {
    return processor.Process()
}
```

**Functional Options Pattern**

```go
// Before: Many constructor parameters
func NewServer(host string, port int, timeout time.Duration, 
               ssl bool, cert string) *Server {
    // Constructor logic
}

// After: Functional options
type ServerOption func(*Server)

func WithSSL(cert string) ServerOption {
    return func(s *Server) {
        s.ssl = true
        s.cert = cert
    }
}

func NewServer(host string, port int, opts ...ServerOption) *Server {
    s := &Server{host: host, port: port}
    for _, opt := range opts {
        opt(s)
    }
    return s
}
```

### Rust Refactoring Techniques

**Replace Rc/RefCell with Better Ownership**

```rust
// Before: Overuse of Rc/RefCell
use std::rc::Rc;
use std::cell::RefCell;

struct Node {
    value: i32,
    children: Vec<Rc<RefCell<Node>>>,
}

// After: Arena-based approach
struct Arena {
    nodes: Vec<Node>,
}

struct Node {
    value: i32,
    children: Vec<usize>, // Indices into arena
}
```

**Iterator-based Refactoring**

```rust
// Before: Manual loops
let mut result = Vec::new();
for item in items {
    if item.is_valid() {
        result.push(item.transform());
    }
}

// After: Iterator chains
let result: Vec<_> = items
    .into_iter()
    .filter(|item| item.is_valid())
    .map(|item| item.transform())
    .collect();
```

## Parallel Refactoring Execution Framework

**CRITICAL: Execute independent refactorings in parallel for 8x faster implementation.**

### Refactoring Dependency Analysis

BEFORE execution, analyze refactoring dependencies:

```json
{
  "refactoring_graph": {
    "independent_groups": [
      ["refactor_1", "refactor_3", "refactor_7"], // Can execute in parallel
      ["refactor_2", "refactor_5"], // Can execute in parallel
      ["refactor_4", "refactor_6", "refactor_8"] // Can execute in parallel
    ],
    "sequential_chain": ["group_1", "group_2", "group_3"],
    "estimated_time": {
      "sequential": "45 minutes",
      "parallel": "6 minutes"
    }
  }
}
```

### Parallel Refactoring Agents

**DEPLOY UP TO 8 REFACTORING EXECUTION AGENTS:**

Task 1: **Method Extraction Agent**

- Extract long methods into smaller, focused functions
- Preserve method signatures and contracts
- Update all call sites automatically
- Validate behavior with targeted tests

Task 2: **Class Decomposition Agent**

- Split god classes into cohesive units
- Extract interfaces for better abstraction
- Migrate dependencies systematically
- Ensure backward compatibility

Task 3: **Duplicate Code Elimination Agent**

- Extract common code to shared utilities
- Create generic functions/templates
- Update all duplicate instances
- Verify no behavior changes

Task 4: **Type Safety Enhancement Agent**

- Add missing type annotations
- Replace weak types with strong types
- Implement null safety patterns
- Fix type inconsistencies

Task 5: **Performance Optimization Agent**

- Replace inefficient algorithms
- Optimize data structures
- Implement caching strategies
- Profile before/after changes

Task 6: **Pattern Implementation Agent**

- Apply design patterns (Strategy, Factory, etc.)
- Replace conditionals with polymorphism
- Implement dependency injection
- Enhance testability

Task 7: **Test Enhancement Agent**

- Add missing test coverage
- Refactor brittle tests
- Implement property-based tests
- Create test fixtures

Task 8: **Documentation Update Agent**

- Update API documentation
- Refresh code comments
- Generate architecture diagrams
- Create migration guides

**COORDINATION PROTOCOL:**

- Each agent works on independent files/modules
- Atomic commits per refactoring
- Continuous integration validation
- Rollback capability per agent

## Incremental Refactoring Workflow

STEP 9: Execute refactoring plan with parallel optimization

FOR EACH refactoring in priority order:

CHECKPOINT before_refactoring:

- CREATE branch: `refactor/$REFACTORING_NAME-$SESSION_ID`
- SAVE current state and test results
- DOCUMENT rollback procedure

TRY:

- APPLY single refactoring change
- RUN relevant tests:
- Java: `mvn test -Dtest=*${ModifiedClass}*`
- Go: `go test ./... -run TestRelated`
- Rust: `cargo test related_tests`
- VERIFY no regressions introduced
- UPDATE documentation if needed

CATCH (test_failure):

- ROLLBACK to checkpoint
- ANALYZE failure root cause
- ADJUST refactoring approach
- RETRY with smaller incremental change

CATCH (compilation_error):

- FIX compilation issues immediately
- VERIFY type safety and interfaces
- ENSURE all dependencies resolved

SUCCESS:

- COMMIT with descriptive message
- UPDATE session state with completion
- MEASURE performance impact if applicable
- PROCEED to next refactoring

STEP 10: Validation and quality gates

- RUN full test suite: `$LANGUAGE_SPECIFIC_TEST_COMMAND`
- EXECUTE static analysis tools:
  - Java: `mvn spotbugs:check pmd:check`
  - Go: `golangci-lint run ./...`
  - Rust: `cargo clippy -- -D warnings`
  - TypeScript: `npm run lint`
- VERIFY performance benchmarks
- CHECK code coverage maintenance or improvement
- VALIDATE architectural consistency

FINALLY:

- UPDATE session state with final results
- GENERATE refactoring summary report
- CLEAN UP temporary files: `/tmp/refactor-*-$SESSION_ID.*`
- ARCHIVE session artifacts for future reference

## Output Artifacts

GENERATE the following deliverables:

**1. Refactoring Analysis Report** (`/refactor-analysis-$SESSION_ID.md`)

- Code smell inventory with severity rankings
- Language-specific anti-pattern analysis
- Refactoring recommendations with effort estimates
- Risk assessment and mitigation strategies

**2. Incremental Refactoring Plan** (`/refactor-plan-$SESSION_ID.md`)

- Priority-ordered refactoring tasks
- Step-by-step implementation guide
- Testing strategy for each refactoring
- Rollback procedures and checkpoints

**3. Improved Code** (modified source files)

- Refactored code with improved structure
- Enhanced readability and maintainability
- Preserved or improved test coverage
- Updated documentation and comments

**4. Quality Metrics** (`/refactor-metrics-$SESSION_ID.json`)

- Before/after complexity measurements
- Test coverage comparison
- Performance benchmark results
- Static analysis improvement scores

The refactoring process adapts to the detected programming language, project structure, and existing toolchain, providing targeted improvements that enhance code quality while maintaining functionality and test coverage.

## Enhanced Parallel Session State Management

**CRITICAL: Session state enables 10x faster analysis through intelligent caching and coordination.**

### State File Architecture

**Primary State Files:**

- `/tmp/refactor-analysis-$SESSION_ID.json` - Main refactoring session state
- `/tmp/refactor-plan-$SESSION_ID.md` - Incremental refactoring plan
- `/tmp/refactor-metrics-$SESSION_ID.json` - Quality metrics and measurements
- `/tmp/refactor-dependency-graph-$SESSION_ID.json` - Refactoring dependencies
- `/tmp/refactor-progress-$SESSION_ID.json` - Real-time progress tracking

**Agent Communication Directory** (`/tmp/refactor-agents-$SESSION_ID/`):

```
architectural-smells.json      - God classes, cyclic deps, SRP violations
duplication-analysis.json      - Copy-paste patterns, structural duplication
complexity-metrics.json        - Cyclomatic/cognitive complexity scores
type-safety-report.json        - Type violations, null safety issues
performance-bottlenecks.json   - O(n²) algorithms, memory leaks
pattern-violations.json        - Anti-patterns, SOLID violations
test-quality-report.json       - Coverage gaps, brittle tests
dependency-analysis.json       - Coupling metrics, circular deps
security-smells.json          - Hardcoded secrets, injection risks
documentation-debt.json        - Missing docs, outdated comments
synthesis-report.json         - Aggregated findings from all agents
priority-matrix.json          - Cross-referenced refactoring priorities
```

### Real-Time Progress Tracking

````json
{
  "session_id": "$SESSION_ID",
  "parallel_agents": {
    "total": 10,
    "completed": 7,
    "in_progress": 3,
    "failed": 0,
    "average_completion_time": "4.2s"
  },
  "refactorings": {
    "total_identified": 47,
    "high_priority": 12,
    "in_execution": 5,
    "completed": 18,
    "rollback_count": 1
  },
  "performance_metrics": {
    "analysis_speedup": "9.8x",
    "refactoring_speedup": "7.2x",
    "total_time_saved": "42 minutes"
  }
}

**Enhanced State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "phase": "discovery|analysis|planning|refactoring|validation|complete",
  "scope": "targeted|deep|comprehensive",
  "language": "auto-detected_language",
  "project_info": {
    "total_files": "number",
    "large_files_count": "number",
    "test_coverage": "percentage",
    "dependency_count": "number",
    "git_status": "clean|dirty|not_repo"
  },
  "smells": [
    {
      "type": "god_class|duplicate_code|complex_method|type_safety|performance",
      "severity": "low|medium|high|critical",
      "location": "file_path:line_number",
      "description": "specific_issue_description",
      "impact_score": "calculated_priority_score",
      "refactoring_technique": "recommended_approach",
      "effort_estimate": "low|medium|high",
      "risk_level": "low|medium|high"
    }
  ],
  "refactorings": [
    {
      "id": "unique_refactoring_id",
      "priority": "high|medium|low",
      "status": "pending|in_progress|completed|failed",
      "technique": "extract_method|replace_conditional|strategy_pattern",
      "target_files": ["list_of_files"],
      "estimated_effort": "hours_or_story_points",
      "actual_effort": "time_taken",
      "rollback_commit": "git_commit_hash",
      "test_impact": "tests_affected_count",
      "performance_impact": "before_after_metrics"
    }
  ],
  "priority_order": ["ordered_refactoring_ids"],
  "checkpoints": [
    {
      "checkpoint_id": "unique_identifier",
      "timestamp": "ISO_8601_TIMESTAMP",
      "git_commit": "commit_hash",
      "test_status": "all_passing|some_failing|not_run",
      "files_modified": ["list_of_modified_files"],
      "rollback_procedure": "steps_to_undo_changes"
    }
  ],
  "metrics": {
    "before": {
      "cyclomatic_complexity": "average_complexity",
      "test_coverage": "percentage",
      "code_duplication": "percentage",
      "lines_of_code": "total_loc",
      "technical_debt_hours": "estimated_hours"
    },
    "after": {
      "cyclomatic_complexity": "improved_complexity",
      "test_coverage": "maintained_or_improved",
      "code_duplication": "reduced_percentage",
      "lines_of_code": "refactored_loc",
      "technical_debt_hours": "reduced_hours"
    },
    "improvement_percentage": "calculated_improvement"
  },
  "sub_agent_coordination": {
    "agents_used": ["structure", "duplication", "complexity", "type_safety", "performance"],
    "communication_files": ["/tmp/paths/to/agent/outputs"],
    "synthesis_complete": "boolean",
    "cross_cutting_concerns": ["shared_issues_across_agents"]
  }
}
````

**Resumability Features:**

- Checkpoint-based recovery from any point in refactoring workflow
- Individual refactoring rollback without affecting completed work
- Sub-agent result preservation across session interruptions
- Git branch and commit tracking for safe experimental refactoring
- State validation and consistency checks before each major operation

**Advanced Features:**

- **Cross-Platform Session IDs**: Fallback `date` commands for non-GNU systems
- **Inter-Agent Communication**: Structured JSON files for agent coordination
- **Extended Thinking Integration**: Automatic thinking mode escalation for complex scenarios
- **Quality Gate Validation**: Automated testing and static analysis after each refactoring
- **Incremental Progress Tracking**: Granular checkpoint system with rollback capabilities

## Real-World Parallel Refactoring Example

### Scenario: Large Legacy Java Codebase

```bash
# Initial invocation
/refactor src/main/java/com/example/legacy
```

**IMMEDIATE PARALLEL AGENT DEPLOYMENT (T+0 seconds):**

```
[T+0.0s] Launching 10 parallel analysis agents...
[T+0.1s] Agent 1: Scanning 2,847 Java files for architectural smells
[T+0.1s] Agent 2: Analyzing code duplication across 342 packages  
[T+0.1s] Agent 3: Computing complexity metrics for 12,453 methods
[T+0.1s] Agent 4: Checking type safety in 8,291 class definitions
[T+0.1s] Agent 5: Profiling performance bottlenecks
[T+0.1s] Agent 6: Detecting design pattern violations
[T+0.1s] Agent 7: Analyzing test quality (4,231 test files)
[T+0.1s] Agent 8: Mapping dependency graph
[T+0.1s] Agent 9: Scanning for security vulnerabilities
[T+0.1s] Agent 10: Assessing documentation coverage

[T+5.2s] All agents completed. Synthesizing results...
[T+5.8s] Analysis complete. Found 147 refactoring opportunities.
```

**RESULTS SUMMARY:**

```json
{
  "critical_issues": {
    "god_classes": 12,
    "cyclic_dependencies": 8,
    "security_vulnerabilities": 3
  },
  "high_priority_refactorings": [
    {
      "type": "extract_god_class",
      "target": "UserService.java",
      "lines": 3847,
      "methods": 142,
      "recommendation": "Split into 5 cohesive services"
    },
    {
      "type": "break_circular_dependency",
      "targets": ["OrderService", "PaymentService", "InventoryService"],
      "impact": "Affects 47 dependent classes"
    },
    {
      "type": "eliminate_duplication",
      "pattern": "Database connection handling",
      "instances": 23,
      "loc_saved": 892
    }
  ],
  "performance_comparison": {
    "sequential_analysis_time": "68 minutes",
    "parallel_analysis_time": "5.8 seconds",
    "speedup": "703x faster"
  }
}
```

**PARALLEL REFACTORING EXECUTION (T+10 seconds):**

```
[T+10s] Deploying 8 refactoring execution agents...
[T+10s] Agent 1: Extracting UserAuthService from UserService
[T+10s] Agent 2: Extracting UserProfileService from UserService  
[T+10s] Agent 3: Creating DatabaseConnectionPool utility
[T+10s] Agent 4: Implementing Strategy pattern for PaymentProcessor
[T+10s] Agent 5: Adding type safety to 147 methods
[T+10s] Agent 6: Optimizing O(n²) algorithms in ReportGenerator
[T+10s] Agent 7: Enhancing test coverage for critical paths
[T+10s] Agent 8: Updating API documentation

[T+35s] Refactoring complete. Running validation suite...
[T+42s] All tests passing. Zero regressions detected.
```

**TOTAL TIME COMPARISON:**

- **Traditional Sequential Approach**: ~2.5 hours
- **Parallel Agent Approach**: 42 seconds
- **Performance Gain**: 214x faster

This demonstrates how parallel sub-agent execution transforms refactoring from a multi-hour manual process into a sub-minute automated workflow with comprehensive analysis and safe implementation.