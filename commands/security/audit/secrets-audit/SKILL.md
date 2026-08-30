---
allowed-tools: Task, Bash(rg:*), Bash(fd:*), Bash(bat:*), Bash(jq:*), Bash(gdate:*), Bash(git:*), Bash(eza:*), Bash(wc:*), Bash(head:*), Bash(tail:*)
name: "Secrets Audit"
description: "Comprehensive security audit for leaked credentials with parallel analysis and state management"
author: "wcygan"
tags: ["security","audit"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Scan scope: $ARGUMENTS (default: comprehensive scan)
- Current directory: !`pwd`
- Git repository status: !`git status --porcelain 2>/dev/null | wc -l | tr -d ' '` modified files
- Project type detection: !`fd "(package\.json|Cargo\.toml|go\.mod|deno\.json|pom\.xml|build\.gradle|requirements\.txt)" . -d 2 | head -3 || echo "No build files detected"`
- Codebase size: !`fd "\.(js|ts|jsx|tsx|rs|go|java|py|rb|php|c|cpp|h|hpp|cs|kt|swift|scala|env|json|yaml|yml|toml)" . | wc -l | tr -d ' '` files
- Ignore patterns: !`test -f .gitignore && echo "✓ .gitignore found" || echo "⚠️ No .gitignore found"`
- Modern tools status: !`echo "rg: $(which rg >/dev/null && echo ✓ || echo ✗) | fd: $(which fd >/dev/null && echo ✓ || echo ✗) | bat: $(which bat >/dev/null && echo ✓ || echo ✗) | jq: $(which jq >/dev/null && echo ✓ || echo ✗)"`

## Your task

STEP 1: Initialize comprehensive security audit session with state management

TRY:

- CREATE session state file: `/tmp/secrets-audit-$SESSION_ID.json`
- VALIDATE modern CLI tools availability (rg, fd, bat, jq are MANDATORY)
- ANALYZE project context and determine scanning strategy
- ESTABLISH security baseline for comparison

```bash
# Initialize audit session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "scanScope": "'$ARGUMENTS'",
  "projectType": "auto-detect",
  "startTime": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "findings": [],
  "scannedFiles": 0,
  "riskLevel": "unknown",
  "recommendations": []
}' > /tmp/secrets-audit-$SESSION_ID.json
```

STEP 2: Adaptive scanning strategy selection with intelligent routing

CASE scan_scope:
WHEN "staged":

- EXECUTE targeted Git staged changes scan
- FOCUS on files ready for commit
- PREVENT secrets from entering repository

WHEN "recent":

- EXECUTE Git history analysis (last 30 days)
- SCAN recent commits for accidentally committed secrets
- IDENTIFY patterns in recent development

WHEN "comprehensive" OR empty:

- LAUNCH parallel sub-agents for thorough analysis
- COORDINATE comprehensive security audit
- GENERATE detailed security report

WHEN specific_patterns:

- EXECUTE targeted scan for user-specified patterns
- APPLY custom detection rules
- PROVIDE focused analysis results

**Quick Staged Changes Scan:**

```bash
# Git staged changes security scan
git diff --staged --name-only | xargs rg -i "(password|secret|key|token|credential|api_key)" --context 2 --color always

echo "🔍 Scanning staged changes for secrets..."
git diff --staged | rg -i "(password|secret|key|token|credential)" --context 2 --color always || echo "✅ No obvious secrets found in staged changes"
```

STEP 3: Parallel comprehensive security audit using sub-agent architecture

IF codebase_size > 500 files OR scan_scope contains "comprehensive":

LAUNCH parallel sub-agents for systematic security analysis:

- **Agent 1: Credentials & API Keys Scanner**: Search for API keys, tokens, and authentication credentials
  - Focus: AWS keys, GitHub tokens, API keys, OAuth secrets, JWT tokens
  - Tools: rg with credential-specific patterns, entropy analysis
  - Output: High-risk credential findings with immediate rotation recommendations

- **Agent 2: Database Security Scanner**: Analyze database connection strings and credentials
  - Focus: Connection strings, database passwords, MongoDB URIs, Redis credentials
  - Tools: rg with database-specific patterns, connection string analysis
  - Output: Database security vulnerabilities and access control findings

- **Agent 3: Private Key & Certificate Scanner**: Search for cryptographic materials and certificates
  - Focus: Private keys, certificates, SSH keys, PGP keys, SSL certificates
  - Tools: rg with crypto patterns, fd for certificate files, key format detection
  - Output: Cryptographic material exposure analysis

- **Agent 4: Configuration Security Scanner**: Audit configuration files and environment variables
  - Focus: .env files, config files, Docker secrets, Kubernetes secrets
  - Tools: fd for config files, rg for environment patterns, structured data analysis
  - Output: Configuration security assessment and hardening recommendations

- **Agent 5: Code & Comment Security Scanner**: Analyze source code and comments for sensitive information
  - Focus: Hardcoded secrets, TODO comments with credentials, debug information
  - Tools: rg with code-specific patterns, comment analysis, debug string detection
  - Output: Source code security findings and clean coding recommendations

**Sub-Agent Coordination:**

```bash
# Each agent reports findings to session state
echo "🚀 Launching parallel security analysis agents..."
echo "🔍 Comprehensive audit covers: credentials, databases, keys, configs, code"
echo "📊 Results will be aggregated and prioritized by risk level"
```

STEP 4: Execute targeted security pattern detection with modern tooling

**Core Security Pattern Detection:**

```bash
# High-priority credential patterns with risk classification
echo "🔍 Executing comprehensive pattern detection..."

# API Keys & Tokens (CRITICAL RISK)
rg -i "api[-_]?key\s*[:=]\s*['\"]?[a-zA-Z0-9]{20,}['\"]?" \
  --type-add 'config:*.{env,json,yaml,yml,toml,ini,conf}' \
  --type config --type js --type ts --type python --type go --type rust \
  --context 2 --color always

# Cloud Provider Keys (CRITICAL RISK)
rg -i "(aws_access_key|aws_secret|azure_client|gcp_service_account|AKIA[0-9A-Z]{16})" \
  --context 2 --color always

# GitHub Tokens (HIGH RISK)
rg "(ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{82}|gho_[a-zA-Z0-9]{36})" \
  --context 1 --color always

# JWT Tokens (MEDIUM RISK)
rg "eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*" \
  --context 1 --color always

# Database Connection Strings (CRITICAL RISK)
rg -i "(postgres|mysql|mongodb|redis)://.*:[^@]*@" \
  --context 2 --color always

# Private Key Headers (CRITICAL RISK)
rg "-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----" \
  --context 5 --color always

# High-Entropy Strings (MEDIUM RISK)
rg "[a-zA-Z0-9+/]{40,}={0,2}" --context 1 --color always | head -20
```

STEP 5: Comprehensive file discovery and analysis

TRY:

**Security-Sensitive File Discovery:**

```bash
# Find all potential security-sensitive files
echo "📁 Discovering security-sensitive files..."

# Environment and configuration files
fd "\.(env|environment|config|properties|ini|conf)$" --hidden --type file | head -10

# Certificate and key files
fd "\.(pem|key|p12|pfx|crt|cer|jks|keystore)$" --type file --hidden | head -10

# Backup and temporary files (often contain secrets)
fd "(backup|bak|tmp|temp).*\.(sql|dump|log)$" --type file | head -10

# Version control and deployment files
fd "(docker-compose|\.env\.|secrets|credentials)" --type file | head -10
```

**Interactive Security Review Interface:**

```bash
# Interactive secret discovery with fzf
echo "🔍 Launching interactive security review..."
rg -i "(password|secret|key|token|credential)" \
  --color=always --context 2 --type-add 'all:*' --type all \
  --glob '!node_modules/*' --glob '!target/*' --glob '!dist/*' --glob '!.git/*' | \
  head -50  # Limit output for manageable review
```

STEP 6: Results processing and risk assessment with state management

TRY:

**Structured Security Report Generation:**

```bash
# Generate JSON security report
echo "📊 Generating structured security analysis..."

# Count findings by risk category
rg -i "(password|secret|key|token|credential)" --json \
  --type-add 'all:*' --type all \
  --glob '!node_modules/*' --glob '!target/*' --glob '!dist/*' | \
  jq -r 'select(.type=="match") | {
    file: .data.path.text,
    line: .data.line_number,
    content: .data.lines.text,
    risk_category: (
      if (.data.lines.text | test("api.?key|aws_access|github_pat"; "i")) then "CRITICAL"
      elif (.data.lines.text | test("password|secret"; "i")) then "HIGH"
      else "MEDIUM" end
    )
  }' > /tmp/security-findings-$SESSION_ID.json

# Security statistics
echo "📈 Security audit statistics:"
echo "  Total files scanned: $(fd "\.(js|ts|py|go|rs|java|env|json|yaml)" . | wc -l | tr -d ' ')"
echo "  Potential findings: $(jq length < /tmp/security-findings-$SESSION_ID.json 2>/dev/null || echo 0)"
echo "  Critical risk items: $(jq '[.[] | select(.risk_category=="CRITICAL")] | length' < /tmp/security-findings-$SESSION_ID.json 2>/dev/null || echo 0)"
```

**Session State Update:**

```bash
# Update audit session with findings
if [ -f /tmp/security-findings-$SESSION_ID.json ]; then
  findings_count=$(jq length < /tmp/security-findings-$SESSION_ID.json)
  jq --argjson count "$findings_count" '
    .scannedFiles = '$scannedFiles' |
    .findingsCount = $count |
    .riskLevel = (if $count > 10 then "HIGH" elif $count > 5 then "MEDIUM" else "LOW" end) |
    .completedTime = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"
  ' /tmp/secrets-audit-$SESSION_ID.json > /tmp/secrets-audit-$SESSION_ID.tmp && \
  mv /tmp/secrets-audit-$SESSION_ID.tmp /tmp/secrets-audit-$SESSION_ID.json
fi
```

CATCH (security_scan_failed):

- LOG error details to session state
- PROVIDE fallback scanning strategies
- SUGGEST tool installation if modern tools missing

```bash
echo "⚠️ Security scan execution failed. Checking tool availability:"
echo "Required tools status:"
echo "  ripgrep (rg): $(which rg >/dev/null && echo '✓ installed' || echo '❌ missing - install with: brew install ripgrep')"
echo "  fd: $(which fd >/dev/null && echo '✓ installed' || echo '❌ missing - install with: brew install fd')"
echo "  bat: $(which bat >/dev/null && echo '✓ installed' || echo '❌ missing - install with: brew install bat')"
echo "  jq: $(which jq >/dev/null && echo '✓ installed' || echo '❌ missing - install with: brew install jq')"
```

STEP 7: Security remediation and prevention with automated implementation

**Immediate Security Actions:**

```bash
echo "🔧 Implementing security remediation measures..."

# Create comprehensive .gitignore patterns
if [ ! -f .gitignore ] || ! grep -q "# Security patterns" .gitignore; then
  echo "# Security patterns" >> .gitignore
  echo "*.env" >> .gitignore
  echo "*.env.local" >> .gitignore
  echo "*.env.production" >> .gitignore
  echo "*.pem" >> .gitignore
  echo "*.key" >> .gitignore
  echo "*.p12" >> .gitignore
  echo "*.jks" >> .gitignore
  echo "config/secrets.yml" >> .gitignore
  echo "secrets/" >> .gitignore
  echo "🔒 Security patterns added to .gitignore"
else
  echo "✓ .gitignore already contains security patterns"
fi

# Setup automated pre-commit security hook
if [ -d .git ]; then
  cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Automated security scan pre-commit hook
echo "🔍 Running pre-commit security scan..."
if git diff --staged --name-only | xargs rg -i "(password|secret|key|token|api_key)" --quiet 2>/dev/null; then
  echo "❌ Potential secrets detected in staged changes!"
  echo "Run 'git diff --staged | rg -i \"(password|secret|key|token)\"' to review"
  exit 1
fi
echo "✓ No obvious secrets detected in staged changes"
EOF
  chmod +x .git/hooks/pre-commit
  echo "🔒 Automated security pre-commit hook installed"
else
  echo "⚠️ Not a git repository - skipping pre-commit hook setup"
fi
```

**Security Recommendations Report:**

```bash
echo "📝 Security recommendations:"
echo "1. 🔄 Rotate any discovered credentials immediately"
echo "2. 🔐 Move secrets to environment variables or secret management"
echo "3. 🛡️ Enable branch protection rules requiring security reviews"
echo "4. 🔍 Set up automated security scanning in CI/CD pipeline"
echo "5. 📚 Train team on secure coding practices"
```

FINALLY:

- SAVE complete security audit results to session state
- PROVIDE actionable security recommendations
- ENABLE continuous security monitoring

```bash
echo "✅ Security audit completed"
echo "🔍 Scan scope: $ARGUMENTS"
echo "📊 Session: $SESSION_ID" 
echo "💾 Results: /tmp/security-findings-$SESSION_ID.json"
echo "📋 Audit state: /tmp/secrets-audit-$SESSION_ID.json"
echo "🔄 Recommendations implemented for ongoing security"
```

## Security Audit Reference

### Critical Risk Patterns

**API Keys & Tokens:**

- AWS Access Keys: `AKIA[0-9A-Z]{16}`
- GitHub Personal Access Tokens: `ghp_[a-zA-Z0-9]{36}`
- Generic API Keys: `api[-_]?key\s*[:=]\s*['\"]?[a-zA-Z0-9]{20,}['\"]?`

**Database Credentials:**

- Connection Strings: `(postgres|mysql|mongodb|redis)://.*:[^@]*@`
- Database Passwords: `(db_pass|database_password|mysql_pass|postgres_pass)`

**Cryptographic Materials:**

- Private Keys: `-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----`
- Certificates: `\.(pem|key|p12|pfx|crt|cer|jks|keystore)$`

### Command Usage Examples

```bash
# Comprehensive security audit
/secrets-audit

# Quick staged changes scan
/secrets-audit staged

# Recent development history scan
/secrets-audit recent

# Targeted pattern search
/secrets-audit "aws_access_key github_pat"

# Configuration files only
/secrets-audit "*.env *.config *.json"
```

This command provides enterprise-grade security auditing with automated remediation, state management, and continuous monitoring capabilities.