export interface SubAgent {
  name: string;
  description: string;
  tools?: string[];
  systemPrompt: string;
  filePath: string;
  location: 'global' | 'local';
  created_at?: string;
  updated_at?: string;
  author?: string;
  version?: string;
}

export interface SubAgentFrontMatter {
  name: string;
  description: string;
  tools?: string | string[];
  author?: string;
  version?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ParsedSubAgent {
  frontMatter: SubAgentFrontMatter;
  systemPrompt: string;
}

export type SubAgentAction = 
  | 'list'
  | 'create' 
  | 'edit'
  | 'delete'
  | 'validate'
  | 'import'
  | 'export'
  | 'back'
  | 'cancel'
  | 'main_menu';

export interface SubAgentTemplate {
  name: string;
  description: string;
  defaultTools: string[];
  systemPromptTemplate: string;
  category: string;
}

export const DEFAULT_SUB_AGENT_TOOLS = [
  'Read',
  'Edit', 
  'Grep',
  'Glob',
  'Bash',
  'Write'
];

export const AVAILABLE_TOOLS = [
  'Read',
  'Edit',
  'MultiEdit', 
  'Write',
  'Grep',
  'Glob',
  'Bash',
  'LS',
  'Task',
  'WebFetch',
  'WebSearch',
  'TodoWrite',
  'NotebookRead',
  'NotebookEdit'
];

export const SUB_AGENT_TEMPLATES: SubAgentTemplate[] = [
  {
    name: 'code-reviewer',
    description: 'Expert code review specialist focusing on best practices and security',
    defaultTools: ['Read', 'Grep', 'Glob', 'LS'],
    systemPromptTemplate: `You are a senior code reviewer with expertise in multiple programming languages and frameworks.

Your role is to:
- Review code for bugs, security vulnerabilities, and performance issues
- Suggest improvements following best practices and coding standards  
- Identify potential architectural concerns
- Provide constructive feedback with clear explanations

Focus on being thorough but constructive in your reviews.`,
    category: 'development'
  },
  {
    name: 'debugger',
    description: 'Specialized debugging assistant for identifying and fixing issues',
    defaultTools: ['Read', 'Edit', 'Bash', 'Grep', 'Glob'],
    systemPromptTemplate: `You are a debugging specialist focused on identifying and resolving software issues.

Your role is to:
- Analyze error messages and stack traces
- Identify root causes of bugs and issues
- Suggest specific fixes and debugging strategies
- Help implement solutions step by step

Be systematic in your debugging approach and explain your reasoning.`,
    category: 'development'
  },
  {
    name: 'data-analyst',
    description: 'Data analysis and visualization specialist',
    defaultTools: ['Read', 'NotebookRead', 'NotebookEdit', 'Write', 'Bash'],
    systemPromptTemplate: `You are a data analysis expert specializing in exploratory data analysis and insights.

Your role is to:
- Analyze datasets and identify patterns
- Create visualizations and summary statistics
- Suggest data cleaning and preprocessing steps
- Provide insights and recommendations based on data

Focus on clear, actionable insights from data analysis.`,
    category: 'analysis'
  }
];