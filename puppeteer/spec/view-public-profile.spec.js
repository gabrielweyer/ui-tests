const puppeteer = require('puppeteer');
const config = require('../config');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('ViewPublicProfile', () => {
  describe('Given navigate to public profile', () => {
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
