# UI testing

I want to learn how to write UI tests. [Selenium WebDriver][selenium-webdriver] seems to be the most commonly used platform. I also stumbled upon [Puppeteer][puppeteer] and decided to use both libraries.

I decided to test [GitHub][github] as this is where this repository is hosted.

Over time I hope to see my tests' brittleness exposed which will give me the opportunity to make them more resilient.

As this project is a learning experience I wouldn't recommend being inspired by it (this is even more true for the `Puppeteer` / `JavaScript` tests where I've no idea what I'm doing :joy_cat:).

- [Selenium WebDriver C# implementation README](./selenium-csharp/README.md)
- [Puppeteer implementation README](./puppeteer/README.md)

## Continuous Integration

I'm using [Azure pipelines][azure-pipelines] to run the tests on every commit to `master`.

[![Build Status](https://dev.azure.com/gabrielweyer/ui-testing/_apis/build/status/Selenium%20C%23?branchName=master&label=Selenium%20C%23)](https://dev.azure.com/gabrielweyer/ui-testing/_build/latest?definitionId=11)

[![Build Status](https://dev.azure.com/gabrielweyer/ui-testing/_apis/build/status/Puppeteer?branchName=master&label=Puppeteer)](https://dev.azure.com/gabrielweyer/ui-testing/_build/latest?definitionId=10)

The builds steps are versioned with the code as `YAML`:

- [selenium-csharp.yml](./selenium-csharp.yml)
- [puppeteer.yml](./puppeteer.yml)

[selenium-webdriver]: https://www.seleniumhq.org/projects/webdriver/
[puppeteer]: https://developers.google.com/web/tools/puppeteer/
[github]: https://github.com/
[azure-pipelines]: https://azure.microsoft.com/en-au/services/devops/pipelines/
