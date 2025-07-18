import { input } from '@inquirer/prompts';
import { colorize } from './colors';

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

export class NavigationStack {
  private stack: string[][] = [];
  private maxStackSize = 10;

  push(path: string[]): void {
    this.stack.push([...path]);
    if (this.stack.length > this.maxStackSize) {
      this.stack.shift();
    }
  }

  pop(): string[] | undefined {
    return this.stack.pop();
  }

  peek(): string[] | undefined {
    return this.stack.length > 0 ? [...this.stack[this.stack.length - 1]] : undefined;
  }

  canGoBack(): boolean {
    return this.stack.length > 0;
  }

  clear(): void {
    this.stack = [];
  }

  size(): number {
    return this.stack.length;
  }
}

export class MenuNavigator {
  private navigationStack = new NavigationStack();
  private currentPath: string[] = [];
  private shouldExit = false;

  constructor() {
    this.setupGracefulExit();
    this.setupEscKeyListener();
  }

  private setupGracefulExit(): void {
    process.on('SIGINT', () => {
      if (this.currentPath.length > 0) {
        console.log(colorize.info('\n\n🔄 Use "← Back" option to navigate up, or press Ctrl+C again to exit'));
        this.shouldExit = true;
      } else {
        console.log(colorize.success('\n👋 Thank you for using Claude CMD!'));
        process.exit(0);
      }
    });
  }

  private setupEscKeyListener(): void {
    // ESC key handling is now integrated into the enhanced select wrapper
    // See NavigationUtils.enhancedSelect method
  }

  enterMenu(menuName: string, _context?: MenuContext): void {
    if (this.currentPath.length > 0) {
      this.navigationStack.push([...this.currentPath]);
    }
    this.currentPath.push(menuName);
    this.shouldExit = false;
  }

  exitMenu(): string | undefined {
    if (this.currentPath.length > 0) {
      this.currentPath.pop();
    }
    
    const previousPath = this.navigationStack.pop();
    if (previousPath && previousPath.length > 0) {
      this.currentPath = [...previousPath];
      return this.currentPath[this.currentPath.length - 1];
    }
    
    return undefined;
  }

  getCurrentPath(): string[] {
    return [...this.currentPath];
  }

  getBreadcrumb(): string {
    if (this.currentPath.length === 0) {
      return 'Main Menu';
    }
    return this.currentPath.join(' > ');
  }

  canGoBack(): boolean {
    return this.currentPath.length > 0 || this.navigationStack.canGoBack();
  }

  getBackButtonText(): string {
    if (this.currentPath.length <= 1) {
      return '← Back to Main Menu';
    }
    return `← Back to ${this.currentPath[this.currentPath.length - 2]}`;
  }

  shouldShowExit(): boolean {
    return this.shouldExit;
  }

  resetNavigation(): void {
    this.currentPath = [];
    this.navigationStack.clear();
    this.shouldExit = false;
  }

  async handleBackAction(): Promise<boolean> {
    const previousMenu = this.exitMenu();
    return previousMenu !== undefined;
  }

  async pauseForUser(message: string = 'Press Enter to continue...'): Promise<void> {
    await input({ message });
  }

  displayBreadcrumb(): void {
    const breadcrumb = this.getBreadcrumb();
    console.log(colorize.dim(`\n📍 ${breadcrumb}`));
  }

  // Navigation choice helpers
  static readonly BACK_CHOICE = { name: '← Back', value: 'back' };
  static readonly CANCEL_CHOICE = { name: '← Cancel', value: 'cancel' };
  static readonly MAIN_MENU_CHOICE = { name: '← Back to Main Menu', value: 'main_menu' };

  static createBackChoice(customText?: string) {
    return {
      name: customText || '← Back',
      value: 'back'
    };
  }

  static createCancelChoice(customText?: string) {
    return {
      name: customText || '← Cancel',
      value: 'cancel'
    };
  }

