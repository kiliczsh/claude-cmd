---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(docker:*), Bash(kubectl:*), Bash(jq:*), Bash(gdate:*)
name: "Harden"
description: "Proactive security hardening orchestrator with multi-layer threat mitigation"
author: "wcygan"
tags: ["security","model"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target path: $ARGUMENTS
- Current directory: !`pwd`
- Project type detection: !`fd "(Dockerfile|docker-compose\.yml|Cargo\.toml|go\.mod|package\.json|pom\.xml|build\.gradle)" . -d 3 | head -5 || echo "No build files detected"`
- Container presence: !`fd "Dockerfile" . -d 2 | head -3 || echo "No Dockerfiles found"`
- Kubernetes manifests: !`fd "\.ya?ml$" . | rg -l "(apiVersion|kind):" | head -3 || echo "No K8s manifests detected"`
- Security tools status: !`echo "docker: $(which docker >/dev/null && echo ✓ || echo ✗) | kubectl: $(which kubectl >/dev/null && echo ✓ || echo ✗) | rg: $(which rg >/dev/null && echo ✓ || echo ✗)"`
- Git repository status: !`git status --porcelain 2>/dev/null | wc -l | tr -d ' ' | xargs -I {} echo "Modified files: {}" || echo "Not a git repository"`

## Your Task

STEP 1: Initialize comprehensive security hardening session with threat modeling

- CREATE session state: `/tmp/harden-session-$SESSION_ID.json`
- ANALYZE target scope from Context section
- DETERMINE security complexity based on project structure
- VALIDATE required security tools availability

```bash
# Initialize hardening session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetPath": "'$ARGUMENTS'",
  "projectType": "auto-detect",
  "hardeningLevel": "strict",
  "threatsIdentified": [],
  "mitigationsApplied": [],
  "complianceTarget": "general"
}' > /tmp/harden-session-$SESSION_ID.json
```

STEP 2: Multi-layer threat assessment with parallel security analysis

IF complex_infrastructure_detected OR kubernetes_manifests_found:

LAUNCH parallel sub-agents for comprehensive security assessment:

- **Agent 1: Container Security Assessment**: Analyze Dockerfiles and container configurations
  - Focus: Base image vulnerabilities, privilege escalation, filesystem security
  - Tools: Docker security scanning, distroless alternatives, multi-stage optimization
  - Output: Container hardening recommendations and secure Dockerfile templates

- **Agent 2: Kubernetes Security Analysis**: Evaluate K8s manifests and Pod Security Standards
  - Focus: RBAC policies, network policies, security contexts, admission controllers
  - Tools: kubectl security validation, OPA Gatekeeper policies, PSS compliance
  - Output: Secure manifest templates and policy enforcement rules

- **Agent 3: Application Code Security**: Scan source code for security anti-patterns
  - Focus: Input validation, authentication, authorization, cryptographic usage
  - Tools: Static analysis, dependency scanning, secret detection
  - Output: Code-level security improvements and secure coding patterns

- **Agent 4: Infrastructure Security**: Analyze deployment and networking security
  - Focus: Network segmentation, service mesh security, ingress/egress controls
  - Tools: Network policy generation, TLS configuration, certificate management
  - Output: Infrastructure security policies and network hardening

- **Agent 5: Compliance Assessment**: Evaluate against security frameworks
  - Focus: SOC 2, PCI DSS, HIPAA, CIS benchmarks compliance requirements
  - Tools: Compliance mapping, audit trail generation, policy documentation
  - Output: Compliance gap analysis and remediation roadmap

ELSE:

EXECUTE targeted single-layer hardening based on detected project type

STEP 3: Programmatic security hardening implementation with error handling

TRY:

CASE project_complexity:
WHEN "dockerfile_only":

- APPLY container security hardening patterns
- IMPLEMENT distroless base images and non-root execution
- ADD security scanning and vulnerability management
- GENERATE secure multi-stage build configurations

WHEN "kubernetes_deployment":

- ENFORCE Pod Security Standards (restricted profile)
- IMPLEMENT network policies for micro-segmentation
- CONFIGURE RBAC with principle of least privilege
- ADD security contexts and resource constraints

WHEN "application_code":

- INJECT security middleware and headers
- IMPLEMENT input validation and sanitization
- ADD authentication and authorization frameworks
- CONFIGURE secure session management

WHEN "full_stack_application":

- COORDINATE multi-layer security implementation
- APPLY defense-in-depth strategies
- IMPLEMENT comprehensive logging and monitoring
- CONFIGURE incident response procedures

**Security Hardening Patterns:**

```bash
# Container Security Implementation
if fd "Dockerfile" . | head -1 >/dev/null; then
  echo "🐳 Applying container security hardening..."
  # Multi-stage builds with distroless images
  # Non-root user execution
  # Read-only root filesystem
  # Dropped capabilities
fi

# Kubernetes Security Implementation  
if fd "\.ya?ml$" . | rg -l "kind: (Deployment|Pod)" | head -1 >/dev/null; then
  echo "☸️ Implementing Kubernetes security policies..."
  # Pod Security Standards enforcement
  # Network policy generation
  # RBAC configuration
  # Security context hardening
fi

# Application Security Implementation
project_lang=$(fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml)" . | head -1)
if [[ -n "$project_lang" ]]; then
  echo "🔒 Applying application-level security patterns..."
  # Security headers middleware
  # Input validation frameworks
  # Authentication/authorization
  # Secure configuration management
fi
```

CATCH (hardening_failed):

- LOG detailed error information to session state
- PROVIDE alternative hardening strategies
- SUGGEST manual security review steps
- GENERATE partial security improvements

```bash
echo "⚠️ Security hardening encountered issues:"
echo "- Check tool availability and permissions"
echo "- Validate target path accessibility"
echo "- Review project structure compatibility"
echo "- Consider manual security review process"
```

STEP 4: Compliance validation and security documentation generation

FOR EACH security_layer IN ["container", "kubernetes", "application", "infrastructure"]:

- VALIDATE applied security controls
- GENERATE compliance documentation
- CREATE security policy templates
- IMPLEMENT monitoring and alerting

**Security Documentation Generation:**

```bash
# Generate comprehensive security documentation
mkdir -p security/{policies,procedures,compliance}

# Security policy documentation
echo "📋 Generating security documentation suite..."
echo "  - SECURITY.md: Security policy and procedures"
echo "  - threat-model.md: Application threat analysis"
echo "  - compliance/: Framework-specific compliance documentation"
echo "  - incident-response/: Security incident procedures"
```

STEP 5: Session state management and continuous security monitoring

**Update Hardening Session State:**

```bash
# Update session with applied mitigations
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" \
   --argjson mitigations '["container_hardening", "k8s_policies", "app_security"]' '
  .lastUpdated = $timestamp |
  .mitigationsApplied += $mitigations |
  .hardeningStatus = "completed"
' /tmp/harden-session-$SESSION_ID.json > /tmp/harden-session-$SESSION_ID.tmp && \
mv /tmp/harden-session-$SESSION_ID.tmp /tmp/harden-session-$SESSION_ID.json
```

**Security Monitoring Setup:**

```bash
echo "🔍 Security hardening completed successfully"
echo "📊 Session: $SESSION_ID"
echo "🎯 Target: $ARGUMENTS"
echo "🛡️ Applied mitigations: $(jq -r '.mitigationsApplied | join(", ")' /tmp/harden-session-$SESSION_ID.json)"
echo "📁 Security documentation: security/ directory"
echo "⚡ Next steps: Review generated policies and implement monitoring"
```

FINALLY:

- SAVE complete hardening state for audit trail
- PROVIDE security monitoring recommendations
- SUGGEST periodic security review schedule
- CLEAN up temporary session files

## Security Implementation Levels

## Description

This command systematically reduces your application's attack surface by implementing security hardening across multiple layers. Unlike audit-focused tools, `/harden` makes actual security improvements to your code and infrastructure.

### Security Layers

#### 1. Container Security (Dockerfile)

Transforms Docker images to follow security best practices:

**Before:**

```dockerfile
FROM node:18
COPY . /app
WORKDIR /app
RUN npm install
USER root
CMD ["npm", "start"]
```

**After:**

```dockerfile
# Multi-stage build with distroless final image
FROM node:18-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM gcr.io/distroless/nodejs18-debian11:nonroot
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder --chown=nonroot:nonroot /build/src /app/src

# Security hardening
USER nonroot
WORKDIR /app

# Read-only root filesystem
COPY --chmod=444 package.json ./
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

EXPOSE 3000
CMD ["node", "src/index.js"]
```

**Applied Hardening:**

- Distroless or minimal base images (Alpine, scratch)
- Non-root user execution with proper UID/GID
- Read-only root filesystem where possible
- Dropped unnecessary capabilities
- Multi-stage builds to reduce image size
- Dependency vulnerability scanning integration

#### 2. Kubernetes Security

Implements Pod Security Standards and network policies:

**Generated Pod Security Context:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-app
spec:
  template:
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        runAsGroup: 10001
        fsGroup: 10001
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: app
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop:
                - ALL
              add:
                - NET_BIND_SERVICE # Only if needed for port 80/443
          resources:
            requests:
              memory: "64Mi"
              cpu: "250m"
            limits:
              memory: "128Mi"
              cpu: "500m"
          volumeMounts:
            - name: tmp
              mountPath: /tmp
            - name: var-cache
              mountPath: /var/cache
      volumes:
        - name: tmp
          emptyDir: {}
        - name: var-cache
          emptyDir: {}
```

**Network Policy Generation:**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: secure-app-netpol
spec:
  podSelector:
    matchLabels:
      app: secure-app
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: database
      ports:
        - protocol: TCP
          port: 5432
    - to: [] # DNS resolution
      ports:
        - protocol: UDP
          port: 53
```

#### 3. Application-Level Security

Injects security controls directly into application code:

**Web Framework Hardening (Go with Gin):**

```go
func SecurityMiddleware() gin.HandlerFunc {
    return gin.HandlerFunc(func(c *gin.Context) {
        // Security headers
        c.Header("X-Frame-Options", "DENY")
        c.Header("X-Content-Type-Options", "nosniff")
        c.Header("X-XSS-Protection", "1; mode=block")
        c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        c.Header("Content-Security-Policy", "default-src 'self'")
        c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
        
        // Remove server identification
        c.Header("Server", "")
        
        c.Next()
    })
}

func CORSMiddleware() gin.HandlerFunc {
    return cors.New(cors.Config{
        AllowOrigins:     []string{"https://yourdomain.com"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: false,
        MaxAge:           12 * time.Hour,
    })
}
```

**Rust Axum Security Implementation:**

```rust
use axum::{
    http::{HeaderMap, HeaderName, HeaderValue, StatusCode},
    middleware::{self, Next},
    response::Response,
    Router,
};

async fn security_headers_middleware<B>(
    mut request: axum::extract::Request<B>,
    next: Next<B>,
) -> Response {
    let mut response = next.run(request).await;
    
    let headers = response.headers_mut();
    headers.insert("x-frame-options", HeaderValue::from_static("DENY"));
    headers.insert("x-content-type-options", HeaderValue::from_static("nosniff"));
    headers.insert("x-xss-protection", HeaderValue::from_static("1; mode=block"));
    headers.insert(
        "strict-transport-security",
        HeaderValue::from_static("max-age=31536000; includeSubDomains"),
    );
    headers.insert(
        "content-security-policy",
        HeaderValue::from_static("default-src 'self'"),
    );
    
    response
}

pub fn create_secure_router() -> Router {
    Router::new()
        .layer(middleware::from_fn(security_headers_middleware))
        .layer(middleware::from_fn(rate_limiting_middleware))
        .layer(middleware::from_fn(request_timeout_middleware))
}
```

**Java Spring Security Configuration:**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers(headers -> headers
                .frameOptions().deny()
                .contentTypeOptions().and()
                .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                    .maxAgeInSeconds(31536000)
                    .includeSubdomains(true))
                .contentSecurityPolicy("default-src 'self'"))
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .ignoringRequestMatchers("/api/public/**"))
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .maximumSessions(1)
                .maxSessionsPreventsLogin(false));
                
        return http.build();
    }
}
```

#### 4. Dependency Security

Automatically secures dependencies and supply chain:

**Go Module Security:**

```go
// go.mod - Pin dependencies to specific secure versions
module secure-app

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/golang-jwt/jwt/v5 v5.0.0  // Updated from vulnerable v4
    golang.org/x/crypto v0.14.0          // Latest security patches
)

