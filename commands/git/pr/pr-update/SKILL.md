---
allowed-tools: Bash(gh pr edit:*), Bash(gh pr view:*), Bash(gh pr list:*), Bash(gh pr ready:*), Bash(gh pr close:*), Bash(gh pr reopen:*), Bash(gh label list:*), Bash(git branch:*), Bash(git status:*), Bash(gdate:*)
name: "Pr Update"
description: "Update existing pull requests with comprehensive metadata management"
author: "wcygan"
tags: ["git","pr"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current PR status: !`gh pr list --head $(git branch --show-current) --json number,title,state,url -q '.[0] // {"number": "none", "title": "No PR found", "state": "N/A", "url": "N/A"}' 2>/dev/null || echo '{"number": "none", "title": "No PR found", "state": "N/A", "url": "N/A"}'`
- Git branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -3`
- Available labels: !`gh label list --json name -q '.[].name' | head -10 | tr '\n' ',' | sed 's/,$//' || echo "No labels found"`
- Repository info: !`gh repo view --json name,owner -q '.owner.login + "/" + .name' || echo "No repo info"`

## Your Task

STEP 1: Initialize PR update session

- CREATE session state file: `/tmp/pr-update-state-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "timestamp": "ISO_8601_TIMESTAMP",
    "target_pr": null,
    "current_branch": "DETECTED_BRANCH",
    "requested_updates": [],
    "validation_results": {},
    "execution_log": []
  }
  ```

STEP 2: Parse arguments and determine target PR

IF $ARGUMENTS contains PR number:

- EXTRACT PR number from arguments
- VALIDATE PR exists and is accessible
- SET target_pr in session state

ELSE:

- USE current branch PR from Context section
- IF no current branch PR found:
  - LIST available PRs for user selection
  - EXIT with guidance on PR selection

STEP 3: Validate PR state and permissions

TRY:

- VERIFY PR exists and is not merged/closed (unless explicitly updating closed PR)
- CHECK write permissions on repository
- VALIDATE current PR state allows requested changes
- SAVE validation results to session state

CATCH (pr_access_error):

- LOG error details to session state
- PROVIDE helpful error message with next steps
- SUGGEST alternative approaches (permissions, PR selection)

STEP 4: Parse and validate update requests

FOR EACH update request in $ARGUMENTS:

- PARSE update type (title, body, labels, reviewers, milestone, state)
- VALIDATE update syntax and values
- CHECK for conflicting updates
- ADD to requested_updates in session state

STEP 5: Execute PR updates systematically

TRY:

- FOR EACH validated update request:
  - EXECUTE update using appropriate gh command
  - VERIFY update succeeded
  - LOG execution result to session state
  - HANDLE partial failures gracefully

**Update Execution Patterns:**

**Title Updates:**

```bash
gh pr edit $PR_NUMBER --title "$NEW_TITLE"
```

**Body Updates:**

```bash
gh pr edit $PR_NUMBER --body "$(cat <<'EOF'
$NEW_BODY_CONTENT
EOF
)"
```

**Label Management:**

```bash
# Add labels
gh pr edit $PR_NUMBER --add-label "label1,label2"

# Remove labels
gh pr edit $PR_NUMBER --remove-label "label1,label2"
```

**Reviewer Management:**

```bash
# Add reviewers
gh pr edit $PR_NUMBER --add-reviewer "user1,user2,@team"

# Remove reviewers
gh pr edit $PR_NUMBER --remove-reviewer "user1"
```

**State Changes:**

```bash
# Ready for review
gh pr ready $PR_NUMBER

# Convert to draft
gh pr edit $PR_NUMBER --draft

# Close/reopen
gh pr close $PR_NUMBER
gh pr reopen $PR_NUMBER
```

CATCH (update_execution_failed):

- LOG specific failure details
- CONTINUE with remaining updates if possible
- PROVIDE rollback guidance for partial failures
- SAVE recovery instructions to session state

STEP 6: Verify updates and generate summary

- FETCH updated PR information
- COMPARE with requested changes
- GENERATE summary of successful updates
- IDENTIFY any failed or partial updates
- PROVIDE next steps for incomplete updates

STEP 7: Session cleanup and reporting

- ARCHIVE session state: `/tmp/pr-update-archive-$SESSION_ID.json`
- REPORT update summary with PR URL
- CLEAN UP temporary session files
- PROVIDE follow-up recommendations

FINALLY:

- ENSURE session state is preserved for debugging
- LOG completion status and timestamp

# /pr-update

Updates existing pull requests using the GitHub CLI (`gh`) with support for title, description, labels, and metadata changes.

## Usage

```
/pr-update [PR_NUMBER]
/pr-update title="New PR title" [PR_NUMBER]
/pr-update body="Updated description" [PR_NUMBER]
/pr-update add-label=bug,priority-high [PR_NUMBER]
/pr-update remove-label=wip [PR_NUMBER]
/pr-update add-reviewer=alice,bob [PR_NUMBER]
/pr-update milestone=v2.0 [PR_NUMBER]
/pr-update ready [PR_NUMBER]
/pr-update draft [PR_NUMBER]
```

## Description

This command provides comprehensive PR update capabilities through the `gh` CLI, allowing you to modify pull requests after creation without using the web interface.

### Core Workflow

#### 1. PR Identification

If no PR number provided, automatically detects current branch PR:

```bash
# Get PR for current branch
CURRENT_PR=$(gh pr list --head $(git branch --show-current) --json number -q '.[0].number')

# Verify PR exists and is open
gh pr view $PR_NUMBER --json state,number,title
```

#### 2. Update Operations

##### Title and Description

```bash
# Update PR title
gh pr edit $PR_NUMBER --title "feat: improved user authentication flow"

