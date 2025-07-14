---
allowed-tools: Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(git:*), Bash(jq:*), Bash(gdate:*), Bash(node:*), Bash(npm:*), Task
name: "Docs Update"
description: "Update and maintain Docusaurus documentation by analyzing codebase changes with automated content refresh"
author: "wcygan"
tags: ["docs","manage"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "1751901071157927000"`
- Current directory: !`pwd`
- Target: $ARGUMENTS
- Documentation directory: !`fd -t d "docs" . -d 2 | head -1 || echo "No docs directory found"`
- Docusaurus config: !`fd "docusaurus.config.js" . -d 3 | head -1 || echo "No docusaurus config found"`
- Git status: !`git status --porcelain | wc -l | tr -d ' ' || echo "0"` files changed
- Project structure: !`fd . -t d -d 2 | head -8 || echo "No subdirectories found"`
- API specs: !`fd "(openapi|swagger)\.(yaml|yml|json)$" . -d 3 | head -3 || echo "No API specs found"`
- JSDoc files: !`rg -l "@param|@returns|@example" --type typescript --type javascript . | wc -l | tr -d ' ' || echo "0"` files with JSDoc
- Node.js available: !`which node 2>/dev/null && echo "available" || echo "not available"`

## Your Task

STEP 1: Initialize documentation update session with state management

- CREATE session state file: `/tmp/docs-update-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "ISO_8601_TIMESTAMP",
    "phase": "initialization",
    "target_scope": "$ARGUMENTS",
    "project_analysis": {
      "has_docs_directory": false,
      "has_docusaurus_config": false,
      "api_specs_count": 0,
      "jsdoc_files_count": 0,
      "git_changes_count": 0
    },
    "update_sources": [],
    "documentation_state": {},
    "validation_results": {},
    "performance_metrics": {
      "start_time": "ISO_8601_TIMESTAMP",
      "phase_timings": {},
      "total_duration": null
    },
    "error_recovery": {
      "failed_operations": [],
      "recovery_attempts": [],
      "partial_completions": []
    }
  }
  ```
- CREATE documentation workspace: `/tmp/docs-update-$SESSION_ID/`
- VALIDATE prerequisite tools and environment

STEP 2: Project analysis and documentation scope determination

Think deeply about the optimal documentation update strategy based on the detected project characteristics and existing documentation state.

IF no documentation directory found:

- LOG missing docs directory to session state
- RECOMMEND running `/docs-init` first
- PROVIDE guidance on documentation setup
- EXIT with helpful instructions

ELSE:

- ANALYZE project structure from Context section
- DETERMINE update scope based on $ARGUMENTS:
  - IF no arguments: UPDATE all sources (codebase, api, git, sidebar)
  - IF "codebase": FOCUS on code documentation extraction
  - IF "api": FOCUS on API specification updates
  - IF "validate": FOCUS on content validation and fixing
  - IF "sidebar": FOCUS on navigation regeneration
  - ELSE: PARSE custom scope from arguments

- UPDATE session state with analysis results

STEP 3: Documentation source analysis and update strategy

CASE update_scope:
WHEN "all" OR "codebase":

TRY:

**Codebase Analysis and Documentation Extraction:**

- SCAN for Mermaid diagrams in existing documentation:
  - DETECT existing diagrams with fd and rg
  - VALIDATE diagram syntax and formatting
  - UPDATE content based on code architecture changes
  - INTEGRATE with Docusaurus Mermaid theme configuration

- EXTRACT code documentation:

  - SCAN TypeScript/JavaScript files for JSDoc comments
  - EXTRACT function signatures and type definitions
  - GENERATE API reference documentation from exports
  - UPDATE configuration documentation from config files
  - PROCESS language-specific documentation patterns

CATCH (codebase_analysis_failed):

- LOG analysis errors to session state
- ATTEMPT alternative extraction methods
- CONTINUE with partial results
- SAVE error details for manual review

WHEN "all" OR "api":

TRY:
**API Documentation Integration:**

- PARSE API specification files (openapi.yaml, swagger.json)
- GENERATE endpoint documentation with examples
- CREATE request/response schemas
- UPDATE authentication documentation
- SUPPORT multiple formats:
  - OpenAPI 3.x specifications
  - Swagger 2.0 specifications
  - Postman collections (via conversion)
  - GraphQL schemas (via introspection)

CATCH (api_documentation_failed):

- LOG API processing errors to session state
- ATTEMPT alternative parsing methods
- CONTINUE with available API documentation
- PROVIDE manual API documentation instructions

WHEN "all" OR includes git analysis:

TRY:
**Git History Analysis and Changelog Generation:**

- ANALYZE commit messages using conventional commit format
- GROUP changes by type (feat, fix, docs, refactor, etc.)
- EXTRACT breaking changes and migration notes
- UPDATE version history and release notes
- DETECT API breaking changes from code diffs
- GENERATE migration guides for major version updates
- DOCUMENT deprecated features and replacement APIs
- CREATE upgrade instructions with examples

CATCH (git_analysis_failed):

- LOG git operation errors to session state
- ATTEMPT alternative history analysis methods
- CONTINUE with available git information
- PROVIDE manual changelog instructions

STEP 4: Advanced documentation processing for complex projects

IF project has >100 documentation files OR multiple API specs:

Think harder about enterprise documentation coordination strategies and optimal sub-agent delegation patterns.

- USE Task tool for parallel documentation processing:
  1. **Codebase Documentation Agent**: Extract and process all code documentation
     - SAVE findings to: `/tmp/docs-update-$SESSION_ID/codebase-docs.json`
  2. **API Documentation Agent**: Process all API specifications and generate endpoint docs
     - SAVE findings to: `/tmp/docs-update-$SESSION_ID/api-docs.json`
  3. **Content Validation Agent**: Validate links, examples, and content quality
     - SAVE findings to: `/tmp/docs-update-$SESSION_ID/validation-results.json`
  4. **Sidebar Generation Agent**: Analyze structure and regenerate navigation
     - SAVE findings to: `/tmp/docs-update-$SESSION_ID/sidebar-structure.json`

ELSE:

- EXECUTE sequential documentation updates
- PROCESS each source systematically
- MAINTAIN single-threaded execution for smaller projects

STEP 5: Configuration and environment updates

TRY:

**Environment and Configuration Analysis:**

- SCAN code for environment variable usage
- UPDATE configuration documentation automatically
- GENERATE example `.env` files with descriptions
- DOCUMENT required vs. optional configuration
- TRACK dependency updates and security advisories
- UPDATE installation and setup documentation
- DOCUMENT breaking changes in major dependency updates
- GENERATE compatibility matrices for supported versions

CATCH (configuration_update_failed):

- LOG configuration processing errors
- ATTEMPT manual configuration detection
- CONTINUE with available configuration data
- PROVIDE manual configuration update instructions

STEP 6: Content validation and quality assurance

CASE validation_scope:
WHEN "all" OR "validate":

TRY:

**Comprehensive Content Validation:**

- VALIDATE all internal and external links
- CHECK code examples for syntax errors
- VERIFY image and asset references
- REPORT broken cross-references
- CHECK for outdated examples and code snippets
- VALIDATE API endpoint documentation against actual APIs
- ENSURE consistent formatting and style
- DETECT missing documentation for public APIs
- VALIDATE Mermaid diagram syntax and rendering

- GENERATE comprehensive validation report:
  ```
  📋 Documentation Validation Results

  ✅ Links: X/Y valid
  ❌ Code Examples: N syntax errors found
  ⚠️ Missing Documentation: M items
  📊 Coverage: P% (A/B public APIs documented)
  ```

CATCH (validation_failed):

- LOG validation errors to session state
- ATTEMPT partial validation with reduced scope
- CONTINUE with available validation results
- PROVIDE manual validation instructions
  STEP 7: Sidebar regeneration and navigation updates

CASE update_scope:
WHEN "all" OR "sidebar":

TRY:

**Automatic Sidebar Organization:**

- ANALYZE document structure and relationships
- GROUP related content together
- MAINTAIN logical information hierarchy
- PRESERVE custom ordering where specified
- GENERATE updated sidebar configuration

CATCH (sidebar_generation_failed):

- LOG sidebar processing errors
- ATTEMPT manual sidebar structure detection
- CONTINUE with existing sidebar configuration
- PROVIDE manual sidebar update instructions

STEP 8: Smart content merging and conflict resolution

TRY:

**Intelligent Content Integration:**

- PRESERVE manual edits while updating generated content
- USE content markers to separate auto-generated sections
- MAINTAIN custom examples and explanations
- PROVIDE merge conflict resolution for documentation updates
- IMPLEMENT content markers pattern:
  ```markdown
  <!-- AUTO-GENERATED:START - Do not edit manually -->

  [Generated content here]

  <!-- AUTO-GENERATED:END -->
  ```

CATCH (content_merging_failed):

- LOG merging conflicts and issues
- ATTEMPT safer merge strategies
- BACKUP conflicting content
- CONTINUE with manual merge instructions

STEP 9: Final state management and completion

- UPDATE session state with all results and performance metrics
- RECORD completion status and any remaining issues
- CREATE comprehensive update summary: `/tmp/docs-update-$SESSION_ID/update-summary.md`
- GENERATE documentation health report: `/tmp/docs-update-$SESSION_ID/health-report.json`
- SAVE update artifacts and logs
- CLEAN UP temporary files (EXCEPT archived results)

FINALLY:

- ARCHIVE session results: `/tmp/docs-update-archive-$SESSION_ID.json`
- PROVIDE completion summary with metrics
- LOG session completion timestamp and final status

## Usage Examples

```bash
# Update all documentation sources
/docs-update

