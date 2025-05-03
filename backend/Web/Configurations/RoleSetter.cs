using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace Web.Configurations
{
    public class RoleSetter
    {
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly AppGuardContext _dbContext;
        private readonly string[] _roles = { "Admin", "Moderator", "User" };

        public RoleSetter(RoleManager<IdentityRole<Guid>> roleManager, AppGuardContext dbContext)
        {
            _roleManager = roleManager;
            _dbContext = dbContext;
        }

        public async Task Setup()
        {
            await WaitForDatabaseAsync();

            foreach (var role in _roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                    await _roleManager.CreateAsync(new IdentityRole<Guid>(role));
            }
        }

        private async Task WaitForDatabaseAsync()
        {
            const int maxAttempts = 10;
            var currentAttempt = 0;

            while (currentAttempt < maxAttempts)
            {
                try
                {
                    Console.WriteLine($"Attempting to connect to database (attempt {currentAttempt + 1})");
                    await _dbContext.Database.CanConnectAsync();
                    Console.WriteLine("Database connection successful");
                    return;
                }
                catch (Exception)
                {
                    currentAttempt++;
                    if (currentAttempt >= maxAttempts)
                        throw;

                    await Task.Delay(2000 * currentAttempt);
                }
            }
        }
    }
}
