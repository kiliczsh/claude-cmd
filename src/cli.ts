import { colorize, emoji } from './utils/colors';
import { getAppNameWithVersion } from './utils/version';
import { FileSystemManager } from './core/filesystem';
import { ClaudeCommandAPI } from './core/api';
import { ClaudeMdManager } from './commands/claudemd';
import { CommandManager } from './commands/command-manager';
import { SubAgentManager } from './commands/sub-agent-manager';
import { PermissionsManager } from './commands/permissions';
import { MCPManager } from './commands/mcp';
import { WorkflowManager } from './commands/workflows';
import { SettingsManager } from './commands/settings';
import { HelpManager } from './commands/help';
import { ProjectManager } from './commands/project';
import { MenuAction, MenuChoice, SubAgentAction } from './types';
import { globalNavigator, NavigationUtils } from './utils/navigation';

export class ClaudeCommandCLI {
  private fs: FileSystemManager;
  private api: ClaudeCommandAPI;
  private claudeMd: ClaudeMdManager;
  private commandManager: CommandManager;
  private subAgentManager: SubAgentManager;
  private permissionsManager: PermissionsManager;
  private mcpManager: MCPManager;
  private workflowManager: WorkflowManager;
  private settingsManager: SettingsManager;
  private helpManager: HelpManager;
  private projectManager: ProjectManager;

  constructor() {
    this.fs = new FileSystemManager();
    // Use environment variable if set (for --local flag or CLAUDE_CMD_URL), otherwise use default URL
    const commandsUrl = process.env.CLAUDE_CMD_URL || 'https://raw.githubusercontent.com/kiliczsh/claude-cmd/refs/heads/main/commands/commands.json';
    this.api = new ClaudeCommandAPI(commandsUrl);
    this.claudeMd = new ClaudeMdManager(this.fs);
    this.commandManager = new CommandManager(this.fs, this.api);
    this.subAgentManager = new SubAgentManager(this.fs, this.api);
    this.permissionsManager = new PermissionsManager(this.fs);
    this.mcpManager = new MCPManager(this.fs);
    this.workflowManager = new WorkflowManager();
    this.settingsManager = new SettingsManager(this.fs);
    this.helpManager = new HelpManager();
    this.projectManager = new ProjectManager(this.claudeMd, this.permissionsManager);
  }

  showWelcome(): void {
    console.log(`${colorize.highlight(`
 ██████┐██┐      █████┐ ██┐   ██┐██████┐ ███████┐     ██████┐███╗   ███╗██████╗ 
██┌────┘██│     ██┌──██┐██│   ██│██┌──██┐██┌────┘    ██┌────┘████╗ ████║██┌──██┐
██│     ██│     ███████│██│   ██│██│  ██│█████┐      ██│     ██╔████╔██║██│  ██│
██│     ██│     ██┌──██│██│   ██│██│  ██│██┌──┘      ██│     ██║╚██╔╝██║██│  ██│
└██████┐███████┐██│  ██│└██████┌┘██████┌┘███████┐    └██████┐██║ ╚═╝ ██║██████┌┘
 └─────┘└──────┘└─┘  └─┘ └─────┘ └─────┘ └──────┘     └─────┘└─┘     └─┘└─────┘ 

        ${getAppNameWithVersion()}
        
        Created by Muhammed Kılıç (@kiliczsh)`)}`);
  }

