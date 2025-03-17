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
                Email = "admin@example.com",
                FullName = "Alexander",
                EmailConfirmed = true
            };

        public AdminSetter(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task Setup()
        {
            if (await _userManager.FindByEmailAsync(_admin.Email!) != null)
                return;

            await _userManager.CreateAsync(_admin, "password123");
            await _userManager.AddToRoleAsync(_admin, "Admin");
        }
    }
}
