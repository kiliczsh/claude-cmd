---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(git:*), Bash(gdate:*), Bash(jq:*), Bash(wc:*), WebFetch, Task, mcp__context7__resolve-library-id, mcp__context7__get-library-docs
name: "Context Load Testing Go"
description: "Load comprehensive Go testing documentation with adaptive project analysis and framework detection"
author: "wcygan"
tags: ["context","testing"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Go modules detected: !`fd go.mod . -d 3 | wc -l | tr -d ' ' || echo "0"`
- Test files count: !`fd "_test\.go$" . | wc -l | tr -d ' ' || echo "0"`
- Benchmark functions: !`rg "func Benchmark" . --type go | wc -l | tr -d ' ' || echo "0"`
- Example functions: !`rg "func Example" . --type go | wc -l | tr -d ' ' || echo "0"`
- Testing frameworks: !`rg "(testify|ginkgo|gomega|goconvey)" go.mod 2>/dev/null | head -3 || echo "standard"`
- Module path: !`rg "^module " go.mod 2>/dev/null | head -1 | cut -d' ' -f2 || echo "no-module"`
- Go version: !`rg "^go " go.mod 2>/dev/null | head -1 | cut -d' ' -f2 || go version 2>/dev/null | cut -d' ' -f3 || echo "unknown"`
- Test coverage files: !`fd "coverage\.(out|html|txt)$" . | wc -l | tr -d ' ' || echo "0"`
- Build constraints: !`rg "//go:build" . --type go | wc -l | tr -d ' ' || echo "0"`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "Yes" || echo "No"`
- Recent test changes: !`git log --oneline --since="1 week ago" -- "*_test.go" 2>/dev/null | wc -l | tr -d ' ' || echo "0"`

## Your Task

STEP 1: Initialize comprehensive Go testing context session

- CREATE session state file: `/tmp/go-testing-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "ISO_8601_TIMESTAMP",
    "phase": "initialization",
    "performance_metrics": {
      "start_time": "ISO_8601_TIMESTAMP",
      "phase_timings": {},
      "agent_completion_times": {},
      "total_duration": null
    },
    "go_project_analysis": {
      "modules_count": "auto-detect",
      "test_files_count": "auto-detect",
      "testing_frameworks": [],
      "go_version": "auto-detect",
      "complexity_level": "unknown"
    },
    "documentation_sources": {},
    "focus_areas": [],
    "context_optimization": {},
    "checkpoints": {},
    "error_recovery": {
      "failed_operations": [],
      "recovery_attempts": [],
      "partial_completions": []
    }
  }
  ```
- CREATE context workspace: `/tmp/go-testing-context-$SESSION_ID/`
- INITIALIZE Go project structure analysis

STEP 2: Go project structure analysis and testing framework detection

Think deeply about the optimal context loading strategy based on the detected Go project characteristics and testing patterns.

IF complexity appears high (>50 test files OR multiple frameworks):

- Think harder about enterprise Go testing architecture patterns and optimal sub-agent coordination strategies

- ANALYZE project structure from Context section
- DETERMINE testing complexity and framework usage patterns
- IDENTIFY testing scope and specialization requirements
- ASSESS current testing maturity and coverage level

IF Test files > 50 AND multiple frameworks detected:

- SET complexity_level = "enterprise"
- ENABLE comprehensive testing guidance with advanced patterns
- FOCUS on testing architecture, performance optimization, and CI/CD integration

ELSE IF Test files > 10 AND testify or other frameworks detected:

- SET complexity_level = "moderate"
- USE focused testing framework guidance with best practices
- PRIORITIZE framework-specific patterns and integration testing

ELSE:

- SET complexity_level = "basic"
- PROCEED with foundational Go testing guidance
- EMPHASIZE standard library testing patterns and basic best practices

STEP 3: Adaptive documentation loading strategy

TRY:

IF complexity_level == "enterprise":

- USE Task tool for comprehensive parallel documentation loading:
  1. **Standard Library Deep Dive Agent**: Core testing package, subtests, benchmarks
     - SAVE findings to: `/tmp/go-testing-context-$SESSION_ID/stdlib-deep-dive.json`
     - CHECKPOINT: Standard library analysis complete
  2. **Framework Mastery Agent**: Testify, Ginkgo, GoMock advanced patterns
     - SAVE findings to: `/tmp/go-testing-context-$SESSION_ID/framework-mastery.json`
     - CHECKPOINT: Framework analysis complete
  3. **Performance Testing Agent**: Benchmarking, profiling, performance testing
     - SAVE findings to: `/tmp/go-testing-context-$SESSION_ID/performance-testing.json`
     - CHECKPOINT: Performance analysis complete
  4. **Testing Architecture Agent**: Test organization, CI/CD, coverage strategies
     - SAVE findings to: `/tmp/go-testing-context-$SESSION_ID/testing-architecture.json`
     - CHECKPOINT: Architecture analysis complete
  5. **Advanced Patterns Agent**: Integration testing, mocking, race detection
     - SAVE findings to: `/tmp/go-testing-context-$SESSION_ID/advanced-patterns.json`
     - CHECKPOINT: Advanced patterns analysis complete

  - COORDINATE: Wait for all agents to complete before synthesis
  - VALIDATE: Ensure all checkpoint files exist before proceeding

ELSE IF complexity_level == "moderate":

- EXECUTE focused documentation loading with Context7 and WebFetch:

1. **Go Testing Package Documentation**
   - USE Context7: resolve-library-id for "golang testing"
   - FETCH: Core testing functions, table-driven patterns, subtests
   - FOCUS: t.Run, testing.TB, test organization, benchmarks
   - EXTRACT: Best practices for test structure and naming

2. **Testify Framework Documentation**
   - URL: `https://github.com/stretchr/testify`
   - FETCH: Assertions, mocks, suites, test organization
   - FOCUS: assert vs require, mock patterns, test suites
   - EXTRACT: Framework integration and advanced usage patterns

