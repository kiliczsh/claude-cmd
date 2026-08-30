---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(eza:*), Bash(bat:*), Bash(jq:*), Bash(gdate:*), Bash(mvn:*), Bash(gradle:*), Bash(cargo:*), Bash(go:*), Bash(deno:*)
name: "Tdd"
description: "Comprehensive test-driven development orchestrator with language-aware test generation and Red-Green-Refactor workflow automation"
author: "wcygan"
tags: ["test","run"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- TDD target: $ARGUMENTS
- Current directory: !`pwd`
- Project structure: !`eza -la --tree --level=2 2>/dev/null | head -10 || fd . -t d -d 2 | head -8`
- Build files detected: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json)" . -d 3 | head -5 || echo "No build files detected"`
- Existing test files: !`fd "(test|spec)" . -t f | head -5 || echo "No test files found"`
- Language tools status: !`echo "deno: $(which deno >/dev/null && echo ✓ || echo ✗) | cargo: $(which cargo >/dev/null && echo ✓ || echo ✗) | go: $(which go >/dev/null && echo ✓ || echo ✗) | mvn: $(which mvn >/dev/null && echo ✓ || echo ✗)"`
- Git status: !`git status --porcelain 2>/dev/null | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize TDD session and analyze project architecture

- CREATE session state file: `/tmp/tdd-session-$SESSION_ID.json`
- ANALYZE project structure and technology stack from Context section
- DETECT primary language and testing framework
- IDENTIFY existing test patterns and conventions

```bash
# Initialize TDD session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "tddTarget": "'$ARGUMENTS'",
  "detectedLanguage": "auto-detect",
  "testingFramework": "auto-detect",
  "tddPhase": "red",
  "testFilePath": "",
  "implementationPath": ""
}' > /tmp/tdd-session-$SESSION_ID.json
```

STEP 2: Language-aware project analysis with intelligent framework detection

TRY:

CASE detected_language:
WHEN "rust":

- VALIDATE Cargo.toml exists and analyze dependencies
- DETECT testing strategy: unit tests (`#[cfg(test)]`) vs integration tests (`tests/`)
- IDENTIFY existing test modules and patterns
- SET testing framework: "cargo_test" with potential criterion for benchmarks

WHEN "go":

- VALIDATE go.mod exists and analyze module structure
- DETECT testing strategy: standard library vs testify framework
- IDENTIFY table-driven test patterns in existing code
- SET testing framework: "go_test" with build tags and coverage support

WHEN "java":

- DETECT build system: Maven (pom.xml) vs Gradle (build.gradle)
- IDENTIFY testing framework: JUnit 5, TestNG, or legacy JUnit 4
- ANALYZE test directory structure and naming conventions
- SET testing framework based on dependencies and existing patterns

WHEN "typescript" OR "javascript":

- DETECT runtime: Deno vs Node.js vs browser environment
- IF Deno project: USE Deno.test() with built-in test runner
- IF Node.js: IDENTIFY framework (Jest, Vitest, Mocha, etc.)
- ANALYZE existing test structure and mocking patterns

WHEN "unknown":

- LAUNCH sub-agent for comprehensive language detection
- ANALYZE file extensions, import patterns, and build configurations
- PROVIDE language-agnostic TDD guidance

STEP 3: Intelligent test file creation with language-specific patterns

FOR target_component IN $ARGUMENTS:

CASE language:
WHEN "rust":

**Rust TDD Implementation:**

```rust
// FOR library crates: src/lib.rs or src/component.rs
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_${target_component}_${expected_behavior}() {
        // Arrange
        
        // Act
        
        // Assert
        assert_eq!(actual, expected);
    }
    
    #[test]
    fn test_${target_component}_edge_cases() {
        // Test boundary conditions and error cases
    }
}
```

```rust
// FOR integration tests: tests/${target_component}_test.rs
use project_name::*;

#[test]
fn integration_test_${target_component}() {
    // Integration test implementation
}
```

