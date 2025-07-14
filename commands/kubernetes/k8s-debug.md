---
allowed-tools: Bash(kubectl:*), Bash(jq:*), Bash(rg:*), Read, Write
name: "K8s Debug"
description: "Systematically diagnose and troubleshoot Kubernetes issues"
author: "wcygan"
tags: ["kubernetes"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /k8s-debug

## Context

- Session ID: !`gdate +%s%N`
- Cluster status: !`kubectl cluster-info 2>/dev/null || echo "No cluster connection"`
- Node availability: !`kubectl get nodes -o json 2>/dev/null | jq -r '.items[] | "\(.metadata.name): \(.status.conditions[] | select(.type=="Ready") | .status)"' || echo "Cannot reach nodes"`
- Failed pods count: !`kubectl get pods --all-namespaces -o json 2>/dev/null | jq '[.items[] | select(.status.phase == "Failed" or .status.phase == "Unknown" or .status.phase == "Pending" or .status.phase == "Error")] | length' || echo "0"`
- Recent warnings: !`kubectl get events --all-namespaces --field-selector type=Warning --sort-by='.lastTimestamp' -o json 2>/dev/null | jq -r '.items[-5:] | reverse | .[] | "\(.involvedObject.namespace)/\(.involvedObject.name): \(.message)"' || echo "No recent warnings"`

## Your task

PROCEDURE diagnose_kubernetes_issue():

INPUT: resource_name = $ARGUMENTS || null
  STATE_FILE: /tmp/k8s-debug-$SESSION_ID.json

STEP 1: Initialize debugging context
IF resource_name IS NULL:

- Scan for failing resources across all namespaces
- Prioritize by failure severity (CrashLoopBackOff > Pending > Error)
- Present interactive selection for focus
  ELSE:
- Detect resource type using kubectl api-resources
- Verify resource exists
- Gather resource metadata

STEP 2: Quick health assessment
FOR EACH critical_component IN [nodes, system-pods, resource-quotas]:

- Check component health status
- Flag critical issues for immediate attention
- Save findings to state file

STEP 3: Resource-specific investigation
CASE resource_type:
WHEN "pod":

- Fetch pod describe output
- Retrieve container logs (current and previous)
- Check resource limits vs actual usage
- Analyze container restart patterns
- Verify volume mounts and secrets

  WHEN "service":
  - Verify endpoint availability
  - Check selector label matching
  - Test DNS resolution from debug pod
  - Analyze network policies
  - Validate ingress configuration

  WHEN "deployment":
  - Check rollout status and history
  - Analyze replica set health
  - Review deployment strategy
  - Verify pod template spec
  - Check horizontal pod autoscaler

STEP 4: Deep diagnostic analysis
FOR EACH issue_category IN [container-runtime, networking, storage, configuration]:
CASE issue_category:
WHEN "container-runtime":
IF pod.status CONTAINS "ImagePullBackOff":

- Verify image exists: docker pull [image]
- Check registry authentication
- Validate image pull secrets
  ELSE IF pod.status CONTAINS "CrashLoopBackOff":
- Analyze exit codes and error patterns
- Check resource constraints
- Review startup/liveness probes

  WHEN "networking":
  TRY:
  - Launch debug pod for connectivity tests
  - Test DNS resolution: nslookup kubernetes.default
  - Verify service discovery
  - Check network policy restrictions
    CATCH:
  - Document network isolation issues

  WHEN "storage":
  - Verify PVC binding status
  - Check storage class provisioner
  - Validate mount permissions
  - Analyze disk usage patterns

  WHEN "configuration":
  - Validate ConfigMap/Secret references
  - Check environment variable injection
  - Verify RBAC permissions
  - Analyze security context conflicts

STEP 5: Performance analysis
IF resource_type IN ["pod", "deployment"]:

- Collect resource metrics: cpu, memory, network I/O
- Identify throttling or OOM patterns
- Analyze container restart frequency
- Check horizontal/vertical scaling triggers

**Container Runtime Issues**

1. **Image Pull Problems**
   - Verify image exists and is accessible
   - Check imagePullSecrets configuration
   - Validate registry authentication
   - Review image pull policy settings

2. **Resource Constraints**
   - CPU and memory limit analysis
   - Node resource availability
   - Quality of Service (QoS) class impact
   - Pod eviction scenarios

3. **Configuration Errors**
   - Environment variable validation
   - ConfigMap and Secret mounting
   - Volume mount permissions
   - Security context conflicts

**Network Connectivity Issues**

1. **DNS Resolution**
   ```bash
   # Test DNS from within cluster
   kubectl run debug-pod --image=busybox --rm -it -- nslookup [service-name]
   kubectl exec -it [pod-name] -- nslookup kubernetes.default
   ```

2. **Service Discovery**
   - Service selector label matching
   - Endpoint availability and health
   - Port configuration verification
   - Load balancer status

3. **Network Policies**
   - Ingress and egress rule analysis
   - Pod-to-pod communication testing
   - External connectivity validation

**Storage and Persistence**

1. **Volume Mount Issues**
   - PersistentVolume and PersistentVolumeClaim status
   - Storage class configuration
   - Mount path permissions and ownership
   - Disk space and inode availability

2. **ConfigMap and Secret Problems**
   - Key existence and format validation
   - Mount path conflicts
   - Update propagation delays
   - Base64 encoding issues

STEP 6: Generate actionable recommendations
recommendations = []

    FOR EACH issue IN identified_issues:
      recommendation = {
        "severity": classify_severity(issue),
        "category": issue.category,
        "description": issue.description,
        "fix_commands": generate_fix_commands(issue),
        "prevention": suggest_preventive_measures(issue)
      }
      recommendations.append(recommendation)

    SORT recommendations BY severity DESC

STEP 7: Output comprehensive report
PRINT "=== Kubernetes Debugging Report ==="
PRINT "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
PRINT "Resource: ${resource_name:-Cluster-wide scan}"

    IF critical_issues.length > 0:
      PRINT "\n🚨 CRITICAL ISSUES REQUIRING IMMEDIATE ACTION:"
      FOR EACH issue IN critical_issues:
        PRINT "- ${issue.description}"
        PRINT "  Fix: ${issue.fix_command}"

    PRINT "\n📊 Diagnostic Summary:"
    FOR EACH category IN [health_status, resource_usage, configuration, networking]:
      PRINT formatted_findings(category)

    PRINT "\n🔧 Recommended Actions:"
    FOR EACH rec IN recommendations:
      PRINT "${rec.severity}: ${rec.description}"
      FOR EACH cmd IN rec.fix_commands:
        PRINT "  $ ${cmd}"

    SAVE state_file WITH all_findings
    PRINT "\nFull diagnostic data saved to: ${STATE_FILE}"

## Helper Functions

FUNCTION classify_severity(issue):
IF issue.affects_availability:
RETURN "CRITICAL"
ELSE IF issue.affects_performance:
RETURN "HIGH"
ELSE IF issue.affects_security:
RETURN "HIGH"
ELSE:
RETURN "MEDIUM"

FUNCTION generate_fix_commands(issue):
commands = []
CASE issue.type:
WHEN "ImagePullBackOff":
commands.add("kubectl create secret docker-registry ...")
commands.add("kubectl patch deployment ... -p '{\"spec\":{...}}'")
WHEN "CrashLoopBackOff":
commands.add("kubectl logs ${pod} --previous")
commands.add("kubectl edit deployment ${deployment}")
WHEN "Pending":
commands.add("kubectl describe pod ${pod} | grep Events")
commands.add("kubectl get nodes -o wide")
RETURN commands

## Common Issue Patterns

PATTERN crash_loop_backoff:
SYMPTOMS:

- Pod status shows CrashLoopBackOff
- Restart count increasing
- Container exits immediately
  ROOT_CAUSES:
- Application crashes on startup
- Missing dependencies or configuration
- Insufficient resources
- Failed health checks
  DIAGNOSTIC_STEPS:

1. Check logs: kubectl logs ${pod} --previous
2. Verify resource limits
3. Test image locally
4. Review startup probe configuration

PATTERN image_pull_errors:
SYMPTOMS:

- ErrImagePull or ImagePullBackOff status
- Events show "Failed to pull image"
  ROOT_CAUSES:
- Image doesn't exist
- Registry authentication failure
- Network connectivity issues
- Rate limiting
  DIAGNOSTIC_STEPS:

1. Verify image: docker pull ${image}
2. Check pull secrets
3. Test registry connectivity
4. Review image pull policy

PATTERN pod_pending:
SYMPTOMS:

- Pod stuck in Pending state
- No node assignment
  ROOT_CAUSES:
- Insufficient cluster resources
- Node selector constraints
- Taints and tolerations mismatch
- PVC not bound
  DIAGNOSTIC_STEPS:

1. Check node capacity
2. Review scheduling constraints
3. Verify PVC status
4. Analyze pod events

## State Management

The command maintains debugging state in `/tmp/k8s-debug-$SESSION_ID.json` for:

- Tracking investigated resources
- Storing diagnostic findings
- Enabling debug session resume
- Generating comprehensive reports

Example state structure:

```json
{
  "session_id": "1751705386263510000",
  "resource": "frontend-deployment",
  "namespace": "production",
  "findings": [
    {
      "severity": "CRITICAL",
      "category": "resources",
      "issue": "Memory limit too low causing OOMKills",
      "evidence": "10 OOMKill events in last hour",
      "fix_commands": [
        "kubectl patch deployment frontend-deployment -p '{\"spec\":{\"template\":{\"spec\":{\"containers\":[{\"name\":\"app\",\"resources\":{\"limits\":{\"memory\":\"512Mi\"}}}]}}}}'"
      ]
    }
  ],
  "recommendations": [],
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Error Handling

IF kubectl commands fail:

- Check cluster connectivity
- Verify kubeconfig settings
- Test with explicit context: --context=${context}
- Fallback to cached data if available

IF resource not found:

- Suggest similar resources using fuzzy matching
- List resources in namespace
- Check other namespaces

IF permissions denied:

- Document required RBAC permissions
- Suggest minimum role requirements
- Provide role binding examples