import * as puppeteer from 'puppeteer';
import { config } from '../config';
import { launch, newPage, saveScreenshot } from '../puppeteer-extensions';
import { expect } from 'chai';

describe('SignIn', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  before(async function() {
    browser = await launch();
    page = await newPage(browser);
  });

  after(async function() {
    if (browser) {
      await browser.close();
    }
  });

  describe('Given navigate to sign-in page', function() {
    describe('And given enter correct credentials', function() {
      it('Then display signed-in home page and user page', async function() {
        try {
          // Act
          await page.goto('https://www.reddit.com/login/');

          const usernameInputSelector = '#login-username';
          await page.waitForSelector(usernameInputSelector, { visible: true, timeout: 10000 });
          await page.type(usernameInputSelector, config.reddit.signInCredentials.username, { delay: 100 });
          await page.type('#login-password', config.reddit.signInCredentials.password, { delay: 100 });

          await page.setRequestInterception(true);
          page.on('request', interceptedRequest => {
            if (interceptedRequest.url() === 'https://www.reddit.com/svc/shreddit/account/login') {
              console.log(interceptedRequest.postData());
            }

            interceptedRequest.continue();
          });
          page.on('response', async interceptedResponse => {
            if (interceptedResponse.url() === 'https://www.reddit.com/svc/shreddit/account/login') {
              console.log(await interceptedResponse.text());
            }
          });

          await Promise.all([
            page.waitForNavigation({ timeout: 10000 }),
            page.keyboard.press('Enter')
          ]);

          // Assert
          const avatarSelector = 'faceplate-dropdown-menu';
          await page.waitForSelector(avatarSelector, { timeout: 5000 });

          // Act
          await page.goto(`https://www.reddit.com/u/${config.reddit.signInCredentials.username}`);

          // Assert
          const usernameSelector = 'h1';
          await page.waitForSelector(usernameSelector, { visible: true });
          const actualUsername = await page.evaluate((selector) => document.querySelector<HTMLHeadingElement>(selector).innerText, usernameSelector);

          expect(actualUsername).to.equal(config.reddit.signInCredentials.username);
        } catch (error) {
          await saveScreenshot(page, 'sign-in');
          throw error;
        }
      });
    });
  });
});
