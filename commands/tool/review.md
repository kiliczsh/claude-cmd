---
allowed-tools: Read, Grep, Task, Bash(rg:*), Bash(fd:*), Bash(git:*), Bash(deno:*), Bash(cargo:*), Bash(go:*), Bash(npm:*)
name: "Review"
description: "Comprehensive code review with context-aware analysis and architectural insights"
author: "wcygan"
tags: ["tool"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /review

## Context

- Session ID: !`gdate +%s%N || date +%s%N`
- Project type: !`fd -t f 'package.json|deno.json|Cargo.toml|go.mod|pom.xml' -d 1 | head -1 | xargs basename || echo 'unknown'`
- Git status: !`git status --porcelain | head -10 || echo 'Not a git repository'`
- Recent changes: !`git log --oneline -5 --since='1 week ago' || echo 'No recent commits'`
- Current branch: !`git branch --show-current || echo 'No current branch'`
- Build status: !`test -f deno.json && deno check . 2>&1 | tail -3 || test -f Cargo.toml && cargo check --quiet 2>&1 | tail -3 || test -f package.json && npm run build --silent 2>&1 | tail -3 || echo 'No build system detected'`
- Test status: !`test -f deno.json && deno test --quiet 2>&1 | tail -1 || test -f Cargo.toml && cargo test --quiet 2>&1 | tail -1 || test -f package.json && npm test 2>&1 | tail -1 || echo 'No test runner detected'`
- File count: !`fd -t f . | wc -l || find . -type f | wc -l`
- Code files: !`fd -e ts -e js -e rs -e go -e java -e py | wc -l || find . -name '*.ts' -o -name '*.js' -o -name '*.rs' -o -name '*.go' -o -name '*.java' -o -name '*.py' | wc -l`

## Your task

STEP 1: Initialize review session

- Load target files from $ARGUMENTS or analyze entire project if no specific targets
- Create session state file: /tmp/review-state-$SESSION_ID.json
- IF analyzing large codebase (>50 files):

**CRITICAL: Deploy parallel sub-agents for maximum performance (10x faster comprehensive review)**

IMMEDIATELY launch 8 specialized parallel review agents:

- **Agent 1: Architecture & Design Patterns**: Analyze system architecture, design patterns, and structural integrity
  - Focus: Component relationships, abstraction layers, separation of concerns, architectural violations
  - Tools: Dependency analysis, pattern recognition, architectural metrics
  - Expected: Architectural assessment with improvement recommendations

- **Agent 2: Security Vulnerability Assessment**: Comprehensive security analysis across all attack vectors
  - Focus: Input validation, authentication, authorization, data exposure, injection vulnerabilities
  - Tools: Security pattern analysis, vulnerability scanning, OWASP compliance
  - Expected: Security risk assessment with prioritized remediation plan

- **Agent 3: Performance & Optimization Review**: Identify performance bottlenecks and optimization opportunities
  - Focus: Algorithm efficiency, database queries, memory usage, caching strategies
  - Tools: Complexity analysis, profiling patterns, resource utilization assessment
  - Expected: Performance optimization roadmap with impact estimates

- **Agent 4: Testing Coverage & Quality Analysis**: Evaluate test completeness, quality, and maintainability
  - Focus: Test coverage gaps, test quality metrics, testing strategies, mock usage
  - Tools: Coverage analysis, test pattern evaluation, assertion quality assessment
  - Expected: Testing improvement plan with coverage targets

- **Agent 5: Dependencies & Technical Debt Evaluation**: Assess dependency health and technical debt accumulation
  - Focus: Dependency vulnerabilities, version currency, license compliance, debt patterns
  - Tools: Dependency analysis, debt quantification, update impact assessment
  - Expected: Dependency management strategy with debt reduction plan

- **Agent 6: Code Quality & Maintainability**: Analyze code quality metrics and maintainability factors
  - Focus: Code complexity, duplication, readability, documentation completeness
  - Tools: Quality metrics calculation, complexity analysis, documentation assessment
  - Expected: Code quality improvement recommendations with refactoring priorities

- **Agent 7: API & Interface Design**: Review API design, interface consistency, and integration patterns
  - Focus: API contracts, versioning, backwards compatibility, interface design principles
  - Tools: API analysis, contract validation, integration pattern assessment
  - Expected: API design recommendations with versioning strategy

- **Agent 8: Configuration & DevOps Review**: Analyze build, deployment, and operational configurations
  - Focus: Build scripts, CI/CD pipelines, environment configurations, operational readiness
  - Tools: Configuration analysis, pipeline assessment, operational pattern review
  - Expected: DevOps optimization recommendations with deployment improvements

**Sub-Agent Coordination:**

- Each agent saves findings to `/tmp/review-agents-$SESSION_ID/`
- Parallel execution provides 10x speed improvement over sequential review
- Cross-agent correlation identifies systemic issues across multiple domains
- Results synthesized into comprehensive review report with actionable priorities

- ELSE:
  - Proceed with focused single-agent comprehensive analysis

STEP 2: Context gathering

- Load project configuration files automatically:
  - @package.json @deno.json @Cargo.toml @go.mod @pom.xml
  - @tsconfig.json @*.d.ts
  - @README.md @CLAUDE.md @CHANGELOG.md
  - @docker-compose.yml @.env.example
- Discover test files: @**/_.test._ @**/_.spec._
- Identify configuration and infrastructure files
- Map project structure and dependencies

STEP 3: Multi-dimensional analysis

FOR EACH target file or component:

**Architecture Analysis:**

- Design patterns and architectural decisions
- Separation of concerns and modularity
- Code organization and structure
- Interface design and abstractions

**Security Assessment:**

- Input validation and sanitization
- Authentication and authorization
- Data handling and storage
- Potential vulnerabilities and attack vectors

**Performance Evaluation:**

- Algorithm efficiency and complexity
- Database query optimization
- Caching strategies and memory usage
- Resource utilization patterns

**Maintainability Review:**

- Code clarity and readability
- Documentation completeness
- Testing coverage and quality
- Error handling and logging

**Dependencies Analysis:**

- Security vulnerabilities in dependencies
- License compatibility
- Version currency and update needs
- Dependency tree complexity

STEP 4: Think deeply about findings

- Use extended thinking for complex architectural decisions
- Consider long-term implications of current patterns
- Evaluate tradeoffs between different approaches
- Identify systemic issues and root causes

STEP 5: Generate structured review report

#### Strengths

- Architectural decisions that work well
- Implementation patterns worth preserving
- Security measures that are effective
- Performance optimizations in place

#### Critical Issues

- Security vulnerabilities requiring immediate attention
- Performance bottlenecks with significant impact
- Architectural problems affecting scalability
- Broken or insufficient error handling

#### Improvement Recommendations

1. **High Priority (Address Immediately)**:
   - Security fixes and vulnerability patches
   - Critical performance issues
   - Data integrity and consistency problems

2. **Medium Priority (Next Sprint/Iteration)**:
   - Performance optimizations
   - Maintainability improvements
   - Testing coverage gaps

3. **Low Priority (Future Enhancements)**:
   - Code style and formatting
   - Documentation improvements
   - Refactoring opportunities

#### Technical Debt Assessment

- **Immediate Debt**: Issues blocking releases or causing instability
- **Short-term Debt**: Problems affecting development velocity
- **Long-term Debt**: Strategic refactoring and modernization needs

STEP 6: Update session state and cleanup

- Mark review as completed in state file
- Generate summary metrics (files reviewed, issues found, recommendations count)
- Archive session data for future reference
- Clean up temporary files

STEP 7: Extended thinking integration

IF complex architectural analysis is needed:

- Think deeply about system design implications
- Consider alternative architectural approaches
- Evaluate long-term maintainability tradeoffs
- Assess scalability and performance characteristics

## Advanced Features

### Large Codebase Sub-Agent Pattern

FOR codebases with 100+ files:

- **Discovery Agent**: Map project structure and identify key components
- **Security Agent**: Deep security analysis across all attack surfaces
- **Performance Agent**: Profiling and optimization recommendations
- **Architecture Agent**: Design pattern analysis and structural assessment
- **Quality Agent**: Testing, documentation, and maintainability review

### Integration Points

- Link findings to specific file locations and line numbers
- Cross-reference issues with git blame for context
- Connect recommendations to relevant documentation
- Suggest specific tools and techniques for improvements

Keep analysis precise, actionable, and prioritized by impact.