---
allowed-tools: Bash(gh pr create:*), Bash(gh pr list:*), Bash(gh auth status:*), Bash(git status:*), Bash(git push:*), Bash(git branch:*), Bash(git diff:*), Bash(git log:*), Bash(gh issue view:*), Bash(gdate:*), Bash(jq:*)
name: "Pr Create"
description: "Create pull requests with intelligent analysis and programmatic workflow"
author: "wcygan"
tags: ["git","pr"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "unknown"`
- Git status: !`git status --porcelain 2>/dev/null | wc -l | tr -d ' ' || echo "0"` uncommitted changes
- Remote status: !`git status -b --porcelain 2>/dev/null | head -1 || echo "No remote tracking"`
- Recent commits: !`git log --oneline -5 2>/dev/null || echo "No commits found"`
- Existing PR: !`gh pr list --head $(git branch --show-current 2>/dev/null || echo "main") --json number,state 2>/dev/null | jq -r '.[0].number // "none"' 2>/dev/null || echo "none"`
- GitHub auth: !`gh auth status 2>/dev/null | grep -q "Logged in" && echo "authenticated" || echo "not authenticated"`
- Arguments: $ARGUMENTS

## Your Task

STEP 1: Initialize PR creation session and validate prerequisites

- CREATE session state: `/tmp/pr-create-$SESSION_ID.json`
- VALIDATE session ID generation and file permissions
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "$(gdate -Iseconds 2>/dev/null || date -Iseconds)",
    "branch": "$(git branch --show-current)",
    "arguments": "$ARGUMENTS",
    "phase": "validation",
    "pr_config": {},
    "validation_results": {}
  }
  ```

TRY:

- VALIDATE GitHub authentication from Context
- VALIDATE git repository presence
- VALIDATE branch state and remote tracking
- SAVE validation results to session state

**Prerequisites Validation:**

IF GitHub auth != "authenticated":

- EXECUTE: `gh auth login`
- WAIT for authentication completion
- RETRY validation

IF git repository not detected:

- ERROR: "Not in a git repository. Navigate to project root or run `git init`."
- EXIT with error code

IF uncommitted changes > 0:

- WARN: "Uncommitted changes detected. Consider committing before creating PR."
- PROMPT: "Continue anyway? (y/n)"
- IF no: EXIT gracefully

CATCH (validation_failed):

- LOG specific validation failure to session state
- PROVIDE specific remediation instructions
- SAVE partial session state for recovery
- EXIT with helpful error message

STEP 2: Parse arguments and configure PR parameters

- PARSE $ARGUMENTS for PR configuration options
- SET default values for missing parameters
- VALIDATE parameter combinations
- UPDATE session state with PR configuration

**Argument Processing:**

```bash
# Parse common argument patterns
draft_mode=$(echo "$ARGUMENTS" | grep -q "draft" && echo "true" || echo "false")
base_branch=$(echo "$ARGUMENTS" | grep -oE 'base=([^\s]+)' | cut -d'=' -f2 || echo "main")
reviewers=$(echo "$ARGUMENTS" | grep -oE 'reviewers=([^\s]+)' | cut -d'=' -f2 || echo "")
labels=$(echo "$ARGUMENTS" | grep -oE 'labels=([^\s]+)' | cut -d'=' -f2 || echo "")
custom_title=$(echo "$ARGUMENTS" | grep -oE 'title="([^"]+)"' | sed 's/title="//;s/"$//' || echo "")
template=$(echo "$ARGUMENTS" | grep -oE 'template=([^\s]+)' | cut -d'=' -f2 || echo "")
```

STEP 3: Intelligent change analysis and PR content generation

Think deeply about the optimal PR content generation strategy based on commit history, file changes, and project conventions.

TRY:

- ANALYZE commit history for conventional commit patterns
- EXAMINE file changes for scope and impact
- GENERATE intelligent PR title and description
- DETECT related issues from branch name or commits
- IDENTIFY appropriate reviewers from CODEOWNERS or git history
- SAVE analysis results to session state

**Change Analysis Execution:**

```bash
# Get base branch (fallback chain)
base_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo "main")

# Analyze commits and changes
commit_messages=$(git log --pretty=format:"%s" origin/$base_branch...HEAD 2>/dev/null || echo "")
file_changes=$(git diff --name-status origin/$base_branch...HEAD 2>/dev/null || echo "")
change_summary=$(git diff --stat origin/$base_branch...HEAD 2>/dev/null || echo "")

# Extract issue numbers from branch or commits
issue_numbers=$(echo "$(git branch --show-current)\n$commit_messages" | grep -oE '#[0-9]+' | sort -u || echo "")

# Check for existing PR
existing_pr=$(gh pr list --head $(git branch --show-current) --json number,state 2>/dev/null | jq -r '.[0].number // "none"' 2>/dev/null || echo "none")
```

**Title Generation Logic:**

IF custom_title provided:

- USE custom_title as PR title

ELSE IF single commit with conventional format:

- EXTRACT title from commit message
- VALIDATE conventional commit format

ELSE:

- ANALYZE file changes for primary scope
- GENERATE title based on change patterns
- FORMAT: "type(scope): description"

CATCH (analysis_failed):

- LOG analysis failure details
- FALLBACK to generic title generation
- CONTINUE with available information

STEP 4: Handle existing PR or create new PR

IF existing_pr != "none":

- LOG: "PR #$existing_pr already exists for this branch"
- PROMPT: "Update existing PR or create new one? (update/new/cancel)"
- CASE user_choice:
  - "update": EXECUTE PR update workflow
  - "new": CONTINUE with new PR creation
  - "cancel": EXIT gracefully

ELSE:

- PROCEED with new PR creation

STEP 5: Execute PR creation with intelligent content

- ENSURE branch is pushed to remote
- BUILD PR body from template or generate intelligently
- COLLECT all PR parameters (title, body, reviewers, labels, etc.)
- EXECUTE `gh pr create` with generated content
- SAVE PR details to session state

**PR Creation Execution:**

```bash
# Ensure branch is pushed
git push -u origin $(git branch --show-current) 2>/dev/null || echo "Branch already pushed"

# Build PR creation command
gh pr create \
  --title "$generated_title" \
  --body "$(cat <<'EOF'
## Summary

$generated_summary

## Changes

$change_list

## Test Plan

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Related Issues

$issue_links
EOF
)" \
  $(test "$draft_mode" = "true" && echo "--draft" || echo "") \
  --assignee @me \
  $(test -n "$reviewers" && echo "--reviewer $reviewers" || echo "") \
  $(test -n "$labels" && echo "--label $labels" || echo "") \
  --base "$base_branch"
```

TRY:

- EXECUTE PR creation command with all parameters
- CAPTURE PR URL and number from output
- VALIDATE PR creation success
- UPDATE session state with PR details

CATCH (pr_creation_failed):

- LOG specific failure reason (auth, network, validation, etc.)
- PROVIDE targeted remediation steps
- SAVE session state with failure details
- OFFER retry with corrected parameters

STEP 6: Post-creation workflow and cleanup

- DISPLAY PR creation success message with URL
- SAVE final session state with completion status
- OPTIONALLY trigger CI/CD workflows if detected
- CLEAN UP temporary session files

**Advanced Features Integration:**

**Smart Reviewer Detection:**

IF CODEOWNERS file exists:

- PARSE CODEOWNERS for files in changeset
- EXTRACT relevant reviewers for modified files
- SUGGEST reviewers if not explicitly provided

**Issue Linking:**

FOR EACH issue number detected:

- VALIDATE issue exists with `gh issue view`
- ADD appropriate linking keywords ("Fixes #123", "Related to #456")
- INCLUDE issue context in PR description

**Template Support:**

IF template specified:

- VALIDATE template exists in `.github/pull_request_template/`
- LOAD template content for PR body
- MERGE template with generated content

**CI/CD Integration:**

IF test files or deployment configs changed:

- ADD CI trigger comments to PR body
- SUGGEST appropriate test commands
- INCLUDE deployment preview requests

FINALLY:

- ARCHIVE session data: `/tmp/pr-create-archive-$SESSION_ID.json`
- REPORT completion status with metrics
- CLEAN UP temporary files (EXCEPT archived data)
- LOG session completion timestamp

## Usage Examples

- `/pr` - Create PR with intelligent defaults
- `/pr draft` - Create draft PR for work in progress
- `/pr reviewers=alice,bob` - Add specific reviewers
- `/pr base=develop` - Target different base branch
- `/pr labels=bug,priority-high` - Add labels
- `/pr title="Custom PR title"` - Override generated title
- `/pr template=feature` - Use specific PR template

## Error Recovery

- **Authentication failed**: Automatically runs `gh auth login`
- **Branch not pushed**: Automatically pushes with tracking
- **Existing PR detected**: Offers update or new PR options
- **Network issues**: Provides retry with exponential backoff
- **Validation errors**: Specific remediation for each error type

## State Management

- Session state tracks progress through each step
- Resumable from last successful checkpoint
- Automatic cleanup of stale session files
- Comprehensive error logging for debugging