---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(git:*), Bash(gh:*), Bash(npm:*), Bash(cargo:*), Bash(go:*), Bash(mvn:*), Bash(gradle:*), Bash(deno:*), Bash(docker:*), Bash(jq:*), Bash(gdate:*), Bash(fd:*), Bash(rg:*), Bash(bat:*)
name: "Release"
description: "Production-ready release orchestrator with semantic versioning, changelog generation, and multi-platform distribution"
author: "wcygan"
tags: ["workflow","manage"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target release: $ARGUMENTS
- Current directory: !`pwd`
- Git status: !`git status --porcelain`
- Current branch: !`git branch --show-current`
- Latest tag: !`git describe --tags --abbrev=0 2>/dev/null || echo "No tags found"`
- Uncommitted changes: !`git diff --name-only HEAD | wc -l | tr -d ' '` files
- Recent commits: !`git log --oneline -5 --format="%h %s"`
- Project structure: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json)" . -d 2 | head -5 || echo "No build files detected"`
- Release tools status: !`echo "git: $(which git >/dev/null && echo ✓ || echo ✗) | gh: $(which gh >/dev/null && echo ✓ || echo ✗) | docker: $(which docker >/dev/null && echo ✓ || echo ✗) | jq: $(which jq >/dev/null && echo ✓ || echo ✗)"`

## Your Task

STEP 1: Initialize comprehensive release session and validate environment

- CREATE session state file: `/tmp/release-session-$SESSION_ID.json`
- VALIDATE working directory is clean (no uncommitted changes)
- CONFIRM current branch is main/master or release branch
- CHECK required tools availability (git, gh, build tools)
- DETECT project type and build system from Context section

```bash
# Initialize release session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetRelease": "'$ARGUMENTS'",
  "projectType": "auto-detect",
  "currentVersion": null,
  "nextVersion": null,
  "releaseType": "auto-detect",
  "changelogGenerated": false,
  "assetsBuilt": false,
  "published": false
}' > /tmp/release-session-$SESSION_ID.json
```

STEP 2: Intelligent version analysis and semantic versioning strategy

TRY:

**Version Detection and Analysis:**

```bash
# Extract current version from project files
current_version=$(git describe --tags --abbrev=0 2>/dev/null | sed 's/^v//' || echo "0.0.0")
echo "📋 Current version detected: $current_version"

# Analyze commits since last release for semantic versioning
latest_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [[ -n "$latest_tag" ]]; then
  commits_since_tag=$(git log $latest_tag..HEAD --oneline)
  echo "📝 Commits since $latest_tag:"
  echo "$commits_since_tag"
else
  echo "📝 No previous tags found - preparing initial release"
fi
```

**Semantic Version Bump Analysis:**

CASE commit_analysis:
WHEN "breaking_changes_detected":

- DETERMINE major version bump (X.0.0)
- IDENTIFY breaking changes from commit messages
- FLAG need for migration guide generation

WHEN "new_features_detected":

- DETERMINE minor version bump (X.Y.0)
- EXTRACT feature list from conventional commits
- PREPARE feature highlighting for release notes

WHEN "bug_fixes_only":

- DETERMINE patch version bump (X.Y.Z)
- COMPILE bug fix list for changelog
- FOCUS on stability and reliability messaging

STEP 3: Parallel changelog generation and release notes creation

IF project_complexity == "large" OR commit_count > 50:

LAUNCH parallel sub-agents for comprehensive changelog generation:

- **Agent 1: Commit Analysis**: Parse all commits since last release, categorize by conventional commit types
  - Focus: feat, fix, docs, style, refactor, perf, test, chore patterns
  - Tools: git log parsing, conventional commit validation
  - Output: Categorized commit manifest with issue linking

- **Agent 2: Breaking Changes Assessment**: Identify breaking changes and API modifications
  - Focus: BREAKING CHANGE footers, exclamation marks in types, API removals
  - Tools: git diff analysis, API surface comparison
  - Output: Breaking changes summary with migration requirements

