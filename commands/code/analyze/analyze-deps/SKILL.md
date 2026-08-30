---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(git:*), Bash(npm:*), Bash(yarn:*), Bash(cargo:*), Bash(go:*), Bash(deno:*), Task
name: "Analyze Deps"
description: "Comprehensive dependency analysis with security auditing and maintenance insights"
author: "wcygan"
tags: ["code","analyze"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Project files: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod|pom\.xml|requirements\.txt|composer\.json)" . -t f | head -10 || echo "No project files detected"`
- Directory structure: !`fd . -t d -d 2 | head -10 || echo "No directories found"`
- Git status: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`
- Lock files: !`fd "(package-lock\.json|yarn\.lock|Cargo\.lock|go\.sum|poetry\.lock|deno\.lock)" . -t f | head -5 || echo "No lock files found"`

## Your Task

STEP 0: Analysis Strategy Selection

- Think deeply about optimal dependency analysis approaches for this project
- Consider project complexity and multi-language support requirements
- Determine if parallel sub-agent analysis would benefit large codebases

Analyze project dependencies using modern tools. Analysis type: $ARGUMENTS (security, outdated, size, licenses, graph, or all - defaults to 'all')

STEP 1: Initialize Analysis Session

- Create session state file: /tmp/analyze-deps-$SESSION_ID.json
- Detect project type from Context section
- Parse analysis type from $ARGUMENTS (default: 'all')
- Initialize analysis results structure

STEP 2: Project Type Detection and Multi-Language Support

- Detect ALL project types in current directory (multi-language projects)
- Initialize project_types array for comprehensive analysis

FOR EACH detected project file:

IF "deno.json" found:

- ADD "deno" to project_types
- SET deno_package_manager = "deno"

IF "package.json" found:

- ADD "node" to project_types
- SET node_package_manager = "npm" OR "yarn" (detect from lock files)

IF "Cargo.toml" found:

- ADD "rust" to project_types
- SET rust_package_manager = "cargo"

IF "go.mod" found:

- ADD "go" to project_types
- SET go_package_manager = "go"

IF "pom.xml" found:

- ADD "java" to project_types
- SET java_package_manager = "maven"

IF project_types.length == 0:

- SET project_types = ["unknown"]
- WARN: "No recognized project files found"

IF project_types.length > 1:

- Consider sub-agent delegation for parallel analysis across languages
- Think harder about coordination strategies for multi-language dependency analysis

STEP 3: Security Analysis Strategy

IF analysis_type IN ['security', 'all']:

IF project_types.length > 2:

- Use parallel sub-agents for multi-language security analysis:
  - **Deno Security Agent**: JSR and remote dependency vulnerability scanning
  - **Node Security Agent**: npm/yarn audit and vulnerability database checks
  - **Rust Security Agent**: cargo audit and crates.io advisory analysis
  - **Go Security Agent**: govulncheck and module security validation
  - **Coordination Agent**: Aggregate findings and risk prioritization

ELSE:

- Execute sequential security analysis for detected project types

TRY:

FOR EACH project_type IN project_types:

CASE project_type:
WHEN "deno":

- Check for security advisories in JSR imports
- Analyze remote dependencies for known vulnerabilities
- Generate security report

  WHEN "rust":
  - Run: cargo audit --json (if available)
  - Parse security advisories
  - Check crates.io for vulnerability reports

  WHEN "node":
  - Run: npm audit --json OR yarn audit --json
  - Parse vulnerability data
  - Check for known problematic packages

  WHEN "go":
  - Run: go list -json -m all (check for known issues)
  - Check Go vulnerability database
  - Analyze module security status

CATCH (security_scan_failure):

- Log error to session state
- Continue with other analysis types
- Note: Manual security review recommended

STEP 4: Performance and Bundle Analysis

IF analysis_type IN ['size', 'performance', 'all']:

- Think hard about performance impact analysis across different package managers
- Consider bundle size optimization recommendations based on project type

TRY:

FOR EACH project_type IN project_types:

CASE project_type:
WHEN "deno":

- Analyze import map sizes
- Check for large remote dependencies
- Estimate bundle impact

  WHEN "rust":
  - Run: cargo tree --format "{p}" | head -20
  - Analyze compilation impact
  - Check for duplicate dependencies

  WHEN "node":
  - Calculate node_modules size
  - Analyze bundle size contributors
  - Check for large packages

  WHEN "go":
  - Run: go list -m all | head -20
  - Analyze module sizes
  - Check dependency depth

CATCH (performance_analysis_failure):

- Log error to session state
- Provide manual analysis guidance

STEP 5: Maintenance and Lifecycle Analysis

IF analysis_type IN ['outdated', 'maintenance', 'all']:

- Use extended thinking for complex dependency update strategies
- Consider breaking change impact across multi-language projects

TRY:

FOR EACH project_type IN project_types:

- Check for outdated dependencies using appropriate package manager
- Analyze dependency maintenance status and community health
- Generate prioritized update recommendations
- Assess breaking change risks and migration effort
- Calculate dependency freshness score

CATCH (maintenance_check_failure):

- Log warning to session state
- Recommend manual dependency review

STEP 6: Generate Comprehensive Report

TRY:

- Compile all analysis results from session state
- Create dependency summary with counts and types
- Generate security risk assessment
- Provide maintenance recommendations
- Calculate dependency health score
- Save final report to session state

STEP 7: Present Results

- Display analysis summary in structured format
- Highlight critical security issues
- Show outdated dependency priorities
- Provide actionable next steps
- Save report to: /tmp/analyze-deps-report-$SESSION_ID.json

CATCH (report_generation_failure):

- Provide partial results
- Log error details
- Offer manual analysis steps

FINALLY:

- Update session state with completion status
- Clean up temporary analysis files
- Archive session data for future reference

## State Management

```json
// /tmp/analyze-deps-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "projectType": "detected_project_type",
  "analysisType": "$ARGUMENTS",
  "phase": "analysis_complete",
  "results": {
    "security": {
      "vulnerabilities": [],
      "riskLevel": "low|medium|high",
      "recommendations": []
    },
    "performance": {
      "bundleSize": "estimated_size",
      "dependencyCount": 0,
      "largestDependencies": []
    },
    "maintenance": {
      "outdatedCount": 0,
      "outdatedPackages": [],
      "updatePriority": "low|medium|high"
    }
  },
  "recommendations": [
    "Priority actions based on analysis"
  ],
  "healthScore": "0-100",
  "nextActions": [
    "Specific next steps for dependency management"
  ]
}
```

## Modern Tool Integration

- **fd**: Fast file discovery for project detection and dependency analysis
- **rg**: Security pattern searching in lock files and configuration analysis
- **jq**: JSON processing for package manager outputs and vulnerability data
- **Sub-agents**: Parallel analysis for complex multi-language codebases
- **Extended thinking**: Deep dependency strategy analysis for complex projects
- **Native package managers**: cargo audit, npm audit, go mod, deno info

## Sub-Agent Delegation Patterns

### Large Multi-Language Projects (3+ package managers)

Use parallel sub-agents for comprehensive analysis:

1. **Language-Specific Security Agents**: Each analyzes security for one ecosystem
2. **Performance Analysis Agent**: Cross-language bundle size and optimization
3. **Maintenance Coordination Agent**: Unified update strategy across languages
4. **Risk Assessment Agent**: Holistic dependency health scoring

### Extended Thinking Integration

- Complex dependency conflict resolution strategies
- Multi-language ecosystem compatibility analysis
- Strategic dependency update planning with risk assessment

## Example Usage

```bash
# Complete dependency analysis
/analyze-deps

# Security-focused analysis only
/analyze-deps security

# Check for outdated packages
/analyze-deps outdated

# Bundle size and performance analysis
/analyze-deps size

# License compliance analysis
/analyze-deps licenses

# Multi-language project analysis (uses sub-agents)
/analyze-deps all
```