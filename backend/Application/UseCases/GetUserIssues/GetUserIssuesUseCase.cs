using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.GetUserIssues
{
    public class GetUserIssuesUseCase : IGetUserIssuesUseCase
    {
        private readonly IIssueRepository _repo;

        public GetUserIssuesUseCase(IIssueRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<GetUserIssueResponse>?> Execute(Guid id)
        {
            var issues = await _repo.GetAllByUser(id);
            if (!issues.Any())
                return null;

            var issuesDtos = issues.Select(issue =>
            new GetUserIssueResponse(
                issue.Id,
                issue.Title,
                issue.Status,
                issue.CreatedAt,
                issue.Location,
                issue.Category.Title,
                Like: issue.Grades.FirstOrDefault(g => g.UserId == id)?.Like,
                LikeCount: issue.Grades.Where(g => g.Like).Count(), DislikeCount: issue.Grades.Where(g => !g.Like).Count()
            ));

            return issuesDtos;
        }
    }
}
