---
allowed-tools: Read, Write, Edit, MultiEdit, Bash(rg:*), Bash(fd:*), Bash(git:*), Bash(wc:*), Bash(gdate:*), Bash(head:*), Bash(grep:*), Bash(xargs:*), Task
name: "Simplify"
description: "Ultra-fast parallel code simplification using 10 sub-agents for 10x speedup"
author: "wcygan"
tags: ["code","refactor"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /simplify

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Target file/directory: $ARGUMENTS
- Code complexity hotspots: !`rg "if.*if.*if|for.*for|while.*while" . | wc -l | tr -d ' '` nested structures found
- Complex conditionals: !`rg "&&.*&&|\\|\\|.*\\|\\|" . | wc -l | tr -d ' '` complex conditions found
- Nested functions: !`rg "function.*{.*function|=>.*=>" . | wc -l | tr -d ' '` nested functions found
- Test coverage gaps: !`fd "test" --type f | xargs rg -l "skip|todo" | wc -l | tr -d ' '` untested code blocks
- File count: !`fd . -t f | wc -l | tr -d ' '` files in scope
- Technology stack: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod|pom\.xml)" --max-depth 2 | head -3 || echo "No framework files detected"`
- Git status: !`git status --porcelain | wc -l | tr -d ' '` changes pending

## Your Task

**IMMEDIATELY DEPLOY 10 PARALLEL SUB-AGENTS** for instant comprehensive simplification

STEP 1: Initialize Simplification Session

- Create session state file: `/tmp/simplify-$SESSION_ID.json`
- Initialize results directory: `/tmp/simplify-results-$SESSION_ID/`

STEP 2: **LAUNCH ALL 10 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL ANALYSIS** - All agents work in parallel:

1. **Complexity Analysis Agent**: Identify cyclomatic complexity hotspots
2. **Method Extraction Agent**: Find long functions to decompose
3. **Conditional Logic Agent**: Simplify complex boolean expressions
4. **Loop Modernization Agent**: Convert imperative to functional patterns
5. **Naming Analysis Agent**: Identify cryptic names and abbreviations
6. **Code Duplication Agent**: Find repeated patterns for extraction
7. **Nesting Reduction Agent**: Eliminate deep nesting structures
8. **Dead Code Agent**: Find unused code and redundant logic
9. **Test Coverage Agent**: Identify untested complex code
10. **Architecture Agent**: Analyze module coupling and cohesion

Each agent saves findings to: `/tmp/simplify-results-$SESSION_ID/agent-N.json`

Think deeply about code complexity patterns while maximizing parallel execution.

**Expected speedup: 10x faster analysis and refactoring planning**

IF $ARGUMENTS specifies file or directory:

- Focus analysis on specified target
- Create detailed complexity profile for target code

ELSE:

- Perform project-wide complexity analysis
- Identify highest-impact simplification targets
- Prioritize files by complexity metrics

TRY:

- Initialize simplification session: /tmp/simplify-$SESSION_ID.json
- Analyze complexity hotspots using multiple metrics:
  - Cyclomatic complexity: nested conditionals and loops
  - Function length and parameter counts
  - Code duplication patterns
  - Naming quality and clarity
  - Test coverage and maintainability
- Create complexity baseline and improvement targets
- Save checkpoint: complexity_analysis_complete

CATCH (analysis_scope_too_large):

- Limit analysis to top 10 most complex files
- Focus on files with highest change frequency
- Prioritize user-specified targets over automatic detection
- Document scope limitations in session state

STEP 2: Simplification Strategy Planning

Think harder about optimal refactoring approach and risk assessment.

- Create systematic simplification plan with phases:
  - **Phase 1**: Extract methods and reduce function complexity
  - **Phase 2**: Simplify conditional logic and eliminate nesting
  - **Phase 3**: Replace imperative loops with functional constructs
  - **Phase 4**: Improve naming and eliminate magic numbers
  - **Phase 5**: Restructure classes and modules for separation of concerns

