---
allowed-tools: WebFetch, mcp__context7__resolve-library-id, mcp__context7__get-library-docs, Read, Bash(fd:*), Bash(rg:*), Bash(yq:*), Bash(gdate:*), Bash(git:*), Bash(wc:*)
name: "Context Load Github Actions"
description: "Load comprehensive GitHub Actions CI/CD documentation with adaptive project-specific context and modern workflow patterns"
author: "wcygan"
tags: ["context","web"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Project type detection: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|deno\.json|requirements\.txt|composer\.json|build\.gradle)$" . -d 2 | head -5 || echo "No config files detected"`
- GitHub workflows directory: !`fd "\.github" . -t d -d 3 || echo "No .github directory found"`
- Existing workflows: !`fd "\.(yml|yaml)$" .github/workflows -t f 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Workflow patterns: !`rg "(runs-on|uses:|with:)" .github/workflows/ --type yaml -c 2>/dev/null | head -3 || echo "No workflow patterns detected"`
- Repository context: !`git remote get-url origin 2>/dev/null | sed 's/.*github\.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/' || echo "No GitHub remote detected"`
- Technology indicators: !`rg "(cargo|npm|go|maven|gradle|deno)" . --type json --type toml --type yaml -i | head -5 | cut -d: -f3 | sort -u || echo "Technology stack unknown"`
- Container usage: !`fd "(Dockerfile|docker-compose)" . -t f -d 2 || echo "No container files detected"`
- Test frameworks: !`rg "(test|spec)" . --type json --type toml --type yaml | head -3 | cut -d: -f1 | sort -u || echo "No test patterns detected"`

## Your Task

STEP 1: Initialize adaptive GitHub Actions context loading session

- CREATE session state file: `/tmp/github-actions-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "$(gdate -Iseconds 2>/dev/null || date -Iseconds)",
    "project_type": "auto-detect",
    "existing_workflows": 0,
    "technology_stack": [],
    "context_loaded": {
      "core_docs": false,
      "security_guides": false,
      "technology_specific": false,
      "marketplace_actions": false,
      "advanced_patterns": false
    },
    "focus_areas": [],
    "custom_recommendations": []
  }
  ```

STEP 2: Analyze project characteristics and determine context loading strategy

- ANALYZE project structure from Context section
- DETECT primary technology stack and frameworks
- IDENTIFY existing GitHub Actions workflows and patterns
- ASSESS CI/CD complexity requirements based on project characteristics

IF existing_workflows > 0:

- SET focus = "enhancement_and_optimization"
- PRIORITIZE advanced patterns, security hardening, performance optimization
  ELSE IF technology_stack detected:
- SET focus = "technology_specific_implementation"
- PRIORITIZE technology-specific CI/CD patterns and best practices
  ELSE:
- SET focus = "foundational_setup"
- PRIORITIZE basic workflow creation, common patterns, getting started guides

STEP 3: Load core GitHub Actions documentation using adaptive strategy

TRY:

- USE Context7 MCP server to load comprehensive GitHub Actions documentation:
  - RESOLVE library ID for GitHub Actions documentation
  - LOAD core workflow syntax and configuration patterns
  - FOCUS on: workflow triggers, jobs, steps, expressions, contexts

IF Context7 unavailable:

- FALLBACK to WebFetch for essential documentation:
  - **Core GitHub Actions**: `https://docs.github.com/en/actions`
  - **Workflow Syntax**: `https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions`
  - **Events and Triggers**: `https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows`

- UPDATE state: context_loaded.core_docs = true

STEP 4: Load technology-specific CI/CD patterns and marketplace actions

CASE detected_technology:
WHEN "rust" OR "cargo":

- LOAD Rust-specific GitHub Actions patterns:
  - Cargo caching strategies and optimization
  - Cross-compilation workflows and target matrices
  - Security auditing with cargo-audit and cargo-deny
  - Documentation generation and publishing
  - Performance benchmarking in CI
- FETCH popular Rust actions from marketplace:
  - actions/cache for Cargo dependencies
  - actions-rs/toolchain for Rust toolchain management
  - actions-rs/cargo for Cargo command execution

WHEN "go" OR "golang":

- LOAD Go-specific CI/CD patterns:
  - Go module caching and dependency management
  - Multi-version testing matrices
  - Cross-platform building with GOOS/GOARCH
  - Integration testing with services
  - Code coverage reporting and analysis
- FETCH Go-specific marketplace actions:
  - actions/setup-go for Go environment setup
  - golangci/golangci-lint-action for linting

