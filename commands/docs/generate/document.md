---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(git:*), Bash(jq:*), Bash(gdate:*), Task
name: "Document"
description: "Generate comprehensive user-facing documentation with intelligent analysis and state management"
author: "wcygan"
tags: ["docs","generate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "session-$(date +%s)000000000"`
- Current directory: !`pwd`
- Target scope: $ARGUMENTS
- Project files: !`fd "(package\.json|Cargo\.toml|go\.mod|deno\.json|pom\.xml|build\.gradle)" . | head -5 || echo "No project files detected"`
- Documentation status: !`fd "(README\.md|CHANGELOG\.md)" . | head -3 || echo "No existing documentation"`
- API specs: !`fd "(openapi\.(yaml|yml|json)|swagger\.(yaml|yml|json)|\.proto$)" . | head -5 || echo "No API specifications found"`
- Config files: !`fd "(config\.(yaml|yml|json|toml)|\.(env|example)$)" . | head -5 || echo "No config files found"`
- Source code files: !`fd "\.(js|ts|go|rs|java|py|rb|php|cs|swift|kt)$" . | wc -l | tr -d ' ' || echo "0"`
- Git repository: !`git status --porcelain 2>/dev/null | head -3 || echo "Not a git repository"`
- Recent commits: !`git log --oneline -5 2>/dev/null || echo "No git history"`
- Technology stack: !`rg "(import|require|use|from)" . --type typescript --type javascript --type rust --type go | head -5 || echo "No imports detected"`

## Your Task

Generate comprehensive, user-facing documentation through systematic analysis and intelligent content creation.

STEP 1: Initialize documentation generation session

- CREATE session state file: `/tmp/documentation-session-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "scope": "$ARGUMENTS or all",
    "project_info": {},
    "documentation_plan": [],
    "generated_files": [],
    "analysis_results": {}
  }
  ```

STEP 2: Project discovery and analysis

Think hard about the optimal documentation strategy based on project complexity and structure.

IF source code files > 100 OR multiple project files detected:

- USE sub-agent delegation for comprehensive analysis
- SET scope to "comprehensive"
- CREATE inter-agent communication directory: `/tmp/doc-agents-$SESSION_ID/`
  ELSE IF $ARGUMENTS contains specific flags (--readme-only, --changelog-only, etc.):
- SET scope to "targeted"
- FOCUS on specified documentation type
  ELSE:
- PERFORM sequential analysis
- SET scope to "standard"

STEP 3: Strategic documentation analysis

FOR comprehensive scope:

- DELEGATE to 5 parallel sub-agents:
  1. **Project Structure Agent**: Analyze codebase architecture and technology stack
     - SAVE findings to: `/tmp/doc-agents-$SESSION_ID/structure-analysis.json`
  2. **API Documentation Agent**: Extract API endpoints, schemas, and specifications
     - SAVE findings to: `/tmp/doc-agents-$SESSION_ID/api-analysis.json`
  3. **Configuration Agent**: Document environment variables and configuration options
     - SAVE findings to: `/tmp/doc-agents-$SESSION_ID/config-analysis.json`
  4. **Git History Agent**: Analyze commits for changelog generation
     - SAVE findings to: `/tmp/doc-agents-$SESSION_ID/changelog-analysis.json`
  5. **Usage Patterns Agent**: Identify CLI commands, scripts, and usage examples
     - SAVE findings to: `/tmp/doc-agents-$SESSION_ID/usage-analysis.json`

FOR targeted scope:

- ANALYZE only the requested documentation type
- FOCUS analysis on specific requirements

FOR standard scope:

- PERFORM sequential analysis of all documentation needs
- PRIORITIZE based on project characteristics

STEP 4: Documentation generation strategy

CASE documentation_type:
WHEN "readme" OR "all":

- GENERATE README.md with sections:
  - Project overview from package metadata
  - Technology stack badges and detection
  - Installation instructions (auto-detected package manager)
  - Usage examples from scripts and CLI commands
  - Development setup and contribution guidelines
  - API documentation links (if applicable)

WHEN "changelog" OR "all":

- ANALYZE git history for conventional commits
- GROUP commits by type: feat, fix, docs, refactor, test, chore
- EXTRACT breaking changes and version information
- GENERATE structured CHANGELOG.md with:
  - Semantic versioning based on commit types
  - Grouped changes by release version
  - Links to issues and pull requests
  - Release dates and contributor attribution

WHEN "api-docs" OR "all":

- DETECT API specification format (OpenAPI, gRPC, GraphQL)
- PARSE specification files for endpoint documentation
- GENERATE human-readable API documentation
- CREATE endpoint examples and authentication guides
- INCLUDE error handling and response documentation

STEP 5: Content generation and file creation

TRY:

- CREATE documentation files based on analysis results
- APPLY project-specific templates if available
- ENSURE consistent formatting and structure
- VALIDATE markdown syntax and links

FOR EACH documentation file to generate:

1. **Load or synthesize analysis data**
2. **Apply intelligent content generation**
3. **Use project-specific context and examples**
4. **Validate output quality and completeness**
5. **Save to appropriate location**

CATCH (generation_failed):

- LOG errors to session state
- CONTINUE with partial generation
- PROVIDE manual generation guidance
- SAVE progress for resumability

STEP 6: Documentation optimization and enhancement

- APPLY SEO-friendly heading hierarchy
- GENERATE appropriate badges and metadata
- CREATE table of contents for longer documents
- ADD social media preview metadata
- ENSURE accessibility with alt text and semantic structure

STEP 7: Quality assurance and validation

- VALIDATE all generated markdown syntax
- CHECK internal and external link functionality
- VERIFY code examples and configuration accuracy
- ENSURE all public APIs are documented
- TEST documentation completeness against project scope

STEP 8: Session completion and state management

- UPDATE session state with generation results
- CREATE documentation summary report
- SAVE generation metadata: `/tmp/documentation-metadata-$SESSION_ID.json`
- MARK completion checkpoint

FINALLY:

- CLEAN UP temporary session files
- ARCHIVE analysis results for future reference
- PROVIDE generation summary with file locations

## Advanced Documentation Generation Features

### Technology Detection and Framework Intelligence

**Project Types Automatically Recognized:**

- **Web APIs**: REST, GraphQL, gRPC services with endpoint documentation
- **CLI Tools**: Command-line applications with help text and usage examples
- **Libraries**: Distribution packages (npm, crates.io, PyPI) with API references
- **Web Applications**: Frontend apps with build processes and deployment guides
- **Microservices**: Containerized services with health endpoints and service mesh docs

**Framework-Specific Documentation Patterns:**

- **Go**: Gin, Echo, Fiber, Connect-Go service docs, Cobra CLI documentation
- **Rust**: Axum, Actix-web, Warp, Rocket API docs, Clap CLI reference
- **Java**: Spring Boot configuration, Quarkus native compilation, Micronaut docs
- **Deno**: Fresh island architecture, Oak middleware, Hono routing patterns
- **Node.js**: Express middleware, Fastify plugins, Next.js deployment guides

### State Management and Resumability

**Session State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "phase": "discovery|analysis|generation|validation|complete",
  "scope": "comprehensive|targeted|standard",
  "project_info": {
    "name": "auto_detected_name",
    "type": "web_api|cli_tool|library|web_app|microservice",
    "technology_stack": ["detected_technologies"],
    "package_managers": ["npm|cargo|go_mod|deno"],
    "has_api_specs": "boolean",
    "git_repository": "boolean"
  },
  "documentation_plan": [
    {
      "type": "readme|changelog|api_docs|config_docs",
      "priority": "high|medium|low",
      "status": "pending|in_progress|completed",
      "target_file": "file_path",
      "analysis_required": ["structure|api|config|git_history|usage"]
    }
  ],
  "generated_files": [
    {
      "path": "generated_file_path",
      "type": "readme|changelog|api|config",
      "size_bytes": "file_size",
      "checksum": "content_hash",
      "generation_time": "ISO_8601_timestamp"
    }
  ],
  "sub_agent_coordination": {
    "agents_used": ["structure|api|config|git_history|usage"],
    "communication_files": ["/tmp/paths/to/agent/outputs"],
    "synthesis_complete": "boolean"
  }
}
```

**Documentation Maintenance and Quality Assurance:**

- **Staleness Detection**: Compare documentation timestamps with code modification times
- **Version Synchronization**: Auto-update version numbers from package files and git tags
- **API Documentation Refresh**: Monitor schema changes and regenerate API docs
- **Link Validation**: Check internal references and external links for accuracy
- **Completeness Verification**: Ensure all public APIs and configuration options are documented
- **Template Customization**: Support custom templates in `docs/templates/` directory

## Extended Thinking Integration

**Documentation Strategy Analysis:**

- Use extended thinking for complex project architecture documentation decisions
- Think deeply about optimal documentation structure for multi-service architectures
- Consider accessibility and internationalization requirements for global projects

**Extended Thinking Areas:**

- Documentation architecture patterns for scalable multi-service systems
- User journey mapping for optimal information architecture
- Integration strategies between generated and hand-written documentation
- Long-term maintenance and evolution strategies for documentation systems

**Content Generation Optimization:**

- Think harder about technical writing best practices for specific audiences
- Analyze documentation gaps and prioritize content creation
- Consider long-term maintenance strategies for evolving codebases

## Usage Examples and Advanced Patterns

### Basic Documentation Generation:

```
/document                        # Generate all documentation (comprehensive analysis)
/document --readme-only          # Generate only README.md (targeted analysis)
/document --changelog-only       # Generate only CHANGELOG.md (git history focus)
/document --api-docs            # Generate API documentation (specification analysis)
```

### Advanced Usage Patterns:

```
/document --all                  # Explicit comprehensive generation with sub-agents
/document api-docs config-docs   # Multiple specific types (space-separated)
/document --resume-session=<ID>  # Resume from previous session state
```

## Documentation Architecture and File Organization

**Generated Documentation Structure:**

```
project-root/
├── README.md                    # Main project documentation (auto-generated)
├── CHANGELOG.md                 # Release history and changes (git analysis)
└── docs/                        # Detailed documentation directory
    ├── api/                     # API documentation
    │   ├── endpoints.md         # REST API endpoints reference
    │   ├── authentication.md   # Authentication and authorization
    │   ├── errors.md           # Error handling and status codes
    │   └── examples/           # Request/response examples
    ├── configuration/          # Configuration documentation
    │   ├── environment.md      # Environment variables reference
    │   ├── config-files.md     # Configuration file documentation
    │   └── examples/           # Configuration examples
    ├── guides/                 # User and developer guides
    │   ├── installation.md     # Detailed installation guide
    │   ├── getting-started.md  # Quick start tutorial
    │   ├── development.md      # Development environment setup
    │   └── deployment.md       # Deployment and production guides
    └── templates/              # Custom documentation templates
        ├── README.template.md  # Custom README structure
        ├── CHANGELOG.template.md # Custom changelog format
        └── API.template.md     # Custom API documentation layout
