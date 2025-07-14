---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(git:*), Bash(gdate:*), Bash(jq:*), Bash(wc:*), Task, WebFetch
name: "Explain"
description: "Ultra-fast parallel technical explanations using 10 sub-agents for comprehensive multi-angle analysis"
author: "wcygan"
tags: ["docs","analyze"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Explanation target: $ARGUMENTS
- Project structure: !`fd . -t d -d 2 | head -10 || echo "No directories found"`
- Code files: !`fd "\.(rs|go|java|py|js|ts|cpp|c|kt|scala|rb|php|cs|swift)$" . | wc -l | tr -d ' ' || echo "0"`
- Configuration files: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|deno\.json|requirements\.txt)$" . -d 3 | head -5 || echo "No config files"`
- Git repository: !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "Yes" || echo "No"`
- Current branch: !`git branch --show-current 2>/dev/null || echo "N/A"`
- Recent changes: !`git log --oneline -3 2>/dev/null || echo "No git repository"`
- Technology indicators: !`rg "(import|require|use|include|from)" . --type rust --type go --type java --type python --type typescript | head -5 | cut -d: -f3 | sort -u | head -3 || echo "No imports detected"`

## Your Task

**IMMEDIATELY DEPLOY 10 PARALLEL SUB-AGENTS** for instant comprehensive explanation

STEP 1: Initialize comprehensive explanation session

- CREATE session state file: `/tmp/explain-session-$SESSION_ID.json`
- Initialize results directory: `/tmp/explain-results-$SESSION_ID/`

STEP 2: **LAUNCH ALL 10 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL ANALYSIS** - All agents work in parallel:

1. **Code Analysis Agent**: Analyze syntax, structure, and patterns
2. **Architecture Agent**: Examine system design and integration
3. **Algorithm Agent**: Explain computational complexity and logic
4. **Pattern Recognition Agent**: Identify design patterns and idioms
5. **Security Analysis Agent**: Assess vulnerabilities and best practices
6. **Performance Agent**: Analyze efficiency and optimization opportunities
7. **Usage Examples Agent**: Generate practical implementation examples
8. **Testing Strategy Agent**: Create comprehensive test scenarios
9. **Documentation Agent**: Research related concepts and resources
10. **Visual Explanation Agent**: Create diagrams and visual aids

Each agent saves analysis to: `/tmp/explain-results-$SESSION_ID/agent-N.json`

Think deeply about the optimal explanation approach while maximizing parallel execution.

**Expected speedup: 10x faster comprehensive explanation generation**

**Extended Thinking Areas:**

- Technical depth assessment and complexity analysis for adaptive explanations
- Project context integration strategies for maximum relevance
- Learning pathway optimization based on user expertise level
- Multi-modal explanation techniques for different learning styles

- ANALYZE target type from $ARGUMENTS:
  - Code snippet (raw code provided)
  - File path (specific file to explain)
  - Concept (abstract technical topic)
  - Architecture pattern (system design)
  - Algorithm (computational approach)

- ASSESS explanation scope and complexity:
  - Simple: Basic concepts, single functions, straightforward patterns
  - Moderate: Complex algorithms, architectural components, framework usage
  - Enterprise: System architectures, multi-service interactions, advanced patterns

- DETERMINE analysis approach:

IF target is file path AND file exists:

- SET explanation_type = "file_analysis"
- FOCUS on code structure, patterns, dependencies, and usage
- INCLUDE related files and integration points

ELSE IF target contains code syntax:

- SET explanation_type = "code_snippet"
- ANALYZE syntax, patterns, and best practices
- PROVIDE context-aware explanations

ELSE IF target is architectural concept:

- SET explanation_type = "architecture_pattern"
- USE extended thinking for system design implications
- FOCUS on trade-offs, alternatives, and implementation strategies

ELSE:

- SET explanation_type = "technical_concept"
- PROVIDE foundational understanding with practical examples
- CONNECT to project context when applicable

STEP 3: Execute targeted analysis strategy

TRY:

IF explanation_type == "file_analysis":

- READ target file and analyze structure
- SEARCH for related files: dependencies, tests, documentation
- MAP usage patterns across codebase
- IDENTIFY design patterns and architectural decisions
- TRACE data flow and integration points

ELSE IF explanation_type == "code_snippet":

- PARSE syntax and identify language/framework
- ANALYZE algorithmic complexity and patterns
- IDENTIFY best practices and potential improvements
- PROVIDE equivalent implementations in other languages if applicable

ELSE IF explanation_type == "architecture_pattern":

- USE Task tool for comprehensive research if complex:
  1. **Pattern Analysis Agent**: Core pattern explanation and variations
  2. **Implementation Agent**: Technology-specific implementation examples
  3. **Trade-offs Agent**: Advantages, disadvantages, alternatives
  4. **Real-world Agent**: Case studies and practical applications

ELSE IF explanation_type == "technical_concept":

- PROVIDE foundational explanation with clear definitions
- INCLUDE practical examples and use cases
- CONNECT to current project context when relevant
- SUGGEST learning resources and next steps

CATCH (analysis_failed):

- LOG issues to session state
- PROVIDE best-effort explanation with available information
- DOCUMENT limitations and suggest manual research approaches

STEP 4: Generate structured explanation based on complexity level

CASE complexity_level:

WHEN "simple":

- PROVIDE clear, beginner-friendly explanation
- FOCUS on core concepts and basic examples
- INCLUDE step-by-step breakdown
- SUGGEST next learning steps

WHEN "moderate":

- INCLUDE comprehensive analysis with detailed examples
- EXPLAIN design decisions and trade-offs
- PROVIDE implementation patterns and best practices
- COMPARE with alternative approaches

WHEN "enterprise":

- DELIVER deep architectural analysis
- INCLUDE system-wide implications and interactions
- EXPLAIN scalability, performance, and security considerations
- PROVIDE multiple implementation strategies
- DOCUMENT operational and maintenance considerations

STEP 5: Create explanation artifacts and documentation

- GENERATE comprehensive explanation guide: `/tmp/explain-session-$SESSION_ID/explanation.md`
- CREATE code examples: `/tmp/explain-session-$SESSION_ID/examples/`
- SAVE related resources: `/tmp/explain-session-$SESSION_ID/resources.md`
- UPDATE session state with results and recommendations

STEP 6: Provide interactive learning enhancements

- SUGGEST follow-up questions for deeper understanding
- RECOMMEND related concepts to explore
- PROVIDE practical exercises or implementation challenges
- CONNECT to broader learning paths and resources

FINALLY:

- UPDATE session state: phase = "complete"
- CLEAN UP temporary processing files
- PROVIDE summary with key insights and next steps

## Explanation Framework

### Dynamic Analysis Patterns

**Code Analysis Commands (executed dynamically):**

```bash
# Context discovery
rg "TARGET_PATTERN" -B 5 -A 5 --type rust --type go --type typescript
fd "test.*TARGET" --type f -d 3
rg "(import|require|use|include).*TARGET" --type-add 'config:*.{json,toml,yaml,yml}'

