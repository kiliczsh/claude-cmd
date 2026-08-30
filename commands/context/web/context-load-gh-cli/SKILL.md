---
allowed-tools: Read, Write, Bash(gh:*), Bash(git:*), Bash(jq:*), Bash(gdate:*)
name: "Context Load Gh Cli"
description: "Load comprehensive GitHub CLI context with dynamic repository analysis and workflow optimization"
author: "wcygan"
tags: ["context","web"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "Yes" || echo "No"`
- Repository info: !`gh repo view --json owner,name,url 2>/dev/null | jq -r '.owner.login + "/" + .name + " (" + .url + ")' 2>/dev/null || echo "Not in GitHub repository"`
- GitHub CLI status: !`gh auth status 2>/dev/null | head -1 || echo "Not authenticated"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`
- Open PRs: !`gh pr list --json number,title --limit 3 2>/dev/null | jq -r '.[] | "#" + (.number | tostring) + ": " + .title' 2>/dev/null || echo "No open PRs or no access"`
- Open issues: !`gh issue list --json number,title --limit 3 2>/dev/null | jq -r '.[] | "#" + (.number | tostring) + ": " + .title' 2>/dev/null || echo "No open issues or no access"`
- Recent commits: !`git log --oneline -5 2>/dev/null || echo "No git history"`
- Git status: !`git status --porcelain 2>/dev/null || echo "No git repository"`
- Recent activity: !`gh api user/events --limit 3 2>/dev/null | jq -r '.[0:2][] | .type + ": " + .repo.name + " (" + (.created_at | split("T")[0]) + ")' 2>/dev/null || echo "No recent activity or no access"`

## Your Task

STEP 1: Initialize GitHub CLI context analysis session

- CREATE session state file: `/tmp/gh-cli-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "$(date -Iseconds)",
    "repositoryContext": {
      "isGitRepo": "auto-detect",
      "repoInfo": "auto-detect",
      "currentBranch": "auto-detect",
      "hasOpenPRs": "auto-detect",
      "hasOpenIssues": "auto-detect"
    },
    "githubCliStatus": {
      "isInstalled": "auto-detect",
      "isAuthenticated": "auto-detect",
      "authenticatedUser": "auto-detect"
    },
    "loadedSections": [],
    "contextualExamples": {},
    "workflowPatterns": []
  }
  ```
- ANALYZE current GitHub and repository context from Context section

STEP 2: GitHub CLI environment validation and setup

TRY:

- VERIFY GitHub CLI installation and authentication status
- DETECT current repository context and permissions
- IDENTIFY available GitHub operations based on authentication level
- ASSESS repository-specific workflow patterns

CATCH (github_cli_not_available):

- LOG GitHub CLI installation status to session state
- PROVIDE installation guidance for missing CLI
- INCLUDE authentication setup instructions
- SAVE fallback web-based GitHub operation guidance

STEP 3: Dynamic context-aware GitHub CLI guidance loading

IF isAuthenticated AND isGitRepo:

- LOAD repository-specific GitHub CLI patterns
- GENERATE contextual examples for current repository
- INCLUDE workflow optimizations for detected repository patterns
- ADD current PR/issue context for immediate operations

ELSE IF isAuthenticated AND NOT isGitRepo:

- LOAD general GitHub CLI operations guidance
- FOCUS on repository discovery and organization management
- INCLUDE authentication and organization-level operations
- PROVIDE repository creation and cloning patterns

ELSE IF NOT isAuthenticated:

- LOAD basic GitHub CLI authentication guidance
- PROVIDE setup and configuration instructions
- INCLUDE authentication troubleshooting and alternatives
- ADD web-based GitHub operation fallbacks

STEP 4: Comprehensive GitHub CLI knowledge synthesis

FOR EACH workflow_category IN ["pull-requests", "issues", "reviews", "api-operations", "authentication"]:

- LOAD category-specific command patterns and best practices
- GENERATE contextual examples based on current repository state
- INCLUDE advanced operations and troubleshooting guidance
- ADD workflow optimization recommendations
- SAVE category knowledge to session state

STEP 5: Repository-specific workflow analysis and recommendations

IF repository detected AND has_open_issues_or_prs:

Think deeply about optimal GitHub workflow patterns for this repository based on current activity, open PRs, and issue patterns.

- ANALYZE current PR and issue patterns for workflow optimization
- IDENTIFY common operations that could be automated or streamlined
- GENERATE repository-specific GitHub CLI command templates
- PROVIDE workflow efficiency recommendations

STEP 6: Extended thinking integration for complex scenarios

IF complex_repository_patterns_detected:

- Enable extended thinking for complex GitHub workflow optimization
- Consider multi-repository coordination scenarios
- Analyze enterprise GitHub patterns and governance requirements
- Provide advanced automation and integration strategies

STEP 7: Session state management and artifact creation

- UPDATE session state with loaded knowledge and contextual examples
- SAVE repository-specific GitHub CLI templates: `/tmp/gh-cli-context-$SESSION_ID/repo-templates.md`
- CREATE workflow optimization guide: `/tmp/gh-cli-context-$SESSION_ID/workflow-optimization.md`
- GENERATE session summary with key recommendations and next steps

FINALLY:

- CLEAN UP temporary processing files
- ARCHIVE session artifacts for future reference
- REPORT comprehensive GitHub CLI context loading completion

## GitHub CLI (`gh`) Comprehensive Knowledge Base

### Core GitHub CLI Operations Framework

## Overview

This guide provides comprehensive instructions for leveraging the GitHub CLI (`gh`) to manage pull requests, issues, comments, and reviews.

## Pull Request Management

### Creating Pull Requests

```bash
# Interactive creation (recommended for agents)
gh pr create

