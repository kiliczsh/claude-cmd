---
allowed-tools: Read, Write, Edit, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), WebFetch, Task
name: "Docs Add"
description: "Generate comprehensive documentation with intelligent content organization and Docusaurus integration"
author: "wcygan"
tags: ["docs","manage"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Target: $ARGUMENTS
- Project structure: !`fd . -t d -d 2 | head -10 || echo "No subdirectories found"`
- Docusaurus indicators: !`fd "docusaurus.config.js" . -d 3 | head -3 || echo "No Docusaurus config found"`
- Existing docs: !`fd "docs" . -t d -d 2 | head -5 || echo "No docs directories found"`
- Documentation files: !`fd "\.(md|mdx)$" docs/ 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Sidebar config: !`fd "sidebars.js" . -d 3 | head -1 || echo "No sidebar config found"`
- Technology stack: !`fd "(package\.json|deno\.json|Cargo\.toml|go\.mod)" . -d 2 | head -3 || echo "Unknown stack"`
- Git status: !`git status --porcelain docs/ 2>/dev/null | wc -l | tr -d ' ' || echo "0"` docs changes

## Your task

STEP 1: Initialize documentation generation session

- CREATE session state file: `/tmp/docs-add-state-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "ISO_8601_TIMESTAMP",
    "phase": "initialization",
    "target_content": "$ARGUMENTS",
    "project_analysis": {
      "has_docusaurus": false,
      "docs_directory": null,
      "existing_structure": {},
      "technology_stack": [],
      "content_type": "unknown"
    },
    "generation_plan": {
      "content_type": null,
      "placement_strategy": null,
      "template_selection": null,
      "sidebar_updates": false
    },
    "checkpoints": {},
    "artifacts": {
      "generated_files": [],
      "updated_configs": [],
      "validation_results": {}
    }
  }
  ```
- CREATE documentation workspace: `/tmp/docs-add-workspace-$SESSION_ID/`

STEP 2: Analyze existing documentation structure and requirements

Think deeply about optimal documentation organization strategy based on detected project characteristics and existing structure.

TRY:

- ANALYZE project structure from Context section
- DETECT documentation framework and existing organization
- DETERMINE content type from $ARGUMENTS:

  IF $ARGUMENTS contains "guide":
  - SET content_type = "guide"
  - SET template = "step-by-step-guide"

  ELSE IF $ARGUMENTS contains "api":
  - SET content_type = "api"
  - SET template = "api-reference"

  ELSE IF $ARGUMENTS contains "tutorial":
  - SET content_type = "tutorial"
  - SET template = "progressive-tutorial"

  ELSE IF $ARGUMENTS contains "diagram":
  - SET content_type = "diagram"
  - SET template = "mermaid-diagram"

  ELSE IF $ARGUMENTS contains "troubleshooting":
  - SET content_type = "troubleshooting"
  - SET template = "problem-solution"

  ELSE:
  - SET content_type = "general"
  - SET template = "basic-documentation"

- UPDATE session state with analysis results

CATCH (analysis_failed):

- LOG error details to session state
- SET content_type = "general" as fallback
- CONTINUE with basic documentation generation

STEP 3: Determine optimal placement and generation strategy

Think harder about content organization, cross-referencing, and integration with existing documentation architecture.

IF no docs/ directory exists:

- RECOMMEND running `/docs-init` first
- EXIT with setup instructions

ELSE:

- ANALYZE existing sidebar structure
- DETERMINE appropriate category placement
- IDENTIFY cross-reference opportunities
- PLAN sidebar integration strategy

IF content is complex (multiple sections OR >1000 words expected):

- Consider using Task tool for parallel content generation:
  - **Content Structure Agent**: Outline and organization
  - **Examples Generator Agent**: Code examples and samples
  - **Cross-Reference Agent**: Links and related content
  - **Template Customization Agent**: Project-specific adaptations

STEP 4: Generate documentation content using intelligent templates

TRY:

CASE content_type:
WHEN "guide":

- GENERATE step-by-step guide structure:
  ```markdown
  # {TITLE}

  ## Overview

  Brief description and scope

  ## Prerequisites

  - Required knowledge
  - Dependencies needed

  ## Step-by-Step Instructions

  ### Step 1: {Action}

  Detailed instructions with examples

  ## Troubleshooting

  Common issues and solutions

  ## Next Steps

  Related documentation
  ```

WHEN "api":

- GENERATE API reference structure:
  ```markdown
  # {TITLE} API Reference

  ## Overview

  API purpose and base URL

  ## Authentication

  Security requirements

  ## Endpoints

  ### GET /endpoint

  - **Description**: Functionality
  - **Parameters**: Input requirements
  - **Response**: Output format
  - **Examples**: Sample requests/responses

  ## Error Handling

  Status codes and error responses
  ```

WHEN "tutorial":

- GENERATE progressive tutorial structure:
  ```markdown
  # {TITLE} Tutorial

  ## What You'll Learn

  Learning objectives

  ## What You'll Build

  End result description

  ## Tutorial Steps

  ### Part 1: Foundation

  Basic concepts and setup

  ### Part 2: Implementation

  Core functionality

  ### Part 3: Enhancement

  Advanced features

  ## Summary and Next Steps

  Recap and further reading
  ```

WHEN "diagram":

- GENERATE Mermaid diagram structure:
  ````markdown
  # {TITLE}

  ## Overview

  Context and purpose

  ```mermaid
  graph TD
      A[Component A] --> B[Component B]
      B --> C[Component C]
  ```
  ````

  ## Components
  Description of diagram elements

  ## Related Documentation
  Links to detailed docs
  ```
  ```

WHEN "troubleshooting":

- GENERATE problem-solution structure:
  ```markdown
  # {TITLE} Troubleshooting

  ## Common Issues

  ### Issue: {Problem Description}

  **Symptoms**: What users experience
  **Cause**: Root cause explanation\
  **Solution**: Step-by-step fix
  **Prevention**: Avoiding recurrence

  ## Diagnostic Tools

  Investigation commands and techniques

  ## Getting Help

  Escalation procedures
  ```

DEFAULT:

- GENERATE basic documentation structure with project-appropriate examples

- CUSTOMIZE content with technology-specific examples from detected stack
- SAVE generated content to workspace
- UPDATE session state with generation results

CATCH (content_generation_failed):

- LOG error details and attempted template
- GENERATE minimal fallback content
- MARK session state with partial completion

STEP 5: Update Docusaurus configuration and sidebar integration

TRY:

IF sidebar config exists:

- READ current sidebars.js configuration
- DETERMINE appropriate category for new content
- UPDATE sidebar with new documentation entry
- MAINTAIN existing organization and ordering
- ADD cross-references to related existing content

- VALIDATE sidebar syntax and structure
- BACKUP original configuration before changes

CATCH (sidebar_update_failed):

- LOG configuration errors to session state
- PROVIDE manual integration instructions
- SAVE suggested sidebar updates to workspace

STEP 6: Content validation and formatting

- RUN content validation checks:
  - Markdown syntax validation
  - Internal link verification
  - Code example syntax checking
  - Mermaid diagram validation (if applicable)

- FORMAT content according to project standards:
  - Apply consistent heading structure
  - Standardize code block languages
  - Ensure proper cross-reference formatting

- CREATE final documentation file in appropriate location
- UPDATE session state with completion status

STEP 7: Session completion and artifact management

- FINALIZE session state with generation summary
- CREATE documentation generation report: `/tmp/docs-add-report-$SESSION_ID.md`
- LIST generated files and configuration changes
- PROVIDE post-generation workflow recommendations:
  - Review and customize generated content
  - Test documentation in local development server
  - Validate cross-references and examples
  - Commit changes following documentation standards

FINALLY:

- ARCHIVE session data for reference: `/tmp/docs-add-archive-$SESSION_ID.json`
- CLEAN UP temporary workspace files
- LOG completion timestamp and performance metrics

## Content Templates Reference

### Available Templates by Type

1. **Guide Templates**: Step-by-step instructions with prerequisites and troubleshooting
2. **API Reference**: Comprehensive endpoint documentation with examples
3. **Tutorial Templates**: Progressive learning experiences with clear outcomes
4. **Diagram Templates**: Mermaid-powered visual documentation
5. **Troubleshooting**: Problem-solution format with diagnostic guidance
6. **General Documentation**: Flexible structure for various content types

### Smart Content Enhancement

- **Technology Detection**: Automatically includes relevant code examples
- **Cross-Reference Generation**: Links to related existing documentation
- **Sidebar Integration**: Maintains logical organization and navigation
- **Template Customization**: Adapts to project-specific patterns and conventions

### Examples

**Create guide with auto-placement:**

```bash
/docs-add guide Quick Start
```

**Add API documentation:**

```bash
/docs-add api REST API Reference
```

**Generate system diagram:**

```bash
/docs-add diagram System Architecture
```

**Create troubleshooting guide:**

```bash
/docs-add troubleshooting Common Issues
```

## Prerequisites

- Existing Docusaurus installation with docs/ directory
- Valid sidebars.js configuration file
- Write permissions to documentation directory
- Git repository for change tracking (recommended)

## Integration

- Use after `/docs-init` to build out documentation structure
- Combine with `/api-docs` for comprehensive API documentation
- Integrate with project-specific documentation workflows
- Supports multi-agent coordination for large documentation projects