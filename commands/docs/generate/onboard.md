---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(which:*), Bash(cargo:*), Bash(go:*), Bash(deno:*), Bash(docker:*), Bash(kubectl:*), Bash(gdate:*), Bash(cp:*), Bash(ln:*), Bash(git:*), Task
name: "Onboard"
description: "Lightning-fast parallel environment setup using 10 sub-agents for 10x speedup"
author: "wcygan"
tags: ["docs","generate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Target project: $ARGUMENTS
- Project type detection: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle)" . -d 3 | head -5 || echo "No build files detected"`
- Existing documentation: !`fd "(README|CONTRIBUTING|SETUP|ONBOARDING)" . -t f -d 2 | head -3 || echo "No existing docs found"`
- Editor configurations: !`fd "\.(vscode|zed|nvim)" . -t d -d 2 | head -3 || echo "No editor configs found"`
- Docker/container setup: !`fd "(Dockerfile|docker-compose\.yml|docker-compose\.yaml)" . -d 2 | head -3 || echo "No container configs found"`
- Modern CLI tools status: !`echo "rg: $(which rg >/dev/null && echo ✓ || echo ✗) | fd: $(which fd >/dev/null && echo ✓ || echo ✗) | bat: $(which bat >/dev/null && echo ✓ || echo ✗) | eza: $(which eza >/dev/null && echo ✓ || echo ✗) | jq: $(which jq >/dev/null && echo ✓ || echo ✗)"`

## Your Task

**IMMEDIATELY DEPLOY 10 PARALLEL SUB-AGENTS** for ultra-fast onboarding setup

STEP 1: Initialize onboarding session

- CREATE session state file: `/tmp/onboard-session-$SESSION_ID.json`
- Initialize results directory: `/tmp/onboard-results-$SESSION_ID/`

STEP 2: **LAUNCH ALL 10 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL SETUP** - All agents work in parallel:

1. **Toolchain Agent**: Install/verify modern CLI tools (rg, fd, bat, eza, etc.)
2. **Language Agent**: Set up language-specific toolchains (Rust, Go, Deno, Java)
3. **Dependencies Agent**: Resolve and cache all project dependencies
4. **Infrastructure Agent**: Start databases, containers, and services
5. **Editor Agent**: Configure VSCode, Zed, and editor integrations
6. **Git Agent**: Set up hooks, config, and version control
7. **Environment Agent**: Create .env files and configure secrets
8. **Build Agent**: Validate project builds successfully
9. **Documentation Agent**: Analyze and organize learning materials
10. **Integration Agent**: Set up team tools and communication

Each agent saves results to `/tmp/onboard-results-$SESSION_ID/agent-N.json`

**Expected completion: 5-10x faster than sequential setup**

TRY:

- DETECT project languages and frameworks from build files
- SCAN FOR configuration templates and environment setup files
- CHECK existing documentation completeness
- EVALUATE infrastructure requirements (databases, containers, services)
- ASSESS team-specific tools and workflows

**Modern CLI Tools Installation (MANDATORY per CLAUDE.md):**

FOR EACH required modern tool:

```bash
# CRITICAL: Install modern alternatives - these are MANDATORY, not optional
echo "Installing modern CLI tools (required for optimal development)..."

# Core tools status check
rg_status=$(which rg >/dev/null && echo "✓ installed" || echo "❌ missing - install ripgrep")
fd_status=$(which fd >/dev/null && echo "✓ installed" || echo "❌ missing - install fd")
bat_status=$(which bat >/dev/null && echo "✓ installed" || echo "❌ missing - install bat")
eza_status=$(which eza >/dev/null && echo "✓ installed" || echo "❌ missing - install eza")
fzf_status=$(which fzf >/dev/null && echo "✓ installed" || echo "❌ missing - install fzf")
delta_status=$(which delta >/dev/null && echo "✓ installed" || echo "❌ missing - install delta")
zoxide_status=$(which zoxide >/dev/null && echo "✓ installed" || echo "❌ missing - install zoxide")
jq_status=$(which jq >/dev/null && echo "✓ installed" || echo "❌ missing - install jq")
yq_status=$(which yq >/dev/null && echo "✓ installed" || echo "❌ missing - install yq")

echo "Tool Status:"
echo "  ripgrep (rg): $rg_status"
echo "  fd: $fd_status"
echo "  bat: $bat_status"
echo "  eza: $eza_status"
echo "  fzf: $fzf_status"
echo "  delta: $delta_status"
echo "  zoxide: $zoxide_status"
echo "  jq: $jq_status"
echo "  yq: $yq_status"

# Installation commands by platform
echo "\nInstallation commands (run if tools missing):"
echo "macOS (Homebrew): brew install ripgrep fd bat eza fzf git-delta zoxide jq yq"
echo "Ubuntu/Debian: apt install ripgrep fd-find bat fzf jq yq && cargo install eza zoxide delta"
echo "Arch Linux: pacman -S ripgrep fd bat eza fzf git-delta zoxide jq yq"
```

