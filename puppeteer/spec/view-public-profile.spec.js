const puppeteer = require('puppeteer');
const config = require('../config');

describe('ViewPublicProfile', () => {
  describe('Given navigate to public profile', () => {
    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });

    it('Then display full name', async () => {
      const fullnameSelector = '.vcard-fullname';

      const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();

      await page.goto(`https://github.com/${config.gitHub.publicProfile.username}`);

      await page.waitForSelector(fullnameSelector, { visible: true });
      const actualFullname = await page.evaluate((selector) => document.querySelector(selector).innerText, fullnameSelector);

      expect(actualFullname).toBe(config.gitHub.publicProfile.expectedFullname);

      await browser.close();
    });
  });
});
