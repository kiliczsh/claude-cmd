---
allowed-tools: Read, Write, Task, Bash(gdate:*), Bash(date:*), Bash(pwd:*), Bash(fd:*), Bash(rg:*), Bash(git:*)
name: "Migrate"
description: "Ultra-fast parallel migration planning using 10 sub-agents for comprehensive impact analysis"
author: "wcygan"
tags: ["code","migrate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N`
- Current directory: !`pwd`
- Project files: !`fd "(go\.mod|Cargo\.toml|pom\.xml|package\.json|deno\.json)" --max-depth 2 | head -5 || echo "No project files found"`
- Migration directories: !`fd "migrations?" --type d | head -5 || echo "No migration directories found"`
- Database configs: !`fd "\.(env|properties|yaml|yml)$" --max-depth 2 | head -3 || echo "No config files found"`
- Git status: !`git status --porcelain | head -10 || echo "Not a git repository"`
- Migration target: $ARGUMENTS

## Your task

**IMMEDIATELY DEPLOY 10 PARALLEL SUB-AGENTS** for instant comprehensive migration planning

STEP 1: Initialize Migration Planning Session

- Create session state file: `/tmp/migration-strategy-$SESSION_ID.json`
- Initialize results directory: `/tmp/migration-results-$SESSION_ID/`

STEP 2: **LAUNCH ALL 10 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL ANALYSIS** - All agents work in parallel:

1. **Impact Analysis Agent**: Assess breaking changes and affected systems
2. **Risk Assessment Agent**: Identify risks and mitigation strategies
3. **Database Migration Agent**: Analyze schema changes and data migration
4. **API Migration Agent**: Map endpoint changes and client impacts
5. **Dependency Agent**: Analyze package updates and compatibility
6. **Testing Strategy Agent**: Create comprehensive test plans
7. **Rollback Planning Agent**: Design rollback procedures and checkpoints
8. **Performance Impact Agent**: Analyze migration performance implications
9. **Security Review Agent**: Assess security implications of changes
10. **Documentation Agent**: Generate migration guides and runbooks

Each agent saves analysis to: `/tmp/migration-results-$SESSION_ID/agent-N.json`

Think deeply about migration complexity while maximizing parallel execution.

**Expected speedup: 10x faster migration planning and risk assessment**

IF $ARGUMENTS contains "database":

- Use **Database Migration Agent** for schema analysis
- Detect migration tools (Flyway, Liquibase, golang-migrate, Prisma)
- Analyze current schema and identify breaking changes

ELSE IF $ARGUMENTS contains "api" OR "version":

- Use **API Migration Agent** for endpoint analysis
- Map deprecated endpoints and compatibility requirements
- Analyze client SDK dependencies and breaking changes

ELSE IF $ARGUMENTS contains "dependency" OR "update":

- Use **Dependency Migration Agent** for package analysis
- Detect dependency managers and version constraints
- Analyze breaking changes and compatibility matrix

ELSE IF $ARGUMENTS contains "kubernetes" OR "k8s":

- Use **Infrastructure Migration Agent** for resource analysis
- Detect API version changes and deprecated resources
- Analyze Helm charts and custom controller dependencies

ELSE:

- Use **General Migration Agent** for pattern analysis
- Detect code patterns requiring migration
- Analyze refactoring scope and impact

STEP 2: Migration Risk Assessment and Planning

Think deeply about migration complexity, potential risks, and optimal execution strategies.

FOR EACH identified migration component:

- Assess breaking change impact (high/medium/low)
- Evaluate rollback complexity and requirements
- Determine data loss or downtime risks
- Plan testing and validation strategies

**Risk Analysis Framework:**

IF migration_impact == "high":

- Create detailed rollback procedures
- Plan staged migration with checkpoints
- Implement comprehensive testing strategy
- Schedule maintenance windows and notifications

ELSE IF migration_impact == "medium":

- Create automated rollback scripts
- Plan feature flag rollouts if applicable
- Implement integration testing
- Schedule during low-traffic periods

ELSE:

- Plan simple rollback procedures
- Implement automated testing
- Execute during normal operations

STEP 3: Migration Implementation Strategy

TRY:

- Create session state file: /tmp/migration-strategy-$SESSION_ID.json
- Generate migration scripts and automation
- Create validation and testing procedures
- Implement monitoring and rollback systems

**Database Migration Implementation:**

CASE database_type:
WHEN "postgresql" OR "mysql":

- Generate SQL migration files with up/down scripts
- Create data validation queries
- Plan index creation strategy (online vs offline)
- Configure connection pooling during migration

WHEN "mongodb":

- Create document transformation scripts
- Plan collection reorganization strategy
- Implement data validation procedures
- Configure replica set migration approach

DEFAULT:

- Create generic migration procedures
- Document manual migration steps
- Plan data backup and validation

**Code Migration Implementation:**

FOR EACH code pattern requiring migration:

- Create automated refactoring scripts using modern tools (rg, fd)
- Generate before/after code examples
- Plan batch processing with validation checkpoints
- Implement automated testing for each refactored component

**Dependency Migration Implementation:**

CASE package_manager:
WHEN "go":

- Update go.mod with version constraints
- Plan module proxy considerations
- Generate compatibility testing suite
- Create vendor directory migration if needed

WHEN "rust":

- Update Cargo.toml with semantic versions
- Plan feature flag migration
- Generate cargo audit security checks
- Create lock file migration strategy

WHEN "java":

- Update Maven/Gradle dependencies
- Plan classpath conflict resolution
- Generate integration test suite
- Create security vulnerability assessment

WHEN "node":

- Update package.json with exact versions
- Plan npm audit vulnerability fixes
- Generate lockfile migration strategy
- Create bundler compatibility testing

DEFAULT:

- Create manual migration procedures
- Document testing requirements
- Plan rollback strategies

STEP 4: Automation and Testing Framework

- Generate comprehensive migration scripts in Deno TypeScript
- Create dry-run validation mode for safe testing
- Implement progress tracking and checkpoint system
- Configure automated rollback triggers

**Migration Automation Template:**

```typescript
// Generated migration script: scripts/migrate-{target}-$SESSION_ID.ts
import { ensureDir } from "@std/fs";
import { join } from "@std/path";

interface MigrationConfig {
  target: string;
  sessionId: string;
  dryRun: boolean;
  checkpoints: string[];
  rollbackTriggers: string[];
}

class MigrationExecutor {
  private config: MigrationConfig;
  private stateFile: string;

  constructor(config: MigrationConfig) {
    this.config = config;
    this.stateFile = `/tmp/migration-state-${config.sessionId}.json`;
  }

  async execute(): Promise<void> {
    if (this.config.dryRun) {
      console.log("🔍 Dry-run mode: Validating migration without changes");
    }

    await this.validatePrerequisites();
    await this.createBackup();
    await this.executeMigrationSteps();
    await this.validatePostMigration();
    await this.cleanup();
  }

  private async validatePrerequisites(): Promise<void> {
    // Validation logic specific to migration type
  }

  private async createBackup(): Promise<void> {
    // Backup strategy based on migration target
  }

  private async executeMigrationSteps(): Promise<void> {
    // Step-by-step migration with checkpoint saves
  }

  private async validatePostMigration(): Promise<void> {
    // Comprehensive validation and health checks
  }

  private async cleanup(): Promise<void> {
    // Cleanup temporary files and update state
  }
}
```

STEP 5: Migration Plan Documentation and Execution

- Generate detailed migration plan with timeline
- Create stakeholder communication templates
- Plan monitoring and alerting during migration
- Generate post-migration validation checklist

**Migration Plan Template:**

````markdown
# Migration Plan: {Migration Target} - Session {SESSION_ID}

## Executive Summary

{One-paragraph overview of migration scope and timeline}

## Pre-Migration Checklist

- [ ] Backup verification: {backup_location}
- [ ] Rollback procedure tested: {rollback_script}
- [ ] Stakeholder notification sent: {notification_date}
- [ ] Maintenance window scheduled: {start_time} - {end_time}
- [ ] Monitoring dashboards prepared: {dashboard_urls}

## Migration Timeline

### Phase 1: Preparation ({duration})

- [ ] Environment setup and validation
- [ ] Backup creation and verification
- [ ] Team coordination and communication

### Phase 2: Execution ({duration})

- [ ] Migration script execution with checkpoints
- [ ] Real-time monitoring and validation
- [ ] Progress reporting and status updates

### Phase 3: Validation ({duration})

- [ ] Comprehensive system testing
- [ ] Performance validation and monitoring
- [ ] Stakeholder sign-off and documentation

## Migration Commands

**Primary Execution:**

```bash
deno run --allow-all scripts/migrate-{target}-{SESSION_ID}.ts
```
````

**Dry-run Validation:**

```bash
deno run --allow-all scripts/migrate-{target}-{SESSION_ID}.ts --dry-run
```

**Rollback Procedure:**

```bash
deno run --allow-all scripts/rollback-{target}-{SESSION_ID}.ts
```

## Rollback Strategy

**Automatic Rollback Triggers:**

- Critical error detection during migration
- Performance degradation beyond acceptable thresholds
- Data integrity validation failures

**Manual Rollback Procedure:**

1. Execute rollback script: `scripts/rollback-{target}-{SESSION_ID}.ts`
2. Restore from backup: {backup_restore_command}
3. Validate system state: {validation_commands}
4. Update monitoring and alerting
5. Stakeholder communication and incident documentation

## Post-Migration Validation

### System Health Checks

- [ ] Application startup and basic functionality
- [ ] Database connectivity and query performance
- [ ] API endpoint availability and response times
- [ ] Integration tests pass with new configuration

### Performance Validation

- [ ] Response time within acceptable limits
- [ ] Resource utilization normal
- [ ] Error rates within baseline range
- [ ] User experience validation

### Data Integrity Checks

- [ ] Data migration completeness verification
- [ ] Schema validation and constraint checks
- [ ] Backup restoration testing
- [ ] Cross-system consistency validation

## Monitoring and Alerting

**During Migration:**

- Real-time progress monitoring
- Error detection and escalation
- Performance impact assessment
- Rollback trigger monitoring

**Post-Migration:**

- Extended monitoring period: {monitoring_duration}
- Performance regression detection
- Error rate monitoring and alerting
- User feedback collection and analysis

```
CATCH (migration_complexity_high):
- Break down migration into smaller, manageable phases
- Implement additional checkpoints and validation steps
- Plan extended testing and validation periods
- Create more granular rollback procedures

CATCH (rollback_procedure_complex):
- Simplify migration approach to reduce rollback complexity
- Implement more frequent backup and checkpoint creation
- Plan alternative migration strategies with simpler rollback
- Document emergency procedures and escalation paths

FINALLY:
- Save complete migration strategy to: migration-plan-{target}-{SESSION_ID}.md
- Update session state: migration_strategy_complete
- Generate implementation timeline and resource requirements
- Create stakeholder communication templates and schedules

## State Management

Session state tracked in: /tmp/migration-strategy-$SESSION_ID.json

**State Transitions:**
- `initializing` → `analyzing` → `planning` → `implementing` → `validating` → `completed`

**Checkpoint Files:**
- `/tmp/migration-backup-$SESSION_ID.json` - Backup and restore metadata
- `/tmp/migration-progress-$SESSION_ID.json` - Execution progress tracking
- `/tmp/migration-validation-$SESSION_ID.json` - Testing and validation results

IF previous migration session exists:
- Load previous state and continue from last checkpoint
- Validate previous backup integrity
- Resume migration from appropriate phase

ELSE:
- Initialize new migration session
- Create baseline state and backup procedures
- Start fresh migration planning
```