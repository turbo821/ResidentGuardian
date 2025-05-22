
using Application.Services.Interfaces;
using Application.UseCases.GetUserIssues;
using Domain.Interfaces;

namespace Application.UseCases.GetModeratorIssues
{
    public class GetModeratorIssuesUseCase : IGetModeratorIssuesUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly ICacheService _cache;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(30);

        public GetModeratorIssuesUseCase(IIssueRepository repo, ICacheService cache)
        {
            _repo = repo;
            _cache = cache;
        }

        public async Task<IEnumerable<GetUserIssueResponse>?> Execute(Guid moderatorId)
        {
            string cacheKey = $"AllIssues_AllModerators{moderatorId}";
            var cachedResult = await _cache.GetAsync<IEnumerable<GetUserIssueResponse>>(cacheKey);

            if (cachedResult != null)
            {
                return cachedResult;
            }

            var moderatorIssues = await _repo.GetAllByModerator(moderatorId);

            var issuesDtos = moderatorIssues.Select(issue =>
            new GetUserIssueResponse(
                issue.Id,
                issue.Title,
                issue.Status,
                issue.CreatedAt,
                issue.Location,
                issue.Category.Title,
                Like: issue.Grades.FirstOrDefault(g => g.UserId == moderatorId)?.Like,
                LikeCount: issue.Grades.Where(g => g.Like).Count(), DislikeCount: issue.Grades.Where(g => !g.Like).Count()
            ));
            await _cache.SetAsync(cacheKey, issuesDtos, _cacheExpiration);

            return issuesDtos;
        }
    }
}
