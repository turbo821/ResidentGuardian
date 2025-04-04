using Application.Dtos;
using Application.Services.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtProvider _jwtService;
        private readonly IRefreshTokenService _refreshTokenService;

        public AuthService(
            UserManager<User> userManager,
            IJwtProvider jwtService,
            IRefreshTokenService refreshTokenService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _refreshTokenService = refreshTokenService;
        }

        public async Task<AuthResponse> RegisterUser(RegisterRequest request)
        {
            if (await _userManager.FindByEmailAsync(request.Email) != null)
                return new() { Success = false, Message = "User exists" };

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
                return new() { Success = false, Message = "Registration failed" };

            await _userManager.AddToRoleAsync(user, "User");

            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtService.GenerateAccessToken(user, roles);
            var refreshToken = await _refreshTokenService.GenerateRefreshTokenAsync(user.Id);

            return new()
            {
                Success = true,
                Message = "Registered",
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResponse> RegisterModerator(RegisterRequest request)
        {
            if (await _userManager.FindByEmailAsync(request.Email) != null)
                return new() { Success = false, Message = "User exists" };

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
                return new() { Success = false, Message = "Registration failed" };

            await _userManager.AddToRoleAsync(user, "Moderator");
            return new() { Success = true, Message = "Moderator successfully registered" };
        }

        public async Task<AuthResponse> Login(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
                return new() { Success = false, Message = "Invalid credentials" };

            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtService.GenerateAccessToken(user, roles);
            var refreshToken = await _refreshTokenService.GenerateRefreshTokenAsync(user.Id);

            return new()
            {
                Success = true,
                Message = "Authenticated",
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<UserProfileDto?> GetUserProfile(Guid userId)
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
