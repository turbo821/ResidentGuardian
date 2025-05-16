using Application.UseCases.CreateAnswer;
using Application.UseCases.GetAnswers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Route("api/issues/{id}/answers")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly IGetAnswersUseCase _getAnswers;
        private readonly ICreateAnswerUseCase _createAnswer;

        public AnswersController(ICreateAnswerUseCase createAnswer, IGetAnswersUseCase getAnswers)
        {
            _getAnswers = getAnswers;
            _createAnswer = createAnswer;
        }

        [HttpGet]
        public async Task<IActionResult> GetAnswers(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var response = await _getAnswers.Execute(id);

            return Ok(response);
        }

        [Authorize(Roles = "Moderator")]
        [HttpPost]
        public async Task<IActionResult> AddAnswer(Guid id, [FromForm] AddAnswerRequest addRequest)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var userGuid = Guid.Parse(userId);

            var request = new CreateAnswerRequest(id, userGuid, addRequest.Text,
                addRequest.UpdateStatus, addRequest.Images);

            var response = await _createAnswer.Execute(request);

            if (response is null) return NotFound();

            return Ok(response);
        }
    }
}
