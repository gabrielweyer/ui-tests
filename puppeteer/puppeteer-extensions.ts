import { config } from './config';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

export async function saveScreenshot(page : puppeteer.Page, filenameNoPathNoExtension: string): Promise<void> {
  try {
    fs.mkdirSync(config.screenshotsAbsolutePath);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.warn('Could not create screenshots directory', config.screenshotsAbsolutePath, error);
      return;
    }
  }

  await page.screenshot({ path: `${config.screenshotsAbsolutePath}/${filenameNoPathNoExtension}.png`, fullPage: true });
}

export async function launch() : Promise<puppeteer.Browser> {
  return await puppeteer.launch({headless: true});
}

export async function newPage(browser: puppeteer.Browser) : Promise<puppeteer.Page> {
  // Reddit is blocking browsers whose user-agent contains 'Headless'
  const userAgent = (await browser.userAgent()).replace('Headless', '');
  const page = await browser.newPage();
  await page.setUserAgent(userAgent);
  return page;
}
