---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(git:*), Bash(gdate:*), Bash(jq:*), Bash(wc:*), Task, WebFetch
name: "Elaborate"
description: "Generate comprehensive technical analysis and implementation guide with adaptive research and project-specific optimization"
author: "wcygan"
tags: ["analyze","code"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Analysis target: $ARGUMENTS
- Project structure: !`fd . -t d -d 3 | head -15 || echo "No directories found"`
- Code files: !`fd "\.(rs|go|java|py|js|ts|cpp|c|kt|scala|rb|php|cs|swift)$" . | wc -l | tr -d ' ' || echo "0"`
- Configuration files: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|deno\.json|requirements\.txt|composer\.json|build\.gradle)$" . -d 3 || echo "No config files"`
- Documentation: !`fd "(README|CHANGELOG|CONTRIBUTING|LICENSE)\.md$" . -d 2 | head -5 || echo "No docs found"`
- Test files: !`fd "(test|spec)" . -t f | wc -l | tr -d ' ' || echo "0"`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "Yes" || echo "No"`
- Recent changes: !`git log --oneline -5 2>/dev/null || echo "No git repository"`
- Branch status: !`git status --porcelain 2>/dev/null | wc -l | tr -d ' ' | xargs -I {} echo "{} uncommitted files" || echo "N/A"`
- Technology stack indicators: !`rg "(import|require|use|include|from)" . --type rust --type go --type java --type python --type typescript | head -10 | cut -d: -f3 | sort -u | head -5 || echo "No imports detected"`

## Your Task

**IMMEDIATELY DEPLOY 10 PARALLEL ANALYSIS AGENTS** for ultra-fast comprehensive technical analysis: **$ARGUMENTS**

Think deeply about comprehensive technical implementation while maximizing parallel execution for 10x speedup.

**CRITICAL**: Launch ALL agents simultaneously in first response - NO conditional complexity logic.

## Parallel Analysis Framework

STEP 1: **LAUNCH ALL 10 AGENTS SIMULTANEOUSLY**

**NO CONDITIONAL PROCESSING** - Deploy these specialized analysis agents in parallel:

1. **Technology Stack Agent**: Detect languages, frameworks, dependencies, and architectural patterns
2. **Implementation Strategy Agent**: Research best practices, design patterns, and technology-specific solutions
3. **Testing & Quality Agent**: Testing frameworks, coverage strategies, CI/CD pipelines, and quality gates
4. **DevOps & Deployment Agent**: Infrastructure, monitoring, deployment automation, and production readiness
5. **Security & Compliance Agent**: Security patterns, authentication, authorization, and compliance requirements
6. **Performance & Scalability Agent**: Optimization strategies, caching, load balancing, and scaling patterns
7. **Code Examples Agent**: Working implementations, advanced patterns, and real-world use cases
8. **Risk Assessment Agent**: Technical debt, alternative approaches, migration paths, and trade-off analysis
9. **Documentation & Standards Agent**: API documentation, architectural decisions, and team coordination
10. **Integration & APIs Agent**: Service integration, external APIs, data flow, and system boundaries

**Expected speedup**: 10x faster than sequential analysis.

STEP 2: Initialize Parallel Session Management

```json
// /tmp/elaborate-analysis-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "target": "$ARGUMENTS",
  "phase": "parallel_analysis",
  "technology_stack": "auto-detect",
  "analysis_domains": [
    "technology",
    "implementation",
    "testing",
    "devops",
    "security",
    "performance",
    "examples",
    "risks",
    "documentation",
    "integration"
  ],
  "research_findings": {},
  "implementation_phases": [],
  "artifacts_created": [],
  "checkpoints": []
}
```

STEP 3: Parallel Research & Analysis Execution

**ALL AGENTS WORK CONCURRENTLY:**

**Comprehensive Analysis Discovery:**

```bash
# Technology stack and dependencies
fd . -t f -e json -e toml -e xml -e py -e rs -e go -e java -e ts -e js | head -20

# Architecture and patterns
rg "(class|interface|struct|enum|type|module)" . --type rust --type go --type java --type typescript | head -10

# Testing and quality frameworks
rg "(test|spec|mock|assert|describe|it)" . | head -10

