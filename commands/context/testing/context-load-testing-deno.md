---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(deno:*)
name: "Context Load Testing Deno"
description: "Load comprehensive Deno testing documentation context with project-specific optimization"
author: "wcygan"
tags: ["context","testing"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "session-$(date +%s)000000000"`
- Current directory: !`pwd`
- Deno projects: !`fd "deno\\.json" . | head -5 || echo "No Deno projects found"`
- Test files: !`fd "*_test\\.(ts|js)$" . | head -5 || echo "No Deno test files found"`
- Fresh projects: !`rg "(fresh|@fresh)" . --type json | wc -l | tr -d ' ' || echo "0"`
- Testing imports: !`rg "(@std/testing|@std/assert|@std/testing/)" . --type typescript | wc -l | tr -d ' ' || echo "0"`
- Deno configuration: !`fd "(deno\\.json|deno\\.jsonc)" . | head -3 || echo "No Deno config found"`
- Test scripts: !`rg '"test"' . --type json | head -3 || echo "No test scripts found"`
- Technology stack: !`fd "(package\\.json|Cargo\\.toml|go\\.mod)" . | head -3 || echo "Deno-only project"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/deno-testing-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "deno_testing_features_detected": []
  }
  ```

STEP 2: Project-specific context analysis

- ANALYZE project structure from Context section
- DETERMINE specific Deno testing frameworks and patterns in use
- IDENTIFY documentation priorities based on project needs

IF Deno projects with existing test files found:

- FOCUS on project-specific testing patterns and optimization
- PRIORITIZE relevant testing strategies (unit, integration, e2e)
- INCLUDE debugging and performance testing contexts
  ELSE:
- LOAD general Deno testing foundation and getting-started guides
- EMPHASIZE setup, configuration, and basic testing patterns
- INCLUDE project setup and test organization workflows

STEP 3: Strategic documentation loading

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by functional area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **Deno Testing Fundamentals**
   - URL: `https://docs.deno.com/runtime/fundamentals/testing/`
   - FETCH: Core Deno.test API, assertions, test organization, coverage
   - FOCUS: Built-in testing framework, test lifecycle, async patterns
   - EXTRACT: Best practices for test structure and execution

2. **Deno Standard Library Testing**
   - URL: `https://jsr.io/@std/testing`
   - FETCH: Assertion library, mocking utilities, test helpers
   - FOCUS: Assert functions, mock creation, test utilities
   - EXTRACT: Advanced testing patterns and mock strategies

3. **Fresh Framework Testing**
   - URL: `https://fresh.deno.dev/docs/concepts/testing`
   - FETCH: Component testing, route testing, island testing patterns
   - FOCUS: Fresh-specific testing strategies and tools
   - EXTRACT: Component isolation, server-side testing, client-side testing

4. **Deno Testing Examples**
   - URL: `https://docs.deno.com/examples/`
   - FETCH: Practical testing patterns, async testing, HTTP testing
   - FOCUS: Real-world testing scenarios and patterns
   - EXTRACT: Complete testing examples and integration patterns

5. **Testing Best Practices Guide**
   - URL: `https://docs.deno.com/runtime/fundamentals/testing/#best-practices`
   - FETCH: Test organization, performance, debugging strategies
   - FOCUS: Test structure, naming conventions, performance optimization
   - EXTRACT: Professional testing workflows and debugging techniques

6. **Deno Testing CLI Documentation**
   - URL: `https://docs.deno.com/runtime/reference/cli/test/`
   - FETCH: Test runner configuration, filtering, coverage options
   - FOCUS: CLI options, test filtering, coverage analysis
   - EXTRACT: Advanced test execution and reporting patterns

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and optimization

- ORGANIZE loaded context by functional area:
  - Deno.test API and test lifecycle management
  - Assertion patterns and error handling
  - Mock creation and dependency isolation
  - Component testing strategies for Fresh applications
  - Async testing patterns and timing
  - HTTP testing and API endpoint validation
  - File system testing and temporary resources
  - Coverage measurement and reporting
  - Test organization and naming conventions
  - Performance testing and benchmarking

- SYNTHESIZE project-specific guidance:
  - Integration with existing Deno/Fresh codebase
  - Testing strategies for detected frameworks
  - Best practices for project-specific use cases
  - CI/CD integration and automated testing

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/deno-testing-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE project_context:
WHEN "existing_deno_project_with_tests":

- PRIORITIZE: Test optimization, advanced patterns, performance tuning
- FOCUS: Mock strategies, coverage analysis, CI/CD integration
- EXAMPLES: Complex async testing, database mocking, performance benchmarks

WHEN "fresh_application":

- PRIORITIZE: Component testing, route testing, island architecture testing
- FOCUS: Fresh-specific patterns, server-side rendering tests, client hydration
- EXAMPLES: Route handlers, component isolation, full-stack testing

WHEN "new_deno_project":

- PRIORITIZE: Getting started, basic patterns, test organization
- FOCUS: Deno.test fundamentals, assertion usage, file structure
- EXAMPLES: Basic unit tests, simple mocks, test runner configuration

WHEN "migration_to_deno":

- PRIORITIZE: Migration patterns, compatibility, tooling differences
- FOCUS: Converting existing tests, Deno-specific patterns, dependency updates
- EXAMPLES: Jest to Deno.test migration, mock library replacements

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Deno version compatibility
- VALIDATE code examples for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with current Deno versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Deno Testing Capabilities:**

- Deno.test API usage and test lifecycle management
- Built-in assertion library and custom assertion patterns
- Mock creation and dependency isolation strategies
- Async testing patterns and timing considerations
- Test organization and naming conventions
- Coverage measurement and reporting

**Fresh Framework Testing:**

- Component testing strategies for islands and routes
- Server-side rendering and client-side hydration testing
- API route testing and middleware validation
- Integration testing for full-stack Fresh applications
- Performance testing and optimization for Fresh apps

**Advanced Testing Techniques:**

- HTTP testing patterns for APIs and web services
- File system testing with temporary resources
- Database testing with mocks and test databases
- Performance testing and benchmarking strategies
- Error handling and edge case testing
- Security testing and validation patterns

**Testing Workflow Integration:**

- Test runner configuration and CLI usage
- CI/CD integration with GitHub Actions and other platforms
- Code coverage analysis and reporting
- Test debugging and troubleshooting techniques
- Test automation and continuous testing strategies

**Project-Specific Optimization:**

- Testing strategies tailored to detected project structure
- Framework-specific testing patterns and optimizations
- Performance considerations for large test suites
- Best practices for team collaboration and test maintenance

The context loading adapts to your specific project structure and emphasizes the most relevant Deno testing documentation areas for your current development needs.