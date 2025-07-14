---
allowed-tools: Read, Write, Edit, MultiEdit, Task, Grep, Bash(rg:*), Bash(fd:*), Bash(gdate:*), Bash(jq:*), Bash(git:*), Bash(deno:*), Bash(go:*), Bash(cargo:*)
name: "Standardize"
description: "Apply consistent coding standards, naming conventions, and architectural patterns across codebase"
author: "wcygan"
tags: ["code","refactor"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /standardize

Apply consistent coding standards, naming conventions, and architectural patterns across the entire codebase.

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Target scope: $ARGUMENTS
- Project structure: !`fd . -t d -d 2 | head -10 || echo "No subdirectories"`
- Code files: !`fd -e ts -e js -e go -e rs -e java -e py . | wc -l | tr -d ' ' || echo "0"`
- Technology stack: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod|pom\.xml)" --max-depth 2 | head -5 || echo "No tech files detected"`
- Git repository: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`
- Formatting tools: !`which deno && echo "deno available" || echo "deno not found"; which go && echo "go available" || echo "go not found"; which cargo && echo "cargo available" || echo "cargo not found"`

## Usage

```
/standardize [aspect: code|naming|structure|all] [scope]
```

## Your Task

STEP 1: Standardization Setup and Scope Analysis

- Create session state file: /tmp/standardize-state-$SESSION_ID.json
- Parse target scope: $ARGUMENTS (defaults to "all" if not provided)
- Determine standardization aspects: code|naming|structure|all
- Initialize progress tracking and backup system
- Save baseline checkpoint before any changes

STEP 2: Codebase Discovery and Analysis (Parallel Sub-Agent Approach)

FOR comprehensive standardization across large codebases:

Launch 5 parallel sub-agents to analyze:

- **Naming Patterns Agent**: Analyze file, variable, function naming inconsistencies
- **Code Style Agent**: Detect formatting, import organization, and style issues
- **Structure Agent**: Map directory organization and architectural patterns
- **Error Handling Agent**: Identify inconsistent error handling patterns
- **Configuration Agent**: Analyze config files and environment setup patterns

ELSE (smaller codebases or focused scope):

Execute sequential analysis:

- Detect naming inconsistencies: rg "class|interface|struct|type" --type-add 'code:*.{ts,js,go,rs,java}' -t code
- Find style patterns: rg "^(const|let|var|def|fn|func)" -o | sort | uniq -c
- Check file organization: fd . --type f | sed 's|._/||' | sed 's|\.._||' | sort | uniq -c
- Identify formatting issues: deno fmt --check || go fmt ./... || cargo fmt -- --check

STEP 3: Technology-Specific Standards Detection

TRY:

- Detect primary technology stack from Context
- Apply framework-specific standards (Deno Fresh, React, Go, Rust, etc.)
- Load existing configuration files (.eslintrc, .prettierrc, etc.)
- Identify team coding style from dominant patterns
- Save checkpoint: analysis_complete

CATCH (mixed_technology_stack):

- Apply universal standards (naming, structure, comments)
- Create technology-specific standardization plans
- Document cross-language consistency requirements
- Proceed with conservative standardization approach

STEP 4: Standards Implementation (Sequential with Checkpoints)

Think deeply about the optimal approach for applying standardization changes safely across the codebase.

### Naming Convention Standardization

TRY:

- Apply file naming standards based on detected technology stack
- Standardize variable and function naming patterns
- Update database schema naming (if applicable)
- Create backup of all renamed files
- Save checkpoint: naming_standardization_complete

FOR EACH file requiring standardization:

- Analyze current naming patterns
- Generate standardized names following team conventions
- Create rename mapping: { from: originalName, to: standardName }
- Update all import references
- Validate no broken dependencies introduced

### Code Style and Import Organization

TRY:

- Organize imports according to framework standards
- Apply consistent formatting using available tools
- Standardize error handling patterns
- Update API response formats
- Save checkpoint: style_standardization_complete

FOR EACH code file:

- Parse import statements and categorize (built-ins, external, internal, relative)
- Reorder imports according to standard hierarchy
- Apply consistent code formatting (deno fmt, go fmt, cargo fmt)
- Update error handling to use standard patterns
- Validate syntax correctness after changes

CATCH (formatting_tool_missing):

- Document missing formatting tools in session state
- Apply manual formatting standards where possible
- Create manual style guide for team reference
- Continue with available standardization methods

### Project Structure Standardization

TRY:

- Create standard directory structure based on technology stack
- Move files to appropriate locations following framework conventions
- Update import paths after file relocations
- Ensure all moved files maintain functionality
- Save checkpoint: structure_standardization_complete

FOR EACH misplaced file:

- Determine appropriate location based on file type and content
- Create target directory if not exists
- Move file to standard location
- Update all import references across codebase
- Validate no broken imports introduced

STEP 5: Validation and Quality Assurance

TRY:

- Run all available formatters and linters to verify standards compliance
- Execute tests to ensure functionality preserved
- Validate import references are correct
- Check that renamed files are properly referenced
- Generate compliance report
- Save checkpoint: validation_complete

### Post-Standardization Validation

FOR EACH technology in project:

- IF Deno project: Run `deno check` and `deno fmt --check`
- IF Go project: Run `go vet ./...` and `go fmt ./...`
- IF Rust project: Run `cargo check` and `cargo fmt --check`
- Validate all tests still pass
- Check for any broken imports or references

CATCH (validation_failures):

- Rollback to last successful checkpoint
- Document validation issues in session state
- Apply fixes for specific validation failures
- Retry validation process

STEP 6: Report Generation and Documentation

TRY:

- Generate comprehensive standardization report
- Document all changes made with before/after examples
- Create standards compliance checklist
- Generate team style guide based on applied standards
- Save session summary and recommendations
- Save checkpoint: report_generation_complete

### Standardization Report Generation

Create detailed report including:

- Files analyzed and modified count
- Naming convention changes applied
- Code structure improvements made
- Import organization statistics
- Validation results and remaining issues
- Team recommendations for maintaining standards

STEP 7: State Management and Session Cleanup

TRY:

- Update session state: /tmp/standardize-state-$SESSION_ID.json
- Archive standardization artifacts for future reference
- Generate configuration files for automated checking (.eslintrc, .prettierrc, etc.)
- Create pre-commit hooks for standard enforcement
- Document session completion metrics

CATCH (incomplete_standardization):

- Save partial standardization progress to state file
- Document remaining work items and blockers
- Create resumption plan for next session
- Mark areas requiring manual review

FINALLY:

- Clean up temporary files: /tmp/standardize-temp-$SESSION_ID-*
- Generate final standardization summary
- Provide next steps for maintaining code standards
- Update team documentation with new standards

## Integration and Expected Outcomes

### Integration with Other Commands

- Use after `/analyze` to understand current codebase patterns
- Combine with `/refactor` for specific code improvements
- Follow with `/test` to ensure standardization preserves functionality
- Use with `/format` for consistent code styling

### Expected Outcomes

1. **Consistent Codebase**: Unified naming conventions and structure across all files
2. **Improved Maintainability**: Easier to navigate and understand codebase
3. **Enhanced Collaboration**: Team follows same coding standards
4. **Automated Enforcement**: Pre-commit hooks prevent standard violations
5. **Documentation**: Style guide and standards reference for team

### Success Metrics

- **Naming Consistency**: 95%+ files follow naming conventions
- **Import Organization**: 100% files have organized imports
- **Code Format**: All files pass formatting checks
- **Structure Compliance**: Standard directory structure followed
- **Validation**: All tests pass after standardization

## Session State Management

**State Files Created:**

- `/tmp/standardize-state-$SESSION_ID.json` - Main session state
- `/tmp/standardize-analysis-$SESSION_ID.json` - Analysis results
- `/tmp/standardize-changes-$SESSION_ID.json` - Applied changes log
- `/tmp/standardize-report-$SESSION_ID.json` - Final report

**Resumability:**

- Session can be resumed from any checkpoint
- Partial changes preserved across sessions
- Rollback capability to any previous checkpoint
- State transitions tracked for workflow continuation