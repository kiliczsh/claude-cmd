import { colorize } from '../utils/colors';
import { FileSystemManager } from '../core/filesystem';
import { MenuNavigator, NavigationUtils } from '../utils/navigation';
import * as path from 'path';
import * as os from 'os';

interface LocalMCPServer {
  name: string;
  command: string;
  args?: string[];
  cwd?: string;
  env?: Record<string, string>;
}

interface MCPConfig {
  mcpServers?: Record<string, LocalMCPServer>;
}

export class MCPManager {
  private navigator: MenuNavigator;
  
  constructor(private fs: FileSystemManager) {
    this.navigator = new MenuNavigator();
  }

  async handleMCPMenu(): Promise<void> {
    this.navigator.enterMenu('MCP Servers');
    
    while (true) {
      console.log(`\n${colorize.highlight('☁️ Local MCP Servers')}`);
      
      const action = await NavigationUtils.enhancedSelect<'view' | 'back'>({
        message: 'What would you like to do?',
        choices: [
          { name: '📋 View MCP servers', value: 'view' },
          { name: this.navigator.getBackButtonText(), value: 'back' }
        ],
        allowEscBack: true
      });

      switch (action) {
        case 'view':
          await this.showMCPServers();
          await this.navigator.pauseForUser();
          break;
        case 'back':
          this.navigator.exitMenu();
          return;
      }
    }
  }

  private async showMCPServers(): Promise<void> {
    try {
      const mcpServers = this.getLocalMCPServers();
      
      console.log(`\n${colorize.highlight('📋 Installed MCP Servers:')}`);
      
      if (mcpServers.length === 0) {
        console.log(colorize.warning('No MCP servers configured locally.'));
        console.log(`\n${colorize.info('💡 To configure MCP servers:')}`);
        console.log(`   1. Create/edit: ${colorize.dim('~/.claude/.mcp.json')}`);
        console.log(`   2. Or use Claude Code settings to configure MCP servers`);
        console.log(`   3. Restart Claude Code to load new configurations`);
      } else {
        mcpServers.forEach((server, index) => {
          console.log(`\n${colorize.bold(`${index + 1}. ${server.name}`)}`);
          console.log(`   ${colorize.dim(`Command: ${server.command}`)}`);
          if (server.args && server.args.length > 0) {
            console.log(`   ${colorize.dim(`Args: ${server.args.join(' ')}`)}`);
          }
          if (server.cwd) {
            console.log(`   ${colorize.dim(`Working Directory: ${server.cwd}`)}`);
          }
        });
      }
      
      console.log(`\n${colorize.info('💡 MCP servers provide tools and resources for Claude through standardized protocols.')}`);
      console.log(`${colorize.info('📖 Learn more: https://docs.anthropic.com/en/docs/claude-code/settings')}`);
    } catch (error) {
      console.log(colorize.error(`Failed to read MCP configuration: ${(error as Error).message}`));
    }
  }

  private getLocalMCPServers(): LocalMCPServer[] {
    const servers: LocalMCPServer[] = [];
    
    // Check various possible MCP configuration locations
    const configPaths = [
      path.join(os.homedir(), '.claude', '.mcp.json'),
      path.join(os.homedir(), '.mcp.json'),
      path.join(process.cwd(), '.mcp.json'),
      // Claude Code specific locations might vary
      path.join(os.homedir(), 'Library', 'Application Support', 'Claude Code', 'mcp.json'),
      path.join(os.homedir(), '.config', 'claude-code', 'mcp.json')
    ];

    for (const configPath of configPaths) {
      try {
        if (this.fs.fileExists(configPath)) {
          const configContent = this.fs.readFile(configPath);
          const config: MCPConfig = JSON.parse(configContent);
          
          if (config.mcpServers) {
            for (const [name, serverConfig] of Object.entries(config.mcpServers)) {
              servers.push({
                ...serverConfig,
                name
              });
            }
          }
        }
      } catch (error) {
        // Silently continue to next config file if this one fails
        console.log(colorize.dim(`Note: Could not read ${configPath}`));
      }
    }

    return servers;
  }
} 