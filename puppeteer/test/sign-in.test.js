const expect = require('chai').expect;
const puppeteer = require('puppeteer');
const config = require('../config');
const puppeteerExtensions = require('../puppeteer-extensions');

describe('SignIn', () => {
  let browser;
  let page;

  before(async function() {
    browser = await puppeteer.launch({headless: true});
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

          const headerLinksSelector = 'header .HeaderMenu a.HeaderNavlink';
          await page.waitForSelector(headerLinksSelector, { visible: true, timeout: 5000 });
          const headerLinksText = await page
            .evaluate(selector => Array.from(document.querySelectorAll(selector))
            .map(l => l.innerText.toLowerCase()), headerLinksSelector);

          expect(headerLinksText).to.include('pull requests');
        } catch (error) {
          await puppeteerExtensions.saveScreenshot(page, 'sign-in');
          throw error;
        }
      });
    });
  });
});
