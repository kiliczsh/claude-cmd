import { input, select, confirm } from '@inquirer/prompts';
import { colorize } from '../utils/colors';
import { FileSystemManager } from '../core/filesystem';
import { ClaudeCommandAPI } from '../core/api';
import { Command } from '@/types';

export class CommandManager {
  constructor(
    private fs: FileSystemManager,
    private api: ClaudeCommandAPI
  ) {}

  private async fetchFileContent(filePath: string): Promise<string | null> {
    try {
      // For now, try to load from local commands directory first
      const localPath = `commands/${filePath}`;
      if (this.fs.fileExists(localPath)) {
        return this.fs.readFile(localPath);
      }
      
      // If not local, construct GitHub raw URL from the commands.json URL
      // Default URL is: https://raw.githubusercontent.com/kiliczsh/claude-cmd/main/commands/commands.json
      // We want: https://raw.githubusercontent.com/kiliczsh/claude-cmd/main/commands/{filePath}
      const commandsUrl = 'https://raw.githubusercontent.com/kiliczsh/claude-cmd/main/commands/commands.json';
      const baseUrl = commandsUrl.replace('/commands.json', '');
      const fileUrl = `${baseUrl}/${filePath}`;
      
      const response = await fetch(fileUrl);
      if (response.ok) {
        return await response.text();
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching file content:', error);
      return null;
    }
  }

  private isCommandInstalled(commandId: string): boolean {
    const installedCommands = this.fs.listInstalledCommands();
    return installedCommands.some(file => 
      file === `${commandId}.md` || 
      file.startsWith(`${commandId}/`) ||
      file.includes(`/${commandId}.md`)
    );
  }

  async listInstalledCommands(): Promise<void> {
    console.log(`\n${colorize.highlight('📋 Installed Commands')}`);
    
    const commands = this.fs.listInstalledCommands();
    
    if (commands.length === 0) {
      console.log(colorize.warning('📭 No commands installed yet.'));
      return;
    }
    
    // Group and display commands in tree structure
    const tree = this.buildCommandTree(commands);
    this.displayCommandTree(tree);
    
    console.log(`\n${colorize.info(`Total: ${commands.length} commands installed`)}`);
  }

  private buildCommandTree(commands: string[]): { [key: string]: string[] } {
    const tree: { [key: string]: string[] } = {};
    
    commands.forEach(file => {
      const cleanFile = file.replace('.md', '');
      
      if (cleanFile.includes('/')) {
        const parts = cleanFile.split('/');
        const folder = parts[0];
        const command = parts[parts.length - 1];
        
        if (!tree[folder]) {
          tree[folder] = [];
        }
        tree[folder].push(command);
      } else {
        if (!tree['_root']) {
          tree['_root'] = [];
        }
        tree['_root'].push(cleanFile);
      }
    });
    
    return tree;
  }

  private displayCommandTree(tree: { [key: string]: string[] }): void {
    let counter = 1;
    
    // Display root commands first
    if (tree['_root']) {
      tree['_root'].sort().forEach(command => {
        console.log(`${colorize.success('✓')} ${counter}. ${command}`);
        counter++;
      });
    }
    
    // Display folders and their commands
    Object.keys(tree).sort().forEach(folder => {
      if (folder === '_root') return;
      
      console.log(`\n📁 ${folder}/`);
      tree[folder].sort().forEach(command => {
        console.log(`  ${colorize.success('✓')} ${counter}. ${command}`);
        counter++;
      });
    });
  }

  async listAvailableCommands(): Promise<void> {
    console.log(`\n${colorize.highlight('📋 Available Commands')}`);
    
    try {
      const results = await this.api.getCommands();
      
      if (!results || !results.data || results.data.length === 0) {
        console.log(colorize.warning('📭 No commands available.'));
        return;
      }
      
      console.log(`\n${colorize.success(`Found ${results.data.length} command(s):`)}`);
      results.data.forEach((command, index) => {
        const isInstalled = this.isCommandInstalled(command.id);
        const status = isInstalled ? colorize.success('✓') : colorize.dim('○');
        console.log(`\n${status} ${colorize.bold(`${index + 1}. ${command.name}`)}`);
        if (command.description) {
          console.log(`   ${command.description}`);
        }
        if (command.author) {
          console.log(`   ${colorize.dim(`Author: ${command.author}`)}`);
        }
        if (command.tags) {
          console.log(`   ${colorize.dim(`Tags: ${command.tags.join(', ')}`)}`);
        }
      });
      
      console.log(`\n${colorize.info(`Total: ${results.data.length} commands available`)}`);
    } catch (error) {
      console.log(colorize.error(`Failed to fetch commands: ${(error as Error).message}`));
    }
  }

  async searchAndInstallCommands(): Promise<void> {
    const query = await input({
      message: '🔍 Enter search query:',
      validate: (input) => input.trim() !== '' || 'Please enter a search query'
    });

    await this.searchWithPagination(query);
  }

  private async searchWithPagination(query: string, page: number = 0): Promise<void> {
    const limit = 10;
    const offset = page * limit;
    
    console.log(`\n${colorize.info(`Searching for: "${query}"...`)}`);
    
    try {
      const results = await this.api.getCommands({ q: query, limit, offset });
      
      if (!results || !results.data || results.data.length === 0) {
        if (page === 0) {
          console.log(colorize.warning(`📭 No commands found matching '${query}'.`));
        } else {
          console.log(colorize.warning(`📭 No more commands found.`));
        }
        return;
      }
      
      const { data: commands, pagination } = results;
      const currentPage = Math.floor(offset / limit) + 1;
      const totalPages = Math.ceil((pagination?.total || 0) / limit);
      
      console.log(`\n${colorize.success(`✓ Found ${pagination?.total || 0} command(s) total | Page ${currentPage} of ${totalPages}:`)}`);
      commands.forEach((command, index) => {
        const isInstalled = this.isCommandInstalled(command.id);
        const status = isInstalled ? colorize.success('✓') : colorize.dim('○');
        const displayNumber = offset + index + 1;
        console.log(`\n${status} ${colorize.bold(`${displayNumber}. ${command.name}`)}`);
        if (command.description) {
          console.log(`   ${command.description}`);
        }
        if (command.author) {
          console.log(`   ${colorize.dim(`Author: ${command.author}`)}`);
        }
        if (command.tags) {
          console.log(`   ${colorize.dim(`Tags: ${command.tags.join(', ')}`)}`);
        }
        if (isInstalled) {
          console.log(`   ${colorize.success('Already installed')}`);
        }
      });
      
      await this.handleSearchNavigation(query, commands, pagination, page);

    } catch (error) {
      console.log(colorize.error(`Search failed: ${(error as Error).message}`));
    }
  }

  private async handleSearchNavigation(query: string, commands: Command[], pagination: any, currentPage: number): Promise<void> {
    const choices = [
      { name: '📦 Install a command from these results', value: 'install' }
    ];
    
    if (pagination.has_previous) {
      choices.push({ name: '⬅️ Previous page', value: 'previous' });
    }
    
    if (pagination.has_next) {
      choices.push({ name: '➡️ Next page', value: 'next' });
    }
    
    if (pagination.total > 20) {
      choices.push({ name: '🔢 Go to specific page', value: 'goto' });
    }
    
    choices.push({ name: '🔍 New search', value: 'new_search' });
    choices.push({ name: '← Back to main menu', value: 'back' });

    const action = await select<string>({
      message: 'What would you like to do?',
      choices: choices
    });

    switch (action) {
      case 'install':
        await this.installFromSearchResults(commands);
        break;
      case 'previous':
        await this.searchWithPagination(query, currentPage - 1);
        break;
      case 'next':
        await this.searchWithPagination(query, currentPage + 1);
        break;
      case 'goto':
        await this.goToPage(query, pagination);
        break;
      case 'new_search':
        await this.searchAndInstallCommands();
        break;
      case 'back':
        return;
    }
  }

  private async goToPage(query: string, pagination: any): Promise<void> {
    const totalPages = Math.ceil(pagination.total / 10);
    const pageInput = await input({
      message: `Enter page number (1-${totalPages}):`,
      validate: (input) => {
        const page = parseInt(input);
        if (isNaN(page) || page < 1 || page > totalPages) {
          return `Please enter a number between 1 and ${totalPages}`;
        }
        return true;
      }
    });
    
    const page = parseInt(pageInput) - 1; // Convert to 0-based
    await this.searchWithPagination(query, page);
  }

  async installFromSearchResults(commands: Command[]): Promise<void> {
    const choices = commands.map(cmd => ({
      name: `${cmd.name} - ${cmd.description || 'No description'}`,
      value: cmd.id
    }));

    choices.push({ name: '← Back to main menu', value: 'back' });

    const selectedCommand = await select<string>({
      message: '📦 Select a command to install:',
      choices: choices
    });

    if (selectedCommand !== 'back') {
      await this.installSpecificCommand(selectedCommand);
    }
  }

  async installCommand(): Promise<void> {
    const command = await input({
      message: '📦 Enter command name to install:',
      validate: (input) => input.trim() !== '' || 'Please enter a command name'
    });

    await this.installSpecificCommand(command.trim());
  }

  async installSpecificCommand(commandName: string): Promise<boolean> {
    console.log(`\n${colorize.info(`Installing command: ${commandName}...`)}`);
    
    try {
      const commandData = await this.api.getCommand(commandName);
      
      if (!commandData || !commandData.filePath) {
        console.log(colorize.error(`Command '${commandName}' not found or has no file path.`));
        return false;
      }
      
      this.fs.ensureClaudeDirectory();
      
      // Use command ID as-is - don't add extra categorization
      const fileName = commandData.filename || `${commandName}.md`;
      const existingCommands = this.fs.listInstalledCommands();
      
      if (existingCommands.includes(fileName)) {
        const overwrite = await confirm({
          message: `Command '${commandName}' already exists. Overwrite?`,
          default: false
        });
        
        if (!overwrite) {
          console.log(colorize.info('Installation cancelled'));
          return false;
        }
      }
      
      // Fetch content from filePath
      const content = await this.fetchFileContent(commandData.filePath);
      if (!content) {
        console.log(colorize.error(`Failed to fetch content for command '${commandName}'.`));
        return false;
      }
      
      this.fs.saveCommand(fileName, content);
      console.log(colorize.success(`Successfully installed command '${commandName}'`));
      
      if (commandData.description) {
        console.log(colorize.info(`Description: ${commandData.description}`));
      }
      
      return true;

    } catch (error) {
      console.log(colorize.error(`Failed to install command: ${(error as Error).message}`));
      return false;
    }
  }

  async deleteCommand(): Promise<void> {
    const files = this.fs.listInstalledCommands();
    
    if (files.length === 0) {
      console.log(colorize.warning('📭 No commands to delete.'));
      return;
    }

    const choices = files.map(file => ({ name: file, value: file }));
    choices.push({ name: '← Cancel', value: 'cancel' });

    const selectedFile = await select<string>({
      message: '🗑️  Select a command to delete:',
      choices: choices
    });

    if (selectedFile === 'cancel') {
      return;
    }

    const confirmDelete = await confirm({
      message: `Are you sure you want to delete '${selectedFile}'?`,
      default: false
    });

    if (confirmDelete) {
      try {
        this.fs.deleteCommand(selectedFile);
        console.log(colorize.success(`Successfully deleted '${selectedFile}'`));
      } catch (error) {
        console.log(colorize.error(`Failed to delete '${selectedFile}': ${(error as Error).message}`));
      }
    }
  }
} 