// Remove indirect dependencies with known vulnerabilities
replace github.com/old-vulnerable-dep => github.com/secure-alternative v1.0.0
```

**Rust Cargo.toml Hardening:**

```toml
[dependencies]
# Pin to exact versions for reproducible builds
serde = "=1.0.190"
tokio = { version = "=1.33.0", features = ["macros", "rt-multi-thread"] }

# Security-focused alternatives
ring = "0.17.5"  # Instead of older crypto libraries
rustls = "0.21.8"  # Instead of OpenSSL bindings

[dependencies.sqlx]
version = "0.7.2"
features = ["runtime-tokio-rustls", "postgres", "chrono", "uuid"]
# Use rustls instead of native-tls for better security

# Audit configuration
[profile.release]
panic = "abort"  # Prevent stack unwinding attacks
lto = true       # Link-time optimization
codegen-units = 1
```

#### 5. Secrets and Configuration Security

Implements secure secret management patterns:

**Environment Variable Security:**

```bash
#!/bin/bash
# secure-env.sh - Generated secure environment setup

# Validate required secrets are present
required_vars=("DATABASE_URL" "JWT_SECRET" "API_KEY")
for var in "${required_vars[@]}"; do
    if [[ -z "${!var}" ]]; then
        echo "ERROR: Required environment variable $var is not set"
        exit 1
    fi
