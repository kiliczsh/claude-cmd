/**
 * Seed the registry D1 database with all skills from commands.json.
 *
 * Usage:
 *   bun run scripts/seed.ts                    # local D1 (dev)
 *   REMOTE=true bun run scripts/seed.ts        # remote D1 (production)
 *
 * The script reads ../../commands/commands.json relative to this file and
 * batches INSERT statements into D1 via the Wrangler REST API.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

interface SkillFrontmatter {
  description?: string;
  'argument-hint'?: string | null;
  'allowed-tools'?: string | null;
  model?: string | null;
  context?: string | null;
  'disable-model-invocation'?: boolean | null;
  'user-invocable'?: boolean | null;
  author?: string;
  tags?: string[];
  version?: string;
  created_at?: string;
  updated_at?: string;
}

interface CommandsJsonSkill {
  id: string;
  name: string;
  description?: string;
  skillPath?: string;
  filePath?: string;
  author?: string;
  tags?: string[];
  version?: string;
  created_at?: string;
  updated_at?: string;
  frontmatter?: SkillFrontmatter;
}

interface CommandsJson {
  version: number;
  skills: CommandsJsonSkill[];
}

const commandsJsonPath = join(__dirname, '..', '..', '..', 'commands', 'commands.json');
const data: CommandsJson = JSON.parse(readFileSync(commandsJsonPath, 'utf-8'));
const skills = data.skills;

const isRemote = process.env['REMOTE'] === 'true';
const dbName = process.env['DB_NAME'] ?? 'registry';

console.log(`Seeding ${skills.length} skills into D1 database "${dbName}" (${isRemote ? 'REMOTE' : 'LOCAL'})...`);

const BATCH_SIZE = 20;

function escapeSQL(str: string | null | undefined): string {
  if (str == null) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function buildInsert(skill: CommandsJsonSkill): string {
  const id = escapeSQL(skill.id);
  const name = escapeSQL(skill.name);
  const description = escapeSQL(skill.description ?? skill.frontmatter?.description ?? null);
  const author = escapeSQL(skill.author ?? skill.frontmatter?.author ?? 'community');
  const tags = escapeSQL(JSON.stringify(skill.tags ?? skill.frontmatter?.tags ?? []));
  const version = escapeSQL(skill.version ?? skill.frontmatter?.version ?? '1.0.0');
  const skillPath = escapeSQL(skill.skillPath ?? skill.filePath ?? null);
  const frontmatter = escapeSQL(JSON.stringify(skill.frontmatter ?? {}));
  const createdAt = escapeSQL(skill.created_at ?? skill.frontmatter?.created_at ?? new Date().toISOString());
  const updatedAt = escapeSQL(skill.updated_at ?? skill.frontmatter?.updated_at ?? new Date().toISOString());

  return `INSERT OR REPLACE INTO skills (id, name, description, author, tags, version, skill_path, frontmatter, created_at, updated_at)
VALUES (${id}, ${name}, ${description}, ${author}, ${tags}, ${version}, ${skillPath}, ${frontmatter}, ${createdAt}, ${updatedAt});`;
}

// Split into batches and run via wrangler
let batchNum = 0;
for (let i = 0; i < skills.length; i += BATCH_SIZE) {
  batchNum++;
  const batch = skills.slice(i, i + BATCH_SIZE);
  const sql = batch.map(buildInsert).join('\n');

  // Write SQL to temp file
  const tmpFile = `/tmp/registry_seed_batch_${batchNum}.sql`;
  require('fs').writeFileSync(tmpFile, sql);

  const remoteFlag = isRemote ? '--remote' : '--local';
  const cmd = `wrangler d1 execute ${dbName} ${remoteFlag} --file ${tmpFile}`;

  try {
    execSync(cmd, { stdio: 'inherit', cwd: join(__dirname, '..') });
    console.log(`  ✓ Batch ${batchNum} (${batch.length} skills)`);
  } catch (err) {
    console.error(`  ✗ Batch ${batchNum} failed:`, err);
    process.exit(1);
  }
}

console.log(`\nDone. Seeded ${skills.length} skills in ${batchNum} batches.`);