# With explicit parameters
gh pr create --title "PR title" --body "PR description"

# Using HEREDOC for multi-line body (best for agents)
gh pr create --title "Fix bug" --body "$(cat <<'EOF'
## Summary
- Fixed the authentication bug
- Updated error handling

## Test plan
- [x] Unit tests pass
- [x] Manual testing completed
EOF
)"

# Additional options
gh pr create --base main --head feature-branch --draft
gh pr create --reviewer username1,username2
gh pr create --assignee @me
gh pr create --label "bug,priority"
gh pr create --project "Roadmap"
```

### Managing Pull Requests

```bash
# List PRs
gh pr list
gh pr list --state closed --limit 10
gh pr list --assignee @me

# View PR details
gh pr view 123
gh pr view --json state,title,body,reviews
gh pr view --web  # Open in browser

# Check PR status
gh pr status

# Check out PR
gh pr checkout 123
gh pr checkout branch-name

# Close/reopen PR
gh pr close 123
gh pr close 123 -d  # Delete branch
gh pr reopen 123

# View PR diff
gh pr diff 123

# Merge PR
gh pr merge --auto --squash
```

## Issue Management

### Creating Issues

```bash
# Interactive creation
gh issue create

# With parameters
gh issue create --title "Bug report" --body "Description"

# With labels and assignees
gh issue create --title "Feature request" --label "enhancement" --assignee username

# Open in browser
gh issue create --web
```

### Managing Issues

```bash
# List issues
gh issue list
gh issue list --state closed --assignee @me
gh issue list -A "username"  # Assigned to specific person

# View issue
gh issue view 123
gh issue view 123 --web

# Check issue status
gh issue status

# Close/reopen issue
gh issue close 123
gh issue reopen 123
```

## Comments

### PR Comments

```bash
# Add comment to current branch's PR
gh pr comment --body "LGTM!"

# Short form
gh pr comment -b "rfm"

# Comment on specific PR
gh pr comment 123 --body "Please update the tests"

# Interactive mode (opens editor)
gh pr comment 123
```

### Issue Comments

```bash
# Comment on issue (opens editor)
gh issue comment 123

# With body flag (not currently supported, use editor mode)
# Note: Issue comments currently require interactive editor
```

## Reviews

### Creating Reviews

```bash
# Approve PR
gh pr review --approve

# Request changes
gh pr review --request-changes --body "Please address the following issues"

# Comment review
gh pr review --comment --body "Some thoughts on this approach"

# Review specific PR
gh pr review 123 --approve
gh pr review 123 -r -b "needs more changes"
```

### Viewing Reviews and Comments

**Current Limitations**: The CLI has limited support for viewing review comments. Use these workarounds:

```bash
# Get reviews (limited info - body, state, author only)
gh pr view 123 --json reviews

# Use API for detailed review data
gh api repos/{owner}/{repo}/pulls/{pull_number}/reviews

# Get review comments
gh api repos/{owner}/{repo}/pulls/{pull_number}/comments

