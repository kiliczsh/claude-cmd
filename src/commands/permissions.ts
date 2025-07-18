import { select } from '@inquirer/prompts';
import { colorize } from '../utils/colors';
import { FileSystemManager } from '../core/filesystem';
import { SecurityProfile, PermissionsAction } from '@/types';
import { MenuNavigator, NavigationUtils } from '../utils/navigation';

export class PermissionsManager {
  private navigator: MenuNavigator;
  
  constructor(private fs: FileSystemManager) {
    this.navigator = new MenuNavigator();
  }

  async handlePermissions(): Promise<void> {
    this.navigator.enterMenu('Permissions & Security');
    
    while (true) {
      console.log(`\n${colorize.highlight('🔒 Permissions & Security Management')}`);
      
      const action = await NavigationUtils.enhancedSelect<PermissionsAction>({
        message: 'What would you like to do?',
        choices: [
          { name: '⚙️ Current security status', value: 'status' },
          { name: '📖 Security best practices', value: 'practices' },
          { name: this.navigator.getBackButtonText(), value: 'back' }
        ],
        allowEscBack: true
      });

      switch (action) {
        case 'status':
          const config = this.fs.getClaudeConfig();
          console.log(`${colorize.highlight('\n🛡️ Current Security Status:')}`);
          console.log(`Security Profile: ${config.securityProfile || colorize.warning('Not configured')}`);
          console.log(`Allowed Tools: ${config.allowedTools?.length || 0} tools configured`);
          console.log(`Last Updated: ${config.lastUpdated || 'Never'}`);
          console.log(`\n${colorize.info('💡 Run Project Initialization to set up basic security')}`);
          await this.navigator.pauseForUser();
          break;
          
        case 'practices':
          console.log(`${colorize.highlight('\n📚 Security Best Practices:')}`);
          console.log(`
${colorize.bold('1. Use Security Profiles:')}
   • Start with 'strict' for sensitive projects
   • Gradually allow more tools as needed

${colorize.bold('2. Regular Reviews:')}
   • Audit allowed tools monthly
   • Remove unused permissions

${colorize.bold('3. Project Isolation:')}
   • Use project-specific CLAUDE.md files
   • Separate personal and work configurations

${colorize.bold('4. Team Coordination:')}
   • Share security configs with team
   • Document security decisions
`);
          await this.navigator.pauseForUser();
          break;
          
        case 'back':
          this.navigator.exitMenu();
          return;
      }
    }
  }

  async setupBasicPermissions(): Promise<void> {
    console.log(`\n${colorize.info('Setting up basic permissions...')}`);
    
    const config = this.fs.getClaudeConfig();
    
    const securityLevel = await select<keyof SecurityProfile>({
      message: 'Choose security level:',
      choices: [
        { name: 'Strict - Manual approval for all actions', value: 'strict' },
        { name: 'Moderate - Allow safe operations', value: 'moderate' },
        { name: 'Permissive - Allow most operations', value: 'permissive' }
      ],
      default: 'moderate'
    });

    const securityProfiles: SecurityProfile = {
      strict: [],
      moderate: ['Edit', 'Bash(git status)', 'Bash(git diff)', 'Bash(npm test)', 'Bash(npm run build)'],
      permissive: ['Edit', 'Bash(git *)', 'Bash(npm *)', 'Bash(yarn *)', 'Bash(python *)', 'Bash(node *)']
    };

    config.securityProfile = securityLevel;
    config.allowedTools = securityProfiles[securityLevel];
    
    this.fs.saveClaudeConfig(config);
    console.log(colorize.success(`Security profile set to: ${securityLevel}`));
  }
} 