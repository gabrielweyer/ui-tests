namespace SeleniumCSharp.Options;

public class GoodreadsOptions
{
    public PublicProfile PublicProfile { get; set; } = default!;
    public Credentials SignInCredentials { get; set; } = new();
}
