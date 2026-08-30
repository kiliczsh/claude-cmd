---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(eza:*), Bash(bat:*), Bash(jq:*), Bash(gdate:*), Bash(docker:*), Bash(kubectl:*), Bash(mvn:*), Bash(gradle:*), Bash(cargo:*), Bash(go:*)
name: "Containerize"
description: "Production-ready containerization orchestrator with multi-stage builds, security hardening, and Kubernetes optimization"
author: "wcygan"
tags: ["ops","deploy"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target project: $ARGUMENTS
- Current directory: !`pwd`
- Project structure: !`eza -la --tree --level=2 2>/dev/null | head -15 || fd . -t d -d 2 | head -10`
- Build files detected: !`fd "(Dockerfile|docker-compose|package\.json|Cargo\.toml|go\.mod|pom\.xml|build\.gradle|deno\.json)" . -d 3 | head -10 || echo "No build files detected"`
- Container tools status: !`echo "docker: $(which docker >/dev/null && echo ✓ || echo ✗) | kubectl: $(which kubectl >/dev/null && echo ✓ || echo ✗) | hadolint: $(which hadolint >/dev/null && echo ✓ || echo ✗)"`
- Existing containers: !`docker ps -a --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" 2>/dev/null | head -5 || echo "No Docker daemon or containers found"`

## Your Task

STEP 1: Initialize containerization session and analyze project architecture

- CREATE session state file: `/tmp/containerize-session-$SESSION_ID.json`
- ANALYZE project structure and technology stack from Context section
- DETECT primary and secondary languages/frameworks
- IDENTIFY existing containerization (Dockerfile, docker-compose.yml, K8s manifests)

```bash
# Initialize containerization session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetProject": "'$ARGUMENTS'",
  "detectedTechnologies": [],
  "containerStrategy": "auto-detect",
  "securityProfile": "production",
  "deploymentTarget": "kubernetes"
}' > /tmp/containerize-session-$SESSION_ID.json
```

STEP 2: Comprehensive project analysis with parallel sub-agent coordination

TRY:

IF project_complexity == "multi-service" OR technology_stack == "polyglot":

LAUNCH parallel sub-agents for comprehensive project analysis:

- **Agent 1: Technology Stack Analysis**: Analyze all build files, dependencies, and frameworks
  - Focus: Package managers, runtime requirements, build tools, version constraints
  - Tools: fd for file discovery, rg for dependency searches, language-specific tools
  - Output: Technology manifest with build requirements and constraints

- **Agent 2: Security & Compliance Assessment**: Evaluate security requirements and compliance needs
  - Focus: Secrets management, network policies, security contexts, vulnerability scanning
  - Tools: rg for credential patterns, static analysis of existing configurations
  - Output: Security profile and hardening recommendations

- **Agent 3: Performance & Optimization**: Analyze performance requirements and optimization opportunities
  - Focus: Build caching, layer optimization, resource requirements, scaling patterns
  - Tools: Analysis of build artifacts, dependency graphs, performance bottlenecks
  - Output: Optimization strategy and resource allocation recommendations

- **Agent 4: Deployment Architecture**: Design deployment strategy and infrastructure requirements
  - Focus: Kubernetes manifests, service mesh integration, monitoring, logging
  - Tools: kubectl for cluster analysis, infrastructure pattern detection
  - Output: Deployment architecture and operational requirements

ELSE:

EXECUTE streamlined single-service containerization analysis:

```bash
# Single-service analysis workflow
echo "🔍 Analyzing single-service containerization requirements..."
```

STEP 3: Intelligent Dockerfile generation based on detected technology stack

CASE detected_technology:
WHEN "rust":

**Rust Projects (Axum/Warp optimized):**

```dockerfile
# Build stage
FROM rust:1.80-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache musl-dev pkgconfig openssl-dev

# Cache dependencies
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release && rm -rf src/

# Build application
COPY src/ src/
RUN touch src/main.rs && cargo build --release

# Runtime stage
FROM alpine:3.19
RUN apk add --no-cache ca-certificates tzdata
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

WORKDIR /app
COPY --from=builder /app/target/release/app /app/
RUN chown -R appuser:appgroup /app

USER appuser
EXPOSE 8080
CMD ["./app"]
```

**Go Projects:**

```dockerfile
# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git ca-certificates tzdata

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Build application
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app ./cmd/server

# Runtime stage
FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /app/app /app

EXPOSE 8080
CMD ["/app"]
```

**Java Projects (Spring Boot/Quarkus):**

```dockerfile
# Build stage
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline -B

# Build application
COPY src src
RUN ./mvnw clean package -DskipTests -B

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
RUN chown appuser:appgroup app.jar

USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Deno Projects:**

```dockerfile
# Build stage (if compilation needed)
FROM denoland/deno:1.46.0 AS builder
WORKDIR /app

# Cache dependencies
COPY deno.json deno.lock* ./
RUN deno cache deps.ts

# Copy source and compile if needed
COPY . .
RUN deno task build || echo "No build step required"

# Runtime stage
FROM denoland/deno:1.46.0
RUN groupadd -g 1001 appgroup && useradd -u 1001 -g appgroup appuser

WORKDIR /app
COPY --from=builder /app .
RUN chown -R appuser:appgroup /app

USER appuser
EXPOSE 8080
CMD ["deno", "task", "start"]
```

WHEN "go":

**Go Projects (ConnectRPC optimized):**

```dockerfile
# Build stage with Go modules caching
FROM golang:1.22-alpine AS builder
WORKDIR /app

# Install build dependencies for ConnectRPC
RUN apk add --no-cache git ca-certificates tzdata protobuf

# Cache Go modules
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Copy source and build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w -s' -o app ./cmd/server

# Minimal runtime stage
FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /app/app /app

EXPOSE 8080 9090
CMD ["/app"]
```

WHEN "java":

**Java Projects (Spring Boot/Quarkus with Temporal):**

```dockerfile
# Build stage with Maven/Gradle optimization
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Cache dependencies based on build tool
COPY pom.xml* build.gradle* gradle.properties* settings.gradle* ./
COPY gradle/ gradle/ 2>/dev/null || true
COPY mvnw* .mvn/ ./ 2>/dev/null || true
RUN if [ -f "pom.xml" ]; then ./mvnw dependency:go-offline -B; elif [ -f "build.gradle" ]; then ./gradlew dependencies; fi

# Build application
COPY src src
RUN if [ -f "pom.xml" ]; then ./mvnw clean package -DskipTests -B; elif [ -f "build.gradle" ]; then ./gradlew build -x test; fi

# Runtime stage with JVM optimization
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

WORKDIR /app
COPY --from=builder /app/target/*.jar /app/build/libs/*.jar app.jar 2>/dev/null || true
RUN chown appuser:appgroup app.jar

USER appuser
EXPOSE 8080 9090
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "app.jar"]
```

WHEN "deno":

**Deno Projects (Fresh 2.0 optimized):**

```dockerfile
# Build stage with Fresh optimization
FROM denoland/deno:2.1.4 AS builder
WORKDIR /app

# Cache dependencies with JSR support
COPY deno.json deno.lock* import_map.json* ./
RUN deno cache --node-modules-dir=auto --reload main.ts || deno cache deps.ts

# Copy source and build Fresh app
COPY . .
RUN deno task build

# Runtime stage
FROM denoland/deno:2.1.4
RUN groupadd -g 1001 appgroup && useradd -u 1001 -g appgroup appuser

WORKDIR /app
COPY --from=builder /app .
RUN chown -R appuser:appgroup /app

USER appuser
EXPOSE 8000
CMD ["deno", "task", "start"]
```

STEP 4: Advanced security hardening with production-grade configurations

TRY:

**Security Context Implementation:**

```bash
# Generate security-hardened configuration
cat > security-context.yaml << 'EOF'
securityContext:
  runAsNonRoot: true
  runAsUser: 1001
  runAsGroup: 1001
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
    add:
      - NET_BIND_SERVICE
EOF
```

**Secret Management Strategy:**

FOR EACH environment IN [development, staging, production]:

```bash
# Environment-specific secret management
case $environment in
  "development")
    echo "Using local environment variables and .env files"
    ;;
  "staging"|"production")
    echo "Using Kubernetes secrets and external secret operators"
    ;;
esac
```

**Image Security Scanning Integration:**

```bash
# Automated security scanning pipeline
docker build -t temp-image:$SESSION_ID .
trivy image --exit-code 1 --severity HIGH,CRITICAL temp-image:$SESSION_ID
hadolint Dockerfile
docker scout cves temp-image:$SESSION_ID
```

CATCH (security_scan_failed):

- LOG security scan failures to session state
- PROVIDE remediation recommendations
- SAVE partial results for manual review

```bash
echo "⚠️ Security scan failed. Manual review required for:"
echo "  - Dockerfile best practices violations"
echo "  - High/Critical CVEs in base images"
echo "  - Secret detection in source code"
```

STEP 5: Performance optimization with intelligent caching strategies

**Layer Optimization Implementation:**

```bash
# Generate optimized .dockerignore
cat > .dockerignore << 'EOF'
# Version control
.git
.gitignore

# Documentation
README.md
docs/
*.md

# Development tools
.vscode/
.idea/
.devcontainer/

# Build artifacts
target/
dist/
build/
node_modules/

# OS files
.DS_Store
Thumbs.db

# Logs and temporary files
*.log
tmp/
.tmp/
EOF
```

**Build Cache Strategy:**

FOR EACH build_stage IN [dependencies, source, artifacts]:

```bash
# Stage-specific cache optimization
case $build_stage in
  "dependencies")
    echo "Implementing dependency layer caching with package lock files"
    ;;
  "source")
    echo "Separating source code from configuration for optimal rebuild"
    ;;
  "artifacts")
    echo "Multi-stage artifact copying with minimal final image"
    ;;
esac
```

STEP 6: Advanced health checks and observability integration

**Health Check Implementation:**

```dockerfile
# Intelligent health check based on service type
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || \
      nc -z localhost 8080 || \
      ./custom-health-check.sh || \
      exit 1

# Metrics exposure for Prometheus
EXPOSE 8080 9090 8081
LABEL prometheus.scrape="true"
LABEL prometheus.port="9090"
LABEL prometheus.path="/metrics"
```

STEP 7: Development environment orchestration with Docker Compose

**Generate Development Docker Compose:**

```yaml
# docker-compose.dev.yml
version: "3.8"
services:
  app:
    build:
      context: .
      target: builder
      cache_from:
        - app:cache
    volumes:
      - .:/app
      - /app/target
      - /app/node_modules
    ports:
      - "8080:8080"
      - "9090:9090"
    environment:
      - APP_ENV=development
      - DATABASE_URL=postgres://dev:dev@db:5432/appdb
      - DRAGONFLY_URL=redis://cache:6379
      - LOG_LEVEL=debug
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev -d appdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  cache:
    image: docker.dragonflydb.io/dragonflydb/dragonfly:v1.19.2
    ports:
      - "6379:6379"
    command: >
      dragonfly
      --bind 0.0.0.0
      --port 6379
      --maxmemory 256mb
      --save_schedule "*:5"
    volumes:
      - cache_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 3

volumes:
  postgres_data:
  cache_data:

networks:
  default:
    name: ${COMPOSE_PROJECT_NAME:-app}-network
```

STEP 8: Production Kubernetes manifests generation with modern infrastructure patterns

**Generate Production Kubernetes Deployment:**

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${APP_NAME:-containerized-app}
  namespace: ${NAMESPACE:-default}
  labels:
    app: ${APP_NAME:-containerized-app}
    version: ${VERSION:-latest}
    component: backend
  annotations:
    deployment.kubernetes.io/revision: "1"
    image.opencontainers.org/source: ${GIT_REPO:-unknown}
spec:
  replicas: ${REPLICAS:-3}
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: ${APP_NAME:-containerized-app}
  template:
    metadata:
      labels:
        app: ${APP_NAME:-containerized-app}
        version: ${VERSION:-latest}
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9090"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: ${APP_NAME:-containerized-app}
      containers:
        - name: app
          image: ${REGISTRY}/${APP_NAME}:${VERSION:-latest}
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
            - name: metrics
              containerPort: 9090
              protocol: TCP
            - name: grpc
              containerPort: 8081
              protocol: TCP
          env:
            - name: APP_ENV
              value: "production"
            - name: LOG_LEVEL
              value: "info"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: database-url
            - name: DRAGONFLY_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: cache-url
          resources:
            requests:
              memory: "256Mi"
              cpu: "200m"
              ephemeral-storage: "1Gi"
            limits:
              memory: "1Gi"
              cpu: "1000m"
              ephemeral-storage: "2Gi"
          livenessProbe:
            httpGet:
              path: /health
              port: http
              scheme: HTTP
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /ready
              port: http
              scheme: HTTP
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 2
          securityContext:
            runAsNonRoot: true
            runAsUser: 1001
            runAsGroup: 1001
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - ALL
              add:
                - NET_BIND_SERVICE
          volumeMounts:
            - name: tmp
              mountPath: /tmp
            - name: cache
              mountPath: /app/cache
      volumes:
        - name: tmp
          emptyDir: {}
        - name: cache
          emptyDir:
            sizeLimit: 1Gi
      nodeSelector:
        kubernetes.io/arch: amd64
      tolerations:
        - key: "workload"
          operator: "Equal"
          value: "backend"
          effect: "NoSchedule"
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - ${APP_NAME:-containerized-app}
                topologyKey: kubernetes.io/hostname
```

**Service and Ingress Configuration:**

```yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: ${APP_NAME:-containerized-app}-service
  namespace: ${NAMESPACE:-default}
  labels:
    app: ${APP_NAME:-containerized-app}
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
spec:
  type: ClusterIP
  selector:
    app: ${APP_NAME:-containerized-app}
  ports:
    - name: http
      port: 80
      targetPort: http
      protocol: TCP
    - name: grpc
      port: 8081
      targetPort: grpc
      protocol: TCP
  sessionAffinity: None

---
apiVersion: v1
kind: Service
metadata:
  name: ${APP_NAME:-containerized-app}-metrics
  namespace: ${NAMESPACE:-default}
  labels:
    app: ${APP_NAME:-containerized-app}
    component: metrics
spec:
  type: ClusterIP
  selector:
    app: ${APP_NAME:-containerized-app}
  ports:
    - name: metrics
      port: 9090
      targetPort: metrics
      protocol: TCP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${APP_NAME:-containerized-app}-ingress
  namespace: ${NAMESPACE:-default}
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  tls:
    - hosts:
        - ${HOSTNAME:-app.example.com}
      secretName: ${APP_NAME:-containerized-app}-tls
  rules:
    - host: ${HOSTNAME:-app.example.com}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ${APP_NAME:-containerized-app}-service
                port:
                  number: 80
```

STEP 9: Modern CI/CD pipeline generation with comprehensive automation

**Generate GitHub Actions Workflow:**

```yaml
# .github/workflows/containerize.yml
name: Container Build & Deploy Pipeline

on:
  push:
    branches: [main, develop]
    tags: [v*]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  security-scan:
    name: Security Analysis
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Dockerfile Security Scan
        run: |
          docker run --rm -i hadolint/hadolint < Dockerfile

      - name: Source Code Security Scan
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}

  build-and-test:
    name: Build & Test Container
    runs-on: ubuntu-latest
    needs: security-scan
    outputs:
      image-digest: ${{ steps.build.outputs.digest }}
      image-metadata: ${{ steps.meta.outputs.json }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        with:
          driver-opts: |
            image=moby/buildkit:master
            network=host

      - name: Login to Container Registry
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,prefix={{branch}}-

      - name: Build and push
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          provenance: true
          sbom: true

      - name: Container Image Vulnerability Scan
        if: github.event_name != 'pull_request'
        run: |
          docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
            aquasec/trivy image --exit-code 1 --severity HIGH,CRITICAL \
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: build-and-test
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - name: Deploy to Kubernetes
        run: |
          echo "Deploying ${{ needs.build-and-test.outputs.image-digest }} to staging"
          # kubectl apply -f k8s/ --namespace=staging

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: build-and-test
    if: startsWith(github.ref, 'refs/tags/v')
    environment: production
    steps:
      - name: Deploy to Kubernetes
        run: |
          echo "Deploying ${{ needs.build-and-test.outputs.image-digest }} to production"
          # kubectl apply -f k8s/ --namespace=production
```

STEP 10: Session completion and comprehensive documentation generation

**Update Session State:**

```bash
# Finalize session state with deliverables
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .completedAt = $timestamp |
  .deliverables = [
    "Multi-stage Dockerfile",
    "Docker Compose development environment", 
    "Production Kubernetes manifests",
    "CI/CD pipeline configuration",
    "Security scanning automation",
    "Health check implementation",
    "Comprehensive documentation"
  ] |
  .status = "completed"
' /tmp/containerize-session-$SESSION_ID.json > /tmp/containerize-session-$SESSION_ID.tmp && \
mv /tmp/containerize-session-$SESSION_ID.tmp /tmp/containerize-session-$SESSION_ID.json
```

**Generate Project Documentation:**

````markdown
# Container Deployment Guide

## Quick Start

```bash
# Development
docker-compose -f docker-compose.dev.yml up -d

# Production Build
docker build -t ${APP_NAME}:${VERSION} .

# Kubernetes Deployment
kubectl apply -f k8s/
```
````

## Security Features

- ✅ Non-root user execution (UID 1001)
- ✅ Read-only root filesystem
- ✅ Minimal attack surface (Alpine/distroless)
- ✅ Automated vulnerability scanning
- ✅ Secret management integration
- ✅ Network policies ready

## Monitoring & Observability

- 🔍 Health checks: `/health` and `/ready`
- 📊 Metrics exposure: `:9090/metrics`
- 📝 Structured logging with correlation IDs
- 🚨 Prometheus integration ready
- 📈 Grafana dashboard compatible

## Modern Infrastructure

- 🐘 PostgreSQL (not MySQL)
- 🐉 DragonflyDB (not Redis)
- 🦄 ScyllaDB (not Cassandra)
- 🔄 RedPanda (not Kafka)

````
FINALLY:

- SAVE complete containerization artifacts to project directory
- UPDATE session state with completion status
- PROVIDE deployment readiness checklist
- GENERATE security compliance report

**Containerization Session Summary:**

```bash
echo "✅ Containerization completed for: $ARGUMENTS"
echo "📦 Generated artifacts:"
echo "  - Dockerfile (multi-stage, security-hardened)"
echo "  - docker-compose.dev.yml (development environment)"
echo "  - k8s/ manifests (production-ready)"
echo "  - .github/workflows/containerize.yml (CI/CD pipeline)"
echo "  - .dockerignore (build optimization)"
echo "🔒 Security features implemented:"
echo "  - Non-root execution, read-only filesystem"
echo "  - Vulnerability scanning automation"
echo "  - Secret management integration"
echo "⚡ Performance optimizations:"
echo "  - Multi-stage builds with layer caching"
echo "  - Build dependency optimization"
echo "  - Resource limits and requests"
echo "📊 Session: $SESSION_ID"
echo "💾 State saved: /tmp/containerize-session-$SESSION_ID.json"
````