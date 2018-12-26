let config = {};

config.gitHub = {};

config.gitHub.publicProfile = {};

config.gitHub.publicProfile.username = 'gabrielweyer';
config.gitHub.publicProfile.expectedFullname = 'Gabriel Weyer';

config.gitHub.signInCredentials = {};

const username = process.env.GABO_GITHUB_SIGNINCREDENTIALS_USERNAME;
const password = process.env.GABO_GITHUB_SIGNINCREDENTIALS_PASSWORD;

if (username && password) {
  config.gitHub.signInCredentials.username = username;
  config.gitHub.signInCredentials.password = password;
} else {
  throw new Error('You need to configure "GABO_GITHUB_SIGNINCREDENTIALS_USERNAME" and "GABO_GITHUB_SIGNINCREDENTIALS_PASSWORD", refer to the README: https://github.com/gabrielweyer/ui-tests/blob/master/README.md.');
}

config.screenshotsAbsolutePath = process.env.GABO_SCREENSHOTS_ABSOLUTEPATH || './screenshots';

module.exports = config;
