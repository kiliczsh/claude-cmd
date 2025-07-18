# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build & Development
- `npm run build` - Compile TypeScript to dist/ and make executable
- `npm run dev` - Watch TypeScript files for changes during development
- `npm run clean` - Remove the dist directory
- `npm run link` - Link the CLI globally for development testing
- `npm run prelink` - Build before linking (runs automatically)

### Command Processing
- `npm run parse-commands` - Parse command markdown files to commands.json
- `ts-node scripts/parse-commands.ts` - Direct script execution for command parsing

### Testing
- No test framework configured yet (`npm test` exits with error)

## Architecture Overview

This is a TypeScript CLI tool for managing Claude commands, configurations, and workflows. The architecture follows a modular manager pattern:

### Core Components

**Main Entry Points:**
- `src/index.ts` - CLI entry point with command-line argument parsing
- `src/cli.ts` - Interactive CLI interface (`ClaudeCommandCLI` class)

**Core Services:**
- `FileSystemManager` (`src/core/filesystem.ts`) - Handles all file operations, directory management
- `ClaudeCommandAPI` (`src/core/api.ts`) - API abstraction for command fetching with caching
- Command managers in `src/commands/` - Specialized managers for different features

**Manager Pattern:**
Each feature area has its own manager class:
- `CommandManager` - Command installation, search, deletion
- `ClaudeMdManager` - CLAUDE.md file management
- `PermissionsManager` - Security and permissions
- `MCPManager` - Model Context Protocol servers
- `WorkflowManager` - Command workflows
- `SettingsManager` - Configuration management
- `ProjectManager` - Project initialization
- `HelpManager` - Documentation and help

### Configuration System

**Hierarchical Configuration:**
1. Global: `~/.claude/settings.json`
2. Project: `./.claude/settings.json`
3. Local overrides: `./.claude/settings.local.json`

**Directory Structure:**
- `~/.claude/` - Global Claude configuration
- `~/.claude/commands/` - Installed commands
- `./.claude/` - Project-specific configuration
- `commands/` - Command templates (markdown files)
- `dist/` - Compiled output

### Command System

**Command Sources:**
- Remote repository: GitHub raw URLs (default)
- Local repository: `commands/commands.json` (via --local flag)
- 184+ commands available in remote repository

**Command Format:**
- Commands stored as markdown files
- Parsed to JSON format via `parse-commands` script
- Organized by category (agent, analyze, code, context, docs, git, etc.)

### Key Patterns

**API Design:**
- Uses environment variable `CLAUDE_CMD_URL` for command source override
- Supports both URL and local file paths
- 5-minute caching for remote command data

**Navigation:**
- Uses `@inquirer/prompts` for interactive CLI
- Global navigation utilities in `utils/navigation.ts`
- Breadcrumb navigation for submenus

**Error Handling:**
- Colorized output via `utils/colors.ts`
- Graceful error handling with user-friendly messages

## TypeScript Configuration

- Target: ES2022
- Module: CommonJS
- Strict mode enabled
- Path aliases: `@/types` maps to `./src/types`
- Source maps and declarations enabled

## Key Files to Understand

- `src/index.ts` - Entry point and CLI argument parsing
- `src/cli.ts` - Main interactive interface
- `src/commands/command-manager.ts` - Core command management logic
- `src/core/filesystem.ts` - File system operations
- `src/core/api.ts` - API and data fetching
- `commands/commands.json` - Command definitions (generated)
- `scripts/parse-commands.ts` - Command parsing logic