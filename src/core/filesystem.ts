import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ClaudeConfig, SubAgent, SubAgentFrontMatter, ParsedSubAgent } from '../types';

export class FileSystemManager {
  public readonly claudeDir: string;
  public readonly commandsDir: string;
  public readonly agentsDir: string;
  public readonly configFile: string;
  public readonly projectClaudeDir: string;
  public readonly projectCommandsDir: string;
  public readonly projectAgentsDir: string;

  constructor() {
    this.claudeDir = path.join(os.homedir(), '.claude');
    this.commandsDir = path.join(this.claudeDir, 'commands');
    this.agentsDir = path.join(this.claudeDir, 'agents');
    this.configFile = path.join(this.claudeDir, 'settings.json');
    this.projectClaudeDir = path.join(process.cwd(), '.claude');
    this.projectCommandsDir = path.join(this.projectClaudeDir, 'commands');
    this.projectAgentsDir = path.join(this.projectClaudeDir, 'agents');
  }

  ensureClaudeDirectory(): void {
    const directories = [
      this.claudeDir,
      this.commandsDir,
      this.agentsDir
    ];

    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  ensureProjectClaudeDirectory(): void {
    const directories = [
      this.projectClaudeDir,
      this.projectCommandsDir,
      this.projectAgentsDir
    ];

    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  getClaudeConfig(): ClaudeConfig {
    if (!fs.existsSync(this.configFile)) {
      return {
        allowedTools: [],
        securityProfile: 'moderate',
        version: '1.0.0'
      };
    }

    try {
      return JSON.parse(fs.readFileSync(this.configFile, 'utf8')) as ClaudeConfig;
    } catch (error) {
      throw new Error(`Failed to read config: ${(error as Error).message}`);
    }
  }

  saveClaudeConfig(config: ClaudeConfig): boolean {
    this.ensureClaudeDirectory();
    try {
      fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
      return true;
    } catch (error) {
      throw new Error(`Failed to save config: ${(error as Error).message}`);
    }
  }

  listInstalledCommands(): string[] {
    if (!fs.existsSync(this.commandsDir)) {
      return [];
    }

    try {
      return this.getCommandsRecursively(this.commandsDir, '');
    } catch (error) {
      throw new Error(`Failed to list commands: ${(error as Error).message}`);
    }
  }

  private getCommandsRecursively(dir: string, prefix: string): string[] {
    const items = fs.readdirSync(dir);
    const results: string[] = [];

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        // Recursively get commands from subdirectory
        const subDirResults = this.getCommandsRecursively(itemPath, prefix ? `${prefix}/${item}` : item);
        results.push(...subDirResults);
      } else if (item.endsWith('.md')) {
        // Add markdown file with proper path
        results.push(prefix ? `${prefix}/${item}` : item);
      }
    }

    return results;
  }

