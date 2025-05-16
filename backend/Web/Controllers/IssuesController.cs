using Application.UseCases.CreateIssue;
using Application.UseCases.DeleteIssue;
using Application.UseCases.GetAllIssues;
using Application.UseCases.GetIssue;
using Application.UseCases.RestoreIssue;
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
        private readonly IRestoreIssueUseCase _restoreIssue;

        public IssuesController(
            IGetAllIssueUseCase getAllIssues, IGetIssueUseCase getIssue,
            ICreateIssueUseCase createIssue, IUpdateIssueUseCase updateIssue,
            IDeleteIssueUseCase deleteIssue, IRestoreIssueUseCase restoreIssue)
        {
            _getAllIssues = getAllIssues;
            _getIssue = getIssue;
            _createIssue = createIssue;
            _updateIssue = updateIssue;
            _deleteIssue = deleteIssue;
            _restoreIssue = restoreIssue;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIssues([FromQuery] IssueFilterRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Guid? userGuid = null;
            if (userId != null) userGuid = Guid.Parse(userId);

            var response = await _getAllIssues.Execute(request, userGuid);

            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("revored")]
        public async Task<IActionResult> GetAllRevoredIssues([FromQuery] IssueFilterRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Guid? userGuid = null;
            if (userId != null) userGuid = Guid.Parse(userId);

            var response = await _getAllIssues.Execute(request, userGuid, true);

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetIssue(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Guid? userGuid = null;
            if (userId != null) userGuid = Guid.Parse(userId);

            var response = await _getIssue.Execute(id, userGuid);

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
        public async Task<IActionResult> RemoveIssue(Guid id, [FromQuery] bool softDeletion = true)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Not authorized");

            var userGuid = Guid.Parse(userId);
            DeleteIssueRequest request = new(userGuid, softDeletion);

            var success = await _deleteIssue.Execute(id, request);

            if (!success)
                return NotFound();

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}/restore")]
        public async Task<IActionResult> Restore(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Not authorized");

            var userGuid = Guid.Parse(userId);

            var response = await _restoreIssue.Execute(id);

            if (!response)
                return NotFound();

            return Ok(response);
        }
    }
}