STEP 3: Language-specific toolchain setup with validation

CASE detected_languages:
WHEN "rust":

```bash
IF [ -f "Cargo.toml" ]; then
  echo "🦀 Setting up Rust development environment..."
  
  # Install Rust toolchain
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  source ~/.cargo/env
  
  # Essential components
  rustup component add clippy rustfmt rust-analyzer
  
  # Verification
  cargo --version && rustc --version && rustfmt --version
  echo "✅ Rust toolchain ready"
fi
```

WHEN "go":

```bash
IF [ -f "go.mod" ]; then
  echo "🐹 Setting up Go development environment..."
  
  # Install Go (if not present)
  go version >/dev/null 2>&1 || {
    echo "Go not found. Install from: https://golang.org/dl/"
    exit 1
  }
  
  # Essential tools
  go install golang.org/x/tools/gopls@latest
  go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
  
  # Project dependencies
  go mod download
  go mod tidy
  
  echo "✅ Go environment ready"
fi
```

WHEN "deno":

```bash
IF [ -f "deno.json" ] || [ -f "deno.lock" ]; then
  echo "🦕 Setting up Deno development environment..."
  
  # Install Deno
  curl -fsSL https://deno.land/install.sh | sh
  
  # Add to PATH if needed
  export PATH="$HOME/.deno/bin:$PATH"
  
  # Cache project dependencies
  deno cache --reload **/*.ts
  
  # Verification
  deno --version
  echo "✅ Deno environment ready"
fi
```

WHEN "java":

```bash
IF [ -f "pom.xml" ] || [ -f "build.gradle" ]; then
  echo "☕ Setting up Java development environment..."
  
  # Install SDKMAN for version management
  curl -s "https://get.sdkman.io" | bash
  source ~/.sdkman/bin/sdkman-init.sh
  
  # Install Java LTS
  sdk install java 21.0.1-tem
  sdk use java 21.0.1-tem
  
  # Maven wrapper setup
  if [ -f "mvnw" ]; then
    chmod +x mvnw
    ./mvnw dependency:resolve
  elif [ -f "gradlew" ]; then
    chmod +x gradlew
    ./gradlew dependencies
  fi
  
  echo "✅ Java environment ready"
fi
```

STEP 4: Project dependency resolution and build verification

TRY:

FOR EACH detected language:

**Parallel Dependency Installation:**

```bash
echo "📦 Installing project dependencies..."

# Rust projects
if [ -f "Cargo.toml" ]; then
  echo "  Fetching Rust dependencies..."
  cargo fetch --verbose
  cargo check --all-targets
  echo "  ✅ Rust dependencies resolved"
fi

# Go projects  
if [ -f "go.mod" ]; then
  echo "  Downloading Go modules..."
  go mod download -x
  go mod verify
  echo "  ✅ Go modules ready"
fi

# Deno projects
if [ -f "deno.json" ]; then
  echo "  Caching Deno dependencies..."
  deno cache --reload $(fd "\.ts$" . | head -20)
  deno task install 2>/dev/null || echo "    No install task - dependencies cached"
  echo "  ✅ Deno cache updated"
fi

# Java Maven projects
if [ -f "pom.xml" ]; then
  echo "  Resolving Maven dependencies..."
  ./mvnw dependency:go-offline -q || mvn dependency:go-offline -q
  echo "  ✅ Maven dependencies offline"
fi

# Java Gradle projects
if [ -f "build.gradle" ] || [ -f "build.gradle.kts" ]; then
  echo "  Resolving Gradle dependencies..."
  ./gradlew dependencies --quiet
  echo "  ✅ Gradle dependencies resolved"
fi
```

