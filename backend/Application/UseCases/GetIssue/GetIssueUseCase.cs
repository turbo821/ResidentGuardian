
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
        public async Task<GetIssueResponse?> Execute(Guid id, Guid? userId)
        {
            var issue = await _repo.GetById(id);
            if (issue is null) return null;

            var like = userId != null ? issue.Grades.FirstOrDefault(g => g.UserId == userId)?.Like : null;

            var issueDto = new GetIssueResponse(issue.Id,
                issue.Title, issue.Status, issue.Description, issue.Category.Title, 
                issue.Location, issue.Images.Select(im => im.Uri).ToList(), like,
                issue.Grades.Where(g => g.Like).Count(), issue.Grades.Where(g => !g.Like).Count());

            return issueDto;
        }
    }
}
