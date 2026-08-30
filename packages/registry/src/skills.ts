import type { Env, Skill, SkillRow, ListSkillsParams, PublishPayload } from './types';

function rowToSkill(row: SkillRow): Skill {
  return {
    ...row,
    tags: JSON.parse(row.tags) as string[],
    frontmatter: JSON.parse(row.frontmatter) as Record<string, unknown>,
    is_verified: row.is_verified === 1,
  };
}

export async function listSkills(env: Env, params: ListSkillsParams): Promise<{ skills: Skill[]; total: number }> {
  const { limit, offset, author, tag, sort } = params;

  const conditions: string[] = [];
  const bindings: unknown[] = [];

  if (author) {
    conditions.push('s.author = ?');
    bindings.push(author);
  }
  if (tag) {
    // JSON array contains check using LIKE (works in SQLite/D1)
    conditions.push(`s.tags LIKE ?`);
    bindings.push(`%"${tag}"%`);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const orderMap: Record<string, string> = {
    installs: 'install_count DESC',
    updated: 'updated_at DESC',
    name: 'name ASC',
  };
  const orderBy = orderMap[sort] ?? 'install_count DESC';

  const [rows, countRow] = await Promise.all([
    env.DB.prepare(`SELECT * FROM skills s ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`)
      .bind(...bindings, limit, offset)
      .all<SkillRow>(),
    env.DB.prepare(`SELECT COUNT(*) as count FROM skills s ${where}`)
      .bind(...bindings)
      .first<{ count: number }>(),
  ]);

  return {
    skills: (rows.results ?? []).map(rowToSkill),
    total: countRow?.count ?? 0,
  };
}

export async function getSkill(env: Env, id: string): Promise<Skill | null> {
  const row = await env.DB.prepare('SELECT * FROM skills WHERE id = ?').bind(id).first<SkillRow>();
  return row ? rowToSkill(row) : null;
}

export async function searchSkills(env: Env, q: string, limit = 20, offset = 0): Promise<{ skills: Skill[]; total: number }> {
  // Use FTS5 for full-text search
  const [rows, countRow] = await Promise.all([
    env.DB.prepare(`
      SELECT s.* FROM skills s
      JOIN skills_fts f ON s.rowid = f.rowid
      WHERE skills_fts MATCH ?
      ORDER BY rank
      LIMIT ? OFFSET ?
    `)
      .bind(q, limit, offset)
      .all<SkillRow>(),
    env.DB.prepare(`
      SELECT COUNT(*) as count FROM skills s
      JOIN skills_fts f ON s.rowid = f.rowid
      WHERE skills_fts MATCH ?
    `)
      .bind(q)
      .first<{ count: number }>(),
  ]);

  return {
    skills: (rows.results ?? []).map(rowToSkill),
    total: countRow?.count ?? 0,
  };
}

export async function publishSkill(
  env: Env,
  payload: PublishPayload,
  publisherLogin: string,
): Promise<Skill> {
  const now = new Date().toISOString();

  // Check for existing skill — require version bump
  const existing = await env.DB.prepare('SELECT version FROM skills WHERE id = ?')
    .bind(payload.id)
    .first<{ version: string }>();

  if (existing && existing.version === payload.version) {
    throw new Error(
      `Version ${payload.version} already published for skill "${payload.id}". Bump the version to republish.`,
    );
  }

  const tagsJson = JSON.stringify(payload.tags ?? []);
  const frontmatterJson = JSON.stringify(payload.frontmatter ?? {});
  const createdAt = payload.created_at ?? now;
  const updatedAt = payload.updated_at ?? now;

  await env.DB.prepare(`
    INSERT INTO skills (id, name, description, author, publisher, tags, version, skill_path, content, frontmatter, created_at, updated_at, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (id) DO UPDATE SET
      name = excluded.name,
      description = excluded.description,
      publisher = excluded.publisher,
      tags = excluded.tags,
      version = excluded.version,
      skill_path = excluded.skill_path,
      content = excluded.content,
      frontmatter = excluded.frontmatter,
      updated_at = excluded.updated_at,
      published_at = excluded.published_at
  `)
    .bind(
      payload.id,
      payload.name,
      payload.description ?? null,
      payload.frontmatter?.author ?? publisherLogin,
      publisherLogin,
      tagsJson,
      payload.version,
      payload.skill_path ?? null,
      payload.content,
      frontmatterJson,
      createdAt,
      updatedAt,
      now,
    )
    .run();

  const row = await env.DB.prepare('SELECT * FROM skills WHERE id = ?')
    .bind(payload.id)
    .first<SkillRow>();

  return rowToSkill(row!);
}

export async function recordInstall(env: Env, skillId: string): Promise<void> {
  await Promise.all([
    env.DB.prepare('UPDATE skills SET install_count = install_count + 1 WHERE id = ?')
      .bind(skillId)
      .run(),
    env.DB.prepare('INSERT INTO install_events (skill_id) VALUES (?)')
      .bind(skillId)
      .run(),
  ]);
}
