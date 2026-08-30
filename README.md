<img width="680" height="494" alt="image" src="https://github.com/user-attachments/assets/785f74e6-99a5-40bd-bd9c-b17cb66476d5" />



# claude-cmd

[![CI](https://github.com/kiliczsh/claude-cmd/actions/workflows/ci.yml/badge.svg)](https://github.com/kiliczsh/claude-cmd/actions/workflows/ci.yml)

A lightweight (~46kB) and comprehensive CLI tool for managing Claude commands, configurations, and workflows. This tool helps you organize and manage custom commands for Claude AI, create project-specific configurations, and handle MCP (Model Context Protocol) servers.

## Features

- 🎯 **Interactive CLI**: Easy-to-use command-line interface with intuitive menus
- 📝 **CLAUDE.md Management**: Create and manage project-specific Claude configuration files
- 🔍 **Command Discovery**: Search and install commands from online repositories (184+ commands available)
- 🛡️ **Security Management**: Configure permissions and security profiles
- ☁️ **MCP Integration**: Manage Model Context Protocol servers
- 🚀 **Project Initialization**: Quick setup for different project types
- ⚙️ **Settings Management**: Centralized configuration management
- 🌐 **Local & Remote**: Works with both local command repositories and remote GitHub sources

## Installation

```bash
# npm
npm install -g claude-cmd@latest

# bun
bun install -g claude-cmd@latest
```

## Quickstart

```bash
# 1. Install a skill from the registry
claude-cmd install git-commit

# 2. Or launch the interactive TUI to browse all 184+ skills
claude-cmd

# 3. Search by keyword
claude-cmd search "pr description"
```

That's it. Installed skills live in `~/.claude/skills/` and are automatically available in Claude Code.

## All Commands

```bash
claude-cmd                        # Interactive TUI
claude-cmd list                   # List installed skills
claude-cmd search <query>         # Search the registry
claude-cmd install <skill-name>   # Install a skill
claude-cmd --local search <q>     # Search local repo
claude-cmd --local install <name> # Install from local
claude-cmd --version              # Show version
claude-cmd --help                 # Show help
```

## Features Overview

### 📋 Command Management
- Browse and install commands from online repositories (184+ commands)
- Search commands by name, description, or tags
- Manage local command collections
- Dynamic content loading for optimal package size
- Support for both local and remote command sources

### 🎯 CLAUDE.md Configuration
- Create project-specific Claude instructions
- Templates for different project types (Node.js, React, Python, etc.)
- Support for local overrides with CLAUDE.local.md

### 🛡️ Security & Permissions
- Configure security profiles (strict, moderate, permissive)
- Manage allowed tools and operations
- Best practices guidance

### ☁️ MCP Server Management
- List locally configured MCP servers
- View server configurations and status
- Integration with Claude Code settings

### 🚀 Project Initialization
- Quick setup for new projects
- Automatic project type detection
- Integrated security configuration

## File Structure

```
~/.claude/
├── commands/           # Installed Claude commands
├── settings.json       # Global configuration
└── CLAUDE.md          # Global Claude instructions

Project files:
├── CLAUDE.md          # Project-specific instructions
├── CLAUDE.local.md    # Local overrides (gitignored)
└── .claude/           # Project-specific configurations
```

## Configuration

The tool uses a hierarchical configuration system:

1. **Global settings**: `~/.claude/settings.json`
2. **Project settings**: `./.claude/settings.json`
3. **Local overrides**: `./.claude/settings.local.json`

## Architecture

```
claude-cmd/
├── src/
│   ├── index.ts              # CLI entry point + argument parsing
│   ├── cli.ts                # Interactive TUI (ClaudeCommandCLI)
│   ├── commands/             # Feature managers
│   │   ├── command-manager.ts   # Install, search, delete
│   │   ├── claudemd.ts          # CLAUDE.md management
│   │   ├── mcp.ts               # MCP server management
│   │   ├── permissions.ts       # Security profiles
│   │   ├── project.ts           # Project init
│   │   └── settings.ts          # Configuration
│   ├── core/
│   │   ├── api.ts            # Remote registry fetch (5-min cache)
│   │   └── filesystem.ts     # File operations + dual-write
│   └── utils/
│       ├── colors.ts         # Terminal colors
│       └── navigation.ts     # TUI breadcrumb navigation
├── commands/                 # Skill source files (184+ SKILL.md files)
│   ├── TEMPLATE.md           # Template for new skills
│   ├── git/                  # Git workflow skills
│   ├── code/                 # Code generation skills
│   └── ...                   # Other categories
└── dist/                     # Compiled output
```

Skills are installed to `~/.claude/skills/<name>/SKILL.md`. The registry (`commands/commands.json`) contains metadata only — skill content is fetched on install to keep the package small (~46kB).

## Contributing

We welcome contributions — especially new skills! Whether you're authoring a skill, fixing a bug, or improving docs, your help makes this better for everyone.

- **New skill?** Read the [SKILL.md Authoring Guide](docs/SKILL-authoring-guide.md)
- **Code change?** Read [CONTRIBUTING.md](CONTRIBUTING.md)
- **Bug or idea?** [Open an issue](https://github.com/kiliczsh/claude-cmd/issues)

Thank you to all the contributors who have helped make this project possible! 🙏

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- **Repository**: https://github.com/kiliczsh/claude-cmd
- **Issues**: https://github.com/kiliczsh/claude-cmd/issues
- **NPM Package**: https://www.npmjs.com/package/claude-cmd

## Support

If you encounter any issues or have questions, please:

1. Check the [documentation](https://github.com/kiliczsh/claude-cmd#readme)
2. Search existing [issues](https://github.com/kiliczsh/claude-cmd/issues)
3. Create a new issue with detailed information

## Author

**Muhammed Kılıç** (@kiliczsh)
- GitHub: [kiliczsh](https://github.com/kiliczsh)
- Email: hi@muhammedkilic.com

---

Made with ❤️ for the Claude AI community
