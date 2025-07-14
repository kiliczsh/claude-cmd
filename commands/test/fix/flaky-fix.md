---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(bat:*), Bash(jq:*), Bash(gdate:*), Bash(git:*), Bash(gh:*), Bash(docker:*), Bash(deno:*), Bash(cargo:*), Bash(go:*), Bash(mvn:*), Bash(gradle:*), Bash(python:*), Bash(pytest:*), Bash(jest:*), Bash(wc:*), Bash(head:*), Bash(tail:*), Bash(sort:*), Bash(uniq:*)
name: "Flaky Fix"
description: "Intelligent flaky test detection and stabilization system with automated pattern recognition and framework-specific fixes"
author: "wcygan"
tags: ["test","fix"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target test: $ARGUMENTS
- Current directory: !`pwd`
- Test framework detected: !`if [ -f "deno.json" ]; then echo "deno"; elif [ -f "Cargo.toml" ]; then echo "rust"; elif [ -f "go.mod" ]; then echo "go"; elif [ -f "package.json" ]; then echo "node"; elif [ -f "pyproject.toml" ] || [ -f "requirements.txt" ]; then echo "python"; else echo "unknown"; fi`
- Test files found: !`fd "(test|spec)" --type f | head -10 || echo "No test files detected"`
- CI history available: !`if [ -d ".github/workflows" ]; then echo "GitHub Actions detected"; elif [ -f ".gitlab-ci.yml" ]; then echo "GitLab CI detected"; else echo "No CI detected"; fi`
- Git repository: !`git status --porcelain | wc -l | tr -d ' '` uncommitted changes
- Recent test failures: !`git log --since="7 days ago" --oneline --grep="test.*fail\|fix.*test\|flaky" | wc -l | tr -d ' '` commits

## Your Task

STEP 1: Initialize comprehensive flaky test analysis session

- CREATE session state file: `/tmp/flaky-test-session-$SESSION_ID.json`
- ANALYZE project structure and testing framework from Context section
- DETERMINE scope: specific test vs. project-wide analysis based on $ARGUMENTS
- VALIDATE required tools and testing environment

```bash
# Initialize flaky test analysis session
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetTest": "'$ARGUMENTS'",
  "testFramework": "auto-detect",
  "analysisScope": "determine-from-args",
  "flakyPatterns": [],
  "stabilizationActions": [],
  "monitoringSetup": false
}' > /tmp/flaky-test-session-$SESSION_ID.json
```

STEP 2: Parallel comprehensive analysis using sub-agent coordination

IF project_complexity == "large" OR scope == "project-wide":

LAUNCH parallel sub-agents for comprehensive flaky test investigation:

- **Agent 1: Test History Mining**: Analyze git history and CI failures for flake patterns
  - Focus: Git commit analysis, CI failure extraction, test modification patterns
  - Tools: git log analysis, gh CLI for GitHub Actions, pattern extraction with rg
  - Output: Historical flake data and frequency analysis

- **Agent 2: Framework-Specific Detection**: Analyze test code for flaky patterns by framework
  - Focus: Timeout issues, race conditions, randomness, async patterns
  - Tools: rg for pattern matching, fd for test file discovery, framework-specific analysis
  - Output: Code-level flaky pattern identification and severity assessment

- **Agent 3: CI/CD Integration Analysis**: Extract test results and failure patterns from CI systems
  - Focus: GitHub Actions logs, test result artifacts, failure frequency
  - Tools: gh CLI, jq for JSON processing, log analysis
  - Output: CI-based flake statistics and automation insights

- **Agent 4: Test Environment Assessment**: Analyze test configuration and environment stability
  - Focus: Test setup, teardown, isolation, external dependencies
  - Tools: Configuration file analysis, dependency detection
  - Output: Environment stability recommendations

ELSE:

EXECUTE focused single-test analysis workflow:

## Context Intelligence

STEP 3: Intelligent test framework detection and adaptation

TRY:

**Framework-Adaptive Analysis Pattern:**

```bash
# Enhanced framework detection with tool validation
detect_test_framework() {
  local session_id="$SESSION_ID"
  
  if [ -f "deno.json" ]; then
    FRAMEWORK="deno"
    TEST_COMMAND="deno test"
    TEST_FILES=$(fd "(test|spec)" --extension ts --extension js | head -20)
    STABILITY_TOOLS="deno_test_utils"
  elif [ -f "Cargo.toml" ]; then
    FRAMEWORK="rust"
    TEST_COMMAND="cargo test"
    TEST_FILES=$(fd "_test\.rs$|tests/" --type f | head -20)
    STABILITY_TOOLS="tokio_test"
  elif [ -f "go.mod" ]; then
    FRAMEWORK="go"
    TEST_COMMAND="go test"
    TEST_FILES=$(fd "_test\.go$" | head -20)
    STABILITY_TOOLS="testify"
  elif [ -f "package.json" ]; then
    FRAMEWORK="node"
    TEST_COMMAND="npm test"
    TEST_FILES=$(fd "(test|spec)\.(js|ts|jsx|tsx)$" | head -20)
    STABILITY_TOOLS="jest_retry"
  elif [ -f "pyproject.toml" ] || [ -f "requirements.txt" ]; then
    FRAMEWORK="python"
    TEST_COMMAND="pytest"
    TEST_FILES=$(fd "test_.*\.py$|.*_test\.py$" | head -20)
    STABILITY_TOOLS="pytest_rerunfailures"
  else
    echo "❌ Unknown testing framework - manual analysis required"
    exit 1
  fi
  
  # Update session state with framework details
  jq --arg fw "$FRAMEWORK" --arg cmd "$TEST_COMMAND" --arg tools "$STABILITY_TOOLS" '
    .testFramework = $fw | 
    .testCommand = $cmd | 
    .stabilityTools = $tools
  ' /tmp/flaky-test-session-$session_id.json > /tmp/flaky-test-session-$session_id.tmp && 
  mv /tmp/flaky-test-session-$session_id.tmp /tmp/flaky-test-session-$session_id.json
}

detect_test_framework
```

STEP 4: Advanced CI/CD integration with intelligent failure pattern extraction

**Enhanced CI History Analysis:**

```bash
# Advanced GitHub Actions analysis with error categorization
analyze_github_ci() {
  local session_id="$SESSION_ID"
  
  if [ -d ".github/workflows" ]; then
    echo "🔍 Analyzing GitHub Actions test history..."
    
    # Extract comprehensive CI data
    gh run list --limit 100 --json status,conclusion,createdAt,workflowName,databaseId > /tmp/ci_history_$session_id.json
    
    # Analyze failure patterns with enhanced extraction
    jq -r '.[] | select(.conclusion == "failure") | .databaseId' /tmp/ci_history_$session_id.json | \
    head -10 | while read run_id; do
      echo "📋 Processing run: $run_id"
      
      # Extract structured failure data
      gh run view "$run_id" --log 2>/dev/null | \
        rg "(FAIL:|Error:|Failed:|timeout|TimeoutError|race condition|flaky)" \
        --context 2 > "/tmp/failed_tests_${run_id}_$session_id.log" || true
    done
    
    # Generate CI failure summary
    echo '{
      "totalRuns": 0,
      "failedRuns": 0,
      "flakyPatterns": {
        "timeout": 0,
        "race_condition": 0,
        "network": 0,
        "randomness": 0
      }
    }' > "/tmp/ci_analysis_$session_id.json"
    
    # Populate analysis data
    total_runs=$(jq '. | length' /tmp/ci_history_$session_id.json)
    failed_runs=$(jq '[.[] | select(.conclusion == "failure")] | length' /tmp/ci_history_$session_id.json)
    
    jq --arg total "$total_runs" --arg failed "$failed_runs" '
      .totalRuns = ($total | tonumber) |
      .failedRuns = ($failed | tonumber)
    ' "/tmp/ci_analysis_$session_id.json" > "/tmp/ci_analysis_$session_id.tmp" && \
    mv "/tmp/ci_analysis_$session_id.tmp" "/tmp/ci_analysis_$session_id.json"
  fi
}

# GitLab CI analysis with API integration
analyze_gitlab_ci() {
  local session_id="$SESSION_ID"
  
  if [ -f ".gitlab-ci.yml" ]; then
    echo "🦊 Analyzing GitLab CI test history..."
    
    # Enhanced GitLab CI analysis (requires GITLAB_TOKEN)
    if [ -n "$GITLAB_TOKEN" ] && [ -n "$CI_PROJECT_ID" ]; then
      curl -s -H "PRIVATE-TOKEN: $GITLAB_TOKEN" \
        "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/pipelines?status=failed&per_page=50" \
        > "/tmp/gitlab_failures_$session_id.json" || true
    else
      echo "⚠️ GitLab analysis requires GITLAB_TOKEN and CI_PROJECT_ID environment variables"
    fi
  fi
}

# Execute CI analysis
analyze_github_ci
analyze_gitlab_ci
```

STEP 5: Advanced pattern recognition with machine learning-inspired analysis

**Intelligent Flaky Pattern Detection:**

```bash
# Enhanced pattern analysis with weighted scoring
analyze_flaky_patterns() {
  local test_logs="$1"
  local session_id="$SESSION_ID"
  
  echo "🧠 Executing intelligent flaky pattern analysis..."
  
  # Create comprehensive pattern detection
  if [ -f "$test_logs" ]; then
    # Advanced pattern detection with context awareness
    timeout_count=$(rg "(TimeoutError|timeout|timed out|TIMEOUT)" "$test_logs" --count --no-filename 2>/dev/null || echo 0)
    race_count=$(rg "(Race condition|race|concurrent|parallel|deadlock)" "$test_logs" --count --no-filename 2>/dev/null || echo 0)
    network_count=$(rg "(Network error|connection|ECONNREFUSED|502|503|504|DNS)" "$test_logs" --count --no-filename 2>/dev/null || echo 0)
    random_count=$(rg "(Random|Math\.random|uuid|timestamp|Date\.now)" "$test_logs" --count --no-filename 2>/dev/null || echo 0)
    ui_count=$(rg "(Element not found|NoSuchElementException|element is not visible|stale element)" "$test_logs" --count --no-filename 2>/dev/null || echo 0)
    db_count=$(rg "(Database.*lock|deadlock|transaction|connection pool)" "$test_logs" --count --no-filename 2>/dev/null || echo 0)
    memory_count=$(rg "(OutOfMemoryError|memory|heap|GC|garbage)" "$test_logs" --count --no-filename 2>/dev/null || echo 0)
    async_count=$(rg "(async|await|Promise|Future|CompletableFuture)" "$test_logs" --count --no-filename 2>/dev/null || echo 0)
    
    # Calculate severity scores (weighted by impact and frequency)
    total_patterns=$((timeout_count + race_count + network_count + random_count + ui_count + db_count + memory_count + async_count))
    
    # Generate enhanced pattern report with severity assessment
    cat > "/tmp/flaky_patterns_$session_id.json" << EOF
{
  "analysisTimestamp": "$(gdate -Iseconds 2>/dev/null || date -Iseconds)",
  "testLogFile": "$test_logs",
  "patterns": {
    "timing_issues": {
      "count": $timeout_count,
      "severity": "$([ $timeout_count -gt 5 ] && echo 'critical' || [ $timeout_count -gt 2 ] && echo 'high' || echo 'medium')",
      "weight": 0.3
    },
    "race_conditions": {
      "count": $race_count,
      "severity": "$([ $race_count -gt 3 ] && echo 'critical' || [ $race_count -gt 1 ] && echo 'high' || echo 'medium')",
      "weight": 0.25
    },
    "network_issues": {
      "count": $network_count,
      "severity": "$([ $network_count -gt 4 ] && echo 'high' || [ $network_count -gt 1 ] && echo 'medium' || echo 'low')",
      "weight": 0.2
    },
    "randomness": {
      "count": $random_count,
      "severity": "$([ $random_count -gt 3 ] && echo 'high' || [ $random_count -gt 1 ] && echo 'medium' || echo 'low')",
      "weight": 0.15
    },
    "ui_timing": {
      "count": $ui_count,
      "severity": "$([ $ui_count -gt 2 ] && echo 'high' || [ $ui_count -gt 0 ] && echo 'medium' || echo 'low')",
      "weight": 0.1
    },
    "database_issues": {
      "count": $db_count,
      "severity": "$([ $db_count -gt 2 ] && echo 'critical' || [ $db_count -gt 0 ] && echo 'high' || echo 'low')",
      "weight": 0.2
    },
    "memory_issues": {
      "count": $memory_count,
      "severity": "$([ $memory_count -gt 1 ] && echo 'critical' || echo 'medium')",
      "weight": 0.15
    },
    "async_patterns": {
      "count": $async_count,
      "severity": "$([ $async_count -gt 5 ] && echo 'medium' || echo 'low')",
      "weight": 0.1
    }
  },
  "totalPatterns": $total_patterns,
  "overallSeverity": "$([ $total_patterns -gt 15 ] && echo 'critical' || [ $total_patterns -gt 8 ] && echo 'high' || [ $total_patterns -gt 3 ] && echo 'medium' || echo 'low')",
  "recommendedActions": []
}
EOF
  else
    echo "⚠️ Test log file not found: $test_logs"
    echo '{}' > "/tmp/flaky_patterns_$session_id.json"
  fi
  
  echo "📊 Pattern analysis complete. Results: /tmp/flaky_patterns_$session_id.json"
}
```

STEP 6: Advanced stability scoring with statistical analysis

**Statistical Test Stability Analysis Generator:**

```bash
# Generate advanced flaky test analyzer with enhanced statistical methods
generate_stability_analyzer() {
  local session_id="$SESSION_ID"
  
  cat > "/tmp/flaky_test_analyzer_$session_id.ts" << 'EOF'
// Generated Enhanced Flaky Test Analyzer with Statistical Intelligence

interface TestRun {
  name: string;
  timestamp: string;
  status: "pass" | "fail" | "skip" | "flaky";
  duration: number;
  error?: string;
  retryCount?: number;
  environment?: string;
  commitHash?: string;
}

interface FlakeScore {
  testName: string;
  totalRuns: number;
  failures: number;
  flakeRate: number;
  avgDuration: number;
  durationVariance: number;
  patterns: FlakePattern[];
  severity: "low" | "medium" | "high" | "critical";
  confidence: number;
  recommendedFixes: string[];
  environmentalFactors: EnvironmentalFactor[];
}

interface FlakePattern {
  type: string;
  frequency: number;
  confidence: number;
  description: string;
  mitigation: string;
}

interface EnvironmentalFactor {
  factor: string;
  impact: "low" | "medium" | "high";
  correlation: number;
}

export class EnhancedFlakyTestAnalyzer {
  private readonly FLAKE_THRESHOLD = 0.05; // 5% failure rate
  private readonly MIN_RUNS_FOR_ANALYSIS = 5;
  private readonly CONFIDENCE_THRESHOLD = 0.8;

  analyzeTestStability(testRuns: TestRun[], threshold = 3): FlakeScore[] {
    const testGroups = this.groupTestsByName(testRuns);

    return Object.entries(testGroups)
      .map(([testName, runs]) => this.analyzeTestGroup(testName, runs, threshold))
      .filter((score) => score.failures >= threshold && score.confidence >= this.CONFIDENCE_THRESHOLD)
      .sort((a, b) => b.severity === a.severity ? b.flakeRate - a.flakeRate : this.severityWeight(b.severity) - this.severityWeight(a.severity));
  }

  private analyzeTestGroup(testName: string, runs: TestRun[], threshold: number): FlakeScore {
    const failures = runs.filter((r) => r.status === "fail").length;
    const totalRuns = runs.length;
    const flakeRate = failures / totalRuns;

    // Statistical analysis
    const durations = runs.map((r) => r.duration);
    const avgDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    const durationVariance = this.calculateVariance(durations, avgDuration);
    
    // Pattern detection with confidence scoring
    const patterns = this.detectAdvancedPatterns(runs);
    
    // Environmental factor analysis
    const environmentalFactors = this.analyzeEnvironmentalFactors(runs);
    
    // Confidence calculation based on sample size and consistency
    const confidence = this.calculateConfidence(totalRuns, flakeRate, durationVariance);
    
    // Generate recommended fixes
    const recommendedFixes = this.generateRecommendedFixes(patterns, environmentalFactors);

    return {
      testName,
      totalRuns,
      failures,
      flakeRate,
      avgDuration,
      durationVariance,
      patterns,
      severity: this.calculateEnhancedSeverity(flakeRate, failures, threshold, confidence, patterns),
      confidence,
      recommendedFixes,
      environmentalFactors,
    };
  }

  private detectAdvancedPatterns(runs: TestRun[]): FlakePattern[] {
    const patterns: FlakePattern[] = [];
    const failedRuns = runs.filter((r) => r.status === "fail");
    const totalRuns = runs.length;

    // Time-based pattern detection
    const durations = runs.map((r) => r.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const stdDev = Math.sqrt(this.calculateVariance(durations, avgDuration));
    
    if (stdDev > avgDuration * 0.5) {
      patterns.push({
        type: "inconsistent_timing",
        frequency: stdDev / avgDuration,
        confidence: this.calculatePatternConfidence(totalRuns, 0.8),
        description: "Test execution time varies significantly between runs",
        mitigation: "Add explicit timeouts and retry mechanisms"
      });
    }

    // Error pattern analysis with enhanced categorization
    const errorCategories = this.categorizeErrors(failedRuns);
    
    Object.entries(errorCategories).forEach(([category, { count, confidence }]) => {
      if (count > 0) {
        patterns.push({
          type: category,
          frequency: count / totalRuns,
          confidence,
          description: this.getPatternDescription(category),
          mitigation: this.getPatternMitigation(category)
        });
      }
    });

    // Temporal pattern detection
    const temporalPatterns = this.detectTemporalPatterns(runs);
    patterns.push(...temporalPatterns);

    return patterns.filter(p => p.confidence > 0.6);
  }

  private categorizeErrors(failedRuns: TestRun[]): Record<string, { count: number; confidence: number }> {
    const categories = {
      timeout: { patterns: [/timeout|timed out|TimeoutError/i], count: 0 },
      network: { patterns: [/network|connection|refused|502|503|504/i], count: 0 },
      race_condition: { patterns: [/race|concurrent|deadlock/i], count: 0 },
      ui_timing: { patterns: [/element.*not.*found|not.*visible|stale/i], count: 0 },
      randomness: { patterns: [/random|uuid|Math\.random/i], count: 0 },
      memory: { patterns: [/OutOfMemoryError|heap|memory/i], count: 0 },
      database: { patterns: [/database.*lock|transaction.*timeout/i], count: 0 }
    };

    const result: Record<string, { count: number; confidence: number }> = {};

    Object.entries(categories).forEach(([category, { patterns }]) => {
      const count = failedRuns.filter(run => 
        patterns.some(pattern => pattern.test(run.error || ""))
      ).length;
      
      result[category] = {
        count,
        confidence: this.calculatePatternConfidence(failedRuns.length, count / Math.max(failedRuns.length, 1))
      };
    });

    return result;
  }

  private detectTemporalPatterns(runs: TestRun[]): FlakePattern[] {
    const patterns: FlakePattern[] = [];
    const sortedRuns = runs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    // Check for time-of-day patterns
    const hourlyFailures = new Map<number, number>();
    sortedRuns.filter(r => r.status === "fail").forEach(run => {
      const hour = new Date(run.timestamp).getHours();
      hourlyFailures.set(hour, (hourlyFailures.get(hour) || 0) + 1);
    });

    const maxHourlyFailures = Math.max(...hourlyFailures.values());
    if (maxHourlyFailures > runs.length * 0.3) {
      patterns.push({
        type: "time_dependent",
        frequency: maxHourlyFailures / runs.length,
        confidence: 0.7,
        description: "Test failures correlate with specific times of day",
        mitigation: "Investigate time-dependent external dependencies"
      });
    }

    return patterns;
  }

  private analyzeEnvironmentalFactors(runs: TestRun[]): EnvironmentalFactor[] {
    const factors: EnvironmentalFactor[] = [];
    
    // Environment-based failure analysis
    const environmentFailures = new Map<string, { total: number; failures: number }>();
    
    runs.forEach(run => {
      const env = run.environment || "unknown";
      const current = environmentFailures.get(env) || { total: 0, failures: 0 };
      current.total++;
      if (run.status === "fail") current.failures++;
      environmentFailures.set(env, current);
    });

    environmentFailures.forEach(({ total, failures }, env) => {
      const failureRate = failures / total;
      if (failureRate > 0.1 && total > 2) {
        factors.push({
          factor: `environment_${env}`,
          impact: failureRate > 0.3 ? "high" : failureRate > 0.15 ? "medium" : "low",
          correlation: failureRate
        });
      }
    });

    return factors;
  }

  private calculateVariance(values: number[], mean: number): number {
    return values.reduce((sq, value) => sq + Math.pow(value - mean, 2), 0) / values.length;
  }

  private calculateConfidence(sampleSize: number, flakeRate: number, variance: number): number {
    // Confidence increases with sample size and decreases with high variance
    const sizeConfidence = Math.min(sampleSize / 20, 1);
    const varianceConfidence = 1 - Math.min(variance / 10000, 0.5);
    const rateConfidence = flakeRate > 0.05 ? 1 : flakeRate / 0.05;
    
    return (sizeConfidence + varianceConfidence + rateConfidence) / 3;
  }

  private calculatePatternConfidence(totalSamples: number, frequency: number): number {
    return Math.min((totalSamples * frequency) / 5, 1);
  }

  private calculateEnhancedSeverity(
    flakeRate: number,
    failures: number,
    threshold: number,
    confidence: number,
    patterns: FlakePattern[]
  ): "low" | "medium" | "high" | "critical" {
    const baseSeverity = this.calculateBaseSeverity(flakeRate, failures, threshold);
    const patternSeverity = this.calculatePatternSeverity(patterns);
    
    // Adjust severity based on confidence and pattern analysis
    const adjustedSeverity = Math.max(
      this.severityWeight(baseSeverity),
      this.severityWeight(patternSeverity)
    ) * confidence;
    
    if (adjustedSeverity >= 0.8) return "critical";
    if (adjustedSeverity >= 0.6) return "high";
    if (adjustedSeverity >= 0.3) return "medium";
    return "low";
  }

  private calculateBaseSeverity(flakeRate: number, failures: number, threshold: number): "low" | "medium" | "high" | "critical" {
    if (flakeRate > 0.5 || failures > threshold * 3) return "critical";
    if (flakeRate > 0.3 || failures > threshold * 2) return "high";
    if (flakeRate > 0.1 || failures > threshold) return "medium";
    return "low";
  }

  private calculatePatternSeverity(patterns: FlakePattern[]): "low" | "medium" | "high" | "critical" {
    const criticalPatterns = ["race_condition", "database", "memory"];
    const highPatterns = ["timeout", "network"];
    
    const hasCritical = patterns.some(p => criticalPatterns.includes(p.type) && p.confidence > 0.7);
    const hasHigh = patterns.some(p => highPatterns.includes(p.type) && p.confidence > 0.6);
    
    if (hasCritical) return "critical";
    if (hasHigh) return "high";
    if (patterns.length > 2) return "medium";
    return "low";
  }

  private severityWeight(severity: string): number {
    switch (severity) {
      case "critical": return 1.0;
      case "high": return 0.75;
      case "medium": return 0.5;
      case "low": return 0.25;
      default: return 0;
    }
  }

  private generateRecommendedFixes(patterns: FlakePattern[], environmentalFactors: EnvironmentalFactor[]): string[] {
    const fixes = new Set<string>();
    
    patterns.forEach(pattern => {
      fixes.add(pattern.mitigation);
    });
    
    // Environment-specific fixes
    environmentalFactors.forEach(factor => {
      if (factor.impact === "high") {
        fixes.add(`Investigate ${factor.factor} reliability`);
      }
    });
    
    // Generic stability improvements
    fixes.add("Implement retry mechanisms with exponential backoff");
    fixes.add("Add comprehensive test isolation and cleanup");
    fixes.add("Use deterministic test data and mock external dependencies");
    
    return Array.from(fixes);
  }

  private getPatternDescription(category: string): string {
    const descriptions: Record<string, string> = {
      timeout: "Test execution exceeds expected time limits",
      network: "Network connectivity or external service issues",
      race_condition: "Concurrent execution causing non-deterministic behavior",
      ui_timing: "UI element timing and synchronization issues",
      randomness: "Non-deterministic test data or behavior",
      memory: "Memory allocation or garbage collection issues",
      database: "Database connectivity, locking, or transaction issues"
    };
    return descriptions[category] || "Unknown pattern type";
  }

  private getPatternMitigation(category: string): string {
    const mitigations: Record<string, string> = {
      timeout: "Increase timeouts and add retry logic",
      network: "Mock external services and add network resilience",
      race_condition: "Add proper synchronization and atomic operations",
      ui_timing: "Use explicit waits and element visibility checks",
      randomness: "Use fixed seeds and deterministic test data",
      memory: "Optimize memory usage and add garbage collection hints",
      database: "Use test transactions and database isolation"
    };
    return mitigations[category] || "Manual investigation required";
  }

  private groupTestsByName(testRuns: TestRun[]): Record<string, TestRun[]> {
    return testRuns.reduce((groups, run) => {
      const group = groups[run.name] || [];
      group.push(run);
      groups[run.name] = group;
      return groups;
    }, {} as Record<string, TestRun[]>);
  }
}
EOF

  echo "✅ Generated enhanced stability analyzer: /tmp/flaky_test_analyzer_$session_id.ts"
}

generate_stability_analyzer
```

STEP 7: Advanced git history mining with statistical trend analysis

**Enhanced Git-Based Test History Analysis:**

````bash
# Comprehensive test history extraction with trend analysis
extract_enhanced_test_history() {
  local session_id="$SESSION_ID"
  echo "📊 Executing comprehensive test history mining..."
  
  # Multi-timeframe analysis for trend detection
  for period in "7 days ago" "30 days ago" "90 days ago"; do
    period_label=$(echo "$period" | tr ' ' '_')
    
    # Test file modifications by period
    git log --since="$period" --oneline --name-only --pretty=format: | \
      rg "(test|spec)" | sort | uniq -c | sort -nr > "/tmp/test_changes_${period_label}_$session_id.txt"
    
    # Failure-related commits by period
    git log --since="$period" --grep="(test.*fail|fix.*test|flaky|timeout|race)" \
      --oneline --format="%h %ai %s" > "/tmp/test_failures_${period_label}_$session_id.txt"
    
    # CI/CD related failures
    git log --since="$period" --grep="(ci.*fail|build.*fail|pipeline.*fail|github.*action)" \
      --oneline --format="%h %ai %s" > "/tmp/ci_failures_${period_label}_$session_id.txt"
  done
  
  # Generate comprehensive history analysis
  echo '{
    "analysisTimestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
    "periods": {
      "7_days": {},
      "30_days": {},
      "90_days": {}
    },
    "trends": {
      "testModificationFrequency": "stable|increasing|decreasing",
      "failureFrequency": "stable|increasing|decreasing",
      "flakyTestIntroduction": "low|medium|high"
    },
    "hotspots": []
  }' > "/tmp/test_history_analysis_$session_id.json"
  
  # Populate analysis data
  for period in "7_days_ago" "30_days_ago" "90_days_ago"; do
    test_changes=$(wc -l < "/tmp/test_changes_${period}_$session_id.txt" 2>/dev/null || echo 0)
    test_failures=$(wc -l < "/tmp/test_failures_${period}_$session_id.txt" 2>/dev/null || echo 0)
    ci_failures=$(wc -l < "/tmp/ci_failures_${period}_$session_id.txt" 2>/dev/null || echo 0)
    
    jq --arg period "$period" --arg changes "$test_changes" --arg failures "$test_failures" --arg ci "$ci_failures" '
      .periods[$period] = {
        "testChanges": ($changes | tonumber),
        "testFailures": ($failures | tonumber),
        "ciFailures": ($ci | tonumber)
      }
    ' "/tmp/test_history_analysis_$session_id.json" > "/tmp/test_history_analysis_$session_id.tmp" && \
    mv "/tmp/test_history_analysis_$session_id.tmp" "/tmp/test_history_analysis_$session_id.json"
  done
}