  async mainMenu(): Promise<void> {
    // Reset navigation to ensure we start fresh
    globalNavigator.resetNavigation();
    
    while (true) {
      // Show breadcrumb if we're in a submenu context
      if (globalNavigator.getCurrentPath().length > 0) {
        globalNavigator.displayBreadcrumb();
      }
      
      const action = await NavigationUtils.enhancedSelect<MenuAction>({
        message: 'What would you like to do?',
        choices: [
          { name: `${emoji.list} List installed commands`, value: 'list' },
          { name: `${emoji.search} Search & install commands`, value: 'search' },
          { name: `${emoji.install} Install specific command`, value: 'install' },
          { name: `${emoji.delete} Delete command`, value: 'delete' },
          { name: `🤖 Manage Sub-Agents`, value: 'subagents' },
          { name: `🔍 Search & Install Sub-Agents`, value: 'search_subagents' },
          { name: '--- Configuration ---', value: '--- Configuration ---' },
          { name: `${emoji.config} CLAUDE.md Management`, value: 'claudemd' },
          { name: `${emoji.key} Project Initialization`, value: 'init' },
          { name: `${emoji.lock} Permissions & Security`, value: 'permissions' },
          { name: '--- Advanced ---', value: '--- Advanced ---' },
          { name: `${emoji.cloud} MCP Servers`, value: 'mcp' },
          { name: `${emoji.star} Commands`, value: 'workflows' },
          { name: `${emoji.gear} Settings`, value: 'settings' },
          { name: '--- Help ---', value: '--- Help ---' },
          { name: `${emoji.help} Help & Documentation`, value: 'help' },
          { name: `${emoji.exit} Exit`, value: 'exit' }
        ] as MenuChoice[],
        pageSize: 15,
        allowEscBack: false  // Main menu doesn't need ESC back
      });

      console.log(''); // Add spacing

      try {
        switch (action) {
          case 'list':
            await this.commandManager.listInstalledCommands();
            await globalNavigator.pauseForUser();
            break;
            
          case 'search':
            await this.commandManager.searchAndInstallCommands();
            break;
            
          case 'install':
            await this.commandManager.installCommand();
            await globalNavigator.pauseForUser();
            break;
            
          case 'delete':
            await this.commandManager.deleteCommand();
            await globalNavigator.pauseForUser();
            break;
            
          case 'claudemd':
            await this.claudeMd.handleClaudeMdMenu();
            break;
            
          case 'init':
            await this.projectManager.initializeProject();
            await globalNavigator.pauseForUser();
            break;
            
          case 'permissions':
            await this.permissionsManager.handlePermissions();
            break;
            
          case 'mcp':
            await this.mcpManager.handleMCPMenu();
            break;
            
          case 'subagents':
            await this.handleSubAgentsMenu();
            break;
            
          case 'search_subagents':
            await this.subAgentManager.searchAndInstallSubAgents();
            break;
            
          case 'workflows':
            await this.workflowManager.handleWorkflows();
            break;
            
          case 'settings':
            await this.settingsManager.handleSettings();
            break;
            
          case 'help':
            await this.helpManager.showHelp();
            break;
            
          case 'exit':
            console.log(colorize.success('👋 Thank you for using Claude CMD!'));
            process.exit(0);
            break;
            
          case '--- Configuration ---':
          case '--- Advanced ---':
          case '--- Help ---':
          case '':
            // Ignore separator selections
            break;
        }
      } catch (error) {
        console.log(colorize.error(`An error occurred: ${(error as Error).message}`));
        await globalNavigator.pauseForUser();
      }

      // Clear screen and show welcome again for navigation
      if (!action.startsWith('---') && action !== '') {
        NavigationUtils.clearScreenWithWelcome(() => this.showWelcome());
      }
    }
  }

  async handleSubAgentsMenu(): Promise<void> {
    globalNavigator.enterMenu('Manage Sub-Agents');
    
    while (true) {
      globalNavigator.displayBreadcrumb();
      
      const action = await NavigationUtils.enhancedSelect<SubAgentAction>({
        message: 'Sub-Agent Management',
        choices: [
          { name: '📋 List installed sub-agents', value: 'list' },
          { name: '✨ Create new sub-agent', value: 'create' },
          { name: '✏️ Edit sub-agent', value: 'edit' },
          { name: '🗑️ Delete sub-agent', value: 'delete' },
          { name: '🔍 Validate sub-agent', value: 'validate' },
          { name: '← Back to main menu', value: 'back' }
        ],
        allowEscBack: true
      });

      console.log(''); // Add spacing

      try {
        switch (action) {
          case 'list':
            await this.subAgentManager.listInstalledSubAgents();
            await globalNavigator.pauseForUser();
            break;

          case 'create':
            await this.subAgentManager.createSubAgent();
            break;

          case 'edit':
            await this.subAgentManager.editSubAgent();
            break;

          case 'delete':
            await this.subAgentManager.deleteSubAgent();
            break;

          case 'validate':
            await this.subAgentManager.validateSubAgent();
            await globalNavigator.pauseForUser();
            break;

          case 'back':
          case 'cancel':
          case 'main_menu':
            globalNavigator.exitMenu();
            return;

          default:
            console.log(colorize.warning('Invalid option selected'));
            break;
        }
      } catch (error) {
        console.log(colorize.error(`Error: ${(error as Error).message}`));
        await globalNavigator.pauseForUser();
      }
    }
  }

} 