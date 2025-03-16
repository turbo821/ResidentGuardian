using Application.Dtos;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Services;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var response = await _authService.RegisterUserAsync(request);
        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("register-moderator")]
    public async Task<IActionResult> RegisterModerator([FromBody] RegisterRequest request)
    {
        var response = await _authService.RegisterModeratorAsync(request);
        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);
        if (!response.Success) return Unauthorized(response);

        return Ok(response);
    }
}