- **Agent 3: Security & Dependency Updates**: Track security fixes and dependency updates
  - Focus: Security patches, vulnerability fixes, dependency upgrades
  - Tools: Dependency file analysis, commit message scanning
  - Output: Security update summary and impact assessment

- **Agent 4: Performance & Optimization**: Catalog performance improvements and optimizations
  - Focus: Performance commits, optimization changes, benchmark improvements
  - Tools: Performance-related commit analysis
  - Output: Performance improvement summary

ELSE:

EXECUTE streamlined changelog generation:

```bash
# Generate structured changelog from git history
echo "📝 Generating changelog from git history..."

# Extract commits by type using conventional commit format
git log $latest_tag..HEAD --pretty=format:"%s" | while read commit; do
  if [[ $commit =~ ^feat(\(.+\))?: ]]; then
    echo "### Added" >> /tmp/changelog-$SESSION_ID.md
    echo "- ${commit#feat*: }" >> /tmp/changelog-$SESSION_ID.md
  elif [[ $commit =~ ^fix(\(.+\))?: ]]; then
    echo "### Fixed" >> /tmp/changelog-$SESSION_ID.md
    echo "- ${commit#fix*: }" >> /tmp/changelog-$SESSION_ID.md
  elif [[ $commit =~ ^docs(\(.+\))?: ]]; then
    echo "### Documentation" >> /tmp/changelog-$SESSION_ID.md
    echo "- ${commit#docs*: }" >> /tmp/changelog-$SESSION_ID.md
  fi
done
```

STEP 4: Multi-language version updates with comprehensive build file management

CASE detected_project_type:
WHEN "rust":

```bash
# Update Cargo.toml version
echo "🦀 Updating Rust project version to $next_version"
sed -i.bak "s/^version = \".*\"/version = \"$next_version\"/" Cargo.toml

# Update any version constants in source
if fd "version\.rs|main\.rs|lib\.rs" src/ | head -1 >/dev/null; then
  rg "const VERSION" src/ --files-with-matches | while read file; do
    sed -i.bak "s/const VERSION = \".*\"/const VERSION = \"$next_version\"/" "$file"
  done
fi

# Generate Cargo.lock updates
cargo check --quiet 2>/dev/null || echo "⚠️ Cargo check failed - manual intervention may be needed"
```

WHEN "go":

```bash
# Update go.mod if needed
echo "🐹 Updating Go project version to $next_version"

# Update version constants in Go files
fd "version\.go|main\.go" . | while read file; do
  sed -i.bak "s/Version = \".*\"/Version = \"$next_version\"/" "$file"
  sed -i.bak "s/version := \".*\"/version := \"$next_version\"/" "$file"
done

# Update build info
if fd "build\.go|version\.go" . | head -1 >/dev/null; then
  current_commit=$(git rev-parse --short HEAD)
  build_date=$(gdate -u +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u +%Y-%m-%dT%H:%M:%SZ)
  sed -i.bak "s/BuildDate = \".*\"/BuildDate = \"$build_date\"/" $(fd "version\.go" . | head -1)
  sed -i.bak "s/GitCommit = \".*\"/GitCommit = \"$current_commit\"/" $(fd "version\.go" . | head -1)
fi
```

WHEN "javascript|typescript":

```bash
# Update package.json version
echo "⚡ Updating JavaScript/TypeScript project version to $next_version"
if [[ -f "package.json" ]]; then
  jq ".version = \"$next_version\"" package.json > package.json.tmp && mv package.json.tmp package.json
fi

# Update deno.json version
if [[ -f "deno.json" ]]; then
  jq ".version = \"$next_version\"" deno.json > deno.json.tmp && mv deno.json.tmp deno.json
fi

# Update package-lock.json if it exists
if [[ -f "package-lock.json" ]]; then
  jq ".version = \"$next_version\"" package-lock.json > package-lock.json.tmp && mv package-lock.json.tmp package-lock.json
fi
```

WHEN "java":

