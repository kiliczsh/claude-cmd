import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ClaudeConfig } from '@/types';

export class FileSystemManager {
  public readonly claudeDir: string;
  public readonly commandsDir: string;
  public readonly configFile: string;

  constructor() {
    this.claudeDir = path.join(os.homedir(), '.claude');
    this.commandsDir = path.join(this.claudeDir, 'commands');
    this.configFile = path.join(this.claudeDir, 'settings.json');
  }

  ensureClaudeDirectory(): void {
    const directories = [
      this.claudeDir,
      this.commandsDir
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

  saveCommand(fileName: string, content: string): string {
    this.ensureClaudeDirectory();
    const filePath = path.join(this.commandsDir, fileName);
    
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
} 