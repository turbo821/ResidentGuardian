using Application.Dtos;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Auth
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly AppGuardContext _context;
        private readonly IJwtProvider _jwtProvider;
        private readonly UserManager<User> _userManager;

        public RefreshTokenService(
            AppGuardContext context,
            IJwtProvider jwtProvider,
            UserManager<User> userManager)
        {
            _context = context;
            _jwtProvider = jwtProvider;
            _userManager = userManager;
        }

        public async Task<string> GenerateRefreshTokenAsync(Guid userId)
        {
            var token = Guid.NewGuid().ToString();
            var refreshToken = new RefreshToken
            {
                Token = token,
                UserId = userId,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return token;
        }

        public async Task<AuthResponse> RefreshTokenAsync(string refreshToken)
        {
            var storedToken = await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(x => x.Token == refreshToken && x.Expires > DateTime.UtcNow);

            if (storedToken == null)
                return new() { Success = false, Message = "Invalid token" };

            var user = storedToken.User;
            var roles = await _userManager.GetRolesAsync(user);
            var newAccessToken = _jwtProvider.GenerateAccessToken(user, roles);
            var newRefreshToken = await GenerateRefreshTokenAsync(user.Id);

            _context.RefreshTokens.Remove(storedToken);
            await _context.SaveChangesAsync();

            return new()
            {
                Success = true,
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task RevokeTokenAsync(Guid userId)
        {
            var tokens = await _context.RefreshTokens
                .Where(x => x.UserId == userId)
                .ToListAsync();

            _context.RefreshTokens.RemoveRange(tokens);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsTokenRevokedAsync(Guid userId)
        {
            return !await _context.RefreshTokens
                .AnyAsync(rt => rt.UserId == userId && rt.Expires > DateTime.UtcNow);
        }
    }
}
