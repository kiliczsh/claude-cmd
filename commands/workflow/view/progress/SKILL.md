---
allowed-tools: Bash(gdate:*), Bash(date:*), Bash(mkdir:*), Bash(fd:*), Bash(eza:*), Bash(bat:*), Bash(jq:*), Write, Read
name: "Progress"
description: "Development progress tracker with timestamped entries and intelligent organization"
author: "wcygan"
tags: ["workflow","view"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Current directory: !`pwd`
- Progress target: $ARGUMENTS
- Current date: !`gdate +%Y-%m-%d 2>/dev/null || date +%Y-%m-%d`
- Current time: !`gdate "+%H:%M:%S %Z" 2>/dev/null || date "+%H:%M:%S %Z"`
- Existing progress structure: !`fd "progress" . -t d -d 2 2>/dev/null | head -3 || echo "No progress directory found"`
- Recent progress entries: !`fd "\.md$" ./progress/ -d 3 2>/dev/null | tail -5 || echo "No progress entries found"`
- Modern tools status: !`echo "fd: $(which fd >/dev/null && echo ✓ || echo ✗) | bat: $(which bat >/dev/null && echo ✓ || echo ✗) | eza: $(which eza >/dev/null && echo ✗ || echo ✗)"`

## Your Task

STEP 1: Initialize progress tracking session and determine operation mode

- CREATE session state file: `/tmp/progress-session-$SESSION_ID.json`
- ANALYZE user input to determine operation type (record, view, search, stats)
- VALIDATE progress directory structure exists or needs creation
- DETECT project type for contextual progress formatting

```bash
# Initialize progress session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "operationType": "auto-detect",
  "progressEntry": "'$ARGUMENTS'",
  "projectRoot": "'$(pwd)'",
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"
}' > /tmp/progress-session-$SESSION_ID.json
```

STEP 2: Smart operation detection and routing

CASE operation_type:
WHEN "record_progress" (default if $ARGUMENTS contains text):

**Progress Entry Recording:**

```bash
# Create progress directory structure using modern tools
current_date=$(gdate +%Y-%m-%d 2>/dev/null || date +%Y-%m-%d)
timestamp=$(gdate "+%Y-%m-%d-%H:%M:%S-%Z" 2>/dev/null || date "+%Y-%m-%d-%H:%M:%S-%Z")
iso_timestamp=$(gdate -Iseconds 2>/dev/null || date -Iseconds)

# Ensure progress directory exists
mkdir -p "./progress/$current_date"

# Generate unique progress entry filename
progress_file="./progress/$current_date/$timestamp.md"

echo "📝 Recording progress entry: $progress_file"
```

WHEN "view_progress" ($ARGUMENTS contains --today, --date, --all, --recent):

**Progress Viewing Operations:**

```bash
if [[ "$ARGUMENTS" == *"--today"* ]]; then
    current_date=$(gdate +%Y-%m-%d 2>/dev/null || date +%Y-%m-%d)
    echo "📅 Today's Progress ($current_date):"
    fd "\.md$" "./progress/$current_date/" 2>/dev/null | while read -r file; do
        echo "\n🕐 $(basename "$file" .md)"
        bat "$file" --style=plain 2>/dev/null || cat "$file"
    done
elif [[ "$ARGUMENTS" == *"--recent"* ]]; then
    echo "📊 Recent Progress Entries (Last 10):"
    fd "\.md$" ./progress/ -d 3 2>/dev/null | sort -V | tail -10 | while read -r file; do
        echo "\n📄 $file"
        bat "$file" --style=header 2>/dev/null || head -5 "$file"
    done
fi
```

WHEN "search_progress" ($ARGUMENTS contains search terms):

**Progress Search Operations:**

```bash
echo "🔍 Searching progress entries for: $ARGUMENTS"
if command -v rg >/dev/null 2>&1; then
    rg "$ARGUMENTS" ./progress/ --type md --context 2 --color always 2>/dev/null
else
    fd "\.md$" ./progress/ 2>/dev/null | xargs grep -l "$ARGUMENTS" | while read -r file; do
        echo "\n📄 Found in: $file"
        grep -n "$ARGUMENTS" "$file" 2>/dev/null
    done
fi
```

STEP 3: Enhanced progress entry creation with intelligent formatting

IF operation_type == "record_progress":

TRY:

**Smart Progress Entry Generation:**

```bash
# Detect project context for enhanced formatting
project_type="generic"
if fd "Cargo.toml" . -d 1 >/dev/null 2>&1; then
    project_type="rust"
elif fd "package.json" . -d 1 >/dev/null 2>&1; then
    project_type="node"
elif fd "go.mod" . -d 1 >/dev/null 2>&1; then
    project_type="go"
elif fd "pom.xml" . -d 1 >/dev/null 2>&1; then
    project_type="java"
fi

# Generate contextual progress entry
cat > "$progress_file" << EOF
# Progress Update

**Date**: $current_date
**Time**: $(gdate "+%H:%M:%S %Z" 2>/dev/null || date "+%H:%M:%S %Z")
**Project**: $(basename "$(pwd)")
**Type**: $project_type
**Session**: $SESSION_ID

## Summary

$ARGUMENTS

## Context

- Working directory: $(pwd)
- Git branch: $(git branch --show-current 2>/dev/null || echo "not a git repository")
- Recent changes: $(git log --oneline -1 2>/dev/null || echo "no git history")

## Impact

- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] Performance impact assessed
- [ ] Security considerations reviewed

---
*Generated: $iso_timestamp*
EOF

echo "✅ Progress entry recorded: $progress_file"
```

**Smart Entry Enhancement:**

```bash
# Add project-specific context
if [[ "$project_type" == "rust" ]]; then
    echo "\n## Rust Context\n" >> "$progress_file"
    echo "- Cargo features: $(fd Cargo.toml . -d 1 -x grep "^\[features\]" {} 2>/dev/null || echo 'none')" >> "$progress_file"
    echo "- Dependencies: $(fd Cargo.toml . -d 1 -x grep -c "^[a-zA-Z]" {} 2>/dev/null || echo '0') crates" >> "$progress_file"
elif [[ "$project_type" == "node" ]]; then
    echo "\n## Node.js Context\n" >> "$progress_file"
    echo "- Package manager: $(fd package-lock.json . -d 1 >/dev/null 2>&1 && echo 'npm' || echo 'other')" >> "$progress_file"
    echo "- Scripts available: $(fd package.json . -d 1 -x jq -r '.scripts | keys | length' {} 2>/dev/null || echo '0')" >> "$progress_file"
fi
```

CATCH (progress_creation_failed):

- LOG error details to session state
- PROVIDE fallback progress recording method
- SUGGEST directory permission fixes if needed

```bash
echo "⚠️ Progress entry creation failed. Checking directory permissions..."
if [[ ! -w "$(pwd)" ]]; then
    echo "❌ Current directory is not writable. Please check permissions."
else
    echo "📝 Attempting fallback progress recording..."
    echo "$(gdate -Iseconds 2>/dev/null || date -Iseconds): $ARGUMENTS" >> ./progress-fallback.txt
    echo "✅ Progress recorded in fallback file: ./progress-fallback.txt"
fi
```

STEP 4: Progress analytics and visualization

**Progress Statistics Generation:**

```bash
echo "📊 Progress Analytics:"

# Count entries by date
echo "\n📅 Entries by date:"
fd "\.md$" ./progress/ -d 3 2>/dev/null | \
    sed 's|./progress/\([0-9-]*\)/.*|\1|' | \
    sort | uniq -c | sort -nr | head -10

# Project activity summary
echo "\n🚀 Recent activity:"
total_entries=$(fd "\.md$" ./progress/ 2>/dev/null | wc -l | tr -d ' ')
today_entries=$(fd "\.md$" "./progress/$current_date/" 2>/dev/null | wc -l | tr -d ' ' || echo "0")
echo "  Total progress entries: $total_entries"
echo "  Today's entries: $today_entries"
echo "  Average per day: $(echo "scale=1; $total_entries / 7" | bc 2>/dev/null || echo "N/A")"
```

STEP 5: Session state management and progress tracking

**Update Session State:**

```bash
# Update progress session with results
jq --arg entry "$ARGUMENTS" --arg file "$progress_file" --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .progressEntry = $entry |
  .progressFile = $file |
  .completedAt = $timestamp |
  .status = "completed"
' /tmp/progress-session-$SESSION_ID.json > /tmp/progress-session-$SESSION_ID.tmp && \
mv /tmp/progress-session-$SESSION_ID.tmp /tmp/progress-session-$SESSION_ID.json
```

**Progress Session Summary:**

```bash
echo "\n✅ Progress tracking session completed"
echo "📝 Entry: $ARGUMENTS"
echo "📄 File: $progress_file"
echo "🕐 Time: $(gdate "+%H:%M:%S %Z" 2>/dev/null || date "+%H:%M:%S %Z")"
echo "⏱️ Session: $SESSION_ID"
echo "💾 State: /tmp/progress-session-$SESSION_ID.json"
```

FINALLY:

- SAVE session state for potential follow-up operations
- PROVIDE guidance for viewing and searching progress entries
- SUGGEST related workflow improvements based on project analysis

## Usage Examples

```bash
# Record development progress
/progress "Implemented user authentication with JWT tokens and refresh mechanism"

# Record debugging session
/progress "Fixed memory leak in WebSocket connection handler affecting 500+ concurrent users"

# Record refactoring work
/progress "Refactored database connection pool - reduced latency by 40% and improved error handling"

# View today's progress
/progress --today

# View recent entries
/progress --recent

# Search progress history
/progress "authentication"

# View progress statistics
/progress --stats
```

## Smart Features

### Intelligent Context Detection

- **Project Type Recognition**: Automatically detects Rust, Node.js, Go, Java projects
- **Git Integration**: Includes current branch and recent commit information
- **Session Tracking**: Maintains session state for follow-up operations
- **Modern Tools**: Leverages fd, bat, eza for enhanced performance

### Enhanced Entry Format

- **Structured Metadata**: Date, time, project context, session ID
- **Impact Checklist**: Built-in checklist for comprehensive progress tracking
- **Project-Specific Context**: Technology-specific information and metrics
- **Searchable Format**: Optimized for ripgrep and modern search tools

### Progress Analytics

- **Activity Trends**: Entries by date with statistical analysis
- **Project Metrics**: Development velocity and consistency tracking
- **Search Capabilities**: Full-text search across all progress entries
- **Export Ready**: Structured format for integration with other tools

This enhanced progress tracking command provides comprehensive development logging with intelligent project detection, modern tooling integration, and analytical capabilities for tracking development velocity and impact.