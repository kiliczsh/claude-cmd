/**
 * Command Parser Script
 *
 * Generates commands.json from markdown files in the commands/ directory.
 *
 * Key Features:
 * - Optimized for package size: stores filePath instead of content
 * - Reduces commands.json from 2.4MB to 76kB (30x smaller)
 * - Supports YAML frontmatter for metadata
 * - Recursively scans subdirectories
 * - Ignores template and example files
 * - v2: emits { version: 2, skills: [...] } with frontmatter block per skill
 *
 * Usage: npm run parse-commands
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/** SKILL.md frontmatter fields extracted per skill */
export interface SkillFrontmatter {
  description: string | null;
  'argument-hint': string | null;
  'allowed-tools': string | null;
  model: string | null;
  context: string | null;
  'disable-model-invocation': boolean | null;
  'user-invocable': boolean | null;
}

export interface SkillV2 {
  id: string;
  name: string;
  description: string;
  /** New canonical field */
  skillPath: string;
  /** Legacy backward compat */
  filePath: string;
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  frontmatter: SkillFrontmatter;
}

export interface CommandsRegistryV2 {
  version: 2;
  skills: SkillV2[];
}

function parseMarkdownFile(filePath: string, relativePath: string): SkillV2 | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');

    // Check for YAML front matter
    const yamlMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    let name = fileName;
    let description = '';
    let author = 'claude-command';
    let tags: string[] = [];
    let created_at: string | null = null;
    let updated_at: string | null = null;
    let rawMeta: Record<string, unknown> = {};

    if (yamlMatch) {
      try {
        const yamlContent = yamlMatch[1];
        rawMeta = (yaml.load(yamlContent) as Record<string, unknown>) || {};

        name = (rawMeta['name'] as string) || fileName;
        description = (rawMeta['description'] as string) || '';
        author = (rawMeta['author'] as string) || 'claude-command';
        tags = Array.isArray(rawMeta['tags']) ? (rawMeta['tags'] as string[]) : [];
        created_at = (rawMeta['created_at'] as string) || null;
        updated_at = (rawMeta['updated_at'] as string) || null;
      } catch (yamlError) {
        console.error(`Error parsing YAML in ${filePath}:`, yamlError);
      }
    } else {
      // Fallback to simple parsing if no YAML front matter
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.startsWith('# ') && !name) {
          name = line.substring(2).trim();
        }
        if (!description && line.trim() && !line.startsWith('#')) {
          description = line.trim();
        }
      }
    }

    // Use file stats for dates if not provided
    const stats = fs.statSync(filePath);

    // Use relative path for ID — strip /SKILL.md suffix for new directory format
    const normalizedPath = relativePath.replace(/\\/g, '/');
    const commandId = normalizedPath.endsWith('/SKILL.md')
      ? normalizedPath.slice(0, -'/SKILL.md'.length)
      : normalizedPath.replace('.md', '');

    const frontmatter: SkillFrontmatter = {
      description: (rawMeta['description'] as string) || description || null,
      'argument-hint': (rawMeta['argument-hint'] as string) || null,
      'allowed-tools': (rawMeta['allowed-tools'] as string) || null,
      model: (rawMeta['model'] as string) || null,
      context: (rawMeta['context'] as string) || null,
      'disable-model-invocation':
        rawMeta['disable-model-invocation'] != null
          ? Boolean(rawMeta['disable-model-invocation'])
          : null,
      'user-invocable':
        rawMeta['user-invocable'] != null ? Boolean(rawMeta['user-invocable']) : null,
    };

    return {
      id: commandId,
      name: name || fileName,
      description: description || `Command for ${fileName}`,
      skillPath: relativePath,
      filePath: relativePath,
      author,
      tags: tags.length > 0 ? tags : ['general'],
      created_at: created_at || stats.birthtime.toISOString(),
      updated_at: updated_at || stats.mtime.toISOString(),
      frontmatter,
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

function getAllMarkdownFiles(dir: string, baseDir: string): { filePath: string; relativePath: string }[] {
  const results: { filePath: string; relativePath: string }[] = [];
  const items = fs.readdirSync(dir);

  // Files to ignore during parsing
  const ignoredFiles = ['TEMPLATE.md', 'README.md', 'template.md', 'example.md', '.template.md'];

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Check if this directory contains a SKILL.md (new format)
      const skillMdPath = path.join(fullPath, 'SKILL.md');
      if (fs.existsSync(skillMdPath)) {
        const relativePath = path.relative(baseDir, skillMdPath);
        results.push({ filePath: skillMdPath, relativePath });
      } else {
        // Recurse into subdirectories that don't have SKILL.md
        results.push(...getAllMarkdownFiles(fullPath, baseDir));
      }
    } else if (item.endsWith('.md') && !ignoredFiles.includes(item) && item !== 'SKILL.md') {
      // Legacy flat .md files (pre-migration)
      const relativePath = path.relative(baseDir, fullPath);
      results.push({ filePath: fullPath, relativePath });
    }
  }

  return results;
}

async function main() {
  const commandsDir = path.join(process.cwd(), 'commands');
  const outputDir = commandsDir;

  const markdownFiles = getAllMarkdownFiles(commandsDir, commandsDir);

  const skills: SkillV2[] = [];
  for (const { filePath, relativePath } of markdownFiles) {
    const parsed = parseMarkdownFile(filePath, relativePath);
    if (parsed) {
      skills.push(parsed);
    }
  }

  // Sort by ID
  skills.sort((a, b) => a.id.localeCompare(b.id));

  const registry: CommandsRegistryV2 = {
    version: 2,
    skills,
  };

  const jsonPath = path.join(outputDir, 'commands.json');
  fs.writeFileSync(jsonPath, JSON.stringify(registry, null, 2));
  console.log(`Generated ${jsonPath}`);
  console.log(`\nParsed ${skills.length} skills successfully!`);

  console.log('\nFound skills:');
  skills.forEach(skill => {
    console.log(`  ${skill.id} - ${skill.name}`);
  });
}

main().catch(console.error);