# Update only from code changes
/docs-update codebase

# Validate and fix issues
/docs-update validate

# Update API documentation
/docs-update api

# Regenerate sidebar after adding new files
/docs-update sidebar
```

## Extended Thinking Integration

**For Complex Documentation Projects:**

- Use extended thinking for comprehensive documentation architecture analysis
- Think deeply about optimal content organization and user journey mapping
- Think harder about integration strategies between generated and manual content
- Ultrathink about long-term maintenance and evolution strategies for large documentation systems

**Extended Thinking Areas:**

- Documentation architecture patterns for scalable multi-service systems
- User experience optimization for technical documentation
- Integration challenges between automated and manual content creation
- Performance optimization strategies for large documentation sites
- Content lifecycle management and versioning strategies

## Prerequisites and Integration

- Existing `/docs` folder with Docusaurus installation
- Node.js 16+ for Docusaurus commands
- Git repository for history analysis
- Valid project structure with supported file types

**Integration with Other Commands:**

- Run after `/docs-init` to populate initial content
- Use before `/docs-add` to ensure existing content is current
- Combine with `/api-docs` for comprehensive API documentation
- Integrate with `/changelog` for release documentation updates

**Workflow Integration Examples:**

```bash
# Pre-commit validation
/docs-update validate

# CI/CD pipeline integration
/docs-update codebase api

# Release preparation
/docs-update && git add docs/ && git commit -m "docs: update for release"
```