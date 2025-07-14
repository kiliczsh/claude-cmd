# claude-cmd

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

### Global Installation

```bash
npm install -g claude-cmd
```

## Usage

### Interactive Mode

Start the interactive CLI:

```bash
claude-cmd
```

### Command Line Options

```bash
# Show help
claude-cmd --help
claude-cmd -h

# List installed commands
claude-cmd list

# Search for commands (remote repository)
claude-cmd search git

# Search for commands (local repository)
claude-cmd --local search api

# Install a command
claude-cmd install git-helper
claude-cmd --local install api-docs

# Show version
claude-cmd --version
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

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding new features, improving documentation, or sharing command templates, your help makes this project better for everyone.

Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

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
- Email: kiliczsh@gmail.com

---

Made with ❤️ for the Claude AI community
