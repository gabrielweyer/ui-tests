interface Credentials {
  emailAddress: string;
  password: string;
}

interface PublicProfileConfig {
  username: string;
  expectedFullname: string;
}

interface GoodreadsConfig {
  publicProfile: PublicProfileConfig;
  signInCredentials: Credentials;
}

interface PuppeteerConfig {
  goodreads: GoodreadsConfig;
  screenshotsAbsolutePath: string;
}

const emailAddress: string = process.env.GABO_GOODREADS_SIGNINCREDENTIALS_EMAILADDRESS;
const password: string = process.env.GABO_GOODREADS_SIGNINCREDENTIALS_PASSWORD;

if (!(emailAddress && password)) {
  throw new Error('You need to configure "GABO_GOODREADS_SIGNINCREDENTIALS_EMAILADDRESS" and "GABO_GOODREADS_SIGNINCREDENTIALS_PASSWORD", refer to the README: https://github.com/gabrielweyer/ui-tests/blob/main/README.md.');
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
  goodreads: {
    publicProfile: {
      username: 'uitests',
      expectedFullname: 'UI Tests'
    },
    signInCredentials: {
      emailAddress: emailAddress,
      password: password
    }
  },
  screenshotsAbsolutePath: screenshotsAbsolutePath
};

export { config };
