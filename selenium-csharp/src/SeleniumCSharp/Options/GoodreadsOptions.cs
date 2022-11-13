namespace SeleniumCSharp.Options;

public class GoodreadsOptions
{
    public PublicProfile PublicProfile { get; set; } = default!;
    public Credentials SignInCredentials { get; set; } = new();
}

public class PublicProfile
{
    public string Username { get; set; } = default!;
    public string ExpectedFullname { get; set; } = default!;
}

public class Credentials
{
    public string EmailAddress { get; set; } = default!;
    public string Password { get; set; } = default!;
}
