---
allowed-tools: Read, Write, Task, Bash(mkdir:*), Bash(fd:*), Bash(ls:*), Bash(git:*), Bash(gdate:*), Bash(jq:*), Bash(rg:*)
name: "Generate Command"
description: "Intelligent slash command generator with parallel analysis and gold standard best practices"
author: "wcygan"
tags: ["meta","command"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Existing .claude directory: !`ls -la .claude 2>/dev/null || echo "No .claude directory found"`
- Current command structure: !`fd "\.md$" .claude/commands 2>/dev/null | head -5 || echo "No existing commands"`
- Git status: !`git status --porcelain 2>/dev/null | head -3 || echo "Not a git repository"`
- Project type indicators: !`fd "(package\.json|deno\.json|Cargo\.toml|go\.mod|pom\.xml)" . -d 2 | head -3`

## Your Task

**CRITICAL: Generate slash commands following the "Program not Conversation" paradigm with parallel analysis for maximum efficiency and gold standard best practices.**

STEP 1: Initialize command generation session with parallel project analysis

- CREATE session state file: `/tmp/generate-command-state-$SESSION_ID.json`
- SET initial state following programming paradigm:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "projectType": "auto-detect",
    "commandComplexity": "unknown",
    "userRequirements": {},
    "generatedCommand": null,
    "validationPassed": false,
    "committed": false
  }
  ```

**FOR complex projects OR extensive existing command structures:**

**CRITICAL: Deploy parallel sub-agents for comprehensive project analysis (5-7x faster discovery)**

IMMEDIATELY launch 5 specialized project analysis agents:

- **Agent 1: Project Architecture Analyzer**: Detect technology stack, build systems, and architectural patterns
  - Focus: package.json, deno.json, Cargo.toml, go.mod, pom.xml, tech stack identification
  - Tools: File pattern analysis, dependency analysis, build system detection
  - Output: Project type classification with recommended command categories

- **Agent 2: Existing Command Pattern Analyzer**: Analyze existing .claude/commands structure and patterns
  - Focus: Command organization, naming conventions, complexity patterns, best practices usage
  - Tools: Command file analysis, pattern recognition, structure mapping
  - Output: Command ecosystem analysis with improvement opportunities

- **Agent 3: Workflow Discovery Agent**: Identify common project workflows and pain points
  - Focus: Git patterns, CI/CD usage, testing strategies, deployment workflows
  - Tools: Git history analysis, configuration analysis, workflow pattern detection
  - Output: Workflow automation opportunities with priority ranking

- **Agent 4: Tool Ecosystem Analyzer**: Map available tools and integration opportunities
  - Focus: Available CLI tools, external APIs, existing automation, tool compatibility
  - Tools: Tool availability checking, integration analysis, permission mapping
  - Output: Tool integration strategy with security considerations

- **Agent 5: Best Practices Validator**: Ensure adherence to gold standard patterns
  - Focus: Session management, security patterns, error handling, state management
  - Tools: Best practices checking, security validation, pattern compliance
  - Output: Compliance assessment with specific improvement recommendations

**Sub-Agent Coordination:**

- Each agent saves findings to `/tmp/command-generation-agents-$SESSION_ID/`
- Parallel execution provides 5-7x speed improvement over sequential analysis
- Cross-agent correlation identifies optimal command design patterns
- Results synthesized for intelligent command specification guidance

STEP 2: Intelligent command specification with programming paradigm guidance

TRY:

**PROCEDURE gather_command_requirements():**

USING parallel analysis results, PROVIDE intelligent project-based suggestions:

**Programming Paradigm Questions (Think "Program not Conversation"):**

1. **Command Purpose & Deterministic Behavior**: What specific, repeatable task should this command automate?

   Examples by project type (from parallel analysis):
   - **Deno projects**: "test-coverage-report", "benchmark-performance", "security-audit"
   - **Rust projects**: "cargo-vulnerability-scan", "performance-profile", "cross-compile"
   - **Go projects**: "generate-mocks", "integration-test-parallel", "memory-profile"
   - **Multi-language**: "dependency-sync", "security-scan-all", "docs-generate"

2. **Command Name & Namespacing**: What should the slash command be called?
   - **Must be kebab-case**: e.g., "security-audit", "test-parallel"
   - **Namespace consideration**: git/, analyze/, ops/, code/, meta/
   - **Accessibility**: `/namespace:command-name` or `/command-name`

3. **Input Pattern & State Management**:
   - **No input**: Deterministic execution based on project state
   - **Single argument**: Use `$ARGUMENTS` token with validation
   - **Structured input**: Design state-based input collection
   - **Session state**: `/tmp/command-state-$SESSION_ID.json` pattern

4. **Execution Model (CRITICAL for performance)**:
   - **Simple Sequential**: Linear steps, no parallelism needed
   - **Parallel Sub-Agent**: Benefits from Task tool delegation (5-10x faster)
   - **Interactive Checkpoint**: User approval points with state preservation
   - **Resumable Workflow**: Long-running with checkpoint/resume capability

5. **Programming Constructs Needed**:
   - **Control Flow**: IF/ELSE, FOR EACH, WHILE loops
   - **Error Handling**: TRY/CATCH/FINALLY blocks
   - **State Machines**: Phase transitions with validation
   - **Unique Sessions**: Nanosecond timestamps for isolation

6. **Security & Tool Permissions** (Minimal Principle):
   - **File operations**: Read, Write, Edit, MultiEdit (specify necessity)
   - **Shell commands**: Bash with scoped restrictions (e.g., Bash(git:*))
   - **External APIs**: WebFetch, WebSearch (justify need)
   - **Sub-processes**: Task (for parallel execution)
   - **Dynamic context**: !`command` vs @file (security implications)

7. **Extended Thinking Integration**:
   - **Simple decisions**: No extended thinking needed
   - **Architectural analysis**: Include "think hard" prompts
   - **Complex trade-offs**: Use "think harder" or "ultrathink"
   - **Multi-perspective**: Combine with parallel sub-agents

CASE user_input_complexity:

WHEN "needs_guidance":

- PROVIDE examples from gold standard (/commit command)
- SHOW parallel sub-agent patterns from recent improvements
- DEMONSTRATE programming constructs usage

WHEN "advanced_user":

- FOCUS on security validation and performance optimization
- DISCUSS sub-agent delegation strategies
- REVIEW error handling and resumability patterns

CATCH (user_input_incomplete):

- SERIALIZE partial input to session state with nanosecond precision
- PROVIDE contextual examples based on parallel project analysis
- CONTINUE requirements gathering with intelligent defaults

STEP 3: Generate command file using programming paradigm with gold standard validation

**PROCEDURE generate_command_with_best_practices():**

CASE execution_model:

WHEN "simple_sequential":

**Generate deterministic command with minimal state:**

```yaml
---
allowed-tools: [minimal_required_tools]
description: [deterministic_task_description]
---

