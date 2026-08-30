import { Command, CommandsRegistry, CommandsRegistryV2, SearchResult, ApiResponse } from '@/types';
import * as fs from 'fs';

export interface CommandSearchParams {
  q?: string;
  tags?: string;
  author?: string;
  limit?: number;
  offset?: number;
  sort?: 'name' | 'author' | 'created_at' | 'updated_at';
}

export class ClaudeCommandAPI {
  private commandsDataSource: string;
  private isUrl: boolean;
  private cachedCommands: Command[] | null = null;
  private cacheTimestamp: number = 0;
  private cachedETag: string | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(dataSource?: string) {
    // Default to GitHub URL, but allow override with local path or custom URL
    this.commandsDataSource = dataSource || 'https://raw.githubusercontent.com/kiliczsh/claude-cmd/main/commands/commands.json';
    this.isUrl = this.commandsDataSource.startsWith('http://') || this.commandsDataSource.startsWith('https://');
  }

  /** Normalize a v1 (array) or v2 (versioned object) registry to a flat Command array */
  private normalizeRegistry(data: CommandsRegistry): Command[] {
    if (Array.isArray(data)) {
      // v1: raw array
      return data;
    }
    // v2: { version: 2, skills: [...] }
    return (data as CommandsRegistryV2).skills;
  }

  private async loadCommandsData(): Promise<Command[]> {
    try {
      // Check cache first
      const now = Date.now();
      if (this.cachedCommands && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
        return this.cachedCommands;
      }

      if (this.isUrl) {
        // Fetch from URL with ETag caching
        const headers: Record<string, string> = {};
        if (this.cachedETag && this.cachedCommands) {
          headers['If-None-Match'] = this.cachedETag;
        }
        const response = await fetch(this.commandsDataSource, { headers });
        if (response.status === 304 && this.cachedCommands) {
          // Not Modified — reuse cached data, reset timer
          this.cacheTimestamp = now;
          return this.cachedCommands;
        }
        if (!response.ok) {
          throw new Error(`Failed to fetch commands (${response.status}): ${response.statusText}`);
        }
        const etag = response.headers.get('etag');
        const data = await response.json() as CommandsRegistry;
        const commands = this.normalizeRegistry(data);
        this.cachedCommands = commands;
        this.cacheTimestamp = now;
        this.cachedETag = etag;
        return commands;
      } else {
        // Load from local file
        if (fs.existsSync(this.commandsDataSource)) {
          const data = fs.readFileSync(this.commandsDataSource, 'utf-8');
          const parsed = JSON.parse(data) as CommandsRegistry;
          const commands = this.normalizeRegistry(parsed);
          this.cachedCommands = commands;
          this.cacheTimestamp = now;
          return commands;
        }
        return [];
      }
    } catch (error) {
      console.error('Error loading commands data:', (error as Error).message);
      return this.cachedCommands || [];
    }
  }

  private filterCommands(commands: Command[], params: CommandSearchParams): Command[] {
    let filtered = [...commands];

    if (params.q) {
      const query = params.q.toLowerCase();
      filtered = filtered.filter(cmd => 
        cmd.name.toLowerCase().includes(query) ||
        cmd.description.toLowerCase().includes(query) ||
        cmd.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (params.tags) {
      const searchTags = params.tags.split(',').map(t => t.trim().toLowerCase());
      filtered = filtered.filter(cmd => 
        cmd.tags.some(tag => searchTags.includes(tag.toLowerCase()))
      );
    }

    if (params.author) {
      const authorQuery = params.author.toLowerCase();
      filtered = filtered.filter(cmd => 
        cmd.author.toLowerCase().includes(authorQuery)
      );
    }

    if (params.sort) {
      filtered.sort((a, b) => {
        switch (params.sort) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'author':
            return a.author.localeCompare(b.author);
          case 'created_at':
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          case 'updated_at':
            return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          default:
            return 0;
        }
      });
    }

    return filtered;
  }

  async getCommands(params: CommandSearchParams = {}): Promise<ApiResponse<Command[]>> {
    const allCommands = await this.loadCommandsData();
    const filtered = this.filterCommands(allCommands, params);
    
    const limit = params.limit || 10;
    const offset = params.offset || 0;
    const paginatedCommands = filtered.slice(offset, offset + limit);
    
    return {
      data: paginatedCommands,
      pagination: {
        total: filtered.length,
        limit,
        offset,
        has_next: offset + limit < filtered.length,
        has_previous: offset > 0
      }
    };
  }

  async getCommand(commandId: string): Promise<Command> {
    const commands = await this.loadCommandsData();
    const command = commands.find(cmd => cmd.id === commandId);
    
    if (!command) {
      throw new Error(`Command ${commandId} not found`);
    }
    
    return command;
  }


  async getTags(): Promise<{ name: string; count: number }[]> {
    const commands = await this.loadCommandsData();
    const tagCounts = new Map<string, number>();
    
    commands.forEach(cmd => {
      cmd.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    
    return Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  async getAuthors(): Promise<{ name: string; count: number }[]> {
    const commands = await this.loadCommandsData();
    const authorCounts = new Map<string, number>();
    
    commands.forEach(cmd => {
      authorCounts.set(cmd.author, (authorCounts.get(cmd.author) || 0) + 1);
    });
    
    return Array.from(authorCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }


  async searchCommands(query: string): Promise<SearchResult> {
    const results = await this.getCommands({ q: query });
    return { commands: results.data };
  }

  // Sub-Agent specific methods (filtering commands with 'agent' tag)
  async getSubAgents(params: CommandSearchParams = {}): Promise<ApiResponse<Command[]>> {
    // Force filter by 'agent' tag
    const subAgentParams = {
      ...params,
      tags: params.tags ? `${params.tags},agent` : 'agent'
    };
    
    return await this.getCommands(subAgentParams);
  }

  async getSubAgent(subAgentId: string): Promise<Command> {
    return await this.getCommand(subAgentId);
  }

  async searchSubAgents(query: string): Promise<SearchResult> {
    const results = await this.getSubAgents({ q: query });
    return { commands: results.data };
  }
} 