- Assess refactoring risks and create rollback strategy
- Identify prerequisite changes and dependencies
- Plan validation checkpoints throughout process
- Update session state with comprehensive plan

STEP 3: Method Extraction and Function Decomposition

FOR EACH complex function IN analysis_targets:

Think about optimal decomposition strategy for each function.

- Identify distinct responsibilities and concerns
- Extract helper methods with clear, descriptive names
- Reduce parameter counts through object encapsulation
- Eliminate deep nesting through early returns
- Create focused, single-purpose functions

Example transformation pattern:

```
BEFORE: 50-line function with mixed concerns
AFTER: 5-10 line orchestrator + 3-5 focused helper methods
```

Update files using MultiEdit for batch refactoring operations.

STEP 4: Conditional Logic Simplification

- Identify complex boolean expressions and nested conditionals
- Extract boolean logic into descriptive predicate functions
- Replace nested if-else chains with guard clauses
- Use early returns to reduce nesting depth
- Combine related conditions into semantic groups

Apply transformations:

- Complex conditionals → Named boolean functions
- Nested if-else → Early return patterns
- Magic numbers → Named constants
- Complex expressions → Intermediate variables with descriptive names

STEP 5: Loop and Iteration Modernization

- Replace imperative loops with functional constructs where appropriate
- Use language-specific higher-order functions (map, filter, reduce)
- Eliminate manual index management and mutation
- Convert accumulator patterns to functional equivalents
- Maintain performance characteristics while improving readability

Framework-specific optimizations:

- JavaScript/TypeScript: Array methods, async/await patterns
- Python: List comprehensions, generator expressions
- Rust: Iterator chains, functional transformations
- Go: Range loops, slice operations
- Java: Stream API, functional interfaces

STEP 6: Naming and Documentation Enhancement

- Replace abbreviations and cryptic names with descriptive alternatives
- Use domain-specific terminology consistently
- Make boolean variables and functions interrogative
- Eliminate generic names (data, info, temp, utils)
- Add targeted documentation for complex algorithms only

Quality checks:

- Names should explain intent, not implementation
- Functions should read like sentences
- Variables should describe what they contain
- Constants should explain why the value matters

STEP 7: Structural Refactoring and Separation of Concerns

Think deeply about optimal module and class structure.

- Identify mixed responsibilities in classes and modules
- Extract specialized services and utilities
- Apply dependency injection for better testability
- Reduce coupling through interface segregation
- Group related functionality into cohesive modules

Create architectural improvements:

- Single Responsibility Principle adherence
- Interface-based design for flexibility
- Composition over inheritance patterns
- Clear module boundaries and dependencies

STEP 8: Validation and Quality Assurance

TRY:

- Run existing test suite to verify functionality preservation
- Execute static analysis tools for complexity metrics
- Perform manual code review of all changes
- Validate performance hasn't degraded
- Ensure code coverage is maintained or improved
- Save checkpoint: validation_complete

CATCH (test_failures):

- Analyze failing tests and identify root causes
- Restore from previous checkpoint if critical functionality broken
- Fix issues incrementally with focused changes
- Update tests if behavior legitimately changed
- Document any intentional behavior modifications

CATCH (performance_regression):

- Profile performance-critical paths
- Optimize functional constructs if needed
- Consider hybrid approaches for hot paths
- Maintain simplification gains while restoring performance
- Document performance trade-offs made

STEP 9: Documentation and Cleanup

- Generate simplification summary with metrics
- Document architectural changes and design decisions
- Update code comments for complex algorithms only
- Remove outdated comments and TODO items
- Create refactoring guide for team reference

Generate comprehensive improvement report:

```markdown
## Simplification Summary

**Complexity Metrics:**

- Cyclomatic complexity: {before} → {after}
- Average function length: {before} → {after} lines
- Code duplication: {before} → {after} instances
- Test coverage: {before} → {after}%

**Key Improvements:**

- Extracted {N} methods for better separation of concerns
- Simplified {N} complex conditional expressions
- Replaced {N} imperative loops with functional constructs
- Improved naming for {N} variables/functions

**Files Modified:** {file_count}
**Lines Changed:** {line_delta}
**Estimated Maintainability Improvement:** {percentage}%
```