# Usage pattern analysis
rg "TARGET\\(" -A 3 -B 2 --stats
fd "*.{rs,go,ts,js,py}" -x rg "TARGET" {} \;

# Dependency mapping
rg "(struct|class|interface|type).*TARGET" -A 10
fd "*.{rs,go,ts,js,py}" -x rg "extends.*TARGET|implements.*TARGET" {} \;
```

**Architecture Analysis Commands:**

```bash
# System structure discovery
fd . -t d -d 3 | head -15
rg "(service|controller|repository|model)" --type rust --type go -o | sort -u

# Integration point analysis
rg "(api|endpoint|route|handler)" --type rust --type go --type typescript -B 2 -A 2
fd "docker-compose|kubernetes|terraform" --type f

# Configuration analysis
fd "(config|env|settings)" --type f -d 2
rg "(database|cache|queue|message)" --type-add 'config:*.{json,toml,yaml,yml}' config:
```

### Adaptive Explanation Structure (Generated Based on Analysis)

#### Executive Summary

- **Primary Function**: Core purpose and responsibility
- **System Context**: Integration within larger architecture
- **Technology Stack**: Languages, frameworks, and dependencies
- **Key Characteristics**: Performance, scalability, maintainability traits

#### Technical Deep Dive

**Code Structure Analysis:**

```[detected_language]
// Annotated code with comprehensive explanations
function example(param1, param2) {          // [1] Function signature and type contracts
    const result = process(param1);         // [2] Data processing and transformation
    return transform(result, param2);       // [3] Output generation and formatting
    // [Additional context based on actual analysis]
}
```

**Detailed Line Analysis:**

1. **Function Signature**: Parameter types, return contracts, and API design
2. **Processing Logic**: Algorithm implementation, data flow, and computational complexity
3. **Output Handling**: Result formatting, error management, and side effects
4. **Integration Points**: External dependencies, service calls, and data persistence

**Pattern Recognition:**

- **Design Pattern**: [Identified pattern with explanation]
- **Architectural Style**: [Layered, hexagonal, microservices, etc.]
- **Language Idioms**: [Language-specific best practices demonstrated]
- **Performance Characteristics**: [Time/space complexity, optimization opportunities]

#### Operational Flow Analysis

1. **Input Processing Pipeline**
   - **Data Sources**: External APIs, databases, file systems, user input
   - **Validation Layers**: Schema validation, business rules, security checks
   - **Preprocessing**: Data normalization, enrichment, transformation
   - **Error Handling**: Input validation failures, malformed data recovery

2. **Core Computational Logic**
   - **Algorithm Implementation**: Step-by-step breakdown with complexity analysis
   - **Data Structures**: Chosen structures and their performance implications
   - **Business Logic**: Domain-specific rules and decision trees
   - **Optimization Strategies**: Caching, lazy loading, parallel processing
   - **Edge Case Management**: Boundary conditions, null handling, overflow protection

3. **Output Generation and Integration**
   - **Result Formatting**: Data serialization, response structure, content types
   - **Success Scenarios**: Normal operation flow and expected outcomes
   - **Error Scenarios**: Exception handling, graceful degradation, user feedback
   - **Side Effects**: Database updates, external service calls, logging, metrics
   - **Performance Monitoring**: Timing, memory usage, throughput measurements

#### Conceptual Analogies and Mental Models

**Primary Analogy**: [Context-specific analogy based on complexity]

For simple concepts:

- "Think of it like a [familiar real-world process] where..."
- Visual metaphors that map directly to code behavior
- Step-by-step comparisons with everyday activities

For complex systems:

- **Manufacturing Pipeline**: Input → Processing → Quality Control → Output
- **City Infrastructure**: Traffic flow, utility networks, service coordination
- **Biological Systems**: Cellular processes, organ coordination, feedback loops
- **Business Organizations**: Departments, workflows, communication protocols

**Mental Model Construction**:

- How the system "thinks" about data
- Decision-making processes and logic flows
- State transitions and lifecycle management
- Communication patterns and information flow

#### Pattern Analysis and Best Practices

**Design Patterns Identified**:

- **Structural Patterns**: [e.g., Adapter, Facade, Decorator]
- **Behavioral Patterns**: [e.g., Strategy, Observer, Command]
- **Creational Patterns**: [e.g., Factory, Builder, Singleton]
- **Architecture Patterns**: [e.g., MVC, Hexagonal, Event-Driven]

**Language-Specific Idioms**:

- **Rust**: Ownership patterns, error handling with Result<T,E>, async/await usage
- **Go**: Interface composition, goroutine patterns, context propagation
- **TypeScript**: Type guards, utility types, module organization
- **Java**: Stream API usage, dependency injection, annotation patterns

**Industry Best Practices Demonstrated**:

- **Security**: Input sanitization, authentication, authorization patterns
- **Performance**: Caching strategies, database optimization, algorithm efficiency
- **Maintainability**: Code organization, testing patterns, documentation approaches
- **Scalability**: Load balancing, distributed systems, microservices patterns
- **Observability**: Logging, metrics, tracing, health checks

**Anti-Patterns to Avoid**:

- Common mistakes and their solutions
- Performance pitfalls and optimization strategies
- Security vulnerabilities and mitigation approaches

#### Comprehensive Usage Examples

**Basic Implementation Pattern**:

```[detected_language]
// Fundamental usage with proper error handling
const result = await example("input", { option: true });
if (result.success) {
    console.log("Success:", result.data);
} else {
    console.error("Error:", result.error);
}
```

**Production-Ready Implementation**:

```[detected_language]
// Enterprise-grade usage with comprehensive error handling
interface ExampleConfig {
    timeout: number;
    retryCount: number;
    validateInput: boolean;
}

