using Application.Dtos;
using Application.UseCases.AddComment;
using Application.UseCases.DeleteComment;
using Application.UseCases.GetComments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Route("api/issues/{id}/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IGetCommentsUseCase _getComments;
        private readonly IAddCommentUseCase _addComment;
        private readonly IDeleteCommentUseCase _deleteComment;

        public CommentsController(IAddCommentUseCase addComment, IGetCommentsUseCase getComments, IDeleteCommentUseCase deleteComment)
        {
            _getComments = getComments;
            _addComment = addComment;
            _deleteComment = deleteComment;
        }

        [HttpGet]
        public async Task<IActionResult> GetComments(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var commentDtos = await _getComments.Execute(id);

            return Ok(commentDtos);
        }

        [Authorize]
        [HttpPost]
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

        [Authorize(Roles = "Admin, Moderator")]
        [HttpDelete]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var userGuid = Guid.Parse(userId);

            var success = await _deleteComment.Execute(id, userGuid);

            if (!success)
                return NotFound();

            return Ok();
        }
    }
}
