---
allowed-tools: mcp__context7__resolve-library-id, mcp__context7__get-library-docs, WebFetch, Write, Bash(gdate:*)
name: "Context Load Java Spring"
description: "Load comprehensive Java Spring Framework documentation context for development"
author: "wcygan"
tags: ["context","java"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Java projects: !`fd "(pom\.xml|build\.gradle)" --max-depth 3 | head -5 || echo "No Java projects found"`
- Spring usage: !`rg "(spring-boot|springframework)" . --type java --type xml | wc -l | tr -d ' ' || echo "0"`
- Spring Boot configs: !`fd "(application\.(yml|yaml|properties)|bootstrap\.(yml|yaml|properties))" --max-depth 3 | head -5 || echo "No Spring Boot configs found"`
- Maven/Gradle configs: !`fd "(pom\.xml|build\.gradle|gradle\.properties)" . | head -3 || echo "No build configs found"`
- JPA entities: !`rg "@Entity|@Table" . --type java | wc -l | tr -d ' ' || echo "0"`
- REST controllers: !`rg "@RestController|@Controller" . --type java | wc -l | tr -d ' ' || echo "0"`

## Your Task

STEP 1: Initialize Context Loading Session

- Create context session file: /tmp/spring-context-$SESSION_ID.json
- Initialize documentation tracking and priority loading queue
- Set focus areas based on project context and detected Spring features

STEP 2: Load Core Spring Framework Documentation

TRY:

- Resolve Spring Framework library ID using Context7 MCP server
- Load comprehensive documentation with focus on:
  - Dependency injection and IoC container fundamentals
  - Spring Boot auto-configuration and starter modules
  - Web MVC framework and RESTful service development
  - Spring Security authentication and authorization patterns
  - Spring Data JPA and repository patterns
  - Testing strategies and Spring Boot Test framework
    CATCH (context7_unavailable):
- Fallback to WebFetch for essential documentation URLs:
  - `https://spring.io/projects/spring-boot`
  - `https://docs.spring.io/spring-framework/reference/`
  - `https://spring.io/projects/spring-security`
  - `https://spring.io/projects/spring-data`
  - `https://spring.io/guides`

STEP 3: Focus Area Deep Dive

Load specialized context based on detected project needs:

IF Spring Boot usage detected:

- Prioritize auto-configuration and starter documentation
- Load application properties and profile configuration
- Focus on Spring Boot Actuator monitoring and metrics
- Emphasize testing with @SpringBootTest and test slices

ELSE IF JPA entities detected:

- Prioritize Spring Data JPA documentation
- Load repository pattern and query method guides
- Focus on transaction management and database integration
- Emphasize entity relationship mapping and performance

ELSE IF REST controllers detected:

- Prioritize Spring Web MVC documentation
- Load REST API design patterns and best practices
- Focus on request/response handling and validation
- Emphasize Spring Security for API protection

ELSE:

- Load general Spring Framework foundation documentation
- Emphasize dependency injection and core concepts
- Focus on getting started guides and basic configuration
- Include Spring Boot setup and project structure

STEP 4: Synthesize Loaded Context

- Create actionable knowledge summary in context session file
- Organize by: core concepts, web development, data access, security, testing
- Highlight Spring Boot advantages and auto-configuration benefits
- Document best practices and common Spring anti-patterns

STEP 5: Validate Context Completeness

- Verify coverage of essential Spring Framework concepts
- Ensure Spring Boot development workflow guidance is complete
- Confirm security and data access patterns are loaded
- Save context validation results to session state

## Expected Capabilities After Loading

Upon completion, you will provide expert guidance on:

- **Spring Boot Applications**: Auto-configuration, starters, application structure
- **Dependency Injection**: IoC container, bean management, configuration patterns
- **Web Development**: REST APIs, Spring MVC, request handling, validation
- **Data Access**: Spring Data JPA, repositories, transaction management
- **Security Implementation**: Authentication, authorization, OAuth2, JWT
- **Testing Strategies**: Unit testing, integration testing, test slices
- **Configuration Management**: Properties, profiles, externalized configuration
- **Monitoring**: Spring Boot Actuator, metrics, health checks

## Context Loading Priority

1. **High Priority**: Spring Boot basics, dependency injection, web MVC fundamentals
2. **Medium Priority**: Data access patterns, security implementation, testing
3. **Low Priority**: Advanced features, microservices patterns, cloud integration

The goal is comprehensive Spring Framework expertise enabling efficient Java enterprise application development with modern Spring Boot practices.