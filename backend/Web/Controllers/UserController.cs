using Application.Services.Interfaces;
using Application.UseCases.GetUserIssues;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Authorize]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IGetUserIssuesUseCase _getUserIssues;

        public UserController(
            IAuthService authService,
            IRefreshTokenService refreshTokenService,
            IGetUserIssuesUseCase getUserIssues)
        {
            _authService = authService;
            _refreshTokenService = refreshTokenService;
            _getUserIssues = getUserIssues;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var isTokenRevoked = await _refreshTokenService.IsTokenRevokedAsync(Guid.Parse(userId));
            if (isTokenRevoked) return Unauthorized("Token revoked");

            var profile = await _authService.GetUserProfile(Guid.Parse(userId));
            return Ok(profile);
        }

        [HttpGet("issues")]
        public async Task<IActionResult> GetUserIssues()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var response = await _getUserIssues.Execute(Guid.Parse(userId));

            return Ok(response);
        }
    }
}
