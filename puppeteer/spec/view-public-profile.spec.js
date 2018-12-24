const puppeteer = require('puppeteer');
const config = require('../config');

describe('ViewPublicProfile', () => {
  describe('Given navigate to public profile', () => {
    it('Then display full name', async () => {
      const fullNameSelector = '.vcard-fullname';

      const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();

      await page.goto(`https://github.com/${config.gitHub.publicProfile.username}`);

      await page.waitForSelector(fullNameSelector, { visible: true });
      const actualFullname = await page.evaluate((selector) => document.querySelector(selector).innerText, fullNameSelector);

      expect(actualFullname).toBe(config.gitHub.publicProfile.expectedFullname);

      await browser.close();
    });
  });
});
