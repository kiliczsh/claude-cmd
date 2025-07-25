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
  | 'subagents'
  | 'search_subagents'
  | 'help' 
  | 'exit'
  | 'back'
  | 'cancel'
  | 'main_menu'
  | ''
  | '--- Configuration ---'
  | '--- Advanced ---'
  | '--- Help ---';

export interface MenuChoice {
  name: string;
  value: MenuAction;
}

export type SettingsAction = 'view' | 'back' | 'cancel' | 'main_menu';
export type HelpAction = 'overview' | 'quickstart' | 'files' | 'cli' | 'back' | 'cancel' | 'main_menu';
export type ClaudeMdAction = 'create' | 'edit' | 'validate' | 'list' | 'back' | 'cancel' | 'main_menu';
export type WorkflowAction = 'templates' | 'practices' | 'back' | 'cancel' | 'main_menu';
export type PermissionsAction = 'status' | 'practices' | 'back' | 'cancel' | 'main_menu';

// Navigation-related types
export interface NavigationState {
  currentPath: string[];
  history: string[][];
  canGoBack: boolean;
}

export interface MenuContext {
  title: string;
  level: number;
  parent?: string;
}

export interface MenuConfiguration {
  title: string;
  showBreadcrumb?: boolean;
  showSeparators?: boolean;
  pageSize?: number;
  allowBack?: boolean;
  allowCancel?: boolean;
  allowMainMenu?: boolean;
  allowEscBack?: boolean;
}

// Cancellation handling
export class CancellationError extends Error {
  constructor(message: string = 'Operation cancelled by user') {
    super(message);
    this.name = 'CancellationError';
  }
}

export interface CancellableResult<T> {
  cancelled: boolean;
  result?: T;
}

export type CancellablePromise<T> = Promise<T | null>; 