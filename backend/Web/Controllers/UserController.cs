using Application.UseCases.GetUserIssues;
using Application.UseCases.GetUserProfile;
using Application.UseCases.UpdateProfile;
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
        private readonly IGetUserProfileUseCase _getUserProfile;
        private readonly IUpdateUserProfileUseCase _updateUserProfile;
        private readonly IGetUserIssuesUseCase _getUserIssues;

        public UserController(
            IGetUserProfileUseCase getUserProfile,
            IUpdateUserProfileUseCase updateUserProfile,
            IGetUserIssuesUseCase getUserIssues)
        {
            _getUserProfile = getUserProfile;
            _updateUserProfile = updateUserProfile;
            _getUserIssues = getUserIssues;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var profile = await _getUserProfile.Execute(Guid.Parse(userId));
            return Ok(profile);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var profile = await _updateUserProfile.Execute(Guid.Parse(userId), request);
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
