using Application.Services.Interfaces;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;

namespace Infrastructure.Auth
{
    public class JwtProvider : IJwtProvider
    {
        private readonly JwtOptions _options;

        public JwtProvider(IOptions<JwtOptions> options)
        {
            _options = options.Value;
        }

        public string GenerateAccessToken(User user, IList<string> roles)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim("email", user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_options.AccessTokenExpiryMinutes),
                Issuer = _options.Issuer,
                Audience = _options.Audience,
                SigningCredentials = credentials
            };

            var tokenHandler = new JsonWebTokenHandler();
            return tokenHandler.CreateToken(tokenDescriptor);
        }

        public async Task<ClaimsPrincipal?> GetPrincipalFromToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey)),
                ValidateIssuer = true,
                ValidIssuer = _options.Issuer,
                ValidateAudience = true,
                ValidAudience = _options.Audience,
                ValidateLifetime = false
            };

            var tokenHandler = new JsonWebTokenHandler();
            var validationResult = await tokenHandler.ValidateTokenAsync(token, tokenValidationParameters);

            if (!validationResult.IsValid)
            {
                throw new SecurityTokenValidationException("Token is invalid.");
            }

            return validationResult.ClaimsIdentity != null ? new ClaimsPrincipal(validationResult.ClaimsIdentity) : null;
        }
    }
}