# Configuration and deployment
fd . -t f | rg "(docker|k8s|config|deploy|ci|cd)" | head -10
```

TRY:
Launch all 10 parallel agents for comprehensive technical analysis
Execute concurrent research across all analysis domains
Synthesize findings from all agent results
Generate multi-phase implementation roadmap
Create comprehensive technical documentation
Update session state: phase = "analysis_complete"

CATCH (agent_failures):
Continue with available agent results
Document failed analysis areas
Provide partial guidance with gaps identified
Generate basic implementation roadmap

FINALLY:
Aggregate all parallel agent findings
Synthesize comprehensive technical analysis
Generate implementation phases and roadmap
Create technology-specific code examples
Save artifacts: comprehensive-guide.md, implementation-checklist.md, code-examples/
Clean up temporary analysis files

STEP 4: **Parallel Results Synthesis**

WAIT for ALL 10 agents to complete technical analysis
AGGREGATE findings from all parallel streams:

- Complete technology stack analysis and recommendations
- Implementation strategy with best practices and patterns
- Testing framework recommendations and quality gates
- DevOps pipeline and deployment automation strategies
- Security patterns and compliance requirements
- Performance optimization and scalability approaches
- Working code examples and advanced implementation patterns
- Risk assessment and alternative architecture options
- Documentation standards and team coordination strategies
- Integration patterns and API design recommendations

GENERATE multi-phase implementation roadmap:

- Phase 1: Foundation Setup (1-2 weeks)
- Phase 2: Core Implementation (3-4 weeks)
- Phase 3: Production Readiness (1-2 weeks)
- Phase 4: Optimization & Scaling (ongoing)

CREATE comprehensive artifacts:

- `/tmp/elaborate-analysis-$SESSION_ID/comprehensive-guide.md`
- `/tmp/elaborate-analysis-$SESSION_ID/implementation-checklist.md`
- `/tmp/elaborate-analysis-$SESSION_ID/code-examples/`
- `/tmp/elaborate-analysis-$SESSION_ID/deployment-guide.md`
- `/tmp/elaborate-analysis-$SESSION_ID/architecture-decisions.md`

## Analysis Framework

### Comprehensive Analysis Framework

**ALWAYS generate ALL sections** - no complexity-based limitations:

1. **Executive Summary** (business impact and technical overview)
2. **System Architecture** (components, data flow, integration patterns)
3. **Technology Selection Matrix** (comparison with justification)
4. **Implementation Phases** (4-phase roadmap with dependencies)
5. **Code Examples & Patterns** (working implementations with best practices)
6. **Integration Strategy** (APIs, event handling, data consistency)
7. **Testing Framework** (unit, integration, performance, security testing)
8. **Security & Compliance** (authentication, authorization, data protection)
9. **DevOps & Deployment** (CI/CD, infrastructure, monitoring)
10. **Performance & Scalability** (optimization strategies and scaling patterns)
11. **Risk Assessment** (technical, operational, business risks)
12. **Alternative Architectures** (multiple approaches with trade-off analysis)
13. **Production Considerations** (monitoring, incident response, maintenance)
14. **Team Coordination** (development practices, documentation standards)
15. **Resource Library** (documentation, tools, learning materials)

**Performance Benefits:**

- **10x faster analysis** through parallel agent execution
- **Comprehensive coverage** across all technical domains
- **Consistent quality** regardless of project complexity

### Comprehensive Code Examples by Technology

**Rust Implementation Patterns:**

```rust
// Advanced error handling with custom error types
use thiserror::Error;
use serde::{Deserialize, Serialize};

