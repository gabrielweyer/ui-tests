using System;
using System.Linq;
using FluentAssertions;
using GitHubSelenium.Options;
using GitHubSelenium.WebDriverExtensions;
using OpenQA.Selenium;
using Xunit;

namespace GitHubSelenium
{
    public class SignIn : IDisposable
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

            var options = OptionsReader.GitHub.Value.SignInCredentials;

            if (string.IsNullOrWhiteSpace(options?.Username) ||
                string.IsNullOrWhiteSpace(options.Password))
            {
                throw new ArgumentException("You need to configure 'GitHub:SignInCredentials:Username' and 'GitHub:SignInCredentials:Password', refer to the README: https://github.com/gabrielweyer/ui-tests/blob/master/README.md.");
            }

            // Act

            _browser.Navigate().GoToUrl("https://github.com/login");

            var usernameInput = _browser.WaitUntilElement(By.Id("login_field"), TimeSpan.FromSeconds(5));
            usernameInput.SendKeys(options.Username);

            var passwordInput = _browser.WaitUntilElement(By.Id("password"), TimeSpan.FromSeconds(0.5));
            passwordInput.SendKeys(options.Password);

            var submitButton = _browser.WaitUntilElement(By.CssSelector("input[type=\"submit\"]"), TimeSpan.FromSeconds(0.5));
            submitButton.Click();

            // Assert

            try
            {
                var headerLinks = _browser.WaitUntilElements(By.CssSelector("header .HeaderMenu a.HeaderNavlink"), TimeSpan.FromSeconds(5));
                headerLinks.Should().HaveCountGreaterOrEqualTo(1);

                headerLinks.Select(l => l.Text.ToLowerInvariant()).Should().Contain("pull requests");
            }
            catch (Exception)
            {
                _browser.TakeScreenshot("sign-in");
                throw;
            }
        }

        public void Dispose()
        {
            _browser?.Dispose();
        }
    }
}