# Advanced test modification pattern analysis
analyze_advanced_test_modifications() {
  local session_id="$SESSION_ID"
  echo "🔄 Executing advanced test modification pattern analysis..."
  
  # Identify test maintenance hotspots
  git log --since="30 days ago" --name-only --pretty=format: | \
    rg "(test|spec)" | sort | uniq -c | sort -nr | head -20 > "/tmp/test_hotspots_$session_id.txt"
  
  # Analyze test stability over time (tests that were recently modified due to flakiness)
  git log --since="90 days ago" --oneline --name-only \
    --grep="(flaky|timeout|race|unstable|intermittent)" > "/tmp/flaky_related_changes_$session_id.txt"
  
  # Test files with recent stability issues
  rg "(test|spec)" "/tmp/flaky_related_changes_$session_id.txt" 2>/dev/null | \
    sort | uniq -c | sort -nr > "/tmp/stability_problem_tests_$session_id.txt"
  
  # Calculate test maintenance burden score
  if [ -f "/tmp/test_hotspots_$session_id.txt" ]; then
    total_test_files=$(fd "(test|spec)" --type f | wc -l)
    hotspot_files=$(wc -l < "/tmp/test_hotspots_$session_id.txt")
    maintenance_burden=$(( (hotspot_files * 100) / (total_test_files + 1) ))
    
    echo "📈 Test Maintenance Metrics:"
    echo "   Total test files: $total_test_files"
    echo "   Frequently modified: $hotspot_files"
    echo "   Maintenance burden: ${maintenance_burden}%"
    
    # Update session state with maintenance metrics
    jq --arg burden "$maintenance_burden" --arg total "$total_test_files" --arg hotspots "$hotspot_files" '
      .maintenanceMetrics = {
        "totalTestFiles": ($total | tonumber),
        "hotspotFiles": ($hotspots | tonumber),
        "maintenanceBurden": ($burden | tonumber)
      }
    ' "/tmp/flaky-test-session-$session_id.json" > "/tmp/flaky-test-session-$session_id.tmp" && \
    mv "/tmp/flaky-test-session-$session_id.tmp" "/tmp/flaky-test-session-$session_id.json"
  fi
}