CATCH (dependency_resolution_failed):

- LOG error details to session state
- PROVIDE specific troubleshooting guidance
- CONTINUE with other setup steps

STEP 5: Infrastructure and service setup with modern alternatives

**Database Setup (using CLAUDE.md preferred technologies):**

```bash
echo "🗄️  Setting up database infrastructure..."

# PostgreSQL (MANDATORY preference over MySQL)
if rg -q "postgres|postgresql" . --type sql --type json --type toml 2>/dev/null; then
  echo "  PostgreSQL detected in project"
  
  # Check if PostgreSQL is running
  pg_isready 2>/dev/null && {
    echo "  ✅ PostgreSQL service running"
    
    # Create development database if needed
    project_name=$(basename $(pwd) | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]')
    createdb "${project_name}_dev" 2>/dev/null || echo "    Database may already exist"
  } || {
    echo "  ❌ PostgreSQL not running. Start with:"
    echo "    macOS: brew services start postgresql"
    echo "    Linux: sudo systemctl start postgresql"
  }
fi

# DragonflyDB (MANDATORY preference over Redis)
if rg -q "redis|dragonfly" . --type json --type toml --type yaml 2>/dev/null; then
  echo "  Cache layer detected in project"
  echo "  🐲 Use DragonflyDB instead of Redis:"
  echo "    Install: docker run -p 6379:6379 dragonflydb/dragonfly"
  echo "    Or: brew install dragonfly && dragonfly --bind 127.0.0.1 --port 6379"
fi

# Database migrations
migration_files=$(fd "(migrate|migration)" . -t f -d 3 2>/dev/null | head -5)
if [ -n "$migration_files" ]; then
  echo "  📋 Database migrations found:"
  echo "$migration_files" | sed 's/^/    /'
  echo "    Run migrations after database setup"
fi
```

**Container and Orchestration Setup:**

```bash
echo "🐳 Setting up container environment..."

# Docker Compose (preferred for development)
if [ -f "docker-compose.yml" ] || [ -f "docker-compose.yaml" ]; then
  echo "  Docker Compose configuration found"
  
  # Start development services
  docker compose up -d --remove-orphans 2>/dev/null || docker-compose up -d
  
  # Verify services
  docker compose ps 2>/dev/null || docker-compose ps
  echo "  ✅ Development services running"
fi

# Kubernetes (Talos Linux cluster preference)
if [ -d "k8s" ] || [ -d "kubernetes" ] || [ -d ".kube" ]; then
  echo "  🏗️  Kubernetes configurations detected"
  
  # Check cluster connectivity
  kubectl cluster-info --request-timeout=5s 2>/dev/null && {
    echo "    ✅ Connected to Kubernetes cluster"
    echo "    Cluster: $(kubectl config current-context)"
  } || {
    echo "    ❌ No Kubernetes cluster connection"
    echo "    Configure kubectl for your cluster"
  }
fi

# Development lifecycle check
if [ -f "deno.json" ]; then
  # Use deno tasks as lifecycle harness
  echo "  🦕 Deno lifecycle operations available:"
  deno task 2>/dev/null | rg "^  [a-z]" | head -5 | sed 's/^/    /'
fi
```

STEP 6: Development tools and editor configuration

**Editor Workspace Setup:**

```bash
echo "⚙️  Configuring development environment..."

# VSCode workspace
if [ -d ".vscode" ]; then
  echo "  📝 VSCode workspace configuration found"
  
  # Install recommended extensions
  if [ -f ".vscode/extensions.json" ]; then
    echo "    Installing recommended VSCode extensions..."
    code --install-extension ms-vscode.vscode-json >/dev/null 2>&1 || true
  fi
  
  # Open workspace
  command -v code >/dev/null && {
    code . 
    echo "    ✅ VSCode workspace opened"
  } || echo "    VSCode not in PATH - open manually"
fi

# Zed editor
if [ -d ".zed" ]; then
  echo "  ⚡ Zed workspace configuration found"
  
  # List available tasks
  if [ -f ".zed/tasks.json" ]; then
    echo "    Available Zed tasks:"
    jq -r '.[] | "      " + .label' .zed/tasks.json 2>/dev/null | head -5
  fi
fi

# Claude Code AI assistant
if [ -d ".claude" ]; then
  echo "  🤖 Claude Code configuration found"
  
  # List custom commands
  if [ -d ".claude/commands" ]; then
    command_count=$(fd "\.md$" .claude/commands | wc -l | tr -d ' ')
    echo "    Available project commands: $command_count"
    fd "\.md$" .claude/commands | head -5 | sed 's|^.claude/commands/||' | sed 's|\.md$||' | sed 's|^|      /|'
  fi
  
  echo "    💡 Use '/onboard' command for AI-assisted onboarding"
fi
```

