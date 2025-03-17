using Application.Dtos;
using Application.Services.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.Services
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
                return new() { Success = false, Message = "Пользователь с таким email уже существует" };

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
                return new() { Success = false, Message = "Ошибка регистрации" };

            await _userManager.AddToRoleAsync(user, "User");

            var token = _tokenService.GenerateToken(user, new List<string> { "User" });
            return new() { Success = true, Message = "Регистрация успешна", Token = token };
        }

        public async Task<AuthResponse> RegisterModeratorAsync(RegisterRequest request)
        {
            if (await _userManager.FindByEmailAsync(request.Email) != null)
                return new() { Success = false, Message = "Пользователь с таким email уже существует" };

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
                return new() { Success = false, Message = "Ошибка регистрации" };

            await _userManager.AddToRoleAsync(user, "Moderator");
            return new() { Success = true, Message = "Модератор успешно зарегистрирован" };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
                return new() { Success = false, Message = "Неверный email или пароль" };

            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.GenerateToken(user, roles);

            return new() { Success = true, Message = "Авторизация успешна", Token = token };
        }
    }
}
