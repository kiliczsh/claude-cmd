---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
name: "Commit"
description: "Create a git commit"
author: "wcygan"
tags: ["git","commit"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Generate a conventional commit message following https://www.conventionalcommits.org/en/v1.0.0/ specification and create the commit automatically.

STEP 1: Analyze current git state and changes

- EXAMINE output from Context section for current status
- DETERMINE if there are staged changes ready for commit
- IF no staged changes found:
  - IDENTIFY unstaged changes that should be committed
  - STAGE appropriate files using `git add`
- VALIDATE that commit is appropriate (not empty, not work-in-progress)

STEP 2: Determine conventional commit type and scope

- ANALYZE the nature of changes from git diff output
- CATEGORIZE changes using conventional commit types:
  - `feat`: New feature or functionality
  - `fix`: Bug fix or issue resolution
  - `docs`: Documentation changes only
  - `style`: Code style changes (formatting, missing semicolons, etc.)
  - `refactor`: Code changes that neither fix bugs nor add features
  - `test`: Adding or modifying tests
  - `chore`: Maintenance tasks (dependencies, build tools, etc.)
  - `ci`: Continuous integration changes
  - `perf`: Performance improvements
  - `revert`: Revert previous commits

- IDENTIFY scope if applicable:
  - Component, module, or functional area affected
  - Examples: `auth`, `api`, `ui`, `core`, `config`

STEP 3: Compose conventional commit message

- WRITE concise subject line (≤50 characters):
  - Format: `type(scope): description`
  - Use imperative mood ("add" not "added" or "adds")
  - Start with lowercase letter
  - No period at the end

- IF change is complex:
  - ADD detailed body (wrap at 72 characters)
  - EXPLAIN the "why" behind the change
  - SEPARATE body from subject with blank line

- IF breaking change:
  - ADD footer: `BREAKING CHANGE: description`
  - EXPLAIN the impact and migration path

STEP 4: Create the commit

TRY:

- EXECUTE `git commit` with generated message
- USE heredoc for multi-line messages to ensure proper formatting
- VERIFY commit creation success

CATCH (commit_failed):

- ANALYZE error message
- PROVIDE guidance on resolution
- SUGGEST alternative approaches

STEP 5: Validate commit result

- CONFIRM commit was created successfully
- DISPLAY commit hash and message
- PROVIDE summary of what was committed

Example formats:

- `feat(auth): add OAuth2 login support`
- `fix(api): resolve null pointer in user endpoint`
- `docs: update installation instructions`
- `chore(deps): bump lodash to 4.17.21`
- `refactor(core): extract user validation logic`