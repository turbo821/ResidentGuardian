using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System.Text;

namespace Web.Configurations
{
    public class AdminCliService : IAdminCliService
    {
        private readonly UserManager<User> _userManager;

        public AdminCliService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task CreateAdminFromCommandLine(string[] args)
        {
            Console.WriteLine("Admin creation mode");

            string? email = GetArgumentValue(args, "--email");
            string? password = GetArgumentValue(args, "--password");
            string fullName = GetArgumentValue(args, "--fullname") ?? "Admin";

            if (string.IsNullOrEmpty(email))
            {
                Console.Write("Enter admin email: ");
                email = Console.ReadLine()!;
            }

            if (string.IsNullOrEmpty(password))
            {
                Console.Write("Enter admin password: ");
                password = ReadPassword();
            }

            try
            {
                await CreateAdmin(email, password, fullName);
                Console.WriteLine($"✅ Admin '{email}' created successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error: {ex.Message}");
                Environment.Exit(1);
            }
        }

        public async Task CreateAdmin(string email, string password, string fullName)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty");

            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password cannot be empty");

            var existingUser = await _userManager.FindByEmailAsync(email);
            if (existingUser != null)
                throw new Exception($"User with email '{email}' already exists");

            var admin = new User
            {
                UserName = email,
                Email = email,
                FullName = fullName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(admin, password);
            if (!result.Succeeded)
                throw new Exception($"Failed to create admin: {string.Join(", ", result.Errors)}");

            await _userManager.AddToRoleAsync(admin, "Admin");
        }

        private static string? GetArgumentValue(string[] args, string paramName)
        {
            int index = Array.IndexOf(args, paramName);
            return index != -1 && index < args.Length - 1 ? args[index + 1] : null;
        }

        private static string ReadPassword()
        {
            var password = new StringBuilder();
            while (true)
            {
                var key = Console.ReadKey(intercept: true);
                if (key.Key == ConsoleKey.Enter) break;
                if (key.Key == ConsoleKey.Backspace && password.Length > 0)
                {
                    password.Remove(password.Length - 1, 1);
                    Console.Write("\b \b");
                }
                else if (!char.IsControl(key.KeyChar))
                {
                    password.Append(key.KeyChar);
                    Console.Write('*');
                }
            }
            Console.WriteLine();
            return password.ToString();
        }
    }
}