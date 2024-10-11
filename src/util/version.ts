export function getVersion(): string {
  try {
    // First try .app-version.json (used during development)

    const appVersion = require('../../.app-version.json');
    return appVersion.version;
  } catch (e) {
    // If that fails, try package.json

    const packageJson = require('../../package.json');
    return packageJson.version;
  }
}
