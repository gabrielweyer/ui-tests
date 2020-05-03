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
  throw new Error('You need to configure "GABO_GOODREADS_SIGNINCREDENTIALS_EMAILADDRESS" and "GABO_GOODREADS_SIGNINCREDENTIALS_PASSWORD", refer to the README: https://github.com/gabrielweyer/ui-tests/blob/master/README.md.');
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
  screenshotsAbsolutePath: process.env.GABO_SCREENSHOTS_ABSOLUTEPATH || './screenshots'
};

export { config };
