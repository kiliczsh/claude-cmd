---
allowed-tools: Bash(deno:*), Bash(cd:*), Bash(eza:*), Bash(fd:*), Bash(bat:*), Bash(gdate:*), Bash(jq:*), Write, Read
name: "Scaffold Deno Fresh"
description: "Scaffold production-ready Deno Fresh 2.0 application with islands architecture and modern development workflow"
author: "wcygan"
tags: ["scaffold","deno"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Project name: $ARGUMENTS
- Current directory: !`pwd`
- Deno version: !`deno --version | head -1 || echo "Deno not installed"`
- Target directory: !`echo "$(pwd)/$ARGUMENTS" 2>/dev/null || echo "Target: ./$ARGUMENTS"`
- Directory exists: !`fd "^$ARGUMENTS$" . -t d -d 1 >/dev/null 2>&1 && echo "⚠️ Directory exists" || echo "✅ Available"`
- Modern tools available: !`echo "eza: $(which eza >/dev/null && echo ✓ || echo ✗) | bat: $(which bat >/dev/null && echo ✓ || echo ✗) | fd: $(which fd >/dev/null && echo ✓ || echo ✗)"`

## Your Task

STEP 1: Initialize Fresh 2.0 scaffolding session with comprehensive validation

- CREATE session state file: `/tmp/fresh-scaffold-$SESSION_ID.json`
- VALIDATE project name format (no spaces, valid directory name)
- CHECK Deno installation and version compatibility
- VERIFY target directory availability
- ANALYZE existing project structure if directory exists

```bash
# Initialize scaffolding session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "projectName": "'$ARGUMENTS'",
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "denoVersion": "'$(deno --version | head -1 | cut -d' ' -f2)'",
  "targetDirectory": "'$(pwd)/$ARGUMENTS'",
  "scaffoldingSteps": [],
  "freshVersion": "2.0.0-alpha.34",
  "status": "initializing"
}' > /tmp/fresh-scaffold-$SESSION_ID.json
```

STEP 2: Pre-scaffolding validation and environment preparation

TRY:

IF project_name is empty OR contains invalid characters:

- ERROR: "Project name required and must be valid directory name"
- SUGGEST: "Use format: /scaffold-deno-fresh my-fresh-app"
- EXIT scaffolding process

IF directory already exists:

- WARN: "Directory '$ARGUMENTS' already exists"
- ANALYZE existing structure with modern tools:
  ```bash
  echo "📁 Existing directory contents:"
  eza -la "$ARGUMENTS" 2>/dev/null || ls -la "$ARGUMENTS"

  if fd "deno.json" "$ARGUMENTS" >/dev/null; then
    echo "🦕 Existing Deno project detected"
    bat "$ARGUMENTS/deno.json" 2>/dev/null | head -20
  fi
  ```
- PROMPT: "Continue with existing directory? (will add Fresh files)"

IF Deno not installed OR version incompatible:

- ERROR: "Deno installation required for Fresh 2.0"
- GUIDE: "Install via: curl -fsSL https://deno.land/install.sh | sh"
- REQUIRE: Deno 1.40+ for Fresh 2.0 compatibility

STEP 3: Execute Fresh 2.0 scaffolding with modern patterns

TRY:

**Primary Scaffolding Strategy (Fresh 2.0 Official):**

```bash
# Use Fresh 2.0 alpha initializer
echo "🚀 Initializing Fresh 2.0 project: $ARGUMENTS"
deno run -Ar jsr:@fresh/init@2.0.0-alpha.34 "$ARGUMENTS"
```

**Enhanced Configuration Integration:**

```bash
# Navigate to project directory
cd "$ARGUMENTS"

# Verify Fresh 2.0 structure
echo "📦 Fresh 2.0 project structure:"
eza -la --tree --level=2 2>/dev/null || find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.json" | head -10

# Display key configuration files
echo "⚙️ Core configuration:"
if [ -f "deno.json" ]; then
  echo "📄 deno.json:"
  bat deno.json 2>/dev/null || cat deno.json
fi

if [ -f "fresh.config.ts" ]; then
  echo "🔧 fresh.config.ts:"
  bat fresh.config.ts 2>/dev/null || cat fresh.config.ts
fi
```

STEP 4: Fresh 2.0 optimization and best practices integration

**Configure Modern Development Workflow:**

```bash
# Enhance deno.json with comprehensive tasks
if [ -f "deno.json" ]; then
  echo "🔧 Enhancing deno.json with modern workflow tasks"
  
  # Backup original
  cp deno.json deno.json.backup
  
  # Add enhanced task configuration
  jq '.tasks += {
    "init": "deno cache --reload --node-modules-dir=auto main.ts",
    "check": "deno check **/*.ts **/*.tsx",
    "fmt": "deno fmt",
    "lint": "deno lint",
    "test": "deno test --allow-all",
    "test:watch": "deno test --allow-all --watch",
    "up": "deno task dev",
    "ci": "deno task check && deno task lint && deno task test"
  }' deno.json > deno.json.tmp && mv deno.json.tmp deno.json
fi
```

**Apply Fresh 2.0 Best Practices:**

```bash
# Create enhanced CSS fallback strategy (Fresh 2.0 Tailwind plugin reliability)
echo "🎨 Setting up Tailwind CSS fallback strategy"
echo '@tailwind base;
@tailwind components;
@tailwind utilities;

/* Fresh 2.0 Tailwind Plugin Fallbacks */
.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.text-center { text-align: center; }
.p-4 { padding: 1rem; }
.m-4 { margin: 1rem; }
.bg-gray-100 { background-color: #f3f4f6; }
.text-gray-900 { color: #111827; }
.rounded { border-radius: 0.375rem; }
.shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); }' > static/styles.css

# Create AppShell component pattern
echo "🏗️ Creating AppShell pattern for consistent layouts"
mkdir -p components
echo 'import { ComponentChildren } from "preact";

interface AppShellProps {
  children: ComponentChildren;
  title?: string;
}

export default function AppShell({ children, title = "Fresh 2.0 App" }: AppShellProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="min-h-screen bg-gray-100">
        <main class="min-h-screen flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}' > components/AppShell.tsx
```

STEP 5: Development environment verification and startup

TRY:

```bash
# Initialize dependencies and cache
echo "📦 Initializing Fresh 2.0 dependencies"
deno task init 2>/dev/null || deno cache --reload --node-modules-dir=auto main.ts

# Type checking validation
echo "🔍 Running type checking"
deno task check || deno check **/*.ts **/*.tsx

# Generate project summary
echo "✅ Fresh 2.0 project '$ARGUMENTS' created successfully"
echo ""
echo "📊 Project Summary:"
echo "  - Framework: Deno Fresh 2.0 ($(grep '"@fresh' deno.json | head -1 | cut -d'"' -f4 2>/dev/null || echo 'latest'))"
echo "  - TypeScript: ✓ Enabled"
echo "  - Islands: ✓ Configured"
echo "  - Tailwind: ✓ With CSS fallbacks"
echo "  - Hot Reload: ✓ Development server"
echo "  - Modern Tools: ✓ Enhanced workflow"
echo ""
echo "🚀 Quick Start Commands:"
echo "  cd $ARGUMENTS"
echo "  deno task dev    # Start development server"
echo "  deno task build  # Build for production"
echo "  deno task test   # Run tests"
echo "  deno task ci     # Full CI pipeline"
```

**Optional: Start Development Server:**

```bash
# Offer to start development server
echo "🔥 Starting development server (Press Ctrl+C to stop)"
echo "📍 Server will be available at: http://localhost:8000"
deno task dev
```

CATCH (scaffolding_failed):

- LOG error details to session state
- PROVIDE alternative scaffolding strategies
- SUGGEST manual Fresh 2.0 setup if automated approach fails

```bash
echo "⚠️ Automated scaffolding failed. Manual setup options:"
echo ""
echo "1. Fresh 2.0 Manual Setup:"
echo "   mkdir $ARGUMENTS && cd $ARGUMENTS"
echo "   deno run -A -r https://fresh.deno.dev ."
echo ""
echo "2. Alternative Initializer:"
echo "   deno run -A jsr:@fresh/init $ARGUMENTS"
echo ""
echo "3. Fresh GitHub Template:"
echo "   git clone https://github.com/denoland/fresh-example.git $ARGUMENTS"
```

STEP 6: Session state finalization and cleanup

```bash
# Update session state with completion
jq '.status = "completed" | .completedAt = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'" | .scaffoldingSteps += ["initialization", "validation", "scaffolding", "optimization", "verification"]' /tmp/fresh-scaffold-$SESSION_ID.json > /tmp/fresh-scaffold-$SESSION_ID.tmp && mv /tmp/fresh-scaffold-$SESSION_ID.tmp /tmp/fresh-scaffold-$SESSION_ID.json

echo "💾 Session state saved: /tmp/fresh-scaffold-$SESSION_ID.json"
echo "🎉 Fresh 2.0 scaffolding completed successfully!"
```

FINALLY:

- SAVE session state for reference
- PROVIDE post-scaffolding guidance and next steps
- SUGGEST additional Fresh 2.0 resources and best practices

## Fresh 2.0 Scaffolding Features

### Core Capabilities

- **Fresh 2.0 Alpha**: Latest Fresh framework with performance improvements
- **Islands Architecture**: Selective hydration for optimal performance
- **TypeScript**: Full type safety out of the box
- **Tailwind CSS**: With reliable fallback strategies for plugin issues
- **Zero Build Step**: Development without complex build processes
- **Hot Reload**: Instant feedback during development
- **AppShell Pattern**: Consistent layout wrapper for all pages
- **Modern Workflow**: Enhanced deno.json tasks for development lifecycle

### Generated Project Structure

```
my-fresh-app/
├── components/
│   └── AppShell.tsx     # Layout wrapper component
├── islands/             # Interactive client-side components
├── routes/              # File-based routing
├── static/
│   └── styles.css       # Tailwind with manual fallbacks
├── deno.json           # Enhanced with lifecycle tasks
├── fresh.config.ts     # Fresh 2.0 configuration
├── main.ts            # Application entry point
└── README.md          # Project documentation
```

### Development Workflow

```bash
# Essential commands for Fresh 2.0 development
deno task dev          # Development server with hot reload
deno task build        # Production build
deno task check        # TypeScript type checking
deno task test         # Run test suite
deno task ci           # Complete CI pipeline
deno task init         # Initialize/update dependencies
```

### Fresh 2.0 Best Practices Applied

1. **Styling Strategy**: CSS fallbacks for unreliable Tailwind plugin
2. **Component Architecture**: AppShell pattern for layout consistency
3. **Type Safety**: Comprehensive TypeScript configuration
4. **Performance**: Islands architecture for selective client-side hydration
5. **Development Experience**: Modern tooling with enhanced tasks
6. **Production Ready**: Optimized build configuration and deployment patterns

This scaffolding command creates a production-ready Fresh 2.0 application following modern Deno development patterns and includes comprehensive error handling, validation, and optimization strategies.