# Update PR body/description
gh pr edit $PR_NUMBER --body "$(cat <<'EOF'
## Summary
Updated implementation based on review feedback

## Changes
- Improved error handling
- Added comprehensive tests
- Updated documentation

## Review Notes
All previous comments have been addressed
EOF
)"

# Update both title and body
gh pr edit $PR_NUMBER --title "New title" --body "New description"
```

##### Label Management

```bash
# Add labels
gh pr edit $PR_NUMBER --add-label "bug" --add-label "priority-high"

# Remove labels
gh pr edit $PR_NUMBER --remove-label "wip" --remove-label "draft"

# Replace all labels
gh label list --json name -q '.[].name' | grep -E "^(bug|enhancement)$" | xargs -I {} gh pr edit $PR_NUMBER --add-label {}
```

##### Reviewer Management

```bash
# Add reviewers
gh pr edit $PR_NUMBER --add-reviewer alice,bob,@frontend-team

# Remove reviewers
gh pr edit $PR_NUMBER --remove-reviewer charlie

# Request review from CODEOWNERS
gh pr edit $PR_NUMBER --add-reviewer @CODEOWNERS
```

##### State Changes

```bash
# Convert draft to ready
gh pr ready $PR_NUMBER

# Convert to draft
gh pr edit $PR_NUMBER --draft

# Close PR
gh pr close $PR_NUMBER

# Reopen PR
gh pr reopen $PR_NUMBER
```

### Advanced Features

#### Smart Description Updates

The command can intelligently append to existing descriptions:

```bash
# Get current body
CURRENT_BODY=$(gh pr view $PR_NUMBER --json body -q .body)

# Append update section
UPDATED_BODY="$CURRENT_BODY

## Update $(date +%Y-%m-%d)
- Addressed review feedback
- Fixed failing tests
- Updated documentation"

gh pr edit $PR_NUMBER --body "$UPDATED_BODY"
```

#### Bulk Updates

```bash
# Update all PRs with a specific label
gh pr list --label "needs-update" --json number -q '.[].number' | \
  xargs -I {} gh pr edit {} --remove-label "needs-update" --add-label "updated"

# Add milestone to multiple PRs
for pr in $(gh pr list --author @me --json number -q '.[].number'); do
  gh pr edit $pr --milestone "v2.0"
done
```

#### Review Response Automation

```bash
# After addressing review comments
/pr-update ready remove-label=changes-requested add-label=ready-for-review

# Mark PR as WIP while making changes
/pr-update draft add-label=wip title="WIP: $(gh pr view --json title -q .title)"
```

## Examples

### Basic Updates

```bash
# Update current branch PR title
/pr-update title="feat: add user profile management"

# Update PR #123 description
/pr-update body="Updated with review feedback" 123
```

### Label Management

```bash
# Add bug label to current PR
/pr-update add-label=bug

# Remove WIP and add ready labels
/pr-update remove-label=wip add-label=ready-for-review
```

### Reviewer Updates

```bash
# Add reviewers to PR #456
/pr-update add-reviewer=alice,bob 456

# Request review from team
/pr-update add-reviewer=@backend-team
```

### State Transitions

```bash
# Mark PR as ready for review
/pr-update ready

# Convert back to draft
/pr-update draft
```

### Comprehensive Update

```bash
# Update everything at once
/pr-update \
  title="feat: complete authentication system" \
  add-label=enhancement,security \
  remove-label=wip \
  add-reviewer=@security-team \
  milestone=Q4-2024 \
  ready
```

## Update Patterns

### Post-Review Updates

After addressing review feedback:

```bash
# 1. Update PR description with changes made
/pr-update body="$(cat <<'EOF'
[Previous description...]

## Updates Based on Review

- ✅ Fixed error handling as suggested by @alice
- ✅ Added comprehensive test coverage
- ✅ Updated documentation
- ✅ Refactored authentication logic

All review comments have been addressed.
EOF
)"

# 2. Update labels and request re-review
/pr-update remove-label=changes-requested add-label=ready-for-review
```

### Work-in-Progress Updates

```bash
# Mark as WIP
/pr-update draft add-label=wip title="WIP: $(gh pr view --json title -q .title)"

# When ready
/pr-update ready remove-label=wip title="$(gh pr view --json title -q .title | sed 's/WIP: //')"
```

### Milestone and Project Updates

```bash
# Assign to milestone
/pr-update milestone="v2.0-release"

# Add to project (requires project ID)
gh pr edit $PR_NUMBER --project "MyProject"
```

## Integration with CI/CD

The command can trigger CI/CD actions through description updates:

```bash
# Trigger specific tests
/pr-update body="$(gh pr view --json body -q .body)

/test integration
/test performance"

# Trigger deployment
/pr-update body="$(gh pr view --json body -q .body)

/deploy staging"
```

## Error Handling

- **PR not found**: Lists PRs and helps identify correct number
- **Permission denied**: Checks if you have write access
- **Invalid labels**: Shows available labels for the repository
- **Reviewer not found**: Validates reviewer usernames/teams
- **Conflicting states**: Prevents invalid state transitions

## Best Practices

1. **Always explain updates**: When updating description, add context about what changed
2. **Use semantic labels**: Follow team conventions for label naming
3. **Batch related updates**: Combine multiple updates in single command
4. **Preserve history**: Append to descriptions rather than replacing
5. **Communicate changes**: Mention significant updates in PR comments

## See Also

- `/pr` - Create pull requests
- `/pr-review` - Review pull requests
- `/pr-check` - Check PR and CI/CD status