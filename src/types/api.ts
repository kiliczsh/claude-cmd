export interface User {
  id: number;
  username: string;
  name: string;
  email?: string;
  avatar_url: string;
  github_url: string;
  created_at: string;
}

export interface Command {
  id: string;
  name: string;
  description: string;
  content?: string; // Optional when using filename reference
  filePath?: string; // Path to command file for dynamic loading
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  version?: string;
  downloads?: number;
  created_by?: User;
  filename?: string; // Keep for backward compatibility
}

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