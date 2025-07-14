---
allowed-tools: WebFetch, mcp__context7__resolve-library-id, mcp__context7__get-library-docs, Bash(fd:*), Bash(rg:*), Bash(gdate:*), Bash(jq:*), Bash(wc:*), Read, Write, Task
name: "Context Load Testing Java"
description: "Load comprehensive Java testing documentation with project-specific analysis and adaptive context loading"
author: "wcygan"
tags: ["context","testing"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Java projects detected: !`fd "(pom\.xml|build\.gradle|build\.gradle\.kts)$" . -d 3 | wc -l | tr -d ' ' || echo "0"`
- Build tools: !`fd "(pom\.xml|build\.gradle|build\.gradle\.kts)$" . -d 3 | head -5 || echo "No build files found"`
- Test directories: !`fd "test" . -t d | head -10 || echo "No test directories found"`
- JUnit version indicators: !`rg "junit" . --type xml --type gradle --type kotlin | wc -l | tr -d ' ' || echo "0"`
- Spring Boot indicators: !`rg "@SpringBootTest|@WebMvcTest|@DataJpaTest" . --type java | wc -l | tr -d ' ' || echo "0"`
- Quarkus indicators: !`rg "@QuarkusTest|quarkus" . --type java --type xml --type gradle | wc -l | tr -d ' ' || echo "0"`
- Mockito usage: !`rg "@Mock|@MockBean|Mockito" . --type java | wc -l | tr -d ' ' || echo "0"`
- Testcontainers usage: !`rg "@Testcontainers|TestcontainersExtension" . --type java | wc -l | tr -d ' ' || echo "0"`
- Existing test files: !`fd "\.java$" . | rg "(Test|Spec)\.java$" | wc -l | tr -d ' ' || echo "0"`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "Yes" || echo "No"`

## Your Task

STEP 1: Initialize Java testing context session

- CREATE session state file: `/tmp/java-testing-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "ISO_8601_TIMESTAMP",
    "phase": "initialization",
    "project_analysis": {
      "build_tool": "auto-detect",
      "java_framework": "auto-detect",
      "testing_maturity": "unknown",
      "existing_test_patterns": []
    },
    "documentation_sources": {},
    "context_focus_areas": [],
    "recommendations": [],
    "checkpoints": []
  }
  ```
- CREATE context workspace: `/tmp/java-testing-context-$SESSION_ID/`
- INITIALIZE project analysis for Java testing framework detection

STEP 2: Java project analysis and testing framework detection

- ANALYZE detected build tools and Java project structure from Context section
- DETERMINE primary testing frameworks and maturity level:
  - **Enterprise**: Multiple frameworks, Spring Boot/Quarkus, Testcontainers, >50 test files
  - **Moderate**: JUnit 5, some integration testing, 10-50 test files
  - **Basic**: JUnit 4/5, unit tests only, <10 test files
- IDENTIFY testing gaps and improvement opportunities
- ASSESS current testing patterns and anti-patterns

CASE detected_testing_maturity:
WHEN "enterprise":

- SET complexity_level = "enterprise"
- ENABLE comprehensive documentation loading with sub-agents
- FOCUS on advanced patterns, performance testing, CI/CD integration

WHEN "moderate":

- SET complexity_level = "moderate"
- USE focused documentation loading with extended thinking
- Think harder about optimal testing strategies for detected Java framework
- PRIORITIZE integration testing, mocking patterns, test organization

WHEN "basic":

- SET complexity_level = "basic"
- PROCEED with fundamental testing documentation
- EMPHASIZE JUnit basics, assertion patterns, test structure

STEP 3: Adaptive documentation loading strategy

TRY:

IF complexity_level == "enterprise":

- USE Task tool to delegate parallel documentation loading:
  1. **JUnit Advanced Agent**: JUnit 5 extensions, parameterized tests, dynamic tests
     - LOAD: `https://junit.org/junit5/docs/current/user-guide/`
     - SAVE findings to: `/tmp/java-testing-context-$SESSION_ID/junit-advanced.json`
  2. **Integration Testing Agent**: Testcontainers, database testing, API testing
     - LOAD: `https://testcontainers.com/`
     - LOAD: Spring Boot Testing Guide
     - SAVE findings to: `/tmp/java-testing-context-$SESSION_ID/integration-testing.json`
  3. **Mocking & Stubbing Agent**: Mockito, WireMock, test doubles
     - LOAD: `https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html`
     - SAVE findings to: `/tmp/java-testing-context-$SESSION_ID/mocking-patterns.json`
  4. **Framework Testing Agent**: Spring Boot/Quarkus specific testing
     - LOAD framework-specific testing documentation
     - SAVE findings to: `/tmp/java-testing-context-$SESSION_ID/framework-testing.json`
  5. **Performance & Quality Agent**: Performance testing, test optimization
     - LOAD: Testing performance patterns and quality metrics
     - SAVE findings to: `/tmp/java-testing-context-$SESSION_ID/performance-testing.json`

