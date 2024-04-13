using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace SeleniumCSharp.Utils;

public static class WebDriverExtensions
{
    public static IWebElement WaitUntilElement(this IWebDriver browser, By by, TimeSpan timeout)
    {
        var wait = new WebDriverWait(browser, timeout);
        return wait.Until(b => b.FindElement(by));
    }

    public static void TakeScreenshot(this IWebDriver browser, string filenameNoPathNoExtension)
    {
        const string screenshotsPath = "./screenshots/";

        var screenshot = (browser as ITakesScreenshot)?.GetScreenshot();
        Directory.CreateDirectory(screenshotsPath);
        screenshot?.SaveAsFile($"{screenshotsPath}{filenameNoPathNoExtension}.png");
    }
}
