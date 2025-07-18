import { colorize } from '../utils/colors';
import { HelpAction } from '@/types';
import { MenuNavigator, NavigationUtils } from '../utils/navigation';

export class HelpManager {
  private navigator: MenuNavigator;
  
  constructor() {
    this.navigator = new MenuNavigator();
  }
  
  async showHelp(): Promise<void> {
    this.navigator.enterMenu('Help & Documentation');
    
    while (true) {
      console.log(`\n${colorize.highlight('📚 Help & Documentation')}`);
      
      const action = await NavigationUtils.enhancedSelect<HelpAction>({
        message: 'What would you like to learn about?',
        choices: [
          { name: '📖 General Help & Overview', value: 'overview' },
          { name: '🚀 Quick Start Guide', value: 'quickstart' },
          { name: '📁 File Locations & Structure', value: 'files' },
          { name: '⌨️ Command Line Usage', value: 'cli' },
          { name: this.navigator.getBackButtonText(), value: 'back' }
        ],
        allowEscBack: true
      });

      switch (action) {
      case 'overview':
        console.log(`${colorize.highlight('\n📖 Claude CMD v1.0 Overview')}`);
        console.log(`
${colorize.bold('Purpose:')}
This tool helps you manage Claude commands, configurations, and development workflows
following Anthropic's Claude Code best practices.

${colorize.bold('Key Features:')}
• Command Management - Install, search, and manage Claude commands
• CLAUDE.md Files - Create and manage project configurations  
• Custom Commands - Create commands with $ARGUMENTS support
• Project Init - Set up Claude environment for any project
• Security - Manage permissions and tool allowlists

${colorize.bold('Benefits:')}
• Standardized Claude development environment
• Team collaboration and configuration sharing
• Custom command creation for repeated tasks
• Security and permission management
• Best practice enforcement

${colorize.dim('Created by Muhammed Kılıç (@kiliczsh)')}
`);
        break;
        
      case 'quickstart':
        console.log(`${colorize.highlight('\n🚀 Quick Start Guide')}`);
        console.log(`
${colorize.bold('Step 1: Initialize Your Project')}
Run 'Project Initialization' from the main menu to:
• Detect your project type (Node.js, React, Python, etc.)
• Create appropriate CLAUDE.md file
• Set up basic security profile

${colorize.bold('Step 2: Customize Your Setup')}
• Edit CLAUDE.md for project-specific instructions
• Create custom commands with $ARGUMENTS for workflows
• Install useful commands from the command repository
• Configure security settings

${colorize.bold('Step 3: Start Using Claude')}
• Use custom commands via / menu in Claude conversations
• Reference your CLAUDE.md for context
• Install new commands as needed
• Share configurations with your team

${colorize.bold('Pro Tips:')}
• Commands in ~/.claude/commands/ become available via / menu
• Use $ARGUMENTS in commands for parameter passing
• Keep CLAUDE.md updated with project changes
• Regular security audits with permissions menu
`);
        break;
        
      case 'files':
        console.log(`${colorize.highlight('\n📁 File Locations & Structure')}`);
        console.log(`
${colorize.bold('Global Claude Directory: ~/.claude/')}
• commands/           - All Claude commands (installed + custom)
• settings.json       - Global configuration

${colorize.bold('Project Files:')}
• CLAUDE.md          - Main project instructions for Claude
• CLAUDE.local.md    - Local overrides (gitignored)
• .claude/           - Project-specific configurations

${colorize.bold('Command Structure:')}
• Each command is a .md file with metadata
• YAML frontmatter for command info
• Markdown content for instructions
• Use $ARGUMENTS placeholder for parameter passing
• Commands become available via / menu in Claude
`);
        break;
        
      case 'cli':
        console.log(`${colorize.highlight('\n⌨️ Command Line Usage')}`);
        console.log(`
${colorize.bold('Interactive Mode (Recommended):')}
• claude-cmd                    - Launch full interactive interface

${colorize.bold('Direct Commands:')}
• claude-cmd install <id>       - Install specific command by ID
• claude-cmd list               - List all installed commands  
• claude-cmd search <query>     - Search available commands
• claude-cmd delete <id>        - Remove installed command
• claude-cmd --help             - Show basic help

${colorize.bold('Examples:')}
• claude-cmd install 1          - Install command #1
• claude-cmd search "git"       - Find git-related commands
• claude-cmd list               - Show what's installed

${colorize.bold('Tips:')}
• Interactive mode offers full feature access
• Direct commands are great for script integration
• Use quotes for multi-word search terms
• Check command IDs with 'list' before installing
`);
        break;
        case 'back':
          this.navigator.exitMenu();
          return;
      }
      
      await this.navigator.pauseForUser();
    }
  }
} 