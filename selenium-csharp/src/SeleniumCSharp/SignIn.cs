using OpenQA.Selenium;
using SeleniumCSharp.Options;
using SeleniumCSharp.Utils;
using Xunit;

namespace SeleniumCSharp;

public sealed class SignIn : IDisposable
{
    private readonly IWebDriver _browser = BrowserLauncher.GetChrome();

    [Fact]
    public void Scenario()
    {
        // Arrange
        var options = OptionsReader.Reddit.Value;

        try
        {
            Login(options.SignInCredentials);
            ViewProfile(options.SignInCredentials.Username);
        }
        catch (Exception)
        {
            _browser.TakeScreenshot("sign-in");
            throw;
        }
    }

    private void Login(Credentials credentials)
    {
        // Act
        _browser.Navigate().GoToUrl(new Uri("https://www.reddit.com/login/"));
            
        var usernameInput = _browser.WaitUntilElement(By.CssSelector("#login-username"), TimeSpan.FromSeconds(10));
        usernameInput.SendKeys(credentials.Username);

        var passwordInput = _browser.WaitUntilElement(By.CssSelector("#login-password"), TimeSpan.FromSeconds(0.5));
        passwordInput.SendKeys(credentials.Password);
        passwordInput.SendKeys(Keys.Enter);

        // Assert
        const string avatarSelector = "faceplate-dropdown-menu";
        _browser.WaitUntilElement(By.CssSelector(avatarSelector), TimeSpan.FromSeconds(10));
    }

    private void ViewProfile(string username)
    {
        // Act
        _browser.Navigate().GoToUrl(new Uri($"https://www.reddit.com/u/{username}"));
        var usernameElement = _browser.WaitUntilElement(By.CssSelector("h1"), TimeSpan.FromSeconds(5));

        // Assert
        Assert.Equal(username, usernameElement.Text);
    }

    public void Dispose()
    {
        _browser.Dispose();
    }
}
