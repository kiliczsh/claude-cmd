// Helper function to create RGB color codes
const rgb = (r: number, g: number, b: number): string => `\x1b[38;2;${r};${g};${b}m`;
const bgRgb = (r: number, g: number, b: number): string => `\x1b[48;2;${r};${g};${b}m`;

// Console colors for better UX - Updated with custom color palette
export const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  // Custom color palette
  primary: rgb(204, 120, 92),     // #CC785C - Main color
  secondary: rgb(130, 129, 121),  // #828179 - Secondary
  light: rgb(240, 239, 234),      // #F0EFEA - Light
  white: rgb(255, 255, 255),      // #FFFFFF - White
  dark: rgb(20, 20, 19),          // #141413 - Dark

  // Standard ANSI colors (keeping for compatibility)
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  ansiWhite: '\x1b[37m',

  // Background colors
  bgPrimary: bgRgb(204, 120, 92),    // #CC785C background
  bgSecondary: bgRgb(130, 129, 121), // #828179 background
  bgLight: bgRgb(240, 239, 234),     // #F0EFEA background
  bgWhite: bgRgb(255, 255, 255),     // #FFFFFF background
  bgDark: bgRgb(20, 20, 19),         // #141413 background
  
  // Standard ANSI backgrounds (keeping for compatibility)
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgAnsiWhite: '\x1b[47m'
} as const;

// Helper functions for common color combinations - Updated with new palette
export const colorize = {
  error: (text: string): string => `${colors.red}❌ ${text}${colors.reset}`,
  success: (text: string): string => `${colors.green}✓ ${text}${colors.reset}`,
  warning: (text: string): string => `${colors.yellow}⚠️  ${text}${colors.reset}`,
  info: (text: string): string => `${colors.secondary}ℹ️  ${text}${colors.reset}`,
  highlight: (text: string): string => `${colors.primary}${colors.bright}${text}${colors.reset}`,
  primary: (text: string): string => `${colors.primary}${text}${colors.reset}`,
  secondary: (text: string): string => `${colors.secondary}${text}${colors.reset}`,
  light: (text: string): string => `${colors.light}${text}${colors.reset}`,
  dark: (text: string): string => `${colors.dark}${text}${colors.reset}`,
  dim: (text: string): string => `${colors.secondary}${colors.dim}${text}${colors.reset}`,
  bold: (text: string): string => `${colors.primary}${colors.bright}${text}${colors.reset}`,
  underline: (text: string): string => `${colors.primary}${colors.underscore}${text}${colors.reset}`
} as const;

// Emoji helpers
export const emoji = {
  success: '✓',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  search: '🔍',
  install: '📦',
  delete: '🗑️',
  list: '📋',
  config: '⚙️',
  help: '❓',
  exit: '👋',
  file: '📄',
  folder: '📁',
  rocket: '🚀',
  star: '⭐',
  gear: '⚙️',
  lock: '🔒',
  key: '🔑',
  cloud: '☁️',
  download: '⬇️',
  upload: '⬆️'
} as const; 