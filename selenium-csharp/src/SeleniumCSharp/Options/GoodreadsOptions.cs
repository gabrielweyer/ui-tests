namespace SeleniumCSharp.Options
{
    public class GoodreadsOptions
    {
        public PublicProfile PublicProfile { get; set; }
        public Credentials SignInCredentials { get; set; }
    }

    public class PublicProfile
    {
        public string Username { get; set; }
        public string ExpectedFullname { get; set; }
    }

    public class Credentials
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }
}