#[derive(Error, Debug)]
pub enum AnalysisError {
    #[error("Invalid input: {message}")]
    InvalidInput { message: String },
    #[error("Processing failed: {source}")]
    ProcessingError { 
        #[from] 
        source: Box<dyn std::error::Error + Send + Sync> 
    },
    #[error("Resource not found: {resource}")]
    NotFound { resource: String },
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AnalysisResult {
    pub success: bool,
    pub data: Option<serde_json::Value>,
    pub metrics: AnalysisMetrics,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AnalysisMetrics {
    pub processing_time_ms: u64,
    pub memory_usage_kb: u64,
    pub items_processed: usize,
}

// Async processing with proper error handling
pub async fn process_analysis_request(
    input: &str,
) -> Result<AnalysisResult, AnalysisError> {
    let start_time = std::time::Instant::now();
    
    // Validate input
    if input.is_empty() {
        return Err(AnalysisError::InvalidInput {
            message: "Input cannot be empty".to_string(),
        });
    }
    
    // Process with timeout
    let result = tokio::time::timeout(
        std::time::Duration::from_secs(30),
        async {
            // Simulated async processing
            tokio::time::sleep(std::time::Duration::from_millis(100)).await;
            serde_json::json!({
                "analysis": "comprehensive",
                "confidence": 0.95,
                "recommendations": ["optimize", "refactor", "test"]
            })
        }
    ).await
    .map_err(|_| AnalysisError::ProcessingError {
        source: "Timeout during processing".into(),
    })?;
    
    let metrics = AnalysisMetrics {
        processing_time_ms: start_time.elapsed().as_millis() as u64,
        memory_usage_kb: 0, // Would be calculated in real implementation
        items_processed: 1,
    };
    
    Ok(AnalysisResult {
        success: true,
        data: Some(result),
        metrics,
    })
}

// Testing patterns with mock and async
#[cfg(test)]
mod tests {
    use super::*;
    use tokio;
    
    #[tokio::test]
    async fn test_successful_analysis() {
        let result = process_analysis_request("valid input").await;
        assert!(result.is_ok());
        
        let analysis = result.unwrap();
        assert!(analysis.success);
        assert!(analysis.data.is_some());
    }
    
    #[tokio::test]
    async fn test_empty_input_error() {
        let result = process_analysis_request("").await;
        assert!(result.is_err());
        
        match result.unwrap_err() {
            AnalysisError::InvalidInput { message } => {
                assert_eq!(message, "Input cannot be empty");
            },
            _ => panic!("Expected InvalidInput error"),
        }
    }
}
```

**Go Implementation Patterns:**

```go
// Enterprise-grade Go implementation with proper error handling
package analysis

import (
    "context"
    "encoding/json"
    "fmt"
    "log/slog"
    "time"
    
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
)

// Custom error types with proper wrapping
type AnalysisError struct {
    Code    string `json:"code"`
    Message string `json:"message"`
    Cause   error  `json:"-"`
}

func (e *AnalysisError) Error() string {
    if e.Cause != nil {
        return fmt.Sprintf("%s: %s (caused by: %v)", e.Code, e.Message, e.Cause)
    }
    return fmt.Sprintf("%s: %s", e.Code, e.Message)
}

func (e *AnalysisError) Unwrap() error {
    return e.Cause
}

// Metrics for observability
var (
    analysisRequests = promauto.NewCounterVec(
        prometheus.CounterOpts{
            Name: "analysis_requests_total",
            Help: "Total number of analysis requests",
        },
        []string{"status"},
    )
    
    analysisDuration = promauto.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "analysis_duration_seconds",
            Help: "Duration of analysis requests",
        },
        []string{"type"},
    )
)

// Service interface for dependency injection
type AnalysisService interface {
    ProcessRequest(ctx context.Context, req *AnalysisRequest) (*AnalysisResult, error)
}

type analysisService struct {
    logger   *slog.Logger
    timeout  time.Duration
    maxItems int
}

// Constructor with options pattern
type ServiceOption func(*analysisService)

func WithTimeout(timeout time.Duration) ServiceOption {
    return func(s *analysisService) {
        s.timeout = timeout
    }
}

func WithMaxItems(max int) ServiceOption {
    return func(s *analysisService) {
        s.maxItems = max
    }
}

func NewAnalysisService(logger *slog.Logger, opts ...ServiceOption) AnalysisService {
    s := &analysisService{
        logger:   logger,
        timeout:  30 * time.Second,
        maxItems: 1000,
    }
    
    for _, opt := range opts {
        opt(s)
    }
    
    return s
}

// Request and response types
type AnalysisRequest struct {
    Input string            `json:"input" validate:"required,min=1"`
    Type  string            `json:"type" validate:"required,oneof=quick detailed comprehensive"`
    Meta  map[string]string `json:"meta,omitempty"`
}

type AnalysisResult struct {
    Success bool                   `json:"success"`
    Data    map[string]interface{} `json:"data,omitempty"`
    Metrics AnalysisMetrics        `json:"metrics"`
    Error   string                 `json:"error,omitempty"`
}

type AnalysisMetrics struct {
    ProcessingTimeMs int64 `json:"processing_time_ms"`
    MemoryUsageKB   int64 `json:"memory_usage_kb"`
    ItemsProcessed  int   `json:"items_processed"`
}

