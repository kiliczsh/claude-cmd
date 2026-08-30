---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(kubectl:*), Bash(jq:*), Bash(gdate:*)
name: "Context Load Security"
description: "Load comprehensive Kubernetes security documentation context with cluster-aware analysis"
author: "wcygan"
tags: ["context","security"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "session-$(date +%s)000000000"`
- Current directory: !`pwd`
- Kubernetes context: !`kubectl config current-context 2>/dev/null || echo "No Kubernetes context"`
- Security-related files: !`fd "(security|rbac|network-policy|secret)" . --type f | head -5 || echo "No security files found"`
- External Secrets: !`kubectl get externalsecrets -A 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Security policies: !`kubectl get psp,networkpolicy -A 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Secrets count: !`kubectl get secrets -A 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- RBAC resources: !`kubectl get clusterroles,roles -A 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Technology stack: !`fd "(docker|k8s|kubernetes)" . --type d | head -3 || echo "No container orchestration detected"`
- Git status: !`git status --porcelain | head -3 2>/dev/null || echo "Not a git repository"`

## Your Task

STEP 1: Initialize security context loading session

- CREATE session state file: `/tmp/security-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "cluster_context": "detected_from_kubectl",
    "security_posture": {},
    "context_sources": [],
    "loaded_topics": [],
    "documentation_cache": {},
    "security_features_detected": []
  }
  ```

STEP 2: Security environment analysis

Think harder about the optimal security context loading strategy based on cluster configuration and existing security implementations.

**Extended Thinking Areas:**

- Security architecture patterns and threat modeling approaches
- Integration strategies for multi-provider secret management
- Zero-trust network implementation considerations
- Compliance framework alignment and audit requirements

- ANALYZE current Kubernetes environment from Context section
- DETERMINE specific security features and tools in use
- IDENTIFY documentation priorities based on security needs

IF Kubernetes cluster access detected AND External Secrets found:

- FOCUS on External Secrets Operator configuration and provider integration
- PRIORITIZE secret rotation, provider-specific patterns, monitoring
- INCLUDE operational security and troubleshooting contexts
  ELSE IF Kubernetes cluster access detected:
- LOAD general Kubernetes security foundation and secret management
- EMPHASIZE RBAC configuration, network policies, pod security standards
- INCLUDE cluster hardening and security monitoring setup
  ELSE:
- LOAD theoretical security frameworks and best practices
- EMPHASIZE getting-started guides and security assessment tools
- INCLUDE security by design principles and threat modeling

STEP 3: Strategic security documentation loading

TRY:

- EXECUTE systematic context loading from prioritized security sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by security domain
- SAVE loaded context to session state

**Core Security Documentation Sources:**

FOR EACH priority source:

1. **External Secrets Operator Documentation**
   - URL: `https://external-secrets.io/latest/`
   - FETCH: Provider integrations, secret stores, automation patterns
   - FOCUS: AWS Secrets Manager, HashiCorp Vault, 1Password integration
   - EXTRACT: Configuration examples, troubleshooting, best practices

2. **1Password Kubernetes Operator**
   - URL: `https://developer.1password.com/docs/k8s/operator/`
   - FETCH: Operator setup, secret injection patterns, security practices
   - FOCUS: Installation, configuration, monitoring, access patterns
   - EXTRACT: RBAC setup, secret lifecycle, operational procedures

3. **Kubernetes Security Documentation**
   - URL: `https://kubernetes.io/docs/concepts/security/`
   - FETCH: RBAC, network policies, pod security standards, admission controllers
   - FOCUS: Security contexts, service accounts, authorization patterns
   - EXTRACT: Configuration templates, validation strategies

4. **Kubernetes Security Checklist**
   - URL: `https://kubernetes.io/docs/concepts/security/security-checklist/`
   - FETCH: Cluster hardening, workload security, supply chain security
   - FOCUS: Production readiness, security baselines, compliance
   - EXTRACT: Actionable checklist items, validation procedures

5. **NIST Container Security Guidelines**
   - URL: `https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf`
   - FETCH: Container security framework, vulnerability management
   - FOCUS: Risk assessment, security controls, compliance frameworks
   - EXTRACT: Security requirements, control implementations