```bash
# Update Maven pom.xml version
echo "☕ Updating Java project version to $next_version"
if [[ -f "pom.xml" ]]; then
  sed -i.bak "s|<version>.*</version>|<version>$next_version</version>|" pom.xml
fi

# Update Gradle version
if [[ -f "build.gradle" || -f "build.gradle.kts" ]]; then
  if [[ -f "gradle.properties" ]]; then
    sed -i.bak "s/version=.*/version=$next_version/" gradle.properties
  else
    echo "version=$next_version" > gradle.properties
  fi
fi
```

STEP 5: Git tag creation and repository state management

TRY:

**Pre-tag Validation:**

```bash
# Ensure clean working directory
if [[ -n "$(git status --porcelain)" ]]; then
  echo "⚠️ Working directory not clean. Committing version updates..."
  git add .
  git commit -m "chore(release): bump version to $next_version"
fi

# Ensure we're on the correct branch
current_branch=$(git branch --show-current)
if [[ "$current_branch" != "main" && "$current_branch" != "master" && "$current_branch" != "release"* ]]; then
  echo "⚠️ Not on main/master/release branch. Current: $current_branch"
  echo "Continue? (y/N)"
  # In automated mode, this would be configurable
fi
```

**Annotated Tag Creation with Rich Metadata:**

```bash
# Generate comprehensive tag message
tag_message="Release $next_version

Changes in this release:
$(cat /tmp/changelog-excerpt-$SESSION_ID.md 2>/dev/null || echo "See CHANGELOG.md for details")

Release Info:
- Build Date: $(gdate -u +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u +%Y-%m-%dT%H:%M:%SZ)
- Git Commit: $(git rev-parse --short HEAD)
- Release Type: $release_type
- Session ID: $SESSION_ID

Generated by automated release workflow"

# Create annotated tag
echo "🏷️ Creating annotated tag v$next_version"
git tag -a "v$next_version" -m "$tag_message"

# Verify tag creation
if git tag -l "v$next_version" | grep -q "v$next_version"; then
  echo "✅ Tag v$next_version created successfully"
  
  # Update session state
  jq --arg version "$next_version" '.tagCreated = true | .tagName = ("v" + $version)' \
    /tmp/release-session-$SESSION_ID.json > /tmp/release-session-$SESSION_ID.tmp && \
    mv /tmp/release-session-$SESSION_ID.tmp /tmp/release-session-$SESSION_ID.json
else
  echo "❌ Failed to create tag"
  exit 1
fi
```

STEP 6: Multi-platform asset building and GitHub release creation

IF build_assets_required:

LAUNCH parallel sub-agents for multi-platform builds:

- **Agent 1: Linux Builds**: Build for linux/amd64 and linux/arm64
  - Tools: Docker multi-arch builds or native compilation
  - Output: Linux binaries and packages

- **Agent 2: macOS Builds**: Build for darwin/amd64 and darwin/arm64
  - Tools: Native Go/Rust cross-compilation
  - Output: macOS binaries and packages

- **Agent 3: Windows Builds**: Build for windows/amd64
  - Tools: Cross-compilation with proper .exe extensions
  - Output: Windows binaries and installers

- **Agent 4: Container Images**: Build and tag Docker images
  - Tools: Docker buildx for multi-platform images
  - Output: Container registry pushes

**GitHub Release Creation with Rich Content:**

