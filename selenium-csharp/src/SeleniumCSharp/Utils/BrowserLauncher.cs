using System.Reflection;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace SeleniumCSharp.Utils;

public static class BrowserLauncher
{
    public static IWebDriver GetChrome()
    {
        var currentDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

        var options = new ChromeOptions();
        options.AddArgument("--headless");
        options.AddArgument("--window-size=1040,800");
        // We're dependent on the Chrome version installed on the runner, so we might as well use anything
        options.AddArgument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36");

        return new ChromeDriver(currentDirectory, options);
    }
}
