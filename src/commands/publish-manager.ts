import * as fs from 'fs';
import * as path from 'path';
import { colorize } from '../utils/colors';
import { validateSkillFile, ValidationIssue } from './skill-validator';
import { getStoredAuth } from './auth-manager';

const REGISTRY_API = process.env['CLAUDE_CMD_REGISTRY_URL'] ?? 'https://claudecmd.com/api/v2';

interface SkillFrontmatter {
  name?: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

interface ParsedSkill {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  tags: string[];
  content: string;
  skill_path: string;
  frontmatter: SkillFrontmatter;
  created_at: string;
  updated_at: string;
}

function parseSkillMd(filePath: string): ParsedSkill {
  const content = fs.readFileSync(filePath, 'utf8');

  // Parse YAML frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`No YAML frontmatter found in ${filePath}`);

  const frontmatterText = match[1];
  const fm: SkillFrontmatter = {};

  for (const line of frontmatterText.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    // Parse arrays like ["a", "b"] or [a, b]
    if (typeof value === 'string' && value.startsWith('[')) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        value = (value as string).slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
      }
    }
    // Unquote strings
    if (typeof value === 'string') {
      value = (value as string).replace(/^["']|["']$/g, '');
    }

    fm[key] = value;
  }

  const now = new Date().toISOString();
  return {
    id: '',  // filled by caller
    name: (fm['name'] as string | undefined) ?? path.basename(path.dirname(filePath)),
    description: (fm['description'] as string | undefined) ?? '',
    version: (fm['version'] as string | undefined) ?? '1.0.0',
    author: (fm['author'] as string | undefined) ?? 'unknown',
    tags: (fm['tags'] as string[] | undefined) ?? [],
    content,
    skill_path: path.relative(path.dirname(path.dirname(filePath)), filePath),
    frontmatter: fm,
    created_at: (fm['created_at'] as string | undefined) ?? now,
    updated_at: (fm['updated_at'] as string | undefined) ?? now,
  };
}

function deriveSkillId(pluginDir: string, _skillFile: string): string {
  // Derive id from directory structure: category/skill-name
  const pluginName = path.basename(path.resolve(pluginDir));
  const category = path.basename(path.dirname(path.resolve(pluginDir)));

  // If inside a category dir (e.g. commands/git/my-skill/SKILL.md), use category/name
  if (category && category !== '.' && !category.startsWith('.')) {
    return `${category}/${pluginName}`;
  }
  return pluginName;
}

function findSkillFiles(dir: string): string[] {
  const results: string[] = [];
  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === 'SKILL.md') {
        results.push(fullPath);
      }
    }
  }
  walk(dir);
  return results;
}

export async function publish(opts: { dir?: string; dryRun?: boolean }): Promise<void> {
  const pluginDir = path.resolve(opts.dir ?? '.');

  if (!fs.existsSync(pluginDir)) {
    console.error(colorize.error(`Directory not found: ${pluginDir}`));
    process.exit(1);
  }

  const auth = getStoredAuth();
  if (!auth && !opts.dryRun) {
    console.error(colorize.error('Not authenticated. Run `claude-cmd login` first.'));
    process.exit(1);
  }

  // Discover SKILL.md files
  const skillFiles = findSkillFiles(pluginDir);
  if (skillFiles.length === 0) {
    console.error(colorize.error(`No SKILL.md files found in ${pluginDir}`));
    console.log(colorize.info('Run `claude-cmd plugin init` to scaffold a plugin directory.'));
    process.exit(1);
  }

  console.log('');
  console.log(colorize.highlight(`┌─ Publishing Plugin ──────────────────────────────`));
  console.log(`│  Directory: ${pluginDir}`);
  console.log(`│  Skills:    ${skillFiles.length} SKILL.md file(s)`);
  console.log(`│  Registry:  ${REGISTRY_API}`);
  if (opts.dryRun) console.log(`│  Mode:      ${colorize.warning('dry-run')}`);
  console.log('└──────────────────────────────────────────────────');
  console.log('');

  // Validate all skills first
  console.log(colorize.info('Validating skills...'));
  let allValid = true;
  for (const skillFile of skillFiles) {
    const result = validateSkillFile(skillFile);
    const rel = path.relative(pluginDir, skillFile);
    if (result.errors.length > 0) {
      console.log(`  ${colorize.error('✗')} ${rel}`);
      result.errors.forEach((e: ValidationIssue) => console.log(`    ${colorize.error(e.message)}`));
      allValid = false;
    } else if (result.warnings.length > 0) {
      console.log(`  ${colorize.warning('⚠')} ${rel} (${result.warnings.length} warning(s))`);
    } else {
      console.log(`  ${colorize.success('✓')} ${rel}`);
    }
  }

  if (!allValid) {
    console.log('');
    console.error(colorize.error('Validation failed. Fix errors before publishing.'));
    process.exit(1);
  }

  console.log('');

  if (opts.dryRun) {
    console.log(colorize.warning('[dry-run] No files published. Validation passed.'));
    return;
  }

  // Publish each skill
  let published = 0;
  let skipped = 0;

  for (const skillFile of skillFiles) {
    const skill = parseSkillMd(skillFile);
    skill.id = deriveSkillId(pluginDir, skillFile);

    try {
      const res = await fetch(`${REGISTRY_API}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth!.githubToken}`,
          'User-Agent': 'claude-cmd/1.0',
        },
        body: JSON.stringify({
          id: skill.id,
          name: skill.name,
          description: skill.description,
          version: skill.version,
          content: skill.content,
          tags: skill.tags,
          skill_path: skill.skill_path,
          frontmatter: skill.frontmatter,
          created_at: skill.created_at,
          updated_at: skill.updated_at,
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        skill?: { id: string };
        error?: string;
        install_command?: string;
      };

      if (res.status === 409) {
        console.log(`  ${colorize.warning('–')} ${skill.id} — ${data.error ?? 'version conflict'}`);
        skipped++;
      } else if (!res.ok || !data.ok) {
        console.log(`  ${colorize.error('✗')} ${skill.id} — ${data.error ?? `HTTP ${res.status}`}`);
      } else {
        console.log(`  ${colorize.success('✓')} ${skill.id} @ v${skill.version}`);
        if (data.install_command) {
          console.log(`    ${colorize.dim(data.install_command)}`);
        }
        published++;
      }
    } catch (err) {
      console.log(`  ${colorize.error('✗')} ${skill.id} — ${(err as Error).message}`);
    }
  }

  console.log('');
  if (published > 0) {
    console.log(colorize.success(`✓ Published ${published} skill(s) to ${REGISTRY_API}`));
  }
  if (skipped > 0) {
    console.log(colorize.warning(`  ${skipped} skill(s) skipped (version bump required)`));
  }
}
