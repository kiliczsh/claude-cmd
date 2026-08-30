---
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(eza:*), Bash(bat:*), Bash(gdate:*), Bash(deno:*)
name: "Sync"
description: "Orchestrate multi-editor configuration synchronization with intelligent conflict resolution and rollback capabilities"
author: "wcygan"
tags: ["workflow","manage"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target editors: $ARGUMENTS
- Editor config files detected: !`fd "(keybindings\.json|keymap\.json|settings\.json)" . -d 3 | head -10 || echo "No editor config files found"`
- Cursor config: !`fd "keybindings\.json" cursor/ -d 2 | head -1 || echo "cursor/keybindings.json not found"`
- VSCode config: !`fd "keybindings\.json" vscode/ -d 2 | head -1 || echo "vscode/keybindings.json not found"`
- Zed config: !`fd "keymap\.json" zed/ -d 2 | head -1 || echo "zed/keymap.json not found"`
- Backup directory: !`fd backup . -t d -d 2 | head -1 || echo "No backup directory found"`
- Deno task status: !`test -f deno.json && jq -r '.tasks."sync:editors" // "Not configured"' deno.json || echo "No deno.json found"`

## Your Task

STEP 1: Initialize synchronization session and backup existing configurations

- CREATE session state file: `/tmp/sync-session-$SESSION_ID.json`
- ANALYZE existing editor configurations from Context section
- CREATE timestamped backup of all editor configs
- VALIDATE sync tools availability (jq, deno required)

```bash
# Initialize sync session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "targetEditors": "'$ARGUMENTS'",
  "backupTimestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "conflictsDetected": [],
  "syncStrategy": "intelligent-merge"
}' > /tmp/sync-session-$SESSION_ID.json

# Create configuration backup
mkdir -p /tmp/editor-config-backup-$SESSION_ID
```

STEP 2: Comprehensive configuration analysis with parallel sub-agent coordination

TRY:

IF multiple_editors_detected AND complex_keybinding_conflicts:

LAUNCH parallel sub-agents for comprehensive configuration analysis:

- **Agent 1: Cursor Configuration Analysis**: Analyze Cursor editor keybindings and settings
  - Focus: Keybinding patterns, custom shortcuts, editor-specific features
  - Tools: jq for JSON parsing, rg for pattern search
  - Output: Cursor configuration profile with feature mapping

- **Agent 2: VSCode Configuration Analysis**: Analyze VSCode keybindings and settings
  - Focus: Extension-dependent keybindings, workspace settings, global preferences
  - Tools: jq for JSON parsing, configuration validation
  - Output: VSCode configuration profile with extension dependencies

- **Agent 3: Zed Configuration Analysis**: Analyze Zed keymap and settings
  - Focus: Modal editing patterns, vim integration, custom key sequences
  - Tools: jq for JSON parsing, keymap validation
  - Output: Zed configuration profile with modal editing considerations

- **Agent 4: Conflict Detection & Resolution**: Identify conflicts and propose resolutions
  - Focus: Conflicting keybindings, platform differences, feature gaps
  - Tools: Configuration diffing, intelligent conflict resolution
  - Output: Conflict report with resolution strategies

**Sub-Agent Coordination:**

```bash
# Each agent reports findings to session state
echo "Parallel configuration analysis agents launched..."
echo "Results will be aggregated for intelligent synchronization"
```

ELSE:

EXECUTE streamlined single-editor or simple synchronization:

```bash
# Simple synchronization workflow
echo "🔄 Executing streamlined configuration sync..."
```

STEP 3: Configuration file discovery and validation

**Systematic Configuration Discovery:**

```bash
# Discover all editor configuration files
echo "📁 Editor Configuration Discovery:"
echo "Cursor configs:"
fd "(keybindings|settings)\.json" cursor/ -d 3 | head -5

echo "VSCode configs:"
fd "(keybindings|settings)\.json" vscode/ -d 3 | head -5

echo "Zed configs:"
fd "(keymap|settings)\.json" zed/ -d 3 | head -5

# Validate JSON syntax
echo "🔍 Configuration Validation:"
for config in $(fd "\.(json|jsonc)$" . -d 3); do
  jq . "$config" >/dev/null 2>&1 && echo "✅ $config" || echo "❌ $config (invalid JSON)"
done
```

**Configuration Backup Strategy:**

```bash
# Create timestamped backups
BACKUP_DIR="/tmp/editor-config-backup-$SESSION_ID"
mkdir -p "$BACKUP_DIR"/{cursor,vscode,zed}

# Backup with verification
FOR EACH editor_config IN cursor/ vscode/ zed/:
  cp -r "$editor_config" "$BACKUP_DIR/"
  echo "📦 Backed up $editor_config"
done
```

STEP 4: Intelligent keybinding analysis and conflict resolution

**Pattern Recognition and Normalization:**

```bash
# Extract and normalize keybinding patterns
echo "🔍 Keybinding Pattern Analysis:"

# Common keybinding extraction
rg '"key":\s*"([^"]+)".*"command":\s*"([^"]+)"' cursor/ vscode/ zed/ --only-matching --no-filename | sort | uniq -c | sort -nr

# Platform-specific pattern detection
rg '(cmd|ctrl|alt|shift)\+' cursor/ vscode/ zed/ --only-matching | sort | uniq -c

# Command frequency analysis
rg '"command":\s*"([^"]+)"' cursor/ vscode/ zed/ -o --no-filename | sort | uniq -c | sort -nr | head -20
```

**Conflict Detection Algorithm:**

```bash
# Generate conflict detection report
echo "⚠️ Conflict Detection Report:"

# Same key, different commands across editors
echo "Conflicting keybindings (same key, different commands):"
# Implementation would compare keybinding mappings across editors

# Missing keybindings in specific editors
echo "Missing keybindings by editor:"
# Implementation would identify gaps in coverage
```

STEP 5: Automated synchronization script generation

**Deno Synchronization Script Creation:**

```typescript
// scripts/sync-editor-configs.ts
import { parse, stringify } from "@std/json";
import { walk } from "@std/fs";
import { exists } from "@std/fs";

interface KeyBinding {
  key: string;
  command: string;
  when?: string;
  args?: Record<string, any>;
}

interface EditorConfig {
  name: string;
  keybindings: KeyBinding[];
  settings: Record<string, any>;
}

class EditorConfigSynchronizer {
  private sessionId: string;
  private conflicts: Array<{ key: string; editors: string[]; commands: string[] }>;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.conflicts = [];
  }

  async analyzeConfigurations(): Promise<EditorConfig[]> {
    // Implementation for configuration analysis
  }

  async detectConflicts(configs: EditorConfig[]): Promise<void> {
    // Implementation for conflict detection
  }

  async generateSyncPlan(): Promise<string> {
    // Implementation for sync plan generation
  }

  async applySynchronization(): Promise<void> {
    // Implementation for applying sync changes
  }
}
```

STEP 6: Configuration harmonization with intelligent conflict resolution

**Harmonization Strategy:**

CASE conflict_resolution_mode:
WHEN "conservative":

- PRESERVE editor-specific bindings
- ONLY sync non-conflicting keybindings
- MAINTAIN existing muscle memory patterns

WHEN "aggressive":

- STANDARDIZE keybindings across all editors
- RESOLVE conflicts using priority matrix
- UPDATE all editors to common scheme

WHEN "interactive":

- PRESENT conflicts for manual resolution
- PROVIDE recommendation with rationale
- ALLOW selective synchronization

**Implementation Framework:**

```bash
# Generate harmonized configuration
echo "🎯 Configuration Harmonization:"

# Priority-based conflict resolution
echo "Applying conflict resolution strategy: $SYNC_STRATEGY"

# Common keybinding extraction and standardization
echo "Extracting common patterns for standardization..."

# Editor-specific adaptation
echo "Adapting for editor-specific requirements..."
```

STEP 7: Validation and rollback capability implementation

**Validation Framework:**

```bash
# Configuration validation after sync
echo "🔍 Post-sync Validation:"

# JSON syntax validation
FOR EACH synced_config:
  jq . "$synced_config" >/dev/null || echo "❌ Invalid JSON: $synced_config"
done

# Keybinding conflict validation
echo "Checking for remaining conflicts..."

# Feature preservation validation
echo "Verifying critical features preserved..."
```

**Rollback Implementation:**

```bash
# Rollback procedure
function rollback_configurations() {
  local backup_dir="/tmp/editor-config-backup-$SESSION_ID"
  
  echo "🔄 Rolling back configurations..."
  
  FOR EACH editor IN cursor vscode zed:
    cp -r "$backup_dir/$editor/" "./"
    echo "↩️ Restored $editor configuration"
  done
  
  echo "✅ Rollback completed successfully"
}
```

STEP 8: Deno task integration and automation setup

**Update deno.json with sync tasks:**

```json
{
  "tasks": {
    "sync:editors": "deno run --allow-all scripts/sync-editor-configs.ts",
    "sync:backup": "deno run --allow-all scripts/backup-editor-configs.ts",
    "sync:restore": "deno run --allow-all scripts/restore-editor-configs.ts",
    "sync:validate": "deno run --allow-all scripts/validate-editor-configs.ts"
  }
}
```

**Sync Script Template:**

```typescript
#!/usr/bin/env -S deno run --allow-all

// Comprehensive editor configuration synchronization
import { parse, stringify } from "@std/json";
import { copy, ensureDir } from "@std/fs";

const SESSION_ID = Date.now().toString();

async function main() {
  console.log(`🔄 Starting editor sync session: ${SESSION_ID}`);

  // Implementation would include:
  // 1. Configuration discovery
  // 2. Conflict detection
  // 3. Intelligent resolution
  // 4. Backup creation
  // 5. Synchronization application
  // 6. Validation

  console.log("✅ Editor synchronization completed");
}

if (import.meta.main) {
  await main();
}
```

CATCH (sync_failed):

- LOG error details to session state
- TRIGGER automatic rollback
- PROVIDE manual recovery instructions

```bash
echo "❌ Synchronization failed. Initiating rollback..."
rollback_configurations
echo "🛡️ Configurations restored to original state"
echo "📋 Manual review recommended before retry"
```

FINALLY:

**Update Session State and Generate Report:**

```bash
# Update sync session with results
jq --arg timestamp "$(gdate -Iseconds 2>/dev/null || date -Iseconds)" '
  .completedAt = $timestamp |
  .status = "completed" |
  .syncResults = {
    "conflictsResolved": (.conflictsDetected | length),
    "editorsSync": ["cursor", "vscode", "zed"],
    "backupLocation": "/tmp/editor-config-backup-'$SESSION_ID'"
  }
' /tmp/sync-session-$SESSION_ID.json > /tmp/sync-session-$SESSION_ID.tmp && \
mv /tmp/sync-session-$SESSION_ID.tmp /tmp/sync-session-$SESSION_ID.json

echo "✅ Editor configuration synchronization completed"
echo "🔍 Session: $SESSION_ID"
echo "📊 Conflicts resolved: $(jq -r '.syncResults.conflictsResolved // 0' /tmp/sync-session-$SESSION_ID.json)"
echo "💾 Backup available at: /tmp/editor-config-backup-$SESSION_ID"
echo "🎯 Editors synchronized: cursor, vscode, zed"
```

**Manual Sync Instructions:**

```bash
echo "📋 Manual Configuration Guidelines:"
echo "  • Test each editor after sync"
echo "  • Verify critical keybindings work"
echo "  • Report any issues for resolution"
echo "  • Use 'deno task sync:restore' to rollback if needed"
```

## Synchronization Strategy Reference

### Editor-Specific Considerations

**Cursor Editor:**

- Based on VSCode architecture
- Supports VSCode keybinding format
- AI-specific commands and shortcuts
- Extension compatibility patterns

**VSCode Editor:**

- Extensive extension ecosystem
- Complex conditional keybindings (when clauses)
- Workspace-specific overrides
- Platform-specific variations

**Zed Editor:**

- Modal editing support
- Vim integration patterns
- Performance-focused keybindings
- Native macOS integration

### Conflict Resolution Patterns

**High-Priority Commands (Never Override):**

- Copy/Paste/Undo (cmd+c, cmd+v, cmd+z)
- Save/Open/New (cmd+s, cmd+o, cmd+n)
- Find/Replace (cmd+f, cmd+shift+f)

**Medium-Priority Commands (Sync Preferred):**

- Test runners (cmd+k cmd+t)
- Terminal toggle (cmd+`)
- Command palette (cmd+shift+p)

**Low-Priority Commands (Editor-Specific OK):**

- Advanced editor features
- Extension-specific commands
- Experimental keybindings

### Best Practices

1. **Always backup before sync**
2. **Test in development environment first**
3. **Respect platform conventions**
4. **Maintain muscle memory where possible**
5. **Document conflicts and resolutions**
6. **Provide easy rollback mechanism**

This intelligent synchronization command provides comprehensive editor configuration management with conflict resolution, backup capabilities, and automated harmonization across Cursor, VSCode, and Zed editors.