using Application.Dtos;
using Application.UseCases.UpdateModeratorCategories;
using Application.UseCases.AddModeratorRoles;
using Application.UseCases.AssignModerator;
using Application.UseCases.CreateModerator;
using Application.UseCases.DeleteModerator;
using Application.UseCases.GetModerators;
using Application.UseCases.UnassignModerator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ICreateModeratorUseCase _createModerator;
        private readonly IGetModeratorsUseCase _getModerators;
        private readonly IAssignModeratorUseCase _assignModerator;
        private readonly IUnassignModeratorUseCase _unassignModerator;
        private readonly IUpdateModeratorCategoriesUseCase _updateModeratorCategories;
        private readonly IDeleteModeratorUseCase _deleteModerator;

        public AdminController(ICreateModeratorUseCase createModerator,
            IGetModeratorsUseCase getModerators,
            IAssignModeratorUseCase assignModerator,
            IUnassignModeratorUseCase unassignModerator,
            IUpdateModeratorCategoriesUseCase updateModeratorCategories,
            IDeleteModeratorUseCase deleteModerator)
        {
            _createModerator = createModerator;
            _getModerators = getModerators;
            _assignModerator = assignModerator;
            _unassignModerator = unassignModerator;
            _updateModeratorCategories = updateModeratorCategories;
            _deleteModerator = deleteModerator;
        }

        [HttpGet("moderators")]
        public async Task<IActionResult> GetModerators()
        {
            var response = await _getModerators.Execute();

            return Ok(response);
        }

        [HttpPost("moderators")]
        public async Task<IActionResult> CreateModerator([FromBody] RegisterRequest request)
        {
            var response = await _createModerator.Execute(request);
            if (response is null) return BadRequest();

            return Ok(response);
        }

        [HttpPost("assign-moderator")]
        public async Task<IActionResult> AssignModerator([FromBody] AssignModeratorRequest request)
        {
            var response = await _assignModerator.Execute(request);

            if (response is null)
                return NotFound();

            return Ok(response);
        }

        [HttpPut("moderator-categories")]
        public async Task<IActionResult> UpdateModeratorCategories([FromBody] UpdateModeratorCategoriesRequest request)
        {
            var response = await _updateModeratorCategories.Execute(request);

            if (response is null) return BadRequest();

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

        [HttpDelete("moderators/{id}")]
        public async Task<IActionResult> DeleteModerator(Guid id)
        {
            var response = await _deleteModerator.Execute(id);

            if (!response)
                return NotFound();

            return Ok();
        }
    }
}
