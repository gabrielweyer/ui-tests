using System;
using System.Collections.ObjectModel;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace SeleniumCSharp.WebDriverExtensions
{
    public static class WebDriverExtensions
    {
        public static IWebElement WaitUntilElement(this IWebDriver browser, By by, TimeSpan timeout)
        {
            var wait = new WebDriverWait(browser, timeout);
            return wait.Until(b => b.FindElement(by));
        }

        public static ReadOnlyCollection<IWebElement> WaitUntilElements(this IWebDriver browser, By by, TimeSpan timeout)
        {
            var wait = new WebDriverWait(browser, timeout);
            return wait.Until(b => b.FindElements(by));
        }

        public static ReadOnlyCollection<IWebElement> WaitUntilAllEnabled(this IWebDriver driver, string selector, TimeSpan timeout)
        {
            var wait = new WebDriverWait(driver, timeout);
            try
            {
                return wait.Until(ExpectedConditions.ElementsAreEnabled(By.CssSelector(selector)));
            }
            catch (WebDriverTimeoutException e)
            {
                throw new WebDriverTimeoutException($"Elements with selector '{selector}' were not enabled after {timeout.TotalSeconds} seconds.", e);
            }
        }

        public static void TakeScreenshot(this IWebDriver browser, string filenameNoPathNoExtension)
        {
            const string screenshotsPath = "./screenshots/";

            var screenshot = (browser as ITakesScreenshot)?.GetScreenshot();
            Directory.CreateDirectory(screenshotsPath);
            screenshot?.SaveAsFile($"{screenshotsPath}{filenameNoPathNoExtension}.png", ScreenshotImageFormat.Png);
        }
    }
}