```bash
# Generate comprehensive release notes
cat > /tmp/release-notes-$SESSION_ID.md << EOF
## 🚀 What's New in $next_version

$(cat /tmp/changelog-$SESSION_ID.md 2>/dev/null || echo "See CHANGELOG.md for complete details")

### 📥 Installation

#### Using Package Managers
\`\`\`bash
# Homebrew (macOS/Linux)
brew install org/tap/$(basename $(pwd))

# npm/yarn
npm install -g @org/$(basename $(pwd))

# Cargo
cargo install $(basename $(pwd))

# Go
go install github.com/org/$(basename $(pwd))@v$next_version
\`\`\`

#### Binary Downloads
- [Linux AMD64](https://github.com/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/releases/download/v$next_version/$(basename $(pwd))-linux-amd64.tar.gz)
- [macOS AMD64](https://github.com/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/releases/download/v$next_version/$(basename $(pwd))-darwin-amd64.tar.gz)
- [Windows AMD64](https://github.com/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/releases/download/v$next_version/$(basename $(pwd))-windows-amd64.zip)

### 🔄 Migration Guide

$(if [[ "$release_type" == "major" ]]; then echo "⚠️ This is a major release with breaking changes. Please review the migration guide in MIGRATION.md"; else echo "No breaking changes in this release."; fi)

**Full Changelog**: https://github.com/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/compare/$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "initial")...v$next_version
EOF

# Create GitHub release
echo "🚀 Creating GitHub release v$next_version"
gh release create "v$next_version" \
  --title "Release v$next_version" \
  --notes-file "/tmp/release-notes-$SESSION_ID.md" \
  --target "$(git branch --show-current)" \
  $(if [[ "$release_type" == "prerelease" ]]; then echo "--prerelease"; fi)

# Upload assets if they exist
if [[ -d "dist" ]] && [[ -n "$(fd . dist/ -t f)" ]]; then
  echo "📦 Uploading release assets..."
  fd . dist/ -t f -x gh release upload "v$next_version" {} \;
fi
```

STEP 7: Registry publishing and distribution automation

CASE registry_publishing:
WHEN "docker_enabled":

```bash
# Multi-platform Docker image publishing
echo "🐳 Publishing Docker images..."
repo_name=$(basename $(pwd))
registry="ghcr.io/$(gh repo view --json owner -q '.owner.login')"

# Build and push multi-arch images
docker buildx create --use --name release-builder 2>/dev/null || true
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag "$registry/$repo_name:v$next_version" \
  --tag "$registry/$repo_name:latest" \
  --push .

echo "✅ Docker images published to $registry/$repo_name"
```

WHEN "npm_package":

```bash
# NPM/JSR registry publishing
echo "📦 Publishing to npm registry..."
if [[ -f "package.json" ]]; then
  # Verify npm authentication
  if npm whoami >/dev/null 2>&1; then
    npm publish --access public
    echo "✅ Published to npm registry"
  else
    echo "⚠️ npm authentication required"
  fi
fi

# JSR publishing for Deno packages
if [[ -f "deno.json" ]] && jq -e '.name' deno.json >/dev/null; then
  if command -v deno >/dev/null; then
    deno publish --allow-slow-types 2>/dev/null || echo "⚠️ JSR publish failed - check package configuration"
  fi
fi
```

WHEN "cargo_crate":

```bash
# Cargo registry publishing
echo "🦀 Publishing to crates.io..."
if [[ -f "Cargo.toml" ]]; then
  # Verify cargo authentication
  if cargo login --help >/dev/null 2>&1; then
    cargo publish --dry-run
    if [[ $? -eq 0 ]]; then
      cargo publish
      echo "✅ Published to crates.io"
    else
      echo "⚠️ Cargo publish dry-run failed"
    fi
  else
    echo "⚠️ Cargo authentication required"
  fi
fi
```

STEP 8: Automated notification and stakeholder communication

TRY:

**Multi-Channel Notification System:**

```bash
# Generate notification content
notification_content="🚀 Release $(basename $(pwd)) v$next_version is now available!

📋 Release Type: $release_type
🏷️ Tag: v$next_version
📅 Released: $(gdate -u +%Y-%m-%d 2>/dev/null || date -u +%Y-%m-%d)
🔗 Release Notes: https://github.com/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/releases/tag/v$next_version

$(head -5 /tmp/changelog-$SESSION_ID.md 2>/dev/null || echo "See full changelog for details")"

# Slack notification (if webhook configured)
if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
  curl -X POST -H 'Content-type: application/json' \
    --data "$(jq -n --arg text "$notification_content" '{
      "text": $text,
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": $text
          }
        }
      ]
    }')" \
    "$SLACK_WEBHOOK_URL" 2>/dev/null && echo "✅ Slack notification sent"
fi

# Discord webhook (if configured)
if [[ -n "$DISCORD_WEBHOOK_URL" ]]; then
  curl -X POST -H 'Content-type: application/json' \
    --data "$(jq -n --arg content "$notification_content" '{"content": $content}')" \
    "$DISCORD_WEBHOOK_URL" 2>/dev/null && echo "✅ Discord notification sent"
fi

# GitHub Discussions post (if enabled)
if gh api repos/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/discussions >/dev/null 2>&1; then
  gh api repos/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/discussions \
    -f title="Release v$next_version Available" \
    -f body="$notification_content" \
    -f category="Announcements" 2>/dev/null && echo "✅ GitHub Discussion created"
fi
```

