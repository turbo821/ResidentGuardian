using Web.Configurations;

namespace Web.Extensions
{
    public static class CliExtensions
    {
        public static async Task UseAdminCliMode(this WebApplication app, string[] args)
        {
            if (args.Length > 0 && args.Contains("create-admin") || args.Contains("create-roles"))
            {
                using var scope = app.Services.CreateScope();
                if (args.Contains("create-admin"))
                {
                    var adminCli = scope.ServiceProvider.GetRequiredService<IAdminCliService>();
                    await adminCli.CreateAdminFromCommandLine(args);
                }
                return;
            }
        }
    }
}