6. **Pod Security Standards**
   - URL: `https://kubernetes.io/docs/concepts/security/pod-security-standards/`
   - FETCH: Security profiles, policy enforcement, migration strategies
   - FOCUS: Privileged, baseline, restricted security contexts
   - EXTRACT: Policy examples, enforcement mechanisms

7. **Network Policy Documentation**
   - URL: `https://kubernetes.io/docs/concepts/services-networking/network-policies/`
   - FETCH: Network segmentation, traffic control, policy design
   - FOCUS: Ingress/egress rules, namespace isolation, micro-segmentation
   - EXTRACT: Policy templates, testing strategies

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Security context organization and synthesis

- ORGANIZE loaded context by security domain:
  - **Secret Management**: External Secrets, encryption, rotation
  - **Identity & Access**: RBAC, service accounts, authentication
  - **Network Security**: Network policies, service mesh, encryption
  - **Pod Security**: Security contexts, admission controllers, policies
  - **Supply Chain**: Image scanning, signing, SBOM, provenance
  - **Monitoring**: Security events, audit logs, compliance
  - **Incident Response**: Detection, containment, recovery procedures
  - **Compliance**: Standards, frameworks, audit requirements

- SYNTHESIZE cluster-specific guidance:
  - Integration with existing security stack
  - Migration strategies for security improvements
  - Best practices for detected use cases
  - Threat modeling for current architecture

STEP 5: Session state management and completion

- UPDATE session state with security context summary
- SAVE context cache: `/tmp/security-context-cache-$SESSION_ID.json`
- CREATE security assessment report based on detected configurations
- MARK completion checkpoint

FINALLY:

- ARCHIVE security context session data for future reference
- PROVIDE context loading summary with security recommendations
- CLEAN UP temporary session files

## Security Context Loading Strategy

**Adaptive Loading Based on Environment:**

CASE security_environment:
WHEN "production_cluster_with_external_secrets":

- PRIORITIZE: Operational security, incident response, monitoring
- FOCUS: Secret rotation, provider failover, security monitoring
- EXAMPLES: Multi-provider setups, disaster recovery, audit trails

WHEN "development_cluster_basic_rbac":

- PRIORITIZE: Security hardening, policy implementation, access controls
- FOCUS: RBAC design, network policies, pod security standards
- EXAMPLES: Namespace isolation, service account design, security contexts

WHEN "new_cluster_setup":

- PRIORITIZE: Security by design, baseline configurations, compliance
- FOCUS: Initial hardening, security policies, monitoring setup
- EXAMPLES: Cluster setup, admission controllers, audit logging

WHEN "security_assessment":

- PRIORITIZE: Threat modeling, vulnerability assessment, compliance gaps
- FOCUS: Security scanning, policy validation, risk assessment
- EXAMPLES: Security benchmarks, penetration testing, audit procedures

**Context Validation and Security Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Kubernetes version compatibility
- VALIDATE security configurations for best practices alignment
- CHECK for known vulnerabilities and mitigation strategies
- ENSURE compliance framework requirements are addressed
- CONFIRM examples follow principle of least privilege

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Security Capabilities:**

- External Secrets Operator configuration and management
- Kubernetes RBAC design and implementation
- Network policy design and micro-segmentation
- Pod security standards and admission control
- Container image security and supply chain protection
- Security monitoring and incident response procedures

**Advanced Security Techniques:**

- Zero-trust network architecture implementation
- Secret rotation and lifecycle management
- Multi-tenant security isolation strategies
- Compliance automation and audit procedures
- Threat detection and security analytics
- Security policy as code and GitOps integration

**Operational Security:**

- Security incident response and forensics
- Vulnerability management and patch procedures
- Security assessment and penetration testing
- Compliance reporting and audit preparation
- Security training and awareness programs
- Disaster recovery and business continuity

**Integration Patterns:**

- Service mesh security integration (Istio, Linkerd)
- CI/CD pipeline security and scanning
- Infrastructure as Code security validation
- Multi-cloud security management
- Identity provider integration (OIDC, LDAP)
- Security tool ecosystem integration

The context loading adapts to your specific cluster configuration and emphasizes the most relevant security documentation areas for your current security posture and compliance requirements.