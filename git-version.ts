import {execSync} from 'child_process';
import {writeFileSync} from 'node:fs';

function getGitVersion(): string {
  try {
    // Get the latest Git tag
    const latestTag = execSync('git describe --tags --abbrev=0 2>/dev/null')
      .toString()
      .trim();

    // Get the number of commits since the latest tag
    const commitCount = parseInt(
      execSync(`git rev-list ${latestTag}..HEAD --count`).toString().trim(),
      10
    );

    // Remove v prefix from tag
    let version = latestTag.replace(/^v/, '');

    if (commitCount > 0) {
      // Get the commit SHA of the latest commit
      const commitSha = execSync('git rev-parse --short HEAD')
        .toString()
        .trim();

      // Append count and SHA
      version += `+dev.${commitCount}-${commitSha}`;
    }

    // Check if there are uncommitted changes
    try {
      execSync('git diff-index --quiet HEAD --');
    } catch (error) {
      // There are uncommitted changes. Append -dirty
      version += '-dirty';
    }

    return version;
  } catch (error) {
    // Return default version if there's an error
    console.log('Error getting version from Git:', error);
    return '0.0.1';
  }
}

// Write the version to a JSON file
const json = JSON.stringify(
  {
    version: getGitVersion(),
  },
  null,
  2
);
writeFileSync('./.app-version.json', json);
