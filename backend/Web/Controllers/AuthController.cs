using Application.Dtos;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Web.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IRefreshTokenService _refreshTokenService;

        public AuthController(
            IAuthService authService,
            IRefreshTokenService refreshTokenService)
        {
            _authService = authService;
            _refreshTokenService = refreshTokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var response = await _authService.RegisterUser(request);
            if (!response.Success) return BadRequest(response.Message);

            SetAuthCookies(response.AccessToken!, response.RefreshToken!);

            return Ok(response.Message);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("register-moderator")]
        public async Task<IActionResult> RegisterModerator([FromBody] RegisterRequest request)
        {
            var response = await _authService.RegisterModerator(request);
            if (!response.Success) return BadRequest(response.Message);

            return Ok(response.Message);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-moderator-role")]
        public async Task<IActionResult> AddModeratorRole([FromBody] string email)
        {
            throw new NotImplementedException();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.Login(request);
            if (!response.Success) return Unauthorized(response.Message);

            SetAuthCookies(response.AccessToken!, response.RefreshToken!);

            return Ok(response.Message);
        }

        [Authorize]
        [HttpGet("check-auth")]
        public IActionResult CheckAuth()
        {
            return Ok(new { isAuthenticated = true });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["guard-cookies"];
            if (string.IsNullOrEmpty(refreshToken)) return Unauthorized();

            var response = await _refreshTokenService.RefreshTokenAsync(refreshToken);
            if (!response.Success) return Unauthorized(response.Message);

            SetAuthCookies(response.AccessToken!, response.RefreshToken!);
            return Ok();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("resident-cookies");
            Response.Cookies.Delete("guard-cookies");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("Not authorized");

            await _refreshTokenService.RevokeTokenAsync(Guid.Parse(userId!));

            return NoContent();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var isTokenRevoked = await _refreshTokenService.IsTokenRevokedAsync(Guid.Parse(userId));
            if (isTokenRevoked) return Unauthorized("Token revoked");

            var profile = await _authService.GetUserProfile(Guid.Parse(userId));
            return Ok(profile);
        }

        private void SetAuthCookies(string accessToken, string refreshToken)
        {
            Response.Cookies.Append("resident-cookies", accessToken, new CookieOptions
            {
                Expires = DateTime.UtcNow.AddMinutes(15),
                Path = "/"
            });

            Response.Cookies.Append("guard-cookies", refreshToken, new CookieOptions
            {
                Expires = DateTime.UtcNow.AddDays(7),
                Path = "/"
            });
        }
    }
}