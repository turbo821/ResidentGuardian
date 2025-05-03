using Application.Dtos;
using Application.UseCases.AddComment;
using Application.UseCases.CreateAnswer;
using Application.UseCases.CreateIssue;
using Application.UseCases.DeleteIssue;
using Application.UseCases.GetAllIssues;
using Application.UseCases.GetAnswers;
using Application.UseCases.GetComments;
using Application.UseCases.GetIssue;
using Application.UseCases.UpdateIssue;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Route("api/issues")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        private readonly IGetAllIssueUseCase _getAllIssues;
        private readonly IGetIssueUseCase _getIssue;
        private readonly ICreateIssueUseCase _createIssue;
        private readonly IUpdateIssueUseCase _updateIssue;
        private readonly IDeleteIssueUseCase _deleteIssue;
        private readonly IAddCommentUseCase _addComment;
        private readonly IGetCommentsUseCase _getComments;
        private readonly ICreateAnswerUseCase _createAnswer;
        private readonly IGetAnswersUseCase _getAnswers;

        public IssuesController(
            IGetAllIssueUseCase getAllIssues, IGetIssueUseCase getIssue,
            ICreateIssueUseCase createIssue, IUpdateIssueUseCase updateIssue,
            IDeleteIssueUseCase deleteIssue, IAddCommentUseCase addComment,
            IGetCommentsUseCase getComments, ICreateAnswerUseCase createAnswer,
            IGetAnswersUseCase getAnswers)
        {
            _getAllIssues = getAllIssues;
            _getIssue = getIssue;
            _createIssue = createIssue;
            _updateIssue = updateIssue;
            _deleteIssue = deleteIssue;
            _addComment = addComment;
            _getComments = getComments;
            _createAnswer = createAnswer;
            _getAnswers = getAnswers;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIssues([FromQuery] IssueFilterRequest request)
        {
            var response = await _getAllIssues.Execute(request);

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetIssue(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var response = await _getIssue.Execute(id);

            if(response == null)
                return NotFound();

            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddIssue([FromForm] CreateIssueRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not valid");

            Guid userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            var id = await _createIssue.Execute(request, userId);

            if (id is null)
                return BadRequest();

            return Ok(id);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateIssue([FromBody] UpdateIssueRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var success = await _updateIssue.Execute(request);

            if (!success)
                return NotFound();

            return Ok();
        }

        [Authorize]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveIssue(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var success = await _deleteIssue.Execute(id);

            if (!success)
                return NotFound();

            return Ok();
        }

        [HttpGet]
        [Route("{id}/comments")]
        public async Task<IActionResult> GetComments(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var commentDtos = await _getComments.Execute(id);

            return Ok(commentDtos);
        }

        [Authorize]
        [HttpPost]
        [Route("{id}/comments")]
        public async Task<IActionResult> AddComment(Guid id, [FromBody] CommentRequest textRequest)
        {
                if (!ModelState.IsValid)
                return BadRequest();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var userGuid = Guid.Parse(userId);

            var request = new AddCommentRequest(id, userGuid, textRequest.Text);

            var response = await _addComment.Execute(request);

            if (response is null)
                return NotFound();

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}/answers")]
        public async Task<IActionResult> GetAnswers(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var response = await _getAnswers.Execute(id);

            return Ok(response);
        }

        // TODO Add Check moderator category!!!
        [Authorize(Roles = "Moderator")]
        [HttpPost]
        [Route("{id}/answers")]
        public async Task<IActionResult> AddAnswer(Guid id, [FromForm] AddAnswerRequest addRequest)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var userGuid = Guid.Parse(userId);

            var request = new CreateAnswerRequest(id, userGuid, addRequest.Text, 
                addRequest.UpdateStatus, addRequest.Images);

            var response = await _createAnswer.Execute(request);

            if(response is null) return NotFound();

            return Ok(response);
        }
    }
}
