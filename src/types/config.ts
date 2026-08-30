export interface ClaudeAuth {
  githubToken: string;
  githubLogin: string;
  githubName: string | null;
  savedAt: string;
}

export interface ClaudeConfig {
  allowedTools: string[];
  securityProfile: 'strict' | 'moderate' | 'permissive';
  version: string;
  lastUpdated?: string;
  fileSystemAccess?: string;
  networkAccess?: string;
  workflowsEnabled?: boolean;
  auth?: ClaudeAuth;
}

export interface SecurityProfile {
  strict: string[];
  moderate: string[];
  permissive: string[];
} 