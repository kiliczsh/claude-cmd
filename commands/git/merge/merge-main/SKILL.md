---
allowed-tools: Bash(git:*), Read, Write, Edit, MultiEdit
name: "Merge Main"
description: "Merge the main git branch into the current git branch and resolve merge conflicts"
author: "wcygan"
tags: ["git","merge"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current branch: !`git branch --show-current`
- Git status: !`git status --porcelain`
- Uncommitted changes: !`git diff --name-only`
- Staged changes: !`git diff --cached --name-only`
- Main branch status: !`git log --oneline main -5`
- Current branch commits ahead of main: !`git log --oneline main..HEAD`
- Current branch commits behind main: !`git log --oneline HEAD..main`

## Your task

Merge the main branch into the current branch with intelligent conflict resolution using this programmatic approach:

## Program Definition

```
INPUT: current_branch = !`git branch --show-current`
STATE_FILE: /tmp/merge-state-$SESSION_ID.json
BACKUP_BRANCH: backup-before-merge-$SESSION_ID
```

## Main Program

**STEP 1: Pre-merge validation and safety checks**

```
IF current_branch == "main":
  PRINT "Error: Cannot merge main into itself"
  EXIT 1

IF uncommitted_changes OR staged_changes:
  PRINT "Error: Working directory not clean"
  PRINT "Please commit or stash changes before merging"
  EXIT 1

IF main_branch_not_exists:
  PRINT "Error: Main branch does not exist"
  EXIT 1
```

**STEP 2: Create safety backup**

```
PROCEDURE create_backup():
  git branch $BACKUP_BRANCH
  echo "Created backup branch: $BACKUP_BRANCH"
  
  state = {
    "session_id": "$SESSION_ID",
    "original_branch": "$current_branch", 
    "backup_branch": "$BACKUP_BRANCH",
    "merge_started": false,
    "conflicts_resolved": false,
    "merge_completed": false
  }
  
  save_state_to_file(state)
```

**STEP 3: Attempt automatic merge**

```
PROCEDURE attempt_merge():
  echo "Fetching latest main branch..."
  git fetch origin main
  
  echo "Attempting to merge main into $current_branch..."
  merge_result = git merge main
  
  IF merge_result.success:
    state.merge_completed = true
    save_state_to_file(state)
    echo "✅ Merge completed successfully without conflicts"
    cleanup_session()
    EXIT 0
  ELSE:
    state.merge_started = true
    save_state_to_file(state)
    echo "⚠️ Merge conflicts detected. Entering conflict resolution mode..."
    CALL resolve_conflicts()
```

**STEP 4: Interactive conflict resolution**

```
PROCEDURE resolve_conflicts():
  conflicted_files = git diff --name-only --diff-filter=U
  
  echo "Conflicted files:"
  FOR EACH file IN conflicted_files:
    echo "  - $file"
  
  echo "\nConflict resolution options:"
  echo "1. Open each conflicted file for manual resolution"
  echo "2. Accept all changes from main branch"
  echo "3. Accept all changes from current branch"
  echo "4. Abort merge and restore backup"
  
  WHILE conflicts_exist():
    current_conflicts = git diff --name-only --diff-filter=U
    
    FOR EACH file IN current_conflicts:
      echo "\n📝 Resolving conflicts in: $file"
      
      # Show conflict markers context
      echo "Conflict preview:"
      rg -A 5 -B 5 "<<<<<<< HEAD" "$file" || echo "Complex conflict pattern"
      
      echo "\nChoose resolution strategy for $file:"
      echo "1. Edit manually"
      echo "2. Take main branch version"
      echo "3. Take current branch version"
      echo "4. Skip for now"
      
      # Manual editing approach
      echo "Opening $file for manual conflict resolution..."
      echo "Please:"
      echo "  - Remove conflict markers (<<<<<<< HEAD, =======, >>>>>>> main)"
      echo "  - Choose the desired code from both versions"
      echo "  - Save the file when done"
      
      # Mark as resolved
      git add "$file"
      echo "✅ Marked $file as resolved"
    
    remaining_conflicts = git diff --name-only --diff-filter=U
    IF no_conflicts_remaining:
      BREAK
  
  state.conflicts_resolved = true
  save_state_to_file(state)
```

**STEP 5: Complete merge and validate**

```
PROCEDURE complete_merge():
  IF all_conflicts_resolved:
    echo "Completing merge..."
    git commit -m "Merge main into $(git branch --show-current)
    
Resolved conflicts in:
$(git diff --name-only --cached | sed 's/^/  - /')"
    
    state.merge_completed = true
    save_state_to_file(state)
    
    echo "✅ Merge completed successfully!"
    echo "📊 Merge summary:"
    git log --oneline -1
    
    cleanup_session()
  ELSE:
    echo "❌ Merge incomplete - conflicts remain"
    echo "Run the command again to continue conflict resolution"
```

**STEP 6: Error handling and recovery**

```
PROCEDURE handle_abort():
  echo "Aborting merge and restoring backup..."
  git merge --abort
  git checkout "$BACKUP_BRANCH"
  git branch -D "$original_branch"
  git checkout -b "$original_branch"
  git branch -D "$BACKUP_BRANCH"
  echo "✅ Restored to pre-merge state"
  cleanup_session()

PROCEDURE cleanup_session():
  IF exists("$BACKUP_BRANCH"):
    echo "Cleaning up backup branch: $BACKUP_BRANCH"
    git branch -D "$BACKUP_BRANCH"
  
  rm -f "/tmp/merge-state-$SESSION_ID.json"
  echo "Session cleanup complete"
```

## Execution Flow

1. **Validate** current state and prerequisites
2. **Create backup** branch for safety
3. **Attempt automatic merge** from main
4. **IF conflicts**: Enter interactive resolution mode
5. **Complete merge** with descriptive commit message
6. **Cleanup** temporary files and backup branch

## Recovery Options

If merge fails or is interrupted:

- Backup branch available: `backup-before-merge-$SESSION_ID`
- State file tracks progress: `/tmp/merge-state-$SESSION_ID.json`
- Can abort with: `git merge --abort`
- Can resume conflict resolution by re-running command

## Safety Features

- ✅ Creates backup branch before starting
- ✅ Validates clean working directory
- ✅ Prevents merging main into itself
- ✅ Provides detailed conflict context
- ✅ Allows selective conflict resolution
- ✅ Generates descriptive merge commit messages
- ✅ Supports abort and recovery operations