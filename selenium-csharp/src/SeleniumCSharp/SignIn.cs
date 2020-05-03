using System;
using System.Linq;
using FluentAssertions;
using OpenQA.Selenium;
using SeleniumCSharp.Options;
using SeleniumCSharp.WebDriverExtensions;
using Xunit;

namespace SeleniumCSharp
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

            var options = OptionsReader.Goodreads.Value.SignInCredentials;

            if (string.IsNullOrWhiteSpace(options?.EmailAddress) ||
                string.IsNullOrWhiteSpace(options.Password))
            {
                throw new ArgumentException("You need to configure 'Goodreads:SignInCredentials:EmailAddress' and 'Goodreads:SignInCredentials:Password', refer to the README: https://github.com/gabrielweyer/ui-tests/blob/master/README.md.");
            }

            try
            {
                // Act

                _browser.Navigate().GoToUrl("https://www.goodreads.com/user/sign_in");

                var emailAddressInput = _browser.WaitUntilElement(By.Id("user_email"), TimeSpan.FromSeconds(5));
                emailAddressInput.SendKeys(options.EmailAddress);

                var passwordInput = _browser.WaitUntilElement(By.Id("user_password"), TimeSpan.FromSeconds(0.5));
                passwordInput.SendKeys(options.Password);

                var submitButton = _browser.WaitUntilElement(By.CssSelector("input[type=\"submit\"]"), TimeSpan.FromSeconds(0.5));
                submitButton.Click();

                // Assert

                const string headerSelector = ".siteHeader__primaryNavSeparateLine > .siteHeader__menuList a.siteHeader__topLevelLink";
                var headerLinks = _browser.WaitUntilAllEnabled(headerSelector, TimeSpan.FromSeconds(5));
                headerLinks.Should().HaveCountGreaterOrEqualTo(1);

                headerLinks.Select(l => l.Text.ToLowerInvariant()).Should().Contain("my books");
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
