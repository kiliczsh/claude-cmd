# Contributing to claude-cmd

Thank you for your interest in contributing to claude-cmd! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 8 or higher)
- Git
- TypeScript

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork https://github.com/kiliczsh/claude-cmd on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/claude-cmd.git
   cd claude-cmd
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Link for local testing**
   ```bash
   npm link
   ```

6. **Test the CLI**
   ```bash
   claude-cmd --help
   ```

## Project Structure

```
claude-cmd/
├── src/
│   ├── cli.ts              # Main CLI orchestrator
│   ├── index.ts            # Entry point
│   ├── commands/           # Command modules
│   │   ├── command-manager.ts
│   │   ├── claudemd.ts
│   │   ├── help.ts
│   │   ├── mcp.ts
│   │   ├── permissions.ts
│   │   ├── project.ts
│   │   ├── settings.ts
│   │   └── workflows.ts
│   ├── core/              # Core functionality
│   │   ├── api.ts         # API client
│   │   └── filesystem.ts  # File system operations
│   ├── types/             # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── cli.ts
│   │   ├── config.ts
│   │   └── index.ts
│   └── utils/             # Utility functions
│       └── colors.ts
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project metadata
```

## Coding Standards

### TypeScript Guidelines

- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use proper type annotations
- Avoid `any` types when possible
- Use barrel exports in `/types/index.ts`

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use trailing commas in multi-line objects/arrays
- Use descriptive variable and function names

### File Organization

- Keep files focused on single responsibilities
- Use the existing modular structure
- Place types in `/types/` directory
- Use path mapping (`@/types`) for clean imports

### Error Handling

- Use proper error types
- Provide meaningful error messages
- Handle edge cases gracefully
- Use try-catch blocks for async operations

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-new-command-type`
- `fix/mcp-server-loading-issue`
- `docs/update-api-documentation`
- `refactor/simplify-cli-structure`

### Commit Messages

Follow conventional commit format:
```
type(scope): description

Examples:
feat(cli): add new command search functionality
fix(mcp): resolve server configuration loading
docs(readme): update installation instructions
refactor(api): simplify command fetching logic
```

### Adding New Features

1. **Command Modules**: Create new files in `/src/commands/`
2. **Types**: Add type definitions in `/src/types/`
3. **API Changes**: Update `swagger.yaml` if adding API endpoints
4. **CLI Integration**: Update main CLI to include new functionality

### Modifying Existing Features

1. Understand the current implementation
2. Check for breaking changes
3. Update related documentation
4. Test thoroughly

## Testing

### Manual Testing

```bash
# Build and link
npm run build && npm link

# Test basic functionality
claude-cmd --help
claude-cmd list
claude-cmd search git

# Test interactive mode
claude-cmd
```

### Command Development

#### Adding New Commands

1. **Create command file**: Add a new `.md` file in the `commands/` directory
2. **Use YAML frontmatter** for metadata:
   ```yaml
   ---
   name: \"Command Name\"
   description: \"Command description\"
   author: \"Your Name\"
   tags: [\"tag1\", \"tag2\"]
   ---
   ```
3. **Generate commands.json**: Run `npm run parse-commands`
4. **Test locally**: Use `claude-cmd --local search` and `--local install`

#### Command Structure

Commands use a **filePath-based architecture** for optimal package size:
- `commands.json` contains metadata only (76kB vs 2.4MB)
- Individual `.md` files contain command content
- Content is fetched dynamically during installation
- Supports both local development and remote GitHub sources

### Testing Checklist

- [ ] CLI starts without errors
- [ ] Help text displays correctly
- [ ] All menu options work
- [ ] File operations work correctly
- [ ] Error handling works properly
- [ ] No TypeScript compilation errors

## Submitting Changes

### Pull Request Process

1. **Ensure your code follows the coding standards**
2. **Update documentation** if needed
3. **Test your changes thoroughly**
4. **Create a pull request** with:
   - Clear title and description
   - List of changes made
   - Screenshots/examples if applicable
   - Reference any related issues

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
- [ ] Manual testing completed
- [ ] No TypeScript errors
- [ ] CLI functionality verified

## Checklist
- [ ] Code follows project coding standards
- [ ] Documentation updated if needed
- [ ] Changes tested thoroughly
```

## Release Process

### Version Management

- Follow semantic versioning (semver)
- Update version in `package.json`
- Create release notes
- Tag releases in Git

### Release Checklist

1. Update version number
2. Update CHANGELOG.md
3. Build and test
4. Create Git tag
5. Publish to npm
6. Create GitHub release

## Getting Help

### Resources

- **Repository**: https://github.com/kiliczsh/claude-cmd
- **Issues**: https://github.com/kiliczsh/claude-cmd/issues
- **Discussions**: Use GitHub Discussions for questions

### Contact

- Create an issue for bugs or feature requests
- Use discussions for general questions
- Check existing issues before creating new ones

## Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow GitHub's community guidelines

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions

Thank you for contributing to claude-cmd! 🚀 