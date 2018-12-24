using System.IO;
using System.Reflection;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace GitHubSelenium.WebDriverExtensions
{
    public static class BrowserLauncher
    {
        public static IWebDriver GetChrome()
        {
            var currentDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            var options = new ChromeOptions();
            options.AddArgument("--headless");

            return new ChromeDriver(currentDirectory, options);
        }
    }
}