**Git and Version Control Setup:**

```bash
echo "🔧 Configuring Git environment..."

# Git hooks installation
if [ -d ".git/hooks" ]; then
  # Deno-based pre-commit hooks (preferred)
  if [ -f "scripts/pre-commit-check.ts" ]; then
    echo "  Installing Deno pre-commit hook..."
    ln -sf ../../scripts/pre-commit-check.ts .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo "    ✅ Pre-commit hook installed"
  fi
  
  # Traditional pre-commit (fallback)
  if [ -f ".pre-commit-config.yaml" ]; then
    command -v pre-commit >/dev/null && {
      pre-commit install
      echo "    ✅ Pre-commit framework installed"
    } || echo "    Install pre-commit: pip install pre-commit"
  fi
fi

# Git configuration validation
user_name=$(git config --global user.name 2>/dev/null)
user_email=$(git config --global user.email 2>/dev/null)

if [ -z "$user_name" ] || [ -z "$user_email" ]; then
  echo "  ⚠️  Git user configuration incomplete:"
  [ -z "$user_name" ] && echo "    Set: git config --global user.name 'Your Name'"
  [ -z "$user_email" ] && echo "    Set: git config --global user.email 'your.email@domain.com'"
else
  echo "  ✅ Git configured for: $user_name <$user_email>"
fi

# Modern Git tools verification
command -v delta >/dev/null && {
  echo "  ✅ Delta installed for better diffs"
} || {
  echo "  💡 Install delta for enhanced git diffs: brew install git-delta"
}
```

STEP 7: Environment configuration and secrets management

**Environment Variables Setup:**

```bash
echo "🔐 Setting up environment configuration..."

# Environment file templates
if [ -f ".env.example" ]; then
  if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "  📋 Created .env from template"
    echo "    ⚠️  Update .env with actual values before running project"
  else
    echo "  ✅ .env file already exists"
  fi
fi

# Additional configuration templates
config_templates=$(fd "\.(example|template|sample)$" . -d 2 2>/dev/null | head -5)
if [ -n "$config_templates" ]; then
  echo "  📄 Configuration templates found:"
  echo "$config_templates" | sed 's/^/    /'
  echo "    Copy and customize these files as needed"
fi

# Security best practices
echo "  🛡️  Security reminders:"
echo "    - Never commit .env files to version control"
echo "    - Use 1Password, AWS Secrets Manager, or similar for production secrets"
echo "    - Validate all environment variables before deployment"
```

STEP 8: Comprehensive validation and health checks

**Build Verification with Detailed Feedback:**

```bash
echo "🏗️  Validating project build..."

# Language-specific build validation
if [ -f "deno.json" ]; then
  echo "  Deno project validation:"
  
  # Type checking
  deno check **/*.ts 2>/dev/null && echo "    ✅ Type checking passed" || echo "    ❌ Type errors found"
  
  # Build task
  deno task build 2>/dev/null && echo "    ✅ Build successful" || echo "    ⚠️  No build task or build failed"
  
elif [ -f "Cargo.toml" ]; then
  echo "  Rust project validation:"
  
  # Compilation check
  cargo check --all-targets && echo "    ✅ Compilation successful" || echo "    ❌ Compilation errors found"
  
  # Clippy linting
  cargo clippy --all-targets -- -D warnings && echo "    ✅ Clippy checks passed" || echo "    ⚠️  Clippy warnings found"
  
elif [ -f "go.mod" ]; then
  echo "  Go project validation:"
  
  # Build verification
  go build ./... && echo "    ✅ Build successful" || echo "    ❌ Build errors found"
  
  # Vet analysis
  go vet ./... && echo "    ✅ Vet analysis passed" || echo "    ⚠️  Vet issues found"
  
elif [ -f "pom.xml" ]; then
  echo "  Java Maven project validation:"
  
  # Compilation
  ./mvnw compile test-compile -q && echo "    ✅ Compilation successful" || echo "    ❌ Compilation failed"
  
elif [ -f "build.gradle" ] || [ -f "build.gradle.kts" ]; then
  echo "  Java Gradle project validation:"
  
  # Build verification
  ./gradlew assemble --quiet && echo "    ✅ Build successful" || echo "    ❌ Build failed"
fi
```