done

# Validate secret formats
if [[ ! $DATABASE_URL =~ ^postgresql://.*$ ]]; then
    echo "ERROR: DATABASE_URL must be a valid PostgreSQL connection string"
    exit 1
fi

if [[ ${#JWT_SECRET} -lt 32 ]]; then
    echo "ERROR: JWT_SECRET must be at least 32 characters"
    exit 1
fi

export NODE_ENV=production
export LOG_LEVEL=info
export SECURE_COOKIES=true
export SESSION_TIMEOUT=3600
```

**Kubernetes Secret Management:**

```yaml
# External Secrets Operator configuration
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.company.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "secure-app"

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  data:
    - secretKey: database-url
      remoteRef:
        key: secure-app/config
        property: database_url
```

### Security Implementation Levels

#### Basic Level (default)

- Essential HTTP security headers (HSTS, CSP, X-Frame-Options)
- Non-root container execution with proper UID/GID
- Basic input validation and sanitization
- HTTPS enforcement and secure cookie configuration
- Dependency vulnerability scanning

#### Strict Level (recommended for production)

- Comprehensive security headers with strict CSP policies
- Read-only root filesystems and dropped capabilities
- Kubernetes network policies for micro-segmentation
- Pod Security Standards (restricted profile) enforcement
- Secrets rotation policies and external secret management
- Automated security scanning in CI/CD pipelines
- RBAC with principle of least privilege

#### Paranoid Level (high-security environments)

- Zero-trust network architecture with service mesh
- Mandatory access controls (SELinux/AppArmor/Seccomp)
- Runtime security monitoring with Falco/Tetragon
- Comprehensive audit logging and SIEM integration
- Multi-factor authentication requirements
- Runtime application self-protection (RASP)
- Continuous compliance monitoring and attestation
- Hardware security module (HSM) integration

### Compliance Templates

#### SOC 2 Compliance

- Audit logging for all data access
- Encryption at rest and in transit
- Access control documentation
- Incident response procedures

#### PCI DSS Compliance

- Payment data isolation
- Strong cryptography implementation
- Regular security testing
- Network segmentation

#### HIPAA Compliance

- PHI data encryption
- Access controls and audit trails
- Risk assessment documentation
- Breach notification procedures

## Usage Examples

### Container Security Hardening

```bash
# Harden single Dockerfile with security best practices
/harden ./Dockerfile

# Apply strict container security to multi-service application
/harden ./docker --level strict
```

### Kubernetes Security Implementation

```bash
# Implement Pod Security Standards for K8s manifests
/harden ./k8s

# Apply paranoid-level security for production cluster
/harden ./manifests --level paranoid
```

### Application Security Integration

```bash
# Add security middleware and headers to Go/Rust/Java application
/harden ./src

# SOC 2 compliance hardening with audit trail generation
/harden ./app --compliance soc2
```

### Full-Stack Security Hardening

```bash
# Comprehensive multi-layer security for entire application
/harden . --level strict

# HIPAA compliance with healthcare-specific controls
/harden . --compliance hipaa --level paranoid
```

### Targeted Security Improvements

```bash
# Focus on container security only
/harden . --focus container

# Network security and policies only
/harden ./k8s --focus network
```

## Generated Security Documentation

Creates comprehensive security documentation:

```
security/
├── SECURITY.md           # Security policy and procedures
├── threat-model.md       # Application threat model
├── compliance/
│   ├── soc2-controls.md
│   └── security-checklist.md
└── incident-response/
    └── runbook.md
```

## Integration with Other Commands

- Use with `/containerize` to create secure container images
- Combine with `/deploy` for secure Kubernetes deployments
- Use with `/observe` for security monitoring and alerting
- Integrate with `/ci-gen` to add security scanning to CI pipelines