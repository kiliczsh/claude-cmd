---
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git branch:*), Bash(gh pr create:*), Bash(git log:*)
name: "Cpr"
description: "Create commit, push, and open pull request"
author: "wcygan"
tags: ["tool"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Current git status: !`git status --porcelain`
- Current branch: !`git branch --show-current`
- Remote tracking: !`git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || echo "No upstream branch"`
- Recent commits: !`git log --oneline -5`

## Your task

PROCEDURE create_commit_push_pr():

STEP 1: Analyze current state

- IF no staged changes:
  - Review unstaged changes: !`git diff --stat`
  - Stage appropriate files: git add <files>
- ELSE:
  - Review staged changes: !`git diff --cached --stat`

STEP 2: Create commit

- IF $ARGUMENTS provided:
  - Use as commit message
- ELSE:
  - Analyze changes: !`git diff --cached`
  - Generate conventional commit message
- Execute: git commit -m "$(cat <<'EOF'
  [Generated or provided message]
  EOF
  )"

STEP 3: Push to remote

- Current branch: !`git branch --show-current`
- IF no upstream branch:
  - Push with upstream: git push -u origin [branch-name]
- ELSE:
  - Push normally: git push

STEP 4: Create pull request

- Base branch: Determine from git config or default to main
- Generate PR title from commit message
- Create PR: gh pr create --title "[title]" --body "$(cat <<'EOF'

## Summary

[Brief description of changes]

## Changes

- [Key change 1]
- [Key change 2]

## Test Plan

- [ ] Tests pass
- [ ] Manual testing completed
      EOF
      )"

STEP 5: Return result

- Display PR URL
- Provide next steps if needed