## Context

- Session ID: !`gdate +%s%N`
[tested_dynamic_context_commands_with_fallbacks]

## Your task

STEP 1: [specific_deterministic_action]

TRY:
- [action_with_validation]
- [verification_step]

CATCH ([specific_error_type]):
- [error_handling_with_recovery]

FINALLY:
- [cleanup_and_state_update]
```

WHEN "parallel_sub_agent":

**Generate high-performance parallel execution command:**

```yaml
---
allowed-tools: Task, [minimal_other_tools]
description: [parallel_task_description] with 5-10x faster execution
---

## Context

- Session ID: !`gdate +%s%N`
[comprehensive_context_for_parallel_analysis]

## Your task

**CRITICAL: Deploy parallel sub-agents for maximum performance (5-10x faster [task_type])**

IMMEDIATELY launch [N] specialized [domain] agents:

- **Agent 1**: [specific_focus_area]
  - Focus: [detailed_scope]
  - Tools: [agent_specific_tools]
  - Output: [expected_deliverable]

[Additional agents...]

**Sub-Agent Coordination:**
- Each agent saves findings to `/tmp/[task]-agents-$SESSION_ID/`
- Parallel execution provides [X]x speed improvement
- Results synthesized into [final_output]
```

WHEN "interactive_checkpoint":

**Generate command with user confirmation and resumability:**

```yaml
---
allowed-tools: [scoped_tools], Bash(gdate:*)
description: [interactive_task] with checkpoint/resume capability
---