3. **Table-Driven Testing Patterns**
   - URL: `https://go.dev/wiki/TableDrivenTests`
   - FETCH: Test data organization, parameter validation
   - FOCUS: Data-driven testing, error case coverage
   - EXTRACT: Table structure patterns and validation techniques

4. **Go Testing Blog and Best Practices**
   - URL: `https://go.dev/blog/`
   - FETCH: Testing methodology, performance testing guidance
   - FOCUS: Advanced testing patterns, integration testing
   - EXTRACT: Official Go team recommendations and patterns

ELSE:

- EXECUTE foundational documentation loading:

1. **Standard Go Testing Basics**
   - URL: `https://pkg.go.dev/testing`
   - FETCH: Basic test functions, naming conventions, test setup
   - FOCUS: Test function structure, testing.T usage, basic assertions
   - EXTRACT: Getting started patterns and fundamental concepts

2. **Go Testing Tutorial**
   - URL: `https://go.dev/doc/tutorial/add-a-test`
   - FETCH: Step-by-step testing introduction
   - FOCUS: Writing first tests, running tests, understanding output
   - EXTRACT: Beginner-friendly patterns and common pitfalls

CATCH (documentation_loading_failed):

- LOG failed sources to session state with specific error details
- ATTEMPT alternative documentation sources
- CONTINUE with available documentation
- PROVIDE manual context loading instructions with recovery steps
- SAVE fallback documentation references
- UPDATE state with partial completion status

CATCH (sub_agent_coordination_failed):

- LOG coordination issues and failed checkpoints
- ATTEMPT recovery with reduced agent count
- MERGE available partial results
- CONTINUE with degraded but functional analysis

STEP 4: Go-specific testing context organization and synthesis

CASE detected_frameworks:
WHEN "testify":

- ANALYZE testify-specific patterns: assertions, mocks, suites
- FOCUS on assert vs require patterns, test organization
- INCLUDE mock generation and interface testing examples
- DOCUMENT best practices for testify integration

WHEN "ginkgo" OR "gomega":

- ANALYZE BDD testing patterns and spec organization
- FOCUS on Describe/Context/It structure, matchers
- INCLUDE asynchronous testing and custom matchers
- DOCUMENT BDD workflow and integration testing

