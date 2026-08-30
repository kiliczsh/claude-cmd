---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(kubectl:*), Bash(helm:*), Bash(git:*), Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(yq:*), Bash(gdate:*), Bash(docker:*), Bash(gh:*)
name: "Deploy"
description: "Intelligent Kubernetes deployment orchestrator with manifest generation and CI/CD integration"
author: "wcygan"
tags: ["ops","deploy"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target application: $ARGUMENTS
- Current directory: !`pwd`
- Git status: !`git status --porcelain | head -5 || echo "No git repository"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "unknown"`
- Latest commit: !`git rev-parse --short HEAD 2>/dev/null || echo "no-git"`
- Existing k8s directory: !`fd "^(k8s|kubernetes|deploy|infra)$" . -t d -d 2 | head -1 || echo "none"`
- Kubernetes context: !`kubectl config current-context 2>/dev/null || echo "not-configured"`
- Available clusters: !`kubectl config get-contexts -o name 2>/dev/null | head -3 || echo "none"`
- Helm charts detected: !`fd "Chart.yaml" . -d 3 | head -3 || echo "none"`
- Docker images in registry: !`docker images --format "table {{.Repository}}:{{.Tag}}" | grep -v "<none>" | head -3 2>/dev/null || echo "none"`
- Deployment tools status: !`echo "kubectl: $(which kubectl >/dev/null && echo ✓ || echo ✗) | helm: $(which helm >/dev/null && echo ✓ || echo ✗) | docker: $(which docker >/dev/null && echo ✓ || echo ✗)"`

## Your Task

STEP 1: Initialize intelligent deployment session with comprehensive project analysis

- CREATE session state file: `/tmp/deploy-session-$SESSION_ID.json`
- ANALYZE project structure and existing deployment patterns from Context
- DETERMINE deployment strategy based on discovered patterns
- VALIDATE prerequisites (kubectl access, docker images, cluster connectivity)

```bash
# Initialize deployment session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetApp": "'$ARGUMENTS'",
  "deploymentStrategy": "auto-detect",
  "environment": "staging",
  "manifestsGenerated": [],
  "deploymentStatus": "initialized"
}' > /tmp/deploy-session-$SESSION_ID.json
```

STEP 2: Adaptive deployment strategy selection with intelligent pattern detection

TRY:

CASE deployment_pattern:
WHEN "existing_kustomize":

- DETECT existing Kustomize structure in k8s/ directory
- UPDATE existing manifests with new image tags and configurations
- APPLY environment-specific overlays (staging/production)
- VALIDATE manifest syntax with `kubectl dry-run`

WHEN "existing_helm":

- ANALYZE existing Helm chart structure (Chart.yaml, values.yaml)
- UPDATE values files with new image tags and environment configuration
- VALIDATE Helm templates with `helm template` and `helm lint`
- PREPARE for environment-specific deployments

WHEN "generate_new_manifests":

- LAUNCH parallel sub-agents for comprehensive manifest generation
- CREATE production-ready Kubernetes manifests with best practices
- IMPLEMENT security hardening and observability features
- SETUP CI/CD integration with GitHub Actions

STEP 3: Parallel manifest generation using sub-agent architecture

IF no_existing_deployment_config OR generate_new_requested:

LAUNCH parallel sub-agents for comprehensive Kubernetes deployment setup:

- **Agent 1: Core Manifests Generation**: Create Deployment, Service, and Ingress manifests
  - Focus: Production-ready configurations with security best practices
  - Tools: kubectl, yq for YAML manipulation, template generation
  - Output: Core k8s manifests with proper resource management and health checks

- **Agent 2: Kustomize Structure Setup**: Create Kustomize base and overlay structure
  - Focus: Environment-specific configurations (staging, production, development)
  - Tools: Kustomize CLI, directory structure creation, overlay management
  - Output: Complete Kustomize setup with environment overlays

- **Agent 3: Secret Management**: Generate secure secret templates and management scripts
  - Focus: Kubernetes secrets, ConfigMaps, environment-specific configurations
  - Tools: kubectl, secure secret generation, template creation
  - Output: Secret templates and secure population commands

- **Agent 4: Monitoring & Observability**: Setup Prometheus metrics and logging configurations
  - Focus: Service monitors, alerts, dashboards, health check endpoints
  - Tools: Prometheus operator configs, Grafana dashboards, logging setup
  - Output: Complete observability stack configuration

- **Agent 5: CI/CD Integration**: Generate GitHub Actions workflows for automated deployment
  - Focus: Build, test, deploy pipelines with rollback capabilities
  - Tools: GitHub Actions, workflow generation, deployment automation
  - Output: Complete CI/CD pipeline with staging and production deployments

- **Agent 6: Security Hardening**: Implement Pod Security Standards and network policies
  - Focus: Security contexts, network policies, RBAC configurations
  - Tools: Pod Security Standards, network policy generation, RBAC setup
  - Output: Hardened deployment configuration with security best practices

**Sub-Agent Coordination:**

```bash
# Each agent reports findings to session state
echo "Parallel manifest generation agents launched..."
echo "Coordinating deployment artifact creation across security, observability, and automation"
```

STEP 4: Environment-specific configuration and deployment execution

**Environment Detection and Configuration:**

```bash
# Parse deployment target from arguments
target_env=$(echo "$ARGUMENTS" | rg "--to (\w+)" -o -r '$1' || echo "staging")
tag=$(echo "$ARGUMENTS" | rg "--tag ([\w\.-]+)" -o -r '$1' || git rev-parse --short HEAD)

echo "🎯 Deployment Target: $target_env"
echo "🏷️ Image Tag: $tag"

# Environment-specific resource configuration
case $target_env in
  "production")
    replicas=3
    resources_requests_cpu="500m"
    resources_requests_memory="512Mi"
    resources_limits_cpu="1000m"
    resources_limits_memory="1Gi"
    monitoring_enabled=true
    ;;
  "staging")
    replicas=2
    resources_requests_cpu="250m"
    resources_requests_memory="256Mi"
    resources_limits_cpu="500m"
    resources_limits_memory="512Mi"
    monitoring_enabled=true
    ;;
  "development")
    replicas=1
    resources_requests_cpu="100m"
    resources_requests_memory="128Mi"
    resources_limits_cpu="250m"
    resources_limits_memory="256Mi"
    monitoring_enabled=false
    ;;
esac
```

**Deployment Execution with Validation:**

```bash
# Validate cluster connectivity
kubectl cluster-info --request-timeout=5s

# Apply manifests with validation
IF kustomize_detected:
  kubectl apply -k k8s/overlays/$target_env --dry-run=client
  kubectl apply -k k8s/overlays/$target_env

ELSE IF helm_detected:
  helm upgrade --install $app_name ./helm-chart \
    --set image.tag=$tag \
    --set environment=$target_env \
    --namespace $target_env \
    --create-namespace \
    --dry-run
  helm upgrade --install $app_name ./helm-chart \
    --set image.tag=$tag \
    --set environment=$target_env \
    --namespace $target_env \
    --create-namespace

ELSE:
  kubectl apply -f k8s/ --dry-run=client
  kubectl apply -f k8s/
```

STEP 5: Post-deployment validation and monitoring setup

TRY:

**Deployment Status Verification:**

```bash
# Wait for deployment rollout
kubectl rollout status deployment/$app_name -n $target_env --timeout=300s

# Verify pod health
kubectl get pods -n $target_env -l app=$app_name -o json | \
  jq -r '.items[] | select(.status.phase != "Running") | .metadata.name' | \
  while read pod; do
    echo "⚠️ Pod $pod not running"
    kubectl describe pod $pod -n $target_env
  done

# Check service endpoints
kubectl get endpoints -n $target_env -l app=$app_name

# Verify ingress configuration
kubectl get ingress -n $target_env -o json | \
  jq -r '.items[] | .spec.rules[] | .host'
```

**Health Check and Service Verification:**

```bash
# Test service connectivity
service_ip=$(kubectl get svc $app_name -n $target_env -o jsonpath='{.spec.clusterIP}')
echo "🔍 Testing service connectivity: $service_ip"

# Port forward for local testing (if needed)
echo "💡 For local testing, run:"
echo "kubectl port-forward svc/$app_name -n $target_env 8080:80"

# Generate monitoring dashboard links
echo "📊 Monitoring dashboards:"
echo "  Grafana: https://grafana.yourdomain.com/d/kubernetes-app"
echo "  Prometheus: https://prometheus.yourdomain.com/graph"
```

CATCH (deployment_failed):

- LOG error details to session state
- PROVIDE rollback commands and troubleshooting steps
- SUGGEST alternative deployment strategies

```bash
echo "❌ Deployment failed. Providing rollback options:"
echo "kubectl rollout undo deployment/$app_name -n $target_env"
echo "kubectl get events -n $target_env --sort-by=.metadata.creationTimestamp"
echo "kubectl logs -l app=$app_name -n $target_env --tail=50"
```

STEP 6: Session state management and deployment documentation

**Update Deployment Session:**

```bash
# Update session state with deployment results
jq --arg status "deployed" --arg env "$target_env" --arg tag "$tag" '
  .deploymentStatus = $status |
  .environment = $env |
  .imageTag = $tag |
  .deployedAt = now
' /tmp/deploy-session-$SESSION_ID.json > /tmp/deploy-session-$SESSION_ID.tmp && \
mv /tmp/deploy-session-$SESSION_ID.tmp /tmp/deploy-session-$SESSION_ID.json
```

**Generate Deployment Summary:**

```bash
echo "✅ Deployment completed successfully"
echo "🎯 Application: $ARGUMENTS"
echo "🌍 Environment: $target_env"
echo "🏷️ Image Tag: $tag"
echo "📁 Manifests: $(ls k8s/*.yaml 2>/dev/null | wc -l | tr -d ' ') files generated"
echo "⏱️ Session: $SESSION_ID"
echo "💾 Session state: /tmp/deploy-session-$SESSION_ID.json"
```

FINALLY:

- SAVE deployment artifacts and session state
- PROVIDE operational runbooks and troubleshooting guides
- SUGGEST monitoring and alerting setup
- DOCUMENT rollback procedures

## Deployment Strategies Reference

### Kustomize Pattern (Recommended)

**Base Configuration:**

- `k8s/base/deployment.yaml` - Core deployment specification
- `k8s/base/service.yaml` - Service definition
- `k8s/base/kustomization.yaml` - Base Kustomize configuration

**Environment Overlays:**

- `k8s/overlays/staging/` - Staging-specific patches
- `k8s/overlays/production/` - Production-specific patches
- `k8s/overlays/development/` - Development-specific patches

### Helm Pattern

**Chart Structure:**

- `Chart.yaml` - Helm chart metadata
- `values.yaml` - Default configuration values
- `templates/` - Kubernetes manifest templates
- `values-staging.yaml` - Staging environment values
- `values-production.yaml` - Production environment values

### Raw Manifests Pattern

**Simple Structure:**

- `k8s/deployment.yaml` - Kubernetes Deployment
- `k8s/service.yaml` - Kubernetes Service
- `k8s/ingress.yaml` - Ingress configuration
- `k8s/configmap.yaml` - Application configuration
- `k8s/secret-template.yaml` - Secret template

## Security Best Practices

### Pod Security Context

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 65534
  fsGroup: 65534
  seccompProfile:
    type: RuntimeDefault
```

### Container Security

```yaml
securityContext:
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop:
      - ALL
```

### Network Policies

- Implement ingress/egress rules for pod-to-pod communication
- Restrict external network access to required services only
- Use namespace isolation for multi-tenant environments

## Resource Management

### Resource Requests and Limits

**Production Environment:**

- CPU Request: 500m, Limit: 1000m
- Memory Request: 512Mi, Limit: 1Gi
- Replicas: 3 (for high availability)

**Staging Environment:**

- CPU Request: 250m, Limit: 500m
- Memory Request: 256Mi, Limit: 512Mi
- Replicas: 2 (for testing load balancing)

**Development Environment:**

- CPU Request: 100m, Limit: 250m
- Memory Request: 128Mi, Limit: 256Mi
- Replicas: 1 (minimal resources)

## Observability Integration

### Prometheus Metrics

```yaml
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "9090"
  prometheus.io/path: "/metrics"
```

### Health Checks

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Example Usage Scenarios

```bash
# Deploy application to staging environment
/deploy my-api --to staging

# Deploy with specific image tag to production
/deploy my-web-app --to production --tag v2.1.0

# Deploy using Helm chart
/deploy my-service --to staging --helm

# Deploy with custom namespace
/deploy my-app --to production --namespace my-namespace

# Deploy with dry-run validation
/deploy my-service --to staging --dry-run
```

This intelligent deployment command adapts to your project structure, implements security best practices, and provides comprehensive CI/CD integration with parallel sub-agent coordination for optimal performance.