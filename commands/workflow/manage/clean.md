---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(rg:*), Bash(fd:*), Bash(bat:*), Bash(jq:*), Bash(gdate:*), Bash(git:*), Bash(eza:*), Bash(wc:*), Bash(head:*), Bash(deno:*), Bash(npm:*), Bash(cargo:*), Bash(go:*)
name: "Clean"
description: "Comprehensive technical debt cleanup orchestrator with parallel analysis and safe automation"
author: "wcygan"
tags: ["workflow","manage"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target for cleanup: $ARGUMENTS
- Current directory: !`pwd`
- Project languages: !`fd "(package\.json|Cargo\.toml|go\.mod|deno\.json|pom\.xml|build\.gradle)" . -d 3 | head -5 || echo "No build files detected"`
- Git status: !`git status --porcelain | head -10 || echo "No git repository or clean working directory"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`
- Total files: !`fd "\.(js|ts|jsx|tsx|rs|go|java|py|rb|php|c|cpp|h|hpp|cs|kt|swift|scala)" . | wc -l | tr -d ' '` source files
- Modern tools status: !`echo "rg: $(which rg >/dev/null && echo ✓ || echo ✗) | fd: $(which fd >/dev/null && echo ✓ || echo ✗) | bat: $(which bat >/dev/null && echo ✓ || echo ✗)"`
- Recent commits: !`git log --oneline -5 2>/dev/null | head -5 || echo "No git history available"`

## Your Task

STEP 1: Initialize technical debt cleanup session and project analysis

- CREATE session state file: `/tmp/cleanup-session-$SESSION_ID.json`
- ANALYZE project structure and codebase complexity from Context section
- DETERMINE cleanup strategy based on project size and technology stack
- VALIDATE modern CLI tools availability (rg, fd, bat are MANDATORY)

```bash
# Initialize cleanup session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetProject": "'$ARGUMENTS'",
  "detectedLanguages": [],
  "cleanupStrategy": "auto-detect",
  "safetyLevel": "production",
  "itemsProcessed": 0,
  "linesRemoved": 0
}' > /tmp/cleanup-session-$SESSION_ID.json
```

STEP 2: Comprehensive technical debt analysis with parallel sub-agent coordination

TRY:

IF codebase_size > 500 files OR project_type == "enterprise":

LAUNCH parallel sub-agents for comprehensive technical debt discovery:

- **Agent 1: Code Quality Analysis**: Identify quality issues and anti-patterns
  - Focus: TODO/FIXME comments, linting violations, code smells, deprecated patterns
  - Tools: rg for pattern searches, language-specific linters, quality metrics
  - Output: Quality debt inventory with severity levels and fix recommendations

- **Agent 2: Dead Code Detection**: Find unused and unreachable code
  - Focus: Unused imports, functions, variables, commented-out code, obsolete files
  - Tools: rg for usage analysis, fd for orphaned files, dependency analysis
  - Output: Dead code manifest with safe removal candidates

- **Agent 3: Duplication Analysis**: Identify code duplication and consolidation opportunities
  - Focus: Duplicate functions, redundant type definitions, similar patterns
  - Tools: rg for pattern matching, structural analysis, refactoring opportunities
  - Output: Duplication report with consolidation recommendations

- **Agent 4: Dependencies & Security**: Analyze dependency health and security issues
  - Focus: Deprecated packages, security vulnerabilities, outdated dependencies
  - Tools: Package manager analysis, security scanners, version compatibility
  - Output: Dependency cleanup plan with security and compatibility priorities

- **Agent 5: Documentation & Comments**: Evaluate documentation quality and relevance
  - Focus: Outdated comments, missing documentation, broken links, obsolete examples
  - Tools: rg for comment analysis, documentation link checking, currency validation
  - Output: Documentation cleanup agenda with content refresh priorities

ELSE:

EXECUTE streamlined cleanup analysis for smaller codebases:

```bash
# Streamlined analysis for smaller projects
echo "🔍 Analyzing technical debt in smaller codebase..."
```

STEP 3: Systematic cleanup execution with safety checkpoints

**Phase 1: Low-Risk Quality Improvements**

FOR EACH low_risk_improvement:

```bash
# Create safety checkpoint
echo "📝 Creating safety checkpoint before cleanup phase"
git add -A
git commit -m "checkpoint: before $(date -Iseconds) cleanup session $SESSION_ID" || echo "No changes to commit"

# Apply formatting and linting fixes
echo "🔧 Applying automated code quality improvements..."
```

**Language-Specific Cleanup Patterns:**

**JavaScript/TypeScript Projects:**

```bash
# Remove console.log statements (excluding intentional logging)
rg "console\.(log|debug|warn)" --type typescript -l | while read file; do
  echo "Cleaning debug statements in: $file"
  # Interactive review of each console statement
done

# Convert var to let/const
rg "\bvar\s+" --type typescript -l | while read file; do
  echo "Modernizing variable declarations in: $file"
  # Apply var → let/const transformations with validation
done

# Clean up unused imports
if command -v deno >/dev/null; then
  echo "🦕 Running Deno linting and formatting"
  deno fmt $ARGUMENTS
  deno lint $ARGUMENTS
fi
```

**Rust Projects:**

```bash
# Remove unused imports and dead code warnings
if fd "Cargo.toml" . >/dev/null; then
  echo "🦀 Cleaning Rust project with cargo tools"
  cargo fmt --all
  cargo clippy --all-targets --all-features -- -D warnings
  cargo check --all
fi

# Clean up TODO/FIXME comments with context
rg "(TODO|FIXME|XXX|HACK)" --type rust --context 2
```

**Go Projects:**

```bash
# Apply Go formatting and cleaning
if fd "go.mod" . >/dev/null; then
  echo "🐹 Cleaning Go project with standard tools"
  go fmt ./...
  go vet ./...
  go mod tidy
fi

# Remove unused variables and imports
go run golang.org/x/tools/cmd/goimports -w ./... 2>/dev/null || echo "goimports not available"
```

**Java Projects:**

```bash
# Maven/Gradle cleanup
if fd "pom.xml" . >/dev/null; then
  echo "☕ Cleaning Java Maven project"
  mvn clean compile
elif fd "build.gradle" . >/dev/null; then
  echo "☕ Cleaning Java Gradle project"
  ./gradlew clean build
fi
```

**Phase 2: Dead Code Removal (Requires Verification)**

```bash
# Identify potentially unused files
echo "🔍 Identifying potentially unused files..."
fd "\.(js|ts|jsx|tsx|rs|go|java|py)$" . -x bash -c '
  file="{}"
  basename=$(basename "$file" | sed "s/\.[^.]*$//")
  if ! rg -q "$basename" --type-not $(echo "$file" | sed "s/.*\.//") .; then
    echo "Potentially unused: $file"
  fi
' > /tmp/unused-files-$SESSION_ID.txt

# Review unused files before deletion
if [[ -s "/tmp/unused-files-$SESSION_ID.txt" ]]; then
  echo "📋 Found potentially unused files:"
  bat /tmp/unused-files-$SESSION_ID.txt
  echo "⚠️  Manual review required before deletion"
fi
```

**Phase 3: Documentation and Comment Cleanup**

```bash
# Find outdated TODO comments (older than 6 months)
echo "📅 Analyzing TODO comment age..."
rg "(TODO|FIXME).*([0-9]{4}-[0-9]{2}-[0-9]{2})" --context 1 > /tmp/dated-todos-$SESSION_ID.txt || echo "No dated TODOs found"

# Find broken documentation links
rg "https?://[^\s)]+" --only-matching | sort -u | while read url; do
  echo "📎 Found URL: $url"
  # Note: URL validation would require network access
done > /tmp/found-urls-$SESSION_ID.txt
```

STEP 4: Results compilation and impact assessment

**Generate Cleanup Report:**

```bash
# Compile cleanup statistics
lines_before=$(fd "\.(js|ts|jsx|tsx|rs|go|java|py|rb|php|c|cpp|h|hpp|cs|kt|swift|scala)" . -x wc -l {} \; | awk '{sum += $1} END {print sum}' || echo "0")

echo "📊 Technical Debt Cleanup Report"
echo "================================"
echo "Session ID: $SESSION_ID"
echo "Target: $ARGUMENTS"
echo "Timestamp: $(gdate -Iseconds 2>/dev/null || date -Iseconds)"
echo "Total Source Files: $(fd "\.(js|ts|jsx|tsx|rs|go|java|py|rb|php|c|cpp|h|hpp|cs|kt|swift|scala)" . | wc -l | tr -d ' ')"
echo "Lines of Code (before): $lines_before"

# Update session state with final statistics
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" \
   --argjson lines_before "$lines_before" \
   '.completedAt = $timestamp | .linesBefore = $lines_before' \
   /tmp/cleanup-session-$SESSION_ID.json > /tmp/cleanup-session-$SESSION_ID.tmp && \
   mv /tmp/cleanup-session-$SESSION_ID.tmp /tmp/cleanup-session-$SESSION_ID.json
```

**Safety Verification:**

```bash
# Run tests if test command exists
if command -v deno >/dev/null && fd "deno.json" . >/dev/null; then
  echo "🧪 Running Deno tests to verify cleanup safety"
  deno task test || echo "⚠️ Tests failed - manual review required"
elif command -v npm >/dev/null && fd "package.json" . >/dev/null; then
  echo "🧪 Running npm tests to verify cleanup safety"
  npm test || echo "⚠️ Tests failed - manual review required"
elif command -v cargo >/dev/null && fd "Cargo.toml" . >/dev/null; then
  echo "🧪 Running Rust tests to verify cleanup safety"
  cargo test || echo "⚠️ Tests failed - manual review required"
elif command -v go >/dev/null && fd "go.mod" . >/dev/null; then
  echo "🧪 Running Go tests to verify cleanup safety"
  go test ./... || echo "⚠️ Tests failed - manual review required"
else
  echo "ℹ️ No test framework detected - manual verification recommended"
fi
```

CATCH (cleanup_failed):

- LOG error details to session state
- RESTORE from latest git checkpoint if needed
- PROVIDE manual cleanup guidance

```bash
echo "⚠️ Cleanup operation failed. Checking for recovery options:"
echo "Last git checkpoint: $(git log --oneline -1 --grep='checkpoint:' || echo 'No checkpoint found')"
echo "To restore: git reset --hard HEAD~1"
echo "Session state: /tmp/cleanup-session-$SESSION_ID.json"
```

STEP 5: Session completion and follow-up recommendations

**Final Safety Commit:**

```bash
# Create final commit with all cleanup changes
echo "💾 Creating final cleanup commit"
git add -A
git commit -m "$(cat <<'EOF'
refactor: technical debt cleanup session $SESSION_ID

- Applied automated code quality improvements
- Removed dead code and unused imports
- Updated deprecated patterns and syntax
- Improved documentation and comments
- Verified changes with test suite

Session details: /tmp/cleanup-session-$SESSION_ID.json
EOF
)" || echo "No changes to commit"
```

**Cleanup Summary:**

```bash
echo "✅ Technical debt cleanup completed"
echo "🎯 Target: $ARGUMENTS"
echo "📊 Session: $SESSION_ID"
echo "💾 Results cached in: /tmp/cleanup-session-$SESSION_ID.json"
echo "🔍 Detailed findings in: /tmp/*-$SESSION_ID.txt"
echo ""
echo "📋 Recommended follow-up actions:"
echo "  - Review potentially unused files in /tmp/unused-files-$SESSION_ID.txt"
echo "  - Validate URL accessibility in /tmp/found-urls-$SESSION_ID.txt"
echo "  - Address any remaining TODO items from analysis"
echo "  - Consider setting up automated linting in CI/CD"
```

FINALLY:

- SAVE all session artifacts for future reference
- PROVIDE guidance for establishing ongoing code quality practices
- SUGGEST automation opportunities for preventing technical debt accumulation

## Cleanup Strategies Reference

### Language-Specific Technical Debt Patterns

**JavaScript/TypeScript:**

- `var` declarations → `let`/`const`
- Function declarations → Arrow functions where appropriate
- `console.log` debugging statements
- Unused imports and exports
- `any` types → Specific types
- Legacy Promise syntax → async/await

**Rust:**

- `#[allow(dead_code)]` annotations
- Unused imports and modules
- Deprecated std library usage
- Clippy warnings and suggestions
- Outdated dependency versions

**Go:**

- Unused variables and imports
- `go fmt` formatting inconsistencies
- `go vet` warnings
- Deprecated standard library functions
- Missing error handling

**Java:**

- Unused imports
- Deprecated annotations and methods
- Raw type usage → Generics
- System.out.println debugging
- Outdated dependency versions

### Common Anti-Patterns to Address

**Code Quality Issues:**

- Magic numbers → Named constants
- Long parameter lists → Configuration objects
- Deep nesting → Early returns and guard clauses
- Large files → Modular decomposition
- Inconsistent naming → Standardized conventions

**Performance Patterns:**

- N+1 query problems
- Unnecessary object allocations
- Inefficient algorithms
- Memory leaks from unclosed resources
- Blocking operations in async contexts

**Security Patterns:**

- Hardcoded credentials → Environment variables
- SQL injection vulnerabilities
- Insecure random number generation
- Missing input validation
- Outdated cryptographic algorithms

This comprehensive cleanup command ensures safe, systematic technical debt reduction with proper verification and rollback capabilities.