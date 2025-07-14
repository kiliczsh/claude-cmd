---
allowed-tools: Task, Read, Bash(rg:*), Bash(fd:*), Bash(jq:*), Bash(gdate:*), Bash(git:*), Bash(docker:*), Bash(trivy:*), Bash(gosec:*), Bash(cargo:*), Bash(mvn:*), Bash(gradle:*), Bash(npm:*), Bash(kubectl:*), Bash(helm:*)
name: "Audit"
description: "Comprehensive security audit with parallel analysis using modern tools and sub-agent coordination"
author: "wcygan"
tags: ["security","audit"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Current directory: !`pwd`
- Project type: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json|docker-compose\.yml)" . -d 3 | head -5 || echo "No build files detected"`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "Yes" || echo "No"`
- Repository files: !`fd . -t f | wc -l | tr -d ' '` files total
- Secret patterns detected: !`rg -i "(password|secret|key|token|api)" --type-add 'config:*.{json,yaml,yml,toml,env,properties}' --type config . | wc -l | tr -d ' '` potential matches
- Docker usage: !`fd "(Dockerfile|docker-compose\.yml|\.dockerignore)" . | wc -l | tr -d ' '` container files
- Kubernetes manifests: !`fd "\.ya?ml$" . | rg -l "(apiVersion|kind):" | wc -l | tr -d ' '` K8s files

## Your Task

STEP 1: Initialize comprehensive security audit session

```bash
# Create audit session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "projectType": "auto-detect",
  "auditPhases": {
    "discovery": "pending",
    "analysis": "pending",
    "reporting": "pending"
  },
  "findings": {
    "critical": [],
    "high": [],
    "medium": [],
    "low": []
  },
  "scannedFiles": 0,
  "totalIssues": 0
}' > /tmp/audit-session-$SESSION_ID.json
```

STEP 2: Parallel security discovery using sub-agent coordination

THINK HARD about the optimal security audit strategy based on project context.

LAUNCH 8 parallel sub-agents for comprehensive security analysis:

- **Agent 1: Credential Scanner**: Search for hardcoded secrets and credentials
  - Focus: API keys, passwords, tokens, AWS/GCP/Azure credentials, database strings
  - Scope: Source code, configuration files, environment files, Docker files
  - Tools: rg with secret patterns, specialized credential detection
  - Output: Classified findings by severity and exposure risk

- **Agent 2: Code Security Analyzer**: Language-specific security vulnerability analysis
  - Focus: SQL injection, XSS, command injection, deserialization flaws
  - Scope: Java (Spring Security), Go (SQL/exec), Rust (unsafe blocks), JavaScript/TypeScript
  - Tools: Static analysis patterns, framework-specific security checks
  - Output: Code-level vulnerabilities with line numbers and remediation

- **Agent 3: Dependency Vulnerability Scanner**: Third-party dependency security analysis
  - Focus: Known CVEs, outdated packages, vulnerable dependencies
  - Scope: package.json, Cargo.toml, go.mod, pom.xml, build.gradle
  - Tools: Security databases, version checking, vulnerability matching
  - Output: Dependency risk assessment with upgrade recommendations

- **Agent 4: Infrastructure Security Auditor**: Container and orchestration security
  - Focus: Docker security, Kubernetes RBAC, network policies, secrets management
  - Scope: Dockerfiles, K8s manifests, Helm charts, deployment configurations
  - Tools: Container scanning, manifest validation, security baseline checks
  - Output: Infrastructure security posture with compliance gaps

- **Agent 5: File Permissions Auditor**: File system security and access controls
  - Focus: Executable permissions, world-writable files, sensitive file access
  - Scope: Shell scripts, configuration files, .ssh directories, backup locations
  - Tools: File permission analysis, access control validation
  - Output: Permission vulnerabilities and access control recommendations

- **Agent 6: Git Security Scanner**: Version control security analysis
  - Focus: Committed secrets, sensitive data in history, branch protection
  - Scope: Git history, commit messages, tracked files, gitignore patterns
  - Tools: Git log analysis, historical secret detection, repository scanning
  - Output: Git security issues with remediation steps

- **Agent 7: Configuration Security Analyzer**: Security configuration assessment
  - Focus: Insecure defaults, missing security headers, weak cryptography
  - Scope: Application configs, web server configs, database settings, TLS configs
  - Tools: Configuration pattern analysis, security baseline comparison
  - Output: Configuration hardening recommendations

- **Agent 8: CI/CD Pipeline Security Auditor**: DevOps security analysis
  - Focus: Pipeline security, build process vulnerabilities, deployment risks
  - Scope: GitHub Actions, GitLab CI, Jenkins files, deployment scripts
  - Tools: Pipeline analysis, secret scanning in workflows, deployment validation
  - Output: DevOps security improvements and pipeline hardening

