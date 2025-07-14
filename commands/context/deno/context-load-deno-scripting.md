---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*)
name: "Context Load Deno Scripting"
description: "Load comprehensive Deno scripting documentation context with project-specific optimization"
author: "wcygan"
tags: ["context","deno"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Deno projects: !`fd "(deno\.json|deno\.jsonc)" . | head -5 || echo "No Deno projects found"`
- Existing scripts: !`fd "\.(ts|js)$" . | wc -l | tr -d ' ' || echo "0"`
- Dependencies: !`rg "import.*jsr:|import.*https:" . --type ts --type js | wc -l | tr -d ' ' || echo "0"`
- Technology stack: !`fd "(package\.json|Cargo\.toml|go\.mod)" . | head -3 || echo "No other frameworks detected"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/deno-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {}
  }
  ```

STEP 2: Project-specific context analysis

- ANALYZE project structure from Context section
- DETERMINE specific Deno features in use
- IDENTIFY documentation priorities based on project needs

IF Deno projects found:

- FOCUS on project-specific features and dependencies
- PRIORITIZE relevant standard library modules
- INCLUDE deployment and automation contexts
  ELSE:
- LOAD general Deno scripting foundation
- EMPHASIZE getting-started and migration guides
- INCLUDE project setup and configuration

STEP 3: Strategic documentation loading

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by topic area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **Deno Runtime Manual**
   - URL: `https://docs.deno.com/runtime/`
   - FETCH: Runtime APIs, permissions system, module resolution
   - FOCUS: File system, network operations, process execution
   - EXTRACT: Code examples and best practices

2. **JSR Package Registry**
   - URL: `https://jsr.io/`
   - FETCH: Standard library modules and community packages
   - FOCUS: @std/* modules relevant to detected project needs
   - EXTRACT: API documentation and usage examples

3. **Dax Cross-Platform Shell Library**
   - URL: `https://github.com/dsherret/dax`
   - FETCH: Shell command execution and process management
   - FOCUS: Cross-platform scripting patterns
   - EXTRACT: Command examples and integration patterns

4. **Deno Standard Library Documentation**
   - URLs: `https://jsr.io/@std/cli`, `https://jsr.io/@std/fs`, `https://jsr.io/@std/path`
   - FETCH: Module-specific documentation
   - FOCUS: Filesystem operations, CLI tools, async patterns
   - EXTRACT: Function signatures and practical examples

5. **Deno Examples and Patterns**
   - URL: `https://docs.deno.com/examples/`
   - FETCH: Practical automation scripts and use cases
   - FOCUS: Real-world implementation patterns
   - EXTRACT: Complete script examples and architecture patterns

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and optimization

- ORGANIZE loaded context by functional area:
  - File and directory operations
  - HTTP requests and API integration
  - Process spawning and management
  - CLI argument parsing and user interaction
  - Testing and quality assurance
  - Security and permissions management
  - Performance monitoring and optimization

- SYNTHESIZE project-specific guidance:
  - Integration with existing codebase
  - Migration strategies from other platforms
  - Best practices for detected use cases
  - Security considerations for project context

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/deno-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Project Type:**

CASE project_context:
WHEN "automation_scripts":

- PRIORITIZE: File system operations, process execution, CLI tools
- FOCUS: @std/fs, @std/cli, Dax command execution
- EXAMPLES: Build scripts, deployment automation

WHEN "web_services":

- PRIORITIZE: HTTP operations, JSON processing, async patterns
- FOCUS: @std/http, @std/encoding, async/await patterns
- EXAMPLES: API servers, web scraping, data processing

WHEN "cli_applications":

- PRIORITIZE: CLI parsing, user interaction, cross-platform support
- FOCUS: @std/cli, @std/fmt, input/output handling
- EXAMPLES: Command-line tools, interactive applications

WHEN "migration_target":

- PRIORITIZE: Compatibility patterns, migration guides
- FOCUS: Node.js compatibility, npm package alternatives
- EXAMPLES: Converting existing scripts to Deno

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and version compatibility
- VALIDATE code examples for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Deno Capabilities:**

- Runtime API usage and built-in modules
- Permission system configuration and security
- Module system and JSR imports
- File system operations and path manipulation
- Network operations and HTTP client/server patterns

**Advanced Scripting Techniques:**

- Cross-platform shell command execution with Dax
- Process spawning and management
- CLI argument parsing and user interaction
- Async/await patterns and concurrency
- Error handling and logging strategies

**Project Integration:**

- Deno configuration (deno.json/deno.jsonc)
- Task runner setup and automation
- Testing framework usage and best practices
- Security configuration and permission management
- Performance optimization and monitoring

**Development Workflow:**

- IDE integration and tooling
- Debugging and profiling techniques
- Package management and dependency resolution
- CI/CD integration and deployment strategies
- Migration patterns from other platforms

The context loading adapts to your specific project structure and emphasizes the most relevant documentation areas for your current development needs.