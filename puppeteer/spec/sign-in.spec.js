const puppeteer = require('puppeteer');
const config = require('../config');

describe('SignIn', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  describe('Given navigate to sign-in page', () => {
    describe('And given enter correct credentials', () => {
      it('Then display home page', async() => {
        // Act

        console.log('config.gitHub.signInCredentials.username', config.gitHub.signInCredentials.username);

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

        expect(headerLinksText).toContain('pull requests');
      });
    });
  });
});
