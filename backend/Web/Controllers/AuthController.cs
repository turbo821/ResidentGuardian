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
            var response = await _authService.RegisterUserAsync(request);
            if (!response.Success) return BadRequest(response.Message);

            SetAuthCookies(response.AccessToken!, response.RefreshToken!);

            return Ok(response.Message);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("register-moderator")]
        public async Task<IActionResult> RegisterModerator([FromBody] RegisterRequest request)
        {
            var response = await _authService.RegisterModeratorAsync(request);
            if (!response.Success) return BadRequest(response.Message);

            return Ok(response.Message);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginAsync(request);
            if (!response.Success) return Unauthorized(response.Message);

            SetAuthCookies(response.AccessToken!, response.RefreshToken!);

            return Ok(response.Message);
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

        [Authorize]
        [HttpPost("revoke-token")]
        public async Task<IActionResult> RevokeToken()
        {
            var userId = User.FindFirstValue("id");
            if (userId == null) return BadRequest();
            await _refreshTokenService.RevokeTokenAsync(Guid.Parse(userId!));
            return NoContent();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var profile = await _authService.GetUserProfileAsync(Guid.Parse(userId));
            return Ok(profile);
        }

        private void SetAuthCookies(string accessToken, string refreshToken)
        {
            Response.Cookies.Append("resident-cookies", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });

            Response.Cookies.Append("guard-cookies", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });
        }
    }
}