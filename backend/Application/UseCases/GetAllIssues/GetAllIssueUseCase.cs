using Domain.Interfaces;

namespace Application.UseCases.GetAllIssues
{
    public class GetAllIssueUseCase : IGetAllIssueUseCase
    {
        private readonly IIssueRepository _repo;

        public GetAllIssueUseCase(IIssueRepository repo)
        {
            _repo = repo;
        }
        public async Task<IEnumerable<GetAllIssueResponse>?> Execute()
        {
            var issues = await _repo.GetAll();
            if(!issues.Any())
                return null;

            var issuesDtos = issues.Select(issue =>
            new GetAllIssueResponse(
                issue.Id,
                issue.Title,
                issue.Status,
                issue.Images?.Select(img => img.Uri).FirstOrDefault()!
            ));

            return issuesDtos;
        }
    }
}