**Sub-Agent Coordination Pattern:**

```bash
echo "🔍 Launching parallel security audit agents..."
echo "Each agent focuses on specific security domains"
echo "Results will be aggregated into comprehensive report"
echo "Session tracking: /tmp/audit-session-$SESSION_ID.json"
```

STEP 3: Language-specific security analysis with targeted scanning

TRY:

CASE project_languages:
WHEN "Java detected":

```bash
# Java security scanning
echo "☕ Java project security analysis"

# Spring Security misconfigurations
rg "@EnableWebSecurity|@PreAuthorize|@Secured" --type java -A 3 -B 1

# SQL injection patterns
rg "(Statement|createStatement|executeQuery)" --type java -A 2

# Deserialization vulnerabilities
rg "(ObjectInputStream|readObject|Serializable)" --type java -A 2

# Dependency check (if available)
if command -v mvn >/dev/null; then
  echo "Running Maven dependency check..."
  mvn org.owasp:dependency-check-maven:check -DfailBuildOnCVSS=7 || true
fi
```

WHEN "Go detected":

```bash
# Go security scanning
echo "🐹 Go project security analysis"

# SQL injection patterns
rg "(Exec|Query|QueryRow).*\+" --type go -A 2

# Command injection in os/exec
rg "exec\.(Command|CommandContext)" --type go -A 3

# Path traversal vulnerabilities
rg "(filepath\.Join|path\.Join).*\.\." --type go -A 2

# Gosec static analysis (if available)
if command -v gosec >/dev/null; then
  echo "Running gosec security scanner..."
  gosec -fmt json -out /tmp/gosec-results-$SESSION_ID.json ./... || true
fi
```

WHEN "Rust detected":

```bash
# Rust security scanning
echo "🦀 Rust project security analysis"

# Unsafe block analysis
rg "unsafe" --type rust -A 5 -B 2

# Panic patterns in production code
rg "(panic!|unwrap\(\)|expect\()" --type rust -A 2

# Cargo audit (if available)
if command -v cargo >/dev/null; then
  echo "Running cargo audit..."
  cargo audit --json > /tmp/cargo-audit-$SESSION_ID.json 2>/dev/null || true
fi
```

WHEN "JavaScript/TypeScript detected":

```bash
# JavaScript/TypeScript security scanning
echo "⚡ JavaScript/TypeScript security analysis"

# Potential XSS vulnerabilities
rg "(innerHTML|outerHTML|dangerouslySetInnerHTML)" --type-add 'js:*.{js,ts,jsx,tsx}' --type js -A 2

# Eval usage (dangerous)
rg "(eval\(|Function\(|setTimeout.*string)" --type-add 'js:*.{js,ts,jsx,tsx}' --type js -A 2

# NPM audit (if available)
if command -v npm >/dev/null; then
  echo "Running npm audit..."
  npm audit --json > /tmp/npm-audit-$SESSION_ID.json 2>/dev/null || true
fi
```

STEP 4: Infrastructure security assessment with container scanning

**Docker Security Analysis:**

IF Docker files detected:

```bash
echo "🐳 Docker security analysis"

# Dockerfile security patterns
rg "(FROM.*:latest|USER root|COPY \. |ADD http)" . --type-add 'docker:Dockerfile*' --type docker

# Container image scanning (if Trivy available)
if command -v trivy >/dev/null; then
  echo "Running Trivy container security scan..."
  fd "Dockerfile" . | head -3 | while read dockerfile; do
    image_name=$(dirname "$dockerfile" | sed 's/[^a-zA-Z0-9]/_/g')
    trivy config "$dockerfile" --format json > "/tmp/trivy-config-$image_name-$SESSION_ID.json" 2>/dev/null || true
  done
fi

# Docker Compose security
fd "docker-compose\.ya?ml" . | head -3 | while read compose_file; do
  echo "Analyzing: $compose_file"
  rg "(privileged.*true|network_mode.*host|volumes.*:/)" "$compose_file" -A 1 -B 1 || true
done
```

**Kubernetes Security Analysis:**

IF Kubernetes manifests detected:

```bash
echo "☸️ Kubernetes security analysis"

# Security context analysis
rg "(privileged.*true|runAsRoot.*true|allowPrivilegeEscalation.*true)" --type yaml -A 2 -B 2

# RBAC misconfigurations
rg "(kind.*ClusterRole|verbs.*\[.*\*|resources.*\[.*\*)" --type yaml -A 5

# Missing security contexts
fd "\.ya?ml$" . | while read k8s_file; do
  if rg -q "(apiVersion|kind):" "$k8s_file"; then
    if ! rg -q "securityContext:" "$k8s_file"; then
      echo "❌ Missing securityContext in: $k8s_file"
    fi
  fi
done
```

