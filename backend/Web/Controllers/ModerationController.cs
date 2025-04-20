using Application.Dtos;
using Application.Services.Interfaces;
using Application.UseCases.AddModeratorRoles;
using Application.UseCases.AssignModerator;
using Application.UseCases.GetModerators;
using Application.UseCases.UnassignModerator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/moderation")]
    [ApiController]
    public class ModerationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IGetModeratorsUseCase _getModerators;
        private readonly IAssignModeratorUseCase _assignModerator;
        private readonly IUnassignModeratorUseCase _unassignModerator;

        public ModerationController(IAuthService authService,
            IGetModeratorsUseCase getModerators,
            IAssignModeratorUseCase assignModerator,
            IUnassignModeratorUseCase unassignModerator)
        {
            _authService = authService;
            _getModerators = getModerators;
            _assignModerator = assignModerator;
            _unassignModerator = unassignModerator;
        }

        [HttpGet]
        public async Task<IActionResult> GetModerators()
        {
            var response = await _getModerators.Execute();

            return Ok(response);
        }

        [HttpPost("register-moderator")]
        public async Task<IActionResult> RegisterModerator([FromBody] RegisterRequest request)
        {
            var response = await _authService.RegisterModerator(request);
            if (!response.Success) return BadRequest(response.Message);

            return Ok(response.Message);
        }

        [HttpPost("assign-moderator")]
        public async Task<IActionResult> AssignModerator([FromBody] AssignModeratorRequest request)
        {
            var response = await _assignModerator.Execute(request);

            if(response is null)
                return NotFound();

            return Ok(response);
        }

        [HttpDelete("unassign-moderator/{id}")]
        public async Task<IActionResult> UnassignModerator(Guid id)
        {
            var response = await _unassignModerator.Execute(id);

            if (!response)
                return NotFound();

            return Ok();
        }

        [HttpPost("add-moderator-categories")]
        public async Task<IActionResult> AddModeratorCategories([FromBody] AddModeratorCategoriesRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
