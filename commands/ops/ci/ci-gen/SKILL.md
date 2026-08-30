---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(git:*), Bash(jq:*), Bash(yq:*), Bash(gdate:*)
name: "Ci Gen"
description: "Generate comprehensive CI/CD workflows with intelligent technology stack detection and best practices"
author: "wcygan"
tags: ["ops","ci"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Current directory: !`pwd`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null || echo "false"`
- Detected technologies: !`fd -HI -d 1 '(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json|requirements\.txt|pyproject\.toml|Dockerfile)$' . 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Existing CI workflows: !`fd -p '\.github/workflows/.*\.ya?ml$' . 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Project structure: !`fd -t d -d 2 . 2>/dev/null | head -10 | tr '\n' ' ' || echo "basic"`
- Remote origin: !`git remote get-url origin 2>/dev/null | sed 's/.*github.com[:/]\([^/]*\/[^.]*\).*/\1/' || echo "no-remote"`
- Arguments: $ARGUMENTS

## Your Task

Generate comprehensive CI/CD workflow configurations tailored to the project's technology stack with intelligent detection and industry best practices.

STEP 1: Initialize CI generation session and technology detection

- CREATE session state: `/tmp/ci-gen-state-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "$(gdate -Iseconds 2>/dev/null || date -Iseconds)",
    "arguments": "$ARGUMENTS",
    "phase": "detection",
    "technologies": [],
    "platform": "github",
    "template": "standard",
    "generated_files": []
  }
  ```

TRY:

- VALIDATE git repository presence
- ANALYZE project structure for technology indicators
- DETECT build tools, package managers, and frameworks
- IDENTIFY existing CI configurations
- SAVE detection results to session state

**Technology Detection Logic:**

```bash
# Core technology detection
go_detected=$(fd 'go\.mod$' . 2>/dev/null | head -1)
rust_detected=$(fd 'Cargo\.toml$' . 2>/dev/null | head -1)
java_detected=$(fd '(pom\.xml|build\.gradle)$' . 2>/dev/null | head -1)
node_detected=$(fd 'package\.json$' . 2>/dev/null | head -1)
deno_detected=$(fd 'deno\.json$' . 2>/dev/null | head -1)
python_detected=$(fd '(requirements\.txt|pyproject\.toml)$' . 2>/dev/null | head -1)
docker_detected=$(fd 'Dockerfile$' . 2>/dev/null | head -1)
k8s_detected=$(fd -t d 'k8s|kubernetes' . 2>/dev/null | head -1)
```

CATCH (detection_failed):

- LOG detection errors to session state
- FALLBACK to generic CI template
- CONTINUE with available information

STEP 2: Parse arguments and configure CI generation parameters

- PARSE $ARGUMENTS for platform and template preferences
- DETERMINE CI platform (github, gitlab, circleci)
- SELECT template complexity (basic, standard, advanced, security)
- VALIDATE parameter combinations
- UPDATE session state with configuration

**Argument Processing:**

```bash
# Extract CI configuration from arguments
platform=$(echo "$ARGUMENTS" | rg --only-matching 'platform=([^\s]+)' -r '$1' 2>/dev/null || echo "github")
template=$(echo "$ARGUMENTS" | rg --only-matching 'template=([^\s]+)' -r '$1' 2>/dev/null || echo "standard")
update_mode=$(echo "$ARGUMENTS" | rg --quiet 'update' && echo "true" || echo "false")
security_focus=$(echo "$ARGUMENTS" | rg --quiet 'security' && echo "true" || echo "false")
```

STEP 3: Intelligent CI workflow generation with technology-specific optimizations

Think deeply about optimal CI/CD patterns for the detected technology stack and project requirements.

- GENERATE appropriate workflow configurations
- APPLY technology-specific best practices
- INTEGRATE security scanning and testing strategies
- OPTIMIZE for performance and reliability
- SAVE generation plan to session state

**Technology-Specific Generation:**

CASE detected_technologies:

WHEN "go":

- GENERATE Go-optimized GitHub Actions workflow
- INCLUDE: go vet, staticcheck, golangci-lint, race detection
- ADD: coverage reporting, vulnerability scanning
- CONFIGURE: matrix testing, caching strategies

WHEN "rust":

- GENERATE Rust-optimized workflow with cargo integration
- INCLUDE: clippy, rustfmt, cargo audit, tarpaulin coverage
- ADD: cross-platform matrix testing
- CONFIGURE: dependency caching, security auditing

WHEN "java":

- GENERATE Java workflow with Maven/Gradle detection
- INCLUDE: SpotBugs, PMD, dependency-check
- ADD: JaCoCo coverage, integration testing
- CONFIGURE: TestContainers, security scanning

WHEN "node" OR "deno":

- GENERATE Node.js/Deno workflow
- INCLUDE: ESLint, Prettier, security auditing
- ADD: npm/yarn audit, test coverage
- CONFIGURE: matrix testing across Node versions

WHEN "python":

- GENERATE Python workflow with pip/poetry detection
- INCLUDE: flake8, black, mypy, bandit security
- ADD: pytest with coverage, vulnerability scanning
- CONFIGURE: virtual environment management

STEP 4: Generate CI workflow files with validation

TRY:

- CREATE workflow directory structure
- GENERATE main CI workflow file
- ADD security scanning workflows if requested
- INCLUDE deployment automation if applicable
- VALIDATE generated YAML syntax
- SAVE generated files list to session state

**File Generation Process:**

```bash
# Create workflow directory
mkdir -p .github/workflows