const config: ExampleConfig = {
    timeout: 5000,
    retryCount: 3,
    validateInput: true
};

try {
    const result = await withRetry(() => example(data, config), config.retryCount);
    
    // Success handling with metrics
    metrics.increment('example.success');
    logger.info('Operation completed', { duration: result.duration });
    
    return result.data;
} catch (error) {
    // Comprehensive error handling
    metrics.increment('example.error', { error_type: error.name });
    logger.error('Operation failed', { error: error.message, data });
    
    // Graceful degradation or user-friendly error
    throw new UserFacingError('Unable to process request', error);
}
```

**Testing Patterns**:

```[detected_language]
// Unit test example with proper mocking
describe('example function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should handle successful processing', async () => {
        const mockData = { input: 'test' };
        const expectedResult = { success: true, data: 'processed' };
        
        mockProcessor.process.mockResolvedValue(expectedResult);
        
        const result = await example(mockData.input, {});
        
        expect(result).toEqual(expectedResult);
        expect(mockProcessor.process).toHaveBeenCalledWith(mockData.input);
    });
    
    it('should handle error scenarios gracefully', async () => {
        const invalidInput = null;
        
        await expect(example(invalidInput, {})).rejects.toThrow('Invalid input');
    });
});
```

**Integration Examples**:

```[detected_language]
// Integration with larger system components
class ExampleService {
    constructor(
        private readonly example: ExampleFunction,
        private readonly logger: Logger,
        private readonly metrics: MetricsCollector
    ) {}
    
