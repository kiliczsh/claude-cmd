---
allowed-tools: Read, WebFetch, Bash(kubectl:*), Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(helm:*)
name: "Context Load K8s"
description: "Load comprehensive Kubernetes documentation context with cluster-specific optimization"
author: "wcygan"
tags: ["context","k8s"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- K8s config: !`kubectl config current-context 2>/dev/null || echo "No kubectl context"`
- K8s cluster info: !`kubectl cluster-info --short 2>/dev/null || echo "No cluster connection"`
- K8s manifests: !`fd "\.(yaml|yml)$" . | rg -l "(apiVersion|kind)" | head -10 || echo "No K8s manifests found"`
- Helm charts: !`fd "Chart\.(yaml|yml)$" . | head -5 || echo "No Helm charts found"`
- K8s tools: !`(which kubectl helm kustomize 2>/dev/null | wc -l | tr -d ' ') || echo "0"` available
- Namespaces: !`kubectl get namespaces --no-headers 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Running pods: !`kubectl get pods --all-namespaces --no-headers 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Technology stack: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod)" . | head -3 || echo "K8s-only project"`

## Your Task

STEP 1: Initialize context loading session

- CREATE session state file: `/tmp/k8s-context-$SESSION_ID.json`
- VALIDATE session ID generation and file creation permissions
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "cluster_context": null,
    "context_sources": [],
    "loaded_topics": [],
    "k8s_features_detected": [],
    "documentation_cache": {}
  }
  ```

STEP 2: Kubernetes environment analysis

- ANALYZE cluster connectivity and context from Context section
- DETERMINE active Kubernetes features and configurations
- IDENTIFY documentation priorities based on detected environment

IF cluster connection available:

- FOCUS on operational guides, troubleshooting, and cluster management
- PRIORITIZE monitoring, networking, and security documentation
- INCLUDE deployment patterns and best practices for detected workloads

ELSE IF K8s manifests found:

- FOCUS on resource definitions, configuration patterns, and deployment strategies
- PRIORITIZE YAML reference documentation and validation guides
- INCLUDE development workflow and CI/CD integration patterns

ELSE:

- LOAD general Kubernetes foundation and getting-started guides
- EMPHASIZE core concepts, setup guides, and learning resources
- INCLUDE cluster setup and tool installation documentation

STEP 3: Strategic documentation loading

Think deeply about optimal Kubernetes learning and operational documentation strategies for this specific environment. Analyze the cluster configuration, detected workloads, and technology stack to prioritize the most relevant documentation areas.

TRY:

- EXECUTE systematic context loading from prioritized sources
- FOR complex environments with many detected features: Use parallel sub-agents to load different documentation areas simultaneously
- USE WebFetch tool for each documentation URL with targeted focus
- PROCESS and organize information by Kubernetes functional area
- SAVE loaded context to session state

**Core Documentation Sources:**

FOR EACH priority source:

1. **Kubernetes Core Documentation**
   - URL: `https://kubernetes.io/docs/concepts/`
   - FETCH: Core concepts, architecture, cluster components
   - FOCUS: Pods, Services, Deployments, ConfigMaps, Secrets
   - EXTRACT: Resource relationships and lifecycle management

2. **Kubernetes API Reference**
   - URL: `https://kubernetes.io/docs/reference/kubernetes-api/`
   - FETCH: Resource specifications, field definitions, API versioning
   - FOCUS: Workload APIs, Service APIs, Config and Storage APIs
   - EXTRACT: Schema validation and field requirements

3. **Kubectl Command Reference**
   - URL: `https://kubernetes.io/docs/reference/kubectl/`
   - FETCH: Command syntax, usage patterns, practical examples
   - FOCUS: Resource management, debugging commands, advanced usage
   - EXTRACT: Troubleshooting workflows and automation patterns

4. **Kubernetes Networking Documentation**
   - URL: `https://kubernetes.io/docs/concepts/services-networking/`
   - FETCH: Service types, Ingress, Network Policies, DNS
   - FOCUS: Service discovery, load balancing, network security
   - EXTRACT: Networking patterns and troubleshooting guides