WHEN "go":

**Go TDD Implementation:**

```go
// ${target_component}_test.go
package main

import (
    "testing"
    "github.com/stretchr/testify/assert"
)

func Test${TargetComponent}_${ExpectedBehavior}(t *testing.T) {
    // Table-driven tests
    tests := []struct {
        name     string
        input    InputType
        expected ExpectedType
        wantErr  bool
    }{
        {
            name:     "valid input",
            input:    validInput,
            expected: expectedOutput,
            wantErr:  false,
        },
        {
            name:     "invalid input",
            input:    invalidInput,
            expected: zeroValue,
            wantErr:  true,
        },
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result, err := ${target_component}(tt.input)
            
            if tt.wantErr {
                assert.Error(t, err)
                return
            }
            
            assert.NoError(t, err)
            assert.Equal(t, tt.expected, result)
        })
    }
}
```

WHEN "java":

**Java TDD Implementation (JUnit 5):**

```java
// src/test/java/.../ComponentNameTest.java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class ${TargetComponent}Test {
    
    private ${TargetComponent} ${targetComponent};
    
    @BeforeEach
    void setUp() {
        ${targetComponent} = new ${TargetComponent}();
    }
    
    @Test
    @DisplayName("Should ${expected_behavior} when ${condition}")
    void should${ExpectedBehavior}When${Condition}() {
        // Arrange
        var input = createValidInput();
        var expected = createExpectedOutput();
        
        // Act
        var actual = ${targetComponent}.${methodName}(input);
        
        // Assert
        assertEquals(expected, actual);
    }
    
    @ParameterizedTest
    @ValueSource(strings = {"invalid1", "invalid2", "invalid3"})
    @DisplayName("Should throw exception for invalid inputs")
    void shouldThrowExceptionForInvalidInputs(String invalidInput) {
        assertThrows(IllegalArgumentException.class, () -> {
            ${targetComponent}.${methodName}(invalidInput);
        });
    }
}
```

WHEN "typescript" OR "deno":

**Deno/TypeScript TDD Implementation:**

```typescript
// ${target_component}.test.ts
import { assertEquals, assertThrows } from "@std/assert";
import { ${TargetComponent} } from "./${target_component}.ts";

Deno.test({
    name: "${TargetComponent} - should ${expected_behavior} when ${condition}",
    fn() {
        // Arrange
        const input = createValidInput();
        const expected = createExpectedOutput();
        const ${targetComponent} = new ${TargetComponent}();
        
        // Act
        const actual = ${targetComponent}.${methodName}(input);
        
        // Assert
        assertEquals(actual, expected);
    },
});

Deno.test({
    name: "${TargetComponent} - should handle edge cases",
    fn() {
        const ${targetComponent} = new ${TargetComponent}();
        
        assertThrows(
            () => ${targetComponent}.${methodName}(invalidInput),
            Error,
            "Expected error message"
        );
    },
});
```

STEP 4: Red-Green-Refactor workflow automation with intelligent execution

**PHASE 1: RED (Failing Tests)**

FOR each test created:

```bash
# Save current TDD phase
jq '.tddPhase = "red"' /tmp/tdd-session-$SESSION_ID.json > /tmp/tdd-session-$SESSION_ID.tmp && \
mv /tmp/tdd-session-$SESSION_ID.tmp /tmp/tdd-session-$SESSION_ID.json

echo "🔴 RED Phase: Creating failing tests..."
```

1. CREATE test file with comprehensive test cases
2. ENSURE tests fail meaningfully (not due to compilation errors)
3. RUN tests to verify failure with clear error messages
4. VALIDATE test quality: descriptive names, clear assertions, edge cases

CASE language:
WHEN "rust":
`bash
    cargo test ${target_component} --lib`
WHEN "go":
`bash
    go test -v -run Test${TargetComponent}`
