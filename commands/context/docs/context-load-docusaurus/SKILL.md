---
allowed-tools: mcp__context7__resolve-library-id, mcp__context7__get-library-docs, WebFetch, Read, Write, Task, Bash(fd:*), Bash(rg:*), Bash(gdate:*), Bash(node:*), Bash(npm:*)
name: "Context Load Docusaurus"
description: "Load comprehensive Docusaurus v3 documentation context with parallel sub-agents for maximum performance"
author: "wcygan"
tags: ["context","docs"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Docusaurus projects: !`fd "docusaurus\.config\.(js|ts|mjs)" --max-depth 3 | head -5 || echo "No Docusaurus config found"`
- Node.js version: !`node --version 2>/dev/null || echo "Node.js not installed"`
- Package manager: !`test -f yarn.lock && echo "yarn" || test -f pnpm-lock.yaml && echo "pnpm" || echo "npm"`
- Docusaurus version: !`rg '"@docusaurus/core".*"([0-9]+\.[0-9]+\.[0-9]+)"' package.json 2>/dev/null || echo "Version not detected"`
- TypeScript config: !`fd "tsconfig\.json$" --max-depth 2 | head -1 || echo "No TypeScript config"`
- Deployment config: !`rg "organizationName|projectName|deploymentBranch" docusaurus.config.* 2>/dev/null | head -3 || echo "No deployment config"`
- Theme/Plugins: !`rg "@docusaurus/(theme-|preset-|plugin-)" package.json 2>/dev/null | head -5 || echo "No plugins detected"`
- MDX files: !`fd "\.(md|mdx)$" docs --max-depth 3 2>/dev/null | wc -l | tr -d ' ' || echo "0"`

## Your Task

STEP 1: Initialize parallel context loading session

- CREATE session state file: `/tmp/docusaurus-context-$SESSION_ID.json`
- SET initial state with detected project configuration
- PREPARE for parallel sub-agent deployment
- ESTABLISH checkpoint system for resumable loading

STEP 2: Deploy 8 parallel sub-agents for ultra-fast documentation loading

**IMMEDIATELY LAUNCH ALL 8 AGENTS** for comprehensive Docusaurus expertise:

1. **Core Architecture Agent**: Load React-based SSG architecture, build process, plugin system
2. **Configuration Agent**: Deep dive into docusaurus.config.js patterns, TypeScript configs
3. **Content Management Agent**: MDX support, versioning, i18n, blog features
4. **Plugin Ecosystem Agent**: Official plugins, community plugins, custom plugin development
5. **Theme System Agent**: Theme customization, swizzling, component overrides
6. **Deployment Agent**: GitHub Pages, Netlify, Vercel, custom deployment strategies
7. **Performance Agent**: SEO optimization, build optimization, lazy loading patterns
8. **Migration Agent**: v2 to v3 migration, legacy system migration patterns

**CRITICAL**: Launch ALL agents simultaneously. NO sequential loading. Expect 8x speedup.

Each agent should:

- Focus exclusively on their domain
- Extract actionable patterns and examples
- Identify best practices and common pitfalls
- Generate domain-specific guidance

STEP 3: Primary documentation source strategy

IF Context7 MCP server available:

- USE mcp__context7__resolve-library-id with "docusaurus"
- LOAD comprehensive docs via mcp__context7__get-library-docs
- REQUEST 20000 tokens for thorough coverage
- SAVE checkpoint: context7_docusaurus_loaded

ELSE (fallback to WebFetch):

FOR EACH agent's focus area:

- WebFetch relevant documentation sections
- Extract key patterns and examples
- Synthesize actionable guidance

STEP 4: Adaptive project-specific enhancement

IF Docusaurus project detected:

- ANALYZE current version and migration needs
- IDENTIFY theme and plugin usage patterns
- MAP content structure and organization
- DETECT deployment configuration
- CUSTOMIZE guidance for specific setup

IF TypeScript detected:

- ENHANCE with TypeScript-specific patterns
- INCLUDE type-safe configuration examples
- PROVIDE typed plugin development guidance

STEP 5: Comprehensive synthesis and capability activation

After ALL agents complete:

- SYNTHESIZE findings into unified expertise model
- ACTIVATE expert capabilities for:

**Core Development:**

- React-based static site architecture
- File-based routing and page generation
- MDX integration and React components
- Plugin and preset system mastery
- Theme development and customization

**Configuration Mastery:**

- docusaurus.config.js patterns (JS/TS/ESM)
- Plugin configuration and ordering
- Theme configuration and customization
- Build optimization settings
- SEO and meta tag management

**Content Excellence:**

- Markdown and MDX best practices
- Versioned documentation strategies
- Internationalization (i18n) setup
- Blog configuration and features
- Sidebar and navigation patterns

**Advanced Features:**

- Component swizzling techniques
- Custom plugin development
- Search integration (Algolia, local)
- Progressive Web App features
- Client-side API usage

**Deployment & DevOps:**

- GitHub Pages with custom domains
- Netlify/Vercel optimizations
- Docker containerization
- CI/CD pipeline setup
- Build performance optimization

STEP 6: Generate project-specific artifacts

- CREATE implementation guide: `/tmp/docusaurus-context-$SESSION_ID/implementation-guide.md`
- GENERATE configuration templates: `/tmp/docusaurus-context-$SESSION_ID/configs/`
- COMPILE migration checklist: `/tmp/docusaurus-context-$SESSION_ID/migration-checklist.md`
- SAVE best practices: `/tmp/docusaurus-context-$SESSION_ID/best-practices.md`

STEP 7: Quality assurance and validation

TRY:

- VALIDATE all documentation sources loaded successfully
- VERIFY version compatibility (v2 vs v3)
- CHECK configuration examples for correctness
- ENSURE deployment strategies are current

CATCH (validation_errors):

- LOG issues to session state
- PROVIDE alternative documentation sources
- INCLUDE troubleshooting guidance

FINALLY:

- UPDATE session state: phase = "complete"
- REPORT loaded capabilities summary
- CLEAN UP temporary processing files
- MAINTAIN context cache for future sessions

## Expected Expert Capabilities

After successful loading, provide expert guidance on:

**Project Setup & Configuration:**

- Quick-start with TypeScript support
- Optimal project structure patterns
- Configuration best practices
- Environment-specific configs

**Content Development:**

- MDX component integration
- Documentation versioning
- Blog with tags and authors
- Search implementation
- Sidebar customization

**Theme & Styling:**

- CSS modules and styling
- Dark mode implementation
- Custom theme creation
- Swizzling best practices
- Tailwind CSS integration

**Plugin Development:**

- Lifecycle API usage
- Custom plugin patterns
- Theme plugin creation
- Build plugin optimization

**Performance & SEO:**

- Build size optimization
- Image optimization
- Meta tag management
- Sitemap generation
- PWA implementation

**Deployment Strategies:**

- GitHub Actions workflows
- Platform-specific configs
- Custom domain setup
- SSL certificate handling
- CDN integration

**Migration Patterns:**

- v1 to v2 migration
- v2 to v3 migration
- From other platforms
- Content migration tools

## Docusaurus v3 Specific Features

- Improved build performance
- Better TypeScript support
- Enhanced MDX v3 support
- Reduced bundle sizes
- Modern React features

## Common Patterns & Best Practices

### Project Structure

```
my-docs/
├── docs/                 # Documentation files
│   ├── intro.md
│   ├── tutorial-basics/
│   └── tutorial-extras/
├── blog/                 # Blog posts
├── src/                  # Custom components/pages
│   ├── components/
│   ├── css/
│   └── pages/
├── static/              # Static assets
├── docusaurus.config.js # Main configuration
├── sidebars.js          # Sidebar configuration
└── package.json
```

### Configuration Patterns

- Use environment variables for deployment configs
- Implement proper TypeScript types for configs
- Organize plugins logically (content → theme → misc)
- Use presets for common plugin combinations

### Performance Optimization

- Enable production optimizations
- Implement lazy loading for heavy components
- Use appropriate image formats and sizes
- Configure proper caching headers
- Minimize custom CSS/JavaScript

## Session Management

Each context loading session maintains:

- Isolated state in `/tmp/docusaurus-context-$SESSION_ID.json`
- Checkpoint system for incremental loading
- Parallel agent coordination tracking
- Capability activation registry
- Performance metrics (8x faster than sequential)

## Usage Example

```
/context-load-docusaurus
```

This command loads comprehensive Docusaurus documentation using 8 parallel agents for maximum performance, providing instant expertise on all aspects of Docusaurus development.