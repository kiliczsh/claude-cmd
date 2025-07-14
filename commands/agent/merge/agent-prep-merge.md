---
allowed-tools: Bash(git:*), Bash(gh:*), Bash(rg:*), Bash(fd:*), Bash(jq:*), Read, Grep, Write, TodoWrite
name: "Agent Prep Merge"
description: "Prepare branches for merging across multiple worktrees and coordinate integration"
author: "wcygan"
tags: ["agent","merge"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /agent-prep-merge

Prepares branches from multiple worktrees for clean merging by checking for conflicts, running tests across affected code, generating merge strategies, and creating integration checklists. Essential for multi-agent development workflows.

## Context

- **Session ID**: !`gdate +%s%N 2>/dev/null || date +%s000000000`
- **Current branch**: !`git branch --show-current`
- **Active worktrees**: !`git worktree list | rg -v "bare" | wc -l | xargs -I {} echo "{} active worktrees"`
- **Worktree details**: !`git worktree list | rg -v "bare" | awk '{print $1 " → " $3}' | sed 's/\[//g' | sed 's/\]//g'`
- **Uncommitted changes**: !`git status --porcelain | wc -l | xargs -I {} echo "{} files"`
- **Behind/ahead main**: !`git rev-list --left-right --count origin/main...HEAD 2>/dev/null | awk '{print "Behind: " $1 ", Ahead: " $2}' || echo "No upstream"`
- **Project name**: !`basename "$(git rev-parse --show-toplevel)"`
- **Coordination files**: !`PROJECT=$(basename "$(git rev-parse --show-toplevel)"); if [ -d "/tmp/$PROJECT" ]; then fd -t f "\.json$" "/tmp/$PROJECT" | wc -l | xargs -I {} echo "{} JSON files"; else echo "None"; fi`
- **Active PRs**: !`gh pr list --state open --limit 10 --json number,title,headRefName | jq -r '.[] | "#\(.number): \(.title) (\(.headRefName))"' | head -5`

## Usage

```bash
# Prepare current branch for merging with main
/agent-prep-merge

# Prepare specific branches for integration
/agent-prep-merge feature-auth feature-api

# Prepare all worktree branches for coordinated merge
/agent-prep-merge --all-worktrees

# Generate integration plan without making changes
/agent-prep-merge --dry-run
```

## Arguments

$ARGUMENTS

## Your Task

STEP 1: Initialize session and parse arguments

```typescript
const SESSION_ID = await $`gdate +%s%N 2>/dev/null || date +%s000000000`.text().trim();
const PROJECT = await $`basename "$(git rev-parse --show-toplevel)"`.text();
const STATE_FILE = `/tmp/${PROJECT}/merge-prep-state-${SESSION_ID}.json`;
const COORDINATION_DIR = `/tmp/${PROJECT}`;

// Parse command arguments
let targetBranches: string[] = [];
let options = {
  allWorktrees: false,
  dryRun: false,
  createPRs: false
};

IF ($ARGUMENTS.includes("--all-worktrees")) {
  options.allWorktrees = true;
} ELSE IF ($ARGUMENTS.includes("--dry-run")) {
  options.dryRun = true;
} ELSE IF ($ARGUMENTS.includes("--create-prs")) {
  options.createPRs = true;
} ELSE IF ($ARGUMENTS && !$ARGUMENTS.startsWith("--")) {
  targetBranches = $ARGUMENTS.split(" ");
} ELSE {
  targetBranches = [await $`git branch --show-current`.text().trim()];
}

// Initialize state
const initialState = {
  sessionId: SESSION_ID,
  project: PROJECT,
  timestamp: new Date().toISOString(),
  targetBranches,
  options,
  phase: "initializing",
  worktreeAnalysis: {},
  conflictAnalysis: {},
  testPlan: null,
  mergeStrategy: null
};

await $`mkdir -p ${COORDINATION_DIR}`;
await Deno.writeTextFile(STATE_FILE, JSON.stringify(initialState, null, 2));
```

STEP 2: Discover and analyze worktrees

```bash
# Get all active worktrees and their branches
WORKTREES_JSON=$(git worktree list --porcelain | awk '
BEGIN { print "[" }
/^worktree / { path = $2; printf "%s{\"path\":\"%s\",", (NR>1?",":""), path }
/^branch / { gsub(/^refs\/heads\//, "", $2); printf "\"branch\":\"%s\"}", $2 }
END { print "]" }
')

# Save worktree information
echo "$WORKTREES_JSON" | jq '.' > "/tmp/$PROJECT/worktrees-${SESSION_ID}.json"

# Update target branches based on options
IF [[ "$ALL_WORKTREES" == "true" ]]; then
  TARGET_BRANCHES=$(echo "$WORKTREES_JSON" | jq -r '.[].branch' | tr '\n' ' ')
fi

echo "📋 Analyzing worktrees for branches: $TARGET_BRANCHES"
```

STEP 3: Validate branch states (FOR EACH target branch)

```bash
FOR BRANCH in $TARGET_BRANCHES; do
  echo "🔍 Validating branch: $BRANCH"
  
  # Find worktree path for this branch
  WORKTREE_PATH=$(echo "$WORKTREES_JSON" | jq -r ".[] | select(.branch==\"$BRANCH\") | .path")
  
  IF [[ -z "$WORKTREE_PATH" ]]; then
    echo "⚠️  Branch $BRANCH not found in any worktree"
    continue
  fi
  
  cd "$WORKTREE_PATH" || continue
  
  # Initialize branch analysis
  BRANCH_STATE="{
    \"branch\": \"$BRANCH\",
    \"worktreePath\": \"$WORKTREE_PATH\",
    \"status\": {
      \"hasUncommittedChanges\": false,
      \"isBehindMain\": false,
      \"needsPush\": false,
      \"isClean\": true
    },
    \"issues\": []
  }"
  
  # Check for uncommitted changes
  UNCOMMITTED=$(git status --porcelain | wc -l)
  IF [[ $UNCOMMITTED -gt 0 ]]; then
    echo "⚠️  Branch $BRANCH has $UNCOMMITTED uncommitted changes"
    BRANCH_STATE=$(echo "$BRANCH_STATE" | jq '.status.hasUncommittedChanges = true | .status.isClean = false | .issues += ["Uncommitted changes"]')
  fi
  
  # Check if branch is behind main
  git fetch origin main >/dev/null 2>&1
  BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "0")
  IF [[ $BEHIND -gt 0 ]]; then
    echo "⚠️  Branch $BRANCH is $BEHIND commits behind main"
    BRANCH_STATE=$(echo "$BRANCH_STATE" | jq --arg behind "$BEHIND" '.status.isBehindMain = true | .status.isClean = false | .issues += ["Behind main by \($behind) commits"]')
  fi
  
  # Check if branch needs to be pushed
  LOCAL=$(git rev-parse HEAD)
  REMOTE=$(git rev-parse "origin/$BRANCH" 2>/dev/null || echo "")
  IF [[ "$LOCAL" != "$REMOTE" && -n "$REMOTE" ]]; then
    echo "⚠️  Branch $BRANCH differs from origin"
    BRANCH_STATE=$(echo "$BRANCH_STATE" | jq '.status.needsPush = true | .issues += ["Local differs from remote"]')
  fi
  
  # Save branch analysis
  echo "$BRANCH_STATE" > "/tmp/$PROJECT/branch-analysis-$BRANCH-${SESSION_ID}.json"
  
done
```

STEP 4: Perform conflict detection analysis

```bash
echo "🔍 Analyzing potential merge conflicts..."

CONFLICTS_SUMMARY="[]"

FOR BRANCH in $TARGET_BRANCHES; do
  echo "Checking conflicts for $BRANCH against main..."
  
  WORKTREE_PATH=$(echo "$WORKTREES_JSON" | jq -r ".[] | select(.branch==\"$BRANCH\") | .path")
  cd "$WORKTREE_PATH" || continue
  
  # Get files modified in this branch since main
  BRANCH_FILES=$(git diff --name-only origin/main...$BRANCH)
  
  # Get files modified in main since merge-base
  MERGE_BASE=$(git merge-base origin/main $BRANCH)
  MAIN_FILES=$(git diff --name-only $MERGE_BASE..origin/main)
  
  # Find overlapping files (potential conflicts)
  OVERLAPPING_FILES=$(comm -12 <(echo "$BRANCH_FILES" | sort) <(echo "$MAIN_FILES" | sort))
  
  IF [[ -n "$OVERLAPPING_FILES" ]]; then
    echo "⚠️  Potential conflicts in:"
    echo "$OVERLAPPING_FILES" | sed 's/^/    /'
    
    # Create conflict analysis for this branch
    CONFLICT_ANALYSIS="{
      \"branch\": \"$BRANCH\",
      \"conflictingFiles\": $(echo "$OVERLAPPING_FILES" | jq -R . | jq -s .),
      \"riskLevel\": \"medium\",
      \"recommendedAction\": \"Manual review required\"
    }"
    
    CONFLICTS_SUMMARY=$(echo "$CONFLICTS_SUMMARY" | jq ". += [$CONFLICT_ANALYSIS]")
  else
    echo "✅ No conflicts detected for $BRANCH"
    
    CLEAN_ANALYSIS="{
      \"branch\": \"$BRANCH\",
      \"conflictingFiles\": [],
      \"riskLevel\": \"low\",
      \"recommendedAction\": \"Safe to merge\"
    }"
    
    CONFLICTS_SUMMARY=$(echo "$CONFLICTS_SUMMARY" | jq ". += [$CLEAN_ANALYSIS]")
  fi
done

# Save conflict analysis
echo "$CONFLICTS_SUMMARY" | jq '.' > "/tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json"
```

STEP 5: Generate comprehensive test plan

```bash
echo "🧪 Generating test plan for affected code..."

# Initialize test plan
TEST_PLAN="{
  \"sessionId\": \"${SESSION_ID}\",
  \"branches\": [],
  \"affectedTests\": [],
  \"estimatedTime\": 0,
  \"commands\": []
}"

AFFECTED_TESTS_SET=""

FOR BRANCH in $TARGET_BRANCHES; do
  WORKTREE_PATH=$(echo "$WORKTREES_JSON" | jq -r ".[] | select(.branch==\"$BRANCH\") | .path")
  cd "$WORKTREE_PATH" || continue
  
  # Get all changed files in this branch
  CHANGED_FILES=$(git diff --name-only origin/main...$BRANCH)
  
  # Find related test files for each changed file
  FOR FILE in $CHANGED_FILES; do
    # Extract filename without extension
    BASE_NAME=$(basename "$FILE" | sed 's/\.[^.]*$//')
    DIR_NAME=$(dirname "$FILE")
    
    # Search for test files using multiple patterns
    RELATED_TESTS=$(fd -t f -e ts -e js -e rs -e go -e java -e py \
      "($BASE_NAME[._-]test|test[._-]$BASE_NAME|$BASE_NAME[._-]spec|spec[._-]$BASE_NAME)" \
      . 2>/dev/null || echo "")
    
    # Also check for tests in standard test directories
    if [[ -n "$RELATED_TESTS" ]]; then
      AFFECTED_TESTS_SET+="$RELATED_TESTS"$'\n'
    fi
  done
  
  # Add branch to test plan
  BRANCH_TEST_INFO="{
    \"branch\": \"$BRANCH\",
    \"changedFiles\": $(echo "$CHANGED_FILES" | jq -R . | jq -s .),
    \"worktreePath\": \"$WORKTREE_PATH\"
  }"
  
  TEST_PLAN=$(echo "$TEST_PLAN" | jq ".branches += [$BRANCH_TEST_INFO]")
done

# Remove duplicates from affected tests
UNIQUE_TESTS=$(echo "$AFFECTED_TESTS_SET" | sort -u | grep -v '^$' || echo "")
TEST_PLAN=$(echo "$TEST_PLAN" | jq --arg tests "$UNIQUE_TESTS" '.affectedTests = ($tests | split("\n") | map(select(. != "")))')

# Estimate test time (rough: 30 seconds per test file)
TEST_COUNT=$(echo "$UNIQUE_TESTS" | grep -c . || echo "0")
ESTIMATED_MINUTES=$(( TEST_COUNT * 30 / 60 ))
TEST_PLAN=$(echo "$TEST_PLAN" | jq --arg time "$ESTIMATED_MINUTES" '.estimatedTime = ($time | tonumber)')

# Generate test commands
TEST_COMMANDS="[
  \"echo '🧪 Starting integration test suite...'\",
  \"echo 'Testing $TEST_COUNT affected test files'\""

FOR BRANCH in $TARGET_BRANCHES; do
  WORKTREE_PATH=$(echo "$WORKTREES_JSON" | jq -r ".[] | select(.branch==\"$BRANCH\") | .path")
  TEST_COMMANDS+=", \"echo 'Testing branch: $BRANCH'\""
  TEST_COMMANDS+=", \"cd $WORKTREE_PATH\""
  
  # Add project-specific test commands
  if [[ -f "$WORKTREE_PATH/deno.json" ]]; then
    TEST_COMMANDS+=", \"deno task test\""
  elif [[ -f "$WORKTREE_PATH/package.json" ]]; then
    TEST_COMMANDS+=", \"npm test\""
  elif [[ -f "$WORKTREE_PATH/Cargo.toml" ]]; then
    TEST_COMMANDS+=", \"cargo test\""
  elif [[ -f "$WORKTREE_PATH/go.mod" ]]; then
    TEST_COMMANDS+=", \"go test ./...\""
  fi
done

TEST_COMMANDS+=", \"echo '✅ All integration tests completed!'\""
TEST_COMMANDS+="]"

TEST_PLAN=$(echo "$TEST_PLAN" | jq --argjson commands "$TEST_COMMANDS" '.commands = $commands')

# Save test plan
echo "$TEST_PLAN" | jq '.' > "/tmp/$PROJECT/test-plan-${SESSION_ID}.json"
```

STEP 6: Create executable test script

```bash
# Generate executable test script
cat > "/tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh" << EOF
#!/bin/bash
set -e

echo "🧪 Running integration tests for merge preparation..."
echo "Session: ${SESSION_ID}"
echo "Started: \$(date)"

# Load test plan
TEST_PLAN_FILE="/tmp/$PROJECT/test-plan-${SESSION_ID}.json"
if [[ ! -f "\$TEST_PLAN_FILE" ]]; then
  echo "❌ Test plan not found: \$TEST_PLAN_FILE"
  exit 1
fi

# Execute test commands
COMMANDS=\$(jq -r '.commands[]' "\$TEST_PLAN_FILE")
while IFS= read -r cmd; do
  echo "Executing: \$cmd"
  eval "\$cmd" || {
    echo "❌ Test command failed: \$cmd"
    exit 1
  }
done <<< "\$COMMANDS"

echo "✅ All integration tests passed!"
echo "Completed: \$(date)"
EOF

chmod +x "/tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh"
echo "📝 Test script created: /tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh"
```

STEP 7: Generate optimal merge strategy

```bash
echo "🧠 Calculating optimal merge strategy..."

# Initialize merge strategy
MERGE_STRATEGY="{
  \"sessionId\": \"${SESSION_ID}\",
  \"project\": \"$PROJECT\",
  \"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\",
  \"branches\": [],
  \"recommendedOrder\": [],
  \"integrationSteps\": []
}"

# Analyze each branch and assign risk scores
BRANCH_SCORES=""

FOR BRANCH in $TARGET_BRANCHES; do
  CONFLICT_DATA=$(jq ".[] | select(.branch==\"$BRANCH\")" "/tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json")
  BRANCH_DATA=$(cat "/tmp/$PROJECT/branch-analysis-$BRANCH-${SESSION_ID}.json" 2>/dev/null || echo '{}')
  
  # Calculate risk score (lower is better)
  RISK_SCORE=0
  
  # Add risk for conflicts
  CONFLICT_COUNT=$(echo "$CONFLICT_DATA" | jq '.conflictingFiles | length')
  RISK_SCORE=$((RISK_SCORE + CONFLICT_COUNT * 10))
  
  # Add risk for uncommitted changes
  HAS_UNCOMMITTED=$(echo "$BRANCH_DATA" | jq '.status.hasUncommittedChanges')
  if [[ "$HAS_UNCOMMITTED" == "true" ]]; then
    RISK_SCORE=$((RISK_SCORE + 5))
  fi
  
  # Add risk for being behind main
  IS_BEHIND=$(echo "$BRANCH_DATA" | jq '.status.isBehindMain')
  if [[ "$IS_BEHIND" == "true" ]]; then
    RISK_SCORE=$((RISK_SCORE + 3))
  fi
  
  BRANCH_WITH_SCORE="{\"branch\":\"$BRANCH\",\"riskScore\":$RISK_SCORE}"
  BRANCH_SCORES+="$BRANCH_WITH_SCORE"$'\n'
  
  # Add to merge strategy
  BRANCH_STRATEGY="{
    \"name\": \"$BRANCH\",
    \"riskScore\": $RISK_SCORE,
    \"conflicts\": $(echo "$CONFLICT_DATA" | jq '.conflictingFiles'),
    \"status\": $(echo "$BRANCH_DATA" | jq '.status // {}'),
    \"recommendedAction\": \"$(if [[ $RISK_SCORE -eq 0 ]]; then echo "Ready to merge"; elif [[ $RISK_SCORE -lt 5 ]]; then echo "Minor issues to resolve"; else echo "Requires attention before merge"; fi)\"
  }"
  
  MERGE_STRATEGY=$(echo "$MERGE_STRATEGY" | jq ".branches += [$BRANCH_STRATEGY]")
done

# Sort branches by risk score (lowest first)
SORTED_BRANCHES=$(echo "$BRANCH_SCORES" | grep -v '^$' | sort -t: -k2 -n | jq -r '.branch')
RECOMMENDED_ORDER=$(echo "$SORTED_BRANCHES" | jq -R . | jq -s .)
MERGE_STRATEGY=$(echo "$MERGE_STRATEGY" | jq --argjson order "$RECOMMENDED_ORDER" '.recommendedOrder = $order')

# Generate integration steps
INTEGRATION_STEPS="[
  \"Review conflict analysis: /tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json\",
  \"Run integration tests: /tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh\",
  \"Resolve any conflicts in high-risk branches\",
  \"Create/update pull requests for ready branches\",
  \"Coordinate merge timing with team\",
  \"Execute merges in recommended order\",
  \"Verify final integration on main branch\",
  \"Clean up temporary coordination files\"
]"

MERGE_STRATEGY=$(echo "$MERGE_STRATEGY" | jq --argjson steps "$INTEGRATION_STEPS" '.integrationSteps = $steps')

# Save merge strategy
echo "$MERGE_STRATEGY" | jq '.' > "/tmp/$PROJECT/merge-strategy-${SESSION_ID}.json"
```

STEP 8: Generate integration checklist

```bash
echo "📋 Creating integration checklist..."

# Generate comprehensive checklist
cat > "/tmp/$PROJECT/integration-checklist-${SESSION_ID}.md" << EOF
# Integration Checklist for $PROJECT

**Session**: ${SESSION_ID}  
**Generated**: $(date)  
**Branches**: $TARGET_BRANCHES

## Pre-Merge Requirements

### Branch Status Validation

$(for BRANCH in $TARGET_BRANCHES; do
  BRANCH_DATA=$(cat "/tmp/$PROJECT/branch-analysis-$BRANCH-${SESSION_ID}.json" 2>/dev/null || echo '{}')
  IS_CLEAN=$(echo "$BRANCH_DATA" | jq -r '.status.isClean')
  ISSUES=$(echo "$BRANCH_DATA" | jq -r '.issues[]' 2>/dev/null || echo "")
  
  if [[ "$IS_CLEAN" == "true" ]]; then
    echo "- [x] **$BRANCH**: Ready to merge"
  else
    echo "- [ ] **$BRANCH**: Issues to resolve"
    if [[ -n "$ISSUES" ]]; then
      echo "$ISSUES" | sed 's/^/  - ⚠️  /'
    fi
  fi
done)

### Conflict Resolution

$(jq -r '.[] | "- [ ] **\(.branch)**: \(.recommendedAction)"' "/tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json")

### Testing Requirements

- [ ] Unit tests pass on all branches
- [ ] Integration tests pass: \`/tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh\`
- [ ] No test regressions introduced
- [ ] Performance benchmarks acceptable

## Merge Sequence

**Recommended order** (based on risk analysis):

$(echo "$RECOMMENDED_ORDER" | jq -r '.[]' | nl | sed 's/^[ \t]*//')

## Integration Tasks

- [ ] Review merge strategy: \`/tmp/$PROJECT/merge-strategy-${SESSION_ID}.json\`
- [ ] Execute test plan: \`/tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh\`
- [ ] Create/update pull requests
- [ ] Coordinate timing with team
- [ ] Monitor CI/CD pipeline
- [ ] Update documentation

## Post-Merge Validation

- [ ] Full test suite passes on main
- [ ] No integration issues detected  
- [ ] All features working as expected
- [ ] Documentation updated
- [ ] Team notified of completion

## Rollback Plan

IF issues arise during integration:

1. **Stop** - Halt merge process immediately
2. **Assess** - Identify problematic branch/change
3. **Isolate** - Revert specific commits if possible
4. **Coordinate** - Notify team and affected developers
5. **Fix-Forward** - Create hotfix branch if needed
6. **Document** - Record lessons learned

## Quick Commands

\`\`\`bash
# View detailed analysis
cat /tmp/$PROJECT/merge-strategy-${SESSION_ID}.json | jq '.'

# Run integration tests
/tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh

# Check branch status
git worktree list

# View conflicts
cat /tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json | jq '.'
\`\`\`

---
*Generated by /agent-prep-merge - Session ${SESSION_ID}*
EOF

echo "📋 Integration checklist created: /tmp/$PROJECT/integration-checklist-${SESSION_ID}.md"
```

STEP 9: Prepare pull request templates (IF --create-prs option)

```bash
IF [[ "$CREATE_PRS" == "true" ]]; then
  echo "📝 Preparing pull request templates..."
  
  FOR BRANCH in $TARGET_BRANCHES; do
    WORKTREE_PATH=$(echo "$WORKTREES_JSON" | jq -r ".[] | select(.branch==\"$BRANCH\") | .path")
    cd "$WORKTREE_PATH" || continue
    
    # Check if PR already exists
    EXISTING_PR=$(gh pr list --head "$BRANCH" --json number --jq '.[0].number' 2>/dev/null || echo "")
    
    IF [[ -z "$EXISTING_PR" ]]; then
      # Generate PR body
      cat > "/tmp/$PROJECT/pr-template-$BRANCH-${SESSION_ID}.md" << EOF
## Summary

Merging $BRANCH as part of coordinated multi-branch integration.

## Changes

$(git log origin/main..$BRANCH --oneline | head -10)

## Integration Context

- **Session**: ${SESSION_ID}
- **Merge Strategy**: /tmp/$PROJECT/merge-strategy-${SESSION_ID}.json
- **Integration Checklist**: /tmp/$PROJECT/integration-checklist-${SESSION_ID}.md

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass: \`/tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh\`
- [ ] No conflicts with other branches

## Coordination

Part of multi-branch integration with: $TARGET_BRANCHES

**Risk Level**: $(jq -r ".[] | select(.branch==\"$BRANCH\") | .recommendedAction" "/tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json")

## Merge Checklist

- [ ] All integration tests pass
- [ ] Conflicts resolved (if any)
- [ ] Team coordination complete
- [ ] Ready for final merge

/cc @team
EOF
      
      echo "📝 PR template created for $BRANCH: /tmp/$PROJECT/pr-template-$BRANCH-${SESSION_ID}.md"
      echo "   Create PR with: gh pr create --title \"integrate: $BRANCH\" --body-file \"/tmp/$PROJECT/pr-template-$BRANCH-${SESSION_ID}.md\""
    else
      echo "✓ PR #$EXISTING_PR already exists for $BRANCH"
    fi
  done
fi
```

STEP 10: Update coordination state and generate summary

```bash
# Update final coordination state
FINAL_STATE="{
  \"sessionId\": \"${SESSION_ID}\",
  \"project\": \"$PROJECT\",
  \"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\",
  \"phase\": \"completed\",
  \"preparedBy\": \"$(git config user.name || echo "Claude Agent")\",
  \"targetBranches\": $(echo "$TARGET_BRANCHES" | tr ' ' '\n' | jq -R . | jq -s .),
  \"summary\": {
    \"totalBranches\": $(echo "$TARGET_BRANCHES" | wc -w),
    \"readyToMerge\": $(jq '[.[] | select(.recommendedAction == "Safe to merge")] | length' "/tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json"),
    \"needsAttention\": $(jq '[.[] | select(.recommendedAction != "Safe to merge")] | length' "/tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json"),
    \"estimatedTestTime\": \"$(jq -r '.estimatedTime' "/tmp/$PROJECT/test-plan-${SESSION_ID}.json") minutes\"
  },
  \"artifacts\": {
    \"mergeStrategy\": \"/tmp/$PROJECT/merge-strategy-${SESSION_ID}.json\",
    \"testPlan\": \"/tmp/$PROJECT/test-plan-${SESSION_ID}.json\",
    \"testScript\": \"/tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh\",
    \"integrationChecklist\": \"/tmp/$PROJECT/integration-checklist-${SESSION_ID}.md\",
    \"conflictAnalysis\": \"/tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json\"
  },
  \"nextSteps\": [
    \"Review integration checklist: /tmp/$PROJECT/integration-checklist-${SESSION_ID}.md\",
    \"Run integration tests: /tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh\",
    \"Resolve conflicts in high-risk branches\",
    \"Create/update pull requests\",
    \"Execute merges in recommended order\"
  ]
}"

echo "$FINAL_STATE" | jq '.' > "/tmp/$PROJECT/merge-coordination-final-${SESSION_ID}.json"

# Generate final summary
echo ""
echo "🔀 Merge Preparation Complete!"
echo ""
echo "📊 Branch Analysis Summary:"

# Display branch status
for BRANCH in $TARGET_BRANCHES; do
  CONFLICT_DATA=$(jq ".[] | select(.branch==\"$BRANCH\")" "/tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json")
  RISK_LEVEL=$(echo "$CONFLICT_DATA" | jq -r '.riskLevel')
  ACTION=$(echo "$CONFLICT_DATA" | jq -r '.recommendedAction')
  
  case "$RISK_LEVEL" in
    "low") echo "  ✅ $BRANCH: $ACTION" ;;
    "medium") echo "  ⚠️  $BRANCH: $ACTION" ;;
    "high") echo "  ❌ $BRANCH: $ACTION" ;;
    *) echo "  ❓ $BRANCH: $ACTION" ;;
  esac
done

echo ""
echo "🧪 Testing Requirements:"
TEST_COUNT=$(jq -r '.affectedTests | length' "/tmp/$PROJECT/test-plan-${SESSION_ID}.json")
ESTIMATED_TIME=$(jq -r '.estimatedTime' "/tmp/$PROJECT/test-plan-${SESSION_ID}.json")
echo "  - $TEST_COUNT test files identified"
echo "  - Estimated test time: $ESTIMATED_TIME minutes"
echo "  - Test script: /tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh"

echo ""
echo "📋 Integration Artifacts Created:"
echo "  - Merge strategy: /tmp/$PROJECT/merge-strategy-${SESSION_ID}.json"
echo "  - Integration checklist: /tmp/$PROJECT/integration-checklist-${SESSION_ID}.md"
echo "  - Conflict analysis: /tmp/$PROJECT/conflicts-analysis-${SESSION_ID}.json"
echo "  - Test plan: /tmp/$PROJECT/test-plan-${SESSION_ID}.json"

echo ""
echo "🔄 Recommended Merge Order:"
echo "$RECOMMENDED_ORDER" | jq -r '.[]' | nl | sed 's/^/  /'

echo ""
echo "📝 Next Steps:"
echo "  1. Review checklist: cat /tmp/$PROJECT/integration-checklist-${SESSION_ID}.md"
echo "  2. Run tests: /tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh"
echo "  3. Resolve conflicts in high-risk branches"
echo "  4. Create PRs: gh pr create --title \"integrate: <branch>\" --body-file \"/tmp/$PROJECT/pr-template-<branch>-${SESSION_ID}.md\""
echo "  5. Execute merges in recommended order"

echo ""
echo "💡 Quick Access Commands:"
echo "  - View coordination state: cat /tmp/$PROJECT/merge-coordination-final-${SESSION_ID}.json | jq '.'"
echo "  - Check merge strategy: cat /tmp/$PROJECT/merge-strategy-${SESSION_ID}.json | jq '.recommendedOrder'"
echo "  - Run integration tests: /tmp/$PROJECT/run-integration-tests-${SESSION_ID}.sh"

echo ""
echo "🎯 Session ID: ${SESSION_ID}"
```

## Advanced Features

### Extended Thinking Integration

FOR complex merge scenarios with 5+ branches or high-conflict situations:

**Think deeply about optimal merge sequencing and risk mitigation strategies.**

Consider factors like:

- Dependency relationships between branches
- Team availability and coordination windows
- CI/CD pipeline capacity and timing
- Rollback complexity for different merge orders

### Sub-Agent Coordination Patterns

This command can leverage sub-agent patterns for large-scale integration:

```markdown
1. **Analysis Agent**: Performs detailed conflict and dependency analysis
2. **Testing Agent**: Manages comprehensive test execution across branches
3. **Strategy Agent**: Calculates optimal merge sequences and timing
4. **Communication Agent**: Handles PR creation and team coordination
5. **Monitoring Agent**: Tracks merge progress and identifies issues
```

### State Management and Resumability

All coordination state is preserved in session-specific files:

- Resume interrupted merge preparations
- Share state across multiple Claude sessions
- Maintain audit trail of decisions and rationale
- Enable rollback to previous coordination states

### Integration Patterns

**Sequential Integration** (dependency chains):

```
main ← feature-base ← feature-extension ← feature-ui
```

**Parallel Integration** (independent features):

```
main ← feature-auth
     ← feature-api  
     ← bugfix-perf
```

**Staged Integration** (large-scale changes):

```
main ← integration-branch ← feature-1
                         ← feature-2
                         ← feature-3
```

## Best Practices

1. **Run preparation early** - Catch conflicts before they compound
2. **Coordinate timing** - Align with team schedules and sprint boundaries
3. **Test incrementally** - Validate each merge step independently
4. **Document decisions** - Preserve rationale in PR descriptions and coordination files
5. **Monitor continuously** - Track merge progress and adjust strategy as needed
6. **Plan rollbacks** - Always have a recovery strategy for integration failures

This command transforms complex multi-branch integration from a manual, error-prone process into a systematic, trackable workflow essential for effective multi-agent development.