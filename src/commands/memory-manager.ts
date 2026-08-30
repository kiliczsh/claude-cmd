import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { colorize, colors } from '../utils/colors';

export interface MemoryFile {
  filePath: string;
  scope: 'global' | 'project';
  type: 'CLAUDE.md' | 'CLAUDE.local.md' | 'settings.json' | 'settings.local.json' | 'memory' | 'other';
  sizeBytes: number;
  lastModified: Date;
  exists: boolean;
}

export interface MemoryStats {
  files: MemoryFile[];
  totalBytes: number;
  estimatedTokens: number;
}

export class MemoryManager {
  private readonly globalClaudeDir: string;
  private readonly projectClaudeDir: string;
  private readonly projectCwd: string;

  constructor(cwd: string = process.cwd()) {
    this.globalClaudeDir = path.join(os.homedir(), '.claude');
    this.projectCwd = cwd;
    this.projectClaudeDir = path.join(cwd, '.claude');
  }

  private getMemoryFiles(scope?: 'global' | 'project'): MemoryFile[] {
    const files: MemoryFile[] = [];

    if (!scope || scope === 'global') {
      const globalCandidates: Array<{ rel: string; type: MemoryFile['type'] }> = [
        { rel: 'CLAUDE.md', type: 'CLAUDE.md' },
        { rel: 'settings.json', type: 'settings.json' },
      ];

      for (const { rel, type } of globalCandidates) {
        const filePath = path.join(this.globalClaudeDir, rel);
        files.push(this.statFile(filePath, 'global', type));
      }

      // memory/ subdirectory
      const memDir = path.join(this.globalClaudeDir, 'memory');
      if (fs.existsSync(memDir)) {
        try {
          const entries = fs.readdirSync(memDir);
          for (const entry of entries) {
            const filePath = path.join(memDir, entry);
            const s = fs.statSync(filePath);
            if (s.isFile()) {
              files.push({
                filePath,
                scope: 'global',
                type: 'memory',
                sizeBytes: s.size,
                lastModified: s.mtime,
                exists: true,
              });
            }
          }
        } catch {
          // ignore unreadable memory dir
        }
      }
    }

    if (!scope || scope === 'project') {
      const projectCandidates: Array<{ filePath: string; type: MemoryFile['type'] }> = [
        { filePath: path.join(this.projectCwd, 'CLAUDE.md'), type: 'CLAUDE.md' },
        { filePath: path.join(this.projectCwd, 'CLAUDE.local.md'), type: 'CLAUDE.local.md' },
        { filePath: path.join(this.projectClaudeDir, 'CLAUDE.md'), type: 'CLAUDE.md' },
        { filePath: path.join(this.projectClaudeDir, 'settings.json'), type: 'settings.json' },
        { filePath: path.join(this.projectClaudeDir, 'settings.local.json'), type: 'settings.local.json' },
      ];

      for (const { filePath, type } of projectCandidates) {
        files.push(this.statFile(filePath, 'project', type));
      }
    }

    return files;
  }

  private statFile(filePath: string, scope: 'global' | 'project', type: MemoryFile['type']): MemoryFile {
    if (!fs.existsSync(filePath)) {
      return { filePath, scope, type, sizeBytes: 0, lastModified: new Date(0), exists: false };
    }
    const s = fs.statSync(filePath);
    return { filePath, scope, type, sizeBytes: s.size, lastModified: s.mtime, exists: true };
  }

  /** Rough token estimate: ~4 bytes per token */
  private estimateTokens(bytes: number): number {
    return Math.ceil(bytes / 4);
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  private formatDate(date: Date): string {
    if (date.getTime() === 0) return 'n/a';
    return date.toLocaleString();
  }

  list(scope?: 'global' | 'project'): void {
    const files = this.getMemoryFiles(scope);
    const existing = files.filter(f => f.exists);

    if (existing.length === 0) {
      console.log(colorize.warning('No memory files found.'));
      return;
    }

    const scopeLabel = scope ? `[${scope}]` : '[all scopes]';
    console.log(colorize.highlight(`\nClaude Memory Files ${scopeLabel}\n`));

    const globalFiles = existing.filter(f => f.scope === 'global');
    const projectFiles = existing.filter(f => f.scope === 'project');

    if (globalFiles.length > 0) {
      console.log(colorize.bold('Global (~/.claude/):'));
      for (const f of globalFiles) {
        const sizeStr = colorize.dim(this.formatBytes(f.sizeBytes));
        const tokStr = colorize.dim(`~${this.estimateTokens(f.sizeBytes)} tokens`);
        console.log(`  ${colorize.primary(f.filePath)}`);
        console.log(`    ${sizeStr}  ${tokStr}  ${colorize.dim(this.formatDate(f.lastModified))}`);
      }
    }

    if (projectFiles.length > 0) {
      console.log(colorize.bold('\nProject (./.claude/ and ./):'));
      for (const f of projectFiles) {
        const sizeStr = colorize.dim(this.formatBytes(f.sizeBytes));
        const tokStr = colorize.dim(`~${this.estimateTokens(f.sizeBytes)} tokens`);
        console.log(`  ${colorize.primary(f.filePath)}`);
        console.log(`    ${sizeStr}  ${tokStr}  ${colorize.dim(this.formatDate(f.lastModified))}`);
      }
    }
  }

  show(scope?: 'global' | 'project'): void {
    const files = this.getMemoryFiles(scope).filter(f => f.exists);

    if (files.length === 0) {
      console.log(colorize.warning('No memory files found.'));
      return;
    }

    for (const file of files) {
      console.log(`\n${colorize.highlight('━'.repeat(60))}`);
      console.log(`${colorize.bold('Source:')} ${colorize.primary(file.filePath)}`);
      console.log(`${colorize.bold('Scope:')}  ${file.scope}  |  ${colorize.bold('Type:')} ${file.type}  |  ${colorize.bold('Size:')} ${this.formatBytes(file.sizeBytes)}`);
      console.log(colorize.highlight('━'.repeat(60)));

      try {
        const content = fs.readFileSync(file.filePath, 'utf8');
        console.log(this.highlightMarkdown(content, file.type));
      } catch (err) {
        console.log(colorize.error(`Cannot read file: ${(err as Error).message}`));
      }
    }
  }

  private highlightMarkdown(content: string, type: MemoryFile['type']): string {
    if (type === 'settings.json' || type === 'settings.local.json') {
      // Light JSON colouring
      return content
        .replace(/"([^"]+)":/g, `${colors.cyan}"$1":${colors.reset}`)
        .replace(/: "([^"]*)"/g, `: ${colors.green}"$1"${colors.reset}`)
        .replace(/: (true|false|null)/g, `: ${colors.yellow}$1${colors.reset}`)
        .replace(/: ([0-9]+)/g, `: ${colors.yellow}$1${colors.reset}`);
    }

