using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Web.Configurations
{
    public class AdminSetter
    {
        private readonly UserManager<User> _userManager;
        private readonly User _admin = new User
            {
                UserName = "admin@example.com",
                Email = "admin@example.com"
            };

        public AdminSetter(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task Setup()
        {
            await _userManager.CreateAsync(_admin, "AdminPassword123!");
            await _userManager.AddToRoleAsync(_admin, "Admin");
        }
    }
}
