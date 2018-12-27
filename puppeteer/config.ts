interface GitHubCredentials {
  username: string;
  password: string;
}

interface PublicProfileConfig {
  username: string;
  expectedFullname: string;
}

interface GitHubConfig {
  publicProfile: PublicProfileConfig;
  signInCredentials: GitHubCredentials;
}

interface PuppeteerConfig {
  gitHub: GitHubConfig;
  screenshotsAbsolutePath: string;
}

const username: string = process.env.GABO_GITHUB_SIGNINCREDENTIALS_USERNAME;
const password: string = process.env.GABO_GITHUB_SIGNINCREDENTIALS_PASSWORD;

if (!(username && password)) {
  throw new Error('You need to configure "GABO_GITHUB_SIGNINCREDENTIALS_USERNAME" and "GABO_GITHUB_SIGNINCREDENTIALS_PASSWORD", refer to the README: https://github.com/gabrielweyer/ui-tests/blob/master/README.md.');
}

const config: PuppeteerConfig = {
  gitHub: {
    publicProfile: {
      username: 'gabrielweyer',
      expectedFullname: 'Gabriel Weyer'
    },
    signInCredentials: {
      username: username,
      password: password
    }
  },
  screenshotsAbsolutePath: process.env.GABO_SCREENSHOTS_ABSOLUTEPATH || './screenshots'
};

export { config };
