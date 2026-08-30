import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface ValidationIssue {
  level: 'error' | 'warning';
  field: string | null;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  filePath: string;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  /** agentskills.io compliance — true when no spec violations found */
  agentskillsCompatible?: boolean;
}

// All tools exposed by Claude Code
const KNOWN_TOOLS = new Set([
  'Agent', 'AskUserQuestion', 'Bash', 'CronCreate', 'CronDelete', 'CronList',
  'Edit', 'EnterPlanMode', 'EnterWorktree', 'ExitPlanMode', 'ExitWorktree',
  'Glob', 'Grep', 'LSP', 'ListMcpResourcesTool', 'MultiEdit', 'NotebookEdit',
  'Read', 'ReadMcpResourceTool', 'SendMessage', 'Task', 'TaskOutput', 'TaskStop',
  'TeamCreate', 'TeamDelete', 'TodoWrite', 'WebFetch', 'WebSearch', 'Write',
]);

/**
 * agentskills.io open standard field constraints.
 * Spec: https://agentskills.io/specification
 *
 * Field mapping: claude-cmd → agentskills.io
 *   name              → name          (required in both)
 *   description       → description   (warning here; required by spec)
 *   author            → metadata.author
 *   tags              → metadata.tags
 *   version           → metadata.version
 *   created_at        → metadata.created_at
 *   updated_at        → metadata.updated_at
 *   allowed-tools     → allowed-tools (spec: space-delimited; claude-cmd: comma-delimited — both accepted)
 *   user-invocable    → (Claude Code extension — no spec equivalent)
 *   model             → (Claude Code extension — no spec equivalent)
 *   disable-model-invocation → (Claude Code extension — no spec equivalent)
 *   argument-hint     → (Claude Code extension — no spec equivalent)
 *   license           → license       (spec field, optional)
 *   compatibility     → compatibility (spec field, optional, max 500 chars)
 *   metadata          → metadata      (spec field, optional key-value map)
 */
const AGENTSKILLS_NAME_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;
const AGENTSKILLS_NAME_MAX = 64;
const AGENTSKILLS_DESC_MAX = 1024;
const AGENTSKILLS_COMPAT_MAX = 500;

function parseFrontmatter(content: string): { frontmatter: Record<string, unknown> | null; error: string | null } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { frontmatter: null, error: 'No frontmatter block found (expected --- delimiters at start of file)' };
  }
  try {
    const parsed = yaml.load(match[1]) as Record<string, unknown>;
    return { frontmatter: parsed || {}, error: null };
  } catch (e) {
    return { frontmatter: null, error: `Invalid YAML in frontmatter: ${(e as Error).message}` };
  }
}

/**
 * Parse allowed-tools value — accepts both space-delimited (agentskills.io spec)
 * and comma-delimited (claude-cmd legacy) formats.
 */
function parseAllowedTools(raw: string): string[] {
  // If the value contains commas, treat as comma-delimited (claude-cmd format).
  // Otherwise treat as space-delimited (agentskills.io spec format).
  if (raw.includes(',')) {
    return raw.split(',').map(t => t.trim()).filter(Boolean);
  }
  return raw.split(/\s+/).filter(Boolean);
}

function isKnownTool(t: string): boolean {
  if (KNOWN_TOOLS.has(t) || t.startsWith('mcp__')) return false;
  const scopedMatch = t.match(/^(\w+)\(.+\)$/);
  if (scopedMatch && KNOWN_TOOLS.has(scopedMatch[1])) return false;
  return true; // unknown
}

