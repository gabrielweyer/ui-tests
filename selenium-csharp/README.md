# Selenium WebDriver & C# #

`NuGet` packages I'm using:

- [Selenium.WebDriver][nuget-selenium-webdriver]
- [Selenium.WebDriver.ChromeDriver][nuget-selenium-chromedriver]

## Pre-requisites ##

- `Chrome` needs to be installed on the machine where you'll be running the tests

## Secrets ##

I'm using the [Secret Manager][secret-manager] to store secrets locally. The code is expecting the following secrets to be set:

- `Goodreads:SignInCredentials:EmailAddress`
- `Goodreads:SignInCredentials:Password`

You can set secrets by issuing the below command in the project directory:

```powershell
dotnet user-secrets set Goodreads:SignInCredentials:EmailAddress "your.email@address.com"
```

[nuget-selenium-webdriver]: https://www.nuget.org/packages/Selenium.WebDriver/
[nuget-selenium-chromedriver]: https://www.nuget.org/packages/Selenium.WebDriver.ChromeDriver/
[secret-manager]: https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.0&tabs=windows#secret-manager
