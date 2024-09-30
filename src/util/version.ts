export function getVersion(): string {
  try {
    // First try .app-version.json (used during development)
    // eslint-disable-next-line node/no-unpublished-require
    const appVersion = require('../../.app-version.json');
    return appVersion.version;
  } catch (e) {
    // If that fails, try package.json
    // eslint-disable-next-line node/no-unpublished-require
    const packageJson = require('../../package.json');
    return packageJson.version;
  }
}
