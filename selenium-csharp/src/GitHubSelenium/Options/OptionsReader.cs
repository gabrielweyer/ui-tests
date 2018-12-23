using System;
using Microsoft.Extensions.Configuration;

namespace GitHubSelenium.Options
{
    public class OptionsReader
    {
        public static readonly Lazy<GitHubOptions> GitHub = new Lazy<GitHubOptions>(() =>
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddUserSecrets<OptionsReader>(optional: true)
                .Build();

            return config.GetSection("GitHub").Get<GitHubOptions>();
        });
    }
}