// Main processing method with proper error handling and observability
func (s *analysisService) ProcessRequest(ctx context.Context, req *AnalysisRequest) (*AnalysisResult, error) {
    start := time.Now()
    defer func() {
        analysisDuration.WithLabelValues(req.Type).Observe(time.Since(start).Seconds())
    }()
    
    s.logger.Info("Processing analysis request",
        slog.String("type", req.Type),
        slog.String("input_length", fmt.Sprintf("%d", len(req.Input))))
    
    // Validate input
    if req.Input == "" {
        err := &AnalysisError{
            Code:    "INVALID_INPUT",
            Message: "Input cannot be empty",
        }
        analysisRequests.WithLabelValues("error").Inc()
        return nil, err
    }
    
    // Create timeout context
    timeoutCtx, cancel := context.WithTimeout(ctx, s.timeout)
    defer cancel()
    
    // Process with proper cancellation handling
    resultChan := make(chan *AnalysisResult, 1)
    errorChan := make(chan error, 1)
    
    go func() {
        result, err := s.processAnalysis(timeoutCtx, req)
        if err != nil {
            errorChan <- err
            return
        }
        resultChan <- result
    }()
    
    select {
    case result := <-resultChan:
        analysisRequests.WithLabelValues("success").Inc()
        s.logger.Info("Analysis completed successfully",
            slog.Duration("duration", time.Since(start)))
        return result, nil
        
    case err := <-errorChan:
        analysisRequests.WithLabelValues("error").Inc()
        s.logger.Error("Analysis failed",
            slog.String("error", err.Error()),
            slog.Duration("duration", time.Since(start)))
        return nil, err
        
    case <-timeoutCtx.Done():
        err := &AnalysisError{
            Code:    "TIMEOUT",
            Message: fmt.Sprintf("Analysis timed out after %v", s.timeout),
            Cause:   timeoutCtx.Err(),
        }
        analysisRequests.WithLabelValues("timeout").Inc()
        return nil, err
    }
}

func (s *analysisService) processAnalysis(ctx context.Context, req *AnalysisRequest) (*AnalysisResult, error) {
    // Simulate processing time
    select {
    case <-time.After(100 * time.Millisecond):
        // Processing completed
    case <-ctx.Done():
        return nil, ctx.Err()
    }
    
    data := map[string]interface{}{
        "analysis_type": req.Type,
        "confidence":    0.95,
        "recommendations": []string{
            "optimize performance",
            "add monitoring",
            "improve error handling",
        },
    }
    
    return &AnalysisResult{
        Success: true,
        Data:    data,
        Metrics: AnalysisMetrics{
            ProcessingTimeMs: 100,
            MemoryUsageKB:   512,
            ItemsProcessed:  1,
        },
    }, nil
}

// Testing patterns with testify
package analysis_test

