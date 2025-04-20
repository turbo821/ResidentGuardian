using Application.Dtos;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.Login(request);
            if (!response.Success) return Unauthorized(response.Message);

            SetAuthCookies(response.AccessToken!, response.RefreshToken!);

            return Ok(response.Message);
        }

        [HttpGet("check-auth")]
        public IActionResult CheckAuth()
        {
            var refreshToken = Request.Cookies["guard-cookies"];
            var accessToken = Request.Cookies["resident-cookies"];

            if (string.IsNullOrEmpty(refreshToken))
            {
                Response.Cookies.Delete("resident-cookies");
                return Unauthorized();
            }

            if(!string.IsNullOrEmpty(accessToken))
                return Ok(new { isAuthenticated = true });

            return Ok(new { isAuthenticated = false });
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