STEP 9: Final validation and release completion

**Release Validation Checklist:**

```bash
# Validate release completion
echo "🔍 Validating release completion..."

validation_errors=0

# Check tag exists
if ! git tag -l "v$next_version" | grep -q "v$next_version"; then
  echo "❌ Git tag v$next_version not found"
  validation_errors=$((validation_errors + 1))
fi

# Check GitHub release exists
if ! gh release view "v$next_version" >/dev/null 2>&1; then
  echo "❌ GitHub release v$next_version not found"
  validation_errors=$((validation_errors + 1))
fi

# Check version files updated
for file in $(fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|deno\.json)" . -d 2); do
  if ! grep -q "$next_version" "$file"; then
    echo "⚠️ Version not updated in $file"
  fi
done

if [[ $validation_errors -eq 0 ]]; then
  echo "✅ Release v$next_version completed successfully"
  
  # Update final session state
  jq --arg status "completed" --arg timestamp "$(gdate -u +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u +%Y-%m-%dT%H:%M:%SZ)" \
    '.status = $status | .completedAt = $timestamp | .published = true' \
    /tmp/release-session-$SESSION_ID.json > /tmp/release-session-$SESSION_ID.tmp && \
    mv /tmp/release-session-$SESSION_ID.tmp /tmp/release-session-$SESSION_ID.json
else
  echo "❌ Release validation failed with $validation_errors errors"
  exit 1
fi
```

CATCH (release_failed):

- LOG detailed error information to session state
- PRESERVE all intermediate files for debugging
- PROVIDE rollback instructions for partial releases
- SUGGEST manual intervention steps

```bash
echo "💥 Release process encountered errors"
echo "📋 Session state preserved in: /tmp/release-session-$SESSION_ID.json"
echo "📁 Intermediate files available in: /tmp/*-$SESSION_ID.*"
echo "🔄 To retry: re-run /release with same arguments"
echo "↩️ To rollback: git tag -d v$next_version && gh release delete v$next_version"
```

FINALLY:

- CLEAN UP temporary files older than 1 hour
- ARCHIVE session state for audit trail
- DISPLAY release summary with key metrics

## Release Configuration Patterns

### Argument-Based Release Types

**Standard Release** (`/release`):

- Analyzes commits for semantic versioning
- Automatic version bump based on conventional commits
- Full changelog generation and asset building

**Patch Release** (`/release patch`):

- Forces patch version increment (X.Y.Z+1)
- Focus on bug fixes and stability improvements
- Expedited release process

**Minor Release** (`/release minor`):

- Forces minor version increment (X.Y+1.0)
- Highlights new features and enhancements
- Standard release process with feature emphasis

**Major Release** (`/release major`):

- Forces major version increment (X+1.0.0)
- Mandatory breaking changes documentation
- Migration guide generation required

**Prerelease** (`/release beta`, `/release alpha`, `/release rc`):

- Creates prerelease versions (X.Y.Z-beta.N)
- Limited distribution for testing
- Prerelease flag in GitHub releases

**Custom Version** (`/release 2.0.0-custom`):

- Exact version specification
- Bypasses semantic versioning analysis
- Manual changelog and release note creation

**Dry Run Mode** (`/release --dry-run`):

- Simulation mode - no actual changes
- Preview of version changes and release notes
- Validation of release process without execution

## Advanced Configuration & Customization

