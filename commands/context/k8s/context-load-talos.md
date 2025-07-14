---
allowed-tools: Read, WebFetch, Bash(fd:*), Bash(rg:*), Bash(kubectl:*), Bash(talosctl:*), Bash(jq:*), Bash(gdate:*)
name: "Context Load Talos"
description: "Load comprehensive Talos Linux Kubernetes documentation with environment-specific optimization"
author: "wcygan"
tags: ["context","k8s"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Kubernetes configs: !`fd "(kubeconfig|config)" ~/.kube /etc/kubernetes . | head -3 || echo "No K8s configs found"`
- Talos configs: !`fd "talosconfig" ~ . | head -3 || echo "No Talos configs found"`
- Container runtimes: !`which docker podman containerd 2>/dev/null || echo "No container runtimes detected"`
- Kubernetes tools: !`which kubectl talosctl helm flux 2>/dev/null || echo "No K8s tools detected"`
- Infrastructure files: !`fd "(terraform|pulumi|ansible)" . -t d | head -3 || echo "No IaC detected"`
- Cluster info: !`kubectl cluster-info 2>/dev/null | head -2 || echo "No active K8s cluster"`
- Talos nodes: !`talosctl config info 2>/dev/null || echo "No Talos config found"`
- GitOps configs: !`fd "(flux|argocd|gitops)" . -t d | head -3 || echo "No GitOps configs found"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/talos-context-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "environment_type": "unknown",
    "context_sources": [],
    "loaded_topics": [],
    "talos_features_detected": [],
    "documentation_cache": {}
  }
  ```

- ANALYZE current environment from Context section
- DETERMINE Talos deployment scenario and context priorities

STEP 2: Environment-specific context strategy

Think deeply about optimal Talos documentation loading strategies based on detected environment and infrastructure patterns.

IF Talos cluster detected:

- FOCUS on operational management, troubleshooting, and upgrade procedures
- PRIORITIZE cluster maintenance, monitoring, and GitOps integration
- INCLUDE disaster recovery and backup strategies
  ELSE IF Kubernetes cluster detected (non-Talos):
- FOCUS on Talos migration strategies and compatibility assessment
- PRIORITIZE comparison guides and migration procedures
- INCLUDE cluster replacement and transition planning
  ELSE:
- LOAD comprehensive getting-started and installation documentation
- EMPHASIZE initial setup, configuration, and cluster bootstrap
- INCLUDE hardware requirements and deployment planning

STEP 3: Strategic documentation loading with parallel sub-agents

Use parallel sub-agents for comprehensive context loading:

- **Agent 1**: Core Talos fundamentals and installation procedures
- **Agent 2**: Configuration management and machine setup
- **Agent 3**: Networking, security, and cluster operations
- **Agent 4**: Upgrades, maintenance, and troubleshooting
- **Agent 5**: GitOps integration and automation patterns

TRY:

- EXECUTE systematic context loading from prioritized sources
- USE WebFetch tool for each documentation URL
- PROCESS and organize information by functional area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **Talos Core Documentation**
   - URL: `https://www.talos.dev/latest/`
   - FETCH: Architecture overview, getting started, core concepts
   - FOCUS: Installation methods, cluster bootstrap, basic operations
   - EXTRACT: Best practices and deployment patterns

2. **Machine Configuration Reference**
   - URL: `https://www.talos.dev/latest/reference/configuration/`
   - FETCH: Complete configuration schema and options
   - FOCUS: Network configuration, storage setup, security policies
   - EXTRACT: Configuration examples and validation patterns

3. **Talos API Reference**
   - URL: `https://www.talos.dev/latest/reference/api/`
   - FETCH: Machine API, cluster API, service management interfaces
   - FOCUS: API operations, automation capabilities, integration patterns
   - EXTRACT: API usage examples and authentication methods

4. **Guides and Tutorials**
   - URL: `https://www.talos.dev/latest/talos-guides/`
   - FETCH: Deployment scenarios, use cases, integration guides
   - FOCUS: Cloud provider setup, bare metal deployment, troubleshooting
   - EXTRACT: Step-by-step procedures and configuration examples

5. **Upgrade and Maintenance Guide**
   - URL: `https://www.talos.dev/latest/talos-guides/upgrading-talos/`
   - FETCH: Upgrade procedures, rollback strategies, maintenance tasks
   - FOCUS: Version compatibility, upgrade planning, disaster recovery
   - EXTRACT: Upgrade automation and validation procedures

6. **Kubernetes Integration**
   - URL: `https://www.talos.dev/latest/kubernetes-guides/`
   - FETCH: Kubernetes-specific configuration and integration patterns
   - FOCUS: CNI setup, storage classes, ingress controllers
   - EXTRACT: Kubernetes workload deployment and management

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Context organization and environment optimization

- ORGANIZE loaded context by functional area:
  - Installation and machine configuration
  - Cluster bootstrap and networking setup
  - Security policies and certificate management
  - Storage configuration and persistent volumes
  - Cluster operations and maintenance
  - Upgrade procedures and rollback strategies
  - Troubleshooting and debugging techniques
  - GitOps integration and automation
  - Monitoring and observability
  - Disaster recovery and backup

- SYNTHESIZE environment-specific guidance:
  - Integration with detected infrastructure tools
  - Migration strategies from existing Kubernetes distributions
  - Best practices for detected deployment scenario
  - Security hardening for specific environment type

STEP 5: Advanced context loading for complex scenarios

Think harder about advanced Talos implementation patterns and enterprise deployment strategies.

CASE environment_type:
WHEN "production_cluster":

- PRIORITIZE: High availability, disaster recovery, security hardening
- FOCUS: Multi-master setup, etcd management, network policies
- EXAMPLES: Production deployment patterns, monitoring integration

WHEN "development_environment":

- PRIORITIZE: Quick setup, development workflows, testing procedures
- FOCUS: Single-node clusters, local development, debugging tools
- EXAMPLES: Development cluster setup, rapid iteration patterns

WHEN "edge_deployment":

- PRIORITIZE: Resource constraints, offline operations, minimal footprint
- FOCUS: Edge-specific configurations, resource optimization
- EXAMPLES: IoT deployments, remote site management

WHEN "cloud_migration":

- PRIORITIZE: Cloud provider integration, managed services compatibility
- FOCUS: Load balancer setup, storage classes, networking integration
- EXAMPLES: AWS, GCP, Azure deployment patterns

STEP 6: Session state management and completion

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/talos-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

FINALLY:

- ARCHIVE context session data for future reference
- PROVIDE context loading summary
- CLEAN UP temporary session files

## Context Loading Strategy

**Adaptive Loading Based on Environment:**

CASE detected_environment:
WHEN "existing_talos_cluster":

- PRIORITIZE: Operational management, monitoring, troubleshooting
- FOCUS: Cluster maintenance, upgrade procedures, performance optimization
- EXAMPLES: Health checks, log analysis, resource optimization

WHEN "kubernetes_to_talos_migration":

- PRIORITIZE: Migration guides, compatibility assessment, transition planning
- FOCUS: Workload migration, configuration conversion, downtime minimization
- EXAMPLES: Rolling migration, backup/restore procedures

WHEN "new_talos_deployment":

- PRIORITIZE: Installation guides, initial configuration, cluster bootstrap
- FOCUS: Hardware requirements, network setup, security configuration
- EXAMPLES: Bare metal setup, cloud deployment, configuration validation

WHEN "gitops_integration":

- PRIORITIZE: Automation patterns, configuration management, CI/CD integration
- FOCUS: Flux/ArgoCD setup, declarative management, policy enforcement
- EXAMPLES: GitOps workflows, automated deployments, policy as code

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Talos version compatibility
- VALIDATE configuration examples for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with current Kubernetes versions

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Talos Capabilities:**

- Machine configuration and cluster bootstrap procedures
- Immutable infrastructure principles and API-driven management
- Security-first architecture and certificate management
- Networking setup and CNI integration patterns
- Storage configuration and persistent volume management
- Cluster lifecycle operations and maintenance procedures

**Advanced Implementation Techniques:**

- Multi-master high availability configurations
- Custom machine configurations and extensions
- Network policy enforcement and security hardening
- Upgrade automation and rollback procedures
- Monitoring integration and observability setup
- Disaster recovery and backup strategies

**Environment Integration:**

- Cloud provider integration (AWS, GCP, Azure)
- Bare metal deployment and hardware optimization
- GitOps workflows with Flux or ArgoCD
- CI/CD pipeline integration and automation
- Infrastructure as code with Terraform/Pulumi
- Service mesh integration and advanced networking

**Operational Excellence:**

- Troubleshooting procedures and debugging techniques
- Performance tuning and resource optimization
- Security compliance and policy enforcement
- Monitoring and alerting configuration
- Backup and disaster recovery procedures
- Cluster migration and upgrade strategies

The context loading adapts to your specific environment and emphasizes the most relevant Talos documentation areas for your current infrastructure and deployment goals.