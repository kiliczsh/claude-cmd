export type MenuAction = 
  | 'list' 
  | 'search' 
  | 'install' 
  | 'delete' 
  | 'claudemd' 
  | 'init' 
  | 'permissions' 
  | 'mcp' 
  | 'workflows' 
  | 'settings' 
  | 'help' 
  | 'exit'
  | ''
  | '--- Configuration ---'
  | '--- Advanced ---'
  | '--- Help ---';

export interface MenuChoice {
  name: string;
  value: MenuAction;
}

export type SettingsAction = 'view' | 'back';
export type HelpAction = 'overview' | 'quickstart' | 'files' | 'cli' | 'back';
export type ClaudeMdAction = 'create' | 'edit' | 'validate' | 'list' | 'back';
export type WorkflowAction = 'templates' | 'practices' | 'back';
export type PermissionsAction = 'status' | 'practices' | 'back'; 