  saveCommand(fileName: string, content: string, targetLocation: 'global' | 'local' = 'global'): string {
    const commandsDir = targetLocation === 'global' ? this.commandsDir : this.projectCommandsDir;
    const filePath = path.join(commandsDir, fileName);
    
    try {
      // Ensure the directory exists for nested paths
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content, 'utf8');
      return filePath;
    } catch (error) {
      throw new Error(`Failed to save command: ${(error as Error).message}`);
    }
  }

  deleteCommand(fileName: string): boolean {
    const filePath = path.join(this.commandsDir, fileName);
    
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete command: ${(error as Error).message}`);
    }
  }

  readFile(filePath: string): string {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new Error(`Failed to read file: ${(error as Error).message}`);
    }
  }

  writeFile(filePath: string, content: string): boolean {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    } catch (error) {
      throw new Error(`Failed to write file: ${(error as Error).message}`);
    }
  }

  fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  findClaudeMdFiles(startDir: string = process.cwd()): string[] {
    const claudeMdFiles: string[] = [];
    
    // Check current directory and parents
    let currentDir = startDir;
    while (currentDir !== path.dirname(currentDir)) {
      const claudeMdPath = path.join(currentDir, 'CLAUDE.md');
      const claudeLocalMdPath = path.join(currentDir, 'CLAUDE.local.md');
      
      if (fs.existsSync(claudeMdPath)) {
        claudeMdFiles.push(claudeMdPath);
      }
      if (fs.existsSync(claudeLocalMdPath)) {
        claudeMdFiles.push(claudeLocalMdPath);
      }
      
      currentDir = path.dirname(currentDir);
    }

    // Check home directory
    const homeClaude = path.join(os.homedir(), '.claude', 'CLAUDE.md');
    if (fs.existsSync(homeClaude)) {
      claudeMdFiles.push(homeClaude);
    }

    return claudeMdFiles;
  }

  // Sub-Agent Management Methods

  ensureAgentsDirectory(): void {
    if (!fs.existsSync(this.agentsDir)) {
      fs.mkdirSync(this.agentsDir, { recursive: true });
    }
  }

  ensureProjectAgentsDirectory(): void {
    if (!fs.existsSync(this.projectAgentsDir)) {
      fs.mkdirSync(this.projectAgentsDir, { recursive: true });
    }
  }

  listInstalledSubAgents(): string[] {
    const globalAgents = this.getSubAgentsFromDirectory(this.agentsDir);
    const projectAgents = this.getSubAgentsFromDirectory(this.projectAgentsDir);
    return [...globalAgents, ...projectAgents];
  }

  private getSubAgentsFromDirectory(dir: string): string[] {
    if (!fs.existsSync(dir)) {
      return [];
    }

    try {
      return fs.readdirSync(dir)
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
    } catch (error) {
      throw new Error(`Failed to list sub-agents: ${(error as Error).message}`);
    }
  }

  parseSubAgentFile(filePath: string): ParsedSubAgent {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return this.parseSubAgentContent(content);
    } catch (error) {
      throw new Error(`Failed to parse sub-agent file: ${(error as Error).message}`);
    }
  }

  parseSubAgentContent(content: string): ParsedSubAgent {
    const yamlFrontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(yamlFrontMatterRegex);

    if (!match) {
      throw new Error('Invalid sub-agent format: missing YAML frontmatter');
    }

    const [, yamlContent, systemPrompt] = match;
    
    try {
      const frontMatter = this.parseYaml(yamlContent) as SubAgentFrontMatter;
      return {
        frontMatter,
        systemPrompt: systemPrompt.trim()
      };
    } catch (error) {
      throw new Error(`Failed to parse YAML frontmatter: ${(error as Error).message}`);
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

      if (key === 'tools' && value.startsWith('[') && value.endsWith(']')) {
        // Parse array format: [tool1, tool2, tool3]
        const arrayContent = value.slice(1, -1);
        result[key] = arrayContent.split(',').map(item => item.trim().replace(/['"]/g, ''));
      } else {
        // Remove quotes if present
        result[key] = value.replace(/^['"]|['"]$/g, '');
      }
    }

    return result;
  }

  saveSubAgent(name: string, frontMatter: SubAgentFrontMatter, systemPrompt: string, targetLocation: 'global' | 'local' = 'global'): string {
    const agentsDir = targetLocation === 'global' ? this.agentsDir : this.projectAgentsDir;
    const fileName = `${name}.md`;
    const filePath = path.join(agentsDir, fileName);

    if (targetLocation === 'global') {
      this.ensureAgentsDirectory();
    } else {
      this.ensureProjectAgentsDirectory();
    }

    const content = this.formatSubAgentContent(frontMatter, systemPrompt);

    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return filePath;
    } catch (error) {
      throw new Error(`Failed to save sub-agent: ${(error as Error).message}`);
    }
  }

  private formatSubAgentContent(frontMatter: SubAgentFrontMatter, systemPrompt: string): string {
    let yamlContent = '';
    yamlContent += `name: ${frontMatter.name}\n`;
    yamlContent += `description: ${frontMatter.description}\n`;
    
    if (frontMatter.tools && frontMatter.tools.length > 0) {
      const toolsArray = Array.isArray(frontMatter.tools) ? frontMatter.tools : [frontMatter.tools];
      yamlContent += `tools: [${toolsArray.join(', ')}]\n`;
    }
    
    if (frontMatter.author) {
      yamlContent += `author: ${frontMatter.author}\n`;
    }
    
    if (frontMatter.version) {
      yamlContent += `version: ${frontMatter.version}\n`;
    }

    const now = new Date().toISOString();
    yamlContent += `created_at: ${frontMatter.created_at || now}\n`;
    yamlContent += `updated_at: ${now}\n`;

    return `---\n${yamlContent}---\n\n${systemPrompt}`;
  }

  deleteSubAgent(name: string, targetLocation: 'global' | 'local' = 'global'): boolean {
    const agentsDir = targetLocation === 'global' ? this.agentsDir : this.projectAgentsDir;
    const fileName = `${name}.md`;
    const filePath = path.join(agentsDir, fileName);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to delete sub-agent: ${(error as Error).message}`);
    }
  }

  getSubAgent(name: string): SubAgent | null {
    // Try global first
    const globalPath = path.join(this.agentsDir, `${name}.md`);
    if (fs.existsSync(globalPath)) {
      const parsed = this.parseSubAgentFile(globalPath);
      return {
        name: parsed.frontMatter.name,
        description: parsed.frontMatter.description,
        tools: Array.isArray(parsed.frontMatter.tools) 
          ? parsed.frontMatter.tools 
          : parsed.frontMatter.tools ? [parsed.frontMatter.tools] : undefined,
        systemPrompt: parsed.systemPrompt,
        filePath: globalPath,
        location: 'global',
        created_at: parsed.frontMatter.created_at,
        updated_at: parsed.frontMatter.updated_at,
        author: parsed.frontMatter.author,
        version: parsed.frontMatter.version
      };
    }

    // Try project local
    const projectPath = path.join(this.projectAgentsDir, `${name}.md`);
    if (fs.existsSync(projectPath)) {
      const parsed = this.parseSubAgentFile(projectPath);
      return {
        name: parsed.frontMatter.name,
        description: parsed.frontMatter.description,
        tools: Array.isArray(parsed.frontMatter.tools) 
          ? parsed.frontMatter.tools 
          : parsed.frontMatter.tools ? [parsed.frontMatter.tools] : undefined,
        systemPrompt: parsed.systemPrompt,
        filePath: projectPath,
        location: 'local',
        created_at: parsed.frontMatter.created_at,
        updated_at: parsed.frontMatter.updated_at,
        author: parsed.frontMatter.author,
        version: parsed.frontMatter.version
      };
    }

    return null;
  }
} 