using System;
using System.Collections.ObjectModel;
using System.Linq;
using OpenQA.Selenium;

namespace SeleniumCSharp.WebDriverExtensions;

public class ExpectedConditions
{
    /// <summary>
    /// An expectation for checking whether two or more elements are visible and enabled.
    /// </summary>
    /// <param name="locator">The locator used to find the elements.</param>
    /// <returns>The <see cref="ReadOnlyCollection&lt;IWebElement&gt;"/> once they are located, visible and enabled.</returns>
    public static Func<IWebDriver, ReadOnlyCollection<IWebElement>> ElementsAreEnabled(By locator)
    {
        return driver =>
        {
            var defaultImplicitWait = driver.Manage().Timeouts().ImplicitWait;

            try
            {
                driver.Manage().Timeouts().ImplicitWait = TimeSpan.Zero;
                var elements = driver.FindElements(locator);
                return (elements.Count > 1 && elements.All(e => e.Displayed && e.Enabled)) ? elements : null;
            }
            catch (Exception e) when (e is NoSuchElementException || e is StaleElementReferenceException)
            {
                return null;
            }
            finally
            {
                driver.Manage().Timeouts().ImplicitWait = defaultImplicitWait;
            }
        };
    }
}