export function validateSkillContent(content: string, filePath: string): ValidationResult {
  const result: ValidationResult = { valid: false, filePath, errors: [], warnings: [] };

  const { frontmatter, error: parseError } = parseFrontmatter(content);
  if (parseError || !frontmatter) {
    result.errors.push({ level: 'error', field: null, message: parseError || 'Empty frontmatter' });
    return result;
  }

  // ── Required: name ──────────────────────────────────────────────────────────
  const name = frontmatter['name'];
  if (!name || String(name).trim() === '') {
    result.errors.push({ level: 'error', field: 'name', message: 'Required field "name" is missing or empty' });
  } else {
    const nameStr = String(name).trim();

    // agentskills.io: max 64 chars
    if (nameStr.length > AGENTSKILLS_NAME_MAX) {
      result.errors.push({
        level: 'error', field: 'name',
        message: `"name" exceeds ${AGENTSKILLS_NAME_MAX} characters (agentskills.io spec limit)`,
      });
    }

    // agentskills.io: lowercase letters, numbers, hyphens only; no leading/trailing hyphen
    if (!AGENTSKILLS_NAME_RE.test(nameStr)) {
      result.warnings.push({
        level: 'warning', field: 'name',
        message: `"name" should use only lowercase letters, numbers, and hyphens with no leading/trailing hyphens (agentskills.io spec)`,
      });
    }

    // agentskills.io: name must match parent directory name
    const dirName = path.basename(path.dirname(filePath));
    if (dirName !== nameStr && dirName !== 'commands') {
      result.warnings.push({
        level: 'warning', field: 'name',
        message: `"name" ("${nameStr}") does not match parent directory name ("${dirName}") — agentskills.io spec requires they match`,
      });
    }
  }

  // ── description ─────────────────────────────────────────────────────────────
  const description = frontmatter['description'];
  if (!description || String(description).trim() === '') {
    // agentskills.io makes description *required*; we keep it as a warning for backward compatibility
    result.warnings.push({
      level: 'warning', field: 'description',
      message: '"description" is missing — required by the agentskills.io spec for cross-tool portability',
    });
  } else if (String(description).length > AGENTSKILLS_DESC_MAX) {
    result.warnings.push({
      level: 'warning', field: 'description',
      message: `"description" exceeds ${AGENTSKILLS_DESC_MAX} characters (agentskills.io spec limit)`,
    });
  }

  // ── user-invocable (Claude Code extension) ──────────────────────────────────
  const userInvocable = frontmatter['user-invocable'];
  if (userInvocable === undefined || userInvocable === null) {
    result.warnings.push({ level: 'warning', field: 'user-invocable', message: '"user-invocable" is not set — set to true or false to clarify invocation intent' });
  } else if (typeof userInvocable !== 'boolean') {
    result.errors.push({ level: 'error', field: 'user-invocable', message: '"user-invocable" must be a boolean (true or false)' });
  }

  // ── allowed-tools — accepts space-delimited (spec) and comma-delimited (legacy) ─
  const allowedTools = frontmatter['allowed-tools'];
  if (allowedTools !== undefined && allowedTools !== null) {
    if (typeof allowedTools !== 'string') {
      result.errors.push({ level: 'error', field: 'allowed-tools', message: '"allowed-tools" must be a string (space-delimited per agentskills.io spec, or comma-delimited for Claude Code)' });
    } else {
      const tools = parseAllowedTools(allowedTools);
      const unknown = tools.filter(isKnownTool);
      if (unknown.length > 0) {
        result.errors.push({ level: 'error', field: 'allowed-tools', message: `Unknown tool(s) in "allowed-tools": ${unknown.join(', ')}` });
      }
      if (tools.includes('Bash')) {
        result.warnings.push({ level: 'warning', field: 'allowed-tools', message: '"Bash" is included without restriction — consider limiting scope if possible' });
      }
    }
  }

  // ── model (Claude Code extension) ───────────────────────────────────────────
  const model = frontmatter['model'];
  if (model !== undefined && model !== null) {
    if (typeof model !== 'string' || !String(model).startsWith('claude-')) {
      result.errors.push({ level: 'error', field: 'model', message: `"model" value "${model}" is not a recognized Claude model (must start with "claude-")` });
    }
  }

  // ── disable-model-invocation (Claude Code extension) ────────────────────────
  const dmi = frontmatter['disable-model-invocation'];
  if (dmi !== undefined && dmi !== null && typeof dmi !== 'boolean') {
    result.errors.push({ level: 'error', field: 'disable-model-invocation', message: '"disable-model-invocation" must be a boolean' });
  }

  // ── argument-hint (Claude Code extension) ───────────────────────────────────
  const argHint = frontmatter['argument-hint'];
  if (argHint !== undefined && argHint !== null) {
    if (typeof argHint !== 'string' || String(argHint).trim() === '') {
      result.errors.push({ level: 'error', field: 'argument-hint', message: '"argument-hint" must be a non-empty string' });
    }
  }

  // ── compatibility (agentskills.io field) ────────────────────────────────────
  const compatibility = frontmatter['compatibility'];
  if (compatibility !== undefined && compatibility !== null) {
    if (typeof compatibility !== 'string') {
      result.errors.push({ level: 'error', field: 'compatibility', message: '"compatibility" must be a string describing environment requirements' });
    } else if (String(compatibility).length > AGENTSKILLS_COMPAT_MAX) {
      result.warnings.push({
        level: 'warning', field: 'compatibility',
        message: `"compatibility" exceeds ${AGENTSKILLS_COMPAT_MAX} characters (agentskills.io spec limit)`,
      });
    }
  }

  // ── metadata (agentskills.io field) ─────────────────────────────────────────
  const metadata = frontmatter['metadata'];
  if (metadata !== undefined && metadata !== null) {
    if (typeof metadata !== 'object' || Array.isArray(metadata)) {
      result.errors.push({ level: 'error', field: 'metadata', message: '"metadata" must be a key-value mapping (object)' });
    }
  }

  // ── license (agentskills.io field) ──────────────────────────────────────────
  const license = frontmatter['license'];
  if (license !== undefined && license !== null) {
    if (typeof license !== 'string' || String(license).trim() === '') {
      result.errors.push({ level: 'error', field: 'license', message: '"license" must be a non-empty string (license name or path to license file)' });
    }
  }

  result.valid = result.errors.length === 0;

  // Determine agentskills.io compatibility: valid + has description + name passes spec format
  const hasDescription = !!(description && String(description).trim() !== '');
  const nameStr = name ? String(name).trim() : '';
  const namePassesSpec = nameStr.length > 0 && nameStr.length <= AGENTSKILLS_NAME_MAX && AGENTSKILLS_NAME_RE.test(nameStr);
  result.agentskillsCompatible = result.valid && hasDescription && namePassesSpec;

  return result;
}

