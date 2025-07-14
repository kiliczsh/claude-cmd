---
allowed-tools: Read, WebFetch, Bash(kubectl:*), Bash(helm:*), Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(yq:*)
name: "Context Load Cilium"
description: "Load comprehensive Cilium eBPF networking and security documentation with project-specific optimization"
author: "wcygan"
tags: ["context","k8s"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /context-load-cilium

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "session-$(date +%s)000000000"`
- Current directory: !`pwd`
- Kubernetes manifests: !`fd "\\.ya?ml$" . | rg "(kind:|apiVersion:)" | head -5 || echo "No Kubernetes manifests found"`
- Cilium configuration: !`fd "(cilium|cni)" . -t f | head -3 || echo "No Cilium config found"`
- CNI configuration: !`fd "(cni|network)" . -t d | head -3 || echo "No CNI directories found"`
- Helm charts: !`fd "Chart\\.ya?ml$" . | head -3 || echo "No Helm charts found"`
- Network policies: !`rg "kind: NetworkPolicy" . --type yaml | wc -l | tr -d ' ' || echo "0"`
- Service mesh config: !`rg "(envoy|istio|linkerd)" . --type yaml | wc -l | tr -d ' ' || echo "0"`
- Cluster access: !`kubectl cluster-info 2>/dev/null | head -2 || echo "No cluster access"`
- Cilium status: !`kubectl get pods -n kube-system -l app.kubernetes.io/name=cilium 2>/dev/null | head -3 || echo "Cilium not detected"`

## Your Task

Execute strategic Cilium documentation loading with project-specific context optimization.

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/cilium-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "context_sources": [],
    "loaded_topics": [],
    "project_specific_focus": [],
    "documentation_cache": {},
    "cilium_features_detected": []
  }
  ```

STEP 2: Project-specific context analysis

TRY:

- ANALYZE Kubernetes and Cilium usage from Context section
- DETERMINE specific Cilium features in use or planned
- IDENTIFY documentation priorities based on project needs

IF Cilium already deployed:

- FOCUS on operational guides, troubleshooting, and advanced features
- PRIORITIZE monitoring, policy management, and performance optimization
- INCLUDE upgrade procedures and cluster management
  ELSE IF Kubernetes cluster detected:
- FOCUS on installation guides, CNI setup, and basic configuration
- PRIORITIZE getting started guides and initial deployment
- INCLUDE migration from existing CNI if applicable
  ELSE:
- LOAD general Cilium concepts and architecture overview
- EMPHASIZE evaluation criteria and deployment planning
- INCLUDE infrastructure requirements and compatibility

CATCH (cluster_access_failed):

- CONTINUE with general Cilium documentation loading
- NOTE cluster access limitations in session state
- FOCUS on documentation that doesn't require live cluster

STEP 3: Strategic documentation loading

Execute systematic context loading from prioritized Cilium documentation sources:

FOR EACH priority documentation source:

1. **Cilium Core Documentation**
   - URL: `https://docs.cilium.io/en/stable/overview/intro/`
   - FETCH: eBPF networking concepts, architecture overview, core features
   - FOCUS: CNI functionality, network connectivity, identity-based security
   - EXTRACT: Installation procedures and basic configuration patterns

2. **Network Policy Documentation**
   - URL: `https://docs.cilium.io/en/stable/security/policy/`
   - FETCH: L3/L4 policies, L7 policies, DNS policies, Kafka policies
   - FOCUS: Policy specification, enforcement mechanisms, security isolation
   - EXTRACT: Policy examples and troubleshooting guides

3. **Service Mesh Integration**
   - URL: `https://docs.cilium.io/en/stable/network/servicemesh/`
   - FETCH: Envoy integration, sidecar-less service mesh, traffic management
   - FOCUS: Load balancing, ingress/egress, mutual TLS, observability
   - EXTRACT: Service mesh configuration and operational patterns

4. **Hubble Observability Platform**
   - URL: `https://docs.cilium.io/en/stable/observability/hubble/`
   - FETCH: Network visibility, flow monitoring, metrics collection
   - FOCUS: Hubble UI, CLI tools, metrics export, troubleshooting
   - EXTRACT: Observability setup and monitoring best practices

5. **Performance and Operations**
   - URL: `https://docs.cilium.io/en/stable/operations/performance/`
   - FETCH: Performance tuning, benchmarking, resource optimization
   - FOCUS: eBPF program optimization, datapath tuning, scalability
   - EXTRACT: Performance monitoring and optimization techniques

6. **Installation and Upgrade Procedures**
   - URL: `https://docs.cilium.io/en/stable/installation/`
   - FETCH: Kubernetes installation, Helm charts, operator deployment
   - FOCUS: CNI configuration, cluster requirements, upgrade procedures
   - EXTRACT: Production deployment patterns and best practices

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and synthesis

- ORGANIZE loaded context by functional area:
  - eBPF networking fundamentals and architecture
  - CNI installation and cluster integration
  - Network policy specification and enforcement
  - Service mesh capabilities and configuration
  - Load balancing and traffic management
  - Security enforcement and identity management
  - Observability with Hubble and monitoring
  - Performance optimization and tuning
  - Troubleshooting and operational procedures

- SYNTHESIZE project-specific guidance:
  - Integration with existing Kubernetes infrastructure
  - Migration strategies from other CNI solutions
  - Best practices for detected use cases
  - Security considerations for network policies
  - Observability integration with existing monitoring

STEP 5: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/cilium-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Deployment State:**

CASE cilium_deployment_state:
WHEN "production_cluster":

- PRIORITIZE: Operational guides, monitoring, troubleshooting procedures
- FOCUS: Policy management, performance optimization, upgrade procedures
- EXAMPLES: Production policies, monitoring dashboards, incident response

WHEN "development_cluster":

- PRIORITIZE: Configuration guides, development workflows, testing procedures
- FOCUS: Policy development, feature experimentation, debugging tools
- EXAMPLES: Development policies, testing frameworks, debugging techniques

WHEN "evaluation_phase":

- PRIORITIZE: Architecture overview, feature comparison, deployment planning
- FOCUS: Use case evaluation, integration requirements, migration planning
- EXAMPLES: Architecture diagrams, feature matrices, migration guides

WHEN "new_installation":

- PRIORITIZE: Installation guides, basic configuration, getting started
- FOCUS: CNI setup, initial policies, basic observability
- EXAMPLES: Installation scripts, starter policies, basic monitoring

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Kubernetes version compatibility
- VALIDATE configuration examples for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with current Cilium versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Cilium Capabilities:**

- eBPF-based networking and security architecture
- CNI integration and Kubernetes cluster networking
- Identity-based security and network segmentation
- High-performance load balancing and traffic management
- Advanced network policy enforcement (L3/L4/L7)
- Sidecar-less service mesh functionality

**Operational Excellence:**

- Hubble observability platform and network visibility
- Performance monitoring and optimization techniques
- Troubleshooting network connectivity and policy issues
- Production deployment patterns and best practices
- Upgrade procedures and cluster management
- Integration with monitoring and alerting systems

**Advanced Features:**

- Multi-cluster networking and cluster mesh
- Advanced load balancing algorithms and health checking
- Ingress and egress gateway configuration
- Custom eBPF program development and integration
- Security policy automation and compliance
- Network forensics and incident response

**Development Workflow:**

- Policy development and testing frameworks
- CI/CD integration for network policies
- Local development environment setup
- Debugging tools and techniques
- Performance profiling and optimization
- Custom resource development and management

The context loading adapts to your specific Kubernetes environment and emphasizes the most relevant Cilium documentation areas for your current deployment state and operational needs.

## Session State Management

**State Files Created:**

- `/tmp/cilium-context-$SESSION_ID.json` - Main context loading session state
- `/tmp/cilium-context-cache-$SESSION_ID.json` - Cached documentation content
- `/tmp/cilium-project-analysis-$SESSION_ID.json` - Project-specific findings

**Resumability:**

- Session can be resumed from any checkpoint
- Documentation cache preserved across sessions
- Project analysis results maintained for context adaptation
- Error recovery points established for each major documentation source