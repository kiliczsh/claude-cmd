import { input, select, confirm, editor } from '@inquirer/prompts';
import { colorize } from '../utils/colors';
import { FileSystemManager } from '../core/filesystem';
import { ClaudeCommandAPI } from '../core/api';
import { SubAgentFrontMatter, SubAgentTemplate, SUB_AGENT_TEMPLATES, DEFAULT_SUB_AGENT_TOOLS, AVAILABLE_TOOLS, Command } from '../types';
import { NavigationUtils } from '../utils/navigation';

export class SubAgentManager {
  constructor(
    private fs: FileSystemManager,
    private api?: ClaudeCommandAPI
  ) {}

  async listInstalledSubAgents(): Promise<void> {
    console.log(`\n${colorize.highlight('🤖 Installed Sub-Agents')}`);
    
    const subAgents = this.fs.listInstalledSubAgents();
    
    if (subAgents.length === 0) {
      console.log(colorize.warning('📭 No sub-agents installed yet.'));
      console.log(colorize.info('💡 Create your first sub-agent to get started!'));
      return;
    }
    
    console.log(`\n${colorize.success(`Found ${subAgents.length} sub-agent(s):`)}`);
    
    subAgents.forEach((agentName, index) => {
      const agent = this.fs.getSubAgent(agentName);
      if (agent) {
        const locationIcon = agent.location === 'global' ? '🌍' : '📂';
        console.log(`\n${colorize.success('✓')} ${colorize.bold(`${index + 1}. ${agent.name}`)} ${locationIcon}`);
        console.log(`   ${agent.description}`);
        if (agent.tools && agent.tools.length > 0) {
          console.log(`   ${colorize.dim(`Tools: ${agent.tools.join(', ')}`)}`);
        }
        if (agent.author) {
          console.log(`   ${colorize.dim(`Author: ${agent.author}`)}`);
        }
        console.log(`   ${colorize.dim(`Location: ${agent.location}`)}`);
      }
    });
    
    console.log(`\n${colorize.info(`Total: ${subAgents.length} sub-agents installed`)}`);
  }

  async createSubAgent(): Promise<void> {
    console.log(`\n${colorize.highlight('🛠️ Create New Sub-Agent')}`);
    
    const creationType = await select<'template' | 'scratch'>({
      message: 'How would you like to create the sub-agent?',
      choices: [
        { name: '📋 Use a template', value: 'template' },
        { name: '✨ Create from scratch', value: 'scratch' }
      ]
    });

    if (creationType === 'template') {
      await this.createFromTemplate();
    } else {
      await this.createFromScratch();
    }
  }

  private async createFromTemplate(): Promise<void> {
    const templateChoices = SUB_AGENT_TEMPLATES.map(template => ({
      name: `${template.name} - ${template.description}`,
      value: template
    }));

    templateChoices.push({ name: '← Back', value: null as any });

    const selectedTemplate = await select<SubAgentTemplate | null>({
      message: '📋 Select a template:',
      choices: templateChoices
    });

    if (!selectedTemplate) {
      return;
    }

    await this.createAgentFromTemplate(selectedTemplate);
  }

