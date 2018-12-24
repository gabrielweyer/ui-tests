const puppeteer = require('puppeteer');
const config = require('../config');



describe('ViewPublicProfile', () => {
  var browser;
  var page;

  beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('Given navigate to public profile', () => {
    beforeEach(async () => {
      await page.goto(`https://github.com/${config.gitHub.publicProfile.username}`);
    });

    it('Then display full name', async () => {
      const fullNameSelector = '.vcard-fullname';

      await page.waitForSelector(fullNameSelector, { visible: true });
      const actualFullname = await page.evaluate((selector) => document.querySelector(selector).innerText, fullNameSelector);

      expect(actualFullname).toBe(config.gitHub.publicProfile.expectedFullname);
    });
  });
});
