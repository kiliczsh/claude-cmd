import { AutoRouter, cors, error, json } from 'itty-router';
import type { Env } from './types';
import { listSkills, getSkill, searchSkills, publishSkill, recordInstall } from './skills';
import { verifyToken, exchangeGithubCode } from './auth';

const { preflight, corsify } = cors({
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
});

const router = AutoRouter<Request, [Env]>({
  before: [preflight],
  finally: [corsify],
});

// ─── Health ─────────────────────────────────────────────────────────────────

router.get('/', () => json({ name: 'claude-cmd registry', version: 'v2', status: 'ok' }));

// ─── Skills ─────────────────────────────────────────────────────────────────

router.get('/api/v2/skills', async (req, env: Env) => {
  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20', 10), 100);
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10);
  const author = url.searchParams.get('author') ?? undefined;
  const tag = url.searchParams.get('tag') ?? undefined;
  const sortParam = url.searchParams.get('sort') ?? 'installs';
  const sort = ['installs', 'updated', 'name'].includes(sortParam)
    ? (sortParam as 'installs' | 'updated' | 'name')
    : 'installs';

  const result = await listSkills(env, { limit, offset, author, tag, sort });
  return json({
    data: result.skills,
    meta: {
      total: result.total,
      limit,
      offset,
      has_more: offset + limit < result.total,
    },
  });
});

router.get('/api/v2/skills/:id', async (req, env: Env) => {
  const id = decodeURIComponent((req as Request & { params: { id: string } }).params.id);
  const skill = await getSkill(env, id);
  if (!skill) return error(404, { error: 'Skill not found' });
  return json(skill);
});

// ─── Search ──────────────────────────────────────────────────────────────────

router.get('/api/v2/search', async (req, env: Env) => {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');
  if (!q || q.trim().length < 2) {
    return error(400, { error: 'Query must be at least 2 characters' });
  }
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20', 10), 100);
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10);

  const result = await searchSkills(env, q.trim(), limit, offset);
  return json({
    data: result.skills,
    meta: { total: result.total, limit, offset, query: q },
  });
});

// ─── Install tracking ────────────────────────────────────────────────────────

router.post('/api/v2/skills/:id/install', async (req, env: Env) => {
  const id = decodeURIComponent((req as Request & { params: { id: string } }).params.id);
  const skill = await getSkill(env, id);
  if (!skill) return error(404, { error: 'Skill not found' });
  await recordInstall(env, id);
  return json({ ok: true });
});

// ─── Publish ─────────────────────────────────────────────────────────────────

router.post('/api/v2/publish', async (req, env: Env) => {
  const publisher = await verifyToken(req, env);
  if (!publisher) return error(401, { error: 'Authentication required. Provide a GitHub token.' });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return error(400, { error: 'Invalid JSON body' });
  }

  const payload = body as {
    id?: unknown;
    name?: unknown;
    version?: unknown;
    content?: unknown;
    description?: unknown;
    tags?: unknown;
    skill_path?: unknown;
    frontmatter?: unknown;
  };

  if (!payload.id || typeof payload.id !== 'string') {
    return error(400, { error: 'Field "id" is required (e.g. "agent/my-skill")' });
  }
  if (!payload.name || typeof payload.name !== 'string') {
    return error(400, { error: 'Field "name" is required' });
  }
  if (!payload.version || typeof payload.version !== 'string') {
    return error(400, { error: 'Field "version" is required' });
  }
  if (!payload.content || typeof payload.content !== 'string') {
    return error(400, { error: 'Field "content" is required (SKILL.md content)' });
  }

  try {
    const skill = await publishSkill(
      env,
      {
        id: payload.id,
        name: payload.name,
        version: payload.version,
        content: payload.content,
        description: typeof payload.description === 'string' ? payload.description : undefined,
        tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
        skill_path: typeof payload.skill_path === 'string' ? payload.skill_path : undefined,
        frontmatter:
          payload.frontmatter && typeof payload.frontmatter === 'object'
            ? (payload.frontmatter as Record<string, unknown>)
            : {},
      },
      publisher.github_login,
    );

    return json({ ok: true, skill, install_command: `claude-cmd install ${skill.id}` }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message.includes('Version')) {
      return error(409, { error: err.message });
    }
    throw err;
  }
});

// ─── GitHub OAuth ────────────────────────────────────────────────────────────

router.get('/api/v2/auth/github', (req, env: Env) => {
  const url = new URL(req.url);
  const redirectUri = url.searchParams.get('redirect_uri') ?? 'https://claudecmd.com/auth/callback';
  const githubUrl = new URL('https://github.com/login/oauth/authorize');
  githubUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  githubUrl.searchParams.set('redirect_uri', redirectUri);
  githubUrl.searchParams.set('scope', 'read:user');
  return Response.redirect(githubUrl.toString(), 302);
});

router.get('/api/v2/auth/github/callback', async (req, env: Env) => {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) return error(400, { error: 'Missing OAuth code' });

  const user = await exchangeGithubCode(code, env);
  return json({
    github_login: user.login,
    name: user.name,
    avatar_url: user.avatar_url,
    message: 'Authenticated. Use your GitHub token with Authorization: Bearer <token> when publishing.',
  });
});

// ─── 404 ─────────────────────────────────────────────────────────────────────

router.all('*', () => error(404, { error: 'Not found' }));

export default {
  fetch: router.fetch,
} satisfies ExportedHandler<Env>;
