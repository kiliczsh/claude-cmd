---
# Required fields (agentskills.io spec + Claude Code)
name: "skill-name"
description: "Brief description of what this skill does and when to use it. Used for automatic activation by agents. (agentskills.io: required, max 1024 chars)"

# agentskills.io standard fields (optional)
license: "MIT"
compatibility: "Requires Claude Code. Works with any agentskills.io-compatible agent."
metadata:
  author: "Your Name"
  tags: ["category", "tag1", "tag2"]
  version: "1.0.0"
  created_at: "2025-07-18T00:00:00Z"
  updated_at: "2025-07-18T00:00:00Z"

# Claude Code extensions (optional, not part of agentskills.io spec)
allowed-tools: Read Write Edit Bash
user-invocable: true
argument-hint: "<argument-description>"
# model: claude-sonnet-4-6
# disable-model-invocation: false
---

# Skill Name

Brief description of what this skill does and its purpose.

## Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Usage

Explain how to use this skill:

### Basic Usage
```
Example of basic usage
```

### Advanced Usage
```
Example of advanced usage with options
```

## Examples

### Example 1: Simple Case
Description of what this example does.

```
Code or command example
```

### Example 2: Complex Case
Description of what this example does.

```
More complex example
```

## Configuration

If the skill requires configuration, explain it here:

- Setting 1: What it does
- Setting 2: What it does

## Notes

- Important note 1
- Important note 2
- Any limitations or considerations

## Arguments

If this skill takes arguments, describe them:

$ARGUMENTS