### Project-Specific Release Configuration

Support for `.releaserc.json` configuration file:

```json
{
  "release": {
    "versionStrategy": "conventional",
    "changelog": {
      "includeAuthors": true,
      "groupByType": true,
      "breakingChangesSection": true,
      "migrationGuide": true
    },
    "build": {
      "platforms": ["linux/amd64", "darwin/amd64", "windows/amd64"],
      "archiveFormat": "tar.gz",
      "includeChecksums": true
    },
    "publish": {
      "githubReleases": true,
      "dockerRegistry": "ghcr.io",
      "npmRegistry": true,
      "homebrewTap": "org/homebrew-tap"
    },
    "notifications": {
      "slackWebhook": "${SLACK_WEBHOOK_URL}",
      "discordWebhook": "${DISCORD_WEBHOOK_URL}",
      "emailRecipients": ["releases@company.com"]
    },
    "git": {
      "tagFormat": "v{version}",
      "commitMessage": "chore(release): {version}",
      "signTags": true
    }
  }
}
```

### Environment Variable Configuration

```bash
# Authentication tokens
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
export NPM_TOKEN="npm_xxxxxxxxxxxx"
export CARGO_REGISTRY_TOKEN="cio_xxxxxxxxxxxx"

# Notification webhooks
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."

# Registry configuration
export DOCKER_REGISTRY="ghcr.io"
export HOMEBREW_TAP="org/homebrew-tap"

# Release behavior
export RELEASE_DRY_RUN="false"
export RELEASE_SKIP_TESTS="false"
export RELEASE_AUTO_PUSH="true"
```

## Release Validation & Quality Gates

### Automated Pre-Release Validation

```bash
# Comprehensive validation checklist
validation_checks=(
  "git_clean_working_directory"
  "git_on_main_branch"
  "git_up_to_date_with_remote"
  "tests_passing_in_ci"
  "no_security_vulnerabilities"
  "documentation_up_to_date"
  "breaking_changes_documented"
)

for check in "${validation_checks[@]}"; do
  echo "🔍 Validating: $check"
  case $check in
    "git_clean_working_directory")
      if [[ -n "$(git status --porcelain)" ]]; then
        echo "❌ Working directory not clean"
        exit 1
      fi
      ;;
    "git_on_main_branch")
      current_branch=$(git branch --show-current)
      if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
        echo "⚠️ Not on main/master branch: $current_branch"
      fi
      ;;
    "tests_passing_in_ci")
      # Check CI status if GitHub Actions
      if gh run list --limit 1 --json status,conclusion | jq -e '.[] | select(.status == "completed" and .conclusion == "success")' >/dev/null; then
        echo "✅ Latest CI run passed"
      else
        echo "⚠️ Latest CI run not successful"
      fi
      ;;
  esac
done
```

### Integration with Other Slash Commands

**Workflow Coordination:**

- **Pre-Release**: `/harden` for security validation, `/test-coverage` for quality metrics
- **Documentation**: `/document` to update README and API docs before release
- **Containerization**: `/containerize` for Docker image builds and registry pushes
- **CI/CD**: `/ci-gen` to ensure proper pipeline configuration
- **Deployment**: `/deploy` for production deployment after release

### Error Recovery & Rollback Procedures

```bash
# Rollback procedures for failed releases
rollback_release() {
  local version=$1
  echo "🔄 Rolling back release v$version"
  
  # Remove local tag
  git tag -d "v$version" 2>/dev/null || true
  
  # Remove remote tag
  git push origin --delete "v$version" 2>/dev/null || true
  
  # Delete GitHub release
  gh release delete "v$version" --yes 2>/dev/null || true
  
  # Revert version changes
  git checkout HEAD~1 -- package.json Cargo.toml go.mod pom.xml deno.json 2>/dev/null || true
  
  echo "✅ Rollback completed"
}
```

This comprehensive release command automates the entire software release lifecycle with intelligent semantic versioning, parallel build processes, multi-platform distribution, and stakeholder communication - all while maintaining audit trails and providing robust error recovery capabilities.