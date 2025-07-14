#!/usr/bin/env node

import { ClaudeCommandCLI } from './cli';
import { CommandManager } from './commands/command-manager';
import { FileSystemManager } from './core/filesystem';
import { ClaudeCommandAPI } from './core/api';
import { colorize } from './utils/colors';
import * as path from 'path';

// Configuration constants
const DEFAULT_COMMANDS_URL = 'https://raw.githubusercontent.com/kiliczsh/claude-cmd/main/commands/commands.json';
const LOCAL_COMMANDS_PATH = 'commands/commands.json';

// Command-line interface functions
async function listCommands(): Promise<void> {
  const fs = new FileSystemManager();
  const commandsUrl = process.env.CLAUDE_CMD_URL || DEFAULT_COMMANDS_URL;
  const commandManager = new CommandManager(fs, new ClaudeCommandAPI(commandsUrl));
  await commandManager.listInstalledCommands();
}

async function installCommand(commandName: string): Promise<void> {
  const fs = new FileSystemManager();
  const commandsUrl = process.env.CLAUDE_CMD_URL || DEFAULT_COMMANDS_URL;
  const api = new ClaudeCommandAPI(commandsUrl);
  const commandManager = new CommandManager(fs, api);
  await commandManager.installSpecificCommand(commandName);
}

async function searchCommands(query: string): Promise<void> {
  const commandsUrl = process.env.CLAUDE_CMD_URL || DEFAULT_COMMANDS_URL;
  const api = new ClaudeCommandAPI(commandsUrl);
  
  console.log(`Searching for commands matching: ${query}...`);
  
  try {
    const results = await api.searchCommands(query);
    
    if (!results || !results.commands || results.commands.length === 0) {
      console.log(`No commands found matching '${query}'.`);
      return;
    }
    
    console.log(`Found ${results.commands.length} command(s):`);
    results.commands.forEach(command => {
      console.log(`\n- ${command.name}`);
      if (command.description) {
        console.log(`  ${command.description}`);
      }
      if (command.author) {
        console.log(`  Author: ${command.author}`);
      }
      if (command.tags) {
        console.log(`  Tags: ${command.tags.join(', ')}`);
      }
    });
  } catch (error) {
    console.error(`Search failed: ${(error as Error).message}`);
  }
}

function showHelp(): void {
  console.log(`
claude-cmd - A CLI tool to manage Claude commands

USAGE:
  claude-cmd [OPTIONS] [COMMAND]

OPTIONS:
  -h, --help                    Show this help message
  --local                       Use local commands folder (./commands/commands.json)
  
COMMANDS:
  list                          List all installed Claude command files
  install <command-name>        Install a command from the repository
  search <query>                Search available commands in the repository
  
DESCRIPTION:
  Interactive CLI tool for managing Claude commands, configurations, and workflows.
  Run without arguments to enter interactive mode with full features.

EXAMPLES:
  claude-cmd                    Launch interactive mode (recommended)
  claude-cmd --local            Launch interactive mode with local commands
  claude-cmd list               List all Claude command files
  claude-cmd --local search api Search local commands for 'api'
  claude-cmd install git-helper Install the 'git-helper' command
  claude-cmd --help             Show this help message
`);
}

// Parse command line arguments
const args = process.argv.slice(2);

async function main(): Promise<void> {
  try {
    // Check for --local flag
    const useLocal = args.includes('--local');
    const filteredArgs = args.filter(arg => arg !== '--local');
    
    // If --local flag is present, temporarily override the commandsUrl
    if (useLocal) {
      const fs = new FileSystemManager();
      const localPath = path.join(process.cwd(), LOCAL_COMMANDS_PATH);
      
      // Check if local file exists
      if (!fs.fileExists(localPath)) {
        console.error(colorize.error(`Local commands file not found at: ${localPath}`));
        console.log(colorize.info('Run "npm run parse-commands" to generate it from markdown files.'));
        process.exit(1);
      }
      
      // Temporarily update config for this session
      process.env.CLAUDE_CMD_URL = localPath;
    }
    
    if (filteredArgs.includes('--help') || filteredArgs.includes('-h')) {
      showHelp();
      process.exit(0);
    } else if (filteredArgs.length > 0) {
      // Handle command-line interface
      if (filteredArgs[0] === 'install' && filteredArgs[1]) {
        await installCommand(filteredArgs[1]);
      } else if (filteredArgs[0] === 'list') {
        await listCommands();
      } else if (filteredArgs[0] === 'search' && filteredArgs[1]) {
        await searchCommands(filteredArgs.slice(1).join(' '));
      } else {
        console.error(colorize.error(`Unknown command: ${filteredArgs[0]}`));
        console.log('Run "claude-cmd --help" for usage information or run without arguments for interactive mode.');
        process.exit(1);
      }
    } else {
      // Interactive mode - default behavior
      const cli = new ClaudeCommandCLI();
      console.clear();
      cli.showWelcome();
      await cli.mainMenu();
    }
  } catch (error) {
    console.error(colorize.error(`An error occurred: ${(error as Error).message}`));
    process.exit(1);
  }
}

// Export for programmatic use
export {
  ClaudeCommandCLI
};

// Run if called directly
if (require.main === module) {
  main();
} 