using Microsoft.Extensions.Configuration;

namespace SeleniumCSharp.Options;

public class OptionsReader
{
    public static readonly Lazy<GoodreadsOptions> Goodreads = new Lazy<GoodreadsOptions>(() =>
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddUserSecrets<OptionsReader>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        return config.GetSection("Goodreads").Get<GoodreadsOptions>();
    });
}