```

## Template Customization and Content Strategy

**Template System Features:**

- **Custom Templates**: Place templates in `docs/templates/` for project-specific documentation patterns
- **Variable Substitution**: Use `{{project_name}}`, `{{version}}`, `{{description}}` placeholders
- **Conditional Sections**: Include/exclude sections based on project characteristics
- **Multi-Language Support**: Templates for internationalized documentation

**Intelligent Content Generation:**

- **Context-Aware Writing**: Adapt tone and complexity based on project type and audience
- **Example Generation**: Create realistic examples from actual code patterns
- **Cross-Reference Integration**: Automatic linking between related documentation sections
- **Consistency Enforcement**: Maintain consistent terminology and formatting across all docs

## Integration Features and Automation

**GitHub Ecosystem Integration:**

- **Issue Templates**: Generate `.github/ISSUE_TEMPLATE/` with bug reports and feature requests
- **PR Templates**: Create `.github/PULL_REQUEST_TEMPLATE.md` with review checklists
- **GitHub Pages**: Configure documentation site deployment and custom domains
- **Actions Workflows**: Set up automated documentation updates on code changes
- **Release Notes**: Generate release documentation from conventional commits

**Badge and Metadata Generation:**

- **CI/CD Status**: Build status from GitHub Actions, CircleCI, Travis CI
- **Quality Metrics**: Code coverage, test status, code climate scores
- **Package Information**: Version badges from npm, crates.io, PyPI, Maven Central
- **Project Statistics**: Language breakdown, license information, contributor counts
- **Social Proof**: Stars, forks, download counts, community health score

## Best Practices and Quality Standards

**SEO and Discoverability Optimization:**

- **Semantic Structure**: Proper H1-H6 heading hierarchy for automatic table of contents
- **Meta Information**: Keywords, descriptions, and Open Graph metadata for social sharing
- **Search Engine Optimization**: Strategic keyword placement and structured data markup
- **Cross-Platform Compatibility**: Optimized for GitHub, GitLab, Bitbucket, and documentation sites

**Accessibility and Inclusive Design:**

- **Screen Reader Support**: Proper heading structure and semantic HTML elements
- **Visual Accessibility**: Alt text for images, diagrams, and code visualizations
- **Cognitive Accessibility**: Clear language, logical flow, and comprehensive examples
- **Navigation Aids**: Table of contents, breadcrumbs, and cross-references

**Internationalization and Localization:**

- **Multi-Language Templates**: Support for localized documentation structures
- **RTL Language Support**: Right-to-left text considerations in layouts
- **Cultural Adaptation**: Region-specific examples and cultural context awareness
- **Unicode Compatibility**: Proper encoding and character set handling

## Workflow Integration and Command Synergy

**Development Workflow Integration:**

- **Post-Refactoring**: Use after `/refactor` to update documentation reflecting code changes
- **CI/CD Pipeline**: Combine with `/ci-gen` to automate documentation updates in continuous integration
- **Release Management**: Integrate with `/release` to generate release notes and update changelogs
- **API Development**: Coordinate with `/context-load-*` commands for framework-specific documentation
- **Testing**: Sync with test generation commands to include testing documentation

**Documentation Lifecycle Management:**

- **Continuous Updates**: Monitor file changes and suggest documentation updates
- **Version Synchronization**: Align documentation versions with code releases
- **Quality Gates**: Integrate with code review processes to ensure documentation completeness
- **Automated Maintenance**: Schedule periodic documentation freshness checks and updates

The documentation generation system adapts to your project's specific needs, technology stack, and development workflow, providing comprehensive, maintainable, and user-focused documentation that evolves with your codebase.