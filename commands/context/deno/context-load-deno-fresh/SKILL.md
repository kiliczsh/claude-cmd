---
allowed-tools: mcp__context7__resolve-library-id, mcp__context7__get-library-docs, WebFetch, Read, Write, Bash(fd:*), Bash(rg:*), Bash(gdate:*)
name: "Context Load Deno Fresh"
description: "Load comprehensive Deno Fresh framework context with islands architecture and modern styling"
author: "wcygan"
tags: ["context","deno"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Fresh projects detected: !`fd "deno\.json" --max-depth 2 | rg fresh | head -5 || echo "No Fresh projects found"`
- Deno version: !`deno --version | head -1 || echo "Deno not installed"`
- Framework files: !`fd "(fresh\.config|routes|islands)" --type d --max-depth 3 | head -10 || echo "No Fresh structure detected"`
- Tailwind configs: !`fd "(tailwind\.config|twind\.config)" --max-depth 2 | head -5 || echo "No styling configs found"`
- Git status: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`

## Your Task

STEP 1: Context Loading Session Initialization

- Create session state file: /tmp/fresh-context-$SESSION_ID.json
- Initialize context loading registry and source tracking
- Set up parallel context loading coordination
- Create checkpoint system for resumable context loading

STEP 2: Fresh Framework Context Discovery

TRY:

- Use Context7 MCP server to load Fresh framework documentation:
  - Resolve Fresh library ID: `/denoland/fresh`
  - Load comprehensive Fresh documentation context
  - Focus on: islands architecture, routing, SSR, hydration
  - Save checkpoint: context7_fresh_loaded

CATCH (context7_unavailable):

- Fall back to WebFetch for direct documentation loading
- Use systematic web fetching for key Fresh resources
- Document context7 availability for future sessions
- Continue with manual context loading strategy

STEP 3: Parallel Documentation Loading (Sub-Agent Approach)

FOR comprehensive Fresh ecosystem coverage:

Launch 5 parallel context loading sub-agents:

- **Fresh Core Agent**: Load islands architecture, routing, and SSR documentation
- **Preact Integration Agent**: Load component patterns, hooks, and signals documentation
- **Styling Agent**: Load Tailwind CSS integration and Fresh styling strategies
- **Deployment Agent**: Load Deno Deploy and production deployment documentation
- **Examples Agent**: Analyze Fresh example projects and implementation patterns

ELSE (focused context loading):

Load core Fresh documentation sequentially:

- Fresh Documentation: `https://fresh.deno.dev/docs/`
- Preact Guide: `https://preactjs.com/guide/v10/getting-started`
- Tailwind CSS Integration: `https://fresh.deno.dev/docs/concepts/styling`
- Deno Deploy: `https://docs.deno.com/deploy/`

STEP 4: Context Integration and Validation

TRY:

- Validate loaded documentation completeness
- Cross-reference Fresh version compatibility (1.6+ vs 2.0 alpha)
- Generate Fresh-specific guidance summary
- Test context integration with project detection
- Save checkpoint: context_integration_complete

CATCH (incomplete_context_loading):

- Document missing documentation sections
- Provide fallback guidance sources
- Create manual context loading instructions
- Save partial context state for incremental loading

CATCH (network_connectivity_issues):

- Use cached documentation if available
- Provide offline Fresh reference materials
- Document connectivity limitations in session state
- Create alternative context loading strategy

STEP 5: Fresh Expertise Capabilities Enablement

Activate expert capabilities for:

**Core Fresh Framework:**

- Islands architecture design and optimization
- File-based routing system implementation
- Server-side rendering and client-side hydration
- Component composition and state management
- Signal-based reactive state patterns

**Modern Styling Ecosystem:**

- Tailwind CSS plugin configuration (Fresh 1.6+)
- Migration from Twind to Tailwind CSS
- Responsive design and component patterns
- Performance optimization and CSS purging
- Dark mode and theming strategies

**Production Deployment:**

- Deno Deploy configuration and optimization
- Edge functions and KV storage integration
- Performance monitoring and analytics
- CI/CD pipeline setup for Fresh applications

STEP 6: Project-Specific Context Enhancement

IF Fresh projects detected:

- Analyze existing Fresh configuration files
- Identify current version and feature usage
- Map component patterns and styling approaches
- Document migration opportunities and best practices

IF Tailwind configs detected:

- Load Tailwind-specific Fresh integration patterns
- Analyze current styling architecture
- Identify optimization opportunities within Fresh context

STEP 7: Context Validation and Session Management

TRY:

- Execute comprehensive Fresh framework validation
- Validate context coverage across all Fresh capabilities
- Generate Fresh-specific project guidance
- Test expert guidance capabilities
- Save checkpoint: context_validation_complete

CATCH (context_validation_failed):

- Document context gaps and limitations
- Provide alternative guidance sources
- Create context improvement plan
- Save validation issues to session state

FINALLY:

- Update Fresh context session state
- Create context summary for current session
- Clean up temporary context files: /tmp/fresh-temp-$SESSION_ID-*
- Archive loaded context for future sessions

## State Management Structure

```json
// /tmp/fresh-context-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "context_sources": {
    "context7_available": true,
    "loaded_docs": [
      {
        "source": "fresh_framework_docs",
        "status": "loaded",
        "focus_areas": ["islands", "routing", "ssr", "styling"]
      },
      {
        "source": "preact_integration",
        "status": "loaded",
        "focus_areas": ["components", "hooks", "signals"]
      },
      {
        "source": "tailwind_integration",
        "status": "loaded",
        "focus_areas": ["plugin_setup", "configuration", "optimization"]
      }
    ],
    "failed_sources": [],
    "fallback_sources": []
  },
  "project_context": {
    "fresh_version": "1.6.8",
    "styling_approach": "tailwind_plugin",
    "deployment_target": "deno_deploy",
    "architecture_patterns": ["islands", "signals"]
  },
  "checkpoints": {
    "last_checkpoint": "context_validation_complete",
    "next_milestone": "expert_guidance_ready",
    "rollback_point": "context7_fresh_loaded"
  },
  "capabilities_loaded": [
    "islands_architecture",
    "file_based_routing",
    "server_side_rendering",
    "client_hydration",
    "signal_state_management",
    "tailwind_css_integration",
    "component_composition",
    "deno_deploy_optimization",
    "performance_optimization",
    "modern_ui_patterns"
  ]
}
```

## Expected Expert Capabilities

After successful context loading, Claude will provide expert guidance on:

**Core Fresh Development:**

- Islands architecture design and implementation
- File-based routing and middleware patterns
- Server-side rendering optimization
- Client-side hydration strategies
- Component composition best practices

**State Management & Interactivity:**

- Signal-based reactive state patterns
- Island communication and coordination
- Form handling and validation
- Real-time data integration

**Modern Styling & UI:**

- Tailwind CSS plugin configuration (Fresh 1.6+)
- Responsive design implementation
- Component pattern libraries
- Performance-optimized styling
- Migration from Twind to Tailwind CSS

**Production & Deployment:**

- Deno Deploy optimization strategies
- Edge function implementation
- KV storage integration
- Performance monitoring and analytics
- CI/CD pipeline configuration

**Fresh Version Strategy:**

- **Fresh 1.6+**: Production-ready with Tailwind CSS plugin
- **Fresh 2.0 Alpha**: Available for testing with built-in Tailwind
- **Fresh 2.0 Stable**: Expected Q3 2025 with enhanced performance

## Session Isolation and Context Persistence

- Each context loading session maintains isolated state in /tmp/fresh-context-$SESSION_ID.json
- Checkpoint system enables resumable context loading for large documentation sets
- Context artifacts cached for subsequent sessions to improve loading performance
- Supports concurrent context loading sessions through unique session identifiers

## Modern UI Design Best Practices

### Typography System

- **Font Stack**: Use system fonts for performance: `font-sans` (Tailwind default)
- **Size Hierarchy**: Limit to 4-5 sizes max (text-sm, text-base, text-lg, text-xl, text-2xl)
- **Line Height**: Use `leading-relaxed` (1.625) for body text
- **Font Weight**: Utilize full range (font-light to font-bold) for hierarchy
- **Reading Length**: Target 50-75 characters per line with `max-w-prose`

### Color System

- **60-30-10 Rule**:
  - 60% dominant color (backgrounds, surfaces)
  - 30% secondary color (cards, sections)
  - 10% accent color (CTAs, highlights)
- **Semantic Colors**: Use Tailwind's semantic naming:
  - `bg-slate-50/100/200` for neutral surfaces
  - `text-slate-600/700/800/900` for text hierarchy
  - `bg-blue-500` for primary actions
  - `bg-green-500` for success states
  - `bg-red-500` for errors/destructive actions
- **Dark Mode**: Use Tailwind's `dark:` variant for all color choices

### Spacing & Layout

- **8-Point Grid**: Use Tailwind's spacing scale (space-2, space-4, space-8)
- **Container**: Use `container mx-auto px-4` for consistent margins
- **Section Spacing**: `py-16 md:py-24` for major sections
- **Component Spacing**: `space-y-4` or `space-y-6` for vertical rhythm
- **Card Padding**: `p-6` for medium density, `p-8` for spacious feel

### Component Patterns

- **Cards**: `bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700`
- **Buttons**:
  - Primary: `bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors`
  - Secondary: `bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600`
- **Forms**: `border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`
- **Navigation**: `backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800`

### Animation & Interaction

- **Transitions**: Always add `transition-all duration-200` for smooth interactions
- **Hover States**: Use scale, shadow, or color changes: `hover:scale-105 hover:shadow-lg`
- **Focus States**: Ensure visible focus rings: `focus:ring-2 focus:ring-offset-2`
- **Loading States**: Use `animate-pulse` or `animate-spin` for feedback

### Responsive Design

- **Mobile-First**: Start with mobile styles, add desktop with `md:` and `lg:`
- **Breakpoint Usage**:
  - `sm:` (640px) - Large phones
  - `md:` (768px) - Tablets
  - `lg:` (1024px) - Desktops
  - `xl:` (1280px) - Large screens
- **Common Patterns**:
  - Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Flex: `flex flex-col md:flex-row gap-4`
  - Text: `text-3xl md:text-4xl lg:text-5xl`

### Accessibility

- **Color Contrast**: Ensure WCAG AA compliance (4.5:1 for normal text)
- **Focus Indicators**: Never remove focus outlines, style them instead
- **Interactive Sizing**: Minimum 44x44px touch targets
- **Semantic HTML**: Use proper heading hierarchy and ARIA labels

### Performance Patterns

- **Purge CSS**: Fresh's Tailwind plugin handles this automatically
- **Component Extraction**: Use `@apply` sparingly for truly reusable patterns
- **Islands Architecture**: Keep interactive components minimal for hydration
- **Image Optimization**: Use Fresh's built-in image optimization

## Usage Example

```
/context-load-deno-fresh
```