## Context

- Session ID: !`gdate +%s%N`
[state_aware_context]

## Your task

STEP 1: Initialize session state
- CREATE: `/tmp/[command]-state-$SESSION_ID.json`
- SET initial phase and checkpoints

STEP 2: [analysis_phase]
- [safe_readonly_operations]
- SAVE checkpoint: analysis_complete

STEP 3: User confirmation checkpoint
- PRESENT findings for approval
- AWAIT user confirmation
- SAVE checkpoint: approved

STEP 4: [implementation_phase]
- [safe_implementation_with_rollback]
- SAVE checkpoint: implemented

FINALLY:
- [cleanup_and_summary]
```

WHEN "resumable_workflow":

**Generate complex workflow with full state management:**

````yaml
---
allowed-tools: [comprehensive_tools], Bash(gdate:*), Bash(jq:*)
description: [complex_workflow] with full state management and resumability
---

## Context

- Session ID: !`gdate +%s%N`
[comprehensive_context_with_state_tracking]

## Your task

PROCEDURE [workflow_name]():

STEP 1: Session initialization and state management
- LOAD existing state OR initialize new session
- VALIDATE prerequisites and permissions
- SET workflow phase and progress tracking

[Additional steps with state management patterns...]

```json
// Session state schema
{
  "sessionId": "$SESSION_ID",
  "phase": "discovery|analysis|implementation|validation|complete",
  "checkpoints": {
    "discovery_complete": false,
    "analysis_complete": false,
    "implementation_complete": false
  },
  "rollbackProcedures": [],
  "nextSteps": []
}
````

**Gold Standard Best Practices Validation:**

FOR EACH generated command, VALIDATE against /commit gold standard:

**CRITICAL Security & Testing Checklist:**

- [ ] **Session ID**: Unique nanosecond timestamp (`gdate +%s%N`)
- [ ] **Minimal Tools**: Only required tools in allowed-tools
- [ ] **Scoped Permissions**: Bash commands properly scoped (e.g., `Bash(git:*)`)
- [ ] **Dynamic Context Testing**: All `!` commands tested individually with fallbacks
- [ ] **Error Handling**: TRY/CATCH blocks for risky operations
- [ ] **State Isolation**: Unique temp files with session ID
- [ ] **Programming Constructs**: Proper STEP/IF/FOR/WHILE patterns
- [ ] **Deterministic Behavior**: Same inputs produce same outputs
- [ ] **Fallback Values**: All commands have `|| echo "fallback"` patterns

**Performance & Parallel Execution Validation:**

- [ ] **Sub-Agent Opportunities**: Analysis tasks use Task tool for parallelism
- [ ] **Batch Operations**: Multiple tool calls in single response where possible
- [ ] **Token Efficiency**: Use file references (@file) vs content inclusion
- [ ] **Context Optimization**: Minimal context window usage with disk serialization

**Programming Paradigm Compliance:**

- [ ] **State Machine Pattern**: Clear phase transitions
- [ ] **Error Recovery**: Rollback procedures for critical operations
- [ ] **Human Checkpoints**: User approval for irreversible actions
- [ ] **Modular Design**: Reusable PROCEDURE blocks
- [ ] **Documentation**: Clear examples and usage patterns

STEP 4: Create command directory structure with namespace support

**PROCEDURE create_command_file_structure():**

TRY:

```bash
# Ensure proper namespace directory structure
namespace_path=".claude/commands/${namespace_directory}"
command_file="${namespace_path}/${command_name}.md"

# Create namespace directory if needed
mkdir -p "$namespace_path"
echo "📁 Created namespace directory: $namespace_path"

# Check for existing command with collision detection
IF [ -f "$command_file" ]; then
  echo "⚠️ Command /${namespace}:${command_name} already exists"
  PROMPT user for overwrite confirmation with backup option
  IF overwrite_confirmed:
    # Create backup with timestamp
    backup_file="${command_file}.backup.$(gdate +%s%N)"
    cp "$command_file" "$backup_file"
    echo "💾 Backup created: $backup_file"
  ELSE:
    SUGGEST alternative command names based on existing patterns
    EXIT gracefully with suggestions
fi
```

CATCH (directory_creation_failed):

- CHECK file permissions and provide sudo guidance if needed
- SUGGEST alternative command organization approaches

STEP 5: Write command file with comprehensive validation

**PROCEDURE write_and_validate_command():**

TRY:

- WRITE generated command to determined path with atomic operation
- VALIDATE front matter YAML syntax using local parser
- TEST all dynamic context commands individually:
  ```bash
  # Test each !`command` individually for compatibility
  for context_cmd in "${dynamic_context_commands[@]}"; do
    echo "Testing: $context_cmd"
    eval "$context_cmd" || echo "⚠️ Failed: $context_cmd"
  done
  ```
- VERIFY programming constructs syntax (STEP/IF/FOR patterns)
- VALIDATE session state schema against JSON schema
- CONFIRM error handling completeness using checklist

CATCH (validation_failed):

- LOG specific validation errors to session state
- PROVIDE detailed error explanations with fix suggestions
- ALLOW iterative correction without losing progress

STEP 6: Atomic commit with best practices validation

**IF git repository detected:**

```bash
# CRITICAL: Follow atomic commit workflow from improving-slash-commands.md

# Stage the new command file
git add "$command_file"

# Create conventional commit message following gold standard
git commit -m "$(cat <<'EOF'
feat(commands): add /${namespace}:${command_name} with [execution_model] pattern

- Implements ${command_purpose} with deterministic behavior
- Includes ${key_features} (parallel execution, state management, etc.)
- Follows gold standard best practices with security validation
- Provides ${performance_benefit} performance improvement

Generated with programming paradigm compliance and comprehensive testing.
EOF
)"

echo "✅ Command committed with conventional commit format"
```

CATCH (git_commit_failed):

- PROVIDE troubleshooting guidance for common git issues
- SUGGEST manual commit steps with generated message
- PRESERVE command file regardless of commit status

STEP 7: Command testing and verification workflow

**PROCEDURE test_generated_command():**

- DISPLAY command access pattern: `/${namespace}:${command_name} [arguments]`
- SHOW command file location for inspection: `$command_file`
- EXECUTE dry-run validation:
  ```bash
  # Validate all bash commands in Context section
  echo "🧪 Testing dynamic context commands..."
  # [context command testing results]

  echo "📊 Command complexity: ${execution_model}"
  echo "🔧 Tools required: ${allowed_tools}"
  echo "⚡ Performance benefits: ${performance_notes}"
  ```

**Testing Recommendations:**

1. **Security Testing**: Verify minimal permissions and scoped commands
2. **State Isolation**: Test concurrent execution with multiple session IDs
3. **Error Handling**: Simulate failure conditions and verify recovery
4. **Performance**: If parallel execution, verify sub-agent coordination
5. **Integration**: Test with existing command ecosystem

STEP 8: Documentation and team distribution

**PROCEDURE finalize_command_deployment():**

- GENERATE command documentation with usage examples
- UPDATE project README with new command if applicable
- CREATE command catalog entry for team reference
- PROVIDE integration guidance with existing workflows

FINALLY:

**Session cleanup and reporting:**

