import type { Env, Publisher } from './types';

/**
 * Exchange a GitHub OAuth code for an access token, then fetch the
 * authenticated user's profile.  Returns the GitHub login on success.
 */
export async function exchangeGithubCode(
  code: string,
  env: Env,
): Promise<{ login: string; id: number; name: string | null; avatar_url: string | null }> {
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  if (!tokenRes.ok) throw new Error('Failed to exchange GitHub OAuth code');

  const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };
  if (!tokenData.access_token) throw new Error(tokenData.error ?? 'No access token returned');

  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'User-Agent': 'claude-cmd-registry/1.0',
    },
  });
  if (!userRes.ok) throw new Error('Failed to fetch GitHub user profile');

  const user = (await userRes.json()) as {
    login: string;
    id: number;
    name: string | null;
    avatar_url: string;
  };
  return { login: user.login, id: user.id, name: user.name, avatar_url: user.avatar_url };
}

/**
 * Verify a Bearer token (GitHub access token) and return the publisher record.
 * Creates the publisher row on first login.
 */
export async function verifyToken(request: Request, env: Env): Promise<Publisher | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);

  // Validate with GitHub
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'claude-cmd-registry/1.0',
    },
  });
  if (!res.ok) return null;

  const user = (await res.json()) as {
    login: string;
    id: number;
    name: string | null;
    avatar_url: string;
  };

  // Upsert publisher
  await env.DB.prepare(`
    INSERT INTO publishers (github_login, github_id, name, avatar_url, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT (github_login) DO UPDATE SET
      github_id = excluded.github_id,
      name = excluded.name,
      avatar_url = excluded.avatar_url,
      updated_at = excluded.updated_at
  `)
    .bind(user.login, user.id, user.name, user.avatar_url)
    .run();

  return {
    github_login: user.login,
    github_id: user.id,
    name: user.name,
    avatar_url: user.avatar_url,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