WHEN "java" OR "maven" OR "gradle":

- LOAD Java ecosystem CI/CD patterns:
  - Maven/Gradle dependency caching
  - Multi-JDK testing strategies
  - Spring Boot application deployment
  - Container image building and publishing
  - Enterprise integration testing patterns
- FETCH Java-specific marketplace actions:
  - actions/setup-java for JDK setup
  - gradle/gradle-build-action for Gradle builds

WHEN "typescript" OR "javascript" OR "node" OR "npm" OR "deno":

- LOAD JavaScript/TypeScript CI/CD patterns:
  - Node.js dependency caching (npm, yarn, pnpm)
  - Multi-Node version testing matrices
  - Frontend build optimization and deployment
  - Package publishing to npm registry
  - End-to-end testing with Playwright/Cypress
- FETCH Node.js-specific marketplace actions:
  - actions/setup-node for Node.js environment
  - pnpm/action-setup for pnpm package manager

WHEN "python":

- LOAD Python-specific CI/CD patterns:
  - Python dependency caching with pip/poetry
  - Multi-Python version testing
  - Virtual environment management
  - Package publishing to PyPI
  - Data science and ML workflow patterns
- FETCH Python-specific marketplace actions:
  - actions/setup-python for Python environment
  - snok/install-poetry for Poetry dependency management

WHEN "docker" OR "container":

- LOAD containerized application CI/CD patterns:
  - Multi-stage Docker builds and optimization
  - Container registry publishing workflows
  - Security scanning with Trivy and Snyk
  - Kubernetes deployment patterns
  - Multi-architecture container builds

WHEN "multiple" OR "unknown":

- LOAD polyglot development patterns:
  - Language-agnostic CI/CD strategies
  - Monorepo workflow management
  - Cross-language dependency management
  - Unified testing and deployment approaches

UPDATE state: context_loaded.technology_specific = true

STEP 5: Load security, performance, and advanced workflow patterns

- LOAD comprehensive security documentation:
  - **Security Hardening**: `https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions`
  - **OpenID Connect**: `https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect`
  - **Secrets Management**: `https://docs.github.com/en/actions/security-guides/encrypted-secrets`
  - **Dependency Scanning**: `https://docs.github.com/en/code-security/supply-chain-security`

- LOAD performance optimization patterns:
  - **Caching Strategies**: `https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows`
  - **Matrix Builds**: `https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs`
  - **Parallel Execution**: `https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow`
  - **Self-Hosted Runners**: `https://docs.github.com/en/actions/hosting-your-own-runners`

- LOAD advanced workflow patterns:
  - **Reusable Workflows**: `https://docs.github.com/en/actions/using-workflows/reusing-workflows`
  - **Composite Actions**: `https://docs.github.com/en/actions/creating-actions/creating-a-composite-action`
  - **Workflow Templates**: `https://docs.github.com/en/actions/using-workflows/creating-starter-workflows-for-your-organization`

UPDATE state: context_loaded.security_guides = true
UPDATE state: context_loaded.advanced_patterns = true

STEP 6: Load marketplace actions and community best practices

- FETCH popular and essential GitHub Actions from marketplace:
  - **actions/checkout**: Repository checkout with advanced options
  - **actions/cache**: Dependency caching with multiple cache keys
  - **actions/upload-artifact**: Build artifact management
  - **actions/deploy-pages**: GitHub Pages deployment
  - **docker/build-push-action**: Advanced Docker building and publishing
  - **codecov/codecov-action**: Code coverage reporting and analysis

- LOAD community best practices and patterns:
  - **Awesome Actions**: Popular community-maintained actions
  - **Enterprise Patterns**: Large-scale CI/CD organization strategies
  - **Cost Optimization**: Runner minute optimization and strategies
  - **Workflow Debugging**: Troubleshooting and debugging techniques

UPDATE state: context_loaded.marketplace_actions = true

STEP 7: Synthesize project-specific recommendations and focus areas

- GENERATE project-specific recommendations based on detected characteristics:
  - Immediate implementation opportunities for current project
  - Security enhancements for detected technology stack
  - Performance optimization strategies for project scale
  - Integration patterns with existing development workflow

- CREATE customized focus areas:
  - Priority 1: Critical missing patterns for current project
  - Priority 2: Security hardening opportunities
  - Priority 3: Performance and cost optimization
  - Priority 4: Advanced patterns for future scaling

- DOCUMENT technology-specific best practices:
  - Framework-specific CI/CD patterns
  - Testing strategies for detected tech stack
  - Deployment patterns for target environments
  - Monitoring and observability integration