ELSE IF complexity_level == "moderate":

- EXECUTE focused documentation loading with extended thinking:
  - Think harder about optimal testing strategies for detected Java framework
  - LOAD core documentation sources:
    1. **JUnit 5 Documentation**: Annotations, assertions, lifecycle
    2. **Mockito Documentation**: Mocking patterns and best practices
    3. **Framework-Specific Testing**: Spring Boot OR Quarkus testing guides
    4. **Integration Testing**: Basic Testcontainers and database testing
  - FOCUS on practical implementation patterns and common pitfalls

ELSE:

- PERFORM streamlined documentation loading:
  - LOAD essential testing documentation:
    1. **JUnit Basics**: Core annotations, assertions, test structure
    2. **Mockito Fundamentals**: Basic mocking and verification
    3. **Testing Best Practices**: Test naming, organization, maintainability
  - PRIORITIZE getting-started examples and fundamental patterns

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions for failed sources
- SAVE fallback documentation references

STEP 4: Java testing documentation loading execution

**Core Documentation Sources (load based on complexity level):**

1. **JUnit 5 User Guide**
   - URL: `https://junit.org/junit5/docs/current/user-guide/`
   - FETCH: Annotations, assertions, parameterized tests, extensions, lifecycle
   - FOCUS: @Test, @ParameterizedTest, @DynamicTest, @ExtendWith, assertions
   - EXTRACT: Modern JUnit patterns and migration from JUnit 4

2. **Testcontainers Documentation**
   - URL: `https://testcontainers.com/`
   - FETCH: Database testing, Docker integration, test lifecycle
   - FOCUS: @Testcontainers, container initialization, database containers
   - EXTRACT: Integration testing patterns and Docker test automation

3. **Mockito Documentation**
   - URL: `https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html`
   - FETCH: Mocking, stubbing, verification, spy objects, annotations
   - FOCUS: @Mock, @MockBean, when().thenReturn(), verify(), ArgumentCaptor
   - EXTRACT: Effective mocking strategies and test double patterns

4. **Spring Boot Testing Guide**
   - URL: `https://spring.io/guides/gs/testing-web/`
   - FETCH: Test slices, MockMvc, TestRestTemplate, test annotations
   - FOCUS: @SpringBootTest, @WebMvcTest, @DataJpaTest, @MockBean
   - EXTRACT: Spring-specific testing patterns and dependency injection in tests

5. **Quarkus Testing Documentation**
   - URL: `https://quarkus.io/guides/getting-started-testing`
   - FETCH: QuarkusTest, native testing, CDI in tests, test profiles
   - FOCUS: @QuarkusTest, @TestProfile, native image testing
   - EXTRACT: Quarkus-specific testing patterns and GraalVM native testing

6. **AssertJ Fluent Assertions**
   - URL: `https://assertj.github.io/doc/`
   - FETCH: Fluent assertions, custom assertions, soft assertions
   - FOCUS: assertThat(), custom assertion creation, exception testing
   - EXTRACT: Modern assertion patterns and readable test code

STEP 5: Framework-specific context optimization

CASE detected_java_framework:
WHEN "spring_boot":

- PRIORITIZE: Spring Boot test slices, MockMvc, TestRestTemplate patterns
- FOCUS: @SpringBootTest configuration, test profiles, context caching
- EXAMPLES: Web layer testing, data layer testing, integration testing
- PATTERNS: Custom test configurations, test data builders

WHEN "quarkus":

- PRIORITIZE: QuarkusTest patterns, CDI testing, native image testing
- FOCUS: Test profiles, dependency injection, dev services integration
- EXAMPLES: JAX-RS testing, database testing, messaging testing
- PATTERNS: Test resource lifecycle, configuration override patterns

WHEN "plain_java":

