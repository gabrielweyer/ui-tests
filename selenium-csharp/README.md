# Selenium WebDriver & C# #

`NuGet` packages I'm using:

- [Selenium.WebDriver][nuget-selenium-webdriver]
- [Selenium.WebDriver.ChromeDriver][nuget-selenium-chromedriver]

## Pre-requisites ##

- `Chrome` needs to be installed on the machine where you'll be running the tests

## Secrets ##

I'm using the [Secret Manager][secret-manager] to store secrets locally.

Test `GitHub` account:

- `GitHub:SignInCredentials:Username` either the username or the email address
- `GitHub:SignInCredentials:Password`

[nuget-selenium-webdriver]: https://www.nuget.org/packages/Selenium.WebDriver/
[nuget-selenium-chromedriver]: https://www.nuget.org/packages/Selenium.WebDriver.ChromeDriver/
[secret-manager]: https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.0&tabs=windows#secret-manager
