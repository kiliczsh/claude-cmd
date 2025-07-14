import { input, select } from '@inquirer/prompts';
import { colorize } from '../utils/colors';
import { FileSystemManager } from '../core/filesystem';
import { SettingsAction } from '@/types';

export class SettingsManager {
  constructor(private fs: FileSystemManager) {}

  async handleSettings(): Promise<void> {
    console.log(`\n${colorize.highlight('⚙️ Settings & Configuration')}`);
    
    const action = await select<SettingsAction>({
      message: 'What would you like to do?',
      choices: [
        { name: '📋 View current settings', value: 'view' },
        { name: '🔙 Back to main menu', value: 'back' }
      ]
    });

    switch (action) {
      case 'view':
        const config = this.fs.getClaudeConfig();
        const envOverride = process.env.CLAUDE_CMD_URL;
        const defaultUrl = 'https://raw.githubusercontent.com/kiliczsh/claude-cmd/main/commands/commands.json';
        const effectiveSource = envOverride || defaultUrl;
        
        console.log(`\n${colorize.highlight('📋 Current Settings:')}`);
        console.log(`
${colorize.bold('General:')}
• Version: ${config.version || 'unknown'}
• Last Updated: ${config.lastUpdated || 'never'}
• Security Profile: ${config.securityProfile || colorize.warning('not set')}

${colorize.bold('Commands Repository:')}
• Commands Source: ${effectiveSource}
${envOverride ? colorize.info('  📍 Using environment variable override') : ''}
• Default URL: ${colorize.dim(defaultUrl)}
• Override with: ${colorize.dim('CLAUDE_CMD_URL environment variable or --local flag')}

${colorize.bold('Tools & Permissions:')}
• Allowed Tools: ${config.allowedTools?.length || 0} configured
• File System Access: ${config.fileSystemAccess || 'default'}
• Network Access: ${config.networkAccess || 'default'}

${colorize.bold('File Locations:')}
• Commands: ~/.claude/commands/
• Configuration: ~/.claude/settings.json

${colorize.bold('Manual Configuration:')}
• Edit settings directly: ~/.claude/settings.json
• Reset all settings: Delete ~/.claude/settings.json
• Backup settings: Copy ~/.claude/ directory
`);
        break;
        
    }
    
    if (action !== 'back' && action !== 'view') {
      await input({ message: 'Press Enter to continue...' });
    }
  }

} 