CATCH (security_scan_failed):

```bash
echo "⚠️ Security scanning encountered errors:"
echo "- Some tools may not be installed (trivy, gosec, etc.)"
echo "- Continuing with available analysis methods"
echo "- Manual review recommended for complete coverage"
```

STEP 5: Comprehensive findings aggregation and risk assessment

**Results Processing:**

```bash
# Aggregate findings from all agents
echo "📊 Aggregating security audit results..."

# Update audit session state
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .auditPhases.analysis = "completed" |
  .auditPhases.reporting = "in-progress" |
  .lastUpdated = $timestamp
' /tmp/audit-session-$SESSION_ID.json > /tmp/audit-session-$SESSION_ID.tmp && \
mv /tmp/audit-session-$SESSION_ID.tmp /tmp/audit-session-$SESSION_ID.json

# Count total findings
total_issues=$(find /tmp -name "*-$SESSION_ID.json" 2>/dev/null | wc -l | tr -d ' ')
echo "Total analysis files generated: $total_issues"
```

STEP 6: Generate comprehensive security audit report

**Structured Report Generation:**

```bash
# Generate comprehensive audit report
report_file="/tmp/security-audit-$SESSION_ID.md"
echo "📝 Generating security audit report: $report_file"

cat > "$report_file" << 'EOF'
# Security Audit Report

Generated: $(gdate -Iseconds 2>/dev/null || date -Iseconds)
Session ID: $SESSION_ID
Project Type: $(fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml)" . -d 2 | head -1 | sed 's/.*\.//' | tr '[:lower:]' '[:upper:]' || echo "Mixed")
Audit Scope: $(pwd)

## Executive Summary

- **Total Files Scanned**: $(fd . -t f | wc -l | tr -d ' ')
- **Security Issues Found**: [TO_BE_CALCULATED]
- **Risk Level**: [TO_BE_DETERMINED]
- **Compliance Status**: Under Review

## Critical Issues (Immediate Action Required)

<!-- Critical findings will be populated by sub-agents -->

## High Priority (Fix Within 1 Week)

<!-- High priority findings will be populated by sub-agents -->

## Medium Priority (Plan to Fix)

<!-- Medium priority findings will be populated by sub-agents -->

## Low Priority (Best Practice Improvements)

<!-- Low priority findings will be populated by sub-agents -->

## Language-Specific Findings

### Java Security Issues
<!-- Java-specific findings -->

### Go Security Issues
<!-- Go-specific findings -->

### Rust Security Issues
<!-- Rust-specific findings -->

### JavaScript/TypeScript Security Issues
<!-- JS/TS-specific findings -->

## Infrastructure Security Assessment

### Container Security
<!-- Docker/container findings -->

### Kubernetes Security
<!-- K8s-specific findings -->

### CI/CD Pipeline Security
<!-- Pipeline security findings -->

## Compliance Assessment

- **OWASP Top 10 2023**: [Assessment Status]
- **CIS Benchmarks**: [Compliance Level]
- **NIST Cybersecurity Framework**: [Maturity Level]
- **SOC 2 Type II**: [If Applicable]

## Remediation Roadmap

### Immediate Actions (0-7 days)
1. [Action items for critical issues]

### Short Term (1-4 weeks)
1. [Action items for high priority issues]

### Medium Term (1-3 months)
1. [Action items for medium priority issues]

### Long Term (3+ months)
1. [Action items for low priority and strategic improvements]

## Technical Recommendations

### Security Tools Integration
- Static Analysis: [Recommended tools]
- Dependency Scanning: [Recommended tools]
- Container Scanning: [Recommended tools]
- Secret Detection: [Recommended tools]

### Development Process Improvements
- Security Code Review Guidelines
- Automated Security Testing Integration
- Secure Development Training
- Security Incident Response Plan

## Monitoring and Continuous Security

### Recommended Security Metrics
- Time to detect security issues
- Time to remediate vulnerabilities
- Dependency freshness score
- Security test coverage

### Ongoing Security Practices
- Regular dependency updates
- Automated vulnerability scanning
- Security-focused code reviews
- Penetration testing schedule

## Appendix

### Scan Results
- Session artifacts: /tmp/*-$SESSION_ID.json
- Tool outputs: [Links to detailed scan results]
- Raw findings: [Machine-readable data files]

### Tools Used
- Static Analysis: rg (ripgrep), fd
- Dependency Scanning: [Tool-specific results]
- Container Scanning: [Trivy/other results if available]
- Git Analysis: git log, history scanning

---

**Report Generated**: $(gdate -Iseconds 2>/dev/null || date -Iseconds)
**Audit Session**: $SESSION_ID
**Next Review Date**: $(gdate -d "+3 months" -Iseconds 2>/dev/null || date -d "+3 months" -Iseconds 2>/dev/null || echo "Schedule manually")
EOF

echo "✅ Security audit report generated: $report_file"
```

