using FluentAssertions;
using OpenQA.Selenium;
using SeleniumCSharp.Options;
using SeleniumCSharp.Utils;
using Xunit;

namespace SeleniumCSharp;

public sealed class SignIn : IDisposable
{
    private readonly IWebDriver _browser;

    public SignIn()
    {
        _browser = BrowserLauncher.GetChrome();
    }

    [Fact]
    public void Scenario()
    {
        // Arrange
        var options = OptionsReader.Goodreads.Value.SignInCredentials;

        try
        {
            // Act
            _browser.Navigate().GoToUrl(new Uri("https://www.goodreads.com/user/sign_in"));

            var signInWithEmailButton =
                _browser.WaitUntilElement(By.ClassName("authPortalSignInButton"), TimeSpan.FromSeconds(5));
            signInWithEmailButton.Click();

            var emailAddressInput = _browser.WaitUntilElement(By.Id("ap_email"), TimeSpan.FromSeconds(5));
            emailAddressInput.SendKeys(options.EmailAddress);

            var passwordInput = _browser.WaitUntilElement(By.Id("ap_password"), TimeSpan.FromSeconds(0.5));
            passwordInput.SendKeys(options.Password);

            var submitButton = _browser.WaitUntilElement(By.CssSelector("input[type=\"submit\"]"), TimeSpan.FromSeconds(0.5));
            submitButton.Click();

            // Assert
            const string headerSelector = ".siteHeader__primaryNavSeparateLine > .siteHeader__menuList a.siteHeader__topLevelLink";
            var headerLinks = _browser.WaitUntilAllEnabled(headerSelector, TimeSpan.FromSeconds(5));
            headerLinks.Should().HaveCountGreaterOrEqualTo(1);

            headerLinks.Select(l => l.Text.ToUpperInvariant()).Should().Contain("MY BOOKS");
        }
        catch (Exception)
        {
            _browser.TakeScreenshot("sign-in");
            throw;
        }
    }

    public void Dispose()
    {
        _browser.Dispose();
    }
}