STEP 8: Finalize context loading and provide comprehensive guidance

- UPDATE session state with complete context loading results
- CREATE comprehensive summary of loaded documentation areas
- PROVIDE immediate next steps for GitHub Actions implementation
- DOCUMENT key patterns and examples for detected project type

FINALLY:

- SAVE session state with complete context loading results
- GENERATE project-specific GitHub Actions quick start guide
- CLEAN UP temporary processing files

## Technology-Specific Focus Areas

### Rust Projects

- **Cargo Optimization**: Multi-stage dependency caching, sparse protocol, registry mirrors
- **Cross-Compilation**: Target matrices with platform-specific optimizations
- **Security**: cargo-audit, cargo-deny, vulnerability scanning automation
- **Performance**: Criterion benchmarking, binary size optimization, profile-guided optimization
- **Documentation**: cargo doc generation, mdbook deployment, API documentation

### Go Projects

- **Module Management**: Go module caching, private module access, vendor strategies
- **Testing**: Race detection, coverage profiling, integration test matrices
- **Building**: CGO handling, static linking, multi-platform compilation
- **Deployment**: Binary distribution, container optimization, cloud-native patterns
- **Tools Integration**: golangci-lint, govulncheck, staticcheck automation

### Java Projects

- **Build Optimization**: Gradle/Maven daemon usage, incremental builds, test caching
- **JDK Matrices**: Multi-version compatibility testing, LTS migration strategies
- **Spring Boot**: Application packaging, layer optimization, native compilation
- **Enterprise**: Integration testing with databases, message queues, external services
- **Security**: Dependency scanning, OWASP checks, container hardening

### Node.js/Deno Projects

- **Package Management**: npm/yarn/pnpm caching, lock file validation, audit automation
- **Frontend Builds**: Asset optimization, bundle analysis, deployment strategies
- **Testing**: Unit/integration/e2e test orchestration, browser testing matrices
- **Publishing**: Package registry publishing, semantic versioning, changelog automation
- **Security**: npm audit, supply chain scanning, license compliance

### Python Projects

- **Environment Management**: Virtual environments, dependency resolution, lock files
- **Testing**: pytest optimization, coverage reporting, parallel test execution
- **Packaging**: Wheel building, PyPI publishing, distribution strategies
- **Data Science**: Jupyter notebook testing, model validation, pipeline automation
- **Security**: pip-audit, bandit scanning, dependency vulnerability management

### Container/Docker Projects

- **Build Optimization**: Multi-stage builds, layer caching, build contexts
- **Security**: Image scanning, rootless builds, distroless deployment
- **Registry Management**: Multi-registry publishing, image signing, vulnerability scanning
- **Deployment**: Kubernetes integration, rolling updates, health checks
- **Multi-Architecture**: ARM64/AMD64 builds, platform-specific optimizations

## Expected Outcomes

After executing this adaptive context loading, you will have comprehensive knowledge of:

### Core GitHub Actions Capabilities

- Complete workflow syntax and configuration patterns
- Event triggers, job orchestration, and step execution
- GitHub-hosted and self-hosted runner strategies
- Workflow expressions, contexts, and conditional logic

### Security and Compliance

- Security hardening best practices and implementation
- OpenID Connect integration for secure deployments
- Secrets management and environment variable strategies
- Supply chain security and dependency scanning

### Performance and Optimization

- Caching strategies for dependencies, build artifacts, and test results
- Matrix build optimization for parallel execution
- Workflow runtime optimization and cost management
- Self-hosted runner configuration and scaling

### Technology-Specific Expertise

- Framework and language-specific CI/CD patterns
- Tool integration and automation strategies
- Testing and quality assurance workflows
- Deployment and release management patterns

### Advanced Patterns

- Reusable workflow design and organization
- Composite action development and sharing
- Workflow template creation for teams
- Enterprise-scale CI/CD architecture

### Project-Specific Guidance

- Immediate implementation opportunities for current project
- Migration strategies from existing CI/CD systems
- Integration with current development workflows
- Customized recommendations based on project characteristics

## Usage Examples

```bash
# Basic usage for project analysis and context loading
/context-load-github-actions

# The command will automatically:
# 1. Detect your project's technology stack
# 2. Analyze existing GitHub Actions workflows
# 3. Load relevant documentation and patterns
# 4. Provide customized implementation guidance
```

This command transforms from simple documentation loading into an intelligent, adaptive context loading system that provides precisely the right GitHub Actions knowledge for your specific project and technology stack.