import { checkbox } from '@inquirer/prompts';
import { colorize } from '../utils/colors';
import { ClaudeMdManager } from './claudemd';
import { PermissionsManager } from './permissions';

export class ProjectManager {
  constructor(
    private claudeMd: ClaudeMdManager,
    private permissions: PermissionsManager
  ) {}

  async initializeProject(): Promise<void> {
    console.log(`\n${colorize.highlight('🚀 Project Initialization')}`);
    
    const detectedType = this.claudeMd.detectProjectType();
    console.log(colorize.info(`Detected project type: ${detectedType}`));
    
    const actions = await checkbox({
      message: 'What would you like to set up?',
      choices: [
        { name: 'Create CLAUDE.md configuration', value: 'claudemd', checked: true },
        { name: 'Set up basic permissions', value: 'permissions' }
      ]
    });

    if (actions.includes('claudemd')) {
      await this.claudeMd.createClaudeMd(detectedType);
    }

    if (actions.includes('permissions')) {
      await this.permissions.setupBasicPermissions();
    }

    console.log(colorize.success('🎉 Project initialization complete!'));
    console.log(colorize.info('💡 Use the Commands menu to install or create custom commands'));
  }
} 