# Execute enhanced history analysis
extract_enhanced_test_history
analyze_advanced_test_modifications

## Automated Stabilization Techniques

### 1. Timeout and Retry Fixes

**Intelligent Timeout Adjustment:**

```typescript
// Generated timeout fixes for different frameworks

// Deno/JavaScript timeout improvements
export function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000,
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await fn();
        resolve(result);
        return;
      } catch (error) {
        if (attempt === maxRetries) {
          reject(error);
          return;
        }

        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  });
}

// Enhanced test wrapper with stability improvements
export function stabilizeTest(testFn: () => Promise<void>, options?: {
  retries?: number;
  timeout?: number;
  skipOnCI?: boolean;
}) {
  return async () => {
    const { retries = 3, timeout = 30000, skipOnCI = false } = options || {};

    if (skipOnCI && Deno.env.get("CI")) {
      console.log("⏭️  Skipping flaky test in CI environment");
      return;
    }

    const testWithTimeout = () =>
      Promise.race([
        testFn(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Test timeout after ${timeout}ms`)), timeout)
        ),
      ]);

    return withRetry(testWithTimeout, retries);
  };
}
````

**Framework-Specific Stabilization:**

**Rust Test Stabilization:**

```rust
// Generated Rust test stability improvements
use std::time::{Duration, Instant};
use tokio::time::sleep;

pub async fn with_retry<F, Fut, T, E>(
    mut f: F,
    max_retries: usize,
    base_delay: Duration,
) -> Result<T, E>
where
    F: FnMut() -> Fut,
    Fut: std::future::Future<Output = Result<T, E>>,
    E: std::fmt::Debug,
{
    let mut last_error = None;
    
    for attempt in 1..=max_retries {
        match f().await {
            Ok(result) => return Ok(result),
            Err(e) => {
                last_error = Some(e);
                if attempt < max_retries {
                    let delay = base_delay * 2_u32.pow(attempt as u32 - 1);
                    sleep(delay).await;
                }
            }
        }
    }
    
    Err(last_error.unwrap())
}

// Macro for stable test execution
#[macro_export]
macro_rules! stable_test {
    ($name:ident, $body:expr) => {
        #[tokio::test]
        async fn $name() {
            const MAX_RETRIES: usize = 3;
            const BASE_DELAY: Duration = Duration::from_millis(100);
            
            with_retry(
                || async { $body.await },
                MAX_RETRIES,
                BASE_DELAY,
            )
            .await
            .expect("Test failed after retries");
        }
    };
}
```

