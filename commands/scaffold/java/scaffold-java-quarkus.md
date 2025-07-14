---
allowed-tools: Write, MultiEdit, Bash(mvn:*), Bash(mkdir:*), Bash(fd:*), Bash(rg:*), Bash(gdate:*), Bash(pwd:*), Bash(eza:*)
name: "Scaffold Java Quarkus"
description: "Scaffold production-ready Java Quarkus project with Spring Boot compatibility layer"
author: "wcygan"
tags: ["scaffold","java"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Current directory: !`pwd`
- Project name: $ARGUMENTS
- Java version check: !`java -version 2>&1 | head -1 || echo "Java not installed"`
- Maven status: !`mvn -version 2>&1 | head -1 || echo "Maven not installed"`
- Existing Java projects: !`fd "pom\.xml" . -d 2 | head -5 || echo "No existing Maven projects detected"`
- Available disk space: !`df -h . | tail -1 | awk '{print $4}' || echo "Unknown"`

## Your Task

STEP 1: Initialize Quarkus project scaffolding session with validation

TRY:

- VALIDATE project name from $ARGUMENTS
- CHECK Java and Maven prerequisites
- ENSURE target directory is available
- CREATE session state file: `/tmp/quarkus-scaffold-$SESSION_ID.json`

```bash
# Validate prerequisites
if ! command -v java >/dev/null 2>&1; then
  echo "❌ Java is required but not installed"
  exit 1
fi

if ! command -v mvn >/dev/null 2>&1; then
  echo "❌ Maven is required but not installed"
  exit 1
fi

# Initialize session state
project_name="${ARGUMENTS:-quarkus-spring-app}"
echo '{
  "sessionId": "'$SESSION_ID'",
  "projectName": "'$project_name'",
  "targetDirectory": "./'$project_name'",
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "phase": "initializing"
}' > /tmp/quarkus-scaffold-$SESSION_ID.json
```

IF $ARGUMENTS is empty:

- SET project_name = "quarkus-spring-app"
- WARN user about default naming

IF directory already exists:

- ERROR: "Project directory '$project_name' already exists"
- EXIT gracefully

STEP 2: Create standardized Maven directory structure

EXECUTE directory creation with proper Maven layout:

```bash
# Create Maven standard directory layout
mkdir -p "$project_name"/{src/{main/{java,resources},test/java},target}
mkdir -p "$project_name/src/main/java/com/example/demo"
mkdir -p "$project_name/src/test/java/com/example/demo"

# Update session state
jq '.phase = "structure_created"' /tmp/quarkus-scaffold-$SESSION_ID.json > /tmp/temp.json && \
mv /tmp/temp.json /tmp/quarkus-scaffold-$SESSION_ID.json
```

**Standard Maven Directory Structure:**

- `src/main/java/` - Main application source code
- `src/main/resources/` - Configuration files and static resources
- `src/test/java/` - Test source code
- `target/` - Build output directory

STEP 3: Generate Quarkus Maven POM with Spring compatibility

CREATE comprehensive pom.xml with Quarkus BOM and Spring extensions:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>$project_name</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    
    <name>$project_name</name>
    <description>Quarkus application with Spring Boot compatibility</description>
    
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <maven.compiler.release>21</maven.compiler.release>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <quarkus.platform.version>3.17.5</quarkus.platform.version>
        <surefire-plugin.version>3.2.5</surefire-plugin.version>
        <failsafe-plugin.version>3.2.5</failsafe-plugin.version>
    </properties>
    
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>io.quarkus.platform</groupId>
                <artifactId>quarkus-bom</artifactId>
                <version>${quarkus.platform.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
    <dependencies>
        <!-- Quarkus Spring Web compatibility -->
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-spring-web</artifactId>
        </dependency>
        
        <!-- Core Quarkus extensions -->
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-resteasy-reactive-jackson</artifactId>
        </dependency>
        
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-arc</artifactId>
        </dependency>
        
        <!-- Spring Boot compatibility layer -->
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-spring-boot-properties</artifactId>
        </dependency>
        
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-spring-di</artifactId>
        </dependency>
        
        <!-- Development and testing -->
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-junit5</artifactId>
            <scope>test</scope>
        </dependency>
        
        <dependency>
            <groupId>io.rest-assured</groupId>
            <artifactId>rest-assured</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>io.quarkus.platform</groupId>
                <artifactId>quarkus-maven-plugin</artifactId>
                <version>${quarkus.platform.version}</version>
                <extensions>true</extensions>
                <executions>
                    <execution>
                        <goals>
                            <goal>build</goal>
                            <goal>generate-code</goal>
                            <goal>generate-code-tests</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.12.1</version>
                <configuration>
                    <release>21</release>
                </configuration>
            </plugin>
            
            <plugin>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>${surefire-plugin.version}</version>
                <configuration>
                    <systemPropertyVariables>
                        <java.util.logging.manager>org.jboss.logmanager.LogManager</java.util.logging.manager>
                        <maven.home>${maven.home}</maven.home>
                    </systemPropertyVariables>
                </configuration>
            </plugin>
            
            <plugin>
                <artifactId>maven-failsafe-plugin</artifactId>
                <version>${failsafe-plugin.version}</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>integration-test</goal>
                            <goal>verify</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <systemPropertyVariables>
                        <native.image.path>${project.build.directory}/${project.build.finalName}-runner</native.image.path>
                        <java.util.logging.manager>org.jboss.logmanager.LogManager</java.util.logging.manager>
                        <maven.home>${maven.home}</maven.home>
                    </systemPropertyVariables>
                </configuration>
            </plugin>
        </plugins>
    </build>
    
    <profiles>
        <profile>
            <id>native</id>
            <activation>
                <property>
                    <name>native</name>
                </property>
            </activation>
            <properties>
                <skipITs>false</skipITs>
                <quarkus.package.type>native</quarkus.package.type>
            </properties>
        </profile>
    </profiles>
</project>
```

STEP 4: Generate Spring-compatible REST controller with Quarkus annotations

CREATE main application class and REST controller using Spring Web annotations:

**Main Application Class (`src/main/java/com/example/demo/Application.java`):**

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**REST Controller (`src/main/java/com/example/demo/GreetingController.java`):**

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    @GetMapping("/greeting")
    public GreetingResponse greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new GreetingResponse(String.format("Hello, %s! (Powered by Quarkus)", name));
    }

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse("UP", "Quarkus application is running");
    }

    public static class GreetingResponse {
        private final String message;

        public GreetingResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    public static class HealthResponse {
        private final String status;
        private final String description;

        public HealthResponse(String status, String description) {
            this.status = status;
            this.description = description;
        }

        public String getStatus() {
            return status;
        }

        public String getDescription() {
            return description;
        }
    }
}
```

STEP 5: Create comprehensive test suite

GENERATE unit and integration tests following Quarkus testing patterns:

**Integration Test (`src/test/java/com/example/demo/GreetingControllerTest.java`):**

```java
package com.example.demo;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.containsString;

@QuarkusTest
public class GreetingControllerTest {

    @Test
    public void testGreetingEndpoint() {
        given()
            .when().get("/greeting")
            .then()
                .statusCode(200)
                .body("message", containsString("Hello, World!"))
                .body("message", containsString("Quarkus"));
    }

    @Test
    public void testGreetingWithName() {
        given()
            .queryParam("name", "Quarkus")
            .when().get("/greeting")
            .then()
                .statusCode(200)
                .body("message", containsString("Hello, Quarkus!"));
    }

    @Test
    public void testHealthEndpoint() {
        given()
            .when().get("/health")
            .then()
                .statusCode(200)
                .body("status", containsString("UP"));
    }
}
```

STEP 6: Configure application properties and development environment

CREATE `src/main/resources/application.properties`:

```properties
# Application configuration
quarkus.application.name=$project_name

# HTTP configuration
quarkus.http.port=8080
quarkus.http.host=0.0.0.0

# Development mode configuration
quarkus.live-reload.instrumentation=true

# Logging configuration
quarkus.log.console.enable=true
quarkus.log.console.format=%d{HH:mm:ss} %-5p [%c{2.}] (%t) %s%e%n
quarkus.log.level=INFO

# Spring Boot compatibility
quarkus.spring-boot-properties.enabled=true

# Build optimization
quarkus.package.type=jar
quarkus.native.additional-build-args=-H:ResourceConfigurationFiles=resources-config.json
```

STEP 7: Execute Maven build and validation

RUN initial build to verify project setup and download dependencies:

```bash
cd "$project_name"

echo "📦 Installing dependencies and building project..."
mvn clean install -DskipTests

if [ $? -eq 0 ]; then
  echo "✅ Build successful - dependencies installed"
  
  # Update session state
  jq '.phase = "build_successful"' /tmp/quarkus-scaffold-$SESSION_ID.json > /tmp/temp.json && \
  mv /tmp/temp.json /tmp/quarkus-scaffold-$SESSION_ID.json
  
  echo "🧪 Running tests..."
  mvn test
  
  if [ $? -eq 0 ]; then
    echo "✅ All tests passed"
    jq '.phase = "tests_passed"' /tmp/quarkus-scaffold-$SESSION_ID.json > /tmp/temp.json && \
    mv /tmp/temp.json /tmp/quarkus-scaffold-$SESSION_ID.json
  else
    echo "⚠️ Some tests failed - check output above"
  fi
else
  echo "❌ Build failed - check Maven output for errors"
  exit 1
fi

cd ..
```

STEP 8: Generate project documentation and development guide

CREATE comprehensive README.md with development instructions:

````markdown
# $project_name

Quarkus application with Spring Boot compatibility layer for supersonic startup times.

## Quick Start

```bash
# Development mode with live reload
mvn quarkus:dev

# Run tests
mvn test

# Build for production
mvn clean package
```
````

## Endpoints

- `GET /greeting?name=YourName` - Greeting endpoint
- `GET /health` - Health check endpoint

## Key Features

- Spring Web annotations support (@RestController, @GetMapping)
- Supersonic startup time (~0.1s vs ~3s for Spring Boot)
- Live reload in development mode
- Native compilation support
- Comprehensive test suite

## Development

Start development server:

```bash
mvn quarkus:dev
```

Visit: http://localhost:8080/greeting

## Native Build

```bash
mvn package -Pnative
```

## Technology Stack

- Java 21
- Quarkus 3.17.5 with Spring compatibility
- Maven build system
- JUnit 5 + RestAssured testing

````
CATCH (scaffold_failed):

- LOG error details to session state
- PROVIDE troubleshooting guidance
- CLEAN UP partial project files if necessary

```bash
echo "❌ Project scaffolding failed"
echo "Common issues:"
echo "  - Java/Maven not properly installed"
echo "  - Network connectivity for dependency download"
echo "  - Insufficient disk space"
echo "  - Project directory already exists"

# Clean up on failure
if [ -d "$project_name" ] && [ -z "$(ls -A $project_name 2>/dev/null)" ]; then
  rmdir "$project_name"
  echo "🧹 Cleaned up empty project directory"
fi
````

FINALLY:

- UPDATE session state with completion status
- DISPLAY project summary and next steps
- PROVIDE development guidance

```bash
echo "✅ Quarkus project '$project_name' scaffolded successfully!"
echo ""
echo "📁 Project structure:"
eza -la --tree "$project_name" 2>/dev/null || find "$project_name" -type f | head -10

echo ""
echo "🚀 Next steps:"
echo "  1. cd $project_name"
echo "  2. mvn quarkus:dev     # Start development server"
echo "  3. Open: http://localhost:8080/greeting"
echo ""
echo "📋 Key capabilities:"
echo "  • Spring Web annotation compatibility"
echo "  • ~100x faster startup than Spring Boot"
echo "  • Live reload in development mode" 
echo "  • Native compilation support"
echo "  • Production-ready configuration"

# Final session state update
jq '.phase = "completed" | .completedAt = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"' \
   /tmp/quarkus-scaffold-$SESSION_ID.json > /tmp/temp.json && \
mv /tmp/temp.json /tmp/quarkus-scaffold-$SESSION_ID.json
```

## Example Usage

```bash
# Scaffold new Quarkus project
/scaffold-java-quarkus my-awesome-api

# Start development
cd my-awesome-api
mvn quarkus:dev

# Test endpoints
curl http://localhost:8080/greeting
curl http://localhost:8080/greeting?name=Developer
curl http://localhost:8080/health
```

This command creates a production-ready Quarkus application with Spring Boot compatibility, providing familiar Spring annotations while delivering Quarkus's superior performance characteristics.