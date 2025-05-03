using Application.Dtos;
using Domain.Interfaces;

namespace Application.UseCases.GetIssue
{
    public class GetIssueUseCase : IGetIssueUseCase
    {
        private readonly IIssueRepository _repo;

        public GetIssueUseCase(IIssueRepository repo)
        {
            _repo = repo;
        }
        public async Task<GetIssueResponse?> Execute(Guid id)
        {
            var issue = await _repo.GetById(id);
            if (issue is null) return null;

            var issueDto = new GetIssueResponse(issue.Id,
                issue.Title, issue.Status, issue.Description, issue.Category.Title, 
                issue.Location, issue.Images.Select(im => im.Uri).ToList());

            return issueDto;
        }
    }
}