### 2. Race Condition Fixes

**Synchronization Improvements:**

```typescript
// Generated synchronization utilities
export class TestSynchronizer {
  private static waitConditions: Map<string, () => Promise<boolean>> = new Map();

  static async waitFor(
    condition: () => Promise<boolean> | boolean,
    options: {
      timeout?: number;
      interval?: number;
      message?: string;
    } = {},
  ): Promise<void> {
    const { timeout = 10000, interval = 100, message = "Condition not met" } = options;
    const start = Date.now();

    while (Date.now() - start < timeout) {
      try {
        const result = await condition();
        if (result) return;
      } catch (error) {
        // Continue waiting on condition errors
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error(`${message} (timeout: ${timeout}ms)`);
  }

  static async waitForElement(selector: string, timeout = 10000): Promise<Element> {
    return this.waitFor(
      () => {
        const element = document.querySelector(selector);
        return Promise.resolve(!!element);
      },
      { timeout, message: `Element ${selector} not found` },
    ).then(() => document.querySelector(selector)!);
  }

  static async waitForApi(
    url: string,
    expectedStatus = 200,
    timeout = 10000,
  ): Promise<Response> {
    let lastResponse: Response | null = null;

    await this.waitFor(
      async () => {
        try {
          const response = await fetch(url);
          lastResponse = response;
          return response.status === expectedStatus;
        } catch {
          return false;
        }
      },
      { timeout, message: `API ${url} not ready` },
    );

    return lastResponse!;
  }
}
```

