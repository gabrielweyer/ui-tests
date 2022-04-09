import { expect } from 'chai';
import * as puppeteer from 'puppeteer';
import {config } from '../config';
import { saveScreenshot } from '../puppeteer-extensions';

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
    it('Then display full name', async function() {
      try {
        // Act
        await page.goto(`https://www.goodreads.com/${config.goodreads.publicProfile.username}`);

        // Assert
        const fullnameSelector = '#profileNameTopHeading';
        await page.waitForSelector(fullnameSelector, { visible: true });
        const actualFullname = await page.evaluate((selector) => document.querySelector(selector).innerText, fullnameSelector);

        expect(actualFullname).to.equal(config.goodreads.publicProfile.expectedFullname);
      } catch (error) {
        await saveScreenshot(page, 'public-profile');
        throw error;
      }
    });
  });
});