STEP 10: State Management and Session Completion

TRY:

- Finalize simplification session state
- Archive transformation patterns for reuse
- Create rollback instructions if needed
- Generate team knowledge sharing materials
- Save checkpoint: simplification_complete

CATCH (incomplete_refactoring):

- Document partial completion status
- Create continuation plan for next session
- Save intermediate results and progress
- Provide recommendations for remaining work

FINALLY:

- Clean up temporary analysis files: /tmp/simplify-temp-$SESSION_ID-*
- Generate final metrics comparison report
- Update session state with completion status
- Archive refactoring patterns for future use

```json
// /tmp/simplify-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "target": "$ARGUMENTS",
  "phase": "completion",
  "metrics": {
    "before": {
      "cyclomatic_complexity": 0,
      "function_count": 0,
      "average_function_length": 0,
      "code_duplication": 0
    },
    "after": {
      "cyclomatic_complexity": 0,
      "function_count": 0,
      "average_function_length": 0,
      "code_duplication": 0
    }
  },
  "changes": {
    "files_modified": 0,
    "methods_extracted": 0,
    "conditionals_simplified": 0,
    "loops_modernized": 0,
    "variables_renamed": 0
  },
  "checkpoints": {
    "complexity_analysis": "complete",
    "strategy_planning": "complete",
    "refactoring_execution": "complete",
    "validation": "complete"
  }
}
```

## Simplification Patterns and Examples

### Method Extraction Pattern

**Before:** Large function with mixed concerns

```javascript
function processOrder(order) {
  // 50 lines of validation logic
  // 30 lines of calculation
  // 40 lines of formatting
}
```

**After:** Decomposed with clear responsibilities

```javascript
function processOrder(order) {
  const validatedOrder = validateOrder(order);
  const calculations = calculateTotals(validatedOrder);
  return formatOrderResponse(calculations);
}
```

### Conditional Simplification Pattern

**Before:** Complex nested conditions

```python
if user.age >= 18 and user.age <= 65 and user.status == "active" and not user.suspended:
    if user.balance > 0 or user.credit_limit > 0:
        return True
return False
```

**After:** Descriptive predicate functions

```python
def is_eligible_user(user):
    is_valid_age = 18 <= user.age <= 65
    is_active = user.status == "active" and not user.suspended
    has_funds = user.balance > 0 or user.credit_limit > 0
    return is_valid_age and is_active and has_funds
```

### Loop Modernization Pattern

**Before:** Imperative accumulation

```rust
let mut results = Vec::new();
for item in items {
    if item.is_valid() {
        results.push(item.transform());
    }
}
```

**After:** Functional transformation

```rust
let results: Vec<_> = items
    .into_iter()
    .filter(|item| item.is_valid())
    .map(|item| item.transform())
    .collect();
```

## Extended Thinking Integration

This command leverages extended thinking for:

- **Complex Code Analysis**: Deep analysis of architectural patterns and anti-patterns
- **Refactoring Strategy**: Systematic evaluation of transformation trade-offs
- **Risk Assessment**: Comprehensive analysis of refactoring risks and mitigation strategies
- **Performance Impact**: Detailed consideration of simplification effects on performance

## Quality Assurance Guidelines

- **Preserve Functionality**: All existing behavior must be maintained
- **Maintain Performance**: No significant performance degradation
- **Improve Maintainability**: Focus on long-term code health
- **Follow Conventions**: Respect team and language idioms
- **Validate Changes**: Comprehensive testing and verification

## Integration with Development Workflow

- Use after complex feature implementation for cleanup
- Apply before major feature additions to reduce complexity
- Integrate with code review process for continuous improvement
- Combine with `/analyze-complexity` for detailed metrics
- Follow with `/generate-tests` for improved test coverage

The goal is creating cleaner, more maintainable code through systematic simplification while preserving all functionality and performance characteristics.