STEP 7: Session state finalization and follow-up recommendations

**Audit Completion:**

```bash
# Finalize audit session
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .auditPhases.reporting = "completed" |
  .completedAt = $timestamp |
  .reportLocation = "/tmp/security-audit-'$SESSION_ID'.md"
' /tmp/audit-session-$SESSION_ID.json > /tmp/audit-session-$SESSION_ID.tmp && \
mv /tmp/audit-session-$SESSION_ID.tmp /tmp/audit-session-$SESSION_ID.json

echo "🎯 Security audit completed successfully"
echo "📊 Session: $SESSION_ID"
echo "📝 Report: /tmp/security-audit-$SESSION_ID.md"
echo "💾 Session state: /tmp/audit-session-$SESSION_ID.json"
echo "🔍 Scan artifacts: /tmp/*-$SESSION_ID.json"
```

**Next Steps Guidance:**

```bash
echo ""
echo "🚀 Recommended Follow-up Actions:"
echo "1. Review generated report for critical and high-priority issues"
echo "2. Implement immediate security fixes for critical vulnerabilities"
echo "3. Set up automated security scanning in CI/CD pipeline"
echo "4. Schedule regular security audits (quarterly recommended)"
echo "5. Consider professional penetration testing for production systems"
echo ""
echo "🛡️ Security is an ongoing process - stay vigilant!"
```

FINALLY:

- CLEAN temporary working files (but preserve audit results)
- PROVIDE actionable next steps based on findings
- SCHEDULE follow-up security reviews
- RECOMMEND security tool integration for continuous monitoring

## Security Audit Best Practices

### Critical Security Patterns to Detect

**Credential Exposure:**

```bash
# Comprehensive secret patterns
rg -i "(api[_-]?key|secret[_-]?key|password|token|auth[_-]?token)\s*[=:]\s*['\"][^'\"\s]{8,}" . -A 1 -B 1

# Cloud provider credentials
rg "(AKIA[0-9A-Z]{16}|aws_access_key|gcp_service_account|azure_client)" . -i

# Database connection strings
rg "(jdbc:|mongodb://|postgres://|mysql://|redis://)" . -A 1
```

**Common Vulnerability Patterns:**

```bash
# SQL injection indicators
rg "(query|execute).*\+.*['\"]" . --type-add 'code:*.{java,go,js,ts,py,php}' --type code

# Command injection patterns
rg "(exec|system|eval|shell_exec)\(.*\$" . --type-add 'code:*.{java,go,js,ts,py,php,rb}' --type code

# Path traversal vulnerabilities
rg "(\.\./|\.\.\\\\ )" . --type-add 'code:*.{java,go,js,ts,py,php}' --type code
```

### Compliance Framework Mapping

**OWASP Top 10 2023 Coverage:**

1. A01 Broken Access Control → RBAC analysis, authorization checks
2. A02 Cryptographic Failures → TLS configs, encryption usage
3. A03 Injection → SQL, command, LDAP injection patterns
4. A04 Insecure Design → Architecture security review
5. A05 Security Misconfiguration → Default configs, security headers
6. A06 Vulnerable Components → Dependency vulnerability scanning
7. A07 Authentication Failures → Auth implementation review
8. A08 Software Data Integrity → Supply chain security
9. A09 Logging Failures → Log analysis, monitoring gaps
10. A10 SSRF → Server-side request forgery patterns

### Tool Integration Recommendations

**Essential Security Tools:**

- **Static Analysis**: SonarQube, CodeQL, Semgrep
- **Dependency Scanning**: Snyk, WhiteSource, OWASP Dependency Check
- **Container Security**: Trivy, Twistlock, Aqua Security
- **Secret Detection**: GitGuardian, TruffleHog, detect-secrets
- **Infrastructure**: Checkov, Terrascan, kube-score

**Automation Integration:**

```bash
# Example CI/CD security pipeline
echo "Security pipeline recommendations:"
echo "1. Pre-commit hooks for secret detection"
echo "2. Pull request security checks"
echo "3. Automated dependency updates"
echo "4. Container scanning in build pipeline"
echo "5. Infrastructure as Code security validation"
```

This comprehensive security audit command provides enterprise-grade security analysis with parallel sub-agent coordination, extensive language support, infrastructure security assessment, and actionable remediation guidance.