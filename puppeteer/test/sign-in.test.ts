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
          const submitButtonSelector = 'input[type="submit"]';

          await page.goto('https://www.goodreads.com/user/sign_in');
          await page.waitForSelector(submitButtonSelector, { visible: true, timeout: 5000 });
          await page.type('#user_email', config.goodreads.signInCredentials.emailAddress);
          await page.type('#user_password', config.goodreads.signInCredentials.password);
          await page.click(submitButtonSelector);

          // Assert
          const headerLinksSelector = '.siteHeader__primaryNavSeparateLine > .siteHeader__menuList a.siteHeader__topLevelLink';
          await page.waitForSelector(headerLinksSelector, { timeout: 5000 });
          const headerLinksText = await page
            .evaluate(selector => Array.from(document.querySelectorAll(selector))
            .map(l => l.innerText.toLowerCase()), headerLinksSelector);

          expect(headerLinksText).to.include('my books');
        } catch (error) {
          await saveScreenshot(page, 'sign-in');
          throw error;
        }
      });
    });
  });
});
