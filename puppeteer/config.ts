interface Credentials {
  username: string;
  password: string;
}

interface RedditConfig {
  signInCredentials: Credentials;
}

interface PuppeteerConfig {
  reddit: RedditConfig;
  screenshotsAbsolutePath: string;
}

const username: string = process.env.GABO_REDDIT_SIGNINCREDENTIALS_USERNAME;
const password: string = process.env.GABO_REDDIT_SIGNINCREDENTIALS_PASSWORD;

if (!(username && password)) {
  throw new Error('You need to configure "GABO_REDDIT_SIGNINCREDENTIALS_USERNAME" and "GABO_REDDIT_SIGNINCREDENTIALS_PASSWORD", refer to the README: https://github.com/gabrielweyer/ui-tests/blob/main/README.md.');
}

const screenshotsAbsolutePath = process.env.GABO_SCREENSHOTS_ABSOLUTEPATH || './screenshots';

if (screenshotsAbsolutePath.startsWith('$'))
{
  throw new Error(`The environment variable "GABO_SCREENSHOTS_ABSOLUTEPATH" is starting with "$" and has for value "${screenshotsAbsolutePath}", interpolation might not have worked as expected.`);
}

const mochaFile = process.env.MOCHA_FILE;

if (mochaFile && mochaFile.startsWith('$'))
{
  throw new Error(`The environment variable "MOCHA_FILE" is starting with "$" and has for value "${mochaFile}", interpolation might not have worked as expected.`);
}

const config: PuppeteerConfig = {
  reddit: {
    signInCredentials: {
      username: username,
      password: password
    }
  },
  screenshotsAbsolutePath: screenshotsAbsolutePath
};

export { config };
