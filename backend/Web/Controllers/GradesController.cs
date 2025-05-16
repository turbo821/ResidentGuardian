using Application.UseCases.AddGrade;
using Application.UseCases.DeleteGrade;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Authorize]
    [Route("api/issues/{id}/grades")]
    [ApiController]
    public class GradesController : ControllerBase
    {
        private readonly IAddGradeUseCase _addGrade;
        private readonly IDeleteGradeUseCase _deleteGrade;

        public GradesController(IAddGradeUseCase addGrade, IDeleteGradeUseCase deleteGrade)
        {
            _addGrade = addGrade;
            _deleteGrade = deleteGrade;
        }

        [HttpPost]
        public async Task<IActionResult> AddGrade(Guid id, [FromBody] bool like)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not valid");

            Guid userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var request = new AddGradeRequest(id, userId, like);
            var success = await _addGrade.Execute(request);

            if (!success) return BadRequest();

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteGrade(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not valid");

            Guid userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var request = new DeleteGradeRequest(id, userId);
            var success = await _deleteGrade.Execute(request);

            if (!success) return BadRequest();

            return Ok();
        }
    }
}
