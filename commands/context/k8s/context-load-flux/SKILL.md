---
allowed-tools: mcp__context7__resolve-library-id, mcp__context7__get-library-docs, WebFetch, Write, Read, Bash(fd:*), Bash(rg:*), Bash(kubectl:*), Bash(gdate:*)
name: "Context Load Flux"
description: "Load comprehensive Flux GitOps documentation context with intelligent project analysis and state management"
author: "wcygan"
tags: ["context","k8s"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /context-load-flux

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Kubernetes configs: !`fd "(kustomization\.yaml|\.yaml|\.yml)$" . | rg "(apiVersion|kind)" | head -10 || echo "No Kubernetes manifests found"`
- Flux resources: !`fd "\.yaml$" . -x rg -l "(fluxcd\.io|GitRepository|Kustomization|HelmRelease|HelmRepository)" | head -5 || echo "No Flux resources found"`
- Git repository: !`git status --porcelain | head -5 2>/dev/null || echo "Not a git repository"`
- Cluster access: !`kubectl cluster-info --request-timeout=2s 2>/dev/null | head -1 || echo "No cluster access"`
- Flux installation: !`kubectl get ns flux-system 2>/dev/null || echo "Flux not installed"`
- GitOps structure: !`fd "(clusters|apps|infrastructure|base)" -t d | head -5 || echo "No GitOps directory structure"`
- Helm charts: !`fd "Chart\.yaml" . | head -3 || echo "No Helm charts found"`

Load comprehensive documentation context for Flux GitOps continuous delivery.

## Your Task

STEP 1: Initialize Context Loading Session

- Create session state file: /tmp/flux-context-$SESSION_ID.json
- Initialize context loading progress tracking
- Set up checkpoint system for resumable context loading
- Determine project-specific Flux requirements

STEP 2: Context7 Flux Documentation Loading

TRY:

- Use Context7 MCP server to resolve Flux GitOps library documentation
- Load core Flux documentation with focus on:
  - GitOps principles and workflows
  - Flux controllers and custom resources
  - Repository structure and security
  - Multi-tenancy and multi-cluster patterns
- Save checkpoint: context7_flux_loaded

CATCH (context7_unavailable):

- Fallback to WebFetch tool for documentation gathering
- Document Context7 unavailability in session state
- Proceed with direct URL fetching approach

STEP 3: Comprehensive Documentation Gathering

FOR EACH documentation source:

- **Flux Documentation**: `https://fluxcd.io/flux/`
  - Focus on: installation, concepts, getting started
- **GitOps Toolkit**: `https://fluxcd.io/flux/components/`
  - Focus on: source controller, kustomize controller, helm controller
- **Guides and Tutorials**: `https://fluxcd.io/flux/guides/`
  - Focus on: repository structure, security, monitoring
- **API Reference**: `https://fluxcd.io/flux/components/source/`
  - Focus on: custom resources, field descriptions
- **Best Practices**: `https://fluxcd.io/flux/guides/repository-structure/`
  - Focus on: repository organization, security, automation

STEP 4: Project-Specific Context Enhancement

IF Kubernetes configs detected:

- Analyze existing Kubernetes manifests and deployment patterns
- Identify current deployment workflows and CI/CD integration
- Map application structure and dependencies
- Document migration opportunities to GitOps workflows

IF Flux resources detected:

- Analyze existing Flux custom resources and configurations
- Identify GitOps workflow patterns and repository structure
- Map source repositories and deployment targets
- Document optimization opportunities and best practices

IF GitOps directory structure detected:

- Analyze repository organization and folder structure
- Identify multi-tenancy patterns and access control
- Map environment promotion strategies
- Document compliance with Flux best practices

STEP 5: Advanced Flux Context Loading

Think deeply about GitOps architecture patterns and Flux optimization strategies.

**Priority Documentation Areas:**

- GitOps principles and workflows (reconciliation, drift detection)
- Source controller configuration (GitRepository, OCIRepository, Bucket)
- Kustomization and Helm releases (deployment automation, dependencies)
- Multi-tenancy patterns (namespace isolation, RBAC, policies)
- Security and access control (signed commits, SOPS, sealed secrets)
- Monitoring and alerting (Prometheus integration, notification providers)
- Multi-cluster deployments (cluster API, fleet management)
- Advanced patterns (image automation, progressive delivery, canary)
- Disaster recovery (backup strategies, cluster reconstruction)
- Performance optimization (controller tuning, resource scaling)

STEP 6: Context Validation and Integration

TRY:

- Validate loaded documentation completeness
- Cross-reference project requirements with available context
- Generate project-specific Flux guidance summary
- Save checkpoint: context_validation_complete

CATCH (incomplete_context_loading):

- Document missing documentation sections
- Provide fallback guidance sources
- Create manual context loading instructions
- Save partial context state for incremental loading

CATCH (network_connectivity_issues):

- Use cached documentation if available
- Provide offline Flux reference materials
- Document connectivity limitations in session state
- Create alternative context loading strategy

FINALLY:

- Update Flux context session state
- Create context summary for current session
- Clean up temporary context files: /tmp/flux-temp-$SESSION_ID-*
- Archive loaded context for future sessions

## State Management Structure

```json
// /tmp/flux-context-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "context_sources": {
    "context7_available": true,
    "loaded_docs": [
      {
        "source": "flux_official_docs",
        "status": "loaded",
        "focus_areas": ["gitops_workflows", "controllers", "security"]
      }
    ],
    "failed_sources": [],
    "fallback_sources": []
  },
  "project_context": {
    "has_kubernetes_configs": true,
    "has_flux_resources": false,
    "gitops_structure_detected": true,
    "cluster_access": false,
    "flux_installed": false
  },
  "checkpoints": {
    "last_checkpoint": "context_validation_complete",
    "next_milestone": "expert_guidance_ready",
    "rollback_point": "context7_flux_loaded"
  },
  "capabilities_loaded": [
    "gitops_workflows",
    "flux_controllers",
    "repository_structure",
    "multi_tenancy",
    "security_practices",
    "monitoring_alerting",
    "troubleshooting",
    "disaster_recovery"
  ]
}
```

## Expected Expert Capabilities

After successful context loading, Claude will provide expert guidance on:

**Core GitOps Implementation:**

- **Workflow Design**: GitOps principles, reconciliation loops, and drift detection
- **Repository Structure**: Multi-environment layouts, monorepo vs. polyrepo strategies
- **Source Management**: Git repository configuration, branch strategies, and access control
- **Deployment Automation**: Kustomization and Helm release management

**Advanced Flux Operations:**

- **Controller Configuration**: Source, Kustomize, Helm, Image, and Notification controllers
- **Multi-Tenancy**: Namespace isolation, RBAC policies, and tenant separation
- **Security**: Signed commits, SOPS encryption, sealed secrets, and policy enforcement
- **Monitoring**: Prometheus integration, alerting rules, and observability patterns

**Enterprise Patterns:**

- **Multi-Cluster**: Fleet management, cluster API integration, and progressive rollouts
- **Image Automation**: Automated image updates, tag policies, and promotion workflows
- **Progressive Delivery**: Canary deployments, blue-green strategies, and rollback procedures
- **Disaster Recovery**: Backup strategies, cluster reconstruction, and business continuity

**Operational Excellence:**

- **Troubleshooting**: Common issues, debugging techniques, and resolution strategies
- **Performance**: Controller tuning, resource optimization, and scaling considerations
- **Migration**: From traditional CI/CD, from other GitOps tools, and legacy modernization
- **Integration**: CI/CD pipeline integration, external tools, and ecosystem connectivity

## Session Isolation and Context Persistence

- Each context loading session maintains isolated state in /tmp/flux-context-$SESSION_ID.json
- Checkpoint system enables resumable context loading for large documentation sets
- Context artifacts cached for subsequent sessions to improve loading performance
- Supports concurrent context loading sessions through unique session identifiers

## Usage Examples

```bash
# Basic Flux context loading
/context-load-flux

# Context loading with specific focus (if extended)
/context-load-flux security
/context-load-flux multi-cluster
/context-load-flux image-automation
```