WHEN "standard":

- ANALYZE standard library testing patterns exclusively
- FOCUS on table-driven tests, subtests, benchmarks
- INCLUDE example functions and testing utilities
- DOCUMENT idiomatic Go testing without external frameworks

WHEN "multiple":

- PROVIDE comparative analysis of framework approaches
- FOCUS on migration strategies and framework selection
- INCLUDE integration patterns between frameworks
- DOCUMENT framework-agnostic testing principles

STEP 5: Testing methodology and patterns synthesis

- ORGANIZE loaded context by Go testing domains:
  - **Fundamentals**: Test function structure, naming, organization
  - **Table-Driven Testing**: Data structures, parameter validation, error cases
  - **Subtests**: t.Run patterns, parallel execution, isolation
  - **Benchmarking**: Performance testing, memory profiling, optimization
  - **Mocking**: Interface testing, dependency injection, test doubles
  - **Integration Testing**: HTTP testing, database testing, external dependencies
  - **Coverage Analysis**: Coverage measurement, reporting, quality gates
  - **Advanced Patterns**: Race detection, build tags, test helpers

- SYNTHESIZE project-specific guidance:
  - Integration with existing Go codebase architecture
  - Testing strategies for detected Go patterns and frameworks
  - Performance considerations for current project scale
  - CI/CD integration recommendations for Go testing

STEP 6: Multi-phase testing implementation guidance

- GENERATE realistic testing implementation phases:
  ```json
  {
    "phase_1": {
      "name": "Foundation Testing Setup",
      "duration": "1-2 weeks",
      "deliverables": ["Basic test structure", "Table-driven test patterns", "Coverage baseline"],
      "success_criteria": ["Tests run successfully", "Coverage > 70%"],
      "go_focus": ["Standard library testing", "Test organization", "Basic benchmarks"]
    },
    "phase_2": {
      "name": "Advanced Testing Patterns",
      "duration": "2-3 weeks",
      "deliverables": ["Mock integration", "Integration tests", "Performance tests"],
      "success_criteria": ["Mock coverage complete", "Integration tests pass"],
      "go_focus": ["Interface mocking", "HTTP testing", "Parallel test execution"]
    },
    "phase_3": {
      "name": "Testing Excellence",
      "duration": "1-2 weeks",
      "deliverables": ["CI/CD integration", "Advanced benchmarks", "Test documentation"],
      "success_criteria": ["Automated testing pipeline", "Performance baselines established"],
      "go_focus": ["Race detection", "Build constraints", "Test optimization"]
    }
  }
  ```

STEP 7: State management and comprehensive artifact creation

- UPDATE session state with Go testing analysis results and performance metrics
- RECORD phase completion times and agent performance statistics
- CREATE comprehensive testing guide: `/tmp/go-testing-context-$SESSION_ID/comprehensive-guide.md`
- GENERATE testing checklist: `/tmp/go-testing-context-$SESSION_ID/testing-checklist.md`
- SAVE Go-specific examples: `/tmp/go-testing-context-$SESSION_ID/go-examples/`
- CREATE framework integration guide: `/tmp/go-testing-context-$SESSION_ID/framework-guide.md`
- DOCUMENT testing architecture decisions: `/tmp/go-testing-context-$SESSION_ID/architecture-decisions.md`
- GENERATE performance report: `/tmp/go-testing-context-$SESSION_ID/performance-metrics.json`

STEP 8: Advanced Go testing enhancement for complex projects

IF complexity_level == "enterprise" AND multiple sub-agents used:

- Ultrathink about enterprise Go testing coordination and cross-service integration patterns
- COORDINATE cross-domain testing analysis synthesis
- IDENTIFY integration points between testing strategies
- GENERATE enterprise Go testing guidance:
  - Multi-service testing coordination
  - Performance testing at scale
  - Testing governance and standards
  - Advanced CI/CD patterns for Go projects

STEP 9: Quality assurance and Go-specific validation

TRY:

- VALIDATE generated Go code examples for syntax and idiom correctness
- VERIFY recommended testing frameworks are current and compatible
- CHECK Go version compatibility for all patterns and examples
- ENSURE testing guidance follows official Go best practices