### 3. Test Isolation Improvements

**Database and State Reset:**

```typescript
// Generated test isolation utilities
export class TestIsolation {
  private static cleanupTasks: (() => Promise<void>)[] = [];

  static addCleanup(task: () => Promise<void>): void {
    this.cleanupTasks.push(task);
  }

  static async cleanup(): Promise<void> {
    for (const task of this.cleanupTasks) {
      try {
        await task();
      } catch (error) {
        console.warn("Cleanup task failed:", error);
      }
    }
    this.cleanupTasks.length = 0;
  }

  // Database isolation
  static async withTransaction<T>(
    db: Database,
    testFn: (tx: Transaction) => Promise<T>,
  ): Promise<T> {
    const tx = await db.transaction();
    try {
      const result = await testFn(tx);
      await tx.rollback(); // Always rollback in tests
      return result;
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }

  // HTTP service isolation
  static createIsolatedHttpClient(baseURL: string): HttpClient {
    const client = new HttpClient(baseURL);

    // Track requests for cleanup
    this.addCleanup(async () => {
      await client.cleanup?.();
    });

    return client;
  }
}
```

## Continuous Monitoring Setup

### 1. Test Metrics Collection

**CI/CD Integration for Flake Detection:**

```yaml
# Generated GitHub Actions workflow for flake monitoring
name: Flaky Test Monitor

on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  analyze-flakes:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Download test results
        uses: actions/github-script@v6
        with:
          script: |
            // Download artifacts from failed workflow
            const artifacts = await github.rest.actions.listWorkflowRunArtifacts({
              owner: context.repo.owner,
              repo: context.repo.repo,
              run_id: ${{ github.event.workflow_run.id }}
            });

            for (const artifact of artifacts.data.artifacts) {
              if (artifact.name.includes('test-results')) {
                // Process test results for flake analysis
              }
            }

      - name: Analyze flaky patterns
        run: |
          deno run --allow-all scripts/analyze-flakes.ts \
            --input test-results.json \
            --output flake-report.json \
            --threshold 3

      - name: Create issue for new flaky tests
        if: steps.analyze.outputs.new-flakes == 'true'
        uses: actions/github-script@v6
        with:
          script: |
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'New Flaky Tests Detected',
              body: '...' // Include flake analysis
            });
```

