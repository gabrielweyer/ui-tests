using System.Reflection;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace SeleniumCSharp.WebDriverExtensions;

public static class BrowserLauncher
{
    public static IWebDriver GetChrome()
    {
        var currentDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

        var options = new ChromeOptions();
        options.AddArgument("--headless");
        options.AddArgument("--window-size=1040,800");

        return new ChromeDriver(currentDirectory, options);
    }
}