- PRIORITIZE: Core JUnit patterns, Mockito usage, test organization
- FOCUS: Test structure, dependency injection alternatives, build integration
- EXAMPLES: Unit testing, integration testing without frameworks
- PATTERNS: Manual dependency injection, test utilities, custom runners

WHEN "multiple_frameworks":

- PRIORITIZE: Framework-agnostic patterns, integration strategies
- FOCUS: Shared testing utilities, cross-framework compatibility
- EXAMPLES: Multi-module testing, framework migration strategies
- PATTERNS: Abstraction layers, common testing infrastructure

STEP 6: Context synthesis and project-specific recommendations

- ORGANIZE loaded context by Java testing domains:
  - **Fundamentals**: JUnit 5 basics, test structure, naming conventions
  - **Unit Testing**: Isolation, mocking, assertion patterns, test data
  - **Integration Testing**: Testcontainers, database testing, API testing
  - **Framework Testing**: Spring Boot/Quarkus-specific patterns
  - **Advanced Patterns**: Parameterized tests, dynamic tests, custom extensions
  - **Test Organization**: Package structure, test categories, parallel execution
  - **Quality & Performance**: Test coverage, performance testing, CI integration

- SYNTHESIZE project-specific guidance:
  - Integration with detected build tools (Maven/Gradle)
  - Migration strategies from detected older testing patterns
  - Performance considerations for current project scale
  - Best practices for detected Java framework

STEP 7: Enhanced testing recommendations generation

- GENERATE testing maturity roadmap:
  ```json
  {
    "current_state": {
      "testing_frameworks": ["detected frameworks"],
      "test_coverage_estimate": "low|medium|high",
      "integration_testing": "none|basic|comprehensive",
      "mocking_patterns": "none|basic|advanced"
    },
    "improvement_phases": [
      {
        "phase": "Foundation",
        "duration": "1-2 weeks",
        "goals": ["Standardize JUnit 5", "Add basic assertions", "Organize test structure"],
        "deliverables": ["Test conventions", "Basic test utilities", "CI integration"]
      },
      {
        "phase": "Integration",
        "duration": "2-3 weeks",
        "goals": ["Add Testcontainers", "Database testing", "API testing"],
        "deliverables": ["Integration test suite", "Test data management", "Docker test setup"]
      },
      {
        "phase": "Advanced",
        "duration": "2-4 weeks",
        "goals": ["Performance testing", "Custom extensions", "Test optimization"],
        "deliverables": ["Performance benchmarks", "Custom test framework", "Parallel execution"]
      }
    ]
  }
  ```

STEP 8: Session state management and artifact creation

- UPDATE session state with comprehensive analysis results
- CREATE testing context guide: `/tmp/java-testing-context-$SESSION_ID/testing-guide.md`
- GENERATE framework-specific examples: `/tmp/java-testing-context-$SESSION_ID/examples/`
- SAVE testing patterns library: `/tmp/java-testing-context-$SESSION_ID/patterns.json`
- CREATE migration recommendations: `/tmp/java-testing-context-$SESSION_ID/migration-guide.md`
- DOCUMENT testing infrastructure setup: `/tmp/java-testing-context-$SESSION_ID/infrastructure.md`

FINALLY:

- UPDATE session state: phase = "complete"
- ARCHIVE context session data for future reference
- PROVIDE comprehensive Java testing context summary
- CLEAN UP temporary processing files: `/tmp/java-testing-temp-$SESSION_ID-*`

## Context Loading Strategy

**Adaptive Loading Based on Project Analysis:**

CASE project_context:
WHEN "enterprise_java_services":

- PRIORITIZE: Advanced testing patterns, performance testing, CI/CD integration
- FOCUS: Testcontainers, custom extensions, parallel execution, test optimization
- EXAMPLES: Microservices testing, database integration, API contract testing

WHEN "spring_boot_applications":

- PRIORITIZE: Spring Boot test slices, MockMvc patterns, auto-configuration testing
- FOCUS: @SpringBootTest variations, test profiles, context caching
- EXAMPLES: Web layer testing, security testing, data layer testing

WHEN "quarkus_native_applications":

- PRIORITIZE: QuarkusTest patterns, native image testing, dev services
- FOCUS: CDI testing, test profiles, native compilation testing
- EXAMPLES: JAX-RS testing, reactive testing, GraalVM native testing

WHEN "legacy_java_migration":