    async processRequest(request: ProcessRequest): Promise<ProcessResponse> {
        const timer = this.metrics.startTimer('example.duration');
        
        try {
            this.logger.debug('Processing request', { requestId: request.id });
            
            const result = await this.example(request.data, request.config);
            
            timer.end({ status: 'success' });
            return { success: true, data: result };
            
        } catch (error) {
            timer.end({ status: 'error' });
            this.logger.error('Request processing failed', { 
                requestId: request.id, 
                error: error.message 
            });
            
            return { success: false, error: error.message };
        }
    }
}
```

#### Related Concepts and Learning Pathways

**Similar Functionality and Patterns**:

- **Comparable Libraries**: [Alternative implementations in same language]
- **Cross-Language Equivalents**: [How similar patterns work in other languages]
- **Framework-Specific Variants**: [React vs Vue, Spring vs Quarkus, etc.]
- **Industry Standards**: [RFC specifications, W3C standards, IETF protocols]

**Alternative Implementation Approaches**:

- **Performance-Oriented**: High-throughput, low-latency implementations
- **Simplicity-Focused**: Minimal complexity, easy maintenance approaches
- **Scalability-First**: Distributed, cloud-native architectures
- **Security-Hardened**: Zero-trust, defense-in-depth implementations

**Evolution and Historical Context**:

- **Legacy Patterns**: How older approaches solved similar problems
- **Modern Improvements**: What current solutions do better
- **Future Directions**: Emerging patterns and technologies
- **Industry Migration Paths**: How organizations transition between approaches

**Learning Dependencies and Prerequisites**:

- **Foundation Concepts**: Required background knowledge
- **Prerequisite Patterns**: Simpler patterns to master first
- **Advanced Extensions**: More complex patterns that build on this
- **Complementary Skills**: Related technologies and techniques

**Ecosystem Integration**:

- **Tool Chain Compatibility**: IDEs, build systems, deployment tools
- **Monitoring and Observability**: How to instrument and monitor
- **Testing Strategies**: Unit, integration, and end-to-end testing approaches
- **Documentation Standards**: How to document and share knowledge

#### Critical Considerations and Expert Tips

**Common Pitfalls and Solutions**:

- **Memory Leaks**: [Language-specific memory management issues]
- **Concurrency Problems**: Race conditions, deadlocks, data corruption
- **Error Propagation**: Silent failures, exception swallowing, inadequate logging
- **Configuration Issues**: Environment-specific problems, secret management
- **Performance Bottlenecks**: N+1 queries, blocking operations, inefficient algorithms

**Security Implications and Mitigations**:

- **Input Validation**: SQL injection, XSS, command injection prevention
- **Authentication/Authorization**: Proper session management, role-based access
- **Data Protection**: Encryption at rest and in transit, PII handling
- **Dependency Security**: Supply chain attacks, vulnerable package management
- **Infrastructure Security**: Container security, network policies, secrets management

**Performance Optimization Strategies**:

- **Algorithmic Improvements**: Better data structures, algorithm selection
- **Caching Strategies**: Application-level, database, CDN caching
- **Database Optimization**: Query optimization, indexing, connection pooling
- **Concurrency Patterns**: Async programming, thread pools, reactive streams
- **Resource Management**: Memory usage, CPU utilization, I/O optimization

**Testing and Validation Approaches**:

- **Unit Testing**: Isolated testing with proper mocking and coverage
- **Integration Testing**: Component interaction testing with real dependencies
- **Performance Testing**: Load testing, stress testing, capacity planning
- **Security Testing**: Penetration testing, vulnerability scanning, code analysis
- **Chaos Engineering**: Fault injection, resilience testing, disaster recovery

**Production Readiness Checklist**:

- **Observability**: Comprehensive logging, metrics, distributed tracing
- **Health Checks**: Application health, dependency health, readiness probes
- **Configuration Management**: Environment-specific configs, feature flags
- **Deployment Strategies**: Blue-green, canary, rolling deployments
- **Disaster Recovery**: Backup strategies, failover procedures, RTO/RPO planning

**Debugging and Troubleshooting**:

- **Common Error Patterns**: How to recognize and resolve typical issues
- **Diagnostic Tools**: Profilers, debuggers, log analysis tools
- **Performance Profiling**: CPU profiling, memory analysis, I/O monitoring
- **Distributed System Debugging**: Correlation IDs, distributed tracing, log aggregation
- **Production Debugging**: Safe debugging practices, minimal impact techniques

### Dynamic Visualization Generation

**Data Flow Diagrams (Generated Based on Analysis)**:

```
┌─────────────────┐   ┌───────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  Input Layer    │──▶│ Validation    │──▶│ Processing Core │──▶│ Output Layer    │
│                 │   │ & Sanitization│   │ & Transformation│   │ & Serialization │
└─────────────────┘   └───────────────┘   └─────────────────┘   └─────────────────┘
         │                      │                      │                      │
         ▼                      ▼                      ▼                      ▼
    HTTP Request           Schema Check          Business Logic         JSON Response
    File Upload            Type Validation       Data Processing       Database Update
    API Call               Security Check       Algorithm Execution    Event Publishing
