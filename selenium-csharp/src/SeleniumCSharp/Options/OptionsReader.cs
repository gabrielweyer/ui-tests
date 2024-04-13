using Microsoft.Extensions.Configuration;

namespace SeleniumCSharp.Options;

public static class OptionsReader
{
    public static readonly Lazy<RedditOptions> Reddit = new(() =>
    {
        var config = new ConfigurationBuilder()
            .AddUserSecrets<RedditOptions>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        var options = config.GetSection("Reddit").Get<RedditOptions>();

        if (options == null ||
            string.IsNullOrWhiteSpace(options.SignInCredentials.Username) ||
            string.IsNullOrWhiteSpace(options.SignInCredentials.Password))
        {
            throw new InvalidOperationException("You need to configure 'Reddit:SignInCredentials:Username' and 'Reddit:SignInCredentials:Password', refer to the README: https://github.com/gabrielweyer/ui-tests/blob/main/selenium-csharp/README.md.");
        }

        return options;
    });
}