  static createMainMenuChoice() {
    return {
      name: '← Back to Main Menu',
      value: 'main_menu'
    };
  }
}

// Global navigation instance
export const globalNavigator = new MenuNavigator();

// Navigation utilities
export class NavigationUtils {
  static addNavigationChoices(choices: any[], navigator: MenuNavigator): any[] {
    const navigationChoices = [...choices];
    
    if (navigator.canGoBack()) {
      navigationChoices.push({
        name: navigator.getBackButtonText(),
        value: 'back'
      });
    }
    
    return navigationChoices;
  }

  static async enhancedSelect<T>(config: {
    message: string;
    choices: Array<{ name: string; value: T }>;
    allowEscBack?: boolean;
    pageSize?: number;
  }): Promise<T> {
    const { select } = await import('@inquirer/prompts');
    
    // Add helpful keyboard shortcuts to the message
    const enhancedMessage = config.allowEscBack 
      ? `${config.message} ${colorize.dim('(Use arrow keys, Enter to select, Ctrl+C to exit)')}`
      : config.message;

    // Add back option if ESC back is enabled and not already present
    const enhancedChoices = [...config.choices];
    if (config.allowEscBack && !enhancedChoices.some(c => c.value === 'back')) {
      enhancedChoices.push({ name: '← Back', value: 'back' as T });
    }

    try {
      const result = await select<T>({
        message: enhancedMessage,
        choices: enhancedChoices,
        pageSize: config.pageSize
      });

      return result;
    } catch (error) {
      // Handle inquirer cancellation (Ctrl+C)
      if (error instanceof Error && (error.name === 'ExitPromptError' || error.message.includes('User force closed'))) {
        return 'back' as T;
      }
      throw error;
    }
  }

  static async handleNavigationAction(
    action: string,
    navigator: MenuNavigator,
    callback?: () => Promise<void>
  ): Promise<boolean> {
    switch (action) {
      case 'back':
        return await navigator.handleBackAction();
      case 'cancel':
        return await navigator.handleBackAction();
      case 'main_menu':
        navigator.resetNavigation();
        return true;
      default:
        if (callback) {
          await callback();
        }
        return false;
    }
  }

  static clearScreenWithWelcome(showWelcome: () => void): void {
    console.clear();
    showWelcome();
  }

  static async confirmAction(
    message: string,
    defaultValue: boolean = false
  ): Promise<boolean> {
    const { confirm } = await import('@inquirer/prompts');
    return await confirm({
      message,
      default: defaultValue
    });
  }

  static displayMenuSeparator(title: string): void {
    console.log(colorize.dim(`\n─── ${title} ───`));
  }
}

// Menu configuration helpers
export interface MenuConfig {
  title: string;
  showBreadcrumb?: boolean;
  showSeparators?: boolean;
  pageSize?: number;
}

export class MenuBuilder {
  private choices: any[] = [];
  private config: MenuConfig;

  constructor(config: MenuConfig) {
    this.config = config;
  }

  addChoice(name: string, value: any, icon?: string): MenuBuilder {
    this.choices.push({
      name: icon ? `${icon} ${name}` : name,
      value
    });
    return this;
  }

  addSeparator(title: string): MenuBuilder {
    if (this.config.showSeparators !== false) {
      this.choices.push({
        name: `--- ${title} ---`,
        value: `--- ${title} ---`
      });
    }
    return this;
  }

  addBackChoice(navigator: MenuNavigator): MenuBuilder {
    if (navigator.canGoBack()) {
      this.choices.push({
        name: navigator.getBackButtonText(),
        value: 'back'
      });
    }
    return this;
  }

  addCancelChoice(): MenuBuilder {
    this.choices.push(MenuNavigator.createCancelChoice());
    return this;
  }

  addMainMenuChoice(): MenuBuilder {
    this.choices.push(MenuNavigator.createMainMenuChoice());
    return this;
  }

  getChoices(): any[] {
    return this.choices;
  }

  getConfig(): MenuConfig {
    return this.config;
  }
}