WHEN "java":
`bash
    mvn test -Dtest=${TargetComponent}Test || ./gradlew test --tests "*${TargetComponent}Test"`
WHEN "deno":
`bash
    deno test --filter "${target_component}" --fail-fast`

**PHASE 2: GREEN (Minimal Implementation)**

```bash
# Update TDD phase
jq '.tddPhase = "green"' /tmp/tdd-session-$SESSION_ID.json > /tmp/tdd-session-$SESSION_ID.tmp && \
mv /tmp/tdd-session-$SESSION_ID.tmp /tmp/tdd-session-$SESSION_ID.json

echo "🟢 GREEN Phase: Implementing minimal solution..."
```

5. CREATE skeleton implementation that compiles
6. IMPLEMENT minimum code to pass tests (no more, no less)
7. RUN tests to verify they pass
8. AVOID over-engineering or premature optimization

**PHASE 3: REFACTOR (Clean Implementation)**

```bash
# Update TDD phase
jq '.tddPhase = "refactor"' /tmp/tdd-session-$SESSION_ID.json > /tmp/tdd-session-$SESSION_ID.tmp && \
mv /tmp/tdd-session-$SESSION_ID.tmp /tmp/tdd-session-$SESSION_ID.json

echo "🔵 REFACTOR Phase: Cleaning and optimizing..."
```

9. REFACTOR implementation while keeping tests green
10. IMPROVE code quality: readability, performance, design patterns
11. ADD additional test cases if needed
12. RUN full test suite to ensure nothing breaks

STEP 5: Continuous testing with watch mode and feedback loops

TRY:

**Language-Specific Watch Mode Activation:**

CASE language:
WHEN "rust":

    ```bash
    # Use cargo-watch for continuous testing
    if ! cargo install --list | grep -q cargo-watch; then
        echo "Installing cargo-watch for continuous testing..."
        cargo install cargo-watch
    fi

    echo "🔄 Starting Rust TDD watch mode..."
    cargo watch -x "test ${target_component} --lib"
    ```

WHEN "go":
`bash
    # Use built-in or external watch tools
    echo "🔄 Starting Go TDD watch mode..."
    if which reflex >/dev/null; then
        reflex -r '\.go$' go test -v ./...
    else
        echo "Consider installing reflex for better watch mode: go install github.com/cespare/reflex@latest"
        # Fallback to simple loop
        while true; do go test -v ./...; sleep 2; done
    fi`

WHEN "java":
`bash
    echo "🔄 Starting Java TDD watch mode..."
    if [ -f "pom.xml" ]; then
        mvn test-compile compile -q
        mvn surefire:test -Dtest=${TargetComponent}Test -q
    elif [ -f "build.gradle" ]; then
        ./gradlew test --continuous --tests "*${TargetComponent}Test"
    fi`

WHEN "deno":
`bash
    echo "🔄 Starting Deno TDD watch mode..."
    deno test --watch --filter "${target_component}"`

CATCH (watch_mode_failed):

- PROVIDE manual testing commands
- SUGGEST tool installation for better development experience
- CONTINUE with manual Red-Green-Refactor cycles

STEP 6: TDD session management and progress tracking

**Session State Updates:**

```bash
# Update session with progress
jq --arg phase "$CURRENT_PHASE" --arg test_file "$TEST_FILE_PATH" --arg impl_file "$IMPLEMENTATION_PATH" '
  .tddPhase = $phase |
  .testFilePath = $test_file |
  .implementationPath = $impl_file |
  .timestamp = now
' /tmp/tdd-session-$SESSION_ID.json > /tmp/tdd-session-$SESSION_ID.tmp && \
mv /tmp/tdd-session-$SESSION_ID.tmp /tmp/tdd-session-$SESSION_ID.json
```

**Progress Reporting:**

