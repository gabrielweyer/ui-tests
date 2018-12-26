using System;
using GitHubSelenium.Options;
using GitHubSelenium.WebDriverExtensions;
using OpenQA.Selenium;
using Xunit;

namespace GitHubSelenium
{
    public class ViewPublicProfile : IDisposable
    {
        private readonly IWebDriver _browser;

        public ViewPublicProfile()
        {
            _browser = BrowserLauncher.GetChrome();
        }

        [Fact]
        public void Scenario()
        {
            // Arrange

            var options = OptionsReader.GitHub.Value.PublicProfile;

            // Act

            _browser.Navigate().GoToUrl(new Uri($"https://github.com/{options.Username}"));
            var fullnameElement = _browser.WaitUntilElement(By.CssSelector(".vcard-fullname"), TimeSpan.FromSeconds(5));

            // Assert

            Assert.Equal(options.ExpectedFullname, fullnameElement.Text);
        }

        public void Dispose()
        {
            _browser?.Dispose();
        }
    }
}
