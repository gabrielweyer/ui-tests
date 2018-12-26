using System;
using System.Collections.ObjectModel;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace GitHubSelenium.WebDriverExtensions
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

        public static void TakeScreenshot(this IWebDriver browser, string filenameNoPathNoExtension)
        {
            const string screenshotsPath = "./screenshots/";

            var screenshot = (browser as ITakesScreenshot)?.GetScreenshot();
            Directory.CreateDirectory(screenshotsPath);
            screenshot?.SaveAsFile($"{screenshotsPath}{filenameNoPathNoExtension}.png", ScreenshotImageFormat.Png);
        }
    }
}
