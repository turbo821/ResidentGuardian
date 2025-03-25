namespace Web.Configurations
{
    public interface IAdminCliService
    {
        Task CreateAdminFromCommandLine(string[] args);
        Task CreateAdmin(string email, string password, string fullName);
    }
}