```

**System Architecture Diagrams**:

```
              ┌─────────────────────────────────────┐
              │        Load Balancer                │
              └─────────────┬───────────────────────┘
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Service A  │      │  Service B  │      │  Service C  │
│ (REST API)  │      │ (GraphQL)   │      │ (gRPC)      │
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │                    │
       └────────────────────┼────────────────────┘
                            ▼
                   ┌─────────────────┐
                   │   Database      │
                   │   (PostgreSQL)  │
                   └─────────────────┘
```

**State Machine Diagrams**:

```
┌─────────┐    event1     ┌─────────┐    event2     ┌─────────┐
│ Initial │─────────────▶ │ Active  │─────────────▶ │ Complete│
│ State   │               │ State   │               │ State   │
└─────────┘               └─────────┘               └─────────┘
     │                         │                         │
     │ error                   │ error                   │
     ▼                         ▼                         │
┌─────────┐◀──────────────────────────────────────────────┘
│ Error   │
│ State   │
└─────────┘
```

**Sequence Diagrams for Complex Interactions**:

```
Client          API Gateway     Service A      Database      External API
  │                  │              │              │              │
  │ ──── Request ───▶│              │              │              │
  │                  │──── Auth ───▶│              │              │
  │                  │              │── Query ───▶│              │
  │                  │              │◀── Result ──│              │
  │                  │              │──── Call ──────────────────▶│
  │                  │              │◀─── Response ───────────────│
  │                  │◀── Data ────│              │              │
  │◀─── Response ────│              │              │              │
