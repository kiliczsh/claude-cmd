---
allowed-tools: Read, Grep, Glob, Bash(fd:*), Bash(rg:*), Bash(bat:*), Edit, MultiEdit
name: "Related"
description: "Navigate intelligently between related files across the codebase"
author: "wcygan"
tags: ["code","navigate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Project type: !`if [ -f "deno.json" ]; then echo "Deno"; elif [ -f "package.json" ]; then echo "Node.js"; elif [ -f "Cargo.toml" ]; then echo "Rust"; elif [ -f "go.mod" ]; then echo "Go"; elif [ -f "pom.xml" ]; then echo "Java"; else echo "Unknown"; fi`
- Git status: !`git status --porcelain | head -5 || echo "No git repository"`
- Test files: !`fd "\.(test|spec)\." --type f | head -5 || echo "No test files found"`
- API files: !`fd "(api|routes|handlers)" --type d | head -3 || echo "No API directories found"`
- Component files: !`fd "components" --type d | head -3 || echo "No component directories found"`
- Config files: !`fd "config" --type f | head -3 || echo "No config files found"`

## Your task

Intelligently navigate between related files in the codebase, understanding patterns like test files, API endpoints, components, migrations, and more.

STEP 1: Parse arguments and determine navigation intent

Arguments: $ARGUMENTS

Parse navigation request:

- IF no arguments: Set target = current_working_file, action = "discover_all"
- IF single argument (file path): Set target = argument, action = "find_related"
- IF two arguments (file + type): Set target = argument[0], action = argument[1]
- IF includes ":" (file:location): Set target + specific_location = split on ":"

Navigation types: test, impl, api, component, migration, config, style, story

STEP 2: Analyze target file context and patterns

Create context analysis: `/tmp/navigation-context-$SESSION_ID.json`

Determine file characteristics:

- Extract file extension and directory structure
- Identify if file is: test, implementation, API, component, model, config
- Detect naming patterns and conventions used in project
- Map directory structure and framework patterns

File pattern detection:

```json
{
  "target_file": "$ARGUMENTS",
  "session_id": "$SESSION_ID",
  "file_type": "test|impl|api|component|model|config",
  "framework": "detected_framework",
  "patterns": {
    "test_patterns": ["*.test.ts", "*_test.go", "*.spec.js"],
    "api_patterns": ["api/*", "routes/*", "handlers/*"],
    "component_patterns": ["components/*", "*.tsx", "*.jsx"]
  }
}
```

STEP 3: Execute intelligent file discovery based on action type

CASE action:
WHEN "discover_all":

**CRITICAL: Launch parallel sub-agents for maximum performance (8-10x faster discovery)**

IMMEDIATELY deploy 5 parallel sub-agents for comprehensive file discovery:

- **Agent 1: Test & Spec Discovery**: Find all test files, specs, and related testing infrastructure
  - Focus: _.test._, _.spec._, **tests**, test/, spec/ directories
  - Tools: fd with test patterns, rg for test framework detection
  - Expected: Complete test ecosystem mapping with usage patterns

- **Agent 2: API & Route Discovery**: Discover all API endpoints, routes, and handlers
  - Focus: API routes, GraphQL schemas, RPC definitions, service endpoints
  - Tools: rg for route patterns, fd for API directories, endpoint detection
  - Expected: Complete API surface area with request/response patterns

- **Agent 3: Component & UI Discovery**: Locate all UI components, pages, and templates
  - Focus: React/Vue/Fresh components, HTML templates, styling files
  - Tools: fd for component patterns, rg for component definitions
  - Expected: Complete UI component hierarchy with prop relationships

- **Agent 4: Configuration & Infrastructure**: Find all config, build, and deployment files
  - Focus: Config files, environment files, build scripts, CI/CD definitions
  - Tools: fd for config patterns, rg for environment variables
  - Expected: Complete configuration landscape with dependencies

- **Agent 5: Documentation & Schema Discovery**: Locate docs, schemas, and architectural files
  - Focus: README files, API docs, database schemas, architectural diagrams
  - Tools: fd for doc patterns, rg for schema definitions
  - Expected: Complete project documentation and data model mapping

**Sub-Agent Coordination:**

- Each agent saves findings to `/tmp/navigation-agents-$SESSION_ID/`
- Parallel execution provides 8-10x speed improvement over sequential discovery
- Results synthesized into unified navigation interface with cross-references
- Present categorized navigation options with intelligent recommendations

WHEN "find_related":

- Execute targeted search for file relationships
- Use project-specific patterns and conventions
- Return ranked results by relevance

WHEN "test":

- Search for existing test files using multiple patterns
- IF not found: Offer to create test file with template
- Navigate to test or create new one

WHEN "impl":

- Find implementation file from test file
- Use reverse mapping patterns
- Navigate to source implementation

WHEN "api":

- Search for API endpoints related to component/feature
- Look for route definitions and handlers
- Check for API client code

WHEN "component":

- Find UI components related to feature
- Look for React/Vue/Fresh components
- Check for component stories and styles

STEP 4: Smart file pattern matching and discovery

FOR EACH navigation type, execute pattern-based search:

**Test File Discovery Patterns:**

```bash
# From implementation to test
target_base=$(basename "$target_file" .ts)
target_dir=$(dirname "$target_file")

# Search patterns in order of preference
fd "${target_base}\\.(test|spec)\\.(ts|js|tsx|jsx)$" "$target_dir"
fd "${target_base}\\.(test|spec)\\.(ts|js|tsx|jsx)$" "tests/"
fd "${target_base}\\.(test|spec)\\.(ts|js|tsx|jsx)$" "__tests__/"
```

**API Endpoint Discovery:**

```bash
# Find API routes and handlers
rg -l "(router\\.(get|post|put|delete)|app\\.(get|post))" api/ routes/ || echo "No API routes found"
fd "(handler|controller|route)" --type f | grep -E "\\.(ts|js|go|java)$"
```

**Component Discovery:**

```bash
# Find React/Vue/Fresh components
fd "\\.(tsx|jsx|vue|ts)$" components/ islands/ || echo "No components found"
rg -l "(export.*component|function.*Component)" --type ts --type js
```

STEP 5: Navigation execution and file operations

TRY:

- Execute navigation based on discovery results
- Present multiple options if ambiguous
- Create missing files when requested
- Jump to specific locations within files

Navigation execution logic:

```typescript
// Navigate to discovered files
IF single_result_found:
  - Display file content with syntax highlighting
  - Show file path and context information
  - CHECKPOINT: Save navigation success to session state

ELSE IF multiple_results_found:
  - Present numbered list of options
  - Allow user to select specific target
  - Save options to session state for quick access

ELSE IF no_results_found AND action === "test":
  - Offer to create test file with intelligent template
  - Use framework-specific test patterns
  - Generate basic test structure and imports

ELSE:
  - Report no related files found
  - Suggest alternative navigation strategies
  - Save failed search patterns for learning
```

STEP 6: File creation and template generation (when needed)

IF creating new files (test, component, etc.):

Template generation based on detected framework:

- **Deno/Fresh**: Use Deno.test() and JSR imports
- **Node.js**: Use Jest/Vitest patterns with npm imports
- **Rust**: Use #[cfg(test)] modules and assert patterns
- **Go**: Use testing package with TestXxx functions
- **Java**: Use JUnit annotations and patterns

Test template example:

```typescript
// Generated test template for Deno
import { assertEquals, assertExists } from "@std/assert";
import { ${module_name} } from "./${source_file}";

Deno.test("${module_name} - basic functionality", () => {
  // Test implementation here
  assertEquals(true, true);
});
```

STEP 7: Smart location jumping (function/method navigation)

IF specific_location provided (e.g., "handler:getUser"):

- Parse location type and target name
- Search for function/method definitions
- Navigate to exact line number
- Highlight relevant code section

Location search patterns:

```bash
# Find function definitions
rg "(function ${target_name}|const ${target_name}|${target_name}\\s*=|def ${target_name})" --line-number
rg "(class ${target_name}|interface ${target_name}|type ${target_name})" --line-number
```

CATCH (file_not_found):

- Report missing file with clear error message
- Suggest alternative file paths or names
- Offer to create file if appropriate
- Save error context to session state

CATCH (ambiguous_results):

- Present all matching options with context
- Allow user to refine search criteria
- Save disambiguation context for future sessions
- Provide pattern-based filtering options

FINALLY:

- Update session navigation history
- Clean up temporary search files
- Save successful patterns for learning
- Report navigation statistics and success rate

## Navigation Pattern Examples

### Framework-Specific Patterns

**Deno Fresh Patterns:**

- `routes/index.tsx` ↔ `islands/Counter.tsx`
- `routes/api/users.ts` ↔ `routes/users/[id].tsx`
- `lib/auth.ts` ↔ `routes/api/auth.ts`

**Next.js Patterns:**

- `pages/api/users.ts` ↔ `components/UserList.tsx`
- `lib/database.ts` ↔ `pages/api/auth/[...nextauth].ts`
- `components/Button.tsx` ↔ `components/Button.stories.tsx`

**Go Patterns:**

- `user.go` ↔ `user_test.go`
- `handlers/user.go` ↔ `models/user.go`
- `main.go` ↔ `cmd/server/main.go`

**Rust Patterns:**

- `lib.rs` ↔ `tests/integration_test.rs`
- `models/user.rs` ↔ `handlers/user.rs`
- `main.rs` ↔ `tests/cli_test.rs`

## State Management

Session state file: `/tmp/navigation-state-$SESSION_ID.json`

```json
{
  "session_id": "$SESSION_ID",
  "target_file": "$ARGUMENTS",
  "discovered_patterns": {
    "test_files": ["path/to/test1.ts", "path/to/test2.ts"],
    "api_files": ["api/route1.ts", "api/route2.ts"],
    "components": ["Component1.tsx", "Component2.tsx"]
  },
  "navigation_history": [
    { "from": "file1.ts", "to": "file1.test.ts", "type": "test" },
    { "from": "file1.test.ts", "to": "file1.ts", "type": "impl" }
  ],
  "learned_patterns": {
    "project_test_pattern": "*.test.ts",
    "project_api_pattern": "api/*.ts",
    "project_component_pattern": "components/*.tsx"
  }
}
```

## Integration with Other Commands

- Use with `/go-to-definition` for precise function navigation
- Combine with `/search-code` for broader codebase exploration
- Integrate with `/generate-test` for test file creation
- Use with `/analyze-deps` for dependency-based navigation