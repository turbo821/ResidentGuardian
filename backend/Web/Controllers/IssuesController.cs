using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/issues")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        public IssuesController()
        {
            
        }

        [HttpGet]
        public async Task<IActionResult> ShowAllIssues()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> ShowIssue(Guid id)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddIssue([FromBody] string request)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateCrimeMark([FromBody] string request)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveCrimeMark(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
