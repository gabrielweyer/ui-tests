const puppeteer = require('puppeteer');
const config = require('../config');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('ViewPublicProfile', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  describe('Given navigate to public profile', () => {
    beforeEach(async () => {
      await page.goto(`https://github.com/${config.gitHub.publicProfile.username}`);
    });

    it('Then display full name', async () => {
      const fullnameSelector = '.vcard-fullname';

      await page.waitForSelector(fullnameSelector, { visible: true });
      const actualFullname = await page.evaluate((selector) => document.querySelector(selector).innerText, fullnameSelector);

      expect(actualFullname).toBe(config.gitHub.publicProfile.expectedFullname);
    });
  });
});
