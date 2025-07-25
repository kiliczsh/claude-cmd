import fs from 'fs';
import path from 'path';

let cachedVersion: string | null = null;

/**
 * Gets the current package version from package.json
 * @returns The version string from package.json or fallback version
 */
export function getPackageVersion(): string {
  if (cachedVersion !== null) {
    return cachedVersion;
  }

  try {
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version || '1.0.0';
    cachedVersion = version;
    return version;
  } catch (error) {
    // Fallback version if reading package.json fails
    const fallbackVersion = '1.0.0';
    cachedVersion = fallbackVersion;
    return fallbackVersion;
  }
}

/**
 * Gets the full application name with version
 * @returns Formatted string like "Claude CMD v1.1.0"
 */
export function getAppNameWithVersion(): string {
  const version = getPackageVersion();
  return `Claude CMD v${version}`;
}