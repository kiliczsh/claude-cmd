---
allowed-tools: Task, Bash(kubectl:*), Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(echo:*), Bash(which:*), Bash(eza:*), Bash(yq:*)
name: "Project Status K8s"
description: "Ultra-fast Kubernetes cluster health check using 8 parallel sub-agents for comprehensive state inspection"
author: "wcygan"
tags: ["ops","project"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Check mode: $ARGUMENTS (optional - quick or detailed, default: quick)
- Cluster context: !`kubectl config current-context 2>/dev/null || echo "No active context"`
- Cluster reachable: !`kubectl cluster-info --request-timeout=5s >/dev/null 2>&1 && echo "✅ Connected" || echo "❌ Unreachable"`
- Kubernetes version: !`kubectl version --short 2>&1 | rg "Server Version" || echo "Unable to get version"`
- Node count: !`kubectl get nodes --no-headers 2>/dev/null | wc -l | tr -d ' ' || echo "0"`
- Namespace count: !`kubectl get namespaces --no-headers 2>/dev/null | wc -l | tr -d ' ' || echo "0"`

## Your Task

**IMMEDIATELY DEPLOY 8 PARALLEL KUBERNETES CLUSTER HEALTH AGENTS** for ultra-fast comprehensive cluster analysis: **${ARGUMENTS:-quick} mode**

**CRITICAL**: Launch ALL agents simultaneously in first response - NO sequential processing.

## Parallel Kubernetes Cluster Health Framework

**NO SEQUENTIAL PROCESSING** - Deploy these specialized Kubernetes health analysis agents in parallel:

1. **Node Health & Resource Agent**: Node status, resource utilization, conditions, kubelet health, system resource pressure
2. **Pod Health & Lifecycle Agent**: Pod status, restart patterns, image pull issues, crash loops, resource consumption
3. **Workload Health Agent**: Deployment, StatefulSet, DaemonSet health, replica status, rollout analysis
4. **Service & Network Agent**: Service endpoints, ingress status, network policies, connectivity validation
5. **Storage & Volume Agent**: PV/PVC status, storage classes, volume mount issues, capacity analysis
6. **Security & RBAC Agent**: Pod security policies, RBAC configuration, network policies, security contexts
7. **Events & Diagnostics Agent**: Recent cluster events, warning analysis, failure patterns, troubleshooting data
8. **Performance & Metrics Agent**: Resource utilization trends, metrics server data, scaling recommendations

**Expected speedup**: 8x faster than sequential health checks.

**IMMEDIATELY LAUNCH ALL 8 AGENTS:**

**Agent 1: Node Health & Resource Analysis**
Analyze node status, resource utilization, system conditions, kubelet health, and infrastructure stability. Check for node pressure, capacity issues, and hardware problems.

**Agent 2: Pod Health & Lifecycle Analysis**
Evaluate pod status, restart patterns, image pull issues, crash loops, and container health. Identify failing pods, resource constraints, and lifecycle problems.

**Agent 3: Workload Health Analysis**
Assess Deployment, StatefulSet, and DaemonSet health, replica availability, rollout status, and scaling behavior. Check workload stability and configuration issues.

**Agent 4: Service & Network Analysis**
Analyze service endpoints, ingress configuration, network policies, and connectivity patterns. Verify network routing, load balancing, and service discovery.

**Agent 5: Storage & Volume Analysis**
Evaluate PersistentVolume/PersistentVolumeClaim status, storage classes, volume mounting, and capacity management. Check storage health and availability.

**Agent 6: Security & RBAC Analysis**
Assess pod security policies, RBAC configuration, network policies, security contexts, and access controls. Identify security vulnerabilities and misconfigurations.

**Agent 7: Events & Diagnostics Analysis**
Analyze recent cluster events, warning patterns, failure diagnostics, and troubleshooting information. Identify recurring issues and system problems.

**Agent 8: Performance & Metrics Analysis**
Evaluate resource utilization trends, metrics server data, performance bottlenecks, and scaling opportunities. Assess cluster performance and optimization needs.

**CRITICAL**: All agents execute simultaneously for maximum efficiency. Synthesis happens after all agents complete.

Expected completion time: 8x faster than traditional sequential analysis.

## Quick Reference

### Usage Examples

```bash
# Quick cluster health check (default)
/project-status-k8s

# Detailed analysis with events and pressure checks
/project-status-k8s detailed

# Check specific cluster context
kubectl config use-context my-cluster && /project-status-k8s
```

### Health Checks Performed

1. **Node Health**: Ready state, resource utilization, conditions
2. **Pod Health**: Running/failed states, system pods, resource usage
3. **Workload Health**: Replica readiness, StatefulSets, DaemonSets
4. **Service & Network**: Service endpoints, Ingress, NetworkPolicies
5. **Storage Health**: PV/PVC status, StorageClasses
6. **Security**: RBAC, pod security policies, network security
7. **Cluster Events**: Recent warnings and failures (detailed mode)
8. **Performance**: Resource pressure and utilization analysis (detailed mode)

This command provides comprehensive Kubernetes cluster health monitoring instead of build/test checks through parallel sub-agent analysis.