  private async createAgentFromTemplate(template: SubAgentTemplate): Promise<void> {
    const name = await input({
      message: 'Sub-agent name:',
      default: template.name,
      validate: (input) => {
        if (!input.trim()) {
          return 'Name is required';
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input.trim())) {
          return 'Name can only contain letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    });

    const description = await input({
      message: 'Description:',
      default: template.description
    });

    const customizeTools = await confirm({
      message: 'Customize available tools?',
      default: false
    });

    let tools = template.defaultTools;
    if (customizeTools) {
      tools = await this.selectTools(template.defaultTools);
    }

    const customizePrompt = await confirm({
      message: 'Customize system prompt?',
      default: false
    });

    let systemPrompt = template.systemPromptTemplate;
    if (customizePrompt) {
      systemPrompt = await editor({
        message: 'Edit the system prompt:',
        default: template.systemPromptTemplate
      });
    }

    const targetLocation = await this.selectInstallLocation();
    if (targetLocation) {
      await this.saveSubAgent(name.trim(), description, tools, systemPrompt, targetLocation);
    }
  }

  private async createFromScratch(): Promise<void> {
    const name = await input({
      message: 'Sub-agent name:',
      validate: (input) => {
        if (!input.trim()) {
          return 'Name is required';
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input.trim())) {
          return 'Name can only contain letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    });

    const description = await input({
      message: 'Description:',
      validate: (input) => input.trim() !== '' || 'Description is required'
    });

    const tools = await this.selectTools(DEFAULT_SUB_AGENT_TOOLS);

    const systemPrompt = await editor({
      message: 'Enter the system prompt:',
      default: `You are a specialized AI assistant for ${name.trim()}.

Your role is to:
- [Define the primary responsibilities]
- [List key capabilities]
- [Specify any constraints or focus areas]

[Add any additional context or instructions specific to this sub-agent's purpose.]`
    });

    const targetLocation = await this.selectInstallLocation();
    if (targetLocation) {
      await this.saveSubAgent(name.trim(), description, tools, systemPrompt, targetLocation);
    }
  }

  private async selectTools(defaultTools: string[]): Promise<string[]> {
    const selectedTools: string[] = [];
    
    console.log(`\n${colorize.info('Select tools for this sub-agent:')}`);

    // Note: Using multiple select would be ideal here, but inquirer doesn't have it built-in
    // For now, we'll use a series of confirms or implement a simple multi-select
    for (const tool of AVAILABLE_TOOLS) {
      const isDefault = defaultTools.includes(tool);
      const shouldInclude = await confirm({
        message: `Include ${tool}?`,
        default: isDefault
      });
      
      if (shouldInclude) {
        selectedTools.push(tool);
      }
    }

    return selectedTools;
  }

  private async selectInstallLocation(): Promise<'global' | 'local' | null> {
    const location = await NavigationUtils.enhancedSelect<'global' | 'local' | 'back' | 'cancel'>({
      message: '📁 Select installation location:',
      choices: [
        { name: '🌍 Global (~/.claude/agents)', value: 'global' },
        { name: '📂 Project local (./.claude/agents)', value: 'local' },
        { name: '← Back', value: 'back' },
        { name: '← Cancel', value: 'cancel' }
      ],
      allowEscBack: true
    });

    if (location === 'back' || location === 'cancel') {
      return null;
    }

    return location;
  }

  private async saveSubAgent(name: string, description: string, tools: string[], systemPrompt: string, targetLocation: 'global' | 'local'): Promise<void> {
    try {
      const frontMatter: SubAgentFrontMatter = {
        name,
        description,
        tools
      };

      const filePath = this.fs.saveSubAgent(name, frontMatter, systemPrompt, targetLocation);
      const locationText = targetLocation === 'global' ? 'globally' : 'locally';
      
      console.log(colorize.success(`\n✅ Successfully created sub-agent '${name}' ${locationText}`));
      console.log(colorize.info(`📁 Saved to: ${filePath}`));
      console.log(colorize.info(`🛠️ Tools: ${tools.join(', ')}`));
      
    } catch (error) {
      console.log(colorize.error(`❌ Failed to create sub-agent: ${(error as Error).message}`));
    }
  }

  async editSubAgent(): Promise<void> {
    const subAgents = this.fs.listInstalledSubAgents();
    
    if (subAgents.length === 0) {
      console.log(colorize.warning('📭 No sub-agents to edit.'));
      return;
    }

    const choices = subAgents.map(name => {
      const agent = this.fs.getSubAgent(name);
      const locationIcon = agent?.location === 'global' ? '🌍' : '📂';
      return {
        name: `${name} - ${agent?.description || 'No description'} ${locationIcon}`,
        value: name
      };
    });

    choices.push({ name: '← Cancel', value: 'cancel' });

    const selectedAgent = await select<string>({
      message: '✏️ Select a sub-agent to edit:',
      choices: choices
    });

    if (selectedAgent === 'cancel') {
      return;
    }

    await this.editSpecificSubAgent(selectedAgent);
  }

  private async editSpecificSubAgent(name: string): Promise<void> {
    const agent = this.fs.getSubAgent(name);
    if (!agent) {
      console.log(colorize.error(`Sub-agent '${name}' not found.`));
      return;
    }

    console.log(`\n${colorize.highlight(`✏️ Editing Sub-Agent: ${agent.name}`)}`);
    console.log(`Location: ${agent.location}`);
    console.log(`Description: ${agent.description}`);

    const editChoice = await select<'description' | 'tools' | 'prompt' | 'all' | 'cancel'>({
      message: 'What would you like to edit?',
      choices: [
        { name: '📝 Description only', value: 'description' },
        { name: '🛠️ Tools only', value: 'tools' },
        { name: '💭 System prompt only', value: 'prompt' },
        { name: '🔄 Edit everything', value: 'all' },
        { name: '← Cancel', value: 'cancel' }
      ]
    });

    if (editChoice === 'cancel') {
      return;
    }

    let newDescription = agent.description;
    let newTools = agent.tools || [];
    let newSystemPrompt = agent.systemPrompt;

    if (editChoice === 'description' || editChoice === 'all') {
      newDescription = await input({
        message: 'New description:',
        default: agent.description,
        validate: (input) => input.trim() !== '' || 'Description is required'
      });
    }

    if (editChoice === 'tools' || editChoice === 'all') {
      newTools = await this.selectTools(agent.tools || []);
    }

    if (editChoice === 'prompt' || editChoice === 'all') {
      newSystemPrompt = await editor({
        message: 'Edit system prompt:',
        default: agent.systemPrompt
      });
    }

    const confirmSave = await confirm({
      message: 'Save changes?',
      default: true
    });

    if (confirmSave) {
      try {
        const frontMatter: SubAgentFrontMatter = {
          name: agent.name,
          description: newDescription,
          tools: newTools,
          author: agent.author,
          version: agent.version,
          created_at: agent.created_at
        };

        this.fs.saveSubAgent(agent.name, frontMatter, newSystemPrompt, agent.location);
        console.log(colorize.success(`\n✅ Successfully updated sub-agent '${agent.name}'`));
        
      } catch (error) {
        console.log(colorize.error(`❌ Failed to update sub-agent: ${(error as Error).message}`));
      }
    }
  }

  async deleteSubAgent(): Promise<void> {
    const subAgents = this.fs.listInstalledSubAgents();
    
    if (subAgents.length === 0) {
      console.log(colorize.warning('📭 No sub-agents to delete.'));
      return;
    }

    const choices = subAgents.map(name => {
      const agent = this.fs.getSubAgent(name);
      const locationIcon = agent?.location === 'global' ? '🌍' : '📂';
      return {
        name: `${name} - ${agent?.description || 'No description'} ${locationIcon}`,
        value: name
      };
    });

    choices.push({ name: '← Cancel', value: 'cancel' });

    const selectedAgent = await select<string>({
      message: '🗑️ Select a sub-agent to delete:',
      choices: choices
    });

    if (selectedAgent === 'cancel') {
      return;
    }

    const agent = this.fs.getSubAgent(selectedAgent);
    if (!agent) {
      console.log(colorize.error(`Sub-agent '${selectedAgent}' not found.`));
      return;
    }

    const confirmDelete = await NavigationUtils.confirmAction(
      `Are you sure you want to delete '${agent.name}' (${agent.location})?`,
      false
    );

    if (confirmDelete) {
      try {
        const deleted = this.fs.deleteSubAgent(agent.name, agent.location);
        if (deleted) {
          console.log(colorize.success(`✅ Successfully deleted '${agent.name}'`));
        } else {
          console.log(colorize.warning(`⚠️ Sub-agent '${agent.name}' not found`));
        }
      } catch (error) {
        console.log(colorize.error(`❌ Failed to delete '${agent.name}': ${(error as Error).message}`));
      }
    }
  }

  async validateSubAgent(): Promise<void> {
    const subAgents = this.fs.listInstalledSubAgents();
    
    if (subAgents.length === 0) {
      console.log(colorize.warning('📭 No sub-agents to validate.'));
      return;
    }

    const choices = subAgents.map(name => ({
      name: name,
      value: name
    }));

    choices.push({ name: '← Cancel', value: 'cancel' });

    const selectedAgent = await select<string>({
      message: '🔍 Select a sub-agent to validate:',
      choices: choices
    });

    if (selectedAgent === 'cancel') {
      return;
    }

    await this.validateSpecificSubAgent(selectedAgent);
  }

  private async validateSpecificSubAgent(name: string): Promise<void> {
    console.log(`\n${colorize.info(`🔍 Validating sub-agent: ${name}`)}`);
    
    try {
      const agent = this.fs.getSubAgent(name);
      if (!agent) {
        console.log(colorize.error(`❌ Sub-agent '${name}' not found`));
        return;
      }

      const issues: string[] = [];

      // Validate required fields
      if (!agent.name.trim()) {
        issues.push('Name is empty');
      }

      if (!agent.description.trim()) {
        issues.push('Description is empty');
      }

      if (!agent.systemPrompt.trim()) {
        issues.push('System prompt is empty');
      }

      // Validate name format
      if (!/^[a-zA-Z0-9-_]+$/.test(agent.name)) {
        issues.push('Name contains invalid characters (only letters, numbers, hyphens, and underscores allowed)');
      }

      // Validate tools
      if (agent.tools) {
        const invalidTools = agent.tools.filter(tool => !AVAILABLE_TOOLS.includes(tool));
        if (invalidTools.length > 0) {
          issues.push(`Invalid tools: ${invalidTools.join(', ')}`);
        }
      }

      // Display results
      if (issues.length === 0) {
        console.log(colorize.success(`✅ Sub-agent '${name}' is valid`));
        console.log(colorize.info(`📁 Location: ${agent.location}`));
        console.log(colorize.info(`🛠️ Tools: ${agent.tools?.join(', ') || 'None specified'}`));
      } else {
        console.log(colorize.error(`❌ Validation failed for '${name}':`));
        issues.forEach(issue => {
          console.log(colorize.error(`  • ${issue}`));
        });
      }

    } catch (error) {
      console.log(colorize.error(`❌ Failed to validate sub-agent: ${(error as Error).message}`));
    }
  }

  // Search and Install Sub-Agents functionality
  async searchAndInstallSubAgents(): Promise<void> {
    if (!this.api) {
      console.log(colorize.error('❌ API not available for searching sub-agents'));
      return;
    }

    const query = await input({
      message: '🔍 Enter search query for sub-agents:',
      validate: (input) => input.trim() !== '' || 'Please enter a search query'
    });

    await this.searchSubAgentsWithPagination(query);
  }

  private async searchSubAgentsWithPagination(query: string, page: number = 0): Promise<void> {
    if (!this.api) return;

    const limit = 10;
    const offset = page * limit;
    
    console.log(`\n${colorize.info(`Searching for sub-agents: "${query}"...`)}`);
    
    try {
      const results = await this.api.getSubAgents({ q: query, limit, offset });
      
      if (!results || !results.data || results.data.length === 0) {
        if (page === 0) {
          console.log(colorize.warning(`📭 No sub-agents found matching '${query}'.`));
        } else {
          console.log(colorize.warning(`📭 No more sub-agents found.`));
        }
        return;
      }
      
      const { data: subAgents, pagination } = results;
      const currentPage = Math.floor(offset / limit) + 1;
      const totalPages = Math.ceil((pagination?.total || 0) / limit);
      
      console.log(`\n${colorize.success(`✓ Found ${pagination?.total || 0} sub-agent(s) total | Page ${currentPage} of ${totalPages}:`)}`);
      subAgents.forEach((subAgent, index) => {
        const isInstalled = this.isSubAgentInstalled(subAgent.id);
        const status = isInstalled ? colorize.success('✓') : colorize.dim('○');
        const displayNumber = offset + index + 1;
        console.log(`\n${status} ${colorize.bold(`${displayNumber}. ${subAgent.name}`)}`);
        if (subAgent.description) {
          console.log(`   ${subAgent.description}`);
        }
        if (subAgent.author) {
          console.log(`   ${colorize.dim(`Author: ${subAgent.author}`)}`);
        }
        if (subAgent.tags) {
          console.log(`   ${colorize.dim(`Tags: ${subAgent.tags.join(', ')}`)}`);
        }
        if (isInstalled) {
          console.log(`   ${colorize.success('Already installed')}`);
        }
      });
      
      await this.handleSubAgentSearchNavigation(query, subAgents, pagination, page);

    } catch (error) {
      console.log(colorize.error(`Search failed: ${(error as Error).message}`));
    }
  }

  private async handleSubAgentSearchNavigation(query: string, subAgents: Command[], pagination: any, currentPage: number): Promise<void> {
    const choices = [
      { name: '🤖 Install a sub-agent from these results', value: 'install' }
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
        await this.installSubAgentFromSearchResults(subAgents);
        break;
      case 'previous':
        await this.searchSubAgentsWithPagination(query, currentPage - 1);
        break;
      case 'next':
        await this.searchSubAgentsWithPagination(query, currentPage + 1);
        break;
      case 'goto':
        await this.goToSubAgentPage(query, pagination);
        break;
      case 'new_search':
        await this.searchAndInstallSubAgents();
        break;
      case 'back':
        return;
    }
  }

  private async goToSubAgentPage(query: string, pagination: any): Promise<void> {
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
    await this.searchSubAgentsWithPagination(query, page);
  }

  private async installSubAgentFromSearchResults(subAgents: Command[]): Promise<void> {
    const choices = subAgents.map(cmd => ({
      name: `${cmd.name} - ${cmd.description || 'No description'}`,
      value: cmd.id
    }));

    choices.push({ name: '← Back', value: 'back' });
    choices.push({ name: '← Cancel', value: 'cancel' });

    const selectedSubAgent = await select<string>({
      message: '🤖 Select a sub-agent to install:',
      choices: choices
    });

    if (selectedSubAgent !== 'back' && selectedSubAgent !== 'cancel') {
      const targetLocation = await this.selectInstallLocation();
      if (targetLocation !== null) {
        await this.installSpecificSubAgent(selectedSubAgent, targetLocation);
      }
    }
  }

  private isSubAgentInstalled(subAgentId: string): boolean {
    const installedSubAgents = this.fs.listInstalledSubAgents();
    const subAgentName = subAgentId.split('/').pop() || subAgentId;
    return installedSubAgents.includes(subAgentName);
  }

  private async installSpecificSubAgent(subAgentId: string, targetLocation: 'global' | 'local' = 'global'): Promise<boolean> {
    if (!this.api) {
      console.log(colorize.error('❌ API not available for installing sub-agents'));
      return false;
    }

    console.log(`\n${colorize.info(`Installing sub-agent: ${subAgentId}...`)}`);
    
    try {
      const subAgentData = await this.api.getSubAgent(subAgentId);
      
      if (!subAgentData || !subAgentData.filePath) {
        console.log(colorize.error(`Sub-agent '${subAgentId}' not found or has no file path.`));
        return false;
      }
      
      if (targetLocation === 'global') {
        this.fs.ensureAgentsDirectory();
      } else {
        this.fs.ensureProjectAgentsDirectory();
      }
      
      // Convert command ID to sub-agent name
      const subAgentName = subAgentId.split('/').pop() || subAgentId;
      const existingSubAgents = this.fs.listInstalledSubAgents();
      
      if (existingSubAgents.includes(subAgentName)) {
        const overwrite = await confirm({
          message: `Sub-agent '${subAgentName}' already exists. Overwrite?`,
          default: false
        });
        
        if (!overwrite) {
          console.log(colorize.info('Installation cancelled'));
          return false;
        }
      }
      
      // Fetch content from filePath and convert to sub-agent
      const content = await this.fetchSubAgentContent(subAgentData.filePath);
      if (!content) {
        console.log(colorize.error(`Failed to fetch content for sub-agent '${subAgentId}'.`));
        return false;
      }
      
      const convertedSubAgent = this.convertCommandToSubAgent(content, subAgentData);
      
      this.fs.saveSubAgent(
        subAgentName, 
        convertedSubAgent.frontMatter, 
        convertedSubAgent.systemPrompt, 
        targetLocation
      );
      
      const locationText = targetLocation === 'global' ? 'globally' : 'locally';
      console.log(colorize.success(`✅ Successfully installed sub-agent '${subAgentName}' ${locationText}`));
      
      if (subAgentData.description) {
        console.log(colorize.info(`Description: ${subAgentData.description}`));
      }
      
      return true;

    } catch (error) {
      console.log(colorize.error(`❌ Failed to install sub-agent: ${(error as Error).message}`));
      return false;
    }
  }

  private async fetchSubAgentContent(filePath: string): Promise<string | null> {
    try {
      // Try local first
      const localPath = `commands/${filePath}`;
      if (this.fs.fileExists(localPath)) {
        return this.fs.readFile(localPath);
      }
      
      // Fetch from GitHub
      const commandsUrl = 'https://raw.githubusercontent.com/kiliczsh/claude-cmd/main/commands/commands.json';
      const baseUrl = commandsUrl.replace('/commands.json', '');
      const fileUrl = `${baseUrl}/${filePath}`;
      
      const response = await fetch(fileUrl);
      if (response.ok) {
        return await response.text();
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching sub-agent content:', error);
      return null;
    }
  }

  private convertCommandToSubAgent(content: string, commandData: Command): { frontMatter: SubAgentFrontMatter; systemPrompt: string } {
    try {
      // Parse the command content
      const yamlFrontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
      const match = content.match(yamlFrontMatterRegex);

      if (!match) {
        throw new Error('Invalid command format: missing YAML frontmatter');
      }

      const [, yamlContent, commandContent] = match;
      const commandFrontMatter = this.parseYaml(yamlContent);

      // Convert command frontmatter to sub-agent frontmatter
      const frontMatter: SubAgentFrontMatter = {
        name: commandData.name,
        description: commandData.description,
        tools: this.extractToolsFromCommand(commandFrontMatter),
        author: commandData.author,
        version: commandData.version,
        created_at: commandData.created_at,
        updated_at: commandData.updated_at
      };

      // Convert command content to system prompt
      const systemPrompt = this.convertContentToSystemPrompt(commandContent, commandData);

      return { frontMatter, systemPrompt };
    } catch (error) {
      throw new Error(`Failed to convert command to sub-agent: ${(error as Error).message}`);
    }
  }

  private parseYaml(yamlContent: string): any {
    const result: any = {};
    const lines = yamlContent.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }

      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex === -1) {
        continue;
      }

      const key = trimmedLine.substring(0, colonIndex).trim();
      const value = trimmedLine.substring(colonIndex + 1).trim();

      if (key === 'allowed-tools' && value.includes(',')) {
        result[key] = value.split(',').map(item => item.trim());
      } else if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        result[key] = arrayContent.split(',').map(item => item.trim().replace(/['"]/g, ''));
      } else {
        result[key] = value.replace(/^['"]|['"]$/g, '');
      }
    }

    return result;
  }

  private extractToolsFromCommand(commandFrontMatter: any): string[] {
    const allowedTools = commandFrontMatter['allowed-tools'];
    if (!allowedTools) {
      return DEFAULT_SUB_AGENT_TOOLS;
    }

    if (Array.isArray(allowedTools)) {
      return allowedTools
        .map(tool => this.mapCommandToolToSubAgentTool(tool))
        .filter(tool => AVAILABLE_TOOLS.includes(tool));
    }

    if (typeof allowedTools === 'string') {
      return allowedTools
        .split(',')
        .map(tool => this.mapCommandToolToSubAgentTool(tool.trim()))
        .filter(tool => AVAILABLE_TOOLS.includes(tool));
    }

    return DEFAULT_SUB_AGENT_TOOLS;
  }

  private mapCommandToolToSubAgentTool(commandTool: string): string {
    // Map command-specific tools to sub-agent tools
    const toolMappings: { [key: string]: string } = {
      'mcp__puppeteer__puppeteer_navigate': 'WebFetch',
      'mcp__puppeteer__puppeteer_screenshot': 'Bash',
      'mcp__puppeteer__puppeteer_click': 'Bash',
      'mcp__puppeteer__puppeteer_fill': 'Bash',
      'mcp__puppeteer__puppeteer_select': 'Bash',
      'mcp__puppeteer__puppeteer_hover': 'Bash',
      'mcp__puppeteer__puppeteer_evaluate': 'Bash',
    };

    // Check for direct matches first
    if (AVAILABLE_TOOLS.includes(commandTool)) {
      return commandTool;
    }

    // Check for mappings
    if (toolMappings[commandTool]) {
      return toolMappings[commandTool];
    }

    // Handle bash patterns like Bash(gdate:*)
    if (commandTool.startsWith('Bash(')) {
      return 'Bash';
    }

    // Default mapping attempts
    const upperCaseTool = commandTool.charAt(0).toUpperCase() + commandTool.slice(1);
    if (AVAILABLE_TOOLS.includes(upperCaseTool)) {
      return upperCaseTool;
    }

    // If no mapping found, return a default tool
    return 'Read';
  }

  private convertContentToSystemPrompt(commandContent: string, commandData: Command): string {
    // Create a system prompt that explains the sub-agent's role based on the command content
    const systemPromptPrefix = `You are a specialized sub-agent for ${commandData.name}.

${commandData.description}

Your role is to help users with tasks related to this specialty. Use the provided tools and your expertise to assist effectively.

## Original Command Instructions:
`;

    return systemPromptPrefix + commandContent.trim();
  }
}