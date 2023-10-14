using System.Collections.ObjectModel;
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

    public static ReadOnlyCollection<IWebElement> WaitUntilAllEnabled(this IWebDriver driver, string selector, TimeSpan timeout)
    {
        var wait = new WebDriverWait(driver, timeout);
        try
        {
            var elements = wait.Until(ExpectedConditions.ElementsAreEnabled(By.CssSelector(selector)));

            if (elements == null)
            {
                throw new WebDriverTimeoutException($"Elements with selector '{selector}' were not enabled after {timeout.TotalSeconds} seconds.");
            }

            return elements;
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
        screenshot?.SaveAsFile($"{screenshotsPath}{filenameNoPathNoExtension}.png");
    }
}
