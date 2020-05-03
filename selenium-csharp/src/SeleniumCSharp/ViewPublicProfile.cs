using System;
using OpenQA.Selenium;
using SeleniumCSharp.Options;
using SeleniumCSharp.WebDriverExtensions;
using Xunit;

namespace SeleniumCSharp
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

            var options = OptionsReader.Goodreads.Value.PublicProfile;

            // Act

            _browser.Navigate().GoToUrl(new Uri($"https://www.goodreads.com/{options.Username}"));
            var fullnameElement = _browser.WaitUntilElement(By.CssSelector("#profileNameTopHeading"), TimeSpan.FromSeconds(5));

            // Assert

            Assert.Equal(options.ExpectedFullname, fullnameElement.Text);
        }

        public void Dispose()
        {
            _browser?.Dispose();
        }
    }
}
