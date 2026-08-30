import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { colorize } from '../utils/colors';

export type RuleScope = 'global' | 'project' | 'local';

export interface Rule {
  text: string;
  scope: RuleScope;
  sourceFile: string;
  lineNumber: number;
}

function getScopeFile(scope: RuleScope): string {
  switch (scope) {
    case 'global':
      return path.join(os.homedir(), '.claude', 'CLAUDE.md');
    case 'project':
      return path.join(process.cwd(), 'CLAUDE.md');
    case 'local':
      return path.join(process.cwd(), 'CLAUDE.local.md');
  }
}

function getScopeFromFile(filePath: string): RuleScope {
  const home = os.homedir();
  const cwd = process.cwd();
  if (filePath === path.join(home, '.claude', 'CLAUDE.md')) return 'global';
  if (filePath === path.join(cwd, 'CLAUDE.local.md')) return 'local';
  return 'project';
}

function parseRulesFromContent(content: string, sourceFile: string): Rule[] {
  const scope = getScopeFromFile(sourceFile);
  const rules: Rule[] = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') && trimmed.length > 2) {
      rules.push({
        text: trimmed.slice(2).trim(),
        scope,
        sourceFile,
        lineNumber: i + 1,
      });
    }
  }
  return rules;
}

function getAllClaudeMdFiles(): Array<{ filePath: string; scope: RuleScope }> {
  const files: Array<{ filePath: string; scope: RuleScope }> = [];

  const globalFile = getScopeFile('global');
  if (fs.existsSync(globalFile)) files.push({ filePath: globalFile, scope: 'global' });

  const projectFile = getScopeFile('project');
  if (fs.existsSync(projectFile)) files.push({ filePath: projectFile, scope: 'project' });

  const localFile = getScopeFile('local');
  if (fs.existsSync(localFile)) files.push({ filePath: localFile, scope: 'local' });

  return files;
}

