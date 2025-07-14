---
allowed-tools: Read, Write, Edit, MultiEdit, Task, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(eza:*)
name: "Deno Ify"
description: "Convert existing shell scripts to Deno TypeScript scripts with cross-platform compatibility and type safety"
author: "wcygan"
tags: ["code","migrate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Shell scripts found: !`fd "\.(sh|bash)$" . | head -10 || echo "No shell scripts found"`
- Existing deno.json files: !`fd "deno\.json$" . | head -5 || echo "No deno.json found"`
- Current scripts directory: !`eza -la scripts/ 2>/dev/null | head -10 || echo "No scripts directory"`
- Project technology: !`fd "(package\.json|Cargo\.toml|go\.mod)" --max-depth 2 | head -3 || echo "No project files detected"`
- Git status: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`

## Your Task

Think deeply about shell script modernization strategy, cross-platform compatibility, and type-safe automation patterns.

STEP 1: Shell Script Discovery and Analysis

- Scan repository for all shell scripts (.sh, .bash, .zsh files)
- Analyze script dependencies and external command usage
- Identify script complexity levels (simple, moderate, complex)
- Categorize scripts by functionality (build, deploy, utility, configuration)
- Map script interdependencies and execution order

STEP 2: Migration Strategy Planning

- Assess Deno ecosystem compatibility for each script
- Plan directory structure for converted TypeScript scripts
- Design deno.json task configuration strategy
- Identify scripts requiring sub-agent parallel conversion
- Create migration roadmap with complexity-based prioritization

STEP 3: State Management and Session Tracking

- Create session state file: /tmp/deno-migration-$SESSION_ID.json
- Track conversion progress and completed scripts
- Save dependency mappings and task configurations
- Implement checkpoint system for complex multi-script migrations
- Configure rollback strategy for failed conversions

STEP 4: Migration Execution Strategy

CASE migration_complexity:
WHEN "simple" (1-5 scripts):

- Execute sequential conversion workflow
- Apply direct shell-to-Deno translation patterns
- Generate single deno.json task configuration
- Create unified scripts directory structure

WHEN "moderate" (6-20 scripts):

- Use parallel sub-agent conversion approach:
  - **Agent 1**: Build and deployment script conversion
  - **Agent 2**: Utility and configuration script conversion
  - **Agent 3**: Testing and CI/CD script conversion
  - **Agent 4**: deno.json configuration and task setup

WHEN "complex" (20+ scripts OR high interdependencies):

- Execute comprehensive multi-phase migration:
  - **Phase 1**: Dependency analysis and mapping (parallel sub-agents)
  - **Phase 2**: Core script conversion (specialized sub-agents)
  - **Phase 3**: Integration testing and validation
  - **Phase 4**: Documentation and rollback preparation

STEP 5: Conversion Workflow Implementation

TRY:

- Execute selected migration strategy from STEP 4
- Convert shell scripts to TypeScript using Dax and Deno APIs
- Maintain original functionality while adding type safety
- Update deno.json with appropriate tasks and permissions
- Create comprehensive migration documentation
- Save checkpoint: conversion_complete

CATCH (dax_compatibility_issues):

- Document unsupported shell constructs
- Create hybrid approach with shell command fallbacks
- Use Deno.Command API for complex shell interactions
- Save compatibility workarounds to session state

CATCH (permission_configuration_errors):

- Analyze required Deno permissions for each script
- Create minimal permission sets for security
- Document permission requirements in migration notes
- Provide permission troubleshooting guide

CATCH (dependency_resolution_failures):

- Identify missing external dependencies
- Create Deno-compatible alternatives or polyfills
- Document external tool requirements
- Provide installation and setup instructions

FINALLY:

- Update migration session state: /tmp/deno-migration-$SESSION_ID.json
- Create rollback instructions and backup references
- Generate migration verification tests
- Clean up temporary conversion artifacts

STEP 6: Validation and Testing Framework

- Generate automated tests for converted scripts
- Create before/after functionality comparison
- Implement cross-platform validation (Windows, macOS, Linux)
- Set up CI/CD integration for converted scripts
- Document performance improvements and type safety gains

## Migration State Management

```json
// /tmp/deno-migration-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target_directory": "$ARGUMENTS",
  "migration_phase": "discovery|planning|conversion|validation|complete",
  "discovered_scripts": [
    {
      "path": "relative/path/to/script.sh",
      "complexity": "simple|moderate|complex",
      "dependencies": ["external_command1", "external_command2"],
      "functionality": "build|deploy|utility|test|config",
      "status": "pending|in-progress|converted|tested|validated"
    }
  ],
  "conversion_strategy": {
    "approach": "sequential|parallel|multi-phase",
    "sub_agents_required": "number_of_agents",
    "estimated_duration": "time_estimate",
    "complexity_factors": ["interdependencies", "external_tools", "platform_specific"]
  },
  "generated_artifacts": {
    "scripts_directory": "/scripts",
    "deno_config": "deno.json",
    "converted_scripts": [],
    "task_definitions": [],
    "documentation": []
  },
  "validation_results": {
    "functionality_preserved": "boolean",
    "cross_platform_tested": "boolean",
    "performance_comparison": "before_vs_after_metrics",
    "type_safety_improvements": "typescript_benefits"
  },
  "checkpoints": {
    "last_checkpoint": "checkpoint_name",
    "next_milestone": "milestone_name",
    "rollback_point": "safe_restore_point"
  },
  "rollback_strategy": {
    "backup_location": "backup/directory/path",
    "restoration_steps": [],
    "verification_commands": []
  }
}
```

## Sub-Agent Migration Patterns

### Pattern 1: Build Script Conversion (Agent 1)

FOR EACH build script:

- Analyze build pipeline structure
- Convert shell build commands to Deno task equivalents
- Maintain build artifact outputs and dependencies
- Add TypeScript type checking and validation
- Generate cross-platform build configurations

### Pattern 2: Utility Script Conversion (Agent 2)

FOR EACH utility script:

- Preserve command-line argument processing
- Convert file operations to Deno standard library
- Add error handling and logging improvements
- Implement proper exit codes and status reporting
- Create reusable TypeScript modules

### Pattern 3: CI/CD Script Conversion (Agent 3)

FOR EACH CI/CD script:

- Maintain GitHub Actions/CI pipeline compatibility
- Convert environment variable handling
- Preserve secret management and security practices
- Add comprehensive test coverage
- Generate deployment documentation

## Translation Guide

### Basic Command Execution

```bash
# Shell
echo "Hello World"
ls -la
```

```typescript
// Deno with Dax
import $ from "jsr:@david/dax@0.42.0";
await $`echo "Hello World"`;
await $`ls -la`;
```

### Environment Variables

```bash
# Shell
export VAR1=value1
export VAR2=value2
echo $VAR1 $VAR2
```

```typescript
// Deno
await $`echo $VAR1 $VAR2`
  .env("VAR1", "value1")
  .env({ VAR2: "value2" });

