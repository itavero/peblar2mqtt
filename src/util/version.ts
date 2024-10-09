export function getVersion(): string {
  try {
    // First try .app-version.json (used during development)
    // eslint-disable-next-line n/no-unpublished-require
    const appVersion = require('../../.app-version.json');
    return appVersion.version;
  } catch (e) {
    // If that fails, try package.json

    const packageJson = require('../../package.json');
    return packageJson.version;
  }
}