function readFileOrEmpty(filePath: string): string {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function displayName(filePath: string): string {
  const home = os.homedir();
  const cwd = process.cwd();
  if (filePath.startsWith(home)) return filePath.replace(home, '~');
  if (filePath.startsWith(cwd)) return path.relative(cwd, filePath);
  return filePath;
}

export class RulesManager {
  list(scope?: RuleScope): void {
    const files = getAllClaudeMdFiles().filter(f => !scope || f.scope === scope);

    if (files.length === 0) {
      console.log(colorize.warning('No CLAUDE.md files found.'));
      return;
    }

    let totalRules = 0;
    for (const { filePath, scope: fileScope } of files) {
      const content = readFileOrEmpty(filePath);
      const rules = parseRulesFromContent(content, filePath);

      if (rules.length === 0) continue;

      const scopeLabel = fileScope === 'global' ? colorize.info('[global]') :
                         fileScope === 'project' ? colorize.success('[project]') :
                         colorize.warning('[local]');
      console.log(`\n${scopeLabel} ${colorize.dim(displayName(filePath))}`);

      for (const rule of rules) {
        console.log(`  ${colorize.dim('•')} ${rule.text}`);
        totalRules++;
      }
    }

    if (totalRules === 0) {
      console.log(colorize.warning('No rules (list items) found in CLAUDE.md files.'));
    } else {
      console.log(`\n${colorize.dim(`Total: ${totalRules} rule(s)`)}`);
    }
  }

  add(ruleText: string, scope: RuleScope = 'project'): void {
    if (!ruleText.trim()) {
      console.error(colorize.error('Rule text cannot be empty.'));
      process.exit(1);
    }

    const filePath = getScopeFile(scope);
    const content = readFileOrEmpty(filePath);
    const existing = parseRulesFromContent(content, filePath);

    const duplicate = existing.find(r => r.text.toLowerCase() === ruleText.trim().toLowerCase());
    if (duplicate) {
      console.log(colorize.warning(`Rule already exists in ${displayName(filePath)} (line ${duplicate.lineNumber}).`));
      return;
    }

    // Ensure parent directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let newContent: string;
    if (!content.trim()) {
      newContent = `# Rules\n\n- ${ruleText.trim()}\n`;
    } else {
      const trimmed = content.trimEnd();
      newContent = `${trimmed}\n- ${ruleText.trim()}\n`;
    }

    fs.writeFileSync(filePath, newContent, 'utf8');
    const scopeLabel = scope === 'global' ? 'global' : scope === 'project' ? 'project' : 'local';
    console.log(colorize.success(`Added rule to ${scopeLabel} (${displayName(filePath)})`));
    console.log(colorize.dim(`  - ${ruleText.trim()}`));
  }

  async remove(ruleText?: string): Promise<void> {
    const files = getAllClaudeMdFiles();
    const allRules: Rule[] = [];

    for (const { filePath } of files) {
      const content = readFileOrEmpty(filePath);
      allRules.push(...parseRulesFromContent(content, filePath));
    }

    if (allRules.length === 0) {
      console.log(colorize.warning('No rules found to remove.'));
      return;
    }

    let ruleToRemove: Rule | undefined;

    if (ruleText) {
      ruleToRemove = allRules.find(r => r.text.toLowerCase() === ruleText.trim().toLowerCase());
      if (!ruleToRemove) {
        console.error(colorize.error(`Rule not found: "${ruleText}"`));
        process.exit(1);
      }
    } else {
      const { select } = await import('@inquirer/prompts');
      const chosen = await select<number>({
        message: 'Select a rule to remove:',
        choices: allRules.map((r, i) => ({
          name: `[${r.scope}] ${r.text}`,
          value: i,
        })),
      });
      ruleToRemove = allRules[chosen];
    }

    const content = fs.readFileSync(ruleToRemove.sourceFile, 'utf8');
    const lines = content.split('\n');
    const lineIdx = ruleToRemove.lineNumber - 1;

    if (lines[lineIdx]?.trim() !== `- ${ruleToRemove.text}`) {
      console.error(colorize.error('Could not locate rule line (file may have changed). Please edit the file manually.'));
      process.exit(1);
    }

    lines.splice(lineIdx, 1);
    fs.writeFileSync(ruleToRemove.sourceFile, lines.join('\n'), 'utf8');
    console.log(colorize.success(`Removed rule from ${displayName(ruleToRemove.sourceFile)}`));
    console.log(colorize.dim(`  - ${ruleToRemove.text}`));
  }

  importFromSkill(skillName: string): void {
    const skillsBaseDir = path.join(os.homedir(), '.claude', 'skills');
    const skillDir = path.join(skillsBaseDir, skillName);
    const skillMdPath = path.join(skillDir, 'SKILL.md');
    const claudeMdPath = path.join(skillDir, 'CLAUDE.md');

    let sourcePath: string | undefined;
    if (fs.existsSync(claudeMdPath)) {
      sourcePath = claudeMdPath;
    } else if (fs.existsSync(skillMdPath)) {
      sourcePath = skillMdPath;
    }

    if (!sourcePath) {
      console.error(colorize.error(`Skill '${skillName}' not found at ${skillDir}`));
      console.log(colorize.info('Use "claude-cmd plugin install <name>" to install a skill first.'));
      process.exit(1);
    }

    const content = fs.readFileSync(sourcePath, 'utf8');
    const rules = parseRulesFromContent(content, sourcePath);

    if (rules.length === 0) {
      console.log(colorize.warning(`No rules (list items) found in ${skillName}'s ${path.basename(sourcePath)}.`));
      return;
    }

    const projectFile = getScopeFile('project');
    const projectContent = readFileOrEmpty(projectFile);
    const existing = parseRulesFromContent(projectContent, projectFile);
    const existingTexts = new Set(existing.map(r => r.text.toLowerCase()));

    let added = 0;
    let skipped = 0;

    let newContent = projectContent.trimEnd();
    if (!newContent) newContent = '# Rules';

    for (const rule of rules) {
      if (existingTexts.has(rule.text.toLowerCase())) {
        skipped++;
        continue;
      }
      newContent += `\n- ${rule.text}`;
      added++;
    }

    if (added > 0) {
      newContent += '\n';
      const dir = path.dirname(projectFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(projectFile, newContent, 'utf8');
    }

    console.log(colorize.success(`Imported from ${skillName}: ${added} added, ${skipped} skipped (duplicates)`));
    if (added > 0) {
      console.log(colorize.dim(`  Written to: ${displayName(projectFile)}`));
    }
  }
}
