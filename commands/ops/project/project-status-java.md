---
allowed-tools: Task, Bash(java:*), Bash(javac:*), Bash(gradle:*), Bash(mvn:*), Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(echo:*), Bash(which:*), Bash(eza:*), Bash(bat:*)
name: "Project Status Java"
description: "Ultra-fast Java project health check using 8 parallel sub-agents for comprehensive Gradle/Maven analysis"
author: "wcygan"
tags: ["ops","project"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Check mode: $ARGUMENTS (optional - quick or detailed, default: quick)
- Current directory: !`pwd`
- Java version: !`java -version 2>&1 | head -1 || echo "Java not installed"`
- Build tool: !`[ -f build.gradle ] || [ -f build.gradle.kts ] && echo "Gradle" || ([ -f pom.xml ] && echo "Maven" || echo "No build file found")`
- Spring Boot: !`rg -q "spring-boot" build.gradle* pom.xml 2>/dev/null && echo "Spring Boot detected" || echo "Not a Spring Boot project"`
- Quarkus: !`rg -q "quarkus" build.gradle* pom.xml 2>/dev/null && echo "Quarkus detected" || echo "Not a Quarkus project"`

## Your Task

**IMMEDIATELY DEPLOY 8 PARALLEL JAVA PROJECT HEALTH AGENTS** for ultra-fast comprehensive project analysis: **${ARGUMENTS:-quick} mode**

**CRITICAL**: Launch ALL agents simultaneously in first response - NO sequential processing.

## Parallel Java Project Health Framework

**NO SEQUENTIAL PROCESSING** - Deploy these specialized Java health analysis agents in parallel:

1. **Build & Compilation Agent**: Gradle/Maven build status, compilation errors, wrapper detection, build optimization analysis
2. **Test Suite & Coverage Agent**: Test execution, JaCoCo coverage analysis, test framework detection, test quality assessment
3. **Code Quality & Static Analysis Agent**: Checkstyle analysis, SpotBugs detection, code quality metrics, best practices validation
4. **Dependencies & Security Agent**: Dependency analysis, vulnerability scanning, OWASP checks, update recommendations
5. **Framework & Architecture Agent**: Spring Boot/Quarkus detection, database technology analysis, architectural patterns
6. **Project Structure Agent**: File organization, package structure, build configuration, best practices compliance
7. **Performance & Metrics Agent**: Build performance, JAR size analysis, optimization opportunities, profiling readiness
8. **Configuration & Standards Agent**: Build wrapper status, plugin configuration, code formatting, development standards

**Expected speedup**: 8x faster than sequential health checks.

**IMMEDIATELY LAUNCH ALL 8 AGENTS:**

**Agent 1: Build & Compilation Analysis**
Analyze Java build health, Gradle/Maven compilation status, wrapper presence, and build configuration. Check for compilation errors, missing dependencies, and build issues.

**Agent 2: Test Suite & Coverage Analysis**
Evaluate test execution, JaCoCo coverage metrics, test framework detection, and test quality patterns. Identify missing tests, coverage gaps, and test performance.

**Agent 3: Code Quality & Static Analysis**
Perform Checkstyle analysis, SpotBugs detection, identify code quality issues, and best practice violations. Check for potential bugs and maintainability problems.

**Agent 4: Dependencies & Security Analysis**
Analyze project dependencies, security vulnerabilities, OWASP dependency checks, and update recommendations. Check for outdated and vulnerable dependencies.

**Agent 5: Framework & Architecture Analysis**
Detect Spring Boot/Quarkus usage, database technologies (jOOQ vs JPA), migration tools (Flyway/Liquibase), and architectural patterns. Assess framework configuration.

**Agent 6: Project Structure Analysis**
Assess package organization, directory structure, build configuration quality, and Java project best practices. Identify structural and organizational issues.

**Agent 7: Performance & Metrics Analysis**
Analyze build performance, JAR/WAR size, memory usage patterns, and optimization opportunities. Check for performance bottlenecks and inefficiencies.

**Agent 8: Configuration & Standards Analysis**
Verify build wrapper presence, plugin configuration, code formatting standards, and development environment setup. Check tool configuration quality.

**CRITICAL**: All agents execute simultaneously for maximum efficiency. Synthesis happens after all agents complete.

Expected completion time: 8x faster than traditional sequential analysis.

## Quick Reference

### Usage Examples

```bash
# Quick health check (default)
/project-status-java

# Detailed analysis with all checks
/project-status-java detailed

# From a specific project directory
cd my-java-project && /project-status-java
```

### Health Checks Performed

1. **Build Health**: Compilation for Gradle/Maven projects
2. **Test Suite**: Test execution and reporting
3. **Code Quality**: Checkstyle and SpotBugs analysis
4. **Dependencies**: Update checks and vulnerability scanning
5. **Test Coverage**: JaCoCo coverage analysis (detailed mode)
6. **Project Structure**: Best practices and framework detection
7. **Framework Analysis**: Spring Boot, Quarkus, database tools
8. **Performance**: Build optimization and resource analysis

This command provides comprehensive Java project health monitoring supporting both Gradle and Maven build systems through parallel sub-agent analysis.