### 2. Flake Alerting System

**Slack/Discord Integration:**

```typescript
// Generated flake notification system
interface FlakeAlert {
  testName: string;
  flakeRate: number;
  recentFailures: number;
  patterns: string[];
  suggestedFixes: string[];
}

export class FlakeNotifier {
  async sendAlert(alert: FlakeAlert): Promise<void> {
    const webhook = Deno.env.get("SLACK_WEBHOOK_URL");
    if (!webhook) return;

    const message = {
      text: `🚨 Flaky Test Alert: ${alert.testName}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Flaky Test Detected*\n\n` +
              `• Test: \`${alert.testName}\`\n` +
              `• Flake Rate: ${(alert.flakeRate * 100).toFixed(1)}%\n` +
              `• Recent Failures: ${alert.recentFailures}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Detected Patterns:*\n${alert.patterns.map((p) => `• ${p}`).join("\n")}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Suggested Fixes:*\n${alert.suggestedFixes.map((f) => `• ${f}`).join("\n")}`,
          },
        },
      ],
    };

    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  }
}
```

## Report Generation

### Comprehensive Flake Analysis Report

**HTML Report Generation:**

```typescript
// Generated flake report generator
export class FlakeReporter {
  generateHTMLReport(flakeScores: FlakeScore[]): string {
    const criticalFlakes = flakeScores.filter((f) => f.severity === "critical");
    const highFlakes = flakeScores.filter((f) => f.severity === "high");

    return `
<!DOCTYPE html>
<html>
<head>
  <title>Flaky Test Analysis Report</title>
  <style>
    .critical { background-color: #ffe6e6; }
    .high { background-color: #fff2e6; }
    .medium { background-color: #fff9e6; }
    .chart { width: 100%; height: 300px; }
  </style>
</head>
<body>
  <h1>Flaky Test Analysis Report</h1>
  
  <div class="summary">
    <h2>Summary</h2>
    <ul>
      <li>Total Tests Analyzed: ${flakeScores.length}</li>
      <li>Critical Flaky Tests: ${criticalFlakes.length}</li>
      <li>High Priority Flaky Tests: ${highFlakes.length}</li>
    </ul>
  </div>
  
  <div class="details">
    <h2>Flaky Test Details</h2>
    <table>
      <thead>
        <tr>
          <th>Test Name</th>
          <th>Flake Rate</th>
          <th>Failures</th>
          <th>Patterns</th>
          <th>Severity</th>
        </tr>
      </thead>
      <tbody>
        ${
      flakeScores.map((score) => `
          <tr class="${score.severity}">
            <td>${score.testName}</td>
            <td>${(score.flakeRate * 100).toFixed(1)}%</td>
            <td>${score.failures}</td>
            <td>${score.patterns.join(", ")}</td>
            <td>${score.severity}</td>
          </tr>
        `).join("")
    }
      </tbody>
    </table>
  </div>
</body>
</html>`;
  }
}
```

## Integration with Other Commands

- Use with `/test-gen` to create stable tests from the start
- Combine with `/coverage` to ensure flake fixes don't reduce coverage
- Integrate with `/ci-gen` for automated flake detection in pipelines
- Use with `/monitor` to set up ongoing flake tracking

## Output

The command provides:

1. **Flake Analysis Report**: Detailed analysis of test stability patterns
2. **Automated Fixes**: Generated code improvements for common flake patterns
3. **Monitoring Setup**: Continuous flake detection and alerting
4. **Stability Utilities**: Reusable test stabilization functions
5. **CI Integration**: Automated flake tracking in development workflows