# Get pending review requests for current user
gh api search/issues --raw-field q="is:pr is:open review-requested:@me"
```

## Advanced API Usage

### Fetching Detailed Review Information

```bash
# Get all reviews with comments
gh api repos/{owner}/{repo}/pulls/{pull_number}/reviews

# Get specific review
gh api repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}

# List review comments
gh api repos/{owner}/{repo}/pulls/{pull_number}/comments

# Get comments with HTML formatting
gh api repos/{owner}/{repo}/pulls/{pull_number}/comments \
  --header "Accept: application/vnd.github-commitcomment.html+json"
```

### Working with Reviewers

```bash
# Add reviewers
gh api repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers \
  --method POST \
  --field reviewers[]="user1" \
  --field reviewers[]="user2" \
  --field team_reviewers[]="team-name"

# Remove reviewers
gh api repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers \
  --method DELETE \
  --field reviewers[]="user1"
```

### Creating Pending Reviews

```bash
# Create a pending review (leave event blank)
gh api repos/{owner}/{repo}/pulls/{pull_number}/reviews \
  --method POST \
  --field body="This is a pending review" \
  --field comments[0][path]="file.txt" \
  --field comments[0][position]=1 \
  --field comments[0][body]="Comment on line 1"

# Submit a pending review
gh api repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events \
  --method POST \
  --field event="APPROVE"
```

### Useful API Queries

```bash
# Get all PRs with pending reviews
gh api repos/{owner}/{repo}/pulls \
  --jq '.[] | select(.requested_reviewers | length > 0) | {number, title, requested_reviewers}'

# Search for PRs requesting your review
gh api search/issues \
  --raw-field q="is:pr is:open review-requested:@me"

# Get PR checks status
gh api repos/{owner}/{repo}/commits/{ref}/check-runs
```

## Linking Issues to PRs

Include these keywords in PR body to auto-close issues:

- `Fixes #123`
- `Closes #123`
- `Resolves #123`

Example:

```bash
gh pr create --body "This fixes #123 and closes #456"
```

## Agent Best Practices

1. **Use HEREDOC for multi-line content** to ensure proper formatting:
   ```bash
   gh pr create --title "Feature" --body "$(cat <<'EOF'
   Multi-line
   content here
   EOF
   )"
   ```

2. **Check current state before actions** using view commands:
   ```bash
   gh pr view 123 --json state
   ```

3. **Prefer explicit parameters** over interactive mode for clarity

4. **Use JSON output** for parsing:
   ```bash
   gh pr list --json number,title,state
   ```

5. **Handle errors gracefully** - check if PR/issue exists before commenting

6. **Use the API directly** for complex review operations not supported by CLI commands

7. **Always specify the repo** when not in a git repository:
   ```bash
   gh pr list --repo owner/repo
   ```

## Example Workflow for Agent

```bash
# 1. Check current PR status
gh pr status

# 2. Create PR with comprehensive information
gh pr create --title "Feature: Add authentication" --body "$(cat <<'EOF'
## Summary
- Implemented OAuth2 authentication
- Added user session management

## Test plan
- [x] Unit tests for auth module
- [x] Integration tests for login flow
- [x] Manual testing on staging
EOF
)"

# 3. Add reviewers using API
gh api repos/{owner}/{repo}/pulls/{pr_number}/requested_reviewers \
  --method POST \
  --field reviewers[]="senior-dev"

# 4. Monitor reviews
gh pr view --json reviews,state

# 5. Respond to feedback
gh pr comment --body "Thanks for the review! I've addressed all the comments."

# 6. Check CI status
gh pr checks

# 7. After approval, merge
gh pr merge --auto --squash
```

## Common Error Handling

```bash
# Check if PR exists before commenting
if gh pr view 123 &>/dev/null; then
    gh pr comment 123 --body "Comment"
else
    echo "PR #123 does not exist"
fi

# Check if you have permissions
gh api repos/{owner}/{repo} --silent || echo "No access to repo"
```

## Limitations & Workarounds

1. **Cannot view inline review comments directly** - Use `gh pr view --web` or API
2. **Limited support for viewing pending reviews** - Use API queries
3. **Review thread discussions require API access** - Not available in CLI
4. **Issue comments don't support --body flag** - Must use interactive editor

For operations not supported by the CLI, use `gh api` to access the full GitHub REST API.