**Test Environment Validation:**

```bash
echo "🧪 Validating test environment..."

# Language-specific test validation
if [ -f "deno.json" ]; then
  echo "  Deno test validation:"
  
  # Test discovery
  test_files=$(fd "_test\.ts$|test\.ts$" . | wc -l | tr -d ' ')
  echo "    Found $test_files test files"
  
  # Quick test run (non-destructive)
  deno test --no-run 2>/dev/null && echo "    ✅ Test compilation successful" || echo "    ⚠️  Test compilation issues"
  
elif [ -f "Cargo.toml" ]; then
  echo "  Rust test validation:"
  
  # Test compilation only
  cargo test --no-run --all-targets && echo "    ✅ Test compilation successful" || echo "    ❌ Test compilation failed"
  
elif [ -f "go.mod" ]; then
  echo "  Go test validation:"
  
  # Quick test (short mode)
  go test -short ./... && echo "    ✅ Quick tests passed" || echo "    ⚠️  Test issues found"
  
elif [ -f "pom.xml" ]; then
  echo "  Java Maven test validation:"
  
  # Test compilation
  ./mvnw test-compile -q && echo "    ✅ Test compilation successful" || echo "    ❌ Test compilation failed"
fi
```

STEP 9: Documentation discovery and knowledge transfer preparation

**Generate Learning Roadmap:**

```bash
echo "📚 Preparing knowledge transfer materials..."

# Key files identification
echo "  🎯 Essential files to read first:"

# Entry points
entry_points=$(fd "^(main|index|app|server)\.(rs|go|ts|js|py|java)$" . -d 3 | head -5)
if [ -n "$entry_points" ]; then
  echo "    📍 Entry points:"
  echo "$entry_points" | sed 's/^/      /'
fi

# Configuration files
config_files=$(fd "^(config|settings|application)\.(json|yaml|yml|toml|properties)$" . -d 3 | head -5)
if [ -n "$config_files" ]; then
  echo "    ⚙️  Configuration:"
  echo "$config_files" | sed 's/^/      /'
fi

# API documentation
api_docs=$(fd "(openapi|swagger|api-docs|schema)\.(json|yaml|yml)$" . -d 3 | head -3)
if [ -n "$api_docs" ]; then
  echo "    🌐 API Documentation:"
  echo "$api_docs" | sed 's/^/      /'
fi

# Architectural Decision Records
adrs=$(fd "(adr|decision|architecture)" . -t d -d 3 | head -3)
if [ -n "$adrs" ]; then
  echo "    🏛️  Architecture docs:"
  echo "$adrs" | sed 's/^/      /'
fi

# Available scripts and tasks
echo "  🛠️  Available development commands:"
if [ -f "deno.json" ]; then
  echo "    Deno tasks:"
  jq -r '.tasks | keys[] | "      deno task " + .' deno.json 2>/dev/null | head -5
elif [ -f "package.json" ]; then
  echo "    npm scripts:"
  jq -r '.scripts | keys[] | "      npm run " + .' package.json 2>/dev/null | head -5
elif [ -f "Cargo.toml" ]; then
  echo "    Cargo commands:"
  echo "      cargo build, cargo test, cargo run"
fi
```

STEP 10: Team integration and collaboration setup

**Team Onboarding Checklist:**

```bash
echo "👥 Team integration checklist:"

# Repository access
echo "  📁 Repository Access:"
echo "    - [ ] Added to GitHub organization/team"
echo "    - [ ] Repository permissions configured (read/write/admin)"
echo "    - [ ] Branch protection rules understood"

# Communication channels
echo "  💬 Communication Setup:"
echo "    - [ ] Added to team Slack/Discord channels"
echo "    - [ ] Subscribed to relevant email lists"
echo "    - [ ] Calendar access for standups/meetings"

# Development workflow
echo "  🔄 Workflow Integration:"
echo "    - [ ] Code review process explained"
echo "    - [ ] CI/CD pipeline access configured"
echo "    - [ ] Issue tracking system access (GitHub Issues/Jira)"
echo "    - [ ] Pull request templates understood"

# Knowledge transfer
echo "  🧠 Knowledge Transfer:"
echo "    - [ ] Architecture overview session scheduled"
echo "    - [ ] Domain knowledge transfer planned"
echo "    - [ ] Pair programming sessions arranged"
echo "    - [ ] Mentorship assignment completed"
```