```bash
echo "✅ TDD Session Progress:"
echo "🎯 Target: $ARGUMENTS"
echo "📝 Language: $(jq -r '.detectedLanguage' /tmp/tdd-session-$SESSION_ID.json)"
echo "🧪 Framework: $(jq -r '.testingFramework' /tmp/tdd-session-$SESSION_ID.json)"
echo "📊 Phase: $(jq -r '.tddPhase' /tmp/tdd-session-$SESSION_ID.json)"
echo "📁 Test File: $(jq -r '.testFilePath' /tmp/tdd-session-$SESSION_ID.json)"
echo "💾 Session: $SESSION_ID"
```

FINALLY:

- SAVE session state for potential continuation
- PROVIDE next steps guidance based on current phase
- SUGGEST related TDD practices and advanced patterns

CATCH (tdd_setup_failed):

- LOG error details to session state
- PROVIDE troubleshooting steps for detected issues
- SUGGEST alternative approaches or tool installations

## TDD Best Practices Reference

### Core TDD Principles

1. **Red-Green-Refactor Cycle**:
   - RED: Write failing test that defines desired behavior
   - GREEN: Write minimal code to make test pass
   - REFACTOR: Improve code while maintaining green tests

2. **Test Quality Guidelines**:
   - Write descriptive test names that document behavior
   - One assertion per test when logically appropriate
   - Test edge cases and error conditions thoroughly
   - Use AAA pattern: Arrange, Act, Assert
   - Keep tests fast, independent, and deterministic

3. **Implementation Discipline**:
   - Never write production code without failing test
   - Write minimum code necessary to pass tests
   - Refactor only when tests are green
   - Maintain test coverage above 90% for critical paths

### Language-Specific TDD Commands

**Rust (Cargo-based):**

```bash
# Run specific test
cargo test test_function_name --lib

# Run all tests with output
cargo test -- --nocapture

# Watch mode (requires cargo-watch)
cargo watch -x "test --lib"

# Coverage with tarpaulin
cargo install cargo-tarpaulin
cargo tarpaulin --out Html
```

**Go (Module-based):**

```bash
# Run specific test function
go test -v -run TestFunctionName

# Table-driven test execution
go test -v ./... -race

# Watch mode with reflex
reflex -r '\.go$' go test -v ./...

# Coverage analysis
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```

**Java (Maven/Gradle):**

```bash
# Maven specific test execution
mvn test -Dtest=ClassName#methodName
mvn test -Dtest=ClassName

# Gradle specific test execution
./gradlew test --tests "*ClassName.methodName"
./gradlew test --continuous

# Coverage with JaCoCo
mvn test jacoco:report
./gradlew test jacocoTestReport
```

**Deno/TypeScript:**

```bash
# Run specific test
deno test --filter "test description"

# Watch mode
deno test --watch

# Coverage analysis
deno test --coverage=coverage/
deno coverage coverage/ --html
```

### Advanced TDD Patterns

**Parallel Development with Git Worktrees:**

```bash
# Create separate worktree for TDD feature
git worktree add -b tdd-${feature} ../project-tdd-${feature}
cd ../project-tdd-${feature}

# Work on tests and implementation in isolation
# Merge back through PR when complete
```

**Test-First Design Patterns:**

- **Given-When-Then**: Structure for behavior-driven tests
- **Object Mother**: Pattern for creating test data
- **Test Double**: Mocks, stubs, fakes for dependencies
- **Characterization Tests**: Tests for legacy code understanding

### TDD Workflow Automation

**Pre-commit Hook Integration:**

```bash
# Ensure tests pass before commit
git config core.hooksPath .githooks
echo '#!/bin/bash\n[test-command]' > .githooks/pre-commit
chmod +x .githooks/pre-commit
```

**CI/CD Integration:**

- Run tests on every push
- Measure and track test coverage
- Fail builds on coverage regression
- Generate test reports and documentation

This TDD command provides comprehensive test-driven development orchestration with language-aware automation, intelligent workflow management, and continuous feedback loops.