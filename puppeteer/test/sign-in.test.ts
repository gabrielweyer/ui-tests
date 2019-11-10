import { expect } from 'chai';
import * as puppeteer from 'puppeteer';
import { config } from '../config';
import { saveScreenshot } from '../puppeteer-extensions';

describe('SignIn', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  before(async function() {
    const options = {
      headless: true,
      defaultViewport: {
        width: 1040,
        height: 800,
        isLandscape: true
      }
    };

    browser = await puppeteer.launch(options);
    page = await browser.newPage();
  });

  after(async function() {
    if (browser) {
      await browser.close();
    }
  });

  describe('Given navigate to sign-in page', function() {
    describe('And given enter correct credentials', function() {
      it('Then display home page', async function() {
        try {
          // Act
          await page.goto('https://github.com/login');
          await page.waitForSelector('input[type="submit"]', { visible: true, timeout: 5000 });
          await page.type('#login_field', config.gitHub.signInCredentials.username);
          await page.type('#password', config.gitHub.signInCredentials.password);
          await page.click('input[type="submit"]');

          // Assert

          const headerLinksSelector = 'header > div:nth-child(3) a.Header-link';
          await page.waitForSelector(headerLinksSelector, { timeout: 5000 });
          const headerLinksText = await page
            .evaluate(selector => Array.from(document.querySelectorAll(selector))
            .map(l => l.innerText.toLowerCase()), headerLinksSelector);

          expect(headerLinksText).to.include('pull requests');
        } catch (error) {
          await saveScreenshot(page, 'sign-in');
          throw error;
        }
      });
    });
  });
});