CATCH (validation_failed):

- LOG validation issues to session state
- PROVIDE corrected Go examples and recommendations
- INCLUDE troubleshooting guidance for common Go testing issues

FINALLY:

- UPDATE session state: phase = "complete"
- GENERATE comprehensive Go testing summary with key recommendations
- ARCHIVE session artifacts for future reference
- CLEAN UP temporary processing files: `/tmp/go-testing-temp-$SESSION_ID-*`

## Go Testing Documentation Strategy

### Core Documentation Sources (loaded programmatically)

CASE complexity_level:
WHEN "enterprise":

1. **Standard Library Mastery** (comprehensive coverage)
2. **Advanced Framework Integration** (testify, ginkgo, gomock)
3. **Performance Testing Excellence** (benchmarking, profiling, optimization)
4. **Testing Architecture** (organization, CI/CD, governance)
5. **Advanced Patterns** (integration, mocking, race detection)
6. **Go-Specific Best Practices** (idiomatic testing, performance)

WHEN "moderate":

1. **Core Testing Package** (`https://pkg.go.dev/testing`)
2. **Testify Framework** (`https://github.com/stretchr/testify`)
3. **Table-Driven Testing** (`https://go.dev/wiki/TableDrivenTests`)
4. **Go Testing Blog** (`https://go.dev/blog/`)
5. **HTTP Testing Patterns** (httptest package documentation)
6. **Benchmark Writing** (performance testing guidance)

WHEN "basic":

1. **Go Testing Tutorial** (`https://go.dev/doc/tutorial/add-a-test`)
2. **Testing Package Basics** (`https://pkg.go.dev/testing`)
3. **Simple Test Examples** (basic patterns and conventions)
4. **Getting Started Guide** (fundamental concepts and setup)

### Framework-Specific Context Loading

**Standard Library Focus:**

- Test function structure and naming conventions
- Table-driven test patterns and data organization
- Subtest creation with t.Run for test isolation
- Benchmark functions and performance measurement
- Example functions for documentation testing
- Coverage analysis and reporting techniques

**Testify Integration:**

- Assert vs Require usage patterns and best practices
- Mock generation and interface testing strategies
- Test suite organization and lifecycle management
- Custom assertion creation and reusable patterns
- HTTP testing with testify/http integration
- Advanced mocking patterns for complex dependencies

**Ginkgo/Gomega BDD Testing:**

- Describe/Context/It test organization structure
- Spec-driven development and behavior testing
- Custom matchers and assertion libraries
- Asynchronous testing and eventual consistency
- Integration with standard Go testing tools
- Performance testing within BDD frameworks

**GoMock Advanced Patterns:**

- Interface mock generation and customization
- Dependency injection patterns for testability
- Mock behavior verification and call expectations
- Integration testing with real and mocked dependencies
- Performance implications of mocking strategies
- Best practices for mock lifecycle management

### Enhanced Go Testing Examples

**Advanced Table-Driven Test Pattern:**

```go
// Enterprise-grade table-driven testing with comprehensive coverage
func TestAdvancedUserValidation(t *testing.T) {
    tests := []struct {
        name          string
        input         User
        setupMocks    func(*MockUserService)
        expectedError error
        expectedUser  *User
        validateFunc  func(t *testing.T, result *User, err error)
    }{
        {
            name: "valid user with all fields",
            input: User{
                Email:    "test@example.com",
                Username: "testuser",
                Age:      25,
            },
            setupMocks: func(m *MockUserService) {
                m.EXPECT().
                    ValidateEmail("test@example.com").
                    Return(true, nil).
                    Times(1)
            },
            expectedError: nil,
            validateFunc: func(t *testing.T, result *User, err error) {
                assert.NoError(t, err)
                assert.Equal(t, "test@example.com", result.Email)
                assert.True(t, result.Validated)
            },
        },
        // Additional test cases...
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // Setup
            ctrl := gomock.NewController(t)
            defer ctrl.Finish()
            
            mockService := NewMockUserService(ctrl)
            if tt.setupMocks != nil {
                tt.setupMocks(mockService)
            }
            
            validator := NewUserValidator(mockService)
            
            // Execute
            result, err := validator.Validate(tt.input)
            
            // Verify
            if tt.validateFunc != nil {
                tt.validateFunc(t, result, err)
            } else {
                assert.Equal(t, tt.expectedError, err)
                assert.Equal(t, tt.expectedUser, result)
            }
        })
    }
}
```

