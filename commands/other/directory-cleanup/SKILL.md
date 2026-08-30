---
name: "Directory Cleanup"
description: "Organize and restructure project directories following framework best practices"
author: "github.com/kingler"
tags: ["organization", "cleanup", "structure", "refactoring", "maintenance"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# Directory Cleanup

A comprehensive project organization tool that analyzes current project structure and reorganizes files and folders according to framework-specific best practices, creating a clean, maintainable, and well-structured codebase.

## Features

- **Structure Analysis**: Analyze current project tree and identify organizational issues
- **Framework-Specific Guidelines**: Apply best practices for specific programming frameworks
- **Automated Reorganization**: Move files and create directories following established patterns
- **Version Control Integration**: Safe reorganization with proper branching and commit strategies
- **Testing Validation**: Ensure project functionality after restructuring

## Usage

This command helps maintain clean, organized project structures that follow industry best practices and framework conventions.

### Basic Usage

1. **Analyze current structure** using tree command to understand project layout
2. **Research framework best practices** for optimal organization
3. **Create reorganization plan** with detailed file movement strategy
4. **Implement changes safely** with version control backup
5. **Validate functionality** after restructuring

### Advanced Usage

```
# Complete project restructuring workflow
1. Generate project tree structure
2. Identify framework and research best practices
3. Create detailed reorganization plan
4. Get user approval for changes
5. Create version control branch
6. Execute file movements step-by-step
7. Test project functionality
8. Commit changes and merge
```

## Examples

### Example 1: React Project Cleanup

Reorganize a React project following modern best practices:

```
Before:
├── components/
├── pages/
├── utils/
├── styles/
└── random-files.js

After:
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── styles/
├── public/
└── tests/
```

### Example 2: Node.js API Restructuring

Clean up a Node.js API following MVC patterns:

```
Before:
├── app.js
├── routes.js
├── database.js
└── misc-files/

After:
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
├── tests/
└── docs/
```

## Configuration

To effectively use Directory Cleanup:

- **Framework Identification**: Specify the primary framework or technology stack
- **Exclusion Rules**: Define files/folders to ignore (node_modules, build folders)
- **Naming Conventions**: Follow consistent naming patterns for directories
- **Documentation**: Maintain clear README files explaining structure

## Notes

- **Backup First**: Always create version control branch before reorganization
- **Test Thoroughly**: Verify all imports and dependencies after moving files
- **Incremental Changes**: For large projects, consider phased reorganization
- **Team Coordination**: Communicate structural changes with team members
- **Framework Updates**: Stay current with evolving best practices for your stack

## Arguments

Provide the following information for optimal reorganization:

**$PROJECT_STRUCTURE**: Current project tree structure (use `tree` command output)
**$FRAMEWORK**: Primary framework or technology stack being used

$ARGUMENTS