    // Markdown colouring
    return content
      .split('\n')
      .map(line => {
        if (/^#{1,6}\s/.test(line)) {
          return `${colors.primary}${colors.bright}${line}${colors.reset}`;
        }
        if (/^[-*+]\s/.test(line) || /^\d+\.\s/.test(line)) {
          return `${colors.secondary}${line}${colors.reset}`;
        }
        if (/^```/.test(line)) {
          return `${colors.cyan}${line}${colors.reset}`;
        }
        if (/^\s{4}/.test(line) || /^>/.test(line)) {
          return `${colors.dim}${line}${colors.reset}`;
        }
        return line;
      })
      .join('\n');
  }

  async clear(scope?: 'global' | 'project'): Promise<void> {
    const files = this.getMemoryFiles(scope).filter(f => f.exists);

    // Filter to only content files (not settings)
    const contentFiles = files.filter(f => f.type !== 'settings.json' && f.type !== 'settings.local.json');

    if (contentFiles.length === 0) {
      console.log(colorize.warning('No clearable memory files found.'));
      return;
    }

    const scopeLabel = scope ? `[${scope}]` : '[all scopes]';
    console.log(colorize.highlight(`\n┌─ Memory Clear ${scopeLabel} ${'─'.repeat(40)}`));
    for (const f of contentFiles) {
      console.log(`│  ${f.filePath}  (${this.formatBytes(f.sizeBytes)})`);
    }
    console.log(colorize.highlight(`└${'─'.repeat(55)}`));
    console.log('');

    const { confirm } = await import('@inquirer/prompts');
    const proceed = await confirm({
      message: `Clear ${contentFiles.length} file(s)? This cannot be undone.`,
      default: false,
    });

    if (!proceed) {
      console.log(colorize.warning('Clear cancelled.'));
      return;
    }

    for (const f of contentFiles) {
      try {
        fs.writeFileSync(f.filePath, '', 'utf8');
        console.log(colorize.success(`Cleared: ${f.filePath}`));
      } catch (err) {
        console.log(colorize.error(`Failed to clear ${f.filePath}: ${(err as Error).message}`));
      }
    }
  }

  stats(scope?: 'global' | 'project'): void {
    const files = this.getMemoryFiles(scope);
    const existing = files.filter(f => f.exists);

    const scopeLabel = scope ? `[${scope}]` : '[all scopes]';
    console.log(colorize.highlight(`\nMemory Stats ${scopeLabel}\n`));

    if (existing.length === 0) {
      console.log(colorize.warning('No memory files found.'));
      return;
    }

    let totalBytes = 0;
    for (const f of existing) {
      totalBytes += f.sizeBytes;
    }

    console.log(`${colorize.bold('Files found:')}  ${existing.length}`);
    console.log(`${colorize.bold('Total size:')}   ${this.formatBytes(totalBytes)}`);
    console.log(`${colorize.bold('Est. tokens:')} ~${this.estimateTokens(totalBytes).toLocaleString()}`);
    console.log('');

    const maxPath = Math.max(...existing.map(f => f.filePath.length), 10);
    const header = `${'File'.padEnd(maxPath)}  ${'Scope'.padEnd(7)}  ${'Type'.padEnd(18)}  ${'Size'.padStart(8)}  ${'~Tokens'.padStart(9)}  Last Modified`;
    console.log(colorize.dim(header));
    console.log(colorize.dim('-'.repeat(header.length)));

    for (const f of existing) {
      const row = [
        f.filePath.padEnd(maxPath),
        f.scope.padEnd(7),
        f.type.padEnd(18),
        this.formatBytes(f.sizeBytes).padStart(8),
        `~${this.estimateTokens(f.sizeBytes)}`.padStart(9),
        this.formatDate(f.lastModified),
      ].join('  ');
      console.log(row);
    }
  }
}
