let config = {};

config.gitHub = {};

config.gitHub.publicProfile = {};

config.gitHub.publicProfile.username = 'gabrielweyer';
config.gitHub.publicProfile.expectedFullname = 'Gabriel Weyer';

config.gitHub.signInCredentials = {};

const username = process.env.GITHUB_SIGNINCREDENTIALS_USERNAME;
const password = process.env.GITHUB_SIGNINCREDENTIALS_PASSWORD;

if (username && password) {
  config.gitHub.signInCredentials.username = username;
  config.gitHub.signInCredentials.password = password;
} else {
  throw new Error('You need to configure "GITHUB_SIGNINCREDENTIALS_USERNAME" and "GITHUB_SIGNINCREDENTIALS_PASSWORD", refer to the README: https://github.com/gabrielweyer/ui-tests/blob/master/README.md.');
}

module.exports = config;