5. **Security and RBAC Guide**
   - URL: `https://kubernetes.io/docs/concepts/security/`
   - FETCH: RBAC, Security Contexts, Pod Security Standards
   - FOCUS: Authentication, authorization, security policies
   - EXTRACT: Security best practices and compliance patterns

6. **Configuration Management**
   - URL: `https://kubernetes.io/docs/concepts/configuration/`
   - FETCH: ConfigMaps, Secrets, Resource Management
   - FOCUS: Environment configuration, secret management
   - EXTRACT: Configuration patterns and security practices

7. **Storage Documentation**
   - URL: `https://kubernetes.io/docs/concepts/storage/`
   - FETCH: Volumes, Persistent Volumes, Storage Classes
   - FOCUS: Data persistence, backup strategies, storage providers
   - EXTRACT: Storage architecture and management patterns

8. **Monitoring and Observability**
   - URL: `https://kubernetes.io/docs/tasks/debug/`
   - FETCH: Debugging techniques, monitoring setup, logging
   - FOCUS: Troubleshooting workflows, metrics collection
   - EXTRACT: Observability patterns and tool integration

CATCH (documentation_fetch_failed):

- LOG failed sources to session state
- CONTINUE with available documentation
- PROVIDE manual context loading instructions
- SAVE fallback documentation references

STEP 4: Environment-specific context optimization

CASE k8s_environment:
WHEN "production_cluster":

- PRIORITIZE: Monitoring, security, troubleshooting, upgrades
- FOCUS: Production best practices, disaster recovery, performance tuning
- EXAMPLES: High availability patterns, security hardening

WHEN "development_cluster":

- PRIORITIZE: Development workflows, debugging, resource management
- FOCUS: Local development, testing patterns, rapid iteration
- EXAMPLES: Development tools integration, debugging techniques

WHEN "ci_cd_integration":

- PRIORITIZE: Automation patterns, GitOps, deployment strategies
- FOCUS: Pipeline integration, automated testing, release management
- EXAMPLES: CI/CD workflows, automated deployment patterns

WHEN "manifest_development":

- PRIORITIZE: YAML authoring, validation, resource patterns
- FOCUS: Configuration management, template patterns, validation
- EXAMPLES: Helm charts, Kustomize overlays, policy validation

WHEN "learning_environment":

- PRIORITIZE: Tutorials, hands-on guides, conceptual explanations
- FOCUS: Step-by-step learning, practical exercises
- EXAMPLES: Interactive tutorials, guided walkthroughs

STEP 5: Context organization and synthesis

- ORGANIZE loaded context by Kubernetes functional area:
  - **Core Workloads**: Pods, Deployments, StatefulSets, DaemonSets
  - **Service Discovery**: Services, Ingress, Network Policies
  - **Configuration**: ConfigMaps, Secrets, Environment Variables
  - **Storage**: Volumes, Persistent Volumes, Storage Classes
  - **Security**: RBAC, Security Contexts, Pod Security Standards
  - **Monitoring**: Metrics, Logging, Debugging, Health Checks
  - **Cluster Management**: Nodes, Resource Quotas, Limits
  - **Networking**: CNI, Service Mesh, Ingress Controllers

- SYNTHESIZE environment-specific guidance:
  - Integration with detected application technologies
  - Best practices for identified workload patterns
  - Security considerations for current cluster configuration
  - Performance optimization opportunities

STEP 6: Advanced Kubernetes patterns and tools

FOR complex environments:

- LOAD advanced documentation for:
  - **Operators and CRDs**: Custom Resource Definitions, Operator patterns
  - **Service Mesh**: Istio, Linkerd integration patterns
  - **GitOps**: ArgoCD, Flux deployment automation
  - **Policy Management**: OPA Gatekeeper, Falco security policies
  - **Multi-cluster**: Federation, cross-cluster networking

STEP 7: Session state management and completion

TRY:

- UPDATE session state with loaded context summary
- SAVE context cache: `/tmp/k8s-context-cache-$SESSION_ID.json`
- CREATE context summary report
- MARK completion checkpoint

