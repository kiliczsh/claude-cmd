export interface Env {
  DB: D1Database;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  CORS_ORIGINS: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string | null;
  author: string;
  publisher: string | null;
  tags: string[];
  version: string;
  skill_path: string | null;
  content: string | null;
  frontmatter: Record<string, unknown>;
  install_count: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  published_at: string;
}

export interface SkillRow {
  id: string;
  name: string;
  description: string | null;
  author: string;
  publisher: string | null;
  tags: string;         // JSON string
  version: string;
  skill_path: string | null;
  content: string | null;
  frontmatter: string;  // JSON string
  install_count: number;
  is_verified: number;  // 0 or 1
  created_at: string;
  updated_at: string;
  published_at: string;
}

export interface Publisher {
  github_login: string;
  github_id: number;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ListSkillsParams {
  limit: number;
  offset: number;
  author?: string;
  tag?: string;
  sort: 'installs' | 'updated' | 'name';
}

export interface PublishPayload {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  version: string;
  skill_path?: string;
  content: string;
  frontmatter?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}