STEP 11: Troubleshooting guide and environment validation

**Common Issues and Solutions:**

```bash
echo "🔧 Troubleshooting guide:"

echo "  🐛 Common Issues:"
echo "    1. Dependency resolution failures:"
echo "       - Clear caches: rm -rf node_modules/.cache target/ .deno/"
echo "       - Reinstall: deno cache --reload, cargo clean && cargo build"

echo "    2. Tool version mismatches:"
echo "       - Check .tool-versions or README for required versions"
echo "       - Use version managers: rustup, nvm, sdkman"

echo "    3. Network/registry issues:"
echo "       - Verify access to package registries"
echo "       - Check corporate proxy/firewall settings"
echo "       - Try alternative registries if available"

echo "    4. Permissions and disk space:"
echo "       - Check disk space: duf or df -h"
echo "       - Verify file permissions: ls -la"
echo "       - Fix ownership: chown -R $USER:$USER ."

echo "    5. Environment configuration:"
echo "       - Validate .env file completeness"
echo "       - Check environment variable expansion"
echo "       - Verify service connectivity (databases, APIs)"

# Quick health check
echo "  🩺 Environment Health Check:"
echo "    Modern tools: $(echo "rg: $(which rg >/dev/null && echo ✓ || echo ✗) | fd: $(which fd >/dev/null && echo ✓ || echo ✗) | jq: $(which jq >/dev/null && echo ✓ || echo ✗)")"
echo "    Git config: $(git config user.name >/dev/null && echo ✓ || echo ✗)"
echo "    Project build: $([ -f 'deno.json' ] && deno check **/*.ts >/dev/null 2>&1 && echo ✓ || echo ✗)"
```

CATCH (onboarding_errors):

- LOG all errors to session state: `/tmp/onboard-session-$SESSION_ID.json`
- PROVIDE specific error resolution steps
- CREATE follow-up checklist for manual completion

FINALLY:

- SAVE session summary to: `/tmp/onboard-complete-$SESSION_ID.json`
- GENERATE final onboarding report
- CLEAN UP temporary files
- LOG completion timestamp and success metrics

## Final Validation Checklist

**Environment Setup Verification:**

- [ ] ✅ Modern CLI tools installed (rg, fd, bat, eza, jq, yq, delta, zoxide)
- [ ] ✅ Language-specific toolchain configured and verified
- [ ] ✅ Project dependencies resolved and cached
- [ ] ✅ Database/infrastructure services running (PostgreSQL, DragonflyDB)
- [ ] ✅ Environment variables configured from templates
- [ ] ✅ Editor workspace opened with recommended extensions
- [ ] ✅ Git configuration and hooks properly set up
- [ ] ✅ Initial build successful without errors
- [ ] ✅ Test environment validated (compilation check)
- [ ] ✅ Documentation and learning materials identified
- [ ] ✅ Team integration checklist provided
- [ ] ✅ Troubleshooting guide available for common issues

**Immediate Next Steps:**

1. **📖 Code Exploration:**
   - Review project README and CONTRIBUTING.md
   - Study main entry points and configuration files
   - Understand project architecture and data flow

2. **🤖 AI-Assisted Learning:**
   - Use `/analyze-codebase` for comprehensive project analysis
   - Run `/context-load-<technology>` for framework-specific guidance
   - Execute `/generate-documentation` to fill knowledge gaps

3. **👥 Team Integration:**
   - Complete team onboarding checklist
   - Schedule architecture overview session
   - Join first team standup/meeting

4. **🚀 First Contribution:**
   - Identify good first issue or starter task
   - Create feature branch using git worktrees for parallel development
   - Follow project's pull request and code review process

**Success Metrics:**

- Environment setup time: Target <30 minutes
- Build success rate: 100% on first attempt
- Tool compatibility: All modern alternatives installed
- Knowledge transfer readiness: Complete learning roadmap available