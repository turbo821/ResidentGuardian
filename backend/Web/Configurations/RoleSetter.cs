using Microsoft.AspNetCore.Identity;

namespace Web.Configurations
{
    public class RoleSetter
    {
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly string[] _roles = { "Admin", "Moderator", "User" };
        
        public RoleSetter(RoleManager<IdentityRole<Guid>> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task Setup()
        {
            Console.WriteLine("Role creation mode");
            foreach (var role in _roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                    await _roleManager.CreateAsync(new IdentityRole<Guid>(role));
            }
            Console.WriteLine("Role created");
        }
    }
}
