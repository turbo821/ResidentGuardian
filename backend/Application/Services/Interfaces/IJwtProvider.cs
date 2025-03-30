using Domain.Entities;
using System.Security.Claims;

namespace Application.Services.Interfaces
{
    public interface IJwtProvider
    {
        string GenerateAccessToken(User user, IList<string> roles);
        Task<ClaimsPrincipal?> GetPrincipalFromToken(string token);
    }
}
