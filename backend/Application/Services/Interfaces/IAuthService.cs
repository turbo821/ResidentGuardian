using Application.Dtos;

namespace Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterModeratorAsync(RegisterRequest request);
        Task<AuthResponse> RegisterUserAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
    }
}