- PRIORITIZE: JUnit 4 to 5 migration, modernization patterns, gradual adoption
- FOCUS: Migration strategies, compatibility patterns, incremental improvements
- EXAMPLES: Legacy test modernization, framework integration, build tool updates

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Java version compatibility
- VALIDATE testing patterns for current Java ecosystem (Java 17+ LTS)
- CHECK for deprecated APIs and migration paths
- ENSURE Spring Boot/Quarkus version compatibility
- CONFIRM examples work with current framework versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Java Testing Fundamentals:**

- JUnit 5 annotations, lifecycle, and execution model
- Modern assertion patterns with AssertJ
- Test structure, naming conventions, and organization
- Parameterized and dynamic test creation
- Custom test extensions and runners

**Integration Testing Mastery:**

- Testcontainers for database and service testing
- Docker integration and container lifecycle management
- Database testing patterns and data management
- API testing with TestRestTemplate and MockMvc
- Message queue and external service testing

**Mocking and Test Doubles:**

- Mockito advanced patterns and best practices
- @Mock, @MockBean, and @Spy usage patterns
- Argument matchers and custom verification
- WireMock for external service mocking
- Test double strategies and when to use each

**Framework-Specific Testing:**

- Spring Boot test slices (@WebMvcTest, @DataJpaTest, etc.)
- Spring Boot test configuration and profiles
- Quarkus testing with @QuarkusTest and CDI
- Native image testing with GraalVM
- Framework-specific mocking and dependency injection

**Advanced Testing Techniques:**

- Parallel test execution and thread safety
- Performance testing and benchmarking
- Custom test extensions and annotations
- Test data builders and factory patterns
- Cross-cutting concerns testing (security, caching, etc.)

**Testing Infrastructure:**

- Build tool integration (Maven/Gradle) with testing
- CI/CD pipeline testing strategies
- Test reporting and coverage analysis
- Docker-based testing environments
- Test environment management and isolation

The context loading adapts to your specific Java project structure and emphasizes the most relevant testing documentation areas for your current development stack and maturity level.

## Session State Management

**State Files Created:**

- `/tmp/java-testing-context-$SESSION_ID.json` - Main session state
- `/tmp/java-testing-context-$SESSION_ID/testing-guide.md` - Comprehensive testing guide
- `/tmp/java-testing-context-$SESSION_ID/examples/` - Framework-specific examples
- `/tmp/java-testing-context-$SESSION_ID/patterns.json` - Testing patterns library
- `/tmp/java-testing-context-$SESSION_ID/migration-guide.md` - Migration recommendations

**Enhanced State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "phase": "initialization|analysis|loading|synthesis|complete",
  "project_analysis": {
    "java_projects_count": "number",
    "build_tool": "maven|gradle|mixed|unknown",
    "java_framework": "spring_boot|quarkus|plain_java|multiple",
    "testing_maturity": "basic|moderate|enterprise",
    "existing_test_files": "number",
    "junit_version": "4|5|mixed|unknown",
    "spring_boot_version": "version_string|unknown",
    "quarkus_version": "version_string|unknown"
  },
  "documentation_loaded": {
    "junit5_guide": "loaded|failed|skipped",
    "testcontainers": "loaded|failed|skipped",
    "mockito_docs": "loaded|failed|skipped",
    "spring_boot_testing": "loaded|failed|skipped",
    "quarkus_testing": "loaded|failed|skipped",
    "assertj_docs": "loaded|failed|skipped"
  },
  "context_focus_areas": [
    "junit_fundamentals",
    "integration_testing",
    "mocking_patterns",
    "framework_testing",
    "test_organization",
    "performance_testing"
  ],
  "testing_recommendations": {
    "immediate_improvements": [],
    "migration_strategy": [],
    "framework_specific_patterns": [],
    "infrastructure_setup": []
  },
  "checkpoints": {
    "project_analysis_complete": "boolean",
    "documentation_loaded": "boolean",
    "context_synthesized": "boolean",
    "recommendations_generated": "boolean",
    "session_archived": "boolean"
  }
}
```

## Usage Example

```bash
/context-load-testing-java
```

**Expected Output:**

```
✅ Java testing context loaded successfully
📊 Project Analysis: 3 Maven projects, Spring Boot 3.2.x, JUnit 5
📚 Documentation Loaded: JUnit 5, Testcontainers, Mockito, Spring Boot Testing
🎯 Focus Areas: Integration testing, MockMvc patterns, test slices
📋 Recommendations: 12 immediate improvements, migration strategy included
💾 Context saved to: /tmp/java-testing-context-1751900304043393000/
```