---
allowed-tools: WebFetch, Read, Bash(fd:*), Bash(rg:*), Bash(wc:*), mcp__context7__resolve-library-id, mcp__context7__get-library-docs
name: "Context Load Tailwind"
description: "Load comprehensive Tailwind CSS documentation context with adaptive framework integration and project-specific optimization"
author: "wcygan"
tags: ["context","web"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Target: Tailwind CSS utility-first styling framework
- Project type detection: !`fd "(package\.json|deno\.json|Cargo\.toml|pom\.xml|requirements\.txt)$" . -d 2 | head -3 || echo "No config files"`
- Existing CSS/styling: !`fd "\.(css|scss|sass|less|styl)$" . | wc -l | tr -d ' ' || echo "0"`
- Framework indicators: !`rg "(react|vue|fresh|svelte|angular)" . --type json | head -3 | cut -d: -f3 | sort -u || echo "No framework detected"`
- Tailwind config exists: !`fd "tailwind\.config\.(js|ts|mjs|cjs)$" . | head -1 || echo "No Tailwind config found"`
- CSS build tools: !`rg "(postcss|webpack|vite|rollup|esbuild)" . --type json | head -2 | cut -d: -f3 | sort -u || echo "No build tools detected"`
- Fresh project: !`fd "fresh\.config\.(js|ts)$" . | head -1 || echo "Not a Fresh project"`

## Your Task

STEP 1: Initialize comprehensive documentation loading session

- CREATE session state file: `/tmp/tailwind-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "target": "tailwind-css",
    "framework": "auto-detect",
    "phase": "initialization",
    "sources_loaded": [],
    "integration_context": {},
    "optimization_recommendations": []
  }
  ```

STEP 2: Framework-specific context analysis

TRY:

IF Fresh project detected:

- SET framework = "fresh"
- FOCUS on Fresh 2.0 alpha integration patterns
- PRIORITIZE CSS fallback strategies for plugin reliability
- INCLUDE AppShell patterns and islands architecture

ELSE IF React/Preact indicators found:

- SET framework = "react"
- FOCUS on component-based utility composition
- PRIORITIZE conditional class application patterns
- INCLUDE props-based styling strategies

ELSE IF Vue indicators found:

- SET framework = "vue"
- FOCUS on SFC styling patterns
- PRIORITIZE dynamic class binding
- INCLUDE Vue-specific integration guides

ELSE:

- SET framework = "vanilla"
- FOCUS on general utility-first principles
- PRIORITIZE build tool integration
- INCLUDE framework-agnostic patterns

CATCH (detection_failed):

- LOG detection issues to session state
- CONTINUE with comprehensive general guidance
- PROVIDE multi-framework compatibility recommendations

STEP 3: Adaptive documentation loading strategy

IF Context7 MCP server available:

- USE mcp__context7__resolve-library-id with "tailwind-css"
- LOAD structured documentation via mcp__context7__get-library-docs
- FOCUS on framework-specific integration topics
- EXTRACT build configuration and optimization guidance

ELSE:

- EXECUTE comprehensive WebFetch strategy for key sources:

FOR EACH source IN core_documentation_urls:

1. **Utility-First Principles**: `https://tailwindcss.com/docs/styling-with-utility-classes`
   - EXTRACT: Design system approach, composition patterns, maintainability benefits
   - SYNTHESIZE: Framework-specific application strategies

2. **State Management**: `https://tailwindcss.com/docs/hover-focus-and-other-states`
   - EXTRACT: Pseudo-class variants, interactive patterns, group/peer modifiers
   - ANALYZE: Framework event handling integration

3. **Responsive Design**: `https://tailwindcss.com/docs/responsive-design`
   - EXTRACT: Mobile-first methodology, breakpoint strategies, responsive utilities
   - CORRELATE: With detected framework's responsive patterns

4. **Customization**: `https://tailwindcss.com/docs/adding-custom-styles`
   - EXTRACT: Theme extension, arbitrary values, component extraction
   - PRIORITIZE: Based on project complexity and requirements

5. **Performance**: `https://tailwindcss.com/docs/optimizing-for-production`
   - EXTRACT: Build optimization, purging strategies, JIT compilation
   - INTEGRATE: With detected build tools and framework setup

STEP 4: Framework integration synthesis

CASE detected_framework:

WHEN "fresh":

- SYNTHESIZE Fresh 2.0 specific integration:
  - JSR imports and plugin configuration
  - CSS fallback implementation in `static/styles.css`
  - Islands architecture styling patterns
  - AppShell component integration
  - Docker build optimization for assets

WHEN "react":

- SYNTHESIZE React ecosystem integration:
  - Component library development patterns
  - Props-based conditional styling
  - TypeScript integration for class validation
  - CSS-in-JS migration strategies
  - Testing patterns for styled components

WHEN "vue":

- SYNTHESIZE Vue ecosystem integration:
  - SFC styling best practices
  - Dynamic class binding patterns
  - Composition API integration
  - Vuetify/Quasar migration strategies
  - Component library development

WHEN "vanilla":

- SYNTHESIZE general web integration:
  - PostCSS configuration patterns
  - Build tool integration (Webpack, Vite, esbuild)
  - Legacy browser support strategies
  - Progressive enhancement patterns
  - Performance monitoring setup

STEP 5: Advanced optimization and best practices synthesis

- COMPILE framework-specific performance recommendations:
  - Bundle size optimization for detected build tools
  - Runtime performance patterns for detected framework
  - Development experience enhancements
  - Production deployment strategies

- GENERATE project-specific implementation guidance:
  - Setup instructions for detected environment
  - Migration strategies from existing CSS
  - Integration with detected styling approach
  - Testing and quality assurance patterns

STEP 6: State management and artifact creation

- UPDATE session state with loaded documentation sources
- CREATE framework-specific integration guide: `/tmp/tailwind-context-$SESSION_ID/integration-guide.md`
- GENERATE optimization checklist: `/tmp/tailwind-context-$SESSION_ID/optimization-checklist.md`
- SAVE configuration templates: `/tmp/tailwind-context-$SESSION_ID/config-templates/`
- DOCUMENT best practices: `/tmp/tailwind-context-$SESSION_ID/best-practices.md`

STEP 7: Quality assurance and validation

TRY:

- VALIDATE documentation source accessibility and currency
- VERIFY framework integration recommendations for compatibility
- CHECK configuration examples for syntax correctness
- ENSURE optimization strategies align with detected tooling

CATCH (validation_issues):

- LOG validation problems to session state
- PROVIDE alternative documentation sources
- INCLUDE troubleshooting guidance for common setup issues

FINALLY:

- UPDATE session state: phase = "complete"
- GENERATE comprehensive context summary
- ARCHIVE session artifacts for future reference
- CLEAN UP temporary processing files

## Instructions for Claude

When this command is executed, you MUST:

1. **FOLLOW the programmatic task structure above** with proper error handling and state management
2. **ADAPT documentation loading** based on detected project framework and tooling
3. **USE Context7 MCP server** (if available) OR WebFetch tool for comprehensive source gathering:
   - **Core Concepts**: `https://tailwindcss.com/docs/styling-with-utility-classes`
     - EXTRACT: utility-first principles, design system approach, composition patterns
     - CORRELATE: with detected framework component patterns
   - **State Management**: `https://tailwindcss.com/docs/hover-focus-and-other-states`
     - EXTRACT: pseudo-class variants, interactive states, group/peer modifiers
     - INTEGRATE: with framework event handling patterns
   - **Responsive Design**: `https://tailwindcss.com/docs/responsive-design`
     - EXTRACT: mobile-first approach, breakpoints, responsive utilities
     - OPTIMIZE: for detected viewport and device targeting
   - **Color System**: `https://tailwindcss.com/docs/colors`
     - EXTRACT: color palettes, opacity modifiers, dark mode variants
     - ALIGN: with design system requirements and accessibility standards
   - **Customization**: `https://tailwindcss.com/docs/adding-custom-styles`
     - EXTRACT: theme customization, arbitrary values, component extraction
     - ADAPT: for project-specific design requirements
   - **Functions & Directives**: `https://tailwindcss.com/docs/functions-and-directives`
     - EXTRACT: @theme, @utility, @apply directives, CSS integration
     - OPTIMIZE: for build tool compatibility and performance
   - **Layout System**: `https://tailwindcss.com/docs/aspect-ratio`
     - EXTRACT: aspect ratios, grid, flexbox, positioning
     - INTEGRATE: with responsive design and framework layout patterns
   - **Spacing & Sizing**: `https://tailwindcss.com/docs/padding`
     - EXTRACT: spacing scale, sizing utilities, responsive spacing
     - STANDARDIZE: with design system and typography scale
   - **Typography**: `https://tailwindcss.com/docs/font-family`
     - EXTRACT: font system, text sizing, line height, letter spacing
     - OPTIMIZE: for readability and performance across devices
   - **Borders & Effects**: `https://tailwindcss.com/docs/border-radius`
     - EXTRACT: borders, shadows, effects, transforms
     - ENHANCE: with animation and interaction patterns
   - **Preflight CSS Reset**: `https://tailwindcss.com/docs/preflight`
     - EXTRACT: CSS normalization, browser consistency, base layer styling
     - LEVERAGE: as foundation for intentional design system implementation

4. **PRIORITIZE documentation sections** based on project analysis:
   - Framework-specific integration patterns for detected environment
   - Build tool optimization for detected tooling stack
   - Performance strategies for identified deployment target
   - Accessibility implementation for detected UI framework
   - Migration strategies from existing styling approach
   - Component library patterns for detected architecture
   - State management integration with framework patterns
   - Testing strategies for styling and responsive behavior

5. **FOCUS synthesis on project-specific implementation**:
   - Setup and configuration for detected environment
   - Performance optimization for identified constraints
   - Development workflow integration with existing tooling
   - Component architecture patterns for detected framework
   - Design system implementation with brand requirements
   - Accessibility compliance with framework best practices
   - Migration and adoption strategies for existing codebase
   - Quality assurance and testing integration patterns

## Expected Outcome

After loading this context, you should be able to provide expert guidance on:

- Building responsive interfaces with utility classes
- Implementing interactive states and animations
- Creating consistent design systems
- Customizing Tailwind for specific design needs
- Optimizing performance and bundle size
- Integrating with popular frameworks (React, Vue, Fresh)
- Managing dark mode and theme switching
- Writing maintainable utility-based CSS
- Accessibility best practices with Tailwind
- Migration strategies from traditional CSS

## Framework Integration Patterns

### Deno Fresh Integration

- Use official Tailwind CSS plugin for Fresh 1.6+
- Configure `deno.json` with Tailwind build tasks
- Fresh 2.0 alpha includes built-in Tailwind option
- Implement CSS fallbacks for plugin reliability issues

### React/Preact Patterns

- Component-based utility composition
- Conditional class application with `clsx` or similar
- TypeScript integration for class validation
- Props-based styling patterns

### Build Tool Integration

- PostCSS plugin configuration
- Content detection and purging
- JIT (Just-In-Time) compilation
- Custom build optimization

## Preflight CSS Reset Foundation

**ALWAYS leverage Tailwind's Preflight CSS reset by default for all projects:**

- **Automatic Inclusion**: Preflight is automatically injected when importing Tailwind CSS
- **Cross-Browser Consistency**: Built on modern-normalize for reliable browser normalization
- **Design System Foundation**: Provides neutral starting point for intentional styling choices

### Key Preflight Benefits

- **Removes default margins** from all elements (headings, paragraphs, lists)
- **Resets border styles** for consistent appearance across browsers
- **Normalizes headings** to same font size/weight as body text
- **Unstyled lists** with no bullets/numbers for design flexibility
- **Block-level images** constrained to parent width while preserving aspect ratio
- **Prevents accidental reliance** on browser default styles

### Preflight Best Practices

- **Embrace the reset**: Design with intentional spacing and typography from the start
- **Use role="list"** on unstyled lists for screen reader accessibility
- **Extend via @layer base** for custom base styles when needed
- **Never fight Preflight** - work with its opinionated defaults for consistency

## Design System Best Practices

### Color Strategy

- **Semantic Naming**: Use purpose-based color application
  - Primary: `bg-blue-500`, `text-blue-600`
  - Success: `bg-green-500`, `text-green-700`
  - Warning: `bg-yellow-500`, `text-yellow-700`
  - Error: `bg-red-500`, `text-red-700`
- **60-30-10 Rule**: Dominant (60%), secondary (30%), accent (10%)
- **Dark Mode**: Always implement `dark:` variants
- **Opacity Modifiers**: Use `/` syntax for transparency: `bg-blue-500/20`

### Typography Hierarchy

- **Scale Limitation**: Use max 5-6 sizes for consistency
- **Line Height**: `leading-tight` (1.25) for headings, `leading-relaxed` (1.625) for body
- **Font Weight**: Strategic use from `font-light` to `font-bold`
- **Reading Width**: `max-w-prose` (65ch) for optimal readability

### Spacing System

- **8-Point Grid**: Stick to Tailwind's spacing scale (4, 8, 12, 16, 20, 24...)
- **Consistent Patterns**:
  - Section spacing: `py-16 md:py-24`
  - Card padding: `p-6` or `p-8`
  - Component spacing: `space-y-4` or `space-y-6`
  - Container margins: `container mx-auto px-4`

### Component Patterns

- **Cards**: `bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700`
- **Buttons**:
  - Primary: `bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors`
  - Secondary: `bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600`
- **Forms**: `border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`
- **Navigation**: `backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800`

### Responsive Patterns

- **Mobile-First**: Start with base styles, enhance with `md:`, `lg:`, `xl:`
- **Breakpoint Strategy**:
  - `sm:` (640px) - Large phones, avoid for mobile targeting
  - `md:` (768px) - Tablets and up
  - `lg:` (1024px) - Desktops and up
  - `xl:` (1280px) - Large screens
- **Common Responsive Patterns**:
  - Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Flex: `flex flex-col md:flex-row gap-4`
  - Typography: `text-3xl md:text-4xl lg:text-5xl`
  - Spacing: `px-4 md:px-6 lg:px-8`

### State Management

- **Interactive States**: Always include `transition-colors duration-200`
- **Hover Effects**: Subtle changes - `hover:bg-slate-50`, `hover:scale-105`
- **Focus States**: Accessible focus rings - `focus:ring-2 focus:ring-offset-2`
- **Loading States**: `animate-pulse` for skeleton loading, `animate-spin` for spinners
- **Group Variants**: `group-hover:`, `group-focus:` for parent-triggered styling

### Performance Optimization

- **Content Detection**: Configure paths in `tailwind.config.js`
- **JIT Mode**: Enabled by default, generates classes on-demand
- **Purge Unused**: Automatic in production builds
- **Component Extraction**: Use `@apply` sparingly for true reusability
- **Bundle Analysis**: Monitor CSS output size

### Accessibility Guidelines

- **Color Contrast**: Ensure WCAG AA compliance (4.5:1 minimum)
- **Focus Management**: Never remove focus outlines, style them instead
- **Touch Targets**: Minimum 44x44px for interactive elements
- **Screen Reader**: Use semantic HTML with Tailwind styling
- **Motion Preference**: Respect `prefers-reduced-motion` in animations

## Tailwind v4.0 Migration Notes

### New Features (Beta)

- CSS-first configuration with `@theme` directive
- Improved performance and smaller bundle sizes
- Better TypeScript integration
- Enhanced arbitrary value support
- New container queries support

### Migration Considerations

- JavaScript config becomes CSS-based
- Some class names may change
- Plugin API updates
- Build tool integration changes

## Usage Example

```
/context-load-tailwind
```

This will load comprehensive Tailwind CSS documentation and best practices into the current context for immediate styling guidance.