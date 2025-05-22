using Application.Services.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases.GetUserIssues
{
    public class GetUserIssuesUseCase : IGetUserIssuesUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly ICacheService _cache;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(30);

        public GetUserIssuesUseCase(IIssueRepository repo, ICacheService cache)
        {
            _repo = repo;
            _cache = cache;
        }

        public async Task<IEnumerable<GetUserIssueResponse>?> Execute(Guid id)
        {
            string cacheKey = $"AllIssues_User{id}";
            var cachedResponse = await _cache.GetAsync<IEnumerable<GetUserIssueResponse>?>(cacheKey);
            if (cachedResponse != null)
            {
                return cachedResponse;
            }

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
            await _cache.SetAsync(cacheKey, issuesDtos, _cacheExpiration);

            return issuesDtos;
        }
    }
}