- SERIALIZE final session state with generation metrics
- CLEAN UP temporary files: `/tmp/generate-command-*-$SESSION_ID.*`
- REPORT successful command generation with performance metrics:
  ```json
  {
    "commandGenerated": "/${namespace}:${command_name}",
    "executionModel": "${execution_model}",
    "performanceBenefit": "${performance_multiplier}x faster",
    "bestPracticesCompliance": "100%",
    "securityValidation": "passed",
    "testingComplete": true
  }
  ```

**Next Steps for User:**

1. **Test the command**: Execute with sample inputs
2. **Review generated file**: Customize if needed for specific project requirements
3. **Share with team**: Document usage patterns and integrate into workflows
4. **Monitor usage**: Track effectiveness and iterate based on feedback

## Gold Standard Command Templates

**1. Git/GitHub Operations (Following /commit pattern)**

```yaml
---
allowed-tools: Bash(git:*), Bash(gh:*), Bash(gdate:*)
description: [git_operation] with conventional commits and safety checks
---

## Context

- Session ID: !`gdate +%s%N`
- Git status: !`git status --porcelain || echo "Not a git repository"`
- Current branch: !`git branch --show-current || echo "No current branch"`
- Remote status: !`git remote -v | head -1 || echo "No remote configured"`

## Your task

STEP 1: Initialize session state
- CREATE: `/tmp/git-operation-state-$SESSION_ID.json`
- VALIDATE git repository and permissions

[Additional git-specific steps...]
```

**2. Parallel Analysis Commands**

```yaml
---
allowed-tools: Task, Read, Bash(rg:*), Bash(fd:*), Bash(gdate:*)
description: [analysis_type] with 8-10x faster parallel execution
---

## Context

- Session ID: !`gdate +%s%N`
- Target: $ARGUMENTS

## Your task

**CRITICAL: Deploy parallel sub-agents for maximum performance**

IMMEDIATELY launch [N] specialized analysis agents:
[Agent definitions...]
```

**3. Interactive Workflow Commands**

```yaml
---
allowed-tools: Read, Write, Bash(gdate:*), Bash(jq:*)
description: [workflow_name] with checkpoint/resume capability
---

## Context

- Session ID: !`gdate +%s%N`
- [workflow_specific_context]

## Your task

PROCEDURE [workflow_name]():

STEP 1: Initialize workflow state
STEP 2: [analysis_phase] → CHECKPOINT
STEP 3: User confirmation → CHECKPOINT  
STEP 4: [implementation_phase] → CHECKPOINT
```

## Best Practices Reference

**Programming Paradigm Checklist:**

- [ ] **Deterministic Behavior**: Same inputs → same outputs
- [ ] **State Machines**: Clear phase transitions with validation
- [ ] **Error Recovery**: TRY/CATCH/FINALLY with rollback procedures
- [ ] **Session Isolation**: Unique session IDs with nanosecond precision
- [ ] **Human Checkpoints**: User approval for irreversible actions
- [ ] **Token Efficiency**: File references (@file) vs content inclusion
- [ ] **Parallel Execution**: Sub-agents for analysis tasks (5-10x faster)

**Security & Testing Standards:**

- [ ] **Minimal Permissions**: Only required tools in allowed-tools
- [ ] **Scoped Commands**: Bash(tool:scope) pattern for safety
- [ ] **Dynamic Context Testing**: All `!` commands tested with fallbacks
- [ ] **Input Validation**: Proper argument handling and sanitization
- [ ] **Error Handling**: Comprehensive error scenarios covered
- [ ] **State Cleanup**: Temporary files cleaned up on completion

**Performance Optimization:**

- [ ] **Sub-Agent Opportunities**: Analysis tasks leverage parallel execution
- [ ] **Batch Operations**: Multiple tool calls in single response
- [ ] **Context Optimization**: Minimal context window usage
- [ ] **Disk Serialization**: State management to reduce memory usage
- [ ] **Caching Strategy**: Avoid redundant operations across sessions

This enhanced command generator now follows the "Program not Conversation" paradigm with comprehensive parallel execution support, gold standard validation, and programming language constructs for deterministic, high-performance slash command generation.