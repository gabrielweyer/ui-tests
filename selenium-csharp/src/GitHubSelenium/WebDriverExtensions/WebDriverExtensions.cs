using System;
using System.Collections.ObjectModel;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using Xunit.Abstractions;

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

        public static void TakeScreenshot(this IWebDriver browser, string filenameNoPathNoExtension, ITestOutputHelper outputHelper)
        {
            const string screenshotsPath = "./screenshots/";

            var screenshot = (browser as ITakesScreenshot)?.GetScreenshot();
            var createdDirectory = Directory.CreateDirectory(screenshotsPath);
            outputHelper.WriteLine($"Created directory: {createdDirectory.FullName}");
            screenshot?.SaveAsFile($"{screenshotsPath}{filenameNoPathNoExtension}.png", ScreenshotImageFormat.Png);
        }
    }
}
