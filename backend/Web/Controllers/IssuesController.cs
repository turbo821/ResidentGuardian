using Application.UseCases.CreateIssue;
using Application.UseCases.DeleteIssue;
using Application.UseCases.GetAllIssues;
using Application.UseCases.GetIssue;
using Application.UseCases.UpdateIssue;
using Microsoft.AspNetCore.Mvc;

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

        public IssuesController(
            IGetAllIssueUseCase getAllIssues,
            IGetIssueUseCase getIssue,
            ICreateIssueUseCase createIssue,
            IUpdateIssueUseCase updateIssue,
            IDeleteIssueUseCase deleteIssue)
        {
            _getAllIssues = getAllIssues;
            _getIssue = getIssue;
            _createIssue = createIssue;
            _updateIssue = updateIssue;
            _deleteIssue = deleteIssue;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIssues()
        {
            var response = await _getAllIssues.Execute();

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

        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> AddIssue([FromBody] CreateIssueRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not valid");

            var id = await _createIssue.Execute(request);

            if (id is null)
                return BadRequest();

            return Ok(new { Id = id });
        }

        //[Authorize]
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

        //[Authorize]
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
    }
}