**Comprehensive Benchmark Testing:**

```go
// Advanced benchmarking with memory allocation tracking
func BenchmarkUserProcessing(b *testing.B) {
    benchmarks := []struct {
        name      string
        userCount int
        setupFunc func() []User
    }{
        {
            name:      "small dataset",
            userCount: 100,
            setupFunc: generateSmallUsers,
        },
        {
            name:      "large dataset",
            userCount: 10000,
            setupFunc: generateLargeUsers,
        },
    }
    
    for _, bm := range benchmarks {
        b.Run(bm.name, func(b *testing.B) {
            users := bm.setupFunc()
            processor := NewUserProcessor()
            
            b.ResetTimer()
            b.ReportAllocs()
            
            for i := 0; i < b.N; i++ {
                // Prevent compiler optimization
                _ = processor.ProcessUsers(users)
            }
        })
    }
}

// Memory allocation benchmark
func BenchmarkUserAllocation(b *testing.B) {
    b.ReportAllocs()
    
    for i := 0; i < b.N; i++ {
        user := &User{
            Email:    "test@example.com",
            Username: "testuser",
            Settings: make(map[string]string),
        }
        
        // Simulate realistic usage
        user.Settings["theme"] = "dark"
        _ = user.Validate()
    }
}
```

**HTTP Testing with Advanced Patterns:**

```go
// Comprehensive HTTP handler testing
func TestAdvancedUserHandler(t *testing.T) {
    tests := []struct {
        name           string
        method         string
        path           string
        body           interface{}
        setupMocks     func(*MockUserService)
        expectedStatus int
        expectedBody   interface{}
        headers        map[string]string
        validateFunc   func(t *testing.T, resp *httptest.ResponseRecorder)
    }{
        {
            name:   "create user success",
            method: "POST",
            path:   "/users",
            body: User{
                Email:    "test@example.com",
                Username: "testuser",
            },
            setupMocks: func(m *MockUserService) {
                m.EXPECT().
                    CreateUser(gomock.Any()).
                    Return(&User{ID: 1, Email: "test@example.com"}, nil)
            },
            expectedStatus: http.StatusCreated,
            headers: map[string]string{
                "Content-Type": "application/json",
            },
            validateFunc: func(t *testing.T, resp *httptest.ResponseRecorder) {
                var user User
                err := json.Unmarshal(resp.Body.Bytes(), &user)
                assert.NoError(t, err)
                assert.Equal(t, int64(1), user.ID)
                assert.Equal(t, "test@example.com", user.Email)
            },
        },
        // Additional test cases...
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // Setup
            ctrl := gomock.NewController(t)
            defer ctrl.Finish()
            
            mockService := NewMockUserService(ctrl)
            if tt.setupMocks != nil {
                tt.setupMocks(mockService)
            }
            
            handler := NewUserHandler(mockService)
            
            // Prepare request
            var bodyReader io.Reader
            if tt.body != nil {
                bodyBytes, _ := json.Marshal(tt.body)
                bodyReader = bytes.NewReader(bodyBytes)
            }
            
            req := httptest.NewRequest(tt.method, tt.path, bodyReader)
            for key, value := range tt.headers {
                req.Header.Set(key, value)
            }
            
            resp := httptest.NewRecorder()
            
            // Execute
            handler.ServeHTTP(resp, req)
            
            // Verify
            assert.Equal(t, tt.expectedStatus, resp.Code)
            
            if tt.validateFunc != nil {
                tt.validateFunc(t, resp)
            }
        })
    }
}
```

### Quality Standards for Go Testing

**Code Quality Requirements:**

