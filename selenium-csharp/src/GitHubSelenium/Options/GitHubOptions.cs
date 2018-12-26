namespace GitHubSelenium.Options
{
    public class GitHubOptions
    {
        public PublicProfile PublicProfile { get; set; }
        public GitHubCredentials SignInCredentials { get; set; }
    }

    public class PublicProfile
    {
        public string Username { get; set; }
        public string ExpectedFullname { get; set; }
    }

    public class GitHubCredentials
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
