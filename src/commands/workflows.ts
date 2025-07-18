import { colorize } from '../utils/colors';
import { WorkflowAction } from '@/types';
import { MenuNavigator, NavigationUtils } from '../utils/navigation';

export class WorkflowManager {
  private navigator: MenuNavigator;
  
  constructor() {
    this.navigator = new MenuNavigator();
  }
  
  async handleWorkflows(): Promise<void> {
    this.navigator.enterMenu('Command & Workflow Creation');
    
    while (true) {
      console.log(`\n${colorize.highlight('🔄 Command & Workflow Creation')}`);
      
      const action = await NavigationUtils.enhancedSelect<WorkflowAction>({
        message: 'What would you like to learn about?',
        choices: [
          { name: '📋 Command creation guide', value: 'templates' },
          { name: '📖 Best practices', value: 'practices' },
          { name: this.navigator.getBackButtonText(), value: 'back' }
        ],
        allowEscBack: true
      });

      switch (action) {
      case 'templates':
        console.log(`${colorize.highlight('\n📋 Creating Custom Commands:')}`);
        console.log(`
${colorize.bold('Command Structure:')}
• Each command is a .md file in ~/.claude/commands/
• Use YAML frontmatter for metadata
• Commands become available via / menu in Claude

${colorize.bold('Using $ARGUMENTS:')}
• Use $ARGUMENTS placeholder for parameter passing
• Example: "Analyze the following code: $ARGUMENTS"
• Claude will prompt for input when command is used

${colorize.bold('Example Command File:')}
---
name: "Code Review"
description: "Perform systematic code review"
author: "Your Name"
tags: ["review", "quality"]
---

# Code Review Template

Please perform a comprehensive code review of: $ARGUMENTS

Focus on:
- Code quality and readability
- Potential bugs or issues  
- Performance considerations
- Best practices adherence

${colorize.bold('Common Workflow Commands:')}
• Bug Investigation
• Feature Planning
• Code Review Checklist
• Testing Strategy
• Documentation Generation
`);
        break;
        
      case 'practices':
        console.log(`${colorize.highlight('\n📚 Command Creation Best Practices:')}`);
        console.log(`
${colorize.bold('1. Clear Purpose:')}
   • Give commands specific, focused purposes
   • Use descriptive names and descriptions
   • Add relevant tags for discoverability

${colorize.bold('2. Flexible Parameters:')}
   • Use $ARGUMENTS for input flexibility
   • Provide clear instructions on what to pass
   • Consider different use cases

${colorize.bold('3. Organization:')}
   • Create commands for repeated tasks
   • Share useful commands with your team
   • Keep commands updated and relevant

${colorize.bold('4. Documentation:')}
   • Include usage examples in commands
   • Document expected input formats
   • Add author and version information
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