```

### Curated Learning Resources and Next Steps

**Official Documentation and Standards**:

- **Language References**: [Rust Book, Go Tour, TypeScript Handbook]
- **Framework Documentation**: [Official API docs, architectural guides]
- **RFC Specifications**: [Internet standards, protocol definitions]
- **Industry Standards**: [OpenAPI, JSON Schema, OAuth 2.0]

**Progressive Learning Path**:

1. **Foundation Level**:
   - Interactive tutorials and hands-on exercises
   - Basic implementation patterns and examples
   - Core concepts with visual explanations
   - Simple project templates and starter code

2. **Intermediate Level**:
   - Best practices and design patterns
   - Performance optimization techniques
   - Testing strategies and quality assurance
   - Integration patterns and API design

3. **Advanced Level**:
   - System architecture and scalability
   - Security hardening and compliance
   - Distributed systems and microservices
   - DevOps and production deployment

**Practical Exercises and Projects**:

- **Coding Challenges**: Algorithm implementations, data structure usage
- **Mini Projects**: Complete implementations with realistic requirements
- **Code Reviews**: Analysis of production code with improvement suggestions
- **Architecture Exercises**: System design problems and solution analysis

**Community Resources and Support**:

- **Forums and Discussion Platforms**: Stack Overflow, Reddit, Discord communities
- **Open Source Projects**: Contributing opportunities, code reading recommendations
- **Conferences and Meetups**: Industry events, local user groups
- **Professional Networks**: LinkedIn groups, professional associations

**Continuous Learning Strategies**:

- **Technology Radar**: Staying current with emerging technologies
- **Code Reading**: Regular analysis of high-quality open source projects
- **Experimentation**: Personal projects and proof-of-concept implementations
- **Knowledge Sharing**: Teaching others, writing blog posts, giving presentations

## Advanced Example Scenarios

### Example 1: Complex Language Feature (Rust Lifetimes)

**Command**: `/explain 'fn longest<'a>(x: &'a str, y: &'a str) -> &'a str'`

**Expected Analysis**:

- Lifetime annotation syntax and semantics
- Borrow checker behavior and memory safety
- Function signature contracts and caller obligations
- Alternative implementations and trade-offs
- Common pitfalls and debugging strategies

### Example 2: System Architecture Pattern

**Command**: `/explain event-driven architecture in our microservices`

**Expected Analysis**:

- Event sourcing vs. event streaming patterns
- Message broker selection and configuration
- Service decoupling and bounded contexts
- Consistency models and transaction patterns
- Monitoring, debugging, and operational concerns

### Example 3: Algorithm Implementation

**Command**: `/explain the rate limiting implementation in src/middleware/throttle.rs`

**Expected Analysis**:

- Rate limiting algorithms (token bucket, sliding window)
- Concurrency safety and performance characteristics
- Configuration options and tuning parameters
- Error handling and fallback strategies
- Integration with monitoring and alerting systems

### Example 4: Database Design Pattern

**Command**: `/explain the repository pattern in our data access layer`

**Expected Analysis**:

- Abstraction layer benefits and trade-offs
- Testing strategies with mocked repositories
- Transaction management and unit of work patterns
- Query optimization and performance considerations
- Migration strategies and schema evolution

### Example 5: Security Implementation

**Command**: `/explain JWT authentication flow in auth/middleware.go`

**Expected Analysis**:

- Token lifecycle and security properties
- Cryptographic signature verification
- Authorization vs. authentication concerns
- Attack vectors and mitigation strategies
- Performance implications and caching strategies

## Expert Guidelines and Best Practices

### Explanation Philosophy

1. **Context-First Approach**:
   - Begin with business value and user impact
   - Explain the problem being solved before the solution
   - Connect to broader system architecture and business goals
   - Provide historical context and evolution of approaches

2. **Progressive Disclosure Strategy**:
   - **Layer 1**: High-level overview and core concepts
   - **Layer 2**: Implementation details and technical specifics
   - **Layer 3**: Edge cases, optimizations, and advanced patterns
   - **Layer 4**: Production considerations and operational aspects

3. **Multi-Modal Learning Support**:
   - **Visual Learners**: Diagrams, flowcharts, and visual metaphors
   - **Auditory Learners**: Verbal explanations and analogies
   - **Kinesthetic Learners**: Hands-on examples and interactive exploration
   - **Reading/Writing Learners**: Comprehensive documentation and written exercises

### Technical Communication Standards

1. **Accuracy and Precision**:
   - Verify all technical claims with authoritative sources
   - Use precise terminology and avoid ambiguous language
   - Distinguish between facts, opinions, and recommendations
   - Acknowledge limitations and areas of uncertainty

2. **Audience Adaptation**:
   - Adjust complexity based on detected project sophistication
   - Provide multiple explanation depths for different experience levels
   - Include prerequisite knowledge checks and learning path guidance
   - Offer both theoretical understanding and practical implementation

3. **Completeness and Depth**:
   - Cover normal operation, edge cases, and failure scenarios
   - Explain not just "what" and "how" but also "why" and "when"
   - Include performance characteristics, security implications, and maintenance considerations
   - Address common misconceptions and anti-patterns

### Quality Assurance Checklist

- [ ] **Accuracy**: All technical information verified and current
- [ ] **Completeness**: Core concepts, implementation, and operational aspects covered
- [ ] **Clarity**: Complex concepts broken down into understandable components
- [ ] **Relevance**: Examples and analogies appropriate to audience and context
- [ ] **Actionability**: Clear next steps and practical application guidance
- [ ] **Accessibility**: Multiple learning styles and experience levels supported
- [ ] **Currency**: Information reflects current best practices and standards
- [ ] **Context**: Proper integration with existing project and technology stack

### Advanced Explanation Techniques

1. **Comparative Analysis**:
   - Side-by-side comparisons with alternative approaches
   - Trade-off matrices with quantitative and qualitative factors
   - Migration paths between different implementation strategies
   - Cost-benefit analysis for different solution options

2. **Interactive Exploration**:
   - Step-by-step debugging and analysis procedures
   - "What if" scenarios and their implications
   - Performance tuning exercises and optimization opportunities
   - Security analysis and threat modeling walkthroughs

3. **Real-World Integration**:
   - Production deployment considerations and operational requirements
   - Monitoring, alerting, and troubleshooting strategies
   - Team collaboration and knowledge sharing approaches
   - Maintenance, evolution, and technical debt management

### State Management for Complex Explanations

**Session State Schema**:

```json
{
  "sessionId": "$SESSION_ID",
  "target": "$ARGUMENTS",
  "explanation_type": "file_analysis|code_snippet|architecture_pattern|technical_concept",
  "complexity_level": "simple|moderate|enterprise",
  "analysis_domains": ["syntax", "patterns", "performance", "security", "architecture"],
  "project_context": {
    "technology_stack": ["rust", "go", "typescript"],
    "architectural_patterns": ["microservices", "event-driven"],
    "maturity_level": "startup|enterprise|legacy"
  },
  "explanation_artifacts": {
    "main_guide": "/tmp/explain-session-$SESSION_ID/explanation.md",
    "code_examples": "/tmp/explain-session-$SESSION_ID/examples/",
    "diagrams": "/tmp/explain-session-$SESSION_ID/diagrams/",
    "resources": "/tmp/explain-session-$SESSION_ID/resources.md"
  },
  "learning_path": {
    "prerequisites": ["basic programming", "http fundamentals"],
    "next_steps": ["advanced patterns", "performance optimization"],
    "related_concepts": ["dependency injection", "event sourcing"]
  },
  "quality_metrics": {
    "explanation_depth": "basic|comprehensive|expert",
    "code_examples_count": 3,
    "visual_aids_count": 2,
    "resource_links_count": 5
  }
}
```