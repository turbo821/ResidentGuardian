using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.UseCases.GetAllIssues
{
    public class GetAllIssueUseCase : IGetAllIssueUseCase
    {
        private readonly IIssueRepository _repo;

        public GetAllIssueUseCase(IIssueRepository repo)
        {
            _repo = repo;
        }
        public async Task<IEnumerable<GetAllIssueResponse>?> Execute(IssueFilterRequest request)
        {
            var issues = await _repo.GetAll(request);
            if(!issues.Any())
                return null;
 
            var issuesDtos = issues.Select(issue =>
            new GetAllIssueResponse(
                issue.Id,
                issue.Title,
                issue.Status,
                issue.Images?.Select(img => img.Uri).FirstOrDefault()!,
                issue.Point != null 
                    ? new List<double>() { issue.Point.Y, issue.Point.X } 
                    : new List<double>()
            ));

            return issuesDtos;
        }
    }
}
