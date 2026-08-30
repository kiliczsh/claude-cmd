---
allowed-tools: Bash(git:*), Bash(gh:*), Read, Write, Edit, MultiEdit, Task, Bash(gdate:*)
name: "Bug Fix"
description: "Systematic bug investigation and fix workflow with GitHub integration"
author: "wcygan"
tags: ["code","fix"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Git status: !`git status --porcelain || echo "Not a git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No git repository"`
- Recent commits: !`git log --oneline -5 2>/dev/null || echo "No git history"`
- Working directory status: !`git diff --name-only 2>/dev/null | wc -l | tr -d ' ' || echo "0"` modified files
- Open issues: !`gh issue list --state open --json number,title --limit 5 2>/dev/null || echo "[]"`
- Repository info: !`git remote get-url origin 2>/dev/null || echo "No remote origin"`

## Your Task

Fix the bug described in: **$ARGUMENTS**

STEP 1: Bug Analysis and State Initialization

- Initialize session state file: /tmp/bug-fix-state-$SESSION_ID.json
- Parse bug description and extract key details
- Think deeply about potential root causes and affected systems
- FOR complex bugs: Use extended thinking to analyze the problem systematically

```json
// /tmp/bug-fix-state-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "bug": "$ARGUMENTS",
  "phase": "analysis",
  "analysis": {
    "rootCause": null,
    "affectedFiles": [],
    "reproductionSteps": [],
    "priority": "normal"
  },
  "workflow": {
    "issueNumber": null,
    "branchName": null,
    "prNumber": null,
    "fixApplied": false
  },
  "checkpoints": {
    "analysis_complete": false,
    "issue_created": false,
    "branch_created": false,
    "fix_implemented": false,
    "tests_verified": false,
    "pr_created": false
  }
}
```

STEP 2: Repository Validation and Preparation

TRY:

- Verify we're in a git repository
- Check for clean working directory OR warn about uncommitted changes
- Ensure gh CLI is authenticated: gh auth status
  CATCH (git not available):
- Exit with error: "This command requires a git repository"
  CATCH (gh not authenticated):
- Provide authentication instructions: gh auth login

STEP 3: GitHub Issue Creation

IF issue doesn't already exist:

- Create descriptive GitHub issue with bug details
- Use template format:
  ```
  ## Bug Description
  [Bug description from $ARGUMENTS]

  ## Expected Behavior
  [What should happen]

  ## Actual Behavior  
  [What currently happens]

  ## Steps to Reproduce
  1. [Step 1]
  2. [Step 2]

  ## Environment
  - Branch: [current branch]
  - Last commit: [latest commit hash]
  ```
- Update state with issue number
- Mark checkpoint: issue_created = true

STEP 4: Feature Branch Creation

- Generate branch name: bugfix/[sanitized-bug-description]
- Create and checkout branch: git checkout -b [branch-name]
- Update state with branch name
- Mark checkpoint: branch_created = true

STEP 5: Bug Investigation and Root Cause Analysis

Think deeply about the optimal debugging approach for this specific bug type and system complexity.

FOR complex bugs requiring comprehensive investigation:

**CRITICAL: Deploy parallel sub-agents for maximum performance (8-10x faster bug investigation)**

IMMEDIATELY launch 8 specialized bug investigation agents:

- **Agent 1: Code Pattern Analysis**: Examine code patterns, recent changes, and potential regression sources
  - Focus: Function implementations, class hierarchies, recent commits, code quality patterns
  - Tools: Git blame, code pattern analysis, complexity metrics, refactoring impact assessment
  - Output: Code-level root cause analysis with change timeline and impact assessment

- **Agent 2: Environment & Configuration Analysis**: Analyze configuration, dependencies, and deployment differences
  - Focus: Environment variables, configuration files, dependency versions, deployment settings
  - Tools: Configuration validation, dependency analysis, environment comparison, deployment history
  - Output: Environment-related causes with configuration drift analysis and dependency conflicts

- **Agent 3: Data Flow & State Analysis**: Trace data flow and identify transformation issues
  - Focus: Data transformations, state mutations, database interactions, API data contracts
  - Tools: Data flow tracing, state analysis, database query analysis, API contract validation
  - Output: Data-related issues with flow diagrams and state corruption analysis

- **Agent 4: Integration & Service Analysis**: Check API contracts, service interactions, and third-party integrations
  - Focus: Service boundaries, API calls, message queues, external service dependencies
  - Tools: API testing, service mesh analysis, integration testing, dependency mapping
  - Output: Integration issues with service interaction analysis and external dependency validation

- **Agent 5: Security & Authentication Analysis**: Assess security implications and vulnerability patterns
  - Focus: Authentication flows, authorization checks, input validation, security policies
  - Tools: Security scanning, vulnerability analysis, authentication testing, policy validation
  - Output: Security-related causes with vulnerability assessment and authentication flow analysis

- **Agent 6: Performance & Resource Analysis**: Identify performance bottlenecks and resource constraints
  - Focus: CPU usage, memory consumption, database performance, network latency
  - Tools: Performance profiling, resource monitoring, database query analysis, latency measurement
  - Output: Performance issues with bottleneck identification and resource utilization patterns

- **Agent 7: Testing & Validation Analysis**: Examine test coverage, test failures, and validation gaps
  - Focus: Test suite analysis, coverage gaps, failing tests, validation logic
  - Tools: Test coverage analysis, test failure investigation, validation testing, quality metrics
  - Output: Testing-related insights with coverage gaps and validation deficiencies

- **Agent 8: Historical & Timeline Analysis**: Investigate historical patterns, change correlation, and temporal factors
  - Focus: Change history, deployment timeline, error patterns, seasonal variations
  - Tools: Git history analysis, deployment tracking, error correlation, timeline analysis
  - Output: Historical context with change correlation and temporal pattern identification

**Sub-Agent Coordination:**

- Each agent saves findings to `/tmp/bug-investigation-agents-$SESSION_ID/`
- Parallel execution provides 8-10x speed improvement over sequential investigation
- Cross-agent correlation identifies complex multi-dimensional bug patterns
- Results synthesized with root cause ranking and confidence scoring

PROCEDURE investigate_bug():

CASE bug_complexity:
WHEN "simple" (single component, clear error):

- Execute focused code analysis
- Check recent commits in affected area
- Verify environment configuration
- Identify minimal reproduction case

WHEN "moderate" (multiple components, unclear cause):

- Deploy 5 parallel investigation agents:
  - **Agent 1**: Code pattern analysis and recent change impact
  - **Agent 2**: Environment and dependency analysis
  - **Agent 3**: Integration and data flow validation
  - **Agent 4**: Performance and resource analysis
  - **Agent 5**: Historical and timeline analysis
- Synthesize findings from all agents
- Correlate timeline with deployment and configuration changes

WHEN "complex" (system-wide, intermittent, or performance-related):

- Execute comprehensive 8-agent investigation (as defined above)
- Think harder about race conditions, timing issues, and edge cases
- Correlate findings across all analysis dimensions

**Investigation Framework:**

```json
// Enhanced bug analysis structure
{
  "bug_classification": {
    "type": "functional|performance|security|integration|data",
    "severity": "low|medium|high|critical",
    "scope": "component|service|system|cross-system",
    "reproducibility": "always|intermittent|specific_conditions"
  },
  "analysis_approach": {
    "agents_deployed": ["code", "environment", "data", "integration", "security"],
    "investigation_depth": "surface|moderate|deep|comprehensive",
    "timeline_analysis": "last_24h|last_week|since_deployment",
    "correlation_factors": ["code_changes", "config_changes", "data_changes", "infrastructure"]
  },
  "findings": [
    {
      "agent": "analysis_agent_name",
      "finding_type": "root_cause|contributing_factor|side_effect",
      "confidence": "low|medium|high",
      "evidence": ["evidence_item_1", "evidence_item_2"],
      "affected_components": ["component_list"],
      "recommendation": "fix_approach"
    }
  ]
}
```

TRY:

- Execute selected investigation strategy based on bug complexity
- Document all findings in structured format
- Identify primary root cause and contributing factors
- Update state: analysis.rootCause, analysis.affectedFiles
- Mark checkpoint: analysis_complete = true

CATCH (investigation_inconclusive):

- Document partial findings and hypotheses
- Create structured testing plan to isolate cause
- Save investigation state for incremental analysis
- Recommend additional monitoring or logging

CATCH (multiple_root_causes):

- Prioritize fixes by impact and risk
- Create multi-phase fix strategy
- Document interdependencies between issues
- Update state with complex fix plan

CATCH (insufficient_information):

- Document information gaps and requirements
- Create data gathering plan (logs, metrics, user reports)
- Set up enhanced monitoring for future investigation
- Save incomplete analysis state for continuation

STEP 6: Bug Fix Implementation

PROCEDURE apply_fix():

- Implement the minimal fix that addresses the root cause
- Add or update tests to prevent regression
- Verify fix doesn't break existing functionality
- Document the fix approach in commit preparation

TRY:

- Apply code changes systematically
- Run relevant tests to validate fix
- Update state: fixApplied = true, checkpoints.fix_implemented = true
  CATCH (tests fail):
- Analyze test failures
- Refine fix or update tests as needed
- Retry validation

STEP 7: Testing and Validation

Think harder about comprehensive testing strategies that ensure fix reliability and prevent regressions.

PROCEDURE validate_fix():

CASE testing_complexity:
WHEN "simple" (isolated component fix):

- Execute focused unit tests for affected component
- Run regression tests for related functionality
- Perform manual verification of fix scenario
- Validate error handling and edge cases

WHEN "moderate" (multiple component changes):

- Use parallel testing approach:
  - **Testing Agent 1**: Unit test execution and coverage validation
  - **Testing Agent 2**: Integration test execution across affected services
  - **Testing Agent 3**: End-to-end testing of user workflows
- Cross-validate results from all testing agents
- Perform load testing if performance-related fix

WHEN "complex" (system-wide changes or critical fixes):

- Execute comprehensive multi-agent testing strategy:
  - **Agent 1**: Comprehensive unit and component testing
  - **Agent 2**: Integration testing across all affected systems
  - **Agent 3**: End-to-end workflow validation
  - **Agent 4**: Performance and load testing validation
  - **Agent 5**: Security and vulnerability testing
- Think deeply about potential failure modes and edge cases
- Validate fix under various system conditions and loads

**Testing Framework:**

```json
// Enhanced testing validation structure
{
  "testing_strategy": {
    "scope": "unit|integration|e2e|comprehensive",
    "agents_deployed": ["unit", "integration", "e2e", "performance", "security"],
    "test_categories": ["regression", "functionality", "performance", "security", "edge_cases"],
    "environments": ["local", "staging", "production_like"]
  },
  "test_execution": [
    {
      "agent": "testing_agent_name",
      "test_type": "unit|integration|e2e|performance|security",
      "status": "pending|running|passed|failed|skipped",
      "coverage": "percentage_or_scope",
      "results": {
        "passed": "number",
        "failed": "number",
        "skipped": "number",
        "duration": "execution_time"
      },
      "failures": [
        {
          "test_name": "failing_test",
          "failure_reason": "detailed_error",
          "fix_required": "boolean"
        }
      ]
    }
  ],
  "validation_checklist": {
    "original_bug_fixed": "boolean",
    "no_new_regressions": "boolean",
    "performance_maintained": "boolean",
    "security_not_compromised": "boolean",
    "edge_cases_handled": "boolean"
  }
}
```

TRY:

- Execute selected testing strategy based on fix complexity
- Run automated test suites with comprehensive coverage
- Perform manual testing of critical user workflows
- Validate performance metrics haven't degraded
- Check security implications of the fix
- Update state: checkpoints.tests_verified = true

CATCH (test_failures_detected):

- Analyze failing tests to determine if fix needs adjustment
- Classify failures: legitimate_failures vs test_updates_needed
- Refine fix implementation or update test expectations
- Re-run validation cycle until all tests pass

CATCH (performance_regression_detected):

- Analyze performance impact of the fix
- Optimize fix implementation to minimize performance cost
- Consider alternative fix approaches if performance is critical
- Document performance trade-offs in fix documentation

CATCH (new_bugs_introduced):

- Perform impact analysis of newly discovered issues
- Prioritize new bugs vs original bug severity
- Create follow-up issues for new problems
- Consider rolling back fix if new issues are critical

CATCH (security_concerns_identified):

- Halt deployment and analyze security implications
- Engage security review process if available
- Modify fix to address security concerns
- Add security-focused tests to prevent future issues

**Debugging and Profiling Integration:**

FOR performance or complex bugs:

- Integrate with debugging tools: debugger, profiler, memory analyzer
- Capture before/after metrics for quantitative validation
- Set up monitoring alerts for the fixed component
- Create performance regression tests

FOR security-related fixes:

- Run security scanning tools on the fixed code
- Validate input sanitization and authorization checks
- Test for common vulnerability patterns (OWASP Top 10)
- Review code for privilege escalation risks

STEP 8: Commit and Push Changes

- Create semantic commit message following conventional commits:
  ```
  fix: [brief description of bug fix]

  - [Specific change 1]
  - [Specific change 2]

  Fixes #[issue-number]
  ```
- Commit changes: git commit -m "[commit message]"
- Push branch: git push -u origin [branch-name]

STEP 9: Pull Request Creation

- Create PR linking to the issue:
  ```bash
  gh pr create --title "Fix: [bug description]" --body "$(cat <<'EOF'
  ## Summary
  Fixes the bug described in #[issue-number]

  ## Changes Made
  - [Change 1]
  - [Change 2]

  ## Testing
  - [x] Unit tests pass
  - [x] Manual testing completed
  - [x] No regression detected

  ## Related Issues
  Fixes #[issue-number]
  EOF
  )"
  ```
- Update state with PR number
- Mark checkpoint: pr_created = true

STEP 10: Final State Update and Cleanup

- Update state file with completion status
- Mark all checkpoints as complete
- Set phase to "complete"
- Report success with issue/PR links

FINALLY:

- Cleanup temporary files if workflow completed successfully
- Preserve state file for 24 hours for potential debugging

## Error Recovery and Resumability

IF workflow is interrupted:

- Check state file for last completed checkpoint
- Resume from the appropriate step
- Validate current repository state matches expected state

## Advanced Bug Analysis Patterns

FOR performance bugs:

- Use profiling tools to identify bottlenecks
- Analyze memory usage patterns
- Check for algorithmic inefficiencies

FOR integration bugs:

- Examine API contracts and data flow
- Check configuration and environment differences
- Validate dependency versions and compatibility

FOR security bugs:

- Think harder about attack vectors and exploit scenarios
- Review input validation and sanitization
- Check for privilege escalation opportunities
- Ensure fix doesn't introduce new vulnerabilities

## State Management Schema

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "2025-01-07T13:30:00Z",
  "bug": "User login fails with 500 error",
  "phase": "complete",
  "analysis": {
    "rootCause": "SQL injection vulnerability in authentication query",
    "affectedFiles": ["auth.js", "user-model.js"],
    "reproductionSteps": ["Navigate to login", "Enter malicious input"],
    "priority": "critical"
  },
  "workflow": {
    "issueNumber": 123,
    "branchName": "bugfix/user-login-500-error",
    "prNumber": 456,
    "fixApplied": true
  },
  "checkpoints": {
    "analysis_complete": true,
    "issue_created": true,
    "branch_created": true,
    "fix_implemented": true,
    "tests_verified": true,
    "pr_created": true
  },
  "session_isolation": {
    "temp_files": ["/tmp/bug-fix-state-$SESSION_ID.json"],
    "created_branches": ["bugfix/user-login-500-error"],
    "created_issues": [123],
    "created_prs": [456]
  }
}
```