/**
 * CMD-36: Migrate commands to SKILL.md directory format
 *
 * Converts: commands/<cat>/<name>.md
 * Into:     commands/<cat>/<name>/SKILL.md
 *
 * All 180 commands already have YAML frontmatter — this is a pure
 * filesystem restructuring operation. No content changes.
 *
 * Usage: bun run scripts/migrate-to-skill-dirs.ts [--dry-run]
 */
import * as fs from 'fs';
import * as path from 'path';

const IGNORED_FILES = new Set(['TEMPLATE.md', 'README.md', 'template.md', 'example.md', '.template.md']);

function getAllMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      results.push(...getAllMarkdownFiles(fullPath));
    } else if (item.endsWith('.md') && !IGNORED_FILES.has(item) && item !== 'SKILL.md') {
      results.push(fullPath);
    }
  }
  return results;
}

function main() {
  const dryRun = process.argv.includes('--dry-run');
  const commandsDir = path.join(process.cwd(), 'commands');
  const files = getAllMarkdownFiles(commandsDir);

  console.log(`Found ${files.length} command files to migrate${dryRun ? ' (DRY RUN)' : ''}\n`);

  let migrated = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const filePath of files) {
    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, '.md');
    const skillDir = path.join(dir, baseName);
    const skillFile = path.join(skillDir, 'SKILL.md');

    // Skip if already migrated
    if (fs.existsSync(skillFile)) {
      console.log(`  SKIP (exists): ${path.relative(commandsDir, skillFile)}`);
      skipped++;
      continue;
    }

    console.log(`  ${path.relative(commandsDir, filePath)} -> ${path.relative(commandsDir, skillFile)}`);

    if (!dryRun) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        fs.mkdirSync(skillDir, { recursive: true });
        fs.writeFileSync(skillFile, content);
        fs.unlinkSync(filePath);
        migrated++;
      } catch (err) {
        errors.push(`${filePath}: ${err}`);
      }
    } else {
      migrated++;
    }
  }

  console.log(`\nMigration ${dryRun ? 'preview' : 'complete'}:`);
  console.log(`  Migrated: ${migrated}`);
  console.log(`  Skipped:  ${skipped}`);
  if (errors.length > 0) {
    console.error(`  Errors:   ${errors.length}`);
    errors.forEach(e => console.error(`    ${e}`));
    process.exit(1);
  }

  if (!dryRun) {
    console.log('\nNext step: run `npm run parse-commands` to regenerate commands.json');
  }
}

main();
