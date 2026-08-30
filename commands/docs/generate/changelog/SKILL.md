---
allowed-tools: Read, Write, Bash(git:*), Bash(jq:*), Bash(rg:*), Bash(fd:*), Bash(gdate:*), Task
name: "Changelog"
description: "Ultra-fast parallel changelog generation using 10 sub-agents for instant comprehensive analysis"
author: "wcygan"
tags: ["docs","generate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "session-$(date +%s)000000000"`
- Current directory: !`pwd`
- Target range: $ARGUMENTS
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`
- Latest tag: !`git describe --tags --abbrev=0 2>/dev/null || echo "No tags found"`
- Total commits: !`git rev-list --count HEAD 2>/dev/null || echo "0"`
- Commit types found: !`git log --pretty=format:"%s" | rg "^(feat|fix|docs|style|refactor|perf|test|chore|build|ci):" | head -5 || echo "No conventional commits found"`
- Recent commits: !`git log --oneline -5 2>/dev/null || echo "No git history"`
- Contributors: !`git shortlog -sn --since="3 months ago" | head -5 2>/dev/null || echo "No contributors found"`

## Your Task

**IMMEDIATELY DEPLOY 10 PARALLEL SUB-AGENTS** for instant changelog generation

STEP 1: Initialize changelog generation session

- CREATE session state file: `/tmp/changelog-$SESSION_ID.json`
- Initialize results directory: `/tmp/changelog-results-$SESSION_ID/`

STEP 2: **LAUNCH ALL 10 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL ANALYSIS** - All agents work in parallel:

1. **Commit Analysis Agent**: Extract and classify all commits in range
2. **Breaking Changes Agent**: Identify breaking changes and migration needs
3. **Feature Detection Agent**: Find all new features and enhancements
4. **Bug Fix Agent**: Catalog all bug fixes and patches
5. **Security Analysis Agent**: Identify security-related commits
6. **Version Calculation Agent**: Determine semantic version bump
7. **Contributor Analysis Agent**: Analyze contributor statistics
8. **PR/Issue Agent**: Extract PR and issue references
9. **Performance Agent**: Find performance improvements
10. **Documentation Agent**: Track documentation changes

Each agent saves results to: `/tmp/changelog-results-$SESSION_ID/agent-N.json`

**Expected speedup: 10x faster than sequential analysis**

IF $ARGUMENTS provided:

- PARSE target range (version, date range, commit range)
- VALIDATE range exists in git history
- SET scope to "targeted"
  ELSE IF latest tag exists:
- SET range from latest tag to HEAD
- SET scope to "release"
  ELSE:
- SET range to entire git history
- SET scope to "initial"

STEP 3: Changelog Generation Process

TRY:

- EXECUTE commit analysis based on determined scope
- CLASSIFY commits using conventional commit patterns
- GENERATE structured changelog sections
- APPLY version numbering if applicable

CATCH (git_operation_failed):

- LOG error to session state
- PROVIDE manual changelog guidance
- SAVE partial results if any

**Commit History Gathering:**

FOR scope = "targeted":

- EXTRACT commits in specified range using validated git commands
- VERIFY range validity before processing
- HANDLE edge cases (empty range, invalid refs)

FOR scope = "release":

- GET commits since latest tag: `git log $(git describe --tags --abbrev=0)..HEAD`
- INCLUDE merge commits and PR references
- FOCUS on user-facing changes

FOR scope = "initial":

- PROCESS entire git history with pagination
- LIMIT to recent significant commits for readability
- PRIORITIZE major features and breaking changes

**Commit Classification Engine:**

FOR EACH commit in range:

- EXTRACT commit message and metadata
- APPLY conventional commit pattern matching
- CLASSIFY into changelog sections
- EXTRACT PR/issue references
- IDENTIFY breaking changes
- CALCULATE impact score

STEP 4: Intelligent commit analysis and classification

**Commit Pattern Recognition:**

```bash
# Conventional commit type detection
git log $RANGE --pretty=format:"%h|%s|%b" | \
  rg "^([a-f0-9]+)\|((feat|fix|docs|style|refactor|perf|test|chore|build|ci)(\(.+\))?(!)?:)" || echo "No conventional commits"

# Breaking change detection
git log $RANGE --pretty=format:"%h|%s|%b" | \
  rg "(BREAKING CHANGE:|!:)" || echo "No breaking changes"

# PR and issue reference extraction
git log $RANGE --pretty=format:"%s" | \
  rg "#([0-9]+)" -o --replace='$1' | sort -u || echo "No PR/issue references"

# Security-related commits
git log $RANGE --pretty=format:"%h|%s" | \
  rg "(security|vulnerability|CVE|XSS|SQL injection|CSRF)" -i || echo "No security commits"
```

**Advanced Classification Logic:**

FOR EACH commit:

- MATCH against conventional commit patterns
- EXTRACT scope and description
- IDENTIFY breaking change indicators (!: or BREAKING CHANGE:)
- DETECT security implications
- CALCULATE semantic version impact
- ASSIGN to appropriate changelog section

**Version Number Determination:**

IF breaking changes detected:

- INCREMENT major version
- RESET minor and patch to 0
  ELSE IF features detected:
- INCREMENT minor version
- RESET patch to 0
  ELSE IF fixes detected:
- INCREMENT patch version
  ELSE:
- SUGGEST manual version review

STEP 5: Generate structured changelog output

**Changelog Template Generation:**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

{UNRELEASED_SECTIONS}

## [{NEXT_VERSION}] - {RELEASE_DATE}

{GENERATED_SECTIONS}

{EXISTING_CHANGELOG_CONTENT}
```

**Section Organization and Content:**

FOR EACH changelog section:

- SORT by impact and importance
- INCLUDE commit hash for traceability
- ADD PR/issue references when available
- FORMAT with consistent bullet points
- GROUP related changes together

**Breaking Changes Section (if applicable):**

```markdown
### ⚠️ BREAKING CHANGES

- {DESCRIPTION} ({COMMIT_HASH}) [#{PR_NUMBER}]
- Migration guide: {MIGRATION_NOTES}
```

**Standard Sections:**

```markdown
### Added

- {FEATURE_DESCRIPTION} ({COMMIT_HASH}) [#{PR_NUMBER}]

### Changed

- {CHANGE_DESCRIPTION} ({COMMIT_HASH}) [#{PR_NUMBER}]

### Deprecated

- {DEPRECATION_DESCRIPTION} ({COMMIT_HASH}) [#{PR_NUMBER}]

### Removed

- {REMOVAL_DESCRIPTION} ({COMMIT_HASH}) [#{PR_NUMBER}]

### Fixed

- {FIX_DESCRIPTION} ({COMMIT_HASH}) [#{PR_NUMBER}]

### Security

- {SECURITY_FIX_DESCRIPTION} ({COMMIT_HASH}) [#{PR_NUMBER}]
```

STEP 6: Advanced features and metadata

**Commit Classification Patterns:**

```json
{
  "breaking": ["^BREAKING CHANGE:", "^feat!:", "^fix!:", "^refactor!:"],
  "features": ["^feat:", "^feature:", "add", "implement", "introduce"],
  "fixes": ["^fix:", "^bugfix:", "resolve", "patch", "correct"],
  "performance": ["^perf:", "performance", "optimize", "speed", "faster"],
  "refactor": ["^refactor:", "restructure", "reorganize", "cleanup"],
  "docs": ["^docs:", "documentation", "README", "guide", "example"],
  "style": ["^style:", "formatting", "lint", "prettier", "whitespace"],
  "test": ["^test:", "^tests:", "testing", "spec", "coverage"],
  "chore": ["^chore:", "^build:", "^ci:", "dependencies", "deps", "config"],
  "security": ["security", "vulnerability", "CVE", "XSS", "injection"]
}
```

**Contributor Analytics:**

```bash
# Contributor statistics for the changelog period
git shortlog -sn $RANGE | head -10

# First-time contributors in this release
comm -23 <(git shortlog -sn $RANGE | cut -f2) <(git shortlog -sn $PREVIOUS_TAG | cut -f2) | head -5

# Most active files in this release
git log $RANGE --name-only --pretty=format: | sort | uniq -c | sort -nr | head -10
```

STEP 7: Quality assurance and validation

**Changelog Validation:**

- VERIFY all commits are properly classified
- CHECK for missing PR/issue references
- VALIDATE markdown syntax and formatting
- ENSURE version number follows semantic versioning
- CONFIRM breaking changes are prominently displayed

**Output Enhancement:**

- ADD contributor acknowledgments
- INCLUDE migration guides for breaking changes
- PROVIDE links to full diff and release pages
- EMBED release statistics (commits, files changed, contributors)
- GENERATE both markdown and JSON formats

STEP 8: Session state management and completion

**Automated Generation Engine:**

```typescript
// Conceptual implementation structure
interface ChangelogGeneration {
  sessionId: string;
  range: string;
  commits: CommitInfo[];
  sections: ChangelogSections;
  metadata: ReleaseMetadata;
  output: string;
}

interface CommitInfo {
  hash: string;
  shortHash: string;
  subject: string;
  body: string;
  author: string;
  date: string;
  prNumber?: string;
  issueReferences: string[];
  breakingChange: boolean;
  scope?: string;
  type: CommitType;
}

interface ReleaseMetadata {
  version: string;
  date: string;
  commitCount: number;
  contributorCount: number;
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
}
```

````
- UPDATE session state with generation results
- SAVE changelog output: `/tmp/changelog-output-$SESSION_ID.md`
- CREATE metadata summary: `/tmp/changelog-metadata-$SESSION_ID.json`
- MARK completion checkpoint

FINALLY:
  - ARCHIVE session data for future reference
  - PROVIDE changelog generation summary
  - CLEAN UP temporary session files

**GitHub Integration and Enhancement:**

```bash
# Enhanced PR and issue integration
git log $RANGE --grep="Merge pull request" --pretty=format:"%s" | \
  rg "Merge pull request #([0-9]+)" -o --replace='#$1' || echo "No merged PRs"

# Comprehensive issue reference extraction
git log $RANGE --pretty=format:"%s %b" | \
  rg "(closes?|fixes?|resolves?)\s+#([0-9]+)" -i -o --replace='#$2' | sort -u || echo "No issue references"

# Co-author and contributor analysis
git log $RANGE --pretty=format:"%s%n%b" | \
  rg "Co-authored-by:\s+(.+)" --replace='$1' | sort | uniq || echo "No co-authors"

# Release statistics
echo "Release Statistics:"
echo "- Commits: $(git rev-list --count $RANGE)"
echo "- Files changed: $(git diff --name-only $RANGE | wc -l)"
echo "- Contributors: $(git shortlog -sn $RANGE | wc -l)"
echo "- Lines added: $(git diff --shortstat $RANGE | rg '([0-9]+) insertions' -o --replace='$1' || echo '0')"
echo "- Lines removed: $(git diff --shortstat $RANGE | rg '([0-9]+) deletions' -o --replace='$1' || echo '0')"
````

## Advanced Changelog Features

**Intelligent Version Determination:**

```bash
# Current version extraction with fallback
CURRENT_VERSION=$(git describe --tags --abbrev=0 2>/dev/null | rg '^v?([0-9]+\.[0-9]+\.[0-9]+)' -o --replace='$1' || echo "0.1.0")

# Semantic version bump calculation
if git log $RANGE --pretty=format:"%s %b" | rg "(BREAKING CHANGE:|^.+!:)" -q; then
  VERSION_BUMP="major"
elif git log $RANGE --pretty=format:"%s" | rg "^feat:" -q; then
  VERSION_BUMP="minor"
elif git log $RANGE --pretty=format:"%s" | rg "^fix:" -q; then
  VERSION_BUMP="patch"
else
  VERSION_BUMP="none"
fi

# Calculate next version
echo "Version bump type: $VERSION_BUMP"
echo "Current version: $CURRENT_VERSION"
# Next version calculation would be implemented here
```

**Advanced Pattern Recognition:**

```typescript
// Enhanced commit classification logic
interface CommitAnalysis {
  type: "feat" | "fix" | "docs" | "style" | "refactor" | "perf" | "test" | "chore" | "build" | "ci";
  scope?: string;
  subject: string;
  body?: string;
  breakingChange: boolean;
  prNumber?: string;
  issueReferences: string[];
  impactScore: number; // 1-10 scale
  category: "user-facing" | "internal" | "infrastructure";
}

// Smart categorization for different audiences
const audienceMapping = {
  "user-facing": ["feat", "fix", "perf", "security"],
  "developer": ["refactor", "test", "docs", "style"],
  "infrastructure": ["build", "ci", "chore"],
};
```

````
**Multi-Format Output Generation:**

```markdown
## Release Notes - v{VERSION}

### 🎯 Release Highlights

{TOP_FEATURES_WITH_EMOJIS}

### ⚠️ Breaking Changes

{BREAKING_CHANGES_WITH_MIGRATION_GUIDES}

### 📈 Release Statistics

- **{COMMIT_COUNT}** commits from **{CONTRIBUTOR_COUNT}** contributors
- **{FILES_CHANGED}** files changed (+{LINES_ADDED} -{LINES_REMOVED})
- **{SECURITY_FIXES}** security fixes included
- **{PERFORMANCE_IMPROVEMENTS}** performance improvements

### 🤝 Contributors

{CONTRIBUTOR_LIST_WITH_COMMIT_COUNTS}
{FIRST_TIME_CONTRIBUTORS_CALLOUT}

### 🔗 Links

- [📋 Full Changelog](https://github.com/{ORG}/{REPO}/compare/{PREVIOUS_TAG}...{CURRENT_TAG})
- [🏷️ Release Page](https://github.com/{ORG}/{REPO}/releases/tag/{CURRENT_TAG})
- [📦 Download](https://github.com/{ORG}/{REPO}/archive/{CURRENT_TAG}.zip)
````

**JSON Metadata Output:**

```json
{
  "version": "{VERSION}",
  "date": "{RELEASE_DATE}",
  "range": "{COMMIT_RANGE}",
  "statistics": {
    "commits": {COMMIT_COUNT},
    "contributors": {CONTRIBUTOR_COUNT},
    "filesChanged": {FILES_CHANGED},
    "linesAdded": {LINES_ADDED},
    "linesRemoved": {LINES_REMOVED}
  },
  "sections": {
    "breaking": [{BREAKING_CHANGES}],
    "added": [{NEW_FEATURES}],
    "changed": [{IMPROVEMENTS}],
    "fixed": [{BUG_FIXES}],
    "security": [{SECURITY_FIXES}]
  },
  "contributors": [{CONTRIBUTOR_DATA}],
  "links": {
    "compare": "{COMPARE_URL}",
    "release": "{RELEASE_URL}",
    "download": "{DOWNLOAD_URL}"
  }
}
```

## Expected Output Formats

**Primary Changelog Output:**

```markdown
# Changelog for {VERSION_OR_RANGE}

Generated on {TIMESTAMP} | Session: {SESSION_ID}

## 📋 Release Summary

- **Version**: {CALCULATED_VERSION}
- **Date**: {RELEASE_DATE}
- **Commits**: {COMMIT_COUNT}
- **Contributors**: {CONTRIBUTOR_COUNT}
- **Scope**: {TARGET_RANGE}

## 🚀 Changes

### ⚠️ Breaking Changes

{BREAKING_CHANGES_LIST}

### ✨ Added

{NEW_FEATURES_LIST}

### 🔄 Changed

{IMPROVEMENTS_LIST}

### 🗑️ Deprecated

{DEPRECATIONS_LIST}

### ❌ Removed

{REMOVALS_LIST}

### 🐛 Fixed

{BUG_FIXES_LIST}

### 🔒 Security

{SECURITY_FIXES_LIST}

### 📚 Documentation

{DOCUMENTATION_UPDATES}

### 🔧 Internal

{INTERNAL_CHANGES}

## 👥 Contributors

{CONTRIBUTOR_ACKNOWLEDGMENTS}

## 🔗 Links

- [📋 Full Diff]({COMPARE_URL})
- [🏷️ Release Page]({RELEASE_URL})
- [📦 Download]({DOWNLOAD_URL})

---

_Generated by /changelog command with session {SESSION_ID}_
```

## Session State Management Schema

**State Files Created:**

- `/tmp/changelog-analysis-$SESSION_ID.json` - Main changelog generation state
- `/tmp/changelog-output-$SESSION_ID.md` - Generated changelog content
- `/tmp/changelog-metadata-$SESSION_ID.json` - Release metadata and statistics
- `/tmp/changelog-commits-$SESSION_ID.json` - Processed commit data

**Enhanced State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target_range": "$ARGUMENTS",
  "phase": "discovery|analysis|classification|generation|validation|complete",
  "git_info": {
    "repository_root": "path",
    "current_branch": "branch_name",
    "latest_tag": "tag_name",
    "commit_range": "actual_range_used",
    "total_commits": "number"
  },
  "commits": [
    {
      "hash": "full_commit_hash",
      "short_hash": "abbreviated_hash",
      "subject": "commit_subject",
      "body": "commit_body",
      "author": "author_name",
      "date": "commit_date",
      "type": "conventional_commit_type",
      "scope": "optional_scope",
      "breaking_change": "boolean",
      "pr_number": "optional_pr_number",
      "issue_references": ["issue_numbers"],
      "classification": "added|changed|deprecated|removed|fixed|security|docs|internal",
      "impact_score": "1-10_importance_rating"
    }
  ],
  "changelog_sections": {
    "breaking": ["formatted_entries"],
    "added": ["formatted_entries"],
    "changed": ["formatted_entries"],
    "deprecated": ["formatted_entries"],
    "removed": ["formatted_entries"],
    "fixed": ["formatted_entries"],
    "security": ["formatted_entries"],
    "documentation": ["formatted_entries"],
    "internal": ["formatted_entries"]
  },
  "version_info": {
    "current_version": "x.y.z",
    "suggested_version": "x.y.z",
    "version_bump_type": "major|minor|patch|none",
    "breaking_changes_count": "number",
    "new_features_count": "number",
    "bug_fixes_count": "number"
  },
  "statistics": {
    "total_commits": "number",
    "unique_contributors": "number",
    "files_changed": "number",
    "lines_added": "number",
    "lines_removed": "number",
    "first_time_contributors": ["contributor_names"],
    "most_active_contributors": [{ "name": "string", "commits": "number" }]
  },
  "output_files": {
    "changelog_markdown": "/tmp/path",
    "metadata_json": "/tmp/path",
    "release_notes": "/tmp/path"
  }
}
```

## Changelog Generation Standards

1. **Semantic Classification** - Intelligent commit type detection and categorization
2. **Impact-Based Ordering** - Sort entries by user impact and importance
3. **Complete Traceability** - Include commit hashes and PR/issue references
4. **Breaking Change Emphasis** - Prominently highlight and explain breaking changes
5. **Contributor Recognition** - Acknowledge all contributors with statistics
6. **Cross-Platform Compatibility** - Support different git environments and tools
7. **Session-Based State Management** - Resumable and debuggable generation process
8. **Multi-Format Output** - Generate both markdown and JSON formats

## Advanced Features and Capabilities

**Intelligent Commit Analysis:**

- Conventional commit pattern recognition with fallback classification
- Breaking change detection across multiple patterns
- Security vulnerability identification
- Performance improvement categorization
- Cross-platform git compatibility with fallback commands

**Enhanced Metadata Extraction:**

- PR and issue reference linking
- Co-author and contributor analysis
- Release statistics and impact metrics
- First-time contributor identification
- Most active contributor rankings

**Multi-Audience Optimization:**

- User-facing vs. developer-focused change separation
- Impact-based ordering within sections
- Technical debt and internal improvement tracking
- Security fix prominence and explanation
- Migration guide generation for breaking changes

**Quality Assurance:**

- Session-based state management for resumability
- Cross-platform command compatibility testing
- Fallback value provision for failed git operations
- Comprehensive error handling and recovery
- Output validation and formatting verification

The changelog generation adapts to your repository structure, commit patterns, and release workflow while maintaining consistency with Keep a Changelog standards and semantic versioning principles.