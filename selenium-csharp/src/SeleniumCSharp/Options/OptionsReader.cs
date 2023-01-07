using Microsoft.Extensions.Configuration;

namespace SeleniumCSharp.Options;

public static class OptionsReader
{
    public static readonly Lazy<GoodreadsOptions> Goodreads = new(() =>
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddUserSecrets<GoodreadsOptions>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        var options = config.GetSection("Goodreads").Get<GoodreadsOptions>();

        if (options == null ||
            string.IsNullOrWhiteSpace(options.SignInCredentials.EmailAddress) ||
            string.IsNullOrWhiteSpace(options.SignInCredentials.Password))
        {
            throw new InvalidOperationException("You need to configure 'Goodreads:SignInCredentials:EmailAddress' and 'Goodreads:SignInCredentials:Password', refer to the README: https://github.com/gabrielweyer/ui-tests/blob/main/README.md.");
        }

        return options;
    });
}
