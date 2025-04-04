using Application.Dtos;

namespace Application.Services.Interfaces
{
    public interface IRefreshTokenService
    {
        Task<string> GenerateRefreshTokenAsync(Guid userId);
        Task<AuthResponse> RefreshTokenAsync(string refreshToken);
        Task RevokeTokenAsync(Guid userId);
        Task<bool> IsTokenRevokedAsync(Guid userId);
    }
}
