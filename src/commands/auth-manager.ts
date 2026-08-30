import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { colorize } from '../utils/colors';
import type { ClaudeAuth, ClaudeConfig } from '../types/config';

const REGISTRY_API = process.env['CLAUDE_CMD_REGISTRY_URL'] ?? 'https://claudecmd.com/api/v2';
const GITHUB_CLIENT_ID = process.env['CLAUDE_CMD_GITHUB_CLIENT_ID'] ?? 'Ov23liXXXXXXXXXXXXXX'; // placeholder

const CONFIG_FILE = path.join(os.homedir(), '.claude', 'settings.json');

function readConfig(): ClaudeConfig {
  if (!fs.existsSync(CONFIG_FILE)) return { allowedTools: [], securityProfile: 'moderate', version: '1.0.0' };
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) as ClaudeConfig;
  } catch {
    return { allowedTools: [], securityProfile: 'moderate', version: '1.0.0' };
  }
}

function writeConfig(config: ClaudeConfig): void {
  const dir = path.dirname(CONFIG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
}

export function getStoredAuth(): ClaudeAuth | null {
  return readConfig().auth ?? null;
}

async function deviceFlowLogin(): Promise<{ token: string; login: string; name: string | null }> {
  // Step 1: Request device code
  const deviceRes = await fetch('https://github.com/login/device/code', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, scope: 'read:user' }),
  });

  if (!deviceRes.ok) throw new Error('Failed to start GitHub device flow');

  const deviceData = (await deviceRes.json()) as {
    device_code: string;
    user_code: string;
    verification_uri: string;
    expires_in: number;
    interval: number;
  };

  console.log('');
  console.log(colorize.highlight('┌─ GitHub Authentication ──────────────────────────'));
  console.log(`│  Open: ${colorize.bold(deviceData.verification_uri)}`);
  console.log(`│  Code: ${colorize.bold(deviceData.user_code)}`);
  console.log('└──────────────────────────────────────────────────');
  console.log('');
  console.log(colorize.info('Waiting for you to authorize in your browser...'));

  // Try to open browser
  try {
    const { execSync } = await import('child_process');
    const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    execSync(`${openCmd} "${deviceData.verification_uri}"`, { stdio: 'ignore' });
  } catch {
    // ignore — user can open manually
  }

  // Step 2: Poll for token
  const pollInterval = Math.max(deviceData.interval ?? 5, 5) * 1000;
  const expiresAt = Date.now() + deviceData.expires_in * 1000;

  while (Date.now() < expiresAt) {
    await new Promise((r) => setTimeout(r, pollInterval));

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        device_code: deviceData.device_code,
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      }),
    });

    const tokenData = (await tokenRes.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (tokenData.access_token) {
      // Fetch user info
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'User-Agent': 'claude-cmd/1.0',
        },
      });
      if (!userRes.ok) throw new Error('Failed to fetch GitHub user profile');
      const user = (await userRes.json()) as { login: string; name: string | null };
      return { token: tokenData.access_token, login: user.login, name: user.name };
    }

    if (tokenData.error === 'access_denied') throw new Error('Access denied — authorization cancelled');
    if (tokenData.error === 'expired_token') throw new Error('Code expired. Please run login again.');
    // authorization_pending or slow_down → keep polling
    if (tokenData.error === 'slow_down') await new Promise((r) => setTimeout(r, 5000));
  }

  throw new Error('Login timed out. Please try again.');
}

export async function login(token?: string): Promise<void> {
  let githubToken: string;
  let githubLogin: string;
  let githubName: string | null;

  if (token) {
    // Manual token provided
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'claude-cmd/1.0' },
    });
    if (!userRes.ok) throw new Error('Invalid GitHub token');
    const user = (await userRes.json()) as { login: string; name: string | null };
    githubToken = token;
    githubLogin = user.login;
    githubName = user.name;
  } else {
    const result = await deviceFlowLogin();
    githubToken = result.token;
    githubLogin = result.login;
    githubName = result.name;
  }

  const auth: ClaudeAuth = {
    githubToken,
    githubLogin,
    githubName,
    savedAt: new Date().toISOString(),
  };

  const config = readConfig();
  config.auth = auth;
  writeConfig(config);

  console.log('');
  console.log(colorize.success(`✓ Logged in as ${colorize.bold(githubLogin)}${githubName ? ` (${githubName})` : ''}`));
  console.log(colorize.dim(`  Token saved to ~/.claude/settings.json`));
}

export function whoami(): void {
  const auth = getStoredAuth();
  if (!auth) {
    console.log(colorize.warning('Not logged in. Run `claude-cmd login` to authenticate.'));
    return;
  }
  console.log('');
  console.log(colorize.highlight('┌─ Authenticated User ─────────────────────────────'));
  console.log(`│  Login:    ${colorize.bold(auth.githubLogin)}`);
  if (auth.githubName) console.log(`│  Name:     ${auth.githubName}`);
  console.log(`│  Registry: ${REGISTRY_API}`);
  console.log(`│  Saved:    ${new Date(auth.savedAt).toLocaleString()}`);
  console.log('└──────────────────────────────────────────────────');
  console.log('');
}

export function logout(): void {
  const config = readConfig();
  if (!config.auth) {
    console.log(colorize.warning('Not logged in.'));
    return;
  }
  const login = config.auth.githubLogin;
  delete config.auth;
  writeConfig(config);
  console.log(colorize.success(`✓ Logged out ${login}`));
}