import (
    "context"
    "log/slog"
    "testing"
    "time"
    
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

func TestAnalysisService_ProcessRequest_Success(t *testing.T) {
    logger := slog.Default()
    service := NewAnalysisService(logger, WithTimeout(5*time.Second))
    
    req := &AnalysisRequest{
        Input: "test input",
        Type:  "quick",
    }
    
    result, err := service.ProcessRequest(context.Background(), req)
    
    require.NoError(t, err)
    assert.True(t, result.Success)
    assert.NotNil(t, result.Data)
    assert.Greater(t, result.Metrics.ProcessingTimeMs, int64(0))
}

func TestAnalysisService_ProcessRequest_EmptyInput(t *testing.T) {
    logger := slog.Default()
    service := NewAnalysisService(logger)
    
    req := &AnalysisRequest{
        Input: "",
        Type:  "quick",
    }
    
    result, err := service.ProcessRequest(context.Background(), req)
    
    require.Error(t, err)
    assert.Nil(t, result)
    
    var analysisErr *AnalysisError
    require.ErrorAs(t, err, &analysisErr)
    assert.Equal(t, "INVALID_INPUT", analysisErr.Code)
}

func TestAnalysisService_ProcessRequest_Timeout(t *testing.T) {
    logger := slog.Default()
    service := NewAnalysisService(logger, WithTimeout(1*time.Millisecond))
    
    req := &AnalysisRequest{
        Input: "test input",
        Type:  "comprehensive", // This would take longer
    }
    
    result, err := service.ProcessRequest(context.Background(), req)
    
    require.Error(t, err)
    assert.Nil(t, result)
    
    var analysisErr *AnalysisError
    require.ErrorAs(t, err, &analysisErr)
    assert.Equal(t, "TIMEOUT", analysisErr.Code)
}
```

### Enhanced Quality Standards

**Code Quality Requirements:**

- ALL code examples must compile and run without errors
- Include comprehensive error handling with custom error types
- Implement proper logging and observability patterns
- Use dependency injection and testable architectures
- Include both unit and integration test examples
- Follow language-specific best practices and idioms
- Document all public APIs and complex business logic

**Documentation Standards:**

- Provide context and rationale for architectural decisions
- Include setup instructions with version requirements
- Document environment variables and configuration options
- Explain trade-offs between different implementation approaches
- Include troubleshooting guides for common issues
- Reference official documentation and authoritative sources

**Security Considerations:**

- Input validation and sanitization patterns
- Authentication and authorization examples
- Secure configuration management
- Data protection and privacy compliance
- Security testing and vulnerability scanning
- Incident response and monitoring procedures

### Extended Thinking Integration

**For Enterprise Architecture Decisions:**

Think deeply about enterprise-specific requirements:

- Multi-team coordination and knowledge sharing strategies
- Governance models and compliance frameworks
- Risk assessment across technical, operational, and business dimensions
- Performance and scalability requirements under load
- Integration patterns with existing enterprise systems
- Change management and rollback procedures

**For Technology Selection:**

Think harder about technology evaluation criteria:

- Technical debt implications and migration paths
- Team expertise and learning curve considerations
- Ecosystem maturity and long-term viability
- Performance characteristics under different workloads
- Security model and compliance requirements
- Community support and vendor relationship factors

**For Implementation Planning:**

Consider multiple implementation approaches:

- Incremental vs. big-bang deployment strategies
- Feature flags and progressive rollout mechanisms
- A/B testing and experimentation frameworks
- Monitoring and observability from day one
- Disaster recovery and business continuity planning
- Cost optimization and resource management strategies

### Session State Management Schema

**Enhanced State File Structure:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "phase": "initialization|research|analysis|synthesis|validation|complete",
  "technology_stack": {
    "primary": "rust|go|java|typescript|python|multiple",
    "secondary": ["frameworks", "libraries", "tools"],
    "confidence": "high|medium|low"
  },
  "complexity_level": "simple|moderate|enterprise",
  "analysis_domains": [
    "architecture",
    "implementation",
    "testing",
    "devops",
    "security"
  ],
  "research_findings": {
    "architecture": { "confidence": 0.95, "sources": 3, "key_patterns": [] },
    "implementation": { "confidence": 0.90, "sources": 5, "examples": [] },
    "testing": { "confidence": 0.85, "sources": 2, "frameworks": [] }
  },
  "implementation_phases": {
    "total_estimated_weeks": 6,
    "phases": [
      {
        "name": "Foundation Setup",
        "duration_weeks": 2,
        "confidence": "high",
        "dependencies": [],
        "risks": ["low"]
      }
    ]
  },
  "artifacts_created": [
    "/tmp/elaborate-analysis-$SESSION_ID/comprehensive-guide.md",
    "/tmp/elaborate-analysis-$SESSION_ID/implementation-checklist.md"
  ],
  "checkpoints": [
    {
      "phase": "research_complete",
      "timestamp": "ISO_8601_TIMESTAMP",
      "validation": "passed"
    }
  ],
  "quality_metrics": {
    "code_examples_validated": true,
    "documentation_complete": true,
    "implementation_roadmap_realistic": true,
    "security_considerations_included": true
  },
  "sub_agent_coordination": {
    "agents_used": ["architecture", "implementation", "testing", "devops", "risk"],
    "coordination_files": ["/tmp/paths/to/agent/outputs"],
    "synthesis_complete": true,
    "cross_cutting_concerns": []
  }
}
```

**Resumability and Recovery Features:**

- Checkpoint-based recovery from any analysis phase
- Cross-session state sharing for team collaboration
- Incremental artifact updates without full regeneration
- Sub-agent result caching and reuse
- Quality validation checkpoints with automatic retry

### Expected Performance & Outcomes:

**10x Performance Improvement:**

- **Sequential time**: 50-60 seconds for comprehensive technical analysis
- **Parallel time**: 5-8 seconds with 10 sub-agents
- **Speedup**: 10x faster through aggressive parallelization

**Comprehensive Technical Analysis:**

- Complete technology stack evaluation and recommendations
- Working code examples with production-ready patterns
- Multi-phase implementation roadmap with realistic timelines
- Security, performance, and scalability considerations
- Enterprise-grade documentation and standards

**Parallel Architecture Benefits:**

- **Token efficiency**: 50-60% reduction through specialized agent contexts
- **Comprehensive coverage**: All technical domains analyzed simultaneously
- **Consistent quality**: No trade-offs between speed and thoroughness
- **Scalability**: Handles any project complexity with consistent performance

The optimized analysis engine delivers **instant comprehensive technical guidance** through high-performance parallel execution, transforming elaborate analysis from a time-consuming sequential process into a lightning-fast intelligent technical advisory system.