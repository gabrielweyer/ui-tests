const config = require('./config');
const fs = require('fs');

var exports = module.exports = {};

exports.saveScreenshot = async function(page, filenameNoPathNoExtension) {
  try {
    fs.mkdirSync(config.screenshotsAbsolutePath)
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.warn('Could not create screenshots directory', config.screenshotsAbsolutePath, error);
      return;
    }
  }

  await page.screenshot({ path: `${config.screenshotsAbsolutePath}/${filenameNoPathNoExtension}.png`, fullPage: true });
}
