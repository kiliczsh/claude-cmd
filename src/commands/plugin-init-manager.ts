import * as fs from 'fs';
import * as path from 'path';
import { input, confirm } from '@inquirer/prompts';
import { validateSkillContent, printValidationResult } from './skill-validator';
import { colorize } from '../utils/colors';

export interface PluginInitOptions {
  name?: string;
  description?: string;
  author?: string;
  skills?: string[];
  outputDir?: string;
  nonInteractive?: boolean;
}

interface PluginJson {
  name: string;
  version: string;
  description: string;
  author: string;
  skills: string[];
}

function isKebabCase(name: string): boolean {
  return /^[a-z][a-z0-9-]*$/.test(name) && !name.includes('--');
}

function generateSkillMd(pluginName: string, skillName: string, description: string, author: string): string {
  const now = new Date().toISOString();
  return `---
allowed-tools: Read, Write, Edit, Bash
name: "${skillName}"
description: "${description}"
author: "${author}"
tags: ["${pluginName}"]
version: "0.1.0"
user-invocable: true
created_at: "${now}"
updated_at: "${now}"
---

# ${skillName}

${description}

## Usage

Describe how to use this skill.

## Examples

Provide examples of typical usage.

$ARGUMENTS
`;
}

function generateReadme(pluginName: string, description: string, author: string, skills: string[]): string {
  return `# ${pluginName}

${description}

## Author

${author}

## Skills

${skills.map(s => `- \`${s}\``).join('\n')}

## Installation

\`\`\`bash
claude-cmd plugin install ${pluginName}
\`\`\`

## Usage

After installation, the following skills will be available in Claude Code:

${skills.map(s => `- \`/${s}\``).join('\n')}
`;
}

export class PluginInitManager {
  async initPlugin(opts: PluginInitOptions = {}): Promise<void> {
    console.log(colorize.info('\nPlugin scaffolding wizard\n'));

    let pluginName: string;
    let description: string;
    let author: string;
    let skills: string[];

    if (opts.nonInteractive) {
      // Non-interactive mode: require --name at minimum
      if (!opts.name) {
        console.error(colorize.error('--name is required in non-interactive mode'));
        process.exit(1);
      }
      if (!isKebabCase(opts.name)) {
        console.error(colorize.error(`Plugin name must be kebab-case (lowercase letters, numbers, hyphens). Got: "${opts.name}"`));
        process.exit(1);
      }
      pluginName = opts.name;
      description = opts.description || `${pluginName} plugin`;
      author = opts.author || '';
      skills = opts.skills && opts.skills.length > 0 ? opts.skills : [`${pluginName}-skill`];
    } else {
      // Interactive mode
      pluginName = await input({
        message: 'Plugin name (kebab-case):',
        default: opts.name,
        validate: (val) => {
          if (!val) return 'Name is required';
          if (!isKebabCase(val)) return 'Name must be kebab-case (lowercase letters, numbers, hyphens only, e.g. my-plugin)';
          return true;
        },
      });

      description = await input({
        message: 'Description:',
        default: opts.description || `${pluginName} plugin`,
      });

      author = await input({
        message: 'Author:',
        default: opts.author || '',
      });

      const firstSkill = await input({
        message: 'First skill name (kebab-case):',
        default: opts.skills?.[0] || `${pluginName}-skill`,
        validate: (val) => {
          if (!val) return 'Skill name is required';
          if (!isKebabCase(val)) return 'Skill name must be kebab-case';
          return true;
        },
      });
      skills = [firstSkill];
    }

    const outputDir = opts.outputDir || process.cwd();
    const pluginDir = path.join(outputDir, pluginName);

    // Check if plugin directory already exists
    if (fs.existsSync(pluginDir)) {
      if (!opts.nonInteractive) {
        const overwrite = await confirm({
          message: `Directory "${pluginName}" already exists. Overwrite?`,
          default: false,
        });
        if (!overwrite) {
          console.log(colorize.info('Cancelled.'));
          return;
        }
      } else {
        console.error(colorize.error(`Directory "${pluginName}" already exists`));
        process.exit(1);
      }
    }

    // Create directory structure
    const claudePluginDir = path.join(pluginDir, '.claude-plugin');
    fs.mkdirSync(claudePluginDir, { recursive: true });

    // Create skills directories
    for (const skill of skills) {
      fs.mkdirSync(path.join(pluginDir, 'skills', skill), { recursive: true });
    }

    // Write plugin.json
    const pluginJson: PluginJson = {
      name: pluginName,
      version: '0.1.0',
      description,
      author,
      skills,
    };
    fs.writeFileSync(
      path.join(claudePluginDir, 'plugin.json'),
      JSON.stringify(pluginJson, null, 2) + '\n',
    );

    // Write SKILL.md for each skill
    const skillPaths: string[] = [];
    for (const skill of skills) {
      const skillMdPath = path.join(pluginDir, 'skills', skill, 'SKILL.md');
      const skillMdContent = generateSkillMd(pluginName, skill, description, author);
      fs.writeFileSync(skillMdPath, skillMdContent);
      skillPaths.push(skillMdPath);
    }

    // Write README.md
    fs.writeFileSync(
      path.join(pluginDir, 'README.md'),
      generateReadme(pluginName, description, author, skills),
    );

    console.log(colorize.success(`\nCreated plugin directory: ${pluginDir}`));
    console.log('  .claude-plugin/plugin.json');
    skills.forEach(s => console.log(`  skills/${s}/SKILL.md`));
    console.log('  README.md\n');

    // Validate generated SKILL.md files
    let allValid = true;
    for (const skillMdPath of skillPaths) {
      const content = fs.readFileSync(skillMdPath, 'utf-8');
      const result = validateSkillContent(content, skillMdPath);
      printValidationResult(result, false);
      if (!result.valid) {
        allValid = false;
      }
    }

    if (allValid) {
      console.log(colorize.success('\nPlugin scaffolded successfully!'));
      console.log(colorize.info(`Next steps:`));
      console.log(`  1. Edit ${pluginName}/skills/${skills[0]}/SKILL.md to define your skill`);
      console.log(`  2. Run: claude-cmd validate ${pluginName}/skills/${skills[0]}/SKILL.md`);
    } else {
      console.error(colorize.error('\nGenerated SKILL.md has validation errors. Please fix them before publishing.'));
      process.exit(1);
    }
  }
}