- ALL Go test examples must compile with `go test -c`
- Follow Go testing conventions and naming patterns
- Implement proper error handling and assertion patterns
- Use appropriate Go testing tools and libraries
- Include both unit and integration test examples
- Demonstrate Go-specific testing idioms and best practices
- Document test organization and execution strategies

**Performance Considerations:**

- Include benchmark tests for performance-critical code
- Demonstrate proper memory allocation testing
- Show parallel test execution patterns with t.Parallel()
- Include race condition detection with `go test -race`
- Document performance testing methodology and baselines
- Provide guidance on test execution optimization

**Integration Standards:**

- HTTP testing with httptest package patterns
- Database testing with test containers or in-memory databases
- External service mocking and integration testing
- CI/CD integration with Go testing tools
- Coverage reporting and quality gate implementation
- Test organization for large Go projects and monorepos

## Expected Outcome

After executing this command, you will have comprehensive, project-adapted context on:

**Go Testing Fundamentals:**

- Standard library testing patterns and conventions
- Test function structure, naming, and organization
- Table-driven testing design and implementation
- Subtest creation and parallel execution
- Example functions for documentation testing

**Advanced Go Testing Techniques:**

- Benchmark writing and performance analysis
- Mock generation and interface testing
- HTTP handler testing with httptest
- Integration testing patterns and strategies
- Race condition detection and prevention
- Build tags and conditional testing

**Framework Integration Mastery:**

- Testify assertions, mocks, and test suites
- Ginkgo/Gomega BDD testing patterns
- GoMock interface mocking and verification
- Custom testing utilities and helpers
- Framework migration and selection strategies

**Testing Architecture and Organization:**

- Test file organization and package structure
- CI/CD integration with Go testing tools
- Coverage measurement and reporting strategies
- Performance testing and benchmarking methodologies
- Testing governance and quality standards
- Large-scale Go project testing patterns

**Project-Specific Optimization:**

- Testing strategies adapted to your current Go codebase
- Framework recommendations based on detected patterns
- Performance considerations for your project scale
- Integration guidance for existing testing infrastructure
- Migration pathways for testing improvement

The context loading intelligently adapts to your specific Go project structure and emphasizes the most relevant testing documentation areas for your current development needs, ensuring maximum relevance and practical applicability.

## Session State Management

**State Files Created:**

- `/tmp/go-testing-context-$SESSION_ID.json` - Main session state and project analysis
- `/tmp/go-testing-context-$SESSION_ID/` - Context workspace with organized documentation
- `/tmp/go-testing-context-cache-$SESSION_ID.json` - Documentation cache for performance
- `/tmp/go-testing-patterns-$SESSION_ID.json` - Detected patterns and recommendations

**Enhanced State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "phase": "initialization|analysis|loading|synthesis|complete",
  "go_project_analysis": {
    "modules_count": "number",
    "test_files_count": "number",
    "benchmark_functions": "number",
    "example_functions": "number",
    "detected_frameworks": ["testify", "ginkgo", "standard"],
    "go_version": "1.21",
    "module_path": "github.com/user/project",
    "complexity_level": "basic|moderate|enterprise"
  },
  "documentation_loaded": {
    "go_testing_pkg": "loaded|failed|skipped",
    "testify_framework": "loaded|failed|skipped",
    "table_driven_patterns": "loaded|failed|skipped",
    "go_testing_blog": "loaded|failed|skipped",
    "benchmark_guidance": "loaded|failed|skipped",
    "http_testing": "loaded|failed|skipped"
  },
  "focus_areas": [
    "fundamentals",
    "table_driven_testing",
    "subtests",
    "benchmarking",
    "mocking",
    "integration_testing",
    "coverage_analysis",
    "advanced_patterns"
  ],
  "context_optimization": {
    "project_specific_patterns": [],
    "framework_recommendations": [],
    "performance_considerations": [],
    "testing_architecture_guidance": []
  },
  "checkpoints": {
    "project_analysis_complete": "boolean",
    "documentation_loaded": "boolean",
    "context_synthesized": "boolean",
    "artifacts_created": "boolean",
    "session_archived": "boolean"
  }
}
```