CATCH (context_organization_failed):

- SAVE partial context loading results
- DOCUMENT missing context areas
- PROVIDE manual context completion steps

FINALLY:

- ARCHIVE context session data: `/tmp/k8s-context-archive-$SESSION_ID.json`
- PROVIDE context loading summary with coverage metrics
- CLEAN UP temporary session files (EXCEPT archived data)
- LOG session completion timestamp and status

## Context Loading Strategy

**Adaptive Loading Based on Environment:**

CASE environment_type:
WHEN "active_cluster_detected":

- PRIORITIZE: Operational documentation, troubleshooting guides
- LOAD: Current cluster resource patterns and configurations
- FOCUS: Real-time debugging and management techniques

WHEN "manifest_repository":

- PRIORITIZE: YAML reference, validation guides, best practices
- LOAD: Resource definition patterns and configuration management
- FOCUS: Development workflow and deployment automation

WHEN "helm_charts_detected":

- PRIORITIZE: Helm documentation, templating patterns
- LOAD: Chart development, packaging, deployment guides
- FOCUS: Package management and release workflows

WHEN "kustomize_usage":

- PRIORITIZE: Kustomize documentation, overlay patterns
- LOAD: Configuration management and environment promotion
- FOCUS: GitOps workflows and configuration templating

**Context Validation and Quality Assurance:**

FOR EACH loaded documentation source:

- VERIFY documentation currency and Kubernetes version compatibility
- VALIDATE example manifests for syntax correctness
- CHECK for deprecated APIs and migration paths
- ENSURE security best practices are highlighted
- CONFIRM examples work with detected Kubernetes version

## Expected Outcome

After executing this command, you will have comprehensive context on:

**Core Kubernetes Capabilities:**

- Container orchestration concepts and architecture
- Workload management (Pods, Deployments, StatefulSets)
- Service discovery and networking patterns
- Configuration and secret management
- Storage orchestration and data persistence
- Security policies and RBAC implementation

**Operational Excellence:**

- Cluster monitoring and observability setup
- Debugging and troubleshooting techniques
- Performance optimization and resource management
- Backup and disaster recovery strategies
- Cluster upgrades and maintenance procedures
- Multi-environment deployment patterns

**Development Integration:**

- CI/CD pipeline integration with Kubernetes
- Development workflow optimization
- Testing strategies for Kubernetes applications
- Local development environment setup
- GitOps implementation patterns
- Infrastructure as Code practices

**Advanced Patterns:**

- Custom Resource Definitions and Operators
- Service mesh integration and configuration
- Policy enforcement and compliance automation
- Multi-cluster management and federation
- Cloud provider integration patterns
- Security hardening and compliance frameworks

The context loading adapts to your specific Kubernetes environment and emphasizes the most relevant documentation areas for your current deployment and development needs.

## Session State Schema

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "environment_analysis": {
    "cluster_connected": "boolean",
    "kubectl_version": "version_string",
    "cluster_version": "k8s_version",
    "detected_features": ["helm", "kustomize", "operators"],
    "workload_types": ["deployments", "statefulsets", "daemonsets"],
    "namespace_count": "number",
    "manifest_count": "number"
  },
  "loaded_context": {
    "documentation_sources": ["core", "api", "kubectl", "networking"],
    "coverage_areas": ["workloads", "networking", "security", "storage"],
    "environment_specific": ["production", "development", "ci_cd"],
    "advanced_topics": ["operators", "service_mesh", "gitops"]
  },
  "context_cache": {
    "last_updated": "ISO_8601_TIMESTAMP",
    "cache_size": "size_in_kb",
    "source_urls": ["array_of_documentation_urls"],
    "retrieval_status": "success|partial|failed"
  },
  "recommendations": {
    "priority_learning_areas": ["list_of_topics"],
    "environment_improvements": ["suggested_enhancements"],
    "tool_integrations": ["recommended_k8s_tools"],
    "security_considerations": ["security_recommendations"]
  }
}
```