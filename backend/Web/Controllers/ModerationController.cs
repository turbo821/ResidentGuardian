using Application.UseCases.GetModeratorCategories;
using Application.UseCases.GetModeratorIssues;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Authorize(Roles = "Moderator")]
    [Route("api/moderation")]
    [ApiController]
    public class ModerationController : ControllerBase
    {
        private readonly IGetModeratorIssuesUseCase _getModeratorIssues;
        private readonly IGetModeratorCategoriesUseCase _getModeratorCategories;

        public ModerationController(IGetModeratorIssuesUseCase getModeratorIssues, IGetModeratorCategoriesUseCase getModeratorCategories)
        {
            _getModeratorIssues = getModeratorIssues;
            _getModeratorCategories = getModeratorCategories;
        }

        [HttpGet("issues")]
        public async Task<IActionResult> GetModeratorIssues()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var userGuid = Guid.Parse(userId);
            var response = await _getModeratorIssues.Execute(userGuid);

            return Ok(response);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetModeratorCategories()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var userGuid = Guid.Parse(userId);
            var response = await _getModeratorCategories.Execute(userGuid);

            return Ok(response);
        }
    }
}