export function validateSkillFile(filePath: string): ValidationResult {
  if (!fs.existsSync(filePath)) {
    return {
      valid: false,
      filePath,
      errors: [{ level: 'error', field: null, message: `File not found: ${filePath}` }],
      warnings: [],
    };
  }

  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return {
      valid: false,
      filePath,
      errors: [{ level: 'error', field: null, message: `Cannot read file: ${(e as Error).message}` }],
      warnings: [],
    };
  }

  return validateSkillContent(content, filePath);
}

export function printValidationResult(result: ValidationResult, jsonMode: boolean): void {
  if (jsonMode) {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    return;
  }

  const { filePath, errors, warnings, agentskillsCompatible } = result;
  console.log(`\nValidating: ${filePath}`);

  if (errors.length === 0 && warnings.length === 0) {
    const compatBadge = agentskillsCompatible ? ' [agentskills.io ✓]' : '';
    console.log(`✓ Valid — no issues found.${compatBadge}`);
    return;
  }

  errors.forEach(e => {
    const field = e.field ? ` [${e.field}]` : '';
    console.error(`  ERROR${field}: ${e.message}`);
  });

  warnings.forEach(w => {
    const field = w.field ? ` [${w.field}]` : '';
    console.warn(`  WARN${field}: ${w.message}`);
  });

  if (errors.length > 0) {
    console.error(`\n✗ ${errors.length} error(s), ${warnings.length} warning(s)`);
  } else {
    const compatBadge = agentskillsCompatible ? ' [agentskills.io ✓]' : ' [agentskills.io: fix warnings for full portability]';
    console.warn(`\n⚠ ${warnings.length} warning(s) — skill is usable but could be improved${compatBadge}`);
  }
}