# Generate primary workflow based on technology
workflow_file=".github/workflows/ci.yml"

# Technology-specific workflow generation
if [ -n "$go_detected" ]; then
  # Generate Go CI workflow
  workflow_name="Go CI/CD Pipeline"
elif [ -n "$rust_detected" ]; then
  # Generate Rust CI workflow
  workflow_name="Rust CI/CD Pipeline"
elif [ -n "$java_detected" ]; then
  # Generate Java CI workflow
  workflow_name="Java CI/CD Pipeline"
fi
```

CATCH (generation_failed):

- LOG specific generation failures
- PROVIDE fallback basic workflow
- SAVE partial results to session state
- OFFER manual configuration guidance

STEP 5: Advanced features integration and optimization

IF template == "advanced" OR security_focus == "true":

- ADD security scanning workflows (CodeQL, Trivy, dependency auditing)
- INCLUDE performance benchmarking and profiling
- CONFIGURE multi-environment deployment pipelines
- ADD notification and monitoring integrations
- GENERATE branch protection configuration

**Security Integration:**

```yaml
# Security scanning workflow template
security:
  name: Security Scanning
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
    - name: Initialize CodeQL
      uses: github/codeql-action/init@v2
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2
```

STEP 6: Validation and deployment preparation

- VALIDATE all generated YAML files for syntax errors
- TEST workflow configurations using GitHub CLI if available
- GENERATE deployment automation if Dockerfile or k8s configs detected
- CREATE documentation for generated workflows
- UPDATE session state with completion status

**Validation Process:**

FOR EACH generated workflow file:

- VALIDATE YAML syntax: `yq eval . "$file" > /dev/null`
- CHECK required secrets and variables
- VERIFY action versions and compatibility
- DOCUMENT any manual configuration needed

STEP 7: Finalization and documentation generation

- GENERATE comprehensive README section for CI/CD
- CREATE workflow status badges if requested
- SAVE workflow configuration summary
- PROVIDE next steps and manual configuration guidance
- CLEAN UP temporary session files

**Generated Output Summary:**

- Display list of created workflow files
- Show detected technologies and applied optimizations
- Provide configuration instructions for secrets/variables
- Suggest additional integrations and improvements

FINALLY:

- ARCHIVE session data: `/tmp/ci-gen-archive-$SESSION_ID.json`
- REPORT generation completion with file count
- CLEAN UP temporary files (EXCEPT archived data)
- LOG session completion with metrics

## Usage Examples

- `/ci-gen` - Generate CI for detected technology stack
- `/ci-gen platform=gitlab` - Generate GitLab CI configuration
- `/ci-gen template=advanced` - Advanced CI with security scanning
- `/ci-gen template=security` - Security-focused workflows
- `/ci-gen update` - Update existing CI workflows

## Supported Platforms

- **GitHub Actions** (default) - Full feature support
- **GitLab CI** - Comprehensive pipeline generation
- **CircleCI** - Optimized workflow configurations
- **Jenkins** - Declarative pipeline generation

## Template Types

- **Basic**: Essential testing and building
- **Standard**: Comprehensive testing with caching
- **Advanced**: Matrix testing, security scanning, deployment
- **Security**: SAST/DAST, vulnerability scanning, compliance