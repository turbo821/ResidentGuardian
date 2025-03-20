using Application.Dtos;
using Application.Services.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtService _tokenService;

        public AuthService(UserManager<User> userManager, IJwtService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<AuthResponse> RegisterUserAsync(RegisterRequest request)
        {
            if (await _userManager.FindByEmailAsync(request.Email) != null)
                return new() { Success = false, Message = "User with this email already exists" };

            var user = new User
            {
                Id = Guid.NewGuid(),
                UserName = request.Email,
                Email = request.Email,
                FullName = request.FullName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                return new() { Success = false, Message = "Registration error" };

            await _userManager.AddToRoleAsync(user, "User");

            var token = _tokenService.GenerateToken(user, new List<string> { "User" });
            return new() { Success = true, Message = "Registration successful", Token = token };
        }

        public async Task<AuthResponse> RegisterModeratorAsync(RegisterRequest request)
        {
            if (await _userManager.FindByEmailAsync(request.Email) != null)
                return new() { Success = false, Message = "User with this email already exists" };

            var user = new User
            {
                Id = Guid.NewGuid(),
                UserName = request.Email,
                Email = request.Email,
                FullName = request.FullName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                return new() { Success = false, Message = "Registration error" };

            await _userManager.AddToRoleAsync(user, "Moderator");
            return new() { Success = true, Message = "Moderator successfully registered" };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
                return new() { Success = false, Message = "Invalid email or password" };

            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.GenerateToken(user, roles);

            return new() { Success = true, Message = "Authorization successful", Token = token };
        }

        public async Task<UserProfileDto?> GetUserProfileAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return null;

            var roles = await _userManager.GetRolesAsync(user);

            return new UserProfileDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email!,
                Roles = roles.ToList()
            };
        }
    }
}
