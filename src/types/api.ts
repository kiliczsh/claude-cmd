export interface User {
  id: number;
  username: string;
  name: string;
  email?: string;
  avatar_url: string;
  github_url: string;
  created_at: string;
}

/** SKILL.md frontmatter fields included in v2 registry */
export interface SkillFrontmatter {
  description: string | null;
  'argument-hint': string | null;
  'allowed-tools': string | null;
  model: string | null;
  context: string | null;
  'disable-model-invocation': boolean | null;
  'user-invocable': boolean | null;
}

export interface Command {
  id: string;
  name: string;
  description: string;
  content?: string; // Optional when using filename reference
  filePath?: string; // Path to command file for dynamic loading (legacy)
  skillPath?: string; // Canonical path for v2 registry
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  version?: string;
  downloads?: number;
  created_by?: User;
  filename?: string; // Keep for backward compatibility
  frontmatter?: SkillFrontmatter; // v2 only
}

/** v2 registry shape */
export interface CommandsRegistryV2 {
  version: 2;
  skills: Command[];
}

/** Union type for registry responses (v1 = raw array, v2 = versioned object) */
export type CommandsRegistry = Command[] | CommandsRegistryV2;

export interface SearchResult {
  commands: Command[];
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

export interface MCPServer {
  name: string;
  description: string;
  author: string;
  tags: string[];
  config: {
    command: string;
    args: string[];
  };
} 