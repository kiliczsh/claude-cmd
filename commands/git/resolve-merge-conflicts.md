---
allowed-tools: Bash(git status:*), Bash(git show:*), Bash(git log:*), Bash(git diff:*), Bash(git merge:*), Bash(git add:*), Bash(git commit:*), Bash(rg:*), Bash(fd:*), Read, Write, Edit
name: "Resolve Merge Conflicts"
description: "Resolve git merge conflicts with intelligent context analysis"
author: "wcygan"
tags: ["git"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current git status: !`git status --porcelain`
- Current branch: !`git branch --show-current`
- Merge head info: !`git show --oneline --no-patch MERGE_HEAD 2>/dev/null || echo "No active merge"`
- Conflicted files: !`git diff --name-only --diff-filter=U 2>/dev/null || echo "No conflicts"`
- Recent commits on current branch: !`git log --oneline -5`
- Incoming commits: !`git log --oneline HEAD..MERGE_HEAD 2>/dev/null || echo "No merge in progress"`

## Your Task

Resolve git merge conflicts by analyzing the context of incoming commits and current branch changes.

**STEP 1: Validate Merge Conflict State**

IF no merge conflicts detected:

- PRINT "No active merge conflicts found"
- SUGGEST checking if user needs to start a merge operation
- EXIT with guidance

IF merge conflicts found:

- CONTINUE to conflict analysis

**STEP 2: Comprehensive Conflict Analysis with Parallel Investigation**

Think deeply about the optimal conflict resolution strategy based on merge complexity and file types involved.

FOR complex merges (>5 conflicted files OR complex semantic conflicts):

**CRITICAL: Deploy parallel sub-agents for comprehensive conflict analysis (7-9x faster resolution planning)**

IMMEDIATELY launch 6 specialized conflict analysis agents:

- **Agent 1: Structural Conflict Analysis**: Analyze code structure and architectural conflicts
  - Focus: Class definitions, function signatures, import statements, module organization
  - Tools: AST analysis, structural diff comparison, dependency impact assessment
  - Output: Structural resolution strategy with refactoring recommendations

- **Agent 2: Semantic Conflict Analysis**: Examine logical conflicts and business rule changes
  - Focus: Business logic differences, algorithm changes, behavioral modifications
  - Tools: Semantic analysis, test impact assessment, behavior comparison
  - Output: Semantic resolution approach with integration testing requirements

- **Agent 3: Data Flow Conflict Analysis**: Investigate data handling and transformation conflicts
  - Focus: Variable assignments, data transformations, API contracts, database changes
  - Tools: Data flow analysis, contract validation, schema compatibility checking
  - Output: Data flow resolution with migration and compatibility strategies

- **Agent 4: Configuration Conflict Analysis**: Resolve environment and configuration conflicts
  - Focus: Config files, environment variables, build settings, deployment configurations
  - Tools: Configuration comparison, environment analysis, dependency resolution
  - Output: Configuration merge strategy with environment-specific considerations

- **Agent 5: Test Conflict Analysis**: Analyze test code conflicts and coverage impact
  - Focus: Test modifications, mock updates, assertion changes, test data conflicts
  - Tools: Test analysis, coverage impact assessment, test strategy evaluation
  - Output: Test resolution plan with coverage maintenance and quality assurance

- **Agent 6: Documentation Conflict Analysis**: Resolve documentation and comment conflicts
  - Focus: README changes, API documentation, inline comments, architectural documentation
  - Tools: Documentation analysis, consistency checking, information architecture review
  - Output: Documentation merge strategy with consistency and completeness validation

**Sub-Agent Coordination:**

- Each agent saves findings to `/tmp/merge-conflict-agents-$SESSION_ID/`
- Parallel analysis provides 7-9x speed improvement over sequential conflict resolution
- Cross-agent correlation identifies interdependent conflicts requiring coordinated resolution
- Results synthesized into comprehensive resolution plan with risk assessment and rollback procedures

FOR simple merges (≤5 files with straightforward conflicts):

Execute sequential conflict analysis:

FOR EACH conflicted file:

1. **Read the conflicted file** to understand conflict markers
2. **Analyze incoming changes** from MERGE_HEAD commits
3. **Analyze current branch changes** since common ancestor
4. **Identify conflict patterns**:
   - Simple text conflicts (different lines)
   - Structural conflicts (function signatures, imports)
   - Semantic conflicts (logic changes)
   - Formatting conflicts (whitespace, style)

**STEP 3: Categorize Conflicts by Resolution Strategy**

**Automatic Resolution Candidates:**

- Formatting-only conflicts (whitespace, indentation)
- Import/dependency ordering conflicts
- Non-overlapping function additions
- Comment-only changes

**Manual Resolution Required:**

- Logic conflicts in same function
- Conflicting variable names or types
- Architectural changes
- Security-sensitive modifications

**STEP 4: Generate Resolution Plan**

CREATE resolution plan with:

1. **File-by-file analysis** showing:
   - Nature of conflicts
   - Recommended resolution approach
   - Code context around conflicts
   - Explanation of incoming vs current changes

2. **Safety checks**:
   - Identify potentially breaking changes
   - Flag security-sensitive modifications
   - Highlight test file conflicts

3. **Resolution order**:
   - Prioritize simple conflicts first
   - Group related files together
   - Handle complex conflicts last

**STEP 5: Interactive Resolution Process**

FOR EACH conflicted file:

**Simple Conflicts (Auto-resolvable):**

```bash
# Show the conflict
echo "=== Conflict in $file ==="
git show :1:$file  # Common ancestor
git show :2:$file  # Current branch (HEAD)
git show :3:$file  # Incoming branch (MERGE_HEAD)

# Apply automatic resolution if safe
# Add resolved file to staging
git add $file
```

**Complex Conflicts (Manual guidance):**

```bash
# Provide detailed analysis
echo "=== Manual Resolution Required: $file ==="
echo "Current branch changes:"
git show HEAD:$file | rg -A 5 -B 5 "conflict_pattern"
echo "Incoming changes:"
git show MERGE_HEAD:$file | rg -A 5 -B 5 "conflict_pattern"
echo "Recommended approach: [specific guidance]"
```

**STEP 6: Resolution Execution**

TRY:
FOR EACH auto-resolvable conflict:

- Apply automatic resolution
- Validate syntax (if code file)
- Stage resolved file

FOR EACH manual conflict:

- Present detailed analysis
- Suggest specific resolution steps
- AWAIT user confirmation before proceeding

CATCH (resolution_error):

- ROLLBACK any automatic changes
- SAVE current state to /tmp/merge-conflict-state-$SESSION_ID.json
- PROVIDE recovery instructions

**STEP 7: Final Validation**

BEFORE committing merge:

1. **Syntax validation** for code files
2. **Import/dependency check** for broken references
3. **Test execution** if test files were modified
4. **Security review** for sensitive changes

**STEP 8: Complete Merge**

IF all conflicts resolved:

```bash
# Verify all conflicts are resolved
git diff --check

# Create merge commit with descriptive message
git commit -m "$(cat <<'EOF'
Merge branch '$MERGE_HEAD_BRANCH' into $(git branch --show-current)

Resolved conflicts in:
$RESOLVED_FILES

Resolution summary:
- Automatic: $AUTO_RESOLVED_COUNT files
- Manual: $MANUAL_RESOLVED_COUNT files
- Key decisions: $RESOLUTION_SUMMARY
EOF
)"
```

**Error Handling:**

IF merge_state_invalid:

- PRINT "Invalid merge state detected"
- SUGGEST running 'git merge --abort' to reset
- EXIT with error

IF conflicts_too_complex:

- SAVE analysis to /tmp/merge-analysis-$SESSION_ID.md
- RECOMMEND manual resolution with detailed guidance
- PROVIDE conflict-by-conflict breakdown

**Safety Features:**

- **Backup creation**: Save pre-merge state
- **Rollback capability**: Easy revert if resolution fails
- **Incremental progress**: Stage files as they're resolved
- **Validation checks**: Syntax and dependency validation
- **Detailed logging**: Track all resolution decisions

**Advanced Features:**

- **Semantic conflict detection**: Identify logic conflicts beyond text
- **Test impact analysis**: Understand how conflicts affect test coverage
- **Dependency conflict resolution**: Handle package.json, Cargo.toml, etc.
- **Code style preservation**: Maintain consistent formatting during resolution

This command provides comprehensive merge conflict resolution with safety checks, detailed analysis, and both automatic and manual resolution strategies.