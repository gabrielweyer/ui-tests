using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace GitHubSelenium.WebDriverExtensions
{
    public static class WebDriverExtensions
    {
        public static IWebElement WaitUntil(this IWebDriver browser, By by, TimeSpan timeout)
        {
            var wait = new WebDriverWait(browser, timeout);
            return wait.Until(b => b.FindElement(by));
        }
    }
}
