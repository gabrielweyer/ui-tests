const puppeteer = require('puppeteer');
const config = require('../config');

describe('ViewPublicProfile', function() {
  let browser;
  let page;

  beforeAll(async function() {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
  });

  afterAll(async function() {
    await browser.close();
  });

  describe('Given navigate to public profile', function() {
    beforeEach(async function() {
      await page.goto(`https://github.com/${config.gitHub.publicProfile.username}`);
    });

    it('Then display full name', async function() {
      const fullNameSelector = '.vcard-fullname';

      await page.waitForSelector(fullNameSelector, { visible: true });
      const actualFullname = await page.evaluate((selector) => document.querySelector(selector).innerText, fullNameSelector);

      expect(actualFullname).toBe(config.gitHub.publicProfile.expectedFullname);
    });
  });
});