// Or export to current process
await $`export MY_VALUE=5`.exportEnv();
```

### File Operations

```bash
# Shell
mkdir -p src/components
cp config.json config.backup.json
rm -rf temp/
```

```typescript
// Deno
await $`mkdir -p src/components`;
await $`cp config.json config.backup.json`;
await $`rm -rf temp/`;

// Or use Deno APIs for better cross-platform support
import { ensureDir } from "jsr:@std/fs";
await ensureDir("src/components");
await Deno.copyFile("config.json", "config.backup.json");
await Deno.remove("temp/", { recursive: true });
```

### Piping and Redirects

```bash
# Shell
cat file.txt | grep "pattern" > output.txt
ps aux | grep node
```

```typescript
// Deno
await $`cat file.txt | grep "pattern" > output.txt`;
const nodeProcesses = await $`ps aux | grep node`.text();
```

### Error Handling

```bash
# Shell
command1 || echo "Command failed"
set -e  # Exit on error
```

```typescript
// Deno - Default throws on error
try {
  await $`command1`;
} catch (error) {
  console.log("Command failed");
}

// Or disable throwing
const result = await $`command1`.noThrow();
if (result.code !== 0) {
  console.log("Command failed");
}

// Shell-style fallback
await $`command1 || echo "Command failed"`;
```

### Conditional Logic

```bash
# Shell
if [ -f "config.json" ]; then
  echo "Config exists"
fi
```

```typescript
// Deno
import { exists } from "jsr:@std/fs";
if (await exists("config.json")) {
  await $`echo "Config exists"`;
}
```

### Working with Arguments

```bash
# Shell
#!/bin/bash
FILE=$1
OPTION=$2
./process.sh "$FILE" --option "$OPTION"
```

```typescript
// Deno
import { parseArgs } from "jsr:@std/cli/parse-args";

const args = parseArgs(Deno.args);
const file = args._[0];
const option = args.option;
await $`./process.sh ${file} --option ${option}`;
```

### Common Patterns

#### Multiple Commands

```bash
# Shell
cd src && npm install && npm test
```

```typescript
// Deno
await $`cd src && npm install && npm test`;
```

#### Parallel Execution

```bash
# Shell (complex with wait)
command1 &
command2 &
wait
```

```typescript
// Deno
await Promise.all([
  $`command1`,
  $`command2`,
]);
```

#### Getting Command Output

```bash
# Shell
RESULT=$(echo "hello" | tr '[:lower:]' '[:upper:]')
```

```typescript
// Deno
const result = await $`echo "hello" | tr '[:lower:]' '[:upper:]'`.text();
```

Focus on creating idiomatic Deno code that follows the project's conventions and leverages Deno's built-in APIs where appropriate for better cross-platform support.