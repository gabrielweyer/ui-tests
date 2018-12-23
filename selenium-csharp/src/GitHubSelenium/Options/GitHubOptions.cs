namespace GitHubSelenium.Options
{
    public class GitHubOptions
    {
        public PublicProfile PublicProfile { get; set; }
    }

    public class PublicProfile
    {
        public string Username { get; set; }
        public string ExpectedFullname { get; set; }
    }
}
