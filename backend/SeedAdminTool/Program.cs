using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Infrastructure.Data;

var serviceCollection = new ServiceCollection();

string? connection = Environment.GetEnvironmentVariable("CONNECTION_STRING");

serviceCollection.AddDbContext<AppGuardContext>(options =>
    options.UseNpgsql(connection,
    x => x.UseNetTopologySuite()));

serviceCollection.AddIdentityCore<User>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
})
.AddRoles<IdentityRole<Guid>>()
.AddEntityFrameworkStores<AppGuardContext>();

var serviceProvider = serviceCollection.BuildServiceProvider();

using var scope = serviceProvider.CreateScope();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

Console.WriteLine("Admin CLI Tool");
Console.WriteLine("1. Create Admin User");
Console.WriteLine("2. List All Users");
Console.Write("Select option: ");

var option = Console.ReadLine();

switch (option)
{
    case "1":
        await CreateAdminUser(userManager, roleManager);
        break;
    case "2":
        await ListAllUsers(userManager);
        break;
    default:
        Console.WriteLine("Invalid option");
        break;
}

async Task CreateAdminUser(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
{
    Console.WriteLine("Enter FullName: ");
    var fullName = Console.ReadLine() ?? string.Empty;

    Console.Write("Enter email: ");
    var email = Console.ReadLine() ?? string.Empty;

    Console.Write("Enter password: ");
    var password = Console.ReadLine() ?? string.Empty;

    var user = new User
    {
        FullName = fullName,
        UserName = email,
        Email = email,
        EmailConfirmed = true
    };

    var result = await userManager.CreateAsync(user, password);

    if (result.Succeeded)
    {
        await userManager.AddToRoleAsync(user, "Admin");
        Console.WriteLine($"Admin user {email} created successfully!");
    }
    else
    {
        Console.WriteLine("Errors:");
        foreach (var error in result.Errors)
        {
            Console.WriteLine($"- {error.Description}");
        }
    }
}

async Task ListAllUsers(UserManager<User> userManager)
{
    var users = await userManager.Users.ToListAsync();

    Console.WriteLine("\nUsers:");
    foreach (var user in users)
    {
        var roles = await userManager.GetRolesAsync(user);
        Console.WriteLine($"- {user.Email} (Roles: {string.Join(", ", roles)})");
    }
}