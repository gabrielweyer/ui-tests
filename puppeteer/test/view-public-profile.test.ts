import { expect } from 'chai';
import * as puppeteer from 'puppeteer';
import {config } from '../config';

describe('ViewPublicProfile', function() {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  before(async function() {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
  });

  after(async function() {
    if (browser) {
      await browser.close();
    }
  });

  describe('Given navigate to public profile', function() {
    beforeEach(async function() {
      await page.goto(`https://github.com/${config.gitHub.publicProfile.username}`);
    });

    it('Then display full name', async function() {
      const fullnameSelector = '.vcard-fullname';

      await page.waitForSelector(fullnameSelector, { visible: true });
      const actualFullname = await page.evaluate((selector) => document.querySelector(selector).innerText, fullnameSelector);

      expect(actualFullname).to.equal(config.gitHub.publicProfile.expectedFullname);
    });
  });
});
