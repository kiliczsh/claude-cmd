---
allowed-tools: Task, Bash(kubectl:*), Bash(docker:*), Bash(rg:*), Bash(fd:*), Bash(yq:*), Bash(jq:*), Bash(gdate:*), Read, Write
name: "Threat Model"
description: "Generate comprehensive threat models using STRIDE methodology with parallel analysis and session management"
author: "wcygan"
tags: ["security","model"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target system: $ARGUMENTS
- Current directory: !`pwd`
- Session state: /tmp/threat-model-state-$SESSION_ID.json
- Checkpoint directory: /tmp/threat-model-checkpoints-$SESSION_ID/
- **Service Discovery**: !`kubectl get services -o json 2>/dev/null | jq -r '.items[]? | "\(.metadata.name): \(.spec.type) (\(.spec.ports[]?.port // "N/A"))"' 2>/dev/null | head -5 || echo "No Kubernetes services detected"`
- **Network Exposure**: !`kubectl get ingress -o json 2>/dev/null | jq -r '.items[]? | "\(.metadata.name): \(.spec.rules[]?.host // "no-host")"' 2>/dev/null | head -3 || echo "No ingress detected"`
- **Security Policies**: !`kubectl get networkpolicies,podsecuritypolicies 2>/dev/null | wc -l | tr -d ' '` policies
- **Container Images**: !`docker images --format "table {{.Repository}}\t{{.Tag}}" 2>/dev/null | head -5 || echo "No Docker daemon or images found"`
- **Open Ports**: !`netstat -tuln 2>/dev/null | grep LISTEN | wc -l | tr -d ' '` listening ports
- **Project Structure**: !`fd "(docker-compose|Dockerfile|k8s|terraform)" . -d 3 | head -5 || echo "No containerization/IaC files detected"`

## Your Task

STEP 1: Initialize threat modeling session with state management

- CREATE session directories and state files
- ANALYZE target system from $ARGUMENTS and Context section
- DETERMINE threat modeling scope and complexity
- ESTABLISH checkpoint/resume capability for long analyses

```bash
# Initialize session state and directories
mkdir -p /tmp/threat-model-checkpoints-$SESSION_ID
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetSystem": "'$ARGUMENTS'", 
  "phase": "discovery",
  "startTime": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "progress": {},
  "threats": [],
  "mitigations": []
}' > /tmp/threat-model-state-$SESSION_ID.json

# Create symbolic link for latest session
ln -sf /tmp/threat-model-state-$SESSION_ID.json /tmp/threat-model-latest-session.json
```

STEP 2: Comprehensive security context discovery with parallel analysis

TRY:

IF system_complexity == "distributed" OR infrastructure_detected == "kubernetes":

LAUNCH parallel sub-agents for comprehensive security discovery:

- **Agent 1: Infrastructure Analysis**: Analyze deployment architecture, network topology, and orchestration patterns
  - Focus: Docker/K8s configs, network policies, service mesh, load balancers
  - Tools: kubectl, docker, yq for configuration analysis
  - Output: Infrastructure security baseline and attack surface mapping

- **Agent 2: Application Security**: Examine source code for security patterns and vulnerabilities
  - Focus: Authentication, authorization, input validation, cryptography usage
  - Tools: rg for code pattern analysis, language-specific security checks
  - Output: Application-level threat vectors and security control assessment

- **Agent 3: Configuration Security**: Review security configurations and policies
  - Focus: Security headers, TLS configs, secrets management, access controls
  - Tools: Configuration file analysis, policy evaluation
  - Output: Configuration security gaps and hardening opportunities

- **Agent 4: Dependencies & Supply Chain**: Analyze third-party dependencies and external integrations
  - Focus: Package vulnerabilities, external APIs, vendor risk assessment
  - Tools: Package manifest analysis, external service discovery
  - Output: Supply chain risk assessment and dependency security analysis

- **Agent 5: Compliance & Standards**: Assess regulatory compliance requirements and industry standards
  - Focus: GDPR, SOX, HIPAA, PCI-DSS, ISO 27001 applicability assessment
  - Tools: Data classification analysis, regulatory requirement mapping
  - Output: Compliance gap analysis and regulatory threat implications

ELSE:

EXECUTE streamlined single-service threat analysis:

```bash
# Single-service analysis workflow
echo "🔍 Analyzing single-service threat landscape..."
echo "Target: $ARGUMENTS"
```

STEP 3: STRIDE methodology execution with programmatic analysis

**STRIDE Analysis Workflow:**

```bash
# Execute systematic STRIDE analysis
execute_stride_analysis() {
  local session_state="/tmp/threat-model-state-$SESSION_ID.json"
  
  echo "🔒 Executing STRIDE threat analysis..."
  
  # Update session state
  jq '.phase = "stride_analysis" | .progress.stride_started = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"' \
    "$session_state" > "${session_state}.tmp" && mv "${session_state}.tmp" "$session_state"
}
```

CASE stride_category:

WHEN "Spoofing":

- ANALYZE authentication mechanisms and identity verification
- IDENTIFY potential identity spoofing attack vectors
- ASSESS multi-factor authentication implementation
- EVALUATE certificate-based authentication patterns

WHEN "Tampering":

- EXAMINE data integrity controls and validation mechanisms
- IDENTIFY input validation gaps and injection vulnerabilities
- ASSESS cryptographic integrity protections
- EVALUATE audit trail completeness

WHEN "Repudiation":

- ANALYZE logging and audit trail coverage
- IDENTIFY non-repudiation control gaps
- ASSESS digital signature implementations
- EVALUATE audit log protection mechanisms

WHEN "Information Disclosure":

- EXAMINE data classification and protection controls
- IDENTIFY potential data leakage points
- ASSESS encryption at rest and in transit
- EVALUATE access control effectiveness

WHEN "Denial of Service":

- ANALYZE system resilience and availability controls
- IDENTIFY potential resource exhaustion vulnerabilities
- ASSESS rate limiting and throttling mechanisms
- EVALUATE disaster recovery capabilities

WHEN "Elevation of Privilege":

- EXAMINE authorization and privilege management
- IDENTIFY privilege escalation vulnerabilities
- ASSESS role-based access control implementation
- EVALUATE principle of least privilege adherence

STEP 4: Risk assessment and quantitative scoring

**Risk Calculation Methodology:**

```bash
# Calculate risk scores using CVSS-inspired methodology
calculate_risk_scores() {
  local session_state="/tmp/threat-model-state-$SESSION_ID.json"
  
  echo "📊 Calculating threat risk scores..."
  
  # Update session phase
  jq '.phase = "risk_assessment" | .progress.risk_assessment_started = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"' \
    "$session_state" > "${session_state}.tmp" && mv "${session_state}.tmp" "$session_state"
  
  # Risk factors assessment
  local exploitability_score=0
  local impact_score=0
  
  # Assess exploitability factors
  if rg -q "public.*endpoint|external.*api" .; then
    exploitability_score=$((exploitability_score + 3))
  fi
  
  if rg -q "authentication.*none|no.*auth" .; then
    exploitability_score=$((exploitability_score + 4))
  fi
  
  # Assess impact factors  
  if rg -q "financial|payment|credit.*card|banking" .; then
    impact_score=$((impact_score + 4))
  fi
  
  if rg -q "personal.*data|pii|gdpr|hipaa" .; then
    impact_score=$((impact_score + 3))
  fi
  
  local overall_risk_score=$((exploitability_score + impact_score))
  
  # Store risk assessment in session state
  jq --arg score "$overall_risk_score" '.riskScore = $score' \
    "$session_state" > "${session_state}.tmp" && mv "${session_state}.tmp" "$session_state"
}
```

**Risk Prioritization Matrix:**

- **Critical (9-10)**: Immediate action required, potential business-critical impact
- **High (7-8)**: High priority, significant security risk
- **Medium (4-6)**: Moderate priority, manageable risk with proper controls
- **Low (1-3)**: Low priority, minimal risk with current controls

STEP 5: Mitigation strategy generation with actionable recommendations

**Mitigation Planning Workflow:**

```bash
# Generate specific mitigation strategies
generate_mitigation_strategies() {
  local session_state="/tmp/threat-model-state-$SESSION_ID.json"
  
  echo "🛡️ Generating mitigation strategies..."
  
  # Update session phase
  jq '.phase = "mitigation_planning" | .progress.mitigation_started = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"' \
    "$session_state" > "${session_state}.tmp" && mv "${session_state}.tmp" "$session_state"
  
  # Technology-specific mitigations
  local tech_stack=$(fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml)" . -d 2 | head -1)
  
  case "$tech_stack" in
    *"package.json"*)
      echo "📝 Generating Node.js/TypeScript security recommendations..."
      generate_nodejs_mitigations
      ;;
    *"Cargo.toml"*)
      echo "📝 Generating Rust security recommendations..."
      generate_rust_mitigations
      ;;
    *"go.mod"*)
      echo "📝 Generating Go security recommendations..."
      generate_go_mitigations
      ;;
    *"pom.xml"*)
      echo "📝 Generating Java security recommendations..."
      generate_java_mitigations
      ;;
    *)
      echo "📝 Generating generic security recommendations..."
      generate_generic_mitigations
      ;;
  esac
}
```

STEP 6: Comprehensive reporting with actionable insights

**Report Generation Workflow:**

```bash
# Generate comprehensive threat model report
generate_threat_model_report() {
  local session_state="/tmp/threat-model-state-$SESSION_ID.json"
  local report_file="/tmp/threat-model-checkpoints-$SESSION_ID/threat-model-report.md"
  
  echo "📋 Generating comprehensive threat model report..."
  
  # Update session phase
  jq '.phase = "reporting" | .progress.reporting_started = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"' \
    "$session_state" > "${session_state}.tmp" && mv "${session_state}.tmp" "$session_state"
  
  # Create executive summary
  cat > "$report_file" << EOF
# Threat Model Assessment Report

**Target System:** $ARGUMENTS
**Assessment Date:** $(gdate +%Y-%m-%d 2>/dev/null || date +%Y-%m-%d)
**Session ID:** $SESSION_ID
**Overall Risk Score:** $(jq -r '.riskScore // "Pending"' "$session_state")

## Executive Summary

### Key Findings

$(jq -r '.threats[]? | "- **" + .title + "** (" + .category + ") - Risk: " + .risk_level' "$session_state" 2>/dev/null || echo "Threat analysis in progress...")

### Immediate Actions Required

$(jq -r '.mitigations[]? | select(.priority == "high") | "1. " + .description + " (" + .effort + " effort)"' "$session_state" 2>/dev/null || echo "Mitigation strategies being generated...")

EOF

  echo "📄 Report generated: $report_file"
}
```

STEP 7: Session state management and resumability

**Session Management:**

```bash
# Checkpoint current progress
save_checkpoint() {
  local session_state="/tmp/threat-model-state-$SESSION_ID.json"
  local checkpoint_file="/tmp/threat-model-checkpoints-$SESSION_ID/checkpoint-$(gdate +%s 2>/dev/null || date +%s).json"
  
  # Save current state as checkpoint
  cp "$session_state" "$checkpoint_file"
  
  # Update session with checkpoint info
  jq --arg checkpoint "$checkpoint_file" '.lastCheckpoint = $checkpoint | .lastUpdated = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"' \
    "$session_state" > "${session_state}.tmp" && mv "${session_state}.tmp" "$session_state"
  
  echo "💾 Progress checkpointed: $checkpoint_file"
}

# Resume from previous session
resume_session() {
  if [ -f "/tmp/threat-model-latest-session.json" ]; then
    local latest_session=$(readlink -f "/tmp/threat-model-latest-session.json" 2>/dev/null || echo "/tmp/threat-model-latest-session.json")
    local phase=$(jq -r '.phase' "$latest_session" 2>/dev/null)
    
    echo "🔄 Resuming previous session from phase: $phase"
    echo "📊 Session data: $latest_session"
  else
    echo "ℹ️ No previous session found, starting fresh analysis"
  fi
}
```

CATCH (analysis_interrupted):

- SAVE current progress to checkpoint file
- LOG interruption details to session state
- PROVIDE resume instructions: "Resume with: /threat-model --resume $SESSION_ID"

CATCH (analysis_error):

- LOG error details to session state
- SAVE partial results for manual review
- SUGGEST alternative analysis approaches

FINALLY:

- UPDATE session completion status
- GENERATE final summary report
- SUGGEST integration with other security commands
- CLEANUP temporary files older than 24 hours

```bash
# Final session cleanup and summary
finalize_threat_analysis() {
  local session_state="/tmp/threat-model-state-$SESSION_ID.json"
  
  # Mark session as complete
  jq '.phase = "complete" | .completedAt = "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'"' \
    "$session_state" > "${session_state}.tmp" && mv "${session_state}.tmp" "$session_state"
  
  echo "✅ Threat model analysis completed"
  echo "📊 Risk Score: $(jq -r '.riskScore // "N/A"' "$session_state")"
  echo "📄 Report: /tmp/threat-model-checkpoints-$SESSION_ID/threat-model-report.md"
  echo "💾 Session: $SESSION_ID"
  
  # Suggest follow-up actions
  echo "🔗 Recommended next steps:"
  echo "  - Run /harden to implement security controls"
  echo "  - Use /audit for vulnerability assessment"
  echo "  - Execute /monitor for ongoing threat detection"
  
  # Cleanup old sessions (older than 24 hours)
  find /tmp -name "threat-model-*" -type f -mtime +1 -delete 2>/dev/null || true
}
```

## Advanced Analysis Capabilities

### Extended Thinking Integration

When $ARGUMENTS contains complex or high-risk systems:

**Think hard about sophisticated attack vectors and security implications when analyzing:**

- Distributed systems with microservices architecture
- Financial applications with payment processing
- Healthcare systems with PHI/PII data
- Critical infrastructure and industrial control systems
- Multi-tenant SaaS platforms with shared resources

**Think harder about advanced persistent threat (APT) scenarios for:**

- Nation-state level threat actors
- Supply chain compromise vectors
- Zero-day exploit possibilities
- Insider threat considerations
- Cross-system lateral movement patterns

### Integration with Security Ecosystem

**Pre-Analysis Context Loading:**

- Check for existing security audit results
- Import known vulnerability data
- Analyze current hardening configurations
- Review compliance assessment findings

**Post-Analysis Automation:**

- Trigger automated security control implementation
- Schedule follow-up security assessments
- Generate compliance reports and documentation
- Create monitoring rules for identified threats

## Example Usage Scenarios

```bash
# Comprehensive enterprise application threat model
/threat-model "enterprise-webapp with microservices, Kubernetes, financial data"

# Infrastructure threat assessment
/threat-model "cloud infrastructure with Terraform, multi-region deployment"

# API security analysis
/threat-model "REST API with OAuth2, handling PII data, external integrations"

# Container security assessment
/threat-model "Docker containers, CI/CD pipeline, multi-stage builds"
```

This enhanced threat modeling command provides enterprise-grade security analysis with session management, parallel processing, and comprehensive reporting capabilities while maintaining resumability and integration with the broader security toolchain.