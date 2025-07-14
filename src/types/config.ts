export interface ClaudeConfig {
  allowedTools: string[];
  securityProfile: 'strict' | 'moderate' | 'permissive';
  version: string;
  lastUpdated?: string;
  fileSystemAccess?: string;
  networkAccess?: string;
  workflowsEnabled?: boolean;
}

export interface SecurityProfile {
  strict: string[];
